<script lang="ts">
  import Todo from "../modify/Todo.svelte";
  import NewTodo from "../modify/NewTodo.svelte";
  import ToggleAndRemoveCompleted from "../modify/batch/TglAndRem.svelte";
  import FilterButton from "../modify/batch/Filter.svelte";
  import TodosStatus from "../modify/batch/TodosStatus.svelte";
  import { alert } from "../store/store";
  import { FilterEnum } from "../types/filter.enum";
  import type { TodoType } from "../types/todo.type";

  export let todos: TodoType[] = [];
  let autoFocus = true;
  let todosStatus: TodosStatus;
  $: totalTodos = todos.length;

  let newTodoName = "";
  $: console.log("newTodoName: ", newTodoName);

  let newTodoId: number;
  $: {
    if (totalTodos === 0) {
      newTodoId = 1;
    } else {
      newTodoId = Math.max(...todos.map((t) => t.id)) + 1;
    }
  }

  function addTodo(name: string) {
    todos = [...todos, { id: newTodoId, name: name, completed: false }];
    $alert = `Todo '${name}' has been added`;
  }

  function removeTodo(todo: TodoType) {
    todos = todos.filter((t) => t.id !== todo.id);
    console.log("todosStatus is", todosStatus);
    todosStatus.focus();
    $alert = `Todo '${todo.name}' has been deleted`;
  }

  function updateTodo(todo: TodoType) {
    const i = todos.findIndex((t) => t.id === todo.id);
    if (todos[i].name !== todo.name)
      $alert = `todo '${todos[i].name}' has been renamed to '${todo.name}'`;
    if (todos[i].completed !== todo.completed)
      $alert = `todo '${todos[i].name}' marked as ${
        todo.completed ? FilterEnum.COMPLETED : FilterEnum.ACTIVE
      }`;
    todos[i] = { ...todos[i], ...todo };
  }

  // Defined here in Embedder to pass to embedded as in Go we can explicitly call Embedded methods
  let filter: FilterEnum = FilterEnum.ALL;

  $: {
    if (filter === FilterEnum.ALL) $alert = "Browsing all todos";
    else if (filter === FilterEnum.ACTIVE) $alert = "Browsing active todos";
    else if (filter === FilterEnum.COMPLETED)
      $alert = "Browsing completed todos";
  }

  const filterTodos = (filter: FilterEnum, todos: TodoType[]) => {
    if (filter === FilterEnum.ACTIVE) {
      return todos.filter((t: TodoType) => !t.completed);
    }
    if (filter === FilterEnum.COMPLETED) {
      return todos.filter((t: TodoType) => t.completed);
    }
    return todos;
  };

  // const checkAllTodos = (completed) => {
  //   todos.forEach((t) => (t.completed = completed));
  //   todos = todos;
  // };

  const checkAllTodos = (completed: boolean) => {
    todos.forEach((_, i) => (todos[i].completed = completed));
    $alert = `${completed ? "Checked" : "Unchecked"} ${todos.length} todos`;
  };

  const removeCompletedTodos = () => {
    $alert = `Removed ${todos.filter((t) => t.completed).length} todos`;
    todos = todos.filter((t) => !t.completed);
    todosStatus.focus();
  };
</script>

<style>
  .todoapp {
    background: #fff;
    margin: 2rem 0 4rem 0;
    padding: 1rem;
    position: relative;
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2),
      0 2.5rem 5rem 0 rgba(0, 0, 0, 0.1);
  }
  @media screen and (min-width: 550px) {
    .todoapp {
      padding: 4rem;
    }
  }
  .todoapp > * {
    max-width: 50rem;
    margin-left: auto;
    margin-right: auto;
  }

  /* Todo item styles */
  .todo {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
  }
</style>

<div class="todoapp stack-large">
  <!-- NewTodo -->
  <NewTodo {autoFocus} on:addTodo={(e) => addTodo(e.detail)} />

  <FilterButton bind:filter />

  <!-- TodosStatus -->
  <TodosStatus bind:this={todosStatus} {todos} />

  <!-- Todos -->
  <ul role="list" class="todo-list stack-large" aria-labelledby="list-heading">
    {#each filterTodos(filter, todos) as todo (todo.id)}
      <li class="todo">
        <Todo
          {todo}
          on:remove={(e) => {
            console.log('e.detail is', e.detail);
            removeTodo(e.detail);
          }}
          on:update={(e) => updateTodo(e.detail)} />
      </li>
    {:else}
      <li>Nothing to do here!</li>
    {/each}
  </ul>

  <hr />

  <!-- MoreActions -->
  <ToggleAndRemoveCompleted
    {todos}
    on:checkAll={(e) => checkAllTodos(e.detail)}
    on:removeCompleted={removeCompletedTodos} />
</div>
