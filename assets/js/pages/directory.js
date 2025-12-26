/**
 * 目录设置页交互逻辑
 */

document.addEventListener('DOMContentLoaded', () => {
  console.log('目录设置页已加载');

  // ========== 文档索引状态管理 ==========
  // 模拟文档索引数据
  const documentIndexData = [
    {
      id: 1,
      name: '企业技术白皮书.pdf',
      status: 'indexing', // indexing, completed, paused, failed
      completedSegments: 24,
      totalSegments: 65
    },
    {
      id: 2,
      name: '产品规格说明书.docx',
      status: 'completed',
      completedSegments: 42,
      totalSegments: 42
    },
    {
      id: 3,
      name: '市场调研报告.pdf',
      status: 'indexing',
      completedSegments: 18,
      totalSegments: 50
    },
    {
      id: 4,
      name: '行业标准文档.pdf',
      status: 'failed',
      completedSegments: 8,
      totalSegments: 30,
      error: '文档格式不支持'
    },
    {
      id: 5,
      name: '竞争对手分析.docx',
      status: 'paused',
      completedSegments: 15,
      totalSegments: 40
    }
  ];

  // 状态映射
  const statusConfig = {
    indexing: {
      text: '索引中',
      className: 'index-status--indexing',
      icon: '<svg class="index-status__icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 2V6M12 18V22M6 12H2M22 12H18M19.07 4.93L16.24 7.76M7.76 16.24L4.93 19.07M19.07 19.07L16.24 16.24M7.76 7.76L4.93 4.93" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>'
    },
    completed: {
      text: '索引完成',
      className: 'index-status--completed',
      icon: '<svg class="index-status__icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>'
    },
    paused: {
      text: '索引暂停',
      className: 'index-status--paused',
      icon: '<svg class="index-status__icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10 4H14V20H10V4ZM6 4H10V20H6V4ZM14 4H18V20H14V4Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>'
    },
    failed: {
      text: '索引失败',
      className: 'index-status--failed',
      icon: '<svg class="index-status__icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 8V12M12 16H12.01M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>'
    }
  };

  // 渲染索引列表
  function renderIndexList() {
    const indexList = document.getElementById('index-list');
    if (!indexList) return;

    indexList.innerHTML = '';

    documentIndexData.forEach(doc => {
      const statusInfo = statusConfig[doc.status];

      const item = document.createElement('div');
      item.className = 'index-item';
      item.innerHTML = `
        <div class="index-item-header">
          <div class="document-name">
            <svg class="icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M14 2V8H20" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <span class="document-name-text" title="${doc.name}">${doc.name}</span>
          </div>
          ${doc.status === 'indexing' || doc.status === 'paused' ? `
            <span class="index-progress-text">${doc.completedSegments}/${doc.totalSegments}</span>
          ` : ''}
          <div class="index-status ${statusInfo.className}">
            ${statusInfo.icon}
            ${statusInfo.text}
          </div>
        </div>
      `;

      indexList.appendChild(item);
    });

    updateStatusSummary();
  }

  // 更新状态统计
  function updateStatusSummary() {
    const counts = {
      indexing: 0,
      completed: 0,
      paused: 0,
      failed: 0
    };

    documentIndexData.forEach(doc => {
      if (counts.hasOwnProperty(doc.status)) {
        counts[doc.status]++;
      }
    });

    document.getElementById('indexing-count').textContent = counts.indexing;
    document.getElementById('completed-count').textContent = counts.completed;
    document.getElementById('paused-count').textContent = counts.paused;
    document.getElementById('failed-count').textContent = counts.failed;
  }

  // 模拟索引进度更新
  function simulateIndexProgress() {
    let hasIndexing = false;

    documentIndexData.forEach(doc => {
      if (doc.status === 'indexing') {
        hasIndexing = true;
        // 模拟进度增加
        if (Math.random() > 0.6 && doc.completedSegments < doc.totalSegments) {
          doc.completedSegments += Math.floor(Math.random() * 3) + 1;
          if (doc.completedSegments >= doc.totalSegments) {
            doc.completedSegments = doc.totalSegments;
            doc.status = 'completed';
          }
        }
      }
    });

    renderIndexList();

    // 如果还有索引中的文档，继续模拟
    if (hasIndexing) {
      setTimeout(simulateIndexProgress, 2000);
    }
  }

  // 初始化索引列表
  renderIndexList();
  // 延迟启动进度模拟
  setTimeout(simulateIndexProgress, 1000);

  // ========== 索引状态确认弹窗 ==========
  const indexConfirmModal = document.getElementById('index-confirm-modal');
  const closeIndexConfirm = document.getElementById('close-index-confirm');
  const cancelIndexConfirm = document.getElementById('cancel-index-confirm');
  const confirmIndexGenerate = document.getElementById('confirm-index-generate');

  // 关闭弹窗
  const hideIndexConfirmModal = () => {
    indexConfirmModal?.classList.remove('active');
  };

  closeIndexConfirm?.addEventListener('click', hideIndexConfirmModal);
  cancelIndexConfirm?.addEventListener('click', hideIndexConfirmModal);

  // 确认生成正文
  confirmIndexGenerate?.addEventListener('click', () => {
    hideIndexConfirmModal();
    // 执行生成正文逻辑
    showProgressModal();
  });

  // 显示索引确认弹窗
  function showIndexConfirmModal() {
    const hasIndexing = documentIndexData.some(doc => doc.status === 'indexing');
    const hasIssues = documentIndexData.some(doc =>
      doc.status === 'paused' || doc.status === 'failed'
    );

    if (!hasIndexing && !hasIssues) {
      // 没有任何问题，直接生成
      showProgressModal();
      return;
    }

    const confirmIcon = document.getElementById('confirm-icon');
    const confirmTitle = document.getElementById('index-confirm-title');
    const confirmText = document.getElementById('confirm-text');
    const confirmDetails = document.getElementById('confirm-details');

    // 重置图标类
    confirmIcon.className = 'confirm-icon';
    confirmDetails.innerHTML = '';

    if (hasIndexing) {
      // 有文档正在索引中
      confirmIcon.classList.add('confirm-icon--info');
      confirmTitle.textContent = '文档索引中';
      confirmText.textContent = '部分文档正在索引中，请耐心等待索引完成。如果现在开始生成正文，索引未完成的文档将不会被引用参考。';

      const indexingDocs = documentIndexData.filter(doc => doc.status === 'indexing');
      indexingDocs.forEach(doc => {
        const detailItem = document.createElement('div');
        detailItem.className = 'confirm-details-item confirm-details-item--warning';
        detailItem.innerHTML = `
          <svg class="icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2V6M12 18V22M6 12H2M22 12H18M19.07 4.93L16.24 7.76M7.76 16.24L4.93 19.07M19.07 19.07L16.24 16.24M7.76 7.76L4.93 4.93" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          <span>${doc.name} - 索引中 (${doc.completedSegments}/${doc.totalSegments})</span>
        `;
        confirmDetails.appendChild(detailItem);
      });
    } else if (hasIssues) {
      // 有文档索引失败或暂停
      confirmIcon.classList.add('confirm-icon--warning');
      confirmTitle.textContent = '部分文档索引异常';
      confirmText.textContent = '部分文档在索引过程中遇到问题，如果现在开始生成正文，这些文档将不会被引用参考。';

      const issueDocs = documentIndexData.filter(doc =>
        doc.status === 'paused' || doc.status === 'failed'
      );
      issueDocs.forEach(doc => {
        const detailItem = document.createElement('div');
        detailItem.className = `confirm-details-item ${doc.status === 'failed' ? 'confirm-details-item--error' : 'confirm-details-item--warning'}`;
        detailItem.innerHTML = `
          <svg class="icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            ${doc.status === 'failed'
              ? '<path d="M12 8V12M12 16H12.01M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>'
              : '<path d="M10 4H14V20H10V4ZM6 4H10V20H6V4ZM14 4H18V20H14V4Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>'
            }
          </svg>
          <span>${doc.name} - ${doc.status === 'failed' ? '索引失败' : '索引暂停'}</span>
        `;
        confirmDetails.appendChild(detailItem);
      });
    }

    indexConfirmModal?.classList.add('active');
  }

  // 显示生成进度模态框
  function showProgressModal() {
    const progressModal = document.getElementById('progress-modal');
    const progressBar = document.getElementById('progress-bar');
    const progressPercent = document.getElementById('progress-percent');

    progressModal?.classList.add('active');

    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 15;
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);

        setTimeout(() => {
          progressModal?.classList.remove('active');
          showToast('正文生成完成！', 'success');
          setTimeout(() => {
            window.location.href = 'preview.html';
          }, 1000);
        }, 500);
      }

      if (progressBar) progressBar.style.width = progress + '%';
      if (progressPercent) progressPercent.textContent = Math.floor(progress);
    }, 300);
  }

  // ========== 返回主页按钮 ==========
  const btnHome = document.getElementById('btn-home');
  btnHome?.addEventListener('click', () => {
    if (confirm('确定要返回主页吗？当前进度将保存到"历史方案库"中，您可以稍后继续。')) {
      window.location.href = 'index.html';
    }
  });

  // ========== 示例目录数据 ==========
  let directoryData = [
    {
      id: 1,
      name: '1. 项目概述',
      level: 1,
      expanded: true,
      children: [
        {
          id: 2,
          name: '1.1 项目背景',
          level: 2,
          expanded: true,
          children: [
            { id: 3, name: '1.1.1 行业现状', level: 3, children: [] },
            { id: 4, name: '1.1.2 市场需求', level: 3, children: [] }
          ]
        },
        { id: 5, name: '1.2 项目目标', level: 2, children: [] }
      ]
    },
    {
      id: 6,
      name: '2. 技术方案',
      level: 1,
      expanded: true,
      children: [
        { id: 7, name: '2.1 技术架构', level: 2, children: [] },
        { id: 8, name: '2.2 核心技术', level: 2, children: [] }
      ]
    },
    {
      id: 9,
      name: '3. 实施计划',
      level: 1,
      expanded: false,
      children: [
        { id: 10, name: '3.1 项目阶段', level: 2, children: [] },
        { id: 11, name: '3.2 时间安排', level: 2, children: [] }
      ]
    }
  ];

  const treeContainer = document.getElementById('tree-container');
  let nextId = 12; // 用于生成新节点ID
  let draggedNode = null;

  // ========== 渲染目录树 ==========
  function renderTree() {
    treeContainer.innerHTML = '';
    const rootElement = createTreeNode(directoryData);
    treeContainer.appendChild(rootElement);
  }

  function createTreeNode(nodes) {
    const fragment = document.createDocumentFragment();

    nodes.forEach(node => {
      const nodeElement = document.createElement('div');
      nodeElement.className = `tree-node level-${node.level}`;
      nodeElement.dataset.id = node.id;

      const hasChildren = node.children && node.children.length > 0;

      nodeElement.innerHTML = `
        <div class="node-content">
          ${hasChildren ? `
            <span class="node-toggle ${node.expanded ? 'expanded' : ''}">
              <svg class="icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 18L15 12L9 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </span>
          ` : '<span class="node-toggle-placeholder"></span>'}
          <span class="node-icon">📄</span>
          <span class="node-text">${node.name}</span>
          <div class="node-actions">
            <span class="node-action-btn edit" data-action="edit" title="编辑">
              <svg class="icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M11 4H4C3.46957 4 2.96086 4.21071 2.58579 4.58579C2.21071 4.96086 2 5.46957 2 6V20C2 20.5304 2.21071 21.0391 2.58579 21.4142C2.96086 21.7893 3.46957 22 4 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V13" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M18.5 2.5C18.8978 2.10217 19.4374 1.87868 20 1.87868C20.5626 1.87868 21.1022 2.10217 21.5 2.5C21.8978 2.89783 22.1213 3.43739 22.1213 4C22.1213 4.56261 21.8978 5.10217 21.5 5.5L12 15L8 16L9 12L18.5 2.5Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </span>
            <span class="node-action-btn up" data-action="up" title="上移">
              <svg class="icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 19V5M5 12L12 5L19 12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </span>
            <span class="node-action-btn down" data-action="down" title="下移">
              <svg class="icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 5V19M19 12L12 19L5 12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </span>
            <span class="node-action-btn promote" data-action="promote" title="升级">
              <svg class="icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M11 19L15 15M15 15L11 11M15 15H3" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </span>
            <span class="node-action-btn demote" data-action="demote" title="降级">
              <svg class="icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M13 5L9 9M9 9L13 13M9 9H21" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </span>
            <span class="node-action-btn delete" data-action="delete" title="删除">
              <svg class="icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3 6H5H21" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M8 6V4C8 3.46957 8.21071 2.96086 8.58579 2.58579C8.96086 2.21071 9.46957 2 10 2H14C14.5304 2 15.0391 2.21071 15.4142 2.58579C15.7893 2.96086 16 3.46957 16 4V6M19 6V20C19 20.5304 18.7893 21.0391 18.4142 21.4142C18.0391 21.7893 17.5304 22 17 22H7C6.46957 22 5.96086 21.7893 5.58579 21.4142C5.21071 21.0391 5 20.5304 5 20V6H19Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </span>
          </div>
        </div>
      `;

      // 添加子节点容器
      if (hasChildren) {
        const childrenContainer = document.createElement('div');
        childrenContainer.className = `node-children ${node.expanded ? '' : 'collapsed'}`;
        childrenContainer.appendChild(createTreeNode(node.children));
        nodeElement.appendChild(childrenContainer);

        // 折叠/展开切换
        const toggle = nodeElement.querySelector('.node-toggle');
        toggle.addEventListener('click', (e) => {
          e.stopPropagation();
          node.expanded = !node.expanded;
          renderTree();
        });
      }

      // 节点操作
      setupNodeActions(nodeElement, node);

      // 拖拽功能
      setupDragAndDrop(nodeElement, node);

      fragment.appendChild(nodeElement);
    });

    return fragment;
  }

  function setupNodeActions(element, node) {
    const actions = element.querySelectorAll('.node-action-btn');

    actions.forEach(actionBtn => {
      actionBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        const action = actionBtn.dataset.action;

        switch (action) {
          case 'edit':
            editNode(node, element);
            break;
          case 'up':
            moveUp(node);
            break;
          case 'down':
            moveDown(node);
            break;
          case 'promote':
            promoteNode(node);
            break;
          case 'demote':
            demoteNode(node);
            break;
          case 'delete':
            deleteNode(node);
            break;
        }
      });
    });
  }

  function setupDragAndDrop(element, node) {
    element.draggable = true;

    element.addEventListener('dragstart', (e) => {
      draggedNode = node;
      element.classList.add('dragging');
    });

    element.addEventListener('dragend', () => {
      element.classList.remove('dragging');
      draggedNode = null;
      document.querySelectorAll('.drag-over').forEach(el => el.classList.remove('drag-over'));
    });

    element.addEventListener('dragover', (e) => {
      e.preventDefault();
      if (draggedNode && draggedNode.id !== node.id) {
        element.classList.add('drag-over');
      }
    });

    element.addEventListener('dragleave', () => {
      element.classList.remove('drag-over');
    });

    element.addEventListener('drop', (e) => {
      e.preventDefault();
      element.classList.remove('drag-over');

      if (draggedNode && draggedNode.id !== node.id) {
        // 实现节点移动逻辑
        showToast('已移动节点', 'success');
        renderTree();
      }
    });
  }

  // ========== 节点操作 ==========
  function editNode(node, element) {
    const textElement = element.querySelector('.node-text');
    const currentText = node.name;

    const input = document.createElement('input');
    input.type = 'text';
    input.className = 'edit-input';
    input.value = currentText;

    textElement.innerHTML = '';
    textElement.appendChild(input);
    input.focus();
    input.select();

    const saveEdit = () => {
      const newText = input.value.trim();
      if (newText) {
        node.name = newText;
        showToast('已保存', 'success');
      }
      renderTree();
    };

    input.addEventListener('blur', saveEdit);
    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        saveEdit();
      } else if (e.key === 'Escape') {
        renderTree();
      }
    });
  }

  function moveUp(node) {
    // 实现上移逻辑
    showToast('已上移', 'success');
    renderTree();
  }

  function moveDown(node) {
    // 实现下移逻辑
    showToast('已下移', 'success');
    renderTree();
  }

  function promoteNode(node) {
    if (node.level > 1) {
      node.level--;
      renderTree();
      showToast('已升级', 'success');
    }
  }

  function demoteNode(node) {
    if (node.level < 5) {
      node.level++;
      renderTree();
      showToast('已降级', 'success');
    }
  }

  function deleteNode(node) {
    if (confirm(`确定要删除"${node.name}"吗？`)) {
      // 实现删除逻辑
      showToast('已删除', 'success');
      renderTree();
    }
  }

  // ========== 工具栏操作 ==========
  document.getElementById('add-chapter')?.addEventListener('click', () => {
    document.getElementById('add-modal').classList.add('active');
  });

  document.getElementById('collapse-all')?.addEventListener('click', () => {
    collapseAll(directoryData);
    renderTree();
  });

  document.getElementById('expand-all')?.addEventListener('click', () => {
    expandAll(directoryData);
    renderTree();
  });

  function collapseAll(nodes) {
    nodes.forEach(node => {
      node.expanded = false;
      if (node.children) {
        collapseAll(node.children);
      }
    });
  }

  function expandAll(nodes) {
    nodes.forEach(node => {
      node.expanded = true;
      if (node.children) {
        expandAll(node.children);
      }
    });
  }

  // ========== 添加章节模态框 ==========
  const addModal = document.getElementById('add-modal');
  const closeAddModal = document.getElementById('close-add-modal');
  const cancelAddModal = document.getElementById('cancel-add-modal');
  const confirmAddChapter = document.getElementById('confirm-add-chapter');
  const chapterNameInput = document.getElementById('chapter-name');

  closeAddModal?.addEventListener('click', () => {
    addModal.classList.remove('active');
  });

  cancelAddModal?.addEventListener('click', () => {
    addModal.classList.remove('active');
  });

  confirmAddChapter?.addEventListener('click', () => {
    const name = chapterNameInput.value.trim();
    if (name) {
      directoryData.push({
        id: nextId++,
        name: name,
        level: 1,
        expanded: true,
        children: []
      });
      renderTree();
      addModal.classList.remove('active');
      chapterNameInput.value = '';
      showToast('章节已添加', 'success');
    }
  });

  // ========== 重新生成面板 ==========
  const toggleRegenerate = document.getElementById('toggle-regenerate');
  const regenerateContent = document.getElementById('regenerate-content');
  const regenerateComment = document.getElementById('regenerate-comment');
  const regenerateBtn = document.getElementById('regenerate-btn');

  toggleRegenerate?.addEventListener('click', () => {
    const isCollapsed = regenerateContent.classList.toggle('collapsed');
    // 当内容折叠时，按钮旋转；当内容展开时，按钮不旋转
    if (isCollapsed) {
      toggleRegenerate.classList.add('expanded');
    } else {
      toggleRegenerate.classList.remove('expanded');
    }
  });

  regenerateComment?.addEventListener('input', () => {
    const count = regenerateComment.value.length;
    const counter = regenerateContent.querySelector('.current-count');
    if (counter) {
      counter.textContent = count;
    }
  });

  regenerateBtn?.addEventListener('click', () => {
    showToast('正在重新生成目录...', 'info');
    // 模拟重新生成
    setTimeout(() => {
      showToast('目录已重新生成', 'success');
    }, 2000);
  });

  // ========== 生成正文 ==========
  const generateContentBtn = document.getElementById('generate-content-btn');

  generateContentBtn?.addEventListener('click', () => {
    // 显示索引状态确认弹窗
    showIndexConfirmModal();
  });

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

  // ========== 初始化渲染 ==========
  renderTree();
});
