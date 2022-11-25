<script lang="ts">
  import { LayerCake } from 'layercake';

  import Wrapper from './Wrapper.svg.svelte';

  const xKey = 'widthPercent';
  const yKey = 'costThousands';

  export let width: number;
  // export let height: number;
  export let padding = { top: 0, bottom: 0, left: 40, right: 40 };

  export let totalArea = 243_000_000 * 1;
  const storyLength = 90_000;

  export let data: any[] = [
    {
      costThousands: 160,
      label: 'Your tax bill over 10 years (160k)',
    },
    {
      costThousands: 10,
      label: 'Your savings from the tax cut over 10 years (10k)',
    },
    {
      costThousands: 90,
      label: 'Savings from the tax cut over 10 years for a CEO (90k)',
    },
    {
      costThousands: 1400,
      label: 'Two bedroom house in Sydney (1.4 m)',
    },
    {
      costThousands: 190_000,
      label: 'A new green bridge in Brisbane (190 m)',
    },
    {
      costThousands: 2_000_000,
      label: 'Fiona Stanley Hospital in Perth (2 b)',
    },
    {
      costThousands: 2_000_000,
      label: 'Westconnex motorway in Sydney (2 b)',
    },
    {
      costThousands: 5_000_000,
      label: 'Hosting the 2035 olympics in Brisbane (5 b)',
    },
    {
      costThousands: 0,
      label: 'Combined tax cuts for all Australians making under $45,000 (0)',
    },
    {
      costThousands: 10_000_000,
      label: 'Mental health in medicare (10 b)',
    },
    {
      costThousands: 12_000_000,
      label: 'Household electrification program (12 b)',
    },
    {
      costThousands: 30_000_000,
      label: '25% pay rise for aged care workers (30 b)',
    },
    {
      costThousands: 70_000_000,
      label: 'Free university for domestic students (70 b)',
    },
  ];

  $: totalHeight = totalArea / width;
  $: console.log({ totalArea, width, totalHeight, storyLength });
</script>

<div
  class="chart-container"
  style="
    width: {width}px;
    height: {storyLength}px;
    margin: auto;
  ">

  {#if width && totalHeight}
    <LayerCake
      {padding}
      x={xKey}
      y={yKey}
      yDomain={[0, totalHeight]}
      yRange={[0, storyLength]}
      {data}
    >

      <Wrapper {totalArea} />
    </LayerCake>
  {/if}
</div>

<style lang="scss">
</style>
