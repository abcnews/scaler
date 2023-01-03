<script lang="ts">
  import { LayerCake } from 'layercake';
  import { NUM_COLUMNS, SQUARE_VALUE } from '../../constants';

  import Blocks from './Blocks.svg.svelte';

  const xKey = 'widthPercent';
  const yKey = 'costThousands';

  export let width: number;
  export let padding = { top: 0, bottom: 0, left: 0, right: 0 };
  const TOTAL_VALUE = 243_000_000;

  $: numSquares = TOTAL_VALUE / SQUARE_VALUE;
  $: numRows = Math.ceil(numSquares / NUM_COLUMNS);
  $: gridSize = Math.floor(width / NUM_COLUMNS)
  $: height = numRows * gridSize;

  export let data: any[] = [
    {
      costThousands: 5000,
      label: 'If each of these squares is $5 million...',
      labelHeight: 2,
    },
    {
      label: '...$243 billion will take a long time to scroll through.',
      labelHeight: 40,
    },
    {
      label: 'So, let\'s put things into perspective as we go.',
      labelHeight: 40,
    },
    // {
    //   costThousands: 220,
    //   label: 'Here\'s the tiny $220k spent on the BoM rebrand.',
    //   labelHeight: 10,
    // },

    // https://www.smh.com.au/property/news/what-sydney-s-median-house-price-can-buy-across-the-country-20220610-p5asvk.html
    {
      costThousands: 1600,
      label: 'Here\'s the median house price in Sydney, which is currently around $1.6 million.',
      labelHeight: 10,
    },
    {
      costThousands: 190_000,
      label: 'And a new green bridge in Brisbane – $190 million.',
      labelHeight: 10,
    },
    {
      costThousands: 2_000_000,
      label: 'Bigger yet, the total cost of building the Fiona Stanley Hospital in Perth came to around $2 billion.',
      labelHeight: 20,
      continue: true,
    },
    {
      label: 'It\'s one of the most expensive buildings in the world.',
      labelHeight: 10,
    },
    {
      label: 'But if you thought that was big, it\'s nothing compared to these tax cuts.',
      labelHeight: 40,
    },
    {
      label: 'Here’s how much all the people earning less than $45,000 per year combined will receive.',
      labelHeight: 40,
    },
    {
      label: 'Actually, never mind that, they won’t see a cent of it.',
      labelHeight: 40,
    },
    {
      label: 'That means that anyone earning minimum wage at a full-time job is going to miss out entirely.',
      labelHeight: 40,
    },
    {
      costThousands: 7_500_000,
      label: 'This is how big the $7.5 billion allocated to cost of living relief takes up.',
      labelHeight: 80,
      continue: true,
    },
    {
      label: 'Even it pales in comparison to what we\'re planning on spending on these tax cuts.',
      labelHeight: 85,
    },
    {
      costThousands: 1_800_000,
      label: 'So does the $1.8 billion promised for environmental and heritage protection.',
      labelHeight: 85,
    },
    // {
    //   // label: 'Seems like a lot... do you think we\'re nearly done?',
    //   label: '',
    //   labelHeight: 80,
    // },
    {
      label: 'We\'re just reaching 21.9% of the total cost of the stage 3 tax cuts – $53 billion.',
      labelHeight: 90,
    },

    // 53 billion = 21.9% of the cuts => shared between everyone making less than $120k per year
    {
      label: 'That is how much is going to be shared between every single person in Australia who makes less than $120k per year.',
      labelHeight: 60,
    },
    {
      label: 'Which means that the other 78.1% is going to everyone making more than that.',
      labelHeight: 60,
    },
    {
      label: 'Something to think about as we keep scrolling...',
      labelHeight: 600,
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
    height: {height}px;
    margin: auto;
  ">

  {#if width && height}
    <LayerCake
      {padding}
      x={xKey}
      y={yKey}
      yDomain={[0, numRows]}
      yRange={[0, height]}
      {data}
    >

      <Blocks />
    </LayerCake>
  {/if}
</div>

<style lang="scss">
</style>
