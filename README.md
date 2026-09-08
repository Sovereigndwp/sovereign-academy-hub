# Sovereign Academy Hub

**Unified discovery page for Financial Literacy + Bitcoin Mastery learning tracks**

## What This Is

A single-page hub that lets learners choose their path:
- **💰 Financially Sovereign**: Universal financial literacy (for everyone)
- **₿ Bitcoin Sovereign**: Bitcoin mastery (technical deep-dive)

Users can toggle between both academies seamlessly.

## Files

```
sovereign-academy-hub/
├── index.html                    # Hub homepage (only file needed)
├── IMPLEMENTATION_OPTIONS.md     # 4 implementation strategies
└── README.md                     # This file
```

## Quick Deploy

### Option 1: Vercel (Recommended)
```bash
cd /Users/dalia/projects/sovereign-academy-hub
vercel --prod
```

### Option 2: Netlify
```bash
cd /Users/dalia/projects/sovereign-academy-hub
netlify deploy --prod --dir .
```

### Option 3: GitHub Pages
1. Push to GitHub
2. Settings → Pages → Deploy from main branch
3. Custom domain → Point to your domain

## Before Deploying

Update the links in `index.html` (lines 331 and 369):

```html
<!-- Line 331: Financial Academy -->
<a href="https://YOUR-FSA-DOMAIN.com" class="cta-btn">

<!-- Line 369: Bitcoin Academy -->
<a href="https://YOUR-BSA-DOMAIN.com" class="cta-btn">
```

## Domains

Settled. Each property has its own domain:
- TSA hub (this repo): `thesovereign.academy` — live on Vercel
- FSA: `financiallysovereign.academy`
- BSA: `bitcoinsovereign.academy`

## Cross-Linking

After deploying hub, add nav links to both academies:

### In FSA (`financially-sovereign-academy/index.html`):
```html
<a href="https://thesovereign.academy" 
   style="position: fixed; top: 1rem; left: 1rem; 
          color: #10b981; text-decoration: none; z-index: 9999;">
  ← Sovereign Academy
</a>
```

### In BSA (`bitcoin-sovereign-academy/index.html`):
```html
<a href="https://thesovereign.academy"
   style="position: fixed; top: 1rem; left: 1rem; 
          color: #f7931a; text-decoration: none; z-index: 9999;">
  ← Sovereign Academy
</a>
```

## Features

✅ Beautiful split-card design
✅ Green (FSA) + Orange (BSA) color-coded
✅ Recommended learning journey visualization
✅ Mobile responsive
✅ Accessible (WCAG AA)
✅ Reduced motion support
✅ Zero dependencies (pure HTML/CSS)

## Preview Locally

```bash
cd /Users/dalia/projects/sovereign-academy-hub
python3 -m http.server 8000
# Open http://localhost:8000
```

## Status

- [x] Hub homepage designed
- [x] Implementation strategies documented
- [ ] Domain purchased
- [ ] Deployed to production
- [ ] Cross-links added to FSA/BSA
- [ ] FSA Module 10 → BSA transition CTA

## Next Steps

1. Add cross-links to both academies (back to `thesovereign.academy`)
2. Update FSA Module 10 with Bitcoin discovery CTA

**Total time: 1 hour**

---

Built to connect **Financially Sovereign Academy** and **Bitcoin Sovereign Academy** under one unified brand.
