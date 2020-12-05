<script lang="ts">
  import { FilterEnum } from "../../types/filter.enum";
  export let filter: FilterEnum = FilterEnum.ALL;

  function updateFilter(val: FilterEnum) {
    filter = val;
  }
</script>

<div class="flex max-w-max">
  <button
    class:btn__primary={filter === FilterEnum.ALL}
    class="px-5 py-3 rounded-lg shadow-lg bg-pink-800 text-white uppercase tracking-wider"
    aria-pressed={filter === FilterEnum.ALL}
    on:click={() => updateFilter(FilterEnum.ALL)}>
    <span>Show</span>
    <span>All</span>
    <span>tasks</span>
  </button>
  <button
    class:btn__primary={filter === FilterEnum.ACTIVE}
    class="px-5 py-3 rounded-lg shadow-lg bg-pink-800 text-white uppercase tracking-wider"
    aria-pressed={filter === FilterEnum.ACTIVE}
    on:click={() => updateFilter(FilterEnum.ACTIVE)}>
    <span>Show</span>
    <span>Active</span>
    <span>tasks</span>
  </button>
  <button
    class:btn__primary={filter === FilterEnum.COMPLETED}
    class="px-5 py-3 rounded-lg shadow-lg bg-pink-800 text-white uppercase tracking-wider"
    aria-pressed={filter === FilterEnum.COMPLETED}
    on:click={() => updateFilter(FilterEnum.COMPLETED)}>
    <span>Show</span>
    <span>Completed</span>
    <span>tasks</span>
  </button>
</div>
