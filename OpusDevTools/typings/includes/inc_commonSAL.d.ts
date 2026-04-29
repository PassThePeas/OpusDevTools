// --- START OF FILE inc_commonSAL.js ---

declare interface RunProcessResult {
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
    fukkname: string;
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

declare function MsgDialog(title: string, message: string, sourcetab: Tab);
declare function ConfirmDlg(title: string, message: string, window: Dialog | Tab | Lister | number): number;
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
    function RunHiddenEx(exe: string, params: string, tmpFileBase?: string, tmpFileExt?: string, shell?: any, fso?: any): RunProcessResult;
    function RunProcess(exe: string, params: string[]): RunProcessResult;
    function ReadFile(path: string, fso?: any) : string;
    function ReadFileUTF(path: string, utf?: string): string;
    function ReadFileByLines(path: string, fso?: any): Vector<string>;
    function GetTmpFileName(prefix?: string, extension?: string, fso?: any): TmpFileNameResult;
    function WriteFileUTF8(filePath: string, content: string, withBOM: boolean): boolean;
}
