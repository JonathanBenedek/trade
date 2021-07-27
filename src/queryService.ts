import { rejects } from 'assert';
import { start } from 'repl';
import { resolve } from 'url';
import {httpsService } from './httpsService';
import {Position, Location, Operation} from "./types/config"
const API_KEY= "TLT5VUQY0UMWLEDK"
const API_KEY_SECOND= "57IWWJSF3WE360TA"



function extractSecondEntetiy (response){
	let index = 0
	for (const [param, value] of Object.entries(response)) {
		if (index === 1){
			return value
		}
		index = index + 1; 
	}
}

function _getOperation(data, location: Location){
	console.log(`_getOperation start  data=${data} ` )
	const position = location.position;
	const key = location.key;
	let index = 1;
	for (const [param, value] of Object.entries(data)) {
		if (index == position){
			return value[key];
		}
		index = index + 1; 
	}
}

function _extractPositionRange(range: string) : {start:number, end:number}{
	const splitedRanges : Array<string> = range.split('-');
	if (splitedRanges.length !== 2){
		throw new Error("splitedRanges not equal to 2");
	}
	return {start: parseInt( splitedRanges[0]), end: parseInt( splitedRanges[1])};
}


export function _minOperation(data , location : Location){
	console.log(`_minOperation start  data=${data} ` );
	const position = location.position;
	const key = location.key;
	let index = 1;
	let minValue = 999999;
	let hasMin = false;
	let {start, end} = _extractPositionRange(position as string);
	for (const [param, value] of Object.entries(data)) {
		if (start > index){
			index = index + 1; 
			continue;
		}
		if (end < index){
			break; // END
		}
		if (minValue > value[key]){
			hasMin = true;
			minValue = value[key];
		}
		index = index + 1; 
	}
	if (!hasMin){
		throw new Error("not found minimum");
	}
	return minValue;
}



export function _maxOperation(data, location : Location){
	console.log(`_maxOperation start  data=${data} ` );
	const position = location.position;

	const key = location.key;
	let index = 1;
	let maxValue = 0;
	let hasMax = false;
	let {start, end} = _extractPositionRange(position as string);
	for (const [param, value] of Object.entries(data)) {
		if (start > index){
			index = index + 1; 
			continue;
		}
		if (end < index){
			break; // END
		}
		if (maxValue < value[key]){
			hasMax = true;
			maxValue = value[key];
		}
		index = index + 1; 
	}
	if (!hasMax){
		throw new Error("not found minimum");
	}
	return maxValue;
}

export function _averageOperation(data, location: Location){
	console.log(`_averageOperation start  data=${data} ` )
	const position = location.position;

	const key = location.key;
	let index = 1;
	let counter = 0;
	let {start, end} = _extractPositionRange(position as string);
	for (const [param, value] of Object.entries(data)) {
		if (start > index){
			index = index + 1; 
			continue;
		}
		if (end < index){
			break; // END
		}
		counter = counter + parseFloat(value[key])
		index = index + 1; 
	}
	const avarage = counter / (index - 1 );

	return avarage;
}
export function _findLastLowOperation(data, location: Location){
	console.log(`_findLastLowOperation start  data=${data} ` )
	console.log(`_averageOperation start  data=${data} ` )
	const position = location.position;

	const key = location.key;
	let index = 1;
	let lastOne = 0;
	let {start, end} = _extractPositionRange(position as string);
	for (const [param, value] of Object.entries(data)) {
		if (start > index){
			index = index + 1; 
			continue;
		}
		if (end < index){
			break; // END
		}
		if (index == 1){
			lastOne = parseFloat(value[key]);
			continue;
		}
		let currentValue = parseFloat(value[key]);
		if (lastOne > currentValue){

		}
	//	counter = counter + parseFloat(value[key])
		index = index + 1; 
	}
//	const avarage = counter / (index - 1 );

//	return avarage;
	
}
function _findLastHigh(data){
	console.log(`_findLastHigh start  data=${data} ` )

	//TODO:
	return 0;
}
function _findSecondLastLow(data){
	console.log(`_findSecondLastLow start  data=${data} ` )

	//TODO:
	return 0;
}
function _findSecondLastHigh(data){
	console.log(`_findSecondLastHigh start  data=${data} ` )

	//TODO:
	return 0;
}
export function _averageDiffrences(data, location: Location){
	console.log(`_averageDiffrences start  data=${data} `);
	const position = location.position;

	const key = location.key;
	let index = 1;
	let lastOne = 0;
	let sum = 0 ;
	let {start, end} = _extractPositionRange(position as string);
	for (const [param, value] of Object.entries(data)) {
		if (start > index){
			index = index + 1; 
			continue;
		}
		if (end < index){
			break; // END
		}
		if (index == 1){
			lastOne = parseFloat(value[key]);
			index = index + 1;
			continue;
		}
		let currentValue = parseFloat(value[key]);

		sum = (currentValue - lastOne) + sum;
		lastOne = currentValue;
		index = index + 1; 
	}
	const avarage = sum / (index - 1 );

	return avarage;
}





function extractByOperation(data , operation : Operation  , location: Location){
	switch (operation) {
		case "get":
			return _getOperation(data, location);
			break;
		case "min":
			return _minOperation(data,location);
			break;
		case "max":
			return _maxOperation(data, location);
		case "average":
			return _averageOperation(data, location);
		case "find_last_low":
			return _findLastLowOperation(data, location);
		case "find_last_high":
			return _findLastHigh(data);
		case "find_second_last_low":
			return _findSecondLastLow(data);
		case "find_second_last_high":
			return _findSecondLastHigh(data);
		case "average_differences":
			return _averageDiffrences(data, location);
		default:
			console.error("operation not recognize = "+ operation);
			break;
	}
}

export async function getQuery(query, symbol){

	function _getQueryByRequestType(requestType){
		let result = ''; 
		const RequestParams =  requestType.query;
		if (!RequestParams){
			console.log(`warnnig: requestType= "+ ${requestType} not found`)
			return;
		}
		for (const [param, value] of Object.entries(RequestParams)) {
			result = `${result}${param}=${value}&`;
		}
		return result;
	  }	

	function _buildPathRequest(apiKey, requestType, symbol){
		const queryByRequestType =  _getQueryByRequestType(requestType);
	  	return `/query?${queryByRequestType}apikey=${apiKey}&symbol=${symbol}`
	}
	console.log(`query service: start`);
	const request =  _buildPathRequest(API_KEY, query, symbol);
	console.log(`query service: get request from conf request= ${request}`);

	let response : any= await httpsService.get(request, null);
	if (response.Note){
		
		//console.log(`response.Note = ${response.Note}`)
		await awaitOneMinIfNeeded();
		response = await httpsService.get(request, null);
	}
	if (response.Note){
		console.log(`response.Note = ${response.Note}`)
		awaitOneMinIfNeeded();
		response = await httpsService.get(request, null);

	}
	console.log(`query service: get request from https response = ${response}`);

	const secondEntity =  extractSecondEntetiy(response);
	if (!secondEntity){
		console.log("error: no secondEntity");
	}
	console.log(`query service: extractSecondEntetiy = results ${secondEntity}`);

	const valueFromQuery =  extractByOperation(secondEntity, query.operation ,query.value );
	console.log(`query service: return ${valueFromQuery}`);


	return valueFromQuery;
	
}
let conunter = 0
function awaitOneMinIfNeeded(){

	return new Promise((resolve,rejects)=>{
			setTimeout(()=>{
				resolve("");
		},40000);
	})
}



