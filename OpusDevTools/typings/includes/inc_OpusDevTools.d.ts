/**
 * Type definitions for OpusDevTools Include Script
 * (c) 2026 Stephane
 */

/**
 * Global Constants defined in inc_OpusDevTools.js
 */
declare const global_InstallPath: string;
declare const global_Mode_Varname: string;
declare const global_Mode_Val_Standard: string;
declare const global_Mode_Val_TestInstall: string;

/**
 * OpusDT_FileDef class to manage git sync & installation
 */
declare class OpusDT_FileDef {
    /**
     * @param relativePath Path relative to the workspace root.
     * @param category COPY, MANIFEST, PATCH, or GENERATE.
     * @param syncToRepo Whether to sync back to the repo (default: true).
     * @param isTaskExport Whether the file needs task filtering (default: false).
     */
    constructor(relativePath: string, category: "COPY" | "MANIFEST" | "PATCH" | "GENERATE", syncToRepo?: boolean, isTaskExport?: boolean);

    path: string;
    category: string;
    syncToRepo: boolean;
    isTaskExport: boolean;
    // Allows a string (command name) or a function accepting a string as a parameter
    generateCommand: string | ((targetRoot: string) => void);
    manifestPath: string;

    /**
     * Installs the file from a temporary folder to the workspace path.
     */
    install(tempFolder: string | Path, workspacePath: string | Path): void;

    /**
     * Specialized internal methods for installation
     */
    doCopy(src: string | Path, dst: string | Path): void;
    doManifest(src: string | Path, dst: string | Path): void;
    doPatch(src: string | Path, dst: string | Path): void;
    doGenerate(): void;

    /**
     * Manifest management internal helpers
     */
    _getManifest(): object;
    _updateManifest(newHash: string): void;
}

/**
 * Global helper functions shared via the include
 */

/**
 * Generates index file in path depending on Opus Root provided (e.g. /dopusdata unless other requirements)
 */
declare function GenerateIndex(opusRoot: string | Path): void;

/**
 * Generates a stripped/minifed version of opus.d.ts in path depending on Opus Root provided (e.g. /dopusdata unless other requirements)
 */
declare function GenerateAiOpusTypings(opusRoot: string | Path): void;

/**
 * Returns the single source of truth for all managed files.
 */
declare function GetManagedFilesList(): OpusDT_FileDef[];

/**
 * Returns the current environment mode (STANDARD or TEST_INSTALL).
 */
declare function GetOpusDT_Mode(): string;

/**
 * Returns the resolved root path for installation based on current mode.
 */
declare function GetOpusDT_Root(): string;

/**
 * Returns the GitHub repository ZIP URL associated with the current mode.
 */
declare function GetOpusDT_RepoZipUrl(): string;


/**
 * Git abstraction helpers (shared via include)
 */

/**
 * Checks if a Git repository has a clean working directory.
 * @param path The absolute path to the local git repository.
 * @returns True if clean (no pending changes), false otherwise.
 */
declare function GitCheckStatus(path: string | Path): boolean;

/**
 * Performs a standard stage, commit, and push sequence.
 * @param path The absolute path to the local git repository.
 * @param message The commit message to use.
 */
declare function GitCommitAndPush(path: string | Path, message: string): void;
