# 关于我们编辑式视觉升级发布记录

用户确认方案后完成开发与部署。页面：https://www.haflow.cn/about。

## 设计与实现

首屏使用1120px容器（含两侧24px内边距），桌面可用宽度1072px；左右各512px，间距48px，标题52px。暖白底、深墨正文与品牌蓝统一页面层级。品牌关系改为连续三列，创业故事使用独立白色自述区块，原则和品牌性格采用一致的细线与文字排版。

章节目录在滚动到目录后吸附于主导航下方，桌面top72px、手机top64px；当前章节有蓝色下划线及aria-current。原生锚点保留，无JS时也可切换章节。滚动处理使用requestAnimationFrame合并，只在章节改变时更新状态；手机自动显示当前项时只滚动目录自身横向容器。

浏览器首次验收发现目录和既有Header均未吸附。原因是body的overflow-x:hidden将纵向overflow计算为auto，成为sticky的非滚动祖先，而实际滚动发生于documentElement。仅在body包含本页CSS模块根节点时改用overflow-x:clip。复验桌面navTop72/headerBottom73，手机navTop64/headerBottom65；未修改全局CSS或Header文件。

所有八个章节、使命、声明和联系正文与升级前线上HTML逐字比对一致；metadata、公司数据、其他页面和依赖均未修改。

## 身份与范围

发布文件：
- src/app/about/page.tsx
- src/app/about/AboutChapterNav.tsx
- src/app/about/about.module.css
- scripts/verify-about-design.mjs

基线HEAD：4b82558，含此前已经上线的未提交改动；按源码及构建摘要发布，没有新的发布提交。APFS隔离副本开发，只将本次文件及文档带回共享工作区，其他已有改动保留。

BUILD_ID：S86Tfdo5l7W2GiQPvQHYG

产物清单SHA256：11029a2cda8087e53c431ef9f2e89b81e8848a09eb9264f0619aa8a18f34a866

## 验证

| 检查 | 结果 |
| --- | --- |
| 新导航交付HTML验证，旧版先运行 | FAIL，缺少持久导航标识；实现后PASS |
| 本地与服务器生产构建 | PASS |
| 定向ESLint | PASS |
| 现有脚本测试 | PASS，3/3 |
| 本地/候选/公网SEO | PASS，各8/8，38 URL |
| 八章节、声明及联系文案基线逐字比对 | PASS |
| 线上JS/CSS | PASS，12/12 HTTP 200 |
| 桌面首屏列宽/间距/标题 | 512/512px、48px、52px |
| 点击章节与手动滚动当前项 | PASS，brands点击与story手动滚动 |
| 390px手机目录与标题 | PASS，当前direction项可见、目录top64、标题无遮挡 |
| 页面横向溢出 | 无，390px下scrollWidth384 |
| 公网浏览器错误 | 0条，发布验收时读取 |
| 线上源码与产物清单一致 | PASS |
| PM2状态 | online，已save |
| 发布观察期间错误日志增长 | 0字节 |
| 数据库/API/权限 | N/A，无相关改动 |
| SonarQube | N/A，无已配置门禁 |

[线上首屏截图](2026-10-13-about-design-desktop.png) · [手机吸附目录截图](2026-10-13-about-design-mobile.png)

## 回滚

服务器隔离构建一次，在3113候选验证，通过后激活同一份产物，激活时没有重建。发布目录：/opt/haflow-releases/about-design-20261013，保留previous.next、previous-source.tar.gz及新增文件清单。

```bash
ssh PLM 'bash /opt/haflow-releases/about-design-20261013/rollback.sh'
```

回滚恢复前一版正文修订版本并移除本次新增客户端目录、CSS模块和验证脚本。观察结论仅覆盖发布检查窗口。
