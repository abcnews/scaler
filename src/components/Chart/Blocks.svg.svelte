<script lang="ts">
  import { getContext } from 'svelte';
  import type { Action } from 'svelte/action';
  import { Svg, Html } from 'layercake';

  import { NUM_COLUMNS, COLOURS, GRID_PADDING, FIRST_DIVIDER, ROWS_PER_MARKER, SQUARE_VALUE, FIRST_MARKER_VALUE } from '../../constants';

  interface Marker {
    costThousands: number;
    label: string;
    labelHeight: number;
    continue?: boolean;
  }

  const { data, height, width } = getContext('LayerCake');

  // How many pixels wide each box in the grid is
  $: gridSize = Math.floor($width / NUM_COLUMNS);
  $: gridOverflow = $width - gridSize * NUM_COLUMNS;

  // Leave one block of gutter on each side
  $: numBlocksPerRow = Math.floor($width / gridSize) - 2;

  $: blocks = $data.reduce(({ progress, progressLabel, blocks }, item: Marker) => {
    const total = item.costThousands || 0;
    const numBlocks = total / SQUARE_VALUE;

    const numRows = Math.max(Math.ceil(numBlocks / numBlocksPerRow), 1);

    const h = numRows * gridSize;
    const w = numBlocksPerRow * gridSize;

    const valueFromFullRows = (numRows - 1) * SQUARE_VALUE * numBlocksPerRow;
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

  const children: Action<Element, Node[]> = (el, chn) => {
    chn.forEach((node) => el.appendChild(node));

    return {
      destroy() {
        chn.forEach((node) => el.removeChild(node));
      }
    };
  };
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

  <g style="transform: translateX({gridOverflow / 2}px);">
    <rect
      x={0}
      y={0}
      height={$height}
      width={NUM_COLUMNS * gridSize}
      fill={'url(#pattern-grid-bg)'}
    />

    {#each blocks as block}
      <rect
        x={gridSize}
        y={block.top}
        height={block.height - gridSize}
        width={block.width}
        fill={'url(#pattern-grid-block'}
      />
      {#if block.finalRowBlocks}
        <rect
          x={gridSize}
          y={block.top + (block.height - gridSize)}
          height={gridSize}
          width={block.finalRowBlocks * gridSize}
          fill={'url(#pattern-grid-block'}
        />
      {/if}
      {#if block.finalBlockPixels}
        <rect
          x={(block.finalRowBlocks + 1) * gridSize}
          y={block.top + (block.height - gridSize)}
          height={block.finalBlockPixels}
          width={gridSize}
          fill={'url(#pattern-grid-block'}
        />
      {/if}
    {/each}

    <!-- Waypoint markers for how much $$$ has been scrolled past -->
    {#if $height}
      {#each Array(Math.floor($height / (gridSize * ROWS_PER_MARKER))) as _, i}
        {#if (i * SQUARE_VALUE * NUM_COLUMNS / 100) > FIRST_MARKER_VALUE}
          <text
            class="waypoint"
            x={0}
            y={i * gridSize * ROWS_PER_MARKER + gridSize / 2}
          >
            ${i * SQUARE_VALUE * NUM_COLUMNS * ROWS_PER_MARKER / 100 / 100 / 100}b
          </text>
        {/if}
      {/each}
    {/if}

    <text
      x={0}
      y={Math.round(1000 * FIRST_DIVIDER / (NUM_COLUMNS * SQUARE_VALUE)) * gridSize - 5}
      style="
        font-size: 18px;
      "
    >
      $53 billion
    </text>
    <rect
      x={-20}
      y={Math.round(1000 * FIRST_DIVIDER / (NUM_COLUMNS * SQUARE_VALUE)) * gridSize}
      width={NUM_COLUMNS * gridSize + 40}
      height={6}
      fill={'black'}
    />
  </g>
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
          left: {gridSize + gridOverflow / 2}px;
          margin: 0px;
        "
      >
        <div
          class="block-label"
          use:children={block.item.nodes || []}
        />
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
  :global(.block-label > p) {
    position: sticky;
    top: 15px;
    padding: 5px;
    padding-left: 35px;
    padding-right: 35px;
    font-size: 15px;
    font-weight: 600;
    text-align: center;
  }
  .waypoint {
    font-family: ABCSans, Helvetica, sans-serif;
  }
</style>
