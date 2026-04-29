# Setup & Maintenance Guide

## 1. The Installation Engine
The OpusDT_Install command automates the deployment. It follows specific rules:

* **COPY**: Overwrites the file with the latest version from the Repo.
* **MANIFEST**: Compares hashes with manifest.json.
    * If hashes match: Updated.
    * If hashes differ: A .template file is created to avoid overwriting your work.
* **PATCH**: Specifically handles .vscode/dopus_env.cmd.

## 2. Environment Patching (dopus_env.cmd)
This file is the bridge between VS Code and Directory Opus. It defines the path to dopusrt.exe.

> **Note for USB Users:** If you move your installation, ensure this file is updated. The build tasks will fail if dopusrt.exe cannot be found.

## 3. Customizing Typings
### Global Definitions
Add global variables to OpusDevTools/typings/user_custom.d.ts.
Ex: declare var MyGlobalVar: string;

### Library Includes
1. Generate .d.ts (see AI Studio Method).
2. Place in OpusDevTools/typings/includes/.
3. Run Full Build (Ctrl+Shift+B).

