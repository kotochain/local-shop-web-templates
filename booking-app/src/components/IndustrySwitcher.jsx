import React from 'react';
import { industryList } from '../config/industries.js';

/**
 * 行业切换器：用于 Demo 展示时在 3 套皮肤之间切换。
 *
 * @param {object} props 组件属性
 * @param {string} props.currentId 当前行业 ID
 * @param {(industryId: string) => void} props.onChange 切换回调
 * @returns {JSX.Element} 切换器
 */
export default function IndustrySwitcher({ currentId, onChange }) {
  return (
    <div className="flex items-center gap-1 rounded-full border border-border bg-card p-1 shadow-card">
      {industryList.map((item) => {
        const isActive = item.id === currentId;
        return (
          <button
            key={item.id}
            type="button"
            onClick={() => onChange(item.id)}
            aria-pressed={isActive}
            className={[
              'rounded-full px-3 py-1 text-xs font-medium transition-all duration-200',
              'active:scale-95',
              isActive
                ? 'btn-gradient text-on-brand shadow-sm'
                : 'text-muted hover:text-text',
            ].join(' ')}
          >
            {item.name}
          </button>
        );
      })}
    </div>
  );
}
