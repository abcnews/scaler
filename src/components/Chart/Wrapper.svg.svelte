<script lang="ts">
  import { getContext } from 'svelte';
  import { Svg, Html } from 'layercake';

  // import Block from './Block.svg.svelte';

  const { data, height, width, yGet } = getContext('LayerCake');

  // export let totalArea: number;

  // $: displayHeight = totalArea / $width;

  const PADDING_X = 20;
  const MARGIN_Y = 300;

  $: blocks = $data.reduce(({ progress, blocks }, item) => {
    const total = $yGet(item);
    const w = Math.min(Math.max(1, Math.sqrt(total)), $width - PADDING_X * 2);
    const h = total / w;
    const newBlock = {
      top: progress,
      width: w,
      height: h,
      item,
    };

    return {
      blocks: [...blocks, newBlock],
      progress: progress + h + MARGIN_Y,
    };
  }, { progress: 0, blocks: [] }).blocks;
</script>

<Svg>

  <pattern id="pattern-grid" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
    <rect x={5} y={5} width={30} height={30} fill='grey'>
  </pattern>

  <rect
    x={0}
    y={0}
    height={$height}
    width={$width}
    fill={'url(#pattern-grid)'}
  />

  {#each blocks as block}
    <rect
      x={PADDING_X}
      y={block.top}
      height={block.height}
      width={block.width}
      fill="red"
    />
  {/each}
</Svg>

<Html>
  {#each blocks as block}
    <div
      class="block-label-wrapper"
      style="
        height: {block.height}px;
        margin-bottom: {MARGIN_Y}px;
        margin-left: {PADDING_X + 10}px;
      "
    >
      <div class="block-label">
        <p>{block.item.label}</p>
      </div>
    </div>
  {/each}
</Html>

<style>
  .block-label {
    height: 100%;
    position: relative;
  }
  .block-label > p {
    position: sticky;
    top: 10px;
  }
</style>
