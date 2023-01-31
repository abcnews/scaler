<script lang="ts">
  import Grid from './Chart/Grid.svg.svelte';

  import { NUM_COLUMNS, COLOURS, SQUARE_VALUE } from '../constants';

  export let width: number;
  export let value: number; // in thousands

  $: gridSize = Math.floor(width / NUM_COLUMNS);
  $: numBlocks = (value / 1000) / SQUARE_VALUE;

  // $: sideLength = Math.sqrt(numBlocks * gridSize);


  $: singlePixelVal = Math.floor(SQUARE_VALUE * 1_000_000 / (gridSize * gridSize));
  $: sideLength = Math.sqrt(value * 1000 / singlePixelVal);

  const heightBlocks = 1;
  // $: console.log({ sideLength, gridSize, numBlocks, value, valueOfFullGrid, valueOfFullGrid2 });

</script>

<div class="wrapper">
  <p>
    {#if value < 1000}
      ${(value * 1000).toLocaleString("en-US")}
    {:else}
      ${value / 1000} million
    {/if}
  </p>

    {#if numBlocks < 1}
      <div
        style="
          width:10px;
          height:21px;
          margin: auto;
        "
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="9" height="21" viewBox="0 0 8 21">
          <path d="M3.64645 20.3536C3.84171 20.5488 4.15829 20.5488 4.35355 20.3536L7.53553 17.1716C7.7308 16.9763 7.7308 16.6597 7.53553 16.4645C7.34027 16.2692 7.02369 16.2692 6.82843 16.4645L4 19.2929L1.17157 16.4645C0.976311 16.2692 0.659728 16.2692 0.464466 16.4645C0.269204 16.6597 0.269204 16.9763 0.464466 17.1716L3.64645 20.3536ZM3.5 0V20H4.5V0H3.5Z" fill="black"/>
        </svg>
      </div>
    {/if}

    <div
      style="
        width:{Math.max(numBlocks * gridSize, sideLength)}px;
        height:{numBlocks < 1 ? sideLength + 10 : heightBlocks * gridSize + 10}px;
        margin: auto;
      "
    >
    <svg style="width:100%;height:100%">
      {#if numBlocks < 1}
        <rect
          x={0}
          y={sideLength + 3}
          height={sideLength}
          width={sideLength}
          fill={COLOURS.bg}
        />
      {:else}
        <Grid
          {gridSize}
          useGrid={numBlocks > 1}

          offsetBlocks={0}
          widthBlocks={numBlocks}
          {heightBlocks}
          colour={COLOURS.bg}
        />
      {/if}
    </svg>
  </div>

  {#if numBlocks < 1 && sideLength < 3}
    <p class="can-you-see-me">
      Over here! Can you see me?
    </p>
  {/if}
</div>

<style lang="scss">
  .wrapper {
    position: relative;

    p {
      font-family: ABCSans;
      font-weight: 700;
      text-align: center;
      margin-bottom: 5px;
    }

    .can-you-see-me {
      font-family: ABCSans;
      font-style: italic;
      font-weight: 450;
      font-size: 10px;
      line-height: 12px;
      color: #007BC7;
      max-width: 80px;
      margin: auto;
      margin-top: 6px;
    }
  }
</style>
