<script lang="ts">
  import { LayerCake } from 'layercake';
  import { GRID_SIZE, SQUARE_VALUE } from '../../constants';

  import Wrapper from './Wrapper.svg.svelte';

  const xKey = 'widthPercent';
  const yKey = 'costThousands';

  export let width: number;
  // export let labelHeight: number;
  export let padding = { top: 0, bottom: 0, left: 40, right: 40 };
  const TOTAL_VALUE = 243_000_000;

  const NUM_COLUMNS = 20;

  $: numSquares = TOTAL_VALUE / SQUARE_VALUE;
  // $: numColumns = Math.floor(width / GRID_SIZE);
  $: numRows = Math.ceil(numSquares / NUM_COLUMNS);
  $: gridSize = Math.floor(width / NUM_COLUMNS)

  $: storyLength = numRows * gridSize;

  $: console.log({ width, storyLength, numRows, numColumns: NUM_COLUMNS });

  export let data: any[] = [
    {
      costThousands: 1000,
      label: 'Each of these squares is $1 million.',
      labelHeight: 2,
    },
    {
      label: 'So, come along for a scroll through $243 billion, and let\'s put things into perspective.',
      labelHeight: 40,
    },
    // {
    //   label: 'Let\'s put things into perspective...',
    //   labelHeight: 100,
    // },
    {
      costThousands: 1400,
      label: 'The average two bedroom house in Sydney costs $1.4 million.',
      labelHeight: 20,
    },
    {
      costThousands: 190_000,
      label: 'A new green bridge in Brisbane – $190 million.',
      labelHeight: 40,
    },
    {
      costThousands: 2_000_000,
      label: 'Bigger yet, the total cost of building the Fiona Stanley Hospital in Perth came to around $2 billion.',
      labelHeight: 50,
      continue: true,
    },
    {
      label: 'It\'s one of the most expensive buildings in the world.',
      labelHeight: 50,
    },
    {
      label: 'But if you thought that was big, it\'s nothing compared to these tax cuts.',
      labelHeight: 50,
    },
    {
      label: 'here’s how much all the people earning less than $45,000 per year combined are going to receive from the tax cuts.',
      labelHeight: 50,
    },
    {
      label: 'Actually, never mind that, they won’t see a single dime!',
      labelHeight: 50,
    },
    {
      label: 'Yep. That means that anyone earning minimum wage at a full-time job is going to miss out.',
      labelHeight: 50,
    },
    {
      label: 'We\'ll get to where the majority of the money is going soon (hint: rich people).',
      labelHeight: 50,
    },
    // {
    //   costThousands: 2_000_000,
    //   label: 'Westconnex motorway in Sydney (2 b)',
    //   labelHeight: 10,
    // },
    // {
    //   costThousands: 5_000_000,
    //   label: 'Hosting the 2035 olympics in Brisbane (5 b)',
    //   labelHeight: 10,
    // },
    {
      costThousands: 10_000_000,
      label: 'It\'s been estimated it will cost $10 billion to add mental health to medicare.',
      labelHeight: 400,
      continue: true,
    },
    {
      label: 'Seems like a lot... do you think we\'re nearly done?',
      labelHeight: 100,
    },
    {
      label: 'Nope. we still haven’t even made it a quarter of the way through this scrolling odyssey.',
      labelHeight: 100,
    },
    

      
    // {
    //   costThousands: 12_000_000,
    //   label: 'Household electrification program (12 b)',
    //   labelHeight: 10,
    // },
    // {
    //   costThousands: 30_000_000,
    //   label: '25% pay rise for aged care workers (30 b)',
    //   labelHeight: 10,
    // },
    // {
    //   costThousands: 70_000_000,
    //   label: 'Free university for domestic students (70 b)',
    //   labelHeight: 10,
    // },
  ];
</script>

<div
  class="chart-container"
  style="
    width: {width}px;
    height: {storyLength}px;
    margin: auto;
  ">

  {#if width && storyLength}
    <LayerCake
      {padding}
      x={xKey}
      y={yKey}
      yDomain={[0, numRows]}
      yRange={[0, storyLength]}
      {data}
    >

      <Wrapper />
    </LayerCake>
  {/if}
</div>

<style lang="scss">
</style>
