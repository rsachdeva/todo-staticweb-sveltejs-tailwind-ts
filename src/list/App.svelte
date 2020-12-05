<!-- App.svelte -->
<script lang="ts">
  import Todos from "./Todos.svelte";
  import Alert from "../alert/Alert.svelte";
  import { todos } from "../store/store";

  const ms = 2000;

  console.log("App svelte todos directly store reference - todos:", todos);
  console.log("App svelte todos store content - $todos:", $todos);

  $: console.log("****App svelte todos:", $todos);
  // $todos = [{id: 11, name: 'bad', completed: false}]
</script>

<style global lang="postcss">
  /* https://github.com/tailwindlabs/tailwindcss.com/issues/578 */
  /* https://tailwindcss.com/docs/optimizing-for-production#purging-specific-layers purges all layers by default */
  @tailwind base;
  @tailwind components;

  .btn {
    @apply px-5 py-3 rounded-lg shadow-lg bg-pink-800 hover:bg-pink-500 focus:outline-none focus:ring-4 focus:ring-gray-900 focus:bg-pink-300 m-3 text-white uppercase tracking-wider;
  }
  @tailwind utilities;
</style>

<Alert {ms} />

<!-- 
  <Todos todos={todos} />
  <Todos {todos} /> -- shortcut
  <Todos bind:todos={todos} />
  <Todos bind:todos /> --shortcut
-->
<Todos bind:todos={$todos} />
