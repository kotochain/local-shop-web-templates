import { EXTRA_ITEMS } from '../config/pricing.js';
import { formatNumber } from '../utils/format.js';

/**
 * 附加项多选器（拆改 / 水电改造 / 定制柜 / 软装）
 * @param {object} props 组件参数
 * @param {string[]} props.value 已勾选的附加项 id 数组
 * @param {(ids: string[]) => void} props.onChange 勾选变化回调
 * @param {number} props.area 当前面积，用于展示预估金额
 * @param {boolean} props.areaValid 面积是否合法，非法时不展示预估金额
 * @returns {JSX.Element}
 */
export default function ExtraItemsPicker({
  value = [],
  onChange,
  area = 0,
  areaValid = false,
}) {
  const selected = Array.isArray(value) ? value : [];

  /**
   * 切换某一项的勾选状态
   * @param {string} id 附加项 id
   */
  const toggleItem = (id) => {
    const next = selected.includes(id)
      ? selected.filter((item) => item !== id)
      : [...selected, id];
    if (typeof onChange === 'function') onChange(next);
  };

  /**
   * 计算单项预估金额
   * @param {object} item 附加项配置
   * @returns {number} 金额（元）
   */
  const estimateAmount = (item) => {
    if (!areaValid) return 0;
    return item.type === 'perSqm' ? Math.round(item.price * area) : Math.round(item.price);
  };

  return (
    <div className="space-y-3">
      {EXTRA_ITEMS.map((item) => {
        const active = selected.includes(item.id);
        const amount = estimateAmount(item);
        return (
          <button
            key={item.id}
            type="button"
            onClick={() => toggleItem(item.id)}
            aria-pressed={active}
            className={[
              'flex w-full items-center gap-3 rounded-2xl border-2 px-4 py-3 text-left transition-all duration-200',
              active
                ? 'border-pine-500 bg-pine-50'
                : 'border-ink-100 bg-white hover:border-ink-300',
            ].join(' ')}
          >
            {/* 复选框 */}
            <span
              className={[
                'flex h-6 w-6 shrink-0 items-center justify-center rounded-md border-2 transition-all duration-200',
                active
                  ? 'border-pine-500 bg-pine-500 text-white'
                  : 'border-ink-200 bg-white text-transparent',
              ].join(' ')}
            >
              ✓
            </span>

            {/* 文案区 */}
            <span className="min-w-0 flex-1">
              <span className="flex items-baseline gap-2">
                <span className="text-base font-semibold text-ink-800">{item.name}</span>
                <span className="text-xs text-ink-400">
                  {item.type === 'perSqm'
                    ? `¥${formatNumber(item.price)}/㎡`
                    : `一口价 ¥${formatNumber(item.price)}`}
                </span>
              </span>
              <span className="mt-0.5 block text-xs leading-tight text-ink-400">{item.desc}</span>
            </span>

            {/* 预估金额 */}
            {areaValid && (
              <span className="shrink-0 text-right">
                <span
                  className={[
                    'block text-sm font-semibold tabular',
                    active ? 'text-pine-600' : 'text-ink-400',
                  ].join(' ')}
                >
                  ¥{formatNumber(amount)}
                </span>
              </span>
            )}
          </button>
        );
      })}

      <p className="text-xs text-ink-400">
        已选 {selected.length} 项附加工程，可多选，勾选后立即计入总价
      </p>
    </div>
  );
}
