<script lang="ts">
  import { FilterEnum } from "../../types/filter.enum";
  export let filter: FilterEnum = FilterEnum.ALL;

  function updateFilter(val: FilterEnum) {
    filter = val;
  }
</script>

<div>
  <button
    class:btn__primary={filter === FilterEnum.ALL}
    aria-pressed={filter === FilterEnum.ALL}
    on:click={() => updateFilter(FilterEnum.ALL)}>
    <span>Show</span>
    <span>All</span>
    <span>tasks</span>
  </button>
  <button
    class:btn__primary={filter === FilterEnum.ACTIVE}
    aria-pressed={filter === FilterEnum.ACTIVE}
    on:click={() => updateFilter(FilterEnum.ACTIVE)}>
    <span>Show</span>
    <span>Active</span>
    <span>tasks</span>
  </button>
  <button
    class:btn__primary={filter === FilterEnum.COMPLETED}
    aria-pressed={filter === FilterEnum.COMPLETED}
    on:click={() => updateFilter(FilterEnum.COMPLETED)}>
    <span>Show</span>
    <span>Completed</span>
    <span>tasks</span>
  </button>
</div>
