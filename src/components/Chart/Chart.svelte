<script lang="ts">
  import { LayerCake, Svg } from 'layercake';

  import Wrapper from './Wrapper.svg.svelte';

  const xKey = 'widthPercent';
  const yKey = 'costThousands';

  export let width: number;
  // export let height: number;
  export let padding = { top: 0, bottom: 0, left: 40, right: 40 };

  export let totalArea = 243000000;
  const storyLength = 100000;

  export let data: any[] = [
    {
      costThousands: 80,
      label: 'Your salary',
    },
    {
      costThousands: 1400,
      label: 'Two bedroom house in Sydney',
    },
    {
      costThousands: 504000,
      label: 'A new public hospital',
    },
  ];

  $: totalHeight = totalArea / width;
  $: console.log({ totalArea, width, totalHeight });
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
      <Svg>

        <Wrapper {totalArea} />

      </Svg>
    </LayerCake>
  {/if}
</div>

<style lang="scss">
</style>
