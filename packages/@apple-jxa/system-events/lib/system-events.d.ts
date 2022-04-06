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

export namespace SystemEvents {
    /**
     * Common classes and commands for all applications.
     */
    export namespace StandardSuite {

        /**
         * The application's top-level scripting object.
         */
        export interface Application extends JXAApplication {
            /**
             * Open a document.
             * @param directParameter The file(s) to be opened.
             */
            open<T extends DiskFolderFileSuite.File | JXAArraySpecifier<DiskFolderFileSuite.File>>(directParameter: T): T

            /**
             * Close a document.
             * @param directParameter the document(s) or window(s) to close.
             * @param option saving: Should changes be saved before closing? ;savingIn: The file in which to save the document, if so. 
             */
            close(directParameter: JXASpecifier, option?: { saving?: 'yes' | 'no' | 'ask', savingIn?: DiskFolderFileSuite.File }): void

            /**
             * Save a document.
             * @param directParameter The document(s) or window(s) to save.
             * @param option in: The file in which to save the document. ;as: The file format to use. 
             */
            save(directParameter: JXASpecifier, option?: { in?: DiskFolderFileSuite.File, as?: 'text' }): void

            /**
             * Print a document.
             * @param directParameter The file(s), document(s), or window(s) to be printed.
             * @param option withProperties: The print settings to use. ;printDialog: Should the application show the print dialog? 
             */
            print(directParameter: JXAArraySpecifier<DiskFolderFileSuite.File> | JXASpecifier, option?: { withProperties?: StandardSuite.PrintSettings, printDialog?: boolean }): void

            /**
             * Quit the application.
             * @param option saving: Should changes be saved before quitting? 
             */
            quit(option?: { saving?: 'yes' | 'no' | 'ask' }): void

            /**
             * Return the number of elements of a particular class within an object.
             * @param directParameter The objects to be counted.
             * @param option each: The class of objects to be counted. 
             */
            count<T extends JXASpecifier>(directParameter: T, option?: { each?: JXAType<EachElementsType<T>> }): number

            /**
             * Delete an object.
             * @param directParameter The object(s) to delete.
             */
            delete(directParameter: JXASpecifier): void

            /**
             * Copy an object.
             * @param directParameter The object(s) to copy.
             * @param option to: The location for the new copy or copies. ;withProperties: Properties to set in the new copy or copies right away. 
             */
            duplicate(directParameter: JXASpecifier, option?: { to?: JXALocationSpecifier, withProperties?: JXARecord }): void

            /**
             * Verify that an object exists.
             * @param directParameter The object(s) to check.
             */
            exists(directParameter: any): boolean

            /**
             * Create a new object.
             * @param option new: The class of the new object. ;at: The location at which to insert the object. ;withData: The initial contents of the object. ;withProperties: The initial values for properties of the object. 
             */
            make<T extends JXASpecifier>(option: { new: JXAType<T>, at?: JXALocationSpecifier, withData?: PropertyListSuite.Data, withProperties?: JXARecord<T> }): JXASpecifier

            /**
             * Move an object to a new location.
             * @param directParameter The object(s) to move.
             * @param option to: The new location for the object(s). 
             */
            move(directParameter: JXASpecifier, option: { to: JXALocationSpecifier }): void

            /**
             * The name of the application.
             */
            name: JXAText
            /**
             * Is this the active application?
             */
            frontmost: JXABoolean
            /**
             * The version number of the application.
             */
            version: JXAText
            documents: JXAArraySpecifier<StandardSuite.Document>
            windows: JXAArraySpecifier<StandardSuite.Window>
            Document: ObjectSpecifierConstructor<Document>
            Window: ObjectSpecifierConstructor<Window>
        }

        /**
         * A document.
         */
        export interface Document extends JXASpecifier<'document'>, RespondsTo<Application, 'close' | 'print' | 'save'> {
            /**
             * Its name.
             */
            name: JXAText
            /**
             * Has it been modified since the last save?
             */
            modified: JXABoolean
            /**
             * Its location on disk, if it has one.
             */
            file: DiskFolderFileSuite.File
        }

        /**
         * A window.
         */
        export interface Window extends JXASpecifier<'window'>, ProcessesSuite.Window, RespondsTo<Application, 'close' | 'print' | 'save'> {
            /**
             * The title of the window.
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
             * Does the window have a close button?
             */
            closeable: JXABoolean
            /**
             * Does the window have a minimize button?
             */
            miniaturizable: JXABoolean
            /**
             * Is the window minimized right now?
             */
            get miniaturized(): JXABoolean
            set miniaturized(miniaturized: boolean)
            /**
             * Can the window be resized?
             */
            resizable: JXABoolean
            /**
             * Is the window visible right now?
             */
            get visible(): JXABoolean
            set visible(visible: boolean)
            /**
             * Does the window have a zoom button?
             */
            zoomable: JXABoolean
            /**
             * Is the window zoomed right now?
             */
            get zoomed(): JXABoolean
            set zoomed(zoomed: boolean)
            /**
             * The document whose contents are displayed in the window.
             */
            document: StandardSuite.Document
        }
        export interface PrintSettings {
            /**
             * the number of copies of a document to be printed
             */
            get copies(): JXAInteger
            set copies(copies: number)
            /**
             * Should printed copies be collated?
             */
            get collating(): JXABoolean
            set collating(collating: boolean)
            /**
             * the first page of the document to be printed
             */
            get startingPage(): JXAInteger
            set startingPage(startingPage: number)
            /**
             * the last page of the document to be printed
             */
            get endingPage(): JXAInteger
            set endingPage(endingPage: number)
            /**
             * number of logical pages laid across a physical page
             */
            get pagesAcross(): JXAInteger
            set pagesAcross(pagesAcross: number)
            /**
             * number of logical pages laid out down a physical page
             */
            get pagesDown(): JXAInteger
            set pagesDown(pagesDown: number)
            /**
             * the time at which the desktop printer should print the document
             */
            get requestedPrintTime(): JXADate
            set requestedPrintTime(requestedPrintTime: Date)
            /**
             * how errors are handled
             */
            get errorHandling(): 'standard' | 'detailed'
            set errorHandling(errorHandling: 'standard' | 'detailed')
            /**
             * for fax number
             */
            get faxNumber(): JXAText
            set faxNumber(faxNumber: string)
            /**
             * for target printer
             */
            get targetPrinter(): JXAText
            set targetPrinter(targetPrinter: string)
        }
    }
    /**
     * Common classes and commands for Folder Actions.
     */
    export namespace FolderActionsSuite {
        export interface Application extends JXASpecifier<'application'> {
            /**
             * Enable a folder action.
             * @param directParameter The action to be enabled.
             * @param option processNewChanges: Whether or not to process any new changes (or to prompt the user). 
             */
            enable(directParameter: FolderActionsSuite.FolderAction, option?: { processNewChanges?: 'yes' | 'no' | 'ask' }): void

            /**
             * Are Folder Actions currently being processed?
             */
            get folderActionsEnabled(): JXABoolean
            set folderActionsEnabled(folderActionsEnabled: boolean)
            folderActions: JXAArraySpecifier<FolderActionsSuite.FolderAction>
            FolderAction: ObjectSpecifierConstructor<FolderAction>
            Script: ObjectSpecifierConstructor<Script>
        }

        /**
         * An action attached to a folder in the file system
         */
        export interface FolderAction extends JXASpecifier<'folderAction'>, RespondsTo<Application, 'enable'> {
            /**
             * Is the folder action enabled?
             */
            get enabled(): JXABoolean
            set enabled(enabled: boolean)
            /**
             * the name of the folder action, which is also the name of the folder
             */
            get name(): JXAText
            set name(name: string)
            /**
             * the volume on which the folder to which the folder action applies resides
             */
            volume: JXAText
            scripts: JXAArraySpecifier<FolderActionsSuite.Script>
        }

        /**
         * A script invoked by a folder action
         */
        export interface Script extends JXASpecifier<'script'> {
            /**
             * Is the script enabled?
             */
            get enabled(): JXABoolean
            set enabled(enabled: boolean)
            /**
             * the name of the script
             */
            name: JXAText
            /**
             * the file system path of the disk
             */
            path: JXAText
            /**
             * the POSIX file system path of the disk
             */
            posixPath: JXAText
        }
    }
    /**
     * Terms and Events for controlling the System Events application
     */
    export namespace SystemEventsSuite {
        /**
         * The System Events application
         */
        export interface Application extends JXASpecifier<'application'> {
            /**
             * Discard the results of a bounded update session with one or more files.
             */
            abortTransaction(): void

            /**
             * Begin a bounded update session with one or more files.
             */
            beginTransaction(): number

            /**
             * Apply the results of a bounded update session with one or more files.
             */
            endTransaction(): void

            /**
             * the time in seconds the application will idle before quitting; if set to zero, idle time will not cause the application to quit
             */
            get quitDelay(): JXAInteger
            set quitDelay(quitDelay: number)
            /**
             * Is the Script menu installed in the menu bar?
             */
            scriptMenuEnabled: JXABoolean
        }

    }
    /**
     * Terms and Events for controlling the users account settings
     */
    export namespace AccountsSuite {
        /**
         * The System Events application
         */
        export interface Application extends JXASpecifier<'application'> {
            /**
             * the currently logged in user
             */
            currentUser: AccountsSuite.User
            users: JXAArraySpecifier<AccountsSuite.User>
            User: ObjectSpecifierConstructor<User>
        }

        /**
         * user account
         */
        export interface User extends JXASpecifier<'user'> {
            /**
             * user's full name
             */
            fullName: JXAText
            /**
             * user's short name
             */
            name: JXAText
        }
    }
    /**
     * Terms for controlling Appearance preferences
     */
    export namespace AppearanceSuite {
        /**
         * The System Events application
         */
        export interface Application extends JXASpecifier<'application'> {
            /**
             * a collection of appearance preferences
             */
            get appearancePreferences(): AppearanceSuite.AppearancePreferencesObject
            set appearancePreferences(appearancePreferences: AppearanceSuite.AppearancePreferencesObject)
            AppearancePreferencesObject: ObjectSpecifierConstructor<AppearancePreferencesObject>
        }

        /**
         * A collection of appearance preferences
         */
        export interface AppearancePreferencesObject extends JXASpecifier<'appearancePreferencesObject'> {
            /**
             * the overall look of buttons, menus and windows
             */
            get appearance(): 'blue' | 'graphite'
            set appearance(appearance: 'blue' | 'graphite')
            /**
             * Is font smoothing on?
             */
            get fontSmoothing(): JXABoolean
            set fontSmoothing(fontSmoothing: boolean)
            /**
             * the font size at or below which font smoothing is turned off
             */
            fontSmoothingLimit: JXAInteger
            /**
             * the method used for smoothing fonts
             */
            get fontSmoothingStyle(): 'automatic' | 'light' | 'medium' | 'standard' | 'strong'
            set fontSmoothingStyle(fontSmoothingStyle: 'automatic' | 'light' | 'medium' | 'standard' | 'strong')
            /**
             * the number of recent applications to track
             */
            get recentApplicationsLimit(): JXAInteger
            set recentApplicationsLimit(recentApplicationsLimit: number)
            /**
             * the number of recent documents to track
             */
            get recentDocumentsLimit(): JXAInteger
            set recentDocumentsLimit(recentDocumentsLimit: number)
            /**
             * the number of recent servers to track
             */
            get recentServersLimit(): JXAInteger
            set recentServersLimit(recentServersLimit: number)
            /**
             * the action performed by clicking the scroll bar
             */
            get scrollBarAction(): 'jump to here' | 'jump to next page'
            set scrollBarAction(scrollBarAction: 'jump to here' | 'jump to next page')
            /**
             * Is smooth scrolling used?
             */
            get smoothScrolling(): JXABoolean
            set smoothScrolling(smoothScrolling: boolean)
            /**
             * use dark menu bar and dock
             */
            get darkMode(): JXABoolean
            set darkMode(darkMode: boolean)
        }
    }
    /**
     * Terms and Events for controlling the actions when inserting CDs and DVDs
     */
    export namespace CdAndDvdPreferencesSuite {
        /**
         * The System Events application
         */
        export interface Application extends JXASpecifier<'application'> {
            /**
             * the preferences for the current user when a CD or DVD is inserted
             */
            get cdAndDvdPreferences(): CdAndDvdPreferencesSuite.CdAndDvdPreferencesObject
            set cdAndDvdPreferences(cdAndDvdPreferences: CdAndDvdPreferencesSuite.CdAndDvdPreferencesObject)
            CdAndDvdPreferencesObject: ObjectSpecifierConstructor<CdAndDvdPreferencesObject>
            InsertionPreference: ObjectSpecifierConstructor<InsertionPreference>
        }

        /**
         * user's CD and DVD insertion preferences
         */
        export interface CdAndDvdPreferencesObject extends JXASpecifier<'cdAndDvdPreferencesObject'> {
            /**
             * the blank CD insertion preference
             */
            blankCd: CdAndDvdPreferencesSuite.InsertionPreference
            /**
             * the blank DVD insertion preference
             */
            blankDvd: CdAndDvdPreferencesSuite.InsertionPreference
            /**
             * the blank BD insertion preference
             */
            blankBd: CdAndDvdPreferencesSuite.InsertionPreference
            /**
             * the music CD insertion preference
             */
            musicCd: CdAndDvdPreferencesSuite.InsertionPreference
            /**
             * the picture CD insertion preference
             */
            pictureCd: CdAndDvdPreferencesSuite.InsertionPreference
            /**
             * the video DVD insertion preference
             */
            videoDvd: CdAndDvdPreferencesSuite.InsertionPreference
            /**
             * the video BD insertion preference
             */
            videoBd: CdAndDvdPreferencesSuite.InsertionPreference
        }

        /**
         * a specific insertion preference
         */
        export interface InsertionPreference extends JXASpecifier<'insertionPreference'> {
            /**
             * action to perform on media insertion
             */
            get insertionAction(): 'ask what to do' | 'ignore' | 'open application' | 'run a script'
            set insertionAction(insertionAction: 'ask what to do' | 'ignore' | 'open application' | 'run a script')
        }
    }
    /**
     * Terms and Events for controlling the desktop picture settings.
     */
    export namespace DesktopSuite {
        /**
         * The System Events application
         */
        export interface Application extends JXASpecifier<'application'> {
            /**
             * the primary desktop
             */
            currentDesktop: DesktopSuite.Desktop
            desktops: JXAArraySpecifier<DesktopSuite.Desktop>
            Desktop: ObjectSpecifierConstructor<Desktop>
        }

        /**
         * desktop picture settings
         */
        export interface Desktop extends JXASpecifier<'desktop'> {
            /**
             * name of the desktop
             */
            name: JXAText
            /**
             * unique identifier of the desktop
             */
            id: JXAInteger
            /**
             * number of seconds to wait between changing the desktop picture
             */
            get changeInterval(): JXAReal
            set changeInterval(changeInterval: JXAReal)
            /**
             * name of display on which this desktop appears
             */
            displayName: JXAText
            /**
             * never, using interval, using login, after sleep
             */
            get pictureRotation(): JXAInteger
            set pictureRotation(pictureRotation: number)
            /**
             * turn on for random ordering of changing desktop pictures
             */
            get randomOrder(): JXABoolean
            set randomOrder(randomOrder: boolean)
            /**
             * indicates whether the menu bar is translucent
             */
            get translucentMenuBar(): JXABoolean
            set translucentMenuBar(translucentMenuBar: boolean)
            /**
             * desktop picture dynamic style
             */
            get dynamicStyle(): 'auto' | 'dynamic' | 'light' | 'dark' | 'unknown'
            set dynamicStyle(dynamicStyle: 'auto' | 'dynamic' | 'light' | 'dark' | 'unknown')
        }
    }
    /**
     * Terms and Events for controlling the dock preferences
     */
    export namespace DockPreferencesSuite {
        /**
         * The System Events application
         */
        export interface Application extends JXASpecifier<'application'> {
            /**
             * the preferences for the current user's dock
             */
            get dockPreferences(): DockPreferencesSuite.DockPreferencesObject
            set dockPreferences(dockPreferences: DockPreferencesSuite.DockPreferencesObject)
            DockPreferencesObject: ObjectSpecifierConstructor<DockPreferencesObject>
        }

        /**
         * user's dock preferences
         */
        export interface DockPreferencesObject extends JXASpecifier<'dockPreferencesObject'> {
            /**
             * is the animation of opening applications on or off?
             */
            get animate(): JXABoolean
            set animate(animate: boolean)
            /**
             * is autohiding the dock on or off?
             */
            get autohide(): JXABoolean
            set autohide(autohide: boolean)
            /**
             * size/height of the items (between 0.0 (minimum) and 1.0 (maximum))
             */
            get dockSize(): JXAReal
            set dockSize(dockSize: JXAReal)
            /**
             * is autohiding the menu bar on or off?
             */
            get autohideMenuBar(): JXABoolean
            set autohideMenuBar(autohideMenuBar: boolean)
            /**
             * behaviour when double clicking window a title bar
             */
            get doubleClickBehavior(): 'minimize' | 'off' | 'zoom'
            set doubleClickBehavior(doubleClickBehavior: 'minimize' | 'off' | 'zoom')
            /**
             * is magnification on or off?
             */
            get magnification(): JXABoolean
            set magnification(magnification: boolean)
            /**
             * maximum magnification size when magnification is on (between 0.0 (minimum) and 1.0 (maximum))
             */
            get magnificationSize(): JXAReal
            set magnificationSize(magnificationSize: JXAReal)
            /**
             * minimization effect
             */
            get minimizeEffect(): 'genie' | 'scale'
            set minimizeEffect(minimizeEffect: 'genie' | 'scale')
            /**
             * minimize window into its application?
             */
            get minimizeIntoApplication(): JXABoolean
            set minimizeIntoApplication(minimizeIntoApplication: boolean)
            /**
             * location on screen
             */
            get screenEdge(): 'bottom' | 'left' | 'right'
            set screenEdge(screenEdge: 'bottom' | 'left' | 'right')
            /**
             * show indicators for open applications?
             */
            get showIndicators(): JXABoolean
            set showIndicators(showIndicators: boolean)
            /**
             * show recent applications?
             */
            get showRecents(): JXABoolean
            set showRecents(showRecents: boolean)
        }
    }
    /**
     * Terms and Events for controlling the Login Items application
     */
    export namespace LoginItemsSuite {
        /**
         * The System Events application
         */
        export interface Application extends JXASpecifier<'application'> {
            loginItems: JXAArraySpecifier<LoginItemsSuite.LoginItem>
            LoginItem: ObjectSpecifierConstructor<LoginItem>
        }

        /**
         * an item to be launched or opened at login
         */
        export interface LoginItem extends JXASpecifier<'loginItem'> {
            /**
             * Is the Login Item hidden when launched?
             */
            get hidden(): JXABoolean
            set hidden(hidden: boolean)
            /**
             * the file type of the Login Item
             */
            kind: JXAText
            /**
             * the name of the Login Item
             */
            name: JXAText
            /**
             * the file system path to the Login Item
             */
            path: JXAText
        }
    }
    /**
     * Terms and Commands for manipulating and viewing network settings
     */
    export namespace NetworkPreferencesSuite {
        /**
         * The System Events application
         */
        export interface Application extends JXASpecifier<'application'> {
            /**
             * connect a configuration or service
             * @param directParameter a configuration or service
             */
            connect(directParameter: NetworkPreferencesSuite.Configuration | NetworkPreferencesSuite.Service): NetworkPreferencesSuite.Configuration

            /**
             * disconnect a configuration or service
             * @param directParameter a configuration or service
             */
            disconnect(directParameter: NetworkPreferencesSuite.Configuration | NetworkPreferencesSuite.Service): NetworkPreferencesSuite.Configuration

            /**
             * the preferences for the current user's network
             */
            get networkPreferences(): NetworkPreferencesSuite.NetworkPreferencesObject
            set networkPreferences(networkPreferences: NetworkPreferencesSuite.NetworkPreferencesObject)
            Configuration: ObjectSpecifierConstructor<Configuration>
            Interface: ObjectSpecifierConstructor<Interface>
            Location: ObjectSpecifierConstructor<Location>
            NetworkPreferencesObject: ObjectSpecifierConstructor<NetworkPreferencesObject>
            Service: ObjectSpecifierConstructor<Service>
        }

        /**
         * A collection of settings for configuring a connection
         */
        export interface Configuration extends JXASpecifier<'configuration'>, RespondsTo<Application, 'connect' | 'disconnect'> {
            /**
             * the name used to authenticate
             */
            get accountName(): JXAText
            set accountName(accountName: string)
            /**
             * Is the configuration connected?
             */
            connected: JXABoolean
            /**
             * the unique identifier for the configuration
             */
            id: JXAText
            /**
             * the name of the configuration
             */
            name: JXAText
        }

        /**
         * A collection of settings for a network interface
         */
        export interface Interface extends JXASpecifier<'interface'> {
            /**
             * configure the interface speed, duplex, and mtu automatically?
             */
            get automatic(): JXABoolean
            set automatic(automatic: boolean)
            /**
             * the duplex setting  half | full | full with flow control
             */
            get duplex(): JXAText
            set duplex(duplex: string)
            /**
             * the unique identifier for the interface
             */
            id: JXAText
            /**
             * the type of interface
             */
            kind: JXAText
            /**
             * the MAC address for the interface
             */
            macAddress: JXAText
            /**
             * the packet size
             */
            get mtu(): JXAInteger
            set mtu(mtu: number)
            /**
             * the name of the interface
             */
            name: JXAText
            /**
             * ethernet speed 10 | 100 | 1000
             */
            get speed(): JXAInteger
            set speed(speed: number)
        }

        /**
         * A set of services
         */
        export interface Location extends JXASpecifier<'location'> {
            /**
             * the unique identifier for the location
             */
            id: JXAText
            /**
             * the name of the location
             */
            get name(): JXAText
            set name(name: string)
            services: JXAArraySpecifier<NetworkPreferencesSuite.Service>
        }

        /**
         * the preferences for the current user's network
         */
        export interface NetworkPreferencesObject extends JXASpecifier<'networkPreferencesObject'> {
            /**
             * the current location
             */
            get currentLocation(): NetworkPreferencesSuite.Location
            set currentLocation(currentLocation: NetworkPreferencesSuite.Location)
            interfaces: JXAArraySpecifier<NetworkPreferencesSuite.Interface>
            locations: JXAArraySpecifier<NetworkPreferencesSuite.Location>
            services: JXAArraySpecifier<NetworkPreferencesSuite.Service>
        }

        /**
         * A collection of settings for a network service
         */
        export interface Service extends JXASpecifier<'service'>, RespondsTo<Application, 'connect' | 'disconnect'> {
            /**
             * Is the service active?
             */
            active: JXABoolean
            /**
             * the currently selected configuration
             */
            get currentConfiguration(): NetworkPreferencesSuite.Configuration
            set currentConfiguration(currentConfiguration: NetworkPreferencesSuite.Configuration)
            /**
             * the unique identifier for the service
             */
            id: JXAText
            /**
             * the interface the service is built on
             */
            interface: NetworkPreferencesSuite.Interface
            /**
             * the type of service
             */
            kind: JXAInteger
            /**
             * the name of the service
             */
            get name(): JXAText
            set name(name: string)
            configurations: JXAArraySpecifier<NetworkPreferencesSuite.Configuration>
        }
    }
    /**
     * Terms and Events for controlling screen saver settings.
     */
    export namespace ScreenSaverSuite {
        /**
         * The System Events application
         */
        export interface Application extends JXASpecifier<'application'> {
            /**
             * start the screen saver
             * @param directParameter the object for the command
             */
            start(directParameter: ScreenSaverSuite.ScreenSaver | ScreenSaverSuite.ScreenSaverPreferencesObject): void

            /**
             * stop the screen saver
             * @param directParameter the object for the command
             */
            stop(directParameter: ScreenSaverSuite.ScreenSaver | ScreenSaverSuite.ScreenSaverPreferencesObject): void

            /**
             * the currently selected screen saver
             */
            get currentScreenSaver(): ScreenSaverSuite.ScreenSaver
            set currentScreenSaver(currentScreenSaver: ScreenSaverSuite.ScreenSaver)
            /**
             * the preferences common to all screen savers
             */
            get screenSaverPreferences(): ScreenSaverSuite.ScreenSaverPreferencesObject
            set screenSaverPreferences(screenSaverPreferences: ScreenSaverSuite.ScreenSaverPreferencesObject)
            screenSavers: JXAArraySpecifier<ScreenSaverSuite.ScreenSaver>
            ScreenSaver: ObjectSpecifierConstructor<ScreenSaver>
            ScreenSaverPreferencesObject: ObjectSpecifierConstructor<ScreenSaverPreferencesObject>
        }

        /**
         * an installed screen saver
         */
        export interface ScreenSaver extends JXASpecifier<'screenSaver'>, RespondsTo<Application, 'start' | 'stop'> {
            /**
             * name of the screen saver module as displayed to the user
             */
            displayedName: JXAText
            /**
             * name of the screen saver module to be displayed
             */
            name: JXAText
            /**
             * path to the screen saver module
             */
            path: DiskFolderFileSuite.Alias
            /**
             * effect to use when displaying picture-based screen savers (slideshow, collage, or mosaic)
             */
            get pictureDisplayStyle(): JXAText
            set pictureDisplayStyle(pictureDisplayStyle: string)
        }

        /**
         * screen saver settings
         */
        export interface ScreenSaverPreferencesObject extends JXASpecifier<'screenSaverPreferencesObject'>, RespondsTo<Application, 'start' | 'stop'> {
            /**
             * number of seconds of idle time before the screen saver starts; zero for never
             */
            get delayInterval(): JXAInteger
            set delayInterval(delayInterval: number)
            /**
             * should the screen saver be shown only on the main screen?
             */
            get mainScreenOnly(): JXABoolean
            set mainScreenOnly(mainScreenOnly: boolean)
            /**
             * is the screen saver running?
             */
            running: JXABoolean
            /**
             * should a clock appear over the screen saver?
             */
            get showClock(): JXABoolean
            set showClock(showClock: boolean)
        }
    }
    /**
     * Terms for controlling Security preferences
     */
    export namespace SecuritySuite {
        /**
         * The System Events application
         */
        export interface Application extends JXASpecifier<'application'> {
            /**
             * a collection of security preferences
             */
            get securityPreferences(): SecuritySuite.SecurityPreferencesObject
            set securityPreferences(securityPreferences: SecuritySuite.SecurityPreferencesObject)
            SecurityPreferencesObject: ObjectSpecifierConstructor<SecurityPreferencesObject>
        }

        /**
         * a collection of security preferences
         */
        export interface SecurityPreferencesObject extends JXASpecifier<'securityPreferencesObject'> {
            /**
             * Is automatic login allowed?
             */
            get automaticLogin(): JXABoolean
            set automaticLogin(automaticLogin: boolean)
            /**
             * Will the computer log out when inactive?
             */
            get logOutWhenInactive(): JXABoolean
            set logOutWhenInactive(logOutWhenInactive: boolean)
            /**
             * The interval of inactivity after which the computer will log out
             */
            get logOutWhenInactiveInterval(): JXAInteger
            set logOutWhenInactiveInterval(logOutWhenInactiveInterval: number)
            /**
             * Is a password required to unlock secure preferences?
             */
            get requirePasswordToUnlock(): JXABoolean
            set requirePasswordToUnlock(requirePasswordToUnlock: boolean)
            /**
             * Is a password required to wake the computer from sleep or screen saver?
             */
            get requirePasswordToWake(): JXABoolean
            set requirePasswordToWake(requirePasswordToWake: boolean)
            /**
             * Is secure virtual memory being used?
             */
            get secureVirtualMemory(): JXABoolean
            set secureVirtualMemory(secureVirtualMemory: boolean)
        }
    }
    /**
     * Terms and Events for controlling Disks, Folders, and Files
     */
    export namespace DiskFolderFileSuite {
        /**
         * The Disk-Folder-File specific extensions to the application
         */
        export interface Application extends JXASpecifier<'application'> {
            /**
             * Delete disk item(s).
             * @param directParameter The disk item(s) to be deleted.
             */
            delete(directParameter: DiskFolderFileSuite.DiskItem): void

            /**
             * Move disk item(s) to a new location.
             * @param directParameter The disk item(s) to be moved.
             * @param option to: The new location for the disk item(s). 
             */
            move(directParameter: DiskFolderFileSuite.DiskItem | JXAArraySpecifier<DiskFolderFileSuite.DiskItem> | JXAText | JXAArraySpecifier<JXAText>, option: { to: JXALocationSpecifier | string }): void

            /**
             * Open disk item(s) with the appropriate application.
             * @param directParameter The disk item(s) to be opened.
             */
            open(directParameter: DiskFolderFileSuite.File | JXAText): DiskFolderFileSuite.File

            /**
             * The Application Support folder
             */
            applicationSupportFolder: DiskFolderFileSuite.Folder
            /**
             * The user's Applications folder
             */
            applicationsFolder: DiskFolderFileSuite.Folder
            /**
             * the collection of folders belonging to the Classic System
             */
            classicDomain: DiskFolderFileSuite.ClassicDomainObject
            /**
             * The user's Desktop folder
             */
            desktopFolder: DiskFolderFileSuite.Folder
            /**
             * The Desktop Pictures folder
             */
            desktopPicturesFolder: DiskFolderFileSuite.Folder
            /**
             * The user's Documents folder
             */
            documentsFolder: DiskFolderFileSuite.Folder
            /**
             * The user's Downloads folder
             */
            downloadsFolder: DiskFolderFileSuite.Folder
            /**
             * The user's Favorites folder
             */
            favoritesFolder: DiskFolderFileSuite.Folder
            /**
             * The user's Folder Action Scripts folder
             */
            folderActionScriptsFolder: DiskFolderFileSuite.Folder
            /**
             * The Fonts folder
             */
            fontsFolder: DiskFolderFileSuite.Folder
            /**
             * The Home folder of the currently logged in user
             */
            homeFolder: DiskFolderFileSuite.Folder
            /**
             * The Library folder
             */
            libraryFolder: DiskFolderFileSuite.Folder
            /**
             * the collection of folders residing on the Local machine
             */
            localDomain: DiskFolderFileSuite.LocalDomainObject
            /**
             * The user's Movies folder
             */
            moviesFolder: DiskFolderFileSuite.Folder
            /**
             * The user's Music folder
             */
            musicFolder: DiskFolderFileSuite.Folder
            /**
             * the collection of folders residing on the Network
             */
            networkDomain: DiskFolderFileSuite.NetworkDomainObject
            /**
             * The user's Pictures folder
             */
            picturesFolder: DiskFolderFileSuite.Folder
            /**
             * The user's Preferences folder
             */
            preferencesFolder: DiskFolderFileSuite.Folder
            /**
             * The user's Public folder
             */
            publicFolder: DiskFolderFileSuite.Folder
            /**
             * The Scripting Additions folder
             */
            scriptingAdditionsFolder: DiskFolderFileSuite.Folder
            /**
             * The user's Scripts folder
             */
            scriptsFolder: DiskFolderFileSuite.Folder
            /**
             * The Shared Documents folder
             */
            sharedDocumentsFolder: DiskFolderFileSuite.Folder
            /**
             * The user's Sites folder
             */
            sitesFolder: DiskFolderFileSuite.Folder
            /**
             * The Speakable Items folder
             */
            speakableItemsFolder: DiskFolderFileSuite.Folder
            /**
             * the disk from which Mac OS X was loaded
             */
            startupDisk: DiskFolderFileSuite.Disk
            /**
             * the collection of folders belonging to the System
             */
            systemDomain: DiskFolderFileSuite.SystemDomainObject
            /**
             * The Temporary Items folder
             */
            temporaryItemsFolder: DiskFolderFileSuite.Folder
            /**
             * The user's Trash folder
             */
            trash: DiskFolderFileSuite.Folder
            /**
             * the collection of folders belonging to the User
             */
            userDomain: DiskFolderFileSuite.UserDomainObject
            /**
             * The Utilities folder
             */
            utilitiesFolder: DiskFolderFileSuite.Folder
            /**
             * The Automator Workflows folder
             */
            workflowsFolder: DiskFolderFileSuite.Folder
            aliases: JXAArraySpecifier<DiskFolderFileSuite.Alias>
            disks: JXAArraySpecifier<DiskFolderFileSuite.Disk>
            diskItems: JXAArraySpecifier<DiskFolderFileSuite.DiskItem>
            domains: JXAArraySpecifier<DiskFolderFileSuite.Domain>
            files: JXAArraySpecifier<DiskFolderFileSuite.File>
            filePackages: JXAArraySpecifier<DiskFolderFileSuite.FilePackage>
            folders: JXAArraySpecifier<DiskFolderFileSuite.Folder>
            Alias: ObjectSpecifierConstructor<Alias>
            ClassicDomainObject: ObjectSpecifierConstructor<ClassicDomainObject>
            Disk: ObjectSpecifierConstructor<Disk>
            DiskItem: ObjectSpecifierConstructor<DiskItem>
            Domain: ObjectSpecifierConstructor<Domain>
            File: ObjectSpecifierConstructor<File>
            FilePackage: ObjectSpecifierConstructor<FilePackage>
            Folder: ObjectSpecifierConstructor<Folder>
            LocalDomainObject: ObjectSpecifierConstructor<LocalDomainObject>
            NetworkDomainObject: ObjectSpecifierConstructor<NetworkDomainObject>
            SystemDomainObject: ObjectSpecifierConstructor<SystemDomainObject>
            UserDomainObject: ObjectSpecifierConstructor<UserDomainObject>
        }

        /**
         * An alias in the file system
         */
        export interface Alias extends DiskFolderFileSuite.DiskItem<'alias'>, RespondsTo<Application, 'delete'> {
            /**
             * The kind of alias, as shown in Finder
             */
            kind: JXAText
            /**
             * the version of the product (visible at the top of the "Get Info" window)
             */
            productVersion: JXAText
            /**
             * the short version of the application bundle referenced by the alias
             */
            shortVersion: JXAText
            /**
             * Is the alias a stationery pad?
             */
            get stationery(): JXABoolean
            set stationery(stationery: boolean)
            /**
             * The type identifier of the alias
             */
            typeIdentifier: JXAText
            /**
             * the version of the application bundle referenced by the alias (visible at the bottom of the "Get Info" window)
             */
            version: JXAText
            aliases: JXAArraySpecifier<DiskFolderFileSuite.Alias>
            diskItems: JXAArraySpecifier<DiskFolderFileSuite.DiskItem>
            files: JXAArraySpecifier<DiskFolderFileSuite.File>
            filePackages: JXAArraySpecifier<DiskFolderFileSuite.FilePackage>
            folders: JXAArraySpecifier<DiskFolderFileSuite.Folder>
        }

        /**
         * The Classic domain in the file system
         */
        export interface ClassicDomainObject extends DiskFolderFileSuite.Domain<'classicDomainObject'> {
            /**
             * The Apple Menu Items folder
             */
            appleMenuFolder: DiskFolderFileSuite.Folder
            /**
             * The Control Panels folder
             */
            controlPanelsFolder: DiskFolderFileSuite.Folder
            /**
             * The Control Strip Modules folder
             */
            controlStripModulesFolder: DiskFolderFileSuite.Folder
            /**
             * The Classic Desktop folder
             */
            desktopFolder: DiskFolderFileSuite.Folder
            /**
             * The Extensions folder
             */
            extensionsFolder: DiskFolderFileSuite.Folder
            /**
             * The Fonts folder
             */
            fontsFolder: DiskFolderFileSuite.Folder
            /**
             * The Launcher Items folder
             */
            launcherItemsFolder: DiskFolderFileSuite.Folder
            /**
             * The Classic Preferences folder
             */
            preferencesFolder: DiskFolderFileSuite.Folder
            /**
             * The Shutdown Items folder
             */
            shutdownFolder: DiskFolderFileSuite.Folder
            /**
             * The StartupItems folder
             */
            startupItemsFolder: DiskFolderFileSuite.Folder
            /**
             * The System folder
             */
            systemFolder: DiskFolderFileSuite.Folder
            folders: JXAArraySpecifier<DiskFolderFileSuite.Folder>
        }

        /**
         * A disk in the file system
         */
        export interface Disk extends DiskFolderFileSuite.DiskItem<'disk'>, RespondsTo<Application, 'delete'> {
            /**
             * the total number of bytes (free or used) on the disk
             */
            capacity: JXANumber
            /**
             * Can the media be ejected (floppies, CD's, and so on)?
             */
            ejectable: JXABoolean
            /**
             * the file system format of this disk
             */
            format: 'Apple Photo format' | 'AppleShare format' | 'audio format' | 'High Sierra format' | 'ISO 9660 format' | 'Mac OS Extended format' | 'Mac OS format' | 'MSDOS format' | 'NFS format' | 'ProDOS format' | 'QuickTake format' | 'UDF format' | 'UFS format' | 'unknown format' | 'WebDAV format'
            /**
             * the number of free bytes left on the disk
             */
            freeSpace: JXANumber
            /**
             * Ignore permissions on this disk?
             */
            get ignorePrivileges(): JXABoolean
            set ignorePrivileges(ignorePrivileges: boolean)
            /**
             * Is the media a local volume (as opposed to a file server)?
             */
            localVolume: JXABoolean
            /**
             * Is this disk the boot disk?
             */
            startup: JXABoolean
            aliases: JXAArraySpecifier<DiskFolderFileSuite.Alias>
            diskItems: JXAArraySpecifier<DiskFolderFileSuite.DiskItem>
            files: JXAArraySpecifier<DiskFolderFileSuite.File>
            filePackages: JXAArraySpecifier<DiskFolderFileSuite.FilePackage>
            folders: JXAArraySpecifier<DiskFolderFileSuite.Folder>
        }

        /**
         * An item stored in the file system
         */
        export interface DiskItem<N = 'diskItem'> extends JXASpecifier<N>, RespondsTo<Application, 'open' | 'move'> {
            /**
             * Is the disk item busy?
             */
            busyStatus: JXABoolean
            /**
             * the folder or disk which has this disk item as an element
             */
            container: DiskFolderFileSuite.DiskItem
            /**
             * the date on which the disk item was created
             */
            creationDate: JXADate
            /**
             * the name of the disk item as displayed in the User Interface
             */
            displayedName: JXAText
            /**
             * the unique ID of the disk item
             */
            id: JXAText
            /**
             * the date on which the disk item was last modified
             */
            get modificationDate(): JXADate
            set modificationDate(modificationDate: Date)
            /**
             * the name of the disk item
             */
            get name(): JXAText
            set name(name: string)
            /**
             * the extension portion of the name
             */
            nameExtension: JXAText
            /**
             * Is the disk item a package?
             */
            packageFolder: JXABoolean
            /**
             * the file system path of the disk item
             */
            path: JXAText
            /**
             * the actual space used by the disk item on disk
             */
            physicalSize: JXAInteger
            /**
             * the POSIX file system path of the disk item
             */
            posixPath: JXAText
            /**
             * the logical size of the disk item
             */
            size: JXAInteger
            /**
             * the URL of the disk item
             */
            url: JXAText
            /**
             * Is the disk item visible?
             */
            get visible(): JXABoolean
            set visible(visible: boolean)
            /**
             * the volume on which the disk item resides
             */
            volume: JXAText
        }

        /**
         * A domain in the file system
         */
        export interface Domain<N = 'domain'> extends JXASpecifier<N> {
            /**
             * The Application Support folder
             */
            applicationSupportFolder: DiskFolderFileSuite.Folder
            /**
             * The Applications folder
             */
            applicationsFolder: DiskFolderFileSuite.Folder
            /**
             * The Desktop Pictures folder
             */
            desktopPicturesFolder: DiskFolderFileSuite.Folder
            /**
             * The Folder Action Scripts folder
             */
            folderActionScriptsFolder: DiskFolderFileSuite.Folder
            /**
             * The Fonts folder
             */
            fontsFolder: DiskFolderFileSuite.Folder
            /**
             * the unique identifier of the domain
             */
            id: JXAText
            /**
             * The Library folder
             */
            libraryFolder: DiskFolderFileSuite.Folder
            /**
             * the name of the domain
             */
            name: JXAText
            /**
             * The Preferences folder
             */
            preferencesFolder: DiskFolderFileSuite.Folder
            /**
             * The Scripting Additions folder
             */
            scriptingAdditionsFolder: DiskFolderFileSuite.Folder
            /**
             * The Scripts folder
             */
            scriptsFolder: DiskFolderFileSuite.Folder
            /**
             * The Shared Documents folder
             */
            sharedDocumentsFolder: DiskFolderFileSuite.Folder
            /**
             * The Speakable Items folder
             */
            speakableItemsFolder: DiskFolderFileSuite.Folder
            /**
             * The Utilities folder
             */
            utilitiesFolder: DiskFolderFileSuite.Folder
            /**
             * The Automator Workflows folder
             */
            workflowsFolder: DiskFolderFileSuite.Folder
            folders: JXAArraySpecifier<DiskFolderFileSuite.Folder>
        }

        /**
         * A file in the file system
         */
        export interface File<N = 'file'> extends DiskFolderFileSuite.DiskItem<N> {
            /**
             * The kind of file, as shown in Finder
             */
            kind: JXAText
            /**
             * the version of the product (visible at the top of the "Get Info" window)
             */
            productVersion: JXAText
            /**
             * the short version of the file
             */
            shortVersion: JXAText
            /**
             * Is the file a stationery pad?
             */
            get stationery(): JXABoolean
            set stationery(stationery: boolean)
            /**
             * The type identifier of the file
             */
            typeIdentifier: JXAText
            /**
             * the version of the file (visible at the bottom of the "Get Info" window)
             */
            version: JXAText
        }

        /**
         * A file package in the file system
         */
        export interface FilePackage extends DiskFolderFileSuite.File<'filePackage'>, RespondsTo<Application, 'delete'> {
            aliases: JXAArraySpecifier<DiskFolderFileSuite.Alias>
            diskItems: JXAArraySpecifier<DiskFolderFileSuite.DiskItem>
            files: JXAArraySpecifier<DiskFolderFileSuite.File>
            filePackages: JXAArraySpecifier<DiskFolderFileSuite.FilePackage>
            folders: JXAArraySpecifier<DiskFolderFileSuite.Folder>
        }

        /**
         * A folder in the file system
         */
        export interface Folder extends DiskFolderFileSuite.DiskItem<'folder'>, HiddenSuite.Folder, RespondsTo<Application, 'delete'> {
            aliases: JXAArraySpecifier<DiskFolderFileSuite.Alias>
            diskItems: JXAArraySpecifier<DiskFolderFileSuite.DiskItem>
            files: JXAArraySpecifier<DiskFolderFileSuite.File>
            filePackages: JXAArraySpecifier<DiskFolderFileSuite.FilePackage>
            folders: JXAArraySpecifier<DiskFolderFileSuite.Folder>
        }

        /**
         * The local domain in the file system
         */
        export interface LocalDomainObject extends DiskFolderFileSuite.Domain<'localDomainObject'> {
            folders: JXAArraySpecifier<DiskFolderFileSuite.Folder>
        }

        /**
         * The network domain in the file system
         */
        export interface NetworkDomainObject extends DiskFolderFileSuite.Domain<'networkDomainObject'> {
            folders: JXAArraySpecifier<DiskFolderFileSuite.Folder>
        }

        /**
         * The system domain in the file system
         */
        export interface SystemDomainObject extends DiskFolderFileSuite.Domain<'systemDomainObject'> {
            folders: JXAArraySpecifier<DiskFolderFileSuite.Folder>
        }

        /**
         * The user domain in the file system
         */
        export interface UserDomainObject extends DiskFolderFileSuite.Domain<'userDomainObject'> {
            /**
             * The user's Desktop folder
             */
            desktopFolder: DiskFolderFileSuite.Folder
            /**
             * The user's Documents folder
             */
            documentsFolder: DiskFolderFileSuite.Folder
            /**
             * The user's Downloads folder
             */
            downloadsFolder: DiskFolderFileSuite.Folder
            /**
             * The user's Favorites folder
             */
            favoritesFolder: DiskFolderFileSuite.Folder
            /**
             * The user's Home folder
             */
            homeFolder: DiskFolderFileSuite.Folder
            /**
             * The user's Movies folder
             */
            moviesFolder: DiskFolderFileSuite.Folder
            /**
             * The user's Music folder
             */
            musicFolder: DiskFolderFileSuite.Folder
            /**
             * The user's Pictures folder
             */
            picturesFolder: DiskFolderFileSuite.Folder
            /**
             * The user's Public folder
             */
            publicFolder: DiskFolderFileSuite.Folder
            /**
             * The user's Sites folder
             */
            sitesFolder: DiskFolderFileSuite.Folder
            /**
             * The Temporary Items folder
             */
            temporaryItemsFolder: DiskFolderFileSuite.Folder
            folders: JXAArraySpecifier<DiskFolderFileSuite.Folder>
        }
    }
    /**
     * Terms and Events for controlling System power
     */
    export namespace PowerSuite {

        export interface Application extends JXASpecifier<'application'> {
            /**
             * Log out the current user
             */
            logOut(): void

            /**
             * Restart the computer
             * @param option stateSavingPreference: Is the user defined state saving preference followed? 
             */
            restart(option?: { stateSavingPreference?: boolean }): void

            /**
             * Shut Down the computer
             * @param option stateSavingPreference: Is the user defined state saving preference followed? 
             */
            shutDown(option?: { stateSavingPreference?: boolean }): void

            /**
             * Put the computer to sleep
             */
            sleep(): void

        }

    }
    /**
     * Terms and Events for controlling Processes
     */
    export namespace ProcessesSuite {
        /**
         * The System Events application
         */
        export interface Application extends JXASpecifier<'application'> {
            /**
             * cause the target process to behave as if the UI element were clicked
             * @param directParameter The UI element to be clicked.
             * @param option at: when sent to a "process" object, the { x, y } location at which to click, in global coordinates 
             */
            click(directParameter?: ProcessesSuite.UiElement, option?: { at?: JXANumber[] }): void

            /**
             * cause the target process to behave as if key codes were entered
             * @param directParameter The key code(s) to be sent. May be a list.
             * @param option using: modifiers with which the key codes are to be entered 
             */
            keyCode(directParameter: JXAInteger | JXAArraySpecifier<JXAInteger>, option?: { using?: 'command down' | 'control down' | 'option down' | 'shift down' | ('command down' | 'control down' | 'option down' | 'shift down')[] }): void

            /**
             * cause the target process to behave as if keystrokes were entered
             * @param directParameter The keystrokes to be sent.
             * @param option using: modifiers with which the keystrokes are to be entered 
             */
            keystroke(directParameter: JXAText, option?: { using?: 'command down' | 'control down' | 'option down' | 'shift down' | ('command down' | 'control down' | 'option down' | 'shift down')[] }): void

            /**
             * cause the target process to behave as if the action were applied to its UI element
             * @param directParameter The action to be performed.
             */
            perform<T extends ProcessesSuite.Action>(directParameter: T): T

            /**
             * set the selected property of the UI element
             * @param directParameter The UI element to be selected.
             */
            select<T extends ProcessesSuite.UiElement>(directParameter: T): T

            /**
             * Are UI element events currently being processed?
             */
            uiElementsEnabled: JXABoolean
            applicationProcesses: JXAArraySpecifier<ProcessesSuite.ApplicationProcess>
            deskAccessoryProcesses: JXAArraySpecifier<ProcessesSuite.DeskAccessoryProcess>
            processes: JXAArraySpecifier<ProcessesSuite.Process>
            uiElements: JXAArraySpecifier<ProcessesSuite.UiElement>
            Action: ObjectSpecifierConstructor<Action>
            ApplicationProcess: ObjectSpecifierConstructor<ApplicationProcess>
            Attribute: ObjectSpecifierConstructor<Attribute>
            Browser: ObjectSpecifierConstructor<Browser>
            BusyIndicator: ObjectSpecifierConstructor<BusyIndicator>
            Button: ObjectSpecifierConstructor<Button>
            Checkbox: ObjectSpecifierConstructor<Checkbox>
            ColorWell: ObjectSpecifierConstructor<ColorWell>
            Column: ObjectSpecifierConstructor<Column>
            ComboBox: ObjectSpecifierConstructor<ComboBox>
            DeskAccessoryProcess: ObjectSpecifierConstructor<DeskAccessoryProcess>
            Drawer: ObjectSpecifierConstructor<Drawer>
            Group: ObjectSpecifierConstructor<Group>
            GrowArea: ObjectSpecifierConstructor<GrowArea>
            Image: ObjectSpecifierConstructor<Image>
            Incrementor: ObjectSpecifierConstructor<Incrementor>
            List: ObjectSpecifierConstructor<List>
            Menu: ObjectSpecifierConstructor<Menu>
            MenuBar: ObjectSpecifierConstructor<MenuBar>
            MenuBarItem: ObjectSpecifierConstructor<MenuBarItem>
            MenuButton: ObjectSpecifierConstructor<MenuButton>
            MenuItem: ObjectSpecifierConstructor<MenuItem>
            Outline: ObjectSpecifierConstructor<Outline>
            PopOver: ObjectSpecifierConstructor<PopOver>
            PopUpButton: ObjectSpecifierConstructor<PopUpButton>
            Process: ObjectSpecifierConstructor<Process>
            ProgressIndicator: ObjectSpecifierConstructor<ProgressIndicator>
            RadioButton: ObjectSpecifierConstructor<RadioButton>
            RadioGroup: ObjectSpecifierConstructor<RadioGroup>
            RelevanceIndicator: ObjectSpecifierConstructor<RelevanceIndicator>
            Row: ObjectSpecifierConstructor<Row>
            ScrollArea: ObjectSpecifierConstructor<ScrollArea>
            ScrollBar: ObjectSpecifierConstructor<ScrollBar>
            Sheet: ObjectSpecifierConstructor<Sheet>
            Slider: ObjectSpecifierConstructor<Slider>
            Splitter: ObjectSpecifierConstructor<Splitter>
            SplitterGroup: ObjectSpecifierConstructor<SplitterGroup>
            StaticText: ObjectSpecifierConstructor<StaticText>
            TabGroup: ObjectSpecifierConstructor<TabGroup>
            Table: ObjectSpecifierConstructor<Table>
            TextArea: ObjectSpecifierConstructor<TextArea>
            TextField: ObjectSpecifierConstructor<TextField>
            Toolbar: ObjectSpecifierConstructor<Toolbar>
            UiElement: ObjectSpecifierConstructor<UiElement>
            ValueIndicator: ObjectSpecifierConstructor<ValueIndicator>
        }

        /**
         * A window belonging to a process
         */
        export interface Window extends JXASpecifier<'window'> {
            /**
             * the class of the window, which identifies its function
             */
            class: JXAType<this>
            /**
             * the name of the window, which identifies it within its container
             */
            name: JXAText
            /**
             * an encoded description of the window and its capabilities
             */
            role: JXAText
            /**
             * a more complete description of the window's role
             */
            roleDescription: JXAText
            /**
             * the title of the window as it appears on the screen
             */
            title: JXAText
            actions: JXAArraySpecifier<ProcessesSuite.Action>
            attributes: JXAArraySpecifier<ProcessesSuite.Attribute>
            browsers: JXAArraySpecifier<ProcessesSuite.Browser>
            busyIndicators: JXAArraySpecifier<ProcessesSuite.BusyIndicator>
            buttons: JXAArraySpecifier<ProcessesSuite.Button>
            checkboxes: JXAArraySpecifier<ProcessesSuite.Checkbox>
            colorWells: JXAArraySpecifier<ProcessesSuite.ColorWell>
            comboBoxes: JXAArraySpecifier<ProcessesSuite.ComboBox>
            drawers: JXAArraySpecifier<ProcessesSuite.Drawer>
            groups: JXAArraySpecifier<ProcessesSuite.Group>
            growAreas: JXAArraySpecifier<ProcessesSuite.GrowArea>
            images: JXAArraySpecifier<ProcessesSuite.Image>
            incrementors: JXAArraySpecifier<ProcessesSuite.Incrementor>
            lists: JXAArraySpecifier<ProcessesSuite.List>
            menuButtons: JXAArraySpecifier<ProcessesSuite.MenuButton>
            outlines: JXAArraySpecifier<ProcessesSuite.Outline>
            popOvers: JXAArraySpecifier<ProcessesSuite.PopOver>
            popUpButtons: JXAArraySpecifier<ProcessesSuite.PopUpButton>
            progressIndicators: JXAArraySpecifier<ProcessesSuite.ProgressIndicator>
            radioButtons: JXAArraySpecifier<ProcessesSuite.RadioButton>
            radioGroups: JXAArraySpecifier<ProcessesSuite.RadioGroup>
            relevanceIndicators: JXAArraySpecifier<ProcessesSuite.RelevanceIndicator>
            scrollAreas: JXAArraySpecifier<ProcessesSuite.ScrollArea>
            scrollBars: JXAArraySpecifier<ProcessesSuite.ScrollBar>
            sheets: JXAArraySpecifier<ProcessesSuite.Sheet>
            sliders: JXAArraySpecifier<ProcessesSuite.Slider>
            splitters: JXAArraySpecifier<ProcessesSuite.Splitter>
            splitterGroups: JXAArraySpecifier<ProcessesSuite.SplitterGroup>
            staticTexts: JXAArraySpecifier<ProcessesSuite.StaticText>
            tabGroups: JXAArraySpecifier<ProcessesSuite.TabGroup>
            tables: JXAArraySpecifier<ProcessesSuite.Table>
            textAreas: JXAArraySpecifier<ProcessesSuite.TextArea>
            textFields: JXAArraySpecifier<ProcessesSuite.TextField>
            toolbars: JXAArraySpecifier<ProcessesSuite.Toolbar>
            uiElements: JXAArraySpecifier<ProcessesSuite.UiElement>
            Action: ObjectSpecifierConstructor<Action>
            ApplicationProcess: ObjectSpecifierConstructor<ApplicationProcess>
            Attribute: ObjectSpecifierConstructor<Attribute>
            Browser: ObjectSpecifierConstructor<Browser>
            BusyIndicator: ObjectSpecifierConstructor<BusyIndicator>
            Button: ObjectSpecifierConstructor<Button>
            Checkbox: ObjectSpecifierConstructor<Checkbox>
            ColorWell: ObjectSpecifierConstructor<ColorWell>
            Column: ObjectSpecifierConstructor<Column>
            ComboBox: ObjectSpecifierConstructor<ComboBox>
            DeskAccessoryProcess: ObjectSpecifierConstructor<DeskAccessoryProcess>
            Drawer: ObjectSpecifierConstructor<Drawer>
            Group: ObjectSpecifierConstructor<Group>
            GrowArea: ObjectSpecifierConstructor<GrowArea>
            Image: ObjectSpecifierConstructor<Image>
            Incrementor: ObjectSpecifierConstructor<Incrementor>
            List: ObjectSpecifierConstructor<List>
            Menu: ObjectSpecifierConstructor<Menu>
            MenuBar: ObjectSpecifierConstructor<MenuBar>
            MenuBarItem: ObjectSpecifierConstructor<MenuBarItem>
            MenuButton: ObjectSpecifierConstructor<MenuButton>
            MenuItem: ObjectSpecifierConstructor<MenuItem>
            Outline: ObjectSpecifierConstructor<Outline>
            PopOver: ObjectSpecifierConstructor<PopOver>
            PopUpButton: ObjectSpecifierConstructor<PopUpButton>
            Process: ObjectSpecifierConstructor<Process>
            ProgressIndicator: ObjectSpecifierConstructor<ProgressIndicator>
            RadioButton: ObjectSpecifierConstructor<RadioButton>
            RadioGroup: ObjectSpecifierConstructor<RadioGroup>
            RelevanceIndicator: ObjectSpecifierConstructor<RelevanceIndicator>
            Row: ObjectSpecifierConstructor<Row>
            ScrollArea: ObjectSpecifierConstructor<ScrollArea>
            ScrollBar: ObjectSpecifierConstructor<ScrollBar>
            Sheet: ObjectSpecifierConstructor<Sheet>
            Slider: ObjectSpecifierConstructor<Slider>
            Splitter: ObjectSpecifierConstructor<Splitter>
            SplitterGroup: ObjectSpecifierConstructor<SplitterGroup>
            StaticText: ObjectSpecifierConstructor<StaticText>
            TabGroup: ObjectSpecifierConstructor<TabGroup>
            Table: ObjectSpecifierConstructor<Table>
            TextArea: ObjectSpecifierConstructor<TextArea>
            TextField: ObjectSpecifierConstructor<TextField>
            Toolbar: ObjectSpecifierConstructor<Toolbar>
            UiElement: ObjectSpecifierConstructor<UiElement>
            ValueIndicator: ObjectSpecifierConstructor<ValueIndicator>
        }

        /**
         * An action that can be performed on the UI element
         */
        export interface Action extends JXASpecifier<'action'>, RespondsTo<Application, 'perform'> {
            /**
             * what the action does
             */
            description: JXAText
            /**
             * the name of the action
             */
            name: JXAText
        }

        /**
         * A process launched from an application file
         */
        export interface ApplicationProcess extends ProcessesSuite.Process<'applicationProcess'> {
        }

        /**
         * An named data value associated with the UI element
         */
        export interface Attribute extends JXASpecifier<'attribute'> {
            /**
             * the name of the attribute
             */
            name: JXAText
            /**
             * Can the attribute be set?
             */
            settable: JXABoolean
        }

        /**
         * A browser belonging to a window
         */
        export interface Browser extends ProcessesSuite.UiElement<'browser'> {
        }

        /**
         * A busy indicator belonging to a window
         */
        export interface BusyIndicator extends ProcessesSuite.UiElement<'busyIndicator'> {
        }

        /**
         * A button belonging to a window or scroll bar
         */
        export interface Button extends ProcessesSuite.UiElement<'button'> {
        }

        /**
         * A checkbox belonging to a window
         */
        export interface Checkbox extends ProcessesSuite.UiElement<'checkbox'> {
        }

        /**
         * A color well belonging to a window
         */
        export interface ColorWell extends ProcessesSuite.UiElement<'colorWell'> {
        }

        /**
         * A column belonging to a table
         */
        export interface Column extends ProcessesSuite.UiElement<'column'> {
        }

        /**
         * A combo box belonging to a window
         */
        export interface ComboBox extends ProcessesSuite.UiElement<'comboBox'> {
        }

        /**
         * A process launched from an desk accessory file
         */
        export interface DeskAccessoryProcess extends ProcessesSuite.Process<'deskAccessoryProcess'> {
            /**
             * a reference to the desk accessory file from which this process was launched
             */
            deskAccessoryFile: DiskFolderFileSuite.Alias
        }

        /**
         * A drawer that may be extended from a window
         */
        export interface Drawer extends ProcessesSuite.UiElement<'drawer'> {
        }

        /**
         * A group belonging to a window
         */
        export interface Group extends ProcessesSuite.UiElement<'group'> {
            checkboxes: JXAArraySpecifier<ProcessesSuite.Checkbox>
            staticTexts: JXAArraySpecifier<ProcessesSuite.StaticText>
        }

        /**
         * A grow area belonging to a window
         */
        export interface GrowArea extends ProcessesSuite.UiElement<'growArea'> {
        }

        /**
         * An image belonging to a static text field
         */
        export interface Image extends ProcessesSuite.UiElement<'image'> {
        }

        /**
         * A incrementor belonging to a window
         */
        export interface Incrementor extends ProcessesSuite.UiElement<'incrementor'> {
        }

        /**
         * A list belonging to a window
         */
        export interface List extends ProcessesSuite.UiElement<'list'> {
        }

        /**
         * A menu belonging to a menu bar item
         */
        export interface Menu extends ProcessesSuite.UiElement<'menu'> {
            menuItems: JXAArraySpecifier<ProcessesSuite.MenuItem>
        }

        /**
         * A menu bar belonging to a process
         */
        export interface MenuBar extends ProcessesSuite.UiElement<'menuBar'> {
            menus: JXAArraySpecifier<ProcessesSuite.Menu>
            menuBarItems: JXAArraySpecifier<ProcessesSuite.MenuBarItem>
        }

        /**
         * A menu bar item belonging to a menu bar
         */
        export interface MenuBarItem extends ProcessesSuite.UiElement<'menuBarItem'> {
            menus: JXAArraySpecifier<ProcessesSuite.Menu>
        }

        /**
         * A menu button belonging to a window
         */
        export interface MenuButton extends ProcessesSuite.UiElement<'menuButton'> {
        }

        /**
         * A menu item belonging to a menu
         */
        export interface MenuItem extends ProcessesSuite.UiElement<'menuItem'> {
            menus: JXAArraySpecifier<ProcessesSuite.Menu>
        }

        /**
         * A outline belonging to a window
         */
        export interface Outline extends ProcessesSuite.UiElement<'outline'> {
        }

        /**
         * A pop over belonging to a window
         */
        export interface PopOver extends ProcessesSuite.UiElement<'popOver'> {
        }

        /**
         * A pop up button belonging to a window
         */
        export interface PopUpButton extends ProcessesSuite.UiElement<'popUpButton'> {
        }

        /**
         * A process running on this computer
         */
        export interface Process<N = 'process'> extends ProcessesSuite.UiElement<N>, RespondsTo<Application, 'click'> {
            /**
             * Is the process high-level event aware (accepts open application, open document, print document, and quit)?
             */
            acceptsHighLevelEvents: JXABoolean
            /**
             * Does the process accept remote events?
             */
            acceptsRemoteEvents: JXABoolean
            /**
             * the architecture in which the process is running
             */
            architecture: JXAText
            /**
             * Does the process run exclusively in the background?
             */
            backgroundOnly: JXABoolean
            /**
             * the bundle identifier of the process' application file
             */
            bundleIdentifier: JXAText
            /**
             * Is the process running in the Classic environment?
             */
            classic: JXABoolean
            /**
             * the OSType of the creator of the process (the signature)
             */
            creatorType: JXAText
            /**
             * the name of the file from which the process was launched, as displayed in the User Interface
             */
            displayedName: JXAText
            /**
             * the file from which the process was launched
             */
            file: DiskFolderFileSuite.File
            /**
             * the OSType of the file type of the process
             */
            fileType: JXAText
            /**
             * Is the process the frontmost process
             */
            get frontmost(): JXABoolean
            set frontmost(frontmost: boolean)
            /**
             * Does the process have a scripting terminology, i.e., can it be scripted?
             */
            hasScriptingTerminology: JXABoolean
            /**
             * The unique identifier of the process
             */
            id: JXAInteger
            /**
             * the name of the process
             */
            name: JXAText
            /**
             * the number of bytes currently used in the process' partition
             */
            partitionSpaceUsed: JXAInteger
            /**
             * the size of the partition with which the process was launched
             */
            totalPartitionSize: JXAInteger
            /**
             * The Unix process identifier of a process running in the native environment, or -1 for a process running in the Classic environment
             */
            unixId: JXAInteger
            menuBars: JXAArraySpecifier<ProcessesSuite.MenuBar>
            windows: JXAArraySpecifier<StandardSuite.Window>
        }

        /**
         * A progress indicator belonging to a window
         */
        export interface ProgressIndicator extends ProcessesSuite.UiElement<'progressIndicator'> {
        }

        /**
         * A radio button belonging to a window
         */
        export interface RadioButton extends ProcessesSuite.UiElement<'radioButton'> {
        }

        /**
         * A radio button group belonging to a window
         */
        export interface RadioGroup extends ProcessesSuite.UiElement<'radioGroup'> {
            radioButtons: JXAArraySpecifier<ProcessesSuite.RadioButton>
        }

        /**
         * A relevance indicator belonging to a window
         */
        export interface RelevanceIndicator extends ProcessesSuite.UiElement<'relevanceIndicator'> {
        }

        /**
         * A row belonging to a table
         */
        export interface Row extends ProcessesSuite.UiElement<'row'> {
        }

        /**
         * A scroll area belonging to a window
         */
        export interface ScrollArea extends ProcessesSuite.UiElement<'scrollArea'> {
        }

        /**
         * A scroll bar belonging to a window
         */
        export interface ScrollBar extends ProcessesSuite.UiElement<'scrollBar'> {
            buttons: JXAArraySpecifier<ProcessesSuite.Button>
            valueIndicators: JXAArraySpecifier<ProcessesSuite.ValueIndicator>
        }

        /**
         * A sheet displayed over a window
         */
        export interface Sheet extends ProcessesSuite.UiElement<'sheet'> {
        }

        /**
         * A slider belonging to a window
         */
        export interface Slider extends ProcessesSuite.UiElement<'slider'> {
        }

        /**
         * A splitter belonging to a window
         */
        export interface Splitter extends ProcessesSuite.UiElement<'splitter'> {
        }

        /**
         * A splitter group belonging to a window
         */
        export interface SplitterGroup extends ProcessesSuite.UiElement<'splitterGroup'> {
        }

        /**
         * A static text field belonging to a window
         */
        export interface StaticText extends ProcessesSuite.UiElement<'staticText'> {
            images: JXAArraySpecifier<ProcessesSuite.Image>
        }

        /**
         * A tab group belonging to a window
         */
        export interface TabGroup extends ProcessesSuite.UiElement<'tabGroup'> {
        }

        /**
         * A table belonging to a window
         */
        export interface Table extends ProcessesSuite.UiElement<'table'> {
        }

        /**
         * A text area belonging to a window
         */
        export interface TextArea extends ProcessesSuite.UiElement<'textArea'> {
        }

        /**
         * A text field belonging to a window
         */
        export interface TextField extends ProcessesSuite.UiElement<'textField'> {
        }

        /**
         * A toolbar belonging to a window
         */
        export interface Toolbar extends ProcessesSuite.UiElement<'toolbar'> {
        }

        /**
         * A piece of the user interface of a process
         */
        export interface UiElement<N = 'uiElement'> extends JXASpecifier<N>, RespondsTo<Application, 'click' | 'select' | 'increment' | 'decrement' | 'confirm' | 'pick' | 'cancel'> {
            /**
             * the class of the UI Element, which identifies it function
             */
            class: JXAType<this>
            /**
             * the name of the UI Element, which identifies it within its container
             */
            name: JXAText
            /**
             * an encoded description of the UI element and its capabilities
             */
            role: JXAText
            /**
             * a more complete description of the UI element's role
             */
            roleDescription: JXAText
            /**
             * the title of the UI element as it appears on the screen
             */
            title: JXAText
            actions: JXAArraySpecifier<ProcessesSuite.Action>
            attributes: JXAArraySpecifier<ProcessesSuite.Attribute>
            browsers: JXAArraySpecifier<ProcessesSuite.Browser>
            busyIndicators: JXAArraySpecifier<ProcessesSuite.BusyIndicator>
            buttons: JXAArraySpecifier<ProcessesSuite.Button>
            checkboxes: JXAArraySpecifier<ProcessesSuite.Checkbox>
            colorWells: JXAArraySpecifier<ProcessesSuite.ColorWell>
            columns: JXAArraySpecifier<ProcessesSuite.Column>
            comboBoxes: JXAArraySpecifier<ProcessesSuite.ComboBox>
            drawers: JXAArraySpecifier<ProcessesSuite.Drawer>
            groups: JXAArraySpecifier<ProcessesSuite.Group>
            growAreas: JXAArraySpecifier<ProcessesSuite.GrowArea>
            images: JXAArraySpecifier<ProcessesSuite.Image>
            incrementors: JXAArraySpecifier<ProcessesSuite.Incrementor>
            lists: JXAArraySpecifier<ProcessesSuite.List>
            menus: JXAArraySpecifier<ProcessesSuite.Menu>
            menuBars: JXAArraySpecifier<ProcessesSuite.MenuBar>
            menuBarItems: JXAArraySpecifier<ProcessesSuite.MenuBarItem>
            menuButtons: JXAArraySpecifier<ProcessesSuite.MenuButton>
            menuItems: JXAArraySpecifier<ProcessesSuite.MenuItem>
            outlines: JXAArraySpecifier<ProcessesSuite.Outline>
            popOvers: JXAArraySpecifier<ProcessesSuite.PopOver>
            popUpButtons: JXAArraySpecifier<ProcessesSuite.PopUpButton>
            progressIndicators: JXAArraySpecifier<ProcessesSuite.ProgressIndicator>
            radioButtons: JXAArraySpecifier<ProcessesSuite.RadioButton>
            radioGroups: JXAArraySpecifier<ProcessesSuite.RadioGroup>
            relevanceIndicators: JXAArraySpecifier<ProcessesSuite.RelevanceIndicator>
            rows: JXAArraySpecifier<ProcessesSuite.Row>
            scrollAreas: JXAArraySpecifier<ProcessesSuite.ScrollArea>
            scrollBars: JXAArraySpecifier<ProcessesSuite.ScrollBar>
            sheets: JXAArraySpecifier<ProcessesSuite.Sheet>
            sliders: JXAArraySpecifier<ProcessesSuite.Slider>
            splitters: JXAArraySpecifier<ProcessesSuite.Splitter>
            splitterGroups: JXAArraySpecifier<ProcessesSuite.SplitterGroup>
            staticTexts: JXAArraySpecifier<ProcessesSuite.StaticText>
            tabGroups: JXAArraySpecifier<ProcessesSuite.TabGroup>
            tables: JXAArraySpecifier<ProcessesSuite.Table>
            textAreas: JXAArraySpecifier<ProcessesSuite.TextArea>
            textFields: JXAArraySpecifier<ProcessesSuite.TextField>
            toolbars: JXAArraySpecifier<ProcessesSuite.Toolbar>
            uiElements: JXAArraySpecifier<ProcessesSuite.UiElement>
            valueIndicators: JXAArraySpecifier<ProcessesSuite.ValueIndicator>
            windows: JXAArraySpecifier<StandardSuite.Window>
        }

        /**
         * A value indicator ( thumb or slider ) belonging to a scroll bar
         */
        export interface ValueIndicator extends ProcessesSuite.UiElement<'valueIndicator'> {
        }
    }
    /**
     * Terms and Events for accessing the content of Property List files
     */
    export namespace PropertyListSuite {
        /**
         * The System Events application
         */
        export interface Application extends JXASpecifier<'application'> {
            propertyListFiles: JXAArraySpecifier<PropertyListSuite.PropertyListFile>
            propertyListItems: JXAArraySpecifier<PropertyListSuite.PropertyListItem>
            PropertyListFile: ObjectSpecifierConstructor<PropertyListFile>
            Data: ObjectSpecifierConstructor<Data>
            PropertyListItem: ObjectSpecifierConstructor<PropertyListItem>
        }

        export interface PropertyListItem extends JXASpecifier<'propertyListItem'> {
            PropertyListFile: ObjectSpecifierConstructor<PropertyListFile>
            Data: ObjectSpecifierConstructor<Data>
            PropertyListItem: ObjectSpecifierConstructor<PropertyListItem>
        }

        /**
         * A file containing data in Property List format
         */
        export interface PropertyListFile extends DiskFolderFileSuite.File<'propertyListFile'> {
        }

        /**
         * A data blob
         */
        export interface Data extends JXASpecifier<'data'> {
        }

        /**
         * A unit of data in Property List format
         */
        export interface PropertyListItem extends JXASpecifier<'propertyListItem'>, PropertyListSuite.PropertyListItem {
            /**
             * the kind of data stored in the property list item: boolean/data/date/list/number/record/string
             */
            kind: JXAType
            /**
             * the name of the property list item ( if any )
             */
            name: JXAText
            /**
             * the text representation of the property list data
             */
            get text(): JXAText
            set text(text: string)
            propertyListItems: JXAArraySpecifier<PropertyListSuite.PropertyListItem>
        }
    }
    /**
     * Terms and Events for accessing the content of XML files
     */
    export namespace XmlSuite {
        /**
         * The System Events application
         */
        export interface Application extends JXASpecifier<'application'> {
            xmlDatas: JXAArraySpecifier<XmlSuite.XmlData>
            xmlFiles: JXAArraySpecifier<XmlSuite.XmlFile>
            XmlAttribute: ObjectSpecifierConstructor<XmlAttribute>
            XmlData: ObjectSpecifierConstructor<XmlData>
            XmlElement: ObjectSpecifierConstructor<XmlElement>
            XmlFile: ObjectSpecifierConstructor<XmlFile>
        }

        /**
         * A named value associated with a unit of data in XML format
         */
        export interface XmlAttribute extends JXASpecifier<'xmlAttribute'> {
            /**
             * the name of the XML attribute
             */
            name: JXAText
        }

        /**
         * Data in XML format
         */
        export interface XmlData extends JXASpecifier<'xmlData'> {
            /**
             * the unique identifier of the XML data
             */
            id: JXAText
            /**
             * the name of the XML data
             */
            get name(): JXAText
            set name(name: string)
            /**
             * the text representation of the XML data
             */
            get text(): JXAText
            set text(text: string)
            xmlElements: JXAArraySpecifier<XmlSuite.XmlElement>
        }

        /**
         * A unit of data in XML format
         */
        export interface XmlElement extends JXASpecifier<'xmlElement'> {
            /**
             * the unique identifier of the XML element
             */
            id: JXAText
            /**
             * the name of the XML element
             */
            name: JXAText
            xmlAttributes: JXAArraySpecifier<XmlSuite.XmlAttribute>
            xmlElements: JXAArraySpecifier<XmlSuite.XmlElement>
        }

        /**
         * A file containing data in XML format
         */
        export interface XmlFile extends DiskFolderFileSuite.File<'xmlFile'> {
        }
    }
    /**
     * Records used in scripting System Events
     */
    export namespace TypeDefinitions {

        export interface Application extends JXASpecifier<'application'> {
            PrintSettings: ObjectSpecifierConstructor<PrintSettings>
        }

        export interface PrintSettings extends JXASpecifier<'printSettings'> {
            /**
             * the number of copies of a document to be printed
             */
            get copies(): JXAInteger
            set copies(copies: number)
            /**
             * Should printed copies be collated?
             */
            get collating(): JXABoolean
            set collating(collating: boolean)
            /**
             * the first page of the document to be printed
             */
            get startingPage(): JXAInteger
            set startingPage(startingPage: number)
            /**
             * the last page of the document to be printed
             */
            get endingPage(): JXAInteger
            set endingPage(endingPage: number)
            /**
             * number of logical pages laid across a physical page
             */
            get pagesAcross(): JXAInteger
            set pagesAcross(pagesAcross: number)
            /**
             * number of logical pages laid out down a physical page
             */
            get pagesDown(): JXAInteger
            set pagesDown(pagesDown: number)
            /**
             * the time at which the desktop printer should print the document
             */
            get requestedPrintTime(): JXADate
            set requestedPrintTime(requestedPrintTime: Date)
            /**
             * how errors are handled
             */
            get errorHandling(): 'standard' | 'detailed'
            set errorHandling(errorHandling: 'standard' | 'detailed')
            /**
             * for fax number
             */
            get faxNumber(): JXAText
            set faxNumber(faxNumber: string)
            /**
             * for target printer
             */
            get targetPrinter(): JXAText
            set targetPrinter(targetPrinter: string)
        }
    }
    /**
     *  Terms and Events for examining the System Events scripting definition
     */
    export namespace ScriptingDefinitionSuite {
        /**
         * The System Events application
         */
        export interface Application extends JXASpecifier<'application'> {
            /**
             * The scripting definition of the System Events application
             */
            scriptingDefinition: ScriptingDefinitionSuite.ScriptingDefinitionObject
            ScriptingClass: ObjectSpecifierConstructor<ScriptingClass>
            ScriptingCommand: ObjectSpecifierConstructor<ScriptingCommand>
            ScriptingDefinitionObject: ObjectSpecifierConstructor<ScriptingDefinitionObject>
            ScriptingElement: ObjectSpecifierConstructor<ScriptingElement>
            ScriptingEnumeration: ObjectSpecifierConstructor<ScriptingEnumeration>
            ScriptingEnumerator: ObjectSpecifierConstructor<ScriptingEnumerator>
            ScriptingParameter: ObjectSpecifierConstructor<ScriptingParameter>
            ScriptingProperty: ObjectSpecifierConstructor<ScriptingProperty>
            ScriptingResultObject: ObjectSpecifierConstructor<ScriptingResultObject>
            ScriptingSuite: ObjectSpecifierConstructor<ScriptingSuite>
        }

        /**
         * A class within a suite within a scripting definition
         */
        export interface ScriptingClass<N = 'scriptingClass'> extends JXASpecifier<N> {
            /**
             * The name of the class
             */
            name: JXAText
            /**
             * The unique identifier of the class
             */
            id: JXAText
            /**
             * The description of the class
             */
            description: JXAText
            /**
             * Is the class hidden?
             */
            hidden: JXABoolean
            /**
             * The plural name of the class
             */
            pluralName: JXAText
            /**
             * The name of the suite to which this class belongs
             */
            suiteName: JXAText
            /**
             * The class from which this class inherits
             */
            superclass: ScriptingDefinitionSuite.ScriptingClass
            scriptingElements: JXAArraySpecifier<ScriptingDefinitionSuite.ScriptingElement>
            scriptingProperties: JXAArraySpecifier<ScriptingDefinitionSuite.ScriptingProperty>
        }

        /**
         * A command within a suite within a scripting definition
         */
        export interface ScriptingCommand extends JXASpecifier<'scriptingCommand'> {
            /**
             * The name of the command
             */
            name: JXAText
            /**
             * The unique identifier of the command
             */
            id: JXAText
            /**
             * The description of the command
             */
            description: JXAText
            /**
             * The direct parameter of the command
             */
            directParameter: ScriptingDefinitionSuite.ScriptingParameter
            /**
             * Is the command hidden?
             */
            hidden: JXABoolean
            /**
             * The object or data returned by this command
             */
            scriptingResult: ScriptingDefinitionSuite.ScriptingResultObject
            /**
             * The name of the suite to which this command belongs
             */
            suiteName: JXAText
            scriptingParameters: JXAArraySpecifier<ScriptingDefinitionSuite.ScriptingParameter>
        }

        /**
         * The scripting definition of the System Events applicaation
         */
        export interface ScriptingDefinitionObject extends JXASpecifier<'scriptingDefinitionObject'> {
            scriptingSuites: JXAArraySpecifier<ScriptingDefinitionSuite.ScriptingSuite>
        }

        /**
         * An element within a class within a suite within a scripting definition
         */
        export interface ScriptingElement extends ScriptingDefinitionSuite.ScriptingClass<'scriptingElement'> {
        }

        /**
         * An enumeration within a suite within a scripting definition
         */
        export interface ScriptingEnumeration extends JXASpecifier<'scriptingEnumeration'> {
            /**
             * The name of the enumeration
             */
            name: JXAText
            /**
             * The unique identifier of the enumeration
             */
            id: JXAText
            /**
             * Is the enumeration hidden?
             */
            hidden: JXABoolean
            scriptingEnumerators: JXAArraySpecifier<ScriptingDefinitionSuite.ScriptingEnumerator>
        }

        /**
         * An enumerator within an enumeration within a suite within a scripting definition
         */
        export interface ScriptingEnumerator extends JXASpecifier<'scriptingEnumerator'> {
            /**
             * The name of the enumerator
             */
            name: JXAText
            /**
             * The unique identifier of the enumerator
             */
            id: JXAText
            /**
             * The description of the enumerator
             */
            description: JXAText
            /**
             * Is the enumerator hidden?
             */
            hidden: JXABoolean
        }

        /**
         * A parameter within a command within a suite within a scripting definition
         */
        export interface ScriptingParameter extends JXASpecifier<'scriptingParameter'> {
            /**
             * The name of the parameter
             */
            name: JXAText
            /**
             * The unique identifier of the parameter
             */
            id: JXAText
            /**
             * The description of the parameter
             */
            description: JXAText
            /**
             * Is the parameter hidden?
             */
            hidden: JXABoolean
            /**
             * The kind of object or data specified by this parameter
             */
            kind: JXAText
            /**
             * Is the parameter optional?
             */
            optional: JXABoolean
        }

        /**
         * A property within a class within a suite within a scripting definition
         */
        export interface ScriptingProperty extends JXASpecifier<'scriptingProperty'> {
            /**
             * The name of the property
             */
            name: JXAText
            /**
             * The unique identifier of the property
             */
            id: JXAText
            /**
             * The type of access to this property
             */
            access: 'none' | 'read only' | 'read write' | 'write only'
            /**
             * The description of the property
             */
            description: JXAText
            /**
             * Is the property's value an enumerator?
             */
            enumerated: JXABoolean
            /**
             * Is the property hidden?
             */
            hidden: JXABoolean
            /**
             * The kind of object or data returned by this property
             */
            kind: JXAText
            /**
             * Is the property's value a list?
             */
            listed: JXABoolean
        }

        /**
         * The result of a command within a suite within a scripting definition
         */
        export interface ScriptingResultObject extends JXASpecifier<'scriptingResultObject'> {
            /**
             * The description of the property
             */
            description: JXAText
            /**
             * Is the scripting result's value an enumerator?
             */
            enumerated: JXABoolean
            /**
             * The kind of object or data returned by this property
             */
            kind: JXAText
            /**
             * Is the scripting result's value a list?
             */
            listed: JXABoolean
        }

        /**
         * A suite within a scripting definition
         */
        export interface ScriptingSuite extends JXASpecifier<'scriptingSuite'> {
            /**
             * The name of the suite
             */
            name: JXAText
            /**
             * The unique identifier of the suite
             */
            id: JXAText
            /**
             * The description of the suite
             */
            description: JXAText
            /**
             * Is the suite hidden?
             */
            hidden: JXABoolean
            scriptingCommands: JXAArraySpecifier<ScriptingDefinitionSuite.ScriptingCommand>
            scriptingClasses: JXAArraySpecifier<ScriptingDefinitionSuite.ScriptingClass>
            scriptingEnumerations: JXAArraySpecifier<ScriptingDefinitionSuite.ScriptingEnumeration>
        }
    }
    export type Application = StandardSuite.Application & FolderActionsSuite.Application & SystemEventsSuite.Application & AccountsSuite.Application & AppearanceSuite.Application & CdAndDvdPreferencesSuite.Application & DesktopSuite.Application & DockPreferencesSuite.Application & LoginItemsSuite.Application & NetworkPreferencesSuite.Application & ScreenSaverSuite.Application & SecuritySuite.Application & DiskFolderFileSuite.Application & PowerSuite.Application & ProcessesSuite.Application & PropertyListSuite.Application & XmlSuite.Application & TypeDefinitions.Application & ScriptingDefinitionSuite.Application
}
declare global {
    function Application(name: AppleAppKey<'System Events'>): SystemEvents.Application;
}
