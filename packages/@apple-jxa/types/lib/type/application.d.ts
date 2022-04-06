import {JXASpecifier} from "./specifier";
import {JXAText} from "./text";


export interface JXAApplication extends JXASpecifier<'application'> {
    includeStandardAdditions: boolean
    displayDialog(text: string): void
    displayAlert(text: string): void

    get id(): JXAText
    set id(id: string)
    name: JXAText
}