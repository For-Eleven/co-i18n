/**
 * Created by jf on 16/3/3.
 */


var assert = require('assert');

var _ = require('lodash');
var i18n = require('../');


i18n.init({
    directory: __dirname + '/locales',
    locales: ['en', 'zh-CN']
});

var s = new i18n('en').i18n `${'greeting'}`;
console.log(s);


