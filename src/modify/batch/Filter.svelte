<script lang="ts">
  import { FilterEnum } from "../../types/filter.enum";
  export let filter: FilterEnum = FilterEnum.ALL;

  function updateFilter(val: FilterEnum) {
    filter = val;
  }
</script>

<style>
  .btn {
    padding: 0.8rem 1rem 0.7rem;
    border: 0.2rem solid #4d4d4d;
    cursor: pointer;
    text-transform: capitalize;
  }
  .btn.toggle-btn {
    border-width: 1px;
    border-color: #d3d3d3;
  }
  .btn.toggle-btn[aria-pressed="true"] {
    text-decoration: underline;
    border-color: #4d4d4d;
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
  .visually-hidden {
    position: absolute !important;
    height: 1px;
    width: 1px;
    overflow: hidden;
    clip: rect(1px 1px 1px 1px);
    clip: rect(1px, 1px, 1px, 1px);
    white-space: nowrap;
  }
  [class*="stack"] > * {
    margin-top: 0;
    margin-bottom: 0;
  }
  /* END GLOBAL STYLES */

  .filters {
    width: 100%;
    margin: unset auto;
  }
  /* CHECKBOX STYLES */
</style>

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
