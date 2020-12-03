<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import { onMount } from "svelte";
  import { selectOnFocus } from "../focus/focus";

  const dispatch = createEventDispatcher();

  export let autoFocus = false;

  console.log("autoFocus is", autoFocus);
  let name = "";
  let nameEl: HTMLElement; // reference to the name input DOM node
  const addTodo = () => {
    dispatch("addTodo", name);
    name = "";
    nameEl.focus(); // give focus to the name input
  };

  const onCancel = () => {
    name = "";
    nameEl.focus(); // give focus to the name input
  };
  $: console.log("!name is", !name);

  console.log("initializing:", nameEl);
  onMount(() => {
    console.log("mounted:", nameEl);
    // that autoFocus here is just to control if Embeddeder Todos component wants to play here with not allowing focus
    autoFocus && nameEl.focus();
  });
</script>

<style>
  .btn {
    padding: 0.8rem 1rem 0.7rem;
    border: 0.2rem solid #4d4d4d;
    cursor: pointer;
    text-transform: capitalize;
  }
  .btn__primary {
    color: #fff;
    background-color: #000;
  }
  .btn__primary:disabled {
    color: darkgrey;
    background-color: #565656;
  }
  .label-wrapper {
    margin: 0;
    flex: 0 0 100%;
    text-align: center;
  }
  .label__lg {
    line-height: 1.01567;
    font-weight: 300;
    padding: 0.8rem;
    margin-bottom: 1rem;
    text-align: center;
  }
  .input__lg {
    padding: 2rem;
    border: 2px solid #000;
  }
  .input__lg:focus {
    border-color: #4d4d4d;
    box-shadow: inset 0 0 0 2px;
  }
  [class*="__lg"] {
    display: inline-block;
    width: 100%;
    font-size: 1.9rem;
  }
  [class*="__lg"]:not(:last-child) {
    margin-bottom: 1rem;
  }
  @media screen and (min-width: 620px) {
    [class*="__lg"] {
      font-size: 2.4rem;
    }
  }
</style>

<form
  on:submit|preventDefault={addTodo}
  on:keydown={(e) => e.key === 'Escape' && onCancel()}>
  <h2 class="label-wrapper">
    <label for="todo-0" class="label__lg">What needs to be done?</label>
  </h2>
  <input
    bind:value={name}
    bind:this={nameEl}
    use:selectOnFocus
    type="text"
    id="todo-0"
    autoComplete="off"
    class="input input__lg" />
  <button
    type="submit"
    disabled={!name}
    class="btn btn__primary btn__lg">Add</button>
</form>
