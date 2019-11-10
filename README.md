# pug-smart-alias

Creates aliases for pug

## Installation

``` sh
npm install pug-smart-alias
```

## Usage

```js
var pug = require('pug');
let pugSmartAlias = require('pug-smart-alias');

var options = {
    basedir: __dirname, //Attention! in order for the path to be formed from the root, you must specify basedir.
    plugins: [
        pugSmartAlias({
          alias: { // A list of your aliases
            '@svg': 'assets/img/svg',
          }
        })
    ]
}

// compile
var fn = pug.compile('string of pug', options);

```
