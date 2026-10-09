---
ContentId: c995fc35-1890-49be-a910-6668fc346384
DateApproved: 10/9/2026
SourceRevision: 2e6f27585f3fe1676eb1f5ec32c140bed175697c
MetaDescription: 在 Ash 中用命令行或用户配置添加 MCP 服务器，启用并验证工具，了解凭据支持、桌面查看入口和连接故障处理。
MetaSocialImage: ../../og.png
Keywords:
  - Ash
  - MCP
  - 工具
  - 数据源
  - 身份验证
---
# 连接 MCP 服务器

MCP 让 Ash 调用外部服务器提供的工具，例如读取知识库或查询团队服务。先添加服务器声明，再启用连接，最后用一项范围明确的任务检查实际工具调用。配置中的“已启用”不代表已经连接成功。

当前接入的是 MCP 工具。服务器提供的 Resources、Prompts、Sampling 等能力尚未作为对应产品功能接入，不能仅凭服务器支持它们就认为 Ash 也可以使用。

## 选择连接方式和入口

先从服务器提供方取得启动说明或 MCP 端点，并确认服务可信、账号具备所需权限。

| 连接方式 | 需要准备什么 | 在哪里运行 |
| --- | --- | --- |
| stdio | 已安装程序的绝对路径，以及启动参数 | Ash 后端所在机器 |
| Streamable HTTP | 完整 MCP 端点，例如 `https://mcp.example.com/mcp`，以及服务要求的认证方式 | Ash 后端连接该地址 |

如果 Ash 连接到另一台机器，本机已有的程序或路径不一定能被那个后端访问。MCP 地址也不是服务的普通网页地址。

| 入口 | 可以完成什么 |
| --- | --- |
| 系统终端中的 `ash mcp` | 列出、查看、添加、移除、启用和禁用用户服务器声明 |
| Ash Code 中的 `/mcp` | 搜索已配置的用户服务器、查看声明并切换启用状态 |
| 用户 `config.toml` | 编辑服务器传输方式、显示名称和已有凭据引用 |
| 图形界面设置中的 **工具**（**Tools**） | 查看当前后端的工具目录、来源和执行要求；不是添加服务器或登录服务器的表单 |

只有复用说明或本地脚本的需求时，可以使用 [Skill](/docs/customize/skills.md)。MCP 适合有独立连接和工具接口的服务。

## 用命令行添加服务器

以下命令在系统终端执行，不是聊天输入框中的斜杠命令。把示例地址、名称和路径替换成实际值。

### 添加 HTTP 服务器

先保存为禁用状态，检查配置后再启用：

```sh
ash mcp add user:mcp:team-tools --name "Team tools" --url https://mcp.example.com/mcp --disabled
ash mcp get user:mcp:team-tools
ash mcp enable user:mcp:team-tools
```

`add` 不带 `--disabled` 时会直接保存为启用状态。当前这个添加命令创建无认证声明，不会询问 API key，也不会自动发起 OAuth 登录。需要认证时，先阅读下文的[凭据与登录](#凭据与登录)。

### 添加本地 stdio 服务器

```sh
ash mcp add user:mcp:local-tools --name "Local tools" --disabled -- /absolute/path/to/mcp-server
ash mcp get user:mcp:local-tools
ash mcp enable user:mcp:local-tools
```

`--` 后是可执行程序及其参数。服务器需要参数时，按提供方说明放在程序路径后；启动参数本身不构成 Ash 的安全隔离。

程序必须已安装在后端机器上，并使用绝对路径；Ash 不会替你安装服务器或依赖。启用后，Ash 可以启动该程序并发现工具，不会等到第一次工具调用才启动。当前 stdio 启动没有接入本地命令沙箱，不要依赖聊天批准或目录只读设置来隔离服务器程序。只配置你信任的程序，并检查它自身可以访问的文件、环境和网络。

### 查看、停用或移除

```sh
ash mcp list
ash mcp disable user:mcp:team-tools
ash mcp remove user:mcp:team-tools
```

`list` 和 `get` 输出 JSON 声明，不能用来证明连接健康。`disable` 保留声明；`remove` 删除声明。移除声明不等于卸载本地程序、撤销服务账号授权或撤回已执行的操作。

同一个 ID 不能重复 `add`。需要修改已有地址或参数时，编辑下面的用户配置，再检查连接。

## 直接编辑用户配置

用户配置默认位于用户主目录的 `.ash/config.toml`；设置 `ASH_HOME` 时，使用该目录中的 `config.toml`。远端后端或另一套 Ash 配置目录可能使用不同文件，先确认你修改的是实际运行后端使用的那一份。

把以下内容合并到 Ash 已生成的配置文件，保留原有 `schemaVersion` 和其他配置。不要给同一服务器重复添加 TOML 表。

### 无认证的 HTTP 示例

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

节名与 `id` 必须一致，用户服务器标识使用 `user:mcp:<名称>`。省略 TOML 的 `enablement` 时默认禁用；这与命令行 `add` 默认启用的行为不同。准备好之前，可以明确写成 `enablement = "disabled"`。

### stdio 示例

```toml
[mcp.servers."user:mcp:local-tools"]
id = "user:mcp:local-tools"
displayName = "Local tools"
enablement = "disabled"

[mcp.servers."user:mcp:local-tools".transport]
type = "stdio"
command = "/absolute/path/to/mcp-server"
args = []
```

每个参数是 `args` 中的一个字符串；命令路径与参数分开填写。用户服务器配置当前没有自定义环境变量、工作目录或 HTTP 请求头的字段，不要直接粘贴其他客户端的配置格式。

有效配置保存后会被后端重新读取，并更新连接和工具目录。配置语法错误、程序无法启动或认证失败时，保存文件本身不能证明新配置已生效。

## 凭据与登录

先确认服务属于以下哪种情况：

- 无需认证：使用上面的 `unauthenticated` 配置。
- 已由当前 Ash 后端的认证接入保存凭据：HTTP 声明可以使用 `credential.type = "reference"` 与 `credentialRef` 引用已有凭据。引用名称不是 token；随便填写一个名称不会创建凭据。
- 需要登录，但当前产品没有该服务的接入：先保持禁用。当前 `ash mcp` 和 `/mcp` 没有通用的 API key 录入或 OAuth 登录入口，也不会为任意 URL 自动发现 OAuth。

HTTP 凭据引用由后端在连接时取出并用作 bearer 认证材料。独立 MCP 的 OAuth 支持需要后端专门接入该服务的认证适配；仅存在后端接口不代表安装的产品已有相应登录按钮。不要把模型账号登录当成 MCP 服务的账号授权。

当前 stdio 声明不能通过凭据引用注入环境变量，配置这类引用会报错。不要把 API key、密码或 token 写进 `config.toml`、URL、命令参数或聊天示例。

## 启用并验证工具

1. 在 Ash Code 输入 `/mcp`，打开 **扩展**（**Extensions**）中的 **MCP** 标签页。
2. 搜索服务器名称，选中条目。使用左右方向键展开或收起详情，核对 ID、传输信息和 `enabled` / `disabled`。
3. 按 `Enter` 或 `Space` 切换启用状态，按 `Esc` 关闭列表。
4. 在图形界面需要检查工具时，打开设置的 **工具**（**Tools**）。该页显示打开时读取的目录；切换出去再返回可刷新。
5. 提交一项范围明确的只读任务，检查实际工具活动和返回结果。

```prompt
使用 Team tools 查询项目文档目录，只列出文档标题，不修改任何内容。若工具不可用，说明失败信息。
```

模型会根据任务选择工具。工具较多时，Ash 可能先通过 `search_tools` 搜索目录，再用 `call_mcp_tool` 调用选中的工具；没有把所有工具直接列在模型面前，不一定是连接失败。目录更新使旧工具绑定失效时，应重新发现工具后再调用。

工具运行中可能出现服务器请求的表单输入。检查请求内容，再填写、拒绝或取消；当前不支持所有 MCP 交互类型，例如 URL elicitation 和多选表单。不要把连接成功、批准调用和操作完成当成同一件事。

## 控制访问和数据发送

检查工具参数中的文本、文件内容和资源标识；这些输入可能发给服务器。只连接当前工作需要的服务，优先用只读任务验证，并在执行外部修改前核对目标。

项目中的 MCP 声明只表达请求，不能授予凭据或执行权限，也不能照搬用户 `user:mcp:...` 声明就自动获得用户服务器的访问权。目录发现权限、安装包的授权、服务器启用以及本次工具批准分别生效。

本地进程沙箱不能约束远端 MCP 服务产生的副作用，服务器自称“只读”也不是 Ash 的授权证明。具体批准语义见[权限与批准](/docs/configure/permissions.md)。

## 排查问题

| 现象 | 检查方式 |
| --- | --- |
| `/mcp` 没有对应条目 | 用 `ash mcp list` 检查用户声明；核对后端和 `ASH_HOME`，不要把用户列表当成所有扩展或项目贡献的总表 |
| 添加时报 ID 已存在 | 用 `get` 查看该 ID，再修改已有配置；不要重复添加 |
| 已启用但工具不可用 | 核对程序、网络、凭据和连接错误；启用只是配置状态 |
| stdio 启动失败 | 检查后端机器上的绝对路径、文件执行权限、启动参数和依赖 |
| HTTP 连接失败 | 确认地址是 MCP 端点，服务支持 Streamable HTTP，后端能够访问它 |
| 凭据不存在或登录不可用 | 确认后端已有匹配凭据和认证接入；反复启用不会创建 token 或补齐 OAuth 支持 |
| 配置后其他 MCP 工具也消失或后端启动失败 | 当前连接组合可能因一个启用的服务器失败而整体失败；先将最近新增的声明设为禁用，再重新检查 |
| 工具绑定已过期 | 重新发现当前工具，不要复用旧目录中的调用信息 |
| 工具被拒绝 | 查看动作、目标和权限说明，再缩小请求范围 |
| 连接中断或结果未知 | 先确认外部操作是否已经发生，再决定是否重试；不要重复提交不确定的写操作 |

## 下一步

* [查看工具活动](/docs/reference/tools.md)
* [管理会话与任务](/docs/agents/sessions.md)
* [检查目录权限和批准](/docs/configure/permissions.md)
