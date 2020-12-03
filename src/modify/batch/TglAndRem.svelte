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
</style>

<div class="btn-group">
  <button
    type="button"
    class="btn btn__primary"
    disabled={todos.length === 0}
    on:click={checkAll}>{allChecked ? 'Uncheck' : 'Check'}
    all</button>
  <button
    type="button"
    class="btn btn__primary"
    disabled={completedTodos === 0}
    on:click={removeCompleted}>Remove completed</button>
</div>
