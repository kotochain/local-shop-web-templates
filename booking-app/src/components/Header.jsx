import React from 'react';

/**
 * 页面顶部区域：店铺名称、一句话介绍、营业时间。
 *
 * @param {object} props 组件属性
 * @param {object} props.industry 当前行业配置
 * @param {number} props.bookingCount 当前行业已预约数量
 * @returns {JSX.Element} 顶部区域
 */
export default function Header({ industry, bookingCount = 0 }) {
  return (
    <header className="hero-gradient relative overflow-hidden px-4 pb-8 pt-6">
      {/* 装饰性光斑，让顶部更有层次 */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-16 top-16 h-48 w-48 rounded-full opacity-30 blur-2xl"
        style={{ backgroundColor: 'var(--accent)' }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-20 top-24 h-40 w-40 rounded-full opacity-20 blur-3xl"
        style={{ backgroundColor: 'var(--brand)' }}
      />

      <div className="relative">
        <div className="flex items-center gap-3">
          <div
            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl text-2xl shadow-card"
            style={{ backgroundColor: 'var(--brand-soft)' }}
          >
            {industry.services[0]?.emoji || '✨'}
          </div>
          <div className="min-w-0">
            <p
              className="text-[11px] font-medium tracking-[0.2em]"
              style={{ color: 'var(--brand-dark)' }}
            >
              在线预约
            </p>
            <h1 className="truncate text-[22px] font-bold leading-tight">{industry.shopName}</h1>
          </div>
        </div>

        <p className="mt-4 text-[15px] leading-relaxed text-muted">{industry.tagline}</p>

        <div className="mt-4 flex flex-wrap items-center gap-2">
          <span className="glass-chip inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs text-muted">
            <span aria-hidden="true">🕘</span>
            {industry.businessHours}
          </span>
          <span className="glass-chip inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs text-muted">
            <span aria-hidden="true">📅</span>
            已预约 {bookingCount} 单
          </span>
        </div>
      </div>
    </header>
  );
}
