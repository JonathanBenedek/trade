'use strict';
import {Filter}  from "./filter";
import {Configuration} from './types/config'
export  class FilterManager {
	conf : Configuration;
	filtersIndex : number;
	currentFiltersConfiguration : Array<[{}]>
	constructor(conf : Configuration) {
		this.conf = conf;
		this.filtersIndex = 0;
		this.currentFiltersConfiguration = [];// array of conf
	}
	_setNextFiltersConfiguration(){
		const filtersArray2Array = this._getFiltersConfigByArrays();
		this.currentFiltersConfiguration = filtersArray2Array[this.filtersIndex];

		this.filtersIndex = this.filtersIndex + 1;
		if (this.filtersIndex >= filtersArray2Array.length){
			return false;
		}
	}

	_getFiltersConfigByArrays(){
		return [];
		//TODO: parse the config
		// and place each filter-config instead his ID in the exist array. return
		// return the array
	}

	
 	_getTechnicalCorrection(params) {
	
		
	}

	async getSellSignalAboutSymbol(params, symbol){
		const sellFilters =  this.conf.SELL_SIGNAL.filters;
		const sellSignal = await this._checkFilters(sellFilters,params, symbol);
		return sellSignal;
	}

	async _checkFilters(filtersGroup, params, symbol){
		let filterGroupResults = true;
		for (let filters of filtersGroup){
			//OR
			filterGroupResults = true;
			let filterResult = true;
	
			for (let filter of filters){
				// AND
				filterResult =await new Filter(this.conf.filters[filter],params ).filter(params, symbol);
				if (!filterResult){
					break;
				}
			}
			filterGroupResults = filterResult;
			if (filterGroupResults){
				break; // filterGroupResults should end with true
			}
		}
		return filterGroupResults;
	}

	async getBuySignalAboutSymbol(params, symbol){
		const buyGroupFilters = this.conf.BUY_SIGNAL.filters;
		const findStockFilters = this.conf.FIND_STOCK_MONTHLY.filters;
		const technicalCorrectionFilters = this.conf.TECHNICAL_CORRECTION.filters;
		
		const findStockSignal = await this._checkFilters(findStockFilters,params,symbol);
		if (!findStockSignal){
			console.log(`findStockSignal return false`);
			return false;
		}
		const technicalCorrectionSignal = await this._checkFilters(technicalCorrectionFilters,params,symbol);
		if (!technicalCorrectionSignal){
			console.log(`technicalCorrectionSignal return false`);
			return false;
		}
		const buyGroupSignal = await this._checkFilters(buyGroupFilters,params,symbol);
		if (!buyGroupSignal){
			console.log(`buyGroupSignal return false`);
			return false;
		}
		console.log(`getBuySignalAboutSymbol return true`);
		return true;
	}	
/*
	async getBuySignalAboutSymbol(params, symbol){
		
		this.filtersIndex = 0;
		let filterGroupResults = true;
		while ( this._setNextFiltersConfiguration()){
			filterGroupResults = true; // set to true beacuse between each array has OR operator
			for (let filtersConfig of this.currentFiltersConfiguration){
				let filterResult = new Filter(filtersConfig,params).filter(symbol);
				if (!filterResult){
					filterGroupResults = false;
					break; // break beacuse is AND operator
				}
			};
		}
		const finalResult = filterGroupResults;
		return finalResult;
	}*/
}

