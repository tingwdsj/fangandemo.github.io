/**
 * 通用组件库
 */

// ========== Toast提示组件 ==========

class Toast {
  static show(message, type = 'info', duration = 2000) {
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;

    const icons = {
      success: '✓',
      error: '✕',
      warning: '!',
      info: 'i'
    };

    toast.innerHTML = `
      <span class="toast-icon">${icons[type] || icons.info}</span>
      <span class="toast-message">${message}</span>
    `;

    document.body.appendChild(toast);

    // 强制重排以触发动画
    toast.offsetHeight;
    toast.classList.add('show');

    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => toast.remove(), 300);
    }, duration);
  }

  static success(message, duration) {
    this.show(message, 'success', duration);
  }

  static error(message, duration) {
    this.show(message, 'error', duration);
  }

  static warning(message, duration) {
    this.show(message, 'warning', duration);
  }

  static info(message, duration) {
    this.show(message, 'info', duration);
  }
}

// ========== Modal模态框组件 ==========

class Modal {
  constructor(options = {}) {
    this.title = options.title || '提示';
    this.content = options.content || '';
    this.onConfirm = options.onConfirm || (() => {});
    this.onCancel = options.onCancel || (() => {});
    this.showCancel = options.showCancel !== false;
    this.confirmText = options.confirmText || '确认';
    this.cancelText = options.cancelText || '取消';
    this.width = options.width || '600px';

    this.element = null;
  }

  create() {
    const overlay = document.createElement('div');
    overlay.className = 'modal-overlay';
    overlay.innerHTML = `
      <div class="modal" style="max-width: ${this.width}">
        <div class="modal-header">
          <h3 class="modal-title">${this.title}</h3>
          <button class="btn-close">
            <svg class="icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>
        </div>
        <div class="modal-body">${this.content}</div>
        <div class="modal-footer">
          ${this.showCancel ? `<button class="btn btn-secondary modal-cancel">${this.cancelText}</button>` : ''}
          <button class="btn btn-primary modal-confirm">${this.confirmText}</button>
        </div>
      </div>
    `;

    // 绑定事件
    overlay.querySelector('.btn-close').addEventListener('click', () => this.close());
    overlay.querySelector('.modal-cancel')?.addEventListener('click', () => {
      this.onCancel();
      this.close();
    });
    overlay.querySelector('.modal-confirm').addEventListener('click', () => {
      this.onConfirm();
      this.close();
    });
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) {
        this.onCancel();
        this.close();
      }
    });

    this.element = overlay;
    return overlay;
  }

  open() {
    if (!this.element) {
      this.create();
    }
    document.body.appendChild(this.element);
    // 强制重排
    this.element.offsetHeight;
    this.element.classList.add('active');
  }

  close() {
    if (this.element) {
      this.element.classList.remove('active');
      setTimeout(() => {
        this.element.remove();
        this.element = null;
      }, 300);
    }
  }

  static alert(message, title = '提示') {
    return new Promise((resolve) => {
      const modal = new Modal({
        title,
        content: `<p>${message}</p>`,
        showCancel: false,
        onConfirm: resolve
      });
      modal.open();
    });
  }

  static confirm(message, title = '确认') {
    return new Promise((resolve) => {
      const modal = new Modal({
        title,
        content: `<p>${message}</p>`,
        onConfirm: () => resolve(true),
        onCancel: () => resolve(false)
      });
      modal.open();
    });
  }
}

// ========== Dropdown下拉菜单组件 ==========

class Dropdown {
  constructor(element, options = {}) {
    this.element = typeof element === 'string' ? document.querySelector(element) : element;
    this.trigger = options.trigger || 'click';
    this.onChange = options.onChange || (() => {});
    this.selectedValue = options.value || null;

    this.init();
  }

  init() {
    const toggle = this.element.querySelector('.dropdown-toggle');
    const items = this.element.querySelectorAll('.dropdown-item');

    // 切换下拉菜单
    toggle.addEventListener('click', (e) => {
      e.stopPropagation();
      this.element.classList.toggle('active');
    });

    // 选择项目
    items.forEach(item => {
      item.addEventListener('click', (e) => {
        e.stopPropagation();
        const value = item.dataset.value;
        const text = item.textContent;

        // 更新选中状态
        items.forEach(i => i.classList.remove('selected'));
        item.classList.add('selected');

        // 更新显示
        const valueDisplay = toggle.querySelector('.dropdown-value, .filter-value');
        if (valueDisplay) {
          valueDisplay.textContent = text;
        }

        this.selectedValue = value;
        this.onChange(value, text);

        this.close();
      });
    });

    // 点击外部关闭
    document.addEventListener('click', (e) => {
      if (!this.element.contains(e.target)) {
        this.close();
      }
    });
  }

  open() {
    this.element.classList.add('active');
  }

  close() {
    this.element.classList.remove('active');
  }

  getValue() {
    return this.selectedValue;
  }

  setValue(value) {
    const item = this.element.querySelector(`.dropdown-item[data-value="${value}"]`);
    if (item) {
      item.click();
    }
  }
}

// ========== Tabs选项卡组件 ==========

class Tabs {
  constructor(element, options = {}) {
    this.element = typeof element === 'string' ? document.querySelector(element) : element;
    this.onChange = options.onChange || (() => {});
    this.activeIndex = options.activeIndex || 0;

    this.init();
  }

  init() {
    const buttons = this.element.querySelectorAll('.tab-btn');
    const contents = this.element.querySelectorAll('.tab-content');

    // 绑定点击事件
    buttons.forEach((btn, index) => {
      btn.addEventListener('click', () => {
        this.activate(index);
      });
    });

    // 激活初始选项卡
    if (this.activeIndex > 0) {
      this.activate(this.activeIndex);
    }
  }

  activate(index) {
    const buttons = this.element.querySelectorAll('.tab-btn');
    const contents = this.element.querySelectorAll('.tab-content');

    // 移除所有active状态
    buttons.forEach(btn => btn.classList.remove('active'));
    contents.forEach(content => content.classList.remove('active'));

    // 添加active状态
    buttons[index].classList.add('active');
    contents[index]?.classList.add('active');

    this.activeIndex = index;
    this.onChange(index, buttons[index].dataset.tab);
  }

  getActiveIndex() {
    return this.activeIndex;
  }
}

// ========== Form表单组件 ==========

class Form {
  constructor(element, options = {}) {
    this.element = typeof element === 'string' ? document.querySelector(element) : element;
    this.onSubmit = options.onSubmit || (() => {});
    this.onValidate = options.onValidate || (() => true);

    this.init();
  }

  init() {
    this.element.addEventListener('submit', (e) => {
      e.preventDefault();

      if (this.validate()) {
        const data = this.getData();
        this.onSubmit(data);
      }
    });

    // 实时验证
    const inputs = this.element.querySelectorAll('input, textarea, select');
    inputs.forEach(input => {
      input.addEventListener('blur', () => {
        this.validateField(input);
      });

      input.addEventListener('input', () => {
        if (input.classList.contains('error')) {
          this.validateField(input);
        }
      });
    });
  }

  validate() {
    let isValid = true;
    const inputs = this.element.querySelectorAll('input, textarea, select');

    inputs.forEach(input => {
      if (!this.validateField(input)) {
        isValid = false;
      }
    });

    return this.onValidate(isValid);
  }

  validateField(input) {
    const value = input.value.trim();
    const required = input.hasAttribute('required');
    const maxLength = input.getAttribute('maxlength');
    const minLength = input.getAttribute('minlength');
    const pattern = input.getAttribute('pattern');

    // 必填验证
    if (required && !value) {
      this.setError(input, '此字段为必填项');
      return false;
    }

    // 长度验证
    if (value && minLength && value.length < minLength) {
      this.setError(input, `最少需要${minLength}个字符`);
      return false;
    }

    if (value && maxLength && value.length > maxLength) {
      this.setError(input, `最多允许${maxLength}个字符`);
      return false;
    }

    // 正则验证
    if (value && pattern) {
      const regex = new RegExp(pattern);
      if (!regex.test(value)) {
        this.setError(input, '格式不正确');
        return false;
      }
    }

    this.clearError(input);
    return true;
  }

  setError(input, message) {
    input.classList.add('error');

    let errorElement = input.parentElement.querySelector('.error-message');
    if (!errorElement) {
      errorElement = document.createElement('div');
      errorElement.className = 'error-message';
      input.parentElement.appendChild(errorElement);
    }
    errorElement.textContent = message;
  }

  clearError(input) {
    input.classList.remove('error');
    const errorElement = input.parentElement.querySelector('.error-message');
    if (errorElement) {
      errorElement.remove();
    }
  }

  getData() {
    const data = {};
    const inputs = this.element.querySelectorAll('input, textarea, select');

    inputs.forEach(input => {
      if (input.name) {
        data[input.name] = input.value;
      }
    });

    return data;
  }

  setData(data) {
    Object.keys(data).forEach(key => {
      const input = this.element.querySelector(`[name="${key}"]`);
      if (input) {
        input.value = data[key];
      }
    });
  }

  reset() {
    this.element.reset();
    const inputs = this.element.querySelectorAll('input, textarea, select');
    inputs.forEach(input => this.clearError(input));
  }
}

// ========== Export导出 ==========
// 如果使用模块化，可以导出这些类
// export { Toast, Modal, Dropdown, Tabs, Form };
