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
</script>

<div
  style="
    position: relative;
    top: {(Math.round(1000 * offsetValue / (NUM_COLUMNS * SQUARE_VALUE)) - 1) * gridSize}px;
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
      height: {2 * gridSize}px;
    "
  >
    <svg style="width:100%;height:100%;">
      <g style="transform: translateX({gridOverflow / 2}px);">
        <Grid
          id="bg-floating"
          offsetBlocks={0}
          heightBlocks={2}
          widthBlocks={NUM_COLUMNS}
          colour={COLOURS.bg}
          {gridSize}
        />
      </g>
    </svg>

    <div
      style="
        position: absolute;
        top: {2 * gridSize - 22}px;
        font-size: 18px;
      "
    >
      {label}
    </div>
    <div
      style="
        position: absolute;
        top: {2 * gridSize}px;
        left: -20px;
        height: 6px;
        width: 100%;
        background: black;
      "
    />
  </div>
</div>

<style>
</style>
