/**
 * 行业配置中心。
 *
 * ---------------------------------------------------------------------------
 * 这是整个项目唯一需要修改的文件。
 * 想换行业、改文案、改配色、改服务价格，只需要动这一个文件，组件代码不用碰。
 * ---------------------------------------------------------------------------
 *
 * 字段说明：
 *   id            行业唯一标识，同时决定 localStorage 的键名（booking_<id>_v1）
 *                 以及 URL 参数（?industry=beauty），不要填写中文或空格
 *   name          行业名称，显示在右上角行业切换器里
 *   shopName      店铺名称，显示在页面顶部
 *   tagline       一句话介绍，显示在店铺名下方
 *   businessHours 营业时间文案，显示在顶部信息条里
 *   openHour      开始营业的整点小时数（24 小时制，例如 10 表示 10:00）
 *   closeHour     结束营业的整点小时数（24 小时制，例如 21 表示 21:00）
 *   theme         配色，全部是 CSS 颜色值，会注入成 CSS 变量
 *     - brand      主色：按钮、强调文字、图标底色
 *     - brandDark  主色加深：价格、深色文字、渐变另一端
 *     - brandSoft  主色浅版：卡片图标底、浅色区块、渐变起始端
 *     - onBrand    主色按钮上的文字颜色（深色主色用 #FFFFFF，亮色主色用深色）
 *     - accent     点缀色：用于标签、小图标装饰
 *     - bg         页面背景
 *     - card       卡片背景
 *     - text       主要文字
 *     - muted      次要文字
 *     - border     描边 / 分隔线
 *   services     服务列表，建议 4-6 个
 *     - id        服务唯一标识（同一行业内不要重复）
 *     - name      服务名称
 *     - duration  服务时长，单位分钟，用于生成可选时段
 *     - price     价格，单位元
 *     - desc      一句话卖点
 *     - emoji     服务图标，可以直接换成别的 emoji
 */

export const industries = {
  // ---------------------------------------------------------------- 美容行业
  beauty: {
    id: 'beauty',
    name: '美容',
    shopName: '悦颜美学馆',
    tagline: '让每一次护理，都是一次身心焕新',
    businessHours: '10:00 - 21:00 全年无休',
    openHour: 10,
    closeHour: 21,
    theme: {
      brand: '#C97B84',
      brandDark: '#A25A66',
      brandSoft: '#F8E9EA',
      onBrand: '#FFFFFF',
      accent: '#E3A899',
      bg: '#FFF9F7',
      card: '#FFFFFF',
      text: '#402C30',
      muted: '#9C8589',
      border: '#F1E1DE',
    },
    services: [
      {
        id: 'hydrating',
        name: '深层补水护理',
        duration: 60,
        price: 298,
        desc: '玻尿酸导入，干皮救星，做完即刻水润透亮',
        emoji: '💧',
      },
      {
        id: 'clean',
        name: '毛孔深层清洁',
        duration: 75,
        price: 268,
        desc: '温和吸附黑头油脂，清透不伤肤，敏感肌可用',
        emoji: '🧼',
      },
      {
        id: 'spa',
        name: '肩颈舒缓 SPA',
        duration: 90,
        price: 398,
        desc: '中式经络手法，专门对付久坐族肩颈僵硬',
        emoji: '💆',
      },
      {
        id: 'skin',
        name: '光子嫩肤体验',
        duration: 60,
        price: 599,
        desc: '提亮肤色淡痘印，首次体验价含术后修复膜',
        emoji: '✨',
      },
      {
        id: 'consult',
        name: '肤质检测与咨询',
        duration: 30,
        price: 0,
        desc: '专业仪器检测，免费给出专属护肤方案',
        emoji: '🌸',
      },
    ],
  },

  // ---------------------------------------------------------------- 健身行业
  fitness: {
    id: 'fitness',
    name: '健身',
    shopName: '力岩健身工作室',
    tagline: '把每一次训练，都变成看得见的进步',
    businessHours: '07:00 - 22:00 全年无休',
    openHour: 7,
    closeHour: 22,
    theme: {
      brand: '#4ADE80',
      brandDark: '#22C55E',
      brandSoft: '#1E3A2C',
      onBrand: '#0B1410',
      accent: '#FF7A45',
      bg: '#12181A',
      card: '#1B2327',
      text: '#E9F2EE',
      muted: '#8CA39A',
      border: '#2A3438',
    },
    services: [
      {
        id: 'pt-trial',
        name: '私教体验课',
        duration: 60,
        price: 99,
        desc: '一对一评估 + 动作教学，新人专属体验价',
        emoji: '🏋️',
      },
      {
        id: 'strength',
        name: '力量训练课',
        duration: 75,
        price: 268,
        desc: '深蹲硬拉卧推系统进阶，教练全程保护',
        emoji: '💪',
      },
      {
        id: 'stretch',
        name: '运动拉伸放松',
        duration: 45,
        price: 168,
        desc: '筋膜放松 + 被动拉伸，缓解训练后酸痛',
        emoji: '🧘',
      },
      {
        id: 'pilates',
        name: '普拉提小班课',
        duration: 60,
        price: 128,
        desc: '6 人小班，核心塑形与体态矫正兼顾',
        emoji: '🤸',
      },
      {
        id: 'assess',
        name: '体测与训练规划',
        duration: 30,
        price: 0,
        desc: '体脂肌肉量全面分析，免费定制训练计划',
        emoji: '📊',
      },
    ],
  },

  // ---------------------------------------------------------------- 维修行业
  repair: {
    id: 'repair',
    name: '维修',
    shopName: '速修到家服务中心',
    tagline: '师傅上门，明码标价，修不好不收钱',
    businessHours: '08:00 - 20:00 全年无休',
    openHour: 8,
    closeHour: 20,
    theme: {
      brand: '#2F6FED',
      brandDark: '#1E4FBF',
      brandSoft: '#E8F0FE',
      onBrand: '#FFFFFF',
      accent: '#FFB020',
      bg: '#F4F7FC',
      card: '#FFFFFF',
      text: '#1A2634',
      muted: '#6B7C90',
      border: '#DFE7F2',
    },
    services: [
      {
        id: 'ac-clean',
        name: '空调深度清洗',
        duration: 60,
        price: 129,
        desc: '拆机冲洗蒸发皿，除霉除味，制冷更省电',
        emoji: '❄️',
      },
      {
        id: 'washer',
        name: '洗衣机维修',
        duration: 90,
        price: 180,
        desc: '不脱水不进水都能修，原厂配件，修完保修 90 天',
        emoji: '🛠️',
      },
      {
        id: 'pipe',
        name: '下水道疏通',
        duration: 60,
        price: 150,
        desc: '高压疏通机作业，厨房卫生间都能通，不返工',
        emoji: '🚿',
      },
      {
        id: 'circuit',
        name: '电路检修改造',
        duration: 120,
        price: 260,
        desc: '持证电工上门，排查跳闸漏电，更换老化线路',
        emoji: '⚡',
      },
      {
        id: 'checkup',
        name: '全屋家电安全检测',
        duration: 45,
        price: 0,
        desc: '水电燃气全屋巡检，免费出检测报告',
        emoji: '🔧',
      },
    ],
  },
};

/** 默认行业：URL 上没有 ?industry= 参数或参数非法时使用。 */
export const DEFAULT_INDUSTRY_ID = 'beauty';

/**
 * 行业 ID 别名：允许用更口语化的参数访问同一套皮肤。
 *
 * 例如健身行业内部 id 为 fitness，但对外也支持 ?industry=gym，
 * 方便分享链接和作品集截图命名保持直观。
 */
export const INDUSTRY_ALIASES = {
  gym: 'fitness',
};

/** 行业 ID 列表，保证切换器顺序稳定。 */
export const industryList = [industries.beauty, industries.fitness, industries.repair];

/**
 * 根据行业 ID 获取配置。
 *
 * 先按真实 ID 查找，再按别名查找（如 'gym' → 'fitness'），最后回退到默认行业。
 * 别名解析下沉到这里，保证任何调用方传别名都能得到正确配置，不会静默跑偏。
 *
 * @param {string} industryId 行业 ID，也可以传别名
 * @returns {object} 行业配置对象
 */
export function getIndustry(industryId) {
  const aliased = industryId ? INDUSTRY_ALIASES[industryId] : '';
  return (
    industries[industryId] ||
    (aliased ? industries[aliased] : null) ||
    industries[DEFAULT_INDUSTRY_ID]
  );
}

/**
 * 行业配置中需要注入为 CSS 变量的主题键名与变量名的映射。
 * @type {Array<{key: string, cssVar: string}>}
 */
export const THEME_VARIABLES = [
  { key: 'brand', cssVar: '--brand' },
  { key: 'brandDark', cssVar: '--brand-dark' },
  { key: 'brandSoft', cssVar: '--brand-soft' },
  { key: 'onBrand', cssVar: '--on-brand' },
  { key: 'accent', cssVar: '--accent' },
  { key: 'bg', cssVar: '--bg' },
  { key: 'card', cssVar: '--card' },
  { key: 'text', cssVar: '--text' },
  { key: 'muted', cssVar: '--muted' },
  { key: 'border', cssVar: '--border' },
];
