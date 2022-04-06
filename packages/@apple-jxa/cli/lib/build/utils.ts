import camelCaseLib from "camelcase"

export function dashed(text: string) {
    return camelCase(text).replace(/[A-Z]/g, m => "-" + m.toLowerCase())
}

export function camelCase(text: string) {
    const camelCased = camelCaseLib(text);
    // const UPPER_CASE = /([A-Z]{2,})/;
    // const match = text.match(UPPER_CASE);
    // if (match && match[1]) {
    //     return camelCased.replace(new RegExp(match[1], "i"), match[1]);
    // }
    return camelCased;
}

export function pascalCase(text: string) {
    const camelCased = camelCaseLib(text, {pascalCase: true});
    // const UPPER_CASE = /([A-Z]{2,})/;
    // const match = text.match(UPPER_CASE);
    // if (match && match[1]) {
    //     return camelCased.replace(new RegExp(match[1], "i"), match[1]);
    // }
    return camelCased;
}

export function indentation(text: string = '', ind: number = 0, n = true) {
    return `${new Array(ind).fill(` `).join('')}${text}${n ? '\n' : ''}`
}