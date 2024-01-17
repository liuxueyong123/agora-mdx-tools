// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { transformMdTable } from './core';
import { replaceFileOrFolder } from './replaceHeading';
import { createFilesBySidebar } from './createFileBySidebar';

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	const disposable = vscode.commands.registerCommand('md-table-converter.covert2TableComponent', () => {
		const editor = vscode.window.activeTextEditor;
		if(!editor) {return;}
		const allSelections = editor.selections;

		editor.edit(editBuilder => {
			// 遍历并替换文本
			allSelections.forEach(selection => {
				try {
					const text = editor.document.getText(selection);
					editBuilder.replace(selection, transformMdTable(text));
					vscode.window.showInformationMessage('Convert successfully!');
				} catch(e: any) {
					vscode.window.showErrorMessage(e.message);
					return;
				}
			});
		});
	});

	const disposable2 = vscode.commands.registerCommand('md-table-converter.replaceHeading', async (resource) => {
		try {
			await replaceFileOrFolder(resource.fsPath);
			vscode.window.showInformationMessage('标题替换成功！');
		} catch (e: any) {
			vscode.window.showErrorMessage(e.message);
		}
	});

	const disposable3 = vscode.commands.registerCommand('md-table-converter.createFilesBySidebar', async (resource) => {
		try {
			await createFilesBySidebar(resource.fsPath);
			vscode.window.showInformationMessage('文件创建成功！');
		} catch(e: any) {
			vscode.window.showErrorMessage(e.message);
		}
	});

	context.subscriptions.push(disposable);
	context.subscriptions.push(disposable2);
	context.subscriptions.push(disposable3);
}

// This method is called when your extension is deactivated
export function deactivate() {}
