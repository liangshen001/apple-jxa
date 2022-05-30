"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.build = void 0;
var parse_1 = require("./parse");
var utils_1 = require("./utils");
var fs_1 = __importDefault(require("fs"));
// const input = '/Applications/Google Chrome.app'
// const input = '/System/Library/CoreServices/System Events.app'
// const input = '/Applications/Safari.app'
// const input = '/System/Applications/Reminders.app'
// const input = '/System/Library/CoreServices/Finder.app'
function build(application, options) {
    var array = application.split('/');
    var appName = array[array.length - 1].slice(0, -4);
    var resDir = application + '/Contents/Resources/';
    var fileName = fs_1.default.readdirSync(resDir).find(function (i) { return i.endsWith('.sdef'); });
    writeDTS(resDir + fileName);
    function writeDTS(filePath) {
        var dictionary = (0, parse_1.parse)(filePath);
        var suites = dictionary.suites;
        var xiIncludes = dictionary.xiIncludes;
        function getClassProperty(property, original) {
            if (original === void 0) { original = false; }
            var text = '';
            if (property.description) {
                text += (0, utils_1.indentation)("/**", 4 * 3);
                text += (0, utils_1.indentation)(" * ".concat(property.description), 4 * 3);
                text += (0, utils_1.indentation)(" */", 4 * 3);
            }
            var className = getClassName(property.code, property.type, original);
            if (!className) {
                return '';
            }
            var type = "".concat(className).concat(property.type === 'type' && property.name === 'class' ? '<this>' : '');
            if (property.access === 'r') {
                // 列的定义 类型
                text += (0, utils_1.indentation)("".concat((0, utils_1.camelCase)(property.name), ": ").concat(type), 4 * 3);
            }
            else {
                text += (0, utils_1.indentation)("get ".concat((0, utils_1.camelCase)(property.name), "(): ").concat(parse_1.jxaTypeMap.get(property.type)), 4 * 3);
                var originalType = parse_1.originalTypeMap.get(property.type) || parse_1.jxaTypeMap.get(property.type);
                text += (0, utils_1.indentation)("set ".concat((0, utils_1.camelCase)(property.name), "(").concat((0, utils_1.camelCase)(property.name), ": ").concat(originalType, ")"), 4 * 3);
            }
            return text;
        }
        function getClassText(className, description, extendsClass, properties, elements, commands, classes) {
            var text = '';
            if (description) {
                text += (0, utils_1.indentation)('/**', 4 * 2);
                text += (0, utils_1.indentation)(" * ".concat(description), 4 * 2);
                text += (0, utils_1.indentation)(" */", 4 * 2);
            }
            text += (0, utils_1.indentation)("export interface ".concat(className, " ").concat(extendsClass.length ? "extends ".concat(extendsClass.join(', '), " ") : '', "{"), 4 * 2);
            if (commands && className === 'Application') {
                text += commands.filter(function (c) { return !c.hidden; }).map(function (command) {
                    var _a, _b, _c;
                    var text = '';
                    var resultType = 'void';
                    if (command.result) {
                        resultType = getClassName(command.result.type, command.result.type, true) || 'void';
                    }
                    var parameters = '';
                    var parameterComments = '';
                    var useT = (command.parameters.some(function (p) { return p.type === 'type'; }) ||
                        command.result && (((_a = command.result) === null || _a === void 0 ? void 0 : _a.type) === ((_b = command.directParameter) === null || _b === void 0 ? void 0 : _b.type))); /**/
                    var TName = 'JXASpecifier';
                    if (command.directParameter) {
                        if (command.result && ((_c = command.result) === null || _c === void 0 ? void 0 : _c.type) === command.directParameter.type) {
                            resultType = 'T';
                        }
                        parameterComments += (0, utils_1.indentation)(" * @param directParameter ".concat(command.directParameter.description), 4 * 3);
                        var optional = command.directParameter.optional ? '?' : '';
                        var parameterType = '';
                        if (command.directParameter.type) {
                            parameterType = parse_1.jxaTypeMap.get(command.directParameter.type);
                        }
                        else {
                            parameterType = command.directParameter.types.map(function (i) {
                                var type = parse_1.jxaTypeMap.get(i.type);
                                if (i.list) {
                                    return "JXAArraySpecifier<".concat(type, ">");
                                }
                                return type;
                            }).join(' | ');
                        }
                        if (useT) {
                            TName = parameterType;
                            parameters = "directParameter".concat(optional, ": T");
                        }
                        else {
                            parameters = "directParameter".concat(optional, ": ").concat(parameterType);
                        }
                    }
                    else if (useT) {
                        TName = 'JXASpecifier';
                    }
                    // 拼接option参数
                    var option = command.parameters.map(function (p) {
                        var text = '';
                        text += (0, utils_1.camelCase)(p.name);
                        text += p.optional === 'yes' ? '?' : '';
                        text += ': ';
                        var type = getClassName(p.code, p.type, true);
                        if (type) {
                            text += getClassName(p.code, p.type, true);
                        }
                        else {
                            text += p.types.map(function (x) {
                                var className = getClassName('', x.type, true);
                                if ((className === null || className === void 0 ? void 0 : className.includes(' | ')) && x.list) {
                                    return "(".concat(className, ")[]");
                                }
                                return "".concat(className).concat(x.list ? '[]' : '');
                            }).join(' | ');
                        }
                        if (p.type === 'type') {
                            if (p.name === 'each') {
                                text += '<EachElementsType<T>>';
                            }
                            else {
                                text += '<T>';
                            }
                        }
                        if (p.type === 'record' && useT) {
                            text += '<T>';
                        }
                        return text;
                    }).join(', ');
                    if (option) {
                        var optionsComments = command.parameters.map(function (p) { return "".concat((0, utils_1.camelCase)(p.name), ": ").concat(p.description, " "); }).join(';');
                        var optional = command.parameters.every(function (i) { return i.optional === 'yes'; }) ? '?' : '';
                        parameterComments += (0, utils_1.indentation)(" * @param option ".concat(optionsComments), 4 * 3);
                        parameters += "".concat(parameters ? ', ' : '', "option").concat(optional, ": { ").concat(option, " }");
                    }
                    if (command.description) {
                        text += (0, utils_1.indentation)("/**", 4 * 3);
                        text += (0, utils_1.indentation)(" * ".concat(command.description), 4 * 3);
                        text += parameterComments;
                        text += (0, utils_1.indentation)(" */", 4 * 3);
                    }
                    text += (0, utils_1.indentation)("".concat((0, utils_1.camelCase)(command.name)).concat(useT ? "<T extends ".concat(TName, ">") : '', "(").concat(parameters, "): ").concat(resultType), 4 * 3);
                    text += (0, utils_1.indentation)();
                    return text;
                }).join('');
            }
            text += properties.filter(function (p) { var _a; return !((_a = p === null || p === void 0 ? void 0 : p.description) === null || _a === void 0 ? void 0 : _a.includes('(NOT AVAILABLE YET)')); }).map(function (property) { return getClassProperty(property, !extendsClass.length); }).join('');
            text += elements.filter(function (element) { return !element.hidden; }).map(function (element) {
                var pluralVarName = parse_1.jxaTypePluralNameMap.get(element.type);
                return (0, utils_1.indentation)("".concat(pluralVarName, ": JXAArraySpecifier<").concat(parse_1.jxaTypeMap.get(element.type), ">"), 4 * 3);
            }).join('');
            if (classes) {
                text += classes.filter(function (c) { var _a; return !((_a = c.description) === null || _a === void 0 ? void 0 : _a.includes('(NOT AVAILABLE YET)')) && c.name !== 'application'; }).map(function (i) {
                    var name = (0, utils_1.pascalCase)(i.name);
                    return (0, utils_1.indentation)("".concat(name, ": ObjectSpecifierConstructor<").concat(name, ">"), 4 * 3);
                }).join('');
            }
            text += (0, utils_1.indentation)("}", 4 * 2);
            return text;
        }
        function getClassName(code, name, original) {
            if (original === void 0) { original = false; }
            if (original) {
                var a = parse_1.originalTypeMap.get(name);
                if (a) {
                    return a;
                }
            }
            var n = parse_1.jxaTypeMap.get(code);
            if (n) {
                return n;
            }
            return parse_1.jxaTypeMap.get(name);
        }
        // Application类继承所有suite中的Application
        var suiteApplicationList = __spreadArray([], suites.filter(function (s) { return !s.hidden; }).map(function (i) {
            var name = (0, utils_1.pascalCase)(i.name);
            return "".concat(name, ".Application");
        }), true);
        var dts = (0, utils_1.indentation)('import {') +
            (0, utils_1.indentation)('AppleAppKey,', 4) +
            (0, utils_1.indentation)('JXAApplication,', 4) +
            (0, utils_1.indentation)('JXAArraySpecifier,', 4) +
            (0, utils_1.indentation)('JXABoolean,', 4) +
            (0, utils_1.indentation)('JXAInteger,', 4) +
            (0, utils_1.indentation)('JXANumber,', 4) +
            (0, utils_1.indentation)('JXARecord,', 4) +
            (0, utils_1.indentation)('JXASpecifier,', 4) +
            (0, utils_1.indentation)('JXAText,', 4) +
            (0, utils_1.indentation)('JXAReal,', 4) +
            (0, utils_1.indentation)('JXAType,', 4) +
            (0, utils_1.indentation)('JXADate,', 4) +
            (0, utils_1.indentation)('JXALocationSpecifier,', 4) +
            (0, utils_1.indentation)('JXAFile,', 4) +
            (0, utils_1.indentation)('JXAProperty,', 4) +
            (0, utils_1.indentation)('JXARGBColor,', 4) +
            (0, utils_1.indentation)('JXAPoint,', 4) +
            (0, utils_1.indentation)('JXARectangle,', 4) +
            (0, utils_1.indentation)('JXARectangleValue,', 4) +
            (0, utils_1.indentation)('JXAList,', 4) +
            (0, utils_1.indentation)('JXAItem,', 4) +
            (0, utils_1.indentation)('ObjectSpecifierConstructor,', 4) +
            (0, utils_1.indentation)('EachElementsType,', 4) +
            (0, utils_1.indentation)('RespondsTo,', 4) +
            (0, utils_1.indentation)('} from "@apple-jxa/types";') +
            (0, utils_1.indentation)() +
            (0, utils_1.indentation)("export namespace ".concat((0, utils_1.pascalCase)(appName), " {")) +
            suites.filter(function (suite) { return !suite.hidden; }).map(function (suite) {
                var suiteName = (0, utils_1.pascalCase)(suite.name);
                var text = '';
                if (suite.description) {
                    text += (0, utils_1.indentation)("/**", 4);
                    text += (0, utils_1.indentation)(" * ".concat(suite.description), 4);
                    text += (0, utils_1.indentation)(" */", 4);
                }
                text += (0, utils_1.indentation)("export namespace ".concat(suiteName, " {"), 4);
                text += suite.classExtensions.filter(function (c) { var _a; return !((_a = c.description) === null || _a === void 0 ? void 0 : _a.includes('(NOT AVAILABLE YET)')); }).map(function (c) {
                    var className = (0, utils_1.pascalCase)(c.extends);
                    var varName = (0, utils_1.camelCase)(c.extends);
                    return getClassText(className, c.description, ["JXASpecifier<'".concat(varName, "'>")], c.properties, c.elements, suite.commands, suite.classes);
                }).join((0, utils_1.indentation)());
                text += (0, utils_1.indentation)();
                // 如果没有Application类需要创建一个
                if (suite.classExtensions.filter(function (c) { var _a; return !((_a = c.description) === null || _a === void 0 ? void 0 : _a.includes('(NOT AVAILABLE YET)')); }).every(function (i) { return i.extends !== 'application'; }) &&
                    suite.classes.filter(function (c) { var _a; return !((_a = c.description) === null || _a === void 0 ? void 0 : _a.includes('(NOT AVAILABLE YET)')); }).every(function (i) { return i.name !== 'application'; })) {
                    var extendsClass = void 0;
                    if (suite.name === 'Standard Suite') {
                        extendsClass = ['JXAApplication'];
                    }
                    else {
                        extendsClass = ["JXASpecifier<'application'>"];
                    }
                    text += getClassText('Application', '', extendsClass, [], [], suite.commands, suite.classes);
                    text += (0, utils_1.indentation)();
                }
                text += suite.classes.filter(function (c) { var _a; return !((_a = c.description) === null || _a === void 0 ? void 0 : _a.includes('(NOT AVAILABLE YET)')); }).map(function (c) {
                    var className = (0, utils_1.pascalCase)(c.name);
                    var varName = (0, utils_1.camelCase)(c.name);
                    // 设置继承类型
                    var extendsClass = [];
                    if (c.name === 'application') {
                        // Application类继承所有suite中的Application
                        extendsClass = ['JXAApplication'];
                    }
                    else {
                        if (c.inherits) {
                            var inheritsName = parse_1.jxaTypeMap.get(c.inherits);
                            if (!inheritsName) {
                                console.log("type ".concat(c.inherits, " not fount"));
                            }
                            if (parse_1.jxaClassInherits.includes(c.name)) {
                                className += "<N = '".concat(varName, "'>");
                                if (inheritsName) {
                                    extendsClass = ["".concat(inheritsName, "<N>")];
                                }
                            }
                            else {
                                if (inheritsName) {
                                    extendsClass = ["".concat(inheritsName, "<'").concat(varName, "'>")];
                                }
                            }
                        }
                        else {
                            if (parse_1.jxaClassInherits.includes(c.name)) {
                                className += "<N = '".concat(varName, "'>");
                                extendsClass = ["JXASpecifier<N>"];
                            }
                        }
                        if (!extendsClass.length) {
                            extendsClass = ["JXASpecifier<'".concat(varName, "'>")];
                        }
                        if (parse_1.jxaClassExtensionNameMap.get(c.name) && c.name !== 'application') {
                            extendsClass.push(parse_1.jxaClassExtensionNameMap.get(c.name));
                        }
                        if (c.respondsTos.length) {
                            var methods = c.respondsTos.map(function (i) { return "'".concat((0, utils_1.camelCase)(i.command), "'"); }).join(' | ');
                            extendsClass.push("RespondsTo<Application, ".concat(methods, ">"));
                        }
                    }
                    return getClassText(className, c.description || '', extendsClass, c.properties, c.elements, suite.commands, className === 'Application' ? suite.classes : undefined);
                }).join((0, utils_1.indentation)());
                text += suite.recordTypes.map(function (c) {
                    var className = (0, utils_1.pascalCase)(c.name);
                    return getClassText(className, '', [], c.properties, []);
                }).join((0, utils_1.indentation)());
                text += (0, utils_1.indentation)("}", 4);
                return text;
            }).join('') +
            (0, utils_1.indentation)("export type Application = ".concat(suiteApplicationList.join(' & ')), 4) +
            (0, utils_1.indentation)('}');
        if (filePath.includes(appName)) {
            dts +=
                (0, utils_1.indentation)('declare global {') +
                    (0, utils_1.indentation)("function Application(name: AppleAppKey<'".concat(appName, "'>): ").concat((0, utils_1.pascalCase)(appName), ".Application;"), 4) +
                    (0, utils_1.indentation)("}");
        }
        var output = options.output || './';
        if (output.endsWith('/')) {
            output += '/';
        }
        fs_1.default.writeFileSync("".concat(output).concat((0, utils_1.dashed)(appName), ".d.ts"), dts);
    }
}
exports.build = build;
