import React from 'react';

/**
 * 横向日期条：未来 7 天，含星期，可横向滚动。
 *
 * @param {object} props 组件属性
 * @param {Array<object>} props.days 日期列表（generateUpcomingDays 的返回值）
 * @param {string} props.value 当前选中日期键
 * @param {(dateKey: string) => void} props.onChange 选中回调
 * @returns {JSX.Element} 日期条
 */
export default function DateStrip({ days = [], value, onChange }) {
  return (
    <div className="no-scrollbar -mx-1 flex gap-2 overflow-x-auto px-1 pb-1">
      {days.map((day) => {
        const isActive = day.key === value;
        return (
          <button
            key={day.key}
            type="button"
            onClick={() => onChange(day.key)}
            aria-pressed={isActive}
            className={[
              'flex min-w-[62px] shrink-0 flex-col items-center gap-0.5 rounded-2xl border px-3 py-2.5 transition-all duration-200',
              'active:scale-95',
              isActive
                ? 'btn-gradient border-transparent text-on-brand shadow-sm'
                : 'border-border bg-card text-text hover:border-brand',
            ].join(' ')}
          >
            <span className={`text-[11px] ${isActive ? 'opacity-90' : 'text-muted'}`}>
              {day.weekday}
            </span>
            <span className="text-[15px] font-semibold leading-tight">{day.monthDay}</span>
          </button>
        );
      })}
    </div>
  );
}
