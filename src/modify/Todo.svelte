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

<div>
  {#if editing}
    <!-- markup for editing todo: label, input text, Cancel and Save Button -->
    <form
      on:submit|preventDefault={onSave}
      on:keydown={(e) => e.key === 'Escape' && onCancel()}>
      <div class="m-10">
        <label
          class="text-2xl font-bold text-indigo-500"
          for="todo-{todo.id}">New name for '{todo.name}'</label>
        <input
          bind:value={name}
          bind:this={nameEl}
          use:selectOnFocus
          use:focusOnInit
          class="text-2xl p-10 font-bold text-gray-500"
          type="text"
          id="todo-{todo.id}"
          autoComplete="off" />
      </div>
      <div>
        <button
          on:click={onCancel}
          type="button"
          class="btn lowercase bg-white text-red-300 text-sm font-mono">
          Cancel<span class="hidden">renaming {todo.name}</span>
        </button>
        <button
          type="submit"
          disabled={!name}
          class="btn lowercase bg-white text-blue-300 text-sm font-mono">
          Save<span class="hidden">new name for {todo.name}</span>
        </button>
      </div>
    </form>
  {:else}
    <!-- markup for displaying todo: checkbox, label, Edit and Delete Button -->
    <div>
      <input
        class="p-10"
        type="checkbox"
        id="todo-{todo.id}"
        on:click={onToggle}
        checked={todo.completed} />
      <label
        class="text-2xl mb-3 font-bold text-gray-900 leading-tight"
        for="todo-{todo.id}">{todo.name}</label>
    </div>
    <div>
      <button
        type="button"
        on:click={onEdit}
        use:focusEditButton
        class="btn lowercase bg-white text-blue-300 text-sm font-mono">
        Edit<span class="hidden"> {todo.name}</span>
      </button>
      <button
        type="button"
        on:click={onRemove}
        class="btn lowercase bg-white text-red-300 text-sm font-mono">
        Delete<span class="hidden"> {todo.name}</span>
      </button>
    </div>
  {/if}
</div>
