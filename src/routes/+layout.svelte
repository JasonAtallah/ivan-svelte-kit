<script>
	import { navigating } from '$app/stores';
	import '../app.css';
	import Loader from '../components/loader.svelte';
	import Navbar from '../components/navbar.svelte';
</script>

<div class="min-w-screen min-h-screen flex flex-col bg-gray-200 items-center">
	<Navbar />
	<div class="p-8">
		{#if $navigating}
			<Loader />
		{:else}
			<slot />
		{/if}
	</div>
</div>
