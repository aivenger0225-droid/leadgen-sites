import LandingPage from '../../shared/LandingPage';

const brand = {
  name: '潮界經紀',
  tagline: '一站式網紅變現合作，全產業適用',
  description: '跨產業網紅經紀平台，匯集各類型網紅超過 5,000 位，從美妝時尚到 3C 數位，從親子育兒到運動健身，一站式完成網紅洽談、簽約、執行、結案完整流程。讓品牌專注行銷策略，其他交給我們。',
  accentColor: '#7C3AED',
  secondaryColor: '#A855F7',
  services: [
    '跨產業網紅資料庫：5,000+ 網紅任君挑選，AI 智能配對',
    '從洽談、報價、簽約到結案，全流程經紀管理服務',
    '網紅帳號內容輔導與商業變現策略顧問',
  ],
  stats: [
    { value: '5,000+', label: '網紅資料庫' },
    { value: '30+', label: '產業覆蓋' },
    { value: '1,200+', label: '完成案例' },
    { value: '12h', label: '急速回覆' },
  ],
};

export default function App() {
  return <LandingPage brand={brand} apiEndpoint="/api/lead" />;
}
