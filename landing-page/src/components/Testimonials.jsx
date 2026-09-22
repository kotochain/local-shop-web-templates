/**
 * 星级评分（内联 SVG，避免依赖图标库）。
 *
 * @param {object} props 组件属性
 * @param {number} props.stars 星级（1-5）
 * @returns {JSX.Element}
 */
function StarRating({ stars }) {
  const total = 5;
  return (
    <div className="flex items-center gap-0.5" aria-label={`评分 ${stars} 分，满分 ${total} 分`}>
      {Array.from({ length: total }, (_, index) => (
        <svg
          key={index}
          className="h-4 w-4"
          viewBox="0 0 20 20"
          fill={index < stars ? 'var(--accent)' : 'none'}
          aria-hidden="true"
        >
          <path
            d="M10 1.8l2.47 5.01 5.53.8-4 3.9.94 5.49L10 14.42l-4.94 2.58.94-5.49-4-3.9 5.53-.8L10 1.8z"
            stroke="var(--accent)"
            strokeWidth="1.2"
            strokeLinejoin="round"
          />
        </svg>
      ))}
    </div>
  );
}

/**
 * 客户评价板块：3 条评价卡片，含头像占位、姓名、身份、内容、星级。
 *
 * @param {object} props 组件属性
 * @param {object} props.industry 当前行业配置
 * @returns {JSX.Element}
 */
export default function Testimonials({ industry }) {
  return (
    <section id="testimonials" className="scroll-mt-20 py-14 sm:py-20">
      <div className="page-container">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-semibold uppercase tracking-widest text-brand">客户评价</span>
          <h2 className="section-title mt-2 text-content">他们这样说</h2>
          <p className="section-subtitle">评价均来自真实合作客户，可按需求替换为带头像的实拍截图。</p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-3 lg:gap-5">
          {industry.testimonials.map((item) => (
            <figure
              key={item.name}
              className="card flex flex-col p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-floating"
            >
              <StarRating stars={item.stars} />
              <blockquote className="mt-3 flex-1 text-[14px] leading-relaxed text-content sm:text-[15px]">
                “{item.content}”
              </blockquote>
              <figcaption className="mt-5 flex items-center gap-3 border-t border-line pt-4">
                <span
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-semibold text-white"
                  style={{ backgroundColor: 'var(--brand)' }}
                  aria-hidden="true"
                >
                  {item.name.slice(0, 1)}
                </span>
                <span className="min-w-0">
                  <span className="block text-sm font-semibold text-content">{item.name}</span>
                  <span className="block truncate text-xs text-muted">{item.role}</span>
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
