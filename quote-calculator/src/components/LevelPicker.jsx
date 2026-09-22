import { LEVELS } from '../config/pricing.js';
import { formatNumber } from '../utils/format.js';

/**
 * 装修档次选择器（简装 / 精装 / 豪华）
 * @param {object} props 组件参数
 * @param {string} props.value 当前选中的档次 id
 * @param {(id: string) => void} props.onChange 选中变化回调
 * @returns {JSX.Element}
 */
export default function LevelPicker({ value = 'standard', onChange }) {
  /**
   * 处理卡片点击
   * @param {string} id 档次 id
   */
  const handleSelect = (id) => {
    if (typeof onChange === 'function') onChange(id);
  };

  return (
    <div className="grid grid-cols-3 gap-3">
      {LEVELS.map((item) => {
        const active = item.id === value;
        return (
          <button
            key={item.id}
            type="button"
            onClick={() => handleSelect(item.id)}
            aria-pressed={active}
            className={[
              'relative flex flex-col items-center rounded-2xl border-2 px-2 py-4 transition-all duration-200',
              active
                ? 'border-gold-500 bg-gold-50 text-ink-800 shadow-card'
                : 'border-ink-100 bg-white text-ink-700 hover:border-ink-300',
            ].join(' ')}
          >
            {active && (
              <span className="absolute right-2 top-2 flex h-5 w-5 items-center justify-center rounded-full bg-gold-500 text-[11px] font-bold text-white">
                ✓
              </span>
            )}
            <span className="text-lg font-semibold leading-tight">{item.name}</span>
            <span
              className={[
                'mt-1 text-sm font-semibold tabular',
                active ? 'text-gold-600' : 'text-ink-500',
              ].join(' ')}
            >
              ¥{formatNumber(item.price)}
            </span>
            <span className="mt-0.5 text-[11px] text-ink-400">每平方米</span>
            <span
              className={[
                'mt-2 text-center text-[11px] leading-tight',
                active ? 'text-ink-600' : 'text-ink-400',
              ].join(' ')}
            >
              {item.desc}
            </span>
          </button>
        );
      })}
    </div>
  );
}
