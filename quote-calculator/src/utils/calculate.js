/**
 * 报价计算核心逻辑（纯函数，不依赖 React，方便单独测试与复用）
 *
 * 计算公式：
 *   基础装修费 = 面积 × 档次单价 × 户型系数
 *   附加项目费 = Σ(按面积项单价 × 面积) + Σ(一口价项)
 *   设计费     = (基础装修费 + 附加项目费) × 8%
 *   管理费     = (基础装修费 + 附加项目费) × 5%
 *   合计总价   = 基础装修费 + 附加项目费 + 设计费 + 管理费
 */

import {
  AREA_MAX,
  AREA_MIN,
  BASE_PRICE_PER_SQM,
  DESIGN_FEE_RATE,
  EXTRA_ITEMS,
  HOUSE_TYPE_FACTOR,
  HOUSE_TYPES,
  LEVELS,
  MANAGE_FEE_RATE,
} from '../config/pricing.js';
import { formatArea, formatNumber, formatPercent } from './format.js';

/**
 * 校验并解析面积输入
 * @param {string|number} rawInput 用户输入的面积
 * @returns {{ valid: boolean, value: number, message: string }}
 */
export function validateArea(rawInput) {
  const text = String(rawInput ?? '').trim();
  if (text === '') {
    return { valid: false, value: 0, message: '请先填写房屋面积' };
  }
  const value = Number(text);
  if (!Number.isFinite(value)) {
    return { valid: false, value: 0, message: '面积只能是数字，请重新填写' };
  }
  if (value < AREA_MIN || value > AREA_MAX) {
    return {
      valid: false,
      value: 0,
      message: `面积需在 ${AREA_MIN} - ${AREA_MAX} 平方米之间`,
    };
  }
  return { valid: true, value, message: '' };
}

/**
 * 根据 id 取户型配置
 * @param {string} houseTypeId 户型 id
 * @returns {object} 户型对象，找不到时返回第一个
 */
export function getHouseType(houseTypeId) {
  return HOUSE_TYPES.find((item) => item.id === houseTypeId) || HOUSE_TYPES[0];
}

/**
 * 根据 id 取档次配置
 * @param {string} levelId 档次 id
 * @returns {object} 档次对象，找不到时返回「精装」
 */
export function getLevel(levelId) {
  return LEVELS.find((item) => item.id === levelId) || LEVELS[1];
}

/**
 * 计算报价明细
 * @param {object} params 参数
 * @param {number} params.area 面积（平方米）
 * @param {string} params.houseType 户型 id（one / two / three）
 * @param {string} params.level 档次 id（simple / standard / luxury）
 * @param {string[]} params.extras 已勾选的附加项 id 数组
 * @returns {object} 报价明细对象
 */
export function calculateQuote({ area, houseType, level, extras = [] }) {
  const houseTypeInfo = getHouseType(houseType);
  const levelInfo = getLevel(level);

  const unitPrice = BASE_PRICE_PER_SQM[levelInfo.id] ?? levelInfo.price ?? 0;
  const factor = HOUSE_TYPE_FACTOR[houseTypeInfo.id] ?? houseTypeInfo.factor ?? 1;

  // 1. 基础装修费 = 面积 × 档次单价 × 户型系数
  const baseFee = Math.round(area * unitPrice * factor);
  const baseItem = {
    id: 'base',
    name: `基础装修费（${levelInfo.name}）`,
    amount: baseFee,
    formula: `${formatArea(area)}㎡ × ¥${formatNumber(unitPrice)} × ${factor}`,
    note: `${levelInfo.name} · ${houseTypeInfo.name}`,
  };

  // 2. 附加项目费
  const extraList = [];
  let extraFee = 0;
  EXTRA_ITEMS.forEach((item) => {
    if (!extras.includes(item.id)) return;
    const amount =
      item.type === 'perSqm' ? Math.round(item.price * area) : Math.round(item.price);
    extraFee += amount;
    extraList.push({
      id: item.id,
      name: item.name,
      amount,
      formula:
        item.type === 'perSqm'
          ? `${formatArea(area)}㎡ × ¥${formatNumber(item.price)}`
          : `一口价 ¥${formatNumber(item.price)}`,
      note: item.desc,
    });
  });

  // 3. 设计费与管理费：均以（基础装修费 + 附加项目费）为基数
  const subtotal = baseFee + extraFee;
  const designFee = Math.round(subtotal * DESIGN_FEE_RATE);
  const manageFee = Math.round(subtotal * MANAGE_FEE_RATE);

  const designItem = {
    id: 'design',
    name: '设计费',
    amount: designFee,
    formula: `¥${formatNumber(subtotal)} × ${formatPercent(DESIGN_FEE_RATE)}`,
    note: '效果图 · 施工图 · 软装方案',
  };
  const manageItem = {
    id: 'manage',
    name: '管理费',
    amount: manageFee,
    formula: `¥${formatNumber(subtotal)} × ${formatPercent(MANAGE_FEE_RATE)}`,
    note: '项目经理 · 现场管理 · 完工保洁',
  };

  // 4. 合计总价
  const total = baseFee + extraFee + designFee + manageFee;

  // 校验：明细加总必须等于总价（防止四舍五入造成误差）
  const items = [baseItem, ...extraList, designItem, manageItem];
  const itemsSum = items.reduce((sum, item) => sum + item.amount, 0);

  return {
    area,
    houseType: houseTypeInfo,
    level: levelInfo,
    baseItem,
    extraItems: extraList,
    designItem,
    manageItem,
    baseFee,
    extraFee,
    designFee,
    manageFee,
    subtotal,
    total: itemsSum, // 以明细加总为准，保证明细与总价严格一致
    rawTotal: total,
    unitPricePerSqm: area > 0 ? Math.round(itemsSum / area) : 0,
    items,
  };
}

/**
 * 把报价明细导出为纯文本，方便复制粘贴到微信
 * @param {object} quote calculateQuote 的返回值
 * @param {string} customerName 客户称呼
 * @returns {string}
 */
export function quoteToText(quote, customerName = '') {
  if (!quote) return '';
  const lines = [];
  lines.push('装修报价单');
  if (customerName) lines.push(`客户：${customerName}`);
  lines.push(
    `房屋信息：${formatArea(quote.area)}㎡ · ${quote.houseType.name} · ${quote.level.name}`,
  );
  lines.push('——————————');
  quote.items.forEach((item) => {
    lines.push(`${item.name}：¥${formatNumber(item.amount)}（${item.formula}）`);
  });
  lines.push('——————————');
  lines.push(`合计总价：¥${formatNumber(quote.total)}`);
  lines.push(`折合单价：¥${formatNumber(quote.unitPricePerSqm)}/㎡`);
  return lines.join('\n');
}
