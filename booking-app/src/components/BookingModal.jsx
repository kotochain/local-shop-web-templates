import React, { useCallback, useEffect, useMemo, useState } from 'react';
import DateStrip from './DateStrip.jsx';
import TimeSlotGrid from './TimeSlotGrid.jsx';
import {
  createId,
  currentMinutes,
  findConflict,
  formatDateCN,
  generateTimeSlots,
  generateUpcomingDays,
} from '../utils/time.js';
import { hasError, normalizePhoneInput, validateBookingForm } from '../utils/validate.js';

/** 当天预约需要提前准备的分钟数，小于该值则视为已过。 */
const LEAD_MINUTES = 30;

/**
 * 预约弹窗：移动端为底部弹出面板，桌面端为居中弹窗。
 *
 * @param {object} props 组件属性
 * @param {object} props.service 被预约的服务
 * @param {object} props.industry 当前行业配置
 * @param {Array<object>} props.bookings 已有预约记录
 * @param {(payload: object) => {ok: boolean, message: string}} props.onSubmit 提交回调
 * @param {() => void} props.onClose 关闭回调
 * @returns {JSX.Element} 预约弹窗
 */
export default function BookingModal({ service, industry, bookings, onSubmit, onClose }) {
  const days = useMemo(() => generateUpcomingDays(7), []);
  const [dateKey, setDateKey] = useState(days[0].key);
  const [startTime, setStartTime] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [errors, setErrors] = useState({ name: '', phone: '', date: '', startTime: '' });
  const [successRecord, setSuccessRecord] = useState(null);

  /**
   * 按营业时间与服务时长生成某一天的时段，并标注「已过」「已约」两种不可选状态。
   * @param {string} targetDateKey 日期键
   * @returns {Array<object>} 时段列表
   */
  const buildSlots = useCallback(
    (targetDateKey) => {
      const baseSlots = generateTimeSlots({
        openHour: industry.openHour,
        closeHour: industry.closeHour,
        duration: service.duration,
      });
      const isToday = targetDateKey === days[0].key;
      const nowMinutes = currentMinutes();

      return baseSlots.map((slot) => {
        if (isToday && slot.startMinutes <= nowMinutes + LEAD_MINUTES) {
          return { ...slot, disabled: true, reason: '已过' };
        }
        const conflict = findConflict(bookings, targetDateKey, slot.startMinutes, service.duration);
        if (conflict) {
          return { ...slot, disabled: true, reason: '已约' };
        }
        return { ...slot, disabled: false, reason: '' };
      });
    },
    [bookings, days, industry.closeHour, industry.openHour, service.duration],
  );

  /** 当前选中日期的可选时段。 */
  const slots = useMemo(() => buildSlots(dateKey), [buildSlots, dateKey]);

  // 「今天」已约满或时段全部过点时，自动跳到最近一个还能约的日期。
  useEffect(() => {
    if (startTime) {
      return;
    }
    if (slots.some((slot) => !slot.disabled)) {
      return;
    }
    const nextDay = days.find((day) => buildSlots(day.key).some((slot) => !slot.disabled));
    if (nextDay) {
      setDateKey(nextDay.key);
    }
  }, [buildSlots, days, slots, startTime]);

  // 打开弹窗时锁定背景滚动，避免移动端滚动穿透。
  useEffect(() => {
    document.body.classList.add('is-locked');
    return () => document.body.classList.remove('is-locked');
  }, []);

  // 支持 Esc 关闭。
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  /**
   * 切换日期时清空已选时段，避免残留一个在新日期不可用的时间。
   * @param {string} nextDateKey 新日期键
   * @returns {void}
   */
  const handleDateChange = (nextDateKey) => {
    setDateKey(nextDateKey);
    setStartTime('');
    setErrors((prev) => ({ ...prev, startTime: '' }));
  };

  /**
   * 提交预约。
   * @param {React.FormEvent} event 表单事件
   * @returns {void}
   */
  const handleSubmit = (event) => {
    event.preventDefault();
    const nextErrors = validateBookingForm({ name, phone, date: dateKey, startTime });
    setErrors(nextErrors);
    if (hasError(nextErrors)) {
      return;
    }

    const slot = slots.find((item) => item.start === startTime);
    if (!slot || slot.disabled) {
      setErrors((prev) => ({ ...prev, startTime: '该时段已不可预约，请重新选择' }));
      return;
    }

    const payload = {
      id: createId(),
      serviceId: service.id,
      serviceName: service.name,
      serviceEmoji: service.emoji,
      date: dateKey,
      startTime: slot.start,
      endTime: slot.end,
      startMinutes: slot.startMinutes,
      duration: service.duration,
      price: service.price,
      name: name.trim(),
      phone: phone.trim(),
    };

    const result = onSubmit(payload);
    if (result && result.ok) {
      setSuccessRecord(payload);
    }
  };

  const isFree = Number(service.price) === 0;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center sm:p-4">
      <div
        className="absolute inset-0 bg-black/50 animate-fade-in"
        onClick={onClose}
        aria-hidden="true"
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-label={`预约 ${service.name}`}
        className="relative flex max-h-[92vh] w-full flex-col overflow-hidden rounded-t-3xl bg-card shadow-float animate-sheet-in sm:max-w-md sm:rounded-3xl"
      >
        {/* 标题栏 */}
        <div className="flex items-start justify-between gap-3 border-b border-border px-5 py-4">
          <div className="flex min-w-0 items-center gap-3">
            <div
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl text-xl"
              style={{ backgroundColor: 'var(--brand-soft)' }}
            >
              <span aria-hidden="true">{service.emoji}</span>
            </div>
            <div className="min-w-0">
              <h3 className="truncate text-[16px] font-semibold">{service.name}</h3>
              <p className="mt-0.5 text-xs text-muted">
                {service.duration} 分钟 · {isFree ? '免费' : `¥${service.price}`}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="关闭"
            className="-mr-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-border text-muted transition-colors hover:text-text active:scale-90"
          >
            ✕
          </button>
        </div>

        {/* 内容区 */}
        <div className="flex-1 overflow-y-auto px-5 py-4">
          {successRecord ? (
            <div className="animate-pop-in py-4 text-center">
              <div
                className="mx-auto flex h-16 w-16 items-center justify-center rounded-full text-3xl"
                style={{ backgroundColor: 'var(--brand-soft)' }}
              >
                <span aria-hidden="true">✅</span>
              </div>
              <h4 className="mt-4 text-[18px] font-bold">预约成功</h4>
              <p className="mt-1 text-[13px] text-muted">
                我们会按时为您安排，请留意接听电话
              </p>

              <div className="mt-4 space-y-2 rounded-2xl border border-border bg-bg p-4 text-left text-[13px]">
                <Row label="服务" value={`${successRecord.serviceEmoji} ${successRecord.serviceName}`} />
                <Row
                  label="时间"
                  value={`${formatDateCN(successRecord.date)} ${successRecord.startTime} - ${successRecord.endTime}`}
                />
                <Row label="联系人" value={successRecord.name} />
                <Row label="手机号" value={successRecord.phone} />
              </div>

              <button
                type="button"
                onClick={onClose}
                className="btn-gradient mt-5 w-full rounded-2xl py-3 text-[15px] font-semibold text-on-brand transition-transform active:scale-[0.98]"
              >
                知道了
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5" noValidate>
              {/* 选择日期 */}
              <div>
                <SectionTitle index="1" text="选择日期" />
                <DateStrip days={days} value={dateKey} onChange={handleDateChange} />
              </div>

              {/* 选择时段 */}
              <div>
                <div className="flex items-baseline justify-between">
                  <SectionTitle index="2" text="选择时段" />
                  <span className="text-[11px] text-muted">
                    {industry.businessHours}
                  </span>
                </div>
                <TimeSlotGrid
                  slots={slots}
                  value={startTime}
                  onChange={(slot) => {
                    setStartTime(slot.start);
                    setErrors((prev) => ({ ...prev, startTime: '' }));
                  }}
                />
                <p className="mt-2 text-[11px] text-muted">
                  <span className="mr-2">灰色为已约满或已过时间</span>
                  {errors.startTime ? (
                    <span style={{ color: 'var(--brand-dark)' }}>{errors.startTime}</span>
                  ) : null}
                </p>
              </div>

              {/* 联系人信息 */}
              <div>
                <SectionTitle index="3" text="填写联系信息" />
                <div className="space-y-3">
                  <Field label="姓名" error={errors.name}>
                    <input
                      type="text"
                      value={name}
                      maxLength={20}
                      onChange={(event) => {
                        setName(event.target.value);
                        setErrors((prev) => ({ ...prev, name: '' }));
                      }}
                      placeholder="请输入您的姓名"
                      className="w-full rounded-2xl border border-border bg-bg px-4 py-3 text-[15px] outline-none transition-colors focus:border-brand"
                    />
                  </Field>

                  <Field label="手机号" error={errors.phone}>
                    <input
                      type="tel"
                      inputMode="numeric"
                      value={phone}
                      onChange={(event) => {
                        setPhone(normalizePhoneInput(event.target.value));
                        setErrors((prev) => ({ ...prev, phone: '' }));
                      }}
                      placeholder="请输入 11 位手机号"
                      className="w-full rounded-2xl border border-border bg-bg px-4 py-3 text-[15px] outline-none transition-colors focus:border-brand"
                    />
                  </Field>
                </div>
              </div>
            </form>
          )}
        </div>

        {/* 底部操作区 */}
        {!successRecord && (
          <div
            className="border-t border-border px-5 py-4"
            style={{ paddingBottom: 'max(1rem, env(safe-area-inset-bottom))' }}
          >
            <button
              type="button"
              onClick={handleSubmit}
              className="btn-gradient w-full rounded-2xl py-3.5 text-[16px] font-semibold text-on-brand shadow-card transition-transform active:scale-[0.98]"
            >
              确认预约
            </button>
            <p className="mt-2 text-center text-[11px] text-muted">
              提交即表示同意到店时间以预约时段为准
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

/**
 * 区块小标题。
 * @param {object} props 组件属性
 * @param {string} props.index 序号
 * @param {string} props.text 标题文案
 * @returns {JSX.Element} 区块标题
 */
function SectionTitle({ index, text }) {
  return (
    <div className="mb-2.5 flex items-center gap-2">
      <span
        className="flex h-5 w-5 items-center justify-center rounded-full text-[11px] font-bold text-on-brand btn-gradient"
      >
        {index}
      </span>
      <h4 className="text-[14px] font-semibold">{text}</h4>
    </div>
  );
}

/**
 * 表单字段容器。
 * @param {object} props 组件属性
 * @param {string} props.label 字段名
 * @param {string} props.error 错误文案
 * @param {React.ReactNode} props.children 输入控件
 * @returns {JSX.Element} 字段容器
 */
function Field({ label, error, children }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-[12px] text-muted">{label}</span>
      {children}
      {error ? (
        <span className="mt-1 block text-[11px]" style={{ color: 'var(--brand-dark)' }}>
          {error}
        </span>
      ) : null}
    </label>
  );
}

/**
 * 成功态详情行。
 * @param {object} props 组件属性
 * @param {string} props.label 标签
 * @param {string} props.value 值
 * @returns {JSX.Element} 详情行
 */
function Row({ label, value }) {
  return (
    <div className="flex items-start justify-between gap-3">
      <span className="shrink-0 text-muted">{label}</span>
      <span className="text-right font-medium">{value}</span>
    </div>
  );
}
