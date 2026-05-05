  # Generating Include Interfaces with AI Studio

This project uses a specialized workflow to maintain strong typing for shared `.js` include files.

## 1. Setup in AI Studio
* **Model**: Select **Gemini 2.5 Pro** (for superior context handling).
* **System Instructions**:
> "You are a TypeScript Engineer expert in Directory Opus scripting. Generate exhaustive .d.ts files from JScript source code. Always map 'initData' to 'IncludeFileInitData'. Output only the TypeScript code."

## 2. Generation Workflow
1.  Upload `OpusDevTools/typings/dopus.ai.d.ts` as a reference file.
2.  Upload your library file (e.g., `inc_MyUtils.js`).
3.  **Prompt**: *"Generate the .d.ts for the provided JSscript file"*. 
    * *Optional*: You can ask to wrap the code in a **Namespace** (e.g., `MyUtilsNS`) to avoid global scope pollution and improve organization (**Prompt**: *"Use MyUtilsNS as the namespace"*).

## 3. Integration
* Create the corresponding `.d.ts` file in `OpusDevTools/typings/includes/`.
* Paste the generated code.
* If a Namespace was used, reference it in your scripts via JSDoc:
  `/** @type {MyUtilsNS.MyUtils} */ var utils = new MyUtilsNS.MyUtils();`
