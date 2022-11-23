<script lang="ts" context="module">
  type Marker = {
    label: string;
    note: string;
    prefix: string;
  }

  const MARKERS: Marker[] = [
    // { label: 'Standalone graphic marker', note: '', prefix: 'scatter' },
    {
      label: 'Scrollyteller opener',
      note: `If you're placing multiple scrollytellers in a single story, each must have a unique NAME.`,
      prefix: 'scrollytellerNAMEchart'
    },
    { label: 'Scrollyteller mark', note: '', prefix: 'mark' }
  ];
</script>

<script lang="ts">
  import { getContext } from 'svelte';
  import { encode, decode } from '@abcnews/base-36-props';
  import acto from '@abcnews/alternating-case-to-object';

  import Button from 'carbon-components-svelte/src/Button/Button.svelte';
  // import CodeSnippet from 'carbon-components-svelte/src/CodeSnippet/CodeSnippet.svelte';
  import InlineNotification from 'carbon-components-svelte/src/Notification/InlineNotification.svelte';

  export let storeName: string;
  export let stateDiff: any;

  let store = getContext<any>(storeName);

  const importMarker = (marker: string) => {
    const { state } = acto(marker);

    if (state && typeof state == 'string') {
      store.set(decode(state));
    } else {
      alert('invalid marker!');
    }
  };

  $: markersData = MARKERS.map(({ label, note, prefix }) => ({
    label,
    note,
    text: `#${prefix}STATE${encode(stateDiff)}`
  }));
</script>

<div>
  <Button
    size="field"
    tooltipAlignment="end"
    on:click={() => {
      const marker = prompt('Paste a marker here to import its configuration');

      if (!marker || !marker.length) {
        return alert('No marker was provided');
      }

      importMarker(marker);
    }}
  >
    Import marker
  </Button>

  <!-- <Button -->
  <!--   size="field" -->
  <!--   tooltipAlignment="end" -->
  <!--   on:click={() => { -->
  <!--     generateFallback($graph); -->
  <!--   }} -->
  <!-- > -->
  <!--   Download Fallback Image -->
  <!-- </Button> -->

  {#each markersData as { label, note, text }}
    <h4>{label}</h4>
    {#if note}
      <InlineNotification hideCloseButton kind="info" lowContrast subtitle={note} />
    {/if}
    <!-- <CodeSnippet type="single" code={text} /> -->
  {/each}
</div>

<style>
  div :global(.bx--snippet--single) {
    height: auto;
  }

  div :global(pre) {
    white-space: initial;
  }

  div :global(code) {
    white-space: pre-wrap;
    word-break: break-all;
    overflow-wrap: break-word;
  }

  div :global(.bx--copy-btn) {
    height: 100%;
  }

  div :global(.bx--inline-notification) {
    max-width: unset !important;
  }
</style>
