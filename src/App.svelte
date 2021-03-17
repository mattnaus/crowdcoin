<script>
	import Tailwindcss from './Tailwindcss.svelte';
	import { Router, Route, Link } from "svelte-routing";
  import Home from "./pages/Home.svelte";
  import About from "./pages/About.svelte";
	import factory from './utils/factory';
	import { onMount } from 'svelte';


	onMount(async () => {
		const campaigns = await factory.methods.getDeployedCampaigns().call();
		console.log(campaigns);
	});

	console.log(factory);

	export let url = '';
</script>

<Tailwindcss />
<Router url="{url}">
 <nav>
    <Link to="/">Home</Link>
    <Link to="about">About</Link>
  </nav>

  <div>
    <Route path="/"><Home /></Route>
    <Route path="about" component="{About}" />
  </div>
</Router>
