---
ContentId: 9bf1c576-5af4-43c5-a84b-5a8272c69a2c
DateApproved: 9/21/2026
MetaDescription: 准备仓库指定的 Rust、Node.js 和 pnpm 环境，从源码启动 Ash 桌面工作台、终端界面或浏览器开发界面。
MetaSocialImage: ../../og.png
Keywords:
  - Ash
  - 源码
  - 安装
  - pnpm
  - Rust
---
# 从源码运行 Ash

本页面向需要本地构建或调试 Ash 的开发者。所有命令都在 Ash 源码仓库根目录执行，文档仓库的 `npm run serve` 只启动文档站点。

## 准备开发工具

| 工具 | 版本和用途 |
| --- | --- |
| Git | 获取源码并管理工作区 |
| Rust 和 Cargo | 通过 rustup 使用 `rust-toolchain.toml` 指定的工具链 |
| Just | 运行仓库统一的启动和构建命令 |
| uv | 按 `scripts/uv.lock` 准备 Python 工具环境，Python 要求见 `scripts/pyproject.toml` |
| Node.js | 桌面工作台和浏览器开发使用 `.nvmrc` 指定的版本 |
| pnpm | 使用根 `package.json` 中 `packageManager` 指定的精确版本 |

当前源码固定 Node.js 24.21.0、pnpm 12.4.2 和 Rust 1.98.0。切换源码版本后，以该版本的仓库文件为准。Protocol Buffers 编译器由 Cargo 构建依赖提供，无需单独安装系统 `protoc`。

还需要目标平台的 C/C++ 编译工具。Windows 使用 Visual Studio Build Tools 的 **使用 C++ 的桌面开发**、MSVC v143、Windows SDK、English 语言包，以及 CMake 和 LLVM。构建时打开目标架构对应的 **Visual Studio Developer PowerShell**，并让 LLVM 的 `bin` 目录位于 `PATH` 中。

macOS 构建包含媒体服务的完整开发包时，还需要 Go 1.26 和系统 C/C++ 工具链。Linux 的桌面构建需要图形、输入和系统开发库，音频设备助手还需要 ALSA 开发文件。完整平台要求见源码仓库的 [构建指南](https://github.com/chogng/ash/blob/main/docs/build.md)。

## 获取源码并初始化

```bash
git clone https://github.com/chogng/ash.git
cd ash
```

切换到 `.nvmrc` 指定的 Node.js 版本，然后安装当前仓库指定的 pnpm：

```bash
npm install -g "$(node -p 'require("./package.json").packageManager')"
pnpm install
just install
```

`just install` 获取 Rust 依赖并通过 uv 准备 Python 工具环境。Windows 上，如果它安装了缺失的 PowerShell 7，重启终端和编辑器后再执行启动命令。

首次构建需要下载依赖并编译程序。安装检查会拒绝不匹配的 Node.js 或 pnpm 版本。

## 启动产品

按需要选择一个入口：

| 使用方式 | 命令 |
| --- | --- |
| Ash Code 终端界面 | `just ash` |
| Ash 桌面工作台 | `just ash-desktop` |
| Rust 桌面应用 | `just app` |

在 VS Code 中也可以选择 **Run Ash Desktop (TypeScript)** 并按 `F5`，它使用同一个桌面启动入口。

启动成功后，配置模型供应商、选择模型，再发送任务。打开窗口本身不会完成模型登录。

## 运行浏览器开发界面

| 模式 | 命令 | 默认地址 | 用途 |
| --- | --- | --- | --- |
| 界面开发 | `pnpm dev:web` | `http://127.0.0.1:5173/` | 调整界面，不连接 Rust 后端 |
| 完整本地开发 | `pnpm dev:web:full` | `http://127.0.0.1:5174/` | 连接 Rust 后端，验证实际业务流程 |

要验证消息提交、工具调用或 Advisor，使用完整本地开发模式并配置可用模型。这两个入口用于本地开发和测试。

## 构建产物

```bash
just build
```

该命令构建桌面工作台和 Rust 工作区。`pnpm build` 只构建 Electron 与 Browser 工作区。可重新生成的本地产物集中放在 `.build/`。

## 排查启动问题

| 现象 | 检查方式 |
| --- | --- |
| Node.js 或 pnpm 版本不匹配 | 对照 `.nvmrc` 和 `package.json`，切换版本后重新安装依赖 |
| 找不到 `just` 或 `uv` | 安装对应工具，并确认启动终端的 `PATH` 包含它们 |
| Windows 缺少编译器、SDK 或 libclang | 使用 Developer PowerShell，检查 C++ 工作负载、SDK 与 LLVM 路径 |
| 浏览器界面可以打开但不能执行任务 | 确认使用 `dev:web:full`，并检查后端输出和模型配置 |
| 模型请求失败 | 检查所选供应商的凭据、端点和连接，再重试任务 |

## 下一步

* [开始第一个 Ash 任务](/docs/getstarted/overview.md)
* [了解 Agent 的工作过程](/docs/agents/overview.md)
