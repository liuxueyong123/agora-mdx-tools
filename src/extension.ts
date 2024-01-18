// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";
import { transformMdTable } from "./core";
import { replaceFileOrFolder, replaceMdxHeading } from "./replaceHeading";
import { createFilesBySidebar } from "./createFileBySidebar";
import { covert2VersionComp, replaceRtcApiLink } from "./versionComponent";

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	const disposable = vscode.commands.registerCommand(
		"md-table-converter.covert2TableComponent",
		() => {
			const editor = vscode.window.activeTextEditor;
			if (!editor) {
				return;
			}
			const allSelections = editor.selections;

			editor.edit((editBuilder) => {
				// 遍历并替换文本
				allSelections.forEach((selection) => {
					try {
						const text = editor.document.getText(selection);
						editBuilder.replace(selection, transformMdTable(text));
						vscode.window.showInformationMessage("Convert successfully!");
					} catch (e: any) {
						vscode.window.showErrorMessage(e.message);
						return;
					}
				});
			});
		}
	);

	const disposable2 = vscode.commands.registerCommand(
		"md-table-converter.replaceHeadingByFile",
		async (resource) => {
			try {
				await replaceFileOrFolder(resource.fsPath);
				vscode.window.showInformationMessage("标题替换成功！");
			} catch (e: any) {
				vscode.window.showErrorMessage(e.message);
			}
		}
	);

	const disposable6 = vscode.commands.registerCommand(
		"md-table-converter.replaceHeading",
		async () => {
			const editor = vscode.window.activeTextEditor;
			if (!editor) {
				return;
			}
			const allSelections = editor.selections;

			editor.edit((editBuilder) => {
				// 遍历并替换文本
				allSelections.forEach((selection) => {
					try {
						const text = editor.document.getText(selection);
						editBuilder.replace(selection, replaceMdxHeading(text));
						vscode.window.showInformationMessage("Convert successfully!");
					} catch (e: any) {
						vscode.window.showErrorMessage(e.message);
						return;
					}
				});
			});
		}
	);

	const disposable3 = vscode.commands.registerCommand(
		"md-table-converter.createFilesBySidebar",
		async (resource) => {
			try {
				await createFilesBySidebar(resource.fsPath);
				vscode.window.showInformationMessage("文件创建成功！");
			} catch (e: any) {
				vscode.window.showErrorMessage(e.message);
			}
		}
	);

	const disposable4 = vscode.commands.registerCommand(
		"md-table-converter.replaceRtcApiLink",
		async (resource) => {
			const editor = vscode.window.activeTextEditor;
			if (!editor) {
				return;
			}

			const options = ["android", "ios", "windows", "macos", "rn", "electron", "flutter", "unity"];
			const platform = await vscode.window.showQuickPick(options, {
				placeHolder: "请选择平台",
			});
			if (!platform) {
				vscode.window.showInformationMessage("链接替换已取消");
				return;
			}

			const allSelections = editor.selections;
			editor.edit((editBuilder) => {
				// 遍历并替换文本
				allSelections.forEach((selection) => {
					try {
						const text = editor.document.getText(selection);
						editBuilder.replace(selection, replaceRtcApiLink(text, platform));
						vscode.window.showInformationMessage("Convert successfully!");
					} catch (e: any) {
						vscode.window.showErrorMessage(e.message);
						return;
					}
				});
			});
		}
	);

	const disposable5 = vscode.commands.registerCommand(
		"md-table-converter.covert2VersionComp",
		async () => {
			const editor = vscode.window.activeTextEditor;
			if (!editor) {
				return;
			}
			const allSelections = editor.selections;

			editor.edit((editBuilder) => {
				// 遍历并替换文本
				allSelections.forEach((selection) => {
					try {
						const text = editor.document.getText(selection);
						editBuilder.replace(selection, covert2VersionComp(text));
						vscode.window.showInformationMessage("Convert successfully!");
					} catch (e: any) {
						vscode.window.showErrorMessage(e.message);
						return;
					}
				});
			});
		}
	);

	context.subscriptions.push(disposable);
	context.subscriptions.push(disposable2);
	context.subscriptions.push(disposable6);
	context.subscriptions.push(disposable3);
	context.subscriptions.push(disposable4);
	context.subscriptions.push(disposable5);
}

// This method is called when your extension is deactivated
export function deactivate() { }
