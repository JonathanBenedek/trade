
import  {configurationService} from './src/configurationService';
import {Paramter} from'./src/parameter';
import {} from './src/types/config';
import {FilterManager as FilterManagerClass} from './src/filterManager';

  function getConfiguration(){
	return configurationService.get();
  }

  function getParamsFromConfiguration(conf){
	return conf.params; 
  }
  


  async function start(){
	//const symbols =  await csv.read();

	var params = {};
	params = await buildParamtersFromConfiguration(params);
	//(new FilterManager()).getResultsAboutSymbol
	//const filters =  buildFiltersFromConfiguration();
	console.log("---done with build paramters----");
	console.log("---start filters----");

	const filterManager = new FilterManagerClass(getConfiguration());
	console.log("sell signal results" + await filterManager.getBuySignalAboutSymbol(params,"UNH"));


	//const query = buildPathRequest('TLT5VUQY0UMWLEDK', 'sma5', symbols[0]);
	//console.log(query);
	//https.get(query);
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

  function getFiltersFromConfig(config){
	  return config.filters;
  }

  function buildParamtersFromConfiguration(params){
	  console.log("buildParamtersFromConfiguration - start");
	var configuration = getConfiguration();
	var getConfParams =  getParamsFromConfiguration(configuration);
	for (const [key, value] of Object.entries(getConfParams)) {
		console.log(`set param : ${key}`);
		params[key] = new Paramter(value);
	}
	console.log("buildParamtersFromConfiguration - end");

	return params;
  }

  async function getParamters(params){
	for (const [key, value] of Object.entries(params)) {
			console.log(`getParamters ${key}`);
			console.log(await params[key].get(params ,"IBM"));
	}
  }

  start();