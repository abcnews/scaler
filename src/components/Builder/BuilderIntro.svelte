<script lang="ts">
  // import { encode, decode } from '@abcnews/base-36-props';
  import { getContext } from 'svelte';

  export let storeName: string;

  const stateStore = getContext<any>(storeName);
</script>

{#each $stateStore.intro.split('\n') as line}
  <p class="intro-par">{line}</p>
{/each}

<style lang="scss">
  .intro-par {
    font-size: 1.125rem;
    line-height: 1.555555556;
    margin-bottom: 24px;
    color: #111;
    font-family: "ABCSerif","Book Antiqua","Palatino Linotype",Palatino,serif;
  }
</style>
