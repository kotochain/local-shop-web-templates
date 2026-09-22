import { useState } from 'react';
import { normalizePhoneInput, validateForm } from '../utils/validate';

/** 表单初始值。 */
const EMPTY_FORM = { name: '', phone: '', requirement: '' };

/**
 * 联系表单板块（滚动目标 id="contact"）。
 * 仅做前端校验与成功提示，不做真实提交。
 *
 * @param {object} props 组件属性
 * @param {object} props.industry 当前行业配置
 * @param {(message: string) => void} props.onSuccess 提交成功回调（用于弹出提示）
 * @returns {JSX.Element}
 */
export default function ContactForm({ industry, onSuccess }) {
  const [form, setForm] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState({ name: '', phone: '', requirement: '' });

  /**
   * 更新单个字段，并即时清除该字段的错误提示。
   * @param {string} field 字段名
   * @param {string} value 输入值
   * @returns {void}
   */
  const updateField = (field, value) => {
    const nextValue = field === 'phone' ? normalizePhoneInput(value) : value;
    setForm((prev) => ({ ...prev, [field]: nextValue }));
    setErrors((prev) => (prev[field] ? { ...prev, [field]: '' } : prev));
  };

  /**
   * 提交处理：校验通过后提示并清空表单。
   * @param {React.FormEvent<HTMLFormElement>} event 表单事件
   * @returns {void}
   */
  const handleSubmit = (event) => {
    event.preventDefault();
    const { isValid, errors: nextErrors } = validateForm(form);
    setErrors(nextErrors);
    if (!isValid) {
      return;
    }
    onSuccess('提交成功，我们会尽快联系您');
    setForm(EMPTY_FORM);
  };

  return (
    <section id="contact" className="section-tint scroll-mt-20 py-14 sm:py-20">
      <div className="page-container">
        <div className="mx-auto max-w-3xl overflow-hidden rounded-2xl border border-line bg-card-bg shadow-floating">
          <div className="grid gap-0 md:grid-cols-5">
            {/* 左侧：卖点说明 */}
            <div
              className="p-6 text-white md:col-span-2 md:p-7"
              style={{
                backgroundImage: 'linear-gradient(160deg, var(--brand-dark) 0%, var(--brand) 100%)',
              }}
            >
              <h2 className="text-xl font-bold sm:text-2xl">免费获取报价方案</h2>
              <p className="mt-3 text-[13px] leading-relaxed text-white/85 sm:text-sm">
                填写下方信息，我们会在 2 小时内与您联系，提供初步方案与报价区间。
              </p>
              <ul className="mt-6 space-y-3 text-[13px] text-white/90">
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full" style={{ backgroundColor: 'var(--accent)' }} />
                  免费上门量房 / 初步咨询
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full" style={{ backgroundColor: 'var(--accent)' }} />
                  报价明细写清楚，无隐形消费
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full" style={{ backgroundColor: 'var(--accent)' }} />
                  信息仅用于本次咨询，不做外传
                </li>
              </ul>
              <div className="mt-6 border-t border-white/20 pt-4 text-[13px] text-white/85">
                也可以直接致电
                <a href={`tel:${industry.contact.phone.replace(/\s/g, '')}`} className="ml-1 font-semibold underline">
                  {industry.contact.phone}
                </a>
              </div>
            </div>

            {/* 右侧：表单 */}
            <form onSubmit={handleSubmit} noValidate className="p-6 md:col-span-3 md:p-7">
              <div className="space-y-4">
                <div>
                  <label htmlFor="contact-name" className="mb-1.5 block text-sm font-medium text-content">
                    您的称呼 <span className="text-brand">*</span>
                  </label>
                  <input
                    id="contact-name"
                    name="name"
                    type="text"
                    value={form.name}
                    onChange={(event) => updateField('name', event.target.value)}
                    placeholder="如：张先生"
                    className={`field-input ${errors.name ? 'field-input-error' : ''}`}
                    aria-invalid={Boolean(errors.name)}
                  />
                  {errors.name ? <p className="mt-1.5 text-xs text-red-500">{errors.name}</p> : null}
                </div>

                <div>
                  <label htmlFor="contact-phone" className="mb-1.5 block text-sm font-medium text-content">
                    手机号 <span className="text-brand">*</span>
                  </label>
                  <input
                    id="contact-phone"
                    name="phone"
                    type="tel"
                    inputMode="numeric"
                    maxLength={11}
                    value={form.phone}
                    onChange={(event) => updateField('phone', event.target.value)}
                    placeholder="请输入 11 位手机号"
                    className={`field-input ${errors.phone ? 'field-input-error' : ''}`}
                    aria-invalid={Boolean(errors.phone)}
                  />
                  {errors.phone ? <p className="mt-1.5 text-xs text-red-500">{errors.phone}</p> : null}
                </div>

                <div>
                  <label htmlFor="contact-requirement" className="mb-1.5 block text-sm font-medium text-content">
                    需求简述 <span className="text-brand">*</span>
                  </label>
                  <textarea
                    id="contact-requirement"
                    name="requirement"
                    rows={4}
                    value={form.requirement}
                    onChange={(event) => updateField('requirement', event.target.value)}
                    placeholder="简单描述一下您的需求，如房屋面积、期望风格、期望时间等"
                    className={`field-input resize-none ${errors.requirement ? 'field-input-error' : ''}`}
                    aria-invalid={Boolean(errors.requirement)}
                  />
                  {errors.requirement ? <p className="mt-1.5 text-xs text-red-500">{errors.requirement}</p> : null}
                </div>
              </div>

              <button type="submit" className="btn-primary mt-6 w-full">
                免费报价
              </button>
              <p className="mt-3 text-center text-xs text-muted">
                提交即表示同意我们通过电话或微信与您联系
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
