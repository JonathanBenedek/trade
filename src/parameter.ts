'use strict';
import  {getQuery} from "./queryService";
import {ComplextParamter, NumberParamter, QueryParamter} from "./types/config";
type ParamterClassType = typeof Paramter;

class Paramter {
	conf: ComplextParamter | NumberParamter |  QueryParamter;
	method: string;
	value: ComplextParamter | NumberParamter |  QueryParamter;

	constructor(conf) {
		this.conf = conf;
		if (Number.isInteger(conf)){
			this.method = "value";
			this.value = conf;
		}
		else if (typeof conf === 'object'){
			if (conf.query && conf.value && conf.operation){
				this.method = "query";
			} else if (conf.param1 && conf.param2 && conf.operation){
				this.method = "complex"
			}
			else{
				console.error("paramter not valid");
				throw new Error("paramter not valid" + conf);
			}
		}
	}
	
	async _calculateComplex(params, symbol){
		console.log(`start calculate complext with param1=  ${params[(this.conf as ComplextParamter).param1 ]}  param2=  ${params[(this.conf as ComplextParamter).param2 ]}`)
		return this._doOperation(await params[(this.conf as ComplextParamter).param1 ].get(params, symbol), await params[(this.conf as ComplextParamter).param2].get(params, symbol), (this.conf as ComplextParamter).operation);
	}

	_doOperation(valueParam1, valueParam2, operation){
		let value = 0;

		switch (operation) {
            case "sum":
                value = valueParam1 + valueParam2;
                break;
            case "sub":
				value = valueParam1 - valueParam2;
                break;
            case "multiply":
				value = valueParam1 * valueParam2;
                break;
            case "divide":
				value = valueParam1 / valueParam2;
                break;
		}
		return value
	}

	async _calculateQuery(symbol){
		return await getQuery(this.conf,symbol);
	}

	async get(params, symbol){
		console.log("paramter class : get start");
		if (this.value){
				return this.value;
		}
			switch (this.method) {
				case "complex":
						console.log("paramter class : complex");
						this.value = await this._calculateComplex(params, symbol);
					break;
				case "query":
					console.log("paramter class : query");
					this.value = await this._calculateQuery(symbol);
					break;
				default:
					console.error("Paramters class : no get method");
					break;
			}
			return (this.value);
	

	}

}


export {Paramter, ParamterClassType};
