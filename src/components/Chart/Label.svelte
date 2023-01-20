<script lang="ts">
  import { onMount } from 'svelte';
  import type { Action } from 'svelte/action';

  export let block: any;

  export let gridSize: number;
  export let gridOverflow: number;
  export let dividerLineOffset: number;
  export let labels: any[];

  let labelRef: any;

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
</script>

<div
  bind:this={labelRef}
  class="block-label-wrapper"
  style="
    position: absolute;
    top: {block.labelTop}px;
    height: {block.labelHeight}px;
    width: {block.width}px;
    left: {gridSize + gridOverflow / 2}px;
    margin: 0px;
    z-index: 10000;
    --bar-offset: {gridSize * (dividerLineOffset + Math.ceil(70 / gridSize)) + 40}px;
  "
>
  <div
    class="block-label"
    use:children={block.item.nodes || []}
  />
  <div style="display:none;">{block.item.nodeHash}</div>
</div>

<style>
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
    font-size: 1.125rem;
    font-weight: 500;
    text-align: center;
    color: white;
    font-family: ABCSerif;
  }
</style>
