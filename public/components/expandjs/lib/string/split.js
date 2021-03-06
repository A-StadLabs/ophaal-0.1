/*jslint browser: true, devel: true, node: true, ass: true, nomen: true, unparam: true, indent: 4 */

/**
 * @license
 * Copyright (c) 2015 The ExpandJS authors. All rights reserved.
 * This code may only be used under the BSD style license found at https://expandjs.github.io/LICENSE.txt
 * The complete set of authors may be found at https://expandjs.github.io/AUTHORS.txt
 * The complete set of contributors may be found at https://expandjs.github.io/CONTRIBUTORS.txt
 */
(function () {
    "use strict";

    var assertArgument = require('../assert/assertArgument'),
        isString       = require('../tester/isString'),
        isVoid         = require('../tester/isVoid');

    /**
     * Splits `string` into multiple substring using `target` as a separator.
     * If a third parameter is passed the string will be splitted only once.
     *
     * ```js
     *      XP.split('abc', 'b')
     *      // => ['a', 'c']
     *
     *      XP.split('abcabc', 'b')
     *      // => ['a', 'ca', 'c']
     *
     *      XP.split('abcabc', 'b', true)
     *      // => ['a', 'cabc']
     * ```
     *
     * @function strip
     * @param {string} [string = ""] The reference string
     * @param {string} [target = ""] The string to look for
     * @param {boolean} [once = false] If set the string will be split only once
     * @returns {Array} Returns an array with the split parts of the string
     */
    module.exports = function split(string, target, once) {
        assertArgument(isVoid(string) || isString(string), 1, 'string');
        assertArgument(isVoid(target) || isString(target), 2, 'string');
        var index = string && target ? string.indexOf(target) : -1;
        return index < 0 ? [string || ''] : (once ? [string.slice(0, index), string.slice(index + 1)] : string.split(target));
    };

}());