export const predictionsData = {
  mahindra: {
    forecasts: [
      { month: 'Apr 2025', regulation: 'NBFC Risk Weight RBI',   probability: 78, reason: '4/5 years post-budget' },
      { month: 'Jun 2025', regulation: 'FAME III Policy',         probability: 74, reason: 'Post-budget EV policy pattern' },
      { month: 'Aug 2025', regulation: 'EV Battery Recycling',    probability: 61, reason: 'Ministry Q3 pattern' },
    ],
    patternEvidence: [
      { year: 2020, occurred: true,  outcome: 'CAFE Phase 1 notified post-budget' },
      { year: 2021, occurred: true,  outcome: 'FAME II subsidy revision issued' },
      { year: 2022, occurred: true,  outcome: 'CAFE tightened — ₹230L penalty' },
      { year: 2023, occurred: false, outcome: 'Election year — delayed' },
      { year: 2024, occurred: true,  outcome: 'EV Battery Certification circular' },
    ],
    patternLabel: 'Post-Budget RBI/MoRTH Circular Pattern',
  },
  hdfc: {
    forecasts: [
      { month: 'May 2025', regulation: 'LCR Tightening',          probability: 73, reason: 'Annual RBI review pattern' },
      { month: 'Jul 2025', regulation: 'KYC Digital Mandate',     probability: 67, reason: 'Digital push pattern' },
      { month: 'Sep 2025', regulation: 'Basel IV Framework',      probability: 81, reason: 'RBI consultation 2024' },
    ],
    patternEvidence: [
      { year: 2020, occurred: true,  outcome: 'RBI COVID moratorium circular' },
      { year: 2021, occurred: true,  outcome: 'Digital lending guidelines issued' },
      { year: 2022, occurred: true,  outcome: 'KYC non-compliance notice' },
      { year: 2023, occurred: false, outcome: 'Election year — delayed' },
      { year: 2024, occurred: true,  outcome: 'LCR + Basel III circular' },
    ],
    patternLabel: 'Annual RBI Banking Supervision Circular Pattern',
  },
  infosys: {
    forecasts: [
      { month: 'Apr 2025', regulation: 'DPDP Rules Final',        probability: 88, reason: 'Act passed 2023, rules pending' },
      { month: 'Jun 2025', regulation: 'SEBI BRSR Phase 2',       probability: 72, reason: 'Annual SEBI ESG update' },
      { month: 'Sep 2025', regulation: 'CERT-In AI Framework',    probability: 58, reason: 'AI regulation wave' },
    ],
    patternEvidence: [
      { year: 2020, occurred: true,  outcome: 'SEBI LODR amendments notified' },
      { year: 2021, occurred: true,  outcome: 'IT Act data handling circular' },
      { year: 2022, occurred: true,  outcome: 'CERT-In cybersecurity directions' },
      { year: 2023, occurred: false, outcome: 'Election year — delayed' },
      { year: 2024, occurred: true,  outcome: 'DPDP Act preparation circular' },
    ],
    patternLabel: 'Annual SEBI/MeitY IT Compliance Pattern',
  },
  adani: {
    forecasts: [
      { month: 'Apr 2025', regulation: 'SEBI BRSR Mandatory',     probability: 92, reason: 'SEBI ESG roadmap' },
      { month: 'Jul 2025', regulation: 'MoEFCC Carbon Report',    probability: 84, reason: 'Net-zero 2070 annual push' },
      { month: 'Oct 2025', regulation: 'Green Taxonomy Compliance',probability: 71, reason: 'Dec 2024 taxonomy published' },
    ],
    patternEvidence: [
      { year: 2020, occurred: true,  outcome: 'SEBI LODR investigation begins' },
      { year: 2021, occurred: true,  outcome: 'Environmental clearance norms' },
      { year: 2022, occurred: true,  outcome: 'SEBI show cause notices issued' },
      { year: 2023, occurred: false, outcome: 'Election year — delayed' },
      { year: 2024, occurred: true,  outcome: 'ESG mandate + BRSR Core circular' },
    ],
    patternLabel: 'Annual SEBI ESG + MoEFCC Enforcement Pattern',
  },
  sunpharma: {
    forecasts: [
      { month: 'May 2025', regulation: 'NPPA Pricing Expansion',  probability: 69, reason: 'Expands every 2 years' },
      { month: 'Jun 2025', regulation: 'Schedule M Deadline',     probability: 95, reason: 'Already notified Dec 2024' },
      { month: 'Sep 2025', regulation: 'CDSCO Track & Trace',     probability: 62, reason: '3-year pattern' },
    ],
    patternEvidence: [
      { year: 2020, occurred: true,  outcome: 'CDSCO COVID fast-track circular' },
      { year: 2021, occurred: true,  outcome: 'Schedule M GMP revision notified' },
      { year: 2022, occurred: true,  outcome: 'DEG contamination industry alert' },
      { year: 2023, occurred: false, outcome: 'Election year — delayed' },
      { year: 2024, occurred: true,  outcome: 'Revised Schedule M GMP circular' },
    ],
    patternLabel: 'Annual CDSCO/NPPA Pharma Regulation Pattern',
  },
}

export const financialData = {
  mahindra: {
    full:    { costLow: 45,  costHigh: 80,  saves: 230, net: '+₹1.5Cr',  netVal: 150,  risk: null,         riskNote: null,                    warning: null },
    partial: { costLow: 28,  costHigh: 28,  saves: null, net: null,       netVal: -80,  risk: '₹80L–1.4Cr', riskNote: 'Partial penalty exposure', warning: 'Moderate risk' },
    none:    { costLow: 0,   costHigh: 0,   saves: null, net: null,       netVal: -300, risk: '₹2.3Cr–5Cr', riskNote: 'License review risk',      warning: 'Critical' },
  },
  hdfc: {
    full:    { costLow: 200, costHigh: 400, saves: 1500, net: '+₹11Cr',  netVal: 1100, risk: null,          riskNote: null,                    warning: null },
    partial: { costLow: 120, costHigh: 120, saves: null, net: null,       netVal: -500, risk: '₹5Cr–8Cr',   riskNote: 'Partial penalty exposure', warning: 'Moderate risk' },
    none:    { costLow: 0,   costHigh: 0,   saves: null, net: null,       netVal: -1150,risk: '₹8Cr–15Cr',  riskNote: 'RBI PCA possible',         warning: 'Critical' },
  },
  infosys: {
    full:    { costLow: 120, costHigh: 250, saves: 1200, net: '+₹9.5Cr', netVal: 950,  risk: null,          riskNote: null,                    warning: null },
    partial: { costLow: 70,  costHigh: 70,  saves: null, net: null,       netVal: -300, risk: '₹3Cr–6Cr',   riskNote: 'Partial penalty exposure', warning: 'Moderate risk' },
    none:    { costLow: 0,   costHigh: 0,   saves: null, net: null,       netVal: -850, risk: '₹5Cr–12Cr',  riskNote: 'Client contracts at risk',  warning: 'Critical' },
  },
  adani: {
    full:    { costLow: 300, costHigh: 600, saves: 2500, net: '+₹19Cr',  netVal: 1900, risk: null,          riskNote: null,                    warning: null },
    partial: { costLow: 180, costHigh: 180, saves: null, net: null,       netVal: -800, risk: '₹8Cr–15Cr',  riskNote: 'Partial penalty exposure', warning: 'Moderate risk' },
    none:    { costLow: 0,   costHigh: 0,   saves: null, net: null,       netVal: -1750,risk: '₹10Cr–25Cr', riskNote: 'Project clearances at risk',warning: 'Critical' },
  },
  sunpharma: {
    full:    { costLow: 80,  costHigh: 150, saves: 700,  net: '+₹5.5Cr', netVal: 550,  risk: null,          riskNote: null,                    warning: null },
    partial: { costLow: 50,  costHigh: 50,  saves: null, net: null,       netVal: -200, risk: '₹2Cr–4Cr',   riskNote: 'Partial penalty exposure', warning: 'Moderate risk' },
    none:    { costLow: 0,   costHigh: 0,   saves: null, net: null,       netVal: -500, risk: '₹3Cr–7Cr',   riskNote: 'Export license at risk',    warning: 'Critical' },
  },
}
