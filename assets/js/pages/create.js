/**
 * 方案创建页交互逻辑
 */

document.addEventListener('DOMContentLoaded', () => {
  console.log('方案创建页已加载');

  // ========== 返回主页按钮 ==========
  const btnHome = document.getElementById('btn-home');
  btnHome?.addEventListener('click', () => {
    if (confirm('确定要返回主页吗？当前进度将保存到"历史方案库"中，您可以稍后继续。')) {
      // 保存当前进度到本地存储
      window.location.href = 'index.html';
    }
  });

  // ========== 选项卡切换 ==========
  const tabBtns = document.querySelectorAll('.tab-btn');
  const tabContents = document.querySelectorAll('.tab-content');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const tabName = btn.dataset.tab;

      // 移除所有active状态
      tabBtns.forEach(b => b.classList.remove('active'));
      tabContents.forEach(c => c.classList.remove('active'));

      // 添加active状态
      btn.classList.add('active');
      document.getElementById(`${tabName}-tab`).classList.add('active');
    });
  });

  // ========== 格式示例显示/隐藏 ==========
  const showExampleBtn = document.getElementById('show-example');
  const formatExample = document.getElementById('format-example');

  showExampleBtn?.addEventListener('click', () => {
    const icon = showExampleBtn.querySelector('.icon');
    if (formatExample.style.display === 'none') {
      formatExample.style.display = 'block';
      showExampleBtn.childNodes[2].textContent = ' 收起示例';
      icon.style.transform = 'rotate(180deg)';
    } else {
      formatExample.style.display = 'none';
      showExampleBtn.childNodes[2].textContent = ' 格式示例';
      icon.style.transform = 'rotate(0deg)';
    }
  });

  // ========== 模板目录数据 ==========
  const templateDirectories = {
    tech: `1. 项目概述
    1.1 项目背景
        1.1.1 行业现状
        1.1.2 技术发展趋势
    1.2 项目目标
    1.3 项目意义
2. 技术方案
    2.1 技术架构
        2.1.1 总体架构
        2.1.2 技术选型
    2.2 核心技术
    2.3 系统设计
        2.3.1 功能设计
        2.3.2 接口设计
3. 实施方案
    3.1 实施步骤
    3.2 进度安排
    3.3 资源配置
4. 技术保障
    4.1 质量控制
    4.2 风险管理
    4.3 售后服务`,

    engineering: `1. 项目概况
    1.1 项目背景
    1.2 建设规模
    1.3 建设地点
2. 工程方案
    2.1 总体规划
    2.2 设计方案
        2.2.1 建筑设计
        2.2.2 结构设计
        2.2.3 设备配置
    2.3 施工方案
        2.3.1 施工组织
        2.3.2 施工工艺
3. 实施计划
    3.1 施工进度
    3.2 人员配置
    3.3 材料供应
4. 质量安全
    4.1 质量保证措施
    4.2 安全管理措施
    4.3 环境保护措施`,

    service: `1. 服务概述
    1.1 服务背景
    1.2 服务目标
    1.3 服务范围
2. 服务内容
    2.1 核心服务
        2.1.1 咨询服务
        2.1.2 培训服务
    2.2 增值服务
    2.3 定制化服务
3. 服务方案
    3.1 服务流程
    3.2 服务团队
    3.3 服务标准
4. 服务保障
    4.1 质量保障
    4.2 时间保障
    4.3 响应机制`,

    comprehensive: `1. 项目总述
    1.1 项目背景
    1.2 项目目标
    1.3 项目范围
2. 方案设计
    2.1 整体方案
    2.2 技术方案
        2.2.1 技术架构
        2.2.2 功能模块
    2.3 实施方案
        2.3.1 实施步骤
        2.3.2 时间安排
    2.4 运营方案
        2.4.1 运营模式
        2.4.2 管理体系
3. 资源配置
    3.1 人力资源
    3.2 物资资源
    3.3 财务预算
4. 风险管控
    4.1 风险识别
    4.2 风险评估
    4.3 应对措施
5. 效益分析
    5.1 经济效益
    5.2 社会效益
    5.3 环境效益`
  };

  // ========== 模板选择 ==========
  const templateCards = document.querySelectorAll('.template-card');
  const templatePreview = document.getElementById('template-preview');
  const templateDirectory = document.getElementById('template-directory');

  templateCards.forEach(card => {
    card.addEventListener('click', () => {
      // 移除其他卡片的选中状态
      templateCards.forEach(c => c.classList.remove('selected'));
      // 选中当前卡片
      card.classList.add('selected');

      // 获取模板类型
      const templateType = card.dataset.template;

      // 显示对应的目录结构
      if (templateDirectories[templateType]) {
        templateDirectory.textContent = templateDirectories[templateType];
        templatePreview.style.display = 'block';

        // 滚动到预览区域
        setTimeout(() => {
          templatePreview.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }, 100);
      }
    });
  });

  // ========== 字数统计 ==========
  const inputs = [
    { id: 'project-name', max: 256 },
    { id: 'project-type', max: 48 },
    { id: 'requirements', max: 2000 }
  ];

  inputs.forEach(config => {
    const input = document.getElementById(config.id);
    const counter = input?.parentElement?.querySelector('.current-count');

    input?.addEventListener('input', () => {
      const count = input.value.length;
      if (counter) {
        counter.textContent = count;

        // 根据字数改变颜色
        counter.classList.remove('warning', 'error');
        if (count >= config.max) {
          counter.classList.add('error');
        } else if (count >= config.max * 0.9) {
          counter.classList.add('warning');
        }
      }
    });
  });

  // ========== 文件上传 ==========
  const uploadArea = document.getElementById('upload-area');
  const fileInput = document.getElementById('file-input');
  const fileList = document.getElementById('file-list');
  let uploadedFiles = [];

  // 点击上传区域
  uploadArea?.addEventListener('click', () => {
    fileInput.click();
  });

  // 文件选择
  fileInput?.addEventListener('change', (e) => {
    handleFiles(e.target.files);
  });

  // 拖拽上传
  uploadArea?.addEventListener('dragover', (e) => {
    e.preventDefault();
    uploadArea.classList.add('drag-over');
  });

  uploadArea?.addEventListener('dragleave', () => {
    uploadArea.classList.remove('drag-over');
  });

  uploadArea?.addEventListener('drop', (e) => {
    e.preventDefault();
    uploadArea.classList.remove('drag-over');
    handleFiles(e.dataTransfer.files);
  });

  // 处理文件
  function handleFiles(files) {
    const maxSize = 50 * 1024 * 1024; // 50MB
    const allowedTypes = ['.doc', '.docx', '.pdf'];
    const maxFiles = 20;

    // 检查文件数量
    if (uploadedFiles.length + files.length > maxFiles) {
      showToast('最多只能上传20个文件', 'warning');
      return;
    }

    Array.from(files).forEach(file => {
      // 检查文件类型
      const fileExt = '.' + file.name.split('.').pop().toLowerCase();
      if (!allowedTypes.includes(fileExt)) {
        showToast(`不支持的文件类型：${file.name}`, 'error');
        return;
      }

      // 检查文件大小
      if (file.size > maxSize) {
        showToast(`文件大小超过50MB：${file.name}`, 'error');
        return;
      }

      // 检查是否重复
      if (uploadedFiles.some(f => f.name === file.name)) {
        showToast(`文件已存在：${file.name}`, 'warning');
        return;
      }

      // 添加到列表
      uploadedFiles.push(file);
      renderFileItem(file);
    });
  }

  // 渲染文件项
  function renderFileItem(file) {
    const fileSize = formatFileSize(file.size);
    const fileIcon = getFileIcon(file.name);

    const fileItem = document.createElement('div');
    fileItem.className = 'file-item';
    fileItem.innerHTML = `
      <div class="file-icon">${fileIcon}</div>
      <div class="file-info">
        <div class="file-name">${file.name}</div>
        <div class="file-size">${fileSize}</div>
      </div>
      <div class="file-delete" data-name="${file.name}">
        <svg class="icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </div>
    `;

    // 删除按钮
    fileItem.querySelector('.file-delete').addEventListener('click', (e) => {
      e.stopPropagation();
      uploadedFiles = uploadedFiles.filter(f => f.name !== file.name);
      fileItem.remove();
    });

    fileList.appendChild(fileItem);
  }

  // 格式化文件大小
  function formatFileSize(bytes) {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  }

  // 获取文件图标
  function getFileIcon(filename) {
    const ext = filename.split('.').pop().toLowerCase();
    const icons = {
      'pdf': '📄',
      'doc': '📝',
      'docx': '📝'
    };
    return icons[ext] || '📄';
  }

  // ========== 表单验证 ==========
  const generateBtn = document.getElementById('generate-directory-btn');
  const confirmModal = document.getElementById('confirm-modal');
  const closeModalBtn = document.getElementById('close-modal');
  const cancelModalBtn = document.getElementById('cancel-modal');
  const confirmGenerateBtn = document.getElementById('confirm-generate');

  generateBtn?.addEventListener('click', () => {
    // 验证必填项
    const projectName = document.getElementById('project-name').value.trim();
    const directoryInput = document.querySelector('.directory-input').value.trim();
    const selectedTemplate = document.querySelector('.template-card.selected');

    // 检查是否选择了目录输入方式
    const hasManualInput = directoryInput.length > 0;
    const hasTemplate = selectedTemplate !== null;

    if (!hasManualInput && !hasTemplate) {
      showToast('请选择目录输入方式（手动输入或选择模板）', 'warning');
      return;
    }

    if (!projectName) {
      showToast('请输入方案名称', 'warning');
      document.getElementById('project-name').focus();
      return;
    }

    if (uploadedFiles.length === 0) {
      showToast('请上传至少一个参考文件', 'warning');
      return;
    }

    // 如果选择了模板，将模板目录填充到textarea中
    if (hasTemplate && !hasManualInput) {
      const templateType = selectedTemplate.dataset.template;
      const directoryInput = document.querySelector('.directory-input');
      if (templateDirectories[templateType]) {
        directoryInput.value = templateDirectories[templateType];
      }
    }

    // 显示确认对话框
    confirmModal.classList.add('active');
  });

  // 关闭模态框
  closeModalBtn?.addEventListener('click', () => {
    confirmModal.classList.remove('active');
  });

  cancelModalBtn?.addEventListener('click', () => {
    confirmModal.classList.remove('active');
  });

  // 点击遮罩关闭
  confirmModal?.addEventListener('click', (e) => {
    if (e.target === confirmModal) {
      confirmModal.classList.remove('active');
    }
  });

  // 确认生成
  confirmGenerateBtn?.addEventListener('click', () => {
    confirmModal.classList.remove('active');

    // 显示生成中状态
    generateBtn.disabled = true;
    generateBtn.innerHTML = `
      <span class="spinner"></span>
      生成中...
    `;

    // 模拟生成过程
    setTimeout(() => {
      showToast('目录生成成功！', 'success');
      // 跳转到目录设置页
      setTimeout(() => {
        window.location.href = 'directory-settings.html';
      }, 1000);
    }, 2000);
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
    }, 3000);
  }

  // ========== 本地存储自动保存 ==========
  const formInputs = document.querySelectorAll('.input, .textarea');

  // 加载保存的数据
  formInputs.forEach(input => {
    const savedValue = localStorage.getItem(`create-form-${input.id}`);
    if (savedValue) {
      input.value = savedValue;
      // 触发input事件以更新字数统计
      input.dispatchEvent(new Event('input'));
    }
  });

  // 自动保存
  let saveTimeout;
  formInputs.forEach(input => {
    input.addEventListener('input', () => {
      clearTimeout(saveTimeout);
      saveTimeout = setTimeout(() => {
        localStorage.setItem(`create-form-${input.id}`, input.value);
      }, 500);
    });
  });
});
