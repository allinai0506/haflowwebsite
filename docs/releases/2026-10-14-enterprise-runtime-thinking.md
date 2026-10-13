# 企业运行空间完整设计思考发布记录

2026-10-14，将用户提供的《未来20年，企业还需要审批流吗？OA会不会彻底消失？》完整呈现于 https://www.haflow.cn/labs/enterprise-runtime 。

## 内容与范围

保留九章论述、例子、三张对照表及风险/授权/责任边界。清理搜索结果卡片残留与三处对话称谓，未将正文缩写为摘要。审批模式对比、目标动态执行、2026—2046 推演与五个企业运行对象改为四组浅色图示。来源为核验过的 SAP、Microsoft、财政部、OPA、OMG 与 Amazon 官方文档。

新增完整稿件数据、服务端阅读组件、目录锚点、跳转原型入口和正文核对脚本。更新实验室首页导语、详情 metadata、两页 sitemap 日期及 SEO 日期验证。

原型 HTML 完全未修改，不增加 HTML 下载入口。页面正文可服务端读取，不依赖展开或客户端脚本。

## 提交与发布身份

PR：https://github.com/allinai0506/haflowwebsite/pull/2（待合并）。
正文功能提交：6bbaa26。
分支另包含 f3f0b03：此前已经提交但未进入 PR #1 合并版本的品牌 SEO 基线。

生产沿用既有线上源码基线，仅覆盖 changed-files.txt 中七个文件，不宣称整站构建对应干净 Git SHA。

发布目录：/opt/haflow-releases/labs-thinking-20261014。
BUILD_ID：jPio0pFbuSM1RSGwUe5ni。
构建清单 SHA256：ee6d5e87b7c3a3e8bb2f2221e238b113706442976785dcb66686cb85de8d9247。
候选目录隔离构建一次，预发布 3113 与生产使用同一 .next，激活前后清单校验通过。

## 验证

- 本地与服务器构建、变更文件 ESLint：PASS。
- 正文核对：PASS，291 个稿件/图示片段、九章锚点、三表、四图；原型与源文件逐字一致。本地、服务器候选、公网均通过。
- 品牌 SEO：PASS，8/8，覆盖 40 页；本地、候选及公网均通过。
- 百度脚本测试：PASS，3/3。
- 浏览器：桌面/390px 文本与布局核对，页面无横向溢出；表格各自可横向滚动。
- 目录：程序化触发原生链接，并在测试中临时关闭平滑滚动后确认章节/原型 top=96，避免 sticky 导航遮挡。自动化原生点击出现 ol 指针拦截；该项未计为真实指针点击通过。
- 线上原型：目标创建、报价预览、进度推进、授权例外台账、全屏：PASS。
- 截图视觉验收：未完成，Page.captureScreenshot 超时；浏览器 DOM 与交互核验通过。
- 发布窗口错误日志：78547 字节前后不变，新增 0 字节。
- API/数据库、SonarQube：N/A，无相关修改，无配置的 SonarQube 门禁。

首次本地检查命中仍在运行的旧构建服务，重启到本轮构建后全部复验通过。上线前公网稿件检查仍为旧版，切换后复验通过。

## 回滚

`ssh PLM 'bash /opt/haflow-releases/labs-thinking-20261014/rollback.sh'`

保留 previous.next、previous-source.tar.gz 与 new-files.json。回滚恢复旧构建和已有文件，移除本轮新增文件。无数据库迁移。

技术验收覆盖本次发布窗口。文章中未来年份为作者推演，交互原型为模拟数据，未连接真实 AI 或企业系统。

## 同日调整：原型直接展示

按用户反馈，将原型移至简短介绍之后、完整思考之前，打开页面直接展示 iframe。长文结尾入口改为返回上方原型。正文与原型内容不变。

功能提交：c20e1f7；同一 PR #2。
发布目录：/opt/haflow-releases/labs-inline-20261014。
BUILD_ID：ZCDTFuWpof-sTWFiooKG8。
构建清单 SHA256：fe69779deeefa42fc9973b5718a9b2f52555d47e15f612ef41f259928c824001。
本地及服务器构建、ESLint、百度测试 3/3 通过。全文检查在候选与公网通过，新增校验 iframe 位于思考正文之前。桌面浏览器初次打开 iframe top=595px、正文 top=1356px，iframe display=block，无需点击入口。
发布窗口错误日志 78547 字节前后不变；激活前后同一构建清单校验通过。
回滚：`ssh PLM 'bash /opt/haflow-releases/labs-inline-20261014/rollback.sh'`。
