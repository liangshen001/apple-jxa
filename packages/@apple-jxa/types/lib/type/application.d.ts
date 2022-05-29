import {JXASpecifier} from "./specifier";
import {JXAText} from "./text";


export interface JXAApplication extends JXASpecifier<'application'> {
    includeStandardAdditions: boolean
    displayDialog(text: string, option?: {
        defaultAnswer?: string;
        withTitle?: string;
        withIcon?: number | string;
        givingUpAfter?: number;
        cancelButton?: number | string;
        defaultButton?: number | string;
        buttons?: string;
        hiddenAnswer?: boolean;
    }): {
        buttonReturned: 'OK';
        textReturned: string;
    }
    displayAlert(text: string): void

    get id(): JXAText
    set id(id: string)
    name: JXAText
}