<script lang="ts">
  import { onMount } from 'svelte';
  import { tweened } from 'svelte/motion';
  import type { Action } from 'svelte/action';

  export let block: any;

  export let gridSize: number;
  export let gridOverflow: number;
  export let offsetBlocks: number;
  export let labels: any[];
  export let hide: boolean;

  let labelRef: any;

  const barOffset = tweened(0, {
    duration: 400
  });
  $: barOffset.set(gridSize * (offsetBlocks + 1.5));

  onMount(() => {
    labelRef.item = block.item;
    labels.push(labelRef);
  });

  const children: Action<Element, Node[]> = (el, chn: Node[] | undefined) => {
    chn?.forEach((node) => el.appendChild(node));

    return {
      destroy() {
        chn?.forEach((node) => el.removeChild(node));
      },
      // If text in panels changes, re-render the blocks
      update(newChn) {
        chn?.forEach((node) => el.removeChild(node));
        newChn?.forEach((node) => el.appendChild(node));
        chn = newChn;
      }
    };
  };

  $: pushUp = block.item.state === 'pushup' ? gridSize * 40 : 0;
</script>

<div
  bind:this={labelRef}
  class="block-label-wrapper"
  style="
    position: absolute;
    top: {block.labelTop - pushUp}px;
    height: {block.labelHeight + pushUp}px;
    width: {block.width}px;
    left: {gridSize + gridOverflow / 2}px;
    margin: 0px;
    z-index: 10000;

    display: {hide ? 'none' : 'block'};

    --bar-offset: {$barOffset}px;
  "
>
  <div
    class="block-label"
    use:children={block.item.nodes || []}
  />
  <div style="display:none;">{block.item.nodeHash}</div>
</div>

<style lang="scss">
  .block-label {
    height: 100%;
    position: relative;
  }
  :global(.block-label > p) {
    position: sticky;

    /* This is how far from the top it sticks when scrolled past */
    top: var(--bar-offset);

    padding-left: 35px;
    padding-right: 35px;
    font-size: 1.25rem;
    font-weight: 600;
    text-align: center;
    color: white;
    font-family: ABCSerif;

    :global(a) {
      color: #efe6b9 !important;
      text-decoration: underline;
    }
  }
</style>
