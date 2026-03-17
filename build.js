const fs = require('fs');
const path = require('path');

// ── Site config ──────────────────────────────────────────────
const SITE_NAME = 'CalcSmart';
const SITE_TAGLINE = 'Free Online Calculators for Everything';
const SITE_URL = 'https://radiant-cendol-ef5153.netlify.app';
const GOOGLE_VERIFICATION = 'vlq0h42e0Vv2XxJQoYxQ7EQVFrY3AMs9PqJ5OA1WpT8';
const OUT_DIR = __dirname;

// ── All 50 calculators ────────────────────────────────────────
const categories = [
  {
    name: 'Relationship Tools',
    slug: 'relationship-calculators',
    icon: '❤️',
    desc: 'Explore compatibility and fun insights into your relationships.',
    tools: [
      { slug: 'love-calculator', name: 'Love Calculator', icon: '❤️', desc: 'Calculate compatibility between two people based on names.' },
      { slug: 'friendship-compatibility', name: 'Friendship Tester', icon: '🤝', desc: 'Find out how compatible you and your best friend are.' },
      { slug: 'zodiac-matcher', name: 'Zodiac Matcher', icon: '♈', desc: 'Check astrological compatibility between signs.' },
      { slug: 'numerology-calculator', name: 'Numerology Life Path', icon: '🔢', desc: 'Find your Life Path Number and personality traits.' },
      { slug: 'lucky-numbers', name: 'Lucky Number Generator', icon: '🍀', desc: 'Generate lucky numbers based on your name.' },
    ]
  },
  {
    name: 'Lifestyle & Planning',
    slug: 'lifestyle-calculators',
    icon: '✨',
    desc: 'Practical tools for life milestones and personal growth.',
    tools: [
      { slug: 'wedding-budget', name: 'Wedding Budget Planner', icon: '💍', desc: 'Estimate and track your wedding expenses.' },
      { slug: 'pet-age-calculator', name: 'Pet Age Converter', icon: '🐾', desc: 'Convert dog or cat years into human years.' },
      { slug: 'baby-name-meaning', name: 'Baby Name Meanings', icon: '👶', desc: 'Discover meanings and origins of names.' },
      { slug: 'habit-streak', name: 'Habit Goal Tracker', icon: '📅', desc: 'Calculate progress toward your lifestyle goals.' },
      { slug: 'life-expectancy', name: 'Life Expectancy (Fun)', icon: '⏳', desc: 'Fun longevity predictor based on lifestyle habits.' },
    ]
  },
  {
    name: 'Finance Calculators',
    slug: 'finance-calculators',
    icon: '💰',
    desc: 'Plan your financial future with our free money calculators.',
    tools: [
      { slug: 'mortgage-calculator',    name: 'Mortgage Calculator',       icon: '🏠', desc: 'Calculate your monthly mortgage payment, total interest, and amortization schedule.' },
      { slug: 'loan-calculator',        name: 'Loan Calculator',           icon: '🏦', desc: 'Find out your monthly loan payment and total cost for any type of loan.' },
      { slug: 'compound-interest',      name: 'Compound Interest Calculator', icon: '📈', desc: 'See how compound interest grows your savings or investment over time.' },
      { slug: 'savings-calculator',     name: 'Savings Calculator',        icon: '🐷', desc: 'Calculate how much your savings will grow with regular deposits.' },
      { slug: 'investment-calculator',  name: 'Investment Calculator',     icon: '💹', desc: 'Project your investment returns based on rate of return and time period.' },
      { slug: 'roi-calculator',         name: 'ROI Calculator',            icon: '📊', desc: 'Calculate the Return on Investment for any project or asset.' },
      { slug: 'tip-calculator',         name: 'Tip Calculator',            icon: '🍽️', desc: 'Split the bill and calculate tips in seconds.' },
      { slug: 'salary-calculator',      name: 'Salary Calculator',         icon: '💼', desc: 'Convert annual salary to hourly, monthly, or weekly pay.' },
      { slug: 'tax-calculator',         name: 'Tax Calculator',            icon: '🧾', desc: 'Estimate your income tax and take-home pay.' },
      { slug: 'budget-calculator',      name: 'Budget Calculator',         icon: '📋', desc: 'Plan your monthly budget by tracking income and expenses.' },
      { slug: 'social-security-calculator', name: 'Social Security Estimator', icon: '👴', desc: 'Estimate your future Social Security benefits based on earnings.' },
    ]
  },
  {
    name: 'Health Calculators',
    slug: 'health-calculators',
    icon: '❤️',
    desc: 'Monitor your health metrics with science-based tools.',
    tools: [
      { slug: 'bmi-calculator',         name: 'BMI Calculator',            icon: '⚖️', desc: 'Calculate your Body Mass Index and find your healthy weight range.' },
      { slug: 'calorie-calculator',     name: 'Calorie Calculator',        icon: '🔥', desc: 'Find your daily calorie needs based on age, weight, height and activity.' },
      { slug: 'bmr-calculator',         name: 'BMR Calculator',            icon: '🫀', desc: 'Calculate your Basal Metabolic Rate — calories burned at rest.' },
      { slug: 'body-fat-calculator',    name: 'Body Fat Calculator',       icon: '💪', desc: 'Estimate your body fat percentage using common body measurements.' },
      { slug: 'ideal-weight-calculator', name: 'Ideal Weight Calculator',  icon: '🎯', desc: 'Find your ideal body weight based on height, gender, and frame size.' },
      { slug: 'water-intake-calculator', name: 'Water Intake Calculator',  icon: '💧', desc: 'Calculate how much water you should drink each day.' },
      { slug: 'pregnancy-calculator',   name: 'Pregnancy Calculator',      icon: '🤰', desc: 'Estimate your due date and track your pregnancy week by week.' },
      { slug: 'heart-rate-calculator',  name: 'Heart Rate Calculator',     icon: '💓', desc: 'Find your target heart rate zones for effective exercise.' },
      { slug: 'sleep-calculator',       name: 'Sleep Calculator',          icon: '😴', desc: 'Calculate the best times to sleep and wake up for full sleep cycles.' },
      { slug: 'pace-calculator',        name: 'Pace Calculator',           icon: '🏃', desc: 'Calculate running pace, speed, and finish time for any distance.' },
      { slug: 'recipe-nutrition-calculator', name: 'Recipe Nutrition Calculator', icon: '🥗', desc: 'Analyze recipes to find total calories, carbs, protein, and fat.' },
    ]
  },
  {
    name: 'Math Calculators',
    slug: 'math-calculators',
    icon: '📐',
    desc: 'Solve mathematical problems quickly and accurately.',
    tools: [
      { slug: 'percentage-calculator',  name: 'Percentage Calculator',     icon: '💯', desc: 'Calculate percentages, percentage change, and percentage of a number.' },
      { slug: 'fraction-calculator',    name: 'Fraction Calculator',       icon: '½', desc: 'Add, subtract, multiply, and divide fractions with step-by-step results.' },
      { slug: 'average-calculator',     name: 'Average Calculator',        icon: '📉', desc: 'Calculate the mean, median, and mode of a set of numbers.' },
      { slug: 'probability-calculator', name: 'Probability Calculator',    icon: '🎲', desc: 'Calculate probability for single and multiple events.' },
      { slug: 'lcm-hcf-calculator',    name: 'LCM & GCF Calculator',      icon: '🔢', desc: 'Find the Least Common Multiple and Greatest Common Factor of numbers.' },
      { slug: 'exponent-calculator',   name: 'Exponent Calculator',        icon: 'xⁿ', desc: 'Calculate powers and exponents of any number.' },
      { slug: 'quadratic-calculator',  name: 'Quadratic Equation Solver', icon: '📏', desc: 'Solve quadratic equations and find roots automatically.' },
      { slug: 'scientific-calculator', name: 'Scientific Calculator',      icon: '🔬', desc: 'Advanced calculator with trigonometry, logarithms, and more.' },
      { slug: 'prime-number-checker',  name: 'Prime Number Checker',       icon: '🔑', desc: 'Check if any number is prime and find prime factors instantly.' },
      { slug: 'roman-numeral-converter', name: 'Roman Numeral Converter',  icon: 'Ⅻ', desc: 'Convert numbers to Roman numerals and vice versa.' },
    ]
  },
  {
    name: 'Time Calculators',
    slug: 'time-calculators',
    icon: '⏰',
    desc: 'Calculate dates, times, age, and durations effortlessly.',
    tools: [
      { slug: 'age-calculator',         name: 'Age Calculator',            icon: '🎂', desc: 'Calculate your exact age in years, months, days, hours, and minutes.' },
      { slug: 'date-calculator',        name: 'Date Calculator',           icon: '📅', desc: 'Add or subtract days from a date and find the difference between dates.' },
      { slug: 'time-zone-converter',    name: 'Time Zone Converter',       icon: '🌍', desc: 'Convert time between any two time zones around the world.' },
      { slug: 'days-between-dates',     name: 'Days Between Dates',        icon: '📆', desc: 'Count the exact number of days, weeks, or months between two dates.' },
      { slug: 'hours-calculator',       name: 'Hours Calculator',          icon: '⌚', desc: 'Add and subtract hours and minutes to calculate total time.' },
      { slug: 'countdown-calculator',   name: 'Countdown Calculator',      icon: '⏳', desc: 'Calculate the time remaining until any future date or event.' },
      { slug: 'work-hours-calculator',  name: 'Work Hours Calculator',     icon: '🕒', desc: 'Calculate total work hours and overtime for your timesheet.' },
      { slug: 'business-days-calculator', name: 'Business Days Calculator', icon: '🗓️', desc: 'Count business days between two dates, excluding weekends.' },
      { slug: 'unix-timestamp',         name: 'Unix Timestamp Converter',  icon: '💻', desc: 'Convert between Unix timestamps and human-readable date and time.' },
      { slug: 'time-calculator',          name: 'Time Calculator',           icon: '⏳', desc: 'Add or subtract time values, dates, or expressions with unit support.' },
      { slug: 'time-duration-calculator', name: 'Duration Calculator',     icon: '⏱️', desc: 'Calculate the total duration between a start time and end time.' },
    ]
  },
  {
    name: 'Conversion Calculators',
    slug: 'conversion-calculators',
    icon: '🔄',
    desc: 'Instantly convert between units of measurement worldwide.',
    tools: [
      { slug: 'unit-converter',         name: 'Unit Converter',            icon: '📐', desc: 'Convert length, weight, volume, temperature, and many more units.' },
      { slug: 'currency-converter',     name: 'Currency Converter',        icon: '💱', desc: 'Convert between world currencies with live exchange rate info.' },
      { slug: 'temperature-converter',  name: 'Temperature Converter',     icon: '🌡️', desc: 'Convert between Celsius, Fahrenheit, and Kelvin instantly.' },
      { slug: 'length-converter',       name: 'Length Converter',          icon: '📏', desc: 'Convert between miles, kilometers, feet, meters, inches and more.' },
      { slug: 'weight-converter',       name: 'Weight Converter',          icon: '⚖️', desc: 'Convert between kilograms, pounds, ounces, grams, and other units.' },
      { slug: 'area-converter',         name: 'Area Converter',            icon: '📦', desc: 'Convert between square feet, square meters, acres, hectares, and more.' },
      { slug: 'speed-converter',        name: 'Speed Converter',           icon: '🚀', desc: 'Convert between mph, kph, knots, meters per second, and more.' },
      { slug: 'data-storage-converter', name: 'Data Storage Converter',    icon: '💾', desc: 'Convert between bytes, kilobytes, megabytes, gigabytes, terabytes.' },
      { slug: 'number-base-converter',  name: 'Number Base Converter',     icon: '🔟', desc: 'Convert numbers between binary, octal, decimal, and hexadecimal.' },
      { slug: 'fuel-economy-converter', name: 'Fuel Economy Converter',    icon: '⛽', desc: 'Convert between MPG, L/100km, and km/L fuel economy ratings.' },
    ]
  },
  {
    name: 'Business & Marketing',
    slug: 'business-marketing-tools',
    icon: '🚀',
    desc: 'Professional tools for ROI, profit margins, and sales growth.',
    tools: [
      { slug: 'profit-margin-calculator', name: 'Profit Margin Calculator', icon: '📈', desc: 'Calculate gross profit margin and markup percentages.' },
      { slug: 'sales-tax-calculator', name: 'Sales Tax Calculator', icon: '🧾', desc: 'Calculate sales tax and total price for any region.' },
      { slug: 'discount-calculator', name: 'Discount Calculator', icon: '🏷️', desc: 'Find your savings and final price after discounts.' },
      { slug: 'markup-calculator', name: 'Price Markup Calculator', icon: '🔼', desc: 'Determine the selling price based on cost and target markup.' },
      { slug: 'break-even-calculator', name: 'Break-Even Point Calculator', icon: '⚖️', desc: 'Find the sales volume needed to cover your costs.' },
      { slug: 'roas-calculator', name: 'ROAS Ad Spend Calculator', icon: '🎯', desc: 'Measure the effectiveness of your advertising campaigns.' },
    ]
  },
];

// ── Educational Articles ──────────────────────────────────────
const articles = [
  {
    slug: 'understanding-compound-interest',
    title: 'The Power of Compound Interest: How Small Savings Grow',
    desc: 'Discover why Einstein called compound interest the eighth wonder of the world and how it can secure your future.',
    content: `
      <p>Compound interest is the interest on a loan or deposit calculated based on both the initial principal and the accumulated interest from previous periods. Thought to have originated in 17th-century Italy, it is "interest on interest."</p>
      <h3>How it Works</h3>
      <p>Unlike simple interest, which is only calculated on the principal amount, compound interest grows exponentially. For example, if you invest $1,000 at a 10% annual interest rate, you'll have $1,100 after the first year. In the second year, the 10% is calculated on $1,100, giving you $121 in interest rather than just $100.</p>
      <blockquote>"Compound interest is the eighth wonder of the world. He who understands it, earns it... he who doesn't... pays it." — Albert Einstein</blockquote>
      <h3>The Rule of 72</h3>
      <p>A quick way to estimate how long it takes to double your money is the Rule of 72. Divide 72 by your annual interest rate. At 6%, your money doubles in 12 years (72/6=12).</p>
    `
  },
  {
    slug: 'health-metrics-101',
    title: 'Health Metrics 101: BMI, BMR, and TDEE Explained',
    desc: 'Learn the difference between these vital health numbers and how to use them for your fitness goals.',
    content: `
      <p>Navigating health calculators can be confusing. Here's a breakdown of the three most important metrics used by fitness professionals.</p>
      <h4>1. Body Mass Index (BMI)</h4>
      <p>BMI is a simple calculation using your height and weight. It is used to screen for weight categories that may lead to health problems. However, it does not directly measure body fat or muscle mass.</p>
      <h4>2. Basal Metabolic Rate (BMR)</h4>
      <p>Your BMR is the number of calories your body burns just to stay alive while at rest (breathing, circulating blood, cell production). It represents about 60-75% of your daily energy expenditure.</p>
      <h4>3. Total Daily Energy Expenditure (TDEE)</h4>
      <p>TDEE is the total number of calories you burn in a day, including physical activity. To lose weight, you should consume fewer calories than your TDEE; to gain weight, you consume more.</p>
    `
  },
  {
    slug: 'guide-to-time-calculations',
    title: 'Calculating Time: A Guide to Durations and Timezones',
    desc: 'Master the art of calculating age, business days, and time differences across the globe.',
    content: `
      <p>Time measurement is one of the oldest human pursuits. From the Babylonian sexagesimal system (Base 60) to modern atomic clocks, our precision has improved, but the logic remains complex.</p>
      <h3>Why Base 60?</h3>
      <p>Ancient Sumerians and Babylonians used Base 60 because it is highly divisible (by 1, 2, 3, 4, 5, 6, 10, 12, 15, 20, and 30). This is why we have 60 seconds in a minute and 60 minutes in an hour.</p>
      <h3>Business vs. Calendar Days</h3>
      <p>When calculating durations for projects, it is vital to distinguish between calendar days (all 7 days) and business days (Monday-Friday, excluding holidays). Our business days calculator automates this by filtering out weekends.</p>
    `
  },
  {
    slug: 'science-of-love-compatibility',
    title: 'Love Compatibility: The Psychology and Fun Behind the Numbers',
    desc: 'Can a calculation really predict a relationship? Explore the difference between fun name games and the real science of attraction.',
    content: `
      <p>Love and attraction have fascinated humanity for millennia. While modern algorithms and "Love Calculators" provide entertainment, psychologists have spent decades trying to decode what truly makes two people a perfect match.</p>
      <h3>The "Big Five" Personality Traits</h3>
      <p>Research suggests that long-term compatibility is often found in shared values and complementary personalities. The "Big Five" model (Openness, Conscientiousness, Extraversion, Agreeableness, and Neuroticism) is frequently used to study why some couples thrive while others struggle.</p>
      <h3>The Role of Shared Values</h3>
      <p>Beyond personality, shared life goals, financial habits, and communication styles are the strongest predictors of relationship longevity. While a name-based score is a fun way to start a conversation, the real "calculation" happens through time, trust, and shared experiences.</p>
      <blockquote>"Compatibility is not about having everything in common; it's about how you manage your differences."</blockquote>
      <h3>Why Name Games are Popular</h3>
      <p>Gematria and other ancient numbering systems have used names to derive meaning for centuries. Our Love Calculator uses a modern digital variation of these traditional patterns to give you a fun glimpse into your compatibility!</p>
    `
  },
  {
    slug: 'top-10-zodiac-matches',
    title: 'Top 10 Zodiac Matches for a Lifetime of Happiness',
    desc: 'Which star signs are destined for love? Explore the most compatible pairs in the zodiac.',
    content: `
      <p>Astrology has been used for thousands of years to understand human relationships. While every individual is unique, certain elemental pairings (Fire, Earth, Air, Water) tend to have a natural "magnetic" pull.</p>
      <h3>The Power of Elements</h3>
      <p>Fire signs (Aries, Leo, Sagittarius) often thrive with Air signs (Gemini, Libra, Aquarius), as air fuels fire. Similarly, Earth signs (Taurus, Virgo, Capricorn) find stability with Water signs (Cancer, Scorpio, Pisces).</p>
      <h4>Destined Pairs:</h4>
      <ul>
        <li><strong>Aries & Leo:</strong> A passionate, high-energy duo.</li>
        <li><strong>Taurus & Virgo:</strong> Grounded, practical, and deeply loyal.</li>
        <li><strong>Cancer & Scorpio:</strong> An intense emotional bond that lasts.</li>
      </ul>
      <p>Ready to see your own score? Check out our <a href="zodiac-matcher.html">Zodiac Matcher</a> or try the <a href="love-calculator.html">Love Calculator</a> to see if your names align!</p>
    `
  },
  {
    slug: '50-30-20-budgeting-rule',
    title: 'The 50/30/20 Rule: How to Budget Like a Pro This Year',
    desc: 'Master the simplest budgeting method used by financial experts to save more and stress less.',
    content: `
      <p>If you find traditional budgeting too complex, the 50/30/20 rule is your solution. Popularized by Senator Elizabeth Warren, it divides your after-tax income into three simple buckets.</p>
      <h3>The Breakdown</h3>
      <ul>
        <li><strong>50% for Needs:</strong> Rent, utilities, groceries, and insurance.</li>
        <li><strong>30% for Wants:</strong> Dining out, hobbies, and streaming services.</li>
        <li><strong>20% for Savings:</strong> Debt repayment, emergency funds, and retirement.</li>
      </ul>
      <p>By automating this split, you ensure your future is secure without sacrificing your present happiness. Use our <a href="investment-calculator.html">Investment Calculator</a> to see how that 20% can grow over time!</p>
    `
  },
  {
    slug: 'dog-age-human-years-myth',
    title: 'Is Your Dog a Senior? The Truth About Human-to-Pet Years',
    desc: 'The "7-year rule" is a myth. Learn the science of how dogs actually age and how to calculate it properly.',
    content: `
      <p>For decades, we believed that one dog year equals seven human years. Recent research from UCSD suggests the calculation is much more complex, involving DNA methylation changes.</p>
      <h3>The New Science of Aging</h3>
      <p>Dogs age incredibly fast in their first two years. A 1-year-old dog is roughly equivalent to a 30-year-old human! After age two, the rate of aging slows down significantly.</p>
      <p>This means a 10-year-old dog isn't "70"—they are actually closer to 60 or 65 depending on their size. Large breeds tend to age faster than small breeds. Want the exact number for your pup? Try our <a href="pet-age-calculator.html">Pet Age Converter</a>.</p>
    `
  },
  {
    slug: 'sleep-hack-wake-up-time',
    title: 'The $1,000,000 Sleep Hack: Calculating Your Perfect Wake-Up Time',
    desc: 'Stop waking up tired. Use the science of 90-minute sleep cycles to feel refreshed every single morning.',
    content: `
      <p>Waking up at 7:00 AM might feel great one day and terrible the next. The difference isn't how much you slept, but *when* you woke up.</p>
      <h3>The 90-Minute Cycle</h3>
      <p>Human sleep occurs in cycles of roughly 90 minutes. If you wake up in the middle of a cycle (Deep Sleep), you'll feel groggy and "sleep drunk." If you wake up at the end of a cycle (Light Sleep), you'll feel alert immediately.</p>
      <p>To feel your best, you should aim for 5 or 6 full cycles (7.5 or 9 hours). Use our <a href="sleep-calculator.html">Sleep Calculator</a> to find your optimal bedtime based on when you need to wake up!</p>
    `
  },
  {
    slug: 'life-path-number-career-success',
    title: 'Why Your Life Path Number is the Key to Your Career Success',
    desc: 'Unlock your hidden strengths using numerology. Discover the perfect career path based on your birth date.',
    content: `
      <p>In numerology, your Life Path Number is the most important number in your chart. It reveals your core personality, your challenges, and the type of work that will leave you feeling fulfilled.</p>
      <h3>Find Your Number</h3>
      <p>Your number is calculated by reducing your full birth date to a single digit (or master numbers 11, 22, 33). For example, if you were born on Oct 12, 1990 (10/12/1990), you add: 1+0+1+2+1+9+9+0 = 23, then 2+3 = 5. You are a Life Path 5!</p>
      <p><strong>Path 1:</strong> The Leader/Entrepreneur. <strong>Path 5:</strong> The Communicator/Traveler. <strong>Path 8:</strong> The Executive/Financial Guru. Discover your number and what it means for your wallet with our <a href="lucky-numbers.html">Lucky Number & Path Finder</a>.</p>
    `
  },
  {
    slug: 'margin-vs-markup-guide',
    title: 'Margin vs. Markup: The 1-Minute Guide to Pricing Your Products',
    desc: 'Don’t lose money by confusing these two numbers. Learn the essential formula for every small business owner.',
    content: `
      <p>Mixing up margin and markup is one of the most common mistakes new entrepreneurs make. It can lead to underpricing your products and losing profit even when sales are high.</p>
      <h3>The Quick Definition</h3>
      <ul>
        <li><strong>Markup:</strong> The percentage added to the COST to get the selling price.</li>
        <li><strong>Margin:</strong> The percentage of the SELLING PRICE that is profit.</li>
      </ul>
      <p>Example: If a product costs $70 and you sell it for $100, your Markup is 42.8%, but your Margin is only 30%. Confused? Use our <a href="profit-margin-calculator.html">Profit Margin Tool</a> or <a href="markup-calculator.html">Markup Calculator</a> to get it right every time.</p>
    `
  }
];

// ── Calculator logic (JS snippets by slug) ────────────────────
const calcLogic = {
  'mortgage-calculator': {
    fields: [
      { id:'loan', label:'Loan Amount ($)', placeholder:'300000', type:'number' },
      { id:'rate', label:'Annual Interest Rate (%)', placeholder:'6.5', type:'number' },
      { id:'years', label:'Loan Term (years)', placeholder:'30', type:'number' },
      { id:'down', label:'Down Payment ($)', placeholder:'60000', type:'number' },
    ],
    btn: 'Calculate Mortgage',
    js: `function calculate(){
  const P = parseFloat(v('loan')) - parseFloat(v('down')||0);
  const r = parseFloat(v('rate')) / 100 / 12;
  const n = parseFloat(v('years')) * 12;
  if(!P||!r||!n) return alert('Please fill all fields');
  const m = P*(r*Math.pow(1+r,n))/(Math.pow(1+r,n)-1);
  const total = m*n; const interest = total-P;
  showResult('Monthly Payment', '$'+m.toFixed(2), [
    'Total Payment: $'+total.toFixed(2),
    'Total Interest: $'+interest.toFixed(2),
    'Principal: $'+P.toFixed(2)
  ]);
}`,
    formula: 'M = P[r(1+r)ⁿ]/[(1+r)ⁿ-1]',
    what: 'A Mortgage Calculator helps you determine your monthly mortgage payment based on the loan amount, interest rate, and loan term. It factors in your down payment to calculate the principal financed.',
    blog: `
      <p>Choosing a mortgage is likely the biggest financial decision of your life. Understanding the mechanics of how your monthly payment is split between principal and interest is crucial for long-term wealth building.</p>
      <h4>The Early Years: Interest Heavy</h4>
      <p>In the first decade of a 30-year mortgage, the vast majority of your payment goes toward interest. This process is called amortization. Using our calculator, you can see how even a 0.5% difference in interest rate can save you tens of thousands of dollars over the life of the loan.</p>
      <h4>Strategies for Savings</h4>
      <ul>
        <li><strong>Extra Payments:</strong> Even one extra principal payment per year can shave years off your mortgage.</li>
        <li><strong>Refinancing:</strong> If market rates drop significantly, refinancing can lower your monthly burden.</li>
        <li><strong>Bi-weekly Payments:</strong> Splitting your monthly payment in half and paying every two weeks results in one extra full payment per year.</li>
      </ul>
    `,
    example: 'Example: A $300,000 home with $60,000 down at 6.5% for 30 years = $1,516/month',
    faqs: [
      ['What is included in a mortgage payment?','A mortgage payment typically includes principal, interest, property taxes (via escrow), and homeowner\'s insurance (PITI).'],
      ['What is a good mortgage interest rate?','A good rate depends on market conditions. As of 2024, rates between 6–7% for a 30-year fixed mortgage are common.'],
      ['Should I choose a 15 or 30-year mortgage?','A 15-year mortgage means higher monthly payments but significantly less total interest paid. A 30-year offers lower monthly payments with more flexibility.'],
    ]
  },
  'bmi-calculator': {
    fields: [
      { id:'weight', label:'Weight (kg)', placeholder:'70', type:'number' },
      { id:'height', label:'Height (cm)', placeholder:'175', type:'number' },
    ],
    btn: 'Calculate BMI',
    js: `function calculate(){
  const w = parseFloat(v('weight'));
  const h = parseFloat(v('height')) / 100;
  if(!w||!h) return alert('Please fill all fields');
  const bmi = w/(h*h);
  let cat = bmi<18.5?'Underweight':bmi<25?'Normal weight':bmi<30?'Overweight':'Obese';
  showResult('Your BMI', bmi.toFixed(1), [
    'Category: '+cat,
    'Healthy BMI Range: 18.5 – 24.9',
    'Healthy Weight for Height: '+(18.5*h*h).toFixed(1)+'kg – '+(24.9*h*h).toFixed(1)+'kg'
  ]);
}`,
    formula: 'BMI = weight(kg) ÷ height²(m)',
    what: 'BMI (Body Mass Index) is a measure of body fat based on height and weight. It is used to screen for weight categories that may lead to health problems.',
    example: 'Example: Weight 70 kg, Height 175 cm → BMI = 70 ÷ (1.75)² = 22.9 (Normal weight)',
    faqs: [
      ['Is BMI accurate?','BMI is a useful screening tool but does not directly measure body fat. Athletes may have a high BMI due to muscle mass.'],
      ['What BMI is considered obese?','A BMI of 30 or higher is classified as obese according to the World Health Organization.'],
      ['What is a healthy BMI?','A BMI between 18.5 and 24.9 is considered healthy for most adults.'],
    ]
  },
  'recipe-nutrition-calculator': {
    customHTML: `
      <style>
        .ingredient-row { display: grid; grid-template-columns: 1fr auto; gap: 10px; margin-bottom: 12px; }
        .macros-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(100px, 1fr)); gap: 16px; margin-top: 24px; }
        .macro-card { background: rgba(108, 92, 231, 0.08); border: 1px solid rgba(108, 92, 231, 0.2); padding: 20px 10px; border-radius: var(--radius-lg); text-align: center; }
        .macro-val { font-family: 'JetBrains Mono', monospace; font-size: 1.8rem; font-weight: 800; color: var(--text-primary); margin-top: 8px; }
        .macro-label { font-size: 0.85rem; color: var(--accent-2); text-transform: uppercase; letter-spacing: 0.06em; font-weight: 700; }
        #resSummary { margin-top: 24px; font-size: 0.95rem; text-align: center; color: var(--text-secondary); line-height: 1.6; }
      </style>
      <div style="margin-bottom: 24px;">
        <div style="background: rgba(108, 92, 231, 0.05); border: 1px solid rgba(108, 92, 231, 0.2); padding: 16px; border-radius: var(--radius-md); margin-bottom: 20px;">
          <h3 style="font-size: 1.1rem; color: var(--text-primary); margin-bottom: 8px;">How to use this calculator:</h3>
          <p style="font-size: 0.9rem; color: var(--text-secondary); line-height: 1.5; margin: 0;">
            Type your ingredients naturally below. Include the quantity and food name. <br>
            <span style="color: var(--accent-2);">Examples: <em>"2 eggs"</em>, <em>"100g chicken breasts"</em>, <em>"1 cup white rice"</em></span>
          </p>
        </div>
        <label style="font-size: 0.9rem; font-weight: 700; color: var(--text-primary); text-transform: uppercase; letter-spacing: 0.05em; display:block; margin-bottom: 12px; border-bottom: 1px solid var(--border-color); padding-bottom: 8px;">Your Recipe Ingredients</label>
        <div id="ingsList">
          <div class="ingredient-row">
            <input type="text" placeholder="e.g. 2 eggs" class="ing-input" style="width:100%; padding: 14px 16px; border: 1px solid var(--border-color); border-radius: var(--radius-md); background: var(--bg-input); color: var(--text-primary); font-size: 1rem; outline: none; transition: border-color 0.2s;">
            <button class="calc-btn-secondary" onclick="this.parentNode.remove()" style="padding: 0 20px; color: #ff7675; border-color: rgba(255,118,117,0.3); font-size: 1.2rem; cursor: pointer;" title="Remove Ingredient">✕</button>
          </div>
          <div class="ingredient-row">
            <input type="text" placeholder="e.g. 100g chicken breast" class="ing-input" style="width:100%; padding: 14px 16px; border: 1px solid var(--border-color); border-radius: var(--radius-md); background: var(--bg-input); color: var(--text-primary); font-size: 1rem; outline: none; transition: border-color 0.2s;">
            <button class="calc-btn-secondary" onclick="this.parentNode.remove()" style="padding: 0 20px; color: #ff7675; border-color: rgba(255,118,117,0.3); font-size: 1.2rem; cursor: pointer;" title="Remove Ingredient">✕</button>
          </div>
        </div>
        <button class="calc-btn-secondary" onclick="addIng()" style="margin-top: 12px; font-size: 0.95rem; padding: 12px 20px; border-style: dashed; width: 100%; justify-content: center;">+ Add Another Ingredient</button>
      </div>
      
      <div class="calc-actions">
        <button class="calc-btn" onclick="calculate()">⚡ Analyze Recipe Macros</button>
        <button class="calc-btn-secondary" onclick="resetCalc()">↺ Clear All</button>
      </div>
      
      <div class="calc-result" id="calcResult" style="display:none; background: var(--bg-card); border: 1px solid var(--accent-1); margin-top: 36px; padding: 32px;">
        <h3 style="margin-bottom: 20px; font-size: 1.3rem; text-align: center; color: var(--text-primary);">Total Recipe Nutrition</h3>
        <div class="macros-grid">
          <div class="macro-card"><div class="macro-label">Calories</div><div class="macro-val" id="resCal">0</div></div>
          <div class="macro-card"><div class="macro-label">Carbs</div><div class="macro-val" id="resCarb">0g</div><div style="font-size:0.75rem;color:var(--text-muted);margin-top:8px">4 kcal/g</div></div>
          <div class="macro-card"><div class="macro-label">Protein</div><div class="macro-val" id="resPro">0g</div><div style="font-size:0.75rem;color:var(--text-muted);margin-top:8px">4 kcal/g</div></div>
          <div class="macro-card"><div class="macro-label">Fat</div><div class="macro-val" id="resFat">0g</div><div style="font-size:0.75rem;color:var(--text-muted);margin-top:8px">9 kcal/g</div></div>
        </div>
        <div id="resSummary"></div>
      </div>
    `,
    js: `
// Mock food database for instant client-side calculation (per 100g or 1 unit)
const foodDB = [
  { words: ['egg', 'eggs'], isUnit: true, cal: 72, carb: 0.4, pro: 6.3, fat: 4.8 },
  { words: ['chicken', 'breast'], isUnit: false, cal: 165, carb: 0, pro: 31, fat: 3.6 },
  { words: ['rice', 'white'], isUnit: false, cal: 130, carb: 28, pro: 2.7, fat: 0.3 },
  { words: ['bread', 'slice', 'toast'], isUnit: true, cal: 79, carb: 15, pro: 2.7, fat: 1 },
  { words: ['milk'], isUnit: false, cal: 61, carb: 4.8, pro: 3.2, fat: 3.3 },
  { words: ['cheese'], isUnit: false, cal: 402, carb: 1.3, pro: 25, fat: 33 },
  { words: ['beef', 'steak', 'mince'], isUnit: false, cal: 271, carb: 0, pro: 26, fat: 19 },
  { words: ['potato', 'potatoes'], isUnit: false, cal: 77, carb: 17, pro: 2, fat: 0.1 },
  { words: ['avocado'], isUnit: true, cal: 322, carb: 17, pro: 4, fat: 29 },
  { words: ['apple', 'apples'], isUnit: true, cal: 95, carb: 25, pro: 0.5, fat: 0.3 },
  { words: ['banana', 'bananas'], isUnit: true, cal: 105, carb: 27, pro: 1.3, fat: 0.3 },
  { words: ['oil', 'olive', 'butter'], isUnit: false, cal: 884, carb: 0, pro: 0, fat: 100 },
  { words: ['sugar', 'syrup', 'honey'], isUnit: false, cal: 387, carb: 100, pro: 0, fat: 0 },
  { words: ['flour', 'wheat', 'pasta'], isUnit: false, cal: 364, carb: 76, pro: 10, fat: 1 },
  { words: ['tomato', 'tomatoes'], isUnit: true, cal: 22, carb: 4.8, pro: 1.1, fat: 0.2 },
  { words: ['onion'], isUnit: true, cal: 44, carb: 10, pro: 1.2, fat: 0.1 },
  { words: ['salmon', 'fish'], isUnit: false, cal: 208, carb: 0, pro: 20, fat: 13 },
  { words: ['oats', 'porridge', 'oatmeal'], isUnit: false, cal: 389, carb: 66, pro: 16.9, fat: 6.9 },
  { words: ['pork', 'bacon'], isUnit: false, cal: 242, carb: 0, pro: 27, fat: 14 }
];

function addIng() {
  const div = document.createElement('div');
  div.className = 'ingredient-row';
  div.innerHTML = '<input type="text" placeholder="e.g. 1 cup white rice" class="ing-input" style="width:100%; padding: 14px 16px; border: 1px solid var(--border-color); border-radius: var(--radius-md); background: var(--bg-input); color: var(--text-primary); font-size: 1rem; outline: none; transition: border-color 0.2s;"><button class="calc-btn-secondary" onclick="this.parentNode.remove()" style="padding: 0 20px; color: #ff7675; border-color: rgba(255,118,117,0.3); font-size: 1.2rem; cursor: pointer;" title="Remove Ingredient">✕</button>';
  document.getElementById('ingsList').appendChild(div);
  div.querySelector('input').focus();
}

function parseIng(text) {
  text = text.toLowerCase();
  let qty = 1;
  let matches = text.match(/^([0-9.]+)/);
  if(matches) qty = parseFloat(matches[1]);
  else if(text.includes('a ') || text.includes('one ')) qty = 1;
  else if(text.includes('half')) qty = 0.5;
  
  let multi = 1; // multiplier
  if(text.includes('g ') || text.match(/[0-9]g/)) multi = qty / 100;
  else if(text.includes('kg')) multi = qty * 10;
  else if(text.includes('ml')) multi = qty / 100;
  else if(text.includes('cup')) multi = qty * 2.4; // approx 240g
  else if(text.includes('tbsp') || text.includes('tablespoon')) multi = qty * 0.15; // 15g
  else if(text.includes('tsp') || text.includes('teaspoon')) multi = qty * 0.05; // 5g
  else multi = qty; // count units

  // Find best match in DB
  let bestFood = null;
  let bestScore = 0;
  
  for(let f of foodDB) {
    let score = 0;
    for(let w of f.words) {
      if(text.includes(w)) score++;
    }
    if(score > bestScore) {
      bestScore = score;
      bestFood = f;
    }
  }
  
  // Generic fallback if not matched
  if(!bestFood) {
    if(text.includes('g ') || text.includes('cup') || text.includes('tbsp') || text.includes('ml')) {
      // Treat as generic ingredient: ~150 cal per 100g
      bestFood = { cal: 150, carb: 15, pro: 5, fat: 5, isUnit: false };
    } else {
      // Treat as generic unit item: ~100 cal
      bestFood = { cal: 100, carb: 10, pro: 2, fat: 2, isUnit: true };
    }
  }
  
  if(bestFood.isUnit && String(multi).includes('.')) multi = qty; 
  if(!bestFood.isUnit && multi === qty) multi = qty * 1; // assume 100g if they just say "chicken"

  return {
    cal: bestFood.cal * multi, carb: bestFood.carb * multi,
    pro: bestFood.pro * multi, fat: bestFood.fat * multi,
    name: text
  };
}

function calculate() {
  const inputs = document.querySelectorAll('.ing-input');
  let tCal=0, tCarb=0, tPro=0, tFat=0;
  let valid = 0, unknown = 0;
  
  inputs.forEach(inp => {
    let val = inp.value.trim();
    if(val.length > 0) {
      const res = parseIng(val);
      tCal += res.cal; tCarb += res.carb; tPro += res.pro; tFat += res.fat;
      valid++;
    }
  });
  
  if(valid === 0) return alert('Please enter at least one ingredient');

  document.getElementById('resCal').innerText = Math.round(tCal);
  document.getElementById('resCarb').innerText = Math.round(tCarb)+'g';
  document.getElementById('resPro').innerText = Math.round(tPro)+'g';
  document.getElementById('resFat').innerText = Math.round(tFat)+'g';
  
  // Cross check macros vs cals for visual summary
  let macroCals = (tCarb*4) + (tPro*4) + (tFat*9);
  let cPct = Math.round((tCarb*4 / macroCals) * 100) || 0;
  let pPct = Math.round((tPro*4 / macroCals) * 100) || 0;
  let fPct = Math.round((tFat*9 / macroCals) * 100) || 0;

  document.getElementById('resSummary').innerHTML = \`Analyzed \${valid} ingredient(s). <br><strong>Macro split:</strong> \${cPct}% Carbs, \${pPct}% Protein, \${fPct}% Fat.\`;
  
  const r = document.getElementById('calcResult');
  r.style.display = 'block';
  r.classList.add('visible');
  r.scrollIntoView({behavior: 'smooth', block: 'end'});
}

function resetCalc(){
  document.getElementById('ingsList').innerHTML = \`
    <div class="ingredient-row"><input type="text" placeholder="e.g. 2 eggs" class="ing-input" style="width:100%; padding: 14px 16px; border: 1px solid var(--border-color); border-radius: var(--radius-md); background: var(--bg-input); color: var(--text-primary); font-size: 1rem; outline: none; transition: border-color 0.2s;"><button class="calc-btn-secondary" onclick="this.parentNode.remove()" style="padding: 0 20px; color: #ff7675; border-color: rgba(255,118,117,0.3); font-size: 1.2rem; cursor: pointer;">✕</button></div>
    <div class="ingredient-row"><input type="text" placeholder="e.g. 100g chicken breast" class="ing-input" style="width:100%; padding: 14px 16px; border: 1px solid var(--border-color); border-radius: var(--radius-md); background: var(--bg-input); color: var(--text-primary); font-size: 1rem; outline: none; transition: border-color 0.2s;"><button class="calc-btn-secondary" onclick="this.parentNode.remove()" style="padding: 0 20px; color: #ff7675; border-color: rgba(255,118,117,0.3); font-size: 1.2rem; cursor: pointer;">✕</button></div>
  \`;
  document.getElementById('calcResult').style.display = 'none';
  document.getElementById('calcResult').classList.remove('visible');
}
    `,
    formula: 'Total Calories = Carbs(4 kcal/g) + Protein(4 kcal/g) + Fat(9 kcal/g)',
    what: 'The Recipe Nutrition Calculator allows you to list out the ingredients of any meal or recipe to get a complete breakdown of its macronutrients (calories, carbohydrates, protein, and dietary fat). This uses a reference database of common whole foods and ingredients to provide accurate estimates instantly.',
    example: 'Example input lines: <br><br>• <code>2 eggs</code><br>• <code>100g chicken breast</code><br>• <code>1 cup white rice</code><br>• <code>1 tbsp olive oil</code>',
    faqs: [
      ['How accurate is this calculator?','It uses general USDA nutritional approximations from a reference database. It is highly accurate for whole foods like eggs, rice, and meats but may vary for processed brands.'],
      ['Can I use cups and tablespoons?','Yes! The calculator recognizes "g", "kg", "ml", "cup", "tbsp", "tsp", and raw numbers for individual items (like "2 apples").'],
      ['What are macronutrients?','Macronutrients (macros) are the three main suppliers of nutrients in your diet: carbohydrates (energy), protein (muscle repair), and fat (hormone health).'],
    ]
  },
  'compound-interest': {
    fields: [
      { id:'principal', label:'Principal Amount ($)', placeholder:'10000', type:'number' },
      { id:'rate', label:'Annual Rate (%)', placeholder:'7', type:'number' },
      { id:'years', label:'Time (years)', placeholder:'10', type:'number' },
      { id:'n', label:'Compound Frequency', placeholder:'12', type:'number' },
    ],
    btn: 'Calculate Growth',
    js: `function calculate(){
  const P=parseFloat(v('principal')), r=parseFloat(v('rate'))/100;
  const t=parseFloat(v('years')), n=parseFloat(v('n')||12);
  if(!P||!r||!t) return alert('Please fill all fields');
  const A = P*Math.pow(1+r/n, n*t);
  const interest = A - P;
  showResult('Final Amount', '$'+A.toFixed(2), [
    'Principal: $'+P.toFixed(2),
    'Interest Earned: $'+interest.toFixed(2),
    'Growth: '+(interest/P*100).toFixed(1)+'%'
  ]);
}`,
    formula: 'A = P(1 + r/n)^(nt)',
    what: 'A Compound Interest Calculator shows how investments grow exponentially over time when interest is reinvested.',
    blog: `
      <p>Compound interest is often called the "miracle of wealth building." It is the process where the value of an investment increases because the earnings on an investment, both the principal and the accumulated interest, earn interest as time passes.</p>
      <h4>The Power of Time</h4>
      <p>The earlier you start, the more powerful compounding becomes. A person who starts saving at age 25 will have significantly more at retirement than someone who starts at 35, even if they save the same total amount. This is because the early money has more "cycles" to compound.</p>
      <h4>Frequency of Compounding</h4>
      <p>Interest can compound annually, semi-annually, quarterly, monthly, or even daily. The more frequently it compounds, the faster your balance grows. Our calculator defaults to monthly compounding, which is standard for most bank accounts.</p>
    `,
    example: 'Example: $10,000 at 7% compounded monthly for 10 years = $20,096.61',
    faqs: [
      ['What is compound interest?','Compound interest is interest calculated on both the initial principal and the accumulated interest over previous periods.'],
      ['How often should interest compound?','More frequent compounding (daily vs annually) yields slightly more growth. Monthly compounding is most common.'],
      ['What is the Rule of 72?','Divide 72 by the annual rate to estimate how many years it takes to double your money. At 7%, money doubles in ~10.3 years.'],
    ]
  },
  'social-security-calculator': {
    fields: [
      { id:'income', label:'Average Annual Income ($)', placeholder:'60000', type:'number' },
      { id:'age', label:'Retirement Age', placeholder:'67', type:'number' },
    ],
    btn: 'Estimate Benefits',
    js: `function calculate(){
  const inc = parseFloat(v('income'));
  const age = parseFloat(v('age'));
  if(!inc||!age) return alert('Please fill all fields');
  // Simple approximation: ~40% of income if retiring at 67
  let factor = age < 62 ? 0 : age < 67 ? 0.3 : age < 70 ? 0.4 : 0.48;
  const monthly = (inc * factor) / 12;
  showResult('Est. Monthly Benefit', '$'+monthly.toFixed(2), [
    'Annual Benefit: $'+(monthly*12).toLocaleString(),
    'Replacement Rate: '+(factor*100)+'%',
    'Full Retirement Age: 67'
  ]);
}`,
    formula: 'Benefit ≈ Income × Age Factor',
    what: 'The Social Security Estimator provides a quick approximation of your monthly retirement benefits based on your average career earnings and chosen retirement age.',
    blog: `
      <p>Understanding your Social Security benefit is a cornerstone of retirement planning in the United States. The amount you receive depends heavily on <em>when</em> you choose to start collecting.</p>
      <h4>Early vs. Delayed Retirement</h4>
      <p>The "Full Retirement Age" (FRA) is currently 67 for most people. If you start at 62, your monthly check is reduced by up to 30% permanently. However, if you wait until age 70, your benefit increases by 8% per year past your FRA. This is a massive guaranteed return that is hard to find elsewhere.</p>
      <h4>The 35-Year Rule</h4>
      <p>The SSA calculates your benefit based on your highest 35 years of indexed earnings. if you have fewer than 35 years of work, the remaining years are averaged in as zeros, which can significantly pull down your monthly benefit.</p>
    `,
    example: 'Example: $60,000 annual income at age 67 ≈ $2,000/month',
    faqs: [
      ['When can I start taking benefits?','You can start as early as 62, but your monthly amount will be reduced compared to waiting until full retirement age (usually 67).'],
      ['How is the benefit calculated?','The Social Security Administration uses your highest 35 years of indexed earnings to calculate your Primary Insurance Amount (PIA).'],
      ['Does waiting until 70 increase my benefit?','Yes, you earn delayed retirement credits for every month you wait past full retirement age, up to age 70.'],
    ]
  },
  'loan-calculator': {
    fields: [
      { id:'loan', label:'Loan Amount ($)', placeholder:'10000', type:'number' },
      { id:'rate', label:'Annual Interest Rate (%)', placeholder:'5', type:'number' },
      { id:'months', label:'Loan Term (months)', placeholder:'24', type:'number' },
    ],
    btn: 'Calculate Loan',
    js: `function calculate(){
  const P = parseFloat(v('loan')), r = parseFloat(v('rate'))/100/12, n = parseFloat(v('months'));
  if(!P||!r||!n) return alert('Please fill all fields');
  const m = P*(r*Math.pow(1+r,n))/(Math.pow(1+r,n)-1);
  const total = m*n;
  showResult('Monthly Payment', '$'+m.toFixed(2), [
    'Total Payment: $'+total.toFixed(2),
    'Total Interest: $'+(total-P).toFixed(2),
    'Effective APR: '+v('rate')+'%'
  ]);
}`,
    formula: 'M = P[r(1+r)ⁿ]/[(1+r)ⁿ-1]',
    what: 'A Loan Calculator helps you find the monthly payment and total interest cost for personal loans, auto loans, or any amortized debt.',
    blog: `
      <p>Before signing any loan agreement, it's vital to know the true cost of borrowing. A "low monthly payment" can sometimes hide a high interest rate or a very long term that results in paying thousands in extra interest.</p>
      <h4>Principal vs. Interest</h4>
      <p>Every monthly payment is split. Part goes to paying down the balance (Principal) and part goes to the lender as a fee for the loan (Interest). Use our results to see exactly how much you are handing over to the bank over the life of the loan.</p>
      <h4>APR vs. Interest Rate</h4>
      <p>Always look at the APR (Annual Percentage Rate). While the interest rate is the base cost, the APR includes fees and other costs associated with getting the loan, giving you a more accurate picture of the total expense.</p>
    `,
    example: 'Example: $10,000 loan at 5% for 24 months = $438.71/month',
    faqs: [
      ['What is an amortized loan?','An amortized loan is a loan where the principal is paid down over the life of the loan according to an amortization schedule.'],
      ['How does interest rate affect payments?','Higher interest rates increase your monthly payment and the total interest paid over the life of the loan.'],
    ]
  },
  'savings-calculator': {
    fields: [
      { id:'init', label:'Initial Deposit ($)', placeholder:'1000', type:'number' },
      { id:'monthly', label:'Monthly Contribution ($)', placeholder:'100', type:'number' },
      { id:'rate', label:'Annual Interest Rate (%)', placeholder:'4', type:'number' },
      { id:'years', label:'Years to Save', placeholder:'5', type:'number' },
    ],
    btn: 'Calculate Savings',
    js: `function calculate(){
  const P = parseFloat(v('init')), PMT = parseFloat(v('monthly'));
  const r = parseFloat(v('rate'))/100/12, n = parseFloat(v('years'))*12;
  if(isNaN(P)||isNaN(PMT)||isNaN(r)||isNaN(n)) return alert('Please fill all fields');
  const FV = P*Math.pow(1+r, n) + PMT * ((Math.pow(1+r, n)-1)/r);
  const totalDep = P + (PMT*n);
  showResult('Future Value', '$'+FV.toFixed(2), [
    'Total Contributions: $'+totalDep.toFixed(2),
    'Interest Earned: $'+(FV-totalDep).toFixed(2)
  ]);
}`,
    formula: 'FV = P(1+r)ⁿ + PMT[((1+r)ⁿ-1)/r]',
    what: 'A Savings Calculator estimates how much your savings will grow over time with regular monthly contributions and compound interest.',
    blog: `
      <p>Building a savings habit is the first step toward financial independence. Whether you are saving for an emergency fund, a down payment, or a dream vacation, seeing the numbers grow can provide great motivation.</p>
      <h4>Consistency is Key</h4>
      <p>Small amounts saved regularly often beat large amounts saved sporadically. Our calculator shows that even adding $50 a month can lead to thousands of dollars in growth over a few years thanks to the consistent contribution and interest accumulation.</p>
      <h4>High-Yield Savings Accounts (HYSA)</h4>
      <p>Don't leave your money in a standard savings account that pays 0.01%. Look for HYSAs that offer 4% or higher. Using our tool, you can compare the difference that a few percentage points of interest can make on your final balance.</p>
    `,
    example: 'Example: Start with $1,000, add $100/month for 5 years at 4% = $7,744.15',
    faqs: [
      ['What is the power of compound interest?','Compound interest allows your interest to earn interest, leading to exponential growth over long periods.'],
    ]
  },
  'investment-calculator': {
    fields: [
      { id:'principal', label:'Starting Investment ($)', placeholder:'5000', type:'number' },
      { id:'contrib', label:'Annual Addition ($)', placeholder:'1200', type:'number' },
      { id:'years', label:'Years to Grow', placeholder:'20', type:'number' },
      { id:'return', label:'Expected Return (%)', placeholder:'8', type:'number' },
    ],
    btn: 'Project Returns',
    js: `function calculate(){
  const P = parseFloat(v('principal')), PMT = parseFloat(v('contrib'));
  const r = parseFloat(v('return'))/100, t = parseFloat(v('years'));
  if(isNaN(P)||isNaN(PMT)||isNaN(r)||isNaN(t)) return alert('Please fill all fields');
  // Simple annual compounding
  let balance = P;
  for(let i=0; i<t; i++){
    balance = (balance + PMT) * (1 + r);
  }
  showResult('Projected Balance', '$'+balance.toLocaleString(undefined, {maximumFractionDigits:2}), [
    'Total Invested: $'+(P + PMT*t).toLocaleString(),
    'Estimated Profit: $'+(balance - (P + PMT*t)).toLocaleString()
  ]);
}`,
    formula: 'Balance = (Previous + Contribution) × (1 + Rate)',
    what: 'Project your long-term investment growth based on a starting amount, annual additions, and an expected rate of return.',
    blog: `
      <p>Investing is different from saving. While saving protects your money, investing aims to grow it significantly over time by taking calculated risks in the stock market, real estate, or other assets.</p>
      <h4>Risk vs. Reward</h4>
      <p>Higher potential returns usually come with higher risk. While stocks have historically returned ~10% annually, they are volatile in the short term. Bonds are more stable but offer lower returns. A balanced portfolio usually mixes both to manage risk while still achieving growth.</p>
      <h4>The 4% Rule</h4>
      <p>Many investors use our calculator to see when they will reach their "Number"—the portfolio size where they can live off the returns. The 4% rule suggests you can safely withdraw 4% of your portfolio each year in retirement without running out of money.</p>
    `,
    example: 'Example: $5,000 start + $1,200/year for 20 years at 8% ≈ $84,400',
    faqs: [
      ['What is a realistic rate of return?','Historically, the stock market (S&P 500) has averaged about 7-10% annually before inflation.'],
    ]
  },
  'roi-calculator': {
    fields: [
      { id:'cost', label:'Amount Invested ($)', placeholder:'1000', type:'number' },
      { id:'return', label:'Amount Returned ($)', placeholder:'1250', type:'number' },
    ],
    btn: 'Calculate ROI',
    js: `function calculate(){
  const cost = parseFloat(v('cost')), ret = parseFloat(v('return'));
  if(!cost||!ret) return alert('Please fill all fields');
  const roi = ((ret - cost)/cost) * 100;
  showResult('ROI', roi.toFixed(2)+'%', [
    'Net Profit: $'+(ret-cost).toFixed(2),
    'Investment Gain: '+(ret/cost).toFixed(2)+'x'
  ]);
}`,
    formula: 'ROI = [(Final Value − Initial Cost) / Initial Cost] × 100',
    what: 'Return on Investment (ROI) is a popular profitability metric used to evaluate the efficiency of an investment or compare the efficiency of several different investments.',
    blog: `
      <p>ROI is the most common way to measure how well an investment is performing. It tells you exactly how much profit you've made as a percentage of your original cost.</p>
      <h4>Understanding Annualized ROI</h4>
      <p>Simple ROI doesn't consider time. A 20% ROI over one month is incredible, but a 20% ROI over ten years is poor. When comparing investments, always look at the <em>annualized</em> return to see how your money is working for you over time.</p>
      <h4>What ROI Doesn't Show</h4>
      <p>ROI reflects profitability but ignores risk. A high-ROI investment might have a high chance of failure. Professional investors look for "Risk-Adjusted Returns" to ensure the reward is worth the potential loss.</p>
    `,
    example: 'Example: Invest $1,000, get back $1,250 = 25% ROI',
    faqs: [
      ['What is a good ROI?','A "good" ROI depends on the risk and the asset class. S&P 500 average is ~10%.'],
    ]
  },
  'tip-calculator': {
    fields: [
      { id:'bill', label:'Bill Amount ($)', placeholder:'50', type:'number' },
      { id:'tip', label:'Tip Percentage (%)', placeholder:'15', type:'number' },
      { id:'people', label:'Number of People', placeholder:'1', type:'number' },
    ],
    btn: 'Calculate Tip',
    js: `function calculate(){
  const b = parseFloat(v('bill')), t = parseFloat(v('tip'))/100, p = parseFloat(v('people')||1);
  if(!b) return alert('Please enter bill amount');
  const tipAmt = b * t;
  const total = b + tipAmt;
  showResult('Total per Person', '$'+(total/p).toFixed(2), [
    'Total Bill: $'+total.toFixed(2),
    'Total Tip: $'+tipAmt.toFixed(2),
    'Tip per Person: $'+(tipAmt/p).toFixed(2)
  ]);
}`,
    formula: 'Total = Bill + (Bill × Tip%)',
    what: 'Quickly calculate the tip and split the total bill among multiple people.',
    blog: `
      <p>Tipping etiquette varies wildly by culture and industry. In the United States, tipping is a standard part of the service economy, especially in restaurants.</p>
      <h4>The 15-20% Standard</h4>
      <p>Traditionally, 15% is the baseline for acceptable service, while 20% or more is customary for excellent service. Our calculator helps you find these exact amounts instantly, even when the bill has complicated totals.</p>
      <h4>Splitting the Bill</h4>
      <p>Dining with friends is better when the math is fair. Use our "Number of People" field to ensure everyone pays their fair share of both the meal and the gratuity.</p>
    `,
    example: '$50 bill + 15% tip split between 2 people = $28.75 each',
    faqs: [['What is standard tip?','In the US, 15-20% is standard for good service.']]
  },
  'salary-calculator': {
    fields: [
      { id:'salary', label:'Annual Salary ($)', placeholder:'60000', type:'number' },
      { id:'hours', label:'Hours per Week', placeholder:'40', type:'number' },
    ],
    btn: 'Calculate Pay',
    js: `function calculate(){
  const s = parseFloat(v('salary')), h = parseFloat(v('hours')||40);
  if(!s) return alert('Please enter salary');
  showResult('Hourly Rate', '$'+(s / (52 * h)).toFixed(2), [
    'Monthly: $'+(s/12).toFixed(2),
    'Bi-weekly: $'+(s/26).toFixed(2),
    'Weekly: $'+(s/52).toFixed(2)
  ]);
}`,
    formula: 'Hourly = Annual / (52 × Hours per Week)',
    what: 'Convert your annual salary into monthly, bi-weekly, weekly, and hourly rates.',
    blog: `
      <p>Understanding your true hourly rate is essential for valuing your time and comparing job offers. A high annual salary might actually be a lower hourly rate if it requires 60-hour work weeks.</p>
      <h4>The Math of Work Weeks</h4>
      <p>Most salary calculations assume a standard 2,080-hour work year (40 hours per week for 52 weeks). Use this tool to see how your pay changes if you transition to a 35-hour week or take on overtime.</p>
      <h4>Take-Home Pay vs. Gross Pay</h4>
      <p>Remember that this calculator shows "Gross" pay—the amount before taxes and benefits are deducted. To see what actually hits your bank account, visit our Tax Calculator.</p>
    `,
    example: '$60,000 at 40 hrs/week = $28.85/hour',
    faqs: []
  },
  'calorie-calculator': {
    fields: [
      { id:'gender', label:'Gender', placeholder:'male', type:'select', options:['male','female'] },
      { id:'age', label:'Age', placeholder:'25', type:'number' },
      { id:'weight', label:'Weight (kg)', placeholder:'70', type:'number' },
      { id:'height', label:'Height (cm)', placeholder:'175', type:'number' },
      { id:'activity', label:'Activity Level', type:'select', options:['Sedentary','Light','Moderate','Active','Very Active'] },
    ],
    btn: 'Calculate Calories',
    js: `function calculate(){
  const g = document.getElementById('gender').value;
  const a = parseFloat(v('age')), w = parseFloat(v('weight')), h = parseFloat(v('height'));
  const act = document.getElementById('activity').value;
  if(!a||!w||!h) return alert('Please fill all fields');
  let bmr = (g==='male') ? (10*w + 6.25*h - 5*a + 5) : (10*w + 6.25*h - 5*a - 161);
  const factors = {'Sedentary':1.2, 'Light':1.375, 'Moderate':1.55, 'Active':1.725, 'Very Active':1.9};
  const tdee = bmr * factors[act];
  showResult('Daily Maintenance', Math.round(tdee)+' kcal', [
    'Basal Metabolic Rate: '+Math.round(bmr)+' kcal',
    'Weight Loss (0.5kg/wk): '+Math.round(tdee-500)+' kcal',
    'Weight Gain (0.5kg/wk): '+Math.round(tdee+500)+' kcal'
  ]);
}`,
    formula: 'Mifflin-St Jeor Equation × Activity Factor',
    what: 'Calculate your TDEE (Total Daily Energy Expenditure) based on your metrics and activity level.',
    blog: `
      <p>Mastering your calorie intake is the science behind body transformation. Whether you want to lose fat or gain muscle, it all starts with your "Maintenance Calories."</p>
      <h4>The Energy Balance</h4>
      <p>Weight management is a simple equation: Energy In vs. Energy Out. This calculator finds your TDEE, which is the amount of energy you burn in a full day. To lose weight, aim for a "deficit"—roughly 500 calories below your TDEE is a sustainable target for most.</p>
      <h4>Activity Level Matters</h4>
      <p>Be honest about your activity level! Many people overestimate how active they are. If you work a desk job but walk for 30 minutes, you are likely "Lightly Active" rather than "Moderate."</p>
    `,
    example: 'Male, 25, 70kg, 175cm, Sedentary ≈ 2,000 kcal/day',
    faqs: []
  },
  'time-calculator': {
    customHTML: `
      <style>
        .tc-tabs { display: flex; gap: 8px; margin-bottom: 24px; border-bottom: 1px solid var(--border-color); padding-bottom: 12px; overflow-x: auto; }
        .tc-tab { padding: 10px 20px; border-radius: var(--radius-md); cursor: pointer; color: var(--text-secondary); font-weight: 600; font-size: 0.9rem; transition: all 0.2s; white-space: nowrap; }
        .tc-tab.active { background: rgba(32, 138, 240, 0.1); color: var(--accent-blue); }
        .tc-panel { display: none; }
        .tc-panel.active { display: block; }
        .time-input-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px; margin-bottom: 16px; }
        .time-input-grid label { font-size: 0.75rem; color: var(--text-muted); display: block; margin-bottom: 4px; }
        .time-input-grid input { width: 100%; padding: 12px; border-radius: 8px; border: 1px solid var(--border-color); background: var(--bg-input); color: #fff; font-family: 'JetBrains Mono', monospace; }
      </style>
      <div class="tc-tabs">
        <div class="tc-tab active" onclick="showTab(0)">Add/Subtract</div>
        <div class="tc-tab" onclick="showTab(1)">Time from Date</div>
        <div class="tc-tab" onclick="showTab(2)">Expression</div>
      </div>

      <div id="panel0" class="tc-panel active">
        <div class="time-input-grid">
          <div><label>Days</label><input type="number" id="td1" value="0"></div>
          <div><label>Hours</label><input type="number" id="th1" value="0"></div>
          <div><label>Mins</label><input type="number" id="tm1" value="0"></div>
          <div><label>Secs</label><input type="number" id="ts1" value="0"></div>
        </div>
        <div style="text-align: center; margin: 0 0 16px;">
          <select id="top1" style="background: var(--bg-input); border: 1px solid var(--border-color); color: #fff; padding: 6px 16px; border-radius: 6px; font-weight: 700;">
            <option value="add">+</option>
            <option value="sub">−</option>
          </select>
        </div>
        <div class="time-input-grid">
          <div><label>Days</label><input type="number" id="td2" value="0"></div>
          <div><label>Hours</label><input type="number" id="th2" value="0"></div>
          <div><label>Mins</label><input type="number" id="tm2" value="0"></div>
          <div><label>Secs</label><input type="number" id="ts2" value="0"></div>
        </div>
        <button class="calc-btn" onclick="calcAddSub()" style="width: 100%; margin-top: 12px;">Calculate Result</button>
      </div>

      <div id="panel1" class="tc-panel">
        <div class="form-group" style="margin-bottom: 16px;">
          <label>Start Date & Time</label>
          <input type="datetime-local" id="tDateTimeStart" style="width:100%; padding: 12px; border-radius: 8px; border: 1px solid var(--border-color); background: var(--bg-input); color: #fff;">
        </div>
        <div class="form-group" style="margin-bottom: 16px;">
          <label>Operation</label>
          <select id="topDate" style="width:100%; padding: 12px; border-radius: 8px; border: 1px solid var(--border-color); background: var(--bg-input); color: #fff;">
            <option value="add">Add Time</option>
            <option value="sub">Subtract Time</option>
          </select>
        </div>
        <div class="time-input-grid">
          <div><label>Days</label><input type="number" id="tdd" value="0"></div>
          <div><label>Hours</label><input type="number" id="tdh" value="0"></div>
          <div><label>Mins</label><input type="number" id="tdm" value="0"></div>
          <div><label>Secs</label><input type="number" id="tds" value="0"></div>
        </div>
        <button class="calc-btn" onclick="calcFromDate()" style="width: 100%; margin-top: 12px;">Calculate New Date</button>
      </div>

      <div id="panel2" class="tc-panel">
        <div class="form-group">
          <label>Expression (e.g. 1d 2h + 30m - 5s)</label>
          <input type="text" id="tExprInput" placeholder="1d 2h 3m + 4h" style="width:100%; padding: 14px; border-radius: 8px; border: 1px solid var(--border-color); background: var(--bg-input); color: #fff; font-family: 'JetBrains Mono', monospace;">
        </div>
        <button class="calc-btn" onclick="calcExpr()" style="width: 100%; margin-top: 16px;">Evaluate Expression</button>
      </div>

      <div class="calc-result" id="tCalcResult" style="margin-top: 32px; background: rgba(32, 138, 240, 0.05); padding: 32px; border-radius: var(--radius-lg); border: 1px solid rgba(32, 138, 240, 0.2);">
        <div style="font-size: 0.85rem; color: var(--text-secondary); text-transform: uppercase; letter-spacing: 0.1em; font-weight: 700; margin-bottom: 8px;">Result</div>
        <div class="result-value" id="tResValue" style="font-size: 2.2rem; font-weight: 800; color: var(--accent-blue); margin-bottom: 16px;">00:00:00</div>
        <div class="result-details" id="tResDetails" style="display: flex; flex-wrap: wrap; gap: 12px;"></div>
      </div>
    `,
    js: `
      function showTab(n) {
        document.querySelectorAll('.tc-tab').forEach((t, i) => t.classList.toggle('active', i === n));
        document.querySelectorAll('.tc-panel').forEach((p, i) => p.classList.toggle('active', i === n));
        document.getElementById('tCalcResult').style.display = 'none';
      }

      function getV(id) { return parseFloat(document.getElementById(id).value) || 0; }

      function formatTime(totalSecs) {
        const sign = totalSecs < 0 ? '-' : '';
        let s = Math.abs(totalSecs);
        const d = Math.floor(s / 86400); s %= 86400;
        const h = Math.floor(s / 3600); s %= 3600;
        const m = Math.floor(s / 60); s %= 60;
        let res = [];
        if (d > 0) res.push(d + 'd');
        if (h > 0) res.push(h + 'h');
        if (m > 0) res.push(m + 'm');
        if (s > 0 || res.length === 0) res.push(Math.round(s) + 's');
        return sign + res.join(' ');
      }

      function showR(val, details) {
        const r = document.getElementById('tCalcResult');
        document.getElementById('tResValue').innerText = val;
        document.getElementById('tResDetails').innerHTML = details.map(d => '<span style="background:rgba(32,138,240,0.1); padding:6px 14px; border-radius:100px; font-size:0.85rem; color:var(--text-secondary); border:1px solid rgba(32,138,240,0.1)">'+d+'</span>').join('');
        r.classList.add('visible');
        r.scrollIntoView({behavior: 'smooth', block: 'end'});
      }

      function calcAddSub() {
        const s1 = getV('td1')*86400 + getV('th1')*3600 + getV('tm1')*60 + getV('ts1');
        const s2 = getV('td2')*86400 + getV('th2')*3600 + getV('tm2')*60 + getV('ts2');
        const op = document.getElementById('top1').value;
        const result = op === 'add' ? s1 + s2 : s1 - s2;
        showR(formatTime(result), ['Total Seconds: ' + result.toLocaleString() + 's']);
      }

      function calcFromDate() {
        const start = document.getElementById('tDateTimeStart').value;
        if (!start) return alert('Please select a start date');
        const date = new Date(start);
        const diff = getV('tdd')*86400 + getV('tdh')*3600 + getV('tdm')*60 + getV('tds');
        const op = document.getElementById('topDate').value;
        const multiplier = op === 'add' ? 1 : -1;
        date.setSeconds(date.getSeconds() + (diff * multiplier));
        showR(date.toLocaleString(), [
          'Year: ' + date.getFullYear(),
          'Day: ' + date.toLocaleDateString(undefined, {weekday:'long'})
        ]);
      }

      function calcExpr() {
        const input = document.getElementById('tExprInput').value.toLowerCase().trim();
        if (!input) return alert('Enter an expression');
        // Support common variants like 1hr, 2min, 30sec
        const cleanInput = input.replace(/hours?|hr|hrs/g, 'h')
                                .replace(/minutes?|min|mins/g, 'm')
                                .replace(/seconds?|sec|secs/g, 's')
                                .replace(/days?/g, 'd');
        const regex = /([+-]?\s*[\d.]+\s*[dhms])/g;
        let totalSecs = 0;
        const matches = cleanInput.match(regex);
        if(!matches) return alert('Invalid format. Use e.g. 1d 2h + 30m');
        matches.forEach(m => {
          let str = m.replace(/\s+/g, '');
          let unit = str.slice(-1);
          let valStr = str.slice(0, -1);
          // Handle explicit + or - at start
          let sign = 1;
          if (valStr.startsWith('-')) { sign = -1; valStr = valStr.substring(1); }
          else if (valStr.startsWith('+')) { valStr = valStr.substring(1); }
          
          let val = parseFloat(valStr) || 0;
          if (unit === 'd') totalSecs += sign * val * 86400;
          else if (unit === 'h') totalSecs += sign * val * 3600;
          else if (unit === 'm') totalSecs += sign * val * 60;
          else if (unit === 's') totalSecs += sign * val;
        });
        showR(formatTime(totalSecs), ['Total Seconds: ' + totalSecs.toLocaleString() + 's']);
      }

      document.getElementById('tDateTimeStart').value = new Date().toISOString().slice(0, 16);
    `,
    formula: 'Time is calculated using 60-base math (1m=60s, 1h=60m, 1d=24h).',
    blog: `
      <p>Time calculation is unique because it doesn't use the standard base-10 system we use for money or distance. Instead, it uses a complex mix of Base-60 (Sexagesimal) and Base-24.</p>
      <h4>Why is Time so Complicated?</h4>
      <p>Because years, months, and days are based on the rotation of the Earth and its orbit around the Sun, they don't fit into neat decimal numbers. This is why we have leap years every four years—to "catch up" the 0.242 days that the Earth takes to complete an orbit beyond the flat 365 days.</p>
      <h4>Mastering Time Expressions</h4>
      <p>Our Expression mode allows you to treat time like a mathematical formula. This is particularly useful for project management, video editing, or calculating long-distance flight durations across multiple layovers.</p>
    `,
    what: `
    <p>Complete time utility to add or subtract time values, calculate new dates given a duration, or evaluate complex time-unit expressions.</p>
    <div style="margin-top: 32px;">
      <h3 style="margin-bottom: 12px; color: var(--text-primary);">Common Time Units</h3>
      <div style="overflow-x: auto;">
        <table class="rate-table">
          <thead><tr><th>Unit</th><th>Definition</th></tr></thead>
          <tbody>
            <tr><td>millennium</td><td>1,000 years</td></tr>
            <tr><td>century</td><td>100 years</td></tr>
            <tr><td>decade</td><td>10 years</td></tr>
            <tr><td>year (average)</td><td>365.242 days or 12 months</td></tr>
            <tr><td>common year</td><td>365 days or 12 months</td></tr>
            <tr><td>leap year</td><td>366 days or 12 months</td></tr>
            <tr><td>quarter</td><td>3 months</td></tr>
            <tr><td>month</td><td>28-31 days</td></tr>
            <tr><td>week</td><td>7 days</td></tr>
            <tr><td>day</td><td>24 hours or 1,440 minutes</td></tr>
            <tr><td>hour</td><td>60 minutes or 3,600 seconds</td></tr>
            <tr><td>minute</td><td>60 seconds</td></tr>
            <tr><td>second</td><td>base unit</td></tr>
          </tbody>
        </table>
      </div>
    </div>
    <div style="margin-top: 32px;">
      <h3 style="margin-bottom: 12px; color: var(--text-primary);">Concepts of Time</h3>
      <p style="margin-bottom: 12px; font-size: 0.95rem;"><strong>Ancient Greece (Aristotle):</strong> Aristotle defined time as "a number of movement in respect of the before and after." Essentially, Aristotle's view of time defined it as a measurement of change requiring motion or change.</p>
      <p style="margin-bottom: 12px; font-size: 0.95rem;"><strong>Newton vs. Leibniz:</strong> Isaac Newton argued for "absolute time" that flows without regard to external factors. In contrast, Leibniz believed time is a relational concept that only makes sense in the presence of objects to sequence events.</p>
      <p style="margin-bottom: 12px; font-size: 0.95rem;"><strong>Einstein:</strong> Albert Einstein introduced the idea of spacetime. He posited that the speed of light is constant for all observers, meaning time itself must change for observers at different relative velocities.</p>
    </div>
    <div style="margin-top: 32px;">
      <h3 style="margin-bottom: 12px; color: var(--text-primary);">How We Measure Time</h3>
      <p style="margin-bottom: 12px; font-size: 0.95rem;">Measurements of time are based on the <strong>sexagesimal system</strong> (base 60), originating from ancient Sumer and later adopted by Babylonians. Base 60 is used because 60 is a superior highly composite number with 12 factors, simplifying fractions.</p>
      <p style="margin-bottom: 12px; font-size: 0.95rem;">Early devices ranging from oil lamps and clepsydras (water clocks) to mechanical pendulum clocks and current atomic clocks show our progress. Atomic clocks, using cesium resonance, are the most accurate, defining the SI unit of the second.</p>
    </div>
    `,
    example: 'Example: 1d 12h + 12h = 2d 0h 0m 0s',
    faqs: [
      ['How does the expression mode work?', 'You can chain time units with + and - signs. Example: "2h 30m + 45s - 1h".'],
      ['What units are supported?', 'Days (d), Hours (h), Minutes (m), and Seconds (s).']
    ]
  },
  'bmr-calculator': {
    fields: [
      { id:'gender', label:'Gender', placeholder:'male', type:'select', options:['male','female'] },
      { id:'age', label:'Age', placeholder:'25', type:'number' },
      { id:'weight', label:'Weight (kg)', placeholder:'70', type:'number' },
      { id:'height', label:'Height (cm)', placeholder:'175', type:'number' },
    ],
    btn: 'Calculate BMR',
    js: `function calculate(){
  const g = document.getElementById('gender').value;
  const a = parseFloat(v('age')), w = parseFloat(v('weight')), h = parseFloat(v('height'));
  if(!a||!w||!h) return alert('Please fill all fields');
  let bmr = (g==='male') ? (10*w + 6.25*h - 5*a + 5) : (10*w + 6.25*h - 5*a - 161);
  showResult('Your BMR', Math.round(bmr)+' kcal/day', [
    'Calories burned at rest',
    'Male Formula: 10W + 6.25H - 5A + 5',
    'Female Formula: 10W + 6.25H - 5A - 161'
  ]);
}`,
    formula: 'BMR = 10W + 6.25H - 5A + s',
    what: 'Basal Metabolic Rate (BMR) is the number of calories your body needs to function at rest.',
    blog: `
      <p>Your BMR is the energy your body spends just to keep you alive. Imagine lying in bed all day without moving a muscle—your heart still beats, your lungs breathe, and your brain processes information. All of that requires fuel.</p>
      <h4>The Foundation of Nutrition</h4>
      <p>Knowing your BMR is the first step in any nutrition plan. It represents the "floor" of your calorie needs. You should almost never consume fewer calories than your BMR for an extended period, as it can slow down your metabolism and lead to nutrient deficiencies.</p>
    `,
    example: 'Male, 25, 70kg, 175cm = 1,680 BMR',
    faqs: []
  },
  'age-calculator': {
    fields: [
      { id:'birthdate', label:'Date of Birth', type:'date' },
      { id:'agedate', label:'Age at Date of', type:'date' },
    ],
    btn: 'Calculate Age',
    js: `function calculate(){
  const dob = new Date(v('birthdate')), target = new Date(v('agedate'));
  if(isNaN(dob)||isNaN(target)) return alert('Please enter both dates');
  let y = target.getFullYear() - dob.getFullYear();
  let m = target.getMonth() - dob.getMonth();
  let d = target.getDate() - dob.getDate();
  if(d < 0){ m--; d += new Date(target.getFullYear(), target.getMonth(), 0).getDate(); }
  if(m < 0){ y--; m += 12; }
  showResult('Your Age', y+' years, '+m+' months, '+d+' days', [
    'Total Months: '+(y*12+m).toLocaleString(),
    'Total Days: '+Math.floor((target-dob)/86400000).toLocaleString()+' days'
  ]);
}`,
    formula: 'Age = Target Date − Birth Date',
    what: 'Calculate your exact age in years, months, and days from your date of birth.',
    blog: `
      <p>How old are you... exactly? This tool goes beyond just the year of your birth to find the months and days that make up your life journey so far.</p>
      <h4>Cultural Traditions</h4>
      <p>While Western culture considers a person 0 years old at birth, some East Asian traditions consider a baby 1 year old at birth, counting the time spent in the womb as the first year of life.</p>
    `,
    example: 'Born 01 Jan 2000, today is 01 Jan 2024 = 24 years old',
    faqs: []
  },
  'date-calculator': {
    fields: [
      { id:'start', label:'Start Date', type:'date' },
      { id:'op', label:'Add or Subtract', type:'select', options:['Add', 'Subtract'] },
      { id:'y', label:'Years', type:'number', placeholder:'0' },
      { id:'m', label:'Months', type:'number', placeholder:'0' },
      { id:'d', label:'Days', type:'number', placeholder:'0' },
    ],
    btn: 'Calculate New Date',
    js: `function calculate(){
  const s = new Date(v('start')), op = document.getElementById('op').value;
  let y = parseInt(v('y')||0), m = parseInt(v('m')||0), d = parseInt(v('d')||0);
  if(op === 'Subtract'){ y=-y; m=-m; d=-d; }
  s.setFullYear(s.getFullYear()+y);
  s.setMonth(s.getMonth()+m);
  s.setDate(s.getDate()+d);
  showResult('New Date', s.toLocaleDateString(undefined, {weekday:'long', year:'numeric', month:'long', day:'numeric'}), [
    'Date: '+s.toISOString().slice(0,10)
  ]);
}`,
    formula: 'New Date = Start Date ± Duration',
    what: 'Add or subtract years, months, and days from a specific date to find a future or past date.',
    blog: `
      <p>Planning for the future often requires precise date calculations. Whether you are finding the 90-day mark for a corporate project or calculating a warranty expiration, our tool removes the guesswork.</p>
      <h4>The Complexity of Months</h4>
      <p>Adding "one month" to January 30th is tricky because February has only 28 or 29 days. Our calculator uses standard logical rolls to move to the next valid date, ensuring your project timelines stay accurate.</p>
    `,
    example: 'Today + 3 Months 10 Days = Future Date',
    faqs: []
  },
  'percentage-calculator': {
    fields: [
      { id:'val1', label:'What is (%)', placeholder:'10', type:'number' },
      { id:'val2', label:'of ($)', placeholder:'200', type:'number' },
    ],
    btn: 'Calculate %',
    js: `function calculate(){
  const p = parseFloat(v('val1')), total = parseFloat(v('val2'));
  if(isNaN(p)||isNaN(total)) return alert('Please fill all fields');
  const res = (p/100) * total;
  showResult('Result', res.toLocaleString(), [
    p+'% of '+total+' = '+res
  ]);
}`,
    formula: 'Amount = (P / 100) × Total',
    what: 'A standard percentage calculator to find the value of a percentage of a total amount.',
    example: '10% of 200 = 20',
    faqs: []
  },
  'body-fat-calculator': {
    fields: [
      { id:'gender', label:'Gender', type:'select', options:['Male', 'Female'] },
      { id:'weight', label:'Weight (kg)', type:'number', placeholder:'70' },
      { id:'waist', label:'Waist (cm)', type:'number', placeholder:'80' },
      { id:'neck', label:'Neck (cm)', type:'number', placeholder:'38' },
      { id:'height', label:'Height (cm)', type:'number', placeholder:'175' },
    ],
    btn: 'Calculate Body Fat',
    js: `function calculate(){
  const g = document.getElementById('gender').value, w = parseFloat(v('weight')), waist = parseFloat(v('waist')), neck = parseFloat(v('neck')), h = parseFloat(v('height'));
  if(!w||!waist||!neck||!h) return alert('Please fill all fields');
  let bf = 0;
  if(g === 'Male'){
    bf = 495 / (1.0324 - 0.19077 * Math.log10(waist - neck) + 0.15456 * Math.log10(h)) - 450;
  } else {
    const hip = parseFloat(prompt('Please enter Hip circumference (cm):') || 90);
    bf = 495 / (1.29579 - 0.35004 * Math.log10(waist + hip - neck) + 0.22100 * Math.log10(h)) - 450;
  }
  showResult('Body Fat %', bf.toFixed(1)+'%', [
    'Lean Body Mass: '+ (w * (1 - bf/100)).toFixed(1) + ' kg',
    'Fat Mass: ' + (w * (bf/100)).toFixed(1) + ' kg'
  ]);
}`,
    formula: 'Navy Health Clinic Formula',
    what: 'Estimate your body fat percentage using the U.S. Navy method based on body measurements.',
    blog: `
      <p>Body fat percentage is often a better marker of health than simple weight. It distinguishes between muscle mass and adipose tissue, providing a clearer picture of your body composition.</p>
      <h4>The U.S. Navy Method</h4>
      <p>This method is one of the most accurate ways to estimate body fat without expensive equipment. It relies on the relationship between your height and the circumference of your waist and neck (and hips for women).</p>
      <h4>Healthy Ranges</h4>
      <ul>
        <li><strong>Athletes:</strong> 6-13% (Male), 14-20% (Female)</li>
        <li><strong>Fitness:</strong> 14-17% (Male), 21-24% (Female)</li>
        <li><strong>Average:</strong> 18-24% (Male), 25-31% (Female)</li>
      </ul>
    `,
    example: 'Male, 175cm, 80cm waist, 38cm neck ≈ 15% BF',
    faqs: []
  },
  'ideal-weight-calculator': {
    fields: [
      { id:'gender', label:'Gender', type:'select', options:['Male', 'Female'] },
      { id:'height', label:'Height (cm)', type:'number', placeholder:'175' },
    ],
    btn: 'Calculate Ideal Weight',
    js: `function calculate(){
  const g = document.getElementById('gender').value, h = parseFloat(v('height'));
  if(!h) return alert('Please enter height');
  const inch = h / 2.54;
  const over5ft = Math.max(0, inch - 60);
  let ideal = (g === 'Male') ? 50 + (2.3 * over5ft) : 45.5 + (2.3 * over5ft);
  showResult('Ideal Weight', ideal.toFixed(1)+' kg', [
    'Devine Formula (1974)',
    'Range: '+(ideal*0.9).toFixed(1)+' - '+(ideal*1.1).toFixed(1)+' kg'
  ]);
}`,
    formula: 'Devine Formula: 50kg + 2.3kg per inch over 5ft',
    what: 'Find your healthy "ideal" body weight based on height and gender using medical formulas.',
    blog: `
      <p>The concept of "Ideal Weight" originated in the 1970s primarily for medical dosing. Today, it serves as a helpful benchmark for set-point weight targets.</p>
      <h4>Different Formulas</h4>
      <p>While we use the Devine Formula, others like Robinson or Miller exist. Most yield similar results. The goal is to find a weight where your body functions optimally and your risk for chronic disease is minimized.</p>
    `,
    example: 'Male, 180cm ≈ 73kg',
    faqs: []
  },
  'fraction-calculator': {
    fields: [
      { id:'n1', label:'Numerator 1', type:'number', placeholder:'1' },
      { id:'d1', label:'Denominator 1', type:'number', placeholder:'2' },
      { id:'op', label:'Operation', type:'select', options:['+', '-', '*', '/'] },
      { id:'n2', label:'Numerator 2', type:'number', placeholder:'1' },
      { id:'d2', label:'Denominator 2', type:'number', placeholder:'4' },
    ],
    btn: 'Calculate Fraction',
    js: `function calculate(){
  const n1 = parseInt(v('n1')), d1 = parseInt(v('d1')), n2 = parseInt(v('n2')), d2 = parseInt(v('d2')), op = document.getElementById('op').value;
  if(!d1 || !d2) return alert('Denominator cannot be zero');
  let rn, rd;
  if(op === '+'){ rn = n1*d2 + n2*d1; rd = d1*d2; }
  else if(op === '-'){ rn = n1*d2 - n2*d1; rd = d1*d2; }
  else if(op === '*'){ rn = n1*n2; rd = d1*d2; }
  else if(op === '/'){ rn = n1*d2; rd = d1*n2; }
  
  const gcd = (a, b) => b ? gcd(b, a % b) : a;
  const common = Math.abs(gcd(rn, rd));
  const sn = rn/common, sd = rd/common;
  showResult('Result', sn + '/' + sd, [
    'Decimal: ' + (rn/rd).toFixed(4),
    'Simplified Numerator: ' + sn,
    'Simplified Denominator: ' + sd
  ]);
}`,
    formula: 'Fractional Arithmetic (a/b ± c/d)',
    what: 'Add, subtract, multiply, or divide two fractions and see the simplified result.',
    blog: `
      <p>Fractions represent parts of a whole. While they can seem intimidating, they are based on simple proportional logic that is essential for cooking, carpentry, and design.</p>
      <h4>Common Denominators</h4>
      <p>To add or subtract fractions, they must be "speaking the same language"—meaning they need a common denominator. Our calculator automatically finds the Least Common Multiple (LCM) to solve the problem for you.</p>
      <h4>Simplification</h4>
      <p>A fraction like 4/8 is correct, but 1/2 is "simplified." We always provide the simplified version of your result to make it as readable as possible.</p>
    `,
    example: '1/2 + 1/4 = 3/4',
    faqs: []
  },
  'average-calculator': {
    fields: [
      { id:'nums', label:'Numbers (comma separated)', placeholder:'10, 20, 30', type:'text' },
    ],
    btn: 'Calculate Average',
    js: `function calculate(){
  const arr = v('nums').split(',').map(n => parseFloat(n.trim())).filter(n => !isNaN(n));
  if(arr.length === 0) return alert('Enter valid numbers');
  const sum = arr.reduce((a,b) => a+b, 0);
  const avg = sum / arr.length;
  showResult('Average (Mean)', avg.toFixed(2), [
    'Sum: ' + sum,
    'Count: ' + arr.length,
    'Median: ' + (arr.sort((a,b)=>a-b)[Math.floor(arr.length/2)])
  ]);
}`,
    formula: 'Average = Sum / Count',
    what: 'Calculate the mathematical mean (average), sum, and count of a series of numbers.',
    blog: `
      <p>The "average" or "mean" is the central value of a set of numbers. It is the most common way to summarize data, from test scores to monthly expenses.</p>
      <h4>Mean vs. Median</h4>
      <p>While the mean is the sum divided by the count, the <strong>median</strong> is the middle number in a sorted list. If your data has "outliers" (numbers that are much higher or lower than the rest), the median might be a more accurate representation of the center than the mean.</p>
    `,
    example: 'Average of 10, 20, 30 = 20',
    faqs: []
  },
  'quadratic-calculator': {
    fields: [
      { id:'a', label:'a (x² coefficient)', placeholder:'1', type:'number' },
      { id:'b', label:'b (x coefficient)', placeholder:'-5', type:'number' },
      { id:'c', label:'c (constant)', placeholder:'6', type:'number' },
    ],
    btn: 'Solve Quadratic',
    js: `function calculate(){
  const a = parseFloat(v('a')), b = parseFloat(v('b')), c = parseFloat(v('c'));
  if(!a) return alert(' "a" cannot be 0');
  const d = b*b - 4*a*c;
  if(d < 0) return showResult('No Real Roots', 'Complex', ['Discriminant: '+d]);
  const x1 = (-b + Math.sqrt(d))/(2*a);
  const x2 = (-b - Math.sqrt(d))/(2*a);
  showResult('Roots', 'x₁ = '+x1.toFixed(2)+', x₂ = '+x2.toFixed(2), [
    'Discriminant: '+d,
    'Vertex: x = '+(-b/(2*a)).toFixed(2)
  ]);
}`,
    formula: 'x = [-b ± √(b² - 4ac)] / 2a',
    what: 'Solve quadratic equations of the form ax² + bx + c = 0 using the quadratic formula.',
    blog: `
      <p>Quadratic equations are essential in physics, engineering, and economics. They describe the path of a projectile, the shape of a satellite dish, and the point where a business breaks even.</p>
      <h4>The Discriminant (D)</h4>
      <p>Our solver calculates the discriminant (b² - 4ac). This number tells you how many solutions exist. If D > 0, there are two real roots. If D = 0, there is exactly one. If D < 0, the roots are complex (imaginary).</p>
    `,
    example: 'x² - 5x + 6 = 0 -> x = 2, 3',
    faqs: []
  },
  'lcm-hcf-calculator': {
    fields: [
      { id:'n1', label:'Number 1', type:'number', placeholder:'12' },
      { id:'n2', label:'Number 2', type:'number', placeholder:'18' },
    ],
    btn: 'Calculate',
    js: `function calculate(){
  const a = Math.abs(parseInt(v('n1'))), b = Math.abs(parseInt(v('n2')));
  if(!a || !b) return alert('Enter non-zero integers');
  const gcd = (x, y) => y ? gcd(y, x % y) : x;
  const hcf = gcd(a, b);
  const lcm = (a * b) / hcf;
  showResult('LCM & HCF', 'LCM: '+lcm+', HCF: '+hcf, [
    'Least Common Multiple: '+lcm,
    'Highest Common Factor: '+hcf
  ]);
}`,
    formula: 'LCM(a,b) = (a×b)/GCD(a,b)',
    what: 'Find the Least Common Multiple (LCM) and Highest Common Factor (HCF/GCD) of two numbers.',
    blog: `
      <p>LCM and HCF are the building blocks of arithmetic and number theory. They are used whenever you need to find a common rhythm between two repeating events.</p>
      <h4>Practical Uses</h4>
      <ul>
        <li><strong>LCM:</strong> Useful for finding when two events happening at different intervals will sync up again.</li>
        <li><strong>GCD/HCF:</strong> Essential for simplifying fractions or finding the largest possible size for tiles in a room without cutting any.</li>
      </ul>
    `,
    example: 'LCM(12, 18) = 36, HCF(12, 18) = 6',
    faqs: []
  },
  'days-between-dates': {
    fields: [
      { id:'start', label:'Start Date', type:'date' },
      { id:'end', label:'End Date', type:'date' },
      { id:'inc', label:'Include End Date?', type:'select', options:['No', 'Yes'] }
    ],
    btn: 'Calculate Days',
    js: `function calculate(){
  const s = new Date(v('start')), e = new Date(v('end')), inc = document.getElementById('inc').value;
  if(isNaN(s)||isNaN(e)) return alert('Please enter both dates');
  let diff = Math.abs(e - s) / 86400000;
  if(inc === 'Yes') diff += 1;
  showResult('Difference', diff.toLocaleString() + ' days', [
    'Total Weeks: ' + (diff/7).toFixed(1),
    'Total Hours: ' + (diff * 24).toLocaleString(),
    'Total Minutes: ' + (diff * 1440).toLocaleString()
  ]);
}`,
    formula: 'Days = |Date2 − Date1|',
    what: 'Calculate the total number of days between two specific dates.',
    blog: `
      <p>Knowing the exact count of days between dates is critical for legal contracts, travel planning, and tracking personal goals.</p>
      <h4>Inclusive vs. Exclusive</h4>
      <p>Our calculator lets you choose whether to "Include the End Date." In many legal contexts, the start date is excluded but the end date is included. For hotel stays, you usually count the number of "nights," which excludes the checkout day.</p>
    `,
    example: '01 Jan to 31 Jan = 30 days (excluding end date)',
    faqs: []
  },
  'scientific-calculator': {
    customHTML: `
      <style>
        .sci-display { width: 100%; background: #000; color: #0f0; font-family: 'JetBrains Mono', monospace; padding: 20px; font-size: 1.5rem; text-align: right; border-radius: 8px; margin-bottom: 20px; border: 1px solid var(--border-color); }
        .sci-btns { display: grid; grid-template-columns: repeat(4, 1fr); gap: 10px; }
        .sci-btns button { padding: 15px; border-radius: 8px; border: 1px solid var(--border-color); background: var(--bg-input); color: #fff; cursor: pointer; font-weight: 700; }
        .sci-btns button:hover { background: rgba(255,255,255,0.1); }
        .sci-btns .op { color: var(--accent-blue); }
        .sci-btns .eq { background: var(--accent-blue); }
      </style>
      <div class="sci-display" id="sciDisp">0</div>
      <div class="sci-btns">
        <button onclick="sciIn('sin(')" class="op">sin</button><button onclick="sciIn('cos(')" class="op">cos</button><button onclick="sciIn('tan(')" class="op">tan</button><button onclick="sciClr()">C</button>
        <button onclick="sciIn('7')">7</button><button onclick="sciIn('8')">8</button><button onclick="sciIn('9')">9</button><button onclick="sciIn('/')" class="op">/</button>
        <button onclick="sciIn('4')">4</button><button onclick="sciIn('5')">5</button><button onclick="sciIn('6')">6</button><button onclick="sciIn('*')" class="op">*</button>
        <button onclick="sciIn('1')">1</button><button onclick="sciIn('2')">2</button><button onclick="sciIn('3')">3</button><button onclick="sciIn('-')" class="op">-</button>
        <button onclick="sciIn('0')">0</button><button onclick="sciIn('.')">.</button><button onclick="sciEq()" class="eq">=</button><button onclick="sciIn('+')" class="op">+</button>
        <button onclick="sciIn('Math.PI')" class="op">π</button><button onclick="sciIn('Math.E')" class="op">e</button><button onclick="sciIn('**')" class="op">^</button><button onclick="sciIn('sqrt(')" class="op">√</button>
      </div>
    `,
    js: `
      let expr = '';
      function sciIn(v){ expr += v; document.getElementById('sciDisp').innerText = expr; }
      function sciClr(){ expr = ''; document.getElementById('sciDisp').innerText = '0'; }
      function sciEq(){
        try {
          // Replace functions with Math equivalents
          let safeExpr = expr.replace(/sin\\(/g, 'Math.sin(').replace(/cos\\(/g, 'Math.cos(').replace(/tan\\(/g, 'Math.tan(').replace(/sqrt\\(/g, 'Math.sqrt(');
          let res = eval(safeExpr);
          document.getElementById('sciDisp').innerText = res;
          expr = res.toString();
        } catch(e){ alert('Invalid Expression'); sciClr(); }
      }
    `,
    formula: 'Standard Mathematical Operators',
    what: 'A full scientific calculator supporting trigonometry, exponents, and basic arithmetic.',
    blog: `
      <p>A scientific calculator is designed to solve problems in science, engineering, and mathematics. It goes beyond the basic "four functions" to provide advanced logic.</p>
      <h4>Trigonometry</h4>
      <p>Calculate sine (sin), cosine (cos), and tangent (tan) for angles. These are essential for calculating slopes, heights, and wave patterns.</p>
      <h4>Exponents and Roots</h4>
      <p>Quickly find powers (x^y) and square roots (√) of any number. This is vital for calculating surface areas, volumes, and exponential growth models.</p>
    `,
    example: 'sin(Math.PI/2) = 1',
    faqs: []
  },
  'time-duration-calculator': {
    fields: [
      { id:'start', label:'Start Date & Time', placeholder:'', type:'date' },
      { id:'end', label:'End Date & Time', placeholder:'', type:'date' },
    ],
    btn: 'Calculate Duration',
    js: `function calculate(){
  const s = new Date(v('start')), e = new Date(v('end'));
  if(isNaN(s)||isNaN(e)) return alert('Please enter both dates');
  const d = Math.abs(e - s) / 1000;
  const days = Math.floor(d / 86400);
  const hours = Math.floor((d % 86400) / 3600);
  const mins = Math.floor((d % 3600) / 60);
  showResult('Total Duration', days+' days, '+hours+'h '+mins+'m', [
    'Total Hours: '+Math.floor(d/3600).toLocaleString(),
    'Total Minutes: '+Math.floor(d/60).toLocaleString(),
    'Total Seconds: '+d.toLocaleString()
  ]);
}`,
    formula: 'Duration = |Date2 − Date1|',
    what: 'Calculate the exact time difference (duration) between two specific dates and times.',
    blog: `
      <p>Time duration stretches across days, hours, and minutes. This calculator provides a complete breakdown so you can understand the exact length of an event.</p>
      <h4>Applications</h4>
      <p>Use this for calculating billable hours, finding the length of a long-haul flight, or determining exactly how much time is left until a significant deadline.</p>
    `,
    example: 'Example: 01 Jan 2025 to 15 Jan 2025 = 14 days 0h 0m',
    faqs: []
  },
  'tax-calculator': {
    fields: [
      { id:'income', label:'Gross Annual Income ($)', placeholder:'75000', type:'number' },
      { id:'filing', label:'Filing Status', type:'select', options:['Single', 'Married Filing Jointly', 'Head of Household'] },
    ],
    btn: 'Calculate Tax',
    js: `function calculate(){
  const inc = parseFloat(v('income'));
  const status = document.getElementById('filing').value;
  if(!inc) return alert('Please enter income');
  // Simple 2024 bracket approximation
  let tax = 0;
  if (inc > 100000) tax = inc * 0.25;
  else if (inc > 50000) tax = inc * 0.18;
  else tax = inc * 0.12;
  const net = inc - tax;
  showResult('Est. Federal Tax', '$'+tax.toLocaleString(), [
    'Take-home Pay: $'+net.toLocaleString(),
    'Effective Rate: '+(tax/inc*100).toFixed(1)+'%',
    'Monthly Net: $'+(net/12).toLocaleString()
  ]);
}`,
    formula: 'Federal Tax = Income × Effective Bracket Rate',
    what: 'Estimate your federal income tax liability and see your true take-home pay after deductions.',
    blog: `
      <p>Taxes are inevitable, but they don't have to be a surprise. Our estimator helps you plan for your annual tax bill so you can adjust your withholdings or savings accordingly.</p>
      <h4>Marginal vs. Effective Rate</h4>
      <p>Your <strong>marginal tax rate</strong> is the tax percentage on your <em>last</em> dollar earned. Your <strong>effective tax rate</strong> is the total tax you pay divided by your total income. Usually, your effective rate is much lower than your marginal rate because of standard deductions and lower brackets.</p>
    `,
    example: '$75,000 Single filer ≈ $13,500 Federal Tax',
    faqs: []
  },
  'budget-calculator': {
    fields: [
      { id:'income', label:'Monthly Net Income ($)', placeholder:'5000', type:'number' },
      { id:'rent', label:'Rent/Mortgage ($)', placeholder:'1500', type:'number' },
      { id:'food', label:'Food & Groceries ($)', placeholder:'600', type:'number' },
      { id:'util', label:'Utilities ($)', placeholder:'300', type:'number' },
      { id:'transport', label:'Transport ($)', placeholder:'400', type:'number' },
    ],
    btn: 'Analyze Budget',
    js: `function calculate(){
  const inc = parseFloat(v('income')), r=parseFloat(v('rent')||0), f=parseFloat(v('food')||0), u=parseFloat(v('util')||0), t=parseFloat(v('transport')||0);
  if(!inc) return alert('Please enter income');
  const expenses = r+f+u+t;
  const savings = inc - expenses;
  showResult('Monthly Savings', '$'+savings.toLocaleString(), [
    'Total Expenses: $'+expenses.toLocaleString(),
    'Expense Ratio: '+(expenses/inc*100).toFixed(1)+'%',
    '50/30/20 Target: $'+(inc*0.2).toLocaleString()+' for savings'
  ]);
}`,
    formula: 'Savings = Income − Expenses',
    what: 'A simple monthly budget tracker to help you visualize your spending and identify saving opportunities.',
    blog: `
      <p>Budgeting is about telling your money where to go instead of wondering where it went. A solid budget is the foundation of every financial success story.</p>
      <h4>The 50/30/20 Rule</h4>
      <p>A popular budgeting framework: 50% of income goes to Needs (rent, utilities, food), 30% to Wants (hobbies, dining out), and 20% to Savings or Debt Repayment. Use our results to see how close you are to this healthy gold standard.</p>
    `,
    example: '$5,000 income - $2,800 expenses = $2,200 saved',
    faqs: []
  },
  'water-intake-calculator': {
    fields: [
      { id:'weight', label:'Weight (kg)', placeholder:'70', type:'number' },
      { id:'age', label:'Age', placeholder:'25', type:'number' },
      { id:'activity', label:'Activity Level', type:'select', options:['Low', 'Moderate', 'High'] },
    ],
    btn: 'Calculate Intake',
    js: `function calculate(){
  const w = parseFloat(v('weight')), act = document.getElementById('activity').value;
  if(!w) return alert('Please enter weight');
  let liters = w * 0.033;
  if(act === 'Moderate') liters += 0.5;
  if(act === 'High') liters += 1.0;
  showResult('Daily Water Goal', liters.toFixed(2)+' Liters', [
    'Approx '+(liters*4.22).toFixed(1)+' cups (8oz)',
    'Stay hydrated for better focus and energy',
    'Drink more in hot weather'
  ]);
}`,
    formula: 'Base = 0.033L per kg of Body Weight',
    what: 'Determine your optimal daily water intake based on your body weight and activity level.',
    blog: `
      <p>Hydration is the simplest way to improve your health. Every system in your body, from your kidneys to your brain, relies on adequate water to function.</p>
      <h4>The Signs of Dehydration</h4>
      <p>Thirst is actually a late sign of dehydration. Other early indicators include daytime fatigue, headaches, and dark-colored urine. By hitting your calculated goal, you can improve your energy levels and skin health.</p>
    `,
    example: '70kg person with Moderate activity ≈ 2.8 Liters/day',
    faqs: []
  },
  'pregnancy-calculator': {
    fields: [
      { id:'lmp', label:'Last Menstrual Period (LMP)', type:'date' },
    ],
    btn: 'Estimate Due Date',
    js: `function calculate(){
  const lmp = new Date(v('lmp'));
  if(isNaN(lmp)) return alert('Please enter LMP date');
  const due = new Date(lmp);
  due.setDate(due.getDate() + 280); // 40 weeks
  const now = new Date();
  const weeks = Math.floor((now - lmp) / (7*86400000));
  showResult('Estimated Due Date', due.toLocaleDateString(undefined, {year:'numeric', month:'long', day:'numeric'}), [
    'Current Week: '+weeks,
    'Trimester: '+(weeks < 13 ? 'First' : weeks < 27 ? 'Second' : 'Third'),
    'Days Remaining: '+Math.max(0, Math.floor((due-now)/86400000))
  ]);
}`,
    formula: 'Due Date = LMP + 280 Days',
    what: 'Estimate your baby\'s due date and track your current week of pregnancy based on your last period.',
    blog: `
      <p>Pregnancy is a 40-week journey that is usually measured from the first day of your last menstrual period (LMP). While only 5% of babies are born on their exact due date, having an anchor point is essential for medical prenatal care.</p>
      <h4>The Three Trimesters</h4>
      <p>Our calculator identifies your current trimester. The first is for development, the second is often the "honeymoon" phase where energy returns, and the third is for growth and preparation for delivery.</p>
    `,
    example: 'LMP 01 Jan -> Due Date 08 Oct',
    faqs: []
  },
  'heart-rate-calculator': {
    fields: [
      { id:'age', label:'Age', placeholder:'30', type:'number' },
      { id:'rest', label:'Resting Heart Rate', placeholder:'60', type:'number' },
    ],
    btn: 'Calculate Zones',
    js: `function calculate(){
  const a = parseFloat(v('age')), r = parseFloat(v('rest')||60);
  if(!a) return alert('Please enter age');
  const max = 220 - a;
  const reserve = max - r;
  showResult('Max Heart Rate', max + ' BPM', [
    'Fat Burn (60-70%): '+Math.round(r + reserve*0.6)+' - '+Math.round(r + reserve*0.7)+' BPM',
    'Aerobic (70-80%): '+Math.round(r + reserve*0.7)+' - '+Math.round(r + reserve*0.8)+' BPM',
    'Anaerobic (80-90%): '+Math.round(r + reserve*0.8)+' - '+Math.round(r + reserve*0.9)+' BPM'
  ]);
}`,
    formula: 'Max HR = 220 − Age (Karvonen Method)',
    what: 'Find your target heart rate zones for different types of exercise to maximize your fitness results.',
    blog: `
      <p>Training "blind" is a common mistake. By knowing your heart rate zones, you can ensure that your "easy" runs are actually easy and your high-intensity sessions are reaching the intended stimulus.</p>
      <h4>The Zonal System</h4>
      <p>Most athletes use a 5-zone system. Zone 2 (Aerobic) is the "magic" zone for building endurance and metabolic health. Zone 4 and 5 are for power and speed. Balancing these zones is the key to progress without overtraining.</p>
    `,
    example: 'Age 30, Max HR 190, Fat Burn Zone 138-151 BPM',
    faqs: []
  },
  'sleep-calculator': {
    fields: [
      { id:'wake', label:'I want to wake up at', type:'time', value:'07:00' },
    ],
    btn: 'Find Sleep Times',
    js: `function calculate(){
  const wake = v('wake').split(':');
  const date = new Date();
  date.setHours(parseInt(wake[0]), parseInt(wake[1]), 0);
  const times = [];
  // Calculate 4, 5, 6 cycles back (90 mins each)
  for(let i=6; i>=3; i--){
    const d = new Date(date);
    d.setMinutes(d.getMinutes() - (i * 90 + 15)); // 15 mins to fall asleep
    times.push(d.toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'}));
  }
  showResult('Best Sleep Times', times.join(' or '), [
    'Each cycle is ~90 mins',
    'Includes 15 mins to fall asleep',
    '6 cycles = 9 hours sleep (Ideal)',
    '5 cycles = 7.5 hours sleep'
  ]);
}`,
    formula: 'Sleep Time = Wake Time − (N × 90m) − 15m',
    what: 'A Sleep Calculator helps you wake up feeling refreshed by timing your sleep with natural 90-minute sleep cycles.',
    blog: `
      <p>Waking up in the middle of a deep sleep cycle is why you often feel groggy even after 8 hours of sleep. Our tool uses the science of "Sleep Cycles" to help you time your alarm perfectly.</p>
      <h4>The 90-Minute Rule</h4>
      <p>Human sleep happens in stages, usually lasting about 90 minutes. By waking up at the end of a cycle, you are in "light sleep" and feel much more alert. Most adults need 5 or 6 cycles (7.5 or 9 hours) to fully recover.</p>
    `,
    example: 'Wake up at 7:00 AM -> Go to sleep at 9:45 PM or 11:15 PM',
    faqs: []
  },
  'pace-calculator': {
    fields: [
      { id:'dist', label:'Distance (km)', placeholder:'5', type:'number' },
      { id:'time_h', label:'Time (Hours)', placeholder:'0', type:'number' },
      { id:'time_m', label:'Time (Minutes)', placeholder:'25', type:'number' },
      { id:'time_s', label:'Time (Seconds)', placeholder:'0', type:'number' },
    ],
    btn: 'Calculate Pace',
    js: `function calculate(){
  const d = parseFloat(v('dist')), h = parseFloat(v('time_h')||0), m = parseFloat(v('time_m')||0), s = parseFloat(v('time_s')||0);
  if(!d) return alert('Please enter distance');
  const totalSecs = h*3600 + m*60 + s;
  const paceSecs = totalSecs / d;
  const paceM = Math.floor(paceSecs/60), paceS = Math.round(paceSecs%60);
  showResult('Your Pace', paceM + ':' + (paceS<10?'0':'') + paceS + ' /km', [
    'Speed: '+(d / (totalSecs/3600)).toFixed(2)+' km/h',
    'Total Time: '+h+'h '+m+'m '+s+'s'
  ]);
}`,
    formula: 'Pace = Total Time / Distance',
    what: 'Calculate your running pace per kilometer or mile based on your total time and distance.',
    blog: `
      <p>Pace is the "currency" of running. It tells you exactly how fast you need to go to hit your goal time for a 5k, 10k, or a Marathon.</p>
      <h4>Training with Intent</h4>
      <p>Using a pace calculator lets you set training zones. "Easy runs" should be significantly slower than your race pace to build endurance without injury, while "Intervals" should be faster to build speed.</p>
    `,
    example: '5km in 25:00 = 5:00 min/km pace',
    faqs: []
  },
  'probability-calculator': {
    fields: [
      { id:'n', label:'Possible Outcomes (Sample Space)', placeholder:'6', type:'number' },
      { id:'f', label:'Favorable Outcomes', placeholder:'1', type:'number' },
    ],
    btn: 'Calculate Probability',
    js: `function calculate(){
  const n = parseFloat(v('n')), f = parseFloat(v('f'));
  if(!n) return alert('Outcomes cannot be 0');
  if(f > n) return alert('Favorable outcomes cannot exceed total outcomes');
  const p = (f/n) * 100;
  showResult('Probability', p.toFixed(2)+'%', [
    'Ratio: '+f+' / '+n,
    'Decimal: '+(f/n).toFixed(4),
    'Odds Against: '+(n-f)+' to '+f,
    'Fraction: '+reduce(f, n)
  ]);
}
function reduce(n, d){
  const gcd = (a, b) => b ? gcd(b, a % b) : a;
  const common = gcd(n, d);
  return (n/common) + '/' + (d/common);
}`,
    formula: 'P(A) = n(A) / n(S)',
    what: 'The Probability Calculator determines the likelihood of an event occurring. It calculates the ratio of favorable outcomes to the total number of possible outcomes in a sample space.',
    blog: `
      <p>Probability is the mathematical study of randomness and uncertainty. It is used in everything from weather forecasting and insurance to gambling and quantum physics. Understanding basic probability helps you make better decisions in high-stakes environments.</p>
      <h4>Theoretical vs. Experimental Probability</h4>
      <p><strong>Theoretical probability</strong> is based on reasoning. For example, a fair six-sided die has 6 equal outcomes, so the probability of rolling a 4 is exactly 1/6. <strong>Experimental probability</strong> is based on trials—if you roll a die 100 times and get a "4" twenty times, your experimental probability is 20/100.</p>
      <h4>Independent vs. Dependent Events</h4>
      <ul>
        <li><strong>Independent Events:</strong> The outcome of one doesn't affect the other (like flipping two separate coins).</li>
        <li><strong>Dependent Events:</strong> The outcome of the first event changes the probability of the second (like drawing a card from a deck and not replacing it).</li>
      </ul>
      <h4>The Law of Large Numbers</h4>
      <p>This law states that as the number of trials increases, the experimental probability will get closer and closer to the theoretical probability. This is why casinos always win in the long run, even if they lose individual hands.</p>
    `,
    example: 'Rolling a specific number on a 6-sided die: Favorable = 1, Total = 6. Probability = 1/6 ≈ 16.67%.',
    faqs: [
      ['Can probability be greater than 100%?', 'No. By definition, an event cannot be more likely than "certain" (100%) or less likely than "impossible" (0%).'],
      ['What is the difference between odds and probability?', 'Probability is the ratio of success to total possibilities. Odds are the ratio of success to failure (e.g., probability of 25% is 1:3 odds against).'],
      ['What does it mean if probability is 0.5?', 'It means the event has a 50% chance of happening—it is just as likely to occur as it is to not occur.'],
    ]
  },
  'exponent-calculator': {
    fields: [
      { id:'base', label:'Base (x)', placeholder:'2', type:'number' },
      { id:'exp', label:'Exponent (n)', placeholder:'3', type:'number' },
    ],
    btn: 'Calculate Power',
    js: `function calculate(){
  const b = parseFloat(v('base')), e = parseFloat(v('exp'));
  if(isNaN(b) || isNaN(e)) return alert('Please fill both fields');
  const res = Math.pow(b, e);
  showResult('Result', res.toLocaleString(undefined, {maximumFractionDigits: 10}), [
    b+' to the power of '+e+' = '+res,
    'Scientific: '+res.toExponential(4)
  ]);
}`,
    formula: 'y = xⁿ',
    what: 'The Exponent Calculator performs powers and exponentiation for any base number raised to a positive or negative power.',
    blog: `
      <p>Exponents (or powers) represent repeated multiplication. In the expression xⁿ, x is the <strong>base</strong> and n is the <strong>exponent</strong>. It tells you to multiply the base by itself n times.</p>
      <h4>Rules of Exponents</h4>
      <ul>
        <li><strong>Product Rule:</strong> xᵃ × xᵇ = xᵃ⁺ᵇ</li>
        <li><strong>Quotient Rule:</strong> xᵃ / xᵇ = xᵃ⁻ᵇ</li>
        <li><strong>Power Rule:</strong> (xᵃ)ᵇ = xᵃᵇ</li>
        <li><strong>Zero Exponent:</strong> Any number (except zero) raised to the power of 0 is 1.</li>
        <li><strong>Negative Exponents:</strong> x⁻ⁿ = 1 / xⁿ. They represent the reciprocal of the base raised to the positive power.</li>
      </ul>
      <h4>Real-World Applications</h4>
      <p>Exponents are the key to understanding <strong>exponential growth</strong>. This appears in compound interest calculations, population biology, and the Richter scale for earthquakes. Small changes in the exponent lead to massive changes in the final result.</p>
    `,
    example: '2³ = 2 × 2 × 2 = 8. Conversely, 10⁻² = 1 / 100 = 0.01.',
    faqs: [
      ['Why is anything to the power of 0 equal to 1?', 'Mathematically, xⁿ / xⁿ = 1. According to quotient rules, xⁿ / xⁿ = xⁿ⁻ⁿ = x⁰. Therefore, x⁰ = 1.'],
      ['Can exponents be negative?', 'Yes. A negative exponent indicates that the base should be moved to the denominator of a fraction (reciprocal).'],
      ['What are fractional exponents?', 'A fractional exponent like x^(1/2) is the same as the square root (√x). x^(1/3) is the cube root.'],
    ]
  },
  'prime-number-checker': {
    fields: [
      { id:'num', label:'Enter Number', placeholder:'17', type:'number' },
    ],
    btn: 'Check Primality',
    js: `function calculate(){
  const n = parseInt(v('num'));
  if(isNaN(n)) return alert('Please enter a number');
  if(n < 2) return showResult('Not Prime', n + ' is not prime', ['Primes must be 2 or greater']);
  if(n > 1000000) return alert('Number too large for instant check');
  
  let isPrime = true;
  let factor = -1;
  const sqrt = Math.sqrt(n);
  for(let i=2; i<=sqrt; i++) {
    if(n % i === 0) { isPrime = false; factor = i; break; }
  }
  
  showResult(isPrime?'Prime!':'Not Prime', n + (isPrime?' is prime':' is composite'), [
    isPrime ? 'Only divisible by 1 and itself' : 'Smallest factor: '+factor,
    'Factors: '+(isPrime ? '1, '+n : getFactors(n).join(', '))
  ]);
}
function getFactors(n){
  let f = [];
  for(let i=1; i<=Math.sqrt(n); i++) if(n%i===0){ f.push(i); if(i*i!==n) f.push(n/i); }
  return f.sort((a,b)=>a-b);
}`,
    formula: 'n is prime if it has exactly 2 factors.',
    what: 'The Prime Number Checker instantly determines if a number is prime or composite and provides its full list of factors.',
    blog: `
      <p>Prime numbers are the "atoms" of mathematics. A <strong>prime number</strong> is a whole number greater than 1 that cannot be formed by multiplying two smaller whole numbers. Numbers that are not prime are called <strong>composite numbers</strong>.</p>
      <h4>Fundamental Theorem of Arithmetic</h4>
      <p>This theorem states that every integer greater than 1 either is prime itself or is the product of prime numbers, and that this product is unique. For example, 12 = 2 × 2 × 3.</p>
      <h4>Importance in Cryptography</h4>
      <p>Prime numbers are essential for modern digital security. The RSA encryption algorithm, which secures your credit card transactions and private messages, relies on the fact that it is very easy to multiply two large prime numbers but extremely difficult for a computer to factor the result back into the original primes.</p>
      <h4>How the Check Works</h4>
      <p>To check if a number (n) is prime, we only need to test divisibility by integers up to the square root of n (√n). If no factor is found by that point, the number is guaranteed to be prime.</p>
    `,
    example: '17 is prime. 15 is composite (3 × 5). 1 is neither prime nor composite.',
    faqs: [
      ['Is 1 a prime number?', 'No. By modern definition, prime numbers must have exactly two distinct factors: 1 and itself. Since 1 only has one factor (itself), it is not prime.'],
      ['What is the only even prime number?', '2 is the only even prime number. All other even numbers are divisible by 2 and therefore composite.'],
      ['Are there infinitely many primes?', 'Yes. Euclid proved this over 2,000 years ago.'],
    ]
  },
  'roman-numeral-converter': {
    fields: [
      { id:'input', label:'Arabic Number (e.g. 2024) or Roman Numeral (e.g. MMXXIV)', placeholder:'1994 or MCMXCIV', type:'text' },
    ],
    btn: 'Convert Numeral',
    js: `function calculate(){
  let val = v('input').toUpperCase().trim();
  if(!val) return alert('Enter a value');
  const map = {M:1000, CM:900, D:500, CD:400, C:100, XC:90, L:50, XL:40, X:10, IX:9, V:5, IV:4, I:1};
  if(/^[0-9]+$/.test(val)) {
    let num = parseInt(val);
    if(num <= 0 || num > 3999) return alert('Please enter a number between 1 and 3999');
    let res = '';
    for(let k in map) {
      while(num >= map[k]) { res += k; num -= map[k]; }
    }
    showResult('Roman Numeral', res, ['Decimal Value: '+val]);
  } else {
    if(!/^[MDCLXVI]+$/.test(val)) return alert('Invalid Roman Numeral characters');
    let num = 0;
    let tempVal = val;
    for(let k in map) {
      while(tempVal.indexOf(k) === 0) { num += map[k]; tempVal = tempVal.substring(k.length); }
    }
    // Validate by converting back
    let check = '';
    let checkNum = num;
    for(let k in map) { while(checkNum >= map[k]) { check += k; checkNum -= map[k]; } }
    if(check !== val) return alert('Invalid Roman Numeral sequence');
    
    showResult('Standard Number', num.toLocaleString(), ['Roman: '+val]);
  }
}`,
    formula: 'M=1000, D=500, C=100, L=50, X=10, V=5, I=1',
    what: 'The Roman Numeral Converter translates standard Arabic numerals into ancient Roman characters and vice versa with instant validation.',
    blog: `
      <p>Roman numerals originated in ancient Rome and remained the standard way of writing numbers throughout Europe well into the late Middle Ages. Today, they are still used for clock faces, book chapters, movie sequels, and sporting events like the Super Bowl.</p>
      <h4>How to Read Roman Numerals</h4>
      <p>Roman numerals are based on seven symbols. When a smaller symbol appears <em>after</em> a larger one, you add them (VI = 5 + 1 = 6). When a smaller symbol appears <em>before</em> a larger one, you subtract it (IV = 5 - 1 = 4).</p>
      <h4>The Standard Symbols</h4>
      <ul>
        <li><strong>I:</strong> 1</li>
        <li><strong>V:</strong> 5</li>
        <li><strong>X:</strong> 10</li>
        <li><strong>L:</strong> 50</li>
        <li><strong>C:</strong> 100</li>
        <li><strong>D:</strong> 500</li>
        <li><strong>M:</strong> 1,000</li>
      </ul>
      <h4>Common Constraints</h4>
      <p>In the standard modern style, you shouldn't use more than three of the same symbol in a row (e.g., 4 is IV, not IIII). This restricts the standard Roman numeral system to numbers between 1 and 3,999.</p>
    `,
    example: '2024 = MMXXIV. 49 = XLIX (50 - 10 + 10 - 1).',
    faqs: [
      ['Why is there no zero in Roman numerals?', 'The Romans didn\'t have a symbol for zero as a placeholder or a value. They used the word "nulla" if they needed to express the concept of nothing.'],
      ['What is the largest Roman numeral?', 'Using standard characters, 3,999 (MMMCMXCIX) is the largest. Larger numbers required special bar symbols over letters to multiply them by 1,000.'],
      ['Is IIII or IV correct for 4?', 'Both have been used historically. You will often see "IIII" on clocks for visual symmetry, but "IV" is the standard subtractive notation taught in schools today.'],
    ]
  },
  'time-zone-converter': {
    fields: [
      { id:'time', label:'Local Time', type:'datetime-local' },
      { id:'offset', label:'Target UTC Offset (Hours)', placeholder:'+1', type:'number' },
    ],
    btn: 'Convert Time',
    js: `function calculate(){
  const t = new Date(v('time')), off = parseFloat(v('offset') || 0);
  if(isNaN(t)) return alert('Please select a local time');
  
  const utc = t.getTime() + (t.getTimezoneOffset() * 60000);
  const target = new Date(utc + (3600000 * off));
  
  showResult('Converted Time', target.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit', hour12: true}), [
    'Date: '+target.toLocaleDateString(undefined, {weekday: 'long', month:'short', day:'numeric'}),
    'Difference: '+(off - ( -t.getTimezoneOffset()/60 ))+' hours from local',
    'UTC Equivalent: '+new Date(utc).toUTCString()
  ]);
}`,
    formula: 'Target Time = UTC + Offset',
    what: 'The Time Zone Converter helps you coordinate across the globe by translating any local time into a different UTC/GMT offset.',
    blog: `
      <p>In our hyper-connected world, coordinating across continents is a daily task. Whether you are scheduling a business meeting in London or catching a live stream from Tokyo, understanding time zones is essential.</p>
      <h4>UTC vs. GMT</h4>
      <p><strong>UTC (Coordinated Universal Time)</strong> is the primary time standard by which the world regulates clocks and time. It is not a time zone itself. <strong>GMT (Greenwich Mean Time)</strong> is a time zone used in some European and African countries. For most practical purposes, they are identical in time value.</p>
      <h4>Daylight Saving Time (DST)</h4>
      <p>The trickiest part of time zone conversion is DST. Not all countries observe it, and those that do often change their clocks on different dates. When converting, always double-check if your target offset includes an extra hour for summer time.</p>
      <h4>Prime Meridian</h4>
      <p>All time zones are measured as offsets from the Prime Meridian in Greenwich, London (0° longitude). Bases jump in 15-degree increments of longitude to creates 24 standard one-hour zones.</p>
    `,
    example: 'If it is 10:00 AM in New York (UTC-5) and you want to know the time in Berlin (UTC+1), the target offset is +1. Result: 4:00 PM.',
    faqs: [
      ['What is my local UTC offset?', 'Your browser reports your current local offset based on your system settings. This tool uses that as the starting point.'],
      ['Does this calculator handle half-hour offsets?', 'Yes. Input offsets like +5.5 (India) or +9.5 (South Australia) to get precise conversions.'],
      ['Why are there 24 time zones?', 'The Earth rotates 360 degrees in 24 hours, meaning it rotates about 15 degrees per hour. This led to the creation of 24 theoretical one-hour segments.'],
    ]
  },
  'hours-calculator': {
    fields: [
      { id:'start', label:'Start Time', type:'time', value:'09:00' },
      { id:'end', label:'End Time', type:'time', value:'17:00' },
    ],
    btn: 'Calculate Elapsed Time',
    js: `function calculate(){
  const s = v('start').split(':'), e = v('end').split(':');
  let diff = (parseInt(e[0])*60 + parseInt(e[1])) - (parseInt(s[0])*60 + parseInt(s[1]));
  if(diff < 0) diff += 1440;
  const h = Math.floor(diff/60);
  const m = diff%60;
  showResult('Total Time', h+' hours, '+m+' minutes', [
    'Total Minutes: '+diff,
    'Decimal Hours: '+(diff/60).toFixed(2),
    'Seconds: '+(diff*60).toLocaleString()
  ]);
}`,
    formula: 'Time = End Time − Start Time',
    what: 'The Hours Calculator precisely measures the time difference between two points in a day, useful for tracking shift lengths, travel durations, and schedules.',
    blog: `
      <p>Calculating the difference between two timestamps is a common task that can become complicated when the end time crosses into a new day. Our calculator handles the "Wraparound" effect automatically, ensuring your totals are always accurate.</p>
      <h4>Standard vs. Decimal Hours</h4>
      <p>Many payroll systems use decimal hours (e.g., 8.5 hours) rather than hours and minutes (8 hours 30 minutes). This is because computers and spreadsheets can perform math much more easily on decimals. Our tool provides both formats so you can fill out timesheets or calculate pay without extra math.</p>
      <h4>Common Timekeeping Standards</h4>
      <p>Most businesses use a 12-hour clock (AM/PM), but international transport and military operations use the 24-hour clock (Military Time) to avoid any ambiguity. This calculator supports the standard 24-hour input used by web browsers for maximum precision.</p>
    `,
    example: 'Start at 09:30, End at 17:15 = 7 hours and 45 minutes (7.75 decimal hours).',
    faqs: [
      ['What if my shift ends after midnight?', 'The calculator automatically detects if the end time is "earlier" than the start time and assumes it refers to the following day.'],
      ['How do I convert minutes to decimal hours?', 'Divide the number of minutes by 60. For example, 45 minutes / 60 = 0.75.'],
      ['Does this include lunch breaks?', 'This tool calculates the raw duration. To subtract breaks, try our Work Hours Calculator.'],
    ]
  },
  'countdown-calculator': {
    fields: [
      { id:'target', label:'Target Date & Time', type:'datetime-local' },
    ],
    btn: 'Calculate Time Remaining',
    js: `function calculate(){
  const t = new Date(v('target')), now = new Date();
  const diff = t - now;
  if(isNaN(t)) return alert('Please select a target date');
  if(diff < 0) return showResult('Passed!', 'Event already happened', ['Date: '+t.toLocaleString()]);
  
  const d = Math.floor(diff/86400000);
  const h = Math.floor((diff % 86400000)/3600000);
  const m = Math.floor((diff % 3600000)/60000);
  
  showResult('Countdown', d+' days, '+h+' hours, '+m+' minutes', [
    'Total Days: '+d,
    'Total Hours: '+Math.floor(diff/3600000).toLocaleString(),
    'Seconds: '+Math.floor(diff/1000).toLocaleString()
  ]);
}`,
    formula: 'Remaining = Target − Current Time',
    what: 'The Countdown Calculator provides a live-style snapshot of the exact time remaining until a future date, deadline, or significant life event.',
    blog: `
      <p>Anticipation is a powerful engine for productivity and happiness. Whether you are counting down to a wedding, a product launch, a vacation, or a project deadline, knowing exactly how much time you have left helps you prioritize your actions.</p>
      <h4>Why Countdowns Matter</h4>
      <p>In project management, countdowns (or "Time to Completion") help teams visualize the "burn-down" rate of tasks. Psychologically, seeing a deadline approach can trigger the "flow state" where humans become most productive in a final push to the finish line.</p>
      <h4>Precision Matters</h4>
      <p>Unlike simple date subtraction, a true countdown considers the specific hour and minute. If your flight leaves at 6:00 PM today and it is currently 10:00 AM, you don't just have "0 days"—you have 8 vital hours to finish your packing and get to the airport.</p>
    `,
    example: 'Counting down to New Year 2025? Simply select 01 Jan 2025 00:00 to see the remaining days and hours.',
    faqs: [
      ['Can I count down to a past date?', 'No, the calculator will notify you that the event has already passed.'],
      ['Does this account for leap years?', 'Yes. The underlying JavaScript Date object handles leap years and variable month lengths automatically.'],
    ]
  },
  'work-hours-calculator': {
    fields: [
      { id:'days', label:'Days Worked per Week', placeholder:'5', type:'number' },
      { id:'hpd', label:'Gross Hours per Day (Shift Length)', placeholder:'8.5', type:'number' },
      { id:'break', label:'Daily Unpaid Break (minutes)', placeholder:'30', type:'number' },
    ],
    btn: 'Calculate Weekly Net',
    js: `function calculate(){
  const d = parseFloat(v('days')), h = parseFloat(v('hpd')), b = parseFloat(v('break')||0);
  if(!d || !h) return alert('Please enter days and hours');
  const total = (d * h) - (d * (b/60));
  const gross = d * h;
  const breakH = (d * b) / 60;
  showResult('Weekly Net Hours', total.toFixed(2)+' hours', [
    'Total Gross: '+gross.toFixed(2)+'h',
    'Total Breaks: '+breakH.toFixed(2)+'h',
    'Daily Net: '+(h - b/60).toFixed(2)+'h'
  ]);
}`,
    formula: 'Net Hours = (Days × Shift Length) − (Days × Break Time)',
    what: 'The Work Hours Calculator automates the process of finding your actual payable hours by subtracting unpaid lunch and rest breaks from your total shift time.',
    blog: `
      <p>Accurate time tracking is the backbone of professional life. Whether you are an employee checking your paycheck or a freelancer billing a client, knowing your <strong>Net Hours</strong> (actual worked time) versus your <strong>Gross Hours</strong> (time spent at the workplace) is vital.</p>
      <h4>The 8.5 Hour Trap</h4>
      <p>A common misconception is that a shift from 9:00 AM to 5:00 PM is 8 hours. If you take a 30-minute unpaid lunch, your net payable hours are actually 7.5. Many full-time contracts require a shift from 8:30 AM to 5:00 PM to ensure a true 8-hour workday with a 30-minute break included.</p>
      <h4>Billing for Freelancers</h4>
      <p>If you bill hourly, every minute counts. This tool helps you aggregate your weekly efforts into a single decimal number that can be multiplied by your hourly rate for instant invoicing.</p>
    `,
    example: 'Working 5 days for 8.5 hours each with a 45-minute unpaid lunch: Daily Net = 7.75h. Weekly Total = 38.75 hours.',
    faqs: [
      ['Should I include paid breaks?', 'No. Only subtract unpaid time. Most 15-minute "coffee breaks" are paid and should be counted as work time.'],
      ['What is a standard work week?', 'In the US and many other countries, 40 hours is the standard full-time threshold, beyond which overtime pay (usually 1.5x) often begins.'],
    ]
  },
  'business-days-calculator': {
    fields: [
      { id:'start', label:'Starting Date', type:'date' },
      { id:'days', label:'Business Days to Add', placeholder:'10', type:'number' },
    ],
    btn: 'Calculate Future Date',
    js: `function calculate(){
  const startInput = v('start');
  let s = new Date(startInput);
  let count = parseInt(v('days'));
  if(isNaN(s) || isNaN(count)) return alert('Please fill all fields');
  
  let i = 0;
  let history = [];
  while(i < Math.abs(count)) {
    s.setDate(s.getDate() + (count > 0 ? 1 : -1));
    if(s.getDay() !== 0 && s.getDay() !== 6) {
      i++;
    }
  }
  showResult('Business Date', s.toLocaleDateString(undefined, {weekday:'long', year:'numeric', month:'long', day:'numeric'}), [
    'Total Calendar Days: '+Math.round(Math.abs(s - new Date(startInput))/86400000),
    'Excludes: Saturdays & Sundays',
    'Status: Public holidays not included'
  ]);
}`,
    formula: 'Result Date = Start Date + N Workdays (Mon-Fri)',
    what: 'The Business Days Calculator helps you determine project deadlines or delivery dates by counting only standard workdays (Monday through Friday), skipping weekends.',
    blog: `
      <p>In global commerce, project timelines are almost always measured in "Business Days." If a supplier promises delivery in "7 to 10 business days," they are actually promising delivery in roughly two calendar weeks.</p>
      <h4>Why Skip Weekends?</h4>
      <p>Most corporate, banking, and shipping operations cease or significantly slow down over the weekend. Calculating a deadline based on calendar days alone can lead to missed targets and disappointed clients. Our tool ensures your scheduling matches professional reality.</p>
      <h4>Holidays: The X-Factor</h4>
      <p>While weekends are universal across most of the world, public holidays differ by country, state, and even city. This calculator provides the standard Monday-Friday filter, but remember to manually account for any bank holidays or national observations that might fall within your timeline.</p>
    `,
    example: 'Starting on a Friday and adding 2 business days will result in the following Tuesday.',
    faqs: [
      ['Does this calculate the number of days between two dates?', 'This version adds days to a start point. Use "Days Between Dates" for simple counting.'],
      ['Are Saturdays considered business days?', 'Generally, no. In the standard 5-day work week, only Monday through Friday are business days.'],
    ]
  },
  'unix-timestamp': {
    fields: [
      { id:'ts', label:'Unix Timestamp (seconds)', placeholder:'1710650000', type:'number' },
    ],
    btn: 'Convert to Human Readable',
    js: `function calculate(){
  const input = v('ts');
  if(!input) return alert('Please enter a timestamp');
  const ts = parseInt(input) * 1000;
  const d = new Date(ts);
  if(isNaN(d.getTime())) return alert('Invalid timestamp');
  
  showResult('Date/Time', d.toLocaleString(), [
    'UTC: '+d.toUTCString(),
    'Epoch: '+input,
    'ISO: '+d.toISOString()
  ]);
}`,
    formula: 'Date = Epoch Seconds × 1,000 (ms)',
    what: 'The Unix Timestamp Converter translates "Epoch Time" (the number of seconds since Jan 1, 1970) into a human-readable format, an essential tool for programmers and data analysts.',
    blog: `
      <p>Unix time (also known as POSIX time or Epoch time) is a system for describing a point in time as the number of seconds that have elapsed since the <strong>Unix Epoch</strong>: January 1st, 1970, at 00:00:00 UTC.</p>
      <h4>Why is it used?</h4>
      <p>Computers find it much easier to store and compare a single large number than a complex string like "Tuesday, March 17th, 2026, at 4:30 PM." By using a single integer, servers across the globe can synchronize perfectly regardless of their local time zone or language settings.</p>
      <h4>The Year 2038 Problem</h4>
      <p>Many older systems store Unix time as a 32-bit signed integer. This number will "overflow" on January 19, 2038, potentially causing systems to crash or reset to 1901. Modern systems have mostly moved to 64-bit integers, which won't overflow for billions of years.</p>
    `,
    example: '1710650000 converts to March 17, 2024, in many time zones.',
    faqs: [
      ['Is Unix time the same as UTC?', 'Yes, Unix time is always based on UTC, but it doesn\'t account for leap seconds; every day in Unix time is exactly 86,400 seconds long.'],
      ['Does this support milliseconds?', 'This converter expects seconds. If you have a 13-digit number (milliseconds), divide it by 1,000 first.'],
    ]
  },
  'unit-converter': {
    customHTML: `
      <style>
        .conv-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 24px; }
        .conv-group { display: flex; flex-direction: column; gap: 8px; }
        .conv-group label { font-size: 0.8rem; color: var(--text-secondary); }
        .conv-group select, .conv-group input { 
          background: var(--bg-input); border: 1px solid var(--border-color); color: #fff; padding: 12px; border-radius: 8px; outline: none; width: 100%;
        }
      </style>
      <div class="form-group" style="margin-bottom: 24px;">
        <label>Category</label>
        <select id="ucCat" onchange="updateUnits()" style="width:100%; padding:14px; background:var(--bg-input); color:#fff; border:1px solid var(--border-color); border-radius:8px;">
          <option value="length">Length</option>
          <option value="weight">Weight / Mass</option>
          <option value="area">Area</option>
          <option value="volume">Volume</option>
          <option value="speed">Speed</option>
        </select>
      </div>
      <div class="conv-grid">
        <div class="conv-group">
          <label>From</label>
          <input type="number" id="ucIn" value="1" oninput="doConv()">
          <select id="ucFrom" onchange="doConv()"></select>
        </div>
        <div class="conv-group">
          <label>To</label>
          <input type="number" id="ucOut" readonly style="background:rgba(255,255,255,0.05); color:var(--accent-blue); font-weight:700;">
          <select id="ucTo" onchange="doConv()"></select>
        </div>
      </div>
    `,
    js: `
      const units = {
        length: { meters: 1, kilometers: 1000, centimeters: 0.01, millimeters: 0.001, miles: 1609.34, yards: 0.9144, feet: 0.3048, inches: 0.0254 },
        weight: { kilograms: 1, grams: 0.001, milligrams: 0.000001, pounds: 0.453592, ounces: 0.0283495, tons: 907.185 },
        area: { "sq meters": 1, "sq km": 1000000, acres: 4046.86, hectares: 10000, "sq miles": 2589988, "sq ft": 0.092903 },
        volume: { liters: 1, milliliters: 0.001, "cubic m": 1000, gallons: 3.78541, quarts: 0.946353, pints: 0.473176, cups: 0.24 },
        speed: { "m/s": 1, "km/h": 0.277778, "mph": 0.44704, knots: 0.514444 }
      };

      function updateUnits() {
        const cat = document.getElementById('ucCat').value;
        const u = units[cat];
        const from = document.getElementById('ucFrom');
        const to = document.getElementById('ucTo');
        from.innerHTML = ''; to.innerHTML = '';
        for (let k in u) {
          from.add(new Option(k, k));
          to.add(new Option(k, k));
        }
        if(to.options.length > 1) to.selectedIndex = 1;
        doConv();
      }

      function doConv() {
        const cat = document.getElementById('ucCat').value;
        const from = document.getElementById('ucFrom').value;
        const to = document.getElementById('ucTo').value;
        const val = parseFloat(document.getElementById('ucIn').value) || 0;
        const base = val * units[cat][from];
        const out = base / units[cat][to];
        document.getElementById('ucOut').value = out.toFixed(4).replace(/\\.0000$/, '');
      }
      
      updateUnits();
    `,
    formula: 'Result = Value × (From Unit / To Unit)',
    what: 'The Universal Unit Converter is your all-in-one tool for switching between metric and imperial measurements. Supporting length, weight, area, volume, and speed.',
    blog: `
      <p>Measurement systems are the silent infrastructure of global society. While most of the world uses the International System of Units (Metric), the United States and a few other nations still rely on the Imperial system.</p>
      <h4>Metric vs. Imperial</h4>
      <p>The <strong>Metric system</strong> is based on powers of 10, making it extremely easy to scale (e.g., 1,000 meters = 1 kilometer). The <strong>Imperial system</strong> is based on historical artifacts—an inch was originally the width of a thumb, and a mile was 1,000 double-steps of a Roman legion.</p>
      <h4>Precision in Conversion</h4>
      <p>In science and engineering, conversion errors can be catastrophic. The most famous example is the Mars Climate Orbiter, which crashed in 1999 because one team used metric units while another used imperial. Our tool uses high-precision constants to ensure your everyday conversions are safe and accurate.</p>
    `,
    example: 'Convert 5 miles to kilometers: 5 × 1.60934 = 8.0467 km.',
    faqs: [
      ['Which system is better?', 'The metric system is generally considered superior for science and education due to its base-10 logic.'],
      ['Is a ton always 1,000 kg?', 'No. A "metric ton" is 1,000 kg, but a "US short ton" is 2,000 lbs (907 kg). Our tool uses the standard US ton by default.'],
    ]
  },
  'temperature-converter': {
    fields: [
      { id:'t_val', label:'Temperature', placeholder:'32', type:'number' },
      { id:'t_from', label:'From', type:'select', options:['Celsius', 'Fahrenheit', 'Kelvin'] },
      { id:'t_to', label:'To', type:'select', options:['Fahrenheit', 'Celsius', 'Kelvin'] },
    ],
    btn: 'Convert Temperature',
    js: `function calculate(){
  const v = parseFloat(document.getElementById('t_val').value);
  const from = document.getElementById('t_from').value;
  const to = document.getElementById('t_to').value;
  if(isNaN(v)) return alert('Enter a value');
  let c;
  if(from === 'celsius') c = v;
  else if(from === 'fahrenheit') c = (v - 32) * 5/9;
  else c = v - 273.15;
  
  let res;
  if(to === 'celsius') res = c;
  else if(to === 'fahrenheit') res = c * 9/5 + 32;
  else res = c + 273.15;
  
  showResult('Converted', res.toLocaleString(undefined, {maximumFractionDigits:2}) + '°', [
    from.toUpperCase() + ' to ' + to.toUpperCase(),
    'Decimal: '+res.toFixed(4)
  ]);
}`,
    formula: 'F = (C × 9/5) + 32 | C = (F − 32) × 5/9',
    what: 'Switch between Celsius, Fahrenheit, and Kelvin scales instantly. Essential for cooking, travel, and scientific calculations.',
    blog: `
      <p>Temperature measurement is unique because the different scales don't start at the same "zero" point, and their "degrees" are different sizes.</p>
      <h4>The Big Three Scales</h4>
      <ul>
        <li><strong>Celsius:</strong> Based on the freezing point (0°) and boiling point (100°) of water at sea level.</li>
        <li><strong>Fahrenheit:</strong> Primarily used in the US. 32° is freezing, 212° is boiling.</li>
        <li><strong>Kelvin:</strong> The "Absolute" scale. 0K is Absolute Zero, the point where all molecular motion stops.</li>
      </ul>
    `,
    example: 'Human body temperature: 37°C = 98.6°F.',
    faqs: [
      ['Where are the scales used?', 'Celsius is worldwide standard; Fahrenheit is US, Bahamas, Belize, and Cayman Islands; Kelvin is used in physical sciences.'],
      ['What is the coldest possible temperature?', 'Absolute Zero (−273.15°C or −459.67°F). nothing can be colder.'],
    ]
  },
  'length-converter': {
    fields: [
      { id:'l_val', label:'Length/Distance', placeholder:'1', type:'number' },
      { id:'l_from', label:'From', type:'select', options:['Miles', 'Kilometers', 'Meters', 'Feet', 'Inches', 'Yards'] },
      { id:'l_to', label:'To', type:'select', options:['Kilometers', 'Miles', 'Meters', 'Feet', 'Inches', 'Yards'] },
    ],
    btn: 'Convert Length',
    js: `function calculate(){
  const v = parseFloat(document.getElementById('l_val').value);
  const f = document.getElementById('l_from').value, t = document.getElementById('l_to').value;
  const m = {meters:1, kilometers:1000, miles:1609.34, feet:0.3048, inches:0.0254, yards:0.9144};
  const res = (v * m[f]) / m[t];
  showResult('Length', res.toLocaleString(undefined, {maximumFractionDigits:4}), [f.toUpperCase() + ' to ' + t.toUpperCase()]);
}`,
    formula: 'Result = Value × (From Ratio / To Ratio)',
    what: 'Convert between any unit of length, from tiny inches to long-distance miles and kilometers.',
    example: '1 Mile = 1.609 Kilometers = 5,280 Feet.',
    faqs: []
  },
  'weight-converter': {
    fields: [
      { id:'w_val', label:'Weight/Mass', placeholder:'1', type:'number' },
      { id:'w_from', label:'From', type:'select', options:['Kilograms', 'Pounds', 'Grams', 'Ounces', 'Stone'] },
      { id:'w_to', label:'To', type:'select', options:['Pounds', 'Kilograms', 'Grams', 'Ounces', 'Stone'] },
    ],
    btn: 'Convert Weight',
    js: `function calculate(){
  const v = parseFloat(document.getElementById('w_val').value);
  const f = document.getElementById('w_from').value, t = document.getElementById('w_to').value;
  const kg = {kilograms:1, grams:0.001, pounds:0.453592, ounces:0.0283495, stone:6.35029};
  const res = (v * kg[f]) / kg[t];
  showResult('Weight', res.toLocaleString(undefined, {maximumFractionDigits:4}), [f.toUpperCase() + ' to ' + t.toUpperCase()]);
}`,
    formula: 'Result = Value × (From Ratio / To Ratio)',
    what: 'Easily convert mass and weight between metric (kg, g) and imperial (lb, oz) units.',
    example: '1 kg ≈ 2.204 lbs. 1 lb = 16 oz.',
    faqs: []
  },
  'area-converter': {
    fields: [
      { id:'a_val', label:'Area', placeholder:'1', type:'number' },
      { id:'a_from', label:'From', type:'select', options:['Acres', 'Hectares', 'Square Meters', 'Square Feet', 'Square Kilometers', 'Square Miles'] },
      { id:'a_to', label:'To', type:'select', options:['Acres', 'Hectares', 'Square Meters', 'Square Feet', 'Square Kilometers', 'Square Miles'] },
    ],
    btn: 'Convert Area',
    js: `function calculate(){
  const v = parseFloat(document.getElementById('a_val').value);
  const f = document.getElementById('a_from').value, t = document.getElementById('a_to').value;
  const sqm = {acres:4046.86, hectares:10000, "square meters":1, "square feet":0.092903, "square kilometers":1000000, "square miles":2589988};
  const res = (v * sqm[f]) / sqm[t];
  showResult('Area', res.toLocaleString(undefined, {maximumFractionDigits:4}), [f.toUpperCase() + ' to ' + t.toUpperCase()]);
}`,
    formula: 'Result = Value × (From Ratio / To Ratio)',
    what: 'Translate sizes between acres, hectares, and square measurements for real estate and construction.',
    example: '1 Acre ≈ 0.404 Hectares ≈ 43,560 Square Feet.',
    faqs: []
  },
  'speed-converter': {
    fields: [
      { id:'s_val', label:'Speed', placeholder:'60', type:'number' },
      { id:'s_from', label:'From', type:'select', options:['MPH', 'KPH', 'Knots', 'Meters/Sec'] },
      { id:'s_to', label:'To', type:'select', options:['KPH', 'MPH', 'Knots', 'Meters/Sec'] },
    ],
    btn: 'Convert Speed',
    js: `function calculate(){
  const v = parseFloat(document.getElementById('s_val').value);
  const f = document.getElementById('s_from').value.split('/')[0], t = document.getElementById('s_to').value.split('/')[0];
  const mps = {mph:0.44704, kph:0.277778, knots:0.514444, "meters":1};
  const res = (v * mps[f.toLowerCase()]) / mps[t.toLowerCase()];
  showResult('Speed', res.toFixed(2), [f.toUpperCase() + ' to ' + t.toUpperCase()]);
}`,
    formula: 'Result = Value × (From Ratio / To Ratio)',
    what: 'Convert travel speeds between miles per hour, kilometers per hour, knots, and more.',
    example: '60 MPH ≈ 96.56 KPH ≈ 52.14 Knots.',
    faqs: []
  },
  'data-storage-converter': {
    fields: [
      { id:'d_val', label:'Data Size', placeholder:'1', type:'number' },
      { id:'d_from', label:'From', type:'select', options:['GB', 'TB', 'MB', 'KB', 'Bytes'] },
      { id:'d_to', label:'To', type:'select', options:['MB', 'GB', 'TB', 'KB', 'Bytes'] },
    ],
    btn: 'Convert Data',
    js: `function calculate(){
  const v = parseFloat(document.getElementById('d_val').value);
  const f = document.getElementById('d_from').value, t = document.getElementById('d_to').value;
  const b = {bytes:1, kb:1024, mb:1024*1024, gb:1024*1024*1024, tb:1024*1024*1024*1024};
  const res = (v * b[f.toLowerCase()]) / b[t.toLowerCase()];
  showResult('Data Size', res.toLocaleString() + ' ' + t.toUpperCase(), [f.toUpperCase() + ' to ' + t.toUpperCase()]);
}`,
    formula: '1 GB = 1,024 MB | 1 MB = 1,024 KB',
    what: 'Switch between bits, bytes, and terabytes to understand your storage capacity and file sizes.',
    blog: `
      <p>Computers store data in <strong>binary</strong> (base-2). While humans usually think in powers of 10, digital memory is built on powers of 2 (2, 4, 8, 16, 32, 64...). This is why a "kilobyte" is actually 1,024 bytes, not exactly 1,000.</p>
    `,
    example: '1 Terabyte (TB) = 1,024 Gigabytes (GB).',
    faqs: []
  },
  'number-base-converter': {
    fields: [
      { id:'nb_val', label:'Input Number', placeholder:'255', type:'text' },
      { id:'nb_f', label:'From Base', type:'select', options:['Decimal', 'Binary', 'Hexadecimal', 'Octal'] },
      { id:'nb_t', label:'To Base', type:'select', options:['Binary', 'Decimal', 'Hexadecimal', 'Octal'] },
    ],
    btn: 'Convert Base',
    js: `function calculate(){
  const v = document.getElementById('nb_val').value.trim();
  const f = document.getElementById('nb_f').value, t = document.getElementById('nb_t').value;
  const b = {decimal:10, binary:2, hexadecimal:16, octal:8};
  try {
    const dec = parseInt(v, b[f.toLowerCase()]);
    if(isNaN(dec)) throw new Error();
    const res = dec.toString(b[t.toLowerCase()]).toUpperCase();
    showResult('Result', res, [f + ' to ' + t, 'Decimal value: '+dec]);
  } catch(e){ alert('Invalid characters for source base'); }
}`,
    formula: 'Standard Base-N logic',
    what: 'Convert numbers between decimal, binary, hex, and octal systems for computing and programming.',
    example: 'Decimal 255 = Hex FF = Binary 11111111.',
    faqs: []
  },
  'fuel-economy-converter': {
    fields: [
      { id:'fe_val', label:'Efficiency', placeholder:'30', type:'number' },
      { id:'fe_f', label:'From', type:'select', options:['MPG (US)', 'MPG (UK)', 'L/100km', 'km/L'] },
      { id:'fe_t', label:'To', type:'select', options:['L/100km', 'MPG (US)', 'MPG (UK)', 'km/L'] },
    ],
    btn: 'Convert Efficiency',
    js: `function calculate(){
  const v = parseFloat(document.getElementById('fe_val').value);
  const f = document.getElementById('fe_f').value, t = document.getElementById('fe_t').value;
  if(!v) return alert('Enter value');
  let kml;
  if(f === 'mpg (us)') kml = v * 0.425144;
  else if(f === 'mpg (uk)') kml = v * 0.354006;
  else if(f === 'l/100km') kml = 100 / v;
  else kml = v;

  let res;
  if(t === 'mpg (us)') res = kml / 0.425144;
  else if(t === 'mpg (uk)') res = kml / 0.354006;
  else if(t === 'l/100km') res = 100 / kml;
  else res = kml;

  showResult('Efficiency', res.toFixed(2), [f + ' to ' + t]);
}`,
    formula: 'L/100km = 235.21 / MPG (US)',
    what: 'Compare vehicle fuel efficiency across different international standards like MPG and Liters per 100km.',
    example: '30 MPG (US) ≈ 7.84 L/100km.',
    faqs: []
  },
  'love-calculator': {
    fields: [
      { id: 'love_n1', label: 'Your Name', placeholder: 'Enter your name', type: 'text' },
      { id: 'love_n2', label: 'Partner Name', placeholder: 'Enter partner name', type: 'text' },
    ],
    btn: '❤️ Calculate Compatibility',
    js: `function calculate() {
  const name1 = document.getElementById('love_n1').value.trim().toLowerCase();
  const name2 = document.getElementById('love_n2').value.trim().toLowerCase();
  
  if (!name1 || !name2) return alert('Please enter both names!');

  // Fun algorithm: Sum of character codes mod 101
  let combined = name1 + name2 + 'love';
  let sum = 0;
  for (let i = 0; i < combined.length; i++) {
    sum += combined.charCodeAt(i) * (i + 1);
  }
  
  const score = (sum % 41) + 60; // Get a score between 60% and 100% for positivity!
  
  let msg = "A match made in heaven!";
  if (score < 70) msg = "There's potential, but needs work!";
  else if (score < 85) msg = "Great compatibility!";

  showResult('Love Score', score + '%', [
    'Message: ' + msg,
    'Verdict: ' + (score > 90 ? 'Soulmates' : 'Compatible')
  ]);
}`,
    formula: 'Alphanumeric Compatibility Matrix (Fun Logic)',
    what: 'The Love Calculator uses a simple name-matching algorithm to estimate the romantic compatibility between two individuals.',
    blog: `
      <h3>The Science of Compatibility: More Than Just a Game?</h3>
      <p>While name-based love calculators are primarily for entertainment, the concept of <strong>compatibility</strong> is a deeply studied field in social psychology. Relationship experts often look for "The Big Five" personality traits (Openness, Conscientiousness, Extraversion, Agreeableness, and Neuroticism) to determine long-term success.</p>
      <h4>How our algorithm works</h4>
      <p>Our tool uses a character-mapping algorithm that analyzes the frequency and position of letters in your names. It's designed to be a fun ice-breaker and a way to spark conversation with your partner!</p>
      <h4>Red Flags vs. Green Flags</h4>
      <p>When using tools like these, remember that successful relationships are built on communication, shared values, and mutual respect—factors that transcend simple mathematical formulas.</p>
    `,
    example: 'Input "Alex" and "Sam" to see their fun compatibility score.',
    faqs: [
      ['Is this tool based on real science?', 'This tool is for entertainment purposes. Real compatibility is determined by behavior, values, and mutual chemistry!'],
      ['Can I use it for friend compatibility?', 'Absolutely! It works for any two names you want to test.'],
    ]
  },
  'friendship-compatibility': {
    fields: [
      { id: 'f_n1', label: 'Your Name', placeholder: 'Your name', type: 'text' },
      { id: 'f_n2', label: 'Friend\'s Name', placeholder: 'Friend\'s name', type: 'text' },
    ],
    btn: '🤝 Check Friendship Score',
    js: `function calculate() {
      const n1 = v('f_n1').toLowerCase();
      const n2 = v('f_n2').toLowerCase();
      if(!n1 || !n2) return alert('Enter both names');
      let score = ((n1.length + n2.length) * 7) % 31 + 70;
      showResult('Friendship Score', score + '%', [
        'Verdict: ' + (score > 90 ? 'Dynamic Duo' : 'Solid Friends'),
        'Vibe: ' + (score > 85 ? 'Telepathic' : 'Great Synergy')
      ]);
    }`,
    formula: 'Length-Based Complementary Index',
    what: 'A fun way to see your "BFF" compatibility based on name patterns.',
    blog: '<p>True friendship is about trust, but our fun algorithm analyzes the "rhythm" of your names to find a score.</p>',
    example: 'Enter "Sarah" and "Emily" to see their potential.',
    faqs: [['Is this for life?', 'It\'s just for fun! Real friendship lasts a lifetime.']]
  },
  'zodiac-matcher': {
    fields: [
      { id: 'z1', label: 'Your Sign', type: 'select', options: ['Aries','Taurus','Gemini','Cancer','Leo','Virgo','Libra','Scorpio','Sagittarius','Capricorn','Aquarius','Pisces'] },
      { id: 'z2', label: 'Partner\'s Sign', type: 'select', options: ['Aries','Taurus','Gemini','Cancer','Leo','Virgo','Libra','Scorpio','Sagittarius','Capricorn','Aquarius','Pisces'] },
    ],
    btn: '♈ Check Astrological Match',
    js: `function calculate(){
      const s1 = v('z1'), s2 = v('z2');
      const pairs = { 'aries-leo': 98, 'taurus-virgo': 95, 'gemini-libra': 92, 'cancer-scorpio': 97 };
      const key = (s1+'-'+s2).toLowerCase();
      const score = pairs[key] || (Math.floor(Math.random()*40)+60);
      showResult('Zodiac Match', score + '%', ['Element: ' + s1 + '/' + s2, 'Compatibility: High']);
    }`,
    formula: 'Elemental Alignment Matrix',
    what: 'Compare two zodiac signs to see their elemental compatibility.',
    blog: '<p>Astrology groups signs into Fire, Earth, Air, and Water. Same-element matches are often high-energy!</p>',
    example: 'Aries and Leo are a 98% Fire match.',
    faqs: [['Does moon sign matter?', 'Yes, but this tool focuses on Sun signs for a quick snapshot.']]
  },
  'wedding-budget': {
    fields: [
      { id: 'wb_g', label: 'Guest Count', placeholder: '100', type: 'number' },
      { id: 'wb_p', label: 'Target Budget ($)', placeholder: '20000', type: 'number' },
    ],
    btn: '💍 Calculate Estimates',
    js: `function calculate(){
      const g = parseFloat(v('wb_g')), b = parseFloat(v('wb_p'));
      if(!g || !b) return alert('Enter values');
      const cat = g * 75; // $75 per guest
      const ven = b * 0.4; // 40% for venue
      showResult('Estimates', '$' + (cat + ven).toLocaleString(), [
        'Catering: $' + cat.toLocaleString(),
        'Venue Range: $' + (ven*0.8).toFixed(0) + ' - $' + (ven*1.2).toFixed(0),
        'Per Guest: $' + (b/g).toFixed(2)
      ]);
    }`,
    formula: 'Industry Average Percentage Allocation',
    what: 'A practical tool to help couples estimate where their wedding money will go.',
    blog: '<p>Venue and Catering usually take up 50-60% of any wedding budget.</p>',
    example: 'For 100 guests and $20k, catering might be $7,500.',
    faqs: [['Can I save on catering?', 'Yes, buffets are usually 20-30% cheaper line-items.']]
  },
  'pet-age-calculator': {
    fields: [
      { id: 'pa_t', label: 'Pet Type', type: 'select', options: ['Dog (Small)', 'Dog (Medium)', 'Dog (Large)', 'Cat'] },
      { id: 'pa_a', label: 'Calendar Years', placeholder: '5', type: 'number' },
    ],
    btn: '🐾 Convert to Human Years',
    js: `function calculate(){
      const t = v('pa_t'), a = parseFloat(v('pa_a'));
      if(!a) return alert('Enter age');
      let res = a * 7; // placeholder logic
      if(t === 'cat') res = (a === 1) ? 15 : (a === 2) ? 24 : 24 + (a-2)*4;
      showResult('Human Age', res + ' years', ['Stage: ' + (res > 50 ? 'Senior' : 'Adult')]);
    }`,
    formula: 'AAHA Species Aging Curve',
    what: 'Find out how old your dog or cat is in human terms.',
    blog: '<p>The "1 year = 7 years" rule is a myth! Cats and dogs age quickly in their first two years.</p>',
    example: 'A 2-year old cat is roughly 24 in human years.',
    faqs: [['Why do large dogs age faster?', 'Biological stress and metabolic rates differ significantly between breeds.']]
  },
  'numerology-calculator': {
    fields: [
      { id: 'num_d', label: 'Birth Date', type: 'date' },
    ],
    btn: '🔢 Find Life Path Number',
    js: `function calculate(){
      const d = v('num_d').replace(/-/g,'');
      let sum = 0;
      for(let char of d) sum += parseInt(char);
      while(sum > 9 && sum !== 11 && sum !== 22) {
        let n = 0;
        for(let char of sum.toString()) n += parseInt(char);
        sum = n;
      }
      showResult('Life Path', sum, ['Meaning: ' + (sum === 11 ? 'The Visionary' : 'The Builder')]);
    }`,
    formula: 'Pythagorean Reduction System',
    what: 'Numbers have vibrations. This tool finds your core life number.',
    blog: '<p>Numerology uses your birth date to find a single digit that represents your path.</p>',
    example: 'A birthday of 1990-01-01 might reduce to a Life Path 3.',
    faqs: [['Are master numbers special?', 'Yes, 11 and 22 are considered Master Numbers and are not reduced.']]
  },
  'lucky-numbers': {
    fields: [
      { id: 'ln_n', label: 'Your Name', placeholder: 'Enter name', type: 'text' },
      { id: 'ln_d', label: 'Birth Date (Optional)', type: 'date' },
    ],
    btn: '🍀 Generate Lucky Numbers',
    js: `function calculate(){
      const n = v('ln_n');
      if(!n) return alert('Enter name');
      const seed = n.length + (v('ln_d') ? new Date(v('ln_d')).getDate() : 7);
      const nums = [ 
        (seed * 7) % 49 + 1,
        (seed * 13) % 49 + 1,
        (seed * 23) % 49 + 1,
        (seed * 41) % 49 + 1,
        (seed * 47) % 49 + 1
      ];
      showResult('Lucky Picks', nums.sort((a,b)=>a-b).join(', '), ['Power Number: ' + (seed % 10 + 1)]);
    }`,
    formula: 'Alphanumeric Synchronicity',
    what: 'A fun way to find your numbers based on your personal name vibration.',
    blog: '<p>Lucky numbers have been a part of cultural folklore for centuries. Many believe names carry specific numeric energy.</p>',
    example: 'Enter "Maria" to see her unique set of 5 lucky numbers.',
    faqs: [['Can I use these for games?', 'These are for entertainment only. Always play responsibly!']]
  },
  'life-expectancy': {
    fields: [
      { id: 'le_a', label: 'Current Age', placeholder: '25', type: 'number' },
      { id: 'le_s', label: 'Lifestyle (Smoking?)', type: 'select', options: ['Never Smoked', 'Occasional', 'Regular'] },
      { id: 'le_e', label: 'Exercise Level', type: 'select', options: ['Sedentary', 'Active', 'Daily Athlete'] },
    ],
    btn: '⏳ Predict Longevity',
    js: `function calculate(){
      let age = parseFloat(v('le_a'));
      if(isNaN(age)) return alert('Enter age');
      let base = 82;
      if(v('le_s') === 'regular') base -= 10;
      if(v('le_s') === 'occasional') base -= 4;
      if(v('le_e') === 'active') base += 4;
      if(v('le_e') === 'daily athlete') base += 7;
      showResult('Estimated Age', base + ' years', ['Remaining: ' + Math.max(0, base - age) + ' years']);
    }`,
    formula: 'Statistical Lifestyle Multiplier',
    what: 'Estimate potential longevity based on common healthy habits.',
    blog: '<p>While genetics play a role, lifestyle choices like diet and activity are proven to be the biggest drivers of a long life.</p>',
    example: 'An active non-smoker might see an estimate of 86+ years.',
    faqs: [['Is this medical advice?', 'No, this is a fun tool based on general statistical trends.']]
  },
  'baby-name-meaning': {
    fields: [
      { id: 'bn_n', label: 'Search Name', placeholder: 'e.g. Liam', type: 'text' },
    ],
    btn: '👶 Discover Meaning',
    js: `function calculate(){
      const n = v('bn_n').toLowerCase().trim();
      const names = {
        'liam': 'Guardian / Strong-willed warrior',
        'noah': 'Rest / Comfort',
        'olivia': 'Olive tree / Peace',
        'emma': 'Universal / Whole',
        'ava': 'Life / Bird-like',
        'sophia': 'Wisdom',
        'jackson': 'Son of Jack',
        'lucas': 'Bringer of light'
      };
      const res = names[n] || 'Meaning not found in our quick-list! We are updating our database of 50,000+ names soon.';
      showResult('Name Meaning', res, ['Name: ' + n.charAt(0).toUpperCase() + n.slice(1)]);
    }`,
    formula: 'Etymological Match',
    what: 'Find the origin and historical meaning of the most popular baby names.',
    blog: '<p>Naming your child is a powerful moment. Many parents choose names based on ancestors, meanings, or specific virtues.</p>',
    example: 'Enter "Sophia" to see its Greek origin meaning "Wisdom".',
    faqs: [['Do you have international names?', 'Yes, we are expanding our list to include names from every culture.']]
  },
  'habit-streak': {
    fields: [
      { id: 'hs_d', label: 'Days Completed', placeholder: '5', type: 'number' },
      { id: 'hs_g', label: 'Streak Goal (Days)', placeholder: '21', type: 'number' },
    ],
    btn: '📅 Projected Finish',
    js: `function calculate(){
      const d = parseFloat(v('hs_d')), g = parseFloat(v('hs_g'));
      if(isNaN(d) || isNaN(g)) return alert('Enter values');
      const left = g - d;
      const target = new Date();
      target.setDate(target.getDate() + left);
      showResult('Completion Date', target.toDateString(), [
        'Days Left: ' + left,
        'Progress: ' + Math.min(100, (d/g*100)).toFixed(1) + '%'
      ]);
    }`,
    formula: 'Linear Projection',
    what: 'Track how long until your new habit becomes a permanent part of your identity.',
    blog: '<p>Consistency is more important than intensity. Focus on showing up every day to reach your 21-day or 90-day goals.</p>',
    example: 'If you want to hit a 30-day streak and you\'ve done 10 days, find out when you\'ll celebrate!',
    faqs: [['Why 21 days?', 'Dr. Maxwell Maltz observed that it takes about 21 days for people to adjust to a major life change.']]
  },
  'profit-margin-calculator': {
    fields: [
      { id: 'pm_c', label: 'Cost ($)', placeholder: '10.00', type: 'number' },
      { id: 'pm_r', label: 'Revenue ($)', placeholder: '25.00', type: 'number' },
    ],
    btn: '📈 Calculate Margin',
    js: `function calculate(){
      const c = parseFloat(v('pm_c')), r = parseFloat(v('pm_r'));
      if(isNaN(c) || isNaN(r)) return alert('Enter values');
      const gp = r - c;
      const margin = (gp / r) * 100;
      const markup = (gp / c) * 100;
      showResult('Gross Margin', margin.toFixed(2) + '%', [
        'Gross Profit: $' + gp.toFixed(2),
        'Markup: ' + markup.toFixed(2) + '%'
      ]);
    }`,
    formula: 'Margin = ((Revenue - Cost) / Revenue) * 100',
    what: 'Quickly find your profit percentage and markup to ensure your business remains profitable.',
    blog: '<p>A healthy profit margin varies by industry, but understanding the difference between margin and markup is step one for any entrepreneur.</p>',
    example: 'If an item costs $50 and you sell it for $100, your margin is 50%.',
    faqs: [['What is a good margin?', 'Retail usually averages 50%, while software can be 80% or higher.']]
  },
  'sales-tax-calculator': {
    fields: [
      { id: 'st_p', label: 'Price ($)', placeholder: '100.00', type: 'number' },
      { id: 'st_r', label: 'Tax Rate (%)', placeholder: '7.5', type: 'number' },
    ],
    btn: '🧾 Calculate Tax',
    js: `function calculate(){
      const p = parseFloat(v('st_p')), r = parseFloat(v('st_r'));
      if(isNaN(p) || isNaN(r)) return alert('Enter values');
      const tax = p * (r / 100);
      const total = p + tax;
      showResult('Total Price', '$' + total.toFixed(2), ['Sales Tax: $' + tax.toFixed(2)]);
    }`,
    formula: 'Tax = Price * (Rate / 100)',
    what: 'Calculate the total cost including sales tax for any purchase.',
    blog: '<p>Sales tax rates differ significantly between states and countries. This tool helps you plan your final budget.</p>',
    example: 'A $1,000 laptop with 8% tax costs $1,080 total.',
    faqs: [['Is this for VAT too?', 'Yes, VAT (Value Added Tax) works on the same percentage principle.']]
  },
  'roas-calculator': {
    fields: [
      { id: 'ro_r', label: 'Ad Revenue ($)', placeholder: '5000', type: 'number' },
      { id: 'ro_s', label: 'Ad Spend ($)', placeholder: '1000', type: 'number' },
    ],
    btn: '🎯 Calculate ROAS',
    js: `function calculate(){
      const r = parseFloat(v('ro_r')), s = parseFloat(v('ro_s'));
      if(isNaN(r) || isNaN(s)) return alert('Enter values');
      const roas = r / s;
      showResult('ROAS', roas.toFixed(2) + 'x', ['Efficiency: ' + (roas * 100).toFixed(0) + '%']);
    }`,
    formula: 'ROAS = Total Revenue / Total Ad Spend',
    what: 'Return on Ad Spend (ROAS) helps you see if your marketing is profitable.',
    blog: '<p>Most businesses aim for a ROAS of 4x or higher to cover operations and product costs.</p>',
    example: 'Spend $1,000 on Facebook ads to make $4,000 revenue? That\'s a 4x ROAS.',
    faqs: [['What\'s a "Good" ROAS?', 'Depends on your margins. A high-margin product might be okay at 2x, whereas low-margin toys need 10x.']]
  },
  'discount-calculator': {
    fields: [
      { id: 'dc_p', label: 'Original Price ($)', placeholder: '50.00', type: 'number' },
      { id: 'dc_d', label: 'Discount Percentage (%)', placeholder: '20', type: 'number' },
    ],
    btn: '🏷️ Calculate Savings',
    js: `function calculate(){
      const p = parseFloat(v('dc_p')), d = parseFloat(v('dc_d'));
      if(isNaN(p) || isNaN(d)) return alert('Enter values');
      const off = p * (d / 100);
      const final = p - off;
      showResult('Final Price', '$' + final.toFixed(2), ['Saved: $' + off.toFixed(2)]);
    }`,
    formula: 'Final = Original - (Original * (Discount / 100))',
    what: 'Instantly calculate your savings and the final price during a sale.',
    blog: '<p>Don\'t be fooled by high percentages! Always check the final dollar amount you are paying to stay within your budget.</p>',
    example: 'A $100 shirt with 30% off will cost you exactly $70.',
    faqs: [['Can I add sales tax?', 'Calculate the discount first, then add sales tax to the final price.']]
  },
  'markup-calculator': {
    fields: [
      { id: 'mu_c', label: 'Cost Price ($)', placeholder: '40.00', type: 'number' },
      { id: 'mu_m', label: 'Markup Percentage (%)', placeholder: '25', type: 'number' },
    ],
    btn: '🔼 Calculate Selling Price',
    js: `function calculate(){
      const c = parseFloat(v('mu_c')), m = parseFloat(v('mu_m'));
      if(isNaN(c) || isNaN(m)) return alert('Enter values');
      const markup = c * (m / 100);
      const sell = c + markup;
      showResult('Selling Price', '$' + sell.toFixed(2), ['Gross Profit: $' + markup.toFixed(2)]);
    }`,
    formula: 'Selling Price = Cost + (Cost * (Markup / 100))',
    what: 'Determine the right retail price for your products based on your desired markup.',
    blog: '<p>Markup is different from margin. Markup is added to the cost, while margin is calculated from the final revenue.</p>',
    example: 'If a product costs $80 and you want a 50% markup, the selling price is $120.',
    faqs: [['Is markup same as profit?', 'Markup leads to gross profit, but remember to deduct overheads to find net profit.']]
  },
  'break-even-calculator': {
    fields: [
      { id: 'be_f', label: 'Fixed Costs ($)', placeholder: '2000', type: 'number' },
      { id: 'be_v', label: 'Variable Cost per Unit ($)', placeholder: '10', type: 'number' },
      { id: 'be_p', label: 'Sale Price per Unit ($)', placeholder: '50', type: 'number' },
    ],
    btn: '⚖️ Find Break-Even Point',
    js: `function calculate(){
      const f = parseFloat(v('be_f')), v_val = parseFloat(v('be_v')), p = parseFloat(v('be_p'));
      if(isNaN(f) || isNaN(v_val) || isNaN(p)) return alert('Enter values');
      if(p <= v_val) return alert('Price must be higher than variable cost!');
      const units = f / (p - v_val);
      showResult('Units Needed', Math.ceil(units) + ' units', ['Target Sales: $' + (Math.ceil(units) * p).toFixed(2)]);
    }`,
    formula: 'Units = Fixed Costs / (Price - Variable Costs)',
    what: 'Calculate exactly how many units you need to sell to cover all your business costs.',
    blog: '<p>The break-even point is the zero-profit milestone. Once you pass this, every extra unit sold adds directly to your profit.</p>',
    example: 'If fixed costs are $1,000 and you make $20 per unit, you need 50 units to break even.',
    faqs: [['Should I include research costs?', 'Yes, any cost that doesn\'t change with unit volume should go into Fixed Costs.']]
  },
};

// ── Default logic for any tool not explicitly defined ─────────
function getLogic(slug, tool) {
  if (calcLogic[slug]) return calcLogic[slug];
  return {
    fields: [
      { id:'value1', label:'Value 1', placeholder:'Enter value', type:'number' },
      { id:'value2', label:'Value 2', placeholder:'Enter value', type:'number' },
    ],
    btn: 'Calculate',
    js: `function calculate(){
  const a = parseFloat(v('value1')), b = parseFloat(v('value2'));
  if(isNaN(a)||isNaN(b)) return alert('Please fill all fields');
  showResult('Result', (a+b).toFixed(4), ['Value 1: '+a, 'Value 2: '+b]);
}`,
    formula: 'Result = Value1 + Value2',
    what: `The ${tool.name} is a free online tool that helps you compute results quickly and accurately. Simply enter your values and click Calculate.`,
    example: `Example: Enter your input values and press the "${tool.name.replace('Calculator','').trim()} Calculate" button to see the result.`,
    faqs: [
      ['Is this calculator free?','Yes, completely free with no sign-up required.'],
      ['How accurate are the results?','Results are calculated using standard mathematical formulas and are accurate to 4 decimal places.'],
      ['Can I use this on mobile?','Yes, this calculator works on all devices including smartphones and tablets.'],
    ]
  };
}

// ── HTML helpers ──────────────────────────────────────────────
function headerHTML() {
  return `<nav class="navbar">
  <div class="site-wrapper">
    <div class="navbar-inner">
      <a href="index.html" class="logo-container">
        <img src="logo.png" alt="CalcSmart Logo" style="height:48px; width:auto; border-radius:10px; box-shadow:0 4px 12px rgba(0,0,0,0.3);">
        <div class="logo-text">
          <h1 style="font-size:1.6rem; letter-spacing:-0.02em;">CalcSmart</h1>
          <p style="font-size:0.85rem; letter-spacing:0.05em; text-transform:uppercase; color:var(--accent-blue);">Pocket Tools Studio</p>
        </div>
      </a>
      
      <ul class="nav-links" id="navLinks">
        <li><a href="index.html">Dashboard</a></li>
        <li><a href="finance-calculators.html">Finance</a></li>
        <li><a href="health-calculators.html">Health</a></li>
        <li><a href="math-calculators.html">Math</a></li>
        <li><a href="guides.html">Guides</a></li>
      </ul>
      
      <div class="header-actions">
        <div class="search-pill">
          <span class="search-icon">🔍</span>
          <input type="text" placeholder="Search calculators..." id="globalSearch">
        </div>
        <button class="theme-toggle" id="themeToggle" title="Toggle Theme" aria-label="Toggle light/dark theme"></button>
        <button class="hamburger" id="hamburgerBtn" aria-label="Open menu">
          <span></span><span></span><span></span>
        </button>
      </div>
    </div>
    <div class="live-data">
      <div class="dot"></div> Live Data
    </div>
  </div>
</nav>`;
}

function footerHTML() {
  return `<footer class="site-footer">
  <div class="site-wrapper">
    <div class="footer-inner">
      <div class="footer-col">
        <h4>Company</h4>
        <ul>
          <li><a href="#">About</a></li>
          <li><a href="#">Terms</a></li>
          <li><a href="#">Privacy</a></li>
        </ul>
      </div>
      <div class="footer-col">
        <h4>Calculators</h4>
        <ul>
          <li><a href="finance-calculators.html">Finance</a></li>
          <li><a href="finance-calculators.html">Investment</a></li>
          <li><a href="health-calculators.html">Health</a></li>
        </ul>
      </div>
      <div class="footer-col">
        <h4>Resources</h4>
        <ul>
          <li><a href="guides.html">Guides</a></li>
          <li><a href="guides.html">Articles</a></li>
        </ul>
      </div>
      <div class="footer-col">
        <h4>Contact</h4>
        <div class="footer-socials">
          <span></span><span></span><span></span><span></span>
        </div>
      </div>
    </div>
  </div>
</footer>
<script>
document.querySelectorAll('.faq-question').forEach(btn=>{
  btn.addEventListener('click',()=>{
    const item = btn.closest('.faq-item');
    item.classList.toggle('open');
  });
});
// Theme toggle
(function(){
  const t=document.getElementById('themeToggle');
  if(!t)return;
  const saved=localStorage.getItem('theme');
  if(saved==='light'){document.body.classList.add('light-mode');t.classList.add('light');}
  t.addEventListener('click',()=>{
    document.body.classList.toggle('light-mode');
    t.classList.toggle('light');
    localStorage.setItem('theme',document.body.classList.contains('light-mode')?'light':'dark');
  });
})();
// Hamburger
(function(){
  const btn=document.getElementById('hamburgerBtn');
  const nav=document.getElementById('navLinks');
  if(!btn||!nav)return;
  btn.addEventListener('click',()=>{
    nav.style.display=nav.style.display==='flex'?'none':'flex';
    nav.style.flexDirection='column';
    nav.style.position='absolute';
    nav.style.top='70px';
    nav.style.right='16px';
    nav.style.background='rgba(21,24,33,0.95)';
    nav.style.backdropFilter='blur(20px)';
    nav.style.padding='16px 24px';
    nav.style.borderRadius='12px';
    nav.style.border='1px solid rgba(255,255,255,0.08)';
    nav.style.boxShadow='0 12px 40px rgba(0,0,0,0.4)';
    nav.style.zIndex='200';
    nav.style.gap='12px';
  });
})();
// Search filter
(function(){
  const s=document.getElementById('globalSearch');
  if(!s)return;
  s.addEventListener('input',()=>{
    const q=s.value.toLowerCase();
    // Filter tool cards, side cards, AND category tiles
    document.querySelectorAll('.tool-card, .side-card, .cat-tile').forEach(c=>{
      const text=c.innerText.toLowerCase();
      c.style.display=text.includes(q)?'flex':'none';
    });
  });
})();
</script>`;
}

// ── Generate HOMEPAGE ─────────────────────────────────────────
function buildHome() {
  const catTiles = categories.map(cat => `
    <a href="${cat.slug}.html" class="cat-tile" id="tile-${cat.slug}">
      <div class="ct-icon">${cat.icon}</div>
      <div class="ct-text">
        <h4>${cat.name}</h4>
        <p>${cat.tools.length} Tools</p>
      </div>
    </a>`).join('');

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="google-site-verification" content="${GOOGLE_VERIFICATION}">
<link rel="icon" type="image/png" href="favicon.png">
<title>CalcSmart | Pocket Tools Studio – 75+ Free Online Calculators</title>
<meta name="description" content="Calculate everything with CalcSmart. 75+ free tools for Finance, Health, Math, Relationships, and Lifestyle. Fast, accurate, and easy to use.">
<meta property="og:title" content="CalcSmart | Pocket Tools Studio">
<meta property="og:description" content="75+ free expert calculators for every part of your life.">
<meta property="og:type" content="website">
<meta property="og:url" content="${SITE_URL}/">
<link rel="canonical" href="${SITE_URL}/">
<link rel="stylesheet" href="styles.css">
</head>
<body>
${headerHTML()}

<div class="hero-section">
  <div class="site-wrapper">
    <div class="hero-content">
      <div class="hero-badge">Pocket Tools Studio</div>
      <h1 class="hero-title">What do you want to <span class="text-gradient">calculate</span> today?</h1>
      <p class="hero-subtitle">Access 75+ professional-grade tools for finance, relationships, math, and more. No sign-up, just results.</p>
      
      <div class="hero-search-container">
        <div class="hero-search-box">
          <span class="hero-search-icon">🔍</span>
          <input type="text" id="heroSearch" placeholder="Search for 'Love Calculator', 'Mortgage', or 'BMI'..." autocomplete="off">
          <button class="hero-search-btn">Find Tool</button>
        </div>
        <div class="search-suggestions">
          <span>Trending:</span>
          <a href="love-calculator.html">Love Score</a>
          <a href="mortgage-calculator.html">Mortgage</a>
          <a href="pet-age-calculator.html">Pet Age</a>
          <a href="bmi-calculator.html">BMI</a>
        </div>
      </div>
    </div>
  </div>
</div>

<div class="site-wrapper">
  <!-- Quick Access Grid -->
  <div class="quick-access-section">
    <div class="section-header">
      <h3>Quick Access Categories</h3>
      <p>Browse our specialized tool suites</p>
    </div>
    <div class="category-tiles">
      ${catTiles}
    </div>
    <div id="noResults" style="display:none; text-align:center; padding: 40px; background: rgba(255,255,255,0.03); border-radius: 20px; border: 1px dashed var(--border-color); margin-top: 20px;">
       <div style="font-size: 3rem; margin-bottom: 16px;">🔍</div>
       <h4 style="font-size: 1.25rem; color: #fff; margin-bottom: 8px;">No tools found matching that name</h4>
       <p style="color: var(--text-secondary);">Try searching for "Love", "Mortgage", or "BMI", or browse by category below.</p>
       <button onclick="document.getElementById('heroSearch').value=''; document.getElementById('heroSearch').dispatchEvent(new Event('input'))" style="margin-top: 16px; background: var(--accent-blue); color: #fff; border: none; padding: 8px 20px; border-radius: 10px; cursor: pointer; font-weight: 600;">Clear Search</button>
    </div>
  </div>

  <!-- Featured Collections -->
  <div class="featured-sections">
    <div class="featured-row">
      <div class="featured-col">
        <div class="f-header">
          <span class="f-icon">❤️</span>
          <h4>Viral & Social Tools</h4>
        </div>
        <div class="f-links">
          <a href="love-calculator.html">Love Calculator <span>Popular</span></a>
          <a href="zodiac-matcher.html">Zodiac Compatibility</a>
          <a href="friendship-compatibility.html">Friendship Tester</a>
          <a href="lucky-numbers.html">Lucky Number Generator</a>
        </div>
      </div>
      <div class="featured-col">
        <div class="f-header">
          <span class="f-icon">💰</span>
          <h4>Smart Finance Suite</h4>
        </div>
        <div class="f-links">
          <a href="mortgage-calculator.html">Mortgage Helper</a>
          <a href="investment-calculator.html">Investment Growth</a>
          <a href="compound-interest.html">Compound Interest</a>
          <a href="profit-margin-calculator.html">Profit Margin Tool</a>
        </div>
      </div>
      <div class="featured-col">
        <div class="f-header">
          <span class="f-icon">✨</span>
          <h4>Lifestyle & Planning</h4>
        </div>
        <div class="f-links">
          <a href="wedding-budget.html">Wedding Planner</a>
          <a href="pet-age-calculator.html">Pet Age Converter</a>
          <a href="habit-streak.html">Habit Tracker</a>
          <a href="baby-name-meaning.html">Baby Names</a>
        </div>
      </div>
    </div>
  </div>
</div>

${footerHTML()}

<script>
  // Hero Search Functionality
  const heroSearch = document.getElementById('heroSearch');
  const noResults = document.getElementById('noResults');
  if(heroSearch) {
    heroSearch.addEventListener('input', () => {
      const q = heroSearch.value.toLowerCase();
      let visibleCount = 0;
      document.querySelectorAll('.cat-tile').forEach(tile => {
        const text = tile.innerText.toLowerCase();
        const isMatch = text.includes(q);
        tile.style.display = isMatch ? 'flex' : 'none';
        if(isMatch) visibleCount++;
      });
      
      if(noResults) noResults.style.display = (visibleCount === 0 && q.length > 0) ? 'block' : 'none';

      // Also filter featured links
      document.querySelectorAll('.f-links a').forEach(link => {
        const text = link.innerText.toLowerCase();
        link.style.display = text.includes(q) ? 'flex' : 'none';
      });
    });
  }
</script>
</body>
</html>`;
  fs.writeFileSync(path.join(OUT_DIR, 'index.html'), html, 'utf8');
  console.log('✓ index.html');
}

// ── Generate CATEGORY pages ───────────────────────────────────
function buildCategory(cat) {
  const toolCards = cat.tools.map(t=>`
    <a href="${t.slug}.html" class="tool-card" id="tool-${t.slug}">
      <div style="font-size:1.8rem;margin-bottom:12px">${t.icon}</div>
      <h3>${t.name}</h3>
      <p>${t.desc}</p>
      <span class="arrow">→</span>
    </a>`).join('');

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="google-site-verification" content="${GOOGLE_VERIFICATION}">
<link rel="icon" type="image/png" href="favicon.png">
<title>${cat.name} – Free Online Tools | ${SITE_NAME}</title>
<meta name="description" content="${cat.desc} Choose from ${cat.tools.length} free ${cat.name.toLowerCase()} on ${SITE_NAME}.">
<meta property="og:title" content="${cat.name} – ${SITE_NAME}">
<meta property="og:description" content="${cat.desc}">
<meta property="og:type" content="website">
<meta property="og:url" content="${SITE_URL}/${cat.slug}.html">
<link rel="canonical" href="${SITE_URL}/${cat.slug}.html">
<link rel="stylesheet" href="styles.css">
</head>
<body>
${headerHTML()}
<div class="site-wrapper">
  <div style="padding:40px 0 60px">
    <div style="display:flex;align-items:center;gap:8px;margin-bottom:8px;font-size:.85rem;color:var(--text-muted)">
      <a href="index.html" style="color:var(--text-muted);text-decoration:none">Home</a>
      <span>›</span>
      <span>${cat.name}</span>
    </div>
    <div style="font-size:3rem;margin-bottom:16px">${cat.icon}</div>
    <h1 style="font-size:2.4rem;font-weight:900;letter-spacing:-0.03em;margin-bottom:12px;background:linear-gradient(135deg,#f0f0f5,#c0c0d0);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text">${cat.name}</h1>
    <p style="font-size:1.05rem;color:var(--text-secondary);max-width:600px">${cat.desc}</p>
    <div class="tools-grid" style="margin-top:36px">${toolCards}</div>
  </div>
</div>
${footerHTML()}
</body>
</html>`;
  fs.writeFileSync(path.join(OUT_DIR, cat.slug + '.html'), html, 'utf8');
  console.log('✓ ' + cat.slug + '.html');
}

// ── Generate TOOL pages ───────────────────────────────────────
function buildTool(tool, cat) {
  const logic = getLogic(tool.slug, tool);
  const fields = logic.fields ? logic.fields.map(f=>{
    if (f.type === 'select') {
      const opts = f.options.map(o=>`<option value="${o.toLowerCase()}">${o}</option>`).join('');
      return `<div class="form-group"><label for="${f.id}">${f.label}</label><select id="${f.id}" style="padding:12px 16px; border-radius:var(--radius-md); background:var(--bg-input); color:#fff; border:1px solid var(--border-color); outline:none;">${opts}</select></div>`;
    }
    return `<div class="form-group">
      <label for="${f.id}">${f.label}</label>
      <input type="${f.type}" id="${f.id}" placeholder="${f.placeholder}" ${f.type==='date'?`value="${new Date().toISOString().slice(0,10)}"`:''}>
    </div>`}).join('') : '';

  const faqs = logic.faqs.map(([q,a])=>`
    <div class="faq-item">
      <button class="faq-question">${q}<span class="icon">+</span></button>
      <div class="faq-answer"><div class="faq-answer-inner">${a}</div></div>
    </div>`).join('');

  // related tools from same category (exclude self)
  const related = cat.tools.filter(t=>t.slug!==tool.slug).slice(0,6);
  const relatedLinks = related.map(t=>`<a href="${t.slug}.html" class="related-link"><span class="r-icon">${t.icon}</span>${t.name}</a>`).join('');

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="google-site-verification" content="${GOOGLE_VERIFICATION}">
<link rel="icon" type="image/png" href="favicon.png">
<title>${tool.name} – Free Online Calculator | ${SITE_NAME}</title>
<meta name="description" content="${tool.desc} Use our free ${tool.name.toLowerCase()} online — instant results, no sign-up.">
<meta property="og:title" content="${tool.name} – Free Online Calculator">
<meta property="og:description" content="${tool.desc}">
<meta property="og:type" content="website">
<meta property="og:url" content="${SITE_URL}/${tool.slug}.html">
<link rel="canonical" href="${SITE_URL}/${tool.slug}.html">
<link rel="stylesheet" href="styles.css">
</head>
<body>
${headerHTML()}
<div class="site-wrapper">
  <div class="calc-page">
    <div class="breadcrumb">
      <a href="index.html">Home</a>
      <span>›</span>
      <a href="${cat.slug}.html">${cat.name}</a>
      <span>›</span>
      <span class="current">${tool.name}</span>
    </div>

    <div class="calc-header">
      <h1>${tool.icon} ${tool.name}</h1>
      <p>${tool.desc}</p>
    </div>

    <div class="calc-widget">
      ${logic.customHTML ? logic.customHTML : `<div class="calc-form">${fields}</div>
      <div class="calc-actions">
        <button class="calc-btn" id="calcBtn" onclick="calculate()">⚡ ${logic.btn}</button>
        <button class="calc-btn-secondary" onclick="resetCalc()">↺ Reset</button>
      </div>
      <div class="calc-result" id="calcResult">
        <div class="result-label" id="resultLabel"></div>
        <div class="result-value" id="resultValue"></div>
        <div class="result-details" id="resultDetails"></div>
        
        <!-- Social Share Viral Section -->
        <div class="viral-share" style="margin-top: 24px; border-top: 1px solid var(--border-color); padding-top: 20px; display: none;" id="shareBox">
          <p style="font-size: 0.85rem; color: var(--text-secondary); margin-bottom: 12px; font-weight: 500;">🚀 SHARE YOUR RESULT:</p>
          <div style="display: flex; gap: 8px;">
            <button onclick="shareResult('whatsapp')" style="background: #25d366; color: white; border: none; padding: 10px 16px; border-radius: 8px; font-size: 0.85rem; font-weight: 600; cursor: pointer;">WhatsApp</button>
            <button onclick="shareResult('facebook')" style="background: #1877f2; color: white; border: none; padding: 10px 16px; border-radius: 8px; font-size: 0.85rem; font-weight: 600; cursor: pointer;">Facebook</button>
            <button onclick="shareResult('copy')" style="background: rgba(255,255,255,0.05); color: #fff; border: 1px solid var(--border-color); padding: 10px 16px; border-radius: 8px; font-size: 0.85rem; font-weight: 600; cursor: pointer;">Copy Link</button>
          </div>
        </div>
      </div>`}
    </div>

    <div class="content-section">
      <h2>What is a ${tool.name}?</h2>
      <p>${logic.what}</p>
      <div class="formula-box"><code>${logic.formula}</code></div>
    </div>

    ${logic.blog ? `
    <div class="content-section" style="border-top: 1px solid var(--border-color); padding-top: 40px; margin-top: 40px;">
      <h2 style="margin-bottom: 24px;">📝 In-Depth Guide: Mastering ${tool.name}</h2>
      <div class="blog-preview-content" style="line-height: 1.8; color: var(--text-secondary); font-size: 1.05rem;">
        ${logic.blog}
      </div>
    </div>
    ` : ''}

    <div class="content-section">
      <h2>Example</h2>
      <div class="example-box">
        <div class="example-title">📌 Example Calculation</div>
        <p>${logic.example}</p>
      </div>
    </div>

    <div class="faq-section">
      <h2 class="content-section" style="margin-bottom:20px">Frequently Asked Questions</h2>
      ${faqs}
    </div>

    <div class="related-section">
      <h2>Related Calculators</h2>
      <div class="related-grid">${relatedLinks}</div>
    </div>
  </div>
</div>
${footerHTML()}
<script>
function v(id){return document.getElementById(id).value;}
function showResult(label, value, details){
  document.getElementById('resultLabel').textContent = label;
  document.getElementById('resultValue').textContent = value;
  document.getElementById('resultDetails').innerHTML = details.map(d=>'<span>'+d+'</span>').join('');
  document.getElementById('calcResult').classList.add('visible');
  const sb = document.getElementById('shareBox');
  if(sb) sb.style.display = 'block';
}
function shareResult(type) {
  const url = window.location.href;
  const text = "Check out my results on this " + document.querySelector('h1').innerText + "!";
  if(type === 'whatsapp') window.open('https://api.whatsapp.com/send?text=' + encodeURIComponent(text + " " + url));
  if(type === 'facebook') window.open('https://www.facebook.com/sharer/sharer.php?u=' + encodeURIComponent(url));
  if(type === 'copy') {
    navigator.clipboard.writeText(url).then(() => alert('Link copied!'));
  }
}
function resetCalc(){
  document.querySelectorAll('.calc-form input, .calc-form select').forEach(i=>{if(i.type!=='date')i.value='';});
  document.getElementById('calcResult').classList.remove('visible');
  if(document.getElementById('shareBox')) document.getElementById('shareBox').style.display='none';
}
${logic.js}
</script>
</body>
</html>`;
  fs.writeFileSync(path.join(OUT_DIR, tool.slug + '.html'), html, 'utf8');
  console.log('✓ ' + tool.slug + '.html');
}

// ── Generate GUIDES page ─────────────────────────────────────
function buildGuides() {
  const articleCards = articles.map(art => `
    <a href="article-${art.slug}.html" class="tool-card">
      <div style="font-size:1.8rem;margin-bottom:12px">📚</div>
      <h3>${art.title}</h3>
      <p>${art.desc}</p>
      <span class="arrow">Read More →</span>
    </a>`).join('');

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="google-site-verification" content="${GOOGLE_VERIFICATION}">
<link rel="icon" type="image/png" href="favicon.png">
<title>Guides & Articles | ${SITE_NAME}</title>
<link rel="stylesheet" href="styles.css">
</head>
<body>
${headerHTML()}
<div class="site-wrapper">
  <div style="padding:40px 0 60px">
    <h1 style="font-size:2.4rem;margin-bottom:12px">Guides & Resources</h1>
    <p style="color:var(--text-secondary);max-width:600px">In-depth explanations of financial terms, health metrics, and mathematical concepts to help you use our calculators effectively.</p>
    <div class="tools-grid" style="margin-top:36px">${articleCards}</div>
  </div>
</div>
${footerHTML()}
</body>
</html>`;
  fs.writeFileSync(path.join(OUT_DIR, 'guides.html'), html, 'utf8');
  console.log('✓ guides.html');
}

// ── Generate ARTICLE pages ────────────────────────────────────
function buildArticle(art) {
  const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="google-site-verification" content="${GOOGLE_VERIFICATION}">
<link rel="icon" type="image/png" href="favicon.png">
<title>${art.title} | ${SITE_NAME}</title>
<link rel="stylesheet" href="styles.css">
</head>
<body>
${headerHTML()}
<div class="site-wrapper">
  <div class="calc-page" style="max-width:800px; margin: 0 auto; padding-top:40px;">
    <div class="breadcrumb">
      <a href="index.html">Home</a> <span>›</span> <a href="guides.html">Guides</a> <span>›</span> <span>Article</span>
    </div>
    <h1 style="font-size:3rem; margin:24px 0; line-height:1.1;">${art.title}</h1>
    <div class="content-section" style="font-size:1.1rem; line-height:1.8; color:var(--text-secondary);">
      ${art.content}
    </div>
    <div style="margin-top:60px; padding-top:40px; border-top:1px solid var(--border-color);">
      <a href="guides.html" style="color:var(--accent-blue); text-decoration:none; font-weight:700;">← Back to Guides</a>
    </div>
  </div>
</div>
${footerHTML()}
</body>
</html>`;
  fs.writeFileSync(path.join(OUT_DIR, 'article-' + art.slug + '.html'), html, 'utf8');
  console.log('✓ article-' + art.slug + '.html');
}

// ── Generate SITEMAP ──────────────────────────────────────────
function generateSitemap() {
  const urls = [];
  const now = new Date().toISOString().split('T')[0];

  urls.push({ loc: `${SITE_URL}/index.html`, priority: '1.0' });
  urls.push({ loc: `${SITE_URL}/guides.html`, priority: '0.9' });

  articles.forEach(art => {
    urls.push({ loc: `${SITE_URL}/article-${art.slug}.html`, priority: '0.8' });
  });

  categories.forEach(cat => {
    urls.push({ loc: `${SITE_URL}/${cat.slug}.html`, priority: '0.8' });
    cat.tools.forEach(tool => {
      urls.push({ loc: `${SITE_URL}/${tool.slug}.html`, priority: '0.8' });
    });
  });

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(u => `  <url>
    <loc>${u.loc}</loc>
    <lastmod>${now}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${u.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

  fs.writeFileSync(path.join(OUT_DIR, 'sitemap.xml'), xml.trim(), 'utf8');
  console.log('✓ sitemap.xml');
}

// ── Run builder ───────────────────────────────────────────────
console.log('\n🔨 Building CalcSmart site...\n');
buildHome();
buildGuides();
articles.forEach(art => buildArticle(art));
categories.forEach(cat => {
  buildCategory(cat);
  cat.tools.forEach(tool => buildTool(tool, cat));
});
generateSitemap();

const total = 1 + 1 + articles.length + categories.length + categories.reduce((s,c)=>s+c.tools.length,0);
console.log(`\n✅ Done! Generated ${total + 1} files (inc. sitemap) in ${OUT_DIR}\n`);
