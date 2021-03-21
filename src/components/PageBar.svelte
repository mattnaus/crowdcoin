<script>
  import Button from '../components/Button.svelte';

  export let pageTitle = "Crowdstart";
</script>

<div class="pb-5 border-b border-gray-300 sm:flex sm:items-center sm:justify-between mb-10">
  <h3 class="text-lg leading-6 font-medium text-gray-900">
    {pageTitle}
  </h3>
  <div class="mt-3 sm:mt-0 sm:ml-4">
    {#if pageTitle !== 'New Campaign'}
    <Button label="New Campaign" icon="plus" type="ilink" target="/new" />
    {/if}
  </div>
</div>
