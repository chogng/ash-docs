---
ContentId: c995fc35-1890-49be-a910-6668fc346384
DateApproved: 9/21/2026
MetaDescription: 在 Ash 中配置和启用 MCP 服务器，了解连接、工具发现、身份验证及调用失败时的检查方法。
MetaSocialImage: ../../og.png
Keywords:
  - Ash
  - MCP
  - 工具
  - 数据源
  - 身份验证
---
# 连接 MCP 服务器

MCP 让 Ash 调用外部服务器提供的工具，例如读取知识库或查询团队服务。本页说明如何配置连接、检查可用性，以及控制工具收到的数据。

Ash 当前接入 MCP 工具调用。服务器提供的 Resources、Prompts 或 Sampling 尚未作为这些功能接入产品，不能仅凭服务器支持它们就认为 Ash 也可以使用。

## 准备服务器

先取得服务器提供方给出的启动方式或 MCP 地址，并确认所需账号和权限。

| 连接方式 | 需要准备什么 |
| --- | --- |
| stdio | 已安装的服务器程序、可执行文件的绝对路径和参数 |
| Streamable HTTP | 服务器的 MCP 端点，以及它要求的身份验证方式 |

只有复用说明或本地脚本的需求时，可以使用 [Skill](/docs/customize/skills.md)。MCP 适合有独立连接和工具接口的服务。

## 添加用户配置

用户配置默认位于用户主目录下的 `.ash/config.toml`。设置了 `ASH_HOME` 时，使用该目录中的 `config.toml`。以下示例添加到 Ash 已生成的配置文件中，保留现有 `schemaVersion` 和其他配置。

### 连接无身份验证的 HTTP 服务器

```toml
[mcp.servers."user:mcp:team-tools"]
id = "user:mcp:team-tools"
displayName = "Team tools"
enablement = "enabled"

[mcp.servers."user:mcp:team-tools".transport]
type = "streamableHttp"
url = "https://mcp.example.com/mcp"

[mcp.servers."user:mcp:team-tools".credential]
type = "unauthenticated"
```

将 `url` 替换为实际 MCP 端点。配置节名和 `id` 必须一致，用户服务器标识使用 `user:mcp:<名称>` 形式。省略 `enablement` 时，服务器默认禁用。

### 启动本地 stdio 服务器

```toml
[mcp.servers."user:mcp:local-tools"]
id = "user:mcp:local-tools"
displayName = "Local tools"
enablement = "enabled"

[mcp.servers."user:mcp:local-tools".transport]
type = "stdio"
command = "/absolute/path/to/mcp-server"
args = []
```

把 `command` 替换为已安装程序的绝对路径，在 `args` 中按服务器要求添加参数，每个参数单独一个字符串。配置不会自动安装服务器或它的依赖。程序启动、连接和工具执行仍受当前权限策略约束。

需要登录的服务器必须通过 Ash 已接入的对应认证流程提供凭据。普通配置保存凭据引用，不直接保存 API key 或 token。当前不提供针对任意 MCP 服务器的 OAuth 自动发现，使用前确认该服务的认证方式已被接入。

## 启用并验证连接

Ash Code 中可以输入 `/mcp` 浏览已配置的用户服务器。使用搜索和 **All**、**Enabled**、**Disabled** 分类定位服务器，按 `Enter` 或 `Space` 切换启用状态。

列表中的 **enabled** 表示配置要求启用，不能证明连接已成功。保存有效配置后，Ash 更新连接和工具目录；真正可用还取决于程序、网络、身份验证和权限检查。

先用一项范围明确的只读任务验证：

```prompt
使用 Team tools 查询项目文档目录，只列出文档标题，不修改任何内容。若工具不可用，说明失败信息。
```

查看工具活动，确认实际调用了预期服务器，且结果对应你的要求。

## 一次 MCP 工具调用如何完成

1. Ash 读取有效配置，检查连接需要的权限和凭据。
2. Ash 启动本地程序或连接 HTTP 端点，发现服务器工具。
3. 主模型根据任务选择工具并提供参数。
4. Ash 检查本次动作，需要时请求你的批准。
5. 服务器执行请求，Ash 将结果记录到会话并交回主模型。

服务器可以在工具执行中请求支持的表单输入。此时回答界面中的问题，或取消请求。不要把连接成功、工具获准和操作完成当作同一件事。

## 控制访问范围

检查工具参数中包含哪些文本、文件内容或资源标识。这些输入可能发送给外部服务器。只连接当前工作需要的服务，并区分读取与外部修改。

项目的配置声明不授予凭据或执行权限。安装携带 MCP 的扩展包也不等于允许服务器启动。具体批准语义见[权限与批准](/docs/configure/permissions.md)。

## 排查连接问题

| 现象 | 检查方式 |
| --- | --- |
| `/mcp` 没有对应条目 | 检查当前后端使用的用户配置文件、节名和 `id` |
| 已启用但没有可用工具 | 检查连接错误、身份验证和服务器是否提供工具；该列表只表示配置状态 |
| stdio 启动失败 | 检查绝对路径、执行权限、参数和已安装依赖 |
| HTTP 连接或认证失败 | 核对 MCP 端点与认证支持，不要把普通网页地址当作 MCP 端点 |
| 操作被拒绝 | 查看权限说明，确认目标与任务要求一致 |
| 连接中断或结果未知 | 先检查外部操作是否已经发生，再决定重试；不要重复提交不确定的写操作 |

## 下一步

* [查看工具活动](/docs/reference/tools.md)
* [管理会话与任务](/docs/agents/sessions.md)
