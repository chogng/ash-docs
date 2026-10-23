---
ContentId: 04b3a201-fbf7-4302-acd4-151bdfe4c4ee
DateApproved: 10/23/2026
SourceRevision: 651cde77fa0c33b1afe1d60e068a8e98c824ef4c
MetaDescription: 在 Ash 中通过 $name 选择 Skill，创建项目 SKILL.md，并管理来源、启用状态和按需加载的参考资料。
MetaSocialImage: ../../og.png
Keywords:
  - Ash
  - Skill
  - 自定义
  - 工作流
  - SKILL.md
---
# 使用 Skills 扩展工作流

Skill 把一类任务的工作方法、验证步骤和参考资料组织在一起。需要反复执行代码检查、编写文档或生成特定产物时，你可以选择已有 Skill，也可以为项目创建自己的 Skill。

持续适用的项目约定使用[指令](/docs/customize/instructions.md)；“这类任务应按哪些步骤完成”使用 Skill。当前 Ash 没有独立的 `.prompt.md` 提示词文件机制，可复用任务可以保存为 Skill。

## 选择已有 Skill

在桌面工作台或 Ash Code 的聊天输入框中操作：

1. 输入 `$`，查看已启用、兼容且名称唯一的 Skill 候选。
2. 选择需要的 Skill，并补充具体任务。
3. 提交消息，开始新一轮任务。

例如，已配置名为 `code-review` 的 Skill 时：

```prompt
$code-review 检查当前改动，重点关注取消操作、错误处理和测试遗漏。
```

Skill 使用 `$name` 选择器。`/` 用于产品命令；不要把上面的例子改成 `/code-review`。运行中的任务不能通过补充消息换用另一项 Skill，需要在下一轮选择。

## 查看正文与管理启用状态

桌面工作台和终端界面使用同一份技能目录，但管理入口的操作不同。

桌面工作台：

1. 在命令面板运行 **打开扩展**（**Open Extensions**），展开 **技能**（**Skills**）。
2. 选择一个 Skill，在编辑器中查看它的来源、兼容性、启用状态和诊断。
3. 选择 **说明**（**Instructions**）标签，按需读取并查看正文。
4. 使用详情描述右侧的 **启用技能**（**Enable skill**）开关，只调整这一项 Skill。用 `Tab` 聚焦开关后，可按 `Space` 切换。刷新目录时，使用扩展标题栏的 **刷新扩展**。

顶部搜索框输入 `@skills` 加名称，只筛选已有技能。清除搜索后返回分类列表。需要修改正文时，到你维护的原始项目或个人来源文件中编辑，而不是在详情页编辑正文。

Ash Code 终端界面：

1. 输入 `/skills`，按名称搜索。
2. 在 **All / On / Off** 页签中选择技能。
3. 用左右键展开或收起描述，按 Enter 或 Space 切换启用状态。

启用技能不等于立即执行它。需要在当前任务中明确使用时，仍用 `$name` 选择。安装更多技能可从 `/marketplace` 进入；桌面扩展页的顶部搜索框输入普通关键词时，同时搜索 Marketplace 和已安装插件。查看包的来源和权限后再安装；`@skills` 筛选不是市场搜索。

## 创建项目 Skill

1. 在项目根目录创建以下结构：

```text
.ash/skills/code-review/
├── SKILL.md
└── references/
    └── checklist.md
```

2. 在 `SKILL.md` 中填写名称、描述和工作步骤：

```markdown
---
name: code-review
description: 检查代码改动中的正确性问题和测试遗漏，在审查 diff 或合并前检查时使用。
---

## 代码检查

1. 阅读当前 diff 和受影响的调用方。
2. 检查取消操作、错误处理和状态更新。
3. 按需要读取 references/checklist.md。
4. 报告问题位置、触发条件和建议的验证方式。
5. 用户只要求审查时，不直接修改文件。
```

3. 在 `references/checklist.md` 中写入更详细的项目检查清单。不需要参考文件时，删除目录结构和正文中对它的引用。
4. 保存后，在 Ash 中打开该项目，确认会话有权读取该目录的 Skill 来源。
5. 等候选刷新后，输入 `$code-review` 和一项小任务，核对实际结果。

也可以使用内置的 `$skill-creator` 辅助创建，再检查它生成的文件和步骤。

目录名必须与 `name` 一致，名称为 1–64 个小写字母、数字或连字符，不能以连字符开头或结尾，也不能包含连续的 `--`。`description` 必须说明做什么和何时使用，长度为 1–1024 个字符。

需要补充展示信息时，可在可选的 `metadata` 映射中添加 `author`、`version`、`updated-at` 和 `short-description` 字符串。详情会显示已有的开发方、版本和更新日期，不会自动验证作者身份。列表和详情顶部优先使用 `short-description`，否则取 `description` 的首句作为摘要；**说明**标签仍显示正文。不要用短摘要替代必填的完整 `description`。

每个 Skill 都是来源目录下的直接子目录，不要再套一层团队分类文件夹。`SKILL.md` 使用 UTF-8 文本；不要用符号链接或硬链接代替入口文件。

## 添加参考资料和脚本

按需要添加 `references/`、`scripts/` 或 `assets/`。在 `SKILL.md` 中说明何时读取哪些文件，路径相对于该 Skill 的目录。

例如：

```markdown
- 检查异步流程时，先读取 references/async-checklist.md。
- 需要生成报告时，参考 assets/review-template.md。
- 只有当前任务确实需要、且具备相应执行权限时，才通过普通工具运行 scripts/check.sh。
```

发现 Skill 时不会把所有资料加载到上下文，也不会递归展开每个引用。读取脚本不等于运行脚本；Skill 本身没有自动执行脚本的专用入口，执行仍走普通工具和批准流程。

当前完整 `SKILL.md` 上限为 1 MiB，YAML 文件头上限为 16 KiB，单个按需读取的包内资源上限为 256 KiB。把较大的背景资料拆成任务真正需要的小文件。

## 在多个项目复用个人 Skill

个人 Skill 来源在用户配置中注册。默认配置文件是用户主目录下的 `.ash/config.toml`；设置了 `ASH_HOME` 时，使用该目录中的 `config.toml`。远程会话以当前连接的运行环境为准。

在现有文件中添加以下内容，保留原来的 `schemaVersion` 和其他配置：

```toml
[skills.sources."user:skill-source:personal"]
id = "user:skill-source:personal"
rootReference = "/absolute/path/to/skills"
enablement = "enabled"
```

将 `rootReference` 替换为实际的绝对目录，该目录下放置各个 Skill 文件夹。Windows 可以使用 `C:/Users/<user>/skills` 形式。配置表中的来源 ID 与 `id` 必须一致；不要把个人来源声明放进项目配置并期待它自动生效。

Ash 不会自动注册其他开发工具的所有 Skill 目录。要共享团队流程，把项目的 `.ash/skills/` 提交到版本控制；个人来源配置和凭据不应随项目提交。

## 了解加载时机

| 时机 | 加载内容 |
| --- | --- |
| 浏览候选或 Skill 目录 | 名称、描述、来源、兼容性和启用状态 |
| 显式选择 Skill 并开始任务 | 对应版本的完整 `SKILL.md` |
| 模型按需选用 Skill | 先查看元数据，再读取选中的正文 |
| 任务需要详细资料 | 按需读取引用的参考文件或资源 |

Ash 还可以依据任务文字，高置信且唯一地自动选择受信任的内置 Skill。个人、项目、Plugin 和 Marketplace 来源不走这条内置自动选择路径；模型仍可按需读取合适的 Skill。希望确定使用某项流程时，请显式使用 `$name`。

启用表示 Skill 可以被选择，不表示每轮都会执行。已经开始的任务使用固定版本；中途修改该版本的文件可能使继续读取失败，不能依赖编辑文件来改变运行中的要求。禁用后的技能也不会因此撤回已经开始的任务。

Skill 只提供工作方法。它不能授予文件、网络或凭据权限，也不能覆盖适用的用户和项目规则。即使文件头包含 `allowed-tools`，它也只是作者的提示，不是权限授权。相关说明见[权限与批准](/docs/configure/permissions.md)。

## 排查 Skill 问题

| 现象 | 检查方式 |
| --- | --- |
| `$` 中没有候选 | 检查来源和技能是否启用、项目是否允许读取 Skill，以及文件是否直接位于 `<来源>/<name>/SKILL.md` |
| 同名 Skill 不出现在候选中 | 查看不同来源是否有同名且已启用、兼容的项；禁用不需要的项，或同时修改自有 Skill 的目录名和 `name` |
| 显示不兼容或解析错误 | 查看 Skills 管理界面的诊断，核对 YAML、名称、描述和环境要求 |
| 从其他工具复制后报错 | Ash 严格检查文件头；不要直接添加其他产品专有的调用或权限字段 |
| 需要修改 Skill 正文 | 详情中的 **说明** 用于查看；到原始项目目录或个人来源目录修改 `SKILL.md`，再刷新目录并重新打开详情 |
| 修改文件后当前任务失败 | 等当前轮结束或停止后，待目录刷新再重新选择；运行中的任务不会自动改用新版本 |
| 已启用但没有执行 | 显式使用 `$name`，并在任务中写明需要完成的工作 |
| 更改启用状态提示配置已变化 | 刷新管理界面后重试，避免用旧状态覆盖另一处的新设置 |

保存 Skill 后，先用一个有明确验收条件的小任务测试。检查它是否读取了正确的参考资料、使用了预期步骤，以及是否如实报告未运行的验证。

## 下一步

- [设置项目和个人指令](/docs/customize/instructions.md)
- [用 MCP 添加外部工具](/docs/customize/mcp-servers.md)
- [了解工具执行与结果](/docs/reference/tools.md)
- [用 Advisor 检查方案](/docs/agents/advisor.md)
