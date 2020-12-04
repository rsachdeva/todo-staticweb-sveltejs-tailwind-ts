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

<form
  on:submit|preventDefault={addTodo}
  on:keydown={(e) => e.key === 'Escape' && onCancel()}>
  <h2><label for="todo-0">What needs to be done?</label></h2>
  <input
    bind:value={name}
    bind:this={nameEl}
    use:selectOnFocus
    type="text"
    id="todo-0"
    autoComplete="off" />
  <button type="submit" disabled={!name}>Add</button>
</form>
