---
ContentId: 900938ac-f311-461e-8d2a-4f989712a0a5
DateApproved: 10/19/2026
SourceRevision: 07b3dc0e2512d7163e14068c8d0ce3b6337d76be
MetaDescription: 认识 Ash 编辑器和 Agents 窗口，切换 Chat 与 Code，显示文件和更改，并调整侧栏、面板和编辑器布局。
MetaSocialImage: ../../og.png
Keywords:
  - Ash
  - 界面
  - 布局
  - Agents
  - 编辑器
---
# 认识界面和调整布局

直接阅读和修改项目文件时，使用 Ash 编辑器窗口；围绕 Agent 任务工作时，打开 Agents 窗口。本页帮助你找到文件、对话与工具，并调整它们在窗口中的位置。

文中同时给出部分英文控件名，便于在不同显示语言中查找。控件会随当前窗口、页面和活动内容变化。

## 认识编辑器窗口

| 区域 | 用来做什么 |
| --- | --- |
| 活动栏 | 选择 Explorer、搜索和其他功能入口 |
| 主侧栏 | 显示文件树或当前选择的功能视图 |
| 辅助侧栏 | 在编辑器旁显示聊天等附加视图 |
| 编辑器 | 打开文件标签、编辑内容、并排查看文件 |
| 底部面板 | 使用终端等工具 |
| 状态栏 | 查看当前状态，包括目录权限提示 |

先用[打开文件夹](/docs/editing/workspaces.md)载入项目。点击 Explorer 中的文件，在编辑器中查看；需要并排比较时，右键文件标签，选择 **向右拆分**或**向下拆分**。这些操作增加编辑器分组，文件仍保存在原来的位置。

寻找已经打开的文件时，在 **Go** 菜单中使用 **Show All Editors**。误关标签后，可从 **File** 菜单执行 **Reopen Closed Editor**。更多文件与代码操作见[编辑文件与导航代码](/docs/editing/editing-and-navigation.md)。

## 用命令面板找到操作

按 `Ctrl+Shift+P`（macOS：`Cmd+Shift+P`）或 `F1` 打开命令面板，输入名称筛选命令，按 `Enter` 执行。以 `>` 开头的输入用于查找命令。删除这个前缀可以[按文件名查找文件](/docs/editing/editing-and-navigation.md#按文件名找到项目文件)。

搜索框有内容时，**清空输入** 按钮会清除全部文字，并把焦点留在输入框，方便继续输入。按 `Esc` 关闭面板并返回原来的界面。

命令行右侧的齿轮 **配置快捷键** 会打开快捷键弹窗，并直接筛选该命令，不会执行命令。最近使用的命令还提供 **从命令历史记录中移除**，只移除历史记录。具体修改方式见[设置键盘快捷方式](/docs/configure/keyboard-shortcuts.md)。

## 调整编辑器布局

### 移动活动栏和主侧栏

右键活动栏，使用 **Activity Bar Position** 选择侧边、顶部、底部或隐藏。活动栏位于侧边时，**Activity Bar Size → Compact** 可以缩小图标区域。

同一菜单提供移动主侧栏到左侧或右侧的操作。也可以在设置中搜索：

- `workbench.activityBar.location`：活动栏位置
- `workbench.activityBar.compact`：紧凑活动栏
- `workbench.sideBar.location`：主侧栏在左侧还是右侧

隐藏活动栏后，可从命令面板执行 **Move Activity Bar to Side** 重新显示。

### 显示或放大底部工具

通过标题栏的面板按钮，或 **View** 菜单中的面板显隐操作，展开或收起底部面板。命令面板中的名称为 **Toggle Panel Visibility**；已展开时也提供 **Hide Panel**。

需要更多空间阅读终端输出时，使用 **Maximize Panel**；返回编辑器时使用 **Restore Editor Area**。隐藏面板只改变显示状态，需要结束终端进程时应使用终端自身的关闭操作。

### 显示或放大辅助侧栏

编辑器窗口的标题栏和 **View** 菜单提供辅助侧栏显隐操作。也可以从命令面板按名称查找：

| 操作 | 结果 |
| --- | --- |
| **显示辅助侧栏**（**Show Secondary Side Bar**） | 恢复辅助侧栏 |
| **隐藏辅助侧栏**（**Hide Secondary Side Bar**） | 收起辅助侧栏；侧栏标题中的关闭按钮执行同一操作 |
| **最大化辅助侧栏**（**Maximize Secondary Side Bar**） | 临时隐藏编辑器、主侧栏和底部面板，把空间留给辅助侧栏 |
| **还原辅助侧栏**（**Restore Secondary Side Bar**） | 恢复最大化前的布局 |

辅助侧栏自己的标题栏也提供最大化和还原按钮。最大化只是临时布局；隐藏后重新显示，原有视图、未发送草稿和普通宽度仍保留。隐藏侧栏不会停止 Agent 任务或终端进程。

这些操作针对编辑器窗口。Agents 窗口的详情区域和 **Code side panel** 使用下文的独立布局入口。

### 改变外观

在设置中搜索 `workbench.layoutStyle`：

- **Modern** 使用分开的浮动区域，是默认样式
- **Flat** 使用贴边衔接的区域

外观变化不替你选择项目或创建任务。更多设置方法见[调整设置](/docs/configure/settings.md)。

## 打开和离开 Agents 窗口

在桌面编辑器标题栏选择 **在 Agents 中打开**（**Open in Agents**），或从命令面板执行 **打开 Agents 窗口**（**Open Agents Window**）。

标题栏入口会尝试把当前对话或未发送草稿带到 Agents 窗口；草稿交接不会自动提交任务。如果目标窗口已有草稿，先检查其中内容，再决定如何继续。

回到编辑器时，在 Agents 窗口选择 **File → Return to Workbench**；账号菜单中也提供返回入口。这是在两个窗口之间导航，不是把对话转换成文件编辑器标签。

## 在 Chat 和 Code 之间切换

Agents 窗口的活动栏提供 **Chat** 和 **Code**：

- **Chat** 便于专注对话和会话列表
- **Code** 在对话旁显示文件编辑、文件列表、更改和底部开发工具

这两个入口共用当前选择的会话、导航历史和未发送草稿。切换布局后可以继续同一任务，不必再次提交消息。**Back** 和 **Forward** 按钮用于返回之前查看的会话；只有存在可返回的记录时才可用。

需要新任务或历史会话时，使用左侧会话列表，具体步骤见[会话与任务](/docs/agents/sessions.md)。

## 打开 ChatGPT 和自动化

Agents 活动栏还提供与 Chat、Code 分开的入口：

| 入口 | 用途 |
| --- | --- |
| **ChatGPT** | 打开 ChatGPT 对话、置顶和项目分组，选择模型、添加附件或进行语音对话 |
| **Automations** | 创建、查看和管理定时任务；是否出现取决于当前连接是否支持自动化 |

ChatGPT 侧栏的 **Pinned**、各项目和 **Recent** 分组管理 ChatGPT 历史，不是本地开发会话列表。搜索只筛选已经加载的历史。具体步骤见[使用 ChatGPT](/docs/agents/chatgpt.md)。

需要重复执行一个任务时，打开[自动化任务](/docs/agents/automations.md)查看时间、执行位置和运行结果。

## 打开协作频道和通话

从活动栏选择 **Collaboration（协作）**，或从命令面板执行 **Open Collaboration**，打开协作侧栏。**Channels（频道）** 用于浏览频道和打开共享笔记，连接与权限说明见[协作频道与共享笔记](/docs/editing/channels.md)。

当前构建和窗口提供通话服务时，协作侧栏中还显示 **Calls（通话）**。命令 **Open Calls** 会打开协作侧栏并聚焦通话视图。已连接的通话中，所有者可以关联正在远程协作的文档，参与者可用独立的文档邀请打开它。具体步骤见[在通话中关联共享文档](/docs/editing/call-documents.md)。

## 查看 Agent 执行记录

在开发会话的操作菜单中选择 **显示 Agent 调试日志**（**Show Agent Debug Logs**），或从命令面板执行 **显示 Agent 调试日志**（**Show Agent Debug Logs**） 打开记录编辑器。**Show Agent Output** 打开该会话的输出摘要，便于从工具、错误和用量记录跳转到详细事件。

当前界面没有独立的 Agent 调试日志活动栏入口或会话侧栏。查看记录不会自动开始新任务；具体检查方法见[Agent 调试日志](/docs/agents/trace.md)。

## 在 Code 中查看文件和更改

进入 **Code** 后，可从 **View** 菜单或命令面板执行下列操作：

| 操作 | 结果 |
| --- | --- |
| **Open Files tab** | 打开文件标签和相关详情，便于浏览任务文件 |
| **Open Changes tab** | 打开当前会话的更改标签；先选择需要检查的会话 |
| **Toggle details** | 显示或隐藏活动内容支持的详情区域 |
| **Hide editor / Show editor** | 隐藏或恢复文件编辑区域 |
| **Toggle Code side panel** | 一起收起或恢复文件编辑与详情区域的组合 |
| **Toggle Code panel** | 显示或隐藏底部工具面板 |

编辑器标题栏的 **Add tab** 菜单也可以打开 **Files** 和 **Changes**。**Toggle details** 是否可用取决于当前活动内容；没有可显示的详情时，按钮可能不可用。

**Code side panel** 是对话旁的文件与详情区域，**Code panel** 是底部工具区域。需要找回终端时选择后者；需要找回文件时选择前者或 **Open Files tab**。

收起编辑器或切换 Chat/Code 会保留已打开标签和未保存内容。真正关闭文件或退出窗口时，仍应处理保存提示。布局操作不会撤销 Agent 已完成的文件修改；检查修改内容请阅读[Git 与更改](/docs/sourcecontrol/overview.md)。

## 调整 Agents 导航和空间

标题栏的 **Show sidebar / Hide sidebar** 控制左侧栏。拖动区域之间的分隔线可以调整宽度；分隔线获得键盘焦点后，也可以用方向键调整大小。

活动栏图标可以拖动排序。使用键盘时，聚焦图标，打开右键菜单，选择 **Move earlier** 或 **Move later**。导航顺序会保留，移动活动栏位置或重新启动后不必重新排列。

Agents 活动栏自己的右键菜单同样提供 **Activity Bar Position** 和侧边状态下的 **Activity Bar Size**。它的布局偏好与编辑器窗口分别保存；不要用编辑器窗口的侧栏设置判断 Agents 当前布局。

## 用键盘在区域之间移动

在普通编辑器窗口中，`F6` 将焦点移到下一个可见区域，`Shift+F6` 反向移动。需要按空间方向定位时，可在命令面板执行 **Navigate to the View on the Left / Right / Above / Below**。

在 Agents 活动栏中，使用 `Tab` 或 `Shift+Tab` 进入导航区域，再用方向键、`Home` 和 `End` 移动，按 `Enter` 或空格打开选中的入口。选择器和弹出菜单打开时，按键优先作用于当前控件。

如已修改默认绑定，按[键盘快捷方式](/docs/configure/keyboard-shortcuts.md)查看当前配置。

## 下一步

- [打开和管理项目](/docs/editing/workspaces.md)
- [开始第一个任务](/docs/getstarted/first-task.md)
- [管理会话与任务](/docs/agents/sessions.md)
- [使用集成终端](/docs/terminal/basics.md)
