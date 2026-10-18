---
ContentId: 9bf1c576-5af4-43c5-a84b-5a8272c69a2c
DateApproved: 10/18/2026
SourceRevision: 0ef650faaf2e7965821cd6278399991185e94a75
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

如果需要自行构建 Ash，先按源码仓库的构建指南准备环境，再选择桌面或终端入口。本文提供入口导航；具体工具版本和平台依赖以你检出的源码版本为准。

## 获取源码

```sh
git clone https://github.com/chogng/ash.git
cd ash
```

阅读该版本的 [构建指南](https://github.com/chogng/ash/blob/main/docs/build.md)，完成工具链与依赖准备。不要把文档仓库的 `npm run serve` 当作 Ash 产品启动命令。

## 准备与源码匹配的环境

核对源码中的 `.nvmrc`、`package.json`、`rust-toolchain.toml` 和构建指南。Windows、macOS、Linux 所需的原生编译工具不同，不能只安装 Node.js 就认为环境已齐全。

Ash 最低要求 **Git 2.40.0**。在运行 Ash 的环境中执行 `git --version` 检查；Desktop、App Server、TUI 和 Agent 使用同一要求。版本过旧时，Git 仓库操作会被阻止。升级 Git 后重启 Ash；配置了 `git.path` 时，也要更新该路径。

首次构建可能需要下载依赖并编译 Rust 后端。出现错误时，优先检查最先失败的步骤，保留完整错误信息。

运行 `just check-build-tools` 可以检查 Rust 和当前宿主平台的符号工具，列出工具路径及缺失或不可执行的项目。`just install` 和全量构建工具测试会先执行同一检查。Windows 可以使用 Visual Studio 的 C++ Clang tools；自定义 LLVM 安装可通过 `ASH_LLVM_BIN` 指定 `bin` 目录。其他平台的工具要求见源码[构建指南的初始化部分](https://github.com/chogng/ash/blob/main/docs/build.md#初始化)。

## 启动桌面或终端

完成环境准备后，在源码根目录运行：

```sh
just ash
```

这会启动 Ash 桌面应用。要使用 Ash Code 终端界面，运行：

```sh
just ash-code
```

以上是当前源码 README 的入口。使用旧分支时，请阅读该分支自己的说明，不要混用历史命令。

## 浏览器开发入口

需要浏览器开发与测试时，阅读 [前端指南](https://github.com/chogng/ash/blob/main/docs/frontend.md)。区分仅界面模式和连接后端的模式；能打开页面不等于能够执行 Agent 任务。

浏览器入口是本地开发环境，当前 README 不提供托管 Web 服务。

## 开始使用

启动应用后还需要配置模型供应商和有效凭据。接下来阅读[开始第一个任务](/docs/getstarted/first-task.md)。
