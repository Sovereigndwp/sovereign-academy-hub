# Tier-1 Component Map

Maps each Tier-1 component → its class → the reference design it comes from → the future live page that would adopt it. **Reference only.** No live page is migrated in PR2; the "future live page" column is the adoption target for later, per-family PRs.

Source: `css/tsa-tier-1-components.css` (consumes `tsa-design-tokens.css` + `tsa-platform-variants.css`).
Theming: every component reads `--brand` / `--accent` / `--brand-fade` and re-skins under `data-platform="tsa|bsa|fsa"`. No per-platform classes.

## Wave A — shells & notes (extracted first)

| Component | Class | From reference | Future live page (adoption target) |
|---|---|---|---|
| Hero shell | `.tsa-hero` (`__eyebrow` `__title` `__lede` `__actions`) | TSA-Landing-Page, FSA-Program-Page | hub `index.html`; FSA/BSA page headers |
| Platform card | `.tsa-card--platform` | TSA-Landing-Page, Hub | hub homepage child-property row |
| Program card | `.tsa-card--program` | FSA-Program-Page, Hub | FSA module index, BSA path index |
| Lesson card | `.tsa-card--lesson` | BSA-Lesson-Page, TSA-Landing-Page | BSA path/stage listings, FSA module listings |
| Source note | `.tsa-note--source` | *new — claim-labeling convention* | any claim-bearing lesson/deep-dive (prints) |
| Boundary note | `.tsa-note--boundary` | *new — TBA boundary convention* | custody/inheritance pages, diagnostics (prints) |
| Download card | `.tsa-card--download` (`.tsa-chip`) | *new — kits/templates convention* | template/kit pages, resource lists |
| Bridge card | `.tsa-card--bridge` | *new — honest-bridge module shape* | end of every module/lesson |

## Wave B — document & deck shells (frame only; print-first)

| Component | Class | From reference | Future live page (adoption target) |
|---|---|---|---|
| Workbook page shell | `.tsa-doc--workbook` (`.tsa-field`) | FSA-Workbook-Page | FSA printable worksheets |
| Facilitator guide shell | `.tsa-doc--facilitator` (`.tsa-doc__rail`) | FSA-Facilitator-Guide | FSA/institutional facilitator docs |
| Certificate shell | `.tsa-doc--certificate` | FSA-Certificate | FSA + BSA certificates |
| Slide shell | `.tsa-slide` (+ `--paper` for FSA) | Slide-Masters (8 masters) | deck/export tooling |

## Base primitives (promoted from PR1 gallery into the shared file)

`.tsa-wrap` · `.tsa-eyebrow` · `.tsa-btn` (`--primary`/`--secondary`) · `.tsa-badge` · `.tsa-status` + `.tsa-dot` · `.tsa-card` (+ `--hover`/`--gradient`) · `.tsa-list` · `.tsa-panel` · `.tsa-pullquote` · plus the `.fade-b`/`.fade-f`/`.fade-brand` word-accents from the variants file.

## Notes on adoption (later PRs)

- **PR3** re-points the canonical brand files (`tsa-brand.css` / `fsa-brand.css` / BSA `brand.css`) at the shared tokens; only then do live pages start using these classes.
- The four "new" notes ship as visual components only in PR2 — their **wording** (boundary language, source citations) is content work, reviewed separately against the claim ledger and TBA boundary rules.
- Wave B shells intentionally omit per-document specifics (field counts, seal art, exact deck content) — those stay inline on the real page.

## Acceptance checks (PR2)

- `grep -E '#[0-9a-fA-F]{6}' css/tsa-tier-1-components.css` → **0** (no raw hex; tokens only).
- Every component renders in all three `data-platform` themes with only the accent changing.
- Boundary + source notes remain visible in print; download chips + slides hidden in print.
- No live page, no existing CSS, and no reference `.html` modified.
