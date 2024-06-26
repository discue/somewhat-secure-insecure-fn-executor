


'use strict'

// Inspired by https://github.com/davidchambers/Base64.js/blob/master/base64.js
const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/='

/**
 *
 * @param {string} encodedData encoded data
 * @returns {string}
 */
function atob(encodedData) {
    const str = String(encodedData).replace(/[=]+$/, '') // #31: ExtendScript bad parse of /=
    if (str.length % 4 === 1) {
        throw new Error('\'atob\' failed: The string to be decoded is not correctly encoded.')
    }
    let output = ''
    for (
        // initialize result and counters
        let bc = 0, bs, buffer, idx = 0;
        // get next character
        (buffer = str.charAt(idx++));
        // character found in table? initialize bit storage and add its ascii value;
        ~buffer &&
            // @ts-expect-error bs can be undefined
            ((bs = bc % 4 ? bs * 64 + buffer : buffer),
                // and if not first of each 4 characters,
                // convert the first 8 bits to one ascii character
                bc++ % 4)
            ? (output += String.fromCharCode(255 & (bs >> ((-2 * bc) & 6))))
            : 0
    ) {
        // try to find character in table (0-63, not found => -1)
        buffer = chars.indexOf(buffer)
    }
    return output
}

/**
 *
 * @param {string} stringToEncode string to encode
 * @returns {string}
 */
function btoa(stringToEncode) {
    const str = String(stringToEncode)
    let output = ''
    for (
        // initialize result and counter
        let block, charCode, idx = 0, map = chars;
        // if the next str index does not exist:
        //   change the mapping table to "="
        //   check if d has no fractional digits
        str.charAt(idx | 0) || ((map = '='), idx % 1);
        // "8 - idx % 1 * 8" generates the sequence 2, 4, 6, 8
        output += map.charAt(63 & (block >> (8 - (idx % 1) * 8)))
    ) {
        charCode = str.charCodeAt((idx += 3 / 4))
        if (charCode > 0xff) {
            throw new Error('\'btoa\' failed: The string to be encoded contains characters outside of the Latin1 range.')
        }
        // @ts-expect-error block can be undefined
        block = (block << 8) | charCode
    }
    return output
}

if (global.fetch) {
    module.exports.atob = atob
    module.exports.btoa = btoa
}