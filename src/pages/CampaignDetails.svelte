<script>
  import Campaign from '../utils/campaign';
  import { Link } from "svelte-routing";
  import { onMount } from 'svelte';
  import PageBar from '../components/PageBar.svelte';
  import Button from '../components/Button.svelte';
  import Notification from '../components/Notification.svelte';
  import web3 from '../utils/web3';

  let campaign,
    summary,
    formButton,
    campaignDetails = [],
    notification,
    contribution = 0;

  onMount( async () => {

    loadCampaign();

  });

  const loadCampaign = async () => {

    campaign = Campaign(id);

    summary = Object.values(await campaign.methods.getSummary().call());

    campaignDetails['minimumContribution'] = summary[0];
    campaignDetails['totalCollected'] = web3.utils.fromWei(summary[1], "ether");
    campaignDetails['requests'] = summary[2];
    campaignDetails['backers'] = summary[3];
    campaignDetails['manager'] = summary[4];

    console.log(summary, summary.length);

  }

  const contribute = async () => {

    notification.show = false;

    if ( web3.utils.toWei(String(contribution), "ether") < Number(summary[0]) ) {
      notification.message = "Please contribute at least " + summary[0] + " wei.";
      notification.show = "warning";
      return false;
    }

    formButton.loading = true;

    try {

      const accounts = await web3.eth.getAccounts();
      await campaign.methods.contribute().send({
        from: accounts[0],
        value: web3.utils.toWei(contribution, "ether")
      });

      loadCampaign();

      notification.message = "You have contributed to this campaign.";
      notification.show = "confirmation";

    } catch (err) {
      notification.message = err.message;
      notification.show = "warning";
    }

    formButton.loading = false;

  }

  export let id;
</script>

<PageBar pageTitle="Campaign details" />

<!-- This example requires Tailwind CSS v2.0+ -->
<nav class="flex mb-6" aria-label="Breadcrumb">
  <ol class="flex items-center space-x-4">
    <li>
      <div>
        <a href="#" class="text-gray-400 hover:text-gray-500">
          <!-- Heroicon name: solid/home -->
          <svg class="flex-shrink-0 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
          </svg>
          <span class="sr-only">Home</span>
        </a>
      </div>
    </li>
    <li>
      <div class="flex items-center">
        <svg class="flex-shrink-0 h-5 w-5 text-gray-300" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
          <path d="M5.555 17.776l8-16 .894.448-8 16-.894-.448z" />
        </svg>
        <Link to="{id}" class="ml-4 text-sm font-medium text-gray-500 hover:text-gray-700">Campaign details</Link>
      </div>
    </li>
    <li>
      <div class="flex items-center">
        <svg class="flex-shrink-0 h-5 w-5 text-gray-300" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
          <path d="M5.555 17.776l8-16 .894.448-8 16-.894-.448z" />
        </svg>
        <Link to="{id}/requests" class="ml-4 text-sm font-medium text-gray-500 hover:text-gray-700">Campaign requests</Link>
      </div>
    </li>
  </ol>
</nav>

<div class="flex">
  <div class="w-2/3">
  <!-- This example requires Tailwind CSS v2.0+ -->
    <div class="bg-white shadow overflow-hidden sm:rounded-lg">
    <div class="px-4 py-5 sm:px-6">
      <h3 class="text-lg leading-6 font-medium text-gray-900">
        {id}
      </h3>
      <p class="mt-1 max-w-2xl text-sm text-gray-500">
        Campaign Information
      </p>
    </div>
    <div class="border-t border-gray-200 px-4 py-5 sm:p-0">
      <dl class="sm:divide-y sm:divide-gray-200">
        <div class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
          <dt class="text-sm font-medium text-gray-500">
            Minimum contribution
          </dt>
          <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
            {campaignDetails.minimumContribution} wei
          </dd>
        </div>
        <div class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
          <dt class="text-sm font-medium text-gray-500">
            Total amount raised
          </dt>
          <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
            {campaignDetails.totalCollected}
          </dd>
        </div>
        <div class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
          <dt class="text-sm font-medium text-gray-500">
            Number of requests
          </dt>
          <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
            {campaignDetails.requests}
          </dd>
        </div>
        <div class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
          <dt class="text-sm font-medium text-gray-500">
            Total number of backers
          </dt>
          <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
            {campaignDetails.backers}
          </dd>
        </div>
        <div class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
          <dt class="text-sm font-medium text-gray-500">
            Manager
          </dt>
          <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
            {campaignDetails.manager}
          </dd>
        </div>
      </dl>
    </div>
    </div>

  </div>
  <div class="w-1/3 pl-10">
    <form action="#" method="POST">
      <div class="shadow sm:rounded-md sm:overflow-hidden">
        <div class="bg-white px-4 py-5 border-b border-gray-200 sm:px-6">
          <h3 class="text-lg leading-6 font-medium text-gray-900">
            Contribute
          </h3>
          <p class="mt-1 text-sm text-gray-500">
            Use the form below to contribute to this campaign.
          </p>
        </div>
        <div class="px-4 py-5 bg-white space-y-6 sm:p-6">
          <div>
            <div class="col-span-3 sm:col-span-2">
              <label for="price" class="block text-sm font-medium text-gray-700">Your contribution</label>
              <div class="mt-1 relative rounded-md shadow-sm">
                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span class="text-gray-500 sm:text-sm">
                    $
                  </span>
                </div>
                <input type="text" name="price" id="price" class="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md" placeholder="0" bind:value={contribution}>
                <div class="absolute inset-y-0 right-0 flex items-center">
                  <label for="currency" class="sr-only">Currency</label>
                  <select id="currency" name="currency" class="focus:ring-indigo-500 focus:border-indigo-500 h-full py-0 pl-2 pr-7 border-transparent bg-transparent text-gray-500 sm:text-sm rounded-md">
                    <option>ETH</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
          <Notification bind:this={notification} show={false} />
        </div>
        <div class="px-4 py-3 bg-gray-50 text-right sm:px-6">
          <Button bind:this={formButton} type="button" label="Contribute to this campaign" on:click={contribute} loading={false} />
        </div>
      </div>
    </form>
  </div>
</div>
