<script lang="ts">
  import {
    NUM_COLUMNS,
    COLOURS,
    SQUARE_VALUE,
  } from '../../constants';

  import Grid from './Grid.svg.svelte';

  export let offsetValue: number;
  export let gridSize: number;
  export let gridOverflow: number;
  export let label: string;

  // How many rows from the top to dock the divider line
  export let lineOffset: number;
  export let length: number;

  const LINE_WIDTH = 4;
</script>

<div
  style="
    position: relative;
    top: {(Math.round(offsetValue / (NUM_COLUMNS * SQUARE_VALUE)) - 1) * gridSize}px;
    left: 0;
    width: {NUM_COLUMNS * gridSize + 20}px;
    height: {gridSize * length + 1}px;
  "
>

  <div
    style="
      position: sticky;
      top: 0px;
      left: 0px;
      width: 100%;
      height: 100vh;
      z-index: 6;
    "
  >
    <svg style="width:100%;height:{lineOffset * gridSize}px;">
      <g style="transform: translateX({gridOverflow / 2}px);">
        <Grid
          id="bg-floating-above"
          offsetBlocks={0}
          heightBlocks={lineOffset}
          widthBlocks={NUM_COLUMNS}
          colour={COLOURS.bg}
          useGrid={true}
          {gridSize}
        />
      </g>
    </svg>

    <div
      style="
        position: absolute;
        top: {lineOffset * gridSize - 30}px;
        text-align: center;
        margin: auto;
        width: 200px;
        right: 0;
        left: -10px;
        width: 200px;
        font-size: 24px;
        color: white;
        font-family: ABCSans;
        font-weight: 500;
      "
    >
      {label}
    </div>
    <div
      style="
        position: absolute;
        top: {lineOffset * gridSize - (LINE_WIDTH / 2)}px;
        left: 0px;
        height: {LINE_WIDTH}px;
        width: 100%;
        background: white;
      "
    />
  </div>
</div>

<div
  style="
    position: relative;
    top: {(Math.round(offsetValue / (NUM_COLUMNS * SQUARE_VALUE)) - 1) * gridSize}px;
    left: 0;
    width: {NUM_COLUMNS * gridSize + 20}px;
    height: {gridSize * length + 1}px;
    transform: translateY(-{gridSize * length}px);
  "
>
  <div
    style="
      position: sticky;
      left: 0px;
      top: {gridSize * length}px;
      width: 100%;
      height: 100vh;
    "
  >
    <svg style="width:100%;height:100%;">
      <g style="transform: translateX({gridOverflow / 2}px);">
        <Grid
          id="bg-floating-below"
          offsetBlocks={lineOffset}
          heightBlocks={length - lineOffset}
          widthBlocks={NUM_COLUMNS}
          colour={COLOURS.bg}
          useGrid={true}
          {gridSize}
        />
      </g>
    </svg>
  </div>

</div>

<style>
</style>
