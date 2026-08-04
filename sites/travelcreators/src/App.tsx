import LandingPage from './pages/LandingPage';

const brand = {
  name: '遊獵傳媒',
  tagline: '旅遊網紅內容，為品牌打造深度體驗敘事',
  description: '專精旅遊、飯店、航空、旅遊平台的網紅內容供應商。擁有海內外旅遊網紅超過 2,500 位，從背包客到商務旅客，幫助旅遊品牌說出動人的故事，提升品牌忠誠度與預訂轉換率。',
  accentColor: '#0369A1',
  secondaryColor: '#0EA5E9',
  services: [
    '旅遊體驗影片、圖文內容、直播帶貨網紅整合方案',
    '飯店 / 航空 / 旅遊平台 新客获取與忠誠度提升策略',
    '海內外 KOL 在地深度體驗內容製作',
  ],
  stats: [
    { value: '2,500+', label: '旅遊網紅' },
    { value: '150+', label: '旅遊品牌' },
    { value: '10,000+', label: '深度內容' },
    { value: '24h', label: '快速回覆' },
  ],
};

export default function App() {
  return <LandingPage brand={brand} apiEndpoint="/api/lead" />;
}
