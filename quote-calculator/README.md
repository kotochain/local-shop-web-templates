# 装修报价计算器（纯前端 Demo）

一个移动端优先的装修报价估算工具：选户型 → 填面积 → 选档次 → 勾附加项，
**实时**算出预估总价与费用明细，并能生成一张**排版正式、可直接截图发微信**的报价单。

技术栈：Vite 5 + React 18 + Tailwind CSS 3.4，无后端、无额外第三方库（没有 html2canvas）。

---

## 一、快速开始

```bash
# 1. 安装依赖（只需执行一次）
npm install

# 2. 本地预览（浏览器打开提示的地址）
npm run dev

# 3. 打包构建（产出 dist 目录）
npm run build

# 4. 本地预览打包结果
npm run preview
```

> 注意：路径含中文与空格，命令中请用双引号包裹目录，例如：
> `cd "/Users/javian/Desktop/闲鱼/网站小程序 demo/quote-calculator" && npm install`

---

## 二、功能说明

| 功能 | 说明 |
| --- | --- |
| 房屋类型 | 一居 / 两居 / 三居，对应不同人工复杂度系数 |
| 房屋面积 | 数字输入，校验范围 1 - 500㎡，非法输入给出友好提示，带 60/80/100/120/140 快捷填充 |
| 装修档次 | 简装 / 精装 / 豪华，对应不同平方米单价 |
| 附加项 | 拆改、水电改造、定制柜、软装（多选，按面积或一口价计费） |
| 实时计算 | 改任一参数立即重算，无需点按钮 |
| 明细拆解 | 逐项展示项目名称、计算依据（如 `80㎡ × ¥1,300 × 1.05`）、金额 |
| 生成报价单 | 渲染一张正式单据样式的卡片，含公司名、客户、面积、户型、档次、明细表、合计、日期、温馨提示、联系电话 |
| 截图 / 复制 | 提示用户手机截图保存；另提供「复制报价文字」一键粘贴到微信 |

---

## 三、计算逻辑

```
基础装修费 = 面积 × 档次单价 × 户型系数
附加项目费 = Σ(按面积项单价 × 面积) + Σ(一口价项)
设计费     = (基础装修费 + 附加项目费) × 8%
管理费     = (基础装修费 + 附加项目费) × 5%
合计总价   = 基础装修费 + 附加项目费 + 设计费 + 管理费
```

明细逐项金额之和**严格等于**合计总价（代码里以明细加总为准，避免四舍五入误差）。

### 验算示例

80㎡ · 两居 · 精装 · 水电改造：

- 基础装修费 = 80 × 1300 × 1.05 = **109,200**
- 水电改造 = 80 × 180 = **14,400**
- 小计 = 123,600
- 设计费 = 123,600 × 8% = **9,888**
- 管理费 = 123,600 × 5% = **6,180**
- **合计 = 109,200 + 14,400 + 9,888 + 6,180 = ¥139,668**（折合约 ¥1,746/㎡）

其他参考：

- 80㎡ 一居 简装 无附加：80 × 800 × 1.0 = 64,000 → 含设计管理费 **¥72,320**
- 120㎡ 三居 豪华 全选附加：120 × 2200 × 1.12 = 295,680，附加 120×(120+180)+12000+8000 = 56,000 → 合计约 **¥397,398**

---

## 四、怎么改单价（只改一个文件）

所有价格常量都集中在 **`src/config/pricing.js`**，改完保存页面立即生效，不需要动其他代码。

```js
// 基础装修单价（元/平方米），按档次
export const BASE_PRICE_PER_SQM = { simple: 800, standard: 1300, luxury: 2200 };

// 户型系数
export const HOUSE_TYPE_FACTOR = { one: 1.0, two: 1.05, three: 1.12 };

// 附加项：perSqm 按面积算（元/平米），fixed 为一口价（元）
export const EXTRA_ITEMS = [
  { id: 'demolish', name: '拆改工程', type: 'perSqm', price: 120, desc: '...' },
  { id: 'plumbing', name: '水电改造', type: 'perSqm', price: 180, desc: '...' },
  { id: 'cabinet',  name: '定制柜体', type: 'fixed',  price: 12000, desc: '...' },
  { id: 'softfit',  name: '软装搭配', type: 'fixed',  price: 8000, desc: '...' },
];

// 设计费 / 管理费比例
export const DESIGN_FEE_RATE = 0.08;
export const MANAGE_FEE_RATE = 0.05;
```

同文件里还可以改：

- `COMPANY_INFO`：公司名、 slogan、电话、联系人、报价有效期天数（**交付前替换成真实信息**）
- `QUOTE_NOTES`：报价单底部的温馨提示
- `AREA_MIN` / `AREA_MAX`：面积校验范围

---

## 五、目录结构

```
quote-calculator/
├── package.json / vite.config.js / tailwind.config.js / postcss.config.js
├── index.html
├── README.md
└── src/
    ├── main.jsx                       入口
    ├── App.jsx                        页面主组件与状态
    ├── index.css                      全局样式（Tailwind 指令 + 票据样式）
    ├── config/pricing.js              ★ 所有单价与文案常量
    ├── utils/calculate.js             纯函数计算逻辑 + 面积校验
    ├── utils/format.js                金额千分位、日期格式化、单号生成
    └── components/
        ├── HouseTypePicker.jsx        户型选择
        ├── AreaInput.jsx              面积输入与校验提示
        ├── LevelPicker.jsx            档次选择
        ├── ExtraItemsPicker.jsx       附加项多选
        ├── ResultPanel.jsx            实时总价与明细拆解
        └── QuoteSlip.jsx              可截图的报价单卡片
```

---

## 六、怎么部署

1. `npm run build` 生成 `dist` 目录（已配置 `base: './'`，可直接双击 `dist/index.html` 打开）。
2. 静态托管任选其一：
   - **微信云托管 / 腾讯云静态网站 / 阿里云 OSS**：把 `dist` 整个目录上传即可。
   - **Vercel / Netlify**：关联仓库，构建命令 `npm run build`，输出目录 `dist`。
   - **GitHub Pages**：上传 `dist` 内容到 `gh-pages` 分支。
3. 若要接入微信小程序，可用 `web-view` 组件指向部署后的 https 地址（需在小程序后台配置业务域名）。

---

## 七、常见问题

- **npm install 失败**：确认 Node 版本 ≥ 16（`node -v`），网络不通可换镜像 `npm config set registry https://registry.npmmirror.com`。
- **页面空白**：确认通过 `npm run dev` 或 `npm run preview` 访问，不要直接用 `file://` 打开源码目录。
- **金额和预期不一致**：检查 `src/config/pricing.js` 里的单价与比例是否被改过。
