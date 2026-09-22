/**
 * 底部信息栏：电话、微信、地址、营业执照号。
 *
 * @param {object} props 组件属性
 * @param {object} props.industry 当前行业配置
 * @returns {JSX.Element}
 */
export default function Footer({ industry }) {
  const { contact } = industry;
  const phoneHref = `tel:${contact.phone.replace(/\s/g, '')}`;

  return (
    <footer className="border-t border-line bg-card-bg py-10 sm:py-12">
      <div className="page-container">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2">
              <span
                className="flex h-9 w-9 items-center justify-center rounded-lg text-sm font-bold text-white"
                style={{ backgroundColor: 'var(--brand)' }}
                aria-hidden="true"
              >
                {industry.companyName.slice(0, 1)}
              </span>
              <span className="text-base font-semibold text-content">{industry.companyName}</span>
            </div>
            <p className="mt-3 text-[13px] leading-relaxed text-muted">{industry.heroSub.slice(0, 46)}…</p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-content">联系方式</h3>
            <ul className="mt-3 space-y-2 text-[13px] text-muted">
              <li>
                电话：
                <a href={phoneHref} className="text-content transition-colors hover:text-brand">
                  {contact.phone}
                </a>
              </li>
              <li>微信：{contact.wechat}</li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-content">服务时间</h3>
            <ul className="mt-3 space-y-2 text-[13px] text-muted">
              <li>周一至周日 09:00 - 21:00</li>
              <li>节假日正常接待</li>
              <li>支持预约上门</li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-content">门店地址</h3>
            <p className="mt-3 text-[13px] leading-relaxed text-muted">{contact.address}</p>
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-2 border-t border-line pt-6 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {industry.companyName}　{contact.license}
          </p>
          <p>本网站内容仅为展示用途，具体信息以实际沟通为准</p>
        </div>
      </div>
    </footer>
  );
}
