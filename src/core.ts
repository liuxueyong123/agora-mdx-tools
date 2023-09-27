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
    .map(
      (cell) => ` {
    label: '${cell}'
  }`
    )
    .join(",\n");
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
    result += `\n <Tr>`;
    for (const cell of cells) {
      result += `\n   <Td>${cell}</Td>`;
    }
    result += `\n </Tr>`;
  }

  result += `\n</Table>\n`;

  return result;
};