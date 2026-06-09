# Ship the new homepage → thesovereign.academy

The redesigned homepage (BSA visual system: deep-black base, electric-orange /
bright-yellow signature) is already placed in this repo. This repo is wired to
**GitHub** (`Sovereigndwp/sovereign-academy-hub`) and **Vercel** (domain
`thesovereign.academy`), so a push auto-deploys.

## What changed (already on disk)

- `index.html` — the new homepage (old one saved as `index-legacy.html`)
- `css/tokens.css` — updated to current version (superset of the old; nothing
  removed, so other pages are unaffected). Old saved as `css/tokens-legacy.css`.
- `css/design-tokens.css`, `css/brand.css` — new files the homepage needs
- `vercel.json` — unchanged (keeps the `thesovereign.academy` alias)

## Run these in your Mac Terminal

```bash
cd ~/projects/sovereign-academy-hub

# stale lock from the sandbox — safe to remove (no git is running)
rm -f .git/index.lock

# review what you're shipping
git status
git diff --stat

# stage the homepage + CSS (leave deep-dives/ and the mortgage draft for later)
git add index.html index-legacy.html css/tokens.css css/tokens-legacy.css \
        css/design-tokens.css css/brand.css DEPLOY-new-homepage.md

git commit -m "Redesign homepage on BSA visual system; refresh design tokens"

git push origin master
```

Vercel picks up the push and deploys to **thesovereign.academy** within ~1 minute.
Watch it at https://vercel.com → project `sovereign-academy-hub`.

## If you want to preview before going live

```bash
cd ~/projects/sovereign-academy-hub
npx vercel        # preview URL, doesn't touch the domain
npx vercel --prod # promote to production when happy
```

## Rollback (if needed)

```bash
cp index-legacy.html index.html
cp css/tokens-legacy.css css/tokens.css
git commit -am "Roll back to previous homepage"
git push origin master
```
