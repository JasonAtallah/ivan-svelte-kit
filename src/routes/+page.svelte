<script>
	import { goto } from '$app/navigation';
	import Button from '../components/button.svelte';

	let ticker = '';

	const handleSubmit = () => goto(`/${ticker}`);
</script>

<form on:submit|preventDefault={handleSubmit} class="flex flex-col w-96 gap-4">
	<div>
		<label
			class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
			for="grid-last-name"
		>
			Ticker
		</label>
		<input
			bind:value={ticker}
			class="appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
			type="text"
			placeholder="AAPL"
			required
		/>
	</div>
	<Button type="submit">Go</Button>
</form>
