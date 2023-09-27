import * as assert from 'assert';

// You can import and use all API from the 'vscode' module
// as well as import your extension to test it
import * as vscode from 'vscode';
// import * as myExtension from '../../extension';

const testMd = `| 参数               | 描述                                                         |
| :----------------- | :----------------------------------------------------------- |
| app_id            | <ul><li>111</li><li>222</li></ul>                   |
| app_certificate   | <ul><li>111</li><li>222</li></ul>你的项目的 App 证书。                                        |
| channel_name      | 频道名称，长度在 64 个字节以内。<ul><li>111</li><li>222</li></ul>以下为支持的字符集范围 |
| uid              | 待鉴权用户的用户 ID 32 位无符号整数，范围为1到 (2³² - 1)， 并保证唯一性。 <ul><li>111</li><li>222</li></ul> |
| app_id            | <ol><li>111</li><li>222</li></ol>                   |
| app_certificate   | <ol><li>111</li><li>222</li></ol>你的项目的 App 证书。                                        |
| channel_name      | 频道名称，长度在 64 个字节以内。<ol><li>111</li><li>222</li></ol>以下为支持的字符集范围 |
| uid              | 待鉴权用户的用户 ID 32 位无符号整数，范围为1到 (2³² - 1)， 并保证唯一性。 <ol><li>111</li><li>222</li></ol> |
| role             | <Admonition type="info" title="信息">Token 过期时，SDK 会触发 Token 过期回调。</Admonition>则权限会在生成后 10 分钟过期 |
| token_expire     | AccessToken2 从生成到过期的时间长度。<Admonition type="info" title="信息">Token 过期时，SDK 会触发 Token 过期回调。</Admonition>单位为秒。 |
| privilege_expire | 从 AccessToken2 生成到所有权限过期的时间长度，单位为秒。<Admonition type="info" title="信息">Token 过期时，SDK 会触发 Token 过期回调。</Admonition> |
| privilege_expire | <Admonition type="info" title="信息">Token 过期时，SDK 会触发 Token 过期回调。<ul><li>111</li><li>222</li></ul> </Admonition> |
| privilege_expire | <ul><li>111</li><li><Admonition type="info" title="信息">Token 过期时，SDK 会触发 Token 过期回调。</Admonition></li></ul> |`;

suite('Extension Test Suite', () => {
	vscode.window.showInformationMessage('Start all tests.');

	test('Sample test', () => {
		assert.strictEqual(-1, [1, 2, 3].indexOf(5));
		assert.strictEqual(-1, [1, 2, 3].indexOf(0));
	});
});
