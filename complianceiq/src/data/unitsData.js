export const unitsData = {
  mahindra: {
    units: [
      { name: 'EV Division',      risk: 87, regulation: 'FAME III + Battery Norms',    action: 'Certify battery packs under new norms',     owner: 'EV Head',          priority: 'High'   },
      { name: 'NBFC Arm',         risk: 65, regulation: 'RBI Digital Lending',          action: 'Update loan app disclosures',               owner: 'Fin-Tech Lead',    priority: 'Medium' },
      { name: 'Export Division',  risk: 34, regulation: 'FEMA + MCA',                   action: 'Quarterly FEMA filings on track',           owner: 'CFO Office',       priority: 'Low'    },
      { name: 'Tractor Division', risk: 22, regulation: 'BEE CAFE Norms',               action: 'Star rating compliance maintained',         owner: 'Product Head',     priority: 'Low'    },
    ],
  },
  hdfc: {
    units: [
      { name: 'Corporate Banking',  risk: 91, regulation: 'Basel IV + Large Exposure',  action: 'Capital buffer increase required',          owner: 'Risk Head',        priority: 'High'   },
      { name: 'Retail Banking',     risk: 73, regulation: 'KYC/AML + Digital Lending',  action: 'Digital KYC upgrade for ₹2L+ loans',       owner: 'Retail Head',      priority: 'High'   },
      { name: 'HDFC Life',          risk: 45, regulation: 'IRDAI regulations',           action: 'Annual IRDAI filing submitted',             owner: 'Insurance Head',   priority: 'Medium' },
      { name: 'Wealth Management',  risk: 38, regulation: 'SEBI PMS norms',              action: 'PMS disclosure update pending',            owner: 'Wealth Head',      priority: 'Low'    },
    ],
  },
  infosys: {
    units: [
      { name: 'EU Delivery',    risk: 89, regulation: 'GDPR + DPDP cross-compliance',   action: 'Data residency audit required',             owner: 'EU DPO',           priority: 'High'   },
      { name: 'Cloud Division', risk: 78, regulation: 'CERT-In Cloud Security',          action: '6-hr incident reporting setup',            owner: 'Cloud CISO',       priority: 'High'   },
      { name: 'US Delivery',    risk: 61, regulation: 'CCPA + SEC disclosures',          action: 'CCPA opt-out flows implemented',           owner: 'US Legal',         priority: 'Medium' },
      { name: 'India Ops',      risk: 52, regulation: 'DPDP Implementation',             action: 'Consent manager deployment',               owner: 'India DPO',        priority: 'Medium' },
    ],
  },
  adani: {
    units: [
      { name: 'Adani Green Energy', risk: 94, regulation: 'ESG + Green Taxonomy + SEC', action: 'SEC disclosure + taxonomy mapping',        owner: 'ESG Head',         priority: 'High'   },
      { name: 'Adani Ports',        risk: 71, regulation: 'MoEFCC + SEBI LODR',         action: 'Environmental impact report due',          owner: 'Ports Compliance', priority: 'High'   },
      { name: 'Adani Cement',       risk: 68, regulation: 'Carbon Emission Norms',       action: 'Carbon accounting system setup',           owner: 'Cement Head',      priority: 'Medium' },
      { name: 'Adani Airports',     risk: 42, regulation: 'DGCA + MCA filings',          action: 'MCA annual filing on track',               owner: 'Airport CFO',      priority: 'Low'    },
    ],
  },
  sunpharma: {
    units: [
      { name: 'Domestic Formulations', risk: 83, regulation: 'NPPA Pricing + CDSCO GMP', action: 'GMP audit scheduled Q2',                 owner: 'QA Head',          priority: 'High'   },
      { name: 'API Division',          risk: 76, regulation: 'Schedule M + WHO GMP',      action: 'WHO pre-qualification renewal',          owner: 'API Head',         priority: 'High'   },
      { name: 'Export Markets',        risk: 59, regulation: 'US FDA + EU EMA',            action: 'FDA inspection readiness review',        owner: 'Regulatory Head',  priority: 'Medium' },
      { name: 'R&D Division',          risk: 31, regulation: 'Clinical trial regulations', action: 'CDSCO trial registration current',      owner: 'R&D Head',         priority: 'Low'    },
    ],
  },
}

export const actionPlans = {
  mahindra: {
    amendment: {
      clause: 'Section 4.2 — EV Subsidy Eligibility',
      old: 'Electric vehicles with battery capacity above 15 kWh shall be eligible for FAME II subsidy of ₹10,000 per kWh subject to local value addition of 40%.',
      new: 'Electric vehicles with battery capacity above 10 kWh shall be eligible for FAME III subsidy of ₹15,000 per kWh subject to local value addition of 60% and mandatory battery recycling certification.',
    },
    tasks: [
      { week: '1–2',   task: 'Brief Legal team on FAME III implications',                    owner: 'Legal Head',          priority: 'High'   },
      { week: '3–4',   task: 'Review all EV loan agreements for compliance gaps',            owner: 'CA Team',             priority: 'High'   },
      { week: '5–6',   task: 'Update Mahindra Finance digital loan app disclosures',         owner: 'Tech Team',           priority: 'High'   },
      { week: '7–8',   task: 'Retrain recovery agents on new call timing rules',             owner: 'HR',                  priority: 'Medium' },
      { week: '9–10',  task: 'Internal compliance audit',                                    owner: 'Compliance Officer',  priority: 'Medium' },
      { week: '11–12', task: 'Submit revised documentation to RBI/MHI',                     owner: 'CFO',                 priority: 'High'   },
    ],
  },
  hdfc: {
    amendment: {
      clause: 'Section 7.1 — Liquidity Coverage Ratio',
      old: 'Banks shall maintain a minimum Liquidity Coverage Ratio (LCR) of 100% calculated on a 30-day stress scenario using Level 1 and Level 2 assets.',
      new: 'Banks shall maintain a minimum Liquidity Coverage Ratio (LCR) of 110% calculated on a 30-day stress scenario. Retail deposits shall be weighted at 95% run-off rate. Digital banking deposits above ₹2 lakh shall be classified as non-operational.',
    },
    tasks: [
      { week: '1–2',   task: 'Capital adequacy gap analysis vs Basel IV',                   owner: 'Risk Team',           priority: 'High'   },
      { week: '3–4',   task: 'Update all loan agreement templates',                          owner: 'Legal Team',          priority: 'High'   },
      { week: '5–6',   task: 'Digital KYC system upgrade for ₹2L+ loans',                  owner: 'Tech Team',           priority: 'High'   },
      { week: '7–8',   task: 'Recovery team training on new timings',                       owner: 'HR',                  priority: 'Medium' },
      { week: '9–10',  task: 'Board presentation on capital requirements',                  owner: 'CFO',                 priority: 'High'   },
      { week: '11–12', task: 'RBI filing preparation',                                      owner: 'Compliance Head',     priority: 'High'   },
    ],
  },
  infosys: {
    amendment: {
      clause: 'Section 3.4 — Data Breach Reporting',
      old: 'Significant data breaches affecting more than 1,000 individuals must be reported to CERT-In within 72 hours of discovery.',
      new: 'All data breaches regardless of scale must be reported to CERT-In within 6 hours of discovery. Organisations must maintain logs for 180 days and provide system access to CERT-In upon request.',
    },
    tasks: [
      { week: '1–2',   task: 'Map all personal data flows under DPDP Act',                  owner: 'DPO',                 priority: 'High'   },
      { week: '3–4',   task: 'Deploy consent management platform',                          owner: 'Tech Team',           priority: 'High'   },
      { week: '5–6',   task: 'Update client contracts with DPDP clauses',                   owner: 'Legal Team',          priority: 'High'   },
      { week: '7–8',   task: 'CERT-In 6-hour incident response drill',                      owner: 'CISO',                priority: 'Medium' },
      { week: '9–10',  task: 'BRSR Core ESG data collection',                               owner: 'ESG Lead',            priority: 'Medium' },
      { week: '11–12', task: 'SEBI BRSR filing submission',                                 owner: 'CFO',                 priority: 'High'   },
    ],
  },
  adani: {
    amendment: {
      clause: 'Section 12.1 — ESG Disclosure Requirements',
      old: 'Listed entities with market capitalisation above ₹1,000 crore shall submit Business Responsibility Report (BRR) annually covering environmental and social parameters.',
      new: 'Listed entities in top 1,000 by market cap shall submit BRSR Core with assured ESG metrics including Scope 1, 2, and 3 emissions, water intensity, and supply chain due diligence. Third-party assurance mandatory from FY2025.',
    },
    tasks: [
      { week: '1–2',   task: 'Engage Big-4 for BRSR Core assurance mandate',                owner: 'ESG Head',            priority: 'High'   },
      { week: '3–4',   task: 'Scope 1, 2, 3 emissions data collection across entities',     owner: 'Sustainability Team', priority: 'High'   },
      { week: '5–6',   task: 'SEBI LODR related-party disclosure review',                   owner: 'Legal Head',          priority: 'High'   },
      { week: '7–8',   task: 'Green taxonomy mapping for Adani Green assets',               owner: 'Finance Team',        priority: 'Medium' },
      { week: '9–10',  task: 'MoEFCC carbon report data compilation',                       owner: 'Environment Head',    priority: 'High'   },
      { week: '11–12', task: 'Board approval and SEBI filing',                              owner: 'CFO',                 priority: 'High'   },
    ],
  },
  sunpharma: {
    amendment: {
      clause: 'Schedule M — Good Manufacturing Practices',
      old: 'Pharmaceutical manufacturers shall maintain clean room standards as per WHO GMP guidelines 2003 with annual internal audits and triennial CDSCO inspection.',
      new: 'Pharmaceutical manufacturers shall comply with revised Schedule M (2023) incorporating ICH Q10 Pharmaceutical Quality System. Annual third-party GMP audits mandatory. CDSCO inspection cycle reduced to 18 months. Risk-based inspection approach for export-oriented units.',
    },
    tasks: [
      { week: '1–2',   task: 'Gap analysis: current GMP vs revised Schedule M',             owner: 'QA Head',             priority: 'High'   },
      { week: '3–4',   task: 'Plant infrastructure upgrade plan for ICH Q10',               owner: 'Manufacturing Head',  priority: 'High'   },
      { week: '5–6',   task: 'NPPA pricing compliance review for controlled drugs',         owner: 'Regulatory Head',     priority: 'High'   },
      { week: '7–8',   task: 'WHO GMP pre-qualification renewal for API division',          owner: 'API Head',            priority: 'Medium' },
      { week: '9–10',  task: 'CDSCO Track & Trace system integration',                     owner: 'Tech Team',           priority: 'Medium' },
      { week: '11–12', task: 'Submit revised GMP compliance certificate to CDSCO',         owner: 'Compliance Head',     priority: 'High'   },
    ],
  },
}
