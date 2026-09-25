import fs from "fs";
import path from "path";

// Common SVG components
function svgStatusBar(time = "9:03", kb = "3.71", battery = "78") {
  return `
  <!-- Android Status Bar -->
  <g id="status-bar">
    <!-- Clock -->
    <text x="65" y="72" fill="#ffffff" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="34" font-weight="700">${time}</text>
    
    <!-- WhatsApp Icon -->
    <g transform="translate(150, 48) scale(0.9)">
      <circle cx="16" cy="16" r="14" fill="#25d366" />
      <path d="M22 18.5c-.3-.2-1.8-.9-2.1-1-.3-.1-.5-.2-.7.2-.2.3-.8 1-.9 1.2-.2.2-.4.2-.7.1-.3-.1-1.3-.5-2.5-1.5-.9-.8-1.5-1.8-1.7-2.1-.2-.3 0-.5.1-.7.1-.1.3-.4.4-.5.1-.2.2-.3.3-.5.1-.2 0-.4 0-.5-.1-.2-.7-1.7-1-2.3-.3-.6-.5-.5-.7-.5h-.6c-.2 0-.6.1-.9.4-.3.4-1.2 1.2-1.2 2.9s1.2 3.4 1.4 3.6c.2.3 2.4 3.7 5.8 5.1.8.3 1.4.5 1.9.7.8.2 1.6.2 2.2.1.7-.1 2.1-.9 2.4-1.7.3-.8.3-1.6.2-1.7-.1-.2-.3-.3-.6-.4z" fill="#ffffff"/>
    </g>

    <!-- Right-aligned Network & Battery Group -->
    <g transform="translate(680, 44)">
      <!-- Speed -->
      <g transform="translate(-80, 0)">
        <circle cx="10" cy="12" r="11" fill="none" stroke="#ffffff" stroke-width="2.5" />
        <path d="M10 6 L10 13 L14 15" stroke="#ffffff" stroke-width="2" stroke-linecap="round"/>
        <text x="32" y="10" fill="#ffffff" font-family="monospace" font-size="19" font-weight="bold">${kb}</text>
        <text x="32" y="24" fill="#ffffff" font-family="sans-serif" font-size="14" font-weight="bold">KB/s</text>
      </g>
      
      <!-- 4G -->
      <g transform="translate(80, 0)">
        <text x="0" y="22" fill="#ffffff" font-family="sans-serif" font-size="24" font-weight="900">4G</text>
      </g>

      <!-- Signal Bars -->
      <g transform="translate(135, 2)">
        <rect x="0" y="16" width="4" height="8" rx="1" fill="#ffffff"/>
        <rect x="7" y="12" width="4" height="12" rx="1" fill="#ffffff"/>
        <rect x="14" y="8" width="4" height="16" rx="1" fill="#ffffff"/>
        <rect x="21" y="3" width="4" height="21" rx="1" fill="#ffffff"/>
      </g>

      <!-- Battery -->
      <g transform="translate(180, 2)">
        <rect x="0" y="3" width="42" height="20" rx="4" fill="none" stroke="#ffffff" stroke-width="2.5"/>
        <rect x="42" y="9" width="3" height="8" rx="1" fill="#ffffff"/>
        <rect x="3" y="6" width="${Math.round(36 * (parseInt(battery)/100))}" height="14" rx="2" fill="#ffffff"/>
        <text x="56" y="21" fill="#ffffff" font-family="sans-serif" font-size="22" font-weight="bold">${battery}%</text>
      </g>
    </g>
  </g>`;
}

function svgAppHeader() {
  return `
  <!-- Top App Bar -->
  <g id="app-header">
    <!-- Location Pin Rounded Square Icon -->
    <rect x="42" y="130" width="100" height="100" rx="24" fill="#ffffff" />
    <path d="M92 154 c -12 0 -22 10 -22 22 c 0 16 22 36 22 36 s 22 -20 22 -36 c 0 -12 -10 -22 -22 -22 z m 0 30 c -4.4 0 -8 -3.6 -8 -8 s 3.6 -8 8 -8 s 8 3.6 8 8 s -3.6 8 -8 8 z" fill="#080c0e"/>
    
    <!-- Title & Subtitle -->
    <text x="175" y="180" fill="#ffffff" font-family="'JetBrains Mono', 'Roboto Mono', monospace" font-size="44" font-weight="900" letter-spacing="4">REPORT  REVIEW</text>
    <text x="175" y="222" fill="#8e9fa8" font-family="-apple-system, sans-serif" font-size="28" font-weight="400">Report business google maps review</text>
    
    <!-- AUTHORIZED pill badge -->
    <rect x="800" y="145" width="235" height="75" rx="12" fill="#042015" stroke="#10b981" stroke-width="2.5" />
    <text x="917" y="193" fill="#34d399" font-family="'JetBrains Mono', monospace" font-size="26" font-weight="800" letter-spacing="3" text-anchor="middle">AUTHORIZED</text>
  </g>`;
}

function svgGestureBar() {
  return `
  <!-- Android Bottom Gesture Bar -->
  <rect x="390" y="2360" width="300" height="8" rx="4" fill="#ffffff" fill-opacity="0.8"/>`;
}

// ==============================================================
// SCREENSHOT 1: Secure Auditor Console & API Access
// ==============================================================
function generateScreenshot1() {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1080 2400" width="1080" height="2400">
  <defs>
    <style>
      @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;600;700;800&amp;family=Inter:wght@400;500;600;700;800&amp;display=swap');
    </style>
  </defs>

  <!-- Background -->
  <rect width="1080" height="2400" fill="#070a0c" />

  ${svgStatusBar("9:03", "3.71", "78")}
  ${svgAppHeader()}

  <!-- Subheading: SECURE AUDITOR CONSOLE -->
  <g transform="translate(85, 370)">
    <g transform="translate(0, -22) scale(1.1)">
      <!-- Blue Lock Icon -->
      <path d="M7 11V7a5 5 0 0 1 10 0v4" fill="none" stroke="#38bdf8" stroke-width="2.5" stroke-linecap="round"/>
      <rect x="3" y="11" width="18" height="11" rx="2" fill="#38bdf8"/>
    </g>
    <text x="42" y="0" fill="#cbd5e1" font-family="'JetBrains Mono', monospace" font-size="30" font-weight="700" letter-spacing="4">SECURE  AUDITOR  CONSOLE</text>
  </g>

  <!-- CARD 1: API ACCESS -->
  <g transform="translate(42, 450)">
    <!-- Container -->
    <rect width="996" height="520" rx="18" fill="#0d1215" stroke="#1c262c" stroke-width="2" />
    
    <!-- Header -->
    <text x="36" y="55" fill="#9cb0ba" font-family="'JetBrains Mono', monospace" font-size="28" font-weight="700" letter-spacing="3">API  ACCESS</text>
    
    <!-- VERIFIED badge -->
    <rect x="800" y="24" width="160" height="58" rx="8" fill="#121a1f" stroke="#25343d" stroke-width="2" />
    <text x="880" y="61" fill="#718694" font-family="'JetBrains Mono', monospace" font-size="22" font-weight="700" letter-spacing="2" text-anchor="middle">VERIFIED</text>

    <!-- Private API Key Input with cut-out label -->
    <g transform="translate(36, 120)">
      <rect width="924" height="130" rx="14" fill="#080c0e" stroke="#00e676" stroke-width="3" />
      
      <!-- Label -->
      <rect x="25" y="-14" width="220" height="28" fill="#0d1215" />
      <text x="35" y="6" fill="#00e676" font-family="'Inter', sans-serif" font-size="24" font-weight="600">Private API Key</text>
      
      <!-- Masked value with cursor -->
      <text x="40" y="80" fill="#ffffff" font-family="monospace" font-size="44" font-weight="bold" letter-spacing="6">••••••••••</text>
      <rect x="282" y="44" width="4" height="48" fill="#00e676" />
    </g>

    <!-- UNLOCK & LOCK Buttons -->
    <g transform="translate(36, 300)">
      <!-- UNLOCK (White) -->
      <rect x="0" y="0" width="445" height="100" rx="12" fill="#ffffff" />
      <text x="222" y="62" fill="#000000" font-family="'Inter', sans-serif" font-size="30" font-weight="900" letter-spacing="2" text-anchor="middle">UNLOCK</text>

      <!-- LOCK (Dark) -->
      <rect x="479" y="0" width="445" height="100" rx="12" fill="#12181b" stroke="#253238" stroke-width="2" />
      <text x="701" y="62" fill="#52646f" font-family="'Inter', sans-serif" font-size="30" font-weight="900" letter-spacing="2" text-anchor="middle">LOCK</text>
    </g>

    <!-- Key Accepted Message -->
    <text x="36" y="465" fill="#00e676" font-family="'JetBrains Mono', monospace" font-size="25" font-weight="600">Key accepted. Console operations are fully active.</text>
  </g>

  <!-- CARD 2: CASE INPUT -->
  <g transform="translate(42, 1020)">
    <!-- Container -->
    <rect width="996" height="1260" rx="18" fill="#0d1215" stroke="#1c262c" stroke-width="2" />

    <!-- Header -->
    <text x="36" y="62" fill="#9cb0ba" font-family="'JetBrains Mono', monospace" font-size="28" font-weight="700" letter-spacing="3">CASE  INPUT</text>
    
    <!-- GBP badge -->
    <rect x="860" y="28" width="100" height="58" rx="8" fill="#121a1f" stroke="#25343d" stroke-width="2" />
    <text x="910" y="65" fill="#718694" font-family="'JetBrains Mono', monospace" font-size="22" font-weight="700" letter-spacing="2" text-anchor="middle">GBP</text>

    <!-- Field 1: Google Places API Key -->
    <g transform="translate(36, 140)">
      <rect width="924" height="145" rx="14" fill="#080c0e" stroke="#1f2a30" stroke-width="2" />
      <text x="45" y="85" fill="#5a6e78" font-family="'Inter', sans-serif" font-size="30">Google Places API Key</text>
    </g>

    <!-- Field 2: Google Maps Review Link -->
    <g transform="translate(36, 330)">
      <rect width="924" height="145" rx="14" fill="#080c0e" stroke="#1f2a30" stroke-width="2" />
      <text x="45" y="85" fill="#5a6e78" font-family="'Inter', sans-serif" font-size="30">Google Maps Review Link</text>
    </g>

    <!-- Field 3: Business Name -->
    <g transform="translate(36, 520)">
      <rect width="924" height="145" rx="14" fill="#080c0e" stroke="#1f2a30" stroke-width="2" />
      <text x="45" y="85" fill="#5a6e78" font-family="'Inter', sans-serif" font-size="30">Business Name</text>
    </g>

    <!-- Field 4: Reviewer Display Name -->
    <g transform="translate(36, 710)">
      <rect width="924" height="145" rx="14" fill="#080c0e" stroke="#1f2a30" stroke-width="2" />
      <text x="45" y="85" fill="#5a6e78" font-family="'Inter', sans-serif" font-size="30">Reviewer Display Name</text>
    </g>

    <!-- Field 5: Review Text Content (Tall) -->
    <g transform="translate(36, 900)">
      <rect width="924" height="260" rx="14" fill="#080c0e" stroke="#1f2a30" stroke-width="2" />
      <text x="45" y="85" fill="#5a6e78" font-family="'Inter', sans-serif" font-size="30">Review Text Content</text>
    </g>
  </g>

  ${svgGestureBar()}
</svg>`;
}

// ==============================================================
// SCREENSHOT 2: Case Logs Database & Review Snapshot
// ==============================================================
function generateScreenshot2() {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1080 2400" width="1080" height="2400">
  <defs>
    <style>
      @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;600;700;800&amp;family=Inter:wght@400;500;600;700;800&amp;display=swap');
    </style>
  </defs>

  <!-- Background -->
  <rect width="1080" height="2400" fill="#070a0c" />

  ${svgStatusBar("9:13", "1.27", "52")}
  ${svgAppHeader()}

  <!-- CARD 1: CASE LOGS DATABASE -->
  <g transform="translate(42, 280)">
    <rect width="996" height="660" rx="18" fill="#0d1215" stroke="#1c262c" stroke-width="2" />
    
    <!-- Title -->
    <text x="36" y="58" fill="#9cb0ba" font-family="'JetBrains Mono', monospace" font-size="28" font-weight="700" letter-spacing="3">CASE  LOGS  DATABASE</text>
    
    <!-- FIRESTORE badge -->
    <rect x="760" y="24" width="200" height="58" rx="8" fill="#121a1f" stroke="#25343d" stroke-width="2" />
    <text x="860" y="61" fill="#718694" font-family="'JetBrains Mono', monospace" font-size="22" font-weight="700" letter-spacing="2" text-anchor="middle">FIRESTORE</text>

    <!-- Case Item 1: RR-822075 -->
    <g transform="translate(36, 120)">
      <rect width="924" height="150" rx="14" fill="#080c0e" stroke="#1c262c" stroke-width="2" />
      <text x="35" y="55" fill="#38bdf8" font-family="'JetBrains Mono', monospace" font-size="30" font-weight="700">RR-822075</text>
      <text x="890" y="55" fill="#34d399" font-family="'Inter', sans-serif" font-size="26" font-weight="700" text-anchor="end">45% Confidence</text>
      <text x="35" y="105" fill="#64748b" font-family="'Inter', sans-serif" font-size="26">-</text>
    </g>

    <!-- Case Item 2: RR-539149 -->
    <g transform="translate(36, 295)">
      <rect width="924" height="160" rx="14" fill="#080c0e" stroke="#1c262c" stroke-width="2" />
      <text x="35" y="55" fill="#38bdf8" font-family="'JetBrains Mono', monospace" font-size="30" font-weight="700">RR-539149</text>
      <text x="890" y="55" fill="#34d399" font-family="'Inter', sans-serif" font-size="26" font-weight="700" text-anchor="end">45% Confidence</text>
      <text x="35" y="115" fill="#9cb0ba" font-family="'Inter', sans-serif" font-size="24">Paws're Us Dog Walkers - See what Johnathan J...</text>
    </g>
  </g>

  <!-- NOTICE BOX: Gold / Amber Legal callout -->
  <g transform="translate(42, 980)">
    <rect width="996" height="190" rx="14" fill="#120e03" stroke="#b48608" stroke-width="2" />
    <text x="36" y="48" fill="#facc15" font-family="'JetBrains Mono', monospace" font-size="24" font-weight="600" letter-spacing="1">Real Maps review removal is managed via your official</text>
    <text x="36" y="85" fill="#facc15" font-family="'JetBrains Mono', monospace" font-size="24" font-weight="600" letter-spacing="1">Google Business Profile appeals dashboard. Use this</text>
    <text x="36" y="122" fill="#facc15" font-family="'JetBrains Mono', monospace" font-size="24" font-weight="600" letter-spacing="1">console to gather legal, policy-backed appeal reports.</text>
  </g>

  <!-- METRIC CARDS ROW (3 items) -->
  <g transform="translate(42, 1210)">
    <!-- Metric 1: Case Confidence -->
    <g transform="translate(0, 0)">
      <rect width="310" height="250" rx="16" fill="#0d1215" stroke="#1c262c" stroke-width="2" />
      <text x="30" y="55" fill="#8e9fa8" font-family="'JetBrains Mono', monospace" font-size="24">Case</text>
      <text x="30" y="90" fill="#8e9fa8" font-family="'JetBrains Mono', monospace" font-size="24">Confidence</text>
      <text x="30" y="185" fill="#38bdf8" font-family="'JetBrains Mono', monospace" font-size="52" font-weight="800">--</text>
    </g>

    <!-- Metric 2: Policy Signals -->
    <g transform="translate(343, 0)">
      <rect width="310" height="250" rx="16" fill="#0d1215" stroke="#1c262c" stroke-width="2" />
      <text x="30" y="55" fill="#8e9fa8" font-family="'JetBrains Mono', monospace" font-size="24">Policy Signals</text>
      <text x="30" y="185" fill="#f87171" font-family="'JetBrains Mono', monospace" font-size="52" font-weight="800">--</text>
    </g>

    <!-- Metric 3: Estimated Queue -->
    <g transform="translate(686, 0)">
      <rect width="310" height="250" rx="16" fill="#0d1215" stroke="#1c262c" stroke-width="2" />
      <text x="30" y="55" fill="#8e9fa8" font-family="'JetBrains Mono', monospace" font-size="24">Estimated</text>
      <text x="30" y="90" fill="#8e9fa8" font-family="'JetBrains Mono', monospace" font-size="24">Queue</text>
      <text x="30" y="185" fill="#60a5fa" font-family="'JetBrains Mono', monospace" font-size="52" font-weight="800">--</text>
    </g>
  </g>

  <!-- CARD 3: TARGET REVIEW SNAPSHOT -->
  <g transform="translate(42, 1500)">
    <rect width="996" height="800" rx="18" fill="#0d1215" stroke="#1c262c" stroke-width="2" />
    
    <!-- Title -->
    <text x="36" y="58" fill="#9cb0ba" font-family="'JetBrains Mono', monospace" font-size="28" font-weight="700" letter-spacing="3">TARGET  REVIEW  SNAPSHOT</text>
    
    <!-- CASE: NOT CREATED badge -->
    <rect x="680" y="24" width="280" height="58" rx="8" fill="#121a1f" stroke="#25343d" stroke-width="2" />
    <text x="820" y="61" fill="#718694" font-family="'JetBrains Mono', monospace" font-size="22" font-weight="700" letter-spacing="2" text-anchor="middle">CASE: NOT CREATED</text>

    <!-- Target Inner Box -->
    <g transform="translate(36, 120)">
      <rect width="924" height="600" rx="16" fill="#080c0e" stroke="#1f2a30" stroke-width="2" />

      <!-- Avatar A -->
      <rect x="36" y="40" width="90" height="90" rx="18" fill="#132328" stroke="#22424b" stroke-width="2" />
      <text x="81" y="98" fill="#ffffff" font-family="'Inter', sans-serif" font-size="44" font-weight="bold" text-anchor="middle">A</text>

      <!-- Reviewer Name -->
      <text x="145" y="70" fill="#ffffff" font-family="'Inter', sans-serif" font-size="32" font-weight="700">Awaiting input</text>
      
      <!-- Stars: 1 gold, 4 hollow -->
      <g transform="translate(680, 48)">
        <text x="0" y="24" fill="#f59e0b" font-size="34">★</text>
        <text x="38" y="24" fill="#374151" font-size="34">☆</text>
        <text x="76" y="24" fill="#374151" font-size="34">☆</text>
        <text x="114" y="24" fill="#374151" font-size="34">☆</text>
        <text x="152" y="24" fill="#374151" font-size="34">☆</text>
      </g>

      <text x="145" y="112" fill="#71828d" font-family="'Inter', sans-serif" font-size="24">Local Guide  •  public visibility</text>

      <!-- Business target notice -->
      <text x="36" y="220" fill="#ffffff" font-family="'Inter', sans-serif" font-size="32" font-weight="700">Awaiting business target</text>
      <text x="36" y="275" fill="#8e9fa8" font-family="'Inter', sans-serif" font-size="28">Please provide review details or load Google</text>
      <text x="36" y="325" fill="#8e9fa8" font-family="'Inter', sans-serif" font-size="28">Places data to begin analysis.</text>

      <!-- Vertical Evidence Tag on Right -->
      <g transform="translate(835, 340)">
        <rect width="52" height="220" rx="8" fill="#06281a" stroke="#10b981" stroke-width="1.5"/>
        <text x="26" y="25" fill="#34d399" font-family="'JetBrains Mono', monospace" font-size="16" font-weight="bold" text-anchor="middle">
          <tspan x="26" dy="0">e</tspan>
          <tspan x="26" dy="20">v</tspan>
          <tspan x="26" dy="20">i</tspan>
          <tspan x="26" dy="20">d</tspan>
          <tspan x="26" dy="20">e</tspan>
          <tspan x="26" dy="20">n</tspan>
          <tspan x="26" dy="20">c</tspan>
          <tspan x="26" dy="20">e</tspan>
        </text>
      </g>
    </g>
  </g>

  ${svgGestureBar()}
</svg>`;
}

// ==============================================================
// SCREENSHOT 3: Gemini Grounded Policy Auditor & Console
// ==============================================================
function generateScreenshot3() {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1080 2400" width="1080" height="2400">
  <defs>
    <style>
      @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;600;700;800&amp;family=Inter:wght@400;500;600;700;800&amp;display=swap');
    </style>
  </defs>

  <!-- Background -->
  <rect width="1080" height="2400" fill="#070a0c" />

  ${svgStatusBar("9:13", "2.82", "52")}
  ${svgAppHeader()}

  <!-- TOP CARD: TARGET REVIEW SNAPSHOT (Partial scroll) -->
  <g transform="translate(42, 280)">
    <rect width="996" height="850" rx="18" fill="#0d1215" stroke="#1c262c" stroke-width="2" />

    <text x="36" y="58" fill="#9cb0ba" font-family="'JetBrains Mono', monospace" font-size="28" font-weight="700" letter-spacing="3">TARGET  REVIEW  SNAPSHOT</text>
    <rect x="680" y="24" width="280" height="58" rx="8" fill="#121a1f" stroke="#25343d" stroke-width="2" />
    <text x="820" y="61" fill="#718694" font-family="'JetBrains Mono', monospace" font-size="22" font-weight="700" letter-spacing="2" text-anchor="middle">CASE: NOT CREATED</text>

    <!-- Inner Card Content -->
    <g transform="translate(36, 120)">
      <rect width="924" height="680" rx="16" fill="#080c0e" stroke="#1f2a30" stroke-width="2" />

      <!-- Avatar & Reviewer -->
      <rect x="36" y="40" width="90" height="90" rx="18" fill="#132328" stroke="#22424b" stroke-width="2" />
      <text x="81" y="98" fill="#ffffff" font-family="'Inter', sans-serif" font-size="44" font-weight="bold" text-anchor="middle">A</text>
      <text x="145" y="70" fill="#ffffff" font-family="'Inter', sans-serif" font-size="32" font-weight="700">Awaiting input</text>

      <g transform="translate(680, 48)">
        <text x="0" y="24" fill="#f59e0b" font-size="34">★</text>
        <text x="38" y="24" fill="#374151" font-size="34">☆</text>
        <text x="76" y="24" fill="#374151" font-size="34">☆</text>
        <text x="114" y="24" fill="#374151" font-size="34">☆</text>
        <text x="152" y="24" fill="#374151" font-size="34">☆</text>
      </g>
      <text x="145" y="112" fill="#71828d" font-family="'Inter', sans-serif" font-size="24">Local Guide  •  public visibility</text>

      <text x="36" y="220" fill="#ffffff" font-family="'Inter', sans-serif" font-size="32" font-weight="700">Awaiting business target</text>
      <text x="36" y="275" fill="#8e9fa8" font-family="'Inter', sans-serif" font-size="28">Please provide review details or load Google</text>
      <text x="36" y="325" fill="#8e9fa8" font-family="'Inter', sans-serif" font-size="28">Places data to begin analysis.</text>

      <!-- Red Flag Tags -->
      <g transform="translate(36, 520)">
        <!-- Tag 1: possible false claim -->
        <rect x="0" y="0" width="310" height="65" rx="8" fill="#1f0a0a" stroke="#7f1d1d" stroke-width="2"/>
        <text x="155" y="42" fill="#f87171" font-family="'JetBrains Mono', monospace" font-size="22" font-weight="bold" text-anchor="middle">possible false claim</text>

        <!-- Tag 2: no matching visit record -->
        <rect x="330" y="0" width="370" height="65" rx="8" fill="#1f0a0a" stroke="#7f1d1d" stroke-width="2"/>
        <text x="515" y="42" fill="#f87171" font-family="'JetBrains Mono', monospace" font-size="22" font-weight="bold" text-anchor="middle">no matching visit record</text>
      </g>

      <!-- Vertical Green Label -->
      <g transform="translate(835, 360)">
        <rect width="52" height="280" rx="8" fill="#06281a" stroke="#10b981" stroke-width="1.5"/>
        <text x="26" y="25" fill="#34d399" font-family="'JetBrains Mono', monospace" font-size="16" font-weight="bold" text-anchor="middle">
          <tspan x="26" dy="0">e</tspan>
          <tspan x="26" dy="20">v</tspan>
          <tspan x="26" dy="20">i</tspan>
          <tspan x="26" dy="20">d</tspan>
          <tspan x="26" dy="20">e</tspan>
          <tspan x="26" dy="20">n</tspan>
          <tspan x="26" dy="20">c</tspan>
          <tspan x="26" dy="20">e</tspan>
          <tspan x="26" dy="25">a</tspan>
          <tspan x="26" dy="20">v</tspan>
          <tspan x="26" dy="20">a</tspan>
          <tspan x="26" dy="20">i</tspan>
          <tspan x="26" dy="20">l</tspan>
        </text>
      </g>
    </g>
  </g>

  <!-- CARD 2: GEMINI GROUNDED POLICY AUDITOR -->
  <g transform="translate(42, 1170)">
    <rect width="996" height="420" rx="18" fill="#0d1215" stroke="#1c262c" stroke-width="2" />
    <text x="36" y="58" fill="#9cb0ba" font-family="'JetBrains Mono', monospace" font-size="28" font-weight="700" letter-spacing="3">GEMINI  GROUNDED  POLICY  AUDITOR</text>

    <!-- ACTIVE badge -->
    <rect x="830" y="24" width="130" height="58" rx="8" fill="#06281a" stroke="#10b981" stroke-width="2" />
    <text x="895" y="61" fill="#34d399" font-family="'JetBrains Mono', monospace" font-size="22" font-weight="700" letter-spacing="2" text-anchor="middle">ACTIVE</text>

    <text x="36" y="130" fill="#9cb0ba" font-family="'JetBrains Mono', monospace" font-size="26" font-weight="500">Runs a comprehensive policy analysis using</text>
    <text x="36" y="175" fill="#9cb0ba" font-family="'JetBrains Mono', monospace" font-size="26" font-weight="500">gemini-3.5-flash integrated with official</text>
    <text x="36" y="220" fill="#9cb0ba" font-family="'JetBrains Mono', monospace" font-size="26" font-weight="500">Google Search &amp; Google Maps Guidelines.</text>

    <!-- Blue Audit Button -->
    <g transform="translate(36, 270)">
      <rect width="520" height="95" rx="12" fill="#3897f0" />
      <g transform="translate(45, 30)">
        <circle cx="12" cy="12" r="10" fill="none" stroke="#000000" stroke-width="3"/>
        <line x1="19" y1="19" x2="28" y2="28" stroke="#000000" stroke-width="3" stroke-linecap="round"/>
      </g>
      <text x="95" y="58" fill="#000000" font-family="'JetBrains Mono', monospace" font-size="26" font-weight="900" letter-spacing="2">RUN GROUNDED AI AUDIT</text>
    </g>
  </g>

  <!-- CARD 3: PROCESSING CONSOLE -->
  <g transform="translate(42, 1630)">
    <rect width="996" height="660" rx="18" fill="#0d1215" stroke="#1c262c" stroke-width="2" />
    <text x="36" y="58" fill="#9cb0ba" font-family="'JetBrains Mono', monospace" font-size="28" font-weight="700" letter-spacing="3">PROCESSING  CONSOLE</text>

    <!-- IDLE badge -->
    <rect x="850" y="24" width="110" height="58" rx="8" fill="#121a1f" stroke="#25343d" stroke-width="2" />
    <text x="905" y="61" fill="#718694" font-family="'JetBrains Mono', monospace" font-size="22" font-weight="700" letter-spacing="2" text-anchor="middle">IDLE</text>

    <!-- Progress Track -->
    <rect x="36" y="105" width="924" height="20" rx="4" fill="#080c0e" stroke="#1c262c" stroke-width="2"/>

    <!-- Terminal Box -->
    <g transform="translate(36, 155)">
      <rect width="924" height="460" rx="14" fill="#050809" stroke="#161f24" stroke-width="2" />
      <text x="40" y="65" fill="#cbd5e1" font-family="'JetBrains Mono', monospace" font-size="28" font-weight="600" letter-spacing="1">SYSTEM READY...</text>
      <text x="40" y="125" fill="#cbd5e1" font-family="'JetBrains Mono', monospace" font-size="28" font-weight="600" letter-spacing="1">Awaiting authorized access.</text>
      <text x="40" y="185" fill="#cbd5e1" font-family="'JetBrains Mono', monospace" font-size="28" font-weight="600" letter-spacing="1">ACCESS GRANTED. Console operations enabled.</text>
    </g>
  </g>

  ${svgGestureBar()}
</svg>`;
}

// ==============================================================
// SCREENSHOT 4: Policy Evidence Signals Checklist
// ==============================================================
function generateScreenshot4() {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1080 2400" width="1080" height="2400">
  <defs>
    <style>
      @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;600;700;800&amp;family=Inter:wght@400;500;600;700;800&amp;display=swap');
    </style>
  </defs>

  <!-- Background -->
  <rect width="1080" height="2400" fill="#070a0c" />

  ${svgStatusBar("9:13", "2.82", "52")}
  ${svgAppHeader()}

  <!-- TOP CARD: GEMINI GROUNDED POLICY AUDITOR (Partial view) -->
  <g transform="translate(42, 280)">
    <rect width="996" height="380" rx="18" fill="#0d1215" stroke="#1c262c" stroke-width="2" />
    <text x="36" y="58" fill="#9cb0ba" font-family="'JetBrains Mono', monospace" font-size="28" font-weight="700" letter-spacing="3">GEMINI  GROUNDED  POLICY  AUDITOR</text>
    <rect x="830" y="24" width="130" height="58" rx="8" fill="#06281a" stroke="#10b981" stroke-width="2" />
    <text x="895" y="61" fill="#34d399" font-family="'JetBrains Mono', monospace" font-size="22" font-weight="700" letter-spacing="2" text-anchor="middle">ACTIVE</text>

    <text x="36" y="125" fill="#9cb0ba" font-family="'JetBrains Mono', monospace" font-size="26" font-weight="500">Runs a comprehensive policy analysis using</text>
    <text x="36" y="165" fill="#9cb0ba" font-family="'JetBrains Mono', monospace" font-size="26" font-weight="500">gemini-3.5-flash integrated with official</text>
    <text x="36" y="205" fill="#9cb0ba" font-family="'JetBrains Mono', monospace" font-size="26" font-weight="500">Google Search &amp; Google Maps Guidelines.</text>

    <!-- Blue Audit Button -->
    <g transform="translate(36, 245)">
      <rect width="520" height="90" rx="12" fill="#3897f0" />
      <g transform="translate(45, 27)">
        <circle cx="12" cy="12" r="10" fill="none" stroke="#000000" stroke-width="3"/>
        <line x1="19" y1="19" x2="28" y2="28" stroke="#000000" stroke-width="3" stroke-linecap="round"/>
      </g>
      <text x="95" y="55" fill="#000000" font-family="'JetBrains Mono', monospace" font-size="26" font-weight="900" letter-spacing="2">RUN GROUNDED AI AUDIT</text>
    </g>
  </g>

  <!-- CARD 2: PROCESSING CONSOLE -->
  <g transform="translate(42, 700)">
    <rect width="996" height="660" rx="18" fill="#0d1215" stroke="#1c262c" stroke-width="2" />
    <text x="36" y="58" fill="#9cb0ba" font-family="'JetBrains Mono', monospace" font-size="28" font-weight="700" letter-spacing="3">PROCESSING  CONSOLE</text>
    <rect x="850" y="24" width="110" height="58" rx="8" fill="#121a1f" stroke="#25343d" stroke-width="2" />
    <text x="905" y="61" fill="#718694" font-family="'JetBrains Mono', monospace" font-size="22" font-weight="700" letter-spacing="2" text-anchor="middle">IDLE</text>

    <!-- Progress Track -->
    <rect x="36" y="105" width="924" height="20" rx="4" fill="#080c0e" stroke="#1c262c" stroke-width="2"/>

    <!-- Terminal Box -->
    <g transform="translate(36, 155)">
      <rect width="924" height="460" rx="14" fill="#050809" stroke="#161f24" stroke-width="2" />
      <text x="40" y="65" fill="#cbd5e1" font-family="'JetBrains Mono', monospace" font-size="28" font-weight="600" letter-spacing="1">SYSTEM READY...</text>
      <text x="40" y="125" fill="#cbd5e1" font-family="'JetBrains Mono', monospace" font-size="28" font-weight="600" letter-spacing="1">Awaiting authorized access.</text>
      <text x="40" y="185" fill="#cbd5e1" font-family="'JetBrains Mono', monospace" font-size="28" font-weight="600" letter-spacing="1">ACCESS GRANTED. Console operations enabled.</text>
    </g>
  </g>

  <!-- CARD 3: POLICY EVIDENCE SIGNALS -->
  <g transform="translate(42, 1400)">
    <rect width="996" height="880" rx="18" fill="#0d1215" stroke="#1c262c" stroke-width="2" />
    <text x="36" y="58" fill="#9cb0ba" font-family="'JetBrains Mono', monospace" font-size="28" font-weight="700" letter-spacing="3">POLICY  EVIDENCE  SIGNALS</text>
    
    <!-- 0/6 badge -->
    <rect x="870" y="24" width="90" height="58" rx="8" fill="#121a1f" stroke="#25343d" stroke-width="2" />
    <text x="915" y="61" fill="#718694" font-family="'JetBrains Mono', monospace" font-size="22" font-weight="700" letter-spacing="2" text-anchor="middle">0/6</text>

    <!-- Checklist Items -->
    <g transform="translate(36, 140)">
      <!-- Item 1 -->
      <g transform="translate(0, 0)">
        <rect x="0" y="0" width="30" height="30" rx="4" fill="none" stroke="#52646f" stroke-width="2.5"/>
        <text x="55" y="25" fill="#cbd5e1" font-family="'JetBrains Mono', monospace" font-size="26">Business profile ownership verified</text>
        <text x="910" y="25" fill="#52646f" font-family="'JetBrains Mono', monospace" font-size="26" text-anchor="end">--</text>
      </g>

      <!-- Item 2 -->
      <g transform="translate(0, 95)">
        <rect x="0" y="0" width="30" height="30" rx="4" fill="none" stroke="#52646f" stroke-width="2.5"/>
        <text x="55" y="25" fill="#cbd5e1" font-family="'JetBrains Mono', monospace" font-size="26">Review URL format inspected</text>
        <text x="910" y="25" fill="#52646f" font-family="'JetBrains Mono', monospace" font-size="26" text-anchor="end">--</text>
      </g>

      <!-- Item 3 -->
      <g transform="translate(0, 190)">
        <rect x="0" y="0" width="30" height="30" rx="4" fill="none" stroke="#52646f" stroke-width="2.5"/>
        <text x="55" y="25" fill="#cbd5e1" font-family="'JetBrains Mono', monospace" font-size="26">Appointment ledger cross-check complete</text>
        <text x="910" y="25" fill="#52646f" font-family="'JetBrains Mono', monospace" font-size="26" text-anchor="end">--</text>
      </g>

      <!-- Item 4 -->
      <g transform="translate(0, 285)">
        <rect x="0" y="0" width="30" height="30" rx="4" fill="none" stroke="#52646f" stroke-width="2.5"/>
        <text x="55" y="25" fill="#cbd5e1" font-family="'JetBrains Mono', monospace" font-size="26">Language risk classifier completed</text>
        <text x="910" y="25" fill="#52646f" font-family="'JetBrains Mono', monospace" font-size="26" text-anchor="end">--</text>
      </g>

      <!-- Item 5 -->
      <g transform="translate(0, 380)">
        <rect x="0" y="0" width="30" height="30" rx="4" fill="none" stroke="#52646f" stroke-width="2.5"/>
        <text x="55" y="25" fill="#cbd5e1" font-family="'JetBrains Mono', monospace" font-size="26">Policy packet assembled</text>
        <text x="910" y="25" fill="#52646f" font-family="'JetBrains Mono', monospace" font-size="26" text-anchor="end">--</text>
      </g>

      <!-- Item 6 -->
      <g transform="translate(0, 475)">
        <rect x="0" y="0" width="30" height="30" rx="4" fill="none" stroke="#52646f" stroke-width="2.5"/>
        <text x="55" y="25" fill="#cbd5e1" font-family="'JetBrains Mono', monospace" font-size="26">Simulated appeal status generated</text>
        <text x="910" y="25" fill="#52646f" font-family="'JetBrains Mono', monospace" font-size="26" text-anchor="end">--</text>
      </g>
    </g>
  </g>

  ${svgGestureBar()}
</svg>`;
}

const uploadsDir = path.resolve("./public/uploads");
const distUploadsDir = path.resolve("./dist/uploads");

if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}
if (!fs.existsSync(distUploadsDir)) {
  fs.mkdirSync(distUploadsDir, { recursive: true });
}

const screens = [
  { name: "screenshot1", gen: generateScreenshot1 },
  { name: "screenshot2", gen: generateScreenshot2 },
  { name: "screenshot3", gen: generateScreenshot3 },
  { name: "screenshot4", gen: generateScreenshot4 },
];

for (const { name, gen } of screens) {
  const svg = gen();
  // Write .svg and .png in public/uploads
  fs.writeFileSync(path.join(uploadsDir, `${name}.svg`), svg);
  fs.writeFileSync(path.join(uploadsDir, `${name}.png`), svg);

  // Also write to dist/uploads if dist exists
  fs.writeFileSync(path.join(distUploadsDir, `${name}.svg`), svg);
  fs.writeFileSync(path.join(distUploadsDir, `${name}.png`), svg);
  console.log(`Saved ${name}.svg and ${name}.png successfully`);
}
console.log("All 4 screenshot assets written!");
