<script lang="ts" context="module">
	declare global {
		interface Window {
			__IS_ODYSSEY_FORMAT__: boolean;
		}
	}
</script>

<script lang="ts">
	import { onMount } from 'svelte';
	import type { PanelDefinition } from './types';

  import Chart from '../Chart/Chart.svelte';

	export let panels: PanelDefinition[];

	const isOdyssey: boolean = window.__IS_ODYSSEY_FORMAT__;

	let scalerRef: HTMLElement | undefined;
  let width: number;

	onMount(() => {
		setvhAmount();
	});

	const setvhAmount = () => {
		const vh = window.innerHeight;
		scalerRef?.style.setProperty('--vh', `${vh / 100}px`);
	};

	const windowResizeHandler = () => {
		setvhAmount();
	};

  // Convert the CM markers into the data expected by the Chart component
  $: chartData = panels.map(p => ({
    nodes: p.nodes,
    costThousands: p.data.cost,
    labelHeight: p.data.height,
    continue: p.data.continue,
  }));
</script>

<svelte:window on:resize={windowResizeHandler} />

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
  bind:clientWidth={width}
>
  <Chart
    data={chartData}
    {width}
  />
</div>


<style lang="scss">
  .scaler {
		position: relative;
    margin-left: 10px;
    margin-right: 10px;
	}
</style>
