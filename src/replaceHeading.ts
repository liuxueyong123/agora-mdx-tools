import { readFile, writeFile, readdir, stat } from "fs/promises";
import * as path from "path";

function replaceH2(_match: string, p1: string) {
  // 替换为相应的 <h2> 标签
  return `<h2 className="anchor index-auto-group index-class-${p1.toLowerCase()}" id="${p1.toLowerCase()}">${p1}</h2>`;
}

function replaceH3(_match: string, p1: string) {
  // 替换为相应的 <h3> 标签
  return `<h3 className="anchor index-api-${p1.toLowerCase()}" id="${p1.toLowerCase()}">${p1}</h3>`;
}

async function replaceMdxHeading(filePath: string) {
  if (!filePath.endsWith(".mdx")) {
    return;
  }
  const content = await readFile(filePath, "utf8");
  // 使用正则表达式进行替换，确保不会误匹配到四级标题
  const pattern1 = /(?<!#)## (\w+)/g;
  const pattern2 = /(?<!#)### (\w+)/g;
  // 先处理 ### string 格式
  const newContent = content
    .replace(pattern2, replaceH3)
    .replace(pattern1, replaceH2);
  // 写入替换后的内容
  await writeFile(filePath, newContent, "utf8");
}

async function replaceMdxFiles(directoryPath: string) {
  const files = await readdir(directoryPath);

  for (let i = 0; i < files.length; i++) {
    const filePath = path.join(directoryPath, files[i]);
    const stats = await stat(filePath);

    if (stats.isDirectory()) {
      await replaceMdxFiles(filePath);
    } else if (stats.isFile()) {
      await replaceMdxHeading(filePath);
    }
  }
}

export async function replaceFileOrFolder(filePath: string) {
  const stats = await stat(filePath);

  if (stats.isDirectory()) {
    await replaceMdxFiles(filePath);
  } else if (stats.isFile()) {
    await replaceMdxHeading(filePath);
  }
}
