---
ContentId: 58729fcf-6f7b-4a34-81d1-34b24c97d0c0
DateApproved: 10/17/2026
SourceRevision: bb040bb5cd00070a375e88fdcc7d05fc01ab6d58
MetaDescription: 在 Ash 中查找和编辑设置，配置截图、听写与代码颜色，处理旧听写模型配置和保存问题。
MetaSocialImage: ../../og.png
---
# 调整设置

使用 Ash 设置改变编辑器和界面的工作方式。可以通过图形界面修改单个选项，也可以打开用户设置 JSON 编辑配置；两种入口使用同一份用户设置。

## 打开设置

打开 **Ash 设置**（英文界面为 **Ash Settings**）。默认快捷键为 Windows/Linux 的 `Ctrl+,`，macOS 的 `⌘+,`。也可以从左侧管理菜单进入设置，或在命令面板中搜索命令名称。

如果快捷键被更改，使用[键盘快捷方式](/docs/configure/keyboard-shortcuts.md)查找当前绑定。

## 找到并修改一个选项

1. 在设置搜索框中输入关键词、说明文字或设置 ID，例如 `editor.fontSize`。
2. 修改对应控件的值。
3. 检查页面是否显示保存错误，并在编辑器里观察实际效果。

搜索会过滤当前页面的设置，不会修改配置。某些设置连接账号或服务，需要额外的管理操作；不要把所有设置行都理解成普通 JSON 值。

## 找回自己改过的设置

在搜索框输入：

```text
@modified
```

也可以在设置筛选中选择 **已修改**。这会列出存在本地用户覆盖值的设置；还可以结合普通关键词继续缩小范围。

“已修改”表示你保存过用户值，并不一定表示它与默认值不同。即使显式保存了默认值，或保存的是 `false`、`0`、空字符串，它仍可能出现在结果中。

普通配置项旁的 **已配置** 标记同样表示存在用户覆盖。需要恢复默认行为时，使用该项菜单中的重置操作，而不只是手动填回你记得的默认值。保存失败时先处理错误，原配置可能仍然有效。

## 在 JSON 中编辑

从普通设置项菜单选择 **在 JSON 中编辑**，或执行 **首选项: 打开用户设置（JSON）**。Ash 会打开用户设置文本；从设置项进入时，会定位到对应值。

例如，调整编辑器字号的配置片段是：

```json
"editor.fontSize": 18
```

把它放在现有设置对象中，并检查相邻属性之间的逗号。不要用这一行替换整个文件。用户设置使用 JSONC，可以保留注释。

在文本编辑器中保存后，配置才会写入。新插入的设置项也可能只是未保存的修改。无效 JSONC 或不符合设置要求的值会被拒绝，不能把文件里的草稿当成已生效配置。

## 复制一项配置

普通配置项的菜单提供 **复制设置为 JSON**。它复制 `"设置键": 值` 片段，不带最外层花括号，可用于现有设置对象。

复制本身不会保存或更改配置。没有用户覆盖时，复制的是当前窗口的默认值。账号或其他具有专用管理界面的设置可能不提供这个菜单。

## 修改显示语言

在 **常规 → 显示语言** 中选择语言。列表包含内置语言和已安装的语言包；也可在设置中搜索 `language`、`locale` 或“语言”。如果界面提示需要重启，保存工作后按提示操作。

## 设置截图快捷键

在设置中搜索 `screenshot.globalShortcut`，或打开 **截图** 分类。**全局截图** 默认关闭；开启后，桌面应用可在 Ash 处于后台时响应截图快捷键。

按键组合在 **键盘快捷方式** 中修改，命令名称是 **聊天：添加截图**。截图设置页只提供全局开关；屏幕权限指引在发起截图时出现。截图无障碍帮助位于 **辅助功能** 分类。具体操作参见[截图与标注](/docs/editing/screenshots.md)。

## 配置听写

打开 **语音输入** 分类，选择听写服务并管理本地模型。以下设置分工不同：

| 设置 | 用途 |
| --- | --- |
| `dictation.enabled` | 启用消息、编辑器和终端中的听写，默认 `true` |
| `dictation.showButton` | 显示消息输入框的麦克风按钮，默认 `true`；设为 `false` 后仍可使用听写命令 |
| `dictation.backend` | 选择本地、云端 API 或 Codex 订阅，默认 `local` |
| `dictation.model` | 选择本地模型包 ID；建议在模型列表中选择已安装的模型 |

`dictation.model` 填的是模型包 ID，不是任意文件路径。更改它不会自动安装模型；先在模型列表中完成安装或导入，再选择 **使用模型**。

旧键 `dictation.localModel` 会在读取设置时迁移到 `dictation.model`。新旧值相同会清理旧键；值冲突或旧值无效时，Ash 保留原文并报告问题。此时打开用户设置 JSON，将需要的有效模型 ID 保留在 `dictation.model` 中，移除旧键，再保存。不要把旧配置示例中的键继续加回去。

## 调整代码高亮

`editor.semanticHighlighting.enabled` 可设为 `true`、`false` 或默认值 `"configuredByTheme"`，用于选择是否显示语义高亮。默认跟随主题。

要按 token 类型设置颜色或字体样式，编辑 `editor.semanticTokenColorCustomizations`。例如，把下面的片段合并到用户设置对象中，可为注释指定颜色和斜体：

```json
"editor.semanticTokenColorCustomizations": {
  "rules": {
    "comment": {
      "foreground": "#6a9955",
      "italic": true
    }
  }
}
```

`editor.tokenColorCustomizations` 仍支持 `comments`、`strings` 等预设类别。当前 Ash 不支持其中的 `textMateRules`，也不支持主题中的 TextMate scope、`tokenColors` 或 `.tmTheme` 文件。迁移旧主题时，应改用语义 token 规则，不能只复制原来的 TextMate 配置。

## 设置内置浏览器工具

在设置中搜索 `workbench.browser.enableChatTools` 可控制 Agent 的内置浏览器工具。`workbench.browser.enableCDP` 是独立的高级选项，默认关闭。开启前先了解[浏览器工具](/docs/reference/tools.md)和[权限与批准](/docs/configure/permissions.md)。

## 当前配置范围

本文介绍的图形设置和用户设置 JSON 面向本地用户配置；这个入口没有工作区、文件夹或远程目标切换。

项目中的工作区配置仍可能影响实际效果：单文件夹项目可读取 `.vscode/settings.json`，多文件夹工作区还可读取工作区文件及各文件夹的设置。用户设置已保存但某个项目仍有不同表现时，也检查项目配置。图形页的 `@modified` 只反映本地用户覆盖，不是所有配置层的汇总。

桌面应用按当前 profile 保存配置；浏览器开发界面的配置保存在该浏览器的数据存储中。使用不同 profile 或清除浏览器站点数据后，不应预期设置自动相同。

## 排查问题

| 现象 | 可以检查什么 |
| --- | --- |
| 搜不到设置 | 清除 `@modified` 等过滤条件，再用设置 ID 搜索 |
| 填回默认值后仍显示已修改 | 使用重置，移除用户覆盖 |
| JSON 修改没有效果 | 是否已经保存、语法和值是否合法、是否使用同一 profile |
| 保存提示冲突 | 先查看外部修改，保留需要的内容，再按冲突提示处理 |
| 找不到工作区设置切换 | 当前入口仅支持本地用户目标，不是界面隐藏了该选项 |

## 下一步

- [设置键盘快捷方式](/docs/configure/keyboard-shortcuts.md)
- [理解权限与批准](/docs/configure/permissions.md)
