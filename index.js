/**
 * Created by jf on 16/3/3.
 */

var _ = require('lodash');

var data = {};

function i18n(locate) {
    var opts = i18n.options;
    if (!_.indexOf(opts.locales, locate) > 0) {
        locate = opts.defaultLocale;
    }

    this.locate = locate;
    if (!data[locate]) {
        if (_.endsWith(opts.directory, '/')) {
            data[locate] = require(opts.directory + locate + '.json');
        } else {
            data[locate] = require(opts.directory + '/' + locate + '.json');
        }
    }
    return this;
}

i18n.prototype.i18n = function () {
    console.log(arguments);
    console.log(data[this.locate]);

    var keys = Array.prototype.slice.call(arguments, 1);
    var values = data[this.locate];

    var strings = arguments[0];

    console.log(strings, keys, values);

    var result = [strings[0]];
    keys.forEach(function (key, i) {
        var value = values[key];
        result.push(value, strings[i + 1]);
    });
    console.log(result);
    return result.join('');
};

i18n.init = function (options) {
    i18n.options = _.defaults(i18n.defaultOpts, options);
};

i18n.options = i18n.defaultOpts = {
    locales: ['en'],
    queryParameter: 'lang',
    defaultLocale: 'en',
    register: [global]
};


function middleware(options) {
    i18n.init(options);
    return function* (next) {
        var q = this.request.query;
        var locate;
        if (q && q[i18n.options.queryParameter]) {
            locate = q[i18n.options.queryParameter];
        }
        var header = this.request.headers;
        if (header['Accept-Language']) {
            var locates = _.words(header['Accept-Language'], /[^(,|;)]+/g);
            locates = _.remove(locates, function (n) {
                return n.indexOf('=') > 0
            });
            for (var i = 0; i < locates.length; i++) {
                if (_.indexOf(i18n.options.locales, locates[i]) > 0) {
                    locate = locates[i];
                    break;
                }
            }
        }

        this.i18n = i18n(locate).i18n;
    }
}

module.exports = i18n;
module.exports.co = middleware;


