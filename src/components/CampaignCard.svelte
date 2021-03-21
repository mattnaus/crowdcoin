<script>
  import Button from './Button.svelte';
  import { Link } from 'svelte-routing';

	export let address;
</script>

<div class="relative rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm flex items-center space-x-3 hover:border-gray-400 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
  <div class="flex-shrink-0">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-8 h-8 text-indigo-600">
      <path fill-rule="evenodd" d="M8 4a3 3 0 00-3 3v4a5 5 0 0010 0V7a1 1 0 112 0v4a7 7 0 11-14 0V7a5 5 0 0110 0v4a3 3 0 11-6 0V7a1 1 0 012 0v4a1 1 0 102 0V7a3 3 0 00-3-3z" clip-rule="evenodd" />
    </svg>
  </div>
  <div class="flex-1 min-w-0">
    <Link to="{address}" class="focus:outline-none">
      <span class="absolute inset-0" aria-hidden="true"></span>
      <p class="text-sm font-medium text-gray-900">
        {address}
      </p>
    </Link>
  </div>
</div>
