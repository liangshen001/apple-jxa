import {Command} from "./command";
import {Class, ClassExtension} from "./class";
import {Enumeration} from "./enumeration";
import {ValueType} from "./value-type";
import {RecordType} from "./record-type";

export interface Suite extends SuiteAttributes {
    commands: Command[]
    classes: Class[]
    classExtensions: ClassExtension[]
    enumerations: Enumeration[]
    valueTypes: ValueType[]
    recordTypes: RecordType[]
}

export interface SuiteAttributes {
    name: string
    code: string
    description: string
    hidden?: 'yes'
}
