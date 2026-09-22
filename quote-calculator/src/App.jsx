import { useEffect, useMemo, useRef, useState } from 'react';
import AreaInput from './components/AreaInput.jsx';
import ExtraItemsPicker from './components/ExtraItemsPicker.jsx';
import HouseTypePicker from './components/HouseTypePicker.jsx';
import LevelPicker from './components/LevelPicker.jsx';
import QuoteSlip from './components/QuoteSlip.jsx';
import ResultPanel from './components/ResultPanel.jsx';
import { calculateQuote, quoteToText, validateArea } from './utils/calculate.js';
import { generateQuoteNo } from './utils/format.js';

/**
 * 装修报价计算器 —— 应用主组件
 * 全部状态保存在组件内部，纯前端运行，无需后端接口
 * @returns {JSX.Element}
 */
export default function App() {
  // ---------- 表单状态 ----------
  const [houseType, setHouseType] = useState('two');
  const [area, setArea] = useState('80');
  const [level, setLevel] = useState('standard');
  const [extras, setExtras] = useState(['plumbing']);
  const [customerName, setCustomerName] = useState('');

  // ---------- 报价单状态 ----------
  const [showSlip, setShowSlip] = useState(false);
  const [quoteNo, setQuoteNo] = useState('');
  const [createdAt, setCreatedAt] = useState(null);
  const [copyTip, setCopyTip] = useState('');

  const slipRef = useRef(null);

  // ---------- 面积校验 ----------
  const areaCheck = useMemo(() => validateArea(area), [area]);
  const areaValid = areaCheck.valid;

  // ---------- 实时计算报价（任一参数变化立即重算） ----------
  const quote = useMemo(() => {
    if (!areaValid) return null;
    return calculateQuote({
      area: areaCheck.value,
      houseType,
      level,
      extras,
    });
  }, [areaValid, areaCheck.value, houseType, level, extras]);

  // ---------- 生成报价单后自动滚动到报价单区域 ----------
  useEffect(() => {
    if (showSlip && slipRef.current) {
      slipRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [showSlip]);

  /** 点击「生成报价单」 */
  const handleGenerate = () => {
    if (!quote) return;
    const now = new Date();
    setCreatedAt(now);
    setQuoteNo(generateQuoteNo(now));
    setShowSlip(true);
    setCopyTip('');
  };

  /** 复制报价文字到剪贴板（方便直接粘贴到微信） */
  const handleCopy = async () => {
    if (!quote) return;
    const text = quoteToText(quote, customerName);
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
      } else {
        // 降级方案：使用隐藏 textarea + execCommand
        const textarea = document.createElement('textarea');
        textarea.value = text;
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
      }
      setCopyTip('已复制，可直接粘贴到微信');
    } catch (error) {
      setCopyTip('复制失败，请长按报价单截图保存');
    }
    window.setTimeout(() => setCopyTip(''), 2600);
  };

  return (
    <div className="min-h-screen bg-ink-50 pb-14">
      {/* ============ 顶部标题 ============ */}
      <header className="bg-gradient-to-b from-ink-800 to-ink-700 px-5 pb-14 pt-8 text-white">
        <p className="text-xs text-gold-300">装修报价 · 快速估算</p>
        <h1 className="mt-1 text-2xl font-bold tracking-wide">装修报价计算器</h1>
        <p className="mt-2 max-w-md text-sm leading-relaxed text-ink-200">
          填写房屋信息，1 秒得出预估总价与费用明细，还能生成一张能直接发给客户的报价单。
        </p>
      </header>

      {/* ============ 主体内容（上移到深色区之上，形成层次） ============ */}
      <main className="-mt-10 mx-auto max-w-xl space-y-4 px-4">
        {/* ---------- 表单卡片 ---------- */}
        <section className="space-y-5 rounded-3xl bg-white p-5 shadow-card">
          {/* 房屋类型 */}
          <div>
            <div className="mb-3 flex items-center gap-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-ink-700 text-xs font-bold text-white">
                1
              </span>
              <h2 className="text-base font-semibold text-ink-800">选择房屋类型</h2>
            </div>
            <HouseTypePicker value={houseType} onChange={setHouseType} />
          </div>

          {/* 面积 */}
          <div>
            <div className="mb-3 flex items-center gap-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-ink-700 text-xs font-bold text-white">
                2
              </span>
              <h2 className="text-base font-semibold text-ink-800">填写房屋面积</h2>
            </div>
            <AreaInput value={area} onChange={setArea} error={areaCheck.message} />
          </div>

          {/* 装修档次 */}
          <div>
            <div className="mb-3 flex items-center gap-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-ink-700 text-xs font-bold text-white">
                3
              </span>
              <h2 className="text-base font-semibold text-ink-800">选择装修档次</h2>
            </div>
            <LevelPicker value={level} onChange={setLevel} />
          </div>

          {/* 附加项 */}
          <div>
            <div className="mb-3 flex items-center gap-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-ink-700 text-xs font-bold text-white">
                4
              </span>
              <h2 className="text-base font-semibold text-ink-800">勾选附加项</h2>
              <span className="text-xs text-ink-400">可多选</span>
            </div>
            <ExtraItemsPicker
              value={extras}
              onChange={setExtras}
              area={areaCheck.value}
              areaValid={areaValid}
            />
          </div>
        </section>

        {/* ---------- 实时结果 ---------- */}
        <ResultPanel
          quote={quote}
          isValid={areaValid}
          onGenerate={handleGenerate}
          generating={showSlip}
        />

        {/* ---------- 报价单区域 ---------- */}
        {showSlip && quote && (
          <section ref={slipRef} className="animate-fade-in-up pt-2">
            {/* 客户称呼输入 */}
            <div className="mb-3 rounded-2xl bg-white p-4 shadow-card">
              <label
                htmlFor="customer-name"
                className="mb-2 block text-sm font-semibold text-ink-800"
              >
                客户称呼（选填，会显示在报价单上）
              </label>
              <input
                id="customer-name"
                type="text"
                value={customerName}
                onChange={(event) => setCustomerName(event.target.value)}
                placeholder="例如：王先生"
                maxLength={20}
                className="w-full rounded-xl border-2 border-ink-100 bg-white px-4 py-3 text-base text-ink-800 outline-none transition-colors duration-200 placeholder:text-ink-300 focus:border-ink-600"
              />
            </div>

            {/* 截图提示 */}
            <div className="mb-3 flex items-center gap-2 rounded-2xl border border-gold-200 bg-gold-50 px-4 py-3">
              <span className="shrink-0 rounded-full bg-gold-500 px-2 py-0.5 text-[11px] font-bold text-ink-900">
                提示
              </span>
              <p className="text-xs leading-relaxed text-gold-700">
                下方这张报价单可直接<strong>手机截图</strong>保存，或长按图片发给客户微信；
                也可以点「复制报价文字」直接粘贴。
              </p>
            </div>

            {/* 报价单卡片 */}
            <QuoteSlip
              quote={quote}
              customerName={customerName}
              quoteNo={quoteNo}
              createdAt={createdAt}
            />

            {/* 操作按钮 */}
            <div className="mt-4 flex gap-3">
              <button
                type="button"
                onClick={handleCopy}
                className="flex-1 rounded-2xl border-2 border-ink-700 px-4 py-3.5 text-base font-semibold text-ink-700 transition-transform duration-200 active:scale-[0.98]"
              >
                复制报价文字
              </button>
              <button
                type="button"
                onClick={() => setShowSlip(false)}
                className="flex-1 rounded-2xl bg-ink-100 px-4 py-3.5 text-base font-semibold text-ink-600 transition-transform duration-200 active:scale-[0.98]"
              >
                收起报价单
              </button>
            </div>
            {copyTip && (
              <p className="mt-2 text-center text-sm text-pine-600 animate-fade-in-up">
                {copyTip}
              </p>
            )}
          </section>
        )}
      </main>

      {/* ============ 页脚 ============ */}
      <footer className="mt-8 px-6 text-center">
        <p className="text-xs leading-relaxed text-ink-400">
          本工具给出的价格为系统估算值，仅供参考，实际报价以量房后的预算清单为准。
        </p>
      </footer>
    </div>
  );
}
