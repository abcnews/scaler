<script lang="ts">
  // import { getContext } from 'svelte';
  // const customisationStore = getContext<any>('customisation');

  export let offset: number;
  export let item: any;

  export let height;
  export let width;

  // $: total = $yGet(item);
  // $: displayWidth = Math.min(Math.max(1, Math.sqrt(total)), $width - 40);
  // $: displayHeight = total / displayWidth;
</script>

<g
  class="block"
  style="transform: translate({20}px, {offset * 60 + 5}vh)"
>
  <rect
    x={0}
    y={0}
    {height}
    {width}
    fill={'red'}
  />
  <text style="transform: translate(0, -10px)">{item.label}</text>
</g>

<style lang="scss">
</style>
