# 在线预约系统 Demo（一套代码 · 三套行业皮肤）

一个纯前端的移动端预约小程序 Demo，内置 **美容 / 健身 / 维修** 三套行业皮肤，
无需后端、无需登录、无需任何付费服务，预约数据保存在浏览器 localStorage 中。

## 快速开始

```bash
# 1. 安装依赖
npm install

# 2. 本地预览（浏览器打开 http://localhost:5173）
npm run dev

# 3. 打包（产物在 dist/ 目录）
npm run build

# 4. 本地预览打包结果
npm run preview
```

要求：Node.js 18 及以上。

## 三套皮肤怎么切换

- 页面右上角有「美容 / 健身 / 维修」三个小按钮，点击即可切换（配色、文案、服务全部跟着变）。
- 也可以直接用链接打开指定行业，方便发给客户看：
  - `?industry=beauty` 美容
  - `?industry=fitness` 健身（也支持口语化别名 `?industry=gym`，两个链接效果一致）
  - `?industry=repair` 维修
- 三个行业的预约数据互相隔离（分别存在 `booking_beauty_v1` / `booking_fitness_v1` / `booking_repair_v1`）。

## 怎么改文案

只需要改一个文件：**`src/config/industries.js`**

```js
beauty: {
  id: 'beauty',
  name: '美容',                          // 切换器上的名字
  shopName: '悦颜美学馆',                 // 店铺名
  tagline: '让每一次护理，都是一次身心焕新', // 一句话介绍
  businessHours: '10:00 - 21:00 全年无休', // 营业时间文案
  openHour: 10,                          // 开始营业（24 小时制）
  closeHour: 21,                         // 结束营业（24 小时制）
  services: [
    {
      id: 'hydrating',                   // 唯一标识，不要重复
      name: '深层补水护理',
      duration: 60,                      // 时长（分钟），决定可选时段
      price: 298,                        // 价格（元），填 0 显示「免费」
      desc: '玻尿酸导入，干皮救星',
      emoji: '💧',                        // 卡片图标，可换任意 emoji
    },
  ],
}
```

改完保存，页面会自动刷新。

## 怎么改配色

同样在 `src/config/industries.js` 里，每个行业的 `theme` 字段：

```js
theme: {
  brand: '#C97B84',       // 主色：按钮、强调
  brandDark: '#A25A66',   // 主色加深：价格、渐变另一端
  brandSoft: '#F8E9EA',   // 主色浅版：图标底色、渐变起始端
  onBrand: '#FFFFFF',     // 主色按钮上的文字色（深色主色填 #FFFFFF，亮色主色填深色）
  accent: '#E3A899',      // 点缀色
  bg: '#FFF9F7',          // 页面背景
  card: '#FFFFFF',        // 卡片背景
  text: '#402C30',        // 主要文字
  muted: '#9C8589',       // 次要文字
  border: '#DFE7F2',      // 描边、分隔线
}
```

配色通过 CSS 变量注入到根节点，组件代码里只用 `bg-brand`、`text-muted` 这类语义类名，
**改颜色不需要动任何组件**。想做深色皮肤（如健身版），直接把 `bg` / `card` 调深、`text` 调浅即可。

## 怎么加第四个行业

1. 在 `src/config/industries.js` 的 `industries` 对象里新增一个配置（复制一份改字段即可）；
2. 把它加进文件末尾的 `industryList` 数组；
3. 完成，切换器会自动多出一个按钮。

## 功能说明

- 服务卡片点击弹出预约面板（手机上是底部弹出，桌面端居中）
- 未来 7 天横向日期条，可横向滚动
- 时段按「营业时间 + 服务时长」自动生成，30 分钟一档
- **同一天同一时段已被预约的会自动置灰不可选**（含时间重叠判断，长服务会占掉多个时段）
- 今天的已过时段自动置灰
- 姓名必填，手机号必填且校验中国大陆手机号
- 提交成功后弹窗显示成功态 + Toast 提示，「我的预约」立即出现记录
- 「我的预约」支持取消，取消后时段自动释放
- 手机号中间四位打码显示（138****8888）
- 无预约时展示空状态插画

## 目录结构

```
booking-app/
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
└── src/
    ├── main.jsx
    ├── App.jsx
    ├── index.css
    ├── config/
    │   └── industries.js        ← 全部文案 + 配色 + 服务，改这个文件就行
    ├── hooks/
    │   ├── useBookings.js       ← localStorage 增删改查，按行业隔离
    │   └── useIndustry.js       ← 读取 URL 参数、注入主题 CSS 变量
    ├── utils/
    │   ├── time.js              ← 日期条、时段生成、冲突判断、格式化
    │   └── validate.js          ← 手机号与必填校验
    └── components/
        ├── Header.jsx
        ├── IndustrySwitcher.jsx
        ├── ServiceCard.jsx
        ├── ServiceList.jsx
        ├── BookingModal.jsx
        ├── DateStrip.jsx
        ├── TimeSlotGrid.jsx
        ├── MyBookings.jsx
        ├── Toast.jsx
        └── EmptyState.jsx
```

## 部署

### Vercel

1. 把 `booking-app` 目录推到 GitHub 仓库；
2. 在 Vercel 选择 Import Project，Framework 选 **Vite**；
3. Build Command 填 `npm run build`，Output Directory 填 `dist`；
4. 点 Deploy，几分钟后拿到在线链接。

### Netlify

1. 登录 Netlify → Add new site → Import an existing project；
2. Build command 填 `npm run build`，Publish directory 填 `dist`；
3. 点 Deploy。

### 国内静态托管（腾讯云 / 阿里云 OSS 等）

先 `npm run build`，把 `dist` 目录里的文件上传到存储桶，开启静态网站托管即可。
`vite.config.js` 里已设置 `base: './'`，用相对路径打包，放子目录也不会白屏。

## 常见问题

**Q：预约数据存在哪？换手机还在吗？**
A：存在浏览器 localStorage，只在本机本浏览器可见，换设备不同步。这是 Demo 方案；
要接真实商家后台，把 `src/hooks/useBookings.js` 里的读写换成接口请求即可，其余代码不用改。

**Q：为什么清了缓存数据就没了？**
A：同上，localStorage 会被「清除浏览数据」清掉。

**Q：想改弹窗从底部弹出改成居中？**
A：`src/components/BookingModal.jsx` 最外层容器的 `items-end sm:items-center` 改成 `items-center`。
