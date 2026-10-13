# 关于共事智能品牌介绍发布记录

2026-10-13，用户确认文案方案并授权部署。页面 https://www.haflow.cn/about 已更新。

## 范围与定位

- 发布源码：src/app/about/page.tsx、src/app/sitemap.ts（仅 /about 日期）。
- 围绕真实任务、人机共事、明确责任、可验证成果组织七部分公司介绍。
- 保持清醒、务实、克制、坦诚、有长期判断的语言；区分公司、HAFlow 与 FDE，区分愿景与当前能力、公司项目与产品案例。
- 保留现有蓝白视觉，增加页内导航；无数据库、API、权限或依赖变更。
- 在 APFS 隔离副本中开发。现有工作区与线上相应源码摘要一致；只将本次两个源码文件及文档带回，保留其他已有改动。

## 发布身份

基线 Git HEAD：4b82558；基线含此前已上线的未提交品牌 SEO 改动。本次按源码摘要发布，不声称存在新的发布提交。

生产 BUILD_ID：e1u3YN9Sr0Z21Wl5mDI9_

构建文件清单 SHA256：0a908b4d47267678cbbadb17c59f59adbab88da1f88ea2a0d2faead0f793faa4

服务器目录：/opt/haflow-releases/about-brand-20261013

## 验证

| 检查 | 结果 |
| --- | --- |
| 本地与服务器生产构建 | PASS |
| 两个修改文件 ESLint | PASS，零告警 |
| 现有百度脚本测试 | PASS，3/3 |
| 本地、服务器预发布、公网 SEO | PASS，各 8/8，覆盖 38 URL |
| 新版正文、唯一 H1、站点地图日期 | PASS |
| 新版 JS/CSS | PASS，10/10 HTTP 200 |
| 桌面与手机阅读 | PASS，无横向溢出 |
| 页内目录、手机菜单、联系入口 | PASS |
| 上线源码与构建清单核验 | PASS |
| PM2 | online，已 save |
| 发布观察窗口新增错误日志 | 0 字节 |
| API/数据库集成测试 | N/A，无相关改动 |
| SonarQube | N/A，本仓库无已配置发布门禁 |

## 发布与回滚

复用前次 release 脚本方式：服务器隔离副本构建一次，在 127.0.0.1:3113 验证；校验产物后停止候选进程，将同一份 .next 与两个源码文件切入生产并重启 haflow-website。预发布与生产使用同一份构建产物，未在激活时重建。

旧版构建与源码保留于该发布目录的 previous.next 和 previous-source.tar.gz。回滚命令：

```bash
ssh PLM 'bash /opt/haflow-releases/about-brand-20261013/rollback.sh'
```

截图：[生产首屏](2026-10-13-about-production.png)。观察结论限定于本次发布检查窗口，不代表长期业务运行监控。
