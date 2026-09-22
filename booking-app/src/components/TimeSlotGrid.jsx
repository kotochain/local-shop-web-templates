import React from 'react';

/**
 * 时间段选择网格。
 *
 * 每个时段的 disabled / reason 由父组件计算后传入：
 *   - reason === '已约'：该时段已被预约，置灰不可选
 *   - reason === '已过'：今天已经过去的时间
 *
 * @param {object} props 组件属性
 * @param {Array<{start: string, end: string, disabled: boolean, reason: string}>} props.slots 时段列表
 * @param {string} props.value 当前选中时段的开始时间
 * @param {(slot: object) => void} props.onChange 选中回调
 * @returns {JSX.Element} 时段网格
 */
export default function TimeSlotGrid({ slots = [], value, onChange }) {
  return (
    <div className="grid grid-cols-3 gap-2">
      {slots.map((slot) => {
        const isActive = !slot.disabled && slot.start === value;
        return (
          <button
            key={slot.start}
            type="button"
            disabled={slot.disabled}
            onClick={() => onChange(slot)}
            aria-pressed={isActive}
            className={[
              'flex flex-col items-center justify-center rounded-2xl border py-2.5 transition-all duration-200',
              slot.disabled
                ? 'cursor-not-allowed border-border bg-bg text-muted opacity-55'
                : isActive
                  ? 'btn-gradient border-transparent text-on-brand shadow-sm'
                  : 'border-border bg-card text-text hover:border-brand active:scale-95',
            ].join(' ')}
          >
            <span className="text-[15px] font-semibold leading-tight">{slot.start}</span>
            <span
              className={[
                'mt-0.5 text-[10px] leading-tight',
                slot.disabled ? 'text-muted' : isActive ? 'opacity-85' : 'text-muted',
              ].join(' ')}
            >
              {slot.disabled ? slot.reason : `至 ${slot.end}`}
            </span>
          </button>
        );
      })}
    </div>
  );
}
