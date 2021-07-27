const csv = require('csv-parser')
const fs = require('fs');


module.exports.read =  function readCsv(){
	const promise = new Promise((resolve, rejects)=>{
		const results = [];
		fs.createReadStream('bats_symbols.csv')
		.pipe(csv())
		.on('data', (data) => results.push(data.Name))
		.on('end', () => {
			resolve(results)
		})
	});
	return promise;
}
