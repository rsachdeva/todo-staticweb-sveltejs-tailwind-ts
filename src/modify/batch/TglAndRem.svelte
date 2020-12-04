<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import type { TodoType } from "../../types/todo.type";

  const dispatch = createEventDispatcher();

  export let todos: TodoType[];
  let allChecked: boolean;

  const checkAll = () => {
    allChecked = !allChecked;
    dispatch("checkAll", allChecked);
  };

  const removeCompleted = () => dispatch("removeCompleted");

  // since this is like a computed property or function call as in SwiftUI which we want to be reactive on todos changes
  $: completedTodos = todos.filter((t) => t.completed).length;
  $: console.log("completedTodos in length", completedTodos);

  // since this is like a computed property or function call as in SwiftUI which we want to be reactive on todos changes
  $: {
    console.log("before length cal completed is", allChecked);
    allChecked = todos.length === completedTodos;
    console.log("after length cal completed is", allChecked);
  }
</script>

<div>
  <button
    type="button"
    class="px-5 py-3 rounded-lg shadow-lg bg-pink-800 text-white uppercase tracking-wider"
    disabled={todos.length === 0}
    on:click={checkAll}>{allChecked ? 'Uncheck' : 'Check'}
    all</button>
  <button
    type="button"
    class="px-5 py-3 rounded-lg shadow-lg bg-pink-800 text-white uppercase tracking-wider"
    disabled={completedTodos === 0}
    on:click={removeCompleted}>Remove completed</button>
</div>
