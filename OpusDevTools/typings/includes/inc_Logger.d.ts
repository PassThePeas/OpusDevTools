// --- START OF FILE inc_Logger.js ---

declare var loggerScriptVersion: string;

declare namespace LoggerNS {
    enum LogLevel {
        Trace = 0,
        Debug = 1,
        Info = 2,
        Warn = 3,
        Error = 4,
        Fatal = 5,
    }

    enum TargetType {
        Console = 0,
        File = 1,
    }

    var debug: boolean;

    interface LoggerLayout {
        Separator: string;
        UseColor: boolean;
        IncludeInstanceId: boolean;
        IncludeDateTime: boolean;
        IncludeCallsite: boolean;
        IncludeLogLevel: boolean;
        FixedLengthCallSite: boolean;
        CallSiteLength: number;
        FixedLengthLogLevel: boolean;
    }

    interface LoggerTarget {
        name: string;
        minLevel: LogLevel;
        maxLevel: LogLevel;
        targetType: TargetType;
        logPath: string;
        logFilename: string;
        fullLogfilePath: string;
        disabled: boolean;
        archiveDelay: number;
        deleteDelay: number;
        version: string;
        defaultTarget: boolean;
        archiveOlder: boolean;
        layout: LoggerLayout;
        colors: DOpusMap<LogLevel, DOpusMap<string, { fg: string, bg: string }>>;

        info(msg: string): void;
        ExportToJSON(): string;
        ImportFromJSON(json: string): void;
        Clone(): LoggerTarget;
        ColorItem(loglevel: LogLevel, type: string, msg: string): string;
        toString(): string;
    }

    var LoggerTarget: {
        new(name?: string, minLevel?: LogLevel, maxLevel?: LogLevel, type?: TargetType, path?: string, filename?: string, archiveDelay?: number, deleteDelay?: number): LoggerTarget;
    };

    interface LoggerConfiguration {
        targets: Vector<LoggerTarget>;

        info(msg: string): void;
        AddTarget(target: LoggerTarget): void;
        getFirst(nameToMatch: string): LoggerTarget | undefined;
        getFirstIndex(nameToMatch: string): number;
        SavePersist(): void;
        Load(): this;
        ExportToJSON(): string;
        ImportFromJSON(json: string): void;
    }

    var LoggerConfiguration: {
        new(): LoggerConfiguration;
    };

    interface LoggerDateHour {
        year: number;
        month: string;
        day: string;
        hour: string;
        minute: string;
        second: string;
        msecond: string;
    }

    interface Logger {
        targets: Vector<LoggerTarget>;
        disabled: boolean;
        indentation: number;
        forcedLocalConsoleMinLevel: boolean;
        localConsoleMinLevel: number;
        maxId: number;
        Id: string;

        infoMessage(msg: string, force?: boolean): void;
        AdjustIndentation(inc: number): this;
        inc(): void;
        dec(): void;
        EnableForcedLocalConsoleMinLevel(minLevel: LogLevel): void;
        DisableForcedLocalConsoleMinLevel(): void;

        trace(msg: string, indentation?: number): void;
        debug(msg: string, indentation?: number): void;
        info(msg: string, indentation?: number): void;
        warn(msg: string, indentation?: number): void;
        error(msg: string, indentation?: number): void;
        fatal(msg: string, indentation?: number): void;

        trc(msg: string, indentation?: number): void;
        dbg(msg: string, indentation?: number): void;
        inf(msg: string, indentation?: number): void;
        wrn(msg: string, indentation?: number): void;
        err(msg: string, indentation?: number): void;
        fat(msg: string, indentation?: number): void;

        log(level: LogLevel, msg: string, caller?: string, indentation?: number): void;
        formatMessage(loggerTarget: LoggerTarget, caller: string, level: LogLevel, timestamp: LoggerDateHour, msg: string): string;
        isAllowedToLog(loggerTarget: LoggerTarget, level: LogLevel): boolean;
        GetCaller(): string;
        LoggerGetDateHour(): LoggerDateHour;
        formatDateHour(oDH: LoggerDateHour): string;
        formatFileDate(oDH: LoggerDateHour): string;
    }

    var Logger: {
        new(): Logger;
        new(config: LoggerConfiguration): Logger;
        new(...targets: LoggerTarget[]): Logger;
    };

    function ForceGlobalConsoleMinLogLevel(minLogLevel: LogLevel): void;
    function DisableForcedGlobalConsoleMinLogLevel(): void;
    function _CheckScriptVarsExists(): void;
    function _GetGlobalConsoleMinLevelStatus(): boolean;
    function _SetGlobalConsoleMinLevelStatus(value: boolean): void;
    function _GetGlobalConsoleMinLevel(): LogLevel;
    function _SetGlobalConsoleMinLevel(value: LogLevel): void;
    function BuildTargetFromJSON(json: string): LoggerTarget;
    function BuildTargetFromTemplate(templateName: string, filename: string): LoggerTarget;
    function BuildDefaultConfigurations(targetLogFilename: string): LoggerConfiguration;
    function BuildDefaultLogger(targetLogFilename: string): Logger;
    function GetLogLevelValue(strLevel: string): LogLevel | -1;
}

declare function print_names(...args: any[]): void;
declare function mySanitizeFilename(input: string, replacement?: string): string;

