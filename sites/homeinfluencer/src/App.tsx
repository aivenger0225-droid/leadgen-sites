import LandingPage from '../../shared/LandingPage';

const brand = {
  name: '寓見行家',
  tagline: '房地產網紅經紀，精準觸及購屋族群',
  description: '專業的房地產網紅行銷顧問，連結建案與精準購屋族群。擁有全台房地產、生活居家類型網紅超過 1,500 位，協助新建案線上蓄客、看屋團報名、代銷培訓，打造房地產專屬的網紅帶看生態。',
  accentColor: '#0D9488',
  secondaryColor: '#14B8A6',
  services: [
    '新建案網紅行銷方案：線上蓄客、看屋團、代銷培訓',
    '房地產網紅資料庫配對：根據建案地點與目標客群推薦',
    '購屋族群內容策略：置產理財、在地生活、裝潢風格全方位內容',
  ],
  stats: [
    { value: '1,500+', label: '地產網紅' },
    { value: '200+', label: '建案合作' },
    { value: '8,000+', label: '帶看報名' },
    { value: '36h', label: '快速回覆' },
  ],
};

export default function App() {
  return <LandingPage brand={brand} apiEndpoint="/api/lead" />;
}
