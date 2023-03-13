import { error } from '@sveltejs/kit';
import { Yahoo } from '../../yahoo';

/** @type {import('./$types').PageServerLoad} */
export async function load({ params: { ticker } }: { params: { ticker?: string } }) {
	if (!ticker) throw error(400, 'No ticker found');

	const yahoo = new Yahoo(ticker);
	const currentValue = await yahoo.getCurrentValue();
	const intrinsicValue = await yahoo.getIntrinsicValue();
	const marginOfSafety = await yahoo.getMarginOfSafety();
	const earningsPerShare = await yahoo.getEarningsPerShare();
	const bookValuePerShare = await yahoo.getBookValuePerShare();
	const totalStockerholderEquity = await yahoo.getTotalStockholderEquity();
	const commonSharesOutstanding = await yahoo.getCommonSharesOutstanding();

	return {
		ticker,
		currentValue,
		intrinsicValue,
		marginOfSafety,
		earningsPerShare,
		bookValuePerShare,
		totalStockerholderEquity,
		commonSharesOutstanding
	};
}
