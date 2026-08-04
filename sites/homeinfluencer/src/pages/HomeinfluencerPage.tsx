import { useState } from 'react';

const districtOptions = ['台北市', '新北市', '桃園市', '台中市', '台南市', '高雄市', '其他'];
const propertyTypes = ['預售案', '新成屋', '中古屋', '商用不動產'];
const budgetOptions = ['3,000萬以下', '3,000-6,000萬', '6,000萬-1億', '1-3億', '3億以上'];

function EstimatedReach({ budget, district }: { budget: string; district: string }) {
  const base = district === '台北市' ? 12000 : district === '新北市' ? 9500 : district === '其他' ? 6000 : 8000;
  const multiplier = budget.includes('3億') ? 3.5 : budget.includes('1億') ? 2.2 : budget.includes('6,000萬') ? 1.5 : 1;
  const reach = Math.round(base * multiplier);
  const influencerCount = Math.round(reach / 2800);
  return (
    <div style={{ padding:'28px 32px', border:'1px solid rgba(201,168,76,0.3)', background:'rgba(201,168,76,0.04)', borderRadius:12, marginTop:32 }}>
      <p style={{ fontFamily:"'Noto Serif TC'", color:'#c9a84c', fontSize:12, letterSpacing:3, margin:'0 0 12px' }}>AI 初步估算</p>
      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:20 }}>
        <div>
          <div style={{ fontFamily:"'Noto Serif TC'", fontWeight:900, fontSize:32, color:'#c9a84c' }}>{reach.toLocaleString()}+</div>
          <div style={{ fontSize:12, color:'rgba(255,255,255,0.4)', letterSpacing:1, marginTop:4 }}>預估觸及人數</div>
        </div>
        <div>
          <div style={{ fontFamily:"'Noto Serif TC'", fontWeight:900, fontSize:32, color:'#c9a84c' }}>{influencerCount}+</div>
          <div style={{ fontSize:12, color:'rgba(255,255,255,0.4)', letterSpacing:1, marginTop:4 }}>建議網紅人選</div>
        </div>
      </div>
      <p style={{ fontSize:12, color:'rgba(255,255,255,0.25)', marginTop:16, fontWeight:300 }}>此為初步估算，實際成效需視建案條件與執行策略而定</p>
    </div>
  );
}

export default function HomeinfluencerPage({ apiEndpoint }: { apiEndpoint: string }) {
  const [step, setStep] = useState(1);
  const [eval_, setEval] = useState({ district:'', propertyType:'', budget:'', area:'', timeline:'' });
  const [contact, setContact] = useState({ name:'', email:'', company:'', message:'' });
  const [errors, setErrors] = useState<Record<string,string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const validateStep1 = () => {
    const e: Record<string,string> = {};
    if (!eval_.district) e.district = '請選擇建案所在地區';
    if (!eval_.propertyType) e.propertyType = '請選擇產品類型';
    if (!eval_.budget) e.budget = '請選擇總銷金額';
    setErrors(e);
    return Object.keys(e).length === 0;
  };
  const validateContact = () => {
    const e: Record<string,string> = {};
    if (!contact.name.trim()) e.name = '請輸入姓名';
    if (!contact.email.trim()) e.email = '請輸入 Email';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact.email)) e.email = '格式不正確';
    if (!contact.company.trim()) e.company = '請輸入公司名稱';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleNext = () => { if (validateStep1()) setStep(2); };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateContact()) return;
    setIsSubmitting(true);
    try {
      const res = await fetch(apiEndpoint, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...contact, ...eval_, source: '寓見行家-房地產網紅' }),
      });
      if (res.ok) setIsSuccess(true);
      else alert('提交失敗');
    } catch { alert('網路錯誤'); }
    finally { setIsSubmitting(false); }
  };

  return (
    <div style={{ background:'#0f0f0f', minHeight:'100vh', fontFamily:"'Noto Sans TC','PingFang TC',sans-serif", color:'white' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Noto+Serif+TC:wght@400;700;900&family=Noto+Sans+TC:wght@300;400;500;700&display=swap');
        @keyframes fadeUp { from{opacity:0;transform:translateY(30px)} to{opacity:1;transform:translateY(0)} }
        @keyframes slideDown { from{opacity:0;transform:translateY(-20px)} to{opacity:1;transform:translateY(0)} }
        .fade-up { animation: fadeUp 0.8s ease-out forwards; }
        .gold-border { border: 1px solid rgba(201,168,76,0.2); }
        .gold-border:hover { border-color: rgba(201,168,76,0.5); }
      `}</style>

      {/* Nav */}
      <nav style={{ position:'fixed', top:0, left:0, right:0, zIndex:50, padding:'20px 60px', display:'flex', justifyContent:'space-between', alignItems:'center', background:'rgba(15,15,15,0.92)', backdropFilter:'blur(20px)', borderBottom:'1px solid rgba(201,168,76,0.1)' }}>
        <div style={{ display:'flex', alignItems:'center', gap:12 }}>
          <div style={{ width:32, height:32, border:'1px solid #c9a84c', display:'flex', alignItems:'center', justifyContent:'center' }}>
            <span style={{ color:'#c9a84c', fontSize:14, fontWeight:700, fontFamily:"'Noto Serif TC',serif" }}>寓</span>
          </div>
          <span style={{ fontFamily:"'Noto Serif TC'", fontWeight:700, fontSize:18, letterSpacing:3 }}>寓見行家</span>
        </div>
        <div style={{ display:'flex', gap:32 }}>
          <a href="#eval" style={{ color:'rgba(255,255,255,0.5)', fontSize:13, textDecoration:'none', letterSpacing:1 }}>建案評估</a>
          <a href="#contact" style={{ padding:'8px 24px', border:'1px solid #c9a84c', color:'#c9a84c', fontSize:13, textDecoration:'none', letterSpacing:1 }}>預約諮詢</a>
        </div>
      </nav>

      {/* Hero + Tool */}
      <section id="eval" style={{ minHeight:'100vh', display:'flex', alignItems:'center', paddingTop:80 }}>
        <div style={{ maxWidth:900, margin:'0 auto', padding:'80px 60px', width:'100%' }}>
          <div style={{ textAlign:'center', marginBottom:48 }}>
            <p style={{ fontFamily:"'Noto Serif TC'", color:'#c9a84c', fontSize:12, letterSpacing:4, margin:'0 0 12px' }}>PROPERTY EVALUATION TOOL</p>
            <h1 style={{ fontFamily:"'Noto Serif TC'", fontWeight:900, fontSize:44, lineHeight:1.2, margin:'0 0 16px' }}>
              建案網紅行銷<br /><span style={{ color:'#c9a84c' }}>價值評估工具</span>
            </h1>
            <p style={{ color:'rgba(255,255,255,0.4)', fontSize:15, fontWeight:300 }}>填寫建案基本資料，AI 即時估算網紅行銷的預期觸及範圍</p>
          </div>

          {step === 1 && (
            <div className="fade-up" style={{ maxWidth:560, margin:'0 auto' }}>
              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:20, marginBottom:24 }}>
                {/* District */}
                <div>
                  <label style={{ display:'block', fontSize:12, color:'rgba(255,255,255,0.5)', letterSpacing:1, marginBottom:10 }}>建案所在地區</label>
                  <select value={eval_.district} onChange={e => setEval(p => ({...p, district: e.target.value}))}
                    style={{ width:'100%', padding:'14px 16px', borderRadius:8, background:'rgba(201,168,76,0.06)', border:'1px solid rgba(201,168,76,0.2)', color: eval_.district ? 'white' : 'rgba(255,255,255,0.3)', fontSize:15, outline:'none', fontFamily:"'Noto Sans TC',sans-serif", boxSizing:'border-box', cursor:'pointer', appearance:'none' }}>
                    <option value="">請選擇</option>
                    {districtOptions.map(d => <option key={d} value={d}>{d}</option>)}
                  </select>
                  {errors.district && <p style={{ color:'#f87171', fontSize:12, marginTop:4 }}>{errors.district}</p>}
                </div>
                {/* Type */}
                <div>
                  <label style={{ display:'block', fontSize:12, color:'rgba(255,255,255,0.5)', letterSpacing:1, marginBottom:10 }}>產品類型</label>
                  <select value={eval_.propertyType} onChange={e => setEval(p => ({...p, propertyType: e.target.value}))}
                    style={{ width:'100%', padding:'14px 16px', borderRadius:8, background:'rgba(201,168,76,0.06)', border:'1px solid rgba(201,168,76,0.2)', color: eval_.propertyType ? 'white' : 'rgba(255,255,255,0.3)', fontSize:15, outline:'none', fontFamily:"'Noto Sans TC',sans-serif", boxSizing:'border-box', cursor:'pointer', appearance:'none' }}>
                    <option value="">請選擇</option>
                    {propertyTypes.map(t => <option key={t} value={t}>{t}</option>)}
                  </select>
                  {errors.propertyType && <p style={{ color:'#f87171', fontSize:12, marginTop:4 }}>{errors.propertyType}</p>}
                </div>
              </div>

              {/* Budget */}
              <div style={{ marginBottom:24 }}>
                <label style={{ display:'block', fontSize:12, color:'rgba(255,255,255,0.5)', letterSpacing:1, marginBottom:10 }}>案子總銷金額</label>
                <div style={{ display:'flex', flexWrap:'wrap', gap:8 }}>
                  {budgetOptions.map(b => (
                    <button type="button" key={b} onClick={() => setEval(p => ({...p, budget: b}))}
                      style={{ padding:'10px 16px', borderRadius:8, border:`1px solid ${eval_.budget === b ? '#c9a84c' : 'rgba(201,168,76,0.2)'}`, background: eval_.budget === b ? 'rgba(201,168,76,0.15)' : 'transparent', color: eval_.budget === b ? '#c9a84c' : 'rgba(255,255,255,0.5)', fontSize:13, cursor:'pointer', transition:'all 0.2s', fontFamily:"'Noto Sans TC',sans-serif" }}>
                      {b}
                    </button>
                  ))}
                </div>
                {errors.budget && <p style={{ color:'#f87171', fontSize:12, marginTop:8 }}>{errors.budget}</p>}
              </div>

              <button type="button" onClick={handleNext}
                style={{ width:'100%', padding:'16px', borderRadius:8, background:'transparent', border:'1px solid #c9a84c', color:'#c9a84c', fontWeight:700, fontSize:14, cursor:'pointer', letterSpacing:2 }}>
                產生評估報告 →
              </button>
            </div>
          )}

          {step === 2 && !isSuccess && (
            <div className="fade-up">
              {eval_.district && eval_.budget && <EstimatedReach budget={eval_.budget} district={eval_.district} />}

              <div id="contact" style={{ marginTop:32 }}>
                <p style={{ fontFamily:"'Noto Serif TC'", color:'#c9a84c', fontSize:12, letterSpacing:3, margin:'24px 0 16px' }}>CONTACT</p>
                <form onSubmit={handleSubmit} style={{ display:'flex', flexDirection:'column', gap:16 }}>
                  {[{n:'name',p:'姓名 *',t:'text'},{n:'company',p:'公司名稱 *',t:'text'},{n:'email',p:'Email *',t:'email'}].map(f => (
                    <div key={f.n}>
                      <input name={f.n} type={f.t} value={(contact as any)[f.n]} onChange={e => setContact(p => ({...p, [e.target.name]: e.target.value}))}
                        placeholder={f.p} style={{ width:'100%', padding:'14px 0', border:'none', borderBottom:'1px solid rgba(201,168,76,0.3)', background:'transparent', color:'white', fontSize:15, outline:'none', fontFamily:"'Noto Sans TC',sans-serif", boxSizing:'border-box' }} />
                      {errors[f.n] && <p style={{ color:'#f87171', fontSize:12, marginTop:4 }}>{errors[f.n]}</p>}
                    </div>
                  ))}
                  <textarea name="message" value={contact.message} onChange={e => setContact(p => ({...p, message: e.target.value}))} rows={3}
                    placeholder="建案名稱、預計開案時間、特殊需求..."
                    style={{ width:'100%', padding:'14px 0', border:'none', borderBottom:'1px solid rgba(201,168,76,0.3)', background:'transparent', color:'white', fontSize:15, outline:'none', resize:'none', fontFamily:"'Noto Sans TC',sans-serif", boxSizing:'border-box' }} />
                  <button type="submit" disabled={isSubmitting}
                    style={{ marginTop:16, padding:'16px', background:'transparent', border:'1px solid #c9a84c', color:'#c9a84c', fontWeight:700, fontSize:13, letterSpacing:2, cursor:isSubmitting?'not-allowed':'pointer' }}>
                    {isSubmitting ? '傳送中...' : '索取完整顧問報告 →'}
                  </button>
                </form>
              </div>
            </div>
          )}

          {isSuccess && (
            <div style={{ textAlign:'center', padding:'48px 32px', border:'1px solid rgba(201,168,76,0.3)', background:'rgba(201,168,76,0.04)', borderRadius:16, marginTop:40 }}>
              <div style={{ fontSize:48, marginBottom:16 }}>✓</div>
              <h3 style={{ fontFamily:"'Noto Serif TC'", fontWeight:700, fontSize:24, color:'#c9a84c', margin:'0 0 8px' }}>報告已送出</h3>
              <p style={{ color:'rgba(255,255,255,0.4)', fontSize:14 }}>我們的專案經理會在36小時內與您聯繫</p>
            </div>
          )}
        </div>
      </section>

      {/* Why us */}
      <section style={{ padding:'80px 60px', borderTop:'1px solid rgba(201,168,76,0.08)' }}>
        <div style={{ maxWidth:900, margin:'0 auto' }}>
          <h2 style={{ fontFamily:"'Noto Serif TC'", fontWeight:900, fontSize:28, color:'white', margin:'0 0 48px', textAlign:'center' }}>為什麼選擇寓見行家</h2>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:1, border:'1px solid rgba(201,168,76,0.15)' }}>
            {[
              {n:'01',t:'新建案網紅行銷',d:'線上蓄客、看屋團、代銷培訓，結合網紅帶看與精準廣告投放'},
              {n:'02',t:'地產網紅資料庫',d:'根據建案地點、坪數與目標客群，AI推薦最適合的在地網紅人選'},
              {n:'03',t:'購屋內容策略',d:'置產理財、在地生活、室內設計，打造高質感購屋決策內容'},
            ].map((s,i) => (
              <div key={i} style={{ padding:'40px 32px', borderRight:i<2?'1px solid rgba(201,168,76,0.15)':'none', background:'rgba(201,168,76,0.02)' }}>
                <div style={{ fontSize:11, color:'rgba(201,168,76,0.4)', letterSpacing:3, marginBottom:16 }}>{s.n}</div>
                <h3 style={{ fontFamily:"'Noto Serif TC'", fontWeight:700, fontSize:18, color:'white', margin:'0 0 12px' }}>{s.t}</h3>
                <p style={{ fontSize:14, color:'rgba(255,255,255,0.35)', lineHeight:1.9, fontWeight:300 }}>{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer style={{ padding:'32px 60px', borderTop:'1px solid rgba(201,168,76,0.08)', textAlign:'center' }}>
        <p style={{ color:'rgba(255,255,255,0.1)', fontSize:11, letterSpacing:1, margin:0 }}>© 2026 HOME INFLUENCER ADVISORS · 房地產網紅經紀</p>
      </footer>
    </div>
  );
}
