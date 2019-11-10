let path = require('path');

let configOptions;


function defaultBehavior(filename, source, options) {
  if (filename[0] !== path.sep && !source)
    throw new Error('the "filename" option is required to use includes and extends with "relative" paths');

  if (filename[0] === path.sep && !options.basedir)
    throw new Error('the "basedir" option is required to use includes and extends with "absolute" paths');

  filename = path.join(filename[0] === path.sep ? options.basedir : path.dirname(source.trim()), filename);

  return filename;
}

function escapeRegExp(string) {
	return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function replaceAlias(filename) {
	let res = {}
	Object.keys(configOptions.alias).forEach((item) => {
		let regExp = new RegExp(`^${escapeRegExp(item)}(.*)`);
		filename.replace(regExp, function(match, p1) {
			filename = path.join(configOptions.alias[item], p1);
			res.filenameChange = true;
		})
	})
	res.newFilename = filename;
	return res;
}

function resolve(filename, source, options) {
	let {newFilename, filenameChange} = replaceAlias(filename.trim());

	if(filenameChange && options.basedir) {
		newFilename = path.join('/', newFilename);
	}

	return defaultBehavior(newFilename, source, options);
}

module.exports = function(options) {
	configOptions = options;
	return {
		resolve,
	}
}