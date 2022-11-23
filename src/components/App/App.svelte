<script lang="ts">
  import { defaultCustomisation } from '../../constants';

  import Chart from '../Chart/Chart.svelte';
  import PropertiesTab from '../PropertiesTab.svelte';
  import Builder from '../Builder/Builder.svelte';
</script>

<Builder
  storeName={"customisation"}
  defaultState={defaultCustomisation}
  let:width={width}
  let:height={height}
>
  <Chart
    slot="figure"
    {width}
    {height}
  />

  <PropertiesTab slot="properties" />
</Builder>

