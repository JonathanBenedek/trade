"use strict";
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
const configurationService_1 = require("./src/configurationService");
const parameter_1 = require("./src/parameter");
const filterManager_1 = require("./src/filterManager");
function getConfiguration() {
    return configurationService_1.configurationService.get();
}
function getParamsFromConfiguration(conf) {
    return conf.params;
}
function start() {
    return __awaiter(this, void 0, void 0, function* () {
        //const symbols =  await csv.read();
        var params = {};
        params = yield buildParamtersFromConfiguration(params);
        //(new FilterManager()).getResultsAboutSymbol
        //const filters =  buildFiltersFromConfiguration();
        console.log("---done with build paramters----");
        console.log("---start filters----");
        const filterManager = new filterManager_1.FilterManager(getConfiguration());
        console.log("sell signal results" + (yield filterManager.getBuySignalAboutSymbol(params, "UNH")));
        //const query = buildPathRequest('TLT5VUQY0UMWLEDK', 'sma5', symbols[0]);
        //console.log(query);
        //https.get(query);
    });
}
/*function buildFiltersFromConfiguration(){
     const filters = {}
   const configuration = getConfiguration();

   const filtersFromConfig = getFiltersFromConfig(configuration);
   const filterManager =  new FilterManager(filtersFromConfig);

   for (const [key, value] of Object.entries(filtersFromConfig)) {
       console.log(`set param : ${key}`);
       filters[key] = new Filter(value);
   }
   return filters;
 }*/
function getFiltersFromConfig(config) {
    return config.filters;
}
function buildParamtersFromConfiguration(params) {
    console.log("buildParamtersFromConfiguration - start");
    var configuration = getConfiguration();
    var getConfParams = getParamsFromConfiguration(configuration);
    for (const [key, value] of Object.entries(getConfParams)) {
        console.log(`set param : ${key}`);
        params[key] = new parameter_1.Paramter(value);
    }
    console.log("buildParamtersFromConfiguration - end");
    return params;
}
function getParamters(params) {
    return __awaiter(this, void 0, void 0, function* () {
        for (const [key, value] of Object.entries(params)) {
            console.log(`getParamters ${key}`);
            console.log(yield params[key].get(params, "IBM"));
        }
    });
}
start();
//# sourceMappingURL=index.js.map