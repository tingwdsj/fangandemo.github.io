# 方案报告智写平台 - 静态页面项目

## 📁 项目结构

```
标书生成/
├── index.html                              # 首页
├── create-project.html                     # 方案创建页
├── directory-settings.html                 # 目录设置页
├── preview.html                            # 正文预览页
├── history.html                            # 历史方案库页
│
├── assets/
│   ├── css/
│   │   ├── reset.css                       # CSS重置
│   │   ├── variables.css                   # CSS变量系统
│   │   ├── components.css                  # 通用组件样式
│   │   └── pages/                          # 页面样式
│   │       ├── home.css                    # 首页样式
│   │       ├── create.css                  # 创建页样式
│   │       ├── directory.css               # 目录页样式
│   │       ├── preview.css                 # 预览页样式
│   │       └── history.css                 # 历史页样式
│   │
│   ├── js/
│   │   ├── utils.js                        # 工具函数库
│   │   ├── components.js                   # 通用组件库
│   │   └── pages/                          # 页面交互
│   │       ├── home.js                     # 首页交互
│   │       ├── create.js                   # 创建页交互
│   │       ├── directory.js                # 目录页交互
│   │       ├── preview.js                  # 预览页交互
│   │       └── history.js                  # 历史页交互
│   │
│   └── images/                             # 图片资源
│       └── icons/                          # 图标资源
│
├── CLAUDE.md                               # 项目指南
└── README.md                               # 本文档
```

## 🎨 技术栈

- **HTML5**：语义化标签
- **CSS3**：Flexbox/Grid布局、CSS变量、动画
- **JavaScript (ES6+)**：原生JS，无框架依赖

## 🎨 设计规范

### 色彩系统

- **主色调**：`#1890ff`（企业蓝）
- **辅助色**：成功 `#52c41a`、警告 `#faad14`、错误 `#f5222d`
- **中性色**：从 `#262626` 到 `#f5f5f5`

### 字体系统

- **字体**：'PingFang SC', 'Microsoft YaHei', sans-serif
- **字号**：12px ~ 24px
- **行高**：1.5 ~ 1.8

### 间距系统

- xs: 8px
- sm: 16px
- md: 24px
- lg: 32px
- xl: 48px

## 📄 页面说明

### 1. 首页 (index.html)
- **功能**：平台入口，展示核心优势
- **特点**：
  - 渐变背景
  - 涟漪动效按钮
  - 卡片式优势展示
  - 响应式布局

### 2. 方案创建页 (create-project.html)
- **功能**：创建新方案
- **特点**：
  - 手动输入/模板选择双模式
  - 文件拖拽上传
  - 实时字数统计
  - 表单本地缓存
  - 文件类型验证

### 3. 目录设置页 (directory-settings.html)
- **功能**：编辑方案目录结构
- **特点**：
  - 树形目录展示
  - 拖拽排序
  - 章节增删改
  - 层级调整
  - 折叠/展开

### 4. 正文预览页 (preview.html)
- **功能**：预览和编辑方案内容
- **特点**：
  - 左侧目录导航
  - 全文/分章节模式切换
  - 平滑滚动定位
  - 侧边栏可折叠
  - 重新生成功能

### 5. 历史方案库页 (history.html)
- **功能**：管理历史方案
- **特点**：
  - 实时搜索
  - 类型筛选
  - 时间排序
  - 分页显示
  - 批量操作
  - 侧边栏预览

## 🛠️ 使用说明

### 快速开始

1. **直接打开**：双击 `index.html` 即可在浏览器中打开

2. **本地服务器**（推荐）：
   ```bash
   # 使用 Python
   python -m http.server 8000

   # 使用 Node.js
   npx http-server

   # 使用 PHP
   php -S localhost:8000
   ```

3. **访问**：浏览器访问 `http://localhost:8000`

### 页面导航

```
首页
  ├─ → 方案创建页
  │     ├─ → 目录设置页
  │     │     └─ → 正文预览页
  │     │
  │     └─ → (完成后保存到历史)
  │
  └─ → 历史方案库
```

## 🎯 核心功能

### 文件上传
- 支持 `.doc`, `.docx`, `.pdf` 格式
- 单个文件最大 50MB
- 最多上传 20 个文件
- 拖拽上传支持

### 表单验证
- 必填项验证
- 字数限制
- 实时反馈
- 错误提示

### 数据缓存
- LocalStorage 自动保存
- 防止刷新丢失
- 支持恢复编辑

### 响应式设计
- 桌面端（≥1440px）
- 平板（768px-1439px）
- 移动端（<768px）

## 🔧 自定义配置

### 修改主题色

编辑 `assets/css/variables.css`：

```css
:root {
  --primary-color: #1890ff;    /* 修改为你想要的颜色 */
  --primary-hover: #40a9ff;
  --primary-active: #096dd9;
}
```

### 修改字体

编辑 `assets/css/variables.css`：

```css
:root {
  --font-family: 'Your Font', sans-serif;
}
```

### 修改间距

编辑 `assets/css/variables.css`：

```css
:root {
  --spacing-sm: 16px;   /* 调整为你需要的间距 */
  --spacing-md: 24px;
}
```

## 📦 通用组件

### Toast 提示

```javascript
Toast.success('操作成功');
Toast.error('操作失败');
Toast.warning('警告信息');
Toast.info('提示信息');
```

### Modal 模态框

```javascript
// 确认对话框
Modal.confirm('确定要删除吗？').then(result => {
  if (result) {
    // 用户点击了确认
  }
});

// 提示对话框
Modal.alert('这是一个提示');
```

### Dropdown 下拉菜单

```javascript
const dropdown = new Dropdown('#my-dropdown', {
  onChange: (value, text) => {
    console.log(value, text);
  }
});
```

## 🌐 浏览器兼容性

- Chrome 90+
- Edge 90+
- Firefox 88+
- Safari 14+

## 📝 开发规范

### CSS 命名规范
- 使用 BEM 命名：`.block__element--modifier`
- 使用 CSS 变量，避免硬编码
- 优先使用 Flexbox/Grid 布局

### JavaScript 规范
- 使用 const/let，避免 var
- 使用箭头函数
- 使用模板字符串
- 事件委托处理列表项

### HTML 规范
- 使用语义化标签
- 缩进：2 空格
- 属性顺序：class → id → data-*

## 🚀 未来优化

- [ ] 添加主题切换功能
- [ ] 支持国际化（i18n）
- [ ] 添加更多图表组件
- [ ] 优化移动端体验
- [ ] 添加 PWA 支持
- [ ] 集成真实后端API

## 📞 联系方式

如有问题或建议，请联系开发团队。

---

**创建日期**：2025-12-24
**版本**：v1.0
**技术栈**：HTML + CSS + JavaScript（原生）
