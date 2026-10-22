---
ContentId: 900938ac-f311-461e-8d2a-4f989712a0a5
DateApproved: 10/22/2026
SourceRevision: 2bfe0bb6f96030a02d4701ca6211e9c5f0f13720
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
| 工具面板 | 使用终端等工具，默认位于底部 |
| 状态栏 | 查看当前状态，包括目录权限提示 |

先用[打开文件夹](/docs/editing/workspaces.md)载入项目。点击 Explorer 中的文件，在编辑器中查看；需要并排比较时，右键文件标签，选择 **向右拆分**或**向下拆分**。这些操作增加编辑器分组，文件仍保存在原来的位置。

寻找已经打开的文件时，在 **Go** 菜单中使用 **Show All Editors**。误关标签后，可从 **File** 菜单执行 **Reopen Closed Editor**。更多文件与代码操作见[编辑文件与导航代码](/docs/editing/editing-and-navigation.md)。

## 用命令面板找到操作

按 `Ctrl+Shift+P`（macOS：`Cmd+Shift+P`）或 `F1` 打开命令面板，输入名称筛选命令，按 `Enter` 执行。以 `>` 开头的输入用于查找命令。删除这个前缀可以[按文件名查找文件](/docs/editing/editing-and-navigation.md#按文件名找到项目文件)。

搜索框有内容时，**清空输入** 按钮会清除全部文字，并把焦点留在输入框，方便继续输入。按 `Esc` 关闭面板并返回原来的界面。

命令行右侧的齿轮 **配置快捷键** 会打开快捷键弹窗，并直接筛选该命令，不会执行命令。最近使用的命令还提供 **从命令历史记录中移除**，只移除历史记录。具体修改方式见[设置键盘快捷方式](/docs/configure/keyboard-shortcuts.md)。

## 管理扩展

从命令面板运行 **打开扩展**（**Open Extensions**）。编辑器和 Agents 窗口使用同一套分类：

* **技能**（**Skills**）：Agent 完成任务的工作方法。
* **插件**（**Plugins**）：编辑器、语言支持、调试或其他功能包。
* **连接**（**Connections**）：外部账号和 MCP 工具服务器的连接。
* **推荐**（**Recommended**）：当前工作区推荐的扩展，不会自动安装。

顶部统一搜索框输入普通关键词时搜索 Marketplace。只查现有内容时，输入 `@installed` 加关键词，或用 **筛选扩展** 选择技能、插件、连接、内置插件或推荐。选择 **清除搜索** 或在搜索框按 `Esc`，返回分类列表。

**刷新扩展** 重新读取各分类。标题栏的更多操作提供扩展源管理，以及从工作区或 Git 安装的入口。展开窗格后，添加等操作默认在鼠标悬停或键盘聚焦时显示；选择条目后在编辑器中查看详情。

安装、启用、执行授权和账号连接是不同操作。Skill 的启停只影响这一项技能；断开连接不卸载其功能包。具体步骤见[管理技能](/docs/customize/skills.md)和[连接 MCP 服务器](/docs/customize/mcp-servers.md)。

浏览器工作台可以查看内置后端 Provider 的状态，但不能启用或停用它们；管理这类功能需要具备权限的桌面或远程宿主。语言包仍通过显示语言设置管理。使用为 Ash 准备的扩展包，不要沿用 VSIX 或 Open VSX 的安装步骤。

## 查看和管理通知

从命令面板运行 **Show Notifications** 打开通知中心；**Hide Notifications** 只隐藏中心。普通弹出通知自动收起后，仍可在中心查看。**Clear All** 清除可关闭的通知，但保留正在显示进度的项目，不会取消对应任务。

在中心标题中选择 **Configure Do Not Disturb...**，启用全局免打扰或调整已知来源；也可运行 **Toggle Do Not Disturb Mode By Source...**。免打扰减少普通提醒弹出，但错误和紧急通知仍可能显示，通知记录不会因此全部删除。

通过 **Configure Notifications Position...** 选择右下、左下或右上位置；设置 `workbench.notifications.position` 默认 `bottom-right`。

## 调整视图标题操作

想让展开视图的标题按钮一直可见时，在设置中开启 `workbench.view.alwaysShowHeaderActions`。默认关闭，普通视图在悬停或键盘聚焦时显示操作。折叠普通视图仍会隐藏标题操作；部分视图有自己的常显规则，例如展开的源代码管理 Graph。此设置即时生效，不会改变视图内容或执行按钮对应的动作。

## 调整编辑器布局

### 移动活动栏和主侧栏

右键活动栏，使用 **Activity Bar Position** 选择侧边、顶部、底部或隐藏。活动栏位于侧边时，**Activity Bar Size → Compact** 可以缩小图标区域。

同一菜单提供移动主侧栏到左侧或右侧的操作。也可以在设置中搜索：

- `workbench.activityBar.location`：活动栏位置
- `workbench.activityBar.compact`：紧凑活动栏
- `workbench.sideBar.location`：主侧栏在左侧还是右侧

活动栏位于顶部或底部时，可以开启默认关闭的 `workbench.activityBar.autoHide`。主侧栏和辅助侧栏会分别在只有一组或没有可用功能视图时隐藏切换栏；出现多组时重新显示。它按功能视图组计数，不按展开的子窗格数计数，也不是鼠标移开后自动收起整个侧栏。此设置不用于 Agents 窗口的独立导航。

隐藏活动栏后，可从命令面板执行 **Move Activity Bar to Side** 重新显示。

需要移动某个功能视图时，右键它的活动栏图标，选择 **移到**（**Move To**），再选择 **主侧栏**（**Primary Side Bar**）、**辅助侧栏**（**Secondary Side Bar**）或 **面板**（**Panel**）。视图标题的右键菜单也提供此入口。移动的是这组功能视图，不是整个活动栏；位置会保留。

图标右键菜单中的 **配置快捷键**（**Configure Keybinding**）可以直接筛选该入口的快捷键。**隐藏主侧栏**（**Hide Primary Side Bar**）只收起主侧栏，不会关闭其中的功能。以上操作针对普通编辑器窗口，Agents 导航使用下文的独立布局。

### 显示或放大底部工具

通过标题栏的面板按钮，或 **View** 菜单中的面板显隐操作，展开或收起底部面板。命令面板中的名称为 **Toggle Panel Visibility**；已展开时也提供 **Hide Panel**。

需要更多空间阅读终端输出时，使用 **Maximize Panel**；返回编辑器时使用 **Restore Editor Area**。隐藏面板只改变显示状态，需要结束终端进程时应使用终端自身的关闭操作。

面板也可以放在左侧、右侧或顶部。在面板标题的右键菜单中选择 **面板位置**（**Panel Position**），或从命令面板执行 **Move Panel Left**、**Move Panel Right**、**Move Panel to Top**、**Move Panel to Bottom**。当前位置会保留。新工作区的默认位置由 [`workbench.panel.defaultLocation`](/docs/configure/settings.md#选择默认面板位置) 决定。

### 显示或放大辅助侧栏

编辑器窗口的标题栏和 **View** 菜单提供辅助侧栏显隐操作。也可以从命令面板按名称查找：

| 操作 | 结果 |
| --- | --- |
| **显示辅助侧栏**（**Show Secondary Side Bar**） | 恢复辅助侧栏 |
| **隐藏辅助侧栏**（**Hide Secondary Side Bar**） | 收起辅助侧栏；侧栏标题中的关闭按钮执行同一操作 |
| **最大化辅助侧栏**（**Maximize Secondary Side Bar**） | 临时隐藏编辑器、主侧栏和底部面板，把空间留给辅助侧栏 |
| **还原辅助侧栏**（**Restore Secondary Side Bar**） | 恢复最大化前的布局 |

辅助侧栏可以容纳多组功能视图，使用它自己的切换栏选择当前组。`workbench.activityBar.location` 为顶部或底部时，切换栏显示在对应位置；其他可见位置在标题栏显示切换入口。右键入口，或聚焦后按 `Shift+F10`，可使用 **移到** 更改该组视图的位置。

辅助侧栏自己的标题栏也提供最大化和还原按钮。最大化只是临时布局；隐藏后重新显示，原有视图、未发送草稿和普通宽度仍保留。隐藏侧栏不会停止 Agent 任务或终端进程。

这些操作针对编辑器窗口。Agents 窗口的详情区域和 **Code side panel** 使用下文的独立布局入口。

### 把聊天移到编辑器区域

在普通编辑器窗口的聊天更多操作中，或从命令面板执行 **Move Chat to Editor Area**，把当前 Chat 移到编辑器标签中。可以将文件放在旁边的编辑器组，一边查看代码一边继续对话。

这仍是窗口里同一个聊天输入框，保留当前历史、未发送文字和附件。**Move Chat to Side Bar** 或关闭 Chat 标签会让它回到侧栏，不会发送消息或停止任务。Chat 同时只占用一个编辑器组，拆分或复制不会创建第二份独立对话。

重新打开窗口时会尝试恢复选中的对话和草稿；发送前检查[草稿与模式](/docs/agents/sessions.md#继续未发送的草稿)。这项操作不同于打开独立的 Agents 窗口。

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

* **Chat** 便于专注对话和会话列表。
* **Code** 在对话旁显示文件编辑、文件列表、更改和开发工具面板。

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
| **Toggle Code panel** | 显示或隐藏工具面板 |

编辑器标题栏的 **Add tab** 菜单也可以打开 **Files** 和 **Changes**。**Toggle details** 是否可用取决于当前活动内容；没有可显示的详情时，按钮可能不可用。

**Code side panel** 是对话旁的文件与详情区域，**Code panel** 是默认位于底部的工具区域。需要找回终端时选择后者；需要找回文件时选择前者或 **Open Files tab**。Code 的工具面板也支持上面的面板位置命令，位置与尺寸单独保存在 Agents 窗口中。

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

