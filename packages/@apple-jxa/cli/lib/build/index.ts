import {Command, CommandAttributes, DirectParameter, Parameter, Result} from "../types/command";
import {ClassAttributes, Property, Element, ClassExtension, ClassExtensionAttributes, Class} from "../types/class";
import {
    parse,
    jxaClassExtensionNameMap,
    jxaClassInherits,
    jxaTypeMap,
    jxaTypePluralNameMap,
    originalTypeMap
} from "./parse";
import {camelCase, pascalCase, indentation, dashed} from "./utils";
import fs from "fs";

// const input = '/Applications/Google Chrome.app'
// const input = '/System/Library/CoreServices/System Events.app'
// const input = '/Applications/Safari.app'
// const input = '/System/Applications/Reminders.app'
// const input = '/System/Library/CoreServices/Finder.app'

export function build(application: string, options: {output: string}) {
    const array = application.split('/');
    const appName = array[array.length - 1].slice(0, -4)
    const resDir = application + '/Contents/Resources/'
    const fileName = fs.readdirSync(resDir).find(i => i.endsWith('.sdef'));

    writeDTS(resDir + fileName)

    function writeDTS(filePath: string) {

        const dictionary = parse(filePath)
        const suites = dictionary.suites
        const xiIncludes = dictionary.xiIncludes

        function getClassProperty(property: Property, original = false) {
            let text = ''
            if (property.description) {
                text += indentation(`/**`, 4 * 3)
                text += indentation(` * ${property.description}`, 4 * 3)
                text += indentation(` */`, 4 * 3)
            }
            const className = getClassName(property.code, property.type, original)
            if (!className) {
                return ''
            }
            const type = `${className}${property.type === 'type' && property.name === 'class' ? '<this>' : ''}`
            if (property.access === 'r') {
                // 列的定义 类型
                text += indentation(`${camelCase(property.name)}: ${type}`, 4 * 3)
            } else {
                text += indentation(`get ${camelCase(property.name)}(): ${jxaTypeMap.get(property.type)}`, 4 * 3)
                let originalType = originalTypeMap.get(property.type) || jxaTypeMap.get(property.type);
                text += indentation(`set ${camelCase(property.name)}(${camelCase(property.name)}: ${originalType})`, 4 * 3)
            }
            return text;
        }

        function getClassText(className: string, description: string | undefined, extendsClass: string[], properties: Property[], elements: Element[], commands?: Command[], classes?: Class[]) {
            let text = ''
            if (description) {
                text += indentation('/**', 4 * 2)
                text += indentation(` * ${description}`, 4 * 2)
                text += indentation(` */`, 4 * 2)
            }
            text += indentation(`export interface ${className} ${extendsClass.length ? `extends ${extendsClass.join(', ')} ` : ''}{`, 4 * 2);
            if (commands && className === 'Application') {
                text += commands.filter(c => !c.hidden).map(command => {
                    let text = '';
                    let resultType = 'void'
                    if (command.result) {
                        resultType = getClassName(command.result.type, command.result.type, true) || 'void'
                    }
                    let parameters = ''
                    let parameterComments = ''
                    const useT = (command.parameters.some(p => p.type === 'type') ||
                        command.result && (command.result?.type === command.directParameter?.type));/**/
                    let TName = 'JXASpecifier'
                    if (command.directParameter) {
                        if (command.result && command.result?.type === command.directParameter.type) {
                            resultType = 'T'
                        }
                        parameterComments += indentation(` * @param directParameter ${command.directParameter.description}`, 4 * 3)
                        const optional = command.directParameter.optional ? '?' : ''
                        let parameterType = ''
                        if (command.directParameter.type) {
                            parameterType = jxaTypeMap.get(command.directParameter.type)!
                        } else {
                            parameterType = command.directParameter.types.map(i => {
                                const type = jxaTypeMap.get(i.type)
                                if (i.list) {
                                    return `JXAArraySpecifier<${type}>`
                                }
                                return type;
                            }).join(' | ')
                        }
                        if (useT) {
                            TName = parameterType
                            parameters = `directParameter${optional}: T`
                        } else {
                            parameters = `directParameter${optional}: ${parameterType}`
                        }
                    } else if (useT) {
                        TName = 'JXASpecifier'
                    }
                    // 拼接option参数
                    const option = command.parameters.map(p => {
                        let text = ''
                        text += camelCase(p.name)
                        text += p.optional === 'yes' ? '?' : ''
                        text += ': '
                        const type = getClassName(p.code, p.type, true);
                        if (type) {
                            text += getClassName(p.code, p.type, true)
                        } else {
                            text += p.types.map(x => {
                                let className = getClassName('', x.type, true);
                                if (className?.includes(' | ') && x.list) {
                                    return `(${className})[]`
                                }
                                return `${className}${x.list ? '[]' : ''}`
                            }).join(' | ')
                        }
                        if (p.type === 'type') {
                            if (p.name === 'each') {
                                text += '<EachElementsType<T>>'
                            } else {
                                text += '<T>'
                            }
                        }
                        if (p.type === 'record' && useT) {
                            text += '<T>'
                        }
                        return text
                    }).join(', ')
                    if (option) {
                        const optionsComments = command.parameters.map(p => `${camelCase(p.name)}: ${p.description} `).join(';')
                        const optional = command.parameters.every(i => i.optional === 'yes') ? '?' : ''
                        parameterComments += indentation(` * @param option ${optionsComments}`, 4 * 3)
                        parameters += `${parameters ? ', ' : ''}option${optional}: { ${option} }`
                    }

                    if (command.description) {
                        text += indentation(`/**`, 4 * 3)
                        text += indentation(` * ${command.description}`, 4 * 3)
                        text += parameterComments
                        text += indentation(` */`, 4 * 3)
                    }
                    text += indentation(`${camelCase(command.name)}${useT ? `<T extends ${TName}>` : ''}(${parameters}): ${resultType}`, 4 * 3)
                    text += indentation()
                    return text;
                }).join('')

            }
            text += properties.filter(p => !p?.description?.includes('(NOT AVAILABLE YET)')).map(property => getClassProperty(property, !extendsClass.length)).join('')
            text += elements.filter(element => !element.hidden).map(element => {
                let pluralVarName = jxaTypePluralNameMap.get(element.type)
                return indentation(`${pluralVarName}: JXAArraySpecifier<${jxaTypeMap.get(element.type)}>`, 4 * 3);
            }).join('')
            if (classes) {
                text += classes.filter(c => !c.description?.includes('(NOT AVAILABLE YET)') && c.name !== 'application').map(i => {
                    const name = pascalCase(i.name)
                    return indentation(`${name}: ObjectSpecifierConstructor<${name}>`, 4 * 3)
                }).join('')
            }
            text += indentation(`}`, 4 * 2);
            return text
        }

        function getClassName(code: string, name: string, original = false) {
            if (original) {
                const a = originalTypeMap.get(name)
                if (a) {
                    return a;
                }
            }
            const n = jxaTypeMap.get(code);
            if (n) {
                return n;
            }
            return jxaTypeMap.get(name);
        }

// Application类继承所有suite中的Application
        const suiteApplicationList = [
            ...suites.filter(s => !s.hidden).map(i => {
                const name = pascalCase(i.name);
                return `${name}.Application`
            })
        ]
        let dts = indentation('import {') +
            indentation('AppleAppKey,', 4) +
            indentation('JXAApplication,', 4) +
            indentation('JXAArraySpecifier,', 4) +
            indentation('JXABoolean,', 4) +
            indentation('JXAInteger,', 4) +
            indentation('JXANumber,', 4) +
            indentation('JXARecord,', 4) +
            indentation('JXASpecifier,', 4) +
            indentation('JXAText,', 4) +
            indentation('JXAReal,', 4) +
            indentation('JXAType,', 4) +
            indentation('JXADate,', 4) +
            indentation('JXALocationSpecifier,', 4) +
            indentation('JXAFile,', 4) +
            indentation('JXAProperty,', 4) +
            indentation('JXARGBColor,', 4) +
            indentation('JXAPoint,', 4) +
            indentation('JXARectangle,', 4) +
            indentation('JXARectangleValue,', 4) +
            indentation('JXAList,', 4) +
            indentation('JXAItem,', 4) +
            indentation('ObjectSpecifierConstructor,', 4) +
            indentation('EachElementsType,', 4) +
            indentation('RespondsTo,', 4) +
            indentation('} from "@apple-jxa/types";') +
            indentation() +
            indentation(`export namespace ${pascalCase(appName)} {`) +
            suites.filter(suite => !suite.hidden).map(suite => {

                const suiteName = pascalCase(suite.name);
                let text = ''
                if (suite.description) {
                    text += indentation(`/**`, 4)
                    text += indentation(` * ${suite.description}`, 4)
                    text += indentation(` */`, 4)
                }
                text += indentation(`export namespace ${suiteName} {`, 4)
                text += suite.classExtensions.filter(c => !c.description?.includes('(NOT AVAILABLE YET)')).map(c => {
                    const className = pascalCase(c.extends);
                    const varName = camelCase(c.extends);
                    return getClassText(className, c.description, [`JXASpecifier<'${varName}'>`], c.properties, c.elements, suite.commands, suite.classes)
                }).join(indentation())
                text += indentation()
                // 如果没有Application类需要创建一个
                if (suite.classExtensions.filter(c => !c.description?.includes('(NOT AVAILABLE YET)')).every(i => i.extends !== 'application') &&
                    suite.classes.filter(c => !c.description?.includes('(NOT AVAILABLE YET)')).every(i => i.name !== 'application')) {
                    let extendsClass;
                    if (suite.name === 'Standard Suite') {
                        extendsClass = ['JXAApplication']
                    } else {
                        extendsClass = [`JXASpecifier<'application'>`]
                    }
                    text += getClassText('Application', '', extendsClass, [], [], suite.commands, suite.classes)
                    text += indentation()
                }
                text += suite.classes.filter(c => !c.description?.includes('(NOT AVAILABLE YET)')).map(c => {
                    let className = pascalCase(c.name);
                    const varName = camelCase(c.name);
                    // 设置继承类型
                    let extendsClass: string[] = [];

                    if (c.name === 'application') {
                        // Application类继承所有suite中的Application
                        extendsClass = ['JXAApplication']
                    } else {
                        if (c.inherits) {
                            const inheritsName = jxaTypeMap.get(c.inherits);
                            if (!inheritsName) {
                                console.log(`type ${c.inherits} not fount`);
                            }
                            if (jxaClassInherits.includes(c.name)) {
                                className += `<N = '${varName}'>`
                                if (inheritsName) {
                                    extendsClass = [`${inheritsName}<N>`]
                                }
                            } else {
                                if (inheritsName) {
                                    extendsClass = [`${inheritsName}<'${varName}'>`]
                                }
                            }
                        } else {
                            if (jxaClassInherits.includes(c.name)) {
                                className += `<N = '${varName}'>`
                                extendsClass = [`JXASpecifier<N>`]
                            }
                        }
                        if (!extendsClass.length) {
                            extendsClass = [`JXASpecifier<'${varName}'>`]
                        }
                        if (jxaClassExtensionNameMap.get(c.name) && c.name !== 'application') {
                            extendsClass.push(jxaClassExtensionNameMap.get(c.name)!)
                        }
                        if (c.respondsTos.length) {
                            const methods = c.respondsTos.map(i => `'${camelCase(i.command)}'`).join(' | ')
                            extendsClass.push(`RespondsTo<Application, ${methods}>`)
                        }
                    }
                    return getClassText(className, c.description || '', extendsClass, c.properties, c.elements, suite.commands, className === 'Application' ? suite.classes : undefined)
                }).join(indentation())

                text += suite.recordTypes.map(c => {
                    const className = pascalCase(c.name);
                    return getClassText(className, '', [], c.properties, [])
                }).join(indentation())
                text += indentation(`}`, 4)
                return text;
            }).join('') +
            indentation(`export type Application = ${suiteApplicationList.join(' & ')}`, 4) +
            indentation('}');
        if (filePath.includes(appName)) {
            dts +=
                indentation('declare global {') +
                indentation(`function Application(name: AppleAppKey<'${appName}'>): ${pascalCase(appName)}.Application;`, 4) +
                indentation(`}`);
        }

        let output = options.output || './'
        if (output.endsWith('/')) {
            output += '/'
        }

        fs.writeFileSync(`${output}${dashed(appName)}.d.ts`, dts)

    }
}



