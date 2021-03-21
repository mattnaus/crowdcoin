<script>
  import PageBar from '../components/PageBar.svelte';
  import Button from '../components/Button.svelte';
  import factory from '../utils/factory';
  import web3 from '../utils/web3';
  import { navigate } from "svelte-routing";

  let minContribution = 100;
  let message;
  let formButton;

  const createCampaign = async () => {

    formButton.loading = true;
    message = false;

    try {
      const accounts = await web3.eth.getAccounts();
      await factory.methods.createCampaign(minContribution).send({
        from: accounts[0]
      });
      navigate("/", { replace: true });
    } catch (err) {
      message = err.message;
    }
    formButton.loading = false;

  }
</script>

<PageBar pageTitle="New Campaign" />
<form class="flex flex-col items-start w-1/3">

  <label class="w-full mb-4">
    <span class="text-sm font-bold block mb-2">Minimum contribution (wei)</span>
    <input type="number" class="border-2 border-grey-200 px-4 py-2 rounded w-full" bind:value={minContribution}>
  </label>

  {#if message}
  <div class="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-4 w-full">
    <div class="flex">
      <div class="flex-shrink-0">
        <!-- Heroicon name: solid/exclamation -->
        <svg class="h-5 w-5 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
          <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
        </svg>
      </div>
      <div class="ml-3">
        <p class="text-sm text-yellow-700">
          {message}
          <a href="#" class="font-medium underline text-yellow-700 hover:text-yellow-600">

          </a>
        </p>
      </div>
    </div>
  </div>
  {/if}

  <Button bind:this={formButton} type="button" label="Create Campaign" on:click={createCampaign} loading={false} />

</form>
