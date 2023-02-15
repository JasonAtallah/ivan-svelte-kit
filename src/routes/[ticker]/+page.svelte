<script>
	import { goto } from '$app/navigation';
	import Button from '../../components/button.svelte';

	/** @type {import('./$types').PageData} */
	export let data;
</script>

<div class="flex flex-col gap-2">
	<h1 class="text-4xl">{data.ticker.toUpperCase()}</h1>
	<span><b>Current Value: </b>{data.currentValue}</span>
	<span><b>Intrinsic Value: </b>{data.intrinsicValue}</span>
	<span><b>Margin of Safety: </b>{data.marginOfSafety}</span>
	<Button onClick={() => goto('/')}>Back</Button>
</div>
