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

<Alert {ms} />

<!-- 
  <Todos todos={todos} />
  <Todos {todos} /> -- shortcut
  <Todos bind:todos={todos} />
  <Todos bind:todos /> --shortcut
-->
<Todos bind:todos={$todos} />
