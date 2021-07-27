'use strict';
import {ParamterClassType} from "./parameter"
import {Filter as FilterType} from "./types/config"
export class Filter {
	params : {[key:string]: ParamterClassType};
	conf: FilterType;
	constructor(conf, params) {
		this.params = params;
		this.conf = conf;
		if (! conf.condition){
			throw new Error("filter without condition");
		}
		if (!conf.param1 || !params[this.conf.param1] ){
		 console.log(`${this.conf.param1} not found in paramters`);
			throw new Error("filter without param1");
		}
		if (!conf.param2 || ! params[this.conf.param2] ){
			console.log(`${this.conf.param2} not found in paramters`)
			throw new Error("filter without param2");
		}


	}

	_bigger(param1: number, param2: number){
		return param1 > param2;
	}

	_equal(param1: number,param2: number){
		return param1 === param2;
	}

	async filter(params :ParamterClassType , symbol){
		if (!params[this.conf.param1]){
			console.log(`Filter class:  ${this.conf.param1} not found`);

		}
		if (!params[this.conf.param2]){
			console.log(`Filter class:  ${this.conf.param2} not found`);
		}

		const param1 = await ((params[this.conf.param1]).get(params, symbol));
		const param2 = await ((params[this.conf.param2]).get(params, symbol))
		switch (this.conf.condition) {
			case ">":
				return this._bigger(param1, param2);
			case "<":
				return this._bigger(param2, param1);
			case "=":
				return this._equal(param1, param2);
			case ">=":
				return this._equal(param1, param2) || this._bigger(param1, param2)
			default:
				throw new Error("unknown");
				break;
		}
	}
}

