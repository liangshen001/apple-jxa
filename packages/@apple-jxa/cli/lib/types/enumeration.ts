
export interface Enumeration {
    name: string
    code: string
    hidden?: 'yes'

    enumerators: Enumerator[]
}
export interface Enumerator {
    name: string
    code: string

}