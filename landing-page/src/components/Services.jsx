/**
 * 服务项目板块：4 个卡片，含图标、标题、描述。
 *
 * @param {object} props 组件属性
 * @param {object} props.industry 当前行业配置
 * @returns {JSX.Element}
 */
export default function Services({ industry }) {
  return (
    <section id="services" className="scroll-mt-20 py-14 sm:py-20">
      <div className="page-container">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-semibold uppercase tracking-widest text-brand">服务项目</span>
          <h2 className="section-title mt-2 text-content">我们能为您做什么</h2>
          <p className="section-subtitle">
            每一项服务都有明确的交付标准与报价口径，签约前先讲清楚，合作过程不吃哑巴亏。
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
          {industry.services.map((service) => (
            <article
              key={service.title}
              className="card group p-5 transition-all duration-300 hover:-translate-y-1 hover:border-brand hover:shadow-floating"
            >
              <div
                className="flex h-12 w-12 items-center justify-center rounded-xl text-2xl transition-transform duration-300 group-hover:scale-110"
                style={{ backgroundColor: 'var(--brand-soft)' }}
                aria-hidden="true"
              >
                {service.emoji}
              </div>
              <h3 className="mt-4 text-[17px] font-semibold text-content">{service.title}</h3>
              <p className="mt-2 text-[13px] leading-relaxed text-muted sm:text-sm">{service.desc}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
