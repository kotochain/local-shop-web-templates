import { HOUSE_TYPES } from '../config/pricing.js';

/**
 * 房屋类型选择器（一居 / 两居 / 三居）
 * @param {object} props 组件参数
 * @param {string} props.value 当前选中的户型 id
 * @param {(id: string) => void} props.onChange 选中变化回调
 * @returns {JSX.Element}
 */
export default function HouseTypePicker({ value = 'two', onChange }) {
  /**
   * 处理卡片点击
   * @param {string} id 户型 id
   */
  const handleSelect = (id) => {
    if (typeof onChange === 'function') onChange(id);
  };

  return (
    <div>
      <div className="grid grid-cols-3 gap-3">
        {HOUSE_TYPES.map((item) => {
          const active = item.id === value;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => handleSelect(item.id)}
              aria-pressed={active}
              className={[
                'relative flex flex-col items-center justify-center rounded-2xl border-2 px-2 py-4 transition-all duration-200',
                active
                  ? 'border-ink-700 bg-ink-700 text-white shadow-gold'
                  : 'border-ink-100 bg-white text-ink-700 hover:border-ink-300',
              ].join(' ')}
            >
              {active && (
                <span className="absolute right-2 top-2 flex h-5 w-5 items-center justify-center rounded-full bg-gold-400 text-[11px] font-bold text-ink-900">
                  ✓
                </span>
              )}
              <span className="text-lg font-semibold leading-tight">{item.name}</span>
              <span
                className={[
                  'mt-1 text-center text-[11px] leading-tight',
                  active ? 'text-ink-100' : 'text-ink-400',
                ].join(' ')}
              >
                {item.desc}
              </span>
            </button>
          );
        })}
      </div>
      <p className="mt-2 text-xs text-ink-400">
        户型系数：一居 ×1.0 · 两居 ×1.05 · 三居 ×1.12（房间越多，人工工序越复杂）
      </p>
    </div>
  );
}
