import { readFile, writeFile, readdir, stat } from "fs/promises";
import * as path from "path";

function replaceH2(_match: string, p1: string) {
  return `<h2 className="anchor index-auto-group index-class-${p1.toLowerCase()}" id="${p1.toLowerCase()}">${p1}</h2>`;
}

function replaceH3(_match: string, p1: string) {
  return `<h3 className="anchor index-api-${p1.toLowerCase()}" id="${p1.toLowerCase()}">${p1}</h3>`;
}

export function replaceMdxHeading(content: string) {
  return content.replace(/^### (.+)/g, replaceH3).replace( /^## (.+)/g, replaceH2);
}

async function replaceFileMdxHeading(filePath: string) {
  if (!filePath.endsWith(".mdx") && !filePath.endsWith(".md")) {
    return;
  }
  const content = await readFile(filePath, "utf8");
  const newContent = replaceMdxHeading(content);
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
      await replaceFileMdxHeading(filePath);
    }
  }
}

export async function replaceFileOrFolder(filePath: string) {
  const stats = await stat(filePath);

  if (stats.isDirectory()) {
    await replaceMdxFiles(filePath);
  } else if (stats.isFile()) {
    await replaceFileMdxHeading(filePath);
  }
}
