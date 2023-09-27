const ulRegex = /<ul>[\s\S]*?<\/ul>/g;
const olRegex = /<ol>[\s\S]*?<\/ol>/g;
const admonitionRegex =  /<Admonition.*?>[\s\S]*?<\/Admonition>/g;
const firstTagRegex = new RegExp(`^\n\n${getTabs(3)}`);
const lastTagRegex = new RegExp(`\n\n${getTabs(3)}$`);

const startTagToReplace = {
  ul: `\n\n${getTabs(3)}<ul>`,
  ol: `\n\n${getTabs(3)}<ol>`,
  admonition: `\n\n${getTabs(3)}<Admonition`
};

const closeTagToReplace = {
  ul: `</ul>\n\n${getTabs(3)}`,
  ol: `</ol>\n\n${getTabs(3)}`,
  admonition: `\n${getTabs(3)}</Admonition>\n\n${getTabs(3)}`
};

const transformUlTag = (cell: string) => {
  return cell.replace(ulRegex, (match) => {
    return match.replace(/<ul>/g, startTagToReplace.ul).replace(/<\/ul>/g, closeTagToReplace.ul);
  });
};

const transformOlTag = (cell: string) => {
  return cell.replace(olRegex, (match) => {
    return match.replace(/<ol>/g, startTagToReplace.ol).replace(/<\/ol>/g, closeTagToReplace.ol);
  });
};

const transformAdmonitionTag = (cell: string) => {
  return cell.replace(admonitionRegex, (match) => {
    return match.replace(/<Admonition.*?>/g, (tag) => `\n\n${getTabs(3)}${tag}\n${getTabs(4)}`).replace(/<\/Admonition>/g, closeTagToReplace.admonition);
  });
};

function getTabs (count: number = 1) {
  return '  '.repeat(count);
};

const getCells = (line: string) => {
  const cells = line.split("|").map((cell) => cell.trim());

  if(cells[0] === '') {
    cells.shift();
  }
  if(cells[cells.length - 1] === '') {
    cells.pop();
  }

  return cells;
};

const getHeaders = (lines: string[]) => {
  return getCells(lines[0])
    .map((cell) => `${getTabs()}{\n${getTabs(2)}label: '${cell}'\n${getTabs()}}`)
    .join(",\n");
};

const cellTransformer = (cell: string) => {
  let result = `\n${getTabs(2)}<Td>`;

  if([ulRegex, olRegex, admonitionRegex].some((regex) => regex.test(cell))) {
    result += `\n${getTabs(3)}`;

    let _cell = cell;
    _cell = transformUlTag(_cell);
    _cell = transformOlTag(_cell);
    _cell = transformAdmonitionTag(_cell);

    // 当以 ul, ol, Admonition 开头时，处理多余换行
    if(Object.values(startTagToReplace).some(tag => _cell.startsWith(tag))) {
      _cell = _cell.replace(firstTagRegex, "");
    }

    result += _cell;

    // 当以 ul, ol, Admonition 结尾时，处理多余换行
    if(Object.values(closeTagToReplace).some(closeTag => result.endsWith(closeTag))) {
      result = result.replace(lastTagRegex, `\n${getTabs(2)}`);
    } else {
      result += `\n${getTabs(2)}`;
    }
  } else {
    result += cell;
  }

  result += '</Td>';

  return result;
};

export const transformMdTable = (mdTableString: string) => {
  const componentId = Math.random().toString(36).slice(2, 12);
  const lines = mdTableString.split("\n").filter((line) => line.trim() !== "");

  let result = `
export const TableHeader${componentId} = [
${getHeaders(lines)}
];

<Table header={TableHeader${componentId}}>`;

  for (const line of lines.slice(2)) {
    const cells = getCells(line);
    result += `\n${getTabs()}<Tr>`;
    result += cells.reduce((res, cell) => `${res}${cellTransformer(cell)}`, "");
    result += `\n${getTabs()}</Tr>`;
  }

  result += `\n</Table>\n`;

  return result;
};