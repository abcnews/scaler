<script lang="ts">
  import { defaultCustomisation } from '../../constants';

  // import Chart from '../Chart/Chart.svelte';
  import PropertiesTab from '../PropertiesTab.svelte';
  import Builder from '../Builder/Builder.svelte';
  import BuilderIntro from '../Builder/BuilderIntro.svelte';
  import BuilderChart from '../Builder/BuilderChart.svelte';

</script>

<Builder
  storeName={"customisation"}
  defaultState={defaultCustomisation}
  let:width={width}
>
  <div slot="figure">
    <BuilderIntro storeName={"customisation"} />
    <BuilderChart
      storeName={"customisation"}
      {width}
    />
  </div>

  <PropertiesTab slot="properties" />
</Builder>

