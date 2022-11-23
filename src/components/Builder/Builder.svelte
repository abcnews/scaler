<script lang="ts">
  import { encode, decode } from '@abcnews/base-36-props';
  import { setContext } from 'svelte';
  import { writable } from 'svelte/store';

  import Tabs from 'carbon-components-svelte/src/Tabs/Tabs.svelte';
  import Tab from 'carbon-components-svelte/src/Tabs/Tab.svelte';
  import TabContent from 'carbon-components-svelte/src/Tabs/TabContent.svelte';

  import MarkersTab from './MarkersTab.svelte';

  import '../../builder.scss';

  let height: number;
  let width: number;

  export let defaultState: any;
  export let storeName: string;

  function getQueryVariable(urlQuery: string, name: string) {
      const query = urlQuery.substring(1);
      const vars = query.split('&');
      for (let i = 0; i < vars.length; i++) {
          const pair = vars[i].split('=');
          if (decodeURIComponent(pair[0]) === name) {
              return decodeURIComponent(pair[1]);
          }
      }
      return '';
  }

  const urlQueryToInitialState = (urlQuery: string): any => {
    const defaultStateClone = JSON.parse(JSON.stringify(defaultState));
    if (urlQuery.length < 2) {
      return defaultStateClone;
    }

    const urlState = decode(getQueryVariable(urlQuery, 'state'));

    return {
      ...defaultStateClone,
      ...urlState
    };
  };

  function deepEqual(obj1: any, obj2: any): boolean {
    // it's just the same object. No need to compare.
    if (obj1 === obj2) {
        return true;
    }

    // compare primitives
    if (isPrimitive(obj1) && isPrimitive(obj2)) {
        return obj1 === obj2;
    }

    if (Object.keys(obj1).length !== Object.keys(obj2).length) {
        return false;
    }

    // Ignore ordering in arrays
    if (Array.isArray(obj1) && Array.isArray(obj2)) {
      obj1 = obj1.sort();
      obj2 = obj2.sort();
    }

    // compare objects with same number of keys
    for (let key in obj1) {
        if(!(key in obj2)) return false; //other object doesn't have this prop
        if(!deepEqual(obj1[key], obj2[key])) return false;
    }

    return true;
  }

  //check if value is primitive
  function isPrimitive(obj: any): boolean {
      return (obj !== Object(obj));
  }

  const stateDiff = (state: any) => {
    return Object.keys(state).reduce((acc, inputName) => {
      const value = state[inputName];

      // We never export defaults
      if (deepEqual(defaultState[inputName], value)) {
        return acc;
      }
    
      return {
        ...acc,
        [inputName]: value,
      };
    }, {});
  }
  const saveStateToUrl = (state: any) => {
    const stateDiffToSave = stateDiff(state);

    let stateStr = `?state=${encode(stateDiffToSave)}`;
    if (Object.keys(stateDiffToSave).length === 0) {
      stateStr = '';
    }

    history.replaceState(
       { state: stateDiffToSave },
       document.title,
       stateStr || String(document.location.href).split('?')[0]
     );
  };

  // Create the generic store using the state in the URL query string
  const initialState = urlQueryToInitialState(String(window.location.search));
  const stateStore = writable<any>(initialState);
  setContext(storeName, stateStore);

  // Update the URL when the store changes
  $: saveStateToUrl($stateStore);
</script>

<main>
  <article>
    <figure bind:clientWidth={width} bind:clientHeight={height}>
      <slot name="figure" {width} {height} />
    </figure>
  </article>

  <aside>
    <Tabs autoWidth>
      <Tab label="Properties" />
      <Tab label="Markers" />
      <svelte:fragment slot="content">
        <TabContent><slot name="properties" /></TabContent>
        <TabContent><MarkersTab {storeName} stateDiff={stateDiff($stateStore)} /></TabContent>
      </svelte:fragment>
    </Tabs>
  </aside>
</main>


<style lang="scss">
  :global(body) {
    margin: 0;
  }

  main {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: stretch;
    min-height: 100vh;
  }

  article {
    flex: 0 0 auto;
    margin: auto;
    width: 100%;
    max-width: 52rem;
    padding: 3rem;
  }

  figure {
    margin: auto;
    height: 80vh;
  }

  aside {
    flex: 1 1 100%;
    border-top: 2px solid #e0e0e0;
    width: 100%;
  }

  @media (min-width: 72rem) {
    aside {
      align-self: stretch;
      margin: 0;
      border-top: 0;
      border-left: 2px solid #e0e0e0;
      max-width: 32rem;
      max-height: 100vh;
      overflow-x: hidden;
      overflow-y: scroll;
    }
  }

  aside :global(.bx--tabs) {
    position: relative;
  }

  aside :global(.bx--tabs)::before {
    content: '';
    z-index: 0;
    position: absolute;
    top: calc(2.5rem - 2px);
    left: 0;
    width: 100%;
    height: 2px;
    background-color: #e0e0e0;
  }

  aside :global(.bx--accordion) {
    margin: -1rem;
    width: calc(100% + 2rem);
  }

  aside :global(.bx--accordion__item):first-child {
    border-top: 0;
  }

  aside :global(.bx--accordion__content) {
    padding-right: 1rem !important;
  }
</style>
