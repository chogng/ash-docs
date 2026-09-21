---
ContentId: 0d20f0c8-43c1-4c3f-a69a-79f8c9b558e1
DateApproved: 9/21/2026
MetaDescription: 选择 Ash 的桌面工作台或终端界面，配置模型并开始第一个开发任务。
MetaSocialImage: ../../og.png
Keywords:
  - Ash
  - 入门
  - Desktop
  - TUI
---
# Ash 概览

Ash 是一个以 Agent 为中心的开发工作区。你可以在桌面工作台中编辑代码、管理会话，也可以在终端中向 Agent 提问和执行任务。本页帮助你选择使用方式，并完成第一次任务。

## 选择使用方式

| 产品 | 适合什么工作 | 从源码启动 |
| --- | --- | --- |
| Ash 桌面工作台 | 同时使用编辑器、聊天、文件和开发工具 | `just ash-desktop` |
| Ash Code 终端界面 | 在终端中提问、执行任务和管理会话 | `just ash` |
| Rust 桌面应用 | 使用以终端为主的桌面工作区 | `just app` |

不同产品的界面和可用入口有所区别。本文中的 Agent 操作以桌面工作台和 Ash Code 为主。安装开发依赖和启动步骤见[从源码运行 Ash](/docs/getstarted/run-from-source.md)。

## 准备模型和工作区

1. 打开包含项目代码的工作区。
2. 配置模型供应商并完成所需登录或凭据设置。Ash Code 可以从 `/config` 的 **Providers** 页开始。
3. 选择要使用的主模型。桌面工作台使用聊天输入区的模型选择器，Ash Code 使用 `/model`。
4. 创建一个会话，确认当前目录是要处理的项目。

模型出现在列表中表示你可以选择它。实际请求仍需要有效的供应商配置、访问凭据和服务连接。

## 开始第一次任务

先选择范围明确、结果可以验证的任务。例如：

```prompt
检查设置页保存后状态不刷新的原因。只修改设置模块，运行相关测试，并说明修改了什么、测试是否通过。
```

发送后，查看 Agent 的读取、搜索和工具活动。出现批准请求时，检查具体动作和目标，再决定是否允许。批准方式见[权限与批准](/docs/configure/permissions.md)。

Agent 完成回复后，检查文件改动与测试结果。需要调整时，在同一会话继续说明要求；要处理无关工作时，创建新会话。

## 按任务添加能力

| 你要做什么 | 使用什么 |
| --- | --- |
| 复用团队的检查步骤或工作方法 | [Skills](/docs/customize/skills.md) |
| 读取外部服务的数据或调用其操作 | [MCP 服务器](/docs/customize/mcp-servers.md) |
| 检查复杂方案、反复失败的假设或完成证据 | [Advisor 顾问](/docs/agents/advisor.md) |

Skill 提供工作方法，MCP 提供工具，Advisor 提供第二意见。它们都不能代替你对任务结果的检查。

## 下一步

* [了解 Agent 如何完成任务](/docs/agents/overview.md)
* [管理会话与任务](/docs/agents/sessions.md)
* [查看工具活动](/docs/reference/tools.md)
