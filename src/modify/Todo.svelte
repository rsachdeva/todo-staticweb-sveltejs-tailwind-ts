<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import { tick } from "svelte";
  import { selectOnFocus } from "../focus/focus";
  import type { TodoType } from "../types/todo.type";

  export let todo: TodoType;
  let nameEl: HTMLElement;

  const dispatch = createEventDispatcher();

  let editing = false; // track editing mode
  let name = todo.name; // hold the name of the todo being edited
  let editButtonPressed = false;

  function update(updatedTodo: Partial<TodoType>) {
    todo = { ...todo, ...updatedTodo }; // applies modifications to todo
    dispatch("update", todo); // emit update event
  }

  function onCancel() {
    name = todo.name; // restores name to its initial value and
    editing = false; // and exit editing mode
  }

  function onSave() {
    update({ name: name }); // updates todo name
    editing = false; // and exit editing mode
  }

  function onRemove() {
    dispatch("remove", todo); // emit remove event
  }

  const focusOnInit = (node: HTMLElement) =>
    node && typeof node.focus === "function" && node.focus();

  async function onEdit() {
    editing = true; // enter editing mode
    editButtonPressed = true;
    await tick();
    nameEl.focus();
  }

  const focusEditButton = (node: HTMLElement) =>
    editButtonPressed && typeof node.focus === "function" && node.focus();

  function onToggle() {
    update({ completed: !todo.completed }); // updates todo status
  }
</script>

<style>
  .btn {
    padding: 0.8rem 1rem 0.7rem;
    border: 0.2rem solid #4d4d4d;
    cursor: pointer;
    text-transform: capitalize;
  }
  .btn__danger {
    color: #fff;
    background-color: #ca3c3c;
    border-color: #bd2130;
  }
  .btn-group {
    display: flex;
    justify-content: space-between;
  }
  .btn-group > * {
    flex: 1 1 49%;
  }
  .btn-group > * + * {
    margin-left: 0.8rem;
  }
  .visually-hidden {
    position: absolute !important;
    height: 1px;
    width: 1px;
    overflow: hidden;
    clip: rect(1px 1px 1px 1px);
    clip: rect(1px, 1px, 1px, 1px);
    white-space: nowrap;
  }
  /* CHECKBOX STYLES */
  .c-cb {
    box-sizing: border-box;
    font-family: Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    font-weight: 400;
    font-size: 1.6rem;
    line-height: 1.25;
    display: block;
    position: relative;
    min-height: 44px;
    padding-left: 40px;
    clear: left;
  }
  .c-cb > label::before,
  .c-cb > input[type="checkbox"] {
    box-sizing: border-box;
    top: -2px;
    left: -2px;
    width: 44px;
    height: 44px;
  }
  .c-cb > input[type="checkbox"] {
    -webkit-font-smoothing: antialiased;
    cursor: pointer;
    position: absolute;
    z-index: 1;
    margin: 0;
    opacity: 0;
  }
  .c-cb > label {
    font-size: inherit;
    font-family: inherit;
    line-height: inherit;
    display: inline-block;
    margin-bottom: 0;
    padding: 8px 15px 5px;
    cursor: pointer;
    touch-action: manipulation;
  }
  .c-cb > label::before {
    content: "";
    position: absolute;
    border: 2px solid currentColor;
    background: transparent;
  }
  .c-cb > input[type="checkbox"]:focus + label::before {
    border-width: 4px;
    outline: 3px dashed #228bec;
  }
  .c-cb > label::after {
    box-sizing: content-box;
    content: "";
    position: absolute;
    top: 11px;
    left: 9px;
    width: 18px;
    height: 7px;
    transform: rotate(-45deg);
    border: solid;
    border-width: 0 0 5px 5px;
    border-top-color: transparent;
    opacity: 0;
    background: transparent;
  }
  .c-cb > input[type="checkbox"]:checked + label::after {
    opacity: 1;
  }
</style>

<div class="stack-small">
  {#if editing}
    <!-- markup for editing todo: label, input text, Cancel and Save Button -->
    <form
      on:submit|preventDefault={onSave}
      class="stack-small"
      on:keydown={(e) => e.key === 'Escape' && onCancel()}>
      <div class="form-group">
        <label for="todo-{todo.id}" class="todo-label">New name for '{todo.name}'</label>
        <input
          bind:value={name}
          bind:this={nameEl}
          use:selectOnFocus
          use:focusOnInit
          type="text"
          id="todo-{todo.id}"
          autoComplete="off"
          class="todo-text" />
      </div>
      <div class="btn-group">
        <button class="btn todo-cancel" on:click={onCancel} type="button">
          Cancel<span class="visually-hidden">renaming {todo.name}</span>
        </button>
        <button
          class="btn btn__primary todo-edit"
          type="submit"
          disabled={!name}>
          Save<span class="visually-hidden">new name for {todo.name}</span>
        </button>
      </div>
    </form>
  {:else}
    <!-- markup for displaying todo: checkbox, label, Edit and Delete Button -->
    <div class="c-cb">
      <input
        type="checkbox"
        id="todo-{todo.id}"
        on:click={onToggle}
        checked={todo.completed} />
      <label for="todo-{todo.id}" class="todo-label">{todo.name}</label>
    </div>
    <div class="btn-group">
      <button type="button" class="btn" on:click={onEdit} use:focusEditButton>
        Edit<span class="visually-hidden"> {todo.name}</span>
      </button>
      <button type="button" class="btn btn__danger" on:click={onRemove}>
        Delete<span class="visually-hidden"> {todo.name}</span>
      </button>
    </div>
  {/if}
</div>
