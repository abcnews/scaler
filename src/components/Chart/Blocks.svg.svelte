<script lang="ts">
  import { getContext } from 'svelte';
  import { Svg, Html } from 'layercake';

  import { NUM_COLUMNS, COLOURS, GRID_PADDING, SQUARE_VALUE } from '../../constants';

  interface Marker {
    costThousands: number;
    label: string;
    labelHeight: number;
    continue?: boolean;
  }

  const { data, height, width } = getContext('LayerCake');

  $: gridSize = Math.floor($width / NUM_COLUMNS);
  $: gridWidth = Math.floor($width / gridSize);
  // $: console.log({ gridSize, gridWidth, width: $width });

  $: blocks = $data.reduce(({ progress, progressLabel, blocks }, item: Marker) => {
    const total = item.costThousands || 0;
    const numBlocks = total / SQUARE_VALUE;

    const numRows = Math.max(Math.ceil(numBlocks / NUM_COLUMNS), 1);

    const h = numRows * gridSize;
    const w = gridWidth * gridSize;

    const valueFromFullRows = (numRows - 1) * SQUARE_VALUE * gridWidth;
    const finalRowBlocks = Math.floor((total - valueFromFullRows) / SQUARE_VALUE);
    const valueFromFullBlocks = valueFromFullRows + finalRowBlocks * SQUARE_VALUE;
    const finalBlockPixels = Math.ceil((total - valueFromFullBlocks) / SQUARE_VALUE * (gridSize - GRID_PADDING));

    const newBlock = {
      width: w,

      top: progress,
      height: h,

      labelTop: progressLabel,
      labelHeight: item.labelHeight * gridSize,

      finalRowBlocks,
      finalBlockPixels,
      item,
      numBlocks,
    };

    if (item.continue) {
      return {
        blocks: [...blocks, newBlock],
        progress: progress + h + gridSize * 2,
        progressLabel: progressLabel + newBlock.labelHeight + gridSize * 2,
      };
    }

    // const nextLabel = item.continue ? progressLabel + newBlock.labelHeight : progress + h;

    return {
      blocks: [...blocks, newBlock],
      progress: progress + Math.max(h, newBlock.labelHeight) + gridSize * 2,
      progressLabel: progress + Math.max(h, newBlock.labelHeight) + gridSize * 2,
      // progressLabel: Math.max(progressLabel + newBlock.labelHeight, progress + h) + gridSize * 2,
    };
  }, { progress: 0, blocks: [] }).blocks;
</script>

<Svg>

  <pattern id="pattern-grid-bg" x="0" y="0" width={gridSize} height={gridSize} patternUnits="userSpaceOnUse">
    <rect
      x={GRID_PADDING / 2}
      y={GRID_PADDING / 2}
      width={gridSize - GRID_PADDING}
      height={gridSize - GRID_PADDING}
      fill={COLOURS.bg}
    >
  </pattern>
  <pattern id="pattern-grid-block" x="0" y="0" width={gridSize} height={gridSize} patternUnits="userSpaceOnUse">
    <rect
      x={GRID_PADDING / 2}
      y={GRID_PADDING / 2}
      width={gridSize - GRID_PADDING}
      height={gridSize - GRID_PADDING}
      fill={COLOURS.primary}
    >
  </pattern>

  <rect
    x={0}
    y={0}
    height={$height}
    width={gridWidth * gridSize}
    fill={'url(#pattern-grid-bg)'}
  />

  {#each blocks as block}
    <rect
      x={0}
      y={block.top}
      height={block.height - gridSize}
      width={block.width}
      fill={'url(#pattern-grid-block'}
    />
    {#if block.finalRowBlocks}
      <rect
        x={0}
        y={block.top + (block.height - gridSize)}
        height={gridSize}
        width={block.finalRowBlocks * gridSize}
        fill={'url(#pattern-grid-block'}
      />
    {/if}
    {#if block.finalBlockPixels}
      <rect
        x={block.finalRowBlocks * gridSize}
        y={block.top + (block.height - gridSize)}
        height={block.finalBlockPixels}
        width={gridSize}
        fill={'url(#pattern-grid-block'}
      />
    {/if}
  {/each}

  <!-- Waypoint markers for how much $$$ has been scrolled past -->
  {#if $height}
    {#each Array(Math.floor($height / (gridSize * 10))) as _, i}
      {#if i > 0}
        <text
          x={0}
          y={i * gridSize * 10 + gridSize / 2}
        >
          ${i * SQUARE_VALUE * NUM_COLUMNS / 1000 / 100}b
        </text>
      {/if}
    {/each}
  {/if}
</Svg>

<Html>
  <div class="labels">
    {#each blocks as block}
      <div
        class="block-label-wrapper"
        style="
          position: absolute;
          top: {block.labelTop}px;
          height: {block.labelHeight}px;
          width: {block.width}px;
          margin-top: {0}px;
          margin-bottom: {0}px;
          margin-left: {0}px;
          margin-right: {0}px;
        "
      >
        <div class="block-label">
          <p>{block.item.label}</p>
        </div>
      </div>
    {/each}
  </div>
</Html>

<style>
  .labels {
    position: relative;
  }
  .block-label {
    height: 100%;
    position: relative;
  }
  .block-label > p {
    position: sticky;
    top: 15px;
    padding: 30px;
    font-size: 14px;
    font-weight: 600;
    text-align: center;
  }
</style>
