/**
 * 表单校验工具。
 */

/** 中国大陆手机号正则：1 开头，第二位 3-9，共 11 位。 */
const PHONE_PATTERN = /^1[3-9]\d{9}$/;

/**
 * 判断是否为合法的中国大陆手机号。
 * @param {string} phone 待校验的手机号
 * @returns {boolean} 是否合法
 */
export function isValidPhone(phone) {
  return PHONE_PATTERN.test(String(phone || '').trim());
}

/**
 * 校验预约表单。
 * @param {object} form 表单数据
 * @param {string} form.name 姓名
 * @param {string} form.phone 手机号
 * @param {string} form.date 日期键
 * @param {string} form.startTime 时段开始时间
 * @returns {{name: string, phone: string, date: string, startTime: string}} 每个字段的错误文案，空字符串表示通过
 */
export function validateBookingForm(form = {}) {
  const errors = { name: '', phone: '', date: '', startTime: '' };
  const name = String(form.name || '').trim();
  const phone = String(form.phone || '').trim();

  if (!name) {
    errors.name = '请填写您的姓名';
  } else if (name.length > 20) {
    errors.name = '姓名请不要超过 20 个字';
  }

  if (!phone) {
    errors.phone = '请填写手机号，方便师傅/顾问联系您';
  } else if (!isValidPhone(phone)) {
    errors.phone = '手机号格式不正确，请填写 11 位手机号';
  }

  if (!form.date) {
    errors.date = '请选择预约日期';
  }

  if (!form.startTime) {
    errors.startTime = '请选择预约时段';
  }

  return errors;
}

/**
 * 判断校验结果中是否存在错误。
 * @param {object} errors validateBookingForm 的返回值
 * @returns {boolean} 是否存在错误
 */
export function hasError(errors = {}) {
  return Object.values(errors).some((message) => Boolean(message));
}

/**
 * 只保留手机号中的数字，并限制长度为 11 位，用于输入框受控处理。
 * @param {string} value 输入值
 * @returns {string} 清洗后的值
 */
export function normalizePhoneInput(value) {
  return String(value || '').replace(/\D/g, '').slice(0, 11);
}
