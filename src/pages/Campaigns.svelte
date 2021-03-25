<script>
  import { Router, Route, Link } from 'svelte-routing';
  import factory from '../utils/factory';
  import { onMount } from 'svelte';
  import CampaignCard from '../components/CampaignCard.svelte';
  import PageBar from '../components/PageBar.svelte';
  import CampaignDetails from "./CampaignDetails.svelte";
  import CampaignRequests from "./CampaignRequests.svelte";

  let campaigns = [];

  onMount(async () => {
    campaigns = await factory.methods.getDeployedCampaigns().call();
  });

</script>
<Router>

  <Route path="/">
    <PageBar pageTitle="Active Campaigns" showButton={true} />
    <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
    {#each campaigns as campaign}
      <CampaignCard address={campaign} />
    {/each}
    </div>
  </Route>

  <Route path="/:id" let:params>
    <CampaignDetails id="{params.id}" />
  </Route>

  <Route path="/:id/requests" let:params>
    <CampaignRequests id="{params.id}" />
  </Route>

</Router>
