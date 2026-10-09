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
# 用 Ash 完成你的下一项开发任务

在同一个工作区里阅读代码、与 Agent 协作并检查结果。你可以使用 Ash 桌面应用，也可以从终端使用 Ash Code。

<div class="doc-cards">
<a class="doc-card" href="#/docs/getstarted/first-task"><strong>开始第一个任务 →</strong><span>从理解项目开始，再完成一项范围明确的修改。</span></a>
<a class="doc-card" href="#/docs/agents/sessions"><strong>继续已有的工作 →</strong><span>了解会话、任务状态，以及何时继续或新建会话。</span></a>
<a class="doc-card" href="#/docs/customize/skills"><strong>让 Agent 遵循你的方法 →</strong><span>用 Skills 保存可复用的工作步骤。</span></a>
<a class="doc-card" href="#/docs/customize/mcp-servers"><strong>连接工作需要的工具 →</strong><span>配置 MCP 服务器并检查工具是否可用。</span></a>
</div>

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

## 配置你的工作方式

- [管理会话与任务](/docs/agents/sessions.md)：继续已有工作，或把无关目标放到新会话。
- [使用 Skills](/docs/customize/skills.md)：复用项目的工作方法。
- [连接 MCP 服务器](/docs/customize/mcp-servers.md)：让 Agent 使用外部工具。
- [理解权限与批准](/docs/configure/permissions.md)：知道 Agent 正在请求什么访问。

## 还没有运行 Ash？

当前仓库提供[从源码运行指南](/docs/getstarted/run-from-source.md)。公开安装包和支持的平台应以实际发布内容为准。本指南不会把本地浏览器开发入口描述成托管在线服务。
