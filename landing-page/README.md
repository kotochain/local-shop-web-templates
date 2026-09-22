# 企业 / 工作室官网落地页模板

一套模板，5 个行业版本（装修 / 律所 / 摄影 / 培训 / 餐饮）。纯前端静态页面，无后端、无数据库，表单只做前端校验与提示。

## 快速开始

```bash
npm install     # 安装依赖
npm run dev     # 本地预览，默认 http://localhost:5173
npm run build   # 打包，产物在 dist/
npm run preview # 本地预览打包产物
```

## 5 个行业版本怎么切

页面右上角有一个小切换器（电脑端是按钮组，手机端是下拉框），点击即可切换，地址栏会同步变化。也可以直接改网址：

| 行业 | 访问地址 | 主色 |
| --- | --- | --- |
| 装修装饰 | `?industry=renovation` | `#A9643B` 大地暖棕 |
| 律师事务所 | `?industry=law` | `#1B2A4A` 深藏青 + 金 |
| 摄影工作室 | `?industry=photography` | `#1A1A1A` 高级黑白灰 |
| 培训机构 | `?industry=training` | `#2563EB` 活力蓝 |
| 餐饮门店 | `?industry=restaurant` | `#C0392B` 暖番茄红 |

首页默认 `renovation`（装修公司）版本。

## 换成客户自己的内容（只改一个文件）

打开 `src/config/industries.js`，找到对应行业的对象，改这些字段即可，**不用动任何组件代码**：

- `companyName` 公司 / 门店名
- `slogan` 首屏大标题（一句话价值主张）
- `heroSub` 首屏副标题
- `trustBadges` 首屏信任标签（建议 4 个）
- `services` 服务项目（4 个，`emoji` 可直接换图标）
- `cases` 案例展示（6 个）
- `testimonials` 客户评价（3 条）
- `contact` 电话 / 微信 / 地址 / 营业执照号
- `theme` 配色（9 个色值，改完整站立即变色）

想新增第 6 个行业：复制一个对象，改掉 `id` / `short`，放进文件末尾的 `industries` 数组里就行。

## 换真实图片

页面里所有图片目前都是**占位图**（CSS 渐变色块），已在图上标注建议尺寸，替换方式：

| 位置 | 文件 | 建议尺寸 |
| --- | --- | --- |
| 首屏主视觉 | `src/components/Hero.jsx` | 1600 × 1200 |
| 案例展示（6 张） | `src/components/Cases.jsx` | 800 × 600 |

替换时把 `placeholder-art` 这个 class 所在的 `div` 换成 `<img src="..." className="h-full w-full object-cover" />` 即可。

## 目录结构

```
landing-page/
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
└── src/
    ├── main.jsx                  入口
    ├── App.jsx                   页面组装 + 滚动定位
    ├── index.css                 全局样式 + CSS 变量默认值
    ├── config/industries.js      5 套行业文案 + 配色（改这里）
    ├── hooks/useIndustry.js      读 ?industry= 并注入 CSS 变量
    ├── utils/validate.js         表单校验（手机号 / 必填）
    └── components/
        ├── Navbar.jsx            吸顶导航（含免费报价按钮）
        ├── IndustrySwitcher.jsx  行业切换器
        ├── Hero.jsx              首屏
        ├── Services.jsx          服务项目 4 卡
        ├── Cases.jsx             案例 6 图 + hover 浮层
        ├── Testimonials.jsx      客户评价 3 条
        ├── ContactForm.jsx       联系表单（id="contact"）
        ├── Footer.jsx            底部信息
        └── Toast.jsx             提交成功提示
```

## 部署

打包：`npm run build`，产物在 `dist/`。

- **Vercel**：把项目推到 GitHub → Vercel 导入仓库 → Build Command 填 `npm run build`，Output Directory 填 `dist` → Deploy。
- **Netlify**：导入仓库 → Build command `npm run build`，Publish directory `dist` → Deploy。
- **静态服务器**：把 `dist/` 整个目录上传到任意空间即可（`vite.config.js` 里已设置相对路径 `base: './'`，放子目录也能正常打开）。

## 说明

- 表单**不会真实提交**，只做前端校验（手机号 `^1[3-9]\d{9}$`、必填校验），提交后弹出「我们会尽快联系您」提示。
- 页面文案、案例、评价、证照号均为示例占位内容，交付前请替换为客户真实信息。
