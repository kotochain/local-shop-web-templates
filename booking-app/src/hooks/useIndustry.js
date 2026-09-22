import { useCallback, useEffect, useMemo, useState } from 'react';
import { DEFAULT_INDUSTRY_ID, INDUSTRY_ALIASES, THEME_VARIABLES, getIndustry, industries } from '../config/industries.js';

/**
 * 从 URL 查询参数中读取行业 ID。
 * @returns {string} 行业 ID，非法时返回默认行业 ID
 */
function readIndustryFromUrl() {
  if (typeof window === 'undefined') {
    return DEFAULT_INDUSTRY_ID;
  }
  const params = new URLSearchParams(window.location.search);
  const value = params.get('industry');
  if (value && industries[value]) {
    return value;
  }
  // 支持口语化别名（如 ?industry=gym → fitness）。
  const aliased = value ? INDUSTRY_ALIASES[value] : '';
  if (aliased && industries[aliased]) {
    return aliased;
  }
  return DEFAULT_INDUSTRY_ID;
}

/**
 * 把行业配色写入根节点 CSS 变量，实现「换行业只换变量，组件零改动」。
 * @param {object} theme 主题配色对象
 * @returns {void}
 */
function applyThemeVariables(theme = {}) {
  if (typeof document === 'undefined') {
    return;
  }
  const root = document.documentElement;
  THEME_VARIABLES.forEach(({ key, cssVar }) => {
    const value = theme[key];
    if (value) {
      root.style.setProperty(cssVar, value);
    }
  });
  // 同步移动端浏览器地址栏颜色，让深浅两套皮肤在手机上观感一致。
  const metaThemeColor = document.querySelector('meta[name="theme-color"]');
  if (metaThemeColor) {
    metaThemeColor.setAttribute('content', theme.bg || '#FFFFFF');
  }
}

/**
 * 行业状态 Hook：负责读取 URL 参数、注入主题变量、提供切换方法。
 *
 * @returns {{industry: object, setIndustry: (industryId: string) => void}} 行业配置与切换函数
 */
export function useIndustry() {
  const [industryId, setIndustryId] = useState(readIndustryFromUrl);

  const industry = useMemo(() => getIndustry(industryId), [industryId]);

  useEffect(() => {
    applyThemeVariables(industry.theme);
  }, [industry]);

  /**
   * 切换行业，同时把行业写进 URL，方便刷新后保持、也方便直接分享链接。
   * @param {string} nextId 目标行业 ID
   * @returns {void}
   */
  const setIndustry = useCallback((nextId) => {
    const safeId = industries[nextId] ? nextId : DEFAULT_INDUSTRY_ID;
    setIndustryId(safeId);
    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href);
      url.searchParams.set('industry', safeId);
      window.history.pushState({ industry: safeId }, '', url.toString());
    }
  }, []);

  // 支持浏览器前进/后退按钮切换行业。
  useEffect(() => {
    if (typeof window === 'undefined') {
      return undefined;
    }
    const handlePopState = () => {
      setIndustryId(readIndustryFromUrl());
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  return { industry, setIndustry };
}
