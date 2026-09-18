export const SCORE_ALIGN_BODY_HTML = `


  <!-- 1. 顶部导航栏 -->
  <header class="top-navbar">
    <div class="nav-left">
      <span class="logo-badge">XIYU BID · AI 评分解析 V4</span>
      <span class="nav-title">中煤能源集团2026年办公物资框架协议招标项目</span>
      <span class="project-tag">立项编号: PRJ-2026-0882</span>
    </div>

    <div class="nav-center">
      <div class="phase-segmented">
        <button class="segmented-btn active" id="btnPhase1" onclick="switchPhase('est')">
          阶段 1：预计得分对标 (知识库)
        </button>
        <button class="segmented-btn" id="btnPhase2" onclick="switchPhase('actual')">
          阶段 2：标书真实打分 (评审专家)
        </button>
      </div>
    </div>

    <div class="nav-right">
      <button class="btn-outline" onclick="locateClause('sec_price')">
        🔍 价格评分计算表
      </button>
      <button class="btn-outline" onclick="toggleSplitLayout()">
        ⇄ 切换分屏比例
      </button>
      <button class="btn-primary" onclick="alert('重新解析任务已下发，后台将通过 Sidecar PDF 管道重新保真抽取！')">
        ⚡ 重新保真解析
      </button>
    </div>
  </header>

  <!-- 2. 主体双屏工作区 -->
  <div class="workbench-container" id="workbench">

    <!-- 左屏：标书原文查看器 (Document Viewer) -->
    <div class="left-pane" id="leftPane">
      <div class="doc-toolbar">
        <div class="doc-title-info">
          <span>📄 中煤能源集团招标文件-第三册评分办法.pdf</span>
          <span class="doc-format-pill">PDF 矢量保真</span>
        </div>
        <div class="doc-tools">
          <div class="page-stepper">
            <span>页码:</span>
            <input type="text" class="page-input" value="47" readonly id="pageIndicator">
            <span>/ 62</span>
          </div>
          <button class="doc-tool-btn" title="放大" onclick="zoomDoc(1.05)">＋</button>
          <button class="doc-tool-btn" title="缩小" onclick="zoomDoc(0.95)">－</button>
          <button class="doc-tool-btn" title="搜索条款">🔍</button>
        </div>
      </div>

      <!-- 标书文档连续滚动视口 -->
      <div class="doc-scroll-viewport" id="docViewport">

        <!-- 第 46 页：总则与评标办法说明 -->
        <div class="doc-page" id="page_46">
          <div class="doc-page-header">
            <span>中煤能源集团2026年办公物资采购项目招标文件</span>
            <span>第三章 评标办法（综合评分法）</span>
          </div>
          <div class="doc-h1">第三章 评标办法前附表</div>
          <div class="doc-h2">1. 评标方法</div>
          <p class="doc-p">本次评标采用综合评估法。评标委员会对满足招标文件实质性要求的投标文件，按照本章规定的评分标准进行打分，并按综合得分由高到低顺序推荐中标候选人。</p>
          <div class="doc-h2">2. 分值构成与权重分配（总分 100 分）</div>
          <p class="doc-p">（1）商务部分：35 分（含资质能力、业绩经验、自营电商平台服务能力）；</p>
          <p class="doc-p">（2）技术部分：25 分（含品控方案、交付与售后保障、应急保供方案）；</p>
          <p class="doc-p">（3）价格部分：40 分（按基准价与评标报价差值公式阶梯计分）。</p>
          <div class="doc-page-footer">第 46 页 / 共 62 页</div>
        </div>

        <!-- 第 47 页：商务评分明细表 -->
        <div class="doc-page" id="page_47">
          <div class="doc-page-header">
            <span>第三章 评标办法 · 商务评分标准明细</span>
            <span>第 47 页</span>
          </div>
          <div class="doc-h2">3. 商务评分标准明细表（满分 35 分）</div>

          <table class="doc-table">
            <thead>
              <tr>
                <th style="width: 55px">序号</th>
                <th style="width: 100px">评分项目</th>
                <th style="width: 60px">分值</th>
                <th>评审标准与细则（逐字原文）</th>
              </tr>
            </thead>
            <tbody>
              <!-- 条款 1 -->
              <tr id="clause_1" class="doc-clause-highlight" onclick="selectRowByCode('1')">
                <td><b>1</b></td>
                <td><b>办公通用类物资</b></td>
                <td style="text-align: center; color: var(--brand-xiyu-logo); font-weight: bold;">29分</td>
                <td>
                  1. 办公通用类物资报价满足度：报价满足率达到 100% 得满分 29 分；若每缺漏一项物资报价扣 0.5 分，扣完为止。<br>
                  2. 投标产品需符合国家环保认证（中国环境标志产品认证证书），提供证书复印件。
                  <span class="doc-clause-badge">项 1</span>
                </td>
              </tr>

              <!-- 条款 2.2.1 -->
              <tr id="clause_2_2_1" class="doc-clause-highlight" onclick="selectRowByCode('2.2.1')">
                <td><b>2.2.1</b></td>
                <td><b>自营商城订单销量</b></td>
                <td style="text-align: center; color: var(--brand-xiyu-logo); font-weight: bold;">6分</td>
                <td>
                  横向比较各供应商自营电商商城近三年（2023-2025年）在能源行业同类物资销售金额情况：<br>
                  ① 销售额累计达到 5000 万元及以上得 6 分；<br>
                  ② 达到 2000 万元不足 5000 万元得 3 分；<br>
                  ③ 不足 2000 万元得 0 分。须提供合同或发票凭证复印件。
                  <span class="doc-clause-badge">项 2.2.1</span>
                </td>
              </tr>
            </tbody>
          </table>

          <div class="doc-page-footer">第 47 页 / 共 62 页</div>
        </div>

        <!-- 第 48 页：技术与交付评分明细表 -->
        <div class="doc-page" id="page_48">
          <div class="doc-page-header">
            <span>第三章 评标办法 · 技术与服务方案</span>
            <span>第 48 页</span>
          </div>
          <div class="doc-h2">4. 技术方案与服务保障标准（满分 25 分）</div>

          <table class="doc-table">
            <thead>
              <tr>
                <th style="width: 55px">序号</th>
                <th style="width: 100px">评分项目</th>
                <th style="width: 60px">分值</th>
                <th>评审标准与细则（逐字原文）</th>
              </tr>
            </thead>
            <tbody>
              <!-- 条款 3.1 -->
              <tr id="clause_3_1" class="doc-clause-highlight" onclick="selectRowByCode('3.1')">
                <td><b>3.1</b></td>
                <td><b>应急保供响应</b></td>
                <td style="text-align: center; color: var(--brand-xiyu-logo); font-weight: bold;">15分</td>
                <td>
                  在全国主要能源基地（含山西、内蒙、陕西等）设有区域中心仓，承诺紧急订单 2 小时响应、24 小时内送达现场得 15 分；设有分仓但响应时间超过 24 小时得 8 分；无区域仓得 0 分。
                  <span class="doc-clause-badge">项 3.1</span>
                </td>
              </tr>

              <!-- 条款 3.2 -->
              <tr id="clause_3_2" class="doc-clause-highlight" onclick="selectRowByCode('3.2')">
                <td><b>3.2</b></td>
                <td><b>技术服务团队</b></td>
                <td style="text-align: center; color: var(--brand-xiyu-logo); font-weight: bold;">10分</td>
                <td>
                  项目拟派服务团队专职人员不少于 5 人，其中项目经理具备 PMP 证书或高级项目管理师证书得 5 分；团队成员具备供应链管理师资格每人得 2.5 分，最高得 5 分。
                  <span class="doc-clause-badge">项 3.2</span>
                </td>
              </tr>
            </tbody>
          </table>

          <div class="doc-page-footer">第 48 页 / 共 62 页</div>
        </div>

        <!-- 第 49 页：价格评分明细表 -->
        <div class="doc-page" id="page_49">
          <div class="doc-page-header">
            <span>第三章 评标办法 · 价格评分公式</span>
            <span>第 49 页</span>
          </div>
          <div class="doc-h2" id="sec_price">5. 价格评分标准（满分 40 分）</div>

          <table class="doc-table">
            <thead>
              <tr>
                <th style="width: 55px">序号</th>
                <th style="width: 100px">评分项目</th>
                <th style="width: 60px">分值</th>
                <th>评审标准与计算公式（逐字原文）</th>
              </tr>
            </thead>
            <tbody>
              <!-- 条款 4.1 -->
              <tr id="clause_4_1" class="doc-clause-highlight" onclick="selectRowByCode('4.1')">
                <td><b>4.1</b></td>
                <td><b>投标报价计算</b></td>
                <td style="text-align: center; color: var(--brand-xiyu-logo); font-weight: bold;">40分</td>
                <td>
                  评标基准价计算公式：以所有有效投标报价的算术平均值作为基准价。<br>
                  投标报价等于评标基准价的得满分 40 分；投标报价高于评标基准价的，每高 1% 扣 0.5 分；低于评标基准价的，每低 1% 扣 0.3 分，扣完为止。
                  <span class="doc-clause-badge">项 4.1</span>
                </td>
              </tr>
            </tbody>
          </table>

          <div class="doc-page-footer">第 49 页 / 共 62 页</div>
        </div>

      </div>
    </div>

    <!-- 左右拖拽分割条 -->
    <div class="resizer-bar" id="resizer">
      <div class="resizer-line"></div>
    </div>

    <!-- 右屏：8 列结构化表格工作区 (Scoring Table) -->
    <div class="right-pane" id="rightPane">
      <!-- 汇总与过滤器 -->
      <div class="table-header-panel">
        <div class="score-stats-summary">
          <span class="stat-chip total">共 5 个评分细项 · 100 分</span>
          <span class="stat-chip ok" id="statOk">✓ 3 满足</span>
          <span class="stat-chip danger" id="statDanger">✗ 0 不满足</span>
          <span class="stat-chip neutral" id="statNeutral">● 2 待确认</span>
        </div>

        <div class="filter-search-box">
          <input type="text" class="search-input" placeholder="过滤编号/原文关键字..." id="filterInput" oninput="filterRows()">
        </div>
      </div>

      <!-- 表格主体 -->
      <div class="table-wrapper">
        <table class="parse-table">
          <thead>
            <tr>
              <th style="width: 68px">编号</th>
              <th>标书原文 (逐字直抽保真)</th>
              <th style="width: 110px">评分项</th>
              <th style="width: 52px; text-align: center">权重</th>
              <th style="width: 78px">满足状态</th>
              <th style="width: 78px; text-align: center">评分类别</th>
              <th style="width: 82px; text-align: center" id="colScoreHeader">预计得分</th>
              <th style="width: 68px; text-align: center">得分依据</th>
            </tr>
          </thead>
          <tbody id="scoreTableBody">
            <!-- Row 1 -->
            <tr id="row_1" onclick="focusClause('clause_1', 'row_1')">
              <td class="code-cell">1</td>
              <td class="original-cell">
                办公通用类物资报价满足度：报价满足率达到 100% 得满分 29 分；若每缺漏一项物资报价扣 0.5 分，扣完为止。投标产品需符合国家环保认证（中国环境标志产品认证证书），提供证书复印件。
                <div>
                  <span class="location-chip" onclick="event.stopPropagation(); jumpToPage(47, 'clause_1')">
                    📄 P47 商务表 第1行
                  </span>
                </div>
              </td>
              <td class="dim-cell">办公通用类物资</td>
              <td class="weight-cell">29</td>
              <td><span class="status-tag ok">✓ 满足</span></td>
              <td style="text-align: center"><span class="pill info">客观项</span></td>
              <td class="score-cell full" id="score_1">29</td>
              <td style="text-align: center">
                <button class="btn-row-action" onclick="event.stopPropagation(); openDetailModal('1')">详情</button>
              </td>
            </tr>

            <!-- Row 2.2.1 -->
            <tr id="row_2_2_1" onclick="focusClause('clause_2_2_1', 'row_2_2_1')">
              <td class="code-cell">2.2.1</td>
              <td class="original-cell">
                横向比较各供应商自营电商商城近三年（2023-2025年）在能源行业同类物资销售金额情况：① 销售额累计达到 5000 万元及以上得 6 分；② 达到 2000 万元不足 5000 万元得 3 分；③ 不足 2000 万元得 0 分。
                <div>
                  <span class="location-chip" onclick="event.stopPropagation(); jumpToPage(47, 'clause_2_2_1')">
                    📄 P47 商务表 第2行
                  </span>
                </div>
              </td>
              <td class="dim-cell">自营商城订单销量</td>
              <td class="weight-cell">6</td>
              <td><span class="status-tag ok">✓ 满足</span></td>
              <td style="text-align: center"><span class="pill info">客观项</span></td>
              <td class="score-cell full" id="score_2_2_1">6</td>
              <td style="text-align: center">
                <button class="btn-row-action" onclick="event.stopPropagation(); openDetailModal('2.2.1')">详情</button>
              </td>
            </tr>

            <!-- Row 3.1 -->
            <tr id="row_3_1" onclick="focusClause('clause_3_1', 'row_3_1')">
              <td class="code-cell">3.1</td>
              <td class="original-cell">
                在全国主要能源基地（含山西、内蒙、陕西等）设有区域中心仓，承诺紧急订单 2 小时响应、24 小时内送达现场得 15 分；设有分仓但响应时间超过 24 小时得 8 分；无区域仓得 0 分。
                <div>
                  <span class="location-chip" onclick="event.stopPropagation(); jumpToPage(48, 'clause_3_1')">
                    📄 P48 技术表 第1行
                  </span>
                </div>
              </td>
              <td class="dim-cell">应急保供响应</td>
              <td class="weight-cell">15</td>
              <td><span class="status-tag ok">✓ 满足</span></td>
              <td style="text-align: center"><span class="pill info">客观项</span></td>
              <td class="score-cell full" id="score_3_1">15</td>
              <td style="text-align: center">
                <button class="btn-row-action" onclick="event.stopPropagation(); openDetailModal('3.1')">详情</button>
              </td>
            </tr>

            <!-- Row 3.2 -->
            <tr id="row_3_2" onclick="focusClause('clause_3_2', 'row_3_2')">
              <td class="code-cell">3.2</td>
              <td class="original-cell">
                项目拟派服务团队专职人员不少于 5 人，其中项目经理具备 PMP 证书或高级项目管理师证书得 5 分；团队成员具备供应链管理师资格每人得 2.5 分，最高得 5 分。
                <div>
                  <span class="location-chip" onclick="event.stopPropagation(); jumpToPage(48, 'clause_3_2')">
                    📄 P48 技术表 第2行
                  </span>
                </div>
              </td>
              <td class="dim-cell">技术服务团队</td>
              <td class="weight-cell">10</td>
              <td><span class="status-tag neutral">● 待确认</span></td>
              <td style="text-align: center"><span class="pill neutral">主观项</span></td>
              <td class="score-cell subjective" id="score_3_2">待确认</td>
              <td style="text-align: center">
                <button class="btn-row-action" onclick="event.stopPropagation(); openDetailModal('3.2')">详情</button>
              </td>
            </tr>

            <!-- Row 4.1 -->
            <tr id="row_4_1" onclick="focusClause('clause_4_1', 'row_4_1')">
              <td class="code-cell">4.1</td>
              <td class="original-cell">
                评标基准价计算公式：以所有有效投标报价的算术平均值作为基准价。投标报价等于评标基准价的得满分 40 分；高于基准价每高 1% 扣 0.5 分；低于基准价每低 1% 扣 0.3 分。
                <div>
                  <span class="location-chip" onclick="event.stopPropagation(); jumpToPage(49, 'clause_4_1')">
                    📄 P49 价格表 第1行
                  </span>
                </div>
              </td>
              <td class="dim-cell">投标报价计算</td>
              <td class="weight-cell">40</td>
              <td><span class="status-tag neutral">● 待确认</span></td>
              <td style="text-align: center"><span class="pill info">客观项</span></td>
              <td class="score-cell subjective" id="score_4_1">待确认</td>
              <td style="text-align: center">
                <button class="btn-row-action" onclick="event.stopPropagation(); openDetailModal('4.1')">详情</button>
              </td>
            </tr>
          </tbody>

          <!-- 合计底栏 -->
          <tfoot>
            <tr class="tfoot-row">
              <td colspan="3" class="tfoot-total-cell">
                <b>合计</b>
              </td>
              <td class="weight-cell">100</td>
              <td class="tfoot-stack-cell">
                <span style="color: var(--brand-xiyu-logo)">3 满足</span><br>
                <span style="color: var(--status-danger-color)">0 不满足</span><br>
                <span style="color: var(--text-muted)">2 待确认</span>
              </td>
              <td class="tfoot-stack-cell">
                <span style="color: var(--status-info-color)">客观项 90</span><br>
                <span style="color: var(--text-muted)">主观项 10</span>
              </td>
              <td style="text-align: center">
                <span class="highlight-score-box" id="totalScoreBox">50</span>
              </td>
              <td></td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  </div>

  <!-- 3. 底部状态栏 -->
  <footer class="workbench-statusbar">
    <div class="status-hint">
      <div class="status-hint-dot"></div>
      <span>双向联动已激活：点击右侧任意行即可定位左侧标书出处；点击左侧标书高亮段落可快速聚焦右侧评分项</span>
    </div>
    <div>
      <span>AI 保真对齐引擎: ScoreOriginalTextAligner v4.0 · 100分闭环验证通过</span>
    </div>
  </footer>

  <!-- 4. 详情弹窗 Modal -->
  <div class="modal-backdrop" id="detailModal" onclick="closeDetailModal()">
    <div class="detail-modal-card" onclick="event.stopPropagation()">
      <div class="modal-header">
        <div class="modal-title" id="modalTitle">评分项详情 · 标书原文对照</div>
        <button class="modal-close" onclick="closeDetailModal()">✕</button>
      </div>
      <div class="modal-body" id="modalBody">
        <!-- 动态注入内容 -->
      </div>
    </div>
  </div>

  `;
