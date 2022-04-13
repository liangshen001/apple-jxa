"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.jxaClassInherits = exports.jxaClassExtensionNameMap = exports.jxaTypePluralNameMap = exports.jxaTypeMap = exports.originalTypeMap = exports.commandMap = exports.parse = void 0;
var fs_1 = __importDefault(require("fs"));
var xml_js_1 = require("xml-js");
var utils_1 = require("./utils");
// /System/Library/CoreServices/Finder.app/Contents/Resources/Finder.sdef
function parse(filePath) {
    var _a, _b, _c, _d, _e;
    filePath = filePath.startsWith('file://') ? filePath.substring(7) : filePath;
    var str = fs_1.default.readFileSync(filePath, 'utf-8');
    var json = (0, xml_js_1.xml2js)(str, { compact: false });
    var dictionaryNode = (_a = json.elements) === null || _a === void 0 ? void 0 : _a.find(function (i) { return i.type === 'element' && i.name === 'dictionary'; });
    var suites = (((_c = (_b = dictionaryNode === null || dictionaryNode === void 0 ? void 0 : dictionaryNode.elements) === null || _b === void 0 ? void 0 : _b.filter((function (i) { return i.type === 'element' && i.name === 'suite'; }))) === null || _c === void 0 ? void 0 : _c.map(function (i) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
        return (__assign(__assign({}, i.attributes), { commands: ((_b = (_a = i.elements) === null || _a === void 0 ? void 0 : _a.filter(function (j) { return j.type === 'element' && j.name === 'command'; })) === null || _b === void 0 ? void 0 : _b.map(function (j) {
                var _a, _b, _c, _d, _e, _f, _g, _h, _j;
                var directParameter = (_a = j.elements) === null || _a === void 0 ? void 0 : _a.find(function (x) { return x.type === 'element' && x.name === 'direct-parameter'; });
                return __assign(__assign({}, j.attributes), { directParameter: directParameter ? __assign(__assign({}, directParameter.attributes), { types: ((_c = (_b = directParameter.elements) === null || _b === void 0 ? void 0 : _b.filter(function (x) { return x.type === 'element' && x.name === 'type'; })) === null || _c === void 0 ? void 0 : _c.map(function (x) { return x.attributes; })) || [] }) : undefined, parameters: ((_e = (_d = j.elements) === null || _d === void 0 ? void 0 : _d.filter(function (x) { return x.type === 'element' && x.name === 'parameter'; })) === null || _e === void 0 ? void 0 : _e.map(function (x) {
                        var _a, _b;
                        return __assign(__assign({}, x.attributes), { types: (_b = (_a = x.elements) === null || _a === void 0 ? void 0 : _a.filter(function (x) { return x.type === 'element' && x.name === 'type'; })) === null || _b === void 0 ? void 0 : _b.map(function (x) { return (__assign({}, x.attributes)); }) });
                    })) || [], result: (_g = (_f = j.elements) === null || _f === void 0 ? void 0 : _f.find(function (x) { return x.type === 'element' && x.name === 'result'; })) === null || _g === void 0 ? void 0 : _g.attributes, accessGroup: (_j = (_h = j.elements) === null || _h === void 0 ? void 0 : _h.find(function (x) { return x.type === 'element' && x.name === 'access-group'; })) === null || _j === void 0 ? void 0 : _j.attributes });
            })) || [], classes: ((_d = (_c = i.elements) === null || _c === void 0 ? void 0 : _c.filter(function (j) { return j.type === 'element' && j.name === 'class'; })) === null || _d === void 0 ? void 0 : _d.map(function (j) {
                var _a, _b, _c, _d, _e, _f;
                return (__assign(__assign({}, j.attributes), { properties: ((_b = (_a = j.elements) === null || _a === void 0 ? void 0 : _a.filter(function (x) { return x.type === 'element' && x.name === 'property'; })) === null || _b === void 0 ? void 0 : _b.map(function (x) { return x.attributes; })) || [], elements: ((_d = (_c = j.elements) === null || _c === void 0 ? void 0 : _c.filter(function (x) { return x.type === 'element' && x.name === 'element'; })) === null || _d === void 0 ? void 0 : _d.map(function (x) { return x.attributes; })) || [], respondsTos: ((_f = (_e = j.elements) === null || _e === void 0 ? void 0 : _e.filter(function (x) { return x.type === 'element' && x.name === 'responds-to'; })) === null || _f === void 0 ? void 0 : _f.map(function (x) { return x.attributes; })) || [] }));
            })) || [], classExtensions: ((_f = (_e = i.elements) === null || _e === void 0 ? void 0 : _e.filter(function (j) { return j.type === 'element' && j.name === 'class-extension'; })) === null || _f === void 0 ? void 0 : _f.map(function (j) {
                var _a, _b, _c, _d, _e, _f;
                return (__assign(__assign({}, j.attributes), { properties: ((_b = (_a = j.elements) === null || _a === void 0 ? void 0 : _a.filter(function (x) { return x.type === 'element' && x.name === 'property'; })) === null || _b === void 0 ? void 0 : _b.map(function (x) { return x.attributes; })) || [], elements: ((_d = (_c = j.elements) === null || _c === void 0 ? void 0 : _c.filter(function (x) { return x.type === 'element' && x.name === 'element'; })) === null || _d === void 0 ? void 0 : _d.map(function (x) { return x.attributes; })) || [], accessGroups: ((_f = (_e = j.elements) === null || _e === void 0 ? void 0 : _e.filter(function (x) { return x.type === 'element' && x.name === 'access-group'; })) === null || _f === void 0 ? void 0 : _f.map(function (x) { return x.attributes; })) || [] }));
            })) || [], enumerations: ((_h = (_g = i.elements) === null || _g === void 0 ? void 0 : _g.filter(function (j) { return j.type === 'element' && j.name === 'enumeration'; })) === null || _h === void 0 ? void 0 : _h.map(function (j) {
                var _a, _b;
                return (__assign(__assign({}, j.attributes), { enumerators: ((_b = (_a = j.elements) === null || _a === void 0 ? void 0 : _a.filter(function (x) { return x.type === 'element' && x.name === 'enumerator'; })) === null || _b === void 0 ? void 0 : _b.map(function (x) { return x.attributes; })) || [] }));
            })) || [], valueTypes: ((_k = (_j = i.elements) === null || _j === void 0 ? void 0 : _j.filter(function (j) { return j.type === 'element' && j.name === 'value-type'; })) === null || _k === void 0 ? void 0 : _k.map(function (j) { return j.attributes; })) || [], recordTypes: ((_m = (_l = i.elements) === null || _l === void 0 ? void 0 : _l.filter(function (j) { return j.type === 'element' && j.name === 'record-type'; })) === null || _m === void 0 ? void 0 : _m.map(function (j) {
                var _a, _b;
                return (__assign(__assign({}, j.attributes), { properties: ((_b = (_a = j.elements) === null || _a === void 0 ? void 0 : _a.filter(function (x) { return x.type === 'element' && x.name === 'property'; })) === null || _b === void 0 ? void 0 : _b.map(function (x) { return x.attributes; })) || [] }));
            })) || [] }));
    })) || []);
    suites.forEach(function (i) {
        var suiteName = (0, utils_1.pascalCase)(i.name);
        i.classes.filter(function (c) { var _a; return !((_a = c.description) === null || _a === void 0 ? void 0 : _a.includes('(NOT AVAILABLE YET)')); }).forEach(function (j) {
            var className = (0, utils_1.pascalCase)(j.name);
            if (j.plural) {
                var pluralVarName = (0, utils_1.camelCase)(j.plural);
                exports.jxaTypePluralNameMap.set(j.name, pluralVarName);
            }
            else {
                exports.jxaTypePluralNameMap.set(j.name, (0, utils_1.camelCase)(j.name) + 's');
            }
            if (j.inherits) {
                exports.jxaClassInherits.push(j.inherits);
            }
            exports.jxaTypeMap.set(j.id || j.name, "".concat(suiteName, ".").concat(className));
        });
        i.enumerations.forEach(function (j) {
            var type = j.enumerators.map(function (i) { return "'".concat(i.name, "'"); }).join(' | ');
            exports.jxaTypeMap.set(j.name, type);
        });
        i.valueTypes.forEach(function (j) {
            if (!exports.jxaTypeMap.has(j.name)) {
                // jxaTypeMap.set(j.name, 'JXASpecifier')
            }
        });
        i.classExtensions.forEach(function (j) {
            var className = (0, utils_1.pascalCase)(j.extends);
            exports.jxaClassExtensionNameMap.set(j.extends, "".concat(suiteName, ".").concat(className));
        });
        i.recordTypes.forEach(function (j) {
            var className = (0, utils_1.pascalCase)(j.name);
            exports.originalTypeMap.set(j.name, "".concat(suiteName, ".").concat(className));
        });
    });
    suites.forEach(function (s) {
        s.classes.forEach(function (c) {
            c.respondsTos.forEach(function (r) {
                var list = exports.commandMap.get(r.command);
                if (!list) {
                    list = [];
                    exports.commandMap.set(r.command, list);
                }
                list.push(exports.jxaTypeMap.get(c.name));
            });
        });
    });
    var xiIncludes = (_e = (_d = dictionaryNode === null || dictionaryNode === void 0 ? void 0 : dictionaryNode.elements) === null || _d === void 0 ? void 0 : _d.filter(function (i) { return i.type === 'element' && i.name === 'xi:include'; })) === null || _e === void 0 ? void 0 : _e.map(function (i) {
        var _a;
        return ({
            href: (_a = i.attributes) === null || _a === void 0 ? void 0 : _a['href']
        });
    });
    xiIncludes.reverse().forEach(function (i) {
        var suites2 = parse(i.href).suites;
        suites.unshift.apply(suites, suites2);
    });
    return {
        suites: suites,
        xiIncludes: xiIncludes
    };
}
exports.parse = parse;
// 方法名  对应方法参数类型集合
exports.commandMap = new Map();
// 原始类名 对应 简单类名
exports.originalTypeMap = new Map([
    ['boolean', 'boolean'],
    ['text', 'string'],
    ['integer', 'number'],
    ['rectangle', 'JXARectangleValue'],
    ['date', 'Date'],
    ['list', 'any']
]);
// 原始类名对应类名
exports.jxaTypeMap = new Map([
    ['boolean', 'JXABoolean'],
    ['text', 'JXAText'],
    ['date', 'JXADate'],
    ['point', 'JXAPoint'],
    ['real', 'JXAReal'],
    ['rectangle', 'JXARectangle'],
    ['type', 'JXAType'],
    ['record', 'JXARecord'],
    ['specifier', 'JXASpecifier'],
    ['integer', 'JXAInteger'],
    ['number', 'JXANumber'],
    ['unsigned integer', 'JXAInteger'],
    ['double integer', 'JXAInteger'],
    ['location specifier', 'JXALocationSpecifier'],
    ['property', 'JXAProperty'],
    ['RGB color', 'JXARGBColor'],
    ['file', 'JXAFile'],
    ['item', 'any'],
    ['list', 'any'],
    ['any', 'any']
]);
// 原始类名 对应的复数类名
exports.jxaTypePluralNameMap = new Map();
// 原始类名 对应的 类名
exports.jxaClassExtensionNameMap = new Map();
// 被继承类 原始类名
exports.jxaClassInherits = [];
