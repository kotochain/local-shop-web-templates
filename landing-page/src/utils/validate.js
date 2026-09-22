/** 中国大陆手机号正则：1 开头，第二位 3-9，共 11 位。 */
export const PHONE_PATTERN = /^1[3-9]\d{9}$/;

/** 姓名字段最小长度。 */
export const NAME_MIN_LENGTH = 2;

/** 需求简述最小长度。 */
export const REQUIREMENT_MIN_LENGTH = 5;

/**
 * 校验姓名。
 * @param {string} value 用户输入
 * @returns {string} 错误信息，合法时返回空字符串
 */
export function validateName(value) {
  const name = (value || '').trim();
  if (!name) {
    return '请填写您的称呼';
  }
  if (name.length < NAME_MIN_LENGTH) {
    return `称呼至少 ${NAME_MIN_LENGTH} 个字`;
  }
  return '';
}

/**
 * 校验手机号。
 * @param {string} value 用户输入
 * @returns {string} 错误信息，合法时返回空字符串
 */
export function validatePhone(value) {
  const phone = (value || '').trim();
  if (!phone) {
    return '请填写手机号';
  }
  if (!PHONE_PATTERN.test(phone)) {
    return '请填写正确的 11 位手机号';
  }
  return '';
}

/**
 * 校验需求简述。
 * @param {string} value 用户输入
 * @returns {string} 错误信息，合法时返回空字符串
 */
export function validateRequirement(value) {
  const requirement = (value || '').trim();
  if (!requirement) {
    return '请简单说明您的需求';
  }
  if (requirement.length < REQUIREMENT_MIN_LENGTH) {
    return `需求至少填写 ${REQUIREMENT_MIN_LENGTH} 个字，方便我们准确报价`;
  }
  return '';
}

/**
 * 校验整张表单。
 * @param {{ name: string, phone: string, requirement: string }} form 表单数据
 * @returns {{ isValid: boolean, errors: { name: string, phone: string, requirement: string } }}
 */
export function validateForm(form) {
  const errors = {
    name: validateName(form.name),
    phone: validatePhone(form.phone),
    requirement: validateRequirement(form.requirement),
  };
  const isValid = !errors.name && !errors.phone && !errors.requirement;
  return { isValid, errors };
}

/**
 * 手机号输入过滤：只保留数字，最大 11 位。
 * @param {string} value 用户输入
 * @returns {string} 过滤后的字符串
 */
export function normalizePhoneInput(value) {
  return (value || '').replace(/\D/g, '').slice(0, 11);
}

export default validateForm;
