/* eslint-disable @typescript-eslint/naming-convention */

export function covert2VersionComp(inputText: string) {
  const replacements: Record<string, string> = {
    "####\\s新增特性": '<VersionTitle icon="/img/icons/version-feature.png">新增特性</VersionTitle>\r\n',
    "####\\s升级必看": '<VersionTitle icon="/img/icons/version-compatibility.png">升级必看</VersionTitle>\r\n',
    "####\\s改进": '<VersionTitle icon="/img/icons/version-improve.png">改进</VersionTitle>\r\n',
    "####\\s问题修复": '<VersionTitle icon="/img/icons/version-bugfix.png">问题修复</VersionTitle>\r\n',
    "####\\sAPI\\s变更": '<VersionTitle icon="/img/icons/version-api.png">API 变更</VersionTitle>\r\n',
     // 常见替换词
    "####\\s优化": '<VersionTitle icon="/img/icons/version-improve.png">优化</VersionTitle>\r\n',
    "####\\s修复问题": '<VersionTitle icon="/img/icons/version-bugfix.png">问题修复</VersionTitle>\r\n',
    "####\\sAPI\\s更变": '<VersionTitle icon="/img/icons/version-api.png">API 变更</VersionTitle>\r\n',
    // 白板特有
    "####\\s功能特性": '<VersionTitle icon="/img/icons/version-feature.png">功能特性</VersionTitle>\r\n',
    // 灵动课堂特有
    "####\\s新增功能": '<VersionTitle icon="/img/icons/version-feature.png">新增功能</VersionTitle>\r\n',
    "####\\s功能优化": '<VersionTitle icon="/img/icons/version-improve.png">功能优化</VersionTitle>\r\n',
  };

  let outputText = inputText;
  for (let key in replacements) {
    const regex = new RegExp(key, "g");
    outputText = outputText.replace(regex, replacements[key]);
  }

  // 版本号套用 VersionSection 组件
  outputText = outputText.replace(
    /^##\s(.+?)(\r\n|\n|\r)/g,
    '</VersionSection>\r\n\r\n<VersionSection version="$1">\r\n'
  );
  // 将第一个 </VersionSection> 移动至内容最后
  outputText =
    outputText.replace("</VersionSection>", "") + "\r\n\r\n</VersionSection>";
  // 清洗小标题
  outputText = outputText.replace(/(\d{1,2}\.?\s)\*\*(.*?)\*\*/g, "**$1$2**\r\n");
  // 小标题套用 ListTitle 组件
  outputText = outputText.replace(
    /\*\*\d{0,2}\.?\s?(.+?)\*\*(\r\n|\n|\r)/g,
    "<ListTitle>$1</ListTitle>\r\n\r\n"
  );

  return outputText;
}