
# co-i18n

A lightweight i18n lib use the [Template literals](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals) in ES6.

## Install

`
npm install co-i18n --save
`

## Usage

### Simple Usage
```
    var i18n = require('co-i18n');
    
    i18n.init({
        directory: __dirname + '/locales',
        locales: ['en', 'zh-CN']
    });
    
    var s = new i18n('en').i18n `${'greeting'}`;
    console.log(s);
```

### With Koa

```
    app.use(i18n.co({
        directory: __dirname + '/locales',
        locales: ['en', 'zh-CN']
    }));
```

