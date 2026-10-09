---
ContentId: 0d20f0c8-43c1-4c3f-a69a-79f8c9b558e1
DateApproved: 10/9/2026
MetaDescription: 选择 Ash 的桌面工作台或终端界面，配置模型并开始第一个开发任务。
MetaSocialImage: ../../og.png
Keywords:
  - Ash
  - 入门
  - Desktop
  - TUI
---
# Ash 概览

在桌面或终端中，与 Agent 一起理解项目、完成修改，并检查结果。Ash 把代码编辑、对话与开发工具放在同一个工作区里。

## 开始使用

初次使用，先从一个范围明确的任务开始。你不需要先理解 Ash 的内部架构。

- [开始第一个任务](/docs/getstarted/first-task.md)：打开项目、准备模型，完成一次可检查的修改。
- [继续已有工作](/docs/agents/sessions.md)：恢复会话、补充要求，或为新目标创建会话。
- [从源码运行](/docs/getstarted/run-from-source.md)：准备开发环境，启动桌面应用或 Ash Code。

## 选择适合你的入口

使用桌面应用时，你可以在编辑器中直接处理文件，也可以打开 Agents 窗口，把工作交给 Agent。搜索、Git、终端和差异视图帮助你检查项目与修改结果。

如果更喜欢终端，使用 Ash Code。安装 CLI 后，在项目目录运行 `ash` 打开交互界面，或使用 `ash ask` 提问。桌面和终端的具体入口可能不同，请按对应指南操作。

## 从一个可以检查结果的任务开始

先让 Agent 解释项目，再给出明确的修改目标。例如：

```text
先查清设置页保存后不刷新的原因。说明你找到的依据，暂时不要修改文件。
```

确认方向后，再要求它修改并运行相关测试。执行中检查工具活动与批准请求，结束后阅读差异和测试结果。

[开始第一个任务](/docs/getstarted/first-task.md)

## 在项目中继续工作

- [编辑文件与导航代码](/docs/editing/editing-and-navigation.md)：打开、保存、查找文本，使用多光标和定义导航。
- [搜索与替换项目内容](/docs/editing/search-and-replace.md)：限制文件范围，检查预览，再应用替换。
- [使用 Git 管理更改](/docs/sourcecontrol/overview.md)：检查差异、暂存、提交，并处理远端更新。
- [使用集成终端](/docs/terminal/basics.md)：运行项目命令，管理多个终端并查找输出。

## 配置你的工作方式

- [配置模型与账号](/docs/configure/models.md)：连接服务、选择模型并验证请求。
- [调整设置](/docs/configure/settings.md)：找到选项、查看已修改项和编辑 JSON。
- [设置键盘快捷方式](/docs/configure/keyboard-shortcuts.md)：查找命令并配置自己的绑定。
- [管理会话与任务](/docs/agents/sessions.md)：继续已有工作，或把无关目标放到新会话。
- [使用 Skills](/docs/customize/skills.md)：复用项目的工作方法。
- [连接 MCP 服务器](/docs/customize/mcp-servers.md)：让 Agent 使用外部工具。
- [理解权限与批准](/docs/configure/permissions.md)：知道 Agent 正在请求什么访问。

## 还没有运行 Ash？

当前仓库提供[从源码运行指南](/docs/getstarted/run-from-source.md)。公开安装包和支持的平台应以实际发布内容为准。本指南不会把本地浏览器开发入口描述成托管在线服务。

## 遇到问题

先按[故障排查](/docs/support/troubleshooting.md)定位失败的步骤，再查看对应功能指南。提交问题时附上版本、复现步骤和脱敏后的错误信息。
