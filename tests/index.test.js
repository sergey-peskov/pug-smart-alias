let path = require('path')
let {assert}  = require('chai');

let pugSmartAlias = require('../index.js')


describe('others', function() {
	it('В объекте по ключу resolve функция', function() {
		let pugSmartAliasInit = pugSmartAlias({});
		assert.isFunction(pugSmartAliasInit.resolve)
	})
})


describe('absolute path(с параметром basedir)', function() {
	it('из корня', function() {
		let pugSmartAliasInit = pugSmartAlias({
			alias: {
				'@svg': 'assets/img/svg',
			},
		});
		let fullPath = path.join('E:/Project/pug-smart-alias/assets/img/svg/qwerty.svg');
		let options = {
			basedir: 'E:/Project/pug-smart-alias'
		}
		assert.equal(pugSmartAliasInit.resolve('@svg/qwerty.svg', 'E:/Project/pug-smart-alias/index.html', options), fullPath)
	})
	it('не из корня', function() {
		let pugSmartAliasInit = pugSmartAlias({
			alias: {
				'@svg': 'assets/img/svg',
			},
		});
		let fullPath = path.join('E:/Project/pug-smart-alias/assets/img/svg/qwerty.svg');
		let options = {
			basedir: 'E:/Project/pug-smart-alias'
		}
		assert.equal(pugSmartAliasInit.resolve('@svg/qwerty.svg', 'E:/Project/pug-smart-alias/pages/article/index.html', options), fullPath)
	})
})


describe('relative path (без параметра basedir)', function() {
	it('если файл расположен в корне', function() {
		let pugSmartAliasInit = pugSmartAlias({
			alias: {
				'@svg': 'assets/img/svg',
			},
		});
		let fullPath = path.join('E:/Project/pug-smart-alias/assets/img/svg/qwerty.svg');
		assert.equal(pugSmartAliasInit.resolve('@svg/qwerty.svg', 'E:/Project/pug-smart-alias/index.html', {}), fullPath)
	})
	it('если файл расположен не в корне ', function() {
		let pugSmartAliasInit = pugSmartAlias({
			alias: {
				'@svg': 'assets/img/svg',
			},
		});
		let fullPath = path.join('E:/Project/pug-smart-alias/pages/assets/img/svg/qwerty.svg');
		assert.equal(pugSmartAliasInit.resolve('@svg/qwerty.svg', 'E:/Project/pug-smart-alias/pages/index.html', {}), fullPath)
	})
})