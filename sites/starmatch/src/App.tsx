import LandingPage from './pages/LandingPage';

const brand = {
  name: '星脈行銷',
  tagline: '電商網紅媒合，精準對接品牌所需流量',
  description: '匯集全台超過 3,000 位電商領域網紅，從微型 KOC 到百萬網紅一站配對。我們深知電商客戶的需求：精準的受眾、透明的數據、可靠的執行。協助品牌用最短時間找到最合適的網紅合作人選。',
  accentColor: '#4F46E5',
  secondaryColor: '#7C3AED',
  services: [
    '根據品牌受眾屬性，從 3,000+ 網紅資料庫中智慧配對最適合人選',
    '提供完整合作報價與合作方案建議，全程專人執行管理',
    '合作成效追蹤：曝光、點擊、轉換率完整報告',
  ],
  stats: [
    { value: '3,000+', label: '網紅資料庫' },
    { value: '500+', label: '完成案例' },
    { value: '98%', label: '客戶滿意' },
    { value: '24h', label: '快速回覆' },
  ],
};

export default function App() {
  return <LandingPage brand={brand} apiEndpoint="/api/lead" />;
}
