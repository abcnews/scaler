<script lang="ts">
  import { getContext } from 'svelte';
  import { Svg, Html } from 'layercake';

  import {
    NUM_COLUMNS,
    COLOURS,
    GRID_PADDING,
    DIVIDER_VALUE,
    DIVIDER_ROWS,
    SQUARE_VALUE,
  } from '../../constants';

  import Grid from './Grid.svg.svelte';
  import Label from './Label.svelte';

  interface Marker {
    costThousands: number;
    label: string;
    labelHeight: number;
    continue?: boolean;
    state: string;
  }

  const { data, height, width } = getContext('LayerCake');
  export let gridSize: number;
  export let gridOverflow: number;
  export let dividerLineOffset: number;
  export let labels: any[];

  export let zoomOut: boolean;

  $: totalRows = $height / gridSize;

  // Leave one block of gutter on each side
  $: numBlocksPerRow = Math.floor($width / gridSize) - 2;

  $: dividerRow = Math.round(DIVIDER_VALUE / (NUM_COLUMNS * SQUARE_VALUE));

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
      heightBlocks={totalRows - dividerRow - DIVIDER_ROWS + 1}
      widthBlocks={NUM_COLUMNS}
      offsetBlocks={zoomOut ? dividerRow : dividerRow + DIVIDER_ROWS - 1}
      {gridSize}
      useGrid={!zoomOut}
      colour={COLOURS.bgRed}
    />

    {#if !zoomOut}
      <!-- Blocks (don't refactor until we've decided on gutters + alignment) -->
      {#each blocks as block}

        <!-- BoM rebrand cost is so small we want to push it down and label it -->
        {@const isBom = block.item.costThousands && block.item.costThousands < 500}
        {@const bomCustomOffsetX = isBom ? Math.floor(80 / gridSize) * gridSize * 0 : 0}
        {@const bomCustomOffsetY = isBom ? gridSize * 20 : 0}

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
            x={(block.finalRowBlocks + 1) * gridSize + bomCustomOffsetX}
            y={block.top + (block.height - gridSize) + bomCustomOffsetY}
            height={block.finalBlockPixels}
            width={gridSize}
            fill={getBlockColour(zoomOut, block.top)}
          />

          {#if isBom}
            <g
              transform={`translate(${(block.finalRowBlocks + 1) * gridSize * 1.5}, ${block.top + (block.height - gridSize) + bomCustomOffsetY - 15})`}
            >
              <text
                class="bom-label"
                x={0}
                y={-45}
              >
                Hey!
              </text>
              <text
                class="bom-label"
                x={0}
                y={-27}
              >
                Over
              </text>
              <text
                class="bom-label"
                x={0}
                y={-10}
              >
                here!
              </text>

            
              <g
                transform={`translate(${-5}, ${0})`}
              >
                <path
                  d="M3.64645 10.3536C3.84171 10.5488 4.15829 10.5488 4.35355 10.3536L7.53553 7.17157C7.7308 6.97631 7.7308 6.65973 7.53553 6.46447C7.34027 6.2692 7.02369 6.2692 6.82843 6.46447L4 9.29289L1.17157 6.46447C0.976311 6.2692 0.659729 6.2692 0.464466 6.46447C0.269204 6.65973 0.269204 6.97631 0.464466 7.17157L3.64645 10.3536ZM3.5 2.18557e-08L3.5 10L4.5 10L4.5 -2.18557e-08L3.5 2.18557e-08Z"
                  fill="white"
                  stroke="white"
                />
              </g>
            </g>
          {/if}
        {/if}
      {/each}
    {/if}

  </g>
</Svg>

<Html>
  {#if !zoomOut}
    <div class="labels">
      {#each blocks as block}
        {@const state = block.item.state}
        {@const offsetDocked = (state === 'docked' || state === 'showarrow' || state === 'colourchange') ? dividerLineOffset : 0}
        {@const offsetDivider = (state === 'colourchange') ? Math.ceil(55 / gridSize) : 0}

        <Label
          {block}
          {gridSize}
          {gridOverflow}
          offsetBlocks={offsetDocked + offsetDivider}
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

  .bom-label {
    font-family: "ABCSans", Helvetica, sans-serif;
    font-style: italic;
    font-weight: 400;
    font-size: 12px;
    text-anchor: middle;
    fill: white;
  }
</style>
