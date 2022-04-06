import {JXASpecifier} from "./specifier";

export type JXARectangle = JXASpecifier<'rectangle', JXARectangleValue>
export type JXARectangleValue = { x: number, y: number, width: number, height: number }