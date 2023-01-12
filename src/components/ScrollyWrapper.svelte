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
  // Hide fallback images when scrollyteller is active
  :global([data-tag="startfallback"]) {
    display: none;
  }
</style>
