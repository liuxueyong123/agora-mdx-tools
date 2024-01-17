// @Desc   : 根据与本文件位于同一层级的 _sidebar_.meta.js 文件，自动创建所有文件夹和 mdx 文件，并在 mdx 文件开头写入对应的标题。已经存在的 mdx 文件不会被覆盖。

import * as path from "path";
import * as fs from "fs/promises";
import { Script, createContext } from 'vm';

interface SidebarResultItem {
  path: string;
  title: string;
}

function extractSidebars(items: any[]) {
  let result: SidebarResultItem[] = [];

  for (let item of items) {
    if (item["type"] === "doc") {
      result.push({
        path: item["id"],
        title: item["label"]
      });
    } else if (item["items"]) {
      result.push(...extractSidebars(item["items"]));
    }
  }

  return result;
}

export async function createFilesBySidebar(filePath: string) {
  const productFolder = path.resolve(filePath, `..${path.sep}`);

  const content = await fs.readFile(filePath, 'utf-8');
  const context = createContext({
    module: { exports: {} },
    exports: {}
  });
  const script = new Script(content);
  script.runInContext(context);
  const items = context.module.exports;

  const results = extractSidebars(items);
  for(const item of results) {
    const paths = item.path.split('/');
    if(paths.length < 3) {continue;}

    const currentFileFolder = path.resolve(productFolder, `.${path.sep}${paths.slice(2, -1).join(path.sep)}`);
    const currentFilePath = path.resolve(currentFileFolder, `.${path.sep}${paths.pop()}.mdx`);
    // 如果文件已经存在，不进行覆盖
    const fileExist = await fs.access(currentFilePath).then(() => true).catch(() => false);
    if(fileExist) {continue;}

    await fs.mkdir(currentFileFolder, { recursive: true });
    const fileContent = `---\r\ntitle: ${item.title}\r\n---\r\n`;
    await fs.writeFile(currentFilePath, fileContent);
  }
}
