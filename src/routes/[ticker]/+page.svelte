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
	<span><b>Earnings / Share: </b>{data.earningsPerShare}</span>
	<span><b>Book Value / Share: </b>{data.bookValuePerShare}</span>
	<span><b>Total Stockholder Equity: </b>{data.totalStockerholderEquity.toLocaleString()}</span>
	<span><b>Common Shares Outstanding: </b>{data.commonSharesOutstanding.toLocaleString()}</span>

	<Button onClick={() => goto('/')}>Back</Button>
</div>
