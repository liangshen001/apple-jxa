import {JXAApplication} from "./type/application";
import {JXASpecifier} from "./type/specifier";
import {JXALocationSpecifier} from "./type/location-specifier";
import {JXAArraySpecifier} from "./type/array-specifier";

declare global {
    namespace Application {
        function currentApplication<T extends JXAApplication = JXAApplication>(): T
    }
    namespace ObjectSpecifier {
        function hasInstance(obj: any): obj is JXASpecifier
        function classOf<N>(arg: JXASpecifier<N> | JXAArraySpecifier<JXASpecifier<N>>): N
        function callAsFunction(): typeof ObjectSpecifier
    }

    function Path<T extends string>(path: T): JXALocationSpecifier<T>
    function delay(interval: number): void

    namespace Automation {
        function getDisplayString(obj: any, printObj?: boolean): string
    }
    class ObjC {
        static import(name: string): void
        static wrap(obj: any): any
        static unwrap(obj: any): any
    }
    namespace $ {
        function NSBeep(): any
        function NSMakeSize(a: number, b: number): any // $.NSMakeRect(0, 0, 1024, 768)
        function printf(format: string, ...params: any[]): any // $.printf('%s %s %s', 'JavaScript', 'for', 'Automation')
        function NSLog(...params: any[]): any // $.NSLog('%@ %@ %@', $('JavaScript'), $('for'), $('Automation'))
        const NSMutableString: any // $.NSMutableString.alloc.init
        const NSString: any // $.NSString.alloc.initWithUTF8String('foo')
        const NSNumber: any // $.NSNumber.numberWithInt(99).intValue
        const NSTask: any // $.NSTask.alloc.init
        const NSNotFound: any
        const NSFileReadNoSuchFileError: any
        const NSZeroRect: any
        const NSArray: any
        const NSFileManager: any // $.NSFileManager.defaultManager
        const NSFileReadNoSuchFileError: any // $.NSFileManager.defaultManager
    }
    function $(obj: any): any
    const Ref: any
    const Library: any

}
