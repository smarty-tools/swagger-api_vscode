// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { ChildProcess, spawn } from 'child_process';
import * as path from 'path';
import * as fs from 'fs';

let serverProcess: ChildProcess | undefined;
let serverPort;

/**
 * 根据输入路径，查找最近文件夹路径
 * @param filePath 路径
 * @returns 最近上一层文件夹路径
 */
function getDirectoryPath (filePath: string): string {
  const stat = fs.statSync(filePath);
  if (stat.isFile()) {
    const parentPath = path.resolve(filePath, '../');
    return getDirectoryPath(parentPath);
  }

  // if (stat.isDirectory()) {
  //   return filePath;
  // }

  return filePath;
}

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  console.log('Congratulations, your extension "swagger-api-tool" is now active!');

  context.subscriptions.push(vscode.commands.registerCommand('extension.getCurrentFilePath', (uri) => {
    let filePath= getDirectoryPath(uri.path);
    const serverPath = path.join(context.extensionPath, 'server', 'index.js');
    serverProcess = spawn('node', [serverPath, '--o', filePath]);

    // // 监听服务端口号
    // serverProcess.on('message', (msg: { port: number }) => {
    //   serverPort = msg.port;
    //   vscode.window.showInformationMessage(`Koa server started on port ${serverPort}`);
    // });

    // // 捕获服务输出和错误
    // serverProcess.stdout?.on('data', (data) => {
    //   console.log(`[Koa Server] ${data}`);
    // });

    // serverProcess.stderr?.on('data', (data) => {
    //   console.error(`[Koa Server Error] ${data}`);
    // });

    // // 注册关闭逻辑
    // context.subscriptions.push({
    //   dispose: () => {
    //     if (serverProcess) {
    //       serverProcess.kill();
    //       serverProcess = undefined;
    //     }
    //   }
    // });

    // try {
    //   exec(`node ${serverPath} --o ${uri.path}`, (error, stdout, stderr) => {
    //     console.log(error, "error");
    //     vscode.window.showInformationMessage(`error：${serverPath}`);
    //   });
    // } catch(e) {
    //   vscode.window.showInformationMessage(`e：${e}, ${JSON.stringify(e)}`);
    // }
  }));

}

// This method is called when your extension is deactivated
export function deactivate() { }
