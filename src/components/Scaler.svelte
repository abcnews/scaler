<script lang="ts" context="module">
	declare global {
		interface Window {
			__IS_ODYSSEY_FORMAT__: boolean;
		}
	}
</script>

<script lang="ts">
  import { onMount } from 'svelte';
  import { Client } from '@abcnews/poll-counters-client';

  import Chart from './Chart/Chart.svelte';
  import Button from './Button.svelte';

  export let scrollyData: any;
  export let width: number;

  const pollClient = new Client('SCROLL_WAYPOINT');
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
        if (state === 'showarrow') {
          showArrow = isAboveBottomOfViewport;
        }
      }
    });
  };

  const observer = new IntersectionObserver(IntersectionObserverCallback, observerOptions);

  let zoomOutTriggerOffset: number;
  let colourChangeTriggerOffset: number;

  const setTriggerPoints = () => {
    const container: HTMLElement | null = document.querySelector('#scalerNAMEmain');

    const zoomOutTrigger = labels.find(l => l.item.state === 'zoomout');
    zoomOutTriggerOffset = container?.offsetTop + zoomOutTrigger?.offsetTop;

    const colourChangeTrigger = labels.find(l => l.item.state === 'colourchange');
    colourChangeTriggerOffset = container?.offsetTop + colourChangeTrigger?.offsetTop - colourChangeTrigger?.offsetHeight;
  };

  window.addEventListener("resize", setTriggerPoints);

  const sentWaypoints: string[] = [];
  const sendBeacon = (waypoint: string) => {
    if (sentWaypoints.indexOf(waypoint) === -1) {
      pollClient.increment({ question: waypoint, answer: waypoint });
      sentWaypoints.push(waypoint);
    }
  };

  onMount(() => {
    labels.forEach((label) => observer.observe(label));

    sendBeacon('start');

    // Mechanism to trigger more accurately than using mutation observer
    setTimeout(setTriggerPoints, 300);
    addEventListener("scroll", () => {
      const offset = window.scrollY;

      if (zoomOutTriggerOffset && (zoomOutTriggerOffset + window.innerHeight * 2.5) < offset) {
        sendBeacon('zoomout');
        onZoomOut();
      }
      if (colourChangeTriggerOffset && colourChangeTriggerOffset < offset) {
        sendBeacon('colourchange');
        showRedBelowDivider = true;
        // When we're transitioning colour, the arrow should already be visible
        showArrow = true;
      } else {
        showRedBelowDivider = false;
      }
    });
  });

  const onZoomOut = () => {
    if (!zoomOut) {
      let offset = (scalerRef?.offsetTop || 0) + 50;
      if (offset > 2400) {
        offset = 2000;
      }

      // Just a bit of harmless scroll-jacking while we zoom out
      window.scrollTo({
        top: offset - 100,
        left: 0,
        behavior: 'auto'
      });
      zoomOut = true;
      setTimeout(() => {
        window.scrollTo({
          top: offset,
          left: 0,
          behavior: 'auto'
        })
      }, 400);
    }
  };
  const onZoomIn = () => {
    zoomOut = false;
    showRedBelowDivider = false;
    showArrow = false;
    setTimeout(setTriggerPoints, 400);
    setTimeout(setTriggerPoints, 1000);
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
