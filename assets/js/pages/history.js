/**
 * 历史方案库页交互逻辑
 */

document.addEventListener('DOMContentLoaded', () => {
  console.log('历史方案库页已加载');

  // ========== 模拟数据 ==========
  const projects = [
    {
      id: 1,
      name: '智慧城市技术方案',
      createTime: '2025-12-24 15:30',
      status: 'completed'
    },
    {
      id: 2,
      name: '企业管理咨询方案',
      createTime: '2025-12-24 14:15',
      status: 'generating'
    },
    {
      id: 3,
      name: '工程项目实施方案',
      createTime: '2025-12-23 16:45',
      status: 'failed'
    },
    {
      id: 4,
      name: '综合园区规划方案',
      createTime: '2025-12-23 10:20',
      status: 'completed'
    },
    {
      id: 5,
      name: '信息化系统建设方案',
      createTime: '2025-12-22 11:30',
      status: 'generating'
    },
    {
      id: 6,
      name: '智慧交通管理系统',
      createTime: '2025-12-21 09:15',
      status: 'completed'
    },
    {
      id: 7,
      name: '智能制造升级方案',
      createTime: '2025-12-20 15:50',
      status: 'failed'
    }
  ];

  let currentPage = 1;
  const pageSize = 10;
  let filteredProjects = [...projects];
  let currentStatusFilter = 'all'; // all, completed, generating
  let currentTimeSort = 'newest'; // newest, oldest

  // ========== 渲染方案列表 ==========
  function renderProjects() {
    const projectList = document.getElementById('project-list');
    const emptyState = document.getElementById('empty-state');
    const pagination = document.getElementById('pagination');

    if (filteredProjects.length === 0) {
      projectList.style.display = 'none';
      pagination.style.display = 'none';
      emptyState.style.display = 'block';
      return;
    }

    projectList.style.display = 'grid';
    emptyState.style.display = 'none';
    pagination.style.display = 'flex';

    projectList.innerHTML = '';

    filteredProjects.forEach(project => {
      const card = createProjectCard(project);
      projectList.appendChild(card);
    });

    renderPagination();
  }

  function createProjectCard(project) {
    const card = document.createElement('div');
    card.className = `project-card`;
    card.style.cursor = 'pointer';

    let statusText = '';
    let actionsHtml = '';

    if (project.status === 'completed') {
      statusText = '已完成';
      actionsHtml = `
        <button class="action-btn preview" data-id="${project.id}">
          <svg class="icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1 12S5 4 12 4S23 12 23 12S19 20 12 20S1 12 1 12Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <circle cx="12" cy="12" r="3" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          预览
        </button>
        <button class="action-btn download" data-id="${project.id}">
          <svg class="icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M21 15V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V15" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M7 10L12 15L17 10" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M12 15V3" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          下载
        </button>
        <button class="action-btn delete" data-id="${project.id}">
          <svg class="icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3 6H5H21" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M8 6V4C8 3.46957 8.21071 2.96086 8.58579 2.58579C8.96086 2.21071 9.46957 2 10 2H14C14.5304 2 15.0391 2.21071 15.4142 2.58579C15.7893 2.96086 16 3.46957 16 4V6M19 6V20C19 20.5304 18.7893 21 18.4142 21.4142C18.0391 21.7893 17.5304 22 17 22H7C6.46957 22 5.96086 21.7893 5.58579 21.4142C5.21071 21.0391 5 20.5304 5 20V6H19Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          删除
        </button>
      `;
    } else if (project.status === 'generating') {
      statusText = '生成中...';
      actionsHtml = `
        <button class="action-btn continue" data-id="${project.id}">
          <svg class="icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          继续
        </button>
        <button class="action-btn delete" data-id="${project.id}">
          <svg class="icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3 6H5H21" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M8 6V4C8 3.46957 8.21071 2.96086 8.58579 2.58579C8.96086 2.21071 9.46957 2 10 2H14C14.5304 2 15.0391 2.21071 15.4142 2.58579C15.7893 2.96086 16 3.46957 16 4V6M19 6V20C19 20.5304 18.7893 21 18.4142 21.4142C18.0391 21.7893 17.5304 22 17 22H7C6.46957 22 5.96086 21.7893 5.58579 21.4142C5.21071 21.0391 5 20.5304 5 20V6H19Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          删除
        </button>
      `;
    } else if (project.status === 'failed') {
      statusText = '生成失败';
      actionsHtml = `
        <button class="action-btn retry" data-id="${project.id}">
          <svg class="icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1 4V10H7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M23 20V14H17" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M20.49 9C19.9828 7.56678 19.1209 6.28542 17.9845 5.27542C16.8482 4.26541 15.4745 3.55976 13.9917 3.22426C12.5089 2.88875 10.9652 2.93434 9.50481 3.35677C8.04437 3.77921 6.71475 4.56471 5.64 5.64L1 10M23 14L18.36 18.36C17.2853 19.4353 15.9556 20.2208 14.4952 20.6432C13.0348 21.0657 11.4911 21.1112 10.0083 20.7757C8.52547 20.4402 7.1518 19.7346 6.01547 18.7246C4.87913 17.7146 4.01717 16.4332 3.51 15" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          重试
        </button>
        <button class="action-btn delete" data-id="${project.id}">
          <svg class="icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3 6H5H21" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M8 6V4C8 3.46957 8.21071 2.96086 8.58579 2.58579C8.96086 2.21071 9.46957 2 10 2H14C14.5304 2 15.0391 2.21071 15.4142 2.58579C15.7893 2.96086 16 3.46957 16 4V6M19 6V20C19 20.5304 18.7893 21 18.4142 21.4142C18.0391 21.7893 17.5304 22 17 22H7C6.46957 22 5.96086 21.7893 5.58579 21.4142C5.21071 21.0391 5 20.5304 5 20V6H19Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          删除
        </button>
      `;
    }

    card.innerHTML = `
      <div class="project-info">
        <div class="project-name">${project.name}</div>
        <div class="project-meta">
          <span class="project-time">${project.createTime}</span>
          <span class="project-status status-${project.status}">${statusText}</span>
        </div>
      </div>
      <div class="project-actions">
        ${actionsHtml}
      </div>
    `;

    // 绑定事件 - 整个卡片可点击
    card.addEventListener('click', (e) => {
      // 如果点击的是按钮，不触发卡片点击
      if (e.target.closest('.action-btn')) {
        return;
      }
      // 根据状态跳转
      if (project.status === 'completed') {
        window.location.href = 'preview.html';
      } else if (project.status === 'generating') {
        window.location.href = 'create-project.html';
      }
    });

    // 绑定按钮事件
    const previewBtn = card.querySelector('.action-btn.preview');
    const downloadBtn = card.querySelector('.action-btn.download');
    const continueBtn = card.querySelector('.action-btn.continue');
    const retryBtn = card.querySelector('.action-btn.retry');
    const deleteBtn = card.querySelector('.action-btn.delete');

    previewBtn?.addEventListener('click', (e) => {
      e.stopPropagation();
      openPreview(project);
    });
    downloadBtn?.addEventListener('click', (e) => {
      e.stopPropagation();
      downloadProject(project);
    });
    continueBtn?.addEventListener('click', (e) => {
      e.stopPropagation();
      showToast('正在跳转到方案编辑页面...', 'info');
      setTimeout(() => {
        window.location.href = 'create-project.html';
      }, 500);
    });
    retryBtn?.addEventListener('click', (e) => {
      e.stopPropagation();
      showToast('正在重新生成方案...', 'info');
      setTimeout(() => {
        window.location.href = 'create-project.html';
      }, 500);
    });
    deleteBtn?.addEventListener('click', (e) => {
      e.stopPropagation();
      confirmDelete(project);
    });

    return card;
  }

  // ========== 分页 ==========
  function renderPagination() {
    const pageNumbers = document.getElementById('page-numbers');
    const prevPage = document.getElementById('prev-page');
    const nextPage = document.getElementById('next-page');

    pageNumbers.innerHTML = '';

    for (let i = 1; i <= Math.ceil(filteredProjects.length / pageSize); i++) {
      const pageNumber = document.createElement('button');
      pageNumber.className = `page-number ${i === currentPage ? 'active' : ''}`;
      pageNumber.textContent = i;
      pageNumber.addEventListener('click', () => {
        currentPage = i;
        renderPagination();
        renderProjects();
      });
      pageNumbers.appendChild(pageNumber);
    }

    prevPage.disabled = currentPage === 1;
    nextPage.disabled = currentPage === Math.ceil(filteredProjects.length / pageSize);

    prevPage.onclick = () => {
      if (currentPage > 1) {
        currentPage--;
        renderPagination();
        renderProjects();
      }
    };

    nextPage.onclick = () => {
      if (currentPage < Math.ceil(filteredProjects.length / pageSize)) {
        currentPage++;
        renderPagination();
        renderProjects();
      }
    };
  }

  // ========== 搜索功能 ==========
  const searchInput = document.getElementById('search-input');
  const btnClear = document.getElementById('btn-clear');
  let searchTimeout;

  searchInput?.addEventListener('input', () => {
    const value = searchInput.value.trim();
    btnClear.style.display = value ? 'flex' : 'none';

    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(() => {
      filterProjects(value);
    }, 300);
  });

  btnClear?.addEventListener('click', () => {
    searchInput.value = '';
    btnClear.style.display = 'none';
    filterProjects('');
  });

  function filterProjects(searchTerm = '') {
    // 先按状态筛选
    filteredProjects = projects.filter(project => {
      // 状态筛选
      const statusMatch = currentStatusFilter === 'all' || project.status === currentStatusFilter;

      // 搜索词筛选
      const searchMatch = !searchTerm || project.name.toLowerCase().includes(searchTerm.toLowerCase());

      return statusMatch && searchMatch;
    });

    // 按时间排序
    filteredProjects.sort((a, b) => {
      const dateA = new Date(a.createTime);
      const dateB = new Date(b.createTime);

      if (currentTimeSort === 'newest') {
        return dateB - dateA; // 最新优先
      } else {
        return dateA - dateB; // 最早优先
      }
    });

    currentPage = 1;
    renderProjects();
  }

  // ========== 筛选功能 ==========
  const statusFilter = document.getElementById('status-filter');
  const timeFilter = document.getElementById('time-filter');

  statusFilter?.querySelector('.dropdown-toggle')?.addEventListener('click', () => {
    statusFilter.classList.toggle('active');
  });

  timeFilter?.querySelector('.dropdown-toggle')?.addEventListener('click', () => {
    timeFilter.classList.toggle('active');
  });

  statusFilter?.querySelectorAll('.dropdown-item').forEach(item => {
    item.addEventListener('click', () => {
      statusFilter.querySelector('.filter-value').textContent = item.textContent;
      statusFilter.classList.remove('active');
      statusFilter.querySelectorAll('.dropdown-item').forEach(i => i.classList.remove('selected'));
      item.classList.add('selected');

      // 更新状态筛选
      currentStatusFilter = item.dataset.value;
      filterProjects(searchInput.value.trim());
    });
  });

  timeFilter?.querySelectorAll('.dropdown-item').forEach(item => {
    item.addEventListener('click', () => {
      timeFilter.querySelector('.filter-value').textContent = item.textContent;
      timeFilter.classList.remove('active');
      timeFilter.querySelectorAll('.dropdown-item').forEach(i => i.classList.remove('selected'));
      item.classList.add('selected');

      // 更新时间排序
      currentTimeSort = item.dataset.value;
      filterProjects(searchInput.value.trim());
    });
  });

  // 点击外部关闭下拉菜单
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.filter-dropdown')) {
      statusFilter?.classList.remove('active');
      timeFilter?.classList.remove('active');
    }
  });

  // ========== 预览功能 ==========
  function openPreview(project) {
    const previewSidebar = document.getElementById('preview-sidebar');
    const previewContent = document.getElementById('preview-content');

    previewContent.innerHTML = `
      <div class="document-content" style="max-width: 100%; padding: 0;">
        <h2 style="font-size: 20px; margin-bottom: 16px;">${project.name}</h2>
        <p style="color: var(--text-tertiary); margin-bottom: 24px;">创建时间：${project.createTime}</p>
        <div style="background: var(--bg-light); padding: 24px; border-radius: 8px;">
          <p>这里是方案的预览内容...</p>
        </div>
      </div>
    `;

    previewSidebar.classList.add('active');
  }

  document.getElementById('close-preview')?.addEventListener('click', () => {
    document.getElementById('preview-sidebar').classList.remove('active');
  });

  // ESC关闭预览
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      document.getElementById('preview-sidebar')?.classList.remove('active');
    }
  });

  // ========== 下载功能 ==========
  function downloadProject(project) {
    showToast(`正在下载《${project.name}》`, 'info');
    setTimeout(() => {
      showToast('下载已开始', 'success');
    }, 1000);
  }

  // ========== 删除功能 ==========
  let projectToDelete = null;
  const deleteModal = document.getElementById('delete-modal');
  const deleteMessage = document.getElementById('delete-message');

  function confirmDelete(project) {
    projectToDelete = project;
    deleteMessage.textContent = `确定要删除《${project.name}》吗？删除后不可恢复。`;
    deleteModal.classList.add('active');
  }

  document.getElementById('cancel-delete')?.addEventListener('click', () => {
    deleteModal.classList.remove('active');
    projectToDelete = null;
  });

  document.getElementById('confirm-delete')?.addEventListener('click', () => {
    if (projectToDelete) {
      const index = projects.findIndex(p => p.id === projectToDelete.id);
      if (index > -1) {
        projects.splice(index, 1);
        showToast('已删除', 'success');
        filterProjects(searchInput.value.trim());
      }
    }
    deleteModal.classList.remove('active');
    projectToDelete = null;
  });

  deleteModal?.addEventListener('click', (e) => {
    if (e.target === deleteModal) {
      deleteModal.classList.remove('active');
      projectToDelete = null;
    }
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

  // ========== 初始化 ==========
  renderProjects();
});
