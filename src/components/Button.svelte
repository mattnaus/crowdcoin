<svelte:options accessors/>
<script>
  import { Link } from "svelte-routing";
  import Spinner from "./Spinner.svelte";

  const styles = {
    'primary': 'inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500',
    'secondary': 'inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
  };

  const icons = {
    'plus': `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-6 h-6 mr-2">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
    </svg>`
  };

  export let label = "A button";
  export let icon = "none";
  export let type = "button";
  export let loading = false;
  export let target = false;
  export let style = "primary";
  export let classes = '';
</script>

{#if type === 'ilink'}
<Link to={target} class="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
  {#if icon !== 'none'}
    {@html icons[icon]}
  {/if}
  {label}
</Link>
{:else if type === 'link'}
<a href={target} class="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
  {#if icon !== 'none'}
    {@html icons[icon]}
  {/if}
  {label}
</a>
{:else}
<button class="{styles[style]} {classes}" on:click|preventDefault>
  {#if icon !== 'none'}
    {@html icons[icon]}
  {/if}
  {label}
  {#if loading}
    <Spinner classes="ml-2"/>
  {/if}
</button>
{/if}
