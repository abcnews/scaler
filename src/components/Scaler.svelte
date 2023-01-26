<script lang="ts" context="module">
	declare global {
		interface Window {
			__IS_ODYSSEY_FORMAT__: boolean;
		}
	}
</script>

<script lang="ts">
  import { onMount } from 'svelte';

  import Chart from './Chart/Chart.svelte';
  import Button from './Button.svelte';

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
  let showRedBelowDivider = false;
  let showArrow = false;

  const IntersectionObserverCallback = (entries: IntersectionEntries[]) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const state = entry.target.item.state;
        const isAboveBottomOfViewport = entry.boundingClientRect.top > 0;

        if (state === 'zoomout' && !zoomOut) {
          setTimeout(onZoomOut, 2000);
        }
        if (state === 'colourchange') {
          showRedBelowDivider = isAboveBottomOfViewport;
          // When we're transitioning colour, the arrow should always be visible
          showArrow = true;
        }
        if (state === 'showarrow') {
          showArrow = isAboveBottomOfViewport;
          // When we're looking at the arrow marker, the colour should always be blue
          showRedBelowDivider = false;
        }
      }
    });
  };

  const observer = new IntersectionObserver(IntersectionObserverCallback, observerOptions);

  onMount(() => {
    labels.forEach((label) => observer.observe(label));

    let zoomOutTriggerOffset;
    // Backup mechanism to trigger zoom out if the reader scrolls too far
    setTimeout(() => {
      zoomOutTriggerOffset = labels.find(l => l.item.state === 'zoomout')?.offsetTop;
    }, 50);
    addEventListener("scroll", () => {
      if (zoomOutTriggerOffset && zoomOutTriggerOffset < (window.scrollY - window.innerHeight * 2.5)) {
        onZoomOut();
      }
    });
  });

  const onZoomOut = () => {
    if (!zoomOut) {
      // Just a bit of harmless scroll-jacking while we zoom out
      window.scrollTo({
        top: (scalerRef?.offsetTop || 0) + 50,
        left: 0,
        behavior: 'auto'
      });
      zoomOut = true;
      setTimeout(() =>
        window.scrollTo({
          top: (scalerRef?.offsetTop || 0) + 50,
          left: 0,
          behavior: 'auto'
        })
      , 300);
    }
  };
  const onZoomIn = () => {
    zoomOut = false;
    showRedBelowDivider = false;
    showArrow = false;
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


{#if zoomOut}
  <div class="button-wrapper">
    <Button
      onClick={onZoomIn}
      label="START AGAIN"
    />
  </div>
{/if}

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
  />
</div>

<style lang="scss">
  .scaler {
		position: relative;
	}
  .button-wrapper {
    margin: 30px;
    margin-bottom: 80px;
    text-align: center;
  }
  :global([data-tag="startfallback"]) {
    display: none;
  }
</style>
