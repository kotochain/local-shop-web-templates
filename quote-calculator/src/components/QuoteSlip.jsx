import { COMPANY_INFO, QUOTE_NOTES } from '../config/pricing.js';
import { formatArea, formatCurrency, formatDate, formatNumber } from '../utils/format.js';

/**
 * 可截图的报价单卡片
 * 排版参照正式报价单据：公司表头 → 客户信息 → 明细表格 → 合计高亮 → 温馨提示 → 联系方式
 * @param {object} props 组件参数
 * @param {object} props.quote 报价明细对象
 * @param {string} props.customerName 客户称呼
 * @param {string} props.quoteNo 报价单编号
 * @param {Date} props.createdAt 生成时间
 * @returns {JSX.Element}
 */
export default function QuoteSlip({ quote, customerName = '', quoteNo = '', createdAt }) {
  if (!quote) return null;

  const date = createdAt instanceof Date ? createdAt : new Date();
  const validUntil = new Date(date.getTime());
  validUntil.setDate(validUntil.getDate() + COMPANY_INFO.validDays);

  /** 客户信息表格数据 */
  const metaItems = [
    { label: '客户', value: customerName.trim() || '贵宾客户' },
    { label: '房屋面积', value: `${formatArea(quote.area)} ㎡` },
    { label: '户型', value: quote.houseType.name },
    { label: '装修档次', value: quote.level.name },
    { label: '报价日期', value: formatDate(date) },
    { label: '单号', value: quoteNo },
  ];

  return (
    <div className="paper overflow-hidden rounded-2xl border border-ink-100 shadow-slip">
      {/* ---------- 表头 ---------- */}
      <div className="bg-ink-800 px-5 py-5 text-white">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-base font-bold tracking-wide">{COMPANY_INFO.name}</p>
            <p className="mt-1 text-[11px] text-ink-200">{COMPANY_INFO.slogan}</p>
          </div>
          <div className="shrink-0 rounded-lg border border-gold-400/60 bg-gold-400/10 px-2.5 py-1">
            <p className="text-[11px] font-semibold text-gold-300">预估报价</p>
          </div>
        </div>
        <div className="mt-4 flex items-baseline justify-between border-t border-white/15 pt-3">
          <h3 className="text-xl font-bold tracking-widest">装修报价单</h3>
          <span className="text-[11px] text-ink-200">客户留存联</span>
        </div>
      </div>

      {/* ---------- 客户信息 ---------- */}
      <div className="grid grid-cols-2 gap-x-4 gap-y-2 px-5 py-4">
        {metaItems.map((item) => (
          <div key={item.label} className="flex items-baseline gap-2">
            <span className="shrink-0 text-xs text-ink-400">{item.label}</span>
            <span className="min-w-0 flex-1 truncate border-b border-dotted border-ink-200 pb-0.5 text-sm font-medium text-ink-800">
              {item.value}
            </span>
          </div>
        ))}
      </div>

      {/* ---------- 明细表格 ---------- */}
      <div className="px-5 pb-2">
        <div className="overflow-hidden rounded-lg border border-ink-100">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="bg-ink-50">
                <th className="w-8 px-2 py-2 text-center text-[11px] font-semibold text-ink-500">
                  序
                </th>
                <th className="px-2 py-2 text-[11px] font-semibold text-ink-500">项目名称</th>
                <th className="px-2 py-2 text-[11px] font-semibold text-ink-500">计算依据</th>
                <th className="w-20 px-2 py-2 text-right text-[11px] font-semibold text-ink-500">
                  金额（元）
                </th>
              </tr>
            </thead>
            <tbody>
              {quote.items.map((item, index) => (
                <tr key={item.id} className="border-t border-ink-100">
                  <td className="px-2 py-2 text-center text-[11px] text-ink-400 tabular">
                    {index + 1}
                  </td>
                  <td className="px-2 py-2 text-xs font-medium text-ink-800">{item.name}</td>
                  <td className="px-2 py-2 text-[11px] leading-snug text-ink-400">
                    {item.formula}
                  </td>
                  <td className="px-2 py-2 text-right text-xs font-semibold text-ink-800 tabular">
                    {formatNumber(item.amount)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* 小计与附加说明 */}
        <div className="mt-2 flex items-center justify-between px-1 text-[11px] text-ink-400">
          <span>基础 + 附加小计：{formatCurrency(quote.subtotal)}</span>
          <span className="tabular">
            折合单价：¥{formatNumber(quote.unitPricePerSqm)}/㎡
          </span>
        </div>
      </div>

      {/* ---------- 合计 ---------- */}
      <div className="mx-5 my-4 rounded-xl bg-gradient-to-r from-gold-500 to-gold-400 px-5 py-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-ink-900/80">合计总价</p>
            <p className="mt-0.5 text-[11px] text-ink-900/60">含设计费与管理费</p>
          </div>
          <p className="text-3xl font-bold text-ink-900 tabular">
            {formatCurrency(quote.total)}
          </p>
        </div>
      </div>

      {/* ---------- 温馨提示 ---------- */}
      <div className="mx-5 mb-4 rounded-xl bg-ink-50 px-4 py-3">
        <p className="text-xs font-semibold text-ink-700">温馨提示</p>
        <ul className="mt-1.5 space-y-1">
          {QUOTE_NOTES.map((note, index) => (
            <li key={index} className="flex gap-1.5 text-[11px] leading-relaxed text-ink-500">
              <span className="text-gold-500">{index + 1}.</span>
              <span>{note}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* ---------- 落款 ---------- */}
      <div className="border-t border-dashed border-ink-200 px-5 py-4">
        <div className="flex items-end justify-between gap-3">
          <div>
            <p className="text-[11px] text-ink-400">报价方</p>
            <p className="mt-0.5 text-sm font-semibold text-ink-800">{COMPANY_INFO.name}</p>
            <p className="mt-0.5 text-[11px] text-ink-400">
              有效期至 {formatDate(validUntil)}
            </p>
          </div>
          <div className="text-right">
            <p className="text-[11px] text-ink-400">咨询电话（{COMPANY_INFO.contact}）</p>
            <p className="mt-0.5 text-base font-bold text-gold-600 tabular">
              {COMPANY_INFO.phone}
            </p>
          </div>
        </div>
      </div>

      {/* ---------- 单据底部 ---------- */}
      <div className="bg-ink-800 px-5 py-2 text-center">
        <p className="text-[10px] tracking-widest text-ink-300">
          本报价单由系统自动估算 · 最终以量房后预算清单为准
        </p>
      </div>
    </div>
  );
}
