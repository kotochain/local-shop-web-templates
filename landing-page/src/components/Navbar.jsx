import { useEffect, useState } from 'react';
import IndustrySwitcher from './IndustrySwitcher';

/** 导航锚点，滚到对应板块。 */
const NAV_ITEMS = [
  { id: 'services', label: '服务项目' },
  { id: 'cases', label: '案例展示' },
  { id: 'testimonials', label: '客户评价' },
  { id: 'contact', label: '联系我们' },
];

/**
 * 顶部导航：置顶显示，滚动前后两种视觉状态。
 *
 * @param {object} props 组件属性
 * @param {object} props.industry 当前行业配置
 * @param {string} props.industryId 当前行业 id
 * @param {(id: string) => void} props.onIndustryChange 行业切换回调
 * @param {() => void} props.onQuoteClick 点击「免费报价」回调
 * @returns {JSX.Element}
 */
export default function Navbar({ industry, industryId, onIndustryChange, onQuoteClick }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  /**
   * 平滑滚动到指定板块。
   * @param {string} sectionId 板块 id
   * @returns {void}
   */
  const scrollToSection = (sectionId) => {
    const target = document.getElementById(sectionId);
    if (target) {
      const offset = 72;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'border-b border-line bg-card-bg shadow-card'
          : 'border-b border-transparent bg-transparent'
      }`}
    >
      <div className="page-container flex h-16 items-center justify-between gap-3">
        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="flex min-w-0 items-center gap-2 text-left"
        >
          <span
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-sm font-bold text-white"
            style={{ backgroundColor: 'var(--brand)' }}
          >
            {industry.companyName.slice(0, 1)}
          </span>
          <span
            className={`truncate text-[15px] font-semibold transition-colors duration-300 ${
              scrolled ? 'text-content' : 'text-white'
            }`}
          >
            {industry.companyName}
          </span>
        </button>

        <nav className="hidden items-center gap-1 lg:flex">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => scrollToSection(item.id)}
              className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors duration-200 ${
                scrolled ? 'text-muted hover:bg-brand-soft hover:text-brand' : 'text-white/85 hover:bg-white/10 hover:text-white'
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <IndustrySwitcher currentId={industryId} onChange={onIndustryChange} dark={!scrolled} />
          <button
            type="button"
            onClick={onQuoteClick}
            className="rounded-xl bg-brand px-3 py-2 text-[13px] font-semibold text-white shadow-floating transition-all duration-200 hover:bg-brand-dark active:scale-[0.97] sm:px-4 sm:text-sm"
          >
            免费报价
          </button>
        </div>
      </div>
    </header>
  );
}
