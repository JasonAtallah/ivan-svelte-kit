import { error } from '@sveltejs/kit';
import { Yahoo } from '../../yahoo';

/** @type {import('./$types').PageServerLoad} */
export async function load({ params: { ticker } }: { params: { ticker?: string } }) {
	if (!ticker) throw error(400, 'No ticker found');

	const yahoo = new Yahoo(ticker);
	const currentValue = await yahoo.getCurrentValue();
	const marginOfSafety = await yahoo.getMarginOfSafety();
	const intrinsicValue = await yahoo.getIntrinsicValue();

	return {
		ticker,
		currentValue,
		marginOfSafety,
		intrinsicValue
	};
}
