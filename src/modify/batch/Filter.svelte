<script lang="ts">
  import { FilterEnum } from "../../types/filter.enum";
  export let filter: FilterEnum = FilterEnum.ALL;

  function updateFilter(val: FilterEnum) {
    filter = val;
  }
</script>

<div class="filters btn-group stack-exception">
  <button
    class="btn toggle-btn"
    class:btn__primary={filter === FilterEnum.ALL}
    aria-pressed={filter === FilterEnum.ALL}
    on:click={() => updateFilter(FilterEnum.ALL)}>
    <span class="visually-hidden">Show</span>
    <span>All</span>
    <span class="visually-hidden">tasks</span>
  </button>
  <button
    class="btn toggle-btn"
    class:btn__primary={filter === FilterEnum.ACTIVE}
    aria-pressed={filter === FilterEnum.ACTIVE}
    on:click={() => updateFilter(FilterEnum.ACTIVE)}>
    <span class="visually-hidden">Show</span>
    <span>Active</span>
    <span class="visually-hidden">tasks</span>
  </button>
  <button
    class="btn toggle-btn"
    class:btn__primary={filter === FilterEnum.COMPLETED}
    aria-pressed={filter === FilterEnum.COMPLETED}
    on:click={() => updateFilter(FilterEnum.COMPLETED)}>
    <span class="visually-hidden">Show</span>
    <span>Completed</span>
    <span class="visually-hidden">tasks</span>
  </button>
</div>
