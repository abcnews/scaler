<script lang="ts">
  import Accordion from 'carbon-components-svelte/src/Accordion/Accordion.svelte';
  import AccordionItem from 'carbon-components-svelte/src/Accordion/AccordionItem.svelte';
  import TextArea from 'carbon-components-svelte/src/TextArea/TextArea.svelte';

  import { getContext } from 'svelte';

  let customisation = getContext<any>('customisation');
</script>

<div>
  <Accordion>
    <AccordionItem title="Intro">
      <TextArea labelText="" bind:value={$customisation.intro} rows={12} />
    </AccordionItem>
    <AccordionItem title="Body" open>
      <TextArea labelText="" bind:value={$customisation.text} rows={45} />
    </AccordionItem>

  </Accordion>
</div>
