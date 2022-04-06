import {
    AppleAppKey,
    JXAApplication,
    JXAArraySpecifier,
    JXABoolean,
    JXAInteger,
    JXANumber,
    JXARecord,
    JXASpecifier,
    JXAText,
    JXAReal,
    JXAType,
    JXADate,
    JXALocationSpecifier,
    JXAFile,
    JXAProperty,
    JXARGBColor,
    JXAPoint,
    JXARectangle,
    JXARectangleValue,
    JXAList,
    JXAItem,
    ObjectSpecifierConstructor,
    EachElementsType,
    RespondsTo,
} from "@apple-jxa/types";

export namespace GoogleChrome {
    /**
     * Common classes and commands for all applications.
     */
    export namespace StandardSuite {

        /**
         * The application's top-level scripting object.
         */
        export interface Application extends JXAApplication {
            /**
             * Save an object.
             * @param directParameter the object to save, usually a document or window
             * @param option in: The file in which to save the object. ;as: The file type in which to save the data. Can be 'only html' or 'complete html', default is 'complete html'. 
             */
            save(directParameter: JXASpecifier, option?: { in?: JXAFile, as?: string }): void

            /**
             * Open a document.
             * @param directParameter The file(s) to be opened.
             */
            open(directParameter: JXAArraySpecifier<JXAFile>): void

            /**
             * Close a window.
             * @param directParameter the document(s) or window(s) to close.
             */
            close(directParameter: JXASpecifier): void

            /**
             * Quit the application.
             */
            quit(): void

            /**
             * Return the number of elements of a particular class within an object.
             * @param directParameter the object whose elements are to be counted
             * @param option each: The class of objects to be counted. 
             */
            count<T extends JXASpecifier>(directParameter: T, option?: { each?: JXAType<EachElementsType<T>> }): number

            /**
             * Delete an object.
             * @param directParameter the object to delete
             */
            delete(directParameter: JXASpecifier): void

            /**
             * Copy object(s) and put the copies at a new location.
             * @param directParameter the object(s) to duplicate
             * @param option to: The location for the new object(s). ;withProperties: Properties to be set in the new duplicated object(s). 
             */
            duplicate<T extends JXASpecifier>(directParameter: T, option?: { to?: JXALocationSpecifier, withProperties?: JXARecord<T> }): T

            /**
             * Verify if an object exists.
             * @param directParameter the object in question
             */
            exists(directParameter: any): boolean

            /**
             * Make a new object.
             * @param option new: The class of the new object. ;at: The location at which to insert the object. ;withData: The initial contents of the object. ;withProperties: The initial values for properties of the object. 
             */
            make<T extends JXASpecifier>(option: { new: JXAType<T>, at?: JXALocationSpecifier, withData?: any, withProperties?: JXARecord<T> }): JXASpecifier

            /**
             * Move object(s) to a new location.
             * @param directParameter the object(s) to move
             * @param option to: The new location for the object(s). 
             */
            move<T extends JXASpecifier>(directParameter: T, option: { to: JXALocationSpecifier }): T

            /**
             * Print an object.
             * @param directParameter The file(s) or document(s) to be printed.
             */
            print(directParameter: JXASpecifier): void

            /**
             * The name of the application.
             */
            name: JXAText
            /**
             * Is this the frontmost (active) application?
             */
            frontmost: JXABoolean
            /**
             * The version of the application.
             */
            version: JXAText
            windows: JXAArraySpecifier<StandardSuite.Window>
            Window: ObjectSpecifierConstructor<Window>
        }

        /**
         * A window.
         */
        export interface Window extends JXASpecifier<'window'>, RespondsTo<Application, 'close'> {
            /**
             * The given name of the window.
             */
            get givenName(): JXAText
            set givenName(givenName: string)
            /**
             * The full title of the window.
             */
            name: JXAText
            /**
             * The unique identifier of the window.
             */
            id: JXAInteger
            /**
             * The index of the window, ordered front to back.
             */
            get index(): JXAInteger
            set index(index: number)
            /**
             * The bounding rectangle of the window.
             */
            get bounds(): JXARectangle
            set bounds(bounds: JXARectangleValue)
            /**
             * Whether the window has a close box.
             */
            closeable: JXABoolean
            /**
             * Whether the window can be minimized.
             */
            minimizable: JXABoolean
            /**
             * Whether the window is currently minimized.
             */
            get minimized(): JXABoolean
            set minimized(minimized: boolean)
            /**
             * Whether the window can be resized.
             */
            resizable: JXABoolean
            /**
             * Whether the window is currently visible.
             */
            get visible(): JXABoolean
            set visible(visible: boolean)
            /**
             * Whether the window can be zoomed.
             */
            zoomable: JXABoolean
            /**
             * Whether the window is currently zoomed.
             */
            get zoomed(): JXABoolean
            set zoomed(zoomed: boolean)
            /**
             * Returns the currently selected tab
             */
            activeTab: ChromiumSuite.Tab
            /**
             * Represents the mode of the window which can be 'normal' or 'incognito', can be set only once during creation of the window.
             */
            get mode(): JXAText
            set mode(mode: string)
            /**
             * The index of the active tab.
             */
            get activeTabIndex(): JXAInteger
            set activeTabIndex(activeTabIndex: number)
            tabs: JXAArraySpecifier<ChromiumSuite.Tab>
        }
    }
    /**
     * Common classes and commands for Chrome.
     */
    export namespace ChromiumSuite {
        /**
         * The application's top-level scripting object.
         */
        export interface Application extends JXASpecifier<'application'> {
            /**
             * Reload a tab.
             * @param directParameter The tab to execute the command in.
             */
            reload(directParameter: JXASpecifier): void

            /**
             * Go Back (If Possible).
             * @param directParameter The tab to execute the command in.
             */
            goBack(directParameter: JXASpecifier): void

            /**
             * Go Forward (If Possible).
             * @param directParameter The tab to execute the command in.
             */
            goForward(directParameter: JXASpecifier): void

            /**
             * Select all.
             * @param directParameter The tab to execute the command in.
             */
            selectAll(directParameter: JXASpecifier): void

            /**
             * Cut selected text (If Possible).
             * @param directParameter The tab to execute the command in.
             */
            cutSelection(directParameter: JXASpecifier): void

            /**
             * Copy text.
             * @param directParameter The tab to execute the command in.
             */
            copySelection(directParameter: JXASpecifier): void

            /**
             * Paste text (If Possible).
             * @param directParameter The tab to execute the command in.
             */
            pasteSelection(directParameter: JXASpecifier): void

            /**
             * Undo the last change.
             * @param directParameter The tab to execute the command in.
             */
            undo(directParameter: JXASpecifier): void

            /**
             * Redo the last change.
             * @param directParameter The tab to execute the command in.
             */
            redo(directParameter: JXASpecifier): void

            /**
             * Stop the current tab from loading.
             * @param directParameter The tab to execute the command in.
             */
            stop(directParameter: JXASpecifier): void

            /**
             * View the HTML source of the tab.
             * @param directParameter The tab to execute the command in.
             */
            viewSource(directParameter: JXASpecifier): void

            /**
             * Execute a piece of javascript.
             * @param directParameter The tab to execute the command in.
             * @param option javascript: The javascript code to execute. 
             */
            execute(directParameter: JXASpecifier, option: { javascript: string }): any

            /**
             * The bookmarks bar bookmark folder.
             */
            bookmarksBar: ChromiumSuite.BookmarkFolder
            /**
             * The other bookmarks bookmark folder.
             */
            otherBookmarks: ChromiumSuite.BookmarkFolder
            bookmarkFolders: JXAArraySpecifier<ChromiumSuite.BookmarkFolder>
            Tab: ObjectSpecifierConstructor<Tab>
            BookmarkFolder: ObjectSpecifierConstructor<BookmarkFolder>
            BookmarkItem: ObjectSpecifierConstructor<BookmarkItem>
        }

        /**
         * A tab.
         */
        export interface Tab extends JXASpecifier<'tab'>, RespondsTo<Application, 'undo' | 'redo' | 'cutSelection' | 'copySelection' | 'pasteSelection' | 'selectAll' | 'goBack' | 'goForward' | 'reload' | 'stop' | 'print' | 'viewSource' | 'save' | 'close' | 'execute'> {
            /**
             * Unique ID of the tab.
             */
            id: JXAInteger
            /**
             * The title of the tab.
             */
            title: JXAText
            /**
             * The url visible to the user.
             */
            get url(): JXAText
            set url(url: string)
            /**
             * Is loading?
             */
            loading: JXABoolean
        }

        /**
         * A bookmarks folder that contains other bookmarks folder and bookmark items.
         */
        export interface BookmarkFolder extends JXASpecifier<'bookmarkFolder'> {
            /**
             * Unique ID of the bookmark folder.
             */
            id: JXANumber
            /**
             * The title of the folder.
             */
            get title(): JXAText
            set title(title: string)
            /**
             * Returns the index with respect to its parent bookmark folder.
             */
            index: JXANumber
            bookmarkFolders: JXAArraySpecifier<ChromiumSuite.BookmarkFolder>
            bookmarkItems: JXAArraySpecifier<ChromiumSuite.BookmarkItem>
        }

        /**
         * An item consists of an URL and the title of a bookmark
         */
        export interface BookmarkItem extends JXASpecifier<'bookmarkItem'> {
            /**
             * Unique ID of the bookmark item.
             */
            id: JXAInteger
            /**
             * The title of the bookmark item.
             */
            get title(): JXAText
            set title(title: string)
            /**
             * The URL of the bookmark.
             */
            get url(): JXAText
            set url(url: string)
            /**
             * Returns the index with respect to its parent bookmark folder.
             */
            index: JXANumber
        }
    }
    export type Application = StandardSuite.Application & ChromiumSuite.Application
}
declare global {
    function Application(name: AppleAppKey<'Google Chrome'>): GoogleChrome.Application;
}
