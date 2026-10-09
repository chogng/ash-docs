---
ContentId: 9672d99a-bb4e-4f5c-bbbc-c7e16f687b21
DateApproved: 10/9/2026
SourceRevision: 2ea286048154d769ac465e77b26a5c6112514d77
MetaDescription: 在 Ash 桌面应用和 Ash Code 中配置 API 密钥、连接订阅账号、添加自定义供应商，并选择和验证模型。
MetaSocialImage: ../../og.png
---
# 配置模型与账号

使用 Ash 处理任务前，先连接一项你有权使用的模型服务，再选择模型。本页带你完成 API 密钥配置、订阅账号连接和一次最小验证，也说明怎样添加自定义端点、切换模型和排查连接问题。

界面名称以下文括号中的英文为定位参考。模型列表、账号状态和服务权限是三件不同的事：看到某个模型，或已经保存密钥，都不代表该账号一定可以调用它。

## 1. 选择接入方式

根据你已有的服务选择一种方式，不必把所有供应商都配置一遍。

* **开发者 API 密钥**：你有供应商开发者平台签发的 API key。使用桌面应用的 **Settings > Models > API key**，或 Ash Code 的 **Providers > API**。
* **订阅账号**：你要使用 Ash 已提供入口的订阅连接。在 Ash Code 的 **Providers > Subscriptions** 中连接相应账号。桌面应用另有 **Manage Accounts** 命令，但其中提供的登录入口与 Ash Code 不完全相同。
* **自定义供应商**：你的服务需要指定 Base URL、API 协议或自定义模型 ID。使用桌面应用的 **New provider**，或 Ash Code 的 **New custom provider**。

订阅和开发者 API 使用各自的凭据与服务权限。不要把网页登录密码、浏览器 Cookie 或订阅令牌粘贴到 API key 输入框。API 请求和模型测试可能消耗供应商额度或产生费用。

## 2. 在桌面应用中配置 API 密钥

1. 打开 **Settings**，选择 **Models**。在会话界面中，也可以从账号菜单进入 **Settings**。
2. 找到 **API key** 区域，选择与你的密钥对应的供应商输入框。
3. 粘贴 API key，然后按 `Enter`，或将焦点移到其他控件。输入框离开焦点时保存，不需要再找保存按钮。
4. 确认输入框显示掩码，并且没有保存失败提示。
5. 在同页的 **Chat models** 中搜索模型名称或 ID，打开该模型的显示开关。需要查看完整列表时，选择 **viewall models**。

已保存的密钥不会以原文重新显示在设置页。要更换密钥，替换输入框内容后离开焦点；要删除密钥，清空输入框后离开焦点。

如果出现 **API key saved, but models could not be refreshed**，表示密钥已保存，但模型列表刷新失败。先检查网络和服务状态，不要把这个提示当成密钥没有保存。

## 3. 在 Ash Code 中配置 API 密钥

1. 在 Ash Code 输入框运行 `/config`。
2. 选择 **Providers**，在 **API** 分组中选择供应商。例如，OpenAI 开发者密钥对应 **OpenAI**，不对应订阅分组中的 **ChatGPT**。
3. 在 API key 输入框中粘贴密钥，按 `Enter` 保存。输入内容会被遮挡，凭据保存到当前 Ash 配置环境的凭据存储中。
4. 按 `Esc` 返回输入框，运行 `/model`，选择要使用的模型。

BigModel 和 Z.AI 的连接使用统一的 GLM 模型标识。不要因为模型列表显示 **GLM**，就重新把密钥录入另一个供应商。

## 4. 连接已有订阅

### 在 Ash Code 中连接

1. 运行 `/config`，选择 **Providers**。
2. 在 **Subscriptions** 分组中选择服务。
3. 选择 **Sign in to …**，按页面提示完成连接。
4. 返回 Ash Code，检查账号与模型列表。如果页面提供 **Plan**，它显示的是已取得的套餐信息；缺少套餐名称不应被解释为免费套餐。
5. 运行 `/model` 选择模型。需要查看订阅额度时运行 `/usage`。

不同入口的连接方式如下：

* **ChatGPT**：复用运行 Ash 后端的主机上已有且有效的 Codex ChatGPT 登录。先在 Codex 完成登录，再回到 Ash 的 ChatGPT 页面连接。当前这个入口不会替你创建或续期 Codex 登录。
* **Kimi**：连接 Ash 自己的 Kimi Code 订阅登录。出现授权地址和一次性代码时，在页面指定的网站完成授权。
* **Super Grok**：连接已有可用的本机 Grok 登录，或按页面给出的设备码授权流程登录。
* **BigModel** 和 **Z.AI**：订阅分组中的这两个入口连接对应的 Coding Plan。可以只读复用匹配的本机 ZCode 登录；没有可用凭据时，按浏览器授权流程登录。它们与 **API** 分组中的同名入口不同。
* **BigModel Start Plan** 和 **Z.AI Start Plan**：连接对应的 Start Plan。不要为了使用 Start Plan 而选择 Coding Plan 入口。

如果浏览器没有自动打开，使用当前登录页显示的授权地址。设备码流程还需要输入同页显示的一次性代码。需要中止时，选择 **Cancel sign-in**。

这些名称表示 Ash 提供的连接入口，不保证任意同名账号或所有套餐都有模型使用权限。额度与可用模型以当前账号返回的结果和实际请求为准。

### 在桌面应用中连接或退出账号

在命令面板运行 **Manage Accounts**，选择 **Add account**。当前菜单提供 **Sign in with ChatGPT**、**Sign in with BigModel Start Plan** 和 **Sign in with Z.AI Start Plan** 等入口；已经就绪的账号不会重复显示对应的添加项。

其中 **Sign in with ChatGPT** 仍连接已有的 Codex 登录。若你没有可用的 Codex ChatGPT 登录，可以先完成该登录，或按照前文配置 OpenAI 开发者 API 密钥。

要退出账号，再次运行 **Manage Accounts**，选择账号，然后选择 **Sign out of …**。Ash Code 的订阅详情页在账号已连接时提供 `l` 键退出提示。

对只读复用的 Codex、Grok 和 ZCode 登录，Ash 的断开操作不等于退出原应用。需要更新这些外部登录时，回到原应用完成，再在 Ash 中重新连接。

### 同一厂商有多条连接时

选择模型通常选择的是型号，并不等于指定计费连接。Ash 会从该厂商已就绪的连接中按优先顺序选择：订阅连接通常优先于开发者 API。一次请求失败后不会在同一次请求中自动改用另一条连接或 API 密钥。

GLM 的顺序是 BigModel Coding Plan、Z.AI Coding Plan、BigModel Start Plan、Z.AI Start Plan、BigModel API、Z.AI API。如果你只有 Start Plan，却留下了未开通的 Coding Plan 凭据，应在 Ash 中断开相应 Coding Plan，再发起新一轮请求。

Kimi Desktop、Kimi Code CLI 的本机登录也与 Ash 的 Kimi 订阅登录分开。如果模型列表出现 `kimi-desktop/…` 或 `kimi-cli/…`，这些连接的凭据需要在对应原应用中维护；Ash 的 Kimi 订阅页与 `/usage` 不代表这两条外部连接的状态。

## 5. 选择模型并验证连接

### 桌面应用

1. 回到聊天输入区，打开显示模型名称或 **Auto** 的模型选择器。
2. 如果 **Auto** 已开启，先关闭它，再搜索并选择具体模型。
3. 如果选择器没有模型，选择 **Open Settings**；已有列表中可通过 **Add Models** 返回模型设置。检查目标模型是否在 **Chat models** 中开启。
4. 如需调整推理强度或上下文选项，打开模型按钮旁的选项按钮，只选择当前模型实际提供的值。

### Ash Code

运行 `/model`，浏览模型并按 `Enter` 选择。已知准确标识时，也可以直接设置：

```sh
/model <provider>/<model>
```

将占位符替换为模型列表中的真实厂商 ID 和模型 ID，不要直接复制占位符。例如，GLM 型号的厂商 ID 是 `glm`，不使用 Coding Plan 的连接名称。

要取消手动模型偏好，运行：

```sh
/model clear
```

### 发送一次最小请求

选择模型后发送：

```prompt
请只回复“连接成功”。不要读取文件、运行命令或调用外部工具。
```

收到回复说明这次模型请求成功。它不能证明其他模型、工具调用、图片输入或更长上下文也可用。确认基础连接正常后，再开始[第一个任务](/docs/getstarted/first-task.md)。

切换模型、账号或参数只影响后续使用；已经执行中的一轮不会中途换用新选择。

## 6. 添加自定义供应商

准备供应商提供的 Base URL、准确模型 ID、API 协议和所需凭据。不要用供应商官网首页代替 API Base URL，也不要仅凭“兼容 OpenAI”推断它支持哪一种协议。

### 桌面应用

1. 打开 **Settings > Models**，在 **API key** 区域选择 **New provider**。
2. 填写 **Provider name** 和 **Base URL**。
3. 根据端点文档选择 **API format**：**OpenAI Responses**、**OpenAI Chat Completions** 或 **Anthropic Messages**。
4. 如果服务要求 API key，填写对应输入框。名称和 URL 在离开输入框时保存，协议选择也会保存；确认没有校验错误。
5. 选择刷新图标 **Refresh models** 读取端点模型列表。
6. 如果没有返回模型，选择 **Add model**，填写准确的 **Model ID** 和 **Context window (tokens)**，再选择 **Save model**。仅在需要把本地模型名映射到另一上游型号时填写 **Upstream Model ID (optional)**。
7. 打开目标模型的 **Enabled** 开关，再回到聊天模型选择器选择它。

上下文窗口填写供应商明确支持的 token 数。**1M context** 只是配置选项，不会替账号获得长上下文权限，也不会扩大上游模型的真实容量。

需要连通性验证时可选择 **Test models**。它会依次向表中的模型发送测试请求，可能产生用量；表为空时会先读取模型列表。**Model test passed** 表示该次测试通过，**Enabled** 则控制是否出现在选择器中，两者互不替代。

### Ash Code

在 `/config > Providers > API` 选择 **New custom provider**。按界面提示填写供应商名称、Base URL、所需密钥和模型 ID，再选择 API 类型。用 `Tab` 或 `Shift+Tab` 移动，按 `Enter` 编辑并提交字段；API 类型可用左右方向键切换。名称和 Base URL 完整后才能保存。

填写准确模型 ID 后使用页面的测试操作。模型 ID 留空会使用当前已选模型的型号，因此第一次接入时建议明确填写服务实际支持的 ID。测试同样会调用模型并可能消耗额度。

## 常见问题

### 保存了密钥，为什么仍无法使用模型？

按顺序核对供应商、密钥权限、模型 ID、额度以及实际错误。保存密钥不验证全部模型权限。若同一厂商还有订阅连接，它可能优先被选中；检查是否连接了没有相应权益的账号。

### ChatGPT 提示先在 Codex 登录

在运行 Ash 后端的同一主机上更新 Codex 的 ChatGPT 登录，然后回到 Ash 的 ChatGPT 入口重新连接。仅在另一台机器或浏览器中登录 ChatGPT，不能替代这个本机登录。不要手动复制令牌到 API key 输入框。

### 账号已连接，但模型列表为空或加载失败

检查网络和服务返回的错误。账号认证状态与模型发现是分开的；临时列表失败不等于已经登出。自定义端点如果不提供模型列表，可按其文档使用 **Add model** 手动添加准确 ID。

### 出现 401、403 或 429

* **401**：优先检查凭据是否失效，以及是否使用了正确的连接入口。
* **403**：检查账号、组织或套餐对该模型的访问权限。
* **429**：阅读供应商返回的具体说明。它可能表示请求限流，也可能表示余额不足或没有可用资源包，不应一律靠连续重试处理。

不要在问题报告、截图或聊天中公开完整 API key、访问令牌或刷新令牌。可以提供所选模型、入口名称、脱敏后的错误码，以及出错步骤。

## 下一步

* [管理会话与任务](/docs/agents/sessions.md)。
* [了解权限与批准](/docs/configure/permissions.md)。
* [查看工具活动](/docs/reference/tools.md)。
