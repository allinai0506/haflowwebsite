# 原则 02 文案修订与长期方向显示核验

## 改动与判断

仅修改 src/data/company.ts 中原则 02 的正文，采用用户提供的全文；标题“规则写不死的地方，才是 AI 的着力点”保留。与上一轮部署源码比对，其他字段完全一致。

桌面 1920px 与手机 390px 上，长期方向的完整标题为“从管理工作的流转，走向管理工作的完成。”，均分为两行完整显示。文字宽高未超出自身容器，页面无横向溢出；截图确认右侧正文正常换行，无裁切。因此不修改该板块的标题或布局。

创业故事位于独立的 story 板块，个人学习 AI Coding、十多年行业经历及 2026 年创办公司的过程仅出现在该板块。direction 板块讨论企业软件未来形态，没有这些个人经历，内容归属清晰，无须迁移。

[桌面显示证据](2026-10-13-direction-desktop.png) · [手机显示证据](2026-10-13-direction-mobile.png)

## 发布身份

生产 BUILD_ID：HbR6W_7Qnjbx0iTIRR8_Z

构建文件清单 SHA256：3d9a83ef98c380a374a8cd0ecad1e0c4698e5aa56ecf0be01088f9bfe21a00b5

源码 company.ts SHA256：d105054c2984ef86ec96f2d1b3cbf614502c1943b453893fc3136ae453bcb1d2

基线 HEAD 4b82558，包含此前已上线的未提交修改；本次以源码与构建摘要发布，未创建新的发布提交。使用既有服务器隔离构建、候选端口验证、同一产物激活流程。

## 验证与回滚

- 定向 ESLint、生产构建 PASS。
- 现有脚本测试 3/3 PASS。
- 候选与公网 SEO 各 8/8 PASS，覆盖 38 URL。
- 新正文、旧句不存在、完整标题、故事与长期方向分离检查 PASS。
- JS/CSS 10/10 HTTP 200。
- 公网浏览器核验新原则正文及最终长期方向显示 PASS。
- 线上源码及构建清单一致，PM2 online，已 save；发布观察窗口新增错误日志 0 字节。
- 数据库/API/权限检查 N/A，无相关变更；无已配置 SonarQube 门禁。

旧版源码与构建保留于 /opt/haflow-releases/about-principle-20261013。

```bash
ssh PLM 'bash /opt/haflow-releases/about-principle-20261013/rollback.sh'
```
