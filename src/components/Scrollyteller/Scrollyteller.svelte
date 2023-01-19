<script lang="ts" context="module">
	declare global {
		interface Window {
			__IS_ODYSSEY_FORMAT__: boolean;
		}
	}
</script>

<script lang="ts">
  import Chart from '../Chart/Chart.svelte';

  export let scrollyData: any;
  export let width: number;

	const isOdyssey: boolean = window.__IS_ODYSSEY_FORMAT__;

	let scalerRef: HTMLElement | undefined;
  let zoomOut = false;

  // Convert the CM markers into the data expected by the Chart component
  $: chartData = scrollyData.panels.map(p => ({
    nodes: p.nodes,
    costThousands: p.data.cost,
    labelHeight: p.data.height,
    continue: p.data.continue,
  }));

  const onZoomOut = () => {
    window.scrollTo({
      top: scalerRef?.offsetTop - 50,
      left: 0,
      behavior: 'auto'
    });
    zoomOut = true;
  };
</script>

<svelte:head>
	{#if isOdyssey}
		<!-- styles required to make position sticky work -->
		<!-- existing styles on an Odyssey body are preventing position sticky from 'sticking' -->
		<style>
			body {
				overflow: visible;
			}
		</style>
	{/if}
</svelte:head>

<div
  class="scaler"
  bind:this={scalerRef}
>
  <Chart
    data={chartData}
    {width}
    {zoomOut}
  />
</div>

<button on:click={onZoomOut}>Zoom out</button>

<style lang="scss">
  .scaler {
		position: relative;
    /* margin-left: 10px; */
    /* margin-right: 10px; */
	}
  :global([data-tag="startfallback"]) {
    display: none;
  }
</style>
