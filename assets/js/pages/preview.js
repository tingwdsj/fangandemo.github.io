/**
 * 正文预览页交互逻辑
 */

document.addEventListener('DOMContentLoaded', () => {
  console.log('正文预览页已加载');

  // ========== 返回主页按钮 ==========
  const btnHome = document.getElementById('btn-home');
  btnHome?.addEventListener('click', () => {
    if (confirm('确定要返回主页吗？您可以在"历史方案库"中找到已完成的方案。')) {
      window.location.href = 'index.html';
    }
  });

  // ========== 章节数据 ==========
  const chapters = [
    {
      id: 1,
      name: '1. 项目概述',
      content: `
        <h2>1. 项目概述</h2>
        <hr class="divider">
        <p>本项目旨在构建一个现代化、智能化的智慧城市综合管理平台，通过整合城市各类数据资源，运用大数据、云计算、物联网等先进技术，实现城市管理的数字化、精细化和智能化。</p>
        <h3>1.1 项目背景</h3>
        <p>随着我国城市化进程的不断加快，城市规模持续扩大，人口数量快速增长，城市管理面临着前所未有的挑战。传统的城市管理模式已经难以适应现代城市发展的需求，亟需通过技术手段创新管理方式，提升管理效率。</p>
        <p>当前，我国正处于新型城镇化建设的关键时期，智慧城市建设已成为推动城市转型升级的重要抓手。通过建设智慧城市，可以有效提升城市运行效率、改善民生服务、优化营商环境，为城市可持续发展提供有力支撑。</p>
        <h3>1.2 项目目标</h3>
        <p>本项目的主要目标包括：</p>
        <ul class="doc-list">
          <li>构建统一的城市数据管理平台，实现各部门数据共享与业务协同</li>
          <li>建立智能化的城市运行监测体系，提升城市治理能力</li>
          <li>提供便捷的民生服务渠道，增强市民满意度</li>
          <li>优化城市资源配置，提高城市运行效率</li>
        </ul>
      `
    },
    {
      id: 2,
      name: '2. 技术方案',
      content: `
        <h2>2. 技术方案</h2>
        <hr class="divider">
        <h3>2.1 技术架构</h3>
        <p>本项目采用云原生架构，基于微服务设计理念，构建弹性可扩展的技术体系。整体架构分为基础设施层、数据层、平台层和应用层。</p>
        <h3>2.2 核心技术</h3>
        <ul class="doc-list">
          <li><strong>云计算平台：</strong>基于私有云部署，提供弹性计算资源</li>
          <li><strong>大数据引擎：</strong>采用Hadoop+Spark生态，实现海量数据处理</li>
          <li><strong>物联网平台：</strong>支持多协议接入，实现设备统一管理</li>
          <li><strong>人工智能引擎：</strong>集成机器学习算法，提供智能分析能力</li>
        </ul>
      `
    },
    {
      id: 3,
      name: '3. 实施计划',
      content: `
        <h2>3. 实施计划</h2>
        <hr class="divider">
        <h3>3.1 项目阶段</h3>
        <p>本项目分为三个阶段实施：第一阶段完成基础设施建设，第二阶段进行系统集成，第三阶段投入运营使用。</p>
        <h3>3.2 时间安排</h3>
        <p>项目总周期为18个月，其中前期准备3个月，开发实施12个月，试运行3个月。</p>
      `
    }
  ];

  let currentChapter = 0;

  // ========== 渲染目录导航 ==========
  function renderNav() {
    const nav = document.getElementById('sidebar-nav');
    nav.innerHTML = '';

    chapters.forEach((chapter, index) => {
      const navItem = document.createElement('div');
      navItem.className = `nav-item nav-level-1 ${index === currentChapter ? 'active' : ''}`;
      navItem.innerHTML = `
        <span class="nav-icon">📄</span>
        <span class="nav-text">${chapter.name}</span>
      `;
      navItem.addEventListener('click', () => {
        loadChapter(index);
      });
      nav.appendChild(navItem);
    });
  }

  // ========== 加载章节内容 ==========
  function loadChapter(index) {
    if (index < 0 || index >= chapters.length) return;

    currentChapter = index;
    const chapter = chapters[index];

    // 更新章节标题
    const chapterTitle = document.getElementById('chapter-title');
    if (chapterTitle) {
      chapterTitle.textContent = chapter.name;
    }

    // 更新内容区域
    const contentDisplay = document.getElementById('content-display');
    if (contentDisplay) {
      const documentContent = contentDisplay.querySelector('.document-content');
      if (documentContent) {
        // 保存文档标题
        const docTitle = documentContent.querySelector('.doc-title');
        const docTitleHtml = docTitle ? docTitle.outerHTML : '<h1 class="doc-title">智慧城市技术方案</h1>';

        // 替换内容并恢复标题
        documentContent.innerHTML = docTitleHtml + chapter.content;
      }
    }

    // 更新目录高亮
    renderNav();

    // 滚动到顶部
    contentDisplay?.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // ========== 章节导航 ==========
  const prevChapterBtn = document.getElementById('prev-chapter');
  const nextChapterBtn = document.getElementById('next-chapter');

  prevChapterBtn?.addEventListener('click', () => {
    if (currentChapter > 0) {
      loadChapter(currentChapter - 1);
    } else {
      showToast('已经是第一章了', 'warning');
    }
  });

  nextChapterBtn?.addEventListener('click', () => {
    if (currentChapter < chapters.length - 1) {
      loadChapter(currentChapter + 1);
    } else {
      showToast('已经是最后一章了', 'warning');
    }
  });

  // ========== 重新编写章节模态框 ==========
  const rewriteModal = document.getElementById('rewrite-modal');
  const rewriteChapterBtn = document.getElementById('rewrite-chapter-btn');
  const closeRewriteModal = document.getElementById('close-rewrite-modal');
  const cancelRewriteModal = document.getElementById('cancel-rewrite-modal');
  const confirmRewriteBtn = document.getElementById('confirm-rewrite');
  const rewriteComment = document.getElementById('rewrite-comment');

  rewriteChapterBtn?.addEventListener('click', () => {
    rewriteModal.classList.add('active');
  });

  closeRewriteModal?.addEventListener('click', () => {
    rewriteModal.classList.remove('active');
  });

  cancelRewriteModal?.addEventListener('click', () => {
    rewriteModal.classList.remove('active');
  });

  rewriteModal?.addEventListener('click', (e) => {
    if (e.target === rewriteModal) {
      rewriteModal.classList.remove('active');
    }
  });

  rewriteComment?.addEventListener('input', () => {
    const count = rewriteComment.value.length;
    const counter = rewriteModal.querySelector('.current-count');
    if (counter) {
      counter.textContent = count;
    }
  });

  confirmRewriteBtn?.addEventListener('click', () => {
    rewriteModal.classList.remove('active');
    showToast('正在重新生成章节...', 'info');

    // 模拟生成
    setTimeout(() => {
      showToast('章节已重新生成', 'success');
    }, 2000);
  });

  // ========== 重新编写全文 ==========
  const rewriteAllBtn = document.getElementById('rewrite-all-btn');

  rewriteAllBtn?.addEventListener('click', () => {
    // 复用 rewrite-modal，但修改标题和提示
    const modalTitle = rewriteModal.querySelector('.modal-title');
    const warningTip = rewriteModal.querySelector('.warning-tip');
    const originalTitle = modalTitle.textContent;
    const originalTip = warningTip?.innerHTML;

    // 修改为全文重新生成的提示
    if (modalTitle) modalTitle.textContent = '重新编写全文';
    if (warningTip) {
      warningTip.innerHTML = `
        <svg class="icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2"/>
          <path d="M12 8V12M12 16H12.01" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        将覆盖所有章节内容，是否继续？
      `;
    }

    // 清空之前的输入
    if (rewriteComment) rewriteComment.value = '';
    const counter = rewriteModal.querySelector('.current-count');
    if (counter) counter.textContent = '0';

    rewriteModal.classList.add('active');

    // 恢复原来的内容（当模态框关闭时）
    const restoreModal = () => {
      if (modalTitle) modalTitle.textContent = '重新编写本章节';
      if (warningTip && originalTip) warningTip.innerHTML = originalTip;
      rewriteModal.removeEventListener('click', handleModalClick);
      cancelRewriteModal.removeEventListener('click', restoreModal);
      confirmRewriteBtn.removeEventListener('click', handleConfirm);
    };

    // 处理确认
    const handleConfirm = () => {
      rewriteModal.classList.remove('active');
      restoreModal();

      showToast('正在重新生成全文...', 'info');

      // 显示全屏进度
      const progressOverlay = createProgressOverlay();
      document.body.appendChild(progressOverlay);

      let progress = 0;
      const progressBar = progressOverlay.querySelector('.progress-bar');
      const progressPercent = progressOverlay.querySelector('.progress-percent');
      const progressText = progressOverlay.querySelector('.progress-text');

      const interval = setInterval(() => {
        progress += Math.random() * 10;
        if (progress >= 100) {
          progress = 100;
          clearInterval(interval);

          setTimeout(() => {
            progressOverlay.remove();
            showToast('全文已重新生成', 'success');
          }, 500);
        }

        if (progressBar) progressBar.style.width = progress + '%';
        if (progressPercent) progressPercent.textContent = Math.floor(progress);
        if (progressText) progressText.textContent = `正在生成... ${Math.floor(progress)}%`;
      }, 200);
    };

    const handleModalClick = (e) => {
      if (e.target === rewriteModal) {
        rewriteModal.classList.remove('active');
        restoreModal();
      }
    };

    cancelRewriteModal?.addEventListener('click', restoreModal);
    confirmRewriteBtn?.addEventListener('click', handleConfirm);
    rewriteModal?.addEventListener('click', handleModalClick);
  });

  function createProgressOverlay() {
    const overlay = document.createElement('div');
    overlay.className = 'progress-overlay';
    overlay.innerHTML = `
      <div class="progress-modal">
        <div class="progress-spinner">
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2V6M12 18V22M6 12H2M22 12H18M19.07 4.93L16.24 7.76M7.76 16.24L4.93 19.07M19.07 19.07L16.24 16.24M7.76 7.76L4.93 4.93" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
        <p class="progress-text">正在生成全文...</p>
        <div class="progress">
          <div class="progress-bar" style="width: 0%"></div>
        </div>
        <p class="progress-percent">0%</p>
        <button class="btn btn-secondary btn-sm" style="margin-top: 16px;">取消生成</button>
      </div>
    `;
    return overlay;
  }

  // ========== 下载功能 ==========
  const downloadBtn = document.getElementById('download-btn');

  downloadBtn?.addEventListener('click', () => {
    showToast('正在准备下载...', 'info');

    // 模拟下载准备
    setTimeout(() => {
      showToast('下载已开始', 'success');

      // 创建虚拟下载链接
      const link = document.createElement('a');
      link.href = '#';
      link.download = '智慧城市技术方案.docx';
      link.click();
    }, 1500);
  });

  // ========== 编辑功能 ==========
  const editBtn = document.getElementById('edit-btn');
  let isEditing = false;
  let originalContent = '';

  editBtn?.addEventListener('click', () => {
    if (!isEditing) {
      // 进入编辑模式
      enterEditMode();
    } else {
      // 保存并退出编辑模式
      saveAndExitEditMode();
    }
  });

  function enterEditMode() {
    const contentDisplay = document.getElementById('content-display');
    const documentContent = contentDisplay?.querySelector('.document-content');

    if (!documentContent) return;

    // 保存原始内容
    originalContent = documentContent.innerHTML;

    // 在content-display顶部添加编辑工具栏（在document-content外面）
    const toolbar = createEditorToolbar();
    contentDisplay.insertBefore(toolbar, documentContent);

    // 设置内容为可编辑
    makeContentEditable(documentContent);

    // 更新按钮状态
    editBtn.innerHTML = `
      <svg class="icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H16L21 8V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M17 21V13H7V21" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M7 3V8H15" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
      保存
    `;

    // 添加取消按钮
    const headerActions = document.querySelector('.header-actions');
    if (!document.getElementById('cancel-edit-btn')) {
      const cancelBtn = document.createElement('button');
      cancelBtn.className = 'btn btn-secondary btn-sm';
      cancelBtn.id = 'cancel-edit-btn';
      cancelBtn.innerHTML = `
        <svg class="icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        取消
      `;
      cancelBtn.addEventListener('click', cancelEditMode);
      headerActions?.insertBefore(cancelBtn, editBtn.nextSibling);
    }

    // 禁用其他按钮
    document.getElementById('rewrite-chapter-btn')?.setAttribute('disabled', 'true');
    document.getElementById('rewrite-all-btn')?.setAttribute('disabled', 'true');
    document.getElementById('prev-chapter')?.setAttribute('disabled', 'true');
    document.getElementById('next-chapter')?.setAttribute('disabled', 'true');
    document.getElementById('download-btn')?.setAttribute('disabled', 'true');

    isEditing = true;
    showToast('已进入编辑模式，直接点击内容即可编辑', 'info');
  }

  function createEditorToolbar() {
    const toolbar = document.createElement('div');
    toolbar.className = 'editor-toolbar';

    const buttons = [
      { icon: 'H1', title: '一级标题', command: () => formatBlock('h1') },
      { icon: 'H2', title: '二级标题', command: () => formatBlock('h2') },
      { icon: 'H3', title: '三级标题', command: () => formatBlock('h3') },
      { icon: 'H4', title: '四级标题', command: () => formatBlock('h4') },
      { icon: 'H5', title: '五级标题', command: () => formatBlock('h5') },
      { divider: true },
      { icon: 'B', title: '加粗', command: () => execCmd('bold') },
      { icon: 'I', title: '斜体', command: () => execCmd('italic') },
      { icon: 'U', title: '下划线', command: () => execCmd('underline') },
      { divider: true },
      { icon: '•', title: '无序列表', command: () => execCmd('insertUnorderedList') },
      { icon: '1.', title: '有序列表', command: () => execCmd('insertOrderedList') },
      { divider: true },
      { icon: '—', title: '分隔线', command: insertHorizontalRule },
      { icon: '↩', title: '清除格式', command: () => execCmd('removeFormat') }
    ];

    buttons.forEach(btn => {
      if (btn.divider) {
        const divider = document.createElement('div');
        divider.className = 'toolbar-divider';
        toolbar.appendChild(divider);
      } else {
        const button = document.createElement('button');
        button.className = 'toolbar-btn';
        button.title = btn.title;
        button.textContent = btn.icon;
        button.addEventListener('click', (e) => {
          e.preventDefault();
          btn.command();
        });
        toolbar.appendChild(button);
      }
    });

    return toolbar;
  }

  function makeContentEditable(container) {
    // 让整个容器可编辑，而不是单个元素
    container.setAttribute('contenteditable', 'true');
    container.classList.add('rich-editor');
  }

  function execCmd(command, value = null) {
    document.execCommand(command, false, value);
  }

  function formatBlock(tag) {
    document.execCommand('formatBlock', false, tag);
  }

  function insertHorizontalRule() {
    document.execCommand('insertHorizontalRule', false, null);
    const hr = document.querySelector('hr');
    if (hr) {
      hr.className = 'divider';
    }
  }

  function saveAndExitEditMode() {
    const contentDisplay = document.getElementById('content-display');
    const documentContent = contentDisplay?.querySelector('.document-content');
    if (!documentContent) return;

    // 移除contenteditable属性
    documentContent.removeAttribute('contenteditable');
    documentContent.classList.remove('rich-editor');

    // 移除工具栏（从content-display中）
    const toolbar = contentDisplay.querySelector('.editor-toolbar');
    if (toolbar) toolbar.remove();

    // 获取文档标题
    const docTitle = documentContent.querySelector('.doc-title');

    // 获取编辑后的内容（排除文档标题）
    let newContent = documentContent.innerHTML;
    if (docTitle) {
      newContent = newContent.replace(docTitle.outerHTML, '');
    }

    // 清理可能的多余空格和换行
    newContent = newContent.trim();

    // 更新当前章节内容
    chapters[currentChapter].content = newContent;

    // 重新渲染内容（移除编辑痕迹）
    loadChapter(currentChapter);

    exitEditMode();
    showToast('保存成功', 'success');
  }

  function cancelEditMode() {
    const contentDisplay = document.getElementById('content-display');
    const documentContent = contentDisplay?.querySelector('.document-content');
    if (!documentContent) return;

    // 移除contenteditable属性
    documentContent.removeAttribute('contenteditable');
    documentContent.classList.remove('rich-editor');

    // 移除工具栏（从content-display中）
    const toolbar = contentDisplay.querySelector('.editor-toolbar');
    if (toolbar) toolbar.remove();

    // 恢复原始内容
    loadChapter(currentChapter);

    exitEditMode();
    showToast('已取消编辑', 'info');
  }

  function exitEditMode() {
    // 恢复按钮状态
    editBtn.innerHTML = `
      <svg class="icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M11 4H4C3.46957 4 2.96086 4.21071 2.58579 4.58579C2.21071 4.96086 2 5.46957 2 6V20C2 20.5304 2.21071 21.0391 2.58579 21.4142C2.96086 21.7893 3.46957 22 4 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V13" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M18.5 2.5C18.8978 2.10217 19.4374 1.87868 20 1.87868C20.5626 1.87868 21.1022 2.10217 21.5 2.5C21.8978 2.89783 22.1213 3.43739 22.1213 4C22.1213 4.56261 21.8978 5.10217 21.5 5.5L12 15L8 16L9 12L18.5 2.5Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
      编辑
    `;

    // 移除取消按钮
    const cancelBtn = document.getElementById('cancel-edit-btn');
    cancelBtn?.remove();

    // 启用其他按钮
    document.getElementById('rewrite-chapter-btn')?.removeAttribute('disabled');
    document.getElementById('rewrite-all-btn')?.removeAttribute('disabled');
    document.getElementById('prev-chapter')?.removeAttribute('disabled');
    document.getElementById('next-chapter')?.removeAttribute('disabled');
    document.getElementById('download-btn')?.removeAttribute('disabled');

    isEditing = false;
  }

  // ========== 提示消息 ==========
  function showToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.textContent = message;
    document.body.appendChild(toast);

    setTimeout(() => {
      toast.classList.add('show');
    }, 100);

    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => toast.remove(), 300);
    }, 2000);
  }

  // ========== 初始化 ==========
  renderNav();
  loadChapter(0); // 加载第一章
});

// 添加进度覆盖层样式
const style = document.createElement('style');
style.textContent = `
  .progress-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.75);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 2000;
    animation: fadeIn 0.3s ease;
  }

  .progress-modal {
    background-color: white;
    border-radius: 8px;
    padding: 32px;
    text-align: center;
    min-width: 320px;
  }

  .progress-spinner {
    width: 64px;
    height: 64px;
    margin: 0 auto 16px;
    animation: spin 2s linear infinite;
  }

  .progress-spinner svg {
    width: 100%;
    height: 100%;
    color: var(--primary-color);
  }

  .progress-text {
    font-size: 18px;
    color: var(--text-primary);
    margin-bottom: 16px;
  }

  .progress-percent {
    font-size: 14px;
    color: var(--text-tertiary);
    margin-top: 8px;
  }

  @keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }

  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
`;
document.head.appendChild(style);
