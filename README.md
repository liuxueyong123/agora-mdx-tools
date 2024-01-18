# Agora Mdx Tools

## Install

Already on the shelves: [marketplace.visualstudio.com](https://marketplace.visualstudio.com/items?itemName=liuxueyong123.agora-mdx-tools)

Or you can directly search the vscode extension for agora-mdx-tools installation

## Usage

### Convert MD Table to Table Component

After selecting a section of an md table to convert, press the shortcut key (or select `Convert to Table Component` from the right-click menu) to replace the section with a Table component.

**Shortcut key**

- mac: `command + 4`
- windows: `ctrl + 4`

In case of conflict, users can customize shortcut keys

![image](https://web-cdn.agora.io/doc-shengwang/img/changelog/8x8vg-hwhms.gif)

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

### Create files by sidebar config

Right-click the sidebar configuration file and select 'Create Files By Sidebar Config' to generate initial mdx files based on the configuration file.

### Covert MD Heading to HTML Heading

Select the text you want to convert, then select 'Covert MD Heading to HTML Heading' from the right-click menu.

### Covert Link to RTC API Link

Select the text you want to convert, then select 'Covert Link to RTC API Link' from the right-click menu.

### Covert to Version Component

Select the text you want to convert, then select 'Covert to Version Component' from the right-click menu.
