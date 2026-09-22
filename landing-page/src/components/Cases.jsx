import { useState } from 'react';

/**
 * 案例展示板块：6 个占位图网格。
 * - 桌面端：鼠标悬停显示说明浮层（项目名 + 描述）
 * - 移动端：点击卡片展开 / 收起说明
 *
 * @param {object} props 组件属性
 * @param {object} props.industry 当前行业配置
 * @returns {JSX.Element}
 */
export default function Cases({ industry }) {
  const [openIndex, setOpenIndex] = useState(-1);

  /**
   * 切换某个案例的说明展开状态（移动端点击使用）。
   * @param {number} index 案例下标
   * @returns {void}
   */
  const toggleCase = (index) => {
    setOpenIndex((prev) => (prev === index ? -1 : index));
  };

  return (
    <section id="cases" className="section-tint scroll-mt-20 py-14 sm:py-20">
      <div className="page-container">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-semibold uppercase tracking-widest text-brand">案例展示</span>
          <h2 className="section-title mt-2 text-content">真实交付，看得见的成果</h2>
          <p className="section-subtitle">
            以下为示例案例占位，替换成实拍图后立即上线；{industry.name}版本默认展示 6 个案例。
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
          {industry.cases.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <article
                key={`${item.tag}-${item.title}`}
                className="group card overflow-hidden transition-shadow duration-300 hover:shadow-floating"
              >
                <button
                  type="button"
                  onClick={() => toggleCase(index)}
                  aria-expanded={isOpen}
                  className="relative block w-full text-left focus:outline-none"
                >
                  <div className="placeholder-art relative aspect-[4/3] w-full overflow-hidden">
                    <span className="absolute left-3 top-3 rounded-full bg-black/40 px-2.5 py-1 text-[11px] font-medium text-white backdrop-blur">
                      {item.tag}
                    </span>
                    <span className="absolute bottom-3 left-1/2 -translate-x-1/2 rounded bg-black/25 px-2.5 py-1 text-[11px] text-white/90">
                      案例图占位 · 建议 800 × 600
                    </span>
                  </div>

                  {/* 说明浮层：桌面 hover 显示，移动端点击显示 */}
                  <div
                    className={`absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/90 via-black/60 to-black/20 p-4 transition-opacity duration-300 sm:p-5 ${
                      isOpen ? 'opacity-100' : 'opacity-0 lg:group-hover:opacity-100'
                    }`}
                  >
                    <h3 className="text-[15px] font-semibold text-white sm:text-base">{item.title}</h3>
                    <p className="mt-1.5 text-[13px] leading-relaxed text-white/85">{item.desc}</p>
                  </div>
                </button>

                {/* 移动端常显标题条（桌面端由 hover 浮层承担） */}
                <div className="flex items-center justify-between gap-2 px-4 py-3 lg:hidden">
                  <span className="truncate text-sm font-medium text-content">{item.title}</span>
                  <span className="shrink-0 text-xs text-brand">{isOpen ? '收起' : '查看说明'}</span>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
