/**
 * 首屏 Hero：渐变背景 + 大标题 + 副标题 + 免费报价按钮 + 信任标签 + 主视觉占位图。
 * 所有图片均使用占位图（渐变色块 + 标注尺寸），方便客户直接替换成真实照片。
 *
 * @param {object} props 组件属性
 * @param {object} props.industry 当前行业配置
 * @param {() => void} props.onQuoteClick 点击「免费报价」回调（滚动到表单）
 * @param {() => void} props.onViewCases 点击「看真实案例」回调
 * @returns {JSX.Element}
 */
export default function Hero({ industry, onQuoteClick, onViewCases }) {
  return (
    <section
      id="hero"
      className="relative overflow-hidden pb-14 pt-24 sm:pb-20 sm:pt-28"
      style={{
        backgroundImage:
          'linear-gradient(135deg, var(--brand-dark) 0%, var(--brand) 58%, var(--brand-dark) 100%)',
      }}
    >
      {/* 背景装饰光斑 */}
      <div
        className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full opacity-25 blur-3xl"
        style={{ backgroundColor: 'var(--accent)' }}
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -bottom-32 -left-20 h-72 w-72 rounded-full bg-white opacity-10 blur-3xl"
        aria-hidden="true"
      />

      <div className="page-container relative grid items-center gap-10 lg:grid-cols-12 lg:gap-8">
        {/* 左侧：文案区 */}
        <div className="lg:col-span-7">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs font-medium text-white/90 backdrop-blur">
            <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: 'var(--accent)' }} />
            {industry.name} · 本地服务
          </span>

          <h1 className="mt-5 text-[30px] font-bold leading-tight tracking-tight text-white sm:text-[40px] lg:text-[46px]">
            {industry.slogan}
          </h1>

          <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-white/85 sm:text-base">
            {industry.heroSub}
          </p>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
            <button
              type="button"
              onClick={onQuoteClick}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-7 py-3.5 text-[15px] font-semibold shadow-floating transition-all duration-200 hover:bg-white/90 active:scale-[0.98]"
              style={{ color: 'var(--brand-dark)' }}
            >
              免费报价
              <svg className="h-4 w-4" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path
                  d="M3 8h9m0 0L8.5 4.5M12 8l-3.5 3.5"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <button
              type="button"
              onClick={onViewCases}
              className="inline-flex items-center justify-center rounded-xl border border-white/35 px-7 py-3.5 text-[15px] font-medium text-white transition-all duration-200 hover:bg-white/10 active:scale-[0.98]"
            >
              看看真实案例
            </button>
          </div>

          {/* 信任标签 */}
          <ul className="mt-8 grid grid-cols-2 gap-2.5 sm:grid-cols-4 sm:gap-3">
            {industry.trustBadges.map((badge) => (
              <li
                key={badge}
                className="flex items-center gap-1.5 rounded-xl bg-white/10 px-3 py-2 text-xs font-medium text-white/90 backdrop-blur sm:text-[13px]"
              >
                <svg className="h-3.5 w-3.5 shrink-0" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                  <path
                    d="M2.5 7.5L5.5 10.5L11.5 3.5"
                    stroke="var(--accent)"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span className="truncate">{badge}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* 右侧：主视觉占位图（浏览器窗口样式，方便客户替换真实照片） */}
        <div className="lg:col-span-5">
          <div className="overflow-hidden rounded-2xl border border-white/20 bg-white/10 shadow-floating backdrop-blur">
            <div className="flex items-center gap-1.5 border-b border-white/15 px-3 py-2.5">
              <span className="h-2.5 w-2.5 rounded-full bg-white/40" />
              <span className="h-2.5 w-2.5 rounded-full bg-white/30" />
              <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
              <span className="ml-2 truncate text-[11px] text-white/70">{industry.companyName}</span>
            </div>
            <div className="placeholder-art relative flex aspect-[4/3] w-full items-center justify-center">
              <span className="rounded-lg bg-black/25 px-3 py-1.5 text-center text-[11px] leading-relaxed text-white/90">
                主视觉图占位
                <br />
                建议尺寸 1600 × 1200
              </span>
            </div>
          </div>
          <p className="mt-2 text-center text-[11px] text-white/60">
            图片位：替换为品牌主图 / 门店环境照即可
          </p>
        </div>
      </div>
    </section>
  );
}
