"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.indentation = exports.pascalCase = exports.camelCase = exports.dashed = void 0;
var camelcase_1 = __importDefault(require("camelcase"));
function dashed(text) {
    return camelCase(text).replace(/[A-Z]/g, function (m) { return "-" + m.toLowerCase(); });
}
exports.dashed = dashed;
function camelCase(text) {
    var camelCased = (0, camelcase_1.default)(text);
    // const UPPER_CASE = /([A-Z]{2,})/;
    // const match = text.match(UPPER_CASE);
    // if (match && match[1]) {
    //     return camelCased.replace(new RegExp(match[1], "i"), match[1]);
    // }
    return camelCased;
}
exports.camelCase = camelCase;
function pascalCase(text) {
    var camelCased = (0, camelcase_1.default)(text, { pascalCase: true });
    // const UPPER_CASE = /([A-Z]{2,})/;
    // const match = text.match(UPPER_CASE);
    // if (match && match[1]) {
    //     return camelCased.replace(new RegExp(match[1], "i"), match[1]);
    // }
    return camelCased;
}
exports.pascalCase = pascalCase;
function indentation(text, ind, n) {
    if (text === void 0) { text = ''; }
    if (ind === void 0) { ind = 0; }
    if (n === void 0) { n = true; }
    return "".concat(new Array(ind).fill(" ").join('')).concat(text).concat(n ? '\n' : '');
}
exports.indentation = indentation;
