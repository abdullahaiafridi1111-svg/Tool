import fs from "fs";
import path from "path";

// Generate a high-impact, premium Hero Showcase SVG showing the real Report Review Android interface
function generateHeroSvg() {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 900" width="1600" height="900">
  <defs>
    <style>
      @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;600;700;800;900&amp;family=Inter:wght@400;500;600;700;800;900&amp;display=swap');
    </style>
    <linearGradient id="hero-bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0a0e11" />
      <stop offset="50%" stop-color="#040607" />
      <stop offset="100%" stop-color="#020304" />
    </linearGradient>

    <radialGradient id="emerald-glow" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#10b981" stop-opacity="0.18" />
      <stop offset="100%" stop-color="#10b981" stop-opacity="0" />
    </radialGradient>

    <radialGradient id="blue-glow" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#3b82f6" stop-opacity="0.14" />
      <stop offset="100%" stop-color="#3b82f6" stop-opacity="0" />
    </radialGradient>

    <filter id="phone-shadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="25" stdDeviation="35" flood-color="#000000" flood-opacity="0.9"/>
    </filter>
  </defs>

  <!-- Background -->
  <rect width="1600" height="900" fill="url(#hero-bg)" />

  <!-- Ambient Glows -->
  <circle cx="800" cy="450" r="600" fill="url(#emerald-glow)" />
  <circle cx="1200" cy="300" r="500" fill="url(#blue-glow)" />

  <!-- Subtle Blueprint Tech Grid Lines -->
  <g stroke="#ffffff" stroke-opacity="0.03" stroke-width="1">
    <line x1="0" y1="150" x2="1600" y2="150"/>
    <line x1="0" y1="300" x2="1600" y2="300"/>
    <line x1="0" y1="450" x2="1600" y2="450"/>
    <line x1="0" y1="600" x2="1600" y2="600"/>
    <line x1="0" y1="750" x2="1600" y2="750"/>
    <line x1="200" y1="0" x2="200" y2="900"/>
    <line x1="400" y1="0" x2="400" y2="900"/>
    <line x1="600" y1="0" x2="600" y2="900"/>
    <line x1="800" y1="0" x2="800" y2="900"/>
    <line x1="1000" y1="0" x2="1000" y2="900"/>
    <line x1="1200" y1="0" x2="1200" y2="900"/>
    <line x1="1400" y1="0" x2="1400" y2="900"/>
  </g>

  <!-- Left Side: App Feature Highlights & Floating Badges -->
  <g transform="translate(100, 160)">
    <!-- Badge -->
    <rect x="0" y="0" width="340" height="42" rx="21" fill="#042015" stroke="#10b981" stroke-width="1.5" />
    <circle cx="22" cy="21" r="5" fill="#10b981" />
    <text x="38" y="27" fill="#34d399" font-family="'JetBrains Mono', monospace" font-size="14" font-weight="700" letter-spacing="1">GOOGLE MAPS AUDITOR ACTIVE</text>

    <!-- Main Title -->
    <text x="0" y="105" fill="#ffffff" font-family="'Inter', sans-serif" font-size="52" font-weight="900" letter-spacing="-1">REPORT REVIEW</text>
    <text x="0" y="155" fill="#38bdf8" font-family="'JetBrains Mono', monospace" font-size="28" font-weight="700">SECURE AUDITOR CONSOLE</text>
    <text x="0" y="200" fill="#94a3b8" font-family="'Inter', sans-serif" font-size="18" font-weight="400">Automated Google Maps policy violation auditor powered by</text>
    <text x="0" y="228" fill="#94a3b8" font-family="'Inter', sans-serif" font-size="18" font-weight="400">Gemini Grounding &amp; Official Review Appeals Framework.</text>

    <!-- Mini Feature Cards -->
    <g transform="translate(0, 275)">
      <!-- Card 1 -->
      <g transform="translate(0, 0)">
        <rect width="360" height="85" rx="14" fill="#0b1114" stroke="#1c262c" stroke-width="1.5"/>
        <circle cx="36" cy="42" r="18" fill="#042015" stroke="#10b981" />
        <path d="M28 42 L34 48 L44 36" fill="none" stroke="#34d399" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
        <text x="68" y="38" fill="#ffffff" font-family="'Inter', sans-serif" font-size="16" font-weight="700">Cryptographic API Key Gate</text>
        <text x="68" y="58" fill="#64748b" font-family="'JetBrains Mono', monospace" font-size="13">VERIFIED • CONSOLE UNLOCKED</text>
      </g>

      <!-- Card 2 -->
      <g transform="translate(0, 105)">
        <rect width="360" height="85" rx="14" fill="#0b1114" stroke="#1c262c" stroke-width="1.5"/>
        <circle cx="36" cy="42" r="18" fill="#0c1d2e" stroke="#38bdf8" />
        <path d="M28 42 L44 42 M36 34 L44 42 L36 50" fill="none" stroke="#38bdf8" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
        <text x="68" y="38" fill="#ffffff" font-family="'Inter', sans-serif" font-size="16" font-weight="700">Gemini Grounded AI Auditor</text>
        <text x="68" y="58" fill="#64748b" font-family="'JetBrains Mono', monospace" font-size="13">Google Search &amp; Policy Bounds</text>
      </g>

      <!-- Card 3 -->
      <g transform="translate(0, 210)">
        <rect width="360" height="85" rx="14" fill="#0b1114" stroke="#1c262c" stroke-width="1.5"/>
        <circle cx="36" cy="42" r="18" fill="#1f1807" stroke="#f59e0b" />
        <text x="36" y="48" fill="#f59e0b" font-family="monospace" font-size="18" font-weight="bold" text-anchor="middle">★</text>
        <text x="68" y="38" fill="#ffffff" font-family="'Inter', sans-serif" font-size="16" font-weight="700">Firestore Case Logs DB</text>
        <text x="68" y="58" fill="#64748b" font-family="'JetBrains Mono', monospace" font-size="13">Real-time status tracking</text>
      </g>
    </g>
  </g>

  <!-- Right Side: Dual Android Phone Mockups (Screen 1 & Screen 3) -->
  <!-- Back Phone (Screenshot 3 / Grounded Auditor) -->
  <g transform="translate(1080, 80) scale(0.32)" filter="url(#phone-shadow)" opacity="0.85">
    <!-- Phone Bezel -->
    <rect width="1140" height="2460" rx="90" fill="#182026" stroke="#2c3a44" stroke-width="6"/>
    <rect x="30" y="30" width="1080" height="2400" rx="70" fill="#070a0c" />
    
    <!-- Render Screenshot 3 inside -->
    <g transform="translate(30, 30)">
      <!-- Header -->
      <rect x="42" y="130" width="100" height="100" rx="24" fill="#ffffff" />
      <path d="M92 154 c -12 0 -22 10 -22 22 c 0 16 22 36 22 36 s 22 -20 22 -36 c 0 -12 -10 -22 -22 -22 z m 0 30 c -4.4 0 -8 -3.6 -8 -8 s 3.6 -8 8 -8 s 8 3.6 8 8 s -3.6 8 -8 8 z" fill="#080c0e"/>
      <text x="175" y="180" fill="#ffffff" font-family="'JetBrains Mono', monospace" font-size="44" font-weight="900" letter-spacing="4">REPORT  REVIEW</text>
      <rect x="800" y="145" width="235" height="75" rx="12" fill="#042015" stroke="#10b981" stroke-width="2.5" />
      <text x="917" y="193" fill="#34d399" font-family="'JetBrains Mono', monospace" font-size="26" font-weight="800" letter-spacing="3" text-anchor="middle">AUTHORIZED</text>

      <!-- Gemini Card -->
      <g transform="translate(42, 280)">
        <rect width="996" height="580" rx="18" fill="#0d1215" stroke="#1c262c" stroke-width="2" />
        <text x="36" y="58" fill="#9cb0ba" font-family="'JetBrains Mono', monospace" font-size="28" font-weight="700">GEMINI GROUNDED AUDITOR</text>
        <rect x="830" y="24" width="130" height="58" rx="8" fill="#06281a" stroke="#10b981" stroke-width="2" />
        <text x="895" y="61" fill="#34d399" font-family="'JetBrains Mono', monospace" font-size="22" font-weight="700" text-anchor="middle">ACTIVE</text>
        
        <rect x="36" y="320" width="520" height="95" rx="12" fill="#3897f0" />
        <text x="95" y="378" fill="#000000" font-family="'JetBrains Mono', monospace" font-size="26" font-weight="900">RUN GROUNDED AI AUDIT</text>
      </g>

      <!-- Processing Console -->
      <g transform="translate(42, 900)">
        <rect width="996" height="700" rx="18" fill="#0d1215" stroke="#1c262c" stroke-width="2" />
        <text x="36" y="58" fill="#9cb0ba" font-family="'JetBrains Mono', monospace" font-size="28" font-weight="700">PROCESSING CONSOLE</text>
        <rect x="36" y="150" width="924" height="500" rx="14" fill="#050809" stroke="#161f24" stroke-width="2"/>
        <text x="70" y="230" fill="#cbd5e1" font-family="'JetBrains Mono', monospace" font-size="30">SYSTEM READY...</text>
        <text x="70" y="300" fill="#cbd5e1" font-family="'JetBrains Mono', monospace" font-size="30">Awaiting authorized access.</text>
        <text x="70" y="370" fill="#34d399" font-family="'JetBrains Mono', monospace" font-size="30">ACCESS GRANTED. Console operations enabled.</text>
      </g>
    </g>
  </g>

  <!-- Front Phone (Screenshot 1 / API Key & Inputs) -->
  <g transform="translate(760, 40) scale(0.35)" filter="url(#phone-shadow)">
    <!-- Phone Bezel & Border -->
    <rect width="1140" height="2460" rx="90" fill="#12181d" stroke="#253540" stroke-width="8"/>
    <!-- Screen Glass -->
    <rect x="30" y="30" width="1080" height="2400" rx="70" fill="#070a0c" />

    <!-- Top Camera Hole Punch -->
    <circle cx="570" cy="70" r="14" fill="#000000" stroke="#1c262c" stroke-width="2"/>

    <!-- Screen 1 Content Inside -->
    <g transform="translate(30, 30)">
      <!-- Status Bar -->
      <text x="65" y="72" fill="#ffffff" font-family="sans-serif" font-size="34" font-weight="bold">9:03</text>
      <text x="940" y="72" fill="#ffffff" font-family="sans-serif" font-size="26" font-weight="bold">78%</text>

      <!-- App Header -->
      <rect x="42" y="130" width="100" height="100" rx="24" fill="#ffffff" />
      <path d="M92 154 c -12 0 -22 10 -22 22 c 0 16 22 36 22 36 s 22 -20 22 -36 c 0 -12 -10 -22 -22 -22 z m 0 30 c -4.4 0 -8 -3.6 -8 -8 s 3.6 -8 8 -8 s 8 3.6 8 8 s -3.6 8 -8 8 z" fill="#080c0e"/>
      <text x="175" y="180" fill="#ffffff" font-family="'JetBrains Mono', monospace" font-size="44" font-weight="900" letter-spacing="4">REPORT  REVIEW</text>
      <text x="175" y="222" fill="#8e9fa8" font-family="sans-serif" font-size="28">Report business google maps review</text>
      
      <rect x="800" y="145" width="235" height="75" rx="12" fill="#042015" stroke="#10b981" stroke-width="2.5" />
      <text x="917" y="193" fill="#34d399" font-family="'JetBrains Mono', monospace" font-size="26" font-weight="800" letter-spacing="3" text-anchor="middle">AUTHORIZED</text>

      <!-- Subhead -->
      <g transform="translate(60, 370)">
        <text x="42" y="0" fill="#cbd5e1" font-family="'JetBrains Mono', monospace" font-size="30" font-weight="700" letter-spacing="4">🔒 SECURE  AUDITOR  CONSOLE</text>
      </g>

      <!-- Card 1: API ACCESS -->
      <g transform="translate(42, 450)">
        <rect width="996" height="520" rx="18" fill="#0d1215" stroke="#1c262c" stroke-width="2" />
        <text x="36" y="55" fill="#9cb0ba" font-family="'JetBrains Mono', monospace" font-size="28" font-weight="700" letter-spacing="3">API  ACCESS</text>
        <rect x="800" y="24" width="160" height="58" rx="8" fill="#121a1f" stroke="#25343d" stroke-width="2" />
        <text x="880" y="61" fill="#718694" font-family="'JetBrains Mono', monospace" font-size="22" font-weight="700" letter-spacing="2" text-anchor="middle">VERIFIED</text>

        <!-- Key Input -->
        <g transform="translate(36, 120)">
          <rect width="924" height="130" rx="14" fill="#080c0e" stroke="#00e676" stroke-width="3" />
          <rect x="25" y="-14" width="220" height="28" fill="#0d1215" />
          <text x="35" y="6" fill="#00e676" font-family="sans-serif" font-size="24" font-weight="600">Private API Key</text>
          <text x="40" y="80" fill="#ffffff" font-family="monospace" font-size="44" font-weight="bold" letter-spacing="6">••••••••••</text>
          <rect x="282" y="44" width="4" height="48" fill="#00e676" />
        </g>

        <!-- Buttons -->
        <g transform="translate(36, 300)">
          <rect x="0" y="0" width="445" height="100" rx="12" fill="#ffffff" />
          <text x="222" y="62" fill="#000000" font-family="sans-serif" font-size="30" font-weight="900" letter-spacing="2" text-anchor="middle">UNLOCK</text>
          <rect x="479" y="0" width="445" height="100" rx="12" fill="#12181b" stroke="#253238" stroke-width="2" />
          <text x="701" y="62" fill="#52646f" font-family="sans-serif" font-size="30" font-weight="900" letter-spacing="2" text-anchor="middle">LOCK</text>
        </g>
        <text x="36" y="465" fill="#00e676" font-family="'JetBrains Mono', monospace" font-size="25" font-weight="600">Key accepted. Console operations are fully active.</text>
      </g>

      <!-- Card 2: CASE INPUT -->
      <g transform="translate(42, 1020)">
        <rect width="996" height="1260" rx="18" fill="#0d1215" stroke="#1c262c" stroke-width="2" />
        <text x="36" y="62" fill="#9cb0ba" font-family="'JetBrains Mono', monospace" font-size="28" font-weight="700" letter-spacing="3">CASE  INPUT</text>
        <rect x="860" y="28" width="100" height="58" rx="8" fill="#121a1f" stroke="#25343d" stroke-width="2" />
        <text x="910" y="65" fill="#718694" font-family="'JetBrains Mono', monospace" font-size="22" font-weight="700" letter-spacing="2" text-anchor="middle">GBP</text>

        <g transform="translate(36, 140)">
          <rect width="924" height="145" rx="14" fill="#080c0e" stroke="#1f2a30" stroke-width="2" />
          <text x="45" y="85" fill="#5a6e78" font-family="sans-serif" font-size="30">Google Places API Key</text>
        </g>
        <g transform="translate(36, 330)">
          <rect width="924" height="145" rx="14" fill="#080c0e" stroke="#1f2a30" stroke-width="2" />
          <text x="45" y="85" fill="#5a6e78" font-family="sans-serif" font-size="30">Google Maps Review Link</text>
        </g>
        <g transform="translate(36, 520)">
          <rect width="924" height="145" rx="14" fill="#080c0e" stroke="#1f2a30" stroke-width="2" />
          <text x="45" y="85" fill="#5a6e78" font-family="sans-serif" font-size="30">Business Name</text>
        </g>
      </g>

      <!-- Bottom Gesture Bar -->
      <rect x="390" y="2360" width="300" height="8" rx="4" fill="#ffffff" fill-opacity="0.8"/>
    </g>
  </g>
</svg>`;
}

const uploadsDir = path.resolve("./public/uploads");
const distUploadsDir = path.resolve("./dist/uploads");

const heroSvg = generateHeroSvg();
fs.writeFileSync(path.join(uploadsDir, "hero.svg"), heroSvg);
fs.writeFileSync(path.join(uploadsDir, "hero.png"), heroSvg);
fs.writeFileSync(path.join(distUploadsDir, "hero.svg"), heroSvg);
fs.writeFileSync(path.join(distUploadsDir, "hero.png"), heroSvg);
console.log("Updated hero.svg and hero.png successfully");
