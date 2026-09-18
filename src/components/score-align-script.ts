// @ts-nocheck
// 由 scripts 口径的移植脚本自 HTML 原型自动生成，勿手工改；要改先改原型再重跑。
export function initScoreAlignViewer() {

    // 数据源定义
    const scoreItemsData = {
      '1': {
        code: '1',
        dim: '办公通用类物资',
        weight: 29,
        scoreType: '客观项',
        location: 'P47 商务表 第1行',
        page: 47,
        clauseId: 'clause_1',
        detail: '办公通用类物资报价满足度：报价满足率达到 100% 得满分 29 分；若每缺漏一项物资报价扣 0.5 分，扣完为止。投标产品需符合国家环保认证（中国环境标志产品认证证书），提供证书复印件。',
        estStatus: 'ok',
        estScore: 29,
        estBasis: '知识库命中：已匹配《中国环境标志产品认证证书》（证书编号：CEC2023ELP01238，有效期至2027-12-31）；物资清单 420 项全量匹配西域自营库商品。',
        kbHit: true,
        actualStatus: 'ok',
        actualScore: 29,
        actualBasis: '评标专家打分：所投商品均在政府采购环保清单内，420项规格型号响应完全无缺漏。'
      },
      '2.2.1': {
        code: '2.2.1',
        dim: '自营商城订单销量',
        weight: 6,
        scoreType: '客观项',
        location: 'P47 商务表 第2行',
        page: 47,
        clauseId: 'clause_2_2_1',
        detail: '横向比较各供应商自营电商商城近三年（2023-2025年）在能源行业同类物资销售金额情况：① 销售额累计达到 5000 万元及以上得 6 分；② 达到 2000 万元不足 5000 万元得 3 分；③ 不足 2000 万元得 0 分。须提供合同或发票凭证复印件。',
        estStatus: 'ok',
        estScore: 6,
        estBasis: '知识库命中：已匹配《国家能源集团2024年MRO采购合同》（合同金额：1.28亿元）、《陕煤集团2025年电商框架协议》（合同金额：6500万元），累计超5000万元。',
        kbHit: true,
        actualStatus: 'ok',
        actualScore: 6,
        actualBasis: '评标专家打分：业绩证明材料真实完备，发票核验一致。'
      },
      '3.1': {
        code: '3.1',
        dim: '应急保供响应',
        weight: 15,
        scoreType: '客观项',
        location: 'P48 技术表 第1行',
        page: 48,
        clauseId: 'clause_3_1',
        detail: '在全国主要能源基地（含山西、内蒙、陕西等）设有区域中心仓，承诺紧急订单 2 小时响应、24 小时内送达现场得 15 分；设有分仓但响应时间超过 24 小时得 8 分；无区域仓得 0 分。',
        estStatus: 'ok',
        estScore: 15,
        estBasis: '知识库命中：已匹配西域太原中心仓（山西）、鄂尔多斯仓（内蒙）、西安仓（陕西）三处实物仓库备案证明与 24h 履约方案。',
        kbHit: true,
        actualStatus: 'ok',
        actualScore: 15,
        actualBasis: '评标专家打分：仓储布局与应急响应承诺完全满足标书最高档要求。'
      },
      '3.2': {
        code: '3.2',
        dim: '技术服务团队',
        weight: 10,
        scoreType: '主观项',
        location: 'P48 技术表 第2行',
        page: 48,
        clauseId: 'clause_3_2',
        detail: '项目拟派服务团队专职人员不少于 5 人，其中项目经理具备 PMP 证书或高级项目管理师证书得 5 分；团队成员具备供应链管理师资格每人得 2.5 分，最高得 5 分。',
        estStatus: 'neutral',
        estScore: '待确认',
        estBasis: '需评标专家根据标书拟派人员花名册及社保证明人工打分（人员库已就绪张伟 PMP 证书、李强高级供应链管理师证书）。',
        kbHit: false,
        actualStatus: 'ok',
        actualScore: 10,
        actualBasis: '评标专家打分：拟派项目经理具备高级信息系统项目管理师证书，4位技术骨干均持有国家认证供应链管理师证书，得满分 10 分。'
      },
      '4.1': {
        code: '4.1',
        dim: '投标报价计算',
        weight: 40,
        scoreType: '客观项',
        location: 'P49 价格表 第1行',
        page: 49,
        clauseId: 'clause_4_1',
        detail: '评标基准价计算公式：以所有有效投标报价的算术平均值作为基准价。投标报价等于评标基准价的得满分 40 分；高于基准价每高 1% 扣 0.5 分；低于基准价每低 1% 扣 0.3 分。',
        estStatus: 'neutral',
        estScore: '待确认',
        estBasis: '价格分为开标后动态比对分值，当前阶段无法预知其他竞标方报价，故预计阶段计为待确认。',
        kbHit: false,
        actualStatus: 'ok',
        actualScore: 38.8,
        actualBasis: '开标计算结果：有效报价均值 1840 万元，我方报价 1803.2 万元（低于基准价 2%），扣 0.6 分，实得 39.4 分。'
      }
    };

    let currentMode = 'est';
    let currentScale = 1.0;

    // 1. 双向联动：从表格聚焦到左侧文档
    function focusClause(clauseId, rowId) {
      // 激活表格行高亮
      document.querySelectorAll('.parse-table tr').forEach(tr => tr.classList.remove('active-row'));
      const targetRow = document.getElementById(rowId);
      if (targetRow) targetRow.classList.add('active-row');

      // 滚动左侧文档到对应条款并高亮
      const targetClause = document.getElementById(clauseId);
      if (targetClause) {
        document.querySelectorAll('.doc-clause-highlight').forEach(el => el.classList.remove('active-target'));
        targetClause.classList.add('active-target');
        targetClause.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }

    // 2. 双向联动：从左侧文档点击聚焦到右侧表格行
    function selectRowByCode(code) {
      const data = scoreItemsData[code];
      if (!data) return;
      focusClause(data.clauseId, 'row_' + code.replace(/\./g, '_'));
    }

    // 3. 页码直接跳转
    function jumpToPage(pageNo, clauseId) {
      const pageEl = document.getElementById('page_' + pageNo);
      if (pageEl) {
        pageEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
        document.getElementById('pageIndicator').value = pageNo;
      }
      if (clauseId) {
        setTimeout(() => {
          const targetClause = document.getElementById(clauseId);
          if (targetClause) {
            document.querySelectorAll('.doc-clause-highlight').forEach(el => el.classList.remove('active-target'));
            targetClause.classList.add('active-target');
          }
        }, 300);
      }
    }

    // 4. 定位特定章节
    function locateClause(secId) {
      const secEl = document.getElementById(secId);
      if (secEl) {
        secEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
        focusClause('clause_4_1', 'row_4_1');
      }
    }

    // 5. 阶段模式切换 (阶段1 预计得分 vs 阶段2 实际打分)
    function switchPhase(mode) {
      currentMode = mode;
      document.getElementById('btnPhase1').classList.toggle('active', mode === 'est');
      document.getElementById('btnPhase2').classList.toggle('active', mode === 'actual');
      document.getElementById('colScoreHeader').innerText = mode === 'actual' ? '实际得分' : '预计得分';

      if (mode === 'actual') {
        document.getElementById('score_1').innerText = '29';
        document.getElementById('score_2_2_1').innerText = '6';
        document.getElementById('score_3_1').innerText = '15';
        document.getElementById('score_3_2').innerText = '10';
        document.getElementById('score_3_2').className = 'score-cell full';
        document.getElementById('score_4_1').innerText = '39.4';
        document.getElementById('score_4_1').className = 'score-cell partial';
        document.getElementById('totalScoreBox').innerText = '99.4';
        document.getElementById('statOk').innerText = '✓ 5 满足';
        document.getElementById('statNeutral').innerText = '● 0 待确认';
      } else {
        document.getElementById('score_1').innerText = '29';
        document.getElementById('score_2_2_1').innerText = '6';
        document.getElementById('score_3_1').innerText = '15';
        document.getElementById('score_3_2').innerText = '待确认';
        document.getElementById('score_3_2').className = 'score-cell subjective';
        document.getElementById('score_4_1').innerText = '待确认';
        document.getElementById('score_4_1').className = 'score-cell subjective';
        document.getElementById('totalScoreBox').innerText = '50';
        document.getElementById('statOk').innerText = '✓ 3 满足';
        document.getElementById('statNeutral').innerText = '● 2 待确认';
      }
    }

    // 6. 文档缩放
    function zoomDoc(factor) {
      currentScale *= factor;
      if (currentScale < 0.7) currentScale = 0.7;
      if (currentScale > 1.4) currentScale = 1.4;
      document.querySelectorAll('.doc-page').forEach(page => {
        page.style.transform = `scale(${currentScale})`;
        page.style.transformOrigin = 'top center';
      });
    }

    // 7. 切换分屏比例 (48% -> 60% -> 35% -> 48%)
    let currentSplitState = 0;
    const splitWidths = ['48%', '60%', '38%'];
    function toggleSplitLayout() {
      currentSplitState = (currentSplitState + 1) % splitWidths.length;
      document.getElementById('leftPane').style.width = splitWidths[currentSplitState];
    }

    // 8. 过滤表格行
    function filterRows() {
      const query = document.getElementById('filterInput').value.trim().toLowerCase();
      document.querySelectorAll('#scoreTableBody tr').forEach(tr => {
        const text = tr.innerText.toLowerCase();
        tr.style.display = text.includes(query) ? '' : 'none';
      });
    }

    // 9. 详情 Modal 弹窗
    function openDetailModal(code) {
      const data = scoreItemsData[code];
      if (!data) return;

      const isActual = currentMode === 'actual';
      const statusText = (isActual ? data.actualStatus : data.estStatus) === 'ok' ? '✓ 满足' : '● 待确认';
      const scoreVal = isActual ? data.actualScore : data.estScore;
      const basisVal = isActual ? data.actualBasis : data.estBasis;

      document.getElementById('modalTitle').innerText = `${data.code} · ${data.dim} — ${isActual ? '实际打分详情' : '预计得分详情'}`;

      let html = `
        <div class="modal-field-group">
          <div class="modal-label">标书原文 (逐字直抽保真)</div>
          <div class="modal-box" style="white-space: pre-wrap; font-size: 13px; line-height: 1.6;">${data.detail}</div>
        </div>

        <div class="modal-field-group">
          <div class="modal-label">招标文件位置出处</div>
          <div class="modal-box" style="color: var(--brand-xiyu-logo); font-weight: 600;">📄 ${data.location}</div>
        </div>

        <div class="modal-field-group">
          <div class="modal-label">所属评分项 / 权重 / 评分类别</div>
          <div class="modal-box">
            <b>${data.dim}</b> ｜ 权重 <b>${data.weight} 分</b> ｜ <span class="pill info">${data.scoreType}</span>
          </div>
        </div>

        <div class="modal-field-group">
          <div class="modal-label">满足状态与得分</div>
          <div class="modal-box" style="display: flex; gap: 20px; align-items: center;">
            <span>状态: <b>${statusText}</b></span>
            <span>得分: <b style="color: var(--brand-xiyu-logo); font-size: 15px;">${scoreVal} / ${data.weight}</b></span>
          </div>
        </div>

        <div class="modal-field-group">
          <div class="modal-label">${isActual ? '评分依据与专家意见' : '预计得分依据 (知识库匹配证明)'}</div>
          <div class="modal-quote">
            ${data.kbHit && !isActual ? '<div style="margin-bottom: 4px;"><span class="pill kb-hit">知识库 100% 命中</span></div>' : ''}
            <div>${basisVal}</div>
          </div>
        </div>
      `;

      document.getElementById('modalBody').innerHTML = html;
      document.getElementById('detailModal').classList.add('open');
    }

    function closeDetailModal() {
      document.getElementById('detailModal').classList.remove('open');
    }

    // 10. 拖拽分割条交互
    const resizer = document.getElementById('resizer');
    const leftPane = document.getElementById('leftPane');
    let isDragging = false;

    resizer.addEventListener('mousedown', function(e) {
      isDragging = true;
      resizer.classList.add('dragging');
      document.body.style.cursor = 'col-resize';
      document.body.style.userSelect = 'none';
    });

    document.addEventListener('mousemove', function(e) {
      if (!isDragging) return;
      const containerWidth = document.getElementById('workbench').offsetWidth;
      const newLeftWidth = Math.max(320, Math.min(e.clientX, containerWidth - 400));
      leftPane.style.width = newLeftWidth + 'px';
    });

    document.addEventListener('mouseup', function() {
      if (isDragging) {
        isDragging = false;
        resizer.classList.remove('dragging');
        document.body.style.cursor = '';
        document.body.style.userSelect = '';
      }
    });

    // 默认初始选中第一行并高亮（React useEffect 调用时 DOM 已就绪）
    focusClause('clause_1', 'row_1');
  
  (window as any).focusClause = focusClause;
  (window as any).selectRowByCode = selectRowByCode;
  (window as any).jumpToPage = jumpToPage;
  (window as any).locateClause = locateClause;
  (window as any).switchPhase = switchPhase;
  (window as any).zoomDoc = zoomDoc;
  (window as any).toggleSplitLayout = toggleSplitLayout;
  (window as any).filterRows = filterRows;
  (window as any).openDetailModal = openDetailModal;
  (window as any).closeDetailModal = closeDetailModal;
}
