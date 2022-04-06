import {SuiteAttributes} from "./suite";

export interface Command extends CommandAttributes {
    directParameter: DirectParameter
    parameters: Parameter[]
    result?: Result
    accessGroup?: AccessGroup
}

export interface CommandAttributes {

    name: string
    code: string
    hidden?: 'yes'
    description: string
}

export interface DirectParameter {
    type: string
    description: string
    optional?: 'yes'

    accessGroup?: AccessGroup
    types: Type[]
}
export interface Type {
    type: string
    list?: 'yes'
}

export interface Parameter {
    name: string
    code: string
    type: string
    description: string
    optional?: 'yes'
    types: Type[]
}
export interface Result {
    type: string
    description: string
    optional?: 'yes'
    types: Type[]
}
export interface AccessGroup {
    identifier: string
    access?: 'r' | 'rw'
}