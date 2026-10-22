---
ContentId: c995fc35-1890-49be-a910-6668fc346384
DateApproved: 10/22/2026
SourceRevision: 2bfe0bb6f96030a02d4701ca6211e9c5f0f13720
MetaDescription: 在 Ash 中添加 MCP 服务器，完成受支持的 OAuth 登录，启用并验证工具，区分断开、停用和本地退出。
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
| 系统终端中的 `ash mcp` | 管理用户服务器声明，以及登录和退出受支持的 HTTP OAuth 服务 |
| 图形界面的 **扩展**（**Extensions**） | 在 **Connections** 分类查看和添加 MCP 服务器，打开详情管理连接；登录要求当前窗口支持 OAuth 回调 |
| Ash Code 中的 `/mcp` | 搜索已配置的用户服务器、查看声明并切换启用状态 |
| 用户 `config.toml` | 编辑服务器传输方式、显示名称和已有凭据引用 |
| 图形界面设置中的 **工具**（**Tools**） | 查看当前后端的工具目录、来源和执行要求；不是添加服务器或登录服务器的表单 |

只有复用说明或本地脚本的需求时，可以使用 [Skill](/docs/customize/skills.md)。MCP 适合有独立连接和工具接口的服务。

## 在图形界面添加和管理服务器

1. 运行 **打开扩展**（**Open Extensions**），清空搜索框，将指针移到 **Connections** 分类标题，或用键盘聚焦该标题，在标题操作中选择 **Add connection**，再选择 **Custom MCP server**。当前窗口不支持自定义 MCP 管理时，不显示这一项。
2. 选择 **HTTP server** 或 **Local process (stdio)** ，填写显示名称和端点或程序路径。服务器 ID 填不含空格或冒号的名称，例如 `team-tools`；Ash 会生成 `user:mcp:team-tools`。
3. stdio 参数使用 JSON 字符串数组，例如 `["--port", "3000"]`。**Credential reference** 只接受已保存凭据的引用名称，不填密码或 token；不需要已有引用时留空。
4. 初次添加默认不启用。先选择 **Save**，核对详情，再按需要选择 **Enable** 和 **Connect**。
5. 等待新的运行状态和工具列表，并用一项只读任务验证结果。

详情中的 **Edit MCP server** 修改声明，**Enable** 或 **Disable** 保存启用状态。**Connect** 和 **Disconnect** 只控制当前后端进程中的连接，不删除声明、卸载包或撤销服务账号授权。**Remove MCP server** 经确认后删除用户声明。由安装包提供的能力不一定有这些用户声明操作，应回到所属包管理。

**Add connection** 也提供 **Service account**。选择服务后，只显示该服务支持的 **Sign in** 或 **Connect with API token**；没有可选服务时，先安装提供服务账号的插件。关联的 MCP 服务器在该服务详情中查看，不会重复列为独立连接。服务账号的 token 表单与自定义 MCP 的 **Credential reference** 不是同一字段。

保存、连接请求已接收和工具可用是不同状态。遇到错误时检查详情中的诊断，不要只凭按钮恢复可用就判断连接成功。

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

无需认证的服务器使用 `unauthenticated`。已有凭据可通过 `credential.type = "reference"` 与 `credentialRef` 引用后端保存的凭据；引用名称不是 token，填写名称不会创建凭据。不要把模型账号登录当成 MCP 服务授权。

### 登录支持 OAuth 的 HTTP 服务器

先添加服务器声明。OAuth 登录适用于支持相应协议的 HTTPS Streamable HTTP 端点，不适用于 stdio 或任意普通网页。Ash 会检查服务元数据、授权服务器和回调；不兼容的服务仍可能登录失败。

在支持登录的桌面窗口中，打开服务器详情，选择 **Sign in**，在外部浏览器核对服务、账号和授权范围并完成登录。需要放弃时选择 **Cancel sign-in**。登录入口还依赖当前后端能力和本地回调服务；入口不可用时，不要把它当作账号已连接。

也可以在系统终端执行：

```sh
ash mcp login user:mcp:team-tools
ash mcp logout user:mcp:team-tools
```

`login` 打开浏览器并等待本机回调，也会输出登录地址；按 `Ctrl+C` 可取消。不要把这一命令与 Ash Code 中仅用于查看和启用声明的 `/mcp` 混淆。`add` 本身不会自动登录；登录完成后仍要检查启用状态和实际工具连接。

服务要求预注册客户端时，按服务提供方说明使用 `--client-id <客户端ID>`，或 `--client-metadata-url <客户端元数据URL>`；所需权限可用 `--scopes <范围1,范围2>` 指定。桌面详情也会在需要时询问客户端 ID 和可选元数据 URL。这些字段不是 client secret，不要填入密码或密钥。服务还需接受本机 loopback 回调及其动态端口。

OAuth 凭据由 Ash 后端保存和更新，不需要手工复制 token 到用户配置。私网或代理部署还需满足当前后端的出站网络授权；不要通过关闭证书验证来处理登录失败。

### 退出与撤回访问

详情中的 **Sign out** 与 `ash mcp logout` 执行本地退出：使旧登录失效，清理本地凭据并等待相关在途请求结束。它们不等于在服务提供方撤销整个账号授权，也不会撤回已经发生的外部操作。需要彻底撤销服务端授权时，按服务提供方的账号管理流程处理。

退出报错或超时时，检查错误和后续状态，不要把工具目录消失当作退出已完成，也不要重放结果不确定的写操作。**Disconnect**、**Disable** 与删除声明不能替代账号退出。

当前 stdio 声明不能通过凭据引用注入环境变量，配置这类引用会报错。这里也不提供通用 API key 录入字段。不要把 API key、密码或 token 写进 `config.toml`、URL、命令参数或聊天示例。

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
| 凭据不存在或登录不可用 | 核对 HTTPS 端点、OAuth 支持、客户端注册与当前窗口回调能力；需要时重新登录，反复启用不会创建 token |
| 配置后其他 MCP 工具也消失或后端启动失败 | 当前连接组合可能因一个启用的服务器失败而整体失败；先将最近新增的声明设为禁用，再重新检查 |
| 工具绑定已过期 | 重新发现当前工具，不要复用旧目录中的调用信息 |
| 工具被拒绝 | 查看动作、目标和权限说明，再缩小请求范围 |
| 连接中断或结果未知 | 先确认外部操作是否已经发生，再决定是否重试；不要重复提交不确定的写操作 |

## 下一步

* [查看工具活动](/docs/reference/tools.md)
* [管理会话与任务](/docs/agents/sessions.md)
* [检查目录权限和批准](/docs/configure/permissions.md)
