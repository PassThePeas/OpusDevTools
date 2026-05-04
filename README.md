![Directory Opus](https://img.shields.io/badge/Directory%20Opus-v13+-blue)

<p align="center">
  <img src="OpusDevTools/resources/VScode layered with opus.png" width="128" height="128" alt="OpusDevTools Logo">
</p>

# OpusDevTools
**The modern development ecosystem for Directory Opus scriptwriters.**

OpusDevTools bridges the gap between **VS Code** and **Directory Opus**, providing a professional workflow for building, managing, and synchronizing your scripts with ease.

---

## 🚀 Quick Start

### 1. Install the Extension
Download and run the installer:
👉 **[Download OpusDevTools.opusscriptinstall](OpusDevTools/resources/OpusDevTools.opusscriptinstall?raw=true)**

*This will automatically deploy the core scripts and set up the necessary environment.*

### 2. Import the Menu
To access commands directly from your Opus interface:
👉 **[Download Opus Dev Tools Menu.dcf](OpusDevTools/resources/Opus Dev Tools Menu.dcf?raw=true)**
*(Drag and drop this file onto your Opus toolbar while in Customize mode).*

---

## ✨ Key Features

### 🛠 Professional VS Code Integration
*   **Full IntelliSense:** Complete TypeScript definitions (`.d.ts`) for the Directory Opus API.
*   **Automated Scaffolding:** Automatically adds JSDoc type annotations to your event handlers and commands.
*   **Task Automation:** Integrated `tasks.json` to build indexes, minify typings, and sync files without leaving your editor.
*   **opus snippets:** Integrated `opus.code-snippets` for commonly used Opus routines (Events, Commands, Dialogs, etc...)

### 🤖 AI-Ready Workflow
*   **Minified Typings:** Generate a lightweight `dopus.ai.d.ts` to provide context to LLMs (ChatGPT/Claude) while saving significant token space.


---

## 📂 Project Structure

*   `OpusDevTools/` : Core logic and script configuration.
*   `typings/` : Type definitions for Opus and local includes.
*   `resources/` : Icons, menus, and installation packages.
*   `.vscode/` : Pre-configured workspace settings and automation tasks.

---

## 🛠 Requirements

*   **Directory Opus** (v13+)
*   **Visual Studio Code**

---
