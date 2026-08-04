import LandingPage from '../../shared/LandingPage';

const brand = {
  name: '味視創媒',
  tagline: '餐飲網紅經紀，打造排隊美食熱潮',
  description: '專為餐飲連鎖品牌而生的網紅經紀服務。我們擁有美食類網紅資料庫超過 2,000 位，從美食部落客到 IG 網紅，幫助餐廳提升品牌知名度、創造排隊熱潮。從新店開幕到連鎖活動，一把罩。',
  accentColor: '#EA580C',
  secondaryColor: '#F59E0B',
  services: [
    '美食網紅資料庫配對，根據餐廳類型與目標客群精準推薦',
    '新品上市 / 開幕活動 / 連鎖行銷全方位網紅執行方案',
    '餐飲視覺內容企劃：菜單拍攝、影片製作、評論管理',
  ],
  stats: [
    { value: '2,000+', label: '美食網紅' },
    { value: '300+', label: '餐飲品牌' },
    { value: '15,000+', label: '則好評曝光' },
    { value: '24h', label: '快速回覆' },
  ],
};

export default function App() {
  return <LandingPage brand={brand} apiEndpoint="/api/lead" />;
}
