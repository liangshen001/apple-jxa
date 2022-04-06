import {Suite, SuiteAttributes} from "../types/suite";
import fs from "fs";
import {Element as Element$, xml2js} from "xml-js";
import {AccessGroup, CommandAttributes, DirectParameter, Parameter, Result} from "../types/command";
import {ClassAttributes, ClassExtensionAttributes, Element, Property, RespondsTo} from "../types/class";
import {Enumerator} from "../types/enumeration";
import {ValueType} from "../types/value-type";
import {camelCase, pascalCase, indentation} from './utils'
import {Dictionary, XIInclude} from "../types/dictionary";
import exp from "constants";
// /System/Library/CoreServices/Finder.app/Contents/Resources/Finder.sdef
export function parse(filePath: string): Dictionary {
    filePath = filePath.startsWith('file://') ? filePath.substring(7) : filePath
    const str = fs.readFileSync(filePath, 'utf-8');

    const json = xml2js(str, {compact: false}) as Element$;

    const dictionaryNode = json.elements?.find(i => i.type === 'element' && i.name === 'dictionary');

    const suites = (dictionaryNode
        ?.elements?.filter((i => i.type === 'element' && i.name === 'suite'))?.map(i => ({
            ...(i.attributes as SuiteAttributes | undefined),
            commands: i.elements?.filter(j => j.type === 'element' && j.name === 'command')
                ?.map(j => {
                    const directParameter = j.elements?.find(x => x.type === 'element' && x.name === 'direct-parameter')
                    return {
                        ...j.attributes as CommandAttributes | undefined,
                        directParameter: directParameter ? {
                            ...directParameter.attributes as any,
                            types: directParameter.elements?.filter(x => x.type === 'element' && x.name === 'type')?.map(x => x.attributes) || []
                        } as DirectParameter : undefined,
                        parameters: j.elements?.filter(x => x.type === 'element' && x.name === 'parameter')?.map(x => {
                            return {
                                ...x!.attributes,
                                types: x.elements?.filter(x => x.type === 'element' && x.name === 'type')?.map(x => ({
                                    ...x.attributes as any
                                }))
                            } as Parameter | undefined
                        }) || [],
                        result: j.elements?.find(x => x.type === 'element' && x.name === 'result')?.attributes as Result | undefined,
                        accessGroup: j.elements?.find(x => x.type === 'element' && x.name === 'access-group')?.attributes as AccessGroup | undefined
                    }
                }) || [],
            classes: i.elements?.filter(j => j.type === 'element' && j.name === 'class')
                ?.map(j => ({
                    ...j.attributes as ClassAttributes | undefined,
                    properties: j.elements?.filter(x => x.type === 'element' && x.name === 'property')?.map(x => x.attributes as Property | undefined) || [],
                    elements: j.elements?.filter(x => x.type === 'element' && x.name === 'element')?.map(x => x.attributes as Element | undefined) || [],
                    respondsTos: j.elements?.filter(x => x.type === 'element' && x.name === 'responds-to')?.map(x => x!.attributes as RespondsTo | undefined) || []
                })) || [],
            classExtensions: i.elements?.filter(j => j.type === 'element' && j.name === 'class-extension')
                ?.map(j => ({
                    ...j.attributes as ClassExtensionAttributes | undefined,
                    properties: j.elements?.filter(x => x.type === 'element' && x.name === 'property')?.map(x => x.attributes as Property | undefined) || [],
                    elements: j.elements?.filter(x => x.type === 'element' && x.name === 'element')?.map(x => x.attributes as Element | undefined) || [],
                    accessGroups: j.elements?.filter(x => x.type === 'element' && x.name === 'access-group')?.map(x => x.attributes as AccessGroup | undefined) || []
                })) || [],
            enumerations: i.elements?.filter(j => j.type === 'element' && j.name === 'enumeration')
                ?.map(j => ({
                    ...j.attributes! as any,
                    enumerators: j.elements?.filter(x => x.type === 'element' && x.name === 'enumerator')?.map(x => x!.attributes as Enumerator | undefined) || [],
                })) || [],
            valueTypes: i.elements?.filter(j => j.type === 'element' && j.name === 'value-type')?.map(j => j!.attributes as ValueType | undefined) || [],
            recordTypes: i.elements?.filter(j => j.type === 'element' && j.name === 'record-type')
                ?.map(j => ({
                    ...j.attributes as ClassExtensionAttributes | undefined,
                    properties: j.elements?.filter(x => x.type === 'element' && x.name === 'property')?.map(x => x.attributes as Property | undefined) || []
                })) || [],
        })) || []) as Suite[]


    suites.forEach(i => {
        const suiteName = pascalCase(i.name);
        i.classes.filter(c => !c.description?.includes('(NOT AVAILABLE YET)')).forEach(j => {
            const className = pascalCase(j.name);
            if (j.plural) {
                const pluralVarName = camelCase(j.plural);
                jxaTypePluralNameMap.set(j.name, pluralVarName)
            } else {
                jxaTypePluralNameMap.set(j.name, camelCase(j.name) + 's')
            }
            if (j.inherits) {
                jxaClassInherits.push(j.inherits)
            }
            jxaTypeMap.set(j.id || j.name, `${suiteName}.${className}`)
        })
        i.enumerations.forEach(j => {
            const type = j.enumerators.map(i => `'${i.name}'`).join(' | ')
            jxaTypeMap.set(j.name, type)
        })
        i.valueTypes.forEach(j => {
            if (!jxaTypeMap.has(j.name)) {
                // jxaTypeMap.set(j.name, 'JXASpecifier')
            }
        })
        i.classExtensions.forEach(j => {
            const className = pascalCase(j.extends);
            jxaClassExtensionNameMap.set(j.extends, `${suiteName}.${className}`)
        })
        i.recordTypes.forEach(j => {
            const className = pascalCase(j.name)
            originalTypeMap.set(j.name, `${suiteName}.${className}`)
        })
    })

    suites.forEach(s => {
        s.classes.forEach(c => {
            c.respondsTos.forEach(r => {
                let list = commandMap.get(r.command);
                if (!list) {
                    list = []
                    commandMap.set(r.command, list)
                }
                list.push(jxaTypeMap.get(c.name)!)
            })
        })
    })

    const xiIncludes = dictionaryNode?.elements?.filter(i => i.type === 'element' && i.name === 'xi:include')?.map(i => ({
        href: i.attributes?.['href']
    })) as XIInclude[]

    xiIncludes.reverse().forEach(i => {
        const {suites: suites2} = parse(i.href)
        suites.unshift(...suites2)
    })

    return {
        suites,
        xiIncludes
    }
}

// 方法名  对应方法参数类型集合
export const commandMap = new Map<string, string[]>()

// 原始类名 对应 简单类名
export const originalTypeMap = new Map<string, string>([
    ['boolean', 'boolean'],
    ['text', 'string'],
    ['integer', 'number'],
    ['rectangle', 'JXARectangleValue'],
    ['date', 'Date'],
    ['list', 'any']
])

// 原始类名对应类名
export const jxaTypeMap = new Map<string, string>([
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
])
// 原始类名 对应的复数类名
export const jxaTypePluralNameMap = new Map<string, string>()

// 原始类名 对应的 类名
export const jxaClassExtensionNameMap = new Map<string, string>()

// 被继承类 原始类名
export const jxaClassInherits: string[] = []
