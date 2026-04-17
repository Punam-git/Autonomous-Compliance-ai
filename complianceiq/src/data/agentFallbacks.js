// Pre-built fallback data — used when API call fails or key is missing.
// Demo will NEVER break during presentation.

export const CIRCULAR = {
  source: "Reserve Bank of India",
  date: "April 10, 2025",
  circular_no: "RBI/2025-26/15",
  title: "Digital Lending — Revised Interest Rate Disclosure Norms",
  changes_summary: "5 key changes from 2022 guidelines",
  content: `1. Interest disclosure: ANNUAL → MONTHLY mandatory
2. Grievance redressal: 30 days → 15 days
3. Recovery agents: No restriction → 8AM-7PM only
4. Prepayment penalty: 2% allowed → ABOLISHED (floating rate)
5. Video KYC: Optional → Mandatory for loans above ₹2 lakhs
Effective: June 1, 2025
Applicable: All NBFCs, Digital Lending Apps`,
}

export const FALLBACK_AGENT2 = {
  changes: [
    { clause: "Interest Rate Disclosure",  old_rule: "Disclosed annually in loan statement",          new_rule: "Monthly disclosure mandatory in all communications",    severity: "HIGH",   impact: "Requires system changes to all loan statements and app UI" },
    { clause: "Grievance Redressal",       old_rule: "Resolved within 30 working days",               new_rule: "Resolved within 15 working days",                      severity: "HIGH",   impact: "Doubles operational load on grievance team" },
    { clause: "Recovery Agent Timing",     old_rule: "No restriction on contact hours",               new_rule: "Contact only between 8AM–7PM",                         severity: "HIGH",   impact: "Recovery policy and agent training must be updated" },
    { clause: "Prepayment Penalty",        old_rule: "Up to 2% penalty on floating rate loans",       new_rule: "Prepayment penalty abolished for floating rate loans",  severity: "MEDIUM", impact: "Revenue impact — prepayment fee income eliminated" },
    { clause: "Video KYC",                 old_rule: "Optional at lender discretion",                 new_rule: "Mandatory for all loans above ₹2 lakhs",               severity: "MEDIUM", impact: "Tech infrastructure upgrade required for video KYC" },
  ],
  total_changes: 5,
  deadline: "June 1, 2025",
  summary: "RBI tightens digital lending norms with stricter disclosure, faster grievance resolution, and mandatory video KYC.",
}

export const FALLBACK_AGENT3 = {
  affected_documents: [
    { document: "Loan Agreement v3.2",    clause: "Clause 4.2",  current_text: "Interest disclosed in annual statement",          needs_update: true, priority: "URGENT" },
    { document: "Loan Agreement v3.2",    clause: "Clause 7.8",  current_text: "Grievances resolved in 30 working days",          needs_update: true, priority: "URGENT" },
    { document: "Loan Agreement v3.2",    clause: "Clause 9.1",  current_text: "Prepayment penalty 1.5% on floating loans",       needs_update: true, priority: "HIGH"   },
    { document: "Loan Agreement v3.2",    clause: "Clause 12.3", current_text: "Video KYC at lender discretion above ₹5L",        needs_update: true, priority: "HIGH"   },
    { document: "Recovery Policy 2023",   clause: "Section 3.4", current_text: "Agents contact between 7AM–9PM",                  needs_update: true, priority: "URGENT" },
  ],
  risk_score: 78,
  financial_exposure: "₹2.3Cr – ₹5Cr",
  days_to_comply: 52,
  top_actions: [
    "Update Loan Agreement v3.2 clauses 4.2, 7.8, 9.1, 12.3 immediately",
    "Retrain all recovery agents on 8AM–7PM contact restriction",
    "Deploy video KYC infrastructure for loans above ₹2 lakhs",
  ],
}

export const FALLBACK_AGENT4 = {
  amendments: [
    {
      document: "Loan Agreement v3.2",
      clause: "Clause 4.2",
      old_text: "The rate of interest applicable to this loan shall be disclosed to the Borrower in the annual loan statement issued by the Lender.",
      new_text: "The rate of interest applicable to this loan, expressed as Annual Percentage Rate (APR), shall be disclosed to the Borrower in every monthly communication, loan statement, and digital notification issued by the Lender, in accordance with RBI Circular RBI/2025-26/15 effective June 1, 2025.",
      reason: "RBI mandates monthly interest disclosure replacing annual disclosure",
    },
    {
      document: "Loan Agreement v3.2",
      clause: "Clause 7.8",
      old_text: "All grievances raised by the Borrower shall be acknowledged within 5 working days and resolved within 30 working days from the date of receipt.",
      new_text: "All grievances raised by the Borrower shall be acknowledged within 2 working days and resolved within 15 working days from the date of receipt, in compliance with RBI Digital Lending Guidelines RBI/2025-26/15.",
      reason: "RBI reduces grievance resolution window from 30 to 15 working days",
    },
    {
      document: "Loan Agreement v3.2",
      clause: "Clause 9.1",
      old_text: "In the event of prepayment of a floating rate loan, the Borrower shall be liable to pay a prepayment penalty of 1.5% (one point five percent) of the outstanding principal amount.",
      new_text: "No prepayment penalty shall be levied on the Borrower for prepayment of floating rate loans. This clause stands amended in accordance with RBI Circular RBI/2025-26/15, effective June 1, 2025.",
      reason: "RBI abolishes prepayment penalty on floating rate loans",
    },
    {
      document: "Recovery Policy 2023",
      clause: "Section 3.4",
      old_text: "Recovery agents and collection executives are authorised to contact borrowers between 7:00 AM and 9:00 PM on any day of the week.",
      new_text: "Recovery agents and collection executives are authorised to contact borrowers strictly between 8:00 AM and 7:00 PM only, on any day of the week. Contact outside these hours is prohibited and constitutes a violation of RBI/2025-26/15.",
      reason: "RBI restricts recovery agent contact hours to 8AM–7PM",
    },
  ],
  checklist: [
    "Obtain Board approval for amended Loan Agreement v3.2",
    "Retrain all recovery agents and obtain signed acknowledgement",
    "Update digital lending app UI for monthly interest display",
    "Deploy video KYC system for loans above ₹2 lakhs",
    "File compliance certificate with RBI by May 25, 2025",
  ],
  lawyer_review_needed: true,
  implementation_days: 45,
}
