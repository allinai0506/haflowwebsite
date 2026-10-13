# HAFlow 实验室生产发布记录

## 发布范围

新增 /labs、/labs/enterprise-runtime 与完整 HTML 原型；导航、页脚和 sitemap 接入。浅蓝白视觉，提供全屏与独立打开，不提供 HTML 下载入口。

PR：https://github.com/allinai0506/haflowwebsite/pull/1（待合并）
功能提交：b5dd2a1076a2ae400dcf00b1a38eb00a4ece1601。

生产保留已上线但未提交的品牌 SEO 基线，仅覆盖本轮页面、组件、原型及导航/页脚/sitemap。生产属于线上源码基线加本轮变更，不声称整站对应干净 Git SHA。

## 产物与回滚

发布目录：/opt/haflow-releases/labs-20261013。
BUILD_ID：jklIc_xrsWnPZGlGZL60n。
构建清单 SHA256：6cfabe9f809f1a1c113b45881f57439068344f5409db5d484fc47730ec320a62。
服务器隔离构建一次，预发布 3113 验证后切换同一份 .next，激活前后构建清单校验通过。

回滚：`ssh PLM 'bash /opt/haflow-releases/labs-20261013/rollback.sh'`。
保存 previous.next 与 previous-source.tar.gz。无数据库迁移。

## 验证

- 独立 PR 源码生产构建、ESLint：PASS。
- 服务器生产候选构建、ESLint：PASS。
- 百度脚本测试：PASS，3/3。
- 预发布与公网：首页、about、haflow、labs、实验详情、原型 HTML、sitemap 与引用资源：PASS。
- 生产浏览器：目标创建、报价预览、进度推进、例外理由进入台账、七个界面、全屏切换、390px 无横向溢出、浅色栏目入口：PASS。
- 发布观察窗口错误日志：76918 字节前后不变，新增 0 字节。
- API/数据库集成、SonarQube：N/A，本轮无相关改动，仓库无 SonarQube 门禁。
- 截图视觉验收：未完成，截图工具超时；浏览器 DOM 与交互验证通过。

打包初次带入 macOS 元数据导致 ESLint 失败，已关闭 xattr 打包并清除候选 ._* 文件，重新构建验证通过。资源检查初次未解码 HTML 的 &amp; 导致图片查询误报 400，修正检查脚本后预发布及公网均通过。

技术验收仅覆盖本次发布窗口；原型使用模拟数据，未连接真实 AI 或企业系统。
