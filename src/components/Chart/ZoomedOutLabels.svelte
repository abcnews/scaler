<script lang="ts">
  import { getContext } from 'svelte';
  import { fade } from 'svelte/transition';
  import { COLOURS } from '../../constants';
  export let gridSize: number;

  const { height } = getContext('LayerCake');
</script>

<div
  class="bar"
  in:fade="{{ delay: 1800 }}"
  style="
    position: absolute;
    top: 0px;
    height: {gridSize * 23}px;
    width: {gridSize * 20}px;
  "
/>

<div
  in:fade="{{ delay: 1800 }}"
  class="label"
  style="
    top: -5px;
    width: 150px;
    right: 35px;
    text-align: right;
  "
>
  <b>$2.4 billion</b> 
  <br />

  Royal Adelaide Hospital
</div>


<div
  in:fade="{{ delay: 1800 }}"
  class="bar"
  style="
    position: absolute;
    top: {$height * 0.52}px;
    height: {$height * 0.28}px;
    width: {gridSize * 20}px;
  "
/>

<div
  in:fade="{{ delay: 1800 }}"
  class="label"
  style="
    top: {$height * 0.63}px;
    width: 150px;
    right: 35px;
    text-align: right;
  "
>
  <b>$69 billion</b> 
  <br />

  Free university
</div>

<div
  in:fade="{{ delay: 1800 }}"
  class="label"
  style="
    top: calc({$height * 0.07}px);
    width: 160px;
    left: 20px;
    text-align: left;

    font-weight: 700;
    font-size: 24px;
    line-height: 28px;
    color: {COLOURS.bg};
  "
>
  $53 billion
</div>

<div
  in:fade="{{ delay: 1800 }}"
  class="label"
  style="
    top: calc({$height * 0.07}px + 30px);
    width: 160px;
    left: 20px;
    text-align: left;
  "
>
  Will go to people who earn
  <b>less</b> than <br /> $120,000 per year
</div>

<div
  in:fade="{{ delay: 1800 }}"
  class="label"
  style="
    top: calc({$height * 0.52}px);
    width: 160px;
    left: 20px;
    text-align: left;

    font-weight: 700;
    font-size: 24px;
    line-height: 28px;
    color: {COLOURS.bgRed};
  "
>
  $189 billion
</div>

<div
  in:fade="{{ delay: 1800 }}"
  class="label"
  style="
    top: calc({$height * 0.52}px + 30px);
    width: 160px;
    left: 20px;
    text-align: left;
  "
>
  Will go to people who earn
  <b>more</b> than <br /> $120,000 per year
</div>

<style lang="scss">
  .bar {
    left: -20px;
    z-index: 100;
    background: black;
  }

  .label {
    position: absolute;
    font-size: 14px;
    font-family: "ABCSans", Helvetica, sans-serif;
    line-height: 18px;
    z-index: 100;
  }
</style>
