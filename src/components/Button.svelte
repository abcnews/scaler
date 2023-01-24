<script lang="ts">
  export let disabled = false;
  export let label: string;
  export let onClick = () => { return };
</script>

<button
  class="button"
  class:disabled={disabled}
  on:click={onClick}
>
  {label}
</button>

<style lang="scss">
  .button {

    &.disabled {
      cursor: none;
    }

    flex: 1;

    font-family: 'ABCSans';
    color: black;
    display: inline-block;
    background: rgba(217, 217, 217, 1);
    font-size: 0.875rem;
    font-weight: bold;
    height: 48px;
    margin: 0;
    text-align: center;
    vertical-align: middle;
    cursor: pointer;
    border: 1px solid;
    border-color: rgba(0, 0, 0, 0.6);
    transition: var(--dls-link-transition);
    touch-action: manipulation;

    border-radius: 0;
  }
</style>
