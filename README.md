# Chameleon Ultra 本地管理台 (Web Lab)

> **版本：v1.0.0** · 目标固件：`v2.2.0-DAHAOREN`（含 Auto-Poll 扩展）· 首次稳定发布

基于开源 SDK [`chameleon-ultra.js`](https://github.com/taichunmin/chameleon-ultra.js) 构建的**完全本地、离线**网页管理工具，用于对你自己的固件（`v2.2.0-DAHAOREN`）进行在线设置与调试。

无需联网、无需 CDN、无需 npm 安装 —— 所有依赖已打包进 `vendor/chameleon-ultra.mjs`。

## 功能（单页应用，连接一次跨页持久）

本工具是**单页应用（SPA）**：所有功能在同一文档内通过顶部标签页切换，**连接设备一次后，在「设备设置 / 卡槽 / MIFARE 1K / Auto-Poll」之间切换不会断开**，无需每页重连。（浏览器限制：独立的多 HTML 页面之间无法共享串口/蓝牙连接，因此用单页结构解决。）

| 视图（标签页） | 说明 |
|------|------|
| 首页 | 连接入口 + 功能概览 |
| 设备设置 | 设备模式、动画、BLE 配对密钥、按键动作（含长按「自动轮询」）、电池、保存/重置 |
| 卡槽管理 | 8 卡槽激活/启用（HF/LF）、昵称、保存设置 |
| MIFARE 1K | 按块读写卡槽内**模拟**的 MIFARE 1K 数据（64 块 × 16 字节），支持导入/导出 `.dump`、批量填默认密钥到扇区尾块 |
| Auto-Poll | **自定义固件扩展**：被动 RF 唤醒自动轮询/选槽开关 + 轮询间隔 |

## 运行

需要 **Chrome / Edge**，支持 **Web Serial（USB）** 与 **Web Bluetooth（BLE）** 两种连接。

- **USB 串口**：用数据线连接 Chameleon Ultra（VID 0x6868 / PID 0x8686）。
- **蓝牙 BLE**：在系统蓝牙中靠近/配对设备，浏览器会扫描并列出名为 `ChameleonUltra` 的设备（与官方 lab 一致）。注意 Web Bluetooth 需要安全上下文（localhost 或 https），且当前仅 Chrome / Edge 支持。

```bash
cd chameleon-web
./serve.sh            # 默认端口 8000
# 或指定端口： ./serve.sh 9000
```

浏览器打开 `http://localhost:8000/`，顶栏下拉框选择连接方式（USB 串口 / 蓝牙 BLE），再点「连接设备」。
- USB：在串口列表中选择 Chameleon Ultra。
- 蓝牙：在设备列表中选择 `ChameleonUltra`（若浏览器不支持蓝牙，下拉框会自动禁用该项并回退到 USB）。

> 直接双击 `index.html`（file://）也能打开，但部分浏览器对 file:// 下的 ES module / Web Serial 有限制，**建议用上面的本地服务器方式**。

## 自定义命令说明

以下命令为本仓库固件扩展，官方固件不包含：

- `DATA_CMD_GET_AUTO_POLL_CONFIG = 1041` / `SET_AUTO_POLL_CONFIG = 1042`
  - GET 响应：`[enable:1][interval_ms_be16:2][last_auth_slot:1]`
  - SET 请求：`[enable:1][interval_ms_be16:2]`（enable 仅低位 2 比特有效）
  - enable 比特：`AUTO_POLL_SMART_SELECT = 1<<0`，`AUTO_POLL_TIMER_ROTATE = 1<<1`
- `DATA_CMD_MF1_READ_EMU_BLOCK_DATA = 4008` / `MF1_WRITE_EMU_BLOCK_DATA = 4000`
  - 读写的是**激活卡槽的模拟 MF1 存储区**（非真实卡），每次最多 32 块。

## 重新构建 SDK bundle（可选）

如需更新 SDK，参见工作区根目录的构建脚本（基于 `taichunmin/chameleon-ultra.js`，已剥离 `serialport`/`jszip` 原生依赖，仅保留 `web-serial-polyfill`/`webbluetooth` 运行时，并用 tsup `noExternal` 全量打包进单文件 ESM）。

> **已修复的传输层坑**：SDK 原 `sendBuffer` 每次 `getWriter()→write→releaseLock`，并发命令会让第二个 `getWriter()` 撞上仍被锁定的 `WritableStream`，抛 `Cannot create writer when WritableStream is locked`。已在打包时对 `#sendBuffer` 加**写串行化队列**（`#writeChain`），从根本上杜绝该错误（USB 与蓝牙均受益）。
