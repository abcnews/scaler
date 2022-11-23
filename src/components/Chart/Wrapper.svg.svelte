<script lang="ts">
  import { getContext } from 'svelte';

  import Block from './Block.svg.svelte';

  const { data, height, width, yDomain } = getContext('LayerCake');

  // TODO: Overlay for % of cuts that you benefit from

  // export let totalArea: number;

  // $: displayHeight = totalArea / $width;
</script>

<rect
  x={0}
  y={0}
  height={$height}
  width={$width}
  fill={'#6c97e8'}
/>


{#each $data as item, i}
  <Block {item} offset={i} />
{/each}
