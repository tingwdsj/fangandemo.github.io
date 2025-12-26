/**
 * 通用工具函数库
 */

// ========== DOM工具 ==========

/**
 * 根据选择器查找元素
 * @param {string} selector - CSS选择器
 * @param {HTMLElement} parent - 父元素
 * @returns {HTMLElement|null}
 */
function $(selector, parent = document) {
  return parent.querySelector(selector);
}

/**
 * 根据选择器查找所有元素
 * @param {string} selector - CSS选择器
 * @param {HTMLElement} parent - 父元素
 * @returns {NodeList}
 function $$(selector, parent = document) {
  return parent.querySelectorAll(selector);
}

// ========== 字符串工具 ==========

/**
 * 格式化文件大小
 * @param {number} bytes - 字节数
 * @returns {string}
 */
function formatFileSize(bytes) {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
}

/**
 * 截断字符串
 * @param {string} str - 原字符串
 * @param {number} length - 最大长度
 * @param {string} suffix - 后缀
 * @returns {string}
 */
function truncate(str, length, suffix = '...') {
  if (str.length <= length) return str;
  return str.substring(0, length) + suffix;
}

/**
 * 转换HTML实体
 * @param {string} str - 原字符串
 * @returns {string}
 */
function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

// ========== 时间工具 ==========

/**
 * 格式化日期
 * @param {Date|string|number} date - 日期
 * @param {string} format - 格式
 * @returns {string}
 */
function formatDate(date, format = 'YYYY-MM-DD HH:mm') {
  const d = new Date(date);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  const hours = String(d.getHours()).padStart(2, '0');
  const minutes = String(d.getMinutes()).padStart(2, '0');
  const seconds = String(d.getSeconds()).padStart(2, '0');

  return format
    .replace('YYYY', year)
    .replace('MM', month)
    .replace('DD', day)
    .replace('HH', hours)
    .replace('mm', minutes)
    .replace('ss', seconds);
}

/**
 * 获取相对时间
 * @param {Date|string|number} date - 日期
 * @returns {string}
 */
function getRelativeTime(date) {
  const d = new Date(date);
  const now = new Date();
  const diff = now - d;

  const minute = 60 * 1000;
  const hour = 60 * minute;
  const day = 24 * hour;

  if (diff < minute) return '刚刚';
  if (diff < hour) return Math.floor(diff / minute) + '分钟前';
  if (diff < day) return Math.floor(diff / hour) + '小时前';
  if (diff < 7 * day) return Math.floor(diff / day) + '天前';

  return formatDate(date, 'YYYY-MM-DD');
}

// ========== 数组工具 ==========

/**
 * 数组去重
 * @param {Array} arr - 原数组
 * @returns {Array}
 */
function unique(arr) {
  return [...new Set(arr)];
}

/**
 * 数组分组
 * @param {Array} arr - 原数组
 * @param {string|Function} key - 分组键
 * @returns {Object}
 */
function groupBy(arr, key) {
  return arr.reduce((result, item) => {
    const groupKey = typeof key === 'function' ? key(item) : item[key];
    if (!result[groupKey]) {
      result[groupKey] = [];
    }
    result[groupKey].push(item);
    return result;
  }, {});
}

/**
 * 数组排序
 * @param {Array} arr - 原数组
 * @param {string} key - 排序键
 * @param {string} order - 排序方向 asc/desc
 * @returns {Array}
 */
function sortBy(arr, key, order = 'asc') {
  return [...arr].sort((a, b) => {
    const aVal = a[key];
    const bVal = b[key];

    if (aVal < bVal) return order === 'asc' ? -1 : 1;
    if (aVal > bVal) return order === 'asc' ? 1 : -1;
    return 0;
  });
}

// ========== 对象工具 ==========

/**
 * 深拷贝
 * @param {*} obj - 原对象
 * @returns {*}
 */
function deepClone(obj) {
  if (obj === null || typeof obj !== 'object') return obj;
  if (obj instanceof Date) return new Date(obj);
  if (obj instanceof Array) return obj.map(item => deepClone(item));

  const clonedObj = {};
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      clonedObj[key] = deepClone(obj[key]);
    }
  }
  return clonedObj;
}

/**
 * 对象合并
 * @param {Object} target - 目标对象
 * @param {...Object} sources - 源对象
 * @returns {Object}
 */
function merge(target, ...sources) {
  return Object.assign(target, ...sources);
}

// ========== 存储工具 ==========

/**
 * 设置本地存储
 * @param {string} key - 键
 * @param {*} value - 值
 */
function setStorage(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.error('存储失败:', e);
  }
}

/**
 * 获取本地存储
 * @param {string} key - 键
 * @param {*} defaultValue - 默认值
 * @returns {*}
 */
function getStorage(key, defaultValue = null) {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : defaultValue;
  } catch (e) {
    console.error('读取失败:', e);
    return defaultValue;
  }
}

/**
 * 删除本地存储
 * @param {string} key - 键
 */
function removeStorage(key) {
  try {
    localStorage.removeItem(key);
  } catch (e) {
    console.error('删除失败:', e);
  }
}

// ========== URL工具 ==========

/**
 * 获取URL参数
 * @param {string} name - 参数名
 * @param {string} url - URL
 * @returns {string|null}
 */
function getUrlParam(name, url = window.location.href) {
  const regex = new RegExp('[?&]' + name + '=([^&#]*)', 'i');
  const match = regex.exec(url);
  return match ? decodeURIComponent(match[1]) : null;
}

/**
 * 设置URL参数
 * @param {string} name - 参数名
 * @param {string} value - 参数值
 * @param {string} url - URL
 * @returns {string}
 */
function setUrlParam(name, value, url = window.location.href) {
  const regex = new RegExp('([?&])' + name + '=[^&#]*', 'i');
  const separator = url.indexOf('?') !== -1 ? '&' : '?';

  if (regex.test(url)) {
    return url.replace(regex, '$1' + name + '=' + encodeURIComponent(value));
  }

  return url + separator + name + '=' + encodeURIComponent(value);
}

// ========== 验证工具 ==========

/**
 * 验证邮箱
 * @param {string} email - 邮箱地址
 * @returns {boolean}
 */
function isEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

/**
 * 验证手机号
 * @param {string} phone - 手机号
 * @returns {boolean}
 */
function isPhone(phone) {
  const regex = /^1[3-9]\d{9}$/;
  return regex.test(phone);
}

/**
 * 验证身份证号
 * @param {string} id - 身份证号
 * @returns {boolean}
 */
function isIdCard(id) {
  const regex = /^[1-9]\d{5}(18|19|20)\d{2}(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])\d{3}[\dXx]$/;
  return regex.test(id);
}

// ========== 防抖节流 ==========

/**
 * 防抖
 * @param {Function} func - 函数
 * @param {number} delay - 延迟时间
 * @returns {Function}
 */
function debounce(func, delay = 300) {
  let timeoutId;
  return function (...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
}

/**
 * 节流
 * @param {Function} func - 函数
 * @param {number} interval - 间隔时间
 * @returns {Function}
 */
function throttle(func, interval = 300) {
  let lastTime = 0;
  return function (...args) {
    const now = Date.now();
    if (now - lastTime >= interval) {
      lastTime = now;
      func.apply(this, args);
    }
  };
}

// ========== 导出 ==========
// 如果使用模块化，可以导出这些函数
// export { $, $$, formatFileSize, formatDate, debounce, throttle, ... };
