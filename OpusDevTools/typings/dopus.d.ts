/* eslint-disable */
declare global {
    interface AboutData {
        /** This is a handle to the parent window that the script should use if displaying a dialog via the {@link Dialog} object. Even though this is not a {@link Lister} or {@link Tab}, it can still be assigned to the Dialog.window property to set the parent window of the dialog. */
        window: number;
    }

    interface ActivateListerData {
        /** Returns True if this Lister is activating, False if deactivating. Note that if the activation moves from one Lister straight to another the script will be called twice. */
        active: boolean;
        /** Returns a {@link Lister} object representing the Lister that is closing. */
        lister: Lister;
        /** Returns a string indicating any qualifier keys that were held down by the user when the event was triggered.  The string can contain any or all of the following: shift ctrl, alt, lwin, rwin  If no qualifiers were down, the string will be: none */
        qualifiers: string;
    }

    interface ActivateTabData {
        /** Returns True if the activation change is due to the old tab being closed. */
        closing: boolean;
        /** Returns a {@link Tab} object representing the tab that has become active. */
        newtab: Tab;
        /** Returns a {@link Tab} object representing the tab that has gone inactive. */
        oldtab: Tab;
        /** Returns a string indicating any qualifier keys that were held down by the user when the event was triggered.  
         * 
         * The string can contain any or all of the following: shift ctrl, alt, lwin, rwin  If no qualifiers were down, the string will be: none */
        qualifiers: string;
    }

    interface AddButtonsData {
        /** Returns an {@link Args} object representing the function's parsed arguments. */
        args: Args;
        /** Returns an {@link AddButtonHelper} object that is used to add buttons. */
        buttons: AddButtonHelper;
        /** Provides the command line being used to generate the buttons. */
        cmdline: string;
        /** Provides the embedded function body, if supplied by the user. */
        embedded: string;
        /** Lister whose toolbar the commands are being added to (0 if not applicable). */
        lister: Lister;
        /** Viewer whose toolbar the commands are being added to (0 if not applicable). */
        viewer: Viewer;
    }

    interface AddButtonHelper {
        /** Adds a new (normal) button to the toolbar. Use the properties of the returned {@link ButtonData} object to customize the button. */
        AddButton(): ButtonData;
        /** Adds a new drop-down menu to the toolbar. */
        AddMenu(): ButtonData;
        /** Adds a new menu button to the toolbar. */
        AddMenuButton(): ButtonData;
        /** Adds a new three-button button to the toolbar. */
        AddThreeButton(): ButtonData;
    }

    interface AddCmdData {
        /** Adds a new internal command to Opus. The returned {@link ScriptCommand} object must be properly initialized. A script add-in can add as many internal commands as it likes to the Opus internal command set. */
        AddCommand(): ScriptCommand;
    }

    interface AddColData {
        /** Adds a new information column to Opus. The returned {@link ScriptColumn} object must be properly initialized. A script add-in can add as many columns as it likes, and these will be available in file displays, infotips and the Advanced Find function. */
        AddColumn(): ScriptColumn;
    }

    interface AddConfigPagesData {
    }

    interface AfterFolderChangeData {
        /** Returns a string indicating the action that triggered the folder read. The string will be one of the following: *normal*, *refresh*, *refreshsearch*, *refreshsub*, *parent*, *root*, *back*, *forward*, *dblclk*.  
         * 
         * The *refreshsub* actions means the folder (and sub-folders) are being refreshed while Flat View is on. The other action names should be self-explanatory. */
        action: string;
        /** *If the read failed*, this will return a {@link Path} object representing the path that Opus tried to read.  
         * 
         * *If the read was successful, this property is not provided* - instead, the **tab** property provides access to this information.  
         * 
         * Use the **result** property to know if the read was a success. */
        path: Path;
        /** Returns a string indicating any qualifier keys that were held down by the user when the event was triggered.  The string can contain any or all of the following: shift ctrl, alt, lwin, rwin  If no qualifiers were down, the string will be: none */
        qualifiers: string;
        /** Returns True if the folder was read successfully, or False on failure. */
        result: boolean;
        /** Returns a {@link Tab} object representing the tab that read the folder. */
        tab: Tab;
    }

    interface Alias {
        /** Returns the target of the alias as a {@link Path} object. */
        path: Path;
        /** True if the object is a system-defined alias, False if it is user defined. */
        system: boolean;
        /** Default Value.
         * Returns the name of the alias.
         */
        toString(): string;
        /** Default Value.
         * Returns the name of the alias.
         */
        valueOf(): string;

    }

    /** You can enumerate the Aliases object, or query the value of an individual alias by name (e.g. DOpus.Output(DOpus.aliases("desktop").path);) */
    interface Aliases {
        /** Index access */
        (index: number): Alias;
        /** Adds a new alias to the system with the specified name and path. Note that you should not provide the leading forward-slash (/) in the alias name. */
        Add(name: string, path: string): void;
        /** Deletes the specified alias. */
        Delete(name: string): void;
        /** Updates the state of this object. When the **Aliases** object is first retrieved via `DOpus.aliases`, a snapshot is taken of the aliases at that time. If you make changes via the object it will reflect them but any changes made outside the script (e.g. via the `Favorites ADD=alias` command) will not be detected unless you call the `Update` method. */
        Update(): void;
    }

    interface Args {
        /** The **Args** object will have one property corresponding to each of the arguments in the command line template.
         * 
         * For example, if the command line template is **NAME/K**,**SIZE/N**, the **Args** object would have two properties, called **name** and **size**.
         * 
         * The type returned by each property is also defined by the template. In the above example, **name** would return a *string* and **size** an *int*.
         * 
         * - /S argument returns a *bool*,
         * - /N argument returns an *int*,
         * - all other argument types return a *string*.
         * - /O argument will also return a *bool* if no string value is provided on the command line.  
         * - If an argument is marked in the template as /M (multiple) then it returns a {@link Vector} containing elements of the appropriate type. 
         * If an argument was not provided on the command line by the user, its property will either return bool (for a /S or /O argument), or an empty variant otherwise. */
        [argumentName: string]: string | number | boolean | Vector | any;
        /** The got_arg property returns an object with a bool child property for each argument in the template. It lets you test if a particular argument was provided on the command line, before you actually query for the value of the argument. For example, If Args.got_arg.size Then… */
        got_arg: { [argName: string]: boolean; };
    }

    /** Returns a string indicating the intended use for this cover art. Possible values are artist, back, band, bandlogo, colorfulfish (this is unfortunately part of the ID3 specification), composer, conductor, front, icon, illustration, leadartist, leaflet, location, lyricist, media, other, otherfileicon, performance, publisherlogo, recording, vidcap. */
    interface AudioCoverArt {
        /** Returns a {@link Blob} object representing the actual image data. */
        data: Blob;
        /** Returns the bit depth of this image. */
        depth: number;
        /** Returns the description of this image (if any). */
        desc: string;
        /** Returns the default file extension for this image, if it can be determined. */
        ext: string;
        /** Returns the height of this image, in pixels. */
        height: number;
        /** Returns the image's MIME type, if specified in the file. */
        mime: string;
        /** Returns a {@link FileSize} object representing the size of the image data. */
        size: FileSize;
        /** Returns a "pretty" form of the intended use string (i.e. the default value), translated to the current Opus user interface language. */
        type: string;
        /** Returns the width of this image, in pixels. */
        width: number;
        /** Default Value.
         * Returns a string indicating the intended use for this cover art. 
         * Possible values are *artist*, *back*, *band*, *bandlogo*, *colorfulfish* (this is unfortunately part of the ID3 specification), *composer*, *conductor*, *front*, *icon*, *illustration*, *leadartist*, *leaflet*, *location*, *lyricist*, *media*, *other*, *otherfileicon*, *performance*, *publisherlogo*, *recording*, *vidcap*.
         */
        toString(): string;
        /** Default Value.
         * Returns a string indicating the intended use for this cover art. 
         * Possible values are *artist*, *back*, *band*, *bandlogo*, *colorfulfish* (this is unfortunately part of the ID3 specification), *composer*, *conductor*, *front*, *icon*, *illustration*, *leadartist*, *leaflet*, *location*, *lyricist*, *media*, *other*, *otherfileicon*, *performance*, *publisherlogo*, *recording*, *vidcap*.
         */
        valueOf(): string;
    }


    interface AudioMeta {
        /** Returns the value of the specified column, as listed in the Music section of the [Keywords for Columns page](https://docs.dopus.com/doku.php?id=reference:metadata_keywords:keywords_for_columns). */
        [column: string]: any;
        /** Returns a collection of {@link AudioCoverArt} objects representing any cover art imagery stored in the audio file. The default value of this property returns the number of cover art images - for performance reasons, you should check whether this is greater than 0 before enumerating or accessing individual items in the collection.*/
        coverart: AudioCoverArt[];
    }

    interface BeforeFolderChangeData {
        /** Returns a string indicating the action that triggered the folder read. 
         * The string will be one of the following: *normal*, *refresh*, *refreshsearch*, *refreshsub*, *parent*, *root*, *back*, *forward*, *dblclk*.
         * 
         * The *refreshsub* actions means the folder (and sub-folders) are being refreshed while Flat View is on. The other action names should be self-explanatory. */
        action: string;
        /** Returns True if this is the first path to be read into this tab (i.e. previously the tab was empty). */
        initial: boolean;
        /** Returns a {@link Path} object representing the new path that is to be read. */
        path: Path;
        /** Returns a string indicating any qualifier keys that were held down by the user when the event was triggered.
         * 
         * The string can contain any or all of the following: shift ctrl, alt, lwin, rwin  If no qualifiers were down, the string will be: none */
        qualifiers: string;
        /** Returns a {@link Tab} object representing the tab that is changing folder. */
        tab: Tab;
    }

    interface Blob {
        /** Returns a {@link FileSize} object representing the size of this Blob in bytes. */
        size: FileSize;
        /** Compares the contents of this Blob against another Blob (or array). By default the entire contents of the two blobs are compared. 
         * The optional parameters that let you configure the operation are:
         * - to : specifies the byte offset within this Blob to compare against. Defaults to 0.
         * - from : specifies the byte offset within the source Blob to compare with. Defaults to 0.
         * - size : specifies the number of bytes to compare. Defaults to the full size of the source Blob.
         * 
         * The return value is 0 if the two blobs are the same. A value of -1 indicates this blob is less than the other blob, and 1 indicates this blob is greater than the other blob. */
        Compare(source: Blob, to?: number, from?: number, size?: number): number;
        /** Copies data from the source Blob (or array) into this Blob. By default the entire contents of the source Blob will be copied over the top of this one. 
         * The optional parameters that let you configure the operation are:
         * - to : specifies the byte offset within this Blob to copy to. Defaults to 0.
         * - from : specifies the byte offset within the source Blob to copy from. Defaults to 0.
         * - size : specifies the number of bytes to copy. Defaults to the full size of the source Blob. 
         * 
         * As well as copying from another Blob, you can use this method to initialise a Blob from a string. By default the Blob will be set to the Unicode form of the string; if you pass "utf8" as the second parameter it will initialise the Blob with the UTF8-encoded form of the string. If this Blob is not currently large enough to contain the copied data it will be resized automatically. */
        CopyFrom(source: Blob, to?: number, from?: number, size?: number): void;
        /** Copies data from the source Blob (or array) into this Blob. By default the entire contents of the source Blob will be copied over the top of this one. The optional parameters that let you configure the operation are: to - specifies the byte offset within this Blob to copy to. Defaults to 0.  from - specifies the byte offset within the source Blob to copy from. Defaults to 0.  size - specifies the number of bytes to copy. Defaults to the full size of the source Blob. As well as copying from another Blob, you can use this method to initialise a Blob from a string. By default the Blob will be set to the Unicode form of the string; if you pass "utf8" as the second parameter it will initialise the Blob with the UTF8-encoded form of the string. If this Blob is not currently large enough to contain the copied data it will be resized automatically. */
        CopyFrom(source: string, encodingType?: string): void;
        /** Searches the contents of this Blob for the data contained in another Blob (or array). By default the entire contents of this Blob are searched. The optional from parameter lets you specify the starting position for the search, and the optional size parameter lets you specify the length of data in this Blob to search through.  The return value is -1 if the search data were not found, otherwise the offset from the start of the Blob data is returned. */
        Find(search: Blob, from?: number, size?: number): FileSize;
        /** Frees the memory associated with this Blob and resets its size to 0. */
        Free(): void;
        /** Initialises the contents of the Blob (every byte within the blob will be set to 0). Equivalent to Set(0). */
        Init(): void;
        /** Resizes the Blob to the specified number of bytes. */
        Resize(size: number): void;
        /** Reverses the contents of the Blob. */
        Reverse(): void;
        /** Sets the contents of the Blob to the specified byte value (every byte within the blob will be set to that value). By default the whole Blob will be affected. The option to parameter lets you specify a byte offset to start at, and the optional size parameter lets you control the number of bytes affected. */
        Set(value: byte, to?: number, size?: number): void;
        /** Converts the contents of this Blob to a SAFEARRAY of type VT_UI1. By default the entire contents of the Blob will be copied to the array. 
         * The optional parameters that let you configure the operation are:
         * - from : specifies the byte offset within the source Blob to copy from. Defaults to 0.
         * - size : specifies the number of bytes to copy. Defaults to the full size of the source Blob. */
        ToArray(from: number, size?: number): number[];
        /** Converts the contents of this Blob to a SAFEARRAY of type VT_VARIANT. Each variant in the array contains a VT_UI1. By default the entire contents of the Blob will be copied to the array.
         * The optional parameters that let you configure the operation are:
         * - from : specifies the byte offset within the source Blob to copy from. Defaults to 0.
         * - size : specifies the number of bytes to copy. Defaults to the full size of the source Blob. */
        ToVBArray(from: number, size?: number): any[];
    }

    interface BusyIndicator {
        /** Before the Init method has been called, you can set this property to True to enable abort by the user (as shown above).  After Init has been called, this property will return True if the user has clicked the Abort link.  The abort property does not change if the lister or tab your BusyIndicator is associated with closes. If you need to stop when that happens then you must check for it separately, typically by testing the result of the Update method. */
        abort: boolean;
        /** Removes the busy indicator from display and destroys its internal data structures. The BusyIndicator object itself can be re-used by calling the Init method again.  Returns boolean success. Failure usually means the lister or tab was closed. */
        Destroy(): boolean;
        /** Removes the busy indicator from display, but does not destroy its internal data. The indicator can be re-displayed by calling the Show method.  Returns boolean success. Failure usually means the lister or tab was closed. */
        Hide(): boolean;
        /** Initializes a BusyIndicator object and optionally displays it.  The window parameter specifies the {@link Lister} or {@link Tab} object that the indicator is to be attached to. Using a Tab is usually best.  
         * 
         * The optional description parameter lets you specify a text string that is displayed to the user when they click the spinning circle.  
         * 
         * The optional visible parameter lets you make the indicator visible immediately by passing True. Alternatively, call the Show method to make the indicator visible.  
         * 
         * Returns boolean success. Failure usually means the lister or tab was closed or invalid. */
        Init(windowObj: Lister | Tab, description?: string, visible?: boolean): boolean;
        /** Displays the busy indicator.  Returns boolean success. Failure usually means the lister or tab was closed. */
        Show(): boolean;
        /** Updates the busy indicator. 
         * 
         * The **description** parameter lets you specify a new description string. 
         * 
         * The optional **percentage** parameter lets you specify a new progress bar percentage from 0 to 100. If no **percentage** is specified, and none was set by a previous call, the progress bar displays an animation indicating something is happening without a known percentage.  
         * 
         * Returns boolean success. Failure usually means the lister or tab was closed. */
        Update(description: string, percentage?: number): boolean;
    }

    interface ButtonContextData {
        /** Returns an Args object representing the function's parsed arguments. */
        args: Args;
        /** Provides the command line that triggered the request for context-sensitive state. */
        cmdline: string;
        /** Returns a ButtonContext object that is used to change the button's state. */
        ctx: ButtonContext;
        /** Provides the command method name. */
        method: string;
        /** Lister whose toolbar the button is visible on (0 if not applicable). */
        lister: Lister;
        /** Viewer whose toolbar the button is visible on (0 if not applicable). */
        viewer: Viewer;
    }

    interface ButtonContext {
        /** Set to True to have the button appear checked/highlighted. */
        checked: boolean;
        /** Set to True to disable the button. */
        disabled: boolean;
        /** Set to True to use a radio button rather than a checkmark. */
        radio: boolean;
    }

    interface ButtonData {
        /** Sets the background color of the button, in the format `#RRGGBB` (hexadecimal) or `RRR,GGG,BBB` (decimal). */
        backcol: string;
        /** The button's description (tooltip). */
        desc: string;
        /** The main icon for the button; you can specify either an internal icon name (e.g. `#copy`) or the full path of an external image file or icon. You can extract icons from DLLs etc by appending a comma and the icon index to the file name. */
        image: string;
        /** The secondary icon for the button. */
        image2: string;
        /** The button's label. */
        label: string;
        /** Set to True if the button should not highlight when the mouse moves over it. */
        nohighlight: boolean;
        /** Set to True to disable interpreting of tabs in the button's label. */
        notablabel: boolean;
        /** Set to True to display a separator following this button. */
        separator: boolean;
        /** Controls the button image visibility. Valid values are True or False, "dual", "large", or "largedual". */
        showimage: boolean | string;
        /** Controls the button label visibility. Valid values are True or False, "left", "right", "top", "bottom". */
        showlabel: boolean | string;
        /** Sets the text color of the button, in the format `#RRGGBB` (hexadecimal) or `RRR,GGG,BBB` (decimal). */
        textcol: string;
        /** Set to True to have the button appear checked/highlighted. */
        checked: boolean;
        /** Set to True to disable the button. */
        disabled: boolean;
        /** The full function to run when the button is clicked. Multiple lines can be provided, with cr/lf separators. Any *@modifiers* need to go at the top of the function. */
        func: string;
        /** Sets the function type; valid values are "batch", "script", "wsl". Leave empty for a standard Opus function. */
        type: string;
        /** Set to True to use a radio button rather than a checkmark. */
        radio: boolean;
        /** Display a dropdown arrow on the menu. Valid values are True or False, "normal", or "slim". */
        arrow: boolean | string;
        /** This returns another {@link AddButtonHelper} object, which lets you add child buttons to the menu component of the menu button. */
        children: AddButtonHelper;
        /** Controls the visibility of images in the menu. Valid values are "off", "on", "large". */
        childimages: string;
        /** Set to True to minimize the menu width. */
        minimize: boolean;
        /** Control where the menu pops open. Valid values are "left", "right", "top", "bottom". */
        popout: string;
        /** Set to True to always enable the dropdown even if the button itself is disabled. */
        alwaysenable: boolean;
        /** Set to True to enable the "hold/right button to pop open" option. */
        holdright: boolean;
        /** Set to True to have the menu open when you hover over it with the mouse. Only applies to menu buttons inside sub-menus. */
        hoverpopout: boolean;
        /** Enables dynamic icons/labels for the button parent based on the child buttons. */
        dynamicfromchild: boolean;
    }

    interface CertInfo {
        /** The party that issued the certificate. */
        issuer: string;
        /** The signature's serial number (in text form). */
        serial: string;
        /** The signature's serial number in binary form. */
        serialdata: Blob;
        /** The signature's subject name. */
        subject: string;
        /** Returns True if the certificate is valid. */
        valid: boolean;
    }    

    interface ClickData {
        /** Returns a {@link Func} object relating to this function. This provides access to information about the function's environment - (source and destination tabs, qualifier keys, etc). */
        func: Func;
    }

    interface ClipboardChangeData {
        /** Returns a count which increments each time the clipboard contents change (when Opus is running). */
        count: number;
        /** Returns True if the clipboard now contains files. */
        has_files: boolean;
    }

    interface CloseListerData {
        /** Returns a {@link Lister} object representing the Lister that is closing. */
        lister: Lister;
        /** Set this to True to prevent the closing Lister from being saved as the new default Lister. */
        prevent_save: boolean;
        /** Returns a string indicating any qualifier keys that were held down by the user when the event was triggered.  
         * 
         * The string can contain any or all of the following: *shift*, *ctrl*, *alt*, *lwin*, *rwin*
         * 
         * If no qualifiers were down, the string will be: *none* */
        qualifiers: string;
        /** Returns True if the Lister is closing because Opus is shutting down. */
        shutdown: boolean;
    }

    interface CloseTabData {
        /** Returns a string indicating any qualifier keys that were held down by the user when the event was triggered.
         * 
         * The string can contain any or all of the following: *shift*, *ctrl*, *alt*, *lwin*, *rwin*
         * 
         * If no qualifiers were down, the string will be: *none* */
        qualifiers: string;
        /** Returns a {@link Tab} object representing the tab that is closing. */
        tab: Tab;
    }

    interface Column {
        /** Returns the name of the column. *//** Returns True if the column width is set to auto. */
        autosize: boolean;
        /** Returns True if the column width is set to collapse. */
        collapse: boolean;
        /** Returns True if the column width is set to expand. */
        expand: boolean;
        /** Returns True if the column width is set to fill. */
        fill: boolean;
        /** Returns the name of the column as displayed in the Lister column header. */
        header: string;
        /** Returns the name of the column as displayed in the Columns tab in the Folder Options dialog. */
        label: string;
        /** Returns the maximum width of the column in pixels, or the string "fill" if the maximum is set to fill. */
        max: number | string;
        /** Returns the minimum width of the column in pixels. */
        min: number;
        /** Returns the name of the column. */
        name: string;
        /** Returns True if the sort direction of the column is reversed. */
        reverse: boolean;
        /** Returns the sort order of the column (e.g. 1 for the primary sort field, 2 for the secondary sort field, etc). Returns 0 if the display is not sorted by this column. */
        sort: number;
        /** Returns the current display width of the column in pixels. */
        width: number;
    }

    interface ColumnValue {
        /** Returns the name of the column. */
        column: string;
        /** Returns the display name of the column. */
        label: string;
        /** Returns the value of the column. */
        value: string;
    }

    interface Command {
        /** Set this property to False to prevent files used by this command from being deselected, and True to deselect them once the function is finished. Note that files will only be deselected if they came from a {@link Tab} object, and only then if the command is successful. */
        deselect: boolean;
        /** Returns a {@link Path} object that represents the destination folder of this command. If a destination tab is set, this will be the path in the tab. You can not set this property directly - instead, use either the **SetDest** or **SetDestTab** methods to change the destination folder. */
        dest: Path;
        /** Returns a {@link Tab} object that represents the destination tab for this command (if it has one - not all commands require a destination). You can not set this property directly - instead, use the **SetDestTab** method to change the destination tab. */
        desttab: Tab;
        /** Returns the number of items in the **files** object. */
        filecount: number;
        /** Returns a {@link Items} object that represent the files and folders this command is to act upon. You can not modify this object directly - instead you can use the various methods (**ClearFiles**, **SetFiles**, **AddFile**, **RemoveFile**, etc.) to modify the list of items to act upon. */
        files: Items;
        /** Returns the number of instruction lines added to the command. */
        linecount: number;
        /** Set to true if you want to be able to access a log of any file changes made by the command. Changes will be available via the `results` property once the command is complete. */
        logchanges: boolean;
        /** Returns a {@link Progress} object that you can use to display a progress indicator to the user. */
        progress: Progress;
        /** After every command that is run with this object, a Results object is available from this property. This provides information about the outcome of the command. */
        results: Results;
        /** Returns a {@link Path} object that represents the source folder of this command. If a source tab is set, this will be the path in the tab. You can not set this property directly - instead, use either the SetSource or **SetSourceTab** methods to change the source folder. */
        source: Path;
        /** Returns a {@link Tab} object that represents the source tab for this command. You can not set this property directly - instead, use the **SetSourceTab** method to change the source tab. */
        sourcetab: Tab;
        /** This {@link Vars} object represents all defined variables with command scope (that are scoped to this function - e.g. that were set using the `@set` directive). */
        vars: Vars;
        /** Adds the specified item to the collection of items this command is to act upon. You can pass the item's path as either a *string* or a {@link Path} object, and you can also pass an {@link Item} object directly. 
         * 
         * This method returns the total number of items in the collection. */
        AddFile(target: string | Path | Item): number;
        /** Adds the items in the specified collection to the list of items this command is to act upon. The return value is the new number of items in the collection.
         * 
         * You can also pass a {@link Vector} of {@link Item} or {@link Path} objects, or full path strings, instead of a collection. Or a {@link StringSet} or {@link UnorderedSet} of full path strings. */
        AddFiles(items: Items | Vector<Item> | Vector<Path> | Vector<string> | StringSet | UnorderedSet): number;
        /** Adds the contents of the clipboard to the collection of items this command is to act upon. This method supports both files and file paths copied to the clipboard as text. The return value is the new number of items in the collection. */
        AddFilesFromClipboard(): number;
        /** Reads file paths from the contents of the specified file and adds them to the item collection. You can provide the file's path as either a *string* or a {@link Path} object. The file must consist of one absolute path per line.  
         * 
         * The encoding of the file is assumed to be ANSI, unless it has a BOM (byte-order-mark) at the start, or you specify the encoding argument. If you specify the encoding this must be a *string* equal to one of the following: **utf16be**, **utf16le**, **utf8**, **ansi** or **cp:XXXX** where *XXXX* specifies the code page number). 
         * 
         * The return value is the new number of items in the collection. */
        AddFilesFromFile(path: string | Path, encoding?: string): number;
        /** Adds the contents of the specified folder to the collection of items this command is to act upon. You can pass the folder's path as either a *string* or a {@link Path} object. You can also append a wildcard pattern to the path to only add files matching the specified pattern. */
        AddFilesFromFolder(path: string): number;
        /** Adds the specified instruction line to the command that this object will run. The **AddLine** method lets you build up complicated multiple line commands - add each line in turn and then run the command using the **Run** method. For a single line command it is simpler to use the **RunCommand** method. */
        AddLine(instruction: string): void;
        /** Clears all instruction lines from the command. */
        Clear(): void;
        /** Clears the failure flags from the {@link Items} collection. Any items that fail when a command is run will have their **failed** property set to True, and once this has happened the file will be skipped over by any subsequent commands. You can call this method to reset all the failure flags. */
        ClearFailed(): void;
        /** Clears the collection of items this command is to act upon. */
        ClearFiles(): void;
        /** Removes any filter associated with this command via the SetFilter method. */
        ClearFilter(): void;
        /** Clears any modifiers that have been set for this command. The supported modifiers are a subset of the full list of command modifiers - see the SetModifier method for a list of these. You can also pass * to clear all modifiers that have been set. */
        ClearModifier(modifier: string): void;
        /** Returns a {@link StringSet} containing the names of all the Opus commands. You can optionally filter this set by providing one or more of the following flags as an argument to the CommandList method:
         * * i : internal (built-in) commands, 
         * * s : script commands,
         * * i : user commands 
         */
        CommandList(types?: string): StringSet;
        /** Diverts any text that this function might put onto the clipboard into a named Opus variable. This lets you run a command like `Clipboard COPYCOLUMNS` from a script without affecting the clipboard contents. */
        DivertClipboard(varname: string): void;
        /** Creates a new {@link Dialog} object, that lets you display dialogs and popup menus. The dialog's **window** property will be automatically assigned to the source tab. */
        Dlg(): Dialog;
        /** Returns a {@link DOpusMap|Map} of the modifiers that have been set for this command (either by the **SetModifier** method, or in the case of script add-ins any modifiers that were set on the button that invoked the script). */
        GetModifiers(): DOpusMap<string>;
        /** Returns True if the specified `Set` command condition is true. This is the equivalent of the `@ifset` command modifiers. The optional second parameter lets you test a condition based on a command other than `Set` - for example, `IsSet("VIEWERCMD=mark", "Show")` in the viewer to test if the current image is marked. */
        IsSet(condition: string, command?: string): boolean;
        /** Removes the specified file from the {@link Items} collection. You can pass the file's path as either a *string* or a {@link Path} object. You can also pass the {@link Item} itself, or its index (starting from 0) within the collection. The return value is the new number of items in the collection. */
        RemoveFile(pathOrIndex: string | Path | Item | number): number;
        /** Runs the command that has been built up with this object. The return value indicates whether or not the command ran successfully. Zero indicates the command could not be run or was aborted; any other number indicates the command was run for at least some files. (Note that this is not the "exit code" for external commands. For external commands it only indicates whether or not Opus launched the command. If you need the exit code of an external command, use the WScript.Shell Run or Exec methods to run the command.) 
         * 
         * You can use the **Results** property to find out more information about the results of the command, and also discover which files (if any) failed using the **failed** property of each {@link Item} in the **files** collection. */
        Run(): number;
        /** Asynchronously runs the command that has been built up with this object, without waiting for it to return. The return value indicates whether or not the command was launched successfully, but no further information about the results of the command is available. */
        RunAsync(): number;
        /** Runs the single line command given by the instruction argument. This lets you run a single command without needing to add it via the AddLine method first. Note that any lines which may have already been added to the command are ignored by this method - only the given single instruction line is run. */
        RunCommand(instruction: string): number;
        /** Asynchronously runs the single line command given by the instruction argument, without waiting for it to return. */
        RunCommandAsync(instruction: string): number;
        /** Sets the command's destination to the specified path. You can provide the path as either a *string* or a {@link Path} object. Calling this method clears the destination tab property from the command. */
        SetDest(path: string | Path): void;
        /** Sets the command's destination to the specified tab. The destination path will be initialized from the tab automatically (so you don't need to call **SetDest** as well as **SetDestTab**). */
        SetDestTab(tab: Tab): void;
        /** Configures the command to use the files in the specified {@link Items} collection as the items the command will act upon. 
         * 
         * You can also pass one of the other collection types, the same as with the **AddFiles** method. */
        SetFiles(items: Items | Vector<Item> | Vector<Path> | Vector<string> | StringSet | UnorderedSet<string>): void;
        /** Associates a recursive filter with the command. You can provide either a wildcard pattern, or a {@link Filter} object. */
        SetFilter(filter: string | Filter): void;
        /** Turns on a modifier for this command. The supported modifiers are a subset of the full list of command modifiers:  **admin**, **async**, **codepage**, **externalonly**, **leavedoswindowopen**, **nodeselect**, **noexpandenv**, **nofilenamequoting**, **nolocalizefiles**, **noprogress**, **norunbatch**, **resolvelinks**, **runmode**. 
         * 
         * Using this method is the equivalent of using the **AddLine** method to add the modifier to the command as an instruction; e.g. `Command.SetModifier("admin")` is the same as `Command.AddLine("@admin")`. If the modifier requires a value it is passed as the second argument, e.g. `Command.SetModifier("runmode", "hide")`. */
        SetModifier(modifier: string, value: string): void;
        /** Lets you share the progress indicator from one command with another command. You can pass this method the value of progress property obtained from another Command object. */
        SetProgress(progress: Progress): void;
        /** This method lets you control which qualifier keys the command run by this object will consider to have been pressed when it was invoked. For example, several internal commands change their behavior when certain qualifier keys are held down - calling this method allows you to set which keys they will see. 
         * 
         * The qualifiers argument must consist of one or more of the following strings (comma-separated): **none**, **shift**, **ctrl**, **alt**, **lwin**, **rwin**, **win**. */
        SetQualifiers(qualifiers: string): void;
        /** Sets the command's source to the specified path. You can provide the path as either a *string* or a {@link Path} object. Calling this method clears the source tab property from the command. */
        SetSource(path: string): void;
        /** Sets the command's source to the specified tab. The source path will be initialized from the tab automatically (so you don't need to call **SetSource** as well as **SetSourceTab**). */
        SetSourceTab(tab: Tab): void;
        /** Sets the type of function that this command will run. This is equivalent to the drop-down control in the Advanced Command Editor. 
         * 
         * The type argument must be one of the following strings: **std**, **msdos**, **script**, **wsl** and **eval**. Standard (**std**) is the default if the type is not specifically set. */
        SetType(type: string): void;
        /** Returns True if the specified command condition is true (similar to the IsSet method and the the **@ifset** command modifiers).
         * By default, "true" means that a toolbar button containing that command would appear checked/highlighted.
         * The optional flags are:
         * - e : test if the command is enabled rather than checked
         * 
         * For example, `TestCommandState("Show VIEWERCMD=mark")` in the viewer to test if the current image is marked. */
        TestCommandState(command: string, flags?: string): boolean;
        /** This method can be used to update the appearance of toolbar buttons that use variables to determine their labels or states. For example, a button might use `@toggle:if` to set its selection state based on the existence of a *global-*, *tab-* or *Lister-scoped* variable. You would call this method if you have changed such a variable from a script to force buttons that use it to update. */
        UpdateToggle(): void;
    }


    interface ConfigBackupData {
        /** Returns the path of the staging area that the Opus configuration has been written to. The configuration backup file will be created from the files in this folder. Any changes your script makes to files in the staging folder will be included in the backup. */
        location: Path;
        /** Returns the path that the configuration backup is being saved to. */
        output_dir: Path;
        /** Returns the name the configuration backup is being saved as. */
        output_name: string;
    }

    interface ConfigRestoreData {
        /** Returns the path of the staging area that backed up Opus configuration has been extracted to. Any changes your script makes to files in the staging folder will be imported into the Opus configuration. Note that this property is only provided if `step` equals "before". */
        location: Path;
        /** Returns either "before" or "after", to indicate which invocation of the event this is. */
        step: string;
    }

    interface ConfigureScriptData {
        /** This is a handle to the parent window that the script should use if displaying a dialog via the {@link Dialog} object. Even though this is not a {@link Lister} or {@link Tab}, it can still be assigned to the Dialog.window property to set the parent window of the dialog. */
        window: number;
    }

    interface Control {
        /** Set or query the color used for the background (fill) of this control. This is in the format `#RRGGBB` (hexadecimal) or `RRR,GGG,BBB` (decimal). Currently only static text, markup text, button and list view controls are supported for this property. */
        bg: string;
        /** For an *edit* control, gets or sets the control's case setting. Values are **upper**, **lower** and **normal**. */
        charcase: string;
        /** For a *list view* control, returns a {@link DialogListColumns} object that lets you query or modify the columns in *Details* mode. */
        columns: DialogListColumns;
        /** Returns the name of the control. This is the same name used to identify the control in dialog resources and {@link Msg} objects that notify you about clicks or other events involving a control. */
        controlname: string;
        /** Returns the number of items contained in the control (e.g. in a *combo box*, *list box* or *list view*, returns the number of items in the list). */
        count: number;
        /** Get or set the cue text of a single-line edit control. This is the text shown to help the user when the edit control is empty. */
        cuetext: string;
        /** Set or query the width of the control, in pixels. */
        cx: number;
        /** Set or query the height of the control, in pixels. */
        cy: number;
        /** Set or query the enabled state of the control. Returns True if the control is enabled, False if it's disabled. You can set this property to change the state. */
        enabled: boolean;
        /** Set or query the color used for the text (foreground) of this control. This is in the format `#RRGGBB` (hexadecimal) or `RRR,GGG,BBB` (decimal). Currently only static text, markup text, button and list view controls are supported for this property. */
        fg: string;
        /** Set or query the input focus state of the control. Returns True if the control currently has input focus, False if it doesn't. Set to True to give the control input focus. */
        focus: boolean;
        /** Returns the control's underlying window handle. Not directly usable in Opus but you may want this if interfacing with automation tools. */
        hwnd: number;
        /** For a button or static control set to image mode, this assigns an image to the control. You can either provide a filename (or internal icon name - e.g. `#about` for the internal about icon), or an {@link Image} object that you obtained from the {@link DOpus.LoadImage} or {@link Script.LoadImage} methods or an internal image (e.g. `%x`, where x is image index). */
        image: Image;
        /** Set or query the control's label or title. Not all controls have labels - this will have no effect on controls (like the *list view*) that don't. 
         * 
         * Note that for *combo box* controls, this property is only valid for an editable combo - that is, one that you can type your own text into. You can use this property to set or query the current value of the editable text. 
         * 
         * For a static control set to "image" mode, you can also provide an {@link Image} object that you obtained from the {@link DOpus.LoadImage} or {@link Script.LoadImage} methods. This is the same as using the `image` property. 
         * 
         * For a *tab* control, you can set or query the labels of the individual tabs by specifying an index; e.g. `Control.label(0)` would reference the label of the first tab. */
        label: string | Image;
        /** For applicable controls (multiline edit control, details mode listview, listbox and scrollable markup text) returns the total number of lines of content contained in the control. */
        lines: number;
        /** For a *list view* control, lets you change or query the current view mode. Valid values are **icon**, **details**, **smallicon**, **list**.
         * 
         * For a *list edit* control, lets you change or query the "edit as text" setting. Valid values are **text** and **buttons**. */
        mode: string;
        /** Set or query the read only state of an edit control. */
        readonly: boolean;
        /** Set or query the redraw state of the control. Some controls let you turn off redrawing in order to make multiple changes without visible flicker (for example, adding a large number of items to a *list view*). Set to False to turn off redraw, or True to turn redraw back on after changing the control. */
        redraw: boolean;
        /** For a *static text* control set to "image" mode, you can set this property to rotate the displayed image. The value provided is the number of degrees from the image's initial orientation. */
        rotate: number;
        /** Set or query the font styles used to display this control's label. The string consists of zero or more characters; valid characters are b for bold and i for italics. Currently only static text controls are supported for this property. */
        style: string;
        /** Set or query the color used for the text background (fill) of this control. This is in the format `#RRGGBB` (hexadecimal) or `RRR,GGG,BBB` (decimal). 
         * 
         * Currently only *list view* controls are supported for this property. */
        textbg: string;
        /** Alternative name for the **label** property. The term title is used in the dialog editor and XML resources, and can also be used here as a convenience. */
        title: string | Image;
        /** For applicable controls (multiline edit control, details mode listview, listbox and scrollable markup text) returns the index of the line currently displayed at the top of the control. You can set this value to change the scroll position in the control. */
        topline: number;
        /** Returns a string indicating the type of the control. */
        type: string;
        /** Lets you associate a data value with the control. Opus makes no use of this value, it's only for your own use. */
        userdata: any;
        /** Set or query the control's value. The meaning of this property depends on the type of the control:
         * - **Edit control**: Returns or accepts a string representing the current contents of the edit control.
         * - **Check box**: For a simple on/off check box, returns or accepts a *bool* - True for checked and False for unchecked. For a tri-state check box, returns or accepts an *int* - **0** for unchecked, **1** for checked and **2** for the indeterminate state.
         * - **Radio button**: Returns or accepts a *bool* - True for checked and False for unchecked.
         * - **Tab**: Returns or accepts an *int* indicating the currently selected page in the tab control.
         * - **List box** / **combo box** / **list view**: Returns or accepts a {@link DialogListItem} representing the selected item. When setting the value it also accepts an *int* representing the 0-based index of the selected item.
         * - **Palette control**: Returns the current color value. The color string is prefixed with a ! character if the palette button's checkbox is disabled. You can set the color this way as well. You can also set the value to "enable" or "disable" to change the checkbox state without affecting the color.
         * - **Date/Time control**: Returns a {@link DOpusDate|Date} object if a valid date or time is chosen. If the "Show None" property is enabled and the control has been turned off, returns the string "none".
         * 
         * Note that for a multiple-selection *list box* or *list view*, this value will return a {@link Vector} of {@link DialogListItem} objects, representing all currently selected items. 
         */
        value: string | boolean | number | DialogListItem | Vector<DialogListItem> | DOpusDate;
        /** Set or query the visible state of the control. Returns True if the control is visible and False if it's hidden. You can set this property to hide or show the control. */
        visible: boolean;
        /** For applicable controls (multiline edit control, details mode listview, listbox and scrollable markup text) returns the total number of lines of content visible at one time. */
        visiblelines: number;
        /** Set or query the left (x) position of the control, in pixels. */
        x: number;
        /** Set or query the top (y) position of the control, in pixels. */
        y: number;
        /** Adds a new group to a list view control. Items you add to the list can optionally be placed in groups. Each group must have a unique ID. The optional flags are "c" (group is collapsible) and "d" (group starts out collapsed). E.g. AddGroup("Unimportant", 100, "cd") would add a group called Unimportant that is initially collapsed. */
        AddGroup(name: string, id: number, flags: string): number;
        /** Adds a new item to the control (list box, combo box or list view). The first parameter is the item's name, and the optional second parameter is a data value to associate with the item. When adding to a grouped list view, the optional third parameter provides the ID of the group you want to add the item to (the second parameter must be provided in this case, and can be set to 0 if no value is required). The item is added to the end of the list. Instead of the name and value you can also pass a DialogListItem object obtained from another control. This will copy the name and value from the existing item, but won't copy its group (since the new list may have different groups). You can assign the new item to a group with the optional second parameter. For a list view control, you can also pass a Vector (or JScript array) of strings to add an item and its subitems all at once. You can also pass a two-dimensional array to add multiple items, each with their own sub-items. The return value indicates the position in the list of the new item. If you are adding to a listview control and need to add an item with multiple columns, you can do it like this (JScript):  var i = listview.AddItem("This is col 1"); listview.GetItemAt(i).subitems(0) = "This is col 2"; listview.GetItemAt(i).subitems(1) = "This is col 3";   For a tab control, this lets you add back a tab that you've previously removed via the RemoveItem method. Only the name argument is used, which indicates the name of the child dialog to add back to the control. */
        AddItem(name: string, value?: number, groupid?: number): number;
        /** Adds a new item to the control (list box, combo box or list view). The first parameter is the item's name, and the optional second parameter is a data value to associate with the item. When adding to a grouped list view, the optional third parameter provides the ID of the group you want to add the item to (the second parameter must be provided in this case, and can be set to 0 if no value is required). The item is added to the end of the list. Instead of the name and value you can also pass a DialogListItem object obtained from another control. This will copy the name and value from the existing item, but won't copy its group (since the new list may have different groups). You can assign the new item to a group with the optional second parameter. For a list view control, you can also pass a Vector (or JScript array) of strings to add an item and its subitems all at once. You can also pass a two-dimensional array to add multiple items, each with their own sub-items. The return value indicates the position in the list of the new item. If you are adding to a listview control and need to add an item with multiple columns, you can do it like this (JScript):  var i = listview.AddItem("This is col 1"); listview.GetItemAt(i).subitems(0) = "This is col 2"; listview.GetItemAt(i).subitems(1) = "This is col 3";   For a tab control, this lets you add back a tab that you've previously removed via the RemoveItem method. Only the name argument is used, which indicates the name of the child dialog to add back to the control. */
        AddItem(item: DialogListItem, groupid?: number): number;
        /** Adds a new item to the control (*list box*, *combo box* or *list view*). The first parameter is the item's name, and the optional second parameter is a data value to associate with the item. 
         * 
         * When adding to a grouped *list view*, the optional third parameter provides the ID of the group you want to add the item to (the second parameter must be provided in this case, and can be set to 0 if no value is required). 
         * 
         * The item is added to the end of the list. 
         * 
         * Instead of the *name* and *value* you can also pass a {@link DialogListItem} object obtained from another control. This will copy the name and value from the existing item, but won't copy its group (since the new list may have different groups). You can assign the new item to a group with the optional second parameter. 
         * 
         * For a *list view* control, you can also pass a {@link Vector} (or JScript array) of strings to add an item and its subitems all at once. You can also pass a two-dimensional array to add multiple items, each with their own sub-items. 
         * 
         * The return value indicates the position in the list of the new item. 
         * 
         * If you are adding to a listview control and need to add an item with multiple columns, you can do it like this (JScript):
         * ```javascript
         *  var i = listview.AddItem("This is col 1");
         *  listview.GetItemAt(i).subitems(0) = "This is col 2";
         *  listview.GetItemAt(i).subitems(1) = "This is col 3";
         * ```
         * For a *tab control*, this lets you add back a tab that you've previously removed via the **RemoveItem** method. Only the *name* argument is used, which indicates the name of the child dialog to add back to the control. */
        AddItem(itemAsArray: string[] | Vector<string>, value?: number, groupid?: number): number;
        /** Adds a text string as an overlay on a static control in image mode (i.e. lets you overlay text on images). 
         * 
         * The text parameter must be a {@link DOpusMapObject|Map} object (created via the {@link DOpusFactory.Map} method, with the following member values to define the text. All values are optional.
         * - text        : The text to display
         * - color       : RGB string that specifies the text color
         * - back        : RGB string that specifies the background color, or "none" for transparent
         * - shadow      : RGB string that specifies the shadow color
         * - alpha       : Alpha level from 1-255
         * - x           : x coordinate offset (relative to the anchor)
         * - y           : y coordinate offset (relative to the anchor)
         * - w           : absolute width (positive value) or extra padding (negative value)
         * - h           : absolute height (positive value) or extra padding (negative value)
         * - anchor      : anchor position; one of tl (top-left), tm (top-middle), tr (top-right), ml (middle-left), m (middle), mr (middle-right), bl (bottom-left), bm (bottom-middle), br (bottom-right)
         * - font        : font ID to specify the font to use; must have been previously added via {@link Dialog.CreateFont}
         * - multiline   : set to True to enable multiline text (line-break is a cr/lf character pair)
         * - html        : set to True to enable simple HTML markup
         * - justify     : specify text justification for multiline (not supported by html). One of l (left), r (right), m (middle).
         * 
         * Text will be auto-sized unless a width and/or height are given using the `w` and `h` values. Setting the size causes the entire rectangle to be filled (otherwise only the area behind the text is filled).
         * 1. Specify a positive value to set the width or height explicitly.
         * 2. Specify -1 to still use automatic sizing, but fill the entire rectangle.
         * 3. Set to a number less than -1 to add padding to the automatic size. For example, -5 would add 4 pixels of padding.
         * 
         * This method returns a numeric ID for the text which lets you modify and remove it. */
        AddText(text: DOpusMap<string, any>): number;
        /** Autosizes the control, if the control type supports autosize. Returns True if the control was autosized. If the optional height parameter is set to true, the control will be autosized vertically as well as horizontally. */
        AutoSize(height: boolean): boolean;
        /** Takes an x,y pixel position relative to the control's client area and returns the same coordinates relative to the whole screen. The client area is the area inside the control, usually excluding the control's frame if it has one. The screen coordinates are relative to the top-left corner of the primary monitor. Coordinates can be negative if the mouse is to the left or top of the respective areas. While a rectangle is returned, only the left and top coordinates are meaningful. The width and height will always be zero. */
        ClientToScreen(X: number, Y: number): Rect;
        /** This method is mainly for use with multiple-selection *list box* and *list view* controls. It lets you deselect individual items in the control while leaving other items selected (or unaffected). 
         * 
         * You can specify either the index of the item to select (0 means the first item, 1 means the second and so on) or a {@link DialogListItem} object obtained from the **GetItemAt** or **GetItemByName** methods. 
         * 
         * You can also specify -1 to deselect all items in the list box. */
        DeselectItem(position: number): number;
        /** This method is mainly for use with multiple-selection *list box* and *list view* controls. It lets you deselect individual items in the control while leaving other items selected (or unaffected). 
         * 
         * You can specify either the index of the item to select (0 means the first item, 1 means the second and so on) or a {@link DialogListItem} object obtained from the **GetItemAt** or **GetItemByName** methods. 
         * 
         * You can also specify -1 to deselect all items in the list box. */
        DeselectItem(item: DialogListItem): number;
        /** Searches the control for an item with its data property set to the specified value, and deselects it. Returns the item's index (or -1 if not found). */
        DeselectItemByData(data: number): number;
        /** Only applies to list view controls. By default group view is off; after adding groups with the **AddGroup** method, use **EnableGroupView** to turn group view on. */
        EnableGroupView(enable: boolean): void;
        /** For grouped list view controls, lets you expand/collapse one or more groups by name rather than having to do it one at a time via `GetGroupById`. The name argument can specify a wildcard to match more than one group at once (e.g. `ExpandGroupByName("*", false);` will collapse all groups). */
        ExpandGroupByName(name: string, expand: boolean): void;
        /** Returns a {@link Rect} object containing the position of the specified item or subitem. Works with listview, listbox and tab controls. The first argument is the item's index; for listviews in details mode, a second argument providing the subitem's index can optionally be provided. The rectangle is returned in client coordinates relative to the control; you can use the `ClientToScreen` method to convert to screen coordinates if needed. */
        GetItemRect(item: number, subitem: number): Rect;
        /** Returns a {@link DialogListGroup} object representing the group with the specified ID that you've previous added to a *list view* control using the **AddGroup** method. */
        GetGroupById(id: number): DialogListGroup;
        /** Returns a {@link DialogListItem} object representing the item contained in the control at the specified index (*list box*, *combo box* or *list view*). Item 0 represents the first item in the list, item 1 the second, and so on. 
         * 
         * For a *tab* control, this returns the name of the dialog whose tab is at the specified index. */
        GetItemAt(position: number): DialogListItem | string;
        /** Searches the control for an item with its **data** property set to the specified value. */
        GetItemByData(data: number): DialogListItem;
        /** Returns a {@link DialogListItem} object representing the item contained in the control with the specified name (*list box*, *combo box* or *list view*). This method has two names (*…Label* and *…Name*) for historical reasons, you can use either method name interchangeably). 
         * 
         * For a tab control, this returns the index of the dialog within the tab. */
        GetItemByLabel(name: string): DialogListItem | number;
        /** Returns a {@link DialogListItem} object representing the item contained in the control with the specified name (*list box*, *combo box* or *list view*). This method has two names (*…Label* and *…Name*) for historical reasons, you can use either method name interchangeably). 
         * 
         * For a tab control, this returns the index of the dialog within the tab. */
        GetItemByName(name: string): DialogListItem | number;
        /** Inserts a new item in the control (*list box*, *combo box* or *list view*). The first parameter is the position to insert the item at (0 means the beginning of the list, 1 means the second position and so on). The second parameter is the item's name, and the optional third parameter is a data value to associate with the item. 
         * 
         * When adding to a grouped *list view*, the optional fourth parameter provides the ID of the group you want to add the item to (the third parameter must be provided in this case, and can be set to 0 if no value is required). 
         * 
         * Instead of the *name* and *value* you can also pass a {@link DialogListItem} object obtained from another control. This will copy the name and value from the existing item, but won't copy its group (since the new list may have different groups). You can assign the new item to a group with the optional third parameter. 
         * 
         * For a *list view* control, you can also pass a {@link Vector} (or JScript array) of strings to add an item and its subitems all at once. You can also pass a two-dimensional array to add multiple items, each with their own sub-items. 
         * 
         * For a *tab control*, this lets you add back a tab that you've previously removed via the **RemoveItem** method. Only the *position* and *name* arguments are used. The *name* argument indicates the name of the child dialog to add back to the control. 
         * 
         * The return value indicates the position in the list of the new item. */
        InsertItemAt(position: number, name: string, value?: number, groupid?: number): number;
        /** Inserts a new item in the control (*list box*, *combo box* or *list view*). The first parameter is the position to insert the item at (0 means the beginning of the list, 1 means the second position and so on). The second parameter is the item's name, and the optional third parameter is a data value to associate with the item. 
         * 
         * When adding to a grouped *list view*, the optional fourth parameter provides the ID of the group you want to add the item to (the third parameter must be provided in this case, and can be set to 0 if no value is required). 
         * 
         * Instead of the *name* and *value* you can also pass a {@link DialogListItem} object obtained from another control. This will copy the name and value from the existing item, but won't copy its group (since the new list may have different groups). You can assign the new item to a group with the optional third parameter. 
         * 
         * For a *list view* control, you can also pass a {@link Vector} (or JScript array) of strings to add an item and its subitems all at once. You can also pass a two-dimensional array to add multiple items, each with their own sub-items. 
         * 
         * For a *tab control*, this lets you add back a tab that you've previously removed via the **RemoveItem** method. Only the *position* and *name* arguments are used. The *name* argument indicates the name of the child dialog to add back to the control. 
         * 
         * The return value indicates the position in the list of the new item. */
        InsertItemAt(position: number, item: DialogListItem, groupid?: number): number;
        /** Inserts a new item in the control (*list box*, *combo box* or *list view*). The first parameter is the position to insert the item at (0 means the beginning of the list, 1 means the second position and so on). The second parameter is the item's name, and the optional third parameter is a data value to associate with the item. 
         * 
         * When adding to a grouped *list view*, the optional fourth parameter provides the ID of the group you want to add the item to (the third parameter must be provided in this case, and can be set to 0 if no value is required). 
         * 
         * Instead of the *name* and *value* you can also pass a {@link DialogListItem} object obtained from another control. This will copy the name and value from the existing item, but won't copy its group (since the new list may have different groups). You can assign the new item to a group with the optional third parameter. 
         * 
         * For a *list view* control, you can also pass a {@link Vector} (or JScript array) of strings to add an item and its subitems all at once. You can also pass a two-dimensional array to add multiple items, each with their own sub-items. 
         * 
         * For a *tab control*, this lets you add back a tab that you've previously removed via the **RemoveItem** method. Only the *position* and *name* arguments are used. The *name* argument indicates the name of the child dialog to add back to the control. 
         * 
         * The return value indicates the position in the list of the new item. */
        InsertItemAt(position: number, vector: Vector<string>, value?: number, groupid?: number): number;
        /** Inserts a new item in the control (*list box*, *combo box* or *list view*). The first parameter is the position to insert the item at (0 means the beginning of the list, 1 means the second position and so on). The second parameter is the item's name, and the optional third parameter is a data value to associate with the item. 
         * 
         * When adding to a grouped *list view*, the optional fourth parameter provides the ID of the group you want to add the item to (the third parameter must be provided in this case, and can be set to 0 if no value is required). 
         * 
         * Instead of the *name* and *value* you can also pass a {@link DialogListItem} object obtained from another control. This will copy the name and value from the existing item, but won't copy its group (since the new list may have different groups). You can assign the new item to a group with the optional third parameter. 
         * 
         * For a *list view* control, you can also pass a {@link Vector} (or JScript array) of strings to add an item and its subitems all at once. You can also pass a two-dimensional array to add multiple items, each with their own sub-items. 
         * 
         * For a *tab control*, this lets you add back a tab that you've previously removed via the **RemoveItem** method. Only the *position* and *name* arguments are used. The *name* argument indicates the name of the child dialog to add back to the control. 
         * 
         * The return value indicates the position in the list of the new item. */
        InsertItemAt(position: number, array: any[], value?: number, groupid?: number): number;
        /** Inverts the selection status of all items in the control. */
        InvertSelection(): void;
        /** Modifies an existing text element in a static control. The id argument indicates the text element to modify, this is returned by the **AddText** method. See the **AddText** method for a description of the text argument. */
        ModifyText(text: DOpusMap<string, any>, id: number): void;
        /** Moves an existing item to a new location (*list box*, *combo box*, *list view* or *tab*). The first parameter is the item to move (you can pass either its index or a {@link DialogListItem} object), and the second parameter is the new position the item should be moved to. 
         * 
         * The return value indicates the position in the list of the moved item. */
        MoveItem(position: number, newposition: number): number;
        /** Moves an existing item to a new location (*list box*, *combo box*, *list view* or *tab*). The first parameter is the item to move (you can pass either its index or a {@link DialogListItem} object), and the second parameter is the new position the item should be moved to. 
         * 
         * The return value indicates the position in the list of the moved item. */
        MoveItem(item: DialogListItem, newposition: number): number;
        /** Removes the specified group from a list view control. */
        RemoveGroup(id: number): void;
        /** Removes an item from the control (*list box*, *combo box*, *list view* or *tab*). You can provide either the index of the item to remove (0 means the first item, 1 means the second and so on) or a {@link DialogListItem} object obtained from the **GetItemAt** or **GetItemByName** methods. 
         * 
         * You can also specify -1 to completely clear the contents of the control, removing all items at once. */
        RemoveItem(position: number): void;
        /** Removes an item from the control (*list box*, *combo box*, *list view* or *tab*). You can provide either the index of the item to remove (0 means the first item, 1 means the second and so on) or a {@link DialogListItem} object obtained from the **GetItemAt** or **GetItemByName** methods. 
         * 
         * You can also specify -1 to completely clear the contents of the control, removing all items at once. */
        RemoveItem(item: DialogListItem): void;
        /** Searches the control for an item with its **data** property set to the specified value, and removes it. Returns the item's index (or -1 if not found). */
        RemoveItemByData(data: number): number;
        /** Removes a text element from a static control. The id argument indicates the text element to remove, this is returned by the **AddText** method. */
        RemoveText(id: number): void;
        /** Takes an x,y pixel position relative to the whole screen and returns the same coordinates relative to the control's client area. 
         * 
         * The *client area* is the area inside the control, usually excluding the control's frame if it has one. The *screen* coordinates are relative to the top-left corner of the primary monitor. Coordinates can be negative if the mouse is to the left or top of the respective areas. 
         * 
         * While a rectangle is returned, only the **left** and **top** coordinates are meaningful. The **width** and **height** will always be zero. */
        ScreenToClient(X: number, Y: number): Rect;
        /** Selects an item in the control. 
         * 
         * For a *list box*, *combo box* or *list view*, you can specify either the index of the item to select (0 means the first item, 1 means the second and so on) or a {@link DialogListItem} object obtained from the **GetItemAt** or **GetItemByName** methods. 
         * 
         * For a multiple-selection *list box* or *list view* you can also specify -1 to select all items in the control. 
         * 
         * The return value indicates the new selected index. */
        SelectItem(position: number): number;
        /** Selects an item in the control. 
         * 
         * For a *list box*, *combo box* or *list view*, you can specify either the index of the item to select (0 means the first item, 1 means the second and so on) or a {@link DialogListItem} object obtained from the **GetItemAt** or **GetItemByName** methods. 
         * 
         * The return value indicates the new selected index. */
        SelectItem(item: DialogListItem): number;
        /** Selects an item in the control. 
         * 
         * For a *tab* control, you can change which page is visible by specifying the name of the page (i.e. the name of the child dialog) to show.
         * 
         * The return value indicates the new selected index. */
        SelectItem(tabName: string): number;
        /** Searches the control for an item with its **data** property set to the specified value, and selects it. Returns the item's index (or -1 if not found). */
        SelectItemByData(data: number): number;
        /** Selects text within an *edit control* (or the edit field in a *combo box* control).
         * 
         * The return value is a {@link Vector} with two members that provide the current start and end of the selection. To query the range without changing it, simply call the **SelectRange** method with no arguments. 
         * 
         * In a *list box* or *list view* control, this method selects a range of items. */
        SelectRange(): Vector<any>;
        /** Selects text within an *edit control* (or the edit field in a *combo box* control).
         * 
         * The two parameters represent the start and end position of the desired selection. To select the entire contents, use **0** for the start and **-**1 for the end. 
         * 
         * The return value is a {@link Vector} with two members that provide the current start and end of the selection. To query the range without changing it, simply call the **SelectRange** method with no arguments. 
         * 
         * In a *list box* or *list view* control, this method selects a range of items. */
        SelectRange(start: number, end: number): Vector<any>;
        /** Selects text within an *edit control* (or the edit field in a *combo box* control).
         * 
         * The two parameters represent the start and end position of the desired selection. To select the entire contents, use **0** for the start and **-**1 for the end. 
         * 
         * The return value is a {@link Vector} with two members that provide the current start and end of the selection. To query the range without changing it, simply call the **SelectRange** method with no arguments. 
         * 
         * In a *list box* or *list view* control, this method selects a range of items. */
        SelectRange(startItem: any, endItem: any): Vector<any>;
        /** Sets the font used by the control to the specified font. The *id* parameter must have come from a previous call to {@link Dialog.CreateFont}. You can use 0 to reset the font to its default. */
        SetFont(id: number): void;
        /** Sets the width in pixels of items in a list view control that's set to **list** or **smallicon** mode. Specify -1 to automatically size the items. */
        SetItemWidth(width: number): void;
        /** Sets the position of this control. The x and y coordinates are specified in pixels. */
        SetPos(x: number, y: number): void;
        /** Sets the position and size of the control, in a single operation. All coordinates are specified in pixels. */
        SetPosAndSize(x: number, y: number, cx: number, cy: number): void;
        /** Sets the size of this control. The cx (width) and cy (height) values are specified in pixels. */
        SetSize(cx: number, cy: number): void;
        /** For edit controls set to use the code editor, this allows you to enable syntax highlighting. The *type* string can be "jscript", "vbscript" or "eval" to use one of the standard syntaxes. You can also specify your own custom syntax details. */
        SetSyntax(type: string): void;
        /** Assigns a tooltip to this control, which will be shown when the mouse hovers over it. Pass an empty string to remove an existing tooltip. */
        SetTooltip(tip: string): void;
        /** Sorts the groups in a listview control. You can use this in two ways:
         * - Call with a `1` or `-1` to sort groups alphabetically (1 = forward, -1 = reverse).
         * - Call with a callback function to implement custom sort order. Your callback will be called with two {@link DialogListGroup} objects, and should return the result of the comparison between the two (<0 if group1 < group2, 0 if group1 == group2, >0 if group1 > group2)
         */
        SortGroups(directionOrCallback: number | DialogGroupSortCallback): void;
        /**Sorts the items in a listview control. You can use this in two ways:
         * - Call with a 1-based column index to sort by that column. Use a negative number for a reverse sort.
         * - Call with a callback function to implement custom sort order. Your callback will be called with two {@link DialogListItem} objects, and should return the result of the comparison between the two (<0 if item1 < item2, 0 if item1 == item2, >0 if item1 > item2)
         */
        SortItems(indexOrCallback: number | DialogItemSortCallback): void;
    }

    // Defining callback types
    type DialogGroupSortCallback = (group1: DialogListGroup, group2: DialogListGroup) => int;
    type DialogItemSortCallback = (group1: DialogListItem, group2: DialogListItem) => int;

    interface CustomFieldData {
        /** The properties of the **CustomFieldData** object are entirely determined by the script itself. 
         * 
         * In the {@link OnGetCustomFields} method, assign the default values of any custom fields you want to the {@link GetCustomFieldData.fields} property. The type of each default value controls the type of the property.
         * 
         * The *Rename* dialog only supports certain types of variables for custom fields, so you must only assign properties of compatible types. Supported types are:
         * - Boolean options (True or False) - the variable type must be *bool*
         * - Numeric options - the variable type must be *int*
         * - String options - the variable type must be *string*
         * - Drop-down list - the variable type must be a {@link Vector} with an *int* as the first element (to specify the default selection), and strings for the remaining elements.
         */
        [field: string]: any;
    }

    /** Returns a *VT_DATE* representing the value of this **Date** object (excluding the milliseconds). */
    interface DOpusDate {
        /** Get or set the day value of the Date. */
        day: number;
        /** Get or set the hour value of the date. */
        hour: number;
        /** Get or set the minute value of the date. */
        min: number;
        /** Get or set the month value of the date. */
        month: number;
        /** Get or set the milliseconds value of the date. */
        ms: number;
        /** Get or set the seconds value of the date. */
        sec: number;
        /** Get the day-of-the-week value of the date. 0 = Sunday, 1 = Monday, 2 = Tuesday, etc. */
        wday: number;
        /** Get or set the year value of the date. */
        year: number;
        /** Adds the specified value to the date. The interpretation of the specified value is controlled by the type string:
         * - l  : milliseconds
         * - s  : seconds
         * - m  : minutes
         * - h  : hours
         * - d  : days
         * - w  : weeks
         * - M  : months
         * - y  : years */
        Add(value: number, type: string): void;
        /** Adjusts this date from one timezone to another. 
         * 
         * Timezones can be specified as a positive or negative number of minutes, relative to UTC. For example, a value of **60** represents GMT+1. 
         * 
         * Timezones can also be referred to by their name in the system registry or IANA name. For example, "**AUS Eastern Standard Time**" or "**Australia/Sydney**". You can also specify "**UTC**" for UTC and "**local**" for the local timezone. 
         * 
         * Returns false if invalid timezones are specified. */
        Adjust(tzinput: string, tzoutput: string): boolean;
        /** Returns a new **Date** object set to the same date as this one. */
        Clone(): DOpusDate;
        /** Compares this date against the *other* date. The return value will be **0 **(equal), **1** (greater) or **-1** (less). 
         * 
         * The optional *type* string controls how the comparison is performed:
         * - s   : ignore seconds. If specified, the optional tolerance argument specifies the comparison tolerance in seconds.
         * - sD  : ignore seconds, and compensate automatically for daylight savings.
         * - t   : compare times only
         * - d   : compare dates only */
        Compare(other: date, type?: string, tolerance?: number): number;
        /** Returns a formatted date or time string. The *format* and *flags* arguments are both optional. 
         * 
         * If you do not give a *format*, the result will include both date and time, formatted the same as date-time columns in the file display. 
         * 
         * If you give a *format* of just "**d**" or "**t**" then the result will be just the date or time part, formatted the same as date or time columns in the file display. 
         * 
         * The file display's formats depend on the user's locale and Windows settings. You should use those options if you wish to present a date/time to the user in the way they expect them to look, but not if you need to store them in a specific format. 
         * 
         * When using the file display's format (that is, the *format* argument is empty, "**d**" or "**t**"), you can optionally pass one or more case-sensitive flags in the second *flags* argument to override a few settings:
         * - N   : Force day names on in dates within the last week. "Today", "Monday", etc.
         * - n   : Force day names off.
         * - S   : Force seconds on in times.
         * - s   : Force seconds off.
         * - M   : Force milliseconds on in times. (Milliseconds will be zero if the stored time does not have millisecond accuracy.)
         * - m   : Force milliseconds off.
         * - P   : Force time hours to be padded to two digits.
         * - p   : Do not force time hours to be padded.
         * 
         * For example, to get just the date, using the user's locale, but with day names forced off:
         * ```javascript
         * myDate.Format("d","n")
         * ```
         * To get the date and time, using the user's locale, but with day names forced on and seconds forced off:
         * ```javascript
         *    myDate.Format("","Ns")
         * ```
         * The *format* can also use the syntax shown in [Codes for date and time](https://docs.dopus.com/doku.php?id=reference:command_reference:external_control_codes:codes_for_date_and_time), allowing for arbitrary formats. For example,
         * ```javascript
         *    myDate.Format("D#yyyy-MM-dd T#HH:mm:ss")
         * ```
         * This would return a string like **2023-07-28 15:45:26**. When explicitly specifying a format, the *flags* argument should not be used and will be ignored. */
        Format(format?: string, flags?: string): string;
        /** Returns a new **Date** object with the date converted from UTC (based on the local time zone). */
        FromUTC(): DOpusDate;
        /** Returns the value of this **Date** object as milliseconds since the epoch of 1/1/1970. This is the equivalent of the JScript Date.GetTime method. */
        GetTime(): number;
        /** Parses a date/time string to a date value, with controllable formatting. 
         * 
         * If the *format* argument is a string, it must be a valid date/time [picture string](https://docs.dopus.com/doku.php?id=reference:command_reference:external_control_codes:codes_for_date_and_time) (e.g. "dd/MM/yyyy"). Otherwise, *format* should be the sum of one or more of the following flag values:
         * - 1   : Use system locale format
         * - 2   : Use ISO 8601 format
         * - 4   : Short date format
         * - 8   : Long date format
         * - 16  : No date (time only)
         * - 32  : Short time format
         * - 64  : Long time format
         * - 128 : No time (date only)
         * 
         * If locale flags are not specified, the default is to use the current user's locale date/time format. If individual date/time flags are not specified, the function will identify the format type automatically. However this is less efficient so if you know the date/time format type it's better to specify them. */
        Parse(datetime: string, format?: string): boolean;
        /** Resets the date to the current local date/time. */
        Reset(): void;
        /** Sets the value of this **Date** object to the supplied Date. *newdate* can be:
         * - Another Date object
         * - A string in the form "yyyymmdd"
         * - A string in the form "yyyy-mm-dd hh:mm:ss.mmm" (or part thereof)
         * - A JScript Date object
         * - The string "now" (sets to the current time)
         * 
         * This method returns false if a string was provided that could not be succesfully parsed. */
        Set(newdate: DOpusDate | Date | string): boolean;
        /** Sets the value of this **Date** object to the supplied epoch time (milliseconds since 1/1/1970). This is the equivalent of the JScript `Date.SetTime` method. */
        SetTime(epochtime: number): void;
        /** Subtracts the specified value from the date. The parameters are the same as for the **Add** method. */
        Sub(value: number, type: string): void;
        /** Returns a new **Date** object with the date converted to UTC (based on the local time zone). */
        ToUTC(): DOpusDate;
    }

    interface DeleteScriptData {
        /** Returns the full pathname of the script file being deleted. */
        file: string;
    }

    interface Dialog {
        /** Specifies the buttons that are displayed at the bottom of the dialog. These buttons are used to close the dialog. The **Show** method returns a value indicating which button was chosen (and this value is also available in the **result** property). 
         * 
         * - Multiple button strings must be separated with vertical bar characters (|). If a button has more than one button then by definition the last one is the "cancel" button. For example:
         * 
         * ```javascript
         * dlg.buttons = "OK|Retry|Cancel"
         * ```
         * - To specify *accelerators* for the buttons prefix the desired key with an ampersand (&) character. For example:
         * ```javascript
         * dlg.buttons = "&OK|&Retry|&Cancel"
         * ```
         * - Buttons can also have drop-down menus attached to them, by separating the drop-down items with plus signs (+). For example:  
         * ```javascript
         * dlg.buttons = "OK|Retry+Retry All|Cancel"
         * ```
         * - Within drop-down menus, you can specify that certain menu items can be accessed directly from the main button by holding **`Shift`**, **`Ctrl`** or **`Shift+Ctrl`**. This is done by adding an equals sign and then the label the button should display when the key is held down (usually an abbreviated version of the menu item label, or a repetition of the label itself if it is already short enough). The keys are automatically assigned and you can only do this for at most three items. For example:
         * ```javascript
         * dlg.buttons = "OK|Retry+Retry All=Retry All|Skip+Skip if same modified time=Skip Same Time|Cancel"
         * ```
         */
        buttons: string;
        /** This property uses either a {@link Vector} or an array of strings to provide a list of multiple options that can be shown to the user. The list can be presented in one of three ways:
         * - **Drop-down list**: By default, the dialog will display a drop-down list allowing the user to select one option. The index of the chosen selection is available via the **selection** property when the **Show** method returns.
         * - **Checkbox list**: If the **list** property is also given the dialog will display a scrolling list of items, each with a checkbox allowing it to be turned on or off.
         * - **Popup menu**: If the **menu** property is also given, a popup menu will be displayed at the current mouse coordinates. Use a single hyphen ("-") as a menu label to insert a separator.
         * 
         * When shown as a checkbox list the dialog is resizable; you can set the initial size using the **cx** and **cy** properties (and retrieve them afterwards if you want to save the size). */
        choices: Vector<string> | string[];
        /** In a text entry dialog (i.e. the **max** property has been specified) setting **confirm** to True will require that the user types the entered text again (in a second text field) to confirm it (e.g. for a password). */
        confirm: boolean;
        /** For [script dialogs](https://docs.dopus.com/doku.php?id=scripting:script_dialogs) marked as resizable, this property lets you override the width of the dialog defined in the resource - although note you can't resize a dialog smaller than its initial size. */
        cx: number;
        /** For [script dialogs](https://docs.dopus.com/doku.php?id=scripting:script_dialogs) marked as resizable, this property lets you override the height of the dialog defined in the resource - although note you can't resize a dialog smaller than its initial size. */
        cy: number;
        /** In a text entry dialog (i.e. the **max** property has been specified) this property allows you to initialize the text field with a default value.
         * 
         * (Old scripts may use "default" instead of "defvalue"; this is deprecated because it does not work in JScript where "default" is a reserved keyword.) */
        defvalue: string;
        /** Allows you to change the default button (i.e. the action that will occur if the user hits enter) in the dialog. Normally the first button is the default - this has a **defid** of 1. The second button would have a **defid** of 2, and so on. If a dialog has more than one button then by definition the very last button is the "cancel" button, and this has a **defid** of 0. */
        defid: number;
        /** Set to True if you want a [script dialog](https://docs.dopus.com/doku.php?id=scripting:script_dialogs) to run in “detached” mode, where your script provides its message loop. */
        detach: boolean;
        /** Use this to cause the dialog to automatically disable another window when it's displayed. The user will be unable to click or type in the disabled window until the dialog is closed. Normally if you use this you would set this to the same value as the **window** property. 
         * 
         * You can provide either a {@link Lister} or a {@link Tab} object, or another **Dialog**. If you are showing this dialog in response to the {@link OpusOnAboutScript | OnAboutScript} event, you can also pass the value of the {@link AboutData.window} property. */
        disable_window: Lister | Tab | Dialog | object;
        /** Displays one of several standard icons in the top-left corner of the dialog, which can be used, for example, to indicate the severity of an error condition. The valid values for this property are *warning*, *error*, *info* and *question*. 
         * 
         * When used with a [script dialog](https://docs.dopus.com/doku.php?id=scripting:script_dialogs) this property lets you control the icon shown in the dialog's title bar. In this instance, instead of a string you can also provide an {@link Image} object that you obtained from the {@link DOpus.LoadImage} or {@link Script.LoadImage} methods. Note that the image must have been loaded from a **.ico** file. */  
        icon: Image | string;
        /** In a text entry dialog, this property returns the text string that the user entered (i.e. once the **Show** method has returned). */
        input: string;
        /** Set this property to create a [script dialog](https://docs.dopus.com/doku.php?id=scripting:script_dialogs) in a particular language (if one or more language overlays have been provided), rather than the currently selected language. */
        language: string;
        /** In conjunction with the **choices** property, this will cause the choices to be presented as a checkbox list. You can initialize this {@link Vector} or array with the same number of items as the choices property, and set each one to True or False to control the default state of each checkbox. Or, simply set this value to **0** to activate the checkbox list without having to initialize the state of each checkbox. 
         * 
         * When the **Show** method returns, this property will return a {@link Vector} of bools that provide the state of each checkbox as set by the user. */
        list: Vector<boolean> | boolean[] | number;
        /** This property enables text entry in the dialog - a text field will be displayed allowing the user to enter a string. Set this property to the maximum length of the string you want the user to be able to enter (or **0** to have no limit). 
         * 
         * When the **Show** method returns the text the user entered will be available in the **input** property. */
        max: number;
        /** In conjunction with the **choices** property, this will cause the choices to be presented as a popup menu rather than in a dialog. The menu will be displayed at the current mouse coordinates. 
         * 
         * You can initialize this {@link Vector} or array with the same number of items as the choices property, and set each one to a value representing various flags that control the appearance of the menu item. The available flags are as follows - their values must be added together if you need to specify more than one flag per item.
         * - 1 : bold (indicates the default item)
         * - 2 : checked (a checkmark will appear next to the item)
         * - 4 : radio (a radio button will appear next to the item)
         * - 8 : disabled (the user will not be able to select the item)
         * 
         * You can also simply set this value to **0** or **1** to activate the popup menu without having to provide flags for each item (if set to **1**, the top item in the menu will appear bolded). 
         * 
         * The **Show** method returns the index of the menu item the user chose (with **1** being the first item), or **0** if the menu was cancelled.
         * 
         * As well as this method of showing a popup menu you can also use the `CreateMenu` method to create a {@link Menu} object, which gives you much more flexibility.
         */
        menu: Vector<number> | number[] | number;
        /** Specifies the message text displayed in the dialog. */
        message: string;
        /** Set to True before creating the dialog to create a message-only dialog. A message-only dialog will never be visible, but still runs a normal message loop. This lets you use things like `WatchTab` or `HTTPRequest` without needing a visible dialog (or resorting to opacity tricks). No dialog template is needed when using this mode. Note that only detached dialogs support this option. */
        msgonly: boolean;
        /** For script dialogs this property retrieves or sets the current dialog opacity level, from **0** (totally transparent) to **255** (totally opaque). */
        opacity: number;
        /** This is a collection of five options that will be displayed as checkboxes in the dialog. Unlike the **choices** / **list** scrolling checkbox list, these options are displayed as physical checkbox controls. By default the five checkboxes are uninitialized and won't be displayed, but if you assign a label to any of them they will be shown to the user. 
         * 
         * When the **Show** method returns you can obtain the state of the checkboxes using the **state** property of each {@link DialogOption} object. */
        options: DialogOption[];
        /** In a text entry dialog, set this property to True to make the text entry field a password field. In a password field the characters the user enters are not displayed. */
        password: boolean;
        /** When used with a script dialog this property lets you control the dialog's position on screen. Accepted values are:
         * - center : center the dialog over the parent window (the default),
         * - absolute : specify an absolute position using the x and y properties,
         * - parent : position relative to the parent window (using x and y),
         * - monitor : position relative to the current monitor (using x and y)
         * 
         * Except when set to "center" the **x** and **y** properties can be used to adjust the dialog's position.
         */
        position: string;
        /** By default, Opus checks the size and position of your dialog just before it opens and fixing them if they would place any of the dialog off-screen. Positioning a dialog off-screen is usually an accident caused by saving window positions on one system and restoring them on another with different monitor resolutions or arrangements. In the rare cases where you want your dialog to open off-screen, where the user cannot see some of all of it, set this property to False. */
        position_fix: boolean;
        /** This property returns the index of the button chosen by the user to close the dialog. The left-most button is index 1, the next button is index 2, and so on. If a dialog has more than one button then by definition the last (right-most) button is the "cancel" button and so this will return index 0. If any buttons have associated drop-down menus then the contents of the menus also contribute to the index value. For example, if button index 2 has an additional item in a drop-down menu, then that item would be index 3, and the next button would be index 4. */
        result: number;
        /** In a text entry dialog, set this property to True to automatically select the contents of the input field (as specified by the **defvalue** property) when the dialog opens. */
        select: boolean;
        /** In a drop-down list dialog (one with the **choices** property set without either list or menu), this property returns the index of the item chosen from the drop-down list after the **Show** method returns. */
        selection: number;
        /** If you only want one instance of your dialog to be open at once, set this property to a unique name before creating the dialog. When the dialog is created, Opus will check if another dialog with same singleton name is already open. If it is, the existing dialog will be brought to the front and your script will receive a False return from the `Create` or `Show` methods. You should check for this an exit your script in that case. */
        singleton: string;
        /** Set this property to True if the list of choices given by the choices property should be sorted alphabetically. */
        sort: boolean;
        /** Returns a string indicating the current state of the dialog. Possible values are "visible" (normal state, open and visible), "hidden" (dialog has been hidden), "min" (dialog is minimized), "max" (dialog is visible and maximized). */
        state: string;
        /** Lets you create a script dialog. The **template** property can be set to the name of the script dialog to display (as defined in your script resources), or a string that contains raw XML defining the dialog. */
        template: string;
        /** Specifies the title text of the dialog. */
        title: string;
        /** Set this property to True to make the dialog "top level", or False to allow it to go behind other non-top level windows. */
        top: boolean;
        /** Set this property to True if you want the script dialog to generate close events in your message loop when the user clicks the window close button. You'll need to close the dialog yourself using the **EndDlg** method. */
        want_close: boolean;
        /** Set this property to True if you want the script dialog to generate **move** events in your message loop when the dialog is moved. */
        want_move: boolean;
        /** Set this property to True if you want the script dialog to generate **resize** events in your message loop when the dialog is resized. */
        want_resize: boolean;
        /** Use this to specify the parent window of the dialog. The dialog will appear centered over the top of the specified window. You can provide either a {@link Lister} or a {@link Tab} object, or another **Dialog**. If you are showing this dialog in response to the {@link OpusOnAboutScrip|OnAboutScript} event, you can also pass the value of the {@link AboutData.window} property.
         * 
         * You only need to set this property if you obtain the **Dialog** option from the `DOpus.Dlg` method. If the **Dialog** object comes from one of the other objects (e.g. {@link Tab.Dlg}) then its parent window will already be set to the window which launched the action your script is responding to. */
        window: Lister | Tab | Dialog | number;
        /** Specifies the x-position of a script dialog. Use the position property to control how the position is interpreted. After the dialog has been displayed you can change this property to move the dialog around on-screen. */
        x: number;
        /** Specifies the y-position of a script dialog. Use the position property to control how the position is interpreted. After the dialog has been displayed you can change this property to move the dialog around on-screen. */
        y: number;
        /** Lets the user configure a dialog with a tab control which will be added to the standard script config dialog in a dedicated tab.
         * 
         * The **addConfigPagesData** parameter is the one that is passed to the OnAddConfigPages event method that is called when the user opens the config dialog. 
         */
        AddConfigPages(addConfigPagesData: AddConfigPagesData): void;

        /** Lets a script dialog register one or more custom messages that can then be sent to it from other scripts.  
         * 
         * Messages are registered by name. If a message is already registered the method will fail unless you set the optional force parameter to true. 
         * 
         * Use {@link DOpus.SendCustomMsg} to send messages to dialogs. The dialog will receive a "custom" {@link Msg} in their message loop. */
        AddCustomMsg(name: string, force?: boolean): boolean;
        /** Creates a hotkey (or keyboard accelerator) for the specified key combination. When the user presses this key combination in your dialog, a **hotkey** event will be triggered. 
         * 
         * The *name* parameter is a name you assign that lets you identify the hotkey. The *key* parameter specified the actual key combination; this can optionally combine the qualifiers **ctrl**, **shift** and **alt** with a character or name of a special key. For example, **ctrl+t** or **alt+shift+F7**. 
         * 
         * If the optional *global* parameter is set to true, the hotkey will be added as a global hotkey, and will work even when the dialog isn't active.
         * 
         * This method returns true if successful, or false on failure (e.g. if the hotkey already exists). */
        AddHotkey(name: string, key: string, global?: boolean): boolean;
        /** If a dialog has auto-sizing controls that depend on the sizes of other controls, and you make changes to their sizes at runtime, you can call this method to force the dialog to recalculate all relative control sizes once you've made the required changes. */
        AutoSize(): void;
        /** Cancels monitoring of the system clipboard for changes previously established by a call to the **WatchClipboard** method. */
        CancelWatchClipboard(): void;
        /** Cancels folder or file change monitoring previously established by a call to the **WatchDir** method. The **id** parameter is the ID you assigned to your watcher when it was created. */
        CancelWatchDir(id: string): void;
        /** When creating a [script dialog](https://docs.dopus.com/doku.php?id=scripting:script_dialogs), calling this method creates the underlying dialog but does not display it. This lets you create the dialog and then initialize its controls before it is shown to the user. 
         * 
         * Using **Create** implies a [detached dialog](https://docs.dopus.com/doku.php?id=scripting:script_dialogs:the_dialog_message_loop:detached_dialogs); the **detach** property will be set True automatically. However, you can call **RunDlg** afterwards if you don't need a custom message loop and just want to set up some controls before displaying the dialog. 
         * 
         * Once the dialog has been created and its controls initialized, you should call **Show** or **RunDlg** to make it visible to the user. It will also go visible at the first **GetMsg** call if it hasn't already been shown. */
        Create(): void;
        /** Creates a new {@link Menu} object, which lets you display a popup menu on your dialog (or elsewhere on the screen). */
        CreateMenu(): Menu;
        /** Takes an x,y pixel position relative to the dialog's client area and returns the same coordinates relative to the whole screen. 
         * 
         * The *client area* is the area inside the dialog's window frame, excluding the frame itself, with coordinates relative to the top left. The *screen* coordinates are relative to the top-left corner of the primary monitor. Coordinates can be negative if the mouse is to the left or top of the respective areas. 
         * 
         * While a rectangle is returned, only the **left** and **top** coordinates are meaningful. The **width** and **height** will always be zero. */
        ClientToScreen(X: number, Y: number): Rect;
        /** Returns a {@link Control} object corresponding to one of the controls on a script dialog. The control is identified by its *name*, as defined in the script dialog resource. 
         * 
         * The optional second and third parameters are only used when the control is in a *tab control* (that is, when it's in a dialog that's a child of another dialog). The *dialog* parameter specifies the name of its parent dialog. The *tab* parameter specifies the name of the tab control hosting the child dialog. You would only need to specify the name of the tab if you have multiple tab controls and the same dialog is hosted inside more than one of them (this would be quite a rare occurrence). 
         * 
         * Note that none of the controls will exist until **Create** has been called. */
        Control(name: string, dialog?: string, tab?: string): Control;
        /** Returns an enumerable collection of all {@link Control} objects in the dialog. 
         * 
         * The optional parameters are used to enumerate controls in a *tab control* (that is, the controls of a dialog that's a child of another dialog). The *dialog* parameter specifies the name of the parent dialog. The *tab* parameter specifies the name of the tab control hosting the child dialog. You would only need to specify the name of the tab if you have multiple tab controls and the same dialog is hosted inside more than one of them (this would be quite a rare occurrence). */
        Controls(dialog?: string, tab?: string): Control[];
        /** Creates a font object that can be given to dialog controls to make them use a non-standard font. The *name* parameter specifies the name of the font (e.g. "Arial") - you can also use "*" which means the default dialog font. The *size* parameter specifies the desired point size (use 0 to get the default dialog font size). The *styles* string can consist of one or more characters indicating the desired font style - "b" for bold, "i" for italic, "u" for underline. 
         * 
         * The return value can be used with the {@link Control.SetFont} method. 
         * 
         * Fonts you create are automatically destroyed when the dialog closes but if you want to delete them manually to free up resources, use the **DestroyFont** method. */
        CreateFont(name: string, size: number, styles: string): number;
        /** Deletes a hotkey you previously created with the **AddHotkey** method. 
         * 
         * This method returns true if successful, or false on failure (e.g. if the hotkey does not exist). */
        DelHotkey(name: string): boolean;
        /** Allows the user to drag and drop one or more files from your dialog (and drop them in another window or application). 
         * 
         * You would usually call this in response to a **drag** event you receive from a **static** or list view control. 
         * 
         * The first parameter is an {@link Items} object representing the files to be dragged. (You can also pass a {@link Vector} of {@link Item} or {@link Path} objects, or full path strings, instead of an {@link Items} object. Or a {@link StringSet} or {@link UnorderedSet} of full path strings.) 
         * 
         * The optional second parameter lets you control which actions are available. This should be a string containing one or more of **copy**, **move**, **link**. The default action can be indicated by prefixing it with a * (e.g. **copy,\*move,link**). If you don't specify this parameter the default is to only allow **copy**. 
         * 
         * The string this method returns indicates the result of the drag. For a left button drag, this will be "copy", "move", "link" or "drop". For a right-button drag it will always be "drop". If the drag is cancelled it will return "cancel". */
        Drag(items: Items | Vector<Item> | Vector<Path> | Vector<string> | StringSet<string> | UnorderedSet<string>, actions?: string): string;
        /** Destroys the specified font using the ID that was returned by the **CreateFont** method. */
        DestroyFont(id: number): void;
        /** Ends a script dialog running in detached mode. Normally dialogs end automatically when the user clicks the close button or another button that has its **Close Dialog** property set to True. This method lets you end a dialog under script control. The optional parameter specifies the result code that the **Dialog.result** property will return. */
        EndDlg(result?: number): void;
        /** Displays a "Browse for Folder" dialog letting the user select a folder. The optional parameters are:
         * - *title* : specify title of the dialog
         * - *default* : specify the default path selected in the dialog
         * - *expand* : specify True to automatically expand the initial path
         * - *window* : specify parent window for the dialog (a {@link Lister} or a {@link Tab}). If not specified, the **Dialog** object's **window** property will be used.
         * 
         * A {@link Path} object is returned to indicate the folder chosen by the user. This object will have an additional **result** property that will be False if the user cancelled the dialog - the other normal **Path** properties will only be valid if **result** is True.
         */
        Folder(title?: string, defaultPath?: string, expand?: boolean, window?: Lister | Tab | Dialog | object): Path;
        /** Flushes the dialog's message queue. Any unretrieved messages will be discarded. The return value tells you how many messages were in the queue. 
         * 
         * If no arguments are provided, all messages are flushed. Otherwise, you can control which messages are flushed with the two optional arguments. Use **event** to flush messages only for certain events, and **control** only for certain controls. Both strings accept standard wildcards. */
        FlushMsg(event?: string, control?: string): number;
        /** Returns the name of the control in the dialog that currently has the input focus (if any). */
        GetFocus(): string;
        /** Returns a {@link Msg} object representing the most recent input event in a script dialog (only used in detached mode). 
         * 
         * The return value will evaluate to False when the dialog is closed, which is when you should exit your message loop. 
         * 
         * If the dialog is not already visible (because **Show** has not been called) then it will become visible when you first call **GetMsg**. */
        GetMsg(): Msg;
        /** Displays a text entry dialog allowing the user to enter a string. The optional parameters are:
         *  - *message* : specify message string in the dialog,
         *  - *default* : specify default string value,
         *  - *max* : specify maximum string length,
         *  - *buttons* : specify button labels (in the same format as the buttons property described above),
         *  - *title* : specify dialog window title,
         *  - *window* : specify parent window for the dialog (a {@link Lister} or a {@link Tab}). If not specified, the **Dialog** object's **window** property will be used.,
         *  - *result* : for scripting languages that support *ByRef* parameters, this can specify a variable to receive the string the user enters.
         * 
         * The return value is the entered string, or an empty value if the dialog was cancelled. The index of the button selected by the user will be available via the **result** property once this method returns. The left-most button is index **1**, the next button is index **2**, and so on. If a dialog has more than one button then by definition the last (right-most) button is the "cancel" button and so this will return index **0**. */
        GetString(message?: string, defaultValue?: string, max?: number, buttons?: string, title?: string, window?: Lister | Tab | Dialog | object, byRefResult?: string): string;
        /** Stops the specified timer. The timer must previously have been created by a call to the **SetTimer** method. 
         * 
         * The timer is stopped asynchronously and, for a short period of time, it is still possible for a timer to fire again even after calling **KillTimer**. If that is a problem, use the **SetTimer** method's **oneshot** parameter so the timer is automatically and synchronously stopped the first time it fires. */
        KillTimer(name: string): void;
        /** Restores the previously saved position of a script dialog. The position must have previously been saved by a call to the **SavePosition** method. 
         * 
         * The *id* string is a string that Opus can use to identify your dialog or the script it comes from. The template name of the dialog will be automatically appended to this. For example, you might specify *id* as *"kundal"* - Opus would then internally save the position of a dialog called *"dialog1"* as *"kundal!dialog1"*. Make sure you pick a string that other script authors are unlikely to use as Opus has no other way of telling the saved positions apart. 
         * 
         * The optional type parameter lets you control which position elements are restored - specify *"pos"* to only restore the position, *"size"* to only restore the size, or *"pos,size"* to restore both (this is also the default, so you can also omit the argument all together). Use *"fix"* or *"nofix"* to override the position_fix property.*/
        LoadPosition(id: string, type?: string): void;
        /** Displays a "Browse to Open File" dialog that lets the user select one or more files. The optional parameters are:
         * - *title* : specify title of the dialog,
         * - *default* : specify the default file selected in the dialog (if a folder is specified this specifies the default location but no file will be selected),
         * - *window* : specify parent window for the dialog (a {@link Lister} or a {@link Tab}). If not specified, the **Dialog** object's **window** property will be used. (Omit the window argument entirely if you don't want to use it; the type argument, if used, works whether third or fourth.),
         * - *type* : A list of filetypes to populate the "Save as Type" dropdown in the save dialog. (See below.).
         * 
         * The optional *type* parameter consists of one or more pairs of strings, separated by exclamation marks (!). The first string of each pair is the plain text string shown in the drop-down, and the second string of each pair is the actual file extension. You can also specify multiple extensions for the one type by separating them with semicolon. If you want the default "All files" item to be added to the list, add a # character at the start of the string. For example, *#Text Files!\*.txt!Doc Files!\*.doc*.
         * 
         * An {@link Items} object is returned to indicate the files selected by the user. The returned object will have a **result** property that you should check first - the collection of items is only valid if **result** returns True. If it returns False it means the user cancelled the dialog. */
        Multi(title?: string, defaultPath?: string, window?: Lister | Tab | Dialog | object, type?: string): Items;
        /** Creates a new {@link HTTPRequest} object attached to this dialog. This object provides a simple way to send an HTTP request to a server asynchronously, and retrieve the response. 
         * 
         * Events from HTTP requests will come through your dialog's message loop, so you must use a detached dialog in order to use this functionality. */
        NewHTTPReq(): HTTPRequest;
        /** Allows a script to add an icon to the system taskbar notification area.
         * 
         * The *method* argument specifies one of four actions to perform: 'add', 'update', 'remove' or 'notify. For add/update:
         * - The *icon* argument can be a string or {@link Image} object (see {@link Dialog.icon|icon property for more details}. If the dialog has been assigned an icon via this property then that icon will be used automatically if none is provided. 
         * - The *tooltip* argument provides a tooltip string that the system will display when the user moves the mouse over the icon. If the dialog's **title** property has been set then the title will be used if no explicit tooltip is given.
         * 
         * Once your script has added an icon, the user can interact with it using the mouse. Mouse activity will generate **click**, **dblclk** and **rclick** events in your dialog's message loop. The {@link Msg.control} property will be set to **notifyicon**.
         * 
         * The icon is automatically removed when your dialog closes. It's also restored automatically if Explorer restarts after the icon has been added. 
         * 
         * Please note that only one icon per dialog is supported. */
        NotifyIcon(method: 'add' | 'update', icon?: string | Image, tooltip?: string): void;
        /** Removes the icon from the system taskbar notification area. */
        NotifyIcon(method: 'remove'): void;
        /** Displays a system notification message (toast/bubble) associated with this dialog. This method is similar to the DOpus.Notify method - see the description of that method for more information on the arguments.
         * @param title The title of the notification.
         * @param message The message body.
         * @param flags Optional flags (e.g., 'info', 'warn', 'error').
         */
        NotifyIcon(method: 'notify', title: string, message: string, flags?: string): void;
        /** Displays a "Browse to Open File" dialog that lets the user select a single file. The optional parameters are:
         * - *title* : specify title of the dialog
         * - *default* : specify the default file selected in the dialog (if a folder is specified this specifies the default location but no file will be selected)
         * - *window* : specify parent window for the dialog (a {@link Lister} or a {@link Tab}). If not specified, the **Dialog** object's **window** property will be used. (Omit the window argument entirely if you don't want to use it; the type argument, if used, works whether third or fourth.)
         * - *type* : A list of filetypes to populate the "Save as Type" dropdown in the save dialog. (See below.)
         * 
         * The optional *type* parameter consists of one or more pairs of strings, separated by exclamation marks (!). The first string of each pair is the plain text string shown in the drop-down, and the second string of each pair is the actual file extension. You can also specify multiple extensions for the one type by separating them with semicolon. If you want the default "All files" item to be added to the list, add a # character at the start of the string. For example, *#Text Files!\*.txt!Doc Files!\*.doc*. 
         * 
         * Set the *type* parameter to the string "folder" to use this dialog to select a folder (instead of via the `Folder` method). 
         * 
         * A single {@link Item} object is returned to indicate the file selected by the user. This object will have an additional **result** property that will be False if the user cancelled the dialog - the other normal {@link Item} properties will only be valid if **result** is True. */
        Open(title?: string, defaultPath?: string, window?: Lister | Tab | Dialog | object, type?: string): Item;
        /** Displays a dialog with one or more buttons. The optional parameters are:
         * - *message* : specify message string in the dialog   
         * - *buttons* : specify button labels (in the same format as the buttons property described above)
         * - *title* : specify dialog window title
         * - *window* : specify parent window for the dialog (a {@link Lister} or a {@link Tab}). If not specified, the **Dialog** object's **window** property will be used.
         * - *icon* : displays a standard icon in the dialog. Valid values are "w", "i", "q" or "e" for warning/info/question/error.
         * 
         * The return value is the index of the button selected by the user, and this is also available in the result property once the method returns. The left-most button is index **1**, the next button is index **2**, and so on. If a dialog has more than one button then by definition the last (right-most) button is the "cancel" button and so this will return index **0**. */
        Request(message?: string, buttons?: string, title?: string, window?: Lister | Tab | Dialog | object, icon?: 'w' | 'i' | 'q' | 'e'): number;
        /** Turns a previously detached dialog into a non-detached one, by taking over and running the default message loop. The **RunDlg** method won't return until the dialog has closed. You might use this if you created a dialog using **Create**, in order to initialize its controls, but don't actually want to run an interactive message loop. 
         * 
         * The return value is the same as the object's **result** property, and represents the index of the close button selected by the user. 
         * 
         * If the dialog is not already visible (because neither **Show** nor **GetMsg** were called) then it will become visible when you call **RunDlg**. (Compatibility note: Prior to Opus 12.22, scripts needed to call **Show** explicitly.) */
        RunDlg(): number;
        /** Displays a "Browse to Save File" dialog that lets the user select a single file or enter a new filename to save. The optional parameters are:
         * - *title* : The dialog's title.
         * - *default* : The default file selected in the dialog. (If a folder is given, it sets the dialog's starting location, but no file will be selected.)
         * - *window* : The dialog's parent window (a {@link Lister} or a {@link Tab}). If not specified, the **Dialog** object's **window** property will be used. (Omit the window argument entirely if you don't want to use it; the *type* argument, if used, works whether third or fourth.)
         * - *type* : A list of filetypes to populate the "Save as Type" dropdown in the save dialog. (See below.)
         * 
         * The optional type parameter consists of one or more pairs of strings, separated by exclamation marks (!). The first string of each pair is the plain text string shown in the drop-down, and the second string of each pair is the actual file extension. You can also specify multiple extensions for the one type by separating them with semicolon. If you want the default "All files" item to be added to the list, add a # character at the start of the string. For example, *#Text Files!\*.txt!Doc Files!\*.doc*.
         * 
         * A {@link Path} object is returned to indicate the file chosen by the user. This object will have an additional **result** property that will be False if the user cancelled the dialog, and the other normal **Path** properties will only be valid if **result** is True.
         */
        Save(title?: string, defaultPath?: string, window?: Lister | Tab | Dialog | object, type?: string): Path;
        /** Saves the position (and size) of the dialog to your Opus configuration. The position can then be restored later on by a call to **LoadPosition**. 
         * 
         * Normally you would call **LoadPosition** before displaying your dialog, and **SavePosition** after the dialog has been closed. 
         * 
         * The *id* string is a string that Opus can use to identify your dialog or the script it comes from. The template name of the dialog will be automatically appended to this. For example, you might specify *id* as *"kundal"* - Opus would then internally save the position of a dialog called *"dialog1"* as *"kundal!dialog1"*. Make sure you pick a string that other script authors are unlikely to use as Opus has no other way of telling the saved positions apart. */
        SavePosition(id: string): void;
        /** Takes an x,y pixel position relative to the whole screen and returns the same coordinates relative to the dialog's client area. 
         * 
         * The *client area* is the area inside the dialog's window frame, excluding the frame itself, with coordinates relative to the top left. The *screen* coordinates are relative to the top-left corner of the primary monitor. Coordinates can be negative if the mouse is to the left or top of the respective areas. 
         * 
         * While a rectangle is returned, only the **left** and **top** coordinates are meaningful. The **width** and **height** will always be zero. */
        ScreenToClient(X: number, Y: number): Rect;
        /** Sets the input focus to the named control within this dialog. Equivalent to `Control("name").focus = true;`. */
        SetFocus(name: string): boolean;
        /** Creates a timer that will generate a periodic **timer** event for your script, which arrive via {@link Msg} object. The **period** must be specified in milliseconds (e.g. 1000 would equal one second). 
         * 
         * You can optionally specify a **name** for the timer - if you don't provide a name, one will be generated automatically (and the name of the new timer will be returned). 
         * 
         * The optional **oneshot** parameter can be set True to automatically and synchronously kill the timer the first time it fires. (The script should then call **SetTimer** again if it wants the timer to fire again.) The **oneshot** parameter should be set True if it is important that no extra timer events happen. If **oneshot** is False or omitted, it is possible for a timer to fire again even if you call **KillTimer** in response to it the first time, because the dialog timer events and **KillTimer** calls are asynchronous. */
        SetTimer(period: number, name: string, oneshot: boolean): string;
        /** Displays the dialog that has been pre-configured using the various properties of this object. See the properties section above for a full description of these. 
         * 
         * If the **detach** property is False, the call will not return until the dialog has been closed. The return value is the index of the button selected by the user, and this is also available in the **result** property once the method returns. The left-most button is index **1**, the next button is index **2**, and so on. If a dialog has more than one button then by definition the last (right-most) button is the "cancel" button and so this will return index **0**. 
         * 
         * If the **detach** property is True, the call will return immediately and the return value is meaningless. You should then either run a message loop for the “detached” dialog, or call **RunDlg** to run the standard loop. 
         * 
         * Note that calling **Create** implicitly sets the **detach** property to True. If you need to create the dialog to modify some of its controls before it is displayed, but do not want to run your own message loop once it is displayed, you should call **RunDlg** rather than **Show**. */
        Show(): number;
        /** Used to change how custom dialogs are grouped with other Opus windows on the taskbar. Specify a group name to move the window into an alternative group, or omit the group argument to reset back to the default group. If one or more windows are moved into the same group, they will be grouped together, separate from other the default group. 
         * 
         * This only works on Windows 7 and above, and only when taskbar grouping is enabled. Group names are limited to 103 characters and will be truncated if longer. Spaces and dots in group names are automatically converted to underscores. 
         * 
         * Only works with custom script dialogs (i.e. when you are using the **template** property). Must be called after the dialog has been created (i.e. after **Show** has been called – see the **RunDlg** method if you want to avoid writing your own message loop just for this).  
         * 
         * Returns true on success. */
        SetTaskbarGroup(group: string): boolean;
        /** Returns a {@link Vars} object that represents the variables that are scoped to this particular dialog. This allows scripts to use variables that persist from one use of the dialog to another. 
         * 
         * The *id* string is a string that Opus can use to identify your dialog or the script it comes from. The template name of the dialog will be automatically appended to this. For example, you might specify *id* as *"kundal"* - Opus would then internally save the position of a dialog called *"dialog1"* as *"kundal!dialog1"*. Make sure you pick a string that other script authors are unlikely to use as Opus has no other way of telling the saved positions apart. */
        Vars(id: string): Vars;
        /** Establish monitoring of the system clipboard. Whenever the system clipboard contents change, the dialog's message loop receives a **clipboard** event. 
         * 
         * Use the **CancelWatchClipboard** method to cancel monitoring. */
        WatchClipboard(): boolean;
        /** Establish monitoring of a folder or file for changes. Returns **0** for success or an error code on failure. 
         * 
         * The **id** argument lets you provide an ID for this watcher that's used to identify it when changes occur. **dir** is the full path to a filesystem folder, or a file if the i flag is set. 
         * 
         * The optional flags are:
         * - f : monitor for file change in folder (e.g. file created or deleted)
         * - d : monitor for directory change in folder (e.g. directory created)
         * - r : recursive - monitor sub-folders
         * - a : monitor for file attribute changes
         * - s : monitor for file size changes
         * - w : monitor for last write time changes
         * - i : monitor a single file rather than a folder
         * 
         * When a change occurs to a monitored file or folder, the dialog's message loop receives a **dirchange** event. The {@link Msg.control} property identifies the watcher's ID.
         * 
         * Use the **CancelWatchDir** method to cancel monitoring. */
        WatchDir(id: string, path: string, flags: string): number;
        /** Allows a script dialog to monitor events in a folder tab. You will receive notifications of the requested events through your message loop. 
         * 
         * The **tab** parameter specifies the {@link Tab} you want to watch. The **events** string is a comma-separated list of events you want to watch for. The **id** string is an optional parameter; it lets you assign your own ID to the tab to make it easier to tell where events are coming from (if you're monitoring multiple tabs, for instance). 
         * 
         * These are the events you can watch for. Note that some are equivalent to the script events (e.g. **OnActivateTab**):
         * - select : items in the tab are selected or deselected
         * - navigate : the folder is changed in the tab
         * - add : items are added to the folder
         * - delete : items are deleted from the folder
         * - filechange : items in the folder are changed (size, date, name, etc)
         * - activate : tab activated or deactivated
         * - srcdst : source/destination state changed
         * - view : view mode changed
         * - flat : flat view state changed
         * - filter : quick filter changed
         * 
         * Once notification has been established you will be notified of all requested events when they occur. Note that no specific information is sent with notifications - e.g. for the "filechange" event, you aren't told which items have changed, only that something has. 
         * 
         * You will receive notification events in your message loop. The various properties of the {@link Msg} object let you determine what happened. 
         * 
         * The {@link Msg.event} property will be set to **tab** for notifications from a watched folder tab. 
         * 
         * The {@link Msg.control} property tells you which tab the change occurred in; if you specified an ID when you called the **WatchTab** function, this will be in the {@link Msg.control} property - otherwise, it will be the numeric handle of the tab. Note that it's *not* the actual {@link Tab} object. You can access the {@link Tab} object via the {@link Msg.tab} property but this can be inefficient, as it requires a new {@link Tab} object to be created every time. If you're only monitoring one tab it's better to store the {@link Tab} object in your own variable - and if you're monitoring multiple tabs you could, e.g. use a unique ID for each one and keep the objects in a {@link DOpusMap|Map}.
         * 
         * The {@link Msg.value} property tells you which notification event occurred. Possible values are **select**, **navigate**, **filechange**, **activate**, **srcdst**, **view**, **flat**, **filter** and **close** (sent if the tab is closed while you are monitoring it). 
         * 
         * For the **filechange** event, the {@link Msg.data} property contains a bit mask indicating which file events occurred. **1** = add, **2** = delete, **4** = change. The values will be added together (so e.g. **6** indicates at least one item was changed and at least one was deleted). It's up to your script to determine exactly what changed. 
         * 
         * You can change the events you're monitoring for by calling the **WatchTab** method again with the same tab and new event list. 
         * 
         * To stop monitoring an existing tab, call **WatchTab** with the second parameter set to **stop**. Monitoring is automatically cancelled if your dialog closes (and also if the tab closes).
         */
        WatchTab(Tab: object, events: string, id: string): boolean;
        /** Sends a command to the dialog window to change how it's displayed. Possible commands are:
         * - min : minimize the window
         * - max : maximize the window
         * - restore : restore the window (from minimize/maximize)
         * - show : show the window if it's currently hidden
         * - showna : show the window but don't activate it
         * - hide : hide the window
         * - front : activate the window and bring it to the front
         */
        WindowCmd(command: 'min' | 'max' | 'restore' | 'show' | 'showna' | 'hide' | 'front'): void;
    }


    interface DialogListColumn {
        /** Returns or sets the column's alignment. Valid values are "left", "right" and "center". */
        align: string;
        /** Returns or sets the column's name. */
        name: string;
        /** Set this property to True if you want this column to automatically resize when the list view is resized horizontally. Only one column can be set to auto-resize at a time. */
        resize: boolean;
        /** Returns 1 if the list view is currently sorted forwards by this column, -1 if it's currently sorted backwards by this column, or 0 otherwise. Settings this property will re-sort the list. */
        sort: number;
        /** Returns or sets the column's width in pixels. Set it to -1 to automatically size the column to fit its content. You can automatically resize all columns at once using the DialogListColumns.AutoSize method. */
        width: number;
    }

    interface DialogListColumns {
        //** Indexed access */
        (index: number): DialogListColumn;
        /** Adds a new column to the list view, and returns the index of the new column (or -1 on failure). */
        AddColumn(name: string): number;
        /** Automatically sizes all columns in the list view to fit their content. */
        AutoSize(): void;
        /** Deletes the specified column. You may only delete the main column (index 0) if there are no columns or items currently in the list. You can also specify index -1 to clear all columns from the control at once. (Provided no items are in the list.) */
        DeleteColumn(index: number): void;
        /** Returns a DialogListColumn object representing the column in the specified index. */
        GetColumnAt(index: number): DialogListColumn;
        /** Returns the order which the list's columns are displayed on the screen. This may differ from their natural order if you have previously changed it via SetDisplayOrder.  The vector contains the index of each column in the order it appears. As an example, if you create a list with three columns (indexes 0, 1, 2) and move the last one (2) to the start, the returned vector will contain three integers: 2,0,1. */
        GetDisplayOrder(): Vector;
        /** Inserts a new column in the list view at the specified index, and returns the index of the new column (or -1 on failure). You may only replace the main column (index 0) if there are no columns or items currently in the list. (Use SetDisplayOrder if you want to reorder how the columns are displayed visually.) */
        InsertColumn(name: string, index: number): number;
        /** Changes the order in which the list's columns are displayed.  This can be particularly useful when you want to place one or more columns before the main one, which is not possible when initially creating the columns (due to the way Windows list controls behave). The main column is special, in that it is the only one which can have a checkbox or editable label, but you may not always want it to be displayed first.  You can either pass the column indexes directly as arguments, or pass a vector (or most other collection types) of integers with the same thing.  As an example, if you create a list with three columns (indexes 0, 1, 2) and want to move the last column (2) to the start: SetDisplayOrder(2,0,1)  This only changes the order the columns are displayed on the screen; the column indexes you use in your code do not change afterwards. */
        SetDisplayOrder(...index: number): void;
        /** Changes the order in which the list's columns are displayed.  This can be particularly useful when you want to place one or more columns before the main one, which is not possible when initially creating the columns (due to the way Windows list controls behave). The main column is special, in that it is the only one which can have a checkbox or editable label, but you may not always want it to be displayed first.  You can either pass the column indexes directly as arguments, or pass a vector (or most other collection types) of integers with the same thing.  As an example, if you create a list with three columns (indexes 0, 1, 2) and want to move the last column (2) to the start: SetDisplayOrder(2,0,1)  This only changes the order the columns are displayed on the screen; the column indexes you use in your code do not change afterwards. */
        SetDisplayOrder(indexesList: Vector<number>): void;
    }

    interface DialogListGroup {
        /** Returns or sets the expansion state of this group. The group must have been added as "collapsible" via the Control.AddGroup method. */
        expanded: boolean;
        /** Returns the ID of this group. */
        id: number;
        /** Returns the name of this group. */
        name: string;
    }

    interface DialogListItem {
        /** Set or query the color used for the background (fill) of this item. This is in the format #RRGGBB (hexadecimal) or RRR,GGG,BBB (decimal).  Currently only items in list view controls are supported for this property. */
        bg: string;
        /** For a list view control with checkboxes enabled, returns or sets the check state of the item.   Check states are 0 (unchecked), 1 (checked), 2 (indeterminate), 3 (unchecked/disabled), 4 (checked/disabled), 5 (indeterminate/disabled). */
        checked: number;
        /** Returns or sets the optional data value associated with this item. */
        data: number;
        /** For a list view control, returns or sets the disable state of this item. When a list view item is disabled it appears ghosted and can't be selected or right-clicked. */
        disabled: boolean;
        /** Set or query the color used for the text (foreground) of this control. This is in the format #RRGGBB (hexadecimal) or RRR,GGG,BBB (decimal).  Currently only items in list view controls are supported for this property. */
        fg: string;
        /** Returns or sets the list view group that this item is a member of. */
        group: number;
        /** For a list view control, returns or sets the icon associated with this item. You can specify:
         * - the path of a file or folder to use its icon
         * - a file extension (e.g. ".txt") to use a generic filetype icon
         * - "dir", "file", "ftp" or "ftps" to use generic icons
         * - the path of a DLL or EXE file file followed by a comma and then the icon index within the file to extract a specific icon from the file
         * - an Image object (retrieved from DOpus.LoadImage or Script.LoadImage)
         * - an image markup code to use an image from the internal icon set. For example, "<%ddbi:111>".
         * - a custom image markup code to use an image added via DOpus.AddMarkupImage. For example, "<%cust:test>".
         */
        icon: string;
        /** Returns the 0-based index of this item within the control. For a combo edit box, this will return -1 if the user typed in a string rather than selecting one from the list. The string they entered can be retrieved from the name property. */
        index: number;
        /** Returns or sets the item's name. */
        name: string;
        /** Returns or sets the item's selection state. Mostly useful with multiple-selection list box controls. */
        selected: boolean;
        /** Returns or sets the text style this item will be displayed in. You should provide a string containing one or more of the following flags: "b" (bold), "i" (italics), "u" (underline).  Currently only items in list view controls are supported for this property. */
        style: string;
        /** For a list view control in Details mode, returns a DialogListSubItems object, which contains a collection of DialogListSubItem objects (one for each column in the list, excluding the first column.) You can query or change the text of the item's sub-items, as well as assign individual colors and font styles to each sub-item.  For example, assuming the list has three columns in total, the string for the first column would be set using the name property above. The strings for the second and third columns would be set with subitems(0) and subitems(1). */
        subitems: DialogListSubItems;
    }

    interface DialogListSubItem {
        /** Returns or sets the subitem's text. You can use the default value (e.g. subitems(0) = "blah") or the text property explicitly. */
        text: string;
        /** Set or query the color used for the background (fill) of this subitem. This is in the format #RRGGBB (hexadecimal) or RRR,GGG,BBB (decimal). */
        bg: string;
        /** Set or query the color used for the text (foreground) of this subitem. This is in the format #RRGGBB (hexadecimal) or RRR,GGG,BBB (decimal). */
        fg: string;
        /** Returns or sets the text style this subitem will be displayed in. You should provide a string containing one or more of the following flags: "b" (bold), "i" (italics), "u" (underline). */
        styles: string;
    }

    interface DialogListSubItems {
        /** Indexed access */
        (index: number): DialogListSubItem;
        /** Indexed access */
        [index: number]: DialogListSubItem;
    }

    interface DialogOption {
        /** Set this to the desired label of the checkbox. */
        label: string;
        /** Set this to the desired initial state of the checkbox. When the Dialog.Show method returns, you can read this property to find out the state the user chose. */
        state: boolean;
    }

    interface DisplayModeChangeData {
        /** Returns a string indicating the new display mode. Will be one of largeicons, smallicons, list, details, power, thumbnails or tiles. */
        mode: string;
        /** Returns a string indicating any qualifier keys that were held down by the user when the event was triggered.  The string can contain any or all of the following: shift ctrl, alt, lwin, rwin  If no qualifiers were down, the string will be: none */
        qualifiers: string;
        /** Returns a Tab object representing the tab the display mode changed in. */
        tab: Tab;
    }

    /** This is a handle to the window of the floating toolbar. It is not particularly useful. */
    interface Dock extends number {}

    interface DocMeta {
        /** Returns the value of the specified column, as listed in the Documents section of the Keywords for Columns page. */
        [column: string]: any;
    }

    interface DOpus {
        /** The Aliases object gives the script access to the defined folder aliases. */
        aliases: Aliases;
        /** Returns a DOpusFactory object (alias of DOpus.Create()) */
        Create: DOpusFactory;
        /** Creates a new Dialog object, that lets you display dialogs and popup menus. Note: Scripts should not usually use this when responding to events triggered by toolbars or folder tabs. The Dialog returned by DOpus.Dlg will not have its parent window configured. Most scripting events provide you an object which can either create a pre-configured Dialog or which includes a SourceTab property or similar which can do the same. In almost all situations you should use those instead. */
        Dlg: DopusDialogFactory;
        /** Returns a collection of Format objects representing the used-defined favorite formats. */
        favoriteformats: Format[];
        /** Returns a Favorites object which lets you query and modify the user-defined favorite folders. */
        favorites: Favorites;
        /** Returns a FiletypeGroups object which lets you enumerate and query the configured file type groups. */
        filetypegroups: FiletypeGroups;
        /** Returns a GlobalFilters object which lets you access information about the global filter settings (configured on the Filters page in Preferences). */
        filters: GlobalFilters;
        /** Creates a new FSUtil object, that provides helper methods for accessing the file system. */
        FSUtil: FSUtil;
        /** Returns a string representing the current user interface language. */
        language: string;
        /** Returns a Listers object which represents any currently open Lister windows (each one is represented by a Lister object). There is also a GetListers method, below, which is similar but allows the list to be filtered. */
        listers: Listers;
        /** Returns a SmartFavorites object which lets you query the SmartFavorites data. */
        smartfavorites: SmartFavorites;
        /** Returns the name of the current UI spacing scheme (if any). */
        spacingscheme: string;
        /** Returns a ScriptStrings object which lets your script access any strings defined as string resources. */
        strings: ScriptStrings;
        /** Returns a TabGroups object which lets your script access and manipulate the configured folder tab groups. */
        tabgroups: TabGroups;
        /** This Vars object represents all defined variables with global scope. */
        vars: Vars;
        /** This Vars object represents all defined variables with global scope. */
        Vars: Vars;
        /** The Version object provides information about the current Opus program version. */
        version: Version;
        /** Returns a Viewers object which represents any currently open standalone image viewers (each one is represented by a Viewer object). */
        viewers: Viewers;
        /** Associates a name with an Image object, that lets you use the image in dialog markup text controls. The specified name can be used with the <%cust:..> tag to render the image in marked up text (e.g. <%cust:test>). */
        AddMarkupImage(name: string, Image: object): void;
        /** Clears the script output log. */
        ClearOutput(): void;
        /** Creates and returns a new DOpusFactory object, which can be used to create various lightweight helper objects like Blob, Map and Vector. */
        //Create(): DOpusFactory;
        /** Delays for the specified number of milliseconds before returning. */
        Delay(time: number): void;
        /** Creates a new Dialog object, that lets you display dialogs and popup menus. Note: Scripts should not usually use this when responding to events triggered by toolbars or folder tabs. The Dialog returned by DOpus.Dlg will not have its parent window configured. Most scripting events provide you an object which can either create a pre-configured Dialog or which includes a SourceTab property or similar which can do the same. In almost all situations you should use those instead. */
        Dlg(): Dialog;
        /** Creates the DPI helper object which assists when dealing with different system scaling settings (e.g. high-DPI monitors). */
        DPI(): DPI;
        /** Forces Opus to write any configuration changes to disk immediately. */
        FlushConfig(): void;
        /** Converts a JSON string to Opus objects like {@link Map|Maps} and {@link Vector|Vectors}. */
        FromJson(json: string): any;
        /** Creates a new FSUtil object, that provides helper methods for accessing the file system. */
        FSUtil(): FSUtil;
        /** Retrieves the current contents of the system clipboard, if it contains either text or files. You can control the returned type by passing either "text" or "files" for the <type> argument - Opus will convert to the requested type if possible. If <type> is not specified the contents will be returned in their native format. */
        GetClip(): Items | string;
        /** Retrieves the current contents of the system clipboard, if it contains either text or files. You can control the returned type by passing either "text" or "files" for the <type> argument - Opus will convert to the requested type if possible. If <type> is not specified the contents will be returned in their native format. */
        GetClip(type: string): Items | string;
        /** Returns a string indicating the native format of the clipboard contents. Optional flags:
         * * c > Differentiate between cut and copied files
         * 
         * Possible return values:
         * - files : Files, if flags omitted or doesn't include c
         * - files_copy : Files via Copy (Ctrl-C), if flags includes c
         * - files_cut : Files via Cut (Ctrl-X), if flags includes c
         * - image : Bitmap data
         * - text : Text data
         * - <empty string> : Empty clipboard, or any other type of data
         */
        GetClipFormat(): string;
        /** Returns a string indicating the native format of the clipboard contents. Optional flags:
         * - c : Differentiate between cut and copied files
         * 
         * Possible return values:
         * - files : Files, if flags omitted or doesn't include c
         * - files_copy : Files via Copy (Ctrl-C), if flags includes c
         * - files_cut : Files via Cut (Ctrl-X), if flags includes c
         * - image : Bitmap data
         * - text : Text data
         * - <empty string> : Empty clipboard, or any other type of data
         */
        GetClipFormat(flags: 'c'): string;
        /** Returns a Listers object which represents any currently open Lister windows (each one is represented by a Lister object). This is the same as using the listers property, except that you can specify the optional flags:   	 		cCurrent desktop only. Only returns Listers from the current virtual desktop. */
        GetListers(): Listers;
        /** Returns a Listers object which represents any currently open Lister windows (each one is represented by a Lister object). This is the same as using the listers property, except that you can specify the optional flags:   	 		cCurrent desktop only. Only returns Listers from the current virtual desktop. */
        GetListers(flags: string): Listers;
        /** Returns a string indicating which qualifier keys are currently held down. If none are held down, the string will be "none". Otherwise, the string can contain any or all of the following, separated by commas: "shift", "ctrl", "alt", "lwin", "rwin". Note that many events pass you a similar list of qualifiers. If you are passed a list of qualifiers, you should generally use that list rather than call DOpus.GetQualifiers. For example, script commands are passed a Func object with a qualifiers property. That property will tell you which keys were held down when the command was triggered, and that may be different to the keys held down a few seconds later. When the user clicks a button to run a command, they normally expect the command to use the keys they held when they clicked, not the keys they are touching later while waiting for it to finish. Similarly, events like OnBeforeFolderChange will often pass you an object like BeforeFolderChangeData containing a qualifiers property which indicates key state when the event was triggered. You should normally use that instead of calling DOpus.GetQualifiers. If you do call DOpus.GetQualifiers, you would normally want to call it as soon as possible and then store the result, so there is less time for the user to let go of a key after triggering your script. If you call DOpus.GetQualifiers more than once, you may get a different result each time, due to keys being pushed or released between calls. Call it once and store the result if you need to do multiple checks and need them to be consistent. This does not generally affect the qualifiers properties mentioned earlier, since they are usually stored snapshots of the key state. */
        GetQualifiers(): string;
        /** Kills a timer that was previous created with the SetTimer or SetScheduledTimer methods. */
        KillTimer(id: number): boolean;
        /** Loads an image file from the specified file. You can optionally specify the desired size to load the image at, and whether the alpha channel (if any) should be loaded or not. 
         * 
         * You can load icons from the internal icon set using #iconname. E.g. #copy would load the copy image from the default set. By default the large size is returned; use #0:iconname for the small size. You can also specify a particular icon set using #setname:iconname or #0:setname:iconname.
         * 
         * You can load SVG code as a string. In that case, the last parameter is not alpha but remove_padding.
         * 
         * Images can be extracted from DLLs and EXEs by appending the icon index to the filename, e.g. /system/zipfldr.dll,1.
         * 
         * The returned Image object can be given as the value of the Control.label property for a static control in a script dialog (when that control is in "image" mode). You can also assign it as the icon property of a Dialog object to specify a custom window icon for your script dialog. 
         * 
         * If width and height are not provided, they default to 0, meaning the image is loaded at its native size. The width and height parameters only specify the desired size; the resultant image may be smaller or larger, and should be scaled after loading if you need it to be an exact size. The main purpose of the width and height parameters is to influence which image within an icon is loaded; most other image formats either ignore the parameters or only use them to speed things up, such as avoiding a full JPEG decode if a partial decode can satisfy the desired image size. 
         * 
         * Images are loaded transparently (with alpha) by default; set the alpha argument to False if you want to disable that. */
        LoadImage(fileOrIdOrSvgCode: string, width?: number, height?: number, alphaOrRemovePaddinf?: boolean): Image;
        /** Loads an image file from the specified Blob object. You can optionally specify the desired size to load the image at, and whether the alpha channel (if any) should be loaded or not. 
         * 
         * The Blob object contains the image data. The second parameter can be a typehint string to provide a type-hint for the data format (e.g. pass ".jpg" if you know it's JPEG data). 
         * 
         * The returned Image object can be given as the value of the Control.label property for a static control in a script dialog (when that control is in "image" mode). You can also assign it as the icon property of a Dialog object to specify a custom window icon for your script dialog. 
         * 
         * If width and height are not provided, they default to 0, meaning the image is loaded at its native size. The width and height parameters only specify the desired size; the resultant image may be smaller or larger, and should be scaled after loading if you need it to be an exact size. The main purpose of the width and height parameters is to influence which image within an icon is loaded; most other image formats either ignore the parameters or only use them to speed things up, such as avoiding a full JPEG decode if a partial decode can satisfy the desired image size. 
         * 
         * Images are loaded transparently (with alpha) by default; set the alpha argument to False if you want to disable that. */
        LoadImage(blobObj: Blob, typehint?: string, width?: number, height?: number, alpha?: boolean): Image;
        /** Extracts a thumbnail from the specified external file. You can optionally specify a timeout (in milliseconds) and the desired size to load the thumbnail at. 
         * 
         * The optional flags value supports the following flags (supplied as a string):
         * - i : prevents Opus from waiting for thumbnails that may take some time to generate, and instead returns a large icon if the thumbnail can't be generated immediately
         * - c : modifies the i flag to only apply to Cloud storage folders
         * 
         * If loading fails (or the timeout expires before the thumbnail could be generated) this method returns False. 
         * 
         * The returned Image object can be given as the value of the Control.label property for a static control in a script dialog (when that control is in "image" mode). You can also assign as to the icon property of a Dialog object to specify a custom window icon for your script dialog. */
        LoadThumbnail(filename: string, timeout?: number, width?: number, height?: number, flags?: string): Image | false;
        /** Returns a Vector of strings representing the music genres configured to be shown in the Genre field of the metadata panel. */
        MusicGenres(): Vector;
        /** Creates a new Vector object. If no arguments are provided, the Vector will be empty. If a single integer argument is provided, the Vector will be pre-initialized to that number of elements. You can also pass another Vector or a JScript array, or most enumerable objects, as the argument to initialise the new Vector with the contents of an existing collection. If more than one argument is provided, the Vector will be pre-initialized with those elements; for example:   Vector("dog","cat","horse");   The individual elements can be different types. If you want to create a Vector with just a single element, it is best to create an empty Vector and then add the element as a second step. Passing a single element during creation can have unexpected results, as it may be interpreted as one of the other cases. (Many of the scripting objects can be implicitly converted into integers or collections.) */
        NewVector(): Vector;
        /** Creates a new Vector object. If no arguments are provided, the Vector will be empty. If a single integer argument is provided, the Vector will be pre-initialized to that number of elements. You can also pass another Vector or a JScript array, or most enumerable objects, as the argument to initialise the new Vector with the contents of an existing collection. If more than one argument is provided, the Vector will be pre-initialized with those elements; for example:   Vector("dog","cat","horse");   The individual elements can be different types. If you want to create a Vector with just a single element, it is best to create an empty Vector and then add the element as a second step. Passing a single element during creation can have unexpected results, as it may be interpreted as one of the other cases. (Many of the scripting objects can be implicitly converted into integers or collections.) */
        NewVector(...elements: int | object): Vector;
        /** Creates a new Vector object. If no arguments are provided, the Vector will be empty. If a single integer argument is provided, the Vector will be pre-initialized to that number of elements. You can also pass another Vector or a JScript array, or most enumerable objects, as the argument to initialise the new Vector with the contents of an existing collection. If more than one argument is provided, the Vector will be pre-initialized with those elements; for example:   Vector("dog","cat","horse");   The individual elements can be different types. If you want to create a Vector with just a single element, it is best to create an empty Vector and then add the element as a second step. Passing a single element during creation can have unexpected results, as it may be interpreted as one of the other cases. (Many of the scripting objects can be implicitly converted into integers or collections.) */
        NewVector(sourceVector: Vector): Vector;
        /** Creates a new Vector object. If no arguments are provided, the Vector will be empty. If a single integer argument is provided, the Vector will be pre-initialized to that number of elements. You can also pass another Vector or a JScript array, or most enumerable objects, as the argument to initialise the new Vector with the contents of an existing collection. If more than one argument is provided, the Vector will be pre-initialized with those elements; for example:   Vector("dog","cat","horse");   The individual elements can be different types. If you want to create a Vector with just a single element, it is best to create an empty Vector and then add the element as a second step. Passing a single element during creation can have unexpected results, as it may be interpreted as one of the other cases. (Many of the scripting objects can be implicitly converted into integers or collections.) */
        NewVector(array: object[]): Vector;
        /** Displays a system notification (or in Windows 7, a balloon tooltip). This requires the Opus taskbar icon to be added to the taskbar notification area so if it's turned off in Preferences, it will be added temporarily and then removed again. 
         * 
         * The optional flags are:
         * - n : No sound. Prevents the system from playing a sound when the notification is displayed. */
        Notify(title: string, message: string, flags?: string): void;
        /** Prints the specified text string to the script output log (found in the Utility Panel,  the CLI in script mode, the Rename dialog and the Command Editor in script mode). If the second argument is provided and set to True, the message will be displayed as an error. This means the text will be displayed in red and if no log windows are currently open, a warning icon will flash in the Lister status bar to alert the user of an error condition. If the optional third argument is provided and set to True then the log message will have a timestamp prepended to it. Timestamps only appear in the utility panel, not in places like the Command Editor's output panel. Error messages always get timestamps so if the second argument is True then the third is ignored */
        Output(text: string, error?: boolean, timestamp?: boolean): void;
        /** Causes Opus to reload and reinitialize the specified script. You must provide the full pathname of the script on disk (if a script add-in wants to reload itself you can pass the value of the Script.file property). */
        ReloadScript(file: string): void;
        /** Displays a dialog with one or more buttons. The optional parameters are:
         * - *message* - specify message string in the dialog   
         * - *buttons* - specify button labels (in the same format as the buttons property described above)
         * - *title* - specify dialog window title
         * - *window - specify parent window for the dialog (a {@link Lister} or a {@link Tab}). If not specified, the Dialog object's window property will be used.
         * - *icon* - displays a standard icon in the dialog. Valid values are "w", "i", "q" or "e" for warning/info/question/error.
         * 
         * The return value is the index of the button selected by the user, and this is also available in the result property once the method returns. The left-most button is index 1, the next button is index 2, and so on. If a dialog has more than one button then by definition the last (right-most) button is the "cancel" button and so this will return index 0. */
        Request(message?: string, buttons?: string, title?: string, window?: Lister | Tab | Dialog | object, icon?: 'w' | 'i' | 'q' | 'e'): number;
        /** Sends a named message to any existing script dialogs that have registered to receive that message via Dialog.AddCustomMsg. Any dialogs that have registered for the message will receive a "custom" Msg in their message loop, with the message name in the name property. You can optionally pass a single numeric value, or a container object (e.g. a Map) along with the message, which will be received by the dialog in either the data or object property of the Msg. */
        SendCustomMsg(msg: string, dataOrObject: number | DOpusMap<any, any>): boolean;
        /** Sends the specified keystroke to the system. The key will be routed to whichever window currently has focus. 
         * For example, `DOpus.SendKey("win+v");` sends the Win+V key to the system, which opens the Windows clipboard viewer.
         * 
         * Supported qualifier keys are `shift`, `ctrl`, `alt` and `win`. 
         * 
         * As well as letters and numbers, the following named keys are also supported: `backspace`, `capslock`, `delete` , `down`, `end`, `enter`, `escape`, `home`, `insert`, `left`, `numlock`, `pagedown`, `pageup`, `pause`, `printscr`, `right`, `scrlock`, `space`, `tab`, `up`. */
        SendKey(key: string): boolean;
        /** Places the specified text, or Items object (or similar, see below) on the system clipboard. If called with no arguments the clipboard will be cleared. When passing a file list, you can also give a Vector of Item or Path objects, or full path strings, instead of a collection. Or a StringSet or UnorderedSet of full path strings. */
        SetClip(): void;
        /** Places the specified text, or Items object (or similar, see below) on the system clipboard. If called with no arguments the clipboard will be cleared. When passing a file list, you can also give a Vector of Item or Path objects, or full path strings, instead of a collection. Or a StringSet or UnorderedSet of full path strings. */
        SetClip(text: string): void;
        /** Places the specified text, or Items object (or similar, see below) on the system clipboard. If called with no arguments the clipboard will be cleared. When passing a file list, you can also give a Vector of Item or Path objects, or full path strings, instead of a collection. Or a StringSet or UnorderedSet of full path strings. */
        SetClip(files: Items | Vector<Item> | Vector<Path> | Vector<string> | StringSet | UnorderedSet<string>): void;
        /** For a script that implements the OnScheduledTimer event, this creates a (or modifies an existing) timer that will call your method when the specified date/time is reached. The id argument specifies an integer ID that identifies the timer, and the expirydate specifies the expiry date of the timer - either as a string or as a Date object. The method returns true if the timer was successfully scheduled. Note that you can't schedule a timer more than (approximately) 25 days in advance. */
        SetScheduledTimer(id: number, expirydate: date): boolean;
        /** For a script that implements the OnPeriodicTimer event, this creates a (or modifies an existing) timer that will call your method at regular intervals. The id argument specifies an integer ID that identifies the timer, and the interval specifies the timer interval in milliseconds. Use KillTimer to kill an established timer. */
        SetTimer(id: number, interval: number): boolean;
        /** Converts an object to a JSON string. Supports Opus objects like like {@link Map|Maps} and {@link Vector|Vectors}. The optional *indent* argument lets you control the number of spaces each level of JSON is indented to. */
        ToJson(object: any, indent?: number): string;
        /** Returns a Toolbars object which lets you enumerate all defined toolbars (whether they are currently open or not). You can restrict this object to only return in-use toolbars by specifying the optional type parameter - specify "listers" to only return toolbars currently turned on in a Lister, and "docks" to only return toolbars that are currently floating. */
        Toolbars(type: string): Toolbars;
        /** Returns a string indicating the type of an object or variable. */
        TypeOf(object: any): string;
    }

    interface DopusDialogFactory extends Dialog {
        // Call signature to allow DOpus.Dlg()
        (): Dialog;
    }

    interface DOpusFactory {
        (): DOpusFactory;

        /** Returns a new Blob object, that lets you access and manipulate a chunk of binary data from a script. If no parameters are given the new Blob will be empty - you can set its size using the resize method - otherwise you can specify the initial size as a parameter. You can also create a Blob pre-filled with data by specifying the actual byte values (e.g. Blob(72,69,76,76,79)). If another Blob (or an array - see the documentation on the Blob object for a discussion of this) is given then the new Blob will be created as a copy of the existing one. */
        Blob(): Blob;
        /** Returns a new Blob object, that lets you access and manipulate a chunk of binary data from a script. If no parameters are given the new Blob will be empty - you can set its size using the resize method - otherwise you can specify the initial size as a parameter. You can also create a Blob pre-filled with data by specifying the actual byte values (e.g. Blob(72,69,76,76,79)). If another Blob (or an array - see the documentation on the Blob object for a discussion of this) is given then the new Blob will be created as a copy of the existing one. */
        Blob(size: number): Blob;
        /** Returns a new Blob object, that lets you access and manipulate a chunk of binary data from a script. If no parameters are given the new Blob will be empty - you can set its size using the resize method - otherwise you can specify the initial size as a parameter. You can also create a Blob pre-filled with data by specifying the actual byte values (e.g. Blob(72,69,76,76,79)). If another Blob (or an array - see the documentation on the Blob object for a discussion of this) is given then the new Blob will be created as a copy of the existing one. */
        Blob(...bytes: number[]): Blob;
        /** Returns a new Blob object, that lets you access and manipulate a chunk of binary data from a script. If no parameters are given the new Blob will be empty - you can set its size using the resize method - otherwise you can specify the initial size as a parameter. You can also create a Blob pre-filled with data by specifying the actual byte values (e.g. Blob(72,69,76,76,79)). If another Blob (or an array - see the documentation on the Blob object for a discussion of this) is given then the new Blob will be created as a copy of the existing one. */
        Blob(sourceBlob: Blob): Blob;
        /** Creates a new BusyIndicator object, that lets you control the breadcrumbs bar busy indicator from your script. */
        BusyIndicator(): BusyIndicator;
        /** Creates a new Command object, that lets you run Opus commands from a script. */
        Command(): Command;
        /** Creates a new Date object. If a Date value is provided the new object will be initialized to that value, otherwise the Date will be set to the current local time. The provided value can be one of the following:
         * - Another Date object
         * - A string in the form "yyyymmdd"
         * - A string in the form "yyyy-mm-dd hh:mm:ss.mmm" (or part thereof)
         * - A JScript Date object
         * - A unix epoch time value (seconds since 1/1/1970).
         */
        Date(): DOpusDate;
        /** Creates a new Date object. If a Date value is provided the new object will be initialized to that value, otherwise the Date will be set to the current local time. The provided value can be one of the following:
         * - Another Date object
         * - A string in the form "yyyymmdd"
         * - A string in the form "yyyy-mm-dd hh:mm:ss.mmm" (or part thereof)
         * - A JScript Date object
         * - A unix epoch time value (seconds since 1/1/1970).
         */
        Date(date: any): DOpusDate;
        /** Creates an EverythingInterface object */
        EverythingInterface(): EverythingInterface;
        /** Creates a new Filter object, which lets you control recursive filtering when running commands from scripts. You can optionally provide a textual filter string to initialise the filter with. Check the valid property of the new Filter object to find out whether this string was parsed successfully or not. */
        Filter(filterText?: string): Filter;
        /** Creates a new Map object. If no arguments are provided, the Map will be empty. Otherwise, the Map will be pre-initialized with the supplied key/value pairs. 
         * For example:
         * ```javascript
         *    Map("firstname","fred","lastname","bloggs");
         * ```
         * The individual keys and values can be different types. */
        Map(...args?: any[]): DOpusMap<any, any>;
        /** Creates a new OrderedMap object. This is identical to the Map object except that the order of items added to the map is preserved rather than being sorted alphabetically. */
        OrderedMap<K = string, V = string>(...args?: any[]): DOpusOrderedMap<K, V>;
        /** Creates a new case-sensitive StringSet object. If no arguments are provided, the StringSet will be empty. Otherwise it will be pre-initialized with the supplied strings; for example:
         * ```javascript
         *    StringSet("dog","cat","pony");
         * ```
         * You can also pass an array of strings or Vector object to initialise the set. */
        StringSet(...args?: string[]): StringSet;
        /** Creates a new case-insensitive StringSet object. If no arguments are provided, the StringSet will be empty. Otherwise it will be pre-initialized with the supplied strings. */
        StringSetI(...args?: string[]): StringSet;
        /** Creates a new StringTools object, that provides helper functions for string encoding and decoding. */
        StringTools(): StringTools;
        /** Creates a new SysInfo object which you can use to query various details about the computer. */
        SysInfo(): SysInfo;
        /** Creates a new UnorderedSet object. If no arguments are provided the UnorderedSet will be empty. Otherwise it will be pre-initialized with the supplied elements. You can also pass an array or Vector to initialise the set. */
        UnorderedSet(...args?: any[]): UnorderedSet;
        /** Creates a new empty Vector object. 
         * 
         * If you want to create a Vector with just a single element, it is best to create an empty Vector and then add the element as a second step.
         * Passing a single element during creation can have unexpected results, as it may be interpreted as one of the other cases. (Many of the scripting objects can be implicitly converted into integers or collections.) */
        Vector(): Vector;
        /** Creates a new Vector object.
         * The Vector will be pre-initialized to that number of elements.*/
        Vector(size: number): Vector;
        /** Creates a new Vector object. 
         * If more than one argument is provided, the Vector will be pre-initialized with those elements; For example:
         * ```javascript
         *     Vector("dog","cat","horse");
         * ```
         * The individual elements can be different types.
         * 
         * If you want to create a Vector with just a single element, it is best to create an empty Vector and then add the element as a second step. Passing a single element during creation can have unexpected results, as it may be interpreted as one of the other cases. (Many of the scripting objects can be implicitly converted into integers or collections.) */
        Vector(...elements: object): Vector;
        /** Creates a new Vector object.
         * 
         * You can pass another Vector or most enumerable objects, as the argument to initialise the new Vector with the contents of an existing collection. */
        Vector(sourceVector: Vector): Vector;
        /** Creates a new Vector object.
         * 
         * You can pass another Vector or most enumerable objects, as the argument to initialise the new Vector with the contents of an existing collection. */
        Vector(sourceEnumerable: any): Vector;
        /** Creates a new Vector object.
         * 
         * You can pass a JScript array as the argument to initialise the new Vector with the contents of an existing collection. */
        <T = any>(array: T[]): Vector<T>;
    }

    interface DoubleClickData {
        /** Set this property to False to prevent the OnDoubleClick event being called for any further files during this operation (this is only effective if more than one file was double-clicked). Any remaining files will be opened according to their default handlers. */
        call: boolean;
        /** Set this property to False to abort double-click processing altogether on any further files during this operation (this is only effective if more than one file was double-clicked). */
        cont: boolean;
        /** Returns True if your OnDoubleClick event is being called with only a path (via the path property) and not a full Item object. This will occur if you set the ScriptInitData.early_dblclk property to True when initialising your script. When early is True, you can set the skipfull to True to prevent the second call with a full Item object. */
        early: boolean;
        /** Returns True if the item double-clicked is a directory, False if it's a file. */
        is_dir: boolean;
        /** Returns a Item object representing the item that was double-clicked. This property is only present if the early property is False. */
        item: Item;
        /** Returns a string that indicates the mouse button that launched the double-click. The string can be one of the following: left, middle, none. */
        mouse: string;
        /** This is set to True if multiple files were double-clicked. */
        multiple: boolean;
        /** Returns a Path object providing the full pathname of the item that was double-clicked. */
        path: Path;
        /** Returns a string indicating any qualifier keys that were held down by the user when the event was triggered.  The string can contain any or all of the following: shift ctrl, alt, lwin, rwin  If no qualifiers were down, the string will be: none */
        qualifiers: string;
        /** When the early property is True, set skipfull to True to prevent your OnDoubleClick event from being called a second time. */
        skipfull: boolean;
        /** Returns a Tab object representing the tab that the item was double-clicked in. */
        tab: Tab;
    }

    interface DPI {
        /** Returns the system DPI setting as a “dpi value” (e.g. 96, 192). */
        dpi: number;
        /** Returns the DPI settings as a “scale factor” (e.g. 100, 125, 200). */
        factor: number;
        /** Divides the provided size by the system DPI; e.g. if the system DPI was set to 150%, DPI.Divide(60) would return 40. */
        Divide(value: number): number;
        /** Scales the provided size by the system DPI; e.g. if the system DPI was set to 200%, DPI.Scale(75) would return 150. */
        Scale(value: number): number;
    }

    interface Drive {
        /** Returns a FileSize object indicating the available free space on the drive. */
        avail: FileSize;
        /** Returns the bytes-per-cluster value for the drive. */
        bpc: number;
        /** Returns a string representing the filesystem type. */
        filesys: string;
        /** Returns a value representing filesystem flags for the drive. */
        flags: number;
        /** Returns a FileSize object indicating the total free space on the drive. */
        free: FileSize;
        /** Returns the drive's label. */
        label: string;
        /** Returns true if the drive can be identified as solid state. */
        ssd: boolean;
        /** Returns a FileSize object indicating the total size of the drive. */
        total: FileSize;
        /** Returns a string indicating the drive type (removable, fixed, remote, cdrom, ramdisk). */
        type: string;
    }

    interface ExeMeta {
        /** Returns the value of the specified column, as listed in the Programs section of the Keywords for Columns page. */
        [column: string]: any;
    }

    interface EverythingInterface {
        /** Returns True if Everything is configured to auto-start (via the Miscellaneous / Advanced Options Preferences page). */
        autorun: boolean;
        /** Returns the configured auto-start command, if any. */
        autoruncmd: string;
        /** Returns a value indicating which attributes Everything is configured to index.
         * Bitmask of:
         *  - 2 (File sizes)
         *  - 4 (Folder sizes)
         *  - 8 (Created Date)
         *  - 16 (Modified Date)
         *  - 32 (Accessed Date)
         *  - 64 (Attributes)
         */
        indexed: number;
        /** Returns True if Everything is currently running. */
        isrunning: boolean;
        /** Returns a set representing the drive roots that Everything has indexed. */
        roots: StringSet;
        /** Returns Everything's version number. */
        version: string;
        /** Returns True if the specified path is indexed by Everything. */
        Indexed(path: string): boolean;
        /** Sends the specified query string to Everything. Returns the results as a Vector of EverythingResult objects.
         * 
         * All arguments after the query string are optional, and represent flags provided by the Everything API. search_flags should be a bitmask representing the `EVERYTHING_IPC_xxx` search flags, or a string containing one or more of the following characters. Defaults to `0` if not provided.
         * - c : match case (`EVERYTHING_IPC_MATCHCASE`)
         * - w : match whole words (`EVERYTHING_IPC_MATCHWHOLEWORDS`)
         * - p : match path (`EVERYTHING_IPC_MATCHPATH`)
         * - r : regex (`EVERYTHING_IPC_REGEX`)
         * - a : match accents (`EVERYTHING_IPC_MATCHACCENTS`)
         *
         * request_flags should be a bitmask representing the `EVERYTHING_IPC_QUERY2_REQUEST_xxx` request flags, or a string containing one or more of the following characters. Defaults to `EVERYTHING_IPC_QUERY2_REQUEST_FULL_PATH_AND_NAME` if not provided.
         * - n : name (`EVERYTHING_IPC_QUERY2_REQUEST_NAME`)
         * - p : path (`EVERYTHING_IPC_QUERY2_REQUEST_PATH`)
         * - f : full path and name (`EVERYTHING_IPC_QUERY2_REQUEST_FULL_PATH_AND_NAME`)
         * - x : extension (`EVERYTHING_IPC_QUERY2_REQUEST_EXTENSION`)
         * - s : size (`EVERYTHING_IPC_QUERY2_REQUEST_SIZE`)
         * - c : created (`EVERYTHING_IPC_QUERY2_REQUEST_DATE_CREATED`)
         * - m : modified (`EVERYTHING_IPC_QUERY2_REQUEST_DATE_MODIFIED`)
         * - e : accessed (`EVERYTHING_IPC_QUERY2_REQUEST_DATE_ACCESSED`)
         * - a : attributes (`EVERYTHING_IPC_QUERY2_REQUEST_ATTRIBUTES`)
         * - r : run count (`EVERYTHING_IPC_QUERY2_REQUEST_RUN_COUNT`)
         * - R : date run (`EVERYTHING_IPC_QUERY2_REQUEST_DATE_RUN`)
         * - M : date recently changed (`EVERYTHING_IPC_QUERY2_REQUEST_DATE_RECENTLY_CHANGED`)
         * - N : highlighted name (`EVERYTHING_IPC_QUERY2_REQUEST_HIGHLIGHTED_NAME`)
         * - P : highlighted path (`EVERYTHING_IPC_QUERY2_REQUEST_HIGHLIGHTED_PATH`)
         * - F : highlighted full path and name (`EVERYTHING_IPC_QUERY2_REQUEST_HIGHLIGHTED_FULL_PATH_AND_NAME`)
         * 
         * sort_type should be one of the `EVERYTHING_IPC_SORT_xxx` constants (the numeric value). Defaults to `0` if not provided.
         * 
         * max_results lets you limit the number of results returned. Defaults to the everything_max_results advanced Preferences value if not provided. 
         * 
         * offset specifies the result offset. In conjunction with max_results this lets you query large datasets without having to deal with all the results at once. 
         * 
         * timeout specifies a timeout in milliseconds. Defaults to `1000` if not provided. */
        Query(query: string, search_flags?: number | string, request_flags?: number | string, sort_type?: number, max_results?: number, offset?: number, timeout?: number): Vector<EverythingResult>;
        /** Returns the run count for the specified file. */
        RunCountGet(file: string): number;
        /** Increments the run count for the specified file and returns the new count. */
        RunCountInc(file: string): number;
        /** Sets the run count for the specified file to the value provided. Returns True on success. */
        RunCountSet(file: string, count: number): boolean;
        /** Sends the specified command to Everything and returns its response. The commands are documented in the Everything API SDK (e.g. 401 equates to EVERYTHING_IPC_IS_DB_LOADED and returns 1 to indicate Everything's database is loaded). */
        SendCmd(command: number, data: number): number;
        /** Starts Everything if it's not already running and Opus has been configured to auto-start it. The optional timeout parameter lets you specify in milliseconds how long Opus should wait for Everything to start up before it gives up and returns failure. The default if not specified is 2500. */
        Start(timeout: number): boolean;
        /** Stops Everything (tells it to quit). */
        Stop(): boolean;
    }

    interface EverythingResult {
        /** Returns the last access date (in local and UTC time) of the result item. The last access date must have been requested in the query. */
        access: DOpusDate;
        /** Returns the last access date (in local and UTC time) of the result item. The last access date must have been requested in the query. */
        access_utc: DOpusDate;
        /** Returns the creation date (in local and UTC time) of the result item. The creation date must have been requested in the query. */
        create: DOpusDate
        /** Returns the creation date (in local and UTC time) of the result item. The creation date must have been requested in the query. */
        create_utc: DOpusDate;
        /** Returns the recently changed Date (in local and UTC time) of the result item. The value must have been requested in the query. */
        daterecentlychanged: DOpusDate;
        /** Returns the recently changed Date (in local and UTC time) of the result item. The value must have been requested in the query. */
        daterecentlychanged_utc: DOpusDate;
        /** Returns the last run date (in local and UTC time) of the result item. The value must have been requested in the query. */
        daterun: DOpusDate;
        /** Returns the last run date (in local and UTC time) of the result item. The value must have been requested in the query. */
        daterun_utc: DOpusDate;
        /** Returns the file list filename of the result item. The value must have been requested in the query. */
        filelist_filename: string;
        /** Returns the full path and name of the result item. The full path and name (or the path and name separately) must have been requested in the query. */
        fullpath: Path;
        /** Returns the highlighted full path and name of the result item, if the value was requested in the query. */
        highlighted_fullpath: string;
        /** Returns the highlighted name of the result item, if the value was requested in the query. */
        highlighted_name: string;
        /** Returns the highlighted path of the result item, if the value was requested in the query. */
        highlighted_path: string;
        /** Returns the name of the result item. The name (or full path and name) must have been requested in the query. */
        name: string;
        /** Returns the path of the result item. The path (or full path and name) must have been requested in the query. */
        path: Path;
        /** Returns the item's run count, if it was requested in the query. */
        runcount: number;
        /** Returns the size of the result item, if it was requested in the query. */
        size: FileSize;
        /** Constructs an Opus Item object representing this result. The full path and filename must have been returned in the result set for this function to work. */
        GetItem(): Item;
    }

    /** Returns the name of the favorite folder or sub-folder. */
    interface Favorite {
        /** Returns True if this is a sub-folder, False if it's a favorite folder or separator. If this object is a sub-folder it also behaves like a Favorites object as well as a Favorite object, and can be enumerated and have elements added and removed from it. */
        folder: boolean;
        /** Returns True if this is a separator. */
        separator: boolean;
        /** Returns the path this favorite folder refers to as a Path object. */
        path: Path;
        /** If this is a separator (i.e. the separator property returns True) this lets you make the separator into a heading, or change the heading text.
         * 
         * Note that changes you make to the list are not saved until you call the Favorites.Save method */
        SetHeading(heading: string): void;
        /** Changes the name of this favorite folder. Note that changes you make to the list are not saved until you call the Favorites.Save method. */
        SetName(name: string): void;
        /** Changes the path this favorite folder refers to. Note that changes you make to the list are not saved until you call the Favorites.Save method. */
        SetPath(path: string | Path): void;
        /** Default Value.
         * Returns the name of the favorite folder or sub-folder.
         */
        toString(): string;
        /** Default Value.
         * Returns the name of the favorite folder or sub-folder.
         */
        valueOf(): string;
    }

    interface Favorites {
        /** Indexed access */
        (index: number): Favorite;

        /** Adds a new favorite folder to the favorites list. Note that changes you make to the list are not saved until you call the Save method.
         * 
         * This method performs three separate functions; it can add a separator, a sub-folder or a favorite folder. 
         * 
         * - To add a separator, the parameters should be the type string sep, optionally followed by the insertion position (see below). For example,
         * ```javascript
         *      Favorites.Add("sep");
         * ```
         * - You can also make the separator a heading (i.e. a label that appears visually different to other items) by appending the heading name to the sep: prefix. For example,
         * ```javascript
         *      Favorites.Add("sep:Current Job");
         * ```
         * - To add a folder, the first parameter should be the string folder: followed by the name of the folder (as a single parameter), optionally followed by the insertion position. For example,
         * ```javascript
         *      Favorites.Add("folder:Picture Locations");
         * ```
         * - To add a new favorite, the first parameter can optionally be the name of the favorite, and the second parameter can be the path of the folder to add, or the name can be omitted and only the path can be provided. In either case you can optionally include the insertion position as the last parameter. For example,
         * ```javascript
         *      Favorites.Add("myfave", "c:\folder\path");
         *      Favorites.Add("c:\folder\path");
         * ```
         * 
         * In all three cases the new item is added to the end by default, but you can optionally specify a position to insert the item somewhere else. E.g. specifying 0 for the insertion position would add it at the top of the list. You can provide either a number or another Favorite object. For example,
         * ```javascript
         *      Favorites.Add("myfave", "c:\folder\path", 0);
         * ```
         * The return value is either a Favorite or a Favorites object (depending on whether you added a sub-folder or a favorite folder).
         */
        Add(separatorOrFolderType: string, insertpos?: number | Favorite): Favorites | Favorite;
                /** Adds a new favorite folder to the favorites list. Note that changes you make to the list are not saved until you call the Save method.
         * 
         * This method performs three separate functions; it can add a separator, a sub-folder or a favorite folder. 
         * 
         * - To add a separator, the parameters should be the type string sep, optionally followed by the insertion position (see below). For example,
         * ```javascript
         *      Favorites.Add("sep");
         * ```
         * - You can also make the separator a heading (i.e. a label that appears visually different to other items) by appending the heading name to the sep: prefix. For example,
         * ```javascript
         *      Favorites.Add("sep:Current Job");
         * ```
         * - To add a folder, the first parameter should be the string folder: followed by the name of the folder (as a single parameter), optionally followed by the insertion position. For example,
         * ```javascript
         *      Favorites.Add("folder:Picture Locations");
         * ```
         * - To add a new favorite, the first parameter can optionally be the name of the favorite, and the second parameter can be the path of the folder to add, or the name can be omitted and only the path can be provided. In either case you can optionally include the insertion position as the last parameter. For example,
         * ```javascript
         *      Favorites.Add("myfave", "c:\folder\path");
         *      Favorites.Add("c:\folder\path");
         * ```
         * 
         * In all three cases the new item is added to the end by default, but you can optionally specify a position to insert the item somewhere else. E.g. specifying 0 for the insertion position would add it at the top of the list. You can provide either a number or another Favorite object. For example,
         * ```javascript
         *      Favorites.Add("myfave", "c:\folder\path", 0);
         * ```
         * The return value is either a Favorite or a Favorites object (depending on whether you added a sub-folder or a favorite folder).
         */
        Add(favoriteName?: string, favoritePath: string, insertpos?: number | Favorite): Favorites | Favorite;
        /** Deletes the specified favorite or sub-folder. Note that changes you make to the list are not saved until you call the Save method. */
        Delete(fav: Favorite | Favorites): void;
        /** Lets you locate a sub-folder one or more levels below the current one. The name parameter is the name or path and name of the sub-folder to look for (e.g. "myfave", "pictures/local", etc).
         * The optional index parameter lets you handle the case when there might be more than one sub-folder with the same name. Favorites.Find("pictures", 1); would find the second sub-folder called "pictures" below the current level. */
        Find(nameOrPathToFind: string, index?: number): Favorites;
        /** Saves any changes you've made to the favorites list. Once you call this method changes you have made will be reflected in Preferences and the favorites list in Listers. Note that you can only call this method on the main "root" Favorites object obtained from the DOpus.favorites property */
        Save(): void;
        /** Changes the name of this sub-folder. Note that changes you make to the list are not saved until you call the Save method. You can only call this method on Favorites objects that refer to sub-folders, and not the main "root" folder. */
        SetName(name: string): void;
    }

    interface FAYTCloseData {
        /** Returns a Tab object representing the tab that the FAYT closed in. */
        tab: Tab;
    }

    /** Returns the full pathname of the file. */
    interface DOpusFile {
        /** Returns a Win32 error code that indicates the success or failure of the last operation. If the previous operation succeeded this will generally be 0. 
         * 
         * For example, if you try to open a non-existing file for reading using FSUtil.OpenFile, a valid File object will be returned - but the file itself would not be open. You can check if error returns 0 before proceeding to use the File object. */
        error: number;
        /** Returns the full pathname of the file as a Path object. */
        path: Path;
        /** Returns a FileSize object representing the size of this file, in bytes. */
        size: FileSize;
        /** Returns a FileSize object representing the current position of the read or write cursor within this file, in bytes. */
        tell: FileSize;
        /** Closes the underlying file handle. After this call the File object is still valid but it can no longer read or write data. 
         * 
         * If you want to use the SetAttr method to modify the attributes of a file you have created, you may want to call Close first otherwise the file system will set the A (archive) attribute on the file whether you want it set or not.
         * 
         * You may also want to close a file manually if you want to delete it, as some scripting languages (e.g. JScript) have lazy garbage collection and otherwise may keep the file handle open much longer than you intend. */
        Close(): void;
        /** Reads data from the file. If you provide a target Blob as the first parameter, the data will be stored in that Blob. Otherwise, a Blob will be created automatically.
         * 
         * The optional size parameter specifies the number of bytes to read - the default behavior is to read the remaining contents of the file.
         * 
         * A maximum of 1 GB (1073741824 bytes) can be read per call, whether a size is specified or implicit. To read a larger file, you must call Read multiple times.
         * 
         * If you provide a Blob then the return value indicates the number of bytes read successfully from the file. If a Blob isn't provided then the return value is the automatically created Blob - you can use its size property to discover the number of bytes that were read.
         * 
         * If Read returns zero (or an empty Blob), you can use the error property to test if anything went wrong, or if the file simply had no more data.
         */
        Read(target: blob, size: number): Blob;
        /** Moves the read or write cursor within this file. The delta parameter specifies how many bytes to move - how this is interpreted depends on the optional method parameter:
         * - b : move relative to the beginning of the file
         * - e : move relative to the end of the file
         * - c : move relative to the current position (this is the default method)
         * 
         * The return value is a FileSize object indicating the new cursor position.
         */
        Seek(delta: number, method: string): FileSize;
        /** Modifies the attributes of this file. You can either pass a string indicating the attributes to set, or a FileAttr object. When using a string, valid attributes are:
         * - a : archive
         * - c : compressed
         * - e : encrypted
         * - h : hidden
         * - n : normal
         * - r : read-only
         * - s : system
         * - p : pinned
         * - i : non-content indexed
         * 
         * Note that both c and e attributes cannot be set at the same time.
         * 
         * When you pass a string you can also use + and - to turn some attributes on or off without affecting others. For example, ```SetAttr("-r")``` would turn off the read-only attribute. 
         * 
         * The return value is True if the operation was successful.
         */
        SetAttr(objectOrAttributes: FileAttr | string): boolean;
        /** Modifies one or more of the file's timestamps. The create and access parameters are optional. If you wish to specify no change for a timestamp, specify 0. Timestamps are specified as local time - use SetTimeUTC to specify them as UTC. The return value is True for success. */
        SetTime(modify: DOpusDate, create: DOpusDate, access: DOpusDate): boolean;
        /** Modifies one or more of the file's timestamps. The create and access parameters are optional. If you wish to specify no change for a timestamp, specify 0. Timestamps are specified as UTC time - use SetTime to specify them as local time. The return value is True for success. */
        SetTimeUTC(modify: DOpusDate, create: DOpusDate, access: DOpusDate): boolean;
        /** Truncates the file at the current position of the write cursor. You can use this in conjunction with the Seek method to pre-allocate a file's space on disk, for greater performance (i.e. seek to the final size of the file, truncate at that point, and then seek back to the start and write the data). The return value is True for success. */
        Truncate(): boolean;
        /** Writes data from the specified Blob (or array) or string to the file.  By default the entire contents of the Blob will be written, but you can use the optional from parameter to specify the source byte offset, and the size parameter to specify the number of bytes to write.  A maximum of 1 GB (1073741824 bytes) can be written per call, whether a size is specified or implicit. To write a larger amount of data, you must call Write multiple times.  If you provide a string rather than a Blob, the string will be automatically encoded as UTF-8.  The return value indicates the number of bytes successfully written to the file.  If Write returns zero, you can use the error property to test if anything went wrong or if there was simply no data to write (e.g. the specified Blob was empty). */
        Write(blobOrString: string | Blob, from?: number, size?: number): number;
        /** Default Value.
         * Returns the full pathname of the file.
         */
        toString(): string;
        /** Default Value.
         * Returns the full pathname of the file.
         */
        valueOf(): string;
    }

    /** Returns a string representing the attributes that are set (similar to the format displayed in the Attr column in the file display). */
    interface FileAttr {       
        /** A file or directory that has changes which need archiving. The A bit is usually set on new or modifies files, and may then be cleared by backup software after it has added the changes to a backup. */
        a: boolean
        /** A file or directory that has changes which need archiving. The A bit is usually set on new or modifies files, and may then be cleared by backup software after it has added the changes to a backup. */
        archive: boolean;
        /** A file or directory that is compressed. For a file, all of the data in the file is compressed. For a directory, compression is the default for newly created files and subdirectories. */
        c: boolean
        /** A file or directory that is compressed. For a file, all of the data in the file is compressed. For a directory, compression is the default for newly created files and subdirectories. */
        compressed: boolean;
        /** A file or directory that is encrypted. For a file, all data streams in the file are encrypted. For a directory, encryption is the default for newly created files and subdirectories. */
        e: boolean;
        /** A file or directory that is encrypted. For a file, all data streams in the file are encrypted. For a directory, encryption is the default for newly created files and subdirectories. */
        encrypted: boolean;
        /** The file or directory is hidden. It is not included in an ordinary directory listing. */
        h: boolean;
        /** The file or directory is hidden. It is not included in an ordinary directory listing. */
        hidden: boolean;
        /** The file or directory is not to be indexed by the content indexing service. */
        i: boolean;
        /** The file or directory is not to be indexed by the content indexing service. */
        nonindexed: boolean;
        /** The data of a file is not available immediately. This attribute indicates that the file data is physically moved to offline storage. This attribute is used by Remote Storage, which is the hierarchical storage management software. Applications should not arbitrarily change this attribute. */
        o: boolean;
        /** The data of a file is not available immediately. This attribute indicates that the file data is physically moved to offline storage. This attribute is used by Remote Storage, which is the hierarchical storage management software. Applications should not arbitrarily change this attribute. */
        offline: boolean;
        /** The data of the file is to be kept available at all times; it should not be offloaded to offline storage. */
        p: boolean;
        /** The data of the file is to be kept available at all times; it should not be offloaded to offline storage. */
        pinned: boolean;
        /** A file that is read-only. Applications can read the file, but cannot write to it or delete it. This attribute is not honored on directories. */
        r: boolean;
        /** A file that is read-only. Applications can read the file, but cannot write to it or delete it. This attribute is not honored on directories. */
        readonly: boolean;
        /** A file or directory that the operating system uses a part of, or uses exclusively. */
        s: boolean;
        /** A file or directory that the operating system uses a part of, or uses exclusively. */
        system: boolean;
        /** Assigns a new set of attributes to this object. You can pass another FileAttr object, or a string (e.g. "hsr"). */
        Assign(FileAttrorstring: string | FileAttr): void;
        /** Given a single character representing an attribute (e.g. "a") this method returns the name of the attribute in the user's current language (e.g. "Archive"). */
        AttrName(attributeLetter: string): string;
        /** Clears (turns off) the specified attributes in this object. You can pass another FileAttr object, or a string representing the attributes to turn off. */
        Clear(FileAttrorstring: string | FileAttr): void;
        /** Sets (turns on) the specified attributes in this object. You can pass another FileAttr object, or a string representing the attributes to turn on. */
        Set(FileAttrorstring: string | FileAttr): void;
        /** Default Value.
         * Returns a string representing the attributes that are set (similar to the format displayed in the Attr column in the file display).
         */
        toString(): string;
        /** Default Value.
         * Returns a string representing the attributes that are set (similar to the format displayed in the Attr column in the file display).
         */
        valueOf(): string;
    }

    interface FileChange {
        /** Returns a string indicating the type of file change:
         * - create : A file was created.
         * - createunknown : A file or directory was created.
         * - change : A file was modified.
         * - changewrite : A file was written to.
         * - delfile : A file was deleted.
         * - deldir : A directory was deleted.
         * - delunknown : A file or directory was deleted.
         * - makedir : A directory was created.
         * - rename : A file or folder was renamed.
        */
        action: string;
        /** The name of the file or folder that changed. */
        file: string;
        /** The secondary name, if any. */
        file2: string;
        /** The path the change occurred in. */
        path: Path;
        /** The secondary path, if any. */
        path2: Path;
    }

    /** Returns the name of the group. */
    interface FileGroup {
        /** Returns True if the group is currently collapsed. */
        collapsed: boolean;
        /** Returns the number of items in this group. Note that groups can be empty; empty groups are not displayed in the file display but will still be returned by the Tab.filegroups property. */
        count: number;
        /** Returns the id number of this group. Id numbers are arbitrary - you shouldn't place any meaning on the actual value, but you can compare the id fields as an easy way to tell if two items are in the same group. */
        id: number;
        /** Returns an Items object that represents all the files and folders in this group. */
        members: Items;
        /** Returns a string indicating the collation type of the group. */
        type: string;
        /** Default Value.
         * Returns the name of the group.
         */
        toString(): string;
        /** Default Value.
         * Returns the name of the group.
         */
        valueOf(): string;
    }

    interface FileOperationCompleteData {
        /** Returns a string that indicates the type of file operation. Currently the only supported value is "rename". */
        action: string;
        /** Returns a string that provides the entire command line that launched this operation. */
        cmdline: string;
        /** Used only when the query property (described below) is False. Provides further information about the operation that completed.
         * 
         * For action = "rename":
         * - Returns a Map object that provides a map of all items that were renamed and their new names.
         * - The map keys are the full paths of the renamed files.
         * - The map values will be either the new filename on its own (if the file was renamed in place), or the new full path to the file (if the file was moved to a new directory as part of the rename).
         */
        data: any;
        /** Returns a Path object representing the destination path of the operation, if any. */
        dest: Path;
        /** Returns a string indicating any qualifier keys that were held down by the user when the operation was initiated.
         * 
         * The string can contain any or all of the following: `shift`, `ctrl`, `alt`, `lwin`, `rwin`
         * 
         * If no qualifiers were down, the string will be: `none` */
        qualifiers: string;
        /** Returns True the first time the OnFileOperationComplete event is called.
         * 
         * When called the first time, you should examine the action and other properties and return True if you decide you want notification about this operation and False otherwise.
         * 
         * The query property will be False when you are called the second time, when the operation is complete. */
        query: boolean;
        /** Returns a Path object representing the source path of the operation. */
        source: Path;
        /** Returns a Tab object representing the source folder tab. */
        tab: Tab;
    }

    /** Returns the number of bytes represented by this FileSize object as a string. */
    interface FileSize {
        /** Returns the number of bytes as a currency value. This is a 64 bit data type but it is stored as a fractional value, so you must multiply the returned value by 10000 to obtain the actual byte size. */
        cy: currency;
        /** Returns the number of bytes as an automatically formatted string (e.g. if the FileSize value is 1024, the string 1 KB would be returned). */
        fmt: string;
        /** Returns the highest (most significant) 32 bits of the file size. Not all scripting languages support this data type (e.g. VBScript does not). */
        high: decimal;
        /** Returns the highest 32 bits of the file size as a hexadecimal string. */
        highhex: string;
        /** Returns the lowest (least significant) 32 bits of the file size. */
        low: decimal;
        /** Returns the lowest 32 bits of the file size as a hexadecimal string. */
        lowhex: string;
        /** Returns the number of bytes as a decimal value. This is a 64 bit data type but not all scripting languages support it (e.g. VBScript does not). */
        val: decimal;
        /** Returns the number of bytes as a hexadecimal string. */
        valhex: string;
        /** Adds the supplied value to the value of this FileSize object. You can pass a string, int or currency type, or another FileSize object.  Some FileSize objects are read-only and will error if you try to modify them. This includes ones returned by Item.size. Use the Clone method to create a modifiable copy. */
        Add(value: string | number | FileSize | currency): void;
        /** Clones this FileSize object and returns a new one set to the same value. */
        Clone(): FileSize;
        /** Compares the supplied value with the value of this FileSize object. The return value will be 0 (equal), 1 (greater) or -1 (less). */
        Compare(size: string | number | FileSize | currency): number;
        /** Divides the value of this FileSize object with the supplied value. You can pass a string, int or currency type, or another FileSize object.  Some FileSize objects are read-only and will error if you try to modify them. This includes ones returned by Item.size. Use the Clone method to create a modifiable copy. */
        Div(divider: string | number | FileSize | currency): void;
        /** Multiplies the value of this FileSize object with the supplied value. You can pass a string, int or currency type, or another FileSize object.  Some FileSize objects are read-only and will error if you try to modify them. This includes ones returned by Item.size. Use the Clone method to create a modifiable copy. */
        Mult(multiplier: string | number | FileSize | currency): void;
        /** Sets the FileSize to the supplied value. You can pass a string, int, decimal or currency type, or another FileSize object. You can also pass a Blob consisting of exactly 1, 2, 4 or 8 bytes, in which case the data contained in the Blob will be used to form the number. You can use a hexadecimal string by pre-pending $ or 0x.  If the FileSize object is read-only, it will error if you try to modify it. Use Clone or FSUtil.NewFileSize to create a new object you can modify. */
        Set(size: string | number | FileSize | currency): void;
        /** Subtracts the supplied value from the value of this FileSize object. You can pass a string, int or currency type, or another FileSize object. Note that the FileSize object is unsigned and so the value cannot go below zero.  Some FileSize objects are read-only and will error if you try to modify them. This includes ones returned by Item.size. Use the Clone method to create a modifiable copy. */
        Sub(substractor: string | number | FileSize | currency): void;
        /** Returns a Blob containing the bytes that make up the current value. By default 8 bytes will be copied to the Blob (the full 64 bit number) but you can pass an alternative number of bytes (1, 2 or 4) as a parameter to truncate the value. */
        ToBlob(value: number): Blob;
        /** Default Value.
         * Returns the number of bytes represented by this FileSize object as a string.
         */
        toString(): string;
        /** Default Value.
         * Returns the number of bytes represented by this FileSize object as a string.
         */
        valueOf(): string;
    }

    interface FilesystemChangeData {
        /** Returns the ID of the watcher that detected a file or folder change. This ID is assigned when you create the watcher in the call to FSUtil.WatchChanges. */
        id: string;
    }

    /** Returns the internal name of this group.  The internal name is always the same in all languages.  Groups that come pre-defined when you install Opus have internal names like "Archives" and "Music" (which are also their English display names).  User-defined groups have internal names which are unique, automatically generated GUID strings like "{C4B716ED-2A9C-43C6-B325-7DADDEEFADA9}". */
    interface FiletypeGroup {
        /** Returns the display name of this group.  The display name is what you see in the File Types editor. Display names may be translated differently in different languages. */
        display_name: string;
        /** Returns the tiles mode definition string for this group. */
        tiles: string;
        /** Returns the tooltip definition string for this group. */
        tooltip: string;
        /** Tests the filename (or extension) for membership of this group. Returns True if the file is a member of the group, or False if it is not. */
        MatchExt(filename: string): boolean;
        /** Default Value.
         * Returns the internal name of this group.
         * 
         * The internal name is always the same in all languages.
         * 
         * Groups that come pre-defined when you install Opus have internal names like "Archives" and "Music" (which are also their English display names).
         * User-defined groups have internal names which are unique, automatically generated GUID strings like "{C4B716ED-2A9C-43C6-B325-7DADDEEFADA9}".
         */
        toString(): string;
        /** Default Value.
         * Returns the internal name of this group.
         * 
         * The internal name is always the same in all languages.
         * 
         * Groups that come pre-defined when you install Opus have internal names like "Archives" and "Music" (which are also their English display names).
         * User-defined groups have internal names which are unique, automatically generated GUID strings like "{C4B716ED-2A9C-43C6-B325-7DADDEEFADA9}".
         */
        valueOf(): string;
    }

    /** Lets you enumerate the file type groups represented by this object. */
    interface FiletypeGroups {
        /** Indexed access */
        (index: number): FiletypeGroup;
        /** Searches the file type group collection for the named group.  If Opus is not running in English, the translated name is compared first; if not found, it will search for the native English name for the built-in groups.  Returns a FiletypeGroup object or false if not found. */
        GetGroup(group: string): FiletypeGroup | false;
        /** Returns a new FiletypeGroups object containing the subset of groups that the specified filename (or file extension) is a member of. You would normally only call this method on the object returned by the DOpus.filetypegroups property. */
        MatchExt(filename: string): FiletypeGroups;
        /** Returns the translated name of the named built-in file type group.  If not found, or no translation exists, the input string is returned. For example, when running in French, calling this method with "Movies" as the input string would return "Vidéos". */
        Translate(group: string): string;
    }

    interface Filter {
        /** If valid returns False you can use this property to discover information about the error. */
        lasterror: FilterParseError;
        /** Returns True if the filter was created successfully (i.e. no errors were encountered in parsing the filter text). */
        valid: boolean;
        /** Adds a clause to the filter. If provided as a string, the clause will be parsed and the method returns True if parsing was successful. If parsing fails, use the lasterror property to find out why. Alternatively, you can add another Filter object. 
         * 
         * The clause string must be a fully formed textual filter clause. For example,
         * ```
         *    size match > 2 mb
         * ```
         * The optional conjunction string lets you choose whether the clause is joined via and or or. If not specified, the default is and. */
        Add(clauseOrFilter: string | Filter, conjunction?: string): boolean;
        /** Clears the contents of the filter. */
        Clear(): void;
        /** Returns a Vector containing the names of all defined filters. */
        List(): Vector;
        /** Loads a saved filter from the user's configuration. Returns True if the filter was successfully loaded. */
        Load(filter: string): boolean;
        /** Initialises the filter with either a string or the contents of an existing Filter object. If provided as a string, the clause will be parsed and the method returns True if parsing was successful. If parsing fails, use the lasterror property to find out why. */
        Set(clauseOrFilter: string | Filter): boolean;
    }

    interface FilterParseError {
        /** Returns the length of the token that caused the parsing error. */
        length: number;
        /** Returns the error description. */
        message: string;
        /** Returns the position of the parsing error in the input string. */
        position: number;
        /** Returns the token that caused the parsing error. */
        token: string;
    }

    interface FlatViewChangeData {
        /** Returns a *string* indicating the new Flat View mode. Will be one of *off*, *grouped*, *mixed* or *mixednofolders*. */
        mode: string;
        /** Returns a string indicating any qualifier keys that were held down by the user when the event was triggered.  
         * 
         * The string can contain any or all of the following: *shift*, *ctrl*, *alt*, *lwin*, *rwin*
         * 
         * If no qualifiers were down, the string will be: *none* */
        qualifiers: string;
        /** Returns a {@link Tab} object representing the tab the Flat View mode changed in. */
        tab: Tab;
    }

    interface FolderEnum {
        /** True if the enumeration is complete, otherwise False. */
        complete: boolean;
        /** If an error occurs this will return the error code. It will return 0 on success. */
        error: number;
        /** Closes the underlying file system handle used to perform the enumeration. You might call this method if you want to delete the folder you just enumerated. After this method is called the complete property will return True. */
        Close(): void;
        /** Returns the next item in the enumeration. By default (with no arguments provided) a single Item object is returned. For higher performance, you can specify a number as the first argument to return more than one item at once - in this case, a Vector of Item objects is returned instead. Specify -1 to return all items in the folder in one call. You can also create your own Vector and pass it as the second argument to stop Opus creating a new Vector each time. */
        Next(): Item;
        /** Returns the next item in the enumeration. 
         * 
         * By default (with no arguments provided) a single {@link Item} object is returned. For higher performance, you can specify a number as the first argument to return more than one item at once - in this case, a {@link Vector} of {@link Item} objects is returned instead. Specify -1 to return all items in the folder in one call. 
         * 
         * You can also create your own {@link Vector} and pass it as the second argument to stop Opus creating a new {@link Vector} each time. */
        Next(count: number, vector?: Vector): Vector<Item>;
    }

    interface FontMeta {
        /** The character set. */
        charset: number;
        /** The clipping precision. */
        clipprecision: number;
        /** The angle, in tenths of degrees, between the escapement vector and the x-axis of the device. */
        escapement: number;
        /** The typeface name of the font. */
        fontname: string;
        /** The height, in logical units, of the font's character cell or character. */
        height: number;
        /** An italic font if set to True. */
        italic: boolean;
        /** The angle, in tenths of degrees, between each character's base line and the x-axis of the device. */
        orientation: number;
        /** The output precision. */
        outprecision: number;
        /** The pitch and family of the font. */
        pitchandfamily: number;
        /** The output quality. */
        quality: number;
        /** A strikeout font if set to True. */
        strikeout: boolean;
        /** An underlined font if set to True. */
        underline: boolean;
        /** The weight of the font in the range 0 through 1000. */
        weight: number;
        /** The average width, in logical units, of characters in the font. */
        width: number;
    }

    interface Format {
        /** Returns True if folders are always sorted alphabetically, False if otherwise. */
        alpha_folders: boolean;
        /** Returns True if column width auto-sizing is enabled, False if otherwise. */
        autosize: boolean;
        /** Returns True if checkbox mode is turned on, False if otherwise. */
        checkboxes: boolean;
        /** Returns a collection of {@link Column} objects that represent all the individual columns currently added to the display. */
        columns: Column[];
        /** Returns a {@link Vector} of strings representing the explanation of the current folder format (the same text visible when hovering the mouse over the format lock icon in the status bar). */
        format_explain: Vector<string>;
        /** Returns a {@link Path} object which represents the path that the current folder format was set for (if any). */
        format_path: path;
        /** Returns the number of frozen columns. Columns are always frozen from the left so this also tells you which columns are frozen (if any). */
        frozen: number;
        /** Returns a string that indicates the state of the option to automatically calculate folder sizes. The string returned will be one of *default*, *on* or *off*. */
        getsizes: string;
        /** If grouping is enabled, returns the name of the column that the list is grouped by. */
        group_by: string;
        /** Returns a string indicating the current group combining mode. Possible values are **normal**, **never** and **other**. */
        group_combine: string;
        /** Returns True if the group combining mode is set to **Never combine**. Note that this option is deprecated, you should use **group_combine** instead. */
        group_individual: boolean;
        /** Returns True if the groups are sorted in reverse order. */
        group_reverse: boolean;
        /** Returns a {@link FileAttr} object indicating the file attributes that are hidden (any items with these attributes set will be hidden from the display). */
        hide_attr: FileAttr;
        /** Returns the wildcard pattern of folders that are hidden from the display. */
        hide_dirs: string;
        /** Returns True if the current **hide_dirs** pattern is using regular expressions. */
        hide_dirs_regex: boolean;
        /** Returns True if filename extensions are hidden, or False if they are displayed. */
        hide_ext: boolean;
        /** Returns the wildcard pattern of files that are hidden from the display. */
        hide_files: string;
        /** Returns True if the current **hide_files** pattern is using regular expressions. */
        hide_files_regex: boolean;
        /** Returns a {@link FileAttr} object indicating the folder attributes that are hidden (any folders with these attributes set will be hidden from the display). If the separate folder attribute filter is disabled this property will return the string **"off"**. */
        hide_folder_attr: FileAttr | string;
        /** Returns the filename prefixes that are ignored when sorting the list. */
        ignore_prefix: string;
        /** Returns True if the folder format is locked in the tab. */
        locked: boolean;
        /** Returns True if manual sorting is enabled. */
        manual_sort: boolean;
        /** If manual sorting is active, returns the name of the current sort order (if it has one). */
        manual_sort_name: string;
        /** If manual sort is active, returns a {@link SortOrder} object which lets you query and change the sort order. */
        manual_sort_order: SortOrder;
        /** Returns a string indicating the current file/folder mixing type. The string returned will be one of *mixed*, *files* (files first) or *dirs* (folders first). */
        mix_type: string;
        /** Returns True if filenames and extensions are sorted separately. */
        name_ext: boolean;
        /** Returns True if numeric name sorting is enabled. */
        numeric_name: boolean;
        /** Returns True if the over-all sort order is reversed. */
        reverse_sort: boolean;
        /** Returns a {@link FileAttr} object indicating the file attributes that are shown (only items with these attributes set will be shown in the display). */
        show_attr: FileAttr;
        /** Returns the wildcard pattern of folders that are shown (only folders matching this pattern will be shown). */
        show_dirs: string;
        /** Returns True if the current **show_dirs** pattern is using regular expressions. */
        show_dirs_regex: boolean;
        /** Returns the wildcard pattern of files that are shown. */
        show_files: string;
        /** Returns True if the current **show_files** pattern is using regular expressions. */
        show_files_regex: boolean;
        /** Returns a {@link FileAttr} object indicating the folder attributes that are shown (only folders with these attributes set will be shown in the display). If the separate folder attribute filter is disabled this property will return the string **"off"**. */
        show_folder_attr: FileAttr | string;
        /** Returns True if the name column is sorted by filename extension rather than filename. */
        sort_ext: boolean;
        /** Returns a {@link Column} object representing the current sort field. */
        sort_field: Column;
        /** Returns the custom thumbnail size, or 0 if no custom size is set. */
        thumb_size: number;
        /** If the format overrides the global thumbnail stretch mode, returns one of *FitReduce*, *FitSmooth*, *FitPixelated*, *FillCropSmooth*, or *FillCropPixelated*. Otherwise, returns none. */
        thumb_stretch: string;
        /** Returns the current view mode as a string. The returned string will be one of *large_icons*, *small_icons*, *list*, *details*, *power*, *thumbnails* or *tile*. */
        view: string;
        /** Returns True if word sorting is enabled. */
        word_sort: boolean;
        /** The first time a script accesses a particular Format object, a snapshot is taken of the tab's format. If the script then makes changes to that tab (e.g. it changes the sort field, etc), these changes will not be reflected by the object. To re-synchronize the object with the tab, call the **Format.Update** method. */
        Update(): void;
    }

    interface FSUtil {
        /** Cancels folder or file change monitoring previously established by a call to the {@link WatchChanges} method. The **id** parameter is the ID you assigned to your watcher when it was created. */
        CancelWatchChanges(id: string): void;
        /** Compares the two provided path strings for equality - returns True if the two paths are equal, or False if otherwise.
         * 
         * The optional **flags** parameter lets you modify the comparison behavior. This parameter is a string containing zero or more of the following letters (case sensitive):
         * - c : Makes the path comparison case sensitive.
         * - p : Returns True if path2 is equal to or a parent of path1.
         */
        ComparePath(path1: string, path2: string, flags: string): boolean;
        /** Retrieves the display name of a path. This is the form of a path that is intended to be displayed to the user, rather than used internally by Opus. For example, for a library path it will strip off the internal *?xxxxxxx* notation that Opus uses to identify library member folders. 
         * 
         * The optional **flags** parameter lets you modify the behavior. This parameter is a string containing zero or more of the following letters (case sensitive):
         * - e : for editing (returns a string designed for editing rather than for display)
         * - f : file part (returns the display filename rather than the entire path)
         * - r : resolve (resolves library paths to their underlying file system folder)
         */
        DisplayName(path: string, flags: string): string;
        /** Returns a {@link Vector} of {@link Drive} objects, one for each drive on the system. */
        Drives(): Vector<Drive>;
        /** Returns True if the specified file, folder or device exists, or False otherwise. 
         * 
         * The optional *flags* parameter can be set to **w** to use wildcards in the final path component. */
        Exists(path: string, flags?: string): boolean;
        /** Returns a {@link StringSet} containing the names of any alternate data streams (ADS) found for the specified file or folder. */
        GetADSNames(path: string): StringSet;
        /** Returns the localized text description for a system error code. */
        GetErrorMsg(error: number): string;
        /** Returns the pair of the specified folder, if one exists. The optional flags are compared against the configured options for the pair; they let you control in which conditions the pair is returned, and how to handle it if the paired folder doesn't exist.
         * - d : Default dual-display folder
         * - v : Default Navigation Lock target
         * - n : Turn on Navigation Lock automatically
         * - y : Default Synchronize target
         * - l : Always display primary folder at the left/top
         * - u : Use path even if it doesn't exist
         * - i : Ignore the pair
         * - g : Go up to first existing parent
         */
        GetFolderPair(path: string, flags: string): PairedFolder;
        /** Creates an {@link Item} object for the specified file path. */
        GetItem(path: string): Item;
        /** Returns a {@link Metadata} object representing the metadata for the specified file. */
        GetMetadata(path: string): Metadata;
        /** Returns the value of one or more shell properties for the specified file.
         * 
         * The file path must be provided as the first parameter. 
         * 
         * The second parameter can be the name (or PKEY) of a property to retrieve, in which case the property value will be returned. 
         * 
         * Alternatively, the second argument can be a {@link DOpusMap|Map} object which lets you retrieve multiple properties at once. Each property you want to retrieve should be added to the {@link DOpusMap|Map} with its name as a key, with an empty string as its value. The values in the **Map** will be replaced by the property values. 
         * 
         * The optional **type** argument is a string that lets you control how the properties are looked up by name (not case-sensitive):
         * - R : The first property whose raw name matches will be used.
         * - D : The first property whose display name matches will be used.
         * 
         * If neither is specified, both raw and display names can match. Note that if a shell property is returned by the system as a SAFEARRAY type, it will be converted automatically to a {@link Vector} object.
         */
        GetShellProperty(path: string, propertyorMap: string | DOpusMap<string>, type?: 'R' | 'D'): any;
        /** Returns a {@link Vector} of {@link ShellProperty} objects which represents all the possible shell properties available on the system. 
         * 
         * You can optionally provide a wildcard *pattern* as the first argument - if you do, only properties whose names match the supplied pattern will be returned.
         * 
         *  The optional **type** argument is a string that lets you restrict the list of properties further (not case-sensitive):
         * - R : Property raw names must match the pattern.
         * - D : Property display names must match the pattern.
         * 
         * If neither is specified, both raw and display names can match.
         * 
         *  Additional flags supported by the **type** argument are:
         * - V : Restrict to viewable properties only. Viewable properties are those intended to be shown to the user - they're the same ones shown in Explorer's column chooser UI.
         */
        GetShellPropertyList(pattern: string, type: string): ShellProperty;
        /** For files signed with an Authenticode certificate (usually .exe and .dll files), returns a Signature object describing the signature used to sign the file with. 
         * 
         * By default the signature won't be verified - the method will simply extract and return information about it. The optional **verify** parameter lets you verify the integrity of the file as well. Set this value to True to do a simple hash check (verifies the file has not been modified, but doesn't check the signature), or use the following flags to validate the signature as well as checking the file.
         * - n : No revocation check
         * - c : (Lowercase c.) Check final certificate in the chain for revocation
         * - C : (Uppercase C.) Check the entire chain for revocation
         * - R : Check the entire chain excluding the root certificate
         * - h : Hash-only check
         * - l : Treat certificates as expired once their timestamp has elapsed
         */
        GetSignature(path: string, verifyOrFlags: boolean | string): Signature;
        /** Creates a temporary folder (with a unique name) and returns the path to it in a {@link Path} object. Temporary folders created with this method have a limited lifetime after which Opus will automatically delete them (it will also clean them up when it's shutdown and restarted). The default lifetime is 20 minutes; you can change this using the optional parameter. */
        GetTempDirPath(lifetime: number): Path;
        /** Creates a temporary file and returns a {@link DOpusFile} object ready to be written to.
         * 
         * The returned object supports both reading and writing, without having to open the file a second time (although you can do that if it is easier). 
         * 
         * You can obtain the name of the file using the {@link DOpusFile|File}.path property. 
         * 
         * An optional filename **suffix** can be specified; if not provided (or an empty string is passed), the default is ".tmp". 
         * 
         * An optional **prefix** can also be specified; if not provided (or an empty string is passed), the default is "dop". Between the suffix and prefix, Opus will insert additional characters into the name to ensure it is unique. 
         * 
         * As an example, **```DOpus.FSUtil.GetTempFilePath(".txt","cat-")```** might generate *```C:\Users\Leo\AppData\Local\Temp\cat-202106230928470962.txt```* for a file path. 
         * 
         * The optional flags parameter can include zero or more of these letters (not case-sensitive):
         * - d : delete-on-close. File will be deleted automatically when closed.
         * - p : permit deletion. Other processes can delete the file.
         * - r : read shareable. Other processes can read the file.
         * - w : write shareable. Other processes can write to the file.
         * 
         * The read, write and deletion sharing modes affect what other processes are allowed to do while the file is still open. Once the file is closed (assuming it has not been auto-deleted), other processes are always free to read, write or delete the file. 
         * 
         * When delete-on-close is used, other things may not be able to open the file unless they specifically permit the file to be deleted at the time they open it. 
         * 
         * The optional **window** parameter lets you associate the **File** object with a {@link Tab} or a {@link Lister}, which will be used if Opus needs to display any dialogs (e.g. a UAC elevation dialog).
         */
        GetTempFile(suffix: string, prefix: string, flags: string, window: object): DOpusFile;
        /** Creates a temporary file (with a unique name) and returns the path to it in a {@link Path} object. 
         * 
         * An optional filename **suffix** can be specified; if not provided (or an empty string is passed), the default is ".tmp". 
         * 
         * An optional **prefix** can also be specified; if not provided (or an empty string is passed), the default is "dop". 
         * 
         * Between the suffix and prefix, Opus will insert additional characters into the name to ensure it is unique. 
         * 
         * As an example, **```DOpus.FSUtil.GetTempFilePath(".txt","cat-")```** might generate *```C:\Users\Leo\AppData\Local\Temp\cat-202106230928470962.txt```* for a file path.
         */
        GetTempFilePath(suffix: string, prefix: string): Path;
        /** Returns a string indicating the item type of the specified file path. 
         * The string will be either **file**, **dir** or **invalid** if the path doesn't exist.
         * 
         * The optional **flags** argument is used to control the behavior with archives. Normally, an archive will be reported as **dir**, but if you specify "**a**" for the flags parameter it will be reported as **file**. 
         * 
         * This method is different to {@link PathType} which tells you the underlying "namespace" type rather than whether something is simply a file or a folder.
         */
        GetType(path: string, flags: string): string;
        /** Calculates a checksum for the specified file or {@link Blob}.  
         * By default, the MD5 hash is calculated, but you can use the optional **type** parameter to change the hash/checksum algorithm. Valid values are (not case-sensitive) **md5**, **blake3**, **sha1**, **sha256**, **sha512**, **crc32**, **crc32_php** and **crc32_php_rev**. 
         * 
         * You can also specify multiple types (e.g. *"md5,sha1,sha256"*) at once, in which case the specified checksums will be calculated at the same time, and the result will be returned as a {@link Vector} of strings (in the same order as you requested them). 
         * 
         * Unlike the other algorithms, CRC32 is a concept rather than a well-defined standard. We have provided the three CRC32 implementations you're most likely to encounter:
         * - *CRC32* is most common in the Windows world and matches what tools like 7-Zip and PKZip call "CRC32", and what PHP calls "CRC32b".
         * - *CRC32_PHP* is less common and matches what BZIP2 uses and what PHP outputs by default.
         * - *CRC32_PHP_REV* is the same as *CRC32_PHP* but with the result's byte-order reversed, as output by some tools.
         * 
         * Example (VBScript):   ```DOpus.FSUtil.Hash("C:\Windows\Notepad.exe","md5")```
         * 
         * The optional third argument allows you to calculate the hash asynchronously and return its result to a script dialog's message loop. To use this, pass your {@link Dialog} object as the third argument. The **`Hash`** method will then return a unique ID number for the request, and your message loop will receive a "hash" message when the result is ready. The {@link Msg.data} property provides the request ID and the {@link Msg.object} property provides the hash (which will either be a string, or a Vector if more than one hash type was requested).
         */
        Hash(pathOrBlob: string | Blob, type: string, dlg?: Dialog): string | Vector<string>;
        /** Creates a new {@link FileAttr} object, which represents file attributes. 
         * 
         * You can initialize the new object by passing either a string representing the attributes to turn on (e.g. *"hsr"*) or another {@link FileAttr} object. If you don't pass a value, the new object will default to all attributes turned off. */
        NewFileAttr(fileAttributes: string | FileAttr): FileAttr;
        /** Creates a new {@link FileSize} object, which makes it easier to handle 64 bit file sizes. 
         * 
         * You can initialize this with a number of data types (*int*, *string*, *decimal*, *currency*, another {@link FileSize} object, or a {@link Blob} containing exactly 1, 2, 4 or 8 bytes). You can use a hexadecimal string by pre-pending **$** or **0x**. 
         * 
         * Example (VBScript):   ```DOpus.FSUtil.NewFileSize(1024)```
         * 
         * When only a size is specified, the result will be an unsigned value, which means it can represent larger size values but cannot represent negative values. 
         * 
         * To create a signed value instead, specify "**s**" as the first parameter and specify the size as the second parameter. This is case-sensitive; it must be a lowercase "s". 
         * 
         * Example (VBScript):   ```DOpus.FSUtil.NewFileSize("s", -1024)```
         */
        NewFileSize(size: number | string | decimal | FileSize | Blob, signedSize?: number): FileSize;
        /** Creates a new {@link Path} object initialised to the provided path string. */
        NewPath(path: string): Path;
        /** Creates a new {@link Wild} object. 
         * 
         * If a **pattern** and **flags** are provided, the pattern will be parsed automatically; otherwise, you must call the **Parse** method on the returned object before using it. 
         * 
         * See the description of the {@link Wild.Parse} method for a list of the valid flags. */
        NewWild(pattern: string, flags: string): Wild;
        /** Opens or creates a file and returns a {@link DOpusFile|File} object that lets you access its contents as binary data. 
         * A **File** object is always returned, even if the file could not be opened. Check **File.error** on the returned object immediately after creating it to see if opening the file succeeded. 
         * Even if a file was not be opened, some of the returned object's methods may still work. For example, if a file exists but permissions block you from opening it, you may still be able to change its attributes, or vice versa. 
         * 
         * The first argument can be either:
         * - A string or {@link Path} object which specifies the file to open
         * - An existing {@link Blob} object to create a {@link DOpusFile|File} object that gives you read/write stream access to a chunk of memory.
         * 
         * When opening a {@link Blob}, the created object will always be in *read-write mode* and the rest of the parameters (**mode** and **window/elevation**) are not used and need not be specified.
         *  
         * When opening a file, the optional **mode** parameter specifies how to open it (case sensitive):
         * - r  > *Read mode*. The file can be read but not written. (This is the default.)
         * - w  > *Write mode*. The file can be written, but not read.
         * - rw > *Read-write mode*. The file can be read and written from the same object. 
         * 
         * When opening in *write mode* or *read-write mode*, you can specify additional **mode** flags that control how the file is created or opened (case sensitive):
         * - c > Create a new file, only if it doesn't already exist. The call will fail if the file already exists.
         * - a > Create a new file, always. If the file already exists, it will be overwritten, i.e. truncated to zero length. (This is the default if w or rw are used on their own.)
         * - e > Open existing file. The call will fail if the file does not already exist.
         * - o > Open existing file. The file will be created if it does not exist.
         * - t > Truncate existing file. If the file exists, it will be truncated to zero length. If the file doesn't exist, the call will fail.
         * 
         * The **mode** flags can also include these letters (case sensitive):
         * - d > Delete-on-close. The file will be automatically deleted when closed. (If something else also has the file open, it won't be deleted until everything closes it.)
         * - f > Force. Opus will clear the file's read-only attribute if it blocks opening the file for writing; otherwise, attempting to open a read-only file for writing will fail. For example, "**wof**" is like "**wo**" mode but also clears the read-only attribute.
         * - m > Modify mode. Use this if you want to use the **File** object to read or modify the file's attributes, or get the file's size, without reading or writing the actual file contents.
         * - p > Permit deletion. Other processes can delete the file before it has been closed, although any deletion will not take place until it is closed. Files opened via this method always permit other readers and writers.
         * - x > (Lowercase x.) Exclude other readers. While you have the file open, nothing else can open it for reading. If something else already has it open for reading, your request to open the file will fail. Has no effect on filesystems that don't support it.
         * - X > (Uppercase X.) Exclude other writers. While you have the file open, nothing else can open it for writing. If something else already has it open for writing, your request to open the file will fail. Has no effect on filesystems that don't support it.
         * 
         * When opening an existing file which something else already flagged for deletion, including files already open in *delete-on-close mode*, the **p** (permit deletion) flag must be specified.
         * 
         * Non-Windows filesystems may have different locking and sharing rules. Opus will pass the requested flags to them, but it is ultimately up to them how they behave. 
         * 
         * The optional third parameter takes either a **window** object or a string indicating **elevation** mode. This parameter influences the behavior of UAC elevation prompts (and potentially other user interface elements) that may be triggered when opening the file. It can be one of the following:
         * - An Opus {@link Tab} or {@link Lister} object which UAC prompts will appear over if elevation is required and has not already been obtained.
         * - The string "**NoElevate**" to prevent UAC elevation entirely when opening this file.
         * - The string "**ElevateNoAsk**" to prevent UAC prompts while still gaining elevation if something else already got it (e.g. a previous **OpenFile** call).
         * 
         * Example (VBScript): ```Set F = DOpus.FSUtil.OpenFile("C:\Test.txt","wrcf","NoElevate")```
         */
        OpenFile(pathorobject: string | Path, mode: string, windoworstring?: object): DOpusFile;
        /** Returns a string indicating the underlying "namespace" type of the specified file path. Possible values are:
         * - shell : The path refers to the Windows shell - e.g. a virtual folder like This PC
         * - filesys : The path is a real filesystem path - e.g. C:\Windows
         * - ftp : The path is an FTP path
         * - zip : The path is a zip file
         * - mtp : The path is an MTP path (i.e. a portable device like a phone or a tablet)
         * - lib : The path is a library
         * - coll : The path is a collection
         * - plugin : The path is a plugin-provided namespace, most probably an archive (but not Zip)
         * 
         * This method is different to **GetType** which tells you whether something is a file or a directory.
         */
        PathType(path: string): string;
        /** Returns a {@link FolderEnum} object that lets you enumerate the contents of the specified folder. 
         * 
         * The optional **flags** string can include zero or more flag characters (not case-sensitive):
         * - r : Recursively enumerate the folder, listing the contents of the folder, its sub-folders, their sub-folders, and so on.
         * - l : Skip links. Prevents the traversal of symbolic links and junctions when recursively enumerating folders.
         * - s : Shell enumeration. Asks the Windows Shell to enumerate non-filesystem folders. For example, the Quick Access folder on Windows 10 could be enumerated with **`ReadDir("/quickaccess","s");`** it would not work without the "s" because Quick Access is not a real filesystem directory.
         * - p : Suppress password dialogs from encrypted archives.
         * 
         * If you don't need any flags, skip the second argument entirely. You may see older scripts pass True and False as the second argument, to turn recursion on and off; that is deprecated but remains supported for compatibility.
         */
        ReadDir(path: string, flags?: string): FolderEnum;
        /** Resolves the specified path string to its real filesystem path, with support for converting:
         * - Folder Aliases to the real paths they point to.
         * - **Library** and **File Collection** items to their real filesystem paths.
         * - Application paths in the **{apppath|appname}** form.
         * - Environment variables.
         * - Optionally, **junctions** and **symbolic links** can be resolved to their targets.
         * 
         * It is safe to pass a path which does not need resolving; the path will be returned unmodified, so you can call this on things without checking if it is needed first. 
         * 
         * Scripts which pass the current directory to external software should generally call Resolve on the path first, otherwise they risk passing aliases like *\/desktop* to things which won't understand them.
         * 
         * The optional **flags** string can include the following letter (not case-sensitive):
         * - c : Return canonical paths. This will expand short filenames to their true long filename representation.
         * - j : Resolve junctions and symbolic links to their target folder.
         * - a : Resolve path to alias (if possible).
         * 
         * Note that {@link Path} objects also have a similar **Resolve** method which modifies them in-place. */
        Resolve(path: string, flags?: string): Path;
        /** Allows you to run external programs and optionally capture their output.
         * 
         * **cmdline** is the full command line, including any required arguments. Any paths containing spaces must be quoted. 
         * 
         * **show** is the show state of (usually) the first window opened by the program. Use `0` to hide it, `1` to show it normally, `2` for minimize, `3` for maximize. 
         * 
         * The possible values for the optional **flags** argument are:
         * - a : Launch the progrom as administrator (elevated).
         * - r : Redirect output. The program's stdout will be redirected and returned to your script.
         * - w : Wait for completion. The **Run** method won't return until the program exits. Note that the r flag implies w (you can't capture output without waiting for the program to finish).
         * 
         * Note that the r flag implies w (you can't capture output without waiting for the program to finish).
         * 
         * The optional **input** argument is any text to send to the command's stdin when it runs.
         * 
         * The optional **curdir** argument lets you specify the current directory for the launched process. 
         * 
         * The optional **encode** argument lets you specify the encoding any captured output should be interpreted as. If not specified, UTF-8 is the default. Specify `0` for the current system codepage. You can also specify `"raw"` to receive the output as a {@link Blob} object and then convert it yourself using the {@link StringTools} methods.
         * 
         * If not told to wait for results, this method returns true or false.
         * If waiting for results, returns false on failure, or a RunResults object on success.
         */
        Run(cmdline: string, show: number, flags?: string, input?: string, curdir?: string, encode?:string): boolean | RunResults;
        /** Allows you to run external programs and optionally capture their output. 
         * 
         * Instead of six separate arguments, this method also supports receiving its arguments via a {@link DOpusMap|Map} object. 
         * 
         * The parameters can be provided as values of the Map, with the following names: "command", "showcmd", "flags", "input", "cd" and "codepage".
         */
        Run(args: DOpusMap<any>): boolean | RunResults;
        /** Returns True if the two specified paths both refer to the same drive or partition.
         * 
         * The optional **flags** string can contain zero or more of the following letters (case sensitive):
         * - c : Consider the **CD burning staging area** the same as the CD (or other writable optical media) itself.
         * - m : Handle **NTFS mount points**. (Slower but more accurate if either path may be below a mount point which really points to a different drive.)
         * - r : Real paths only. (Skip extra processing that is only useful for things like FTP sites and MTP devices.)
         * - s : Test if paths point to the same drive via drive letters created by the Windows **subst** command.
         * - u : Compare **FTP users**. (By default, FTP paths are considered the "same drive" if they point to the same FTP site. The **u** flag adds the requirement that both paths have the same user name.)
         * - z : If **path1** is inside a Zip file or other archive, only consider **path2** on the "same drive" if it is the archive itself or is *inside* the same archive.
         * - Z : If **path1** is inside a Zip file or other archive, only consider **path2** on the "same drive" if it is *inside* the same archive.
         * 
         * When neither **z** nor **Z** are specified, archives are essentially treated like normal directories and will be considered on the "same drive" as any path pointing to the same drive the archive is on, including other archive paths on that drive.
         */
        SameDrive(path1: string, path2: string, flags: string): boolean;
        /** Establish monitoring of a folder or file for changes. Returns **0** for success or an error code on failure.
         * 
         * When a change occurs to a monitored file or folder, the script's {@link OpusOnFilesystemChange|OnFilesystemChange} event is triggered.
         * 
         * The **id** argument lets you provide an ID for this watcher that's used to identify it when changes occur. **dir** is the full path to a filesystem folder, or a file if the **i** flag is set. 
         * 
         * The optional flags are:
         * - f : monitor for file change in folder (e.g. file created or deleted)
         * - d : monitor for directory change in folder (e.g. directory created)
         * - r : recursive - monitor sub-folders
         * - a : monitor for file attribute changes
         * - s : monitor for file size changes
         * - w : monitor for last write time changes
         * - i : monitor a single file rather than a folder
         * 
         * Use the {@link CancelWatchChanges} method to cancel monitoring.
         */
        WatchChanges(id: string, path: string, flags: string): number;
    }

    interface Func {
        /** Returns an {@link Args} object that provides access to any arguments given on the command line that invoked this script. This is used when the script has added an internal command to Opus. A command line template can be provided when the command is added, and any arguments the user provides on the command line for the script command will be available via this object.  For most use the argsmap property may be an easier way to access your command's arguments. */
        args: Args;
        /** Returns a {@link DOpusMap|Map} object that provides keyword lookup for each of the arguments given on the command line. An argument will only be present in the {@link DOpusMap|Map} if it was used on the command line, so you can easily check which arguments are present using the {@link DOpusMap.exists()|Map.exists()} method. */
        argsmap: DOpusMap<any>;
        /** This property returns a pre-filled {@link Command} object that can be used to run commands against the source and destination tabs. Using this object is the equivalent of calling {@link DOpusFactory.Command} and setting the source and destination tabs manually. */
        command: Command;
        /** This object represents the default destination tab for the function. */
        desttab: Tab;
        /** Returns True if the command was invoked via a drag-and-drop operation. */
        fromdrop: boolean;
        /** Returns True if the command was invoked via the keyboard (i.e. via a hotkey rather than a button). */
        fromkey: boolean;
        /** Returns a string indicating any qualifier keys that were held down by the user when the command was invoked. 
         * 
         * The string can contain any or all of the following: *shift*, *ctrl*, *alt*, *lwin*, *rwin*. 
         * 
         * If no qualifiers were down, the string will be: *none* 
         * 
         * Note that any qualifiers that were actually involved in launching this command will be filtered out from this property. For example, a hotkey assigned to `Ctrl`+`L` would not report that the `Ctrl` key was held down, because it was integral in launching the command. Use the `qualifiers_raw` property to access an unfiltered set of qualifiers. */
        qualifiers: string;
        /** Returns a string indicating any qualifier keys that were held down by the user when the command was invoked. This provides the true qualifier set, without the filtering as described above. 
         * 
         * The string can contain any or all of the following: *shift*, *ctrl*, *alt*, *lwin*, *rwin*. */
        qualifiers_raw: string;
        /** This object represents the default source tab for the function. */
        sourcetab: Tab;
        /** If this button was run from the standalone image viewer, this object represents the viewer window. */
        viewer: Viewer;
        /** Creates a new {@link Dialog} object, that lets you display dialogs and popup menus. The dialog's **window** property will be automatically assigned to the source tab. */
        Dlg(): Dialog;
    }

    interface GlobalFilters {
        /** Returns True if the global wildcard filters are enabled. */
        enable: boolean;
        /** Returns the global filename filter wildcard pattern. If the wildcard is configured to use regular expressions, it will have a **regex**: prefix in front of the pattern. */
        file: string;
        /** Returns the global folder filter wildcard pattern. If the wildcard is configured to use regular expressions, it will have a **regex**: prefix in front of the pattern. */
        folder: string;
        /** Returns True if the global option to hide hidden files is on. */
        hidehidden: boolean;
        /** Returns True if the global option to hide operating system files is on. */
        hidesystem: boolean;
        /** Returns a {@link PermanentFilters} object which describes the statue of the **Permanent Filters**. */
        readonly permanent: PermanentFilters;
    }

    interface GetCopyQueueNameData {
        /** Returns a {@link Path} object representing the destination path of the copy operation. */
        dest: Path;
        /** Returns a {@link Tab} object representing the destination folder tab. */
        desttab: Tab;
        /** Returns a binary string indicating the physical drive indices that the destination path is located on (if any). For example, 00100000000000000000000000 indicates that drive `C:` is the destination drive. */
        dest_drives: string;
        /** Returns True if the operation is a move instead of a copy. */
        move: boolean;
        /** Returns the default queue name for this operation. */
        name: string;
        /** Returns a {@link Path} object representing the source path of the copy operation. */
        source: Path;
        /** Returns a {@link Tab} object representing the source folder tab. */
        sourcetab: Tab;
        /** Returns a binary string indicating the physical drive indices that the source path is located on (if any). For example, 00001000000000000000000000 indicates that drive `E:` is the source drive. */
        source_drives: string;
    }

    interface GetCustomFieldData {
        /** Returns a {@link CustomFieldData} object, that the script can use to add custom fields to the Rename dialog. Each property added to the object in this method will be create a new field in the dialog, allowing the user to supply additional information to your rename script. */
        fields: CustomFieldData;
        /** This lets you assign labels to your script's custom fields, that are shown to the user in the Rename dialog. To do this, set this property to a {@link DOpusMap|Map} created via the {@link DOpusFactory.Map} method, filled with name/label string pairs. */
        field_labels: DOpusMap<string>;
        /** This lets you assign "cue banners" to any edit fields created by your script. A cue banner is displayed inside an empty edit field to prompt the user what sort of data the field expects. To use this, set this property to a {@link DOpusMap|Map} created via the {@link DOpusFactory.Map} method, filled with name/banner string pairs. */
        field_tips: DOpusMap<string>;
        /** You can use this field to specify which control gets the input focus by default when your fields appear for the first time. Set it to the name of the desired control. You can also specify **!oldname** or **!newname** to assign focus to the standard old and new name fields. */
        focus: string;
    }

    interface GetNewNameData {
        /** Returns a {@link CustomFieldData} object which provides the values of any custom fields your script added to the *Rename* dialog. */
        custom: CustomFieldData;
        /** Returns an {@link Item} object representing the file or folder being renamed. */
        item: Item;
        /** Returns the proposed new name of the item. This will be the result of the application of any selected standard options in the rename dialog (numbering, capitalization, etc). */
        newname: string;
        /** Returns the file extension of the proposed new name. Does not take multi-part extensions into account (e.g. will return ".rar" rather than ".part1.rar"). */
        newname_ext: string;
        /** Returns the file extension of the proposed new name, taking multi-part extensions into account (e.g. will return ".part1.rar" rather than ".rar"). */
        newname_ext_m: string;
        /** Returns the contents of the *New Name* field (that is, not the calculated new name after all the options have been applied, but the actual text contents of the field as entered by the user). */
        newname_field: string;
        /** Returns the file stem of the proposed new name. Does not take multi-part extensions into account (e.g. will return "catpictures.part1" rather than "catpictures"). */
        newname_stem: string;
        /** Returns the file stem of the proposed new name, taking multi-part extensions into account (e.g. will return "catpictures" rather than "catpictures.part1"). */
        newname_stem_m: string;
        /** Returns the "old name" pattern as entered by the user in the rename dialog. */
        oldname_field: string;
        /** Returns True if the script is being called to generate a preview for the rename dialog, False if the file is being renamed for real. */
        preview: boolean;
        /** Returns a {@link Tab} object representing the tab the rename operation is taking place in. If there is no tab, returns False instead. */
        tab: Tab;
    }

    /** Returns a collection of ColumnValue objects that you can enumerate. */
    interface HighlightedColumns {
        /** Returns a collection of {@link ColumnValue} objects that you can enumerate */
        (): any;
    }

    /** The **HTTPRequest** object lets you easily send an asynchronous HTTP request to a remote webserver and receive and process the response.
     * 
     * This object is created via the {@link Dialog} object's `NewHTTPReq` method, and so requires a Script Dialog in order to use. The dialog also must be detached.
     * 
     * The general process to use this object is as follows:
     * 1. Create the HTTPRequest object
     * 2. Add any required headers
     * 3. Add POST data or GET query name/value pairs as required
     * 4. Send the request
     * 5. Process "http" events in your message loop
     * 6. Read any returned data when you get a "data" event.
     */
    interface HTTPRequest {
        /** When a response has been received, returns the value of the Content-Type response header. */
        contenttype: string;
        /** Returns True when a request is complete (and all data has been received). */
        complete: boolean;
        /** Returns the numerical error code, if any. */
        errorcode: number;
        /** Returns the error message, if any. */
        errortext: string;
        /** Returns the ID of the request. This is assigned automatically when the request is created. You'll need this if you use more than one request at once. */
        id: number;
        /** Returns the HTTP response message. */
        response: string;
        /** Returns the HTTP response code (e.g. 200, 404). */
        responsecode: number;
        /** Returns the current status of the request. This is also provided via the {@link Msg.value} property when you retrieve an HTTP message in your message loop. Valid status values are: notready, ready, pending, data, complete, error, shutdown. 
         * 
         * A status value of "data" means the response has been received and data is available to read. A status of "complete" means the response is complete (e.g. a HEAD request won't return any data, so you'd look for "complete" in that case). */
        status: string;
        /** Aborts the request if it hasn't yet returned any data, and removes any headers and post data that you've added. 
         * 
         * Calling this method resets the `HTTPRequest` object to its initial state, meaning it can be reused to send another request. */
        Abort(): void;
        /** Adds one or more headers to the HTTP request. You can either provide two strings (a name and a value), or a {@link DOpusMap|Map} of name → value pairs to add more than one header at once. */
        AddHeader(nameOrMap: string | DOpusMap<string>, value?: string): void;
        /** Adds one or more name/value pairs to the request's POST data. You can either provide the name and value as two arguments, in which case you can also optionally provide a content type string. Alternatively, you can provide a {@link DOpusMap|Map} of name → value pairs. The value of a posted data element can either be a string, or a {@link Blob} object to provide binary data. 
         * 
         * If you only add a single item of POST data you can leave the name empty (pass an empty string). This lets you, for example, POST data formatted as JSON - set the name to an empty string, the value to the JSON data in string form, and contenttype to `application/json`. 
         * 
         * If adding a Blob you can provide the filename argument which gives the receiving system a suggested filename to store the file under. You can also specify the encoding type - set to "base64" to have the Blob sent as base64-encoded data (otherwise by default it will be sent as binary). If you've encoded the data yourself you can specify another encoding type which will be passed as the value of the Content-Transfer-Encoding header. 
         * 
         * The data will be sent as `multipart/form-data` if you either pass a Blob object, or the Map contains more than one name/value pair.
         */
        AddPostData(nameOrMap: string | DOpusMap<any>, value?: string, contenttype?: string, filename?: string, encoding?: string): void;
        /** Adds one or more name/value pairs to the request's QUERY data. You can either provide the name and value as two arguments, or you can provide a {@link DOpusMap|Map} of name → value pairs. The query data will be automatically url-encoded and appended to the request string when the request is sent. */
        AddQueryData(nameOrMap: string | DOpusMap<string>, value?: string): void;
        /** Returns a {@link DOpusMap|Map} of name → value pairs containing the response headers once the response data has been received. */
        GetResponseHeaders(): DOpusMap<string>;
        /** Once a response has been received (i.e. your message loop gets an "http" message with the value type set to "data"), you can call this function to read the returned data. Note that this function will block until all data is received. 
         * 
         * The function tries to interpret the returned data automatically based on the Content-Type header in the response. Text data wil be converted to a string if possible. Image data will be returned as {@link Image} object if it's a format that Opus recognises. Otherwise, a {@link Blob} containing the response data will be returned. */
        ReadResponse(): string | Image | Blob;
        /** Use this function instead of `ReadResponse` to read the raw data from the response without trying to interpret it. The data is returned as a {@link Blob} object. 
         * 
         * You can specify the maximum about of data to read in bytes. If the requested size is available it will be returned; otherwise the function will return immediately with as much data as possible. If you specify size as 0, or don't specify a size, then the function will block until the entire response has been received. If you specify size as -1 then the function will return as much data as possible, but won't block. */
        ReadResponseData(size?: number): Blob;
        /** Sends the HTTP request to the specified webserver. The url parameter should be the full URL to retrieve (e.g. `https://www.gpsoft.com.au`). If you've added any query parameters via the `AddQueryData` method these will be appended automatically.
         * 
         * By default HTTP action will be chosen automatically based on the state of the object - `POST` if `AddPostData` has been used, otherwise `GET`. You can override this with the optional action parameter if you like - e.g. specify `HEAD` to just retrieve the headers without any response data. 
         * 
         * This function also supports local Unix sockets (on Windows 10 and above). Use `http+unix://` as the protocol followed by the path to the .sock file. Note that OS limitations mean the socket file path can't use unicode characters (ASCII only) and can't be longer than 107 characters.
         */
        SendRequest(url: string, action?: string): void;
        /** Specifies a timeout in seconds (default is 30). Functions which block like `ReadResponse` will timeout if a complete response is not received in time. Set to 0 for no timeout. */
        SetTimeout(seconds: number): void;
        /** Specifies the User-Agent string of the request, if requires. */
        SetUserAgent(agent: string): void;
        /** Call this to close down the request and free any associated resources. This aborts the request if it's still outstanding. Once you've called this function you can't query the request for any other data except the `complete` property.
         * 
         * You don't need to call this function but if you use a lot of requests you may want to once they're completed in order to free up memory.
         * 
         * Once `Shutdown` has been called the request object can no longer be used. Note that messages from the request may still be in your dialog's message queue even after calling `Shutdown` - best practice is to check the `complete` property before using any other methods or properties. */
        Shutdown(): void;
    }

    interface Image {
        /** Returns the bit count of the loaded image. */
        bitcount: number;
        /** Returns the height of the loaded image. */
        height: number;
        /** Returns the type of file the image was loaded or created from (if known). */
        type: string;
        /** Returns the width of the loaded image. */
        width: number;
        /** Copies the image's bitmap data into the Windows clipboard. Returns boolean success. */
        SetClip(): boolean;
    }

    interface ImageMeta {
        /** Returns the value of the specified column, as listed in the Pictures section of the [Keywords for Columns](https://docs.dopus.com/doku.php?id=reference:metadata_keywords:keywords_for_columns) page. */
        [column: string]: any;
    }

    interface IncludeFileInitData {
        /** Lets you provide copyright information for the include file. */
        copyright: string;
        /** Provides a description of the include file. */
        desc: string;
        /** Lets you specify a minimum version of Opus that the include file returns. If the current version is less than the specified version the include file will be disabled. You can specify the major version only (e.g. "13"), a major and minor version (e.g. "13.3") or a specific beta version (e.g. "13.3.1" for 13.3 Beta 1). */
        min_version: string;
        /** Provides a display name for the include file. */
        name: string;
        /** If the include file is inside a script package, setting this property to True makes the include file available to scripts outside that package. If set to False only scripts in the same package can include it. */
        shared: boolean;
        /** Provides a URL which you might, for example, use to link to more information about the include file. */
        url: string;
        /** Lets you provide a version number for your include file. */
        version: string;
    }

    /** Returns the full pathname of the item (i.e. path plus filename). */
    interface Item {
        /** Returns the "last accessed" Date, in local time. */
        access: DOpusDate;
        /** Returns the "last accessed" Date, in UTC. */
        access_utc: DOpusDate;
        /** Returns the item attributes. This value is a series of flags that are logically OR'd together. The attributes supported by Opus are:
         * - 1       : read only
         * - 2       : hidden
         * - 4       : system
         * - 32      : archive
         * - 1024    : reparse point (junctions, etc.)
         * - 2048    : compressed
         * - 4096    : offline storage
         * - 8192    : not content-indexed
         * - 16384   : encrypted
         * - 524288  : pinned
         * 
         * Using the fileattr property, which returns a {@link FileAttr} object, may be easier than dealing with the raw attribute flags. */
        attr: number;
        /** Returns the item attributes as a string, as displayed in the file display. */
        attr_text: string;
        /** Returns True if the item was checked (in checkbox mode), or False otherwise. */
        checked: boolean;
        /** Returns the "creation" date, in local time. */
        create: DOpusDate;
        /** Returns the "creation" date, in UTC. */
        create_utc: DOpusDate;
        /** For **Item** objects obtained from a {@link Viewer}, this property is True if the item represents the currently displayed image and False otherwise. 
         * 
         * For **Item** objects obtained from a file display, the property indicates whether or not the item is the one with focus. The **focus** property is the more proper way to check this, but both work in case you forget which is which. */
        current: boolean;
        /** Returns the display name of the item. Only a few items have a display name that is different to their actual name - some examples are certain system folders (like *`C:\Users`* which might have a translated display name in non-English locales). */
        display_name: string;
        /** For Item objects obtained from a file display, this property is True for folders that are currently expanded in the file display. */
        expanded: boolean;
        /** Returns the filename extension. */
        ext: string;
        /** Returns the filename extension, taking multi-part extensions into account. For example, a file called "file.part1.rar" might return ".rar" for **ext** but ".part1.rar" for **ext_m**. */
        ext_m: string;
        /** Returns True if the item failed when used by a command. This is only meaningful in conjunction with the {@link Command.files} collection - once the command has returned, this property will indicate success or failure on a per-file basis. */
        failed: boolean;
        /** Returns a {@link FileAttr} object that represents the item's attributes. */
        fileattr: FileAttr;
        /** If the file display this item came from is grouped by a particular column, this property returns a {@link FileGroup} object representing the group the item is in. If the item has no group this will return an empty string. 
         * 
         * This property is about grouping the file display by one of its columns. If you're looking for *file type groups*, see the **groups** and **groupsobject** properties, just below. */
        filegroup: FileGroup;
        /** For **Item** objects obtained from a file display, this property is True if the object represents the item with focus, and False otherwise. Only one item can have focus at a time. The item with focus is typically shown with an outline around it, and is usually the last item which was clicked on, or which was moved to with the keyboard. The item with focus is often also one of the selected items, but not always; selection and focus are two separate things. 
         * 
         * For **Item** objects obtained from a {@link Viewer}, the property indicates if the file is the one currently shown in the viewer. The **current** property is the more proper way to test this, but **focus** also works. */
        focus: boolean;
        /** Returns True for folder items if their size has been calculated by, for example, the **GetSizes** command. If False, the **size** property will be unreliable for folders. */
        got_size: boolean;
        /** Returns a {@link Vector} of {@link FiletypeGroup} objects representing any and all file type groups that this file is a member of. 
         * 
         * If you only want to check membership of a particular file type group, see the {@link InGroup} method in the section below. 
         * 
         * If you're looking for information on how the file display is grouping this file based on one of the displayed columns, see the **filegroup** property, just above. */
        groups: Vector<FiletypeGroup>;
        /** Similar to the groups property, except a {@link FiletypeGroups} object is returned instead of a {@link Vector}. */
        groupsobject: FiletypeGroups;
        /** Returns a {@link HighlightedColumns} object that lets you enumerate any selected cells belonging to this item. 
         * 
         * This only applies if the item was retrieved from a {@link Tab}. Normally you would use this in a script run from the **Copy Highlighted Cells** context menu. */
        highlighted: HighlightedColumns;
        /** This is a unique ID for the item; it is used internally by Opus. */
        id: number;
        /** Returns True if the item represents a folder, and False for a file. */
        is_dir: boolean;
        /** Returns True if the item is a junction to another folder. */
        is_junction: boolean;
        /** Returns True if the item is a reparse point. */
        is_reparse: boolean;
        /** Returns True if the item is a symbolic link. */
        is_symlink: boolean;
        /** Returns a {@link Metadata} object that provides access to the item's metadata. */
        metadata: Metadata;
        /** Returns the "last modified" date, in local time. */
        modify: DOpusDate;
        /** Returns the "last modified" date, in UTC. */
        modify_utc: DOpusDate;
        /** Returns the name of the item. */
        name: string;
        /** Returns the filename "stem" of the item. This is the name of the item with the filename extension removed. It will be the same as the **name** for folders. */
        name_stem: string;
        /** Returns the filename "stem" of the item, taking multi-part extensions into account. For example, a file called "file.part1.rar" might return "file.part1" for **name_stem** but "file" for **name_stem_m**. */
        name_stem_m: string;
        /** Returns True if the item was in an expanded sub-folder, False if it was in the root of the folder. */
        nested: boolean;
        /** Returns the path of the item's parent folder. This does not include the name of the item itself, which can be obtained via the **name** property. */
        path: Path;
        /** For stored query collections, returns a {@link StoredQuery} object that lets you read and modify the query's properties. */
        query: StoredQuery;
        /** Returns the "real" path of the item. For items located in virtual folders like Libraries or Collections, this lets you access the item's underlying path in the real file system. The realpath property includes the full path to the item, including its own name. */
        realpath: Path;
        /** Returns True if the item was selected, or False otherwise. */
        selected: boolean;
        /** Returns the short path of the item, if it has one. Note that short paths are disabled by default in Windows 10. */
        shortpath: Path;
        /** Returns the size of the item as a {@link FileSize} object. */
        size: FileSize;

        /** Retrieves the infotip for the item. The object must have been retrieved from a {@link Tab} (i.e. it can't have come from a directory enumeration). */
        InfoTip(): string;
        /** Tests the file for membership of the specified file type group. 
         * 
         * Each file type group has two names: An internal name which is always the same in all languages, and a display name which may be translated differently for each language. The display name is what you see in the File Types editor. Groups that come pre-defined when you install Opus have internal names like "*Archives*" and "*Music*" (which are also their English display names). User-defined groups have internal names which are unique, automatically generated GUID strings like "*{C4B716ED-2A9C-43C6-B325-7DADDEEFADA9}*". 
         * 
         * The group argument should be the name of the group you wish to test against, e.g. "*Music*". 
         * 
         * By default, both the internal name and the display name are checked, and a match on either will return true. Prefix the *group* argument with "*name:*" to restrict the search to internal names, or with "*disp:*" to restrict the search to display names. 
         * 
         * To get a list of all file type groups which the file matches, use the **groups** property instead (see the section above). */
        InGroup(group: string): boolean;
        /** This method returns a {@link Vector} of strings representing any labels that have been assigned to the item. 
         * 
         * Both arguments are optional. The first is a wildcard pattern that lets you filter the returned labels based on their category. For example, pass *"Status"* to only retrieve a list of status icons assigned to a file. 
         * 
         * The second optional argument contains flags keywords that control how the labels are returned. The only defined flag is *"explicit"* - if specified, wildcard and label filters will not be considered - only explicitly assigned labels will be returned. Note that if you want to provide the second argument but don't want to filter by category you should pass `"*"` for the first argument to match all categories. 
         * 
         * If explicit labels aren't requested, any global wildcard/filter labels will be returned, along with any per-folder labels configured for the item's folder. Per-folder *content type* and *folder type* labels, however, are not currently returned by this function. */
        Labels(category?: string, flags?: string): Vector<string>;
        /** Returns True if the item matches the specified filter. The *filter* argument must be a {@link Filter} object created by the {@link DOpusFactory.Filter} method. 
         * 
         * You can also pass a textual filter in string form, to parse the filter and compare the item in one operation, although if you're comparing multiple items it would be much more efficient to create the **Filter** first. */
        MatchFilter(filterOrClause: Filter | string): boolean;
        /** Opens this file and returns a {@link DOpusFile|File} object that lets you access its contents as binary data.
         * 
         * By default the file will be opened in read mode - specify "w" for the optional mode parameter to open the file in write mode. Note that you cannot both read and write with the same **File** object. 
         * 
         * When opening in write mode, you can also specify optional flags that control how the file is opened:
         * - wc : create a new file, only if it doesn't already exist.
         * - wa : create a new file, always. If the file already exists it will be overwritten. (This is the default.)
         * - we : open existing file. The file will not be created if it doesn't already exist.
         * - wo : open existing file. If the file doesn't exist it will be created.
         * - wt ! truncate existing file. If the file exists it will be truncated. The file will not be created if it doesn't already exist.
         * - d : delete-on-close.
         * 
         * When using write mode, you may add *f* (force) to any of the above mode strings to tell Opus to clear the read-only file attribute if it blocks modifying an existing file; otherwise, attempting to open a read-only file for writing will fail. For example, *"wof"* is like *"wo"* mode but also clears the read-only attribute. 
         * 
         * If you only want to make changes to the file's attributes without modifying its data you can also specify "*m*" to open it in *modify* mode. 
         * 
         * The optional *window* parameter lets you associate the {@link DOpusFile|File} object with a {@link Tab} or a {@link Lister}, which will be used if Opus needs to display any dialogs (e.g. a UAC elevation dialog). You may also specify the string "NoElevate" to prevent UAC elevation entirely, or "ElevateNoAsk" to prevent UAC prompts while still gaining elevation if something else has already performed it. 
         * 
         * A {@link DOpusFile|File} object is always returned, even if the file could not be opened. Check {@link DOpusFile.error|File.error} on the returned object immediately after creating it to see if opening the file succeeded. Even if the file was not be opened, some of the object's methods may still work. For example, if a file doesn't exist then you can't open it or set its attributes, but permissions on an existing file may allow you to set its attributes while blocking you from modifying it or vice versa. */
        Open(mode: string, window: object): DOpusFile;
        /** Returns the value of the specified shell property for the item. The property argument can be the property's PKEY or its name. 
         * 
         * If you provide a name then the optional second argument lets you control how the properties are looked up by name. If the value of *type* is "R" then the first property whose raw name matches the supplied name will be used. If the value is "D" then the first property whose display name matches the supplied name will be used. If *type* is omitted then both raw and display names can match. 
         * 
         * Note that if a shell property is returned by the system as a SAFEARRAY type, it will be converted automatically to a {@link Vector} object. */
        ShellProp(property: string, type: string): any;
        /** Updates the **Item** object from the file on disk. You might use this if you had run a command to change an item's timestamp or attributes, and wanted to retrieve the new information. */
        Update(): void;
    }

    /** Returns a collection of Item objects that you can enumerate. */
    interface Items {
        /** Indexed access */
        (index: number): Item;
        /** When this Items object comes from the {@link Dialog.Multi} method, it includes a **result** property giving the result of the dialog. The items[] is only valid if **result** returns True. If it returns False it means the user cancelled the dialog. */
        result: boolean;
        /** Removes any nested items from the collection (items that came from sub-folders rather than the root folder). The number of items removed is returned. */
        RemoveNested(): number;
        /** Updates the state of this object. This only applies to collections that come from certain sources (e.g. from a {@link Tab}). When the **Items** object is first retrieved, a snapshot is taken. Changes made after that outside of the script will not be detected unless you call the **Update** method. */
        Update(): void;
    }

    interface Lister {
        /** Returns a {@link Tab} object representing the currently active (source) tab. */
        activetab: Tab;
        /** Lister window bottom-edge coordinate. */
        bottom: number;
        /** Returns the custom title of the Lister (if any) as set by the **`Set LISTERTITLE`** command. This may be an empty string. The *title* property returns the actual window title. */
        custom_title: string;
        /** Returns the ID of the virtual desktop this Lister is on. */
        desktop: string;
        /** Returns a {@link Tab} object representing the current destination tab (in a dual-display Lister). */
        desttab: Tab;
        /** Indicates whether the Lister is in dual-display mode or not. Possible values are:
         * - 0 : single-display mode
         * - 1 : dual-display, vertical layout
         * - 2 : dual-display, horizontal layout
        */
        dual: number;
        /** Returns the current split percentage of the dual displays (e.g. **50** indicates they are evenly sized). */
        dualsize: number;
        /** Returns True if this Lister is currently the foreground (active) window. */
        foreground: boolean;
        /** Returns True if this Lister is currently the active Lister (foreground window), or was the most recently active Lister. */
        lastactive: boolean;
        /** Provides the name of the Lister layout that this Lister came from (if any). */
        layout: string;
        /** Lister window left-edge coordinate. */
        left: number;
        /** Indicates whether the metadata pane is currently open or not. Possible values are:
         * - 0 : metadata pane is not open
         * - 1 : metadata pane is open, vertical layout
         * - 2 : metadata pane is open, horizontal layout
         */
        metapane: number;
        /** Lister window right-edge coordinate. */
        right: number;
        /** Returns the state of a single-display mode Lister:
         * - 0 : off
         * - 1 : source
         * - 2 : destination
         * - 4 : locked
         */
        state: string;
        /** Returns the name of the Lister style which was last applied to the Lister, or an empty string if there is none. This is just the last style which was loaded and does not mean the Lister still looks the same; the user may have opened or closed panels and made other changes via other methods in the time since the style was applied. */
        style: string;
        /** Returns a collection of {@link Tab} objects that represent all tabs in this Lister. In a dual-display Lister this includes tabs in both the left and right file displays. */
        tabs: Tab[];
        /** Returns the name of the Folder Tab Group which was last loaded into the left half of the Lister, or an empty string if no group has been loaded. 
         * 
         * The name only changes when a Folder Tab Group is loaded. The current tabs may no longer resemble the named tab group if the user has made changes since the group was loaded. The name persists across restarts, through the Default Lister and saved Layouts. */
        tabgroupleft: string;
        /** Similar to **tabgroupleft**, but for the right half of the Lister (if any). */
        tabgroupright: string;
        /** Returns a collection of {@link Tab} objects that represent the tabs in the left/top side of a dual-display Lister. In a single-display Lister this is equivalent to all the tabs in the Lister. */
        tabsleft: Tab[];
        /** Returns a collection of {@link Tab} objects that represent the tabs in the right/bottom side of a dual-display Lister. In a single-display Lister this will return an empty collection. */
        tabsright: Tab[];
        /** Returns the current title of the Lister window. */
        title: string;
        /** Returns a collection of {@link Toolbar} objects representing all currently open toolbars in this Lister. 
         * 
         * The collection is obtained directly each time the script asks for it, and is not a snapshot, so you don't need to call **Update** for it to reflect changes. */
        toolbars: Toolbar[];
        /** Lister window top-edge coordinate; */
        top: number;
        /** Indicates whether or not the folder tree is currently open. Possible values are:
         * - 0 : folder tree is not open
         * - 1 : a single tree is open, at the left of the Lister
         * - 2 : a single tree is open, at the right of the Lister
         * - 3 : two folder trees are open (in a dual-display Lister)
        */
        tree: number;
        /** If the utility panel is currently open, returns a string indicating the currently selected utility page. Possible values are **find** (which means the Find panel's Simple version), **findadvanced**, **sync**, **dupe**, **undo**, **filelog**, **ftplog**, **otherlog**, **email**. */
        utilpage: string;
        /** Indicates whether or not the utility panel is currently open. Possible values are:
         * - 0 : utility panel is not open
         * - 1 : utility panel is open
        */
        utilpane: number;
        /** This {@link Vars} object represents all defined variables with *Lister* scope (that are scoped to this Lister). */
        vars: Vars;
        /** Indicates whether or not the viewer pane is currently open. Possible values are:
         * - 0 : viewer pane is not open
         * - 1 : viewer pane is open, vertical layout
         * - 2 : viewer pane is open, horizontal layout
        */
        viewpane: number;
        /** Returns the path of the file currently displayed by the lister's viewer pane. The path will be an empty string if there is no file currenly displayed. 
         * 
         * The path is obtained directly each time the script asks for it, and is not a snapshot, so you don't need to call **Update** for it to reflect changes. */
        viewpanefile: Path;
        /** Returns the current visibility state of the Lister window. Possible values are:
         * - **min**     : the Lister is minimized
         * - **max**     : the Lister is maximized
         * - **hidden**  : the Lister is hidden
         * - **normal**  : the Lister is displayed normally
        */
        windowstate: string;

        /** Creates a new {@link Dialog} object, that lets you display dialogs and popup menus. The dialog's window property will be automatically assigned to this Lister. */
        Dlg(): Dialog;
        /** Returns True if the Lister is on the current virtual desktop. */
        IsOnCurrentDesktop(): boolean;
        /** Moves the Lister window to the specified virtual desktop. Returns True if successful. */
        MoveToDesktop(desktop: string): boolean;
        /** Used to change how the Lister window is grouped with other Opus windows on the taskbar. Specify a group name to move the window into an alternative group, or omit the group argument to reset back to the default group. If one or more windows are moved into the same group, they will be grouped together, separate from other the default group. 
         * 
         * This only works when taskbar grouping is enabled. Group names are limited to 103 characters and will be truncated if longer. Spaces and dots in group names are automatically converted to underscores. Returns True on success. */
        SetTaskbarGroup(group: string): boolean;
        /** The first time a script accesses a particular **Lister** object, a snapshot is taken of the Lister state. If the script then makes changes to that Lister (e.g. it opens a new tab, or moves the window), these changes will not be reflected by the object (unless otherwise mentioned). To re-synchronize the object with the Lister, call the **Lister.Update** method. */
        Update(): void;
    }

    /** Lets you enumerate the currently open Listers. 
     * 
     * Do not assume that DOpus.listers(0) is the window which launched your script. See the note near the top of [the page](https://docs.dopus.com/doku.php?id=reference:scripting_reference:scripting_objects:listers). */
    interface Listers {
        /** Indexed access */
        (index: number): Lister;
        /** Returns a {@link Lister} object representing the most recently active Lister window. 
         * 
         * Do not assume that **DOpus.listers.lastactive** is the window which launched your script. See the note near the top of [the page](https://docs.dopus.com/doku.php?id=reference:scripting_reference:scripting_objects:listers). */
        lastactive: Lister;

        /** Returns true if the specified Lister still exists, or false if not. You can pass either a {@link Lister} object or an index. */
        Exists(listerOrIndex: Lister | number): boolean;
        /** Moves one or more Lister windows to the front. This method accepts one or more arguments; each argument can either be a {@link Lister} object or a {@link Vector} of {@link Lister} objects. The last window will placed on top, and all others will be below that in reverse order. */
        ToFront(...lister: Lister): void;
        /** The first time a script accesses the **DOpus.listers** property, a snapshot is taken of all currently open Listers. If the script then opens or closes Listers itself, these changes will not be reflected by this collection. To re-synchronize the collection, call the **Update** method. */
        Update(): void;
    }

    interface ListerResizeData {
        /** Returns a *string* indicating the resize action that occurred. This will be one of the following strings: *resize*, *minimize*, *maximize*, *restore*. */
        action: string;
        /** Returns the new width of the Lister in pixels. */
        width: number;
        /** Returns the new height of the Lister in pixels. */
        height: number;
        /** Returns a {@link Lister} object representing the Lister that was resized. */
        lister: Lister;
    }

    interface ListerUIChangeData {
        /** Returns a string indicating which UI element changed. This will equal one of the following strings: *dual*, *tree*, *metapane*, *viewer*, *utility*, *duallayout*, *metapanelayout*, *viewerlayout*, *toolbars*, *toolbarset*, *toolbarsauto*, *minmax*. */
        change: string;
        /** Returns a {@link Lister} object representing the Lister that is changing. */
        lister: Lister;
        /** Returns a string indicating any qualifier keys that were held down by the user when the event was triggered.  
         * 
         * The string can contain any or all of the following: *shift*, *ctrl*, *alt*, *lwin*, *rwin*.  If no qualifiers were down, the string will be: *none* */
        qualifiers: string;
    }

    interface Menu {
        /** Adds a new item to the menu and returns a {@link MenuItem} object that represents it. 
         * 
         * All arguments are optional - you can configure the menu item via its properties after creating it if you want. As well as this method you can use the specialised methods **AddSeparator**, **AddSubMenu** and **AddToggle** to add particular types of items.
         * - label	Specify the item's label. Not used for separators.
         * - id	Specify the item's ID (a numeric value). Not used for separators.
         * - position	Specify the new item's position. By default new items are added to the end.
         * - type	Specify the item's type. Valid types are "item", "toggle", "separator" and "submenu".
         * - submenu	For "sub" type items only, specifies the **Menu** object that defines the contents of the sub-menu.
         */
        AddItem(label?: string, id?: number, position?: number, type?: 'item' | 'toggle' | 'separator' | 'submenu', submenu?: any): MenuItem;
        /** Defines a "radio group", a set of two or more mutually exclusive *toggle* items. When an item in a radio group is chosen, it appears selected, and the previously selected item in the group is automatically deselected. The *id* values must be the same as those provided when the menu items were added. */
        AddRadioGroup(...id: number): void;
        /** Adds a new separator item to the menu. If *position* is not provided the separator is added to the end. */
        AddSeparator(position?: number): MenuItem;
        /** Adds a new sub-menu item to the menu. All arguments are optional - you can configure the menu item via its properties after creating it if you want.
         * - label	Specify the item's label.
         * - id	Specify the item's ID (a numeric value).
         * - position	Specify the new item's position. By default new items are added to the end.
         * - submenu	Specify the **Menu** object that defines the contents of the sub-menu.
         */
        AddSubMenu(label?: string, id?: number, position?: number, submenu?: any): MenuItem;
        /** Adds a new toggle item to the menu. All arguments are optional - you can configure the menu item via its properties after creating it if you want.
         * - label	Specify the item's label.
         * - id	Specify the item's ID (a numeric value).
         * - position	Specify the new item's position. By default new items are added to the end.
         */
        AddToggle(label: string, checked: boolean, id?: number, data?: any): MenuItem;
        /** Locates a menu item either by ID, position or label, and returns the {@link MenuItem} object representing it.
         * 
         * By default, *id* specifies the ID provided when the menu item was added. If you set the optional *by_position* argument to true the *id* value is interpreted as a position (e.g. `FindItem(3, true)` would return the fourth item in the menu.
         * 
         * You can also locate an item by its label, by passing a string as the argument. Standard wildcard patterns are supported.
         */
        FindItem(id: number, by_position?: boolean): MenuItem;
        /** Locates a menu item either by ID, position or label, and returns the {@link MenuItem} object representing it.
         * 
         * By default, *id* specifies the ID provided when the menu item was added. If you set the optional *by_position* argument to true the *id* value is interpreted as a position (e.g. `FindItem(3, true)` would return the fourth item in the menu.
         * 
         * You can also locate an item by its label, by passing a string as the argument. Standard wildcard patterns are supported.
         */
        FindItem(label: string): MenuItem;
        /** Removes a menu item from the menu, either by ID, position or label.
         * 
         * By default, *id* specifies the ID provided when the menu item was added. If you set the optional *by_position* argument to true the *id* value is interpreted as a position (e.g. `RemoveItem(3, true)` would remove the fourth item in the menu.
         * 
         * You can also remove an item by its label, by passing a string as the argument. Standard wildcard patterns are supported - only the first matching item will be removed.
         * 
         * The method returns true if the item was successfully removed. */
        RemoveItem(id: number, by_position?: boolean): boolean;
        /** Removes a menu item from the menu, either by ID, position or label.
         * 
         * By default, *id* specifies the ID provided when the menu item was added. If you set the optional *by_position* argument to true the *id* value is interpreted as a position (e.g. `RemoveItem(3, true)` would remove the fourth item in the menu.
         * 
         * You can also remove an item by its label, by passing a string as the argument. Standard wildcard patterns are supported - only the first matching item will be removed.
         * 
         * The method returns true if the item was successfully removed. */
        RemoveItem(label: string): boolean;
        /** Displays the popup menu. You can show the menu in three ways: 
         * - Relative to a specific dialog control, e.g. as a drop-down button or context menu on a list view (pass the dialog and control name)
         * - At a specific point relative to a dialog (pass the dialog and x / y coordinates)
         * - At a specific point on the screen (pass x / y coordinates without a dialog)
         * 
         * To display the menu on a dialog, pass the appropriate Dialog object and either the name of a control or x,y coordinates relative to the top-left corner of the dialog's client area.
         * 
         * If a control is specified the menu will appear positioned over that control. Special handling exists for button controls - the menu will appear positioned below it, like a drop-down menu button. For other controls the menu will appear at the mouse coordinates if the mouse is currently over that control (this lets you add right-click functionality).
         * 
         * The optional *flags* are:
         * - a:	auto-assign accelerators
         * - b	bottom-align (above the specified point)
         * - c	center-align (centered horizontally over the specified point)
         * - r	right-align (to the right of the specified point)
         * - v	vcenter-align (centered vertically over the specified point)
         * - m	multi-select (see below)
         * - r	right mouse button (otherwise assumes left mouse button)
         * - s	support scroll (see below)
         * 
         * The "support scroll" option substitutes an Opus menu for a standard Windows one, which supports showing a scrollbar for long lists. However this does not support multi-select mode.
         * 
         * Multi-select mode allows the user to select more than one item from the menu without it closing. Only "toggle" items support this functionality:
         * - Standard toggle items can be checked on or off. 
         * - Toggle items with their **radio** property set to true will be mutually exclusive with other radio items in the same group. Use the **`AddRadioGroup`** method to define groups.
         * - The menu will close when a non-toggle item is chosen.
         * 
         * The return value from the **Show** method depends on the use of the "m" multi-select flag.
         * - With single-select (the default), the return value is the ID of the chosen menu item, or -1 if the menu was cancelled. 
         * - With multi-select, the return value is a {@link MenuMultiSelResults} object. This object provides the ID of the chosen item (the one that closed the menu), as well as a vector of IDs that were toggled while the menu was open.
         */
        Show(dlg: Dialog, controlName: string, flags?: string): number | MenuMultiSelResults;
        /** Displays the popup menu. You can show the menu in three ways: 
         * - Relative to a specific dialog control, e.g. as a drop-down button or context menu on a list view (pass the dialog and control name)
         * - At a specific point relative to a dialog (pass the dialog and x / y coordinates)
         * - At a specific point on the screen (pass x / y coordinates without a dialog)
         * 
         * To display the menu on a dialog, pass the appropriate Dialog object and either the name of a control or x,y coordinates relative to the top-left corner of the dialog's client area.
         * 
         * If a control is specified the menu will appear positioned over that control. Special handling exists for button controls - the menu will appear positioned below it, like a drop-down menu button. For other controls the menu will appear at the mouse coordinates if the mouse is currently over that control (this lets you add right-click functionality).
         * 
         * The optional *flags* are:
         * - a:	auto-assign accelerators
         * - b	bottom-align (above the specified point)
         * - c	center-align (centered horizontally over the specified point)
         * - g	right-align (to the right of the specified point)
         * - v	vcenter-align (centered vertically over the specified point)
         * - m	multi-select (see below)
         * - r	right mouse button (otherwise assumes left mouse button)
         * - s	support scroll (see below)
         * 
         * The "support scroll" option substitutes an Opus menu for a standard Windows one, which supports showing a scrollbar for long lists. However this does not support multi-select mode.
         * 
         * Multi-select mode allows the user to select more than one item from the menu without it closing. Only "toggle" items support this functionality:
         * - Standard toggle items can be checked on or off. 
         * - Toggle items with their **radio** property set to true will be mutually exclusive with other radio items in the same group. Use the **`AddRadioGroup`** method to define groups.
         * - The menu will close when a non-toggle item is chosen.
         * 
         * The return value from the **Show** method depends on the use of the "m" multi-select flag.
         * - With single-select (the default), the return value is the ID of the chosen menu item, or -1 if the menu was cancelled. 
         * - With multi-select, the return value is a {@link MenuMultiSelResults} object. This object provides the ID of the chosen item (the one that closed the menu), as well as a vector of IDs that were toggled while the menu was open.
         */
        Show(dlg: Dialog, xPos: number, yPos: number, flags?: string): number | MenuMultiSelResults;
        /** Displays the popup menu. You can show the menu in three ways: 
         * - Relative to a specific dialog control, e.g. as a drop-down button or context menu on a list view (pass the dialog and control name)
         * - At a specific point relative to a dialog (pass the dialog and x / y coordinates)
         * - At a specific point on the screen (pass x / y coordinates without a dialog)
         * 
         * To display the menu on a dialog, pass the appropriate Dialog object and either the name of a control or x,y coordinates relative to the top-left corner of the dialog's client area.
         * 
         * If a control is specified the menu will appear positioned over that control. Special handling exists for button controls - the menu will appear positioned below it, like a drop-down menu button. For other controls the menu will appear at the mouse coordinates if the mouse is currently over that control (this lets you add right-click functionality).
         * 
         * The optional *flags* are:
         * - a:	auto-assign accelerators
         * - b	bottom-align (above the specified point)
         * - c	center-align (centered horizontally over the specified point)
         * - r	right-align (to the right of the specified point)
         * - v	vcenter-align (centered vertically over the specified point)
         * - m	multi-select (see below)
         * - r	right mouse button (otherwise assumes left mouse button)
         * - s	support scroll (see below)
         * 
         * The "support scroll" option substitutes an Opus menu for a standard Windows one, which supports showing a scrollbar for long lists. However this does not support multi-select mode.
         * 
         * Multi-select mode allows the user to select more than one item from the menu without it closing. Only "toggle" items support this functionality:
         * - Standard toggle items can be checked on or off. 
         * - Toggle items with their **radio** property set to true will be mutually exclusive with other radio items in the same group. Use the **`AddRadioGroup`** method to define groups.
         * - The menu will close when a non-toggle item is chosen.
         * 
         * The return value from the **Show** method depends on the use of the "m" multi-select flag.
         * - With single-select (the default), the return value is the ID of the chosen menu item, or -1 if the menu was cancelled. 
         * - With multi-select, the return value is a {@link MenuMultiSelResults} object. This object provides the ID of the chosen item (the one that closed the menu), as well as a vector of IDs that were toggled while the menu was open.
         */
        Show(xPos: number, yPos: number, flags?: string): number | MenuMultiSelResults;
    }

    /** The ID of the chosen item that dismissed the menu, or -1 if the menu was cancelled. */
    interface MenuItem {
        /** True if the item should appear in bold. The convention is that this indicates the menu's default action (the item that will be chosen if you press the `Enter` key). */
        bold: boolean;
        /** True if the item is checked. */
        checked: boolean;
        /** User data value associated with the item. */
        data: number;
        /** True if the item appears disabled. */
        disabled: boolean
        /** The numeric ID of the item. This is used in a number of {@link Menu} methods and also to identify the command chosen by the user when the menu is displayed. */
        id: number;
        /** The item's label. */
        label: string;
        /** For toggle items, set this to True to make it a radio toggle. You can then assign the item to a group using the {@link Menu.AddRadioGroup} method to create sets of mutually-exclusive options. */
        radio: boolean;
        /** The item type. Types are "item", "toggle", "separator" and "submenu". */
        type: 'item' | 'toggle' | 'separator' | 'submenu';
        /** The sub-menu displayed by this item. */
        submenu: Menu;
    }

    /** The MenuMultiSelResults object is returned by the Menu.Show method when used to show a popup menu in multi-select mode. */
    interface MenuMultiSelResults {
        /** A vector of item IDs that were changed (toggled) while the menu was open. */
        changed: Vector<number>;
        /** The ID of the chosen item that dismissed the menu, or -1 if the menu was cancelled. */
        id: number;
    }

    /** Returns a string indicating the primary type of metadata available in this object. The string will be one of the following: none, video, audio, image, font, exe, doc, other.   Note that sometimes more than one type of metadata will be available. For example, author is a document field (and so found under the doc property), but pictures can have authors as well. In this instance, the Metadata object would provide both ImageMeta and DocMeta objects. If the returned string is none it means that no metadata is available for the file, and you should not attempt to access any of the other properties. */
    interface Metadata {
        /** Returns an {@link AudioMeta} object providing access to audio metadata. The properties of this object are generally returned as their appropriate underlying type (e.g. a numeric field like "track number" will be returned as an *int*). */
        audio: AudioMeta;
        /** Returns an {@link AudioMeta} object that provides access to the unmodified text form of the audio metadata. This provides access to the same text as displayed in a Lister. For example, a numeric field like "track number" would be returned as a *string* rather than an *int*. */
        audio_text: AudioMeta;
        /** Returns a {@link DocMeta} object providing access to document metadata. */
        doc: DocMeta;
        /** Returns a {@link DocMeta} object that provides access to the unmodified text form of the document metadata. */
        doc_text: DocMeta;
        /** Returns an {@link ExeMeta} object providing access to executable (program) metadata. */
        exe: ExeMeta;
        /** Returns an {@link ExeMeta} object that provides access to the unmodified text form of the program metadata. */
        exe_text: ExeMeta;
        /** Returns a {@link FontMeta} object providing access to font file metadata. */
        font: FontMeta;
        /** Returns an {@link ImageMeta} object providing access to picture metadata. */
        image: ImageMeta;
        /** Returns an {@link ImageMeta} object that provides access to the unmodified text form of the picture metadata. */
        image_text: ImageMeta;
        /** Returns an {@link OtherMeta} object that provides access to miscellaneous metadata. */
        other: OtherMeta;
        /** Returns a {@link SpecialMeta} object that provides access to any folder-specific properties. */
        special: SpecialMeta;
        /** Returns a collection of strings corresponding to the tags that are assigned to this item. */
        tags: string[];
        /** Returns a {@link VideoMeta} object providing access to video metadata. */
        video: VideoMeta;
        /** Returns a {@link VideoMeta} object that provides access to the unmodified text form of the video metadata. */
        video_text: VideoMeta;
        /** Default Value.
         * Returns a string indicating the primary type of metadata available in this object. The string will be one of the following: none, video, audio, image, font, exe, doc, other.
         * 
         * Note that sometimes more than one type of metadata will be available. For example, author is a document field (and so found under the doc property), but pictures can have authors as well. In this instance, the Metadata object would provide both ImageMeta and DocMeta objects.
         * 
         * If the returned string is none it means that no metadata is available for the file, and you should not attempt to access any of the other properties.
         */
        toString(): string;
        /** Default Value.
         * Returns a string indicating the primary type of metadata available in this object. The string will be one of the following: none, video, audio, image, font, exe, doc, other.
         * 
         * Note that sometimes more than one type of metadata will be available. For example, author is a document field (and so found under the doc property), but pictures can have authors as well. In this instance, the Metadata object would provide both ImageMeta and DocMeta objects.
         * 
         * If the returned string is none it means that no metadata is available for the file, and you should not attempt to access any of the other properties.
         */
        valueOf(): string;
    }

    /** Returns True if the message is valid, or False if the dialog has been closed (which means you should exit your message loop). */
    interface Msg {
        /** Returns a string indicating which mouse button was pressed when the message was generated. Possible values are **left**, **right** and **middle**. */
        buttons: string;
        /** If the event type is **checked**, this indicates the check state of the item. If checkboxes are used in automatic mode, this will be the **new** check state of the item. In manual mode, this will indicate the **existing** state and it's up to you to change the state if desired. 
         * 
         * Check states are:
         * - 0 : unchecked
         * - 1 : checked
         * - 2 : indeterminate
         * - 3 : unchecked/disabled
         * - 4 : checked/disabled
         * - 5 : indeterminate/disabled
        */
        checked: number;
        /** Returns the name of the control involved in the event. You can get a {@link Control} object representing the control by passing this string to the {@link Dialog.Control} method.
         * - For a **timer** event this returns the name of the timer that was triggered.
         * - For a **hotkey** event this returns the name of the hotkey.
         * - For a **drop** event this returns the name of the control that the files were dropped on.
         * - For a **tab** event this tells you which monitored tab the event occurred in (either the ID you assigned in the {@link Dialog.WatchTab} method, or the numeric handle of the tab if you didn't assign an ID).
         * - For a **dirchange** event this tells you which watcher detected a file or folder change (the ID you assigned via the {@link Dialog.WatchDir} method).
         * - If you have added an icon to the taskbar via the {@link Dialog.NotifyIcon} method, notifyicon indicates an event associated with that icon.
         * - For a **http** event this tells you the ID of the {@link HTTPRequest} object.
         * - For a **custom** message, this provides the name of the message.
         */
        control: string;
        /** For **move** and **resize** events, this property returns the new width of the dialog.
         * 
         * The dialog must have *`want_move`* or *`want_resize`* set to receive these events. */
        cx: number;
        /** For **move** and **resize** events, this property returns the new height of the dialog.
         * 
         * The dialog must have *`want_move`* or *`want_resize`* set to receive these events. */
        cy: number;
        /** - If the event type is **focus**, indicates the new focus state of the control - True if the control has gained the focus, or False if it's lost it.
         * - For a *combo box* or *list box* control: If the event type is **selchange** or **dblclk**, returns the data value associated with the selected item.
         * - For a two-state *check box* control or *radio button*: If the event type is **click**, returns a *bool* indicating the current check state. 
         * - For a three-state *check box*: If the event type is **click**, returns an *int* representing the current state. 
         * - For a *date/time picker* control, this value will be **true** if a valid date is selected, or **false** if the date is turned off (only applies if the "Show None" property is enabled). 
         * - If the event type is **timer**, this value indicates the number of milliseconds that have elapsed since the last time this timer was triggered. 
         * - If the event type is **tab**, and the **value** property is set to **filechange**, this indicates which file change events occurred in the monitored tab. **1** = add, **2** = delete, **4** = change. The values will be added together (so e.g. **6** indicates at least one item was changed and at least one was deleted). 
         * - For a **http** event, this value contains the event status code. The **value** property provides the same information as a keyword.
         * - For a **color** event from a palette control, this will be **`0`** for an intermediate color change (e.g. the user has the palette open and is clicking around within it) and **1** for final changes (when the palette window closes). 
         * - For a **custom** message sent from another script, this may be the optional numeric parameter that can be sent with the message. Scripts can also send a container object like a {@link DOpusMap|Map} and this will be found in the **object** property instead. 
         * - For a **hash** message, this provides the request ID returned by the {@link FSUtil.Hash} method. 
         * - For a **key** message, this provides the virtual key code of the pressed key. Virtual key codes are listed [here](https://learn.microsoft.com/en-us/windows/win32/inputdev/virtual-key-codes) */
        data: number | boolean;
        /** Returns the name of the parent dialog. */
        dialog: string;
        /** Returns a string indicating the event that occurred. Currently defined events are:
         * - **checked**     : For a listview control with the ***Checkboxes*** property enabled, indicates that the checkbox of a list item has been clicked.
         * - **click**       : The control was clicked (e.g. a button, check box, radio button, markup text or static control with ***Notify Clicks*** property enabled). For a *list edit* control, the **data** value will be `1` for the reset button and `2` for the options button.
         * - **clipboard**   : Sent whenever the system clipboard contents change, once monitoring has been enabled with the {@link Dialog.WatchClipboard} method.
         * - **close**       : The user clicked the dialog's close button. Only generated if the {@link Dialog.want_close} property has been set to True. You'll need to close the dialog manually using the {@link Dialog.EndDlg} method.
         * - **color**       : A new color has been chosen in a palette control.
         * - **custom**      : A custom message sent from another script. The message name can be found in the **name** property.
         * - **datetime**    : The date has changed in a date/time picker control.
         * - **dblclk**      : An item in the list was double-clicked (list box, combo box or list view) or the control was double-clicked (static control with ***Notify Clicks*** property enabled).
         * - **delete**      : The delete button has been clicked on an item in a *list edit* control.
         * - **dirchange**   : A file or folder that you established monitoring of via the {@link Dialog.WatchChanges} method has changed. The **control** property tells you which watcher was triggered.
         * - **drag**        : The user has initiated a drag and drop from a static or list view control. You can respond by calling the {@link Dialog.Drag} method. The ***Drag Source*** property must be enabled on the control for this event to be generated.
         * - **drop**        : Files were dropped onto your dialog. The dialog template must have its ***Accept Drops*** property set to True to enable drag & drop support.
         * - **editchange**  : The contents of an edit field were modified. For a list view this event indicates that the label of a list item was edited.
         * - **enter**       : The Enter key was pushed in an *edit* control with the ***Enter*** property enabled).
         * - **focus**       : The control gained or lost focus.
         * - **hash**        : An asynchronous hash calculation requested via {@link FSUtil.Hash} has returned.
         * - **hotkey**      : A key combination added as a hotkey with the {@link Dialog.AddHotkey} method has been pressed.
         * - **http**        : An event associated with a {@link HTTPRequest} has occurred.
         * - **invalid**     : The dialog has been closed
         * - **key**         : A key was pressed in a control. Currently only supported by list view controls.
         * - **mode**        : The mode has changed in a *list edit* control (the "edit as text" option has been changed).
         * - **move**        : The dialog was moved. Only generated if the {@link Dialog.want_move} property has been set to True. Related to **resize** event below.
         * - **rclick**      : An item in the list was right-clicked (list box, list view) or the control was right-clicked (static control with ***Dialog.NotifyClicks*** property enabled, or button control with the ***RightButton*** property enabled).
         * - **push**        : A button with the **Arrow** and **Split** properties both set to true will generate this message when the arrow part of the button is clicked.
         * - **resize**      : The dialog was resized. Only generated if the {@link Dialog.want_resize} property has been set to True. Don't mix manual and automatic resizing with the same control: If you move or resize a control in response to this event, the control should not have any of the **resize** flags set in the dialog editor.
         * - **selchange**   : The selection was changed (list box, combo box, list view or tab).
         * - **tab**         : An event has occurred in a tab monitored using the {@link Dialog.WatchTab} method.
         * - **timer**       : A periodic timer created with the {@link Dialog.SetTimer} method has elapsed. */
        event: string;
        /** Returns True if the control had focus when the message was generated. */
        focus: boolean;
        /** Returns the current selection index for a *combo box*, *list box* or *tab* control. */
        index: number;
        /** Returns the horizontal position of the mouse cursor when the message was generated. */
        mousex: number;
        /** Returns the vertical position of the mouse cursor when the message was generated. */
        mousey: number;
        /** An alias for the **control** property. */
        name: string;
        /** For a **drop** event, this property returns a {@link Vector} of {@link Item} objects, representing the files that were dropped onto your dialog. 
         * 
         * For a **custom** message sent from another script, this may be the optional container object (e.g. a {@link DOpusMap|Map}) that can be sent with the message. Scripts can also send a numeric parameter and this will be found in the **data** property instead. 
         * 
         * For a date/time picker control, this property returns a {@link DOpusDate|Date} object when a new valid date is chosen. 
         * 
         * For a **hash** message this returns the calculated hash value; it will either be a string, or a {@link Vector} of strings, depending on how many hash methods were requested in the call to {@link FSUtil.Hash}. */
        object: any;
        /** Returns a string indicating the qualifier keys (if any) that were held down when the message was generated. 
         * 
         * The string can contain any or all of the following: *shift*, *ctrl*, *alt*, *lwin*, *rwin*
         * 
         * If no qualifiers were down, the string will be: *none* */
        qualifiers: string;
        /** Returns True if the message is valid, or False if the dialog has been closed. */
        result: boolean;
        /** Returns the subitem (column) number for listview controls with **rclick** and **dblclk** events. */
        subitem: number;
        /** For a dialog tab control, returns the name of the parent tab (if the control is on a dialog that's inside a tab control). 
         * 
         * If the event type is **tab**, this returns a {@link Tab} object representing the monitored tab that the event occurred in. Calling this repeatedly may be inefficient. */
        tab: string;
        /** - For the **dblclk**, **editchange** and **selchange** events, returns the current contents of the edit field (or selected item label). 
         * - For the **tab** event, indicates which event occurred in the monitored tab. Possible values are **select**, **navigate**, **filechange**, **activate**, **srcdst**, **view**, **flat**, and **close** (sent if the tab is closed while you are monitoring it). 
         * - For the **drag** event, this indicates which button is being used to drag (**left** or **right**). 
         * - For a **click** event from a markup text control, this indicates the ID of the clicked link. 
         * - For a **http** event, this indicates the current http status code. 
         * - For a **color** event from a palette control, this will be the selected color as either a hex or decimal string (depending on the control property). If the palette button's checkbox is disabled, this will be prefixed by a `**!**` character. 
         * - For a **date/time** picker control, this returns the textual value of the selected date or time. The `object` property returns a {@link DOpusDate|Date} object, which may be more useful. 
         * - For a **key** message this provides the pressed key in text form (e.g. "space"). */
        value: string;
        /** For **move** and **resize** events, this property returns the new x position of the dialog. May be negative on multi-monitor systems.
         * 
         * The dialog must have `want_move` or `want_resize` set to receive these events. */
        x: number;
        /** For **move** and **resize** events, this property returns the new y position of the dialog. May be negative on multi-monitor systems.
         * 
         * The dialog must have `want_move` or `want_resize` set to receive these events. */
        y: number;
    }

    interface OpenListerData {
        /** Initially this is set to False, indicating that the event has been called before any tabs have been created. If you return True from the {@link OpusOnOpenLister|OnOpenLister} event, it will be called again and **after** will be set to True to indicate all tabs have been created. */
        after: boolean;
        /** Returns a {@link Lister} object representing the newly opened Lister. */
        lister: Lister;
        /** Returns a string indicating any qualifier keys that were held down by the user when the event was triggered.  
         * 
         * The string can contain any or all of the following: *shift*, *ctrl*, *alt*, *lwin*, *rwin*
         * 
         *   If no qualifiers were down, the string will be: *none* */
        qualifiers: string;
    }

    interface OpenTabData {
        /** Returns a string indicating any qualifier keys that were held down by the user when the event was triggered.  
         * 
         * The string can contain any or all of the following: *shift*, *ctrl*, *alt*, *lwin*, *rwin*
         * 
         * If no qualifiers were down, the string will be: *none* */
        qualifiers: string;
        /** Returns a {@link Tab} object representing the newly opened tab. */
        tab: Tab;
    }

    interface OtherMeta {
        /** An automatically generated description string for the item. This is the same string that is shown in the Description column in a Lister. Opus automatically generates the description for various types of files using the other metadata in ways that make the most sense. */
        autodesc: string;
        /** For a folder, the size of which has been calculated via `GetSizes` or similar, this provides the number of sub-folders directly underneath the folder. */
        dircount: number;
        /** Similar to **dircount**, this provides the total number of sub-folders underneath the folder (this is a recursive count - it includes sub-sub-folders, sub-sub-sub-folders, etc.) */
        dircounttotal: number;
        /** For a folder, the size of which has been calculated via `GetSizes` or similar, this provides the number of files directly located in that folder. */
        filecount: number;
        /** Similar to **filecount**, this provides the total number of files in the folder and all its sub-folders, sub-sub-folders, etc. */
        filecounttotal: number;
        /** For a folder, the size of which has been calculated via `GetSizes` or similar, this returns a string giving a summary of the contents of the folder. */
        foldercontents: string;
        /** A description automatically generated for the item by its parent virtual file system. */
        nsdesc: string;
        /** Returns the user-assigned rating for this file or folder. */
        rating: number;
        /** Returns a {@link Path} object representing the target path of shortcuts and links. */
        target: Path;
        /** Returns a *string* indicating the type of the link (*unknown*, *linkfile*, *dosfile*, *url*, *junction*, *softlink*). */
        target_type: string;
        /** Returns the user-assigned description for the file or folder. */
        usercomment: string;
    }

    interface PairedFolder {
        /** Returns True if the *Default dual display folder* option is on for the pair. */
        dual: boolean;
        /** Returns True if the *Default Navigation Lock target* option is on for the pair. */
        dualnavlock: boolean;
        /** Returns a string indicating the setting of the *If non-existent* option. Valid values are **gotoparent**, **ignorepair** and **useanyway**. */
        ifnonexistent: string;
        /** Returns True if the *Turn on Navigation Lock automatically* option is on for the pair. */
        navlock: boolean;
        /** If the initial paired folder didn't exist and so the returned path is a parent folder (as a result of the *If non-existent* option), this property tells you how many levels above the initial pair the returned folder is. */
        parent_level: number;
        /** Returns a {@link Path} object which provides the paired folder. */
        path: Path;
        /** Returns True if the *Always display primary folder at the left/top* option is turned on. */
        primaryonleft: boolean;
        /** Returns True if the *Default Synchronize target* option is turned on for the pair. */
        sync: boolean;
        /** Returns True if the *Apply Settings to all sub-folders* option is on. */
        subfolders: boolean;
        /** Returns True if the paired folder is valid. */
        valid: boolean;
    }

    /** Returns the full path as a string. */
    interface Path {
        /** Returns the number of components in the path. */
        components: number;
        /** Returns a {@link Vector} of *int* representing the physical disk drive or drives that this path resides on. */
        disks: Vector<number>;
        /** Returns the drive number the path refers to (1=A, 2=B, etc.) or 0 if the path does not specify a drive. You can also change the drive letter of the path (while leaving the following path components alone) by modifying this value. */
        drive: number;
        /** Returns the filename extension of the path (the sub-string extending from the last `.` in the final component to the end of the string). This method does not check if the path actually refers to a file. 
         * 
         * You can also change a path's file extension by setting this property (and strip the extension altogether by setting it to an empty string). */
        ext: string;
        /** Returns the filename extension of the path, taking multi-part extensions into account. For example, **ext** might return ".rar" whereas **ext_m** would return ".part1.rar". 
         * 
         * You can't change the extension using ext_m, only ext. */
        ext_m: string;
        /** Returns the filename part of the path (the last component). */
        filepart: string;
        /** If this object represents a short pathname, this property returns the "long" equivalent. */
        longpath: Path;
        /** Returns the path minus the last component. */
        pathpart: string;
        /** If this object represents a long pathname, this property returns the "short" equivalent, if it has one. Note that short paths are disabled by default in Windows 10. */
        shortpath: Path;
        /** Returns the filename stem of the path (i.e. **filepart** minus **ext**). */
        stem: string;
        /** Returns the filename stem taking multi-part extensions into account. For example, **stem** might return "pictures.part1" whereas **stem_m** would return "pictures". */
        stem_m: string;
        /** Returns True if a call to the {@link Parent} method would succeed. */
        test_parent: boolean;
        /** Returns True if a call to the {@link Root} method would succeed. */
        test_root: boolean;
        /** Adds the specified name to the path (it will become the last component). As well as a string, you can pass a {@link Vector} of strings and all items in the vector will be added to the path. */
        Add(name: string | Vector<string>): void;
        /** Returns a {@link Drive} object for the path, or `false` if the path doesn't contain a drive letter. */
        GetDrive(): Drive | boolean;
        /** Normalizes the path by:
         * - Converting all forward-slashes to back-slashes (or vice versa for a URL)
         * - Collapsing duplicate slashes to a single slash (except where needed)
         * 
         * **Normalize** is automatically called when a new path string is assigned to a **Path** object so you don't normally need to call it manually. */
        Normalize(): void;
        /** Removes the last component of the path. Returns False if the path does not have a valid parent. */
        Parent(): boolean;
        /** Compares the beginning of the path with the "old" string, and if it matches replaces it with the "new" string. The match is performed at the path component level - for example, an "old" string of "C:\Foo" would match the path "C:\Foo\Bar" but not "C:\FooBar". If the optional *wholepath* argument is set to True then the whole path must match rather than just its beginning. Returns True if the string matched the path or False otherwise. */
        ReplaceStart(oldStart: string, newStart: string, wholepath?: boolean): boolean;
        /** Resolves the specified path string to its real filesystem path, with support for converting:
         * - **Folder Aliases** to the real paths they point to.
         * - **Library** and **File Collection** items to their real filesystem paths.
         * - Application paths in the **{apppath|*appname*}** form.
         * - Environment variables.
         * - Optionally, **junctions** and **symbolic links** can be resolved to their targets.The {@link Path} object is modified in-place.
         * 
         * It is safe to pass a path which does not need resolving; the path will remain as-is, so you can call this on things without checking if it is needed first. 
         * 
         * Scripts which pass the current directory to external software should generally call Resolve on the path first, otherwise they risk passing aliases like *\/desktop* to things which won't understand them. 
         * 
         * The optional **flags** string can include the following letter (not case-sensitive):
         * - j : resolve junctions and symbolic links to their target folder
         * 
         * Note that {@link DOpus.FSUtil} has a similar **Resolve** method which takes a string input and returns a new **Path** object. */
        Resolve(flags: string): void;
        /** Strips off all but the first component of the path. Returns False if the path is already at the root. */
        Root(): boolean;
        /** Sets the path represented by the **Path** object to the specified *string*. 
         * 
         * You can also set one **Path** object to the value of another.
         * If you pass a {@link Vector} of strings the path will be built from the items in the vector. */
        Set(path: string | Path | Vector<string>): void;
        /** Returns a {@link Vector} of strings representing the components of the path. For example, if the path is **`C:\Foo\Bar`**, the vector will contain three items - **`"C:\"`**, **`"Foo"`**, and **`"Bar"`**. By default all components of the path are returned, but you can optionally provide the index of the first component and also the number of components to return. */
        Split(first: number, count: number): Vector<string>;
        /** If the path begins with the drive letter of a mapped network drive, it will be converted into the UNC version of the path. For example, **`"X:\Test"`** may map to **`"\\Server\Share\Test"`**. 
         * 
         * Returns True if the path was modified and False if it was not. */
        ToUNC(): boolean;
    }

    interface PeriodicTimerData {
        /** Returns the ID of the timer that your method is being called for. */
        id: string;
    }

    /** The PermanentFilters object provides information about the permanent file and folder filter settings (configured on the Permanent Filters page in Preferences). It is obtained from the GlobalFilters.permanent property. */
    interface PermanentFilters {
        /** Returns True if the permanent wildcard filters are enabled. */
        enable: boolean;
        /** Returns the permanent filename filter wildcard pattern. If the wildcard is configured to use regular expressions, it will have a **regex:** prefix in front of the pattern. */
        file: string;
        /** Returns the permanent folder filter wildcard pattern. If the wildcard is configured to use regular expressions, it will have a **regex:** prefix in front of the pattern. */
        folder: string;
    }

    interface PowerEventData {
        /** Returns data for this event. The meaning of this property varies depending on the value of the **type** property. */
        data: string;
        /** Returns the power event type. Possible events are:
         * - battery     : The remaining battery capacity has changed. The current battery capacity is provided in the `data` property.
         * - display     : The display state has changed. The `data` property will equal "*on*", "*dimmed*" or "*off*".
         * - resume      : The system has resumed from sleep or hibernation.
         * - saver       : Battery saver mode state has changed. The `data` property will equal "*on*" or "*off*".
         * - source      : The power source has changed. The `data` property will equal "*battery*", "*ups*" or "*ac*".
         * - suspend     : The system is about to enter sleep or hibernation.
        */
        type: string;
    }

    interface Progress {
        /** Before calling **Init**, set to True if the *Abort* button should be available, or False to disable it. */
        abort: boolean;
        /** Before calling **Init**, set to True if the dialog should show progress in bytes rather than whole files. */
        bytes: boolean;
        /** Before calling **Init**, set to True if the dialog should delay before appearing after the **Show** method is called. The delay is configured by the user in Preferences. */
        delay: boolean;
        /** Before calling **Init**, set to True to enable a "full size" progress indicator with two separate progress bars (one for files and one for bytes). */
        full: boolean;
        /** Before calling **Init**, set to True if the dialog should be owned by its parent window (the parent is given later, when the dialog is created via the **Init** method). */
        owned: boolean;
        /** Before calling **Init**, set to True if the *Pause* button should be available. */
        pause: boolean;
        /** Before calling **Init**, set to True if the *Skip* button should be available. (This just makes it so the *Skip* button can be enabled. You must still call **EnableSkip** later to actually enable it; usually once per file.) */
        skip: boolean;

        /** Adds the specified number of files to the operation total. The *bytes* argument is optional - in a "full size" progress indicator this lets you add to the total byte size of the operation. */
        AddFiles(count: number, bytes: FileSize): void;
        /** Clears the state of the three "control" buttons (*Abort* / *Pause* / *Skip*) so they no longer register as being clicked when **GetAbortState** is called.  
         * 
         * If you only want to clear the *Skip* state, you should normally do that as part of a call to **EnableSkip** instead. That way you avoid accidentally clearing one of the other states if they become set between you calling **GetAbortState** and **ClearAbortState**. In fact, there are very few situations where you should call **ClearAbortState**. */
        ClearAbortState(): void;
        /** Enables the progress dialog's *Skip* button. For **EnableSkip** to work, you must have set the **skip** property to True before the progress dialog was created by the **Init** method.  
         * - **enable**: If True, the *Skip* button should be enabled; otherwise, it should be disabled.  
         * - **delay** (optional, True by default): If True, there will be a short delay before the *Skip* button is enabled, with it temporarily disabled during the delay; otherwise, the change is instant. See below for why a delay is usually a good idea.  
         * - **clear** (optional, True by default): If True, any record of the user pushing the *Skip* button will be cleared, such that **GetAbortState** no longer returns "**s**". You usually want this if the progress dialog just moved to a new item.  
         * 
         * If you support the *Skip* button, you should normally call **EnableSkip** once per file, just after you call **SetName** and similar methods. When used that way, you'll usually want **delay** and **clear** to both be True, otherwise clicks of the *Skip* button intended for one file could affect the file(s) that come after it. For example, if a file takes a long time but then finishes just as the user gets tired of waiting and clicks *Skip*, the delay and cleared state ensure the unwanted click is harmless. */
        EnableSkip(enable: boolean, delay: boolean, clear: boolean): void;
        /** Finish the current file. If the byte size of the current file has been set the total progress will be advanced by any remaining bytes. */
        FinishFile(): void;
        /** Polls the state of the three "control" buttons. This returns a *string* that indicates which, if any, of the three buttons have been clicked by the user. The button states are represented by the following letters in the returned string:
         * - a : Abort
         * - p : Pause
         * - s : Skip 
         * - If none of the states apply, an empty string is returned.
         * 
         * Parameters:
         * - **autoPause** (optional, False by default): If True, pausing is handled for you automatically. Calls to **`GetAbortState(True)`** block while paused and don't return until unpaused; the "**p**" state is never returned. (Note that clicking *Skip* or *Abort* will implicitly unpause the operation.)  
         * - **wanted** (optional): If you only want to check one or two of the states, pass a string with their letters. For example, **`GetAbortState(True,"ap")`** will test for the *Abort* and *Pause* states, but not the *Skip* one. All states will be checked if the argument is an empty string or not given at all.  
         * - **simple** (optional, True by default): If True, the result string will have at most one letter, indicating the most important state. If False, it is possible for multiple states to be indicated at once. For example if *Skip* and then *Pause* are clicked, in that order, without the script clearing the *Skip* state, then **`GetAbortState(False,"",False)`** would return "**ps**" while **`GetAbortState(False)`** would return just "**p**".  
         * 
         * To clear the state of the three buttons, call the `ClearAbortState` method. To clear just the *Skip* button's state, use the `EnableSkip` method.
        */
        GetAbortState(autoPause: boolean, wanted: string, simple: boolean): string;
        /** Hides the progress indicator dialog. The dialog object itself remains valid, and can be redisplayed with the **Show** method if desired. */
        Hide(): void;
        /** Hides or shows the "*XX bytes / YY bytes*" string in the progress dialog. You can use this to hide the string if the progress does not indicate a number of bytes (e.g. when it indicates a percentage). Pass True for the show argument to show the string and False to hide it. */
        HideFileByteCounts(show: boolean): void;
        /** Initializes the dialog. This method causes the actual dialog to be created, although it will not be displayed until the **Show** method is called. The fundamental properties shown above must be set before this method is called - once the dialog has been created they can not be altered.  
         * 
         * The *parent* parameter can be either a {@link Tab} or a {@link Lister} - this controls which window the dialog is centered over, and if the **owned** property is set to True which window it is owned by (always appears on top of). If no parent is provided the dialog will not be associated with any particular window.  
         * 
         * The *title* parameter specifies the window title of the dialog. */
        Init(parent: Tab | Lister, title: string): void;
        /** Resets the byte count for the current file to zero. */
        InitFileSize(): void;
        /** Resets the total completed file and byte counts to zero. */
        Restart(): void;
        /** Sets the total completed byte count. */
        SetBytesProgress(bytes: FileSize): void;
        /** Sets the size of the current file. */
        SetFileSize(bytes: FileSize): void;
        /** Sets the total number of files. */
        SetFiles(count: number): void;
        /** Sets the total completed file count. */
        SetFilesProgress(count: number): void;
        /** Sets the text at the top of the dialog that indicates the source and destination of an operation. 
         * - The *header* argument refers to the string that normally says *From:* - this allows you to change it in case that term is not applicable to your action. 
         * - The *from* argument is the source path, and the to argument (if there is one) is the destination path. Note that if you specify a destination path this always has a *To:* header appended to it.  
         * - If you omit the *to* argument entirely (not just passing an empty string), the destination line will become blank, including the *To:* header. Use that if you want the second line to be used sometimes but not always. If you never want anything on the second line, use the **SetStatus** method instead as it will not add space for the extra line. */
        SetFromTo(header: string, from: string, to: string): void;
        /** Sets the name of the current file. */
        SetName(name: string): void;
        /** Sets the current progress as a percentage (from 0 to 100). */
        SetPercentProgress(percent: number): void;
        /** Sets the text displayed in the status line at the top of the dialog.  This sets a single-line status message, while **SetFromTo** can be used to indicate source and destination paths on two lines. */
        SetStatus(status: string): void;
        /** Sets the title of the dialog. */
        SetTitle(title: string): void;
        /** Sets the type of the current item - either *file* or *dir*. */
        SetType(type: string): void;
        /** Displays the progress indicator dialog. Call this once you have created the dialog using the **Init** method. */
        Show(): void;
        /** Skips over the current file. Set the complete argument to True to have the file counted as "complete", or False to count it as "skipped". */
        SkipFile(complete: boolean): void;
        /** Step the byte progress indicator the specified number of bytes. */
        StepBytes(bytes: FileSize): void;
        /** Step the file progress indicator the specified number of files. */
        StepFiles(count: number): void;
    }

    /** Returns the current filter string, if any. */
    interface QuickFilter {
        /** Returns True if the auto-clear mode is set in Preferences. */
        autoclear: boolean;
        /** Returns True if the auto-star mode is set in Preferences. */
        autostar: boolean;
        /** Returns True if the filter is disabled. */
        disable: boolean;
        /** Returns True if easy mode is selected. */
        easymode: boolean;
        /** Returns the current filter string. */
        filter: string;
        /** Returns True if folder filtering in flatview is on. */
        flatview: boolean;
        /** Returns True if all folders are being hidden. */
        hidealldirs: boolean;
        /** Returns True if all files are being hidden. */
        hideallfiles: boolean;
        /** (Legacy flag.) Returns True if folder filtering in flatview is overrriden. Use the **flatview** flag to find out if it is actually on or off. */
        overrideflatview: boolean;
        /** Returns True if partial matching is enabled. */
        partial: boolean;
        /** Returns True if realtime filtering is enabled. */
        realtime: boolean;
        /** Returns True if regular expression mode is enabled. */
        regex: boolean;
        /** Returns True if all folders are being shown. */
        showalldirs: boolean;
        /** Returns True if all files are being shown. */
        showallfiles: boolean;
        /** Returns True if Show Everything mode is on, which overrides (almost) all filtering. */
        showeverything: boolean;
        /** Default Value.
         * Returns the current filter string, if any.
         */
        toString(): string;
        /** Default Value.
         * Returns the current filter string, if any.
         */
        valueOf(): string;
    }

    interface QuickFilterChangeData {
        /** Returns a {@link Tab} object representing the tab the quick filter changed in. */
        tab: Tab;
    }

    interface Rect {
        /** Returns true if the rectangle is empty (i.e. has no height or no width). */
        empty: boolean;
        /** Returns the left edge of the rectangle. */
        left: number;
        /** Returns the top edge of the rectangle. */
        top: number;
        /** Returns the right edge of the rectangle.  
         * 
         * Note that this value is actually 1 outside the right edge. A rectangle includes everything from and including the left edge up to but excluding the right edge.  
         * 
         * A rectangle at position 0,7 with 0 width will have left=0 and right=0. The same but with a width of 1 will have left=0 and right=1, and so on. */
        right: number;
        /** Returns the bottom edge of the rectangle.  
         * 
         * Note that this value is actually 1 outside the right edge. A rectangle includes everything from and including the top edge up to but excluding the bottom edge.  
         * 
         * A rectangle at position 0,7 with 0 height will have top=7 and bottom=7. The same but with a height of 10 will have top=7 and bottom=17, and so on. */
        bottom: number;
        /** Returns the width of the rectangle. Equal to **right-left**. */
        width: number;
        /** Returns the height of the rectangle. Equal to **bottom-top**. */
        height: number;
        /** Returns a string describing the rectangle's position and size, as a convenience when debugging scripts. The format is "(L,T - R,B; WxH)" i.e. Left, Top, Right, Bottom, Width, and Height. */
        ToString(): string;
    }

    interface Results {
        /** This property returns a Collection of {@link FileChange} objects representing any file changes made by the command. 
         * 
         * You must set the `logchanges` property in the {@link Command} object if you want file changes logged. */
        changes: FileChange[];
        /** Indicates whether or not the command ran successfully.
         * - Zero indicates the command could not be run or was aborted; 
         * - any other number indicates the command was run for at least some files. 
         * 
         * (Note that this is not the "exit code" for external commands. For external commands it only indicates whether or not Opus launched the command. If you need the exit code of an external command, use the WScript.Shell Run or Exec methods to run the command.) */
        result: number;
        /** This property returns a Collection of {@link Tab} objects representing any new tabs created by the command. */
        newtabs: Tab[];
        /** This property returns a Collection of {@link Lister} objects representing any new Listers created by the command. */
        newlisters: Lister[];
        /** This property returns a Collection of {@link Viewer} objects representing any new image viewers created by the command. (This is only for standalone viewers, not the viewer pane.) */
        newviewers: Viewer[];
    }

    interface RunResults {
        /** Returns the exit code of the process. */
        exitcode: number;
        /** Returns any data the command wrote to *stdout*. */
        stdout: string;
        /** Returns any data the command wrote to *stderr*. */
        stderr: string;
    }

    interface ScheduledTimerData {
        /** Returns the ID of the timer that your method is being called for. */
        id: string;
    }

    interface Script {
        /** Returns a {@link ScriptConfig} object representing the configuration values for this script. In the {@link OpusOnInit|OnInit} method a script can define the properties that make up its configuration - the user can then edit these values in Preferences. 
         * 
         * The object returned by the **config** property represents the values that the user has chosen. */
        config: ScriptConfig;
        /** Returns the path and filename of this script. */
        file: string;
        /** Returns a {@link Vars} object that represents the variables that are scoped to this particular script. This allows scripts to use variables that persist from one invocation of the script to another. */
        vars: Vars;

        /** If your script implements the {@link OpusOnAddColumns|OnAddColumns} event, you can call the **InitColumns** method at any time to reinitialize your columns. You may want to do this, for example, in response to the user modifying your script's configuration. */
        InitColumns(): void;
        /** If your script implements the {@link OpusOnAddCommands|OnAddCommands} event, you can call the **InitCommands** method at any time to reinitialize your commands. You may want to do this, for example, in response to the user modifying your script's configuration. */
        InitCommands(): void;
        /** Loads an image file from the specified external file. If your script is bundled as a script package you can place image files in a sub-directory of the package called **images** and then load them from your script by giving their name.
         * 
         * If *width* and *height* are not provided, they default to 0, meaning the image is loaded at its native size. The *width* and *height* parameters only specify the desired size; the resultant image may be smaller or larger, and should be scaled after loading if you need it to be an exact size.
         * The main purpose of the *width* and *height* parameters is to influence which image within an icon is loaded; most other image formats either ignore the parameters or only use them to speed things up, such as avoiding a full JPEG decode if a partial decode can satisfy the desired image size. 
         * 
         * Images are loaded transparently (with alpha) by default; set the *alpha* argument to False if you want to disable that.
         * 
         * The returned {@link Image} object can be given as the value of the {@link Control.label} property for a static control in a script dialog (when that control is in "image" mode). You can also assign it to the **icon** property of a {@link Dialog} object to specify a custom window icon for your script dialog. */
        LoadImage(name: string, width?: number, height?: number, alpha?: boolean): Image;
        /** Loads external script resources and makes them available to the script. You can either provide a filename or a raw XML string. If your script is bundled as a script package, the resource file must have a **.odxml** extension for **LoadResources** to be able to find it in the package. */
        LoadResources(filenameOrXML: string): void;
        /** If your script implements any custom columns, you can use this method to cause them to be regenerated if they are currently shown in any tabs. You may want to do this, for example, in response to the user modifying your script's configuration. Pass the name of the column you want to regenerate as the argument to this method. */
        RefreshColumn(name: string): void;
        /** Forces any dynamically-added and context-sensitive script buttons to be refreshed. 
         * 
         * Set the **full** argument to False to only refresh context-sensitive buttons. Set to True to also regenerate dynamic buttons. */
        UpdateButtons(full: boolean): void;
        /** When a script add-in starts up it receives a copy of its current configuration. This method lets you update that copy to reflect any external changes made to the script configuration. */
        UpdateConfig(): void;
        /** Lets a script add-in update the flags for a FAYT extension. This equates to the options shown to the user for the FAYT mode on the Quick Keys Preferences page.
         * 
         * - The *name* should be the name of the FAYT extension command; this is given to your command as the {@link ScriptFAYTCommandData.fayt} property. 
         * - The *flags* value should represent a flag combination that's meaningful to your extension. */
        UpdateFAYTFlags(name: string, flags: number): void;
    }

    interface ScriptColorPair {
        /** Specify the background color. This should be in the form **#RRGGBB** (hexadecimal) or **RRR,GGG,BBB** (decimal). */
        backcolor: string;
        /** Specify the text color. This should be in the form **#RRGGBB** (hexadecimal) or **RRR,GGG,BBB** (decimal). */
        textcolor: string;
    }

    interface ScriptColumn {
        /** If this is set to True (which is the default), and the file display is grouped by this column, Opus will generate the groups automatically based on the column value. If you set this to False, Opus will expect you to provide grouping information in your {@link OpusOnScriptColumn|OnScriptColumn} function. */
        autogroup: boolean;
        /** Set to True (or **`1`**) to force Opus to update the value for this column when a file changes. You can also set this value to **`2`** to force Opus to update the value when the file's attributes change (normally it would only update if the file modification time or size changed). */
        autorefresh: boolean | number;
        /** Set to True to have this column blurred when taking a secure screenshot. */
        blurrable: boolean;
        /**
         * By default script columns appear in the **Script** category, but if you set this value you can make them appear in one of the other column categories.
         * 
         * Possible valuesfor keywords (and their associated categories):
         *  - "sums" (Checksums)
         *  - "date" (Date and Time)
         *  - "doc" (Documents)
         *  - "eval" (Evaluator)
         *  - "std" (General)
         *  - "movie" (Movies)
         *  - "music" (Music)
         *  - "loc" (Name and Path)
         *  - "other" (Other)
         *  - "dims" (Picture Dimensions)
         *  - "image" (Picture Metadata)
         *  - "prog" (Programs)
         *  - "shell" (Shell)
         *  - "size" (Size and Count)
         */
        category: 'sums' | 'date' | 'doc' | 'eval' | 'std' | 'movie' | 'music' | 'loc' | 'other' | 'dims' | 'image' | 'prog' | 'shell' | 'size';
        /** This property lets you control the default sort behavior for your column. 
         * 
         * Normally when the user clicks the column header to sort by a column the column is initially sorted in ascending order, and then clicking again reverses the sort order. If you set **defsort** to -1, the first click on the column header will sort in descending order. Date and size fields have this behavior set by default. */
        defsort: number;
        /** Specifies a default width for your column, which will be used unless the file display has auto-sizing enabled. If you specify a simple integer value this represents a width measured in average characters (e.g. 12 specifies 12 average characters wide). You can also specify an absolute number of pixels by adding the *px* suffix (e.g. "*150px*" specifies 150 pixels). */
        defwidth: number | string;
        /** Lets you control how the column is "ellipsised"; that is, what happens when its contents are too wide to fit in the column.
         * By default, the end of the string is replaced with an ellipsis (…). Available flags are:
         * - m : Use middle ellipsis instead of end ellipsis
        */
        ellipsis: string;
        /** For graph columns, specifies the first graph color set. The graph will be displayed in these colors as long as its percentage is below the threshold.  
         * 
         * You can either specify a single color (in *r,g,b* or *#rrggbb* format), in which case the graph will be a flat solid color, or exactly five colors to configure the graph's gradient. In the second case, the five colors correspond to *outer bright*, *inner bright*, *inner dark*, *outer dark*, and *flat*. The first four control the gradient and the fifth (flat) is used when gradients are disabled.  
         * 
         * The **graph_colors** property returns a {@link Vector}; you need to use the **push_back()** method to add your colors to it. */
        graph_colors: Vector;
        /** Similar to **graph_colors**, this property lets you configure a second set of colors for a graph column that will be used when the graph value exceeds the threshold. */
        graph_colors2: Vector;
        /** For graph columns, specifies the percentage threshold at which the graph will switch from the first color set to the second (e.g. a blue graph goes red to indicate a drive is nearly full). Set the threshold to **-1** to disable the second color set altogether. */
        graph_threshold: number;
        /** If the **autogroup** property is set to False, the **grouporder** property lets you control the order your column's groups appear in. Each group should be listed in the string in the desired order, separated by a semi-colon (e.g. *"Never Modified;Modified"*). If not provided, groups will default to sorting alphabetically. */
        grouporder: string;
        /** If this property is set, this defines the string that will be displayed in the column header when this column is added to a Lister. If not set, the **label** value will be used. */
        header: string;
        /** Set this to True if you  want your column to be only available for use in Info Tips. You might want this if your column takes a significant amount of time to return a value, in which case the user would probably only want to use it in an Info Tip so they can see the value on demand. If set to False (the default) the column will be available everywhere. */        
        infotiponly: boolean;
        /** This field lets you control the justification of your column. If not specified, columns default to left justify. Acceptable values are *center*, *left*, *right* and *path*. */
        justify: string;
        /** If this is set to True, and the user has the **Sort-field specific key scrolling** Preferences option enabled, then your column will participate in this special mode. */
        keyscroll: boolean;
        /** Use this to set a label for the column. 
         * 
         * This is displayed in the column header when the column is added to a Details/Power mode file display (unless overridden by the **header** property), and in various column lists such as in the `Folder Options` dialog. */
        label: string;
        /** If you add strings to this {@link Vector} (e.g. via the **push_back** method) it will be used to provide a drop-down list of possible values when searching on this column using the `Advanced Find` function. */
        match: Vector<string>;
        /** If the column type is set to *stars* this property lets you specify the maximum number of stars that will be used. This is used to ensure the column is sized correctly. */
        maxstars: number;
        /** This is the name of the method in your script that provides the actual values for your new column. This would typically be set to *OnXXXXX* where *XXXXX* is the name of the command, however any method name can be used. 
         * 
         * When the method is invoked it is passed a single argument, a {@link ScriptColumnData} object. Generically this method is referred to as {@link OpusOnScriptColumn|OnScriptColumn}. */
        method: string;
        /** If your script implements multiple columns that require common calculations to perform, you may wish to set the **multicol** property. If this is set to True then your column handler function has the option of returning data for multiple columns simultaneously, rather than just the specific column it is being invoked for.
         * 
         * When your handler is called, the {@link ScriptColumnData} object won't contain the usual **group**, **sort**, **type** and **value** properties. Instead, it will have a **columns** property that points to a {@link DOpusMap|Map} that lets you set the values for one or more of your columns at once. 
         * 
         * For example, you might set the value of a column called MyColumn like this:
         * 
         *  ```scriptColData.columns("MyColumn").value = "My Column Value";``` */
        multicol: boolean;
        /** This is the raw name of the column. This determines the name that can be used to control the column programmatically (for example, the **`Set COLUMNSTOGGLE`** command can be used to toggle a column on or off by name).
         * 
         * The name of a custom column is built from a combination of the name of the script that provides the column and the raw name of the column itself, and is preceded by the prefix *scp:*. 
         * 
         * For example, if your script were called *My Script* and your column's name were *My Column*, you could toggle this column using the command **`Set COLUMNSTOGGLE="scp:My Script/My Column"`**. You can use the button editor menus to build the command automatically, if you are unsure of anything. */
        name: string;
        /** Set to True to force Opus to update the value for this column when a file's name changes. */
        namerefresh: boolean;
        /** Set to True to prevent the file display being grouped by this column. */
        nogroup: boolean;
        /** Set to True to prevent the file display being sorted by this column. */
        nosort: boolean;
        /** Time, in milliseconds, before Opus may give up waiting for calculation of a column value.  Defaults to 10000 (i.e. 10 seconds). Set to 0 (zero) to force Opus to wait forever in all situations.  
         * 
         * The timeout is not always applicable. When Opus asks a script for column data to show in a file display, the timeout is not used because the calculation happens in the background and doesn't hold anything up. But Opus can give up waiting if a column takes too long in situations where it does hold up other things. This is to avoid blocking forever when scripts get stuck in infinite loops.  Find filters and the Print/Export Folder Listing dialog are two examples which use the timeout when requesting data from script columns. A column which calculates hashes of files with no size limit is an example which could be expected to take a long time and where it would make sense to increase the timeout or set it to 0. */
        timeout: number;
        /** This field lets you set the default type of the column. If not specified, columns default to plain text. 
         * Acceptable values are:
         * - **number**      : The column displays integer numbers
         * - **double**      : The column displays floating point (fractional) numbers
         * - **size**        : The column displays file sizes (automatically displays bytes, KB, MB, etc.)
         * - **zip**         : The column displays file sizes (uses the settings for Zip file sizes)
         * - **duration**    : The column displays a duration (expects a value in seconds). Hours are only shown if needed.
         * - **durationh**   : The column displays a duration. Hours are always shown.
         * - **graph**       : The column displays a bar graph (expects a value from 0 to 100)
         * - **graphrel**    : The column displays a bar graph. Opus automatically keeps track of the minimum and maximum values provided and scales the graph accordingly
         * - **graphrel0**   : Similar to graphrel except the minimum value is always 0, and Opus keeps track of the maximum value
         * - **igraph**      : The column displays an inverted bar graph
         * - **igraphrel**   : Inverted relative bar graph
         * - **igraphrel0**  : Inverted bar graph relative to 0
         * - **percent**     : The column displays a percentage
         * - **percentrel**  : Relative percentage
         * - **percentrel0** : Percentage relative to 0
         * - **date**        : The column displays a date
         * - **time**        : The column displays a time
         * - **datetime**    : The column displays both a date and a time
         * - **stars**       : The column displays stars (similar to the built-in Rating column)
         * 
         * For plain text columns, you can specify **numericsort** or **nonumericsort** to override the "numeric order filename sorting" setting in Folder Options. Similarly, **wordsort** or **nowordsort** can be used to override the "word sort (special handling for hyphens, etc.)" setting. 
         * You can also combine both options, e.g. **nonumericsort**,**nowordsort** to request only basic sorting. Leave the type unset, or set it to an empty string, for plain text data which respects the Folder Options sort settings. 
         * 
         * For *date*, *time* and *datetime* columns, you can also specify utc to have the values automatically converted from UTC to local time (e.g. **datetime**,**utc**). 
         * 
         * For number and double columns, you can also specify **signed** to have the values treated as signed rather than unsigned (e.g. **number**,**signed**). 
         * 
         * For the graph columns, you can use **graph_colors**, **graph_colors2** and **graph_threshold** to configure the graph's appearance. 
         * 
         * Your {@link OpusOnScriptColumn|OnScriptColumn} method can override the type on a per-file basis, however this field sets the default type and also controls the behavior of the Advanced Find function when searching using your column.
         */
        type: string;
        /** Allows you to associate a data value with a column. The value will be passed to your column handler in the ScriptColumnData.userdata property */
        userdata: any;
    }


    interface ScriptColumnDataCore {
        /** Provides the name of the column that Opus wants the script to return the value for. If you use the same {@link OpusOnScriptColumn|OnScriptColumn} method to provide multiple columns you can use this to tell the columns apart. */
        col: string;
        /** If the {@link ScriptColumn.autogroup} value is set to False when the column is added, you should set this value to indicate the group that this file should be placed in when the list is grouped by your column. If you don't provide a group then this file will go into the Unspecified group. If **autogroup** is set to True this value is ignored. 
         * 
         * Note that if the {@link ScriptColumn.multicol} value is set to True when the column is added then this property will be found inside the **columns** {@link DOpusMap|Map}. */
        group: string;
        /** If the group is set via the **group** property, **group_type** lets you control the formatting of the group title using the same keywords as the **type** field (e.g. you can supply a number and have the group title formatted as a file size by setting *group_type="size"*). 
         * 
         * Note that if the {@link ScriptColumn.multicol} value is set to True when the column is added then this property will be found inside the columns {@link DOpusMap|Map}. */
        group_type: string;
        /** Lets you provide text for a column containing simple HTML markup, which will be shown instead of `value` in contexts that support it (e.g. in a tooltip). You should still provide `value` as well, as this is what will be shown in the file display columns. */
        markup: string;
        /** Lets you control the sort order of your column by providing a sort key that can be different to the **value**. If provided, and the list is sorted by your column, Opus will use the value of this field to position this item rather than the **value** value. 
         * 
         * Note that if the {@link ScriptColumn.multicol} value is set to True when the column is added then this property will be found inside the **columns** {@link DOpusMap|Map}. */
        sort: any;
        /** Lets you override the default type of the column (set via {@link ScriptColumn.type} when the column was added) on a per-file/folder basis.  
         * If not specified, and no default was specified either, then columns default to plain text.  
         * Note that if the {@link ScriptColumn.multicol} value is set to True when the column is added then this property will be found inside the **columns** {@link DOpusMap|Map}. 
         * Acceptable values are:
         * - **number**      : The column displays integer numbers.
         * - **double**      : The column displays floating point (fractional) numbers.
         * - **size**        : The column displays file sizes (automatically displays bytes, KB, MB, etc.)
         * - **zip**         : The column displays file sizes (uses the settings for Zip file sizes).
         * - **graph**       : The column displays a bar graph (expects a value from 0 to 100).
         * - **igraph**      : The column displays an inverted bar graph.
         * - **percent**     : The column displays a percentage.
         * - **date**        : The column displays a date.
         * - **time**        : The column displays a time.
         * - **datetime**    : The column displays both a date and a time.
         * - **stars**       : The column displays stars (similar to the built-in *Rating* column). The **value** should be in the form "x" or "x/y".
         * 
         * For *date*, *time* and *datetime* columns, you can also specify utc to have the values automatically converted from UTC to local time (e.g. **datetime**,**utc**). 
         * 
         * For *number* and *double* columns, you can also specify **signed** to have the values treated as signed rather than unsigned (e.g. **number,signed**). 
         * 
         * The options above are a subset of those you can specify via {@link ScriptColumn.type}, since not all options make sense on a per-file/folder basis. 
         * Note that if you mix different types within the one column then the results you get when sorting by this column, or searching on your column using the **Advanced Find** function, may be hard to predict.
        */
        type: string;
        /** This field is how your method returns the actual value for your column - that is, the information that is displayed to the user in this column for each file and folder. 
         * 
         * If the type for this column has been set (either by **ScriptColumnData.type** or {@link ScriptColumn.type}) then Opus will try to convert the provided value to the specified type. If the type is not set then Opus will treat the value as a plain text string. 
         * 
         * If you don't provide a sort key via the **sort** field then Opus will also use this value to order the list when the list is sorted by this column. 
         * 
         * Note that if the {@link ScriptColumn.multicol} value is set to True when the column is added then this property will be found inside the **columns** {@link DOpusMap|Map}. */
        value: any;
        /** This returns the value associated with this column via {@link ScriptColumn.userdata} (if any) when the column was added. 
         * 
         * Note that if the {@link ScriptColumn.multicol} value is set to True when the column is added then this property will be found inside the **columns** {@link DOpusMap|Map}. */
        userdata: any;
    }


    interface ScriptColumnData extends ScriptColumnDataCore {
        /** If the {@link ScriptColumn.multicol} value is set to True when the column is added, then this property provides a {@link DOpusMap|Map} that lets you return the values of one or more columns at once.
         * 
         * You may want to use this method if your script returns multiple columns that all share common calculations (e.g. reading the contents of a folder). That way, you can avoid repeating potentially time consuming operations when you're called for the second and subsequent columns. 
         * 
         * The {@link DOpusMap|Map} contains one member element for each of your columns. Each member element has `group`, `group_type`, `sort`, `type`, `userdata`, `markup` and `value` properties which are equivalent to the ones described below.
         * 
         * For example, you might set the value of a column called *MyColumn* like this:
         * ```
         *     scriptColData.columns("MyColumn").value = "My Column Value";
         * ```
         * 
         * You should check if a column exists in the map before populating data for it. In some situations, Opus will only request a some of the columns your add-in supports, not all of them. 
         * 
         * If you do not fill in data for a column which Opus still needs, Opus will call your method again to request it, with its name in the col property (but still in multi-column mode). You can take advantage of this if calculating one piece of data yields values for some of your columns but not all of them. You do not need to populate every column if the data is not available, but you should at least populate the `col` column. 
         * 
         * As a consequence of the above, when using multi-column mode you should always set some kind of value for any column you have spent time calculating, even if the result of the calculation is that nothing should be shown in the column. If nothing should be shown, set the value to an empty string (this is fine even if the column normally displays numbers or another type of data). If you don't set any value at all, Opus will assume you haven't calculated that column yet and may call your script again to ask for it, which could cause you to waste time re-calculating it when you already know it is blank. */
        columns: DOpusMap<string, ScriptColumnDataCore>;
        /** Returns an {@link Item} object representing the file or folder that Opus wants the script to return the column value for. */
        item: Item;
        /** Returns a {@link Tab} object representing the tab that contains the item. */
        tab: Tab;
    }


    interface ScriptCommand {
        /** Lets you flag one or more command arguments as needing context-sensitive state. For example, you may want a toolbar button to appear highlighted, or disabled, in certain situations. The argument names (comma-separated) must correspond to arguments given by the *template* property.
         * 
         * When your command is placed on a toolbar or menu with the appropriate arguments, your script's {@link OpusOnButtonContext|OnButtonContext} method will be called to update the button state. You can set this value to `*` to indicate that all arguments require context sensitivity. */
        context_args: string;
        /** Use this to set a description for the command, that is displayed in the **Customize** dialog when the user selects the command from the **Commands tab**. */
        desc: string;
        /** Lets you flag one or more command arguments as generating dynamic buttons. The argument names (comma-separated) must correspond to arguments given by the *template* property. 
         * 
         * When your command is placed on a toolbar or menu with the appropriate arguments, your script's {@link OpusOnAddButtons|OnAddButtons} method will be called to generate one or more dynamic buttons. You can set this value to `*` to indicate that all arguments generate dynamic buttons. */
        dynamic_args: string;
        /** Specifies various flags which affect how your script command runs. If not provided, the default is "sd".
         * - s   : want source folder (will still run without one)
         * - S   : need source folder (will not run without one)
         * - d   : want destination folder
         * - D   : need destination folder
         * - L   : need Lister
         * - f   : want selected files
         * - F   : want selected folders
         * - N   : need selected entries (either files/folders or both depending on other flags)
         * - w   : don't swap source/destination folder if command is run against the destination */
        flags: string;
        /** Returns a {@link ScriptFAYTCommand} object that you can use to initialise this command to extend the FAYT field. */
        fayt: ScriptFAYTCommand;
        /** Set to True to hide this command from the drop-down command list shown in the command editor. This lets you add commands that can still be used in buttons and hotkeys but won't clutter up the command list. */
        hide: boolean;
        /** Use this property to assign a default icon to this command. You can specify the name of an internal icon (if you want to specify an icon from a particular set, use *setname:iconname* - use this if you have bundled your script in a script package with its own icon set) or the path of an external icon or image file. */
        icon: string;
        /** Use this to set a label for the command. This is displayed in the Commands tab of the Customize dialog (under the *Script Commands* category), and will form the default label of the button created if the user drags that command out to a toolbar. 
         * 
         * The actual name of the command (used to invoke the command) is assigned through the **name** property. */
        label: string;
        /** This is the name of the method that Opus will call in your script when the command is invoked. This would typically be set to *OnXXXXX* where *XXXXX* is the name of the command, however any method name can be used.
         * 
         * When the method is invoked it is passed a single argument, a {@link ScriptCommandData} object. Generically this method is referred to as {@link OpusOnScriptCommand|OnScriptCommand}. */
        method: string;
        /** This is the name of the command. This determines the name that will invoke the command when it is used in buttons and hotkeys. */
        name: string;
        /** Set to false if you don't want your command to display a progress indicator if more than one file is selected. */
        noprogress: boolean;
        /** Set to true when adding a dynamic command that you want to be able to support embedded functions. */
        supportembedded: boolean;
        /** This lets you specify an optional command line template for the command. This is a string in the form *ARGNAME1/MOD,ARGNAME2/MOD,ARGNAME3/MOD*, etc, where ARGNAME is the name of the argument and /MOD are one or more modifiers used to indicate the argument type. The command line template can specify as many arguments as needed. 
         * 
         * When your command is invoked and its {@link OpusOnScriptCommand|OnScriptCommand} event is triggered, any arguments supplied on the command line are parsed according to this template and provided via the {@link ScriptCommandData}.func.args property. */
        template: string;
    }

    interface ScriptCommandData {
        /** This returns the original command line that invoked the command. If any arguments were provided on the command line they are available in parsed form from the **func.args** property. */
        cmdline: string;
        /** If this is a string, it means this is being called as a FAYT extension command. If set to False it's a regular command. */
        fayt: string | boolean;
        /** Returns a {@link Func} object relating to this function. This provides access to information about the function's environment (source and destination tabs, etc) as well as any variables and parsed command line arguments. */
        func: Func;
    }


    interface ScriptFAYTCommand {
        /** Specify the default background color for your FAYT extension. This should be in the form **#RRGGBB** (hexadecimal) or **RRR,GGG,BBB** (decimal). You should use this and the **textcolor** property to specify both dark and light colors as the same, otherwise use the **dark** and **light** properties. */
        backcolor: string;
        /** Use the {@link ScriptColorPair} object this returns to specify the default dark mode text and background colors for your FAYT extension (and use the **light** property to specify the light mode colors). If you want the default dark and light colors to be the same, you can use the **textcolor** and **backcolor** properties instead. */
        dark: ScriptColorPair;
        /** Set this property to True to enable the FAYT extension. */
        enable: boolean;
        /** Lets you specify a set of flags that the user will be able to turn on or off through the user interface. To use this, you need to assign the property to a {@link DOpusMap|Map} object created by the {@link DOpus.Create}.Map method. 
         * 
         * Each flag should be added to the map with its numeric value (a power of two; e.g. 1, 2, 4, 8, …) as the key and its label as the value. When your FAYT extension is called, Opus will add the values of the flags the user has chosen together and pass them to your command. 
         * 
         * The maximum number of flags you can add is 16. */
        flags: DOpusMap<number, string>;
        /** Lets you specify a default key for your FAYT extension. Pushing this key from a file display or FAYT field will invoke the script. */
        key: string;
        /** This lets you specify a label for your FAYT extension which is shown in the user interface. If not supplied, the name of the command is used. */
        label: string;
        /** Use the {@link ScriptColorPair} object this returns to specify the default light mode text and background colors for your FAYT extension (and use the **dark** property to specify the dark mode colors). If you want the default dark and light colors to be the same, you can use the **textcolor** and **backcolor** properties instead. */
        light: ScriptColorPair;
        /** Set to True to have your extension called in realtime as the user types. If set to False your extension will be called only when the user presses `Enter`. If set to an integer value, this specifies the number of milliseconds between when the user types and your script is called (i.e. deferred notification). */
        realtime: boolean | number;
        /** Specify the default text color for your FAYT extension. This should be in the form **#RRGGBB** (hexadecimal) or **RRR,GGG,BBB** (decimal). You should use this and the backcolor property to specify both dark and light colors as the same, otherwise use the dark and light properties. */
        textcolor: string;
        /** Set to false if you don't want to be called for a suggestion list for an empty string (i.e. the user must type something before your extension is invoked). */
        wantempty: boolean;
    }


    interface ScriptFAYTCommandData {
        /** Provides the text the user typed into the FAYT field. */
        cmdline: string;
        /** The name of the FAYT extension command being invoked. This lets you use the same entry point to implement multiple FAYT extensions if desired. If the value is False then this is not a FAYT extension at all, but a regular script command. */
        fayt: string | boolean;
        /** Provides the sum of all the flags the user has enabled for your FAYT extension. These come from the flags property you specified when initialising your extension via the {@link ScriptFAYTCommand} object. 
         * 
         * Your script can update the flags in the users' configuration using the {@link Script.UpdateFAYTFlags} method. */
        flags: number;
        /** This will equal the string **"return"** if the user pushed the return key to trigger your FAYT extension. */
        key: string;
        /** If set to True this is a hint that you should update the suggestions list via the {@link Tab.UpdateFAYTSuggestions} method. */
        suggest: boolean;
        /** Provides the key that initially triggered the FAYT in this mode. */
        quickkey: string;
        /** Represents the tab in which the FAYT is being interacted with. */
        tab: Tab;
    }


    interface ScriptConfig {
        /** The properties of the ScriptConfig object are entirely determined by the script itself.
         * 
         * In the {@link OpusOnInit|OnInit} method, assign the default values of any configuration properties you want to this object. The type of each default value controls the type of the property.
         * 
         * The Preferences page only supports editing certain types of variables, so you must only assign properties of compatible types. Preferences supports:
         * - Boolean options (**True** or **False**) - the variable type must be *bool*
         * - Numeric options - the variable type must be *int*
         * - String options - the variable type must be *string*
         * - Multi-line string options - the variable type must be string and must contain at least one *CR/LF* pair. Note that a trailing *CR/LF* will be removed from the default value.
         * - Multiple string options - the variable type must be a {@link Vector} of strings
         * - Drop-down list - the variable type must be a {@link Vector} with an *int* as the first element (to specify the default selection), and strings for the remaining elements.
         */
        [argumentName: string]: boolean | number | string | Vector<string> | Vector<any>;
    }


    interface ScriptConfigChangeData {
        /** Returns a {@link Vector} containing the names of the configuration items that were modified. */
        changed: Vector<string>;
    }

    interface ScriptInitDataProperties {
        /** Sets a description string for the property. */
        desc: string;
        /** Places the property into a named group. */
        group: string;
        /** Controls the group order. */
        group_order: number;
        /** Specify a display or "friendly" name for the property to be shown in the editor. */
        label: string;
        /** Specify a maximum length for text properties. */
        limit: number;
        /** Specify a minimum value for numeric properties. */
        min: number;
        /** Specify a maximum value for numeric properties. */
        max: number;
        /** Specify a custom sort position for this property in the editor. */
        sort_order: number;
        /**Specify the property type in case the automatic identification fails. Valid type strings are "float" (floating point number) and "multiline" (multiline string). You can also specify the number of decimal places, e.g. "float:3". */
        type: string;
    }

    type ScriptConfigPrimitive =
        | string
        | number
        | boolean
        | Vector<any>;

    /**
     * A script configuration value which may be dynamically extended with configuration metadata (Opus 13.19+).
     */
    type ScriptConfigProperty = ScriptConfigPrimitive & Partial<ScriptInitDataProperties>;
    

    interface ScriptInitData {
        /** Returns a {@link ScriptConfig} object, that the script can use to initialize its default configuration. Properties added to the object in this method will be displayed to the user in Preferences, allowing them to change their value and thus configure the behavior of the script. 
         * 
         * If you want to preserve the order of configuration items, you can replace this object with an {@link DOpusOrderedMap|OrderedMap} by simply assigning the new object to the `config` property. 
         * 
         * Each property added to this object can have a number of properties of its own, to configure how the property is treated by Opus.
         * - desc        : Sets a description string for the property.
         * - group       : Places the property into a named group.
         * - group_order : Controls the group order.
         * - label       : Specify a display or "friendly" name for the property to be shown in the editor.
         * - limit       : Specify a maximum length for text properties.
         * - min         : Specify a minimum value for numeric properties.
         * - max         : Specify a maximum value for numeric properties.
         * - sort_order  : Specify a custom sort position for this property in the editor.
         * - type        : Specify the property type in case the automatic identification fails. Valid type strings are "float" (floating point number) and "multiline" (multiline string). You can also specify the number of decimal places, e.g. "float:3".
         * 
         * Legacy Maps (config_desc, config_groups, config_types, ...) are still supported.
        */
        config: ScriptConfig;
        /** This lets you assign descriptions for your script's configuration options that are shown to the user in the editor dialog. To do this, set this property to a {@link DOpusMap|Map} created via the {@link DOpusFactory.Map} method, filled with name/description string pairs. 
         * 
         * Instead of this method you can also specify the description using the configuration property itself; e.g given a property called `name`, you can set the description via `name.description`. */
        config_desc: DOpusMap<string, string> | DOpusOrderedMap<string, string>;
        /** This lets you organize your script's configuration options into groups when shown to the user in the editor dialog. The group names are arbitrary - configuration options with the same group name will appear grouped together. Set this property to a {@link DOpusMap|Map} created via the {@link DOpusFactory.Map} method, filled with name/group string pairs. 
         * 
         * Instead of this method you can also specify the group using the configuration property itself; e.g given a property called `name`, you can set the group via `name.group`. */
        config_groups: DOpusMap<string, string>;
        /** This lets you control the order of configuration item groups for your script. To use this, set the property to a {@link Vector} object (created by the {@link DOpus.NewVector} method), and push the group names onto the vector in the desired order. 
         * 
         * Instead of this method you can also specify the group order using the configuration property itself; e.g given a property called `name`, you can set the group order via `name.group_order`. */
        config_group_order: Vector<string>;
        /** While the type of a configuration option is normally inferred automatically, this lets you explicitly set the type which may be needed in some cases. For example, you can mark a value as a float even if its default is zero or a whole number. Set this property to a {@link DOpusMap|Map} created via the {@link DOpusFactory.Map} method, filled with name/type string pairs. Valid type strings are "float" (floating point number) and "multiline" (multiline string). You can also specify the number of decimal places, e.g. "float:3". 
         * 
         * Instead of this method you can also specify the type using the configuration property itself; e.g given a property called `name`, you can set the type via `name.type`. */
        config_types: DOpusMap<string, string>;
        /** Lets the script specify a copyright message that is displayed to the user in Preferences. */
        copyright: string;
        /** Set this to True if the script should be enabled by default, or False if it should be disabled by default. The user can enable or disable scripts using Preferences - this simply controls the default state. */
        default_enable: boolean;
        /** Lets the script specify a description message that is displayed to the user in Preferences. */
        desc: string;
        /** Set this to True if your script implements the {@link OpusOnDoubleClick|OnDoubleClick} event and (for performance reasons) you want to be called with only a path to the double-clicked item rather than a full {@link Item} object. See the {@link OpusOnDoubleClick|OnDoubleClick} event documentation for more details. */
        early_dblclk: boolean;
        /** Returns the path and filename of this script. */
        file: string;
        /** Lets you specify an arbitrary group for this script. If scripts specify a group they will be displayed in that group in the list in Preferences. */
        group: string;
        /** Lets the script specify a string that will be prepended to any log output it performs. If not set the name of the script is used by default. */
        log_prefix: string;
        /** Specifies the minimum Opus version required. If the current version is less than the specified version the script will be disabled. You can specify the major version only (e.g. *"11"*), a major and minor version (e.g. *"11.3"*) or a specific beta version (e.g. *"11.3.1"* for 11.3 Beta 1). */
        min_version: string;
        /** Lets the script specify a display name for the script that is shown in Preferences. */
        name: string;
        /** The {@link OpusOnInit|OnInit} method is called in two different circumstances - once during Opus startup, and again if the script is installed or edited when Opus is already running. This property will return True if the OnInit method is being called during Opus startup, or False for any other time. */
        startup: boolean;
        /** Lets you provide a URL where the user can go to find out more about your script (it's displayed to the user in Preferences). */
        url: string;
        /** Returns a {@link Vars} collection of user and script-defined variables that are local to this script. These variables are available to other methods in the script via the {@link Script.vars} property. */
        vars: Vars;
        /** Lets the script specify a version number string that is displayed to the user in Preferences. */
        version: string;
        /** Adds a new information column to Opus. The returned {@link ScriptColumn} object must be properly initialized. A script add-in can add as many columns as it likes, and these will be available in file displays, infotips and the Advanced Find function. 
         * 
         * Instead of adding columns in {@link OpusOnInit|OnInit}, your script can implement the {@link OnAddColumns} method. This is more flexible as it allows you to access your script's configuration at the time you add columns, and columns can be dynamically added and removed while Opus is running. If {@link OnAddColumns} is implemented then this method is unavailable in {@link OpusOnInit|OnInit}. */
        AddColumn(): ScriptColumn;
        /** Adds a new internal command to Opus. The returned {@link ScriptCommand} object must be properly initialized. A script add-in can add as many internal commands as it likes to the Opus internal command set. 
         * 
         * Instead of adding commands in OnInit, your script can implement the {@link OpusOnAddCommands|OnAddCommands} method. This is more flexible as it allows you to access your script's configuration at the time you add commands, and commands can be dynamically added and removed while Opus is running. If {@link OpusOnAddCommands|OnAddCommands} is implemented then this method is unavailable in {@link OpusOnInit|OnInit}. */
        AddCommand(): ScriptCommand;
    }


    interface ScriptStrings {
        /** Returns a {@link Vector} of strings representing the languages that strings have been defined for. */
        langs: Vector<string>;
        /** Returns the text of a string specified by name. The name must match the name used in the string resources.  
         * 
         * Optionally you can provide a language name as the second parameter, to retrieve a string from a particular language. Otherwise, the string is returned in the current language. */
        Get(name: string, language?: string): string;
        /** Returns the text of a string specified by name. This works the same as the **Get** method but interprets Javascript-style embedded escape characters in the string. E.g. `\n` in the string is converted to a new line. */
        GetEscaped(name: string, language?: string): string;
        /** Returns True if strings in the specified language are defined in the resources. */
        HasLanguage(language: string): boolean;
    }

    interface ShellProperty {
        /** The default width in pixels a column displaying this property should use. */
        defwidth: number;
        /** The display name of this property (the name that should be shown to users). */
        display_name: string;
        /** The property is intended to be viewed by the user (e.g. in a column). */
        isviewable: boolean;
        /** The default column justification for this property (**left**, **right**, **center**). */
        justify: string;
        /** The PKEY (property key) for this property. This is a property's unique ID and the canonical way to refer to a property. You can use the **raw_name** and **display_name** values to access properties as well, but they are potentially inaccurate (since it's possible to have two properties with the same name) and also slower as the property has to be looked up by name each time. */
        pkey: string;
        /** An internal name used by the property provider. */
        raw_name: string;
        /** The type of data this property returns; **string**, **number**, **datetime** are the only supported types currently. */
        type: string;
    }

    interface ShutdownData {
        /** Returns True if the Windows session is ending (that is, if Opus is shutting down because the system is shutting down), or False if it's just Opus that is quitting. */
        endsession: boolean;
        /** Returns a string indicating any qualifier keys that were held down by the user when the event was triggered.  
         * 
         * The string can contain any or all of the following: *shift*, *ctrl*, *alt*, *lwin*, *rwin*.
         * 
         * If no qualifiers were down, the string will be: *none* */
        qualifiers: string;
    }

    interface Signature {
        /** Information about the issuer of the certificate used to sign the file. */
        certissuer: CertInfo;
        /** Information about the certificate used to sign this file. */
        certsigner: CertInfo;
        /** Information about the certificate used to timestamp the signature (only if `timestamped` is true). */
        certtimestamp: CertInfo;
        /** More information (optional string provided by the publisher). */
        moreinfo: string;
        /** Returns the name of the program. */
        progname: string;
        /** Returns the publisher's link. */
        publink: string;
        /** Returns True if the file is self-signed. */
        selfsigned: boolean;
        /** Returns the signature's timestamp (if `timestamped` is true). */
        timestamp: DOpusDate;
        /** Returns True if the signature was timestamped. */
        timestamped: boolean;
        /** Returns True if the signature validation was successful. Note that the signature is only validated if the **verify** parameter is set to True or one of the other validation flags when the {@link FSUtil.GetSignature} method is called. */
        valid: boolean;
    }

    interface SmartFavorite {
        /** Returns the path this entry represents, as a {@link Path} object. */
        path: Path;
        /** Returns the number of points this entry has as a source folder. The point score is used by Opus to determine which folders to display. */
        points: number;
        /** Returns the number of points this entry has as a destination folder. */
        destpoints: number;
    }

    interface SmartFavorites {
        /** Indexed access */
        (index: number): Favorite;
        /** Returns the number of points an entry must have before it would be displayed in the SmartFavorites list. */
        threshhold: number;
        /** Returns the maximum number of entries that would be displayed in the SmartFavorites list. */
        max: number;
    }

    interface SortOrder {
        /** Returns a {@link Vector} of strings representing the current sort order of files in the folder. If multiple manual sort orders have been defined, you can provide the name of a specific sort order as an argument to this method. If called with no arguments it returns the current sort order by default. */
        GetOrder(name?: string): Vector;
        /** You can pass this method a {@link Vector} of strings to change the sort order of the current folder. You can optionally provide the name of a sort order as the second parameter if you’ve got more than one sort order defined. */
        SetOrder(order: Vector<string>, name?: string): void;
        /** Resets the manual sort order to the currently selected sort order (e.g. if the file display header indicates that it is sorted by name, **ResetOrder** would reset to filename order). You can optionally provide the name of a sort order as the second parameter if you’ve got more than one sort order defined. */
        ResetOrder(name?: string): void;
    }

    interface SourceDestData {
        /** Returns True if the tab is now the destination. */
        dest: boolean;
        /** Returns True if the tab is now the source. If both **source** and **dest** return False it indicates that the tab is now "off". */
        source: boolean;
        /** Returns a string indicating any qualifier keys that were held down by the user when the event was triggered.  
         * 
         * The string can contain any or all of the following: *shift*, *ctrl*, *alt*, *lwin*, *rwin*.
         * 
         * If no qualifiers were down, the string will be: *none* */
        qualifiers: string;
        /** Returns a {@link Tab} object representing the tab. */
        tab: Tab;
    }

    interface SpecialMeta {
        /** Indexed/Property-like access */
        [name: string]: any;
    }

    interface StartupData { }

    interface StoredQuery {
        /** True if the query auto-updates when it's read, false if it has to be manually refreshed. */
        autoupdate: boolean;
        /** Search engine the query uses. As well as the engine itself, any options it offers can also be controlled. For example, "everything,case" would use Everything in case sensitive mode.
         * 
         * - everything :	case, wholeword, matchpath, regex, diacritics
         * - everythingglobal :	case, wholeword, matchpath, regex, diacritics
         * - windows :	nqs, noauto
         * - opus :	nonames, content, nowild, regex, anywords
         */
        engine: string;
        /** A {@link Vector} of paths that the query runs against. */
        paths: Vector<Path|string>;
        /** The query string */
        query: string;
    }

    interface StringSet {
        /** Returns the number of elements the **StringSet** currently holds. */
        count: number;
        /** Returns True if the **StringSet** is empty, False if not. */
        empty: boolean;
        /** A synonym for **count**. */
        length: number;
        /** A synonym for **count**. */
        size: number;
        /** Copies the contents of another **StringSet** to this one. You can also pass an array of strings or {@link Vector} object. */
        assign(from: StringSet): void;
        /** Clears the contents of the **StringSet**. */
        clear(): void;
        /** Erases the string if it exists in the set. */
        erase(arg0: string): void;
        /** Returns True if the specified string exists in the set. */
        exists(arg0: string): boolean;
        /** Inserts the string into the set if it doesn't already exist. Returns True if successful. */
        insert(arg0: string): boolean;
        /** Merges the contents of another **StringSet** with this one. */
        merge(from: StringSet): void;
    }

    interface StringTools {
        /**
         * Decodes an encoded string or data.
         *
         * You can provide either a {@link Blob} object or a string as the source to decode.
         * Depending on the value of the *format* argument, either a string or a {@link Blob} is returned.
         *
         * Valid formats:
         *  - "base64"      : The source will be *Base64*-decoded, returns a {@link Blob}
         *  - "quoted"      : The source will be *Quoted-printable*-decoded, returns a {@link Blob}
         *  - "utf-8"       : The source will be converted from UTF-8 to a native string
         *  - "utf-16", "utf-16-le" : The source will be converted from UTF-16 LE to a native string
         *  - "utf-16-be"   : The source will be converted from UTF-16 BE to native string
         *  - "auto"        : Special handling is invoked to decode a MIME-encoded email subject (e.g. one beginning with **=?**)and a string is returned if identified. It will also detect UTF-8 or UTF-16 encoded data if it has a BOM at the beginning.
         *  - A valid code-page name (e.g. "**gb2312**", "**utf-8**" ...) or ID (e.g. **936**, **65001**, ...)         
         *
         * If decoding UTF-8 or UTF-16 (via "**auto**" or "**utf-8**", etc.), any byte-order-mark (BOM) will be skipped if one exists at the beginning of the input data.
         *
         * If *format* is not specified, the default is "auto". Otherwise, *format* must be set to one of the above keywords or a valid code-page name (e.g. **"gb2312"**, **"utf-8"**), or a Windows code-page ID (e.g. **936**, **65001**). The source will be decoded using the specified code-page and a string is returned.
         */
        Decode(source: Blob | string, format?: 'base64' | 'quoted' | 'utf-8' | 'utf-16' | 'utf-16-le' | 'utf-16-be' | 'auto' | string): string | Blob;
        /**
         * Encodes a string or data.
         *
         * You can provide either a {@link Blob} object or a string as the *source* to encode.
         * Depending on the value of the format argument, either a string or a Blob is returned.
         *
         * Valid formats:
         *  - "base64"    : The source will be *Base64*-encoded, returns a string
         *  - "quoted"    : The source will be *Quoted-printable*-encoded, returns a string
         *  - "utf-8"     : The source will be converted to UTF-8 without BOM
         *  - "utf-8 bom" : The source will be converted to UTF-8 with BOM
         *  - "utf-16", "utf-16-le" (+ "bom" variants) : The source will be converted to UTF-16 Little Endian
         *  - "utf-16-be" (+ "bom" variants) : The source will be converted to UTF-16
         *  - Otherwise, a valid code-page name (e.g. "**gb2312**", "**utf-8**" etc.), or a Windows code-page ID (e.g. **936**, **65001**). The source will be encoded using the specified code-page and a {@link Blob} is returned.
         */
        Encode(source: Blob | string, format: string): string | Blob;
        /** Tests the input string to see if it only contains characters that can be represented in ASCII. 
         * 
         * If the result is false, the string is not safe to save into a text file unless you use a Unicode format such as UTF-8. 
         * 
         * This check is not affected by locales or codepages. Instead, it tests whether the string consists of only 7-bit ASCII characters, such that no characters will be lost or modified if you save the string to a text file and then load it back on any other computer. */
        IsASCII(input: string): boolean;
        /** Returns a translated string in the currently selected language. Mainly needed for internal use. The currently defined strings are:
         * - ID : English language string
         * - FavoritesBar : Favorites Bar
         * - FindResults : Find Results
         * - CopySelection : Copy Selection
         * - CopyAll : Copy All
         * 
         * You can also use this to retrieve the description string of an internal icon from its name.
         * 
         * For example, `LanguageStr("icon:deletesecure")` returns "Secure Delete" in English.
         */
        LanguageStr(nameor: string, id: number): string;
        /**
         * Strips any illegal filename characters from the supplied string.
         *
         * Optional flags:
         *  - "f" : forward slashes – convert separators to '/' instead of '\\'
         *  - "n" : name instead of path – replace separators with '_' (implies "s")
         *  - "s" : subdirectory mode – replace ':' with ';' and remove '\\\\' from UNC paths
         */
        MakeLegal(name: string, flags?: string): string;
        /**
         * Returns a copy of the input string with any diacritics (accent symbols) removed.
         * For example, "á" would be converted to "a". 
         * 
         * This function Uses the same rules as the "ignore diacritics" options for pattern matching throughout Opus.
         */
        RemoveDiacritics(input: string): string;
        /**
         * Truncates the specified input string to the requested number of characters.
         *
         * The optional type argument specifies the truncation type:
         *  - 0 : truncate on the right
         *  - 1 : truncate on the left
         *  - 2 : truncate in the middle
         *
         * If not specified, the default is:
         *  - **2** if input is a {@link Path} object
         *  - **0** otherwise
         *
         * If input is a {@link Path} and middle truncation is selected, the function takes
         * path separators into account correctly.
         */
        Truncate(input: string | Path, length: number, type?: number): string;
    }

    interface StyleSelectedData {
        /** Returns a {@link Lister} object representing the Lister that changing style. */
        lister: Lister;
        /** Returns a string indicating any qualifier keys that were held down by the user when the event was triggered.  
         * 
         * The string can contain any or all of the following: *shift*, *ctrl*, *alt*, *lwin*, *rwin*.
         * 
         * If no qualifiers were down, the string will be: *none* */
        qualifiers: string;
        /** Returns the name of the newly selected style. */
        style: string;
    }

    interface SysInfo {
        /** Returns true if Dark Mode is on within Opus, and false otherwise. 
         * 
         * May differ from **DarkModeApps** if Opus is configured to override the system-wide setting, or on older versions of Windows which did not have Dark Mode. */
        DarkMode(): boolean;
        /** Returns true if Windows is configured to run applications in Dark Mode, and false otherwise. 
         * 
         * Always returns false on older versions of Windows which did not have a Dark Mode. */
        DarkModeApps(): boolean;
        /** Returns the DPI that Opus is currently running in (e.g. 96 DPI is 100% scaling). */
        DPI(): number;
        /** Allows you to test if a named process is currently running, and returns the process's ID if so. If the process isn't running 0 is returned. You can use wildcards or (by prefixing the pattern with **regex:**) regular expressions. */
        FindProcess(arg0: string): number;
        /** Returns a string indicating the language Opus is currently using. */
        Language(): string;
        /** Returns the number of open Listers. */
        ListerCount(): number;
        /** Returns a {@link Vector} of {@link Rect} objects which provide information about the positions and sizes of the display monitors in the system. 
         * 
         * The **WorkAreas** method is sometimes what you should use instead of this. */
        Monitors(): Vector<Rect>;
        /** Returns a single {@link Rect} with the information for just a particular monitor. 
         * 
         * The **WorkAreas** method is sometimes what you should use instead of this. */
        Monitors(index: number): Rect;
        /** Returns the index of the monitor the mouse pointer is currently positioned on. */
        MouseMonitor(): number;
        /** Returns the current x-coordinate of the mouse pointer. */
        MousePosX(): number;
        /** Returns the current y-coordinate of the mouse pointer. */
        MousePosY(): number;
        /** Returns a {@link Rect} giving the size of the invisible border around windows. 
         * 
         * On some operating systems (e.g. Windows 10), windows may be larger than they appear: Beyond the visible edge is a border that is part of the window but invisible. This border exists for legacy compatibility, allowing window frames to appear thin while providing something thick enough to resize with the mouse. 
         * 
         * You can usually ignore the border but it is important when positioning windows next to each other, or to screen edges, where ignoring it results in gaps between windows. 
         * 
         * The **Rect** returned by this method is unusual: The **left**, **right**, **top** and **bottom** properties do not represent the coordinates of a rectangle but rather the width of borders (if any) on each side of a window. As a consequence, the **width** and **height** properties of the Rect are meaningless. 
         * 
         * On Windows 10, the top border is typically zero and the others are usually several pixels thick. The thickness varies by OS version, system DPI, and other factors; you should not store it to disk as it may not be correct for the system that loads it. 
         * 
         * This property is relatively expensive to calculate. You should not, for example, call the method once for each side; instead, call it once and store the **Rect** in a variable, then query that for each side. */
        ShadowBorder(): Rect;
        /** Returns the DPI that the system is currently running in (e.g. 96 DPI is 100% scaling). This will normally be the same as the **DPI** value, but if the system DPI has been changed and Opus has not been restarted they can be different. */
        SystemDPI(): number;
        /** Returns True if the system is currently using touch input. */
        TouchInput(): boolean;
        /** Returns True if Opus is running from a USB export. */
        USBInstall(): boolean;
        /** Similar to the **Monitors** method except it returns the work area of each monitor rather than the full monitor area. 
         * 
         * A monitor's work area is the monitor's rectangle minus the Windows Taskbar and any other app bars (which can include docked toolbars created by Opus, or similar things added by other software). If a monitor does not have a Taskbar or other app bar docked to it, its work area will be the same as its full rectangle. */
        WorkAreas(): Vector<Rect>;
         /** Similar to the **Monitors** method except it returns the work area of each monitor rather than the full monitor area. 
         * 
         * A monitor's work area is the monitor's rectangle minus the Windows Taskbar and any other *app bars* (which can include docked toolbars created by Opus, or similar things added by other software). If a monitor does not have a Taskbar or other app bar docked to it, its work area will be the same as its full rectangle. */
        WorkAreas(index: number): Rect;
    }

    interface SystemSettingChangeData {
        /** Returns a string indicating the setting that changed. Settings are:
         * - theme               : The Windows theme (visual style) has changed
         * - colorset            : Opus has changed from light to dark mode or vice versa
         * - environment         : System environment variables have been changed
         * - dwmcomposition      : Indicates that Windows DWM composition has been turned on or off.
         * - dwmcolorization     : Indicates that Windows DWM colorization has been changed.
         * - intl                : The system locale has changed.
         * - userinteractionmode : The system input method has changed (from mouse to touch or vice versa). The current method can be queried via the {@link SysInfo.TouchInput} method.
         * - spacingscheme       : Indicates that the UI spacing scheme has changed. The new scheme name is available in the name property. You can also query the scheme using the {@link DOpus.spacingscheme} property.
         * - windowmetrics       : System window metrics have changed (e.g. font size).
         */
        type: string;
        /** Returns a name string for supported settings. */
        name: string;
    }

    interface Tab {
        /** Returns an {@link Items} object that represents all the files and folders currently displayed in this tab. 
         * 
         * Note: The first time a script accesses this property (and all the other properties that return an {@link Items} object), a snapshot is taken of all the appropriate items. If the script then makes changes to those items (e.g. by creating a new file, modifying the selection, etc), these changes will not be reflected by the collection. To re-synchronize the collection call the **Update** method on the object. */
        all: Items;
        /** Returns a collection of {@link Path} objects that represents the paths in the "backward" history list for this tab (i.e. the folders you would get to by clicking the *Back* button). */
        backlist: Path[];
        /** Returns the tab's assigned color (if one has been assigned via, for example, the `Go TABCOLOR` command). The color is returned as a string in R,G,B format. */
        color: string;
        /** Returns the current path from the tab's breadcrumb control (if it has one), including any ghost path. */
        crumbpath: Path;
        /** Returns True if this tab is currently the **destination**, and False otherwise.
         * 
         * Note that you cannot always assume a tab is the source if it is not the destination. Use the separate **source** property for that. */
        dest: boolean;
        /** Returns an {@link Items} object that represents all the folders currently displayed in this tab. */
        dirs: Items;
        /** Returns True if the tab is marked as dirty, indicating its list of contents may be out of date. This can happen if the tab is in the background and the user has turned off the **Preferences / Folder Tabs / Options / Process file changes in background tabs** option. */
        dirty: boolean;
        /** Returns the currently displayed label of this tab. */
        displayed_label: string;
        /** Returns a collection of {@link FileGroup} objects that represents all the file groups in the tab (when the tab is grouped). You can use the **format.group_by** property to test if the tab is grouped or not. */
        filegroups: FileGroup[];
        /** Returns an {@link Items} object that represents all the files currently displayed in this tab. */
        files: Items;
        /** Returns a {@link Format} object representing the current folder format in this tab. */
        format: Format;
        /** Returns a collection of {@link Path} objects that represents the paths in the "forward" history list for this tab (i.e. the folders you would get to by clicking the *Forward* button). */
        forwardlist: Path[];
        /** Returns an {@link Items} object that represents all the files and folders currently hidden from this tab. */
        hidden: Items;
        /** Returns an {@link Items} object that represents all the folders currently hidden from this tab. */
        hidden_dirs: Items;
        /** Returns an {@link Items} object that represents all the files currently hidden from this tab */
        hidden_files: Items;
        /** Returns an {@link Items} object that represents all the files and folders currently displayed in this tab that have one or more cells highlighted. */
        highlighted: Items;
        /** Returns the current assigned tab label. Note that this may be an empty string if no custom label has been assigned. The **displayed_label** property returns the currently displayed label in all cases. */
        label: string;
        /** If this tab is linked to another tab, returns a {@link Tab} object representing the linked tab. If this tab is not linked this property returns **0**. */
        linktab: Tab;
        /** Returns a {@link Lister} object representing the parent Lister that owns this tab. */
        lister: Lister;
        /** Returns the current lock state of the tab; one of "**off**", "**on**", "**changes**", "**reuse**". */
        lock: 'off' | 'on' | 'changes' | 'reuse';
        /** Returns True if this tab is linked in Navigation Lock mode. This property does not exist if the tab is not linked, so make sure you check the value of **linktab** first. */
        navlock: boolean;
        /** Returns the current path shown in this tab. */
        path: Path;
        /** Returns a {@link QuickFilter} object providing information about the state of the quick filter in this tab. */
        quickfilter: QuickFilter;
        /** Returns True if this tab is currently on the right or bottom side of a dual-display Lister, and False otherwise. */
        right: boolean;
        /** Returns an {@link Items} object that represents all the selected files and folders currently displayed in this tab. Note that if **checkbox mode** is turned on in the tab, this will be a collection of checked items rather than selected. */
        selected: Items;
        /** Returns an {@link Items} object that represents all the selected folders currently displayed in this tab. */
        selected_dirs: Items;
        /** Returns an {@link Items} object that represents all the selected files currently displayed in this tab */
        selected_files: Items;
        /** Returns a {@link TabStats} object that provides various information about the tab, including the number of files, number of selected files, total size of selected files, etc. The "selected" counts provided by this object take checkbox mode into account (that is, if checkbox mode is currently turned on, the counts will be for checked files rather than for selected files). */
        selstats: TabStats;
        /** Returns True if this tab is currently the source, and False otherwise. 
         * 
         * Note that you cannot always assume a tab is the destination if it is not the source. Use the separate **dest** property for that. */
        source: boolean;
        /** Returns a {@link TabStats} object that provides various information about the tab, including the number of files, number of selected files, total size of selected files, etc. Unlike selstats, this object does not take checkbox mode into account (so the "selected" counts will refer to selected rather than checked files). */
        stats: TabStats;
        /** Returns an {@link UnresolvedFiles} object that provides *unresolved* versions of all the different file collections available through this object (all, dirs, files, hidden, hidden_dirs, hidden_files, highlighted, selected_dirs, selected_files). This is mostly useful with file collections which normally return the resolved path - accessing through the unresolved objects will return the native coll:// paths instead. */
        unresolved: UnresolvedFiles;
        /** Returns an {@link UnsortedFiles} object that provides unsorted versions of all the different file collections available through this object (all, dirs, files, hidden, hidden_dirs, hidden_files, highlighted, selected_dirs, selected_files). This is mostly useful with expanded sub-folders or FlatView mode, which normally depth-sort the returned files (deepest first) - accessing through the unsorted objects will return files in the order they appear in the file display. 
         * 
         * You can also use `unsorted.unresolved` to access an unsorted/unresolved set of file collections. */
        unsorted: UnsortedFiles;
        /** This {@link Vars} object represents all defined variables with *tab scope* (that are scoped to this tab). */
        vars: Vars;
        /** Returns True if this tab is currently visible (i.e. it is the active tab in either file display), and False *otherwise*. */
        visible: boolean;
        /** Call this method from a FAYT extension script to clear the FAYT field. If the FAYT is open it clears any current text leaving only the quick key behind at the start. */
        ClearFAYT(): void;
        /** Call this method from a FAYT extension script to forcibly close the FAYT field. */
        CloseFAYT(): void;
        /** Creates a new {@link Dialog} object, that lets you display dialogs and popup menus. The dialog's window property will be automatically assigned to this tab. */
        Dlg(): Dialog;
        /** Returns an {@link Item} object representing the file or folder which has focus in the tab. 
         * 
         * The focus item is typically indicated by an outline around its name, and is usually the last item which was clicked on, or the last item which was moved to with the keyboard. 
         * The focus item is often also selected, but not always; focus and selection are two different things. 
         * 
         * If no focus item exists, or if the focus item is a special file or folder, such as *This PC*, which cannot be represented by an {@link Item} object, then this method does not return an object. (In JScript, test if the result ***== null*** and in VBScript test if the result ***is nothing***.) */
        GetFocusItem(): Item;
        /** Displays a notification message associated with this tab. 
         * 
         * Currently the only defined type is "status", which displays the message in the status bar. 
         * 
         * The *msg* string will be displayed in the status bar when the tab is active. The *timeout* value lets you specify an optional timeout (in milliseconds) after which the message will automatically be removed. If no timeout is specified the user needs to click the message to dismiss it. */
        Notify(type: string, msg: string, timeout: number): boolean;
        /** When a script accesses particular properties of a {@link Tab} object, a snapshot is taken of the tab's state. For example, if you ask for the **selected_files** property, the list of selected files is calculated and then stored in memory. This can speed things up, and also means you don't have to worry about the list changing under you as you work through it. If the script then makes changes to the tab (e.g. it selects files, creates a new folder, etc.), these changes will not be reflected by the cached snapshot(s) if you access the same properties on the same tab object again. To clear the cached snapshots and re-synchronize the object with the tab's current state, call the **Tab.Update** method. */
        Update(): void;
        /** When you're implementing a **FAYT extension** script, you can call this method at any time to update the list of suggestions shown to the user. 
         * 
         * You can provide the second column description by tab-separating it from the main value. 
         * 
         * Set the optional second argument to false to prevent the provided list from being sorted alphabetically. */
        UpdateFAYTSuggestions(array: string[], sort?: boolean): void;
        /** When you're implementing a **FAYT extension** script, you can call this method at any time to update the list of suggestions shown to the user.
         * 
         * You can provide the second column description by tab-separating it from the main value. 
         * 
         * Set the optional second argument to false to prevent the provided list from being sorted alphabetically. */
        UpdateFAYTSuggestions(stringsVector: Vector<string>, sort?: boolean): void;
        /** When you're implementing a FAYT extension script, you can call this method at any time to update the list of suggestions shown to the user. 
         * 
         * Each key of **stringsMap** represents the text that will be inserted if selected by the user, and the value represents a hint or description that's shown in a separate column in the suggestion list.
         * 
         * Set the optional second argument to false to prevent the provided list from being sorted alphabetically. */
        UpdateFAYTSuggestions(stringsMap: DOpusMap<string, string>, sort?: boolean): void;
    }

    interface TabClickData {
        /** Returns a string indicating any qualifier keys that were held down by the user when the event was triggered.  
         * 
         * The string can contain any or all of the following: *shift*, *ctrl*, *alt*, *lwin*, *rwin*.
         * 
         * If no qualifiers were down, the string will be: *none* */
        qualifiers: string;
        /** Returns a {@link Tab} object representing the tab that was clicked. */
        tab: Tab;
    }

    interface TabGroup {
        /** True if the **Close existing folder tabs when opening this group** option is turned on for this group. Only present when the *folder* property is False. */
        closeexisting: boolean;
        /** The description of this tab group, if any. Only present when the *folder* property is False. */
        desc: string;
        /** True if the **Define tabs on specific sides of a dual-display Lister** option is turned on for this group. Only present when the *folder* property is False. */
        dual: boolean;
        /** True if this object represents a folder within the tab group list, False if it's an actual tab group. */
        folder: boolean;
        /** True if this tab group or folder should be hidden from menus which list tab groups. The group will still always be visible in Preferences. */
        hidden: boolean;
        /** Returns a {@link TabGroupTabList} object representing the tabs in this group that open in the left/top side of a dual-display Lister. Only present when the *folder* property is False and the *dual* property is True. */
        lefttabs: TabGroupTabList;
        /** The name of this group or folder. */
        name: string;
        /** Returns a {@link TabGroupTabList} object representing the tabs in this group that open in the right/bottom side of a dual-display Lister. Only present when the *folder* property is False and the *dual* property is True. */
        righttabs: TabGroupTabList;
        /** Returns a {@link TabGroupTabList} object representing the tabs in this group. Only present when both the *folder* and *dual* properties are False. */
        tabs: TabGroupTabList;
        /** Adds a new sub-folder to this tab group folder. Only available when the *folder* property is True. You can either provide a TabGroup object (which itself has the folder property set to True) or the name for the new folder. If the operation succeeds a TabGroup object is returned which represents the new folder. If the operation fails False is returned. */
        AddChildFolder(TabGrouporstring: object): TabGroup;
        /** Adds a new tab group to this tab group folder. Only available when the *folder* property is True. You can either provide a TabGroup object or the name for the new group. If the operation succeeds a TabGroup object is returned which represents the new tab group. If the operation fails False is returned. */
        AddChildGroup(TabGrouporstring: object): TabGroup;
        /** Deletes the child item (folder or tab group). */
        DeleteChild(TabGroup: object): void;
        /** Returns a duplicate of this tab group or folder. When it's returned the duplicate has not yet been added to a tab list. */
        Duplicate(): TabGroup;
        /** In a tab group that has specific left and right tabs specified, this method links together a tab from the left side and a tab from the right side. Only available if the *dual* property is set to True. You can provide {@link TabGroupTabEntry} objects or the index numbers of the tabs you want to link. 
         * 
         * The optional *type* parameter can be set to **"s**lave" to specify that the tabs should be slaved to each other. */
        Link(TabGroupTabEntry: object, TabGroupTabEntry: object, type?: string): void;
        /** Unlinks the specified tab from its partner. Only available if the *dual* property is set to True. */
        Unlink(TabGroupTabEntry: object): void;
    }

    interface TabGroups {
        /** Indexed access */
        (index: number): TabGroup;
        /** Adds a new folder to the list of tab groups. You can either provide a {@link TabGroup} object (which has the folder property set to True) or the name for the new folder. If the operation succeeds a {@link TabGroup} object is returned which represents the new folder. If the operation fails False is returned. */
        AddChildFolder(TabGrouporstring: object): TabGroup;
        /** Adds a new tab group to the list of tab groups. You can either provide a {@link TabGroup} object or the name for the new group. If the operation succeeds a {@link TabGroup} object is returned which represents the new tab group. If the operation fails False is returned. */
        AddChildGroup(TabGrouporstring: object): TabGroup;
        /** Deletes the child item (folder or tab group). */
        DeleteChild(TabGroup: object): void;
        /** Saves the tab group list and any changes you have made.  
         * 
         * Note that this only saves changes made to the object it is called on, and each use of **DOpus.TabGroups** creates a new, independent object. 
         * Therefore, you should modify tab groups like this (JScript):
         * ```javascript
         *  var tabGroups = DOpus.TabGroups; 
         *  var group = tabGroups.AddChildGroup("New Tab Group"); 
         *  if (!group)
         *  	DOpus.Output("Group already exists");
         *  else {
         *  	group.desc = "Example description";
         *  	var tabs = group.tabs;
         *  	tabs.AddTab("C:\\");
         *  	tabGroups.Save();
         *  }
         * ```
         * 
         *       And not like this:
         * 
         * ```javascript
         *  // This will not work correctly.
         *  var group = DOpus.TabGroups.AddChildGroup("New Tab Group");
         *  if (!group)
         *  	DOpus.Output("Group already exists");
         *  else {
         *  	group.desc = "Example description";
         *  	group.tabs.AddTab("C:\\");
         *  	DOpus.TabGroups.Save(); // <-- Incorrect
         *  }
         * ```
         * 
         * The second example will not work because the last line creates a second, unrelated snapshot of the current state, which is unaffected by the unsaved changes to the first snapshot, and then saves the second snapshot without making any changes to it. */
        Save(): void;
        /** Updates the {@link TabGroups} object to reflect any changes made through the Preferences user interface. */
        Update(): void;
    }

    interface TabGroupTabEntry {
        /** Returns the color, if any, assigned to this tab. */
        color: string;
        /** Returns the folder format of this tab. */
        format: Format;
        /** Returns the link ID of this tab, if it is linked to another tab. Both tabs will have the same link ID but otherwise the value is meaningless. Use the {@link TabGroup.Link} and {@link TabGroup.Unlink|Unlink} methods to change tab linkage. */
        linkid: number;
        /** If this tab is linked as a slave, returns the string **"slave"**. */
        linktype: string;
        /** Returns the lock type of this tab. Valid values are **"on"**, **"off"**, **"changes"** and **"reuse"**. */
        locked: 'off' | `on` | 'changes' | 'reuse';
        /** Returns the name of this tab if one is assigned. Tabs that don't have specific names assigned will usually show the last component of the path as their name. */
        name: string;
        /** Returns the path that this tab will load when it's opened. */
        path: Path;
        /** Returns a duplicate of this tab entry. */
        Duplicate(): TabGroupTabEntry;
    }

    interface TabGroupTabList {
        /** Returns a {@link TabGroupTabEntry} object representing the active (default) folder tab in this tab list. */
        active: TabGroupTabEntry;
        /** Adds a folder tab entry to this list. You can provide a {@link TabGroupTabEntry} object, or the *path* and optional *name* of the new folder tab. */
        AddTab(tabGroupTabEntry: TabGroupTabEntry): TabGroupTabEntry;
        /** Adds a folder tab entry to this list. You can provide a {@link TabGroupTabEntry} object, or the *path* and optional *name* of the new folder tab. */
        AddTab(path: string, name?: string): TabGroupTabEntry;
        /** Deletes a folder tab entry from this list. You can provide a {@link TabGroupTabEntry} object, or the index of the tab entry to delete. If you specify the index as -1 then all tab entries will be deleted. */
        DeleteTab(tabEntryOrIndex: TabGroupTabEntry | number): void;
        /** Inserts a folder tab entry to this list. You can provide a {@link TabGroupTabEntry} object, or the *path* and optional *name* of the new folder tab. The final parameter must be the index indicating the desired insertion position. */
        InsertTabAt(tabGroupTabEntry: TabGroupTabEntry, index: number): TabGroupTabEntry;
        /** Inserts a folder tab entry to this list. You can provide a {@link TabGroupTabEntry} object, or the *path* and optional *name* of the new folder tab. The final parameter must be the index indicating the desired insertion position. */
        InsertTabAt(path: string, name?: string, index: number): TabGroupTabEntry;
        /** Moves the specified tab entry to a new position, and optionally a new tab list. If the second parameter is a {@link TabGroupTabList} object then the tab entry will be moved to that list. The final parameter must be the index indicating the desired insertion position. */
        MoveTabTo(tabGroupTabEntry: TabGroupTabEntry, destTabGroupTabList?: TabGroupTabList, index: number): void;
    }

    interface TabStats {
        /** Returns the width in pixels of the largest image in the folder. */
        bigimage_h: number;
        /** Returns the height in pixels of the largest image in the folder. */
        bigimage_w: number;
        /** Returns the total number of bytes in the folder as a {@link FileSize} object. */
        bytes: FileSize;
        /** Returns True if the tab is currently in Checkbox Mode. */
        checkbox_mode: boolean;
        /** Returns the total number of bytes in checked items as a {@link FileSize} object. */
        checkedbytes: FileSize;
        /** Returns the total number of bytes in checked folders as a {@link FileSize} object. */
        checkeddirbytes: FileSize;
        /** Returns the total number of checked folders. */
        checkeddirs: number;
        /** Returns the total number of checked items that exist within expanded folders. */
        checkedexpanded: number;
        /** Returns the total number of bytes in checked files as a {@link FileSize} object. */
        checkedfilebytes: FileSize;
        /** Returns the total number of checked files. */
        checkedfiles: number;
        /** Returns the total number of checked items. */
        checkeditems: number;
        /** Returns the total length in seconds of all checked music files. */
        checkedmusiclength: number;
        /** Returns the total number of bytes in all folders as a {@link FileSize} object. */
        dirbytes: FileSize;
        /** Returns the total number of folders. */
        dirs: number;
        /** Returns the total number of items that exist within expanded folders. */
        expandedcontents: number;
        /** Returns the number of folders that have their contents expanded. */
        expandeddirs: number;
        /** Returns the total number of bytes in all files as a {@link FileSize} object. */
        filebytes: FileSize;
        /** Returns the latest (most recent) file Date in the folder. */
        filedate_max: DOpusDate;
        /** Returns the earliest (oldest) file date in the folder. */
        filedate_min: DOpusDate;
        /** Returns the total number of files. */
        files: number;
        /** Returns the total number of items. */
        items: number;
        /** Returns the size of the largest file in the folder as a {@link FileSize} object. */
        largestfile: FileSize;
        /** Returns the total length in seconds of all music files. */
        musiclength: number;
        /** Returns the total number of bytes in all selected items as a {@link FileSize} object. */
        selbytes: FileSize;
        /** Returns the total number of bytes in all selected folders as a {@link FileSize} object. */
        seldirbytes: FileSize;
        /** Returns the number of selected folders. */
        seldirs: number;
        /** Returns the total number of selected items that exist within expanded folders. */
        selexpanded: number;
        /** Returns the total number of bytes in all selected files as a {@link FileSize} object. */
        selfilebytes: FileSize;
        /** Returns the number of selected files. */
        selfiles: number;
        /** Returns the number of selected items. */
        selitems: number;
        /** Returns the total length in seconds of all selected music files. */
        selmusiclength: number;
        /** The first time a script accesses a particular **TabStats** object, a snapshot is taken of the tab state. If the script then makes changes to that tab (e.g. it selects files, creates a new folder, etc), these changes will not be reflected by the object. To re-synchronize the object with the tab, call the **TabStats.Update** method. */
        Update(): void;
    }

    interface Toolbar {
        /** Returns True if this is a default (factory-provided) toolbar, or False if it was user-created.  (Old scripts may use "default" instead of "deftoolbar"; this is deprecated because it does not work in JScript where "default" is a reserved keyword.) */
        deftoolbar: boolean;
        /** Returns a collection of {@link Lister} objects representing any and all Listers this toolbar is currently open in. */
        listers: Lister[];
        /** Returns a collection of {@link Dock} objects representing any currently floating instances of this toolbar. */
        docks: Dock[];
        /** Returns a *string* indicating the group (position) of a particular instance of this toolbar. The returned string will be one of *top*, *bottom*, *left*, *right*, *center*, *fdright*, *fdbottom*, *tree*. */
        group: string;
        /** Returns the line number within the toolbar's group that it resides on. For example, the first toolbar at the top of the Lister would have a line of 0. */
        line: number;
        /** Returns the pixel position from the left/top of the toolbar's line. If there are two or more toolbars with the same **line** number, the **pos** value determines the order they appear in. */
        pos: number;
        /** Default Value.
         * Returns the name of the toolbar.
         */
        toString(): string;
        /** Default Value.
         * Returns the name of the toolbar.
         */
        valueOf(): string;
    }

    interface Toolbars {
        /** Indexed access */
        (index: number): Toolbar;
        /** Returns the name(s) of the currently selected File Display Toolbar(s).
         * 
         * If the FDB toolbar is disabled, returns the string **!static** to indicate a static header.
         * 
         * If there is only one FDB toolbar configured (the usual case), it is returned as a simple string.
         * 
         * If more than one FDB toolbar is configured, a {@link Vector} of strings is returned.  
         * 
         * You can use `DOpus.toolbars.fdb(0)` in both JScript and VBScript if you just want the name of the first toolbar without worrying about whether the number of other toolbars (if any). Otherwise, use **TypeName(…)** in VBScript and **typeof** in JScript to determine the return type. */
        fdb: string | Vector<string>;
        /** Returns the name of the currently selected Viewer Toolbar. */
        viewer: string;
    }

    interface UnorderedSet {
        /** Returns the number of elements the **UnorderedSet** currently holds. */
        count: number;
        /** Returns True if the **UnorderedSet** is empty, False if not. */
        empty: boolean;
        /** A synonym for **count**. */
        length: number;
        /** A synonym for **count**. */
        size: number;
        /** Copies the contents of another {@link UnorderedSet} to this one. You can also pass an array or {@link Vector} object. */
        assign(from: UnorderedSet): void;
        /** Clears the contents of the **UnorderedSet**. */
        clear(): void;
        /** Erases the element if it exists in the set. */
        erase(element: any): void;
        /** Returns True if the specified element exists in the set. */
        exists(element: any): boolean;
        /** Inserts the element into the set if it doesn't already exist. Returns True if successful. */
        insert(element: any): boolean;
        /** Merges the contents of another **UnorderedSet** with this one. */
        merge(from: UnorderedSet): void;
    }

    /**
     * The UnresolvedFiles object contains a subset of the items in a Tab object relating to file and folder lists. 
     * It provides the same set of files in an unresolved state. This is mostly useful with file collections 
     * which normally return the resolved path - accessing through the unresolved objects will return 
     * the native coll:// paths instead.
     */
    interface UnresolvedFiles {
        /** Returns an {@link Items} object that represents all the files and folders currently displayed in this tab.
         * 
         * Note: The first time a script accesses this property (and all the other properties that return an {@link Items} object), a snapshot is taken of all the appropriate items. If the script then makes changes to those items (e.g. by creating a new file, modifying the selection, etc), these changes will not be reflected by the collection. To re-synchronize the collection call the **Update** method on the object.
         */
        all: Items;
        /** Returns an {@link Items} object that represents all the folders currently displayed in this tab. */
        dirs: Items;
        /** Returns an {@link Items} object that represents all the files currently displayed in this tab. */
        files: Items;
        /** Returns an {@link Items} object that represents all the files and folders currently hidden from this tab. */
        hidden: Items;
        /** Returns an {@link Items} object that represents all the folders currently hidden from this tab. */
        hidden_dirs: Items;
        /** Returns an {@link Items} object that represents all the files currently hidden from this tab. */
        hidden_files: Items;
        /** Returns an {@link Items} object that represents all the files and folders currently displayed in this tab that have one or more cells highlighted. */
        highlighted: Items;
        /** Returns an {@link Items} object that represents all the selected files and folders currently displayed in this tab. Note that if checkbox mode is turned on in the tab, this will be a collection of checked items rather than selected.*/
        selected: Items;
        /** Returns an {@link Items} object that represents all the selected folders currently displayed in this tab. */
        selected_dirs: Items;
        /** Returns an {@link Items} object that represents all the selected files currently displayed in this tab. */
        selected_files: Items;
    }

    /**
     * The UnsortedFiles object contains a subset of the items in a Tab object. 
     * It is similar to the UnresolvedFiles object, but provides files in an unresolved AND unsorted state.
     * It is obtained from a Tab object and provides the same set of files in an unsorted state. 
     * This is mostly useful with expanded sub-folders or FlatView mode, which normally depth-sort the returned files (deepest first) - accessing through the unsorted objects will return files in the order they appear in the file display.
     */
    interface UnsortedFiles {
        /** Returns an {@link Items} object that represents all the files and folders currently displayed in this tab.
         * 
         * Note: The first time a script accesses this property (and all the other properties that return an {@link Items} object), a snapshot is taken of all the appropriate items. If the script then makes changes to those items (e.g. by creating a new file, modifying the selection, etc), these changes will not be reflected by the collection. To re-synchronize the collection call the **Update** method on the object.
         */
        all: Items;
        /** Returns an {@link Items} object that represents all the folders currently displayed in this tab. */
        dirs: Items;
        /** Returns an {@link Items} object that represents all the files currently displayed in this tab. */
        files: Items;
        /** Returns an {@link Items} object that represents all the files and folders currently hidden from this tab. */
        hidden: Items;
        /** Returns an {@link Items} object that represents all the folders currently hidden from this tab. */
        hidden_dirs: Items;
        /** Returns an {@link Items} object that represents all the files currently hidden from this tab. */
        hidden_files: Items;
        /** Returns an {@link Items} object that represents all the files and folders currently displayed in this tab that have one or more cells highlighted. */
        highlighted: Items;
        /** Returns an {@link Items} object that represents all the selected files and folders currently displayed in this tab. */
        selected: Items;
        /** Returns an {@link Items} object that represents all the selected folders currently displayed in this tab. */
        selected_dirs: Items;
        /** Returns an {@link Items} object that represents all the selected files currently displayed in this tab. */
        selected_files: Items;
        /** Returns an {@link UnresolvedFiles} object that provides unresolved, unsorted file collections. */
        unresolved: UnresolvedFiles;
    }

    interface Var {
        /** Returns True if the variable exists, or False if it doesn't. When you index the {@link Vars} object by name, it will return a **Var** object event for non-existent values. You can use this property to check if they exist before attempting to read the value. */
        exists: boolean;
        /** Returns the name of the variable. You cannot change the name of a variable once it has been assigned - instead, delete the variable from its collection and add a new one. */
        name: string;
        /** Returns True if the variable is persistent (saved) or False if not. You can set this property to change the persistence state. */
        persist: boolean;
        /** Returns the value of the variable. You can set this property to change the value of the variable. You can store any type of variable in a Var object, although not all types can be saved to disk. If you want your variable to be persistent you should only use bool, int, string, date, currency or a {@link Vector} of those types. */
        value: any;
        /** Deletes this variable from its parent collection. */
        Delete(): void;
        /** Default Value.
         * The default value of the Var object returns the value of the variable itself, with one exception. 
         * If the Var object is being accessed as part of an enumeration of the Vars collection, the default value returns the variable name.
         * 
         * So for instance,
         * ```
         * For Each Var in DOpus.Vars
         * DOpus.Output("Variable name = " & Var)
         * Next
         * ``` 
         * 
         * Versus:
         * 
         * ```
         * Set Var = DOpus.Vars("myvar")
         * DOpus.Output("Variable value = " & Var)
         * ```
         */
        toString(): string;
        /** Default Value.
         * The default value of the Var object returns the value of the variable itself, with one exception. 
         * If the Var object is being accessed as part of an enumeration of the {@link Vars} collection, the default value returns the variable name.
         * 
         * So for instance,
         * ```
         * For Each Var in DOpus.Vars
         * DOpus.Output("Variable name = " & Var)
         * Next
         * ``` 
         * 
         * Versus:
         * 
         * ```
         * Set Var = DOpus.Vars("myvar")
         * DOpus.Output("Variable value = " & Var)
         * ```
         */
        valueOf(): any;
    }

    interface Vars {
        /** Indexed access */
        (index: number): Var;
        /** Deletes the named variable from the collection. You can also specify a wildcard pattern to delete multiple variables (or * for all). */
        Delete(name: string): void;
        /** Returns True if the named variable exists in the collection, or False if it doesn't exist. */
        Exists(name: string): boolean;
        /** Returns the value of the named variable.
         * 
         * You can use this method as an alternative to indexing the collection. One difference to note is that this method directly returns the value stored in the variable. If you need the {@link Var} object which contains the value (for example, to call var.Delete or change var.persist) then you should index the collection instead. An example of how to do that is in the Set documentation, just below.
         */
        Get(name: string): any;
        /** Sets the named variable to the specified value. You can use this method as an alternative to indexing the collection.
         * 
         * You can store any type of variable in a Vars collection, although not all types can be saved to disk (persistent). If you want your variable to be persistent, you should only use *bool*, *int*, *string*, *date*, *currency* or a {@link Vector} of those types.
         * 
         * Variables are not persistent by default. If you need them to be saved across a restart, you need to request it explicitly. Here is an example :
         * 
         * ```javascript
         *      var varName = "MyVariableName";
         * 
         *      if (DOpus.Vars.Exists(varName)) {
         *          var varValue1 = DOpus.Vars.Get(varName);
         *          DOpus.Output(varName + " = " + varValue1);
         *      } else {
         *          DOpus.Output(varName + " does not exist yet.");
         *      }
         * 
         *      var varValue2 = "My Variable Value";
         * 
         *      DOpus.Vars.Set(varName, varValue2);
         *      DOpus.Vars(varName).persist = true;
         *  ```
         * On the first run, the example code will say the variable does not exist, and set it to a value, turning on persistence afterwards. If it is then run again, it will report the variable's value before setting it again
         */
        Set(name: string, value: any): void;
    }

    interface Vector<T = any> {
        [index: number]: T;
        /** Returns the capacity of the **Vector** (the number of elements it can hold without having to reallocate memory). This is not the same as the number of elements it currently holds, which can be 0 even if the capacity is something larger. */
        capacity: number;
        /** Returns the number of elements the **Vector** currently holds. */
        count: number;
        /** Returns True if the **Vector** is empty, False if not. */
        empty: boolean;
        /** A synonym for **count**. */
        length: number;
        /** A synonym for **count**. */
        size: number;
        /** Copies the values of another *Vector* to the end of this one, preserving the existing values as well. If *start* and *end* are not provided, the entire Vector is appended - otherwise, only the specified elements are appended. 
         * 
         * Instead of a Vector object you can also pass a *collection* to this method and the contents of the collection will be copied to the end of the Vector.
         * 
         * In *JScript* you can pass a standard array to this method to copy the array to the end of a Vector. */
        append(from: Vector | any[], start?: number, end?: number): void;
        /** Copies the value of another **Vector** to this one. If start and end are not provided, the entire **Vector** is copied - otherwise, only the specified elements are copied. 
         * 
         * Instead of a Vector object you can also pass a *collection* to this method and the contents of the collection will be copied to the Vector. 
         * 
         * In *JScript* you can pass a standard array to this method to copy the array into a **Vector**. */
        assign(from: Vector, start?: number, end?: number): void;
        /** Returns the last element in the **Vector**. */
        back(): any;
        /** Clears the contents of the **Vector**. */
        clear(): void;
        /** Erases the element at the specified index. */
        erase(index: number): void;
        /** Exchanges the positions of the two specified elements. */
        exchange(index1: number, index2: number): void;
        /** Returns the first element in the Vector. */
        front(): any;
        /** Inserts the provided value at the specified position. */
        insert(index: number, value: any): void;
        /** Removes the last element of the Vector. */
        pop_back(): void;
        /** Adds the provided value to the end of the Vector. */
        push_back(value: any): void;
        /** Reserves space in the **Vector** for the specified number of elements (increases its capacity, although the count of elements remains unchanged). 
         * 
         * Note that **Vectors** grow dynamically - you don't have to specifically reserve or resize them. However if you want to add a large number of elements to a **Vector** it can be more efficient to reserve space for them first. */
        reserve(capacity: number): void;
        /** Resizes the **Vector** to the specified number of elements. Any existing elements past the new size of the **Vector** will be erased. */
        resize(size: number): void;
        /** Reverses the order of the elements held by the Vector. */
        reverse(): void;
        /** Reduces the capacity of the **Vector** to the number of elements it currently holds. */
        shrink_to_fit(): void;
        /** Sorts the contents of the Vector. Strings and numbers are sorted alphabetically and numerically - other elements are grouped by type but not specifically sorted in any particular order. */
        sort(): void;
        /** Removes all but one of any duplicate elements from the **Vector**. The number of elements removed is returned. */
        unique(): number;
    }

    /** Full version string (as shown in the About dialog). */
    interface Version {
        /** The current build number. */
        build: number;
        /** The current module version (the version of **dopus.exe** itself). You can also enumerate or index this as a *collection:number* to retrieve the individual four digits of the module version. */
        module: string;
        /** The current product version (the release version of Directory Opus as a whole). You can also enumerate or index this as a *collection:number* to retrieve the individual four digits of the product version. */
        product: string;
        /** Returns a {@link WinVer} object which provides information about the current version of Windows. */
        winver: WinVer;
        /** Returns True if the current version of Opus is the specified version or greater. You can specify the major version only (e.g. *"11"*), a major and minor version (e.g. *"11.3"*) or a specific beta version (e.g. *"11.3.1")*. */
        AtLeast(version: string): boolean;
        /** Default Value.
         * Full version string (as shown in the About dialog).
         */
        toString(): string;
        /** Default Value.
         */
        valueOf(): string;
    }

    interface VideoMeta {
        /** Returns the value of the specified column, as listed in the Movies section of the Keywords for Columns page. */
        [column: string]: any;
    }

    interface Viewer {
        /** Returns the bottom coordinate of the viewer window. */
        bottom: number;
        /** Returns an {@link Item} object representing the currently displayed image. */
        current: Item;
        /** Returns the ID of the virtual desktop this viewer is on. */
        desktop: string;
        /** Returns an {@link Items} object representing the images in the viewer's list. */
        files: Items;
        /** Returns True if the viewer is currently the foreground (active) window in the system. */
        foreground: boolean;
        /** Returns a {@link Rect} object representing the size of the currently displayed image (native size, ignoring any scaling). */
        imagesize: Rect;
        /** Returns the index of the currently viewed image within the viewer's list of files. */
        index: number;
        /** Returns True if the viewer is the most recently active viewer. */
        lastactive: boolean;
        /** Returns the left coordinate of the viewer window. */
        left: number;
        /** Returns a {@link Lister} object representing the Lister that launched the viewer (if there was one, and if it still exists) or, if viewer re-use is enabled, last sent files to the viewer.
         * 
         * There may be a **parentlister** object in situations where there is no longer a **parenttab** object.
         * For example, if the tab was closed since the viewer opened, or if a request to open an image from something other than a folder tab was received by the viewer, then there will no longer be a parenttab but the parentlister property will persist. 
         * 
         * This property is a snapshot of the situation when the **Viewer** scripting object was created; it won't change in reaction to script actions. */
        parentlister: Lister;
        /** Returns True if the viewer is in *Lister-Linked* mode with the parent Lister. This means the viewer acts like a detached preview pane, displaying each file as it is selected in the Lister. 
         * 
         * This property is a snapshot of the situation when the **Viewer** scripting object was created; it won't change in reaction to script actions. */
        parentlisterlinked: boolean;
        /** Returns a {@link Tab} object representing the tab that launched the viewer (if there was one, and if it still exists) or, if viewer re-use is enabled, last sent files to the viewer. 
         * 
         * If you want the {@link Lister} rather than the Tab, the **parentlister** property (above) should be used, as it is more persistent. Additionally, do not assume **parenttab** is still the active tab in the Lister; query the Lister object if you need that. 
         * 
         * This property is a snapshot of the situation when the **Viewer** scripting object was created; it won't change in reaction to script actions. */
        parenttab: Tab;
        /** Returns the right coordinate of the viewer window. */
        right: number;
        /** Returns a {@link Rect} object representing the current selection area (if any) of the image. If there's no selection the rectangle will be empty. */
        selection: Rect;
        /** Returns or sets the title bar string for the viewer window. You can use several special "tokens" in the title string to insert various pieces of information:
         * - %P  : full path of the currently viewed image
         * - %N  : name of the current displayed image
         * - %R  : drive root of the current image
         * - %E  : displays * if the image's metadata has been modified and not saved
         * - %I  : current image's index (number) in the list of images
         * - %O  : total number of images in the list
         * - %W  : width of the current image
         * - %H  : height of the current image
         * - %D  : depth of the current image (bits per pixel)
         * - %M  : current image's dimensions
         * - %S  : file size on disk
         * - %F  : folder name
         * - %C  : collection name if current image is marked
         * - %L  : any labels assigned to the current image
         * - %T  : original title (useful for simply adding a prefix or suffix to the title)
         * - %%  : insert a literal % character
         * 
        */
        title: string;
        /** Returns the top coordinate of the viewer window. */
        top: number;
        /** Adds the specified file to the viewer's current list of files. You can either pass a string or a {@link Path} object to indicate the file to  add to the list. 
         * 
         * By default the file will be added to the end of the list, unless you specify a 0-based index as the second argument. */
        AddFile(filepath: string | Path, index?: number): void;
        /** Runs a command in the context of this viewer window. You can either pass a string or a {@link Command} object. 
         * 
         * If the argument you pass is a string then it can only be a viewer command argument as documented for the `Show VIEWERCMD` command. For example, `Command("next")` would run the `Show VIEWERCMD=next` command in the context of this viewer. 
         * 
         * If you pass a {@link Command} object then all commands (internal or external) can be used. */
        Command(command: string | Command): void;
        /** Returns True if the viewer is on the current virtual desktop. */
        IsOnCurrentDesktop(): boolean;
        /** Moves the viewer window to the specified virtual desktop. Returns True if successful. */
        MoveToDesktop(desktop: string): boolean;
        /** Removes the specified file from the viewer's current list of files. You can either pass the 0-based index of the file to remove, or the filepath (either as a string or a {@link Path} object). */
        RemoveFile(index: number): void;
        /** Removes the specified file from the viewer's current list of files. You can either pass the 0-based index of the file to remove, or the filepath (either as a string or a {@link Path} object). */
        RemoveFile(filepath: string | Path): void;
        /** Used to change how the viewer window is grouped with other Opus windows on the taskbar. 
         * 
         * Specify a group name to move the window into an alternative group, or omit the group argument to reset back to the default group. If one or more windows are moved into the same group, they will be grouped together, separate from other the default group.
         * 
         * This only works when taskbar grouping is enabled. Group names are limited to 103 characters and will be truncated if longer. Spaces and dots in group names are automatically converted to underscores. 
         * 
         * Returns true on success. */
        SetTaskbarGroup(group: string): boolean;
    }

    /** Lets you enumerate the currently open viewers. */
    interface Viewers {
        /** Index based access */
        (index: number): Viewer;
        /** Returns a {@link Viewer} object representing the most recently active viewer window. */
        lastactive: Viewer;
        /** The first time a script accesses the **DOpus.viewers** property, a snapshot is taken of all currently open viewers. If anything opens or closes viewers after this, these changes will not be reflected by snapshot unless you re-synchronize it by calling the Update method. */
        Update(): void;
    }

    interface ViewerEventData {
        /** Returns a string indicating the event that occurred. The events currently defined are:
         * - **create**: A new viewer has been created.
         * - **destroy**: A viewer window has been destroyed.
         * - **load**: A new image has been loaded in a viewer. The **item** property can be used to find out which file was loaded.
         * - **setfocus**: The viewer window has received focus (gone active).
         * - **killfocus**: The viewer window has lost focus (gone inactive).
         * - **click**: The left button was clicked on the image (requires mouse buttons to be set to trigger *Script event* in **Preferences / Viewer / Mouse Buttons**).
         * - **dblclk**: The left button was double-clicked on the image.
         * - **mclick**: The middle button was clicked on the image.
         */
        event: string;
        /** For the **load** event, returns an {@link Item} object representing the newly loaded image. */
        item: Item;
        /** Returns a {@link Viewer} object representing the viewer the event occurred in. */
        viewer: Viewer;
        /** For the click events, returns the x coordinate within the viewer window that the click occurred. */
        x: number;
        /** For the click events, returns the y coordinate within the viewer window that the click occurred. */
        y: number;
        /** For the click events, returns the width of the viewer window. */
        w: number;
        /** For the click events, returns the height of the viewer window. */
        h: number;
    }

    /** Returns the current pattern in the Wild object */
    interface Wild {
        /** Escapes all wildcard characters in the input string and returns the result. For example, **"the \* 'dog' said \*"** would be conterted to **"the '\* "dog" said '\*"**.
         * 
         * The optional *type* argument lets you specify the conversion:
         * - *none*: Escape characters used in standard pattern matching
         * - r: Escape characters used in regular expressions
         * - b: Double all back-slashes
         * - n: Double all back-slashes that come before the letter '**n**'
         * 
         * Note that these modes ***cannot*** be combined. */
        EscapeString(input: string, type?: string): string;
        /** Compares the specified string against the previously-parsed pattern, and returns True if it matches. */
        Match(test: string): boolean;
        /** Parses the supplied pattern. 
         * The flags string is optional - if supplied it must be a string consisting of one or more of the following characters:
         * - c : consider case when performing the operation
         * - x : simple matching against multiple file extensions
         * - d : support DOS wildcard characters only
         * - r : use regular expression
         * - h : easy handling for file paths (\ and / are considered the same)
         * - a : "any word" mode
         * - i : ignore diacritics
         * - f : support filetype groups
         * - p : partial matching
         * - n : force partial match on for regular expression (see below)
         * 
         * By default this uses standard pattern matching - specify the **r** flag to use regular expressions instead. 
         * 
         * For regular expression, partial match is automatically disabled if the pattern begins or ends with a `.*` sequence. To prevent this, specify the **n** flag. This forces partial match (as the "normal" regex behaviour), but you can perform a non-partial match by adding `^` to the start and `$` to the end of the pattern.
         */
        Parse(pattern: string, flags?: string): boolean;
        /** Default Value.
         * Returns the current pattern in the Wild object
         */
        toString(): string;
        /** Default Value.
         * Returns the current pattern in the Wild object
         */
        valueOf(): string;
    }    

    /** Full Windows version string. */
    interface WinVer {
        /** True if running on a Server edition of Windows. */
        server: boolean;
        /** True if running on Windows XP. */
        xp: boolean;
        /** True if running on Windows XP or better (this will always be true). */
        xporbetter: boolean;
        /** True if running on Windows Vista. */
        vista: boolean;
        /** True if running on Windows Vista or better (later). */
        vistaorbetter: boolean;
        /** True if running on Windows 7. */
        win7: boolean;
        /** True if running on Windows 7 or better. */
        win7orbetter: boolean;
        /** True if running on Windows 8. */
        win8: boolean;
        /** True if running on Windows 8 or better. */
        win8orbetter: boolean;
        /** True if running on Windows 8.1. */
        win81: boolean;
        /** True if running on Windows 8.1 or better. */
        win81orbetter: boolean;
        /** True if running on Windows 10. */
        win10: boolean;
        /** True if running on Windows 10 or better. */
        win10orbetter: boolean;
        /** True if running on Windows 11. */
        win11: boolean;
        /** True if running on Windows 11 or better. */
        win11orbetter: boolean;
    }

    type Map = any;
    interface DOpusMapObject<TKey = any, TValue = any> {
        /** Returns the value associated with the specified key. */
        (key: TKey): TValue;

        /** Number of elements the **Map** currently hoolds. */
        count: number;
        /** True if the map is empty. */
        empty: boolean;
        /** Synonym for **count**. */
        length: number;
        /** Synonym for **count**. */
        size: number;

        /** Copies the contents of another **Map** into this one. */
        assign(from: DOpusMap<any, any>): void;
        /** Clears the contents of the **Map**. */
        clear(): void;
        /** Erases the specified element if it exists. */
        erase(key: TKey): void;
        /** Returns True if the specified key exists. */
        exists(key: TKey): boolean;
        /** Returns the value associated with the specified key. */
        get(key: TKey): TValue;
        /** Merges the contents of another **Map** with this one. Where the same key exists in both maps, the existing value will be kept. You can do the merge the other way around if you want the opposite. */
        merge(from: DOpusMap<any, any>): void;
        /** Sets the value of the specified key. */
        set(key: TKey, value: TValue): void;
    }

    type DOpusMap<TKey = any, TValue = any> = { (key: TKey): TValue; } & DOpusMapObject<TKey, TValue>;

    interface DOpusOrderedMapObject<TKey = any, TValue = any> extends DOpusMapObject<TKey, TValue> {}
    
    type DOpusOrderedMap<TKey = any, TValue = any> = { (key: TKey): TValue; } & DOpusOrderedMapObject<TKey, TValue>;

    var DOpus: DOpus;


    // --- SIGNATURES DES ÉVÉNEMENTS (EXTRACTION STRICTE DU JSON) ---

    /** The OnAboutScript event can be implemented by a script add-in to display an "about" dialog to the user. It is triggered when the user clicks the *About* button for a script on the Script Management dialog.
     * 
     * The usual implementation for this event would use the {@link AboutData.window} parameter to display a dialog using the {@link Dialog} object.
     */
    type OpusOnAboutScript = (aboutData: AboutData) => void;

    /** The OnActivateLister event can be implemented by a script add-in to receive notification whenever a Lister window becomes the active window, or loses activation to another window.
     * 
     * The {@link ActivateListerData.lister} property identifies the Lister, and the **active** property indicates whether this Lister has become active or inactive. If the activation moves from one Lister to another this event would be called twice, once for each Lister. 
     */
    type OpusOnActivateLister = (activateListerData: ActivateListerData) => void;

    /** The OnActivateTab event can be implemented by a script add-in to receive a notification every time a tab becomes active (i.e. comes to the front of another tab in the same file display).
     * 
     * The {@link ActivateTabData.oldtab} property identifies the tab that was previously active, and the **newtab** property identifies the new active tab.
     */
    type OpusOnActivateTab = (activateTabData: ActivateTabData) => void;

    /** The OnAddButtons event can be implemented by a script add-in to add dynamic buttons to toolbars and menus. Scripts do this by adding new internal commands to Opus, specifying one or more arguments that are used to generate dynamic buttons.
     * 
     * For example, a function called `Foo` might have an argument `BAR` that's used to generate a number of buttons. When the user adds a toolbar button with the command `Foo BAR`, your script's **OnAddButtons** event would be called to generate dynamic buttons that are shown on the toolbar. Any buttons it creates will be displayed in place of the original button, and the original button will be hidden (except in Customize mode).
     * 
     * The arguments that generate dynamic buttons are specified when adding the custom command via the `dynamic_args` property of the {@link ScriptCommand} object.
     */
    type OpusOnAddButtons = (addButtonsData : AddButtonsData) => void;

    /** The OnAddColumns event is called to allow your script add-in to add columns. Call the {@link AddColData.AddColumn} method once for each column you wish to add.
     * 
     * When Opus starts up, or when a script add-in is added, edited or enabled, its **OnAddColumns** method is called. This allows a script to add columns to Opus. A script can reinitialize its list of columns at any time by calling the {@link Script.InitColumns} method.
     */
    type OpusOnAddColumns = (addColData: AddColData) => void;

    /** The OnAddCommands event is called to allow your script add-in to add internal commands. Call the {@link AddCmdData.AddCommand} method once for each command you wish to add.
     * 
     * When Opus starts up, or when a script add-in is added, edited or enabled, its **OnAddCommands** method is called. This allows a script to add internal commands to the Opus command set. A script can reinitialize its list of commands at any time by calling the {@link Script.InitCommands} method.
     */
    type OpusOnAddCommands = (addCmdData: AddCmdData) => void;

    /** The OnAddConfigPages event can be implemented by a script add-in to add custom configuration pages to the script configuration dialog. The **addConfigPagesData** parameter needs to be provided to the DialogAddConfigPages method called from this event. */
    type OpusOnAddConfigPages = (addConfigPagesData: AddConfigPagesData) => void;

    /** The OnAfterFolderChange event can be implemented by a script add-in that wants to be notified after a new folder has been read in a tab. Use the {@link OpusOnBeforeFolderChange|OnBeforeFolderChange} event to receive notification *before* the folder is read.
     * 
     * The {@link AfterFolderChangeData.tab} property indicates the tab and the path property the **path** of the folder. The **result** property indicates the success or failure of the folder read.
     * 
     * If **result** is False (i.e. the folder was not successfully read) then you can return True from this event to stop Opus from going back to the previous folder (which is what normally happens when a folder read fails). If **result** is True then the return value from this event is ignored.
     */
    type OpusOnAfterFolderChange = (afterFolderChangeData: AfterFolderChangeData) => boolean;

    /** The OnBeforeFolderChange event can be implemented by a script add-in to receive notification before a new folder is read in a tab. Use the {@link OpusOnAfterFolderChange|OnAfterFolderChange} event if you want notification *after* a folder has been read.
     * 
     * The {@link BeforeFolderChangeData.tab} property identifies the tab, and the **path** property identifies the folder about to be read. The **initial** property indicates if this is the first folder read into this tab - if True, it means the tab was previously empty or newly opened.
     * 
     * You can return two different types from this event:
     * - bool: If you return True, the folder read will be blocked and the tab will be unchanged. If you return False the read will be allowed to continue (this is the default).
     * - string: You can return a string (or a {@link Path} object) to change the folder path to be read.
     */
    type OpusOnBeforeFolderChange = (beforeFolderChangeData: BeforeFolderChangeData) => boolean | string | Path | void;

    /** The **OnButtonContext** event can be implemented by a script add-in that adds one or more new this by adding new internal commands to Opus. Individual command arguments can be flagged as needing context-sensitive state.
     * 
     * For example, a function called `Foo` might have an argument `BAR` that should appear highlighted in certain situations. When the user adds the command `Foo BAR` to a toolbar, your script's **OnButtonContext** event is called to update the button's state.
     * 
     * The arguments that require context-sensitive state are specified when adding the custom command via the `context_args` property of the {@link ScriptCommand} object.
     */
    type OpusOnButtonContext = (buttonContextData: ButtonContextData) => void;

    /** The OnClipboardChange event can be implemented by a script add-in to receive notification whenever the contents of the system clipboard change. */
    type OpusOnClipboardChange = (clipboardChangeData: ClipboardChangeData) => void;

    /** The OnCloseLister event can be implemented by a script add-in to receive notification whenever a Lister is closed. */
    type OpusOnCloseLister = (closeListerData: CloseListerData) => boolean;

    /** The OnCloseTab event can be implemented by a script add-in to receive notification when a tab is closed in a Lister.
     * 
     * The {@link CloseTabData.tab} property identifies the tab that is closing. You can return True from this event to prevent the tab from closing, or False (which is the default) to allow it to close.
     * 
     * Note that when a Lister closes this event is **not** triggered for each of its tabs - the {@link OpusOnCloseLister|OnCloseLister} event provides notification when a Lister closes, and all the tabs in that Lister as discoverable through the {@link CloseListerData.lister}.**tabs** property.
     */
    type OpusOnCloseTab = (closeTabData: CloseTabData) => boolean;

    /** The OnConfigBackup event can be implemented by a script add-in to receive notification when the Opus configuration is being backed up. */
    type OpusOnConfigBackup = (configBackupData: ConfigBackupData) => void;

    /** The OnConfigRestore event can be implemented by a script add-in to receive notification when the Opus configuration is being restored from a backup. */
    type OpusOnConfigRestore = (configRestoreData: ConfigRestoreData) => void;

    /** The OnConfigureScript event can be implemented by a script add-in. Similar to the OnAboutScript method, this lets a script take over the configuration function completely and display its own dialog when the config button is pressed. */
    type OpusOnConfigureScript = (configureScriptData: ConfigureScriptData) => void;

    /** The OnDeleteScript event can be implemented by a script add-in to receive notification when (if) it's deleted by the user via the Scripts management user interface. You might want to use this to cleanup any data files your script has created. */
    type OpusOnDeleteScript = (deleteScriptData: DeleteScriptData) => void;

    /** The OnDisplayModeChange event can be implemented by a script add-in to receive notification whenever the user changes the display mode in a tab.
     * 
     * The {@link DisplayModeChangeData.tab} property identifies the tab, and the **mode** property identifies the new display mode.*/
    type OpusOnDisplayModeChange = (displayModeChangeData: DisplayModeChangeData) => void;

    /** The OnDoubleClick event can be implemented by a script add-in to receive notification when the user double-clicks on a file or folder in a tab.
     * 
     * By default your event handler is passed an {@link Item} object corresponding to the item that was double-clicked. Because constructing an Item object may take some time (e.g. on a network drive) you have the option for your handler to be called twice - once with only the path to the **item**, and a second time (if desired) with the full Item object. To do this:
     * 1. Set the {@link ScriptInitData.early_dblclk} property to True when you initialize your script.
     * 2. Your **OnDoubleClick** event will then be called with a the **early** property set to True in the {@link DoubleClickData} object.
     * 3. When **early** is True, the **item** property is not present; instead, the **path** property provides the full path of the object, and the **is_dir** property indicates whether the item is a folder or file.
     * 4. When the **OnDoubleClick** method returns, it will be called a second time, with **early** set to False and a full {@link Item} object available in the **item** property.
     * 5. If you sets the **skipfull** property to True in the {@link DoubleClickData} object at the "early" stage, the second call to **OnDoubleClick** doesn't occur.
     */
    type OpusOnDoubleClick = (doubleClkData: DoubleClickData) => boolean | string;

    /** The OnFAYTClose event can be implemented by a script add-in to receive notification when the FAYT closes (assuming it has been used with a script FAYT command). */
    type OpusOnFAYTClose = (faytCloseData: FAYTCloseData) => void;

    /** The OnFilesystemChange event can be implemented by a script add-in to receive notification when monitored files or folders change. Monitoring is established by calling the {@link FSUtil.WatchChanges} method. */
    type OpusOnFilesystemChange = (filesystemChangeData: FilesystemChangeData) => void;

    /** The OnFileOperationComplete event can be implemented by a script add-in to receive notifications when certain file operations complete. Currently the only type of operation that supports this is the **Rename** command, but others may be added in the future.
     * 
     * Receiving notifications is a two-step process each time:
     * 1. When the operation starts, Opus will call your script with {@link FileOperationCompleteData.query} set to True.
     * The script should return True if it is interested in the operation, and False otherwise.
     * Notifications can incur a (usually small) memory and speed overhead, so scripts should avoid returning True when they won't really use the extra details. Similarly, scripts shouldn't do anything that would take a long time when deciding if they want a particular notification.
     * 2. If the script returned True the first time, Opus will call it some time later, when the operation completes. {@link FileOperationCompleteData.query} will be set to False this time.
     * The {@link FileOperationCompleteData.data} object will provide details about what happened. For example, data for a **Rename** operation will tell you which files were renamed and their new names.
     * 
     * Remember that operations can start and run in parallel. For example, the user may start a lengthy operation and then go to another tab and do some others there before the first one completes. Other scripts may also run operations in the background. Your scripts should be prepared to be queried about several operations in a row before their corresponding notifications come back.
     * 
     * Unless specified otherwise, data about all files affected by an operation will be returned via a single notification at the end, rather than separate notifications for each file.
     * 
     * Operations may be cancelled by the user (or pets, power cuts, etc.), so scripts shouldn't assume every positive query will result in a corresponding notification.
     */
    type OpusOnFileOperationComplete = (fileOperationCompleteData: FileOperationCompleteData) => boolean;

    /** The OnFlatViewChange event can be implemented by a script add-in to receive notification whenever the user changes the display mode in a tab. */
    type OpusOnFlatViewChange = (flatViewChangeData: FlatViewChangeData) => void;

    /** The OnGetCopyQueueName event can be implemented by a script add-in to override the default copy queue behavior when the *Automatically manage file copy queues* option on the Copying Files page in Preferences is turned on. The event is passed the default copy queue name along with information relating to the copy operation. It can accept the default queue name, provide its own or disable queuing and run the operation immediately.
     * 
     * - The {@link GetCopyQueueNameData.sourcetab} and {@link GetCopyQueueNameData.desttab|desttab} properties identify the {@link Tab} objects involved in the copy operation, and the {@link GetCopyQueueNameData.source|source} and {@link GetCopyQueueNameData.dest|dest} properties provide the source and destination {@link Path} objects.
     * - The {@link GetCopyQueueNameData.source_drives|source_drives} and {@link GetCopyQueueNameData.dest_drives|dest_drives} properties return a string consisting of **0** and **1** characters, indicating which physical drives are involved in the operation. For example, if drive `A:` was involved, the first character would be a **1**, otherwise it would be a **0**; if drive `B:` was involved, the second character would be a **1**, and so on.
     * - The {@link GetCopyQueueNameData.name|name} property indicates the default copy queue name, and {@link GetCopyQueueNameData.move|move} is True if the operation is a move rather than a copy.
     * 
     * You can accept the default name by returning False, or return the a new queue name to use. If you return True the queue will be bypassed. 
     */
    type OpusOnGetCopyQueueName = (getCopyQueueNameData: GetCopyQueueNameData) => string | boolean;

    /** The OnGetCustomFields event can be implemented by a rename script to add custom fields to the *Rename* dialog. This lets you provide one or more controls that users can use to pass parameters to your script. */
    type OpusOnGetCustomFields = (getCustomFieldsData: GetCustomFieldsData) => void;

    /** The OnGetNewName event is one of the three alternate entry points for rename scripts. The other two events - **Rename_GetNewName** and **Rename_GetNewName2**, are deprecated and should only be used for backwards compatibility with Opus 10.
     * 
     * When using a rename script, the **OnGetNewName** event is called for every selected file and folder, giving the script a chance to modify the name.
     * 
     * The {@link GetNewNameData.item} property identifies the item being renamed. You can access the item's metadata and other information using the various {@link Item} properties.
     * 
     * 
     * The {@link GetNewNameData.oldname|oldname} property returns the "old name" pattern as entered by the user in the rename dialog. The {@link GetNewNameData.newname|newname} property returns the proposed new name of the item. This represents the result of all the other non-scripted options in the rename dialog (capitalization, automatic numbering, etc).
     * 
     * You can return two different types from this event:     * 
     * - *bool*: If you return `True`, the item will not be renamed. If you return `False` (this is the default) the item will be renamed to the proposed new name (the {@link GetNewNameData.newname|newname} property).
     * - *string*: You can return a *string* to specify a new name for the item.
     */
    type OpusOnGetNewName = (getNewNameData: GetNewNameData) => string | boolean;

    /** The OnInit event is called once for each script add-in to initialize it. The event will be called on program startup, and also if a script is added or edited while Opus is already running. Implementing the **OnInit** event is optional, but highly recommended as it allows you to provide a name, description and other information to be shown to the user in Preferences. It also provides a way for a script to add internal commands and columns (although the {@link OpusOnAddCommands|OnAddCommands} and {@link OpusOnAddColumns|OnAddColumns} methods provide a better way to do this).*/
    type OpusOnInit = (initData: ScriptInitData) => boolean;

    /** The OnInitIncludeFile event is called once for each include file script to initialize it. Implementing this event is optional, but recommended as it allows you to provide a name, description and other information such as minimum version requirements. 
     * 
     * When Opus starts up, or when an include file script is added or edited, its **OnInitIncludeFile** method is called. This gives the include file a chance to tell Opus something about itself, by setting the various properties of the **IncludeFileInitData** object. */
    type OpusOnInitIncludeFile = (initData: IncludeFileInitData) => void;

    /** The OnListerResize event can be implemented by a script add-in to receive notification whenever a Lister window is resized.
     * 
     * The ListerResizeData.lister property identifies the Lister that was resized. */
    type OpusOnListerResize = (listerResizeData: ListerResizeData) => void;

    /** The OnListerUIChange event can be implemented by a script add-in to receive notification when the state of certain user interface elements in the Lister changes.
     * 
     * The {@link ListerUIChangeData.lister} property identifies the Lister, and the **change** property is a *string* indicating the element that changed. You can discover the actual state of the element using the {@link Command.IsSet} method. */
    type OpusOnListerUIChange = (listerUIChangeData: ListerUIChangeData) => void;

    /** The OnOpenLister event can be implemented by a script add-in to receive notification when a new Lister is opened.
     * 
     * The {@link OpenListerData.lister} property identifies the newly opened Lister.
     * 
     * This event is initially called immediately after the Lister has been created, before any folders have been read or any tabs have been opened. If you return True from this event, it will be called again after all tabs have been created. You can use the {@link OpenListerData.after} property to distinguish between these calls.
     */
    type OpusOnOpenLister = (openListerData: OpenListerData) => boolean;

    /** The OnOpenTab event can be implemented by a script add-in to receive notification when a new tab opens.
     * 
     * The {@link OpenTabData.tab} property identifies the the newly opened tab. Note that this method is not called when a new Lister is opened, irrespective of how many tabs it contains - instead, you can identify all the tabs in the newly opened Lister by implementing the {@link OpusOnOpenLister|OnOpenLister} event.*/
    type OpusOnOpenTab = (openTabData: OpenTabData) => void;

    /** The OnPeriodicTimer event can be implemented by a script add-in to have Opus call your script at regular intervals. The {@link DOpus.SetTimer} method can be used to create timers, and your **OnPeriodicTimer** method will be called regularly for each timer you create. 
     * 
     * The **id** property indicates which timer your method is being called for.
     */
    type OpusOnPeriodicTimer = (periodicTimerData: PeriodicTimerData) => void;

     /** The OnPowerEvent event can be implemented by a script add-in to have Opus notify your script whenever certain system power-related events occur. 
      * 
      * The **type** property indicates the event that occurred. */
    type OpusOnPowerEvent = (powerEventData: PowerEventData) => void;

    /** The OnQuickFilterChange event can be implemented by a script add-in to receive notification when the quick filter changes within a tab.
     * 
     * The {@link QuickFilterChangeData.tab} property identifies the Tab the change occured in. */
    type OpusOnQuickFilterChange = (quickFilterChangeData: QuickFilterChangeData) => void;

     /** The OnScheduledTimer event can be implemented by a script add-in to have Opus call your script when a specific date/time is reached. The {@link DOpus.SetScheduledTimer} method can be used to create timers, and your **OnScheduledTimer** method will be called at most one time for each timer you create.
      * 
      * The **id** property indicates which timer your method is being called for. */
    type OpusOnScheduledTimer = (scheduledTimerData: ScheduledTimerData) => void;

    /** The OnScriptColumn event is the entry point for a custom column added by a script add-in. The actual name of the event is defined by the script itself, when the column is added via the {@link ScriptInitData.AddColumn} method - **OnScriptColumn** is merely a placeholder name.
     * 
     * When a script add-in adds a new column using {@link ScriptInitData.AddCommand}, it specifies the name of its entry point with the {@link ScriptColumn.method} property. When Opus wants to retrieve the value of the column for a particular file or folder, Opus will call that method within your script.
     * 
     * The {@link ScriptColumnData.item} property provides information about the file or folder in question, and the **col** property identifies the column you should return data for (in case you use the one method for more than one columns).
     * 
     * The return value from this event is ignored - instead, you should return the column data (and optionally, sorting and grouping information) by setting the appropriate values in the {@link ScriptColumnData} object.
    */
    type OpusOnScriptColumn = (scriptColumnData: ScriptColumnData) => void;

    /** The OnScriptCommand event is the entry point for an internal command added by a script add-in. The actual name of the event is defined by the script itself, when the command is added via the {@link ScriptInitData.AddCommand} method - **OnScriptCommand** is merely a placeholder name.
     * 
     * When a script add-in adds a new internal command using {@link ScriptInitData.AddCommand}, it specifies the name of its entry point with the {@link ScriptCommand.method} property. When the internal command is run, Opus will call that method within your script.
     * 
     * The {@link ScriptCommandData.func} property provides information about the command environment (including any parsed arguments), and the {@link ScriptCommandData.cmdline|cmdline} property provides the raw command line that invoked your command.
     * 
     * Return the value `1` from this event if you want your function to be called once for each selected file. Otherwise your entry point will only be called once, and you can query all selected files using the various objects provided.
     * 
     * If this event returns True the function will be aborted - you might do this if an error occurs and the user chooses to abort the operation.
    */
    type OpusOnScriptCommand = (scriptCommandData: ScriptCommandData) => boolean | number;

    /** The OnScriptConfigChange event can be implemented by a script add-in to receive notification whenever the user modifies the script's configuration via the Preferences editor. */
    type OpusOnScriptConfigChange = (scriptConfigChangeData: ScriptConfigChangeData) => void;

    /** The OnScriptFAYTCommand event is the entry point for a script add-in that extends the FAYT field. The actual name of the event is defined by the script itself, when the command is added via the {@link ScriptInitData.AddCommand} method - **OnScriptFAYTCommand** is merely a placeholder name.
     * 
     * When a script extends the FAYT field by adding a new internal command using {@link ScriptInitData.AddCommand}, it specifies the name of its entry point with the {@link ScriptCommand.method} property. When the FAYT extension is triggered, Opus will call that method within your script.
     * 
     * The **ScriptFAYTCommandData** object provides information about what the user has typed to trigger your extension. 
     */
    type OpusOnScriptFAYTCommand = (scriptFAYTCommandData: ScriptFAYTCommandData) => void;

    /** The OnShutdown event can be implemented by a script add-in to receive notification when Opus is shutting down. 
     * 
     * Opus calls this event when it is shutting down. The {@link ShutdownData.endsession} property will be True if Opus is quitting because Windows is shutting down. If **endsession** is False, you can return True from this event to prevent Opus from quitting - the return value is ignored if Windows is shutting down too.
    */
    type OpusOnShutdown = (shutdownData: ShutdownData) => boolean;

    /** The OnSourceDestChange event can be implemented by a script add-in to receive notification whenever a tab's source/destination state changes. 
     * 
     * The {@link SourceDestData.tab} property identifies the tab, and the **source** and **dest** properties identify the new state (if both are False it means the tab is "off" - this can only happen in a single file-display Lister). */
    type OpusOnSourceDestChange = (sourceDestData: SourceDestData) => void;

    /** The OnStartup event can be implemented by a script add-in to receive notification when Opus starts up.
     * 
     * This event is only triggered when Opus starts up, therefore only script add-ins that are already installed will receive it. If a script is installed when Opus is already running it won't receive **OnStartup** until the next time Opus is started.
     */
    type OpusOnStartup = (startupData: StartupData) => void;

    /** The OnStyleSelected event can be implemented by a script add-in to receive notification when the user selects a new Lister style. 
     * 
     * The {@link StyleSelectedData.lister} property identifies the Lister, and the **style** property returns the name of the newly selected style.
     */ 
    type OpusOnStyleSelected = (styleSelectedData: StyleSelectedData) => void;

    /** The OnSystemSettingChange event can be implemented by a script add-in to receive notification when various system settings change.
     * 
     * The {@link SystemSettingChangeData.type} property identifies the setting that changed.
     */
    type OpusOnSystemSettingChange = (systemSettingChangeData: SystemSettingChangeData) => void;

    /** The OnTabClick event can be implemented by a script add-in to receive notification when a tab is clicked with a qualifier key held down. You can use this to override the default behavior (e.g. control-clicking tabs normally links them).
     * 
     * The {@link TabClickData.tab} property identifies the tab that was clicked. You can return True from this event to prevent the default action, or False (which is the default) to allow it to proceed. */
    type OpusOnTabClick = (tabClickData: TabClickData) => boolean | void;

    /** The OnViewerEvent event can be implemented by a script add-in to receive notification whenever certain events occur in the standalone image viewer. One possible use would be a script that automatically displays a floating toolbar whenever a standalone viewer is active, and hides it again when the window goes inactive or closes. 
     * 
     * The {@link ViewerEventData.viewer} property identifies the {@link Viewer} that the event occurred in. The **event** property returns a string identifying the event that occurred, and if applicable the **item** property identifies the {@link Item} involved.
    */
    type OpusOnViewerEvent = (viewerEventData: ViewerEventData) => void;


    // Autoriser TOUTE variable globale inconnue
    interface Object {
        [key: string]: any;
    }
    interface Window {
        [key: string]: any;
    }    
}
export {};


// V1.2 :
// - JSDoc updated up to (incl.) WinVer object (no more Objects)
// - Introduced type DopusDialogFactory (which extends Dialog). Used as a propery in DOpus interface. Allows both usage 'var dlg = DOpus.Dlg;' and 'var dlg = DOpus.Dlg();'
// - Changed type File to DOpusFile to avoid confusion with the standard File type in TypeScript. DOpusFile is now used for the file objects returned by Opus, and File is reserved for the standard JavaScript File type (e.g. from an <input type="file"> element).
// - MenuItem.submenu type change from boolean to Menu.
// - Menu.Show: fixed value (r > g) for right alignement. Documentation issue in Opus to report (the release notes from 13.21.1 were ok).
// - Fixed DOpus.LoadImage signatures (signature differs depending on the first parameter being a Blob or a string)
// - Updated to fit 13.24 updates to scripting interface



// V1.1 :
// - Updated to suit 13.23 changes
// - JSDoc updated up to FSUtil object (formatting and objects links)
// - BugFix for Objects typings:
//   - FSUtil.Hash (wrong signature)
//   - Added non documented (might be partial) Opus objects : AddConfigPagesData, ConfigureScriptData
// - BugFix for Scripting events typings:
//   - Multiple return types fixed to match documentation and actual behavior (e.g. OnTabClick, OnDoubleClick, OnGetNewName, etc.)
//   - Missing scripting event added : OnAddConfigPages, OnAddConfigPages, OnButtonContext, OnConfigBackup, OnConfigRestore, OnConfigureScript, OnDoubleClick, OnFAYTClose, OnFilesystemChange, OnFileOperationComplete, OnFlatViewChange, OnGetCopyQueueName, OnPeriodicTimer, OnPowerEvent, OnQuickFilterChange, OnScheduledTimer, OnStartup, OnStyleSelected.
//   - Hallucinated scripting events removed : OnClosePlugin, OnBeginDrag, OnConfigChange, OnGetHelp, OpusOnSelectionChange


// Notes : 

// * Reported on forum
// *************************
// * Documentation is missing description for OnAddConfigPages, OnConfigureScript (13.17)
// * Also misses the AddConfigPagesData, ConfigureScriptData objects (13.17)
// * Dialog.AddConfigPages is missing from the documentation, but is required for OnAddConfigPages (13.17)
// * OnOpenTab : First line "The On event" => "The OnOpenTab event"
// * OnScriptCommand : According to the description, you can either return True or 1 : return type should be int or type 

// * To report on forum
// **********************
// * DOpus.LoadImage has not been updated to integrate SVG support which leads to another signature (if svg code is provided as first argument, last argument is not alpha but remove_padding)