<script lang="ts">
  import { setContext } from 'svelte';
  import { writable } from 'svelte/store';
  // import { decode } from '@abcnews/base-36-props';

  // import { Customisation } from '../types';
  import { defaultCustomisation } from '../constants';

  // import Scrollyteller from './Scrollyteller/Scrollyteller.svelte';
  import Chart from './Chart/Chart.svelte';

  // export let customisation: Customisation;
  export let scrollyData: any;

  // Create store for controlling the chart
  const stateStore = writable<any>({ ...defaultCustomisation });
  setContext('customisation', stateStore);

  // let updateState = ((marker: any) => {
  //   if (marker.state) {
  //     const state: Partial<Customisation> = decode(marker.state);
  //     stateStore.set({ ...defaultCustomisation, ...state });
  //   }
  // });

</script>

{#if !!scrollyData}
  <Chart
    width={800}
    data={[]}
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
