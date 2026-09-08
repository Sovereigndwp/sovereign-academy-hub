# Memory

> **Canonical context — read first.** The brain of The Sovereign Academy lives in the **TSA** repo (`~/Documents/Claude/Projects/TSA`). Before working here, read `TSA/MEMORY.md` (canonical facts, incl. resolved conflicts) and `TSA/standards/content-operating-system.md` (operating rules), and follow that standard. This repo inherits from TSA; it does not redefine it. **Note:** this is the canonical public hub (deploys `thesovereign.academy` from this repo); its `memory/` folder is local-only (gitignored) — canonical memory is `TSA/MEMORY.md`.

> **Filing rule (ecosystem-wide, 2026-08-14).** Code lives ONLY in `~/projects/`; the TSA brain lives ONLY in `~/Documents/Claude/Projects/TSA`. One repo = one remote = one local path — no `-canonical`/`-latest`/`-clone`/`-backup` copies. This repo is the canonical home for the **umbrella hub** (thesovereign.academy). Full rules: `TSA/registry/FILING-RULES.md`.

## Me

**Dalia** — founder and developer of The Sovereign Academy (TSA), including Bitcoin Sovereign Academy (BSA) and Financially Sovereign Academy (FSA). I build education, tools, experiments, and products around sovereignty. TSA is not limited to courses or financial education: when a problem fits the sovereignty thesis and presents a credible opportunity to create useful, monetizable value, I may test and build a product around it. Solo operator wearing every hat: product, code, content, design, and ops.

Email: dalia@thesovereign.academy

## Active focus areas

Self-described focus right now: **monetization** and **automation**. The `automation/` directory in the hub repo (outreach/social/visual templates) is part of this push.

## Projects

| Codename | What | Domain |
|------|------|--------|
| **Sovereign Academy hub** | Parent brand and public home for The Sovereign Academy. FSA and BSA are current child properties; future work may extend into other sovereignty domains without being treated as launched products until they exist. | `thesovereign.academy` |
| **BSA** | Bitcoin Sovereign Academy — bitcoin mastery, technical deep-dives, interactive demos, Claude tutor. Primary roadmap lives in BSA's own `TASKS.md` (B1-B6 bets). | `bitcoinsovereign.academy` |
| **FSA** | Financially Sovereign Academy — practical financial education and tools. | `financiallysovereign.academy` |
| **Outreach + social automation** | `automation/` directory — outreach DB, social templates, visual assets, monetization system. | n/a |

## Terms (BSA shorthand decoded)

| Term | Meaning |
|------|---------|
| **Tutor** | Claude-powered Socratic learning assistant. Lives at `/api/tutor`, has its own SYSTEM_PROMPT and eval harness (`npm run tutor:evals`). |
| **B1, B2, B6...** | "High-leverage bets" in BSA's TASKS.md — ranked by leverage × feasibility. |
| **A1, A2, A3** | Active/in-progress task IDs. |
| **C1-C5** | Phase-1 accessibility audit IDs (WCAG 2.1 AA). |
| **M1-M4** | Recurring/maintenance tasks (per-change, weekly, monthly). |
| **Curious / Sovereign / Builder** | Learner paths. Each has Stages and Modules. |
| **Reflect-widget** | Interactive reflection-question component. Tiered reflection (B2) is the next planned upgrade. |
| **Lab-guide** | Interactive lab page template. |
| **Demo-truthfulness audit** | Systematic verification pass on BSA's interactive demos. Tier 1 done, Tier 2 in progress. |
| **Sovereign-editorial** | The new visual system (cream-paper, editorial polish) being cascaded site-wide via B6. |
| **mempool.space** | Bitcoin data API used for live network values (hashrate, height, supply). |
| **Defunct-services lint** | Custom CI rule that flags references to shut-down services (Paxful, Caravan, Samourai, etc.). |
| **`data-btc-live`** | Attribute binder that auto-populates elements with live chain data on a 60s tick. |

## Stack

- **Hosting:** Vercel (production)
- **Backend:** Supabase (`analytics_events`, auth, magic-link)
- **Payments:** Stripe + BTCPay + Zaprite
- **AI:** Anthropic API (tutor; rate-limited 20/min/IP)
- **CI:** GitHub Actions (`quality.yml`)
- **Data:** mempool.space for live BTC chain values
- **CSS:** custom — `brand.css`, moving toward a 12-component library

## External professional context

- **The Bitcoin Adviser (TBA)** — Dalia advises here (collaborative 1-of-3 multisig). Founders Andy and Peter. TBA's products show up in BSA deep-dive content:
  - **Loan My Coins (LMC)** — BTC-for-BTC loan, 95% LTV, 5% fixed fee, 12-month, no margin calls. Details in `memory/context/bitcoin-adviser.md`.
  - Other TBA brands: Chief Bitcoin Officer, Bitcoin Super.

## Preferences and working style

- **Truthfulness is the #1 rule** — verify all platform content. The demo-truthfulness audit (B1) was the systematic enforcement.
- **One bet at a time** — pick from "Next high-leverage bets" top-down; finish before starting.
- **Single focused commits.** PR body must include test-plan checklist (at minimum "manual smoke tested" or "ran `npm run tutor:evals`").
- **Squash locally before pushing.**
- **Untracked files** (`.cursor/`, `frontend/`, root `.html` drafts) are not auto-committed — review first.
- **Reorg-style monorepo changes** stay on feature branches until build tooling is ready.
- **Security changes** require before/after contrast/flow in commit body.

## Open questions for me

- Who else is involved (collaborators, contractors, advisors)? "Monetization and automation" came back where I asked about people — likely solo, but flag if I'm wrong.
