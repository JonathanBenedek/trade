'use strict';
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FilterManager = void 0;
const filter_1 = require("./filter");
class FilterManager {
    constructor(conf) {
        this.conf = conf;
        this.filtersIndex = 0;
        this.currentFiltersConfiguration = []; // array of conf
    }
    _setNextFiltersConfiguration() {
        const filtersArray2Array = this._getFiltersConfigByArrays();
        this.currentFiltersConfiguration = filtersArray2Array[this.filtersIndex];
        this.filtersIndex = this.filtersIndex + 1;
        if (this.filtersIndex >= filtersArray2Array.length) {
            return false;
        }
    }
    _getFiltersConfigByArrays() {
        return [];
        //TODO: parse the config
        // and place each filter-config instead his ID in the exist array. return
        // return the array
    }
    _getTechnicalCorrection(params) {
    }
    getSellSignalAboutSymbol(params, symbol) {
        return __awaiter(this, void 0, void 0, function* () {
            const sellFilters = this.conf.SELL_SIGNAL.filters;
            const sellSignal = yield this._checkFilters(sellFilters, params, symbol);
            return sellSignal;
        });
    }
    _checkFilters(filtersGroup, params, symbol) {
        return __awaiter(this, void 0, void 0, function* () {
            let filterGroupResults = true;
            for (let filters of filtersGroup) {
                //OR
                filterGroupResults = true;
                let filterResult = true;
                for (let filter of filters) {
                    // AND
                    filterResult = yield new filter_1.Filter(this.conf.filters[filter], params).filter(params, symbol);
                    if (!filterResult) {
                        break;
                    }
                }
                filterGroupResults = filterResult;
                if (filterGroupResults) {
                    break; // filterGroupResults should end with true
                }
            }
            return filterGroupResults;
        });
    }
    getBuySignalAboutSymbol(params, symbol) {
        return __awaiter(this, void 0, void 0, function* () {
            const buyGroupFilters = this.conf.BUY_SIGNAL.filters;
            const findStockFilters = this.conf.FIND_STOCK_MONTHLY.filters;
            const technicalCorrectionFilters = this.conf.TECHNICAL_CORRECTION.filters;
            const findStockSignal = yield this._checkFilters(findStockFilters, params, symbol);
            if (!findStockSignal) {
                console.log(`findStockSignal return false`);
                return false;
            }
            const technicalCorrectionSignal = yield this._checkFilters(technicalCorrectionFilters, params, symbol);
            if (!technicalCorrectionSignal) {
                console.log(`technicalCorrectionSignal return false`);
                return false;
            }
            const buyGroupSignal = yield this._checkFilters(buyGroupFilters, params, symbol);
            if (!buyGroupSignal) {
                console.log(`buyGroupSignal return false`);
                return false;
            }
            console.log(`getBuySignalAboutSymbol return true`);
            return true;
        });
    }
}
exports.FilterManager = FilterManager;
//# sourceMappingURL=filterManager.js.map