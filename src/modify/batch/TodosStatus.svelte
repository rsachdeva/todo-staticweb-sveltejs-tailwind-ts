<script lang="ts">
  import type { TodoType } from "../../types/todo.type";

  export let todos: TodoType[];

  $: totalTodos = todos.length;
  $: completedTodos = todos.filter((todo) => todo.completed).length;

  let headingEl: HTMLElement;

  export function focus() {
    // shorter version: export const focus = () => headingEl.focus()
    headingEl.focus();
  }
</script>

<h2
  id="list-heading"
  bind:this={headingEl}
  tabindex={-1}
  class="text-yellow-600 my-10 text-4xl">
  {completedTodos}
  out of
  {totalTodos}
  items completed
</h2>
