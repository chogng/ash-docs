---
ContentId: 04b3a201-fbf7-4302-acd4-151bdfe4c4ee
DateApproved: 9/21/2026
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

## 选择已有 Skill

在桌面工作台或 Ash Code 的聊天输入框中操作：

1. 输入 `$`，查看已启用、兼容且名称唯一的 Skill 候选。
2. 选择需要的 Skill，并补充具体任务。
3. 提交消息，开始新一轮任务。

例如，已配置名为 `code-review` 的 Skill 时：

```prompt
$code-review 检查当前改动，重点关注取消操作、错误处理和测试遗漏。
```

Skill 使用 `$name` 选择器。`/` 用于产品命令；Ash Code 的 `/skills` 用于浏览、启用、禁用和查看诊断，不会直接执行 Skill。运行中的任务不能通过补充消息换用另一项 Skill，等待下一轮再选择。

## 创建项目 Skill

在项目根目录创建以下结构：

```text
.ash/skills/code-review/
├── SKILL.md
└── references/
    └── checklist.md
```

`SKILL.md` 是必需的入口文件。目录名要与 `name` 一致，名称使用小写字母、数字和连字符。

````markdown
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
````

保存后，在 Ash 中打开该项目。目录需要具备读取 Skill 来源的权限。等候选刷新后，输入 `$code-review` 开始任务；未出现时，按本页的排查表检查。

按需要添加 `scripts/`、`references/` 或 `assets/`。在入口中说明什么时候使用它们，避免把全部参考资料塞入每次任务。脚本仍通过普通工具执行，不会因为位于 Skill 目录就自动运行。

## 在多个项目复用个人 Skill

个人 Skill 来源在用户配置中注册。默认配置文件是用户主目录下的 `.ash/config.toml`；设置了 `ASH_HOME` 时，使用该目录中的 `config.toml`。

在现有文件中添加以下内容，保留原来的 `schemaVersion` 和其他配置：

```toml
[skills.sources."user:skill-source:personal"]
id = "user:skill-source:personal"
rootReference = "/absolute/path/to/skills"
enablement = "enabled"
```

将 `rootReference` 替换为实际的绝对目录，该目录下放置各个 Skill 文件夹。Windows 可以使用 `C:/Users/<user>/skills` 形式。Ash 不会把所有其他开发工具的 Skill 目录自动注册进来。

要共享团队流程，把项目的 `.ash/skills/` 提交到版本控制。个人来源配置和凭据不应随项目提交。

## 了解加载时机

| 时机 | 加载内容 |
| --- | --- |
| 浏览候选或 Skill 目录 | 名称、描述、来源、兼容性和启用状态 |
| 显式选择 Skill 并开始任务 | 对应版本的完整 `SKILL.md` |
| 模型按需选用 Skill | 先查看元数据，再读取选中的正文 |
| 任务需要详细资料 | 按需读取引用的参考文件或资源 |

启用表示 Skill 可以被选择，不表示每轮都会执行。已经开始的任务使用固定版本；中途修改该版本的文件可能使继续读取失败，不能依赖编辑文件来悄悄改变当前任务的要求。

Skill 只提供工作方法。它不能授予文件、网络或凭据权限，也不能覆盖上层规则。相关说明见[权限与批准](/docs/configure/permissions.md)。

## 排查 Skill 问题

| 现象 | 检查方式 |
| --- | --- |
| `$` 中没有候选 | 检查来源是否启用、项目是否允许读取 Skill，以及 `SKILL.md` 的名称和描述 |
| 同名 Skill 不出现在候选中 | 检查不同来源是否有重名项，禁用不需要的项或为自己维护的 Skill 改名 |
| 显示不兼容或解析错误 | 在 Ash Code 的 `/skills` 诊断中查看原因，修正文件格式或准备所需环境 |
| 修改文件后当前任务失败 | 结束当前轮，待目录刷新后重新选择；运行中的任务不会自动改用新版本 |
| 已启用但没有执行 | 显式使用 `$name` 选择，并在任务中写明需要它完成什么 |

## 下一步

* [用 MCP 添加外部工具](/docs/customize/mcp-servers.md)
* [了解工具执行与结果](/docs/reference/tools.md)
* [用 Advisor 检查方案](/docs/agents/advisor.md)
