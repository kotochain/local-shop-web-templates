import { formatArea, formatCurrency, formatNumber } from '../utils/format.js';

/**
 * 实时结果面板：展示预估总价与逐项明细拆解
 * @param {object} props 组件参数
 * @param {object|null} props.quote 报价明细对象（面积非法时为 null）
 * @param {boolean} props.isValid 输入是否合法
 * @param {() => void} props.onGenerate 点击「生成报价单」的回调
 * @param {boolean} props.generating 是否正在生成中（用于按钮状态）
 * @returns {JSX.Element}
 */
export default function ResultPanel({
  quote,
  isValid = false,
  onGenerate,
  generating = false,
}) {
  /** 明细行渲染 */
  const renderRow = (item, highlight = false) => (
    <div
      key={item.id}
      className="flex items-start justify-between gap-3 border-b border-dashed border-ink-100 py-3 last:border-b-0"
    >
      <div className="min-w-0 flex-1">
        <p
          className={[
            'text-sm font-medium',
            highlight ? 'text-ink-800' : 'text-ink-700',
          ].join(' ')}
        >
          {item.name}
        </p>
        <p className="mt-0.5 text-xs text-ink-400">{item.formula}</p>
        {item.note && <p className="mt-0.5 text-[11px] text-ink-300">{item.note}</p>}
      </div>
      <p className="shrink-0 text-base font-semibold text-ink-800 tabular">
        {formatCurrency(item.amount)}
      </p>
    </div>
  );

  return (
    <section className="rounded-3xl bg-white p-5 shadow-card">
      <div className="flex items-center justify-between">
        <h2 className="text-base font-semibold text-ink-800">预估总价</h2>
        <span className="rounded-full bg-ink-50 px-2.5 py-1 text-[11px] text-ink-400">
          实时计算
        </span>
      </div>

      {isValid && quote ? (
        <>
          {/* 总价大数字：key 变化触发轻微动画 */}
          <div
            key={quote.total}
            className="mt-3 rounded-2xl bg-gradient-to-br from-ink-800 to-ink-700 px-5 py-5 text-white shadow-card number-pop"
          >
            <p className="text-xs text-ink-200">合计（含设计费与管理费）</p>
            <p className="mt-1 text-4xl font-bold tracking-tight tabular sm:text-5xl">
              {formatCurrency(quote.total)}
            </p>
            <div className="mt-3 flex items-center justify-between border-t border-white/15 pt-3 text-xs text-ink-100">
              <span>
                {formatArea(quote.area)}㎡ · {quote.houseType.name} · {quote.level.name}
              </span>
              <span className="tabular">
                折合 ¥{formatNumber(quote.unitPricePerSqm)}/㎡
              </span>
            </div>
          </div>

          {/* 明细拆解 */}
          <div className="mt-4">
            <h3 className="mb-1 text-sm font-semibold text-ink-700">费用明细拆解</h3>
            {renderRow(quote.baseItem, true)}
            {quote.extraItems.map((item) => renderRow(item))}
            {renderRow(quote.designItem)}
            {renderRow(quote.manageItem)}
          </div>

          {/* 小计信息 */}
          <div className="mt-3 space-y-1 rounded-2xl bg-ink-50 px-4 py-3 text-xs text-ink-500">
            <p className="flex justify-between">
              <span>基础 + 附加小计</span>
              <span className="tabular">{formatCurrency(quote.subtotal)}</span>
            </p>
            <p className="flex justify-between">
              <span>设计费 + 管理费</span>
              <span className="tabular">
                {formatCurrency(quote.designFee + quote.manageFee)}
              </span>
            </p>
          </div>

          <button
            type="button"
            onClick={onGenerate}
            disabled={generating}
            className="mt-4 w-full rounded-2xl bg-gradient-to-r from-gold-500 to-gold-400 px-6 py-4 text-lg font-bold text-ink-900 shadow-gold transition-transform duration-200 active:scale-[0.98] disabled:opacity-60"
          >
            {generating ? '已生成，可向下查看' : '生成报价单'}
          </button>
          <p className="mt-2 text-center text-xs text-ink-400">
            生成后可长按或截图保存，直接发给客户
          </p>
        </>
      ) : (
        <div className="mt-3 rounded-2xl border-2 border-dashed border-ink-200 bg-ink-50 px-5 py-8 text-center">
          <p className="text-3xl font-bold text-ink-300 tabular">¥——</p>
          <p className="mt-2 text-sm text-ink-400">填写正确的房屋面积后，立即显示预估总价</p>
        </div>
      )}
    </section>
  );
}
