<script lang="ts">
  import acto from '@abcnews/alternating-case-to-object';
  import { getContext } from 'svelte';
  import Chart from '../Chart/Chart.svelte';

  export let storeName: string;
  export let width: number;

  const stateStore = getContext<any>(storeName);

  $: data = ($stateStore.text.split('\n') || []).reduce(
    (acc: any[], line: string) => {
      if (!line) {
        return acc;
      }

      if (line.startsWith('#')) {
        const config = acto(line);
        return [...acc, {
          costThousands: config.cost,
          labelHeight: config.height,
          continue: config.continue,
        }];
      }

      if (acc.length === 0) {
        return acc;
      }

      const p = document.createElement('p');
      p.innerHTML = line;
      acc[acc.length - 1].nodes = [p];
      // acc[acc.length - 1].nodeHash = encode(p.innerHTML);
      return acc;
    },
    []
  );
</script>

<Chart
  {width}
  {data}
  labels={[]}
/>
