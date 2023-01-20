<script lang="ts">
  import { getContext } from 'svelte';
  import { Svg, Html } from 'layercake';

  import {
    NUM_COLUMNS,
    COLOURS,
    GRID_PADDING,
    FIRST_DIVIDER,
    FIRST_DIVIDER_ROWS,
    SQUARE_VALUE,
  } from '../../constants';

  import Grid from './Grid.svg.svelte';
  import Label from './Label.svelte';

  interface Marker {
    costThousands: number;
    label: string;
    labelHeight: number;
    continue?: boolean;
  }

  const { data, height, width } = getContext('LayerCake');
  export let gridSize: number;
  export let gridOverflow: number;
  export let dividerLineOffset: number;
  export let zoomOut: boolean;
  export let labels: any[];

  $: totalRows = $height / gridSize;

  // Leave one block of gutter on each side
  $: numBlocksPerRow = Math.floor($width / gridSize) - 2;

  $: dividerRow = Math.round(FIRST_DIVIDER / (NUM_COLUMNS * SQUARE_VALUE));

  $: blocks = $data.reduce(({ progress, progressLabel, blocks }, item: Marker) => {
    const total = item.costThousands || 0;
    const numBlocks = total / (1000 * SQUARE_VALUE);

    const numRows = Math.max(Math.ceil(numBlocks / numBlocksPerRow), 1);

    const h = numRows * gridSize;
    const w = numBlocksPerRow * gridSize;

    const valueFromFullRows = (numRows - 1) * (1000 * SQUARE_VALUE) * numBlocksPerRow;
    const finalRowBlocks = Math.floor((total - valueFromFullRows) / (1000 * SQUARE_VALUE));
    const valueFromFullBlocks = valueFromFullRows + finalRowBlocks * (1000 * SQUARE_VALUE);
    const finalBlockPixels = Math.ceil((total - valueFromFullBlocks) / (1000 * SQUARE_VALUE) * (gridSize - GRID_PADDING));

    const newBlock = {
      width: w,

      top: progress,
      height: h,

      labelTop: progressLabel,
      labelHeight: (item.labelHeight || 1) * gridSize,

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

    return {
      blocks: [...blocks, newBlock],
      progress: progress + Math.max(h, newBlock.labelHeight) + gridSize * 2,
      progressLabel: progress + Math.max(h, newBlock.labelHeight) + gridSize * 2,
    };
  }, { progress: gridSize * 2, progressLabel: gridSize * 2, blocks: [] }).blocks;

  const getBlockColour = (zOut: boolean, blockTop: number) => {
    if (zOut) {
      return blockTop > (dividerRow * gridSize) ? COLOURS.blocksRed : COLOURS.blocks;
    }

    return blockTop > (dividerRow * gridSize) ? 'url(#pattern-grid-block-red)' : 'url(#pattern-grid-block)';
  }
</script>

<Svg>

  {#if !zoomOut}
    <pattern id="pattern-grid-block" x="0" y="0" width={gridSize} height={gridSize} patternUnits="userSpaceOnUse">
      <rect
        x={GRID_PADDING / 2}
        y={GRID_PADDING / 2}
        width={gridSize - GRID_PADDING}
        height={gridSize - GRID_PADDING}
        fill={COLOURS.blocks}
      >
    </pattern>

    <pattern id="pattern-grid-block-red" x="0" y="0" width={gridSize} height={gridSize} patternUnits="userSpaceOnUse">
      <rect
        x={GRID_PADDING / 2}
        y={GRID_PADDING / 2}
        width={gridSize - GRID_PADDING}
        height={gridSize - GRID_PADDING}
        fill={COLOURS.blocksRed}
      >
    </pattern>
  {/if}

  <g style="transform: translateX({gridOverflow / 2}px);">

    <!-- Background grid before divider -->
    <Grid
      id="bg"
      heightBlocks={dividerRow - 1}
      widthBlocks={NUM_COLUMNS}
      offsetBlocks={0}
      {gridSize}
      useGrid={!zoomOut}
      colour={COLOURS.bg}
    />

    <!-- Background grid after divider -->
    <Grid
      id="bg2"
      heightBlocks={totalRows - dividerRow - FIRST_DIVIDER_ROWS + 1}
      widthBlocks={NUM_COLUMNS}
      offsetBlocks={zoomOut ? dividerRow : dividerRow + FIRST_DIVIDER_ROWS - 1}
      {gridSize}
      useGrid={!zoomOut}
      colour={COLOURS.bgRed}
    />

    <!-- Blocks (don't refactor until we've decided on gutters + alignment) -->
    {#each blocks as block}
      <rect
        x={gridSize}
        y={block.top}
        height={block.height - gridSize}
        width={block.width}
        fill={getBlockColour(zoomOut, block.top)}
      />
      {#if block.finalRowBlocks}
        <rect
          x={gridSize}
          y={block.top + (block.height - gridSize)}
          height={gridSize}
          width={block.finalRowBlocks * gridSize}
          fill={getBlockColour(zoomOut, block.top)}
        />
      {/if}
      {#if block.finalBlockPixels}
        <rect
          x={(block.finalRowBlocks + 1) * gridSize}
          y={block.top + (block.height - gridSize)}
          height={block.finalBlockPixels}
          width={gridSize}
          fill={getBlockColour(zoomOut, block.top)}
        />
      {/if}
    {/each}

    <!-- Waypoint markers for how much $$$ has been scrolled past -->
    <!-- {#if $height} -->
    <!--   {#each Array(Math.floor($height / (gridSize * ROWS_PER_MARKER))) as _, i} -->
    <!--  -->
    <!--     {#if (i * SQUARE_VALUE * NUM_COLUMNS * ROWS_PER_MARKER) >= FIRST_DIVIDER &#38;&#38; (i * SQUARE_VALUE * NUM_COLUMNS * ROWS_PER_MARKER) <= TOTAL_VALUE} -->
    <!--       <rect -->
    <!--         x={-30} -->
    <!--         y={i * gridSize * ROWS_PER_MARKER + FIRST_DIVIDER_ROWS * gridSize} -->
    <!--         width={60} -->
    <!--         height={2} -->
    <!--         fill="black" -->
    <!--       /> -->
    <!--       <text -->
    <!--         class="waypoint" -->
    <!--         x={-5} -->
    <!--         y={i * gridSize * ROWS_PER_MARKER + FIRST_DIVIDER_ROWS * gridSize - 5} -->
    <!--       > -->
    <!--         ${i * SQUARE_VALUE * NUM_COLUMNS * ROWS_PER_MARKER / 10 / 100} billion -->
    <!--       </text> -->
    <!--     {/if} -->
    <!--   {/each} -->
    <!-- {/if} -->

  </g>
</Svg>

<Html>
  {#if !zoomOut}
    <div class="labels">
      {#each blocks as block}
        <Label
          {block}
          {gridSize}
          {gridOverflow}
          {dividerLineOffset}
          {labels}
        />
      {/each}
    </div>
  {/if}
</Html>

<style>
  .labels {
    position: relative;
    z-index: 4;
  }
</style>
