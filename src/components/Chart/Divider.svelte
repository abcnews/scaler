<script lang="ts">
  import {
    NUM_COLUMNS,
    COLOURS,
    SQUARE_VALUE,
  } from '../../constants';

  import Grid from './Grid.svg.svelte';

  export let offsetValue: number;
  export let heightBlocks: number;
  export let gridSize: number;
  export let gridOverflow: number;
  export let label: string;
  export let numBars: number;
</script>

<div
  style="
    position: relative;
    top: {(Math.round(offsetValue / (NUM_COLUMNS * SQUARE_VALUE)) - 1) * gridSize}px;
    left: 0;
    width: {NUM_COLUMNS * gridSize + 40}px;
    height: {gridSize * heightBlocks}px;
  "
>

  <div
    style="
      position: sticky;
      top: 0px;
      left: 0px;
      width: 100%;
      height: {numBars * gridSize}px;
      z-index: 6;
    "
  >
    <svg style="width:100%;height:100%;">
      <g style="transform: translateX({gridOverflow / 2}px);">
        <Grid
          id="bg-floating"
          offsetBlocks={0}
          heightBlocks={numBars}
          widthBlocks={NUM_COLUMNS}
          colour={COLOURS.bg}
          {gridSize}
        />
      </g>
    </svg>

    <div
      style="
        position: absolute;
        top: {numBars * gridSize - 22}px;
        font-size: 18px;
      "
    >
      {label}
    </div>
    <div
      style="
        position: absolute;
        top: {numBars * gridSize}px;
        left: -20px;
        height: 6px;
        width: 100%;
        background: black;
      "
    />
  </div>

  <div style="height:{gridSize * (heightBlocks - numBars * 2)}px; width:100%;" />

  <div
    style="
      position: sticky;
      position: -webkit-sticky;
      bottom: 0px;
      left: 0px;
      width: 100%;
      height: {numBars * gridSize}px;
      z-index: 5;
    "
  >
    <svg style="width:100%;height:100%;">
      <g style="transform: translateX({gridOverflow / 2}px);">
        <Grid
          id="bg-floating"
          offsetBlocks={0}
          heightBlocks={numBars}
          widthBlocks={NUM_COLUMNS}
          colour={COLOURS.bg}
          {gridSize}
        />
      </g>
    </svg>
  </div>


</div>

<style>
</style>
