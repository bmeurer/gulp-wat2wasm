const fs = require('fs');
const wabtPromise = require('wabt')();
const through2 = require('through2');
const Vinyl = require('vinyl');

module.exports = function wat2wasm(features = {}, options = {}) {
	return through2.obj((file, encoding, cb) => {
		fs.readFile(file.path, {encoding}, async (err, buffer) => {
			if (!err) {
				const { parseWat } = await wabtPromise;
				const module = parseWat(file.basename, buffer);
				const contents = Buffer.from(module.toBinary(options).buffer);
				const path = file.path.replace(/.wat$/, '.wasm');
				const base = file.base;
				file = new Vinyl({base, contents, path});
			}
			cb(err, file);
		});
	});
}
