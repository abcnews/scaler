<script lang="ts" context="module">
	declare global {
		interface Window {
			__IS_ODYSSEY_FORMAT__: boolean;
		}
	}
</script>

<script lang="ts">
  import { onMount } from 'svelte';
  import Chart from '../Chart/Chart.svelte';

  export let scrollyData: any;
  export let width: number;

	const isOdyssey: boolean = window.__IS_ODYSSEY_FORMAT__;
  let labels: any[] = [];
	let scalerRef: HTMLElement | undefined;

  // Convert the CM markers into the data expected by the Chart component
  $: chartData = scrollyData.panels.map(p => ({
    nodes: p.nodes,
    costThousands: p.data.cost,
    labelHeight: p.data.height,
    continue: p.data.continue,
    state: p.data.state,
  }));


  let observerOptions: IntersectionObserverInit = {
    threshold: 0.2,
    rootMargin: "0px 0px -40% 0px",
  };

  let zoomOut = false;
  let isDocked = false;
  let showRedBelowDivider = false;
  let showArrow = false;

  const IntersectionObserverCallback = (entries: IntersectionEntries[]) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const state = entry.target.item.state;
        // const isAboveBottomOfViewport = entry.boundingClientRect.bottom - entry.boundingClientRect.height > window.innerHeight * 4 / 5;

        const isAboveBottomOfViewport = entry.boundingClientRect.top > 0;

        if (state === 'zoomout') {
          onZoomOut();
          zoomOut = true;
        }
        if (state === 'docked') {
          isDocked = true;
        }
        if (state === 'colourchange') {
          showRedBelowDivider = isAboveBottomOfViewport;
          // When we're transitioning colour, the arrow should always be visible
          showArrow = true;
          isDocked = true;
        }
        if (state === 'showarrow') {
          showArrow = isAboveBottomOfViewport;
          // When we're looking at the arrow marker, the colour should always be blue
          showRedBelowDivider = false;
          isDocked = true;
        }
      }
    });
  };

  const observer = new IntersectionObserver(IntersectionObserverCallback, observerOptions);

  onMount(() => {
    labels.forEach((label) => observer.observe(label));
  });

  const onZoomOut = () => {
    window.scrollTo({
      top: (scalerRef?.offsetTop || 0) - 50,
      left: 0,
      behavior: 'auto'
    });
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
    {labels}
    {showArrow}
    {zoomOut}
    {showRedBelowDivider}
    {isDocked}
  />
</div>

<style lang="scss">
  .scaler {
		position: relative;
	}
  :global([data-tag="startfallback"]) {
    display: none;
  }
</style>
