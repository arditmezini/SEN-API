var env = process.env.NODE_ENV || "dev";
var config = require('../config')[env];
var sql = require("mssql");

sql.on('error', err => {
    console.log('SQL ERROR:');
    console.log(err);
});

var conx;
sql.connect(config.database).then(pool => {
	conx = pool;
});

module.exports = async function(query, params) {
	
	params = params || {}; // default to empty JSON if undefined
	
	var req = await conx.request();

	// loop through params JSON and add them as input
	Object.keys(params).forEach(key => {
		req.input(key, params[key]);
	})
	
	//console.log(params);
	//console.log(query);
	
	return await req.query(query).then(result => {
		return result.recordset;
	}).catch(err => {
		console.log(err);
		return null;
	});
};