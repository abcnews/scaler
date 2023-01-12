<script lang="ts">
  import Scrollyteller from './Scrollyteller/Scrollyteller.svelte';

  export let scrollyData: any;
</script>

{#if !!scrollyData}
  <Scrollyteller
    panels={scrollyData.panels}
  />
{/if}

<style lang="scss">
  @media only screen and (min-width: 1023px) {
    :global(.scrollyteller .st-panel) {
      margin-right: calc(30% - 24.75rem) !important;
      width: 49.5rem !important;
    }
    :global(.scrollyteller > .graphic) {
      padding: 2rem;
      width: calc(100% - 35% - 24.75rem) !important;
      overflow: visible !important;
    }
  }

  // Hide fallback images when scrollyteller is active
  :global([data-tag="startfallback"]) {
    display: none;
  }
</style>
