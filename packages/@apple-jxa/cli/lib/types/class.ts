import {SuiteAttributes} from "./suite";
import {AccessGroup} from "./command";

export interface Class extends ClassAttributes {

    properties: Property[]
    elements: Element[]
    respondsTos: RespondsTo[]
}

export interface RespondsTo {
    command: string
}

export interface ClassAttributes {
    id?: string
    name: string
    code: string
    description?: string
    inherits?: string
    plural?: string
}

export interface Element {
    type: string
    hidden?: 'yes'
    access?: 'r' | 'rw' // 默认r
}
export interface Property {
    name: string
    code: string
    type: string
    description?: string
    access?: 'r' | 'rw'// 默认r
}

export interface ClassExtension extends ClassExtensionAttributes {
    properties: Property[]
    elements: Element[]
    accessGroups: AccessGroup[]
}

export interface ClassExtensionAttributes {
    extends: string
    description?: string
}