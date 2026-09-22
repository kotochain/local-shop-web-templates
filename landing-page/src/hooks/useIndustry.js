import { useCallback, useEffect, useMemo, useState } from 'react';
import { defaultIndustryId, getIndustryById } from '../config/industries';

/** theme 字段 → CSS 变量名的映射表。 */
const THEME_TO_CSS_VAR = {
  brand: '--brand',
  brandDark: '--brand-dark',
  brandSoft: '--brand-soft',
  accent: '--accent',
  bg: '--bg',
  cardBg: '--card-bg',
  text: '--text',
  muted: '--muted',
  border: '--border',
};

/**
 * 从 URL 的查询参数中读取当前行业 id。
 * @returns {string} 行业 id，缺省为 renovation
 */
function readIndustryIdFromUrl() {
  if (typeof window === 'undefined') {
    return defaultIndustryId;
  }
  const params = new URLSearchParams(window.location.search);
  const value = params.get('industry');
  return value ? value.trim() : defaultIndustryId;
}

/**
 * 把 #RRGGBB 解析为 [r, g, b]。
 * @param {string} hex 十六进制颜色
 * @returns {number[]|null} 解析失败返回 null
 */
function parseHexColor(hex) {
  const matched = /^#?([0-9a-f]{6})$/i.exec((hex || '').trim());
  if (!matched) {
    return null;
  }
  const value = matched[1];
  return [
    parseInt(value.slice(0, 2), 16),
    parseInt(value.slice(2, 4), 16),
    parseInt(value.slice(4, 6), 16),
  ];
}

/**
 * 按权重混合两个颜色，返回 rgb() 字符串。
 * @param {string} fromHex 起始色
 * @param {string} toHex 目标色
 * @param {number} weight 起始色占比（0-1）
 * @returns {string} rgb(...) 字符串，解析失败时返回起始色原值
 */
function mixHexColor(fromHex, toHex, weight) {
  const from = parseHexColor(fromHex);
  const to = parseHexColor(toHex);
  if (!from || !to) {
    return fromHex;
  }
  const ratio = Math.min(Math.max(weight, 0), 1);
  const channels = from.map((channel, index) =>
    Math.round(channel * ratio + to[index] * (1 - ratio)),
  );
  return `rgb(${channels[0]}, ${channels[1]}, ${channels[2]})`;
}

/**
 * 把行业配色写入根节点 CSS 变量，整站配色随之切换。
 * @param {object} theme 行业配色对象
 * @returns {void}
 */
function applyThemeVariables(theme) {
  if (typeof document === 'undefined') {
    return;
  }
  const root = document.documentElement;
  Object.keys(THEME_TO_CSS_VAR).forEach((key) => {
    const value = theme[key];
    if (value) {
      root.style.setProperty(THEME_TO_CSS_VAR[key], value);
    }
  });
  // 板块浅色背景：品牌浅色与页面背景按 45% 混合
  root.style.setProperty('--section-tint', mixHexColor(theme.brandSoft, theme.bg, 0.45));
  const metaThemeColor = document.querySelector('meta[name="theme-color"]');
  if (metaThemeColor) {
    metaThemeColor.setAttribute('content', theme.brand);
  }
}

/**
 * 行业状态钩子：读取 ?industry= 参数、注入主题变量、提供切换能力。
 * @returns {{ industry: object, industryId: string, setIndustryId: (id: string) => void }}
 */
export function useIndustry() {
  const [industryId, setIndustryIdState] = useState(readIndustryIdFromUrl);
  const industry = useMemo(() => getIndustryById(industryId), [industryId]);

  // 行业切换时：写入 CSS 变量 + 同步浏览器地址栏
  useEffect(() => {
    applyThemeVariables(industry.theme);
  }, [industry]);

  // 支持浏览器前进/后退按钮切换行业
  useEffect(() => {
    const handlePopState = () => {
      setIndustryIdState(readIndustryIdFromUrl());
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const setIndustryId = useCallback((nextId) => {
    const resolved = getIndustryById(nextId);
    setIndustryIdState(resolved.id);
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      params.set('industry', resolved.id);
      window.history.pushState({}, '', `${window.location.pathname}?${params.toString()}`);
    }
  }, []);

  return { industry, industryId: industry.id, setIndustryId };
}

export default useIndustry;
