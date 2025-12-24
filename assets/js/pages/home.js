/**
 * 首页交互逻辑
 */

document.addEventListener('DOMContentLoaded', () => {
  console.log('首页已加载');

  // ========== 用户中心 ==========
  const loginSection = document.getElementById('login-section');
  const userSection = document.getElementById('user-section');
  const loginBtn = document.getElementById('login-btn');
  const userDropdown = document.getElementById('user-dropdown');
  const userTrigger = document.getElementById('user-trigger');
  const userName = document.getElementById('user-name');
  const logoutBtn = document.getElementById('logout-btn');

  // 检查登录状态
  function checkLoginStatus() {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const savedUserName = localStorage.getItem('userName') || '用户';

    if (isLoggedIn) {
      // 显示已登录状态
      loginSection.style.display = 'none';
      userSection.style.display = 'flex';
      userName.textContent = savedUserName;
    } else {
      // 显示未登录状态
      loginSection.style.display = 'flex';
      userSection.style.display = 'none';
    }
  }

  // 登录功能
  loginBtn?.addEventListener('click', () => {
    // 模拟登录 - 这里可以替换为实际的登录逻辑
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('userName', '演示用户');

    showToast('登录成功', 'success');
    checkLoginStatus();
  });

  // 切换用户下拉菜单
  userTrigger?.addEventListener('click', (e) => {
    e.stopPropagation();
    userDropdown.classList.toggle('active');
  });

  // 退出登录
  logoutBtn?.addEventListener('click', () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userName');

    userDropdown.classList.remove('active');
    showToast('已退出登录', 'info');
    checkLoginStatus();
  });

  // 点击外部关闭下拉菜单
  document.addEventListener('click', (e) => {
    if (!userDropdown?.contains(e.target)) {
      userDropdown?.classList.remove('active');
    }
  });

  // 初始化登录状态
  checkLoginStatus();

  // 按钮点击动画效果
  const buttons = document.querySelectorAll('.btn');

  buttons.forEach(button => {
    button.addEventListener('click', function(e) {
      // 涟漪效果
      const ripple = document.createElement('span');
      const rect = this.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;

      ripple.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        left: ${x}px;
        top: ${y}px;
        background: rgba(255, 255, 255, 0.3);
        border-radius: 50%;
        transform: scale(0);
        animation: ripple 0.6s ease-out;
        pointer-events: none;
      `;

      this.style.position = 'relative';
      this.style.overflow = 'hidden';
      this.appendChild(ripple);

      setTimeout(() => ripple.remove(), 600);
    });
  });

  // 添加涟漪动画
  const style = document.createElement('style');
  style.textContent = `
    @keyframes ripple {
      to {
        transform: scale(4);
        opacity: 0;
      }
    }
  `;
  document.head.appendChild(style);
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

// 按钮悬停音效（可选）
function playHoverSound() {
  // 可以在这里添加悬停音效
  // const audio = new Audio('path/to/hover-sound.mp3');
  // audio.play();
}
