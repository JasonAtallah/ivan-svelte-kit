import { API_KEY } from '$env/static/private';
import { error } from '@sveltejs/kit';

const BASE_URL = 'https://yh-finance.p.rapidapi.com';

export class Yahoo {
	ticker!: string;
	curValue?: number;
	intrinsicValue?: number;
	summary?: unknown;
	balanceSheet?: unknown;
	private apiKey: string;

	get headers(): Headers {
		const headers = new Headers();
		headers.append('X-RapidAPI-Key', this.apiKey);
		return headers;
	}
	constructor(ticker: string) {
		this.ticker = ticker.trim();
		this.apiKey = API_KEY;
	}

	// API calls
	async getBalanceSheet() {
		if (this.balanceSheet) return this.balanceSheet;
		const url = `${BASE_URL}/stock/v2/get-balance-sheet?symbol=${this.ticker}`;
		const res = await fetch(url, { headers: this.headers });
		const data = await res.json();
		this.balanceSheet = data;
		return data;
	}

	async getSummary() {
		if (this.summary) return this.summary;
		const url = `${BASE_URL}/stock/v2/get-summary?symbol=${this.ticker}`;
		const res = await fetch(url, { headers: this.headers });
		const data = await res.json();
		this.summary = data;
		return data;
	}

	// Calculations

	async getBookValuePerShare() {
		const totalStockerholderEquity = await this.getTotalStockholderEquity();
		const commonSharesOutstanding = await this.getCommonSharesOutstanding();
		const bvps = totalStockerholderEquity / commonSharesOutstanding;
		return bvps;
	}

	async getCommonSharesOutstanding() {
		const summary = await this.getSummary();
		const commonSharesOutstanding = summary['defaultKeyStatistics']['sharesOutstanding']['raw'];
		return commonSharesOutstanding;
	}

	async getCurrentValue(): Promise<number> {
		const summary = await this.getSummary();
		const curValue = summary.price.regularMarketPrice.raw;
		this.curValue = curValue;
		return curValue;
	}

	async getEarningsPerShare(): Promise<number> {
		const summary = await this.getSummary();
		const earningsPerShare = summary.defaultKeyStatistics.trailingEps.raw;
		return earningsPerShare;
	}

	async getIntrinsicValue(): Promise<number> {
		if (this.intrinsicValue) return this.intrinsicValue;

		const earningsPerShare = await this.getEarningsPerShare();
		if (earningsPerShare < 0) throw error(500, 'Cannot calculate, EPS below zero');

		const bookValuePerShare = await this.getBookValuePerShare();
		const intrinsicValue = Math.sqrt(22.5 * earningsPerShare * bookValuePerShare);
		this.intrinsicValue = intrinsicValue;
		return this.toTwoDecimalPlaces(intrinsicValue);
	}

	async getMarginOfSafety(): Promise<number> {
		if (!this.intrinsicValue || !this.curValue)
			throw error(500, 'Cannot calculate margin of safety');

		const marginOfSafety = ((this.intrinsicValue - this.curValue) / this.intrinsicValue) * 100;
		return this.toTwoDecimalPlaces(marginOfSafety);
	}

	async getTotalStockholderEquity() {
		const balanceSheet = await this.getBalanceSheet();
		const totalStockholderEquity =
			balanceSheet['balanceSheetHistoryQuarterly']['balanceSheetStatements'][0][
				'totalStockholderEquity'
			]['raw'];
		return totalStockholderEquity;
	}

	// Utils
	private toTwoDecimalPlaces(num: number) {
		const roundedNum = num.toFixed(2);
		return Number(roundedNum);
	}
}
