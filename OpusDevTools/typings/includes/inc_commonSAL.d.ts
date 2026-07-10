// --- START OF FILE inc_commonSAL.js ---

declare interface RunProcessResult {
    cmd: string;
    returncode: number;
    stdout: string;
    stderr: string;
}

declare interface OpusRunResult {
    cmd: string;
    returncode: boolean;
    exitcode?: number;
    stdout?: string;
    stderr?: string;
}

declare interface JsonFileResult {
    returnCode: boolean;
    obj: any;
}

declare interface TmpFileNameResult {
    path: string;
    name: string;
    fullname: string;
}

declare interface FolderStructure {
    path: string | Item;
    dirs: Vector<Item>;
    files: Vector<Item>;
    subdirs: DOpusMap<string, FolderStructure>;
    ReadDir(flags?: string): this;
}

declare var FolderStructure: {
    new(path: string | Item): FolderStructure;
};

/** Opens a simple message dialog.
 * @param title The title of the dialog.
 * @param message The message to display.
 * @param sourcetab The source tab to position the dialog over.
 */
declare function MsgDialog(title: string, message: string, sourcetab: Tab): void;

/**
 * Displays a confirmation dialog and returns the user's choice.
 * @param {string} title Title of the dialog
 * @param {string} message Message of the confirmation dialog
 * @param {Dialog|Tab|Lister} window Dialog, Tab or Lister to attach this dialog to. If Dialog provided, this makes this new Dlg modal.
 * @returns {number} The result of the Show() method of the Dlg, which is 1 for "Yes" or 0 for "No".
 */
declare function ConfirmDlg(title: string, message: string, window: Dialog | Tab | Lister | number): number;

/**
 * Displays a choose dialog with custom choices and returns the index of the choice made by the user.
 * @param {string} title Title of the dialog
 * @param {string} message Message of the choose dialog
 * @param {string[]} choices Liste of choices in the choose dialog
 * @param {Dialog|Tab|Lister} window Dialog, Tab or Lister to attach this dialog to. If Dialog provided, this makes this new Dlg modal.
 * @returns the result of the Show() method of the Dlg, which is the index of the button pressed (starting at 1), or 0 if the last button is pressed.
 */
declare function ChoiceDlg(title: string, message: string, choices: string[], window: Dialog | Tab | Lister | number): number;

declare function OpusRun(exe: string, params: string, show?: number, wait?: boolean | string, input?: string): boolean | OpusRunResult;
declare function GetObjectFromJsonFile(file: string): JsonFileResult;
declare function HorodateAndArchive(filePath: string, move?: boolean): boolean;
declare function forEach(col: any, func: (item: any) => boolean | void): void;
declare function formatDuration(ms: number): string;
declare function PrintArrayOneLine(array: any[]): string;
declare function console_comment(msg: string): void;
declare function GetLastPathPart(s: string | any): string;

declare namespace ExtSystem {
    /**
     * Executes a process using ActiveX Shell and returns detailed results.
     * @param exe Path to the executable
     * @param params All parameters as one string
     * @param tmpFileBase Optional base filename used to retrieve command output (default = DO.Temp.)
     * @param tmpFileExt Optional file extension used to retrieve command output (default = .txt)
     * @param shell Optional ActiveX Shell object to use for execution (default: creates a new one)
     * @param fso Optional ActiveX FileSystemObject to use for temp file management (default: creates a new one)
     * @return {RunProcessResult}
     *         An object containing the executed command, return code, and captured stdout/stderr content (RunProcessResult).
     */
    function RunHiddenEx(exe: string, params: string, tmpFileBase?: string, tmpFileExt?: string, shell?: any, fso?: any): RunProcessResult;
    /**
     * Executes a process using DOpusScriptingExtensions' Process Runner and returns detailed results.
     * @param exe Path to the executable
     * @param params Array of strings, each string is a command line parameter
     * @return {RunProcessResult}
     *         An object containing the executed command, return code, and captured stdout/stderr content (RunProcessResult).
     */
    function RunProcess(exe: string, params: string[]): RunProcessResult;
    function ReadFile(path: string, fso?: any) : string;
    function ReadFileUTF(path: string, utf?: string): string;
    function ReadFileByLines(path: string, fso?: any): Vector<string>;
    function GetTmpFileName(prefix?: string, extension?: string, fso?: any): TmpFileNameResult;
    function WriteFileUTF8(filePath: string, content: string, withBOM: boolean): boolean;
}
