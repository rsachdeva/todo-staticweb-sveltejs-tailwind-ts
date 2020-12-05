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
  class="bg-gray-200 p-10"
  on:submit|preventDefault={addTodo}
  on:keydown={(e) => e.key === 'Escape' && onCancel()}>
  <h2 class="py-3">
    <label class="text-pink-500 font-extrabold" for="todo-0">What needs to be
      done?</label>
  </h2>
  <input
    class="w-full h-20 text-2xl rounded font-bold text-gray-900 focus:outline-none focus:bg-gray-100 focus:ring-1 focus:ring-green-500 px-3"
    bind:value={name}
    bind:this={nameEl}
    use:selectOnFocus
    type="text"
    id="todo-0"
    autoComplete="off" />
  <div class="mt-5">
    <button class="btn" type="submit" disabled={!name}>Add</button>
  </div>
</form>
