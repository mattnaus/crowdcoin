<script>
  import Campaign from '../utils/campaign';
  import { onMount } from 'svelte';

  let campaign, summary;

  onMount( async () => {

    campaign = Campaign(id);

    summary = await campaign.methods.getSummary().call();

    console.log(summary);

  });

  export let id;
</script>

<div class="flex">
  <div class="w-2/3 flex">
    <div class="border-2 rounded shadow-sm p-4">

    </div>
    <div class="border-2 rounded shadow-sm p-4">

    </div>
    <div class="border-2 rounded shadow-sm p-4">

    </div>
    <div class="border-2 rounded shadow-sm p-4">

    </div>
  </div>
  <div class="w-1/3">

  </div>
</div>
