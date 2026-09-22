import React from 'react';

/**
 * 空状态：还没有任何预约时展示。
 *
 * @param {object} props 组件属性
 * @param {string} [props.title] 主文案
 * @param {string} [props.hint] 辅助说明
 * @returns {JSX.Element} 空状态插画与文案
 */
export default function EmptyState({
  title = '还没有预约记录',
  hint = '选择上面任意一项服务，30 秒即可完成预约',
}) {
  return (
    <div className="flex flex-col items-center px-6 py-10 text-center">
      <svg
        width="120"
        height="96"
        viewBox="0 0 120 96"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-label="暂无预约"
      >
        <ellipse cx="60" cy="84" rx="40" ry="6" fill="var(--brand-soft)" />
        <rect
          x="26"
          y="14"
          width="68"
          height="60"
          rx="12"
          fill="var(--card)"
          stroke="var(--border)"
          strokeWidth="2"
        />
        <rect x="26" y="14" width="68" height="16" rx="8" fill="var(--brand-soft)" />
        <circle cx="41" cy="22" r="3" fill="var(--brand)" />
        <circle cx="52" cy="22" r="3" fill="var(--brand)" opacity="0.5" />
        <rect x="38" y="42" width="44" height="5" rx="2.5" fill="var(--border)" />
        <rect x="38" y="54" width="30" height="5" rx="2.5" fill="var(--border)" />
        <circle cx="88" cy="60" r="14" fill="var(--brand-soft)" />
        <path
          d="M82 60l4.5 4.5L94 57"
          stroke="var(--brand-dark)"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>

      <h3 className="mt-4 text-[15px] font-semibold">{title}</h3>
      <p className="mt-1.5 text-[13px] leading-relaxed text-muted">{hint}</p>
    </div>
  );
}
