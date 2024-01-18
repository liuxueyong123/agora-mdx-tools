# Agora Mdx Tools

Convert MD Table to Table Component

![image](https://web-cdn.agora.io/doc-shengwang/img/changelog/8x8vg-hwhms.gif)

## Install

Already on the shelves: [marketplace.visualstudio.com](https://marketplace.visualstudio.com/items?itemName=liuxueyong123.agora-mdx-tools)

Or you can directly search the vscode extension for agora-mdx-tools installation

## Shortcut key

mac: `command + 4`

windows: `ctrl + 4`

In case of conflict, users can customize shortcut keys

## Usage

After selecting a section of an md table to convert, press the shortcut key (or select `Convert to Table Component` from the right-click menu) to replace the section with a Table component.

Example:

``` md
|   子功能   | 免费版 | 专业版      | 旗舰版      |
| :------------------- | :----- |  :---------- | :---------- |
| 控制台访问           |✔          | ✔           | ✔           |
| 数据存储时间         | 3 天   | 14 天       | 30 天       |
| 通话全景页面                 | ✘      |  ✔           | ✔           |
| 通话调查 RESTful API | ✘      |  专业版 API  | 旗舰版 API  |
| 内嵌                 | ✘      | ✔         | ✔           |
```

Result：

``` jsx
export const TableHeaderuxsv8ux7a2 = [
 {
    label: '子功能'
  },
 {
    label: '免费版'
  },
 {
    label: '专业版'
  },
 {
    label: '旗舰版'
  }
];

<Table header={TableHeaderuxsv8ux7a2}>
 <Tr>
   <Td>控制台访问</Td>
   <Td>✔</Td>
   <Td>✔</Td>
   <Td>✔</Td>
 </Tr>
 <Tr>
   <Td>数据存储时间</Td>
   <Td>3 天</Td>
   <Td>14 天</Td>
   <Td>30 天</Td>
 </Tr>
 <Tr>
   <Td>通话全景页面</Td>
   <Td>✘</Td>
   <Td>✔</Td>
   <Td>✔</Td>
 </Tr>
 <Tr>
   <Td>通话调查 RESTful API</Td>
   <Td>✘</Td>
   <Td>专业版 API</Td>
   <Td>旗舰版 API</Td>
 </Tr>
 <Tr>
   <Td>内嵌</Td>
   <Td>✘</Td>
   <Td>✔</Td>
   <Td>✔</Td>
 </Tr>
</Table>
```
