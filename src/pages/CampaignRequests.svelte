<script>
  import PageBar from '../components/PageBar.svelte';
  import { Link } from "svelte-routing";
  import { onMount } from "svelte";
  import Button from '../components/Button.svelte';
  import Notification from '../components/Notification.svelte';
  import Campaign from '../utils/campaign';
  import web3 from '../utils/web3';
  import Request from '../components/Request.svelte';

  let formButton,
    notification,
    campaign,
    campaignSummary,
    accounts,
    requestDescription = "",
    requestAmount = 0,
    requestRecipient = "",
    isManager = false,
    requests = [];

  onMount(async () => {

    campaign = Campaign(id);

    campaignSummary = await campaign.methods.getSummary().call();

    accounts = await web3.eth.getAccounts();

    if ( accounts[0] === campaignSummary[4] ) isManager = true;

    requests = await getRequests();

  });

  const getRequests = async () => {

    let r = await campaign.methods.getAllRequests().call(), requests = [];

    for (let i = 0; i < r[0].length; i++) {
      let request = {
        "description": r[0][i],
        "value": web3.utils.fromWei(r[1][i], "ether"),
        "recipient": r[2][i],
        "complete": r[3][i],
        "approvalCount": r[4][i]
      }
      requests.push(request);
    }

    return requests;
  }

  const createRequest = async () => {

    notification.show = false;

    if ( requestDescription === '' || requestAmount === 0 || requestRecipient === '' ) {
      notification.message = "Please provide a description, an amount and a recipient address for this request.";
      notification.show = 'warning';
      return false;
    }

    formButton.loading = true;

    try {

      await campaign.methods.createRequest(requestDescription, web3.utils.toWei(requestAmount), requestRecipient).send({
        from: accounts[0]
      });

      let r = await campaign.methods.getAllRequests().call();

      notification.message = "Your request has been stored.";
      notification.show = "confirmation";

      requests = await getRequests();

    } catch (err) {
      notification.message = err.message;
      notification.show = "warning";
    }

    formButton.loading = false;

  }

  export let id;
</script>

<PageBar pageTitle="Campaign requests" />

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
    {#each requests as request, i}
    <Request id={i} {...request} campaign={campaign} accounts={accounts} />
    {/each}
  </div>
  <div class="w-1/3 pl-10">
    {#if isManager}
      <form action="#" method="POST">
        <div class="shadow sm:rounded-md sm:overflow-hidden">
          <div class="bg-white px-4 py-5 border-b border-gray-200 sm:px-6">
            <h3 class="text-lg leading-6 font-medium text-gray-900">
              New request
            </h3>
            <p class="mt-1 text-sm text-gray-500">
              Use the form below to create new requests for this campaign.
            </p>
          </div>
          <div class="px-4 py-5 bg-white space-y-6 sm:p-6">
            <div>
              <label for="email" class="block text-sm font-medium text-gray-700">Description</label>
              <div class="mt-1">
                <textarea type="text" name="email" id="email" class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md" placeholder="Request description" bind:value="{requestDescription}"></textarea>
              </div>
            </div>
            <div>
              <label for="price" class="block text-sm font-medium text-gray-700">Amount</label>
              <div class="mt-1 relative rounded-md shadow-sm">
                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span class="text-gray-500 sm:text-sm">
                    $
                  </span>
                </div>
                <input type="text" name="price" id="price" class="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md" placeholder="0.00" aria-describedby="price-currency" bind:value="{requestAmount}">
                <div class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <span class="text-gray-500 sm:text-sm" id="price-currency">
                    ETH
                  </span>
                </div>
              </div>
            </div>
            <div>
              <label for="email" class="block text-sm font-medium text-gray-700">Recipient</label>
              <div class="mt-1">
                <input type="text" name="email" id="email" class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md" placeholder="Ethereum address" bind:value={requestRecipient}>
              </div>
            </div>
            <Notification bind:this={notification} />
          </div>
          <div class="px-4 py-3 bg-gray-50 text-right sm:px-6">
            <Button bind:this={formButton} type="button" label="Create request" loading={false} on:click="{createRequest}" />
          </div>
        </div>
      </form>
    {/if}
  </div>
</div>
