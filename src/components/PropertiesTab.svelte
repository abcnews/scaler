<script lang="ts">
  import Accordion from 'carbon-components-svelte/src/Accordion/Accordion.svelte';
  import AccordionItem from 'carbon-components-svelte/src/Accordion/AccordionItem.svelte';
  // import MultiSelect from 'carbon-components-svelte/src/MultiSelect/MultiSelect.svelte';
  import Select from 'carbon-components-svelte/src/Select/Select.svelte';
  import SelectItem from 'carbon-components-svelte/src/Select/SelectItem.svelte';

  // import Slider from 'carbon-components-svelte/src/Slider/Slider.svelte';
  import Checkbox from 'carbon-components-svelte/src/Checkbox/Checkbox.svelte';
  // import NumberInput from 'carbon-components-svelte/src/NumberInput/NumberInput.svelte';
  // import TextInput from 'carbon-components-svelte/src/TextInput/TextInput.svelte';

  import { getContext } from 'svelte';

  let customisation = getContext<any>('customisation');
</script>

<div>
  <Accordion>
    <AccordionItem title="Data" open>
      <!-- <Select -->
      <!--   labelText="Income source" -->
      <!--   bind:selected={$customisation.index} -->
      <!-- > -->
      <!--   <SelectItem value="employed" text="Salary / Wages" /> -->
      <!--   <SelectItem value="agepension" text="Age Pension" /> -->
      <!--   <SelectItem value="othergovt" text="Other Govt Payments" /> -->
      <!--   <SelectItem value="superannuation" text="Self-funded Retiree" /> -->
      <!--   <SelectItem value="cpi" text="Consumer Price Index (CPI)" /> -->
      <!-- </Select> -->

      <!-- <MultiSelect -->
      <!--   titleText="Split groups" -->
      <!--   filterable -->
      <!--   bind:selectedIds={$customisation.splitGroups} -->
      <!--   items={allGroups.map(g => ({ id: g, text: g }))} -->
      <!-- /> -->

      <!-- <Checkbox -->
      <!--   labelText="Apply Personalisation (this makes the quiz influence it inside the story)" -->
      <!--   bind:checked={$customisation.applyPersonalisation} -->
      <!-- /> -->
      <!-- /> -->

    </AccordionItem>

  </Accordion>
</div>
