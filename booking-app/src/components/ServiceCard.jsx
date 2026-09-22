import React from 'react';

/**
 * 单个服务卡片：名称、时长、价格、卖点描述。
 *
 * @param {object} props 组件属性
 * @param {object} props.service 服务对象
 * @param {(service: object) => void} props.onSelect 点击预约回调
 * @returns {JSX.Element} 服务卡片
 */
export default function ServiceCard({ service, onSelect }) {
  const isFree = Number(service.price) === 0;

  return (
    <button
      type="button"
      onClick={() => onSelect(service)}
      className="group w-full rounded-3xl border border-border bg-card p-4 text-left shadow-card transition-all duration-200 hover:-translate-y-0.5 hover:shadow-float active:scale-[0.98]"
    >
      <div className="flex items-start gap-3">
        <div
          className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl text-[26px] transition-transform duration-200 group-hover:scale-105"
          style={{ backgroundColor: 'var(--brand-soft)' }}
        >
          <span aria-hidden="true">{service.emoji}</span>
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-2">
            <h3 className="truncate text-[16px] font-semibold">{service.name}</h3>
            <div className="shrink-0 text-right">
              {isFree ? (
                <span
                  className="text-[15px] font-bold"
                  style={{ color: 'var(--brand-dark)' }}
                >
                  免费
                </span>
              ) : (
                <span
                  className="text-[15px] font-bold"
                  style={{ color: 'var(--brand-dark)' }}
                >
                  ¥{service.price}
                </span>
              )}
            </div>
          </div>

          <p className="mt-1.5 line-clamp-2 text-[13px] leading-relaxed text-muted">
            {service.desc}
          </p>

          <div className="mt-3 flex items-center justify-between">
            <span className="inline-flex items-center gap-1 text-xs text-muted">
              <span aria-hidden="true">⏱</span>
              {service.duration} 分钟
            </span>
            <span
              className="inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-medium text-on-brand btn-gradient transition-transform duration-200 group-hover:scale-105"
            >
              立即预约
              <span aria-hidden="true">→</span>
            </span>
          </div>
        </div>
      </div>
    </button>
  );
}
