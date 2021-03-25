<script>
  import Button from './Button.svelte';
  import { onMount } from "svelte";
  import Notification from './Notification.svelte';
  import web3 from '../utils/web3';

  let notification,
    voteButton;

  onMount(async () => {
    console.log(accounts);
  });

  const voteOnRequest = async (id) => {
    voteButton.loading = true;

    console.log(id);

    try {
      await campaign.methods.approveRequest(Number(id)).send({
        from: accounts[0]
      });
    } catch (err) {
      notification.message = err.message;
      notification.show = "warning";
    }

    voteButton.loading = false;
  }

  const completeRequest = async (id) => {
    console.log('complete request');
  }

  export let id = 0;
  export let description = "Requets description";
  export let value = 0;;
  export let recipient = "address";
  export let complete = false;
  export let approvalCount = 0;
  export let campaign;
  export let accounts;
</script>
<div class="bg-white shadow overflow-hidden sm:rounded-lg mb-10">
  <div class="px-4 py-5 sm:px-6">
    <Notification bind:this={notification} />
    <h3 class="text-lg leading-6 font-medium text-gray-900">
      Request #{id}
    </h3>
  </div>
  <div class="border-t border-gray-200 px-4 py-5 sm:p-0">
    <dl class="sm:divide-y sm:divide-gray-200">
      <div class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
        <dt class="text-sm font-medium text-gray-500">
          Description
        </dt>
        <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
          {description}
        </dd>
      </div>
      <div class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
        <dt class="text-sm font-medium text-gray-500">
          Amount
        </dt>
        <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
          {value} ETH
        </dd>
      </div>
      <div class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
        <dt class="text-sm font-medium text-gray-500">
          Recipient
        </dt>
        <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
          {recipient}
        </dd>
      </div>
      <div class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
        <dt class="text-sm font-medium text-gray-500">
          Complete
        </dt>
        <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
          {#if complete}
          <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
              Completed
          </span>
          {:else}
          <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-pink-100 text-pink-800">
            Not completed
          </span>
          {/if}
        </dd>
      </div>
      <div class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
        <dt class="text-sm font-medium text-gray-500">
          Number of "yes" votes
        </dt>
        <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
          {approvalCount}
        </dd>
      </div>
      <div class="px-4 py-5 sm:px-6">
        <Button bind:this={voteButton} label="Vote on request" on:click={voteOnRequest(id)} classes="mr-4" />
        <Button label="Complete request" on:click={completeRequest(id)} style="secondary" />
      </div>
    </dl>
  </div>
</div>
