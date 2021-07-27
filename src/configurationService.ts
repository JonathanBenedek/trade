import fs from 'fs';
import path  from 'path';

const  confPath  =  '../conf/configurationIlan.json';
 function getConfiguration(){
	let configurationData= fs.readFileSync(path.resolve(__dirname, confPath));
	let configuration = JSON.parse(configurationData.toString());
	return configuration;
}
export const configurationService = {get : getConfiguration}
