// claudeApi.js — Claude API calls via OpenAI-compatible proxy or direct fetch.
// Falls back to pre-built data if API key missing or call fails.

import { FALLBACK_AGENT2, FALLBACK_AGENT3, FALLBACK_AGENT4 } from '../data/agentFallbacks'

const API_KEY = import.meta.env.VITE_CLAUDE_API_KEY || ''
const MODEL   = 'claude-3-5-sonnet-20241022'

async function callClaude(system, user) {
  if (!API_KEY) throw new Error('No API key')

  const res = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type':         'application/json',
      'x-api-key':            API_KEY,
      'anthropic-version':    '2023-06-01',
      'anthropic-dangerous-direct-browser-access': 'true',
    },
    body: JSON.stringify({
      model: MODEL,
      max_tokens: 1500,
      system,
      messages: [{ role: 'user', content: user }],
    }),
  })

  if (!res.ok) throw new Error(`API ${res.status}`)
  const data = await res.json()
  const text = data.content?.[0]?.text ?? ''

  // Strip markdown fences if present
  const cleaned = text.replace(/^```[a-z]*\n?/m, '').replace(/\n?```$/m, '').trim()
  return JSON.parse(cleaned)
}

// ── Agent 2: ChangeDetect ─────────────────────────────────────────────────────

export async function runChangeDetect() {
  try {
    return await callClaude(
      'You are a legal compliance expert AI agent analyzing Indian regulatory documents. Return ONLY valid JSON, no markdown.',
      `Compare these two regulatory documents and identify ALL changes.

OLD GUIDELINES (RBI Digital Lending 2022):
- Interest disclosed annually
- Grievance redressal: 30 days
- No restriction on recovery agent timing
- Prepayment penalty: up to 2% for floating rate loans
- Video KYC: optional

NEW CIRCULAR (RBI 2025):
- Interest disclosure: Monthly mandatory
- Grievance redressal: 15 days
- Recovery agents: 8AM to 7PM only
- Prepayment penalty: Abolished for floating rate
- Video KYC: Mandatory for loans above ₹2 lakhs
- Effective: June 1, 2025

Return this exact JSON:
{"changes":[{"clause":"clause name","old_rule":"what it was","new_rule":"what it is now","severity":"HIGH or MEDIUM or LOW","impact":"why this matters"}],"total_changes":5,"deadline":"June 1 2025","summary":"one line summary"}`
    )
  } catch {
    return FALLBACK_AGENT2
  }
}

// ── Agent 3: ImpactMap ────────────────────────────────────────────────────────

export async function runImpactMap(agent2Output) {
  try {
    return await callClaude(
      'You are a business impact analyst for Indian financial regulations. Return ONLY valid JSON, no markdown.',
      `Based on these regulatory changes, analyze impact on Mahindra Finance.

CHANGES DETECTED: ${JSON.stringify(agent2Output)}

MAHINDRA FINANCE DOCUMENTS:
Loan Agreement v3.2:
- Clause 4.2: Interest disclosed in annual statement
- Clause 7.8: Grievances resolved in 30 working days
- Clause 9.1: Prepayment penalty 1.5% on floating loans
- Clause 12.3: Video KYC at lender discretion above ₹5L
Recovery Policy 2023:
- Section 3.4: Agents contact between 7AM-9PM
- Section 5.1: Digital reminders anytime

Return ONLY this JSON:
{"affected_documents":[{"document":"document name","clause":"clause number","current_text":"what it says","needs_update":true,"priority":"URGENT or HIGH or MEDIUM"}],"risk_score":78,"financial_exposure":"₹2.3Cr - ₹5Cr","days_to_comply":52,"top_actions":["action1","action2","action3"]}`
    )
  } catch {
    return FALLBACK_AGENT3
  }
}

// ── Agent 4: LegalDraft ───────────────────────────────────────────────────────

export async function runLegalDraft(agent3Output) {
  try {
    return await callClaude(
      'You are a legal drafting expert for Indian financial regulations. Return ONLY valid JSON, no markdown.',
      `Draft amendment text for these affected clauses. Write realistic legal language.

AFFECTED CLAUSES: ${JSON.stringify(agent3Output)}
REGULATORY REQUIREMENT: RBI/2025-26/15
COMPANY: Mahindra Finance

For each clause provide amendment in this JSON:
{"amendments":[{"document":"document name","clause":"clause number","old_text":"current text","new_text":"legally drafted new text","reason":"why changed"}],"checklist":["step1","step2","step3"],"lawyer_review_needed":true,"implementation_days":45}`
    )
  } catch {
    return FALLBACK_AGENT4
  }
}
