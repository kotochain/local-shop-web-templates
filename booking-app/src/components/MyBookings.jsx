import React from 'react';
import { formatDateCN, maskPhone } from '../utils/time.js';

/**
 * 「我的预约」列表：展示已提交的预约记录，支持取消。
 *
 * 只负责渲染列表本身，区块标题与空状态由外层容器处理。
 *
 * @param {object} props 组件属性
 * @param {Array<object>} props.bookings 预约记录列表
 * @param {(bookingId: string) => void} props.onCancel 取消预约回调
 * @returns {JSX.Element|null} 预约记录列表
 */
export default function MyBookings({ bookings = [], onCancel }) {
  if (!bookings.length) {
    return null;
  }

  return (
    <div className="space-y-3">
      {bookings.map((booking) => (
          <article
            key={booking.id}
            className="rounded-3xl border border-border bg-card p-4 shadow-card"
          >
            <div className="flex items-start gap-3">
              <div
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl text-[22px]"
                style={{ backgroundColor: 'var(--brand-soft)' }}
              >
                <span aria-hidden="true">{booking.serviceEmoji || '📌'}</span>
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="truncate text-[15px] font-semibold">{booking.serviceName}</h3>
                  <span
                    className="shrink-0 rounded-full px-2.5 py-0.5 text-[11px] font-medium"
                    style={{ backgroundColor: 'var(--brand-soft)', color: 'var(--brand-dark)' }}
                  >
                    待到店
                  </span>
                </div>

                <p className="mt-1 text-[13px] text-muted">
                  {formatDateCN(booking.date)} {booking.startTime} - {booking.endTime}
                </p>

                <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-[12px] text-muted">
                  <span className="inline-flex items-center gap-1">
                    <span aria-hidden="true">👤</span>
                    {booking.name}
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <span aria-hidden="true">📱</span>
                    {maskPhone(booking.phone)}
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-3 flex items-center justify-between border-t border-border pt-3">
              <span className="text-[12px] text-muted">
                {Number(booking.price) === 0 ? '到店免费' : `到店支付 ¥${booking.price}`}
              </span>
              <button
                type="button"
                onClick={() => onCancel(booking.id)}
                className="rounded-full border border-border px-4 py-1.5 text-[12px] text-muted transition-colors hover:border-brand hover:text-text active:scale-95"
              >
                取消预约
              </button>
            </div>
          </article>
        ))}
    </div>
  );
}
