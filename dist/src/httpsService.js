"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.httpsService = void 0;
const https = require('https');
const { resolve } = require('url');
const { rejects } = require('assert');
const options = {
    hostname: 'www.alphavantage.co',
    port: 443,
    path: '/query?',
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
    }
};
const errorStringObj = "Thank you for using Alpha Vantage! Our standard API call frequency is 5 calls per minute and 500 calls per day. Please visit https://www.alphavantage.co/premium/ if you would like to target a higher API call frequency.";
function getData(query, resolveFromFauilre) {
    return new Promise((resolve, rejects) => {
        options.path = query;
        var data = [];
        const req = https.request(options, res => {
            console.log(`statusCode: ${res.statusCode}`);
            res.on('data', chunk => {
                data.push(chunk);
            }).on('end', () => {
                try {
                    let response = data.join(' ');
                    let json = JSON.parse(response);
                    if (json.note) {
                        console.log(`json note = ${json.note}`);
                        if (json.note == errorStringObj) {
                        }
                    }
                    // do something with JSON
                    resolve(json);
                }
                catch (error) {
                    console.log(error);
                    rejects(error);
                }
                ;
            });
        });
        req.on('error', error => {
            console.error(error);
            rejects(error);
        });
        req.end();
    });
}
exports.httpsService = { get: getData };
//# sourceMappingURL=httpsService.js.map