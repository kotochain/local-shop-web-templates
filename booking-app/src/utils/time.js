/**
 * 时间处理工具：日期条生成、时段生成、时段冲突判断、格式化。
 */

/** 中文星期名称，索引与 Date.prototype.getDay() 对应（0 为周日）。 */
const WEEKDAY_LABELS = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];

/**
 * 把分钟数补零成两位字符串。
 * @param {number} value 数值
 * @returns {string} 补零后的字符串
 */
function pad2(value) {
  return String(value).padStart(2, '0');
}

/**
 * 把 Date 对象格式化成 'YYYY-MM-DD' 形式的日期键。
 * @param {Date} date 日期对象
 * @returns {string} 日期键，例如 '2024-05-01'
 */
export function toDateKey(date) {
  return `${date.getFullYear()}-${pad2(date.getMonth() + 1)}-${pad2(date.getDate())}`;
}

/**
 * 把 'HH:MM' 转换为当天 0 点起的分钟数。
 * @param {string} hhmm 时间字符串，例如 '14:30'
 * @returns {number} 分钟数，例如 870
 */
export function toMinutes(hhmm) {
  const parts = String(hhmm || '').split(':');
  const hour = Number.parseInt(parts[0], 10);
  const minute = Number.parseInt(parts[1], 10);
  if (Number.isNaN(hour) || Number.isNaN(minute)) {
    return 0;
  }
  return hour * 60 + minute;
}

/**
 * 把分钟数转换为 'HH:MM'。
 * @param {number} minutes 分钟数
 * @returns {string} 时间字符串，例如 '14:30'
 */
export function toHHMM(minutes) {
  const safeMinutes = Math.max(0, Math.round(minutes));
  return `${pad2(Math.floor(safeMinutes / 60) % 24)}:${pad2(safeMinutes % 60)}`;
}

/**
 * 生成从今天开始的若干天，用于横向日期条。
 * @param {number} count 天数，默认 7 天
 * @param {Date} [from] 起始日期，默认取当天
 * @returns {Array<{key: string, date: Date, monthDay: string, weekday: string}>} 日期列表
 */
export function generateUpcomingDays(count = 7, from = new Date()) {
  const days = [];
  const base = new Date(from.getFullYear(), from.getMonth(), from.getDate());

  for (let index = 0; index < count; index += 1) {
    const date = new Date(base.getFullYear(), base.getMonth(), base.getDate() + index);
    let weekday = WEEKDAY_LABELS[date.getDay()];
    if (index === 0) {
      weekday = '今天';
    } else if (index === 1) {
      weekday = '明天';
    }
    days.push({
      key: toDateKey(date),
      date,
      monthDay: `${date.getMonth() + 1}/${date.getDate()}`,
      weekday,
      dateText: `${date.getMonth() + 1}月${date.getDate()}日`,
    });
  }
  return days;
}

/**
 * 按营业时间和服务时长生成可选时段。
 *
 * 时段以 stepMinutes 为步长滚动，且保证「开始时间 + 服务时长」不晚于打烊时间。
 *
 * @param {object} options 配置项
 * @param {number} options.openHour 开始营业小时数（24 小时制）
 * @param {number} options.closeHour 结束营业小时数（24 小时制）
 * @param {number} options.duration 服务时长（分钟）
 * @param {number} [options.stepMinutes] 时段步长（分钟），默认 30 分钟
 * @returns {Array<{start: string, end: string, startMinutes: number, endMinutes: number}>} 时段列表
 */
export function generateTimeSlots({ openHour, closeHour, duration, stepMinutes = 30 }) {
  const slots = [];
  const openMinutes = openHour * 60;
  const closeMinutes = closeHour * 60;
  const serviceDuration = Math.max(stepMinutes, Number(duration) || stepMinutes);

  for (let start = openMinutes; start + serviceDuration <= closeMinutes; start += stepMinutes) {
    slots.push({
      start: toHHMM(start),
      end: toHHMM(start + serviceDuration),
      startMinutes: start,
      endMinutes: start + serviceDuration,
    });
  }
  return slots;
}

/**
 * 判断两个时间段是否重叠（边界相接不算重叠）。
 * @param {number} startA A 段开始分钟数
 * @param {number} durationA A 段时长（分钟）
 * @param {number} startB B 段开始分钟数
 * @param {number} durationB B 段时长（分钟）
 * @returns {boolean} 是否重叠
 */
export function isOverlapping(startA, durationA, startB, durationB) {
  return startA < startB + durationB && startB < startA + durationA;
}

/**
 * 在预约记录中查找与给定日期、时段冲突的记录。
 * @param {Array<object>} bookings 预约记录列表
 * @param {string} dateKey 日期键 'YYYY-MM-DD'
 * @param {number} startMinutes 时段开始分钟数
 * @param {number} duration 服务时长（分钟）
 * @returns {object|null} 冲突的预约记录，没有冲突时返回 null
 */
export function findConflict(bookings, dateKey, startMinutes, duration) {
  const list = Array.isArray(bookings) ? bookings : [];
  for (const booking of list) {
    if (booking.date !== dateKey || booking.status === 'cancelled') {
      continue;
    }
    const bookedStart = toMinutes(booking.startTime);
    const bookedDuration = Number(booking.duration) || 0;
    if (isOverlapping(startMinutes, duration, bookedStart, bookedDuration)) {
      return booking;
    }
  }
  return null;
}

/**
 * 获取当天已经过去的分钟数（用于判断今日时段是否还可预约）。
 * @param {Date} [now] 当前时间，默认取系统时间
 * @returns {number} 分钟数
 */
export function currentMinutes(now = new Date()) {
  return now.getHours() * 60 + now.getMinutes();
}

/**
 * 把日期键格式化成中文日期文案。
 * @param {string} dateKey 日期键 'YYYY-MM-DD' 或 'YYYY-M-D'
 * @returns {string} 例如 '5月1日 周三'
 */
export function formatDateCN(dateKey) {
  const parts = String(dateKey || '').split('-');
  if (parts.length !== 3) {
    return String(dateKey || '');
  }
  const month = Number.parseInt(parts[1], 10);
  const day = Number.parseInt(parts[2], 10);
  if (Number.isNaN(month) || Number.isNaN(day)) {
    return String(dateKey || '');
  }
  const weekday = WEEKDAY_LABELS[new Date(Number(parts[0]), month - 1, day).getDay()];
  return `${month}月${day}日 ${weekday}`;
}

/**
 * 手机号中间四位打码。
 * @param {string} phone 11 位手机号
 * @returns {string} 例如 '138****8888'
 */
export function maskPhone(phone) {
  const value = String(phone || '');
  if (value.length !== 11) {
    return value;
  }
  return `${value.slice(0, 3)}****${value.slice(7)}`;
}

/**
 * 生成简易唯一 ID。
 * @returns {string} 唯一 ID
 */
export function createId() {
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
}
