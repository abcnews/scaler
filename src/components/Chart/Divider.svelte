<script lang="ts">
  import { fly, fade } from 'svelte/transition';
  import { tweened } from 'svelte/motion';
  import { interpolateLab } from 'd3-interpolate';

  const bgColours = [
    COLOURS.bg,
    COLOURS.bgRed
  ];

  const colour = tweened(bgColours[0], {
      duration: 300,
      interpolate: interpolateLab
  });

  import {
    NUM_COLUMNS,
    COLOURS,
    SQUARE_VALUE,
  } from '../../constants';

  import Grid from './Grid.svg.svelte';

  export let offsetValue: number;
  export let gridSize: number;
  export let gridOverflow: number;

  export let showRedBelowDivider: boolean;
  export let showArrow: boolean;

  // How many rows from the top to dock the divider line
  export let lineOffset: number;
  export let length: number;
  export let remainderLength: number;

  const LINE_WIDTH = 4;

  const MIDDLE_GRID_HEIGHT = 70;

  $: middleGridLength = Math.ceil(MIDDLE_GRID_HEIGHT / gridSize);
  $: showRedBelowDivider ? colour.set(COLOURS.bgRed) : colour.set(COLOURS.bg);
  $: dividerOffset = (Math.round(offsetValue / (NUM_COLUMNS * SQUARE_VALUE)) - 1) * gridSize;
  $: windowRows = Math.ceil(window.innerHeight / gridSize);
</script>

<div
  style="
    position: relative;
    top: {dividerOffset}px;
    left: 0;
    width: {NUM_COLUMNS * gridSize + 20}px;
    height: {gridSize * length}px;
  "
>
  <div class="sticky-top">
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

    {#if showArrow}
      <div
        in:fly="{{ y: 50, duration: 800 }}"
        class="arrow"
        style="top: {lineOffset * gridSize - 70}px;"
      >
        <svg width="19" height="26" viewBox="0 0 19 26" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M10 3V26" stroke="white" stroke-width="3"/>
          <path d="M2 10.5L10 3L17.5 10.5" stroke="white" stroke-width="3"/>
        </svg>
      </div>
    {/if}
    
    <div
      class="label"
      style="top: {lineOffset * gridSize - 40}px;"
    >
      $53 BILLION
    </div>

    <!-- Divider line -->
    <div
      style="
        position: absolute;
        left: 0px;
        top: {lineOffset * gridSize - (LINE_WIDTH / 2)}px;
        height: {LINE_WIDTH}px;
        width: 100%;
        background: white;
      "
    />

    {#if showRedBelowDivider}
      <svg
        in:fade={{ duration: 400 }}
        style="
          width:100%;
          height:{middleGridLength * gridSize}px;
          background:white;
          transform: translateY(-6px);
        ">
        <g style="transform: translateX({gridOverflow / 2}px);">
          <Grid
            id="bg-floating-middle"
            offsetBlocks={0}
            heightBlocks={middleGridLength}
            widthBlocks={NUM_COLUMNS}
            colour={$colour}
            useGrid={true}
            {gridSize}
          />
        </g>
      </svg>

      <div
        class="label"
        style="
          top: {lineOffset * gridSize + 8}px;
          font-size: 28px;
        "
        in:fly="{{ y: -30, duration: 800 }}"
      >
        $189 BILLION
      </div>

      <div
        class="arrow"
        style="top: {lineOffset * gridSize + 48}px;"
        in:fly="{{ y: -30, duration: 800 }}"
      >
        <svg width="19" height="26" viewBox="0 0 19 26" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M10 0V23" stroke="white" stroke-width="3"/>
          <path d="M2 15.5L10 23L17.5 15.5" stroke="white" stroke-width="3"/>
        </svg>
      </div>
    {/if}
  </div>
</div>

<div
  style="
    position: relative;
    top: {dividerOffset}px;
    left: 0;
    width: {NUM_COLUMNS * gridSize + 20}px;
    height: {gridSize * length}px;
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
    <svg style="width:100%;height:{gridSize * (remainderLength + windowRows)}px;background:white;">
      <g style="transform: translateX({gridOverflow / 2}px);">
        <Grid
          id="bg-floating-below"
          offsetBlocks={lineOffset}
          heightBlocks={remainderLength + windowRows}
          widthBlocks={NUM_COLUMNS}
          colour={$colour}
          useGrid={true}
          {gridSize}
        />
      </g>
    </svg>
  </div>

</div>

<style>
  .sticky-top {
    position: sticky;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 100vh;
    z-index: 6;
  }

  .label {
    position: absolute;
    text-align: center;
    margin: auto;
    right: 0;
    left: -10px;
    width: 200px;
    font-size: 24px;
    color: white;
    font-family: ABCSans;
    font-weight: 500;
  }

  .arrow {
    position: absolute;
    right: 0;
    left: -10px;
    width: 19px;
    margin: auto;
  }
</style>
