// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { exec } from 'child_process';

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "swagger-api-tool" is now active!');


  context.subscriptions.push(vscode.commands.registerCommand('extension.getCurrentFilePath', (uri) => {
    vscode.window.showInformationMessage(`当前文件(夹)路径是：${uri ? uri.path : '空'}`);
    const contextPath = context.extensionUri.path;
    const filePath = `${contextPath}/src/package/index.js`;

    try {
      exec(`node ${filePath} --o ${uri.path}`);
    } catch(e) {
      vscode.window.showInformationMessage(`e：${e}, ${JSON.stringify(e)}`);
    }

	}));
  
}

// This method is called when your extension is deactivated
export function deactivate() {}
