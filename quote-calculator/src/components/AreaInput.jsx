import { AREA_MAX, AREA_MIN } from '../config/pricing.js';

/**
 * 面积输入组件（带校验提示）
 * @param {object} props 组件参数
 * @param {string} props.value 当前输入的面积字符串
 * @param {(value: string) => void} props.onChange 输入变化回调
 * @param {string} props.error 校验错误文案（空字符串表示通过）
 * @returns {JSX.Element}
 */
export default function AreaInput({ value = '', onChange, error = '' }) {
  const hasError = Boolean(error);

  /**
   * 处理输入变化：只保留数字与小数点，避免误输入
   * @param {React.ChangeEvent<HTMLInputElement>} event 输入事件
   */
  const handleChange = (event) => {
    const next = event.target.value.replace(/[^\d.]/g, '');
    if (typeof onChange === 'function') onChange(next);
  };

  /** 快捷填入常用面积 */
  const quickFill = (num) => {
    if (typeof onChange === 'function') onChange(String(num));
  };

  return (
    <div>
      <div
        className={[
          'flex items-center gap-3 rounded-2xl border-2 bg-white px-4 py-3 transition-all duration-200',
          hasError ? 'border-red-400' : 'border-ink-100 focus-within:border-ink-600',
        ].join(' ')}
      >
        <input
          type="number"
          inputMode="decimal"
          value={value}
          onChange={handleChange}
          placeholder="请输入房屋面积"
          aria-label="房屋面积"
          aria-invalid={hasError}
          className="min-w-0 flex-1 bg-transparent text-2xl font-semibold text-ink-800 outline-none placeholder:text-lg placeholder:font-normal placeholder:text-ink-300 tabular"
        />
        <span className="shrink-0 text-lg font-medium text-ink-400">㎡</span>
      </div>

      <div className="mt-3 flex flex-wrap gap-2">
        {[60, 80, 100, 120, 140].map((num) => (
          <button
            key={num}
            type="button"
            onClick={() => quickFill(num)}
            className="rounded-full border border-ink-200 bg-white px-3 py-1.5 text-sm text-ink-600 transition-colors duration-200 hover:border-ink-500 hover:text-ink-800"
          >
            {num}㎡
          </button>
        ))}
      </div>

      {hasError ? (
        <p className="mt-2 flex items-center gap-1 text-sm text-red-500">
          <span aria-hidden="true">!</span>
          {error}
        </p>
      ) : (
        <p className="mt-2 text-xs text-ink-400">
          请填写建筑面积，范围 {AREA_MIN} - {AREA_MAX} 平方米
        </p>
      )}
    </div>
  );
}
