import { industries } from '../config/industries';

/**
 * 行业切换器（不显眼的小控件，方便演示时切换 5 个行业版本）。
 * 桌面端显示按钮组，移动端折叠为下拉选择。
 *
 * @param {object} props 组件属性
 * @param {string} props.currentId 当前行业 id
 * @param {(id: string) => void} props.onChange 切换回调
 * @param {boolean} props.dark 是否处于深色导航栏上（顶部未滚动时）
 * @returns {JSX.Element}
 */
export default function IndustrySwitcher({ currentId, onChange, dark = false }) {
  const baseText = dark ? 'text-white/80' : 'text-muted';
  const activeText = dark ? 'text-white' : 'text-brand';

  return (
    <div className="flex items-center gap-2">
      {/* 桌面端：按钮组 */}
      <div className="hidden items-center gap-1 rounded-full bg-black/5 p-1 backdrop-blur sm:flex">
        {industries.map((item) => {
          const isActive = item.id === currentId;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onChange(item.id)}
              aria-pressed={isActive}
              title={`切换到${item.name}版本`}
              className={`rounded-full px-2.5 py-1 text-xs font-medium transition-colors duration-200 ${
                isActive
                  ? `bg-brand text-white shadow-sm`
                  : `${baseText} hover:bg-brand-soft hover:text-brand`
              }`}
            >
              {item.short}
            </button>
          );
        })}
      </div>

      {/* 移动端：下拉选择 */}
      <label className="relative flex items-center sm:hidden">
        <span className="sr-only">切换行业版本</span>
        <select
          value={currentId}
          onChange={(event) => onChange(event.target.value)}
          className={`appearance-none rounded-full border border-white/20 bg-transparent py-1 pl-3 pr-7 text-xs font-medium ${activeText} focus:outline-none`}
        >
          {industries.map((item) => (
            <option key={item.id} value={item.id} className="text-content">
              {item.name}
            </option>
          ))}
        </select>
        <svg
          className={`pointer-events-none absolute right-2 h-3 w-3 ${activeText}`}
          viewBox="0 0 12 12"
          fill="none"
          aria-hidden="true"
        >
          <path d="M2.5 4.5L6 8l3.5-3.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
        </svg>
      </label>
    </div>
  );
}
