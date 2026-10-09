---
ContentId: e5f4e518-9ec7-43cc-b3a8-3df5f21e60be
DateApproved: 10/9/2026
SourceRevision: 2e6f27585f3fe1676eb1f5ec32c140bed175697c
MetaDescription: 使用 Ash Code 命令行启动终端或桌面、运行单次问答和非交互任务，保存 JSONL 与执行记录，并按退出码安全续接会话。
MetaSocialImage: ../../og.png
Keywords:
  - Ash Code
  - CLI
  - 命令行
  - ask
  - exec
  - 自动化
---
# 使用 Ash Code 命令行

在项目目录运行 `ash` 可以打开交互式终端界面。需要一次提问并拿到回答时使用 `ash ask`；需要控制超时、保存执行事件或续接任务时使用 `ash exec`。这两个非交互入口都会创建或使用已保存的会话。

## 开始前先确认入口

本文假设你已有可运行的 Ash Code CLI，并已配置可用的[模型与账号](/docs/configure/models.md)。先检查当前版本支持的命令：

```sh
ash --version
ash --help
ash ask --help
ash exec --help
```

帮助和版本查询不会启动后台服务。后续问答、任务执行和会话管理会连接当前配置目录的共享后台；尚未运行时可能启动它。桌面与 CLI 使用同一个配置目录时可以查看同一批会话。

找不到 `ash` 时，先检查已有安装的可执行文件位置和 `PATH`。从源码使用的入口见[从源码运行](/docs/getstarted/run-from-source.md)；`just ash-code` 是源码仓库的启动任务，不是 `ash code` 子命令。本文不保证某个平台或版本已有可下载的安装包。

## 选择交互、桌面或单次执行

| 入口 | 适合什么情况 | 运行结束后 |
| --- | --- | --- |
| `ash` | 边做边讨论，需要审批、补充输入或查看过程 | 由你退出终端界面 |
| `ash app [PATH]` | 把项目、文件或工作区交给已安装的桌面应用 | CLI 完成交接后退出 |
| `ash ask "问题"` | 用已有模型配置完成一次问答 | 成功时输出最后一条回答并退出 |
| `ash exec [选项] "任务"` | 自动化、批处理或可追踪的一次任务 | 输出回答或 JSONL，并用退出码报告结果 |

### 打开终端界面

```sh
cd /path/to/project
ash
```

`/path/to/project` 是示例路径，请替换为你的项目。交互式界面要求标准输入和标准输出都连接终端；不能把它当作管道程序。新任务默认以当前目录为工作目录。如果设置过 `ASH_WORKSPACE_ROOT`，它会覆盖这个目录，运行前应确认它指向正确项目。

### 从命令行打开桌面应用

```sh
ash app .
ash app "./demo.code-workspace"
```

目标必须已经存在。macOS 会查找 `/Applications/Ash.app` 和 `~/Applications/Ash.app`；Windows 会查找用户安装目录及 Program Files 中的 Ash。Linux 或其他安装位置需要明确指定桌面程序：

```sh
ash app --app-path /absolute/path/to/Ash .
```

macOS 的 `--app-path` 也接受 `.app`。此命令不负责下载、安装或构建桌面应用；找不到应用或目标路径时会报错。CLI 成功退出表示已交接启动请求，不代表模型连接或任务已经完成。

## 做一次问答或只分析项目

一个不依赖项目文件的小问题：

```sh
ash ask "用两句话解释 Git 的工作区与暂存区。"
```

只希望分析项目时，把范围和禁止修改的要求写清楚：

```sh
ash ask "只阅读 README.md，概括项目启动步骤和需要的环境变量。不要修改文件、安装依赖或运行启动命令；资料不足就说明缺什么。"
```

重要：`ash ask` 是简化的非交互命令，底层使用 Agent 模式，不等同于界面里的只读 **Ask** 模式。上面的文字表达任务要求，不提供文件写保护。它仍可使用当前权限允许的工具；默认遇到需要交互批准的操作会中断。需要产品层面的只读调查限制时，在交互界面选择 **Ask**，并检查[权限与批准](/docs/configure/permissions.md)。

`ask` 没有模型、超时、续接或 JSONL 选项。它使用已有模型配置，默认单轮超时为 60 秒。需要调整这些条件时使用 `exec`。

### 输入来自哪里，输出到哪里

`ask` 和 `exec` 的任务都必须通过命令行参数提供。多个位置参数会以空格连接，建议把整个问题放在一对引号内。

当前不从标准输入读取任务，也没有把 `-` 当成任务文件或标准输入的特殊约定。因此 `cat question.txt | ash ask` 不能提交问题。对于小段、不含敏感信息的文本，POSIX shell 可以先读取文件，再将它作为参数传入：

```sh
ash ask "$(cat question.txt)" > answer.txt 2> errors.log
```

这是 shell 的文件读取，不是 Ash 的 stdin 功能；命令行长度受系统限制，参数也可能被进程查看工具读取。不要用它传递密钥。

普通输出模式只在成功完成时向标准输出写入最后一条 Agent 消息，可能没有正文；错误写入标准错误。需要过程记录时使用 `exec --jsonl`。任务文字以 `--` 开头时，在文字前加参数分隔符：

```sh
ash exec -- "--verbose 在命令行工具中通常表示什么？只解释，不执行命令。"
```

## 执行一个范围清楚的任务

先在专用分支或可检查的工作区确认已有改动，再给任务一个可验收的边界。例如，项目中已经有一个 `slugify` 函数和对应测试时：

```sh
ash exec --title "补充 slugify 测试" --auto-review --timeout-seconds 180 \
  "只为现有 slugify 函数补充空字符串输入的测试，沿用项目现有测试工具。运行相关测试，报告结果和改动文件。不要改生产代码、安装依赖、提交或推送。"
```

`--auto-review` 让后台自动审查需要批准的操作，不代表所有操作都会通过。任务结束后检查实际测试结果和文件差异；退出码为 `0` 只说明这一轮正常结束，不能代替你的验收。

不加权限选项时采用手动批准策略，但非交互命令没有批准界面。一旦需要人工批准、补充输入或其他交互，CLI 会请求中断任务。若任务本身需要你参与，改用 `ash` 或恢复交互会话通常更合适。

### 常用 exec 选项

| 选项 | 行为 |
| --- | --- |
| `--title "标题"` | 新会话或新分支的标题；默认 `CLI execution` |
| `--model PROVIDER/MODEL` | 为这一轮指定准确的供应商和模型；省略时用已有配置 |
| `--timeout-seconds N` | 单轮等待上限，默认 60 秒；必须至少为 1 |
| `--jsonl` | 将执行事件逐行写入标准输出 |
| `--trace-output PATH` | 执行后保存该会话的 Trace JSON |
| `--changes-output PATH` | 执行后保存本轮记录到的文件变更 JSON |
| `--resume SESSION_ID THREAD_ID` | 在指定会话的指定线程中开始下一轮 |
| `--fork SESSION_ID PARENT_THREAD_ID` | 在同一会话内创建线程分支，再执行任务 |
| `--auto-review` | 使用后台自动权限审查 |
| `--dangerously-bypass-permissions` | 显式绕过本轮权限检查，风险较高，不宜作为自动化默认值 |

`--resume` 与 `--fork` 不能同时使用；两个权限选项也不能同时使用。模型必须来自你配置中实际可用的供应商与模型列表；正确的标识格式不保证有访问权限。

## 在脚本中保存结果

下面是 POSIX shell 示例。它分别保存事件和错误，并保留 Ash 自身的退出码：

```sh
mkdir -p ash-run
if ash exec --jsonl --title "说明启动步骤" --timeout-seconds 120 \
  "只阅读 README.md，列出启动步骤；不要修改文件或执行命令。" \
  > ash-run/events.jsonl 2> ash-run/errors.log
then
  status=0
else
  status=$?
fi
printf 'Ash exit code: %s\n' "$status"
exit "$status"
```

事件文件可能包含提问、回答、工具结果和路径。按项目日志的保密要求保存，不要直接上传到公开构建产物。

### 读取 JSONL

`--jsonl` 输出的是事件流，不是单个 JSON 对象，也不是仅含最后回答的文件。每个完整 JSON 对象占一行，写出后立即刷新。每行包含 `schemaVersion`、`runId` 和 `event`；当前事件版本为 `1`。

常见事件如下：

| `event.type` | 你可以用它做什么 |
| --- | --- |
| `runStarted` | 保存 `sessionId` 和 `threadId`，以后可查看或续接 |
| `turnStarted` | 保存本轮 `turnId` |
| `threadUpdated` | 观察线程更新；不要仅凭某条消息推断整轮已结束 |
| `runCompleted` | 读取 `outcome.type`，区分完成、失败、中断、需要交互或结果未知 |

以下仅展示形状，标识为虚构示例：

```json
{"schemaVersion":1,"runId":"run-example","event":{"type":"runStarted","origin":"local","sessionId":"session-example","threadId":"thread-example"}}
```

脚本应检查事件版本，并同时检查最终退出码。进程提前失败、输出失败或连接异常时，事件文件可能不完整。CLI 当前没有专门的“最后回答文件”选项，也不提供自动重连、重放或 stdin 事件流。

### 保存 Trace 与文件变更

给 `exec` 增加 `--trace-output ash-run/trace.json` 和 `--changes-output ash-run/changes.json` 可以另存诊断资料。先创建父目录，使用本次运行专属路径；同名文件会被覆盖。

Trace 导出包含该会话的线程记录与可用诊断信息，不限于最后一条回答。变更导出是本轮记录到的变更集合 JSON，不是可直接应用的补丁，也不会自动提交或推送。阅读[查看执行 Trace](/docs/agents/trace.md)和[Git 更改与提交](/docs/sourcecontrol/overview.md)了解检查方式。

导出发生在执行结果返回之后。导出失败仍会使命令返回失败，即使任务本身已完成；此时不要为了重取文件直接重跑整个任务。先检查错误和已有会话，避免重复操作。

## 按退出码决定下一步

| 退出码 | 含义 | 建议处理 |
| --- | --- | --- |
| `0` | 本轮正常完成 | 读取回答，再验收任务要求 |
| `1` | 执行、连接、输出或导出失败 | 查看标准错误与已保存记录，判断失败发生在哪一步 |
| `2` | 参数错误，或任务需要非交互入口无法处理的交互 | 参数错误先修正命令；`requiresInteraction` 则转到交互界面 |
| `75` | 已开始的任务无法确认最终结果 | 先核对原会话及实际改动，不自动重试 |
| `130` | 中断，包括 Ctrl-C 或已确认的单轮超时中断 | 检查已完成的工作，再决定如何继续 |

达到超时或按下 Ctrl-C 后，CLI 会请求停止，并等待后台确认终态，不保证在指定秒数刚到时立刻退出。如果无法确认停止，结果可能为 `75`。停止也不回滚已经发生的文件修改或外部操作。

JSONL 的 `runCompleted` 表示本次观察已经结束，其 `outcome.type` 仍可能是 `failed`、`requiresInteraction`、`interrupted` 或 `outcomeUnknown`。不要只检查事件名称。

## 查看、续接与分支

列出保存的会话：

```sh
ash sessions
```

结果是 JSON。使用实际返回的 `sessions[].sessionId` 及对应 `threads[].threadId`，或从本次 JSONL 的 `runStarted` 中取得标识。不要把会话标题当作 ID，也不要默认 Session 与 Thread 的 ID 总是相同。

以下大写词均为占位符，执行前替换成真实 ID：

```sh
ash resume SESSION_ID THREAD_ID
ash exec --resume SESSION_ID THREAD_ID "根据上一轮结果，只解释尚未验证的风险。"
ash exec --fork SESSION_ID THREAD_ID --title "另一种方案" "基于已有证据比较另一种方案，先不要修改代码。"
```

`ash resume` 打开交互界面；`exec --resume` 提交一个新的非交互轮次，不是重放中断请求。已有会话保留原来的执行目标；切换 shell 当前目录不会把它迁到另一个项目。

`exec --fork` 在原会话中创建线程分支。要将线程历史复制成独立会话，使用另一个命令：

```sh
ash fork SESSION_ID THREAD_ID --title "独立调查"
```

这个命令只创建独立会话并输出新身份，不执行新任务。需要继续时，使用返回的身份恢复会话。

## 遇到问题

* 提示需要 TTY：在真实终端运行 `ash`，脚本使用 `ask` 或 `exec`。
* `ask` 拒绝 `--model` 或 `--jsonl`：这些是 `exec` 选项，换用对应入口。
* 非交互任务总在审批处停止：检查任务是否需要人工确认；自动审查仍可能需要人介入，不要用绕过权限来掩盖问题。
* 找不到会话：确认使用原来的配置目录，并从 `ash sessions` 重新取得真实标识。
* 模型、账号或后台连接失败：运行 `ash doctor` 查看诊断，再阅读[故障排查](/docs/support/troubleshooting.md)。

更多逐项参数以你安装版本的 `ash <命令> --help` 为准。不要把其他 Agent CLI 的参数直接用于 Ash。
