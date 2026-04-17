export const companiesData = {
  mahindra: {
    name: "Mahindra & Mahindra", sector: "Auto / EV", icon: "🚗",
    history: [
      { year: 2020, compliance_rate: 91,  circulars: 23, penalty_lakhs: 45,   event: "CAFE Norms Phase 1" },
      { year: 2021, compliance_rate: 100, circulars: 19, penalty_lakhs: 0,    event: "Full compliance year" },
      { year: 2022, compliance_rate: 84,  circulars: 31, penalty_lakhs: 230,  event: "CAFE tightened — ₹230L penalty" },
      { year: 2023, compliance_rate: 87,  circulars: 38, penalty_lakhs: 180,  event: "FAME II + RBI Digital Lending" },
      { year: 2024, compliance_rate: 91,  circulars: 44, penalty_lakhs: 120,  event: "EV Battery Certification" },
    ],
    circulars: [
      { year: 2024, circular: "CAFE Phase II Emission Norms",         severity: "High",   action: "Engineering redesign",    penalty: "₹120L" },
      { year: 2023, circular: "FAME II Subsidy Compliance",           severity: "High",   action: "Subsidy audit submitted", penalty: "₹180L" },
      { year: 2023, circular: "RBI Digital Lending Guidelines",       severity: "Medium", action: "Finserv arm updated",     penalty: "—" },
      { year: 2022, circular: "CAFE Norms Tightening",                severity: "High",   action: "Partial compliance",      penalty: "₹230L" },
    ],
  },
  hdfc: {
    name: "HDFC Bank", sector: "Banking", icon: "🏦",
    history: [
      { year: 2020, compliance_rate: 97, circulars: 67,  penalty_lakhs: 180, event: "COVID Moratorium compliance" },
      { year: 2021, compliance_rate: 98, circulars: 58,  penalty_lakhs: 75,  event: "Digital banking + NBFC norms" },
      { year: 2022, compliance_rate: 94, circulars: 89,  penalty_lakhs: 420, event: "KYC failures + Credit card norms" },
      { year: 2023, compliance_rate: 95, circulars: 102, penalty_lakhs: 310, event: "Cybersecurity framework" },
      { year: 2024, compliance_rate: 97, circulars: 118, penalty_lakhs: 265, event: "LCR + Basel III" },
    ],
    circulars: [
      { year: 2024, circular: "LCR + Basel III Capital Adequacy",     severity: "High",   action: "Capital buffer increased", penalty: "₹265L" },
      { year: 2023, circular: "RBI Cybersecurity Framework",          severity: "High",   action: "SOC upgraded",             penalty: "₹310L" },
      { year: 2022, circular: "KYC Non-Compliance Notice",            severity: "High",   action: "KYC re-verification drive",penalty: "₹420L" },
      { year: 2021, circular: "Digital Lending Guidelines",           severity: "Medium", action: "Policy updated",           penalty: "₹75L" },
    ],
  },
  infosys: {
    name: "Infosys", sector: "IT / Data", icon: "💻",
    history: [
      { year: 2020, compliance_rate: 100, circulars: 14, penalty_lakhs: 0,  event: "SEBI LODR amendments" },
      { year: 2021, compliance_rate: 100, circulars: 18, penalty_lakhs: 0,  event: "IT Act + data handling" },
      { year: 2022, compliance_rate: 92,  circulars: 26, penalty_lakhs: 85, event: "CERT-In Cybersecurity Directions" },
      { year: 2023, compliance_rate: 97,  circulars: 31, penalty_lakhs: 45, event: "SEBI BRSR Core mandatory" },
      { year: 2024, compliance_rate: 97,  circulars: 38, penalty_lakhs: 30, event: "DPDP Act preparation" },
    ],
    circulars: [
      { year: 2024, circular: "DPDP Act Rules (Draft)",               severity: "High",   action: "Data governance overhaul", penalty: "₹30L" },
      { year: 2023, circular: "SEBI BRSR Core Mandatory",             severity: "Medium", action: "ESG report published",     penalty: "₹45L" },
      { year: 2022, circular: "CERT-In Cybersecurity Directions",     severity: "High",   action: "6hr reporting implemented",penalty: "₹85L" },
      { year: 2020, circular: "SEBI LODR Amendments",                 severity: "Low",    action: "Disclosures updated",      penalty: "—" },
    ],
  },
  adani: {
    name: "Adani Group", sector: "Infrastructure", icon: "🏗️",
    history: [
      { year: 2020, compliance_rate: 93, circulars: 42, penalty_lakhs: 210,  event: "SEBI LODR investigation begins" },
      { year: 2021, compliance_rate: 90, circulars: 51, penalty_lakhs: 380,  event: "Environmental clearance delays" },
      { year: 2022, compliance_rate: 87, circulars: 67, penalty_lakhs: 920,  event: "SEBI show cause notices" },
      { year: 2023, compliance_rate: 83, circulars: 78, penalty_lakhs: 1840, event: "Hindenburg + SEBI probe" },
      { year: 2024, compliance_rate: 88, circulars: 84, penalty_lakhs: 1240, event: "ESG mandate + BRSR Core" },
    ],
    circulars: [
      { year: 2024, circular: "SEBI ESG + BRSR Core Mandate",         severity: "High",   action: "ESG framework initiated",  penalty: "₹1240L" },
      { year: 2023, circular: "SEBI Show Cause — Related Party",      severity: "High",   action: "Legal response filed",     penalty: "₹1840L" },
      { year: 2022, circular: "Environmental Clearance Norms",        severity: "High",   action: "Partial compliance",       penalty: "₹920L" },
      { year: 2021, circular: "SEBI LODR Disclosure Norms",           severity: "Medium", action: "Delayed disclosures",      penalty: "₹380L" },
    ],
  },
  sunpharma: {
    name: "Sun Pharma", sector: "Pharma", icon: "💊",
    history: [
      { year: 2020, compliance_rate: 97, circulars: 29, penalty_lakhs: 35,  event: "CDSCO COVID fast-track" },
      { year: 2021, compliance_rate: 94, circulars: 34, penalty_lakhs: 75,  event: "Schedule M GMP revision" },
      { year: 2022, compliance_rate: 90, circulars: 41, penalty_lakhs: 180, event: "DEG contamination industry crisis" },
      { year: 2023, compliance_rate: 94, circulars: 48, penalty_lakhs: 140, event: "Jan Vishwas Act + NPPA" },
      { year: 2024, compliance_rate: 94, circulars: 52, penalty_lakhs: 110, event: "Revised Schedule M GMP" },
    ],
    circulars: [
      { year: 2024, circular: "Revised Schedule M GMP Norms",         severity: "High",   action: "Plant upgrades initiated", penalty: "₹110L" },
      { year: 2023, circular: "NPPA Pricing Control Order",           severity: "High",   action: "Price revision submitted", penalty: "₹140L" },
      { year: 2022, circular: "CDSCO DEG Contamination Alert",        severity: "High",   action: "Batch recall executed",    penalty: "₹180L" },
      { year: 2021, circular: "Schedule M GMP Revision",              severity: "Medium", action: "SOP updated",              penalty: "₹75L" },
    ],
  },
}
