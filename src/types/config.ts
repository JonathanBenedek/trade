export type Paramter =(number)
export type ComplextParamter = { param1 : string, param2: string, operation:string};
export type NumberParamter  = number;
export type QueryParamter = {query: {[key:string]: string}, operation: Operation, value:Location}
export type Location = {position: Position, key: string};
export type Position = string | number
export type Operation = string;
export type Filter = {
	param1: Paramter,
	condition: string,
	param2: Paramter
}
export type Configuration ={
	filters: Array<string>,
	params: Array<string>,
	BUY_SIGNAL :{
		filters: Array<[string]>,
	},
	SELL_SIGNAL:{
		filters: Array<[string]>,
	},
	TECHNICAL_CORRECTION:{
		filters: Array<[string]>,
	},
	FIND_STOCK_MONTHLY:{
		filters: Array<[string]>,
	},

}