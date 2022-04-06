import {Suite} from "./suite";

export interface Dictionary {
    xiIncludes: XIInclude[]
    suites: Suite[]
}

export interface XIInclude {
    href: string
}