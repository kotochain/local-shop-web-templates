/**
 * 金额与日期格式化工具
 */

/**
 * 金额格式化：128000 -> "128,000"
 * @param {number} value 金额（元）
 * @returns {string} 带千分位的字符串
 */
export function formatNumber(value) {
  const num = Number(value);
  if (!Number.isFinite(num)) return '0';
  return Math.round(num).toLocaleString('zh-CN');
}

/**
 * 金额格式化：128000 -> "¥128,000"
 * @param {number} value 金额（元）
 * @returns {string} 带货币符号与千分位的字符串
 */
export function formatCurrency(value) {
  return `¥${formatNumber(value)}`;
}

/**
 * 面积格式化：80 -> "80"；80.5 -> "80.5"
 * @param {number} value 面积（平方米）
 * @returns {string}
 */
export function formatArea(value) {
  const num = Number(value);
  if (!Number.isFinite(num)) return '0';
  const rounded = Math.round(num * 100) / 100;
  return String(rounded);
}

/**
 * 日期格式化：new Date() -> "2025年3月5日"
 * @param {Date|string|number} date 日期对象或可解析的日期值
 * @returns {string}
 */
export function formatDate(date = new Date()) {
  const d = date instanceof Date ? date : new Date(date);
  if (Number.isNaN(d.getTime())) return '';
  return `${d.getFullYear()}年${d.getMonth() + 1}月${d.getDate()}日`;
}

/**
 * 生成报价单编号，例如：BJ20250305-4821
 * @param {Date} date 日期
 * @returns {string}
 */
export function generateQuoteNo(date = new Date()) {
  const d = date instanceof Date ? date : new Date(date);
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  const rand = String(Math.floor(Math.random() * 9000) + 1000);
  return `BJ${y}${m}${day}-${rand}`;
}

/**
 * 百分比格式化：0.08 -> "8%"
 * @param {number} rate 比例
 * @returns {string}
 */
export function formatPercent(rate) {
  const num = Number(rate);
  if (!Number.isFinite(num)) return '0%';
  const percent = Math.round(num * 10000) / 100;
  return `${percent}%`;
}
