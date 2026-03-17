const fs = require('fs');
const path = require('path');
const OUT = __dirname;

const SITE = 'CalcSmart';

// Reference rates vs USD (March 2025 approximate)
const RATES = {
  USD:1, EUR:0.924, GBP:0.787, JPY:149.5, CAD:1.362, AUD:1.534,
  CHF:0.902, CNY:7.241, INR:83.12, MXN:17.15, BRL:4.97, SGD:1.343,
  NZD:1.654, HKD:7.822, SEK:10.49, NOK:10.58, DKK:6.89, ZAR:18.74,
  AED:3.673, SAR:3.751, KRW:1328, TRY:32.18, THB:35.12, PLN:4.03,
  CZK:23.3, HUF:362, ILS:3.71, PHP:55.8, MYR:4.71, IDR:15620,
};

const SYMBOLS = {
  USD:'$', EUR:'€', GBP:'£', JPY:'¥', CAD:'C$', AUD:'A$',
  CHF:'Fr', CNY:'¥', INR:'₹', MXN:'$', BRL:'R$', SGD:'S$',
  NZD:'NZ$', HKD:'HK$', SEK:'kr', NOK:'kr', DKK:'kr', ZAR:'R',
  AED:'د.إ', SAR:'﷼', KRW:'₩', TRY:'₺', THB:'฿', PLN:'zł',
  CZK:'Kč', HUF:'Ft', ILS:'₪', PHP:'₱', MYR:'RM', IDR:'Rp',
};

const FLAGS = {
  USD:'🇺🇸', EUR:'🇪🇺', GBP:'🇬🇧', JPY:'🇯🇵', CAD:'🇨🇦', AUD:'🇦🇺',
  CHF:'🇨🇭', CNY:'🇨🇳', INR:'🇮🇳', MXN:'🇲🇽', BRL:'🇧🇷', SGD:'🇸🇬',
  NZD:'🇳🇿', HKD:'🇭🇰', SEK:'🇸🇪', NOK:'🇳🇴', DKK:'🇩🇰', ZAR:'🇿🇦',
  AED:'🇦🇪', SAR:'🇸🇦', KRW:'🇰🇷', TRY:'🇹🇷', THB:'🇹🇭', PLN:'🇵🇱',
  CZK:'🇨🇿', HUF:'🇭🇺', ILS:'🇮🇱', PHP:'🇵🇭', MYR:'🇲🇾', IDR:'🇮🇩',
};

const NAMES = {
  USD:'US Dollar', EUR:'Euro', GBP:'British Pound', JPY:'Japanese Yen',
  CAD:'Canadian Dollar', AUD:'Australian Dollar', CHF:'Swiss Franc',
  CNY:'Chinese Yuan', INR:'Indian Rupee', MXN:'Mexican Peso',
  BRL:'Brazilian Real', SGD:'Singapore Dollar', NZD:'New Zealand Dollar',
  HKD:'Hong Kong Dollar', SEK:'Swedish Krona', NOK:'Norwegian Krone',
  DKK:'Danish Krone', ZAR:'South African Rand', AED:'UAE Dirham',
  SAR:'Saudi Riyal', KRW:'South Korean Won', TRY:'Turkish Lira',
  THB:'Thai Baht', PLN:'Polish Zloty', CZK:'Czech Koruna', HUF:'Hungarian Forint',
  ILS:'Israeli Shekel', PHP:'Philippine Peso', MYR:'Malaysian Ringgit',
  IDR:'Indonesian Rupiah',
};

// Specific pair pages to generate
const PAIRS = [
  ['USD','EUR'], ['USD','GBP'], ['USD','JPY'], ['USD','CAD'],
  ['USD','AUD'], ['USD','INR'], ['USD','CHF'], ['USD','CNY'],
  ['EUR','GBP'], ['EUR','USD'], ['EUR','JPY'], ['GBP','USD'],
  ['GBP','EUR'], ['GBP','JPY'], ['CAD','USD'], ['AUD','USD'],
  ['JPY','USD'], ['INR','USD'], ['USD','MXN'], ['USD','BRL'],
];

function header() {
  return `<nav class="navbar">
  <div class="navbar-inner">
    <a href="index.html" class="logo"><span class="logo-icon">🧮</span>${SITE}</a>
    <ul class="nav-links" id="navLinks">
      <li><a href="index.html">Home</a></li>
      <li><a href="finance-calculators.html">Finance</a></li>
      <li><a href="health-calculators.html">Health</a></li>
      <li><a href="math-calculators.html">Math</a></li>
      <li><a href="time-calculators.html">Time</a></li>
      <li><a href="conversion-calculators.html">Conversion</a></li>
      <li><a href="currency-exchange.html" class="active">Currency</a></li>
    </ul>
    <button class="nav-toggle" onclick="document.getElementById('navLinks').classList.toggle('open')" aria-label="Menu">☰</button>
  </div>
</nav>`;
}

function footer() {
  const pairLinks = PAIRS.slice(0,10).map(([a,b])=>
    `<li><a href="${a.toLowerCase()}-to-${b.toLowerCase()}.html">${a} to ${b}</a></li>`).join('');
  return `<footer class="site-footer">
  <div class="footer-inner">
    <div class="footer-brand">
      <a href="index.html" class="logo"><span class="logo-icon">🧮</span>${SITE}</a>
      <p>Free currency exchange calculators with indicative reference rates. Updated periodically.</p>
    </div>
    <div class="footer-col"><h4>Popular Pairs</h4><ul>${pairLinks}</ul></div>
    <div class="footer-col"><h4>Finance Tools</h4><ul>
      <li><a href="mortgage-calculator.html">Mortgage Calculator</a></li>
      <li><a href="compound-interest.html">Compound Interest</a></li>
      <li><a href="roi-calculator.html">ROI Calculator</a></li>
      <li><a href="salary-calculator.html">Salary Calculator</a></li>
      <li><a href="tip-calculator.html">Tip Calculator</a></li>
    </ul></div>
    <div class="footer-col"><h4>Converters</h4><ul>
      <li><a href="currency-exchange.html">Currency Exchange</a></li>
      <li><a href="temperature-converter.html">Temperature</a></li>
      <li><a href="length-converter.html">Length</a></li>
      <li><a href="weight-converter.html">Weight</a></li>
    </ul></div>
  </div>
  <div class="footer-bottom">© ${new Date().getFullYear()} ${SITE}. Reference rates for informational purposes only.</div>
</footer>
<script>document.querySelectorAll('.faq-question').forEach(b=>b.addEventListener('click',()=>b.closest('.faq-item').classList.toggle('open')));</script>`;
}

// ── HUB PAGE ──────────────────────────────────────────────────
function buildHub() {
  const currencyOptions = Object.keys(RATES).map(c =>
    `<option value="${c}">${FLAGS[c]} ${c} – ${NAMES[c]}</option>`).join('');

  const pairCards = PAIRS.map(([a,b]) => {
    const rate = (RATES[b] / RATES[a]).toFixed(4);
    return `<a href="${a.toLowerCase()}-to-${b.toLowerCase()}.html" class="tool-card" style="min-height:unset;padding:20px 22px">
      <div style="display:flex;align-items:center;gap:10px;margin-bottom:8px">
        <span style="font-size:1.4rem">${FLAGS[a]}</span>
        <span style="color:var(--accent-2);font-size:1rem">→</span>
        <span style="font-size:1.4rem">${FLAGS[b]}</span>
      </div>
      <h3 style="font-size:.95rem;margin-bottom:4px">${NAMES[a]} to ${NAMES[b]}</h3>
      <p style="font-size:.8rem;font-family:'JetBrains Mono',monospace;color:var(--accent-3)">1 ${a} = ${rate} ${b}</p>
      <span class="arrow">→</span>
    </a>`;
  }).join('');

  const allCurrencyRows = Object.keys(RATES).map(c => {
    const toUSD = (1 / RATES[c]).toFixed(4);
    const fromUSD = RATES[c].toFixed(4);
    return `<tr>
      <td>${FLAGS[c]} ${c}</td>
      <td>${NAMES[c]}</td>
      <td style="font-family:'JetBrains Mono',monospace;color:var(--accent-3)">${fromUSD}</td>
      <td style="font-family:'JetBrains Mono',monospace;color:var(--accent-2)">${toUSD}</td>
    </tr>`;
  }).join('');

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Currency Exchange Calculator – Convert Any Currency | ${SITE}</title>
<meta name="description" content="Free currency exchange calculator. Convert between 30+ world currencies instantly. View live indicative rates for USD, EUR, GBP, JPY, CAD, AUD and more.">
<link rel="stylesheet" href="styles.css">
<style>
.rate-table{width:100%;border-collapse:collapse;margin-top:8px}
.rate-table th{padding:12px 16px;text-align:left;font-size:.78rem;font-weight:700;color:var(--text-muted);text-transform:uppercase;letter-spacing:.06em;border-bottom:1px solid var(--border-color)}
.rate-table td{padding:11px 16px;font-size:.9rem;color:var(--text-secondary);border-bottom:1px solid rgba(255,255,255,0.03)}
.rate-table tr:hover td{background:rgba(255,255,255,0.02);color:var(--text-primary)}
.swap-btn{background:none;border:none;color:var(--accent-2);font-size:1.4rem;cursor:pointer;padding:0 8px;transition:transform .2s}
.swap-btn:hover{transform:rotate(180deg)}
.currency-select-wrap{display:flex;align-items:center;gap:8px;flex:1}
.converter-row{display:flex;align-items:center;gap:12px;flex-wrap:wrap}
</style>
</head>
<body>
${header()}
<div class="site-wrapper">
<div class="calc-page">
  <div class="breadcrumb">
    <a href="index.html">Home</a><span>›</span><span class="current">Currency Exchange</span>
  </div>

  <div class="calc-header">
    <h1>💱 Currency Exchange Calculator</h1>
    <p>Convert between 30+ world currencies using indicative reference rates. Fast, free, no sign-up.</p>
  </div>

  <div class="calc-widget">
    <div style="display:grid;grid-template-columns:1fr auto 1fr;gap:16px;align-items:end;margin-bottom:24px">
      <div class="form-group">
        <label for="fromAmt">Amount</label>
        <input type="number" id="fromAmt" value="100" placeholder="Amount" oninput="convertCurrency()">
      </div>
      <div style="padding-bottom:2px">
        <button class="swap-btn" onclick="swapCurrencies()" title="Swap currencies">⇄</button>
      </div>
      <div class="form-group">
        <label for="toAmt">Converted Amount</label>
        <input type="number" id="toAmt" placeholder="Result" readonly style="background:rgba(108,92,231,0.06);border-color:rgba(108,92,231,0.2)">
      </div>
    </div>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-bottom:28px">
      <div class="form-group">
        <label for="fromCur">From Currency</label>
        <select id="fromCur" onchange="convertCurrency()">${currencyOptions}</select>
      </div>
      <div class="form-group">
        <label for="toCur">To Currency</label>
        <select id="toCur" onchange="convertCurrency()">${currencyOptions.replace('<option value="EUR">', '<option value="EUR" selected>')}</select>
      </div>
    </div>
    <div class="calc-result visible" id="calcResult">
      <div class="result-label">EXCHANGE RATE</div>
      <div class="result-value" id="rateDisplay">1 USD = 0.924 EUR</div>
      <div class="result-details" id="rateDetails">
        <span>Inverse: 1 EUR = 1.0823 USD</span>
        <span style="color:var(--text-muted);font-size:.8rem;margin-top:4px">⚠ Indicative reference rates — not for live trading</span>
      </div>
    </div>
  </div>

  <div class="content-section"><h2>Popular Currency Pairs</h2></div>
  <div class="tools-grid">${pairCards}</div>

  <div class="content-section">
    <h2>All Currency Reference Rates (vs USD)</h2>
    <div style="background:var(--bg-card);border:1px solid var(--border-color);border-radius:var(--radius-lg);overflow:hidden;overflow-x:auto">
      <table class="rate-table">
        <thead><tr><th>Currency</th><th>Name</th><th>1 USD =</th><th>1 unit = USD</th></tr></thead>
        <tbody>${allCurrencyRows}</tbody>
      </table>
    </div>
  </div>

  <div class="content-section">
    <h2>What is a Currency Exchange Calculator?</h2>
    <p>A currency exchange calculator converts a sum of money from one currency to another using a defined exchange rate. Exchange rates represent how much one currency is worth relative to another and fluctuate constantly in the foreign exchange (forex) market.</p>
    <div class="formula-box"><code>Converted Amount = Amount × (Target Rate ÷ Base Rate)</code></div>
  </div>

  <div class="content-section">
    <h2>Example</h2>
    <div class="example-box">
      <div class="example-title">📌 Example Calculation</div>
      <p>Convert $500 USD to EUR at a rate of 0.924:<br>500 × 0.924 = <strong>€462.00</strong></p>
    </div>
  </div>

  <div class="faq-section">
    <h2 style="margin-bottom:20px">Frequently Asked Questions</h2>
    <div class="faq-item"><button class="faq-question">What is an exchange rate?<span class="icon">+</span></button>
      <div class="faq-answer"><div class="faq-answer-inner">An exchange rate is the price at which one currency can be exchanged for another. For example, a USD/EUR rate of 0.92 means 1 US Dollar buys 0.92 Euros.</div></div></div>
    <div class="faq-item"><button class="faq-question">Are these rates live?<span class="icon">+</span></button>
      <div class="faq-answer"><div class="faq-answer-inner">The rates shown are indicative reference rates updated periodically. For live trading rates, always check your bank or a licensed forex broker.</div></div></div>
    <div class="faq-item"><button class="faq-question">Why is the rate different at my bank?<span class="icon">+</span></button>
      <div class="faq-answer"><div class="faq-answer-inner">Banks and money changers add a margin or fee on top of the mid-market rate. This spread is how they make a profit on currency exchange.</div></div></div>
    <div class="faq-item"><button class="faq-question">What is the mid-market rate?<span class="icon">+</span></button>
      <div class="faq-answer"><div class="faq-answer-inner">The mid-market rate (also called the interbank rate) is the midpoint between the buy and sell prices of a currency pair. It's the fairest rate and the one shown on this calculator.</div></div></div>
  </div>
</div>
</div>
${footer()}
<script>
const RATES={${Object.entries(RATES).map(([k,v])=>`${k}:${v}`).join(',')}};
function convertCurrency(){
  const amt=parseFloat(document.getElementById('fromAmt').value)||0;
  const from=document.getElementById('fromCur').value;
  const to=document.getElementById('toCur').value;
  const rate=RATES[to]/RATES[from];
  const result=amt*rate;
  document.getElementById('toAmt').value=result.toFixed(4);
  document.getElementById('rateDisplay').textContent='1 '+from+' = '+rate.toFixed(6)+' '+to;
  document.getElementById('rateDetails').innerHTML=
    '<span>Inverse: 1 '+to+' = '+(1/rate).toFixed(6)+' '+from+'</span>'+
    '<span style="color:var(--text-muted);font-size:.8rem;margin-top:4px">⚠ Indicative reference rates — not for live trading</span>';
}
function swapCurrencies(){
  const f=document.getElementById('fromCur'),t=document.getElementById('toCur');
  const tmp=f.value; f.value=t.value; t.value=tmp; convertCurrency();
}
convertCurrency();
</script>
</body>
</html>`;
  fs.writeFileSync(path.join(OUT, 'currency-exchange.html'), html, 'utf8');
  console.log('✓ currency-exchange.html');
}

// ── PAIR PAGE ─────────────────────────────────────────────────
function buildPair(from, to) {
  const rate = RATES[to] / RATES[from];
  const inv  = 1 / rate;
  const slug = `${from.toLowerCase()}-to-${to.toLowerCase()}`;

  // Quick conversion table
  const amounts = [1,5,10,25,50,100,250,500,1000,5000,10000];
  const tableRows = amounts.map(a =>
    `<tr>
      <td>${FLAGS[from]} ${a.toLocaleString()} ${from}</td>
      <td style="font-family:'JetBrains Mono',monospace;color:var(--accent-3)">${FLAGS[to]} ${(a*rate).toFixed(2)} ${to}</td>
    </tr>`).join('');

  const invRows = amounts.map(a =>
    `<tr>
      <td>${FLAGS[to]} ${a.toLocaleString()} ${to}</td>
      <td style="font-family:'JetBrains Mono',monospace;color:var(--accent-2)">${FLAGS[from]} ${(a*inv).toFixed(2)} ${from}</td>
    </tr>`).join('');

  // Other pairs from the same base (related links)
  const related = Object.keys(RATES).filter(c=>c!==from&&c!==to).slice(0,8).map(c =>
    `<a href="${from.toLowerCase()}-to-${c.toLowerCase()}.html" class="related-link">
      <span class="r-icon">${FLAGS[c]}</span>${from} to ${c}
    </a>`).join('');

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${from} to ${to} – ${NAMES[from]} to ${NAMES[to]} Converter | ${SITE}</title>
<meta name="description" content="Convert ${NAMES[from]} to ${NAMES[to]} with our free ${from}/${to} currency calculator. 1 ${from} = ${rate.toFixed(4)} ${to}. Instant conversion with reference exchange rates.">
<link rel="stylesheet" href="styles.css">
<style>
.rate-table{width:100%;border-collapse:collapse}
.rate-table th{padding:12px 16px;text-align:left;font-size:.78rem;font-weight:700;color:var(--text-muted);text-transform:uppercase;letter-spacing:.06em;border-bottom:1px solid var(--border-color)}
.rate-table td{padding:10px 16px;font-size:.9rem;color:var(--text-secondary);border-bottom:1px solid rgba(255,255,255,0.03)}
.rate-table tr:hover td{background:rgba(255,255,255,0.02)}
.pair-hero{display:flex;align-items:center;justify-content:center;gap:24px;padding:32px;background:rgba(108,92,231,0.07);border:1px solid rgba(108,92,231,0.15);border-radius:var(--radius-xl);margin-bottom:28px;flex-wrap:wrap}
.pair-hero .currency-flag{font-size:3.5rem;line-height:1}
.pair-hero .arrow{font-size:2rem;color:var(--accent-2)}
.pair-hero .rate-big{font-family:'JetBrains Mono',monospace;font-size:2rem;font-weight:700;color:var(--text-primary);text-align:center}
.pair-hero .rate-label{font-size:.8rem;color:var(--text-muted);text-align:center}
</style>
</head>
<body>
${header()}
<div class="site-wrapper">
<div class="calc-page">
  <div class="breadcrumb">
    <a href="index.html">Home</a><span>›</span>
    <a href="currency-exchange.html">Currency Exchange</a><span>›</span>
    <span class="current">${from} to ${to}</span>
  </div>

  <div class="calc-header">
    <h1>${FLAGS[from]} ${from} to ${FLAGS[to]} ${to} Converter</h1>
    <p>Convert ${NAMES[from]} (${from}) to ${NAMES[to]} (${to}) instantly. Free currency exchange calculator with indicative reference rates.</p>
  </div>

  <div class="pair-hero">
    <div style="text-align:center">
      <div class="currency-flag">${FLAGS[from]}</div>
      <div style="font-size:.9rem;font-weight:700;margin-top:6px">${from}</div>
      <div style="font-size:.75rem;color:var(--text-muted)">${NAMES[from]}</div>
    </div>
    <div class="arrow">→</div>
    <div style="text-align:center">
      <div class="rate-big">${rate.toFixed(4)}</div>
      <div class="rate-label">1 ${from} = ${rate.toFixed(4)} ${to}</div>
    </div>
    <div class="arrow" style="transform:rotate(180deg)">→</div>
    <div style="text-align:center">
      <div class="currency-flag">${FLAGS[to]}</div>
      <div style="font-size:.9rem;font-weight:700;margin-top:6px">${to}</div>
      <div style="font-size:.75rem;color:var(--text-muted)">${NAMES[to]}</div>
    </div>
  </div>

  <div class="calc-widget">
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-bottom:24px">
      <div class="form-group">
        <label for="fromAmt">${FLAGS[from]} Amount in ${from}</label>
        <input type="number" id="fromAmt" value="100" placeholder="Enter ${from} amount" oninput="calc()">
      </div>
      <div class="form-group">
        <label for="toAmt">${FLAGS[to]} Amount in ${to}</label>
        <input type="number" id="toAmt" placeholder="Result in ${to}" readonly style="background:rgba(108,92,231,0.06);border-color:rgba(108,92,231,0.2)">
      </div>
    </div>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-bottom:24px">
      <div class="form-group">
        <label for="fromAmt2">${FLAGS[to]} Amount in ${to}</label>
        <input type="number" id="fromAmt2" value="100" placeholder="Enter ${to} amount" oninput="calcInv()">
      </div>
      <div class="form-group">
        <label for="toAmt2">${FLAGS[from]} Amount in ${from}</label>
        <input type="number" id="toAmt2" placeholder="Result in ${from}" readonly style="background:rgba(0,206,201,0.06);border-color:rgba(0,206,201,0.2)">
      </div>
    </div>
    <div class="calc-result visible">
      <div class="result-label">REFERENCE EXCHANGE RATES</div>
      <div class="result-value" style="font-size:1.3rem">1 ${from} = ${rate.toFixed(6)} ${to}</div>
      <div class="result-details">
        <span>1 ${to} = ${inv.toFixed(6)} ${from}</span>
        <span style="color:var(--text-muted);font-size:.8rem">⚠ Indicative reference rates — not for live trading</span>
      </div>
    </div>
  </div>

  <div class="content-section">
    <h2>${from} to ${to} Quick Reference Table</h2>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:20px">
      <div style="background:var(--bg-card);border:1px solid var(--border-color);border-radius:var(--radius-lg);overflow:hidden">
        <table class="rate-table">
          <thead><tr><th>${from}</th><th>${to}</th></tr></thead>
          <tbody>${tableRows}</tbody>
        </table>
      </div>
      <div style="background:var(--bg-card);border:1px solid var(--border-color);border-radius:var(--radius-lg);overflow:hidden">
        <table class="rate-table">
          <thead><tr><th>${to}</th><th>${from}</th></tr></thead>
          <tbody>${invRows}</tbody>
        </table>
      </div>
    </div>
  </div>

  <div class="content-section">
    <h2>About ${NAMES[from]} and ${NAMES[to]}</h2>
    <p>The <strong>${NAMES[from]} (${from})</strong> ${from==='USD'?'is the world\'s primary reserve currency and is used for most international trade transactions.':from==='EUR'?'is the official currency of the Eurozone, used by 20 member states of the European Union.':from==='GBP'?'is one of the world\'s oldest currencies and is the official currency of the United Kingdom.':'is a major world currency used for international trade and investment.'}</p>
    <p>The <strong>${NAMES[to]} (${to})</strong> ${to==='EUR'?'is the second most traded currency in the world and a key reserve currency globally.':to==='GBP'?'remains influential in global financial markets despite Brexit.':to==='JPY'?'is a major reserve currency and is often used as a safe-haven asset during periods of global uncertainty.':'is actively traded on the global foreign exchange market.'}</p>
    <div class="formula-box"><code>${from} to ${to} = Amount × ${rate.toFixed(6)}</code></div>
  </div>

  <div class="faq-section">
    <h2 style="margin-bottom:20px">Frequently Asked Questions</h2>
    <div class="faq-item"><button class="faq-question">What is 1 ${from} in ${to}?<span class="icon">+</span></button>
      <div class="faq-answer"><div class="faq-answer-inner">Based on reference rates, 1 ${from} (${NAMES[from]}) = ${rate.toFixed(4)} ${to} (${NAMES[to]}). 
      Exchange rates fluctuate constantly — check with your bank for live rates.</div></div></div>
    <div class="faq-item"><button class="faq-question">How do I convert ${from} to ${to}?<span class="icon">+</span></button>
      <div class="faq-answer"><div class="faq-answer-inner">Simply multiply the ${from} amount by the current exchange rate. 
      For example: 500 ${from} × ${rate.toFixed(4)} = ${(500*rate).toFixed(2)} ${to}.</div></div></div>
    <div class="faq-item"><button class="faq-question">Does the exchange rate change?<span class="icon">+</span></button>
      <div class="faq-answer"><div class="faq-answer-inner">Yes. Exchange rates fluctuate based on economic data, central bank decisions, geopolitical events, and market sentiment. Rates shown here are indicative reference values.</div></div></div>
    <div class="faq-item"><button class="faq-question">Is ${from}/${to} a major currency pair?<span class="icon">+</span></button>
      <div class="faq-answer"><div class="faq-answer-inner">${['USD','EUR','GBP','JPY','CHF','CAD','AUD'].includes(from)&&['USD','EUR','GBP','JPY','CHF','CAD','AUD'].includes(to)?`Yes, ${from}/${to} is considered a major forex pair. Major pairs include USD, EUR, GBP, JPY, CHF, CAD, and AUD. They are the most liquid and widely traded.`:`${from}/${to} is considered a minor or exotic currency pair. These pairs have lower trading volume than major pairs but are still widely exchanged.`}</div></div></div>
  </div>

  <div class="related-section">
    <h2>Other ${from} Conversions</h2>
    <div class="related-grid">${related}</div>
  </div>
</div>
</div>
${footer()}
<script>
const R=${rate.toFixed(10)}, INV=${inv.toFixed(10)};
function calc(){
  const v=parseFloat(document.getElementById('fromAmt').value)||0;
  document.getElementById('toAmt').value=(v*R).toFixed(4);
}
function calcInv(){
  const v=parseFloat(document.getElementById('fromAmt2').value)||0;
  document.getElementById('toAmt2').value=(v*INV).toFixed(4);
}
calc(); calcInv();
</script>
</body>
</html>`;
  fs.writeFileSync(path.join(OUT, slug + '.html'), html, 'utf8');
  console.log('✓ ' + slug + '.html');
}

// ── RUN ───────────────────────────────────────────────────────
console.log('\n💱 Building currency exchange pages...\n');
buildHub();
PAIRS.forEach(([a,b]) => buildPair(a,b));
console.log(`\n✅ Done! Generated ${1 + PAIRS.length} currency pages.\n`);
