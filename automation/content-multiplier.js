'use strict';

/**
 * Sovereign Academy Content Multiplication System
 *
 * Transforms one piece of knowledge → many discovery surfaces
 *
 * Workflow:
 * 1.  Content Extraction      – read file, mine topics/questions/concepts
 * 2.  AI Answer Pages         – write optimised HTML answer pages to disk
 * 3.  Authority Articles      – write comprehensive HTML articles to disk
 * 4.  Structured Data         – build schema.org JSON-LD objects
 * 5.  Discovery Files         – update sitemap.xml, llms.txt, ai-index.json
 * 6.  Internal Links          – return topic-cluster link arrays
 * 7.  Social Distribution     – write per-platform drafts to output/social/
 * 8.  Backlink Outreach       – write campaign JSON to output/outreach/
 * 9.  Visual Assets           – write Mermaid diagrams + checklists to output/visuals/
 * 10. Monetization Conversion – return contextual CTA objects
 */

const fs   = require('fs');
const path = require('path');

class ContentMultiplier {
    constructor() {
        this.config = {
            domains: {
                hub:      'https://thesovereign.academy',
                bitcoin:  'https://bitcoinsovereign.academy',
                financial:'https://financiallysovereign.academy'
            },
            weeklyTargets: {
                authorityArticles: 1,
                answerPages:       3,
                outreachAttempts:  5,
                socialPosts:       4,
                visualAssets:      1
            },
            founder: {
                name:  'Dalia Platt',
                email: 'dalia@thebitcoinadviser.com',
                expertise: [
                    'Bitcoin self custody',
                    'Bitcoin inheritance planning',
                    'financial literacy',
                    'Bitcoin education',
                    'Lightning Network',
                    'multisig wallets'
                ]
            }
        };

        // Absolute paths to each site repo
        this.sitePaths = {
            hub:      path.resolve(__dirname, '..'),
            bitcoin:  path.resolve(__dirname, '../../bitcoin-sovereign-academy'),
            financial:path.resolve(__dirname, '../../financially-sovereign-academy')
        };
    }

    // ─────────────────────────────────────────────────────────────
    // STEP 1 · Content Extraction
    // ─────────────────────────────────────────────────────────────

    /**
     * Read a file from disk and extract structured metadata.
     * Accepts HTML, Markdown, or plain-text files.
     * @param {string} filePath – absolute or relative path to the source file
     */
    extractContent(filePath) {
        const absPath = path.resolve(filePath);
        if (!fs.existsSync(absPath)) {
            throw new Error(`Source file not found: ${absPath}`);
        }

        const raw  = fs.readFileSync(absPath, 'utf8');
        // Strip HTML tags and collapse whitespace
        const text = raw.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();

        const keyConcepts  = this._extractKeyConcepts(text);
        const mainTopic    = this._determineMainTopic(text, keyConcepts);
        const contentType  = this._detectContentType(text);

        return {
            filePath:               absPath,
            mainTopic,
            mainTopics:             [mainTopic, ...keyConcepts.slice(0, 2)],
            keyConcepts,
            questions:              this._extractQuestions(text),
            contentType,
            monetizationOpportunity:this._detectMonetizationOpportunity(contentType),
            targetAudience:         this._detectTargetAudience(text),
            difficulty:             this._detectDifficulty(text)
        };
    }

    _extractQuestions(text) {
        // Pull sentences that look like questions; fall back to generated ones
        const sentences = text.split(/(?<=[.!?])\s+/);
        const found = sentences
            .map(s => s.trim())
            .filter(s => s.length > 15 && /^(what|how|why|when|where|which|who|is|are|can|does|do|should|will)\b/i.test(s))
            .slice(0, 5)
            .map(s => (s.endsWith('?') ? s : s + '?'))
            .map(s => s.charAt(0).toUpperCase() + s.slice(1));

        return found.length > 0 ? found : [
            `What is ${this._roughTopic(text)}?`,
            `How does ${this._roughTopic(text)} work?`,
            `Why does ${this._roughTopic(text)} matter?`
        ];
    }

    _roughTopic(text) {
        const bitcoinHit    = /\bbitcoin\b/i.test(text);
        const custodyHit    = /\bcustody\b/i.test(text);
        const financialHit  = /\bfinancial\b/i.test(text);
        if (bitcoinHit && custodyHit) return 'Bitcoin self-custody';
        if (bitcoinHit)               return 'Bitcoin';
        if (financialHit)             return 'financial sovereignty';
        return 'this topic';
    }

    _extractKeyConcepts(text) {
        const terms = [
            // Bitcoin
            'Bitcoin', 'self-custody', 'hardware wallet', 'seed phrase',
            'private key', 'Lightning Network', 'multisig', 'cold storage',
            'hot wallet', 'exchange custody', 'Coldcard', 'Trezor',
            // Financial
            'emergency fund', 'compound interest', 'credit score', 'budget',
            'high-yield savings', 'financial planning', 'inflation', 'debt'
        ];
        return terms.filter(t => text.toLowerCase().includes(t.toLowerCase()));
    }

    _determineMainTopic(text, keyConcepts) {
        if (keyConcepts.length > 0) return keyConcepts[0];
        // Frequency fallback
        const freq = {};
        text.split(/\s+/).forEach(w => {
            const c = w.toLowerCase().replace(/[^a-z]/g, '');
            if (c.length > 4) freq[c] = (freq[c] || 0) + 1;
        });
        const top = Object.entries(freq).sort((a, b) => b[1] - a[1])[0];
        return top ? top[0] : 'financial sovereignty';
    }

    _detectContentType(text) {
        const l = text.toLowerCase();
        if (l.includes('bitcoin') || l.includes('custody') || l.includes('wallet')) return 'bitcoin_content';
        if (l.includes('emergency fund') || l.includes('compound interest') ||
            l.includes('budget') || l.includes('financial')) return 'financial_content';
        return 'general_content';
    }

    _detectMonetizationOpportunity(contentType) {
        return { bitcoin_content: 'bitcoin_security', financial_content: 'financial_planning' }[contentType] || 'education';
    }

    _detectTargetAudience(text) {
        const l = text.toLowerCase();
        if (l.includes('beginner') || l.includes('introduction') || l.includes('basics')) return 'beginners';
        if (l.includes('advanced') || l.includes('technical') || l.includes('expert'))    return 'advanced';
        return 'intermediate';
    }

    _detectDifficulty(text) {
        const l = text.toLowerCase();
        if (l.includes('beginner') || l.includes('simple') || l.includes('easy'))       return 'beginner';
        if (l.includes('advanced') || l.includes('technical') || l.includes('complex')) return 'advanced';
        return 'intermediate';
    }

    // ─────────────────────────────────────────────────────────────
    // STEP 2 · AI Answer Pages
    // ─────────────────────────────────────────────────────────────

    /**
     * Generate and write one HTML answer page per extracted question.
     * Pages land in <site>/answers/
     * @returns {Array<{question, filePath, url}>}
     */
    async generateAIAnswerPages(extraction) {
        const siteKey    = extraction.contentType === 'bitcoin_content' ? 'bitcoin' : 'financial';
        const answersDir = path.join(this.sitePaths[siteKey], 'answers');
        fs.mkdirSync(answersDir, { recursive: true });

        const answerPages = [];
        for (const question of extraction.questions.slice(0, 3)) {
            const slug     = this.slugify(question.replace('?', '')).slice(0, 60).replace(/-+$/, '');
            const filePath = path.join(answersDir, `${slug}.html`);
            const cta      = this.getMonetizationCTA(extraction.monetizationOpportunity);
            const schema   = this.generateStructuredData(extraction, 'faq');
            const domain   = this.config.domains[siteKey];
            const url      = `${domain}/answers/${slug}.html`;

            fs.writeFileSync(filePath, this._buildAnswerPageHTML(question, url, extraction, cta, schema), 'utf8');
            console.log(`  ✓ Answer page: ${filePath}`);
            answerPages.push({ question, filePath, url });
        }
        return answerPages;
    }

    _buildAnswerPageHTML(question, canonicalUrl, extraction, cta, schema) {
        const title          = question.replace('?', '');
        const internalLinks  = this._buildInternalLinksHTML(extraction.keyConcepts, extraction.contentType);
        const faqHTML        = this._buildFAQHTML(extraction.questions, question);

        return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title} | The Sovereign Academy</title>
  <meta name="description" content="${title} — clear, expert answer from The Sovereign Academy.">
  <link rel="canonical" href="${canonicalUrl}">
  <script type="application/ld+json">${JSON.stringify(schema, null, 2)}</script>
  <style>
    body{font-family:system-ui,sans-serif;max-width:800px;margin:0 auto;padding:2rem;color:#333;line-height:1.7}
    .answer-box{background:#f8f9fa;border-left:4px solid #F7931A;padding:1.5rem;margin:1.5rem 0;border-radius:4px}
    .quick-answer{font-size:1.1rem;font-weight:500;margin:0}
    .cta-box{background:#000;color:#fff;padding:2rem;border-radius:8px;margin:2rem 0;text-align:center}
    .cta-box a{background:#F7931A;color:#000;padding:.75rem 1.5rem;border-radius:4px;text-decoration:none;font-weight:bold;display:inline-block;margin-top:1rem}
    details{margin:.5rem 0;padding:.5rem;border:1px solid #eee;border-radius:4px}
    summary{cursor:pointer;font-weight:500}
    .related-links a{color:#F7931A;text-decoration:none}
  </style>
</head>
<body>
  <article>
    <h1>${question}</h1>
    <div class="answer-box">
      <h2>Quick Answer</h2>
      <p class="quick-answer">${this._generateDirectAnswer(question, extraction)}</p>
    </div>
    <h2>Detailed Explanation</h2>
    <p>${this._generateExplanation(extraction)}</p>
    <h2>Practical Example</h2>
    <p>${this._generateExample(extraction)}</p>
    <div class="faq">
      <h2>Related Questions</h2>
      ${faqHTML}
    </div>
    <div class="related-links">
      <h3>Keep Learning</h3>
      ${internalLinks}
    </div>
  </article>
  <div class="cta-box">
    <h3>${cta.primary}</h3>
    <p>${cta.description}</p>
    <a href="${cta.url}">${cta.primary} →</a>
  </div>
</body>
</html>`;
    }

    _generateDirectAnswer(question, extraction) {
        const topic = extraction.mainTopic;
        const q     = question.toLowerCase();
        if (q.includes('what is')) {
            return `${topic} is a foundational concept in financial sovereignty, giving you direct control over your assets without relying on third-party intermediaries.`;
        }
        if (q.includes('how')) {
            return `You approach ${topic} step-by-step: start with the basics, practise safely in a risk-free environment, then scale as your confidence grows.`;
        }
        return `${topic} is essential for building financial sovereignty. The Sovereign Academy provides hands-on, interactive learning to make it accessible to everyone.`;
    }

    _generateExplanation(extraction) {
        return `Understanding ${extraction.mainTopic} is a foundational step toward financial sovereignty. ` +
               `${this.config.founder.name} and The Sovereign Academy have helped thousands of students master this concept ` +
               `through interactive, risk-free learning environments. The key is practical application, not passive theory.`;
    }

    _generateExample(extraction) {
        if (extraction.contentType === 'bitcoin_content') {
            return `For example: instead of reading about seed phrases in the abstract, our students use interactive ` +
                   `simulators to practise generating, storing, and recovering wallets — all without putting real funds at risk. ` +
                   `This builds genuine muscle memory before any real money is involved.`;
        }
        return `For example: when building an emergency fund, our students use interactive calculators to see exactly ` +
               `how much to save each month, set up automatic transfers, and track progress toward their 3-month target — ` +
               `turning abstract advice into a concrete, actionable plan.`;
    }

    _buildFAQHTML(questions, currentQuestion) {
        return questions
            .filter(q => q !== currentQuestion)
            .slice(0, 3)
            .map(q => {
                const slug = this.slugify(q.replace('?', ''));
                return `<details><summary>${q}</summary><p>This is covered in detail in our full curriculum. ` +
                       `<a href="/answers/${slug}.html">Read the full answer →</a></p></details>`;
            })
            .join('\n');
    }

    _buildInternalLinksHTML(keyConcepts, contentType) {
        const cluster = contentType === 'bitcoin_content'
            ? ['/answers/what-is-bitcoin-self-custody.html',
               '/answers/how-to-set-up-hardware-wallet.html',
               '/answers/what-is-a-seed-phrase.html',
               '/answers/bitcoin-inheritance-planning.html']
            : ['/answers/how-to-build-emergency-fund.html',
               '/answers/what-is-compound-interest.html',
               '/answers/how-credit-scores-work.html',
               '/answers/best-budgeting-method.html'];

        const items = cluster.map(href => {
            const label = href.split('/').pop().replace('.html', '').replace(/-/g, ' ');
            return `<li><a href="${href}">${label.charAt(0).toUpperCase() + label.slice(1)}</a></li>`;
        }).join('\n');
        return `<ul style="list-style:none;padding:0">${items}</ul>`;
    }

    // ─────────────────────────────────────────────────────────────
    // STEP 3 · Authority Articles
    // ─────────────────────────────────────────────────────────────

    /**
     * Generate and write a comprehensive HTML authority article.
     * Articles land in <site>/articles/
     * @returns {{title, filePath, url, slug}}
     */
    async generateAuthorityArticle(extraction) {
        const siteKey     = extraction.contentType === 'bitcoin_content' ? 'bitcoin' : 'financial';
        const articlesDir = path.join(this.sitePaths[siteKey], 'articles');
        fs.mkdirSync(articlesDir, { recursive: true });

        const slug     = this.slugify(extraction.mainTopic + ' complete guide');
        const filePath = path.join(articlesDir, `${slug}.html`);
        const domain   = this.config.domains[siteKey];
        const url      = `${domain}/articles/${slug}.html`;
        const schema   = this.generateStructuredData(extraction, 'article');
        const cta      = this.getMonetizationCTA(extraction.monetizationOpportunity);

        fs.writeFileSync(filePath, this._buildAuthorityArticleHTML(extraction, url, schema, cta), 'utf8');
        console.log(`  ✓ Authority article: ${filePath}`);
        return { title: `${extraction.mainTopic} — Complete Guide`, filePath, url, slug };
    }

    _buildAuthorityArticleHTML(extraction, canonicalUrl, schema, cta) {
        const topic          = extraction.mainTopic;
        const title          = `${topic} — Complete Guide`;
        const date           = new Date().toLocaleDateString('en-US', { year:'numeric', month:'long', day:'numeric' });
        const internalLinks  = this._buildInternalLinksHTML(extraction.keyConcepts, extraction.contentType);
        const conceptsHTML   = extraction.keyConcepts.slice(0, 5)
            .map(c => `<p><strong>${c}:</strong> A key component of ${topic} that every student should understand before moving forward.</p>`)
            .join('\n');
        const faqHTML = extraction.questions
            .map(q => `<details><summary>${q}</summary><p>This is addressed in our full curriculum at The Sovereign Academy.</p></details>`)
            .join('\n');

        return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title} | The Sovereign Academy</title>
  <meta name="description" content="A complete expert guide to ${topic} by ${this.config.founder.name} at The Sovereign Academy.">
  <link rel="canonical" href="${canonicalUrl}">
  <script type="application/ld+json">${JSON.stringify(schema, null, 2)}</script>
  <style>
    body{font-family:system-ui,sans-serif;max-width:800px;margin:0 auto;padding:2rem;color:#333;line-height:1.7}
    h1{font-size:2rem}h2{font-size:1.4rem;margin-top:2rem;border-bottom:2px solid #F7931A;padding-bottom:.25rem}
    .author{color:#666;font-size:.9rem;margin-bottom:2rem}
    .cta-mid{background:#fff8f0;border:2px solid #F7931A;padding:1.5rem;border-radius:8px;margin:2rem 0}
    .cta-end{background:#000;color:#fff;padding:2rem;border-radius:8px;margin:2rem 0;text-align:center}
    .cta-end a{background:#F7931A;color:#000;padding:.75rem 1.5rem;border-radius:4px;text-decoration:none;font-weight:bold;display:inline-block;margin-top:1rem}
    details{margin:.5rem 0;padding:.5rem;border:1px solid #eee;border-radius:4px}
    summary{cursor:pointer;font-weight:500}
    .related-links a{color:#F7931A}
  </style>
</head>
<body>
  <article>
    <h1>${title}</h1>
    <p class="author">By ${this.config.founder.name} | The Sovereign Academy | ${date}</p>

    <section>
      <h2>Introduction</h2>
      <p>${topic} is one of the most important topics for anyone pursuing financial sovereignty. At The Sovereign Academy, we have taught thousands of students to master this through hands-on, interactive learning — not abstract theory.</p>
      <p>This guide covers everything you need to know: the fundamentals, common mistakes, practical steps, and a clear path forward.</p>
    </section>

    <section>
      <h2>Why ${topic} Matters</h2>
      <p>Most people never learn about ${topic} in school or from their financial institutions. That knowledge gap keeps people dependent. Understanding ${topic} is a fundamental step toward taking control of your financial future.</p>
    </section>

    <div class="cta-mid">
      <strong>${cta.primary}</strong> — ${cta.description}<br>
      <a href="${cta.url}" style="color:#F7931A">${cta.secondary} →</a>
    </div>

    <section>
      <h2>Core Concepts</h2>
      ${conceptsHTML || `<p>The core concepts of ${topic} are covered in depth across our interactive curriculum.</p>`}
    </section>

    <section>
      <h2>Common Mistakes to Avoid</h2>
      <ul>
        <li>Skipping the fundamentals and jumping to advanced techniques</li>
        <li>Not practising in a safe, risk-free environment first</li>
        <li>Relying solely on theory without hands-on application</li>
        <li>Not having a clear action plan before starting</li>
      </ul>
    </section>

    <section>
      <h2>Step-by-Step Action Plan</h2>
      <ol>
        <li><strong>Build foundational knowledge</strong> — Use our free interactive demos at The Sovereign Academy</li>
        <li><strong>Practise in a safe environment</strong> — Zero risk while you learn the mechanics</li>
        <li><strong>Apply to your real situation</strong> — Start with small amounts first</li>
        <li><strong>Get expert guidance when needed</strong> — Our security reviews and membership provide direct access</li>
        <li><strong>Scale with confidence</strong> — Expand as your knowledge and comfort grow</li>
      </ol>
    </section>

    <section>
      <h2>Frequently Asked Questions</h2>
      ${faqHTML}
    </section>

    <section>
      <h2>Conclusion</h2>
      <p>Mastering ${topic} is a journey. Start with the fundamentals, practise consistently, and seek expert guidance when needed. The Sovereign Academy is here to support you at every step.</p>
    </section>
  </article>

  <div class="cta-end">
    <h3>${cta.primary}</h3>
    <p>${cta.description}</p>
    <a href="${cta.url}">${cta.primary} →</a>
  </div>

  <div class="related-links">
    <h3>Continue Learning</h3>
    ${internalLinks}
  </div>
</body>
</html>`;
    }

    // ─────────────────────────────────────────────────────────────
    // STEP 4 · Structured Data
    // ─────────────────────────────────────────────────────────────

    generateStructuredData(extraction, contentType) {
        const base = {
            '@context': 'https://schema.org',
            author: {
                '@type': 'Person',
                name:    this.config.founder.name,
                url:    'https://thebitcoinadviser.com'
            },
            publisher: {
                '@type': 'EducationalOrganization',
                name:    'The Sovereign Academy',
                url:     this.config.domains.hub
            },
            datePublished: new Date().toISOString(),
            dateModified:  new Date().toISOString()
        };

        switch (contentType) {
            case 'article':
                return {
                    ...base,
                    '@type':   'Article',
                    headline:  `${extraction.mainTopic} — Complete Guide`,
                    keywords:  extraction.keyConcepts.join(', ')
                };
            case 'faq':
                return {
                    ...base,
                    '@type': 'FAQPage',
                    mainEntity: extraction.questions.map(q => ({
                        '@type': 'Question',
                        name:    q,
                        acceptedAnswer: {
                            '@type': 'Answer',
                            text:    `See the full answer at The Sovereign Academy: ${this.config.domains.hub}`
                        }
                    }))
                };
            case 'course':
                return {
                    ...base,
                    '@type':      'Course',
                    name:         extraction.mainTopic,
                    description: `Learn ${extraction.mainTopic} through interactive education at The Sovereign Academy`
                };
            default:
                return base;
        }
    }

    // ─────────────────────────────────────────────────────────────
    // STEP 5 · Discovery Files
    // ─────────────────────────────────────────────────────────────

    /**
     * Update sitemap.xml, llms.txt, and ai-index.json across all sites.
     * @param {object} newContent – { answerPages: [{url}], article: {url} }
     */
    async updateDiscoveryFiles(newContent) {
        const results = { sitemaps: [], llmsFiles: [], aiIndex: false };
        const today   = new Date().toISOString().split('T')[0];

        for (const [key, sitePath] of Object.entries(this.sitePaths)) {
            if (!fs.existsSync(sitePath)) continue;

            // sitemap.xml
            const sitemapPath = path.join(sitePath, 'sitemap.xml');
            if (fs.existsSync(sitemapPath)) {
                let sitemap  = fs.readFileSync(sitemapPath, 'utf8');
                const urls   = [
                    ...(newContent.answerPages || []).map(p => p.url).filter(Boolean),
                    newContent.article && newContent.article.url
                ].filter(Boolean);
                const entries = urls.map(u =>
                    `  <url><loc>${u}</loc><lastmod>${today}</lastmod><priority>0.8</priority></url>`
                ).join('\n');
                if (entries && sitemap.includes('</urlset>')) {
                    sitemap = sitemap.replace('</urlset>', `${entries}\n</urlset>`);
                    fs.writeFileSync(sitemapPath, sitemap, 'utf8');
                }
                results.sitemaps.push(sitemapPath);
            }

            // llms.txt
            const llmsPath = path.join(sitePath, 'llms.txt');
            if (fs.existsSync(llmsPath)) {
                const lines = [
                    ``,
                    `## New Content — ${today}`,
                    ...(newContent.answerPages || []).map(p => `- ${p.url}`),
                    newContent.article ? `- ${newContent.article.url}` : ''
                ].filter(l => l !== undefined);
                fs.appendFileSync(llmsPath, lines.join('\n') + '\n', 'utf8');
                results.llmsFiles.push(llmsPath);
            }

            console.log(`  ✓ Discovery files updated: ${sitePath}`);
        }

        // ai-index.json
        const aiIndexPath = path.join(this.sitePaths.hub, 'automation', 'ai-index.json');
        let index = {};
        if (fs.existsSync(aiIndexPath)) {
            try { index = JSON.parse(fs.readFileSync(aiIndexPath, 'utf8')); } catch (_) { index = {}; }
        }
        if (!index.recentContent) index.recentContent = [];
        index.recentContent.unshift({ ...newContent, timestamp: new Date().toISOString() });
        index.recentContent = index.recentContent.slice(0, 50);
        index.lastUpdated   = new Date().toISOString();
        fs.writeFileSync(aiIndexPath, JSON.stringify(index, null, 2), 'utf8');
        results.aiIndex = true;
        console.log(`  ✓ ai-index.json updated`);

        return results;
    }

    // ─────────────────────────────────────────────────────────────
    // STEP 6 · Internal Links
    // ─────────────────────────────────────────────────────────────

    /**
     * @returns {string[]} – array of relative paths for topic-cluster pages
     */
    generateInternalLinks(keyConcepts) {
        const linkClusters = {
            bitcoin_custody: [
                '/answers/what-is-bitcoin-self-custody.html',
                '/answers/how-to-set-up-hardware-wallet.html',
                '/answers/bitcoin-inheritance-planning.html',
                '/answers/common-custody-mistakes.html'
            ],
            financial_literacy: [
                '/answers/how-to-build-emergency-fund.html',
                '/answers/what-is-compound-interest.html',
                '/answers/how-credit-scores-work.html',
                '/answers/best-budgeting-method.html'
            ]
        };
        return this.buildTopicClusterLinks(keyConcepts, linkClusters);
    }

    buildTopicClusterLinks(keyConcepts, linkClusters) {
        const links = [];
        for (const concept of keyConcepts) {
            const l = concept.toLowerCase();
            if (l.includes('bitcoin') || l.includes('custody') ||
                l.includes('wallet') || l.includes('seed') || l.includes('key')) {
                links.push(...linkClusters.bitcoin_custody);
            } else {
                links.push(...linkClusters.financial_literacy);
            }
        }
        return [...new Set(links)];
    }

    // ─────────────────────────────────────────────────────────────
    // STEP 7 · Social Distribution
    // ─────────────────────────────────────────────────────────────

    /**
     * Generate platform-specific drafts and write them as a single JSON file
     * to automation/output/social/
     * @returns {{ linkedin, twitter, substack, nostr }}
     */
    async generateSocialContent(extraction, article) {
        const outputDir = path.join(this.sitePaths.hub, 'automation', 'output', 'social');
        fs.mkdirSync(outputDir, { recursive: true });

        const slug    = this.slugify(extraction.mainTopic);
        const content = {
            generatedAt: new Date().toISOString(),
            topic:       extraction.mainTopic,
            articleUrl:  article ? article.url : '',
            linkedin:    this._generateLinkedInPost(extraction, article),
            twitter:     this._generateTwitterThread(extraction, article),
            substack:    this._generateSubstackVersion(extraction, article),
            nostr:       this._generateNostrPost(extraction, article)
        };

        const outFile = path.join(outputDir, `${slug}-${Date.now()}.json`);
        fs.writeFileSync(outFile, JSON.stringify(content, null, 2), 'utf8');
        console.log(`  ✓ Social drafts: ${outFile}`);
        return content;
    }

    _generateLinkedInPost(extraction, article) {
        const topic = extraction.mainTopic;
        const link  = article ? article.url : this.config.domains[extraction.contentType === 'bitcoin_content' ? 'bitcoin' : 'financial'];
        return `Most people think ${topic} is too complicated.\n\n` +
               `Here's what I've learned teaching thousands of students:\n\n` +
               `The problem isn't complexity — it's how it's taught.\n\n` +
               `• Jargon instead of plain English\n` +
               `• Theory without hands-on practice\n` +
               `• No safe environment to make mistakes\n\n` +
               `At The Sovereign Academy, we do this differently:\n\n` +
               `✅ Interactive demos you can touch\n` +
               `✅ Real scenarios, zero financial risk\n` +
               `✅ Step-by-step guidance from ${this.config.founder.name}\n\n` +
               `Full guide: ${link}\n\n` +
               `What's the most confusing aspect of ${topic} you've encountered? 👇\n\n` +
               `#FinancialSovereignty #Bitcoin #Education`;
    }

    _generateTwitterThread(extraction, article) {
        const topic = extraction.mainTopic;
        const link  = article ? article.url : this.config.domains[extraction.contentType === 'bitcoin_content' ? 'bitcoin' : 'financial'];
        return [
            `${topic} isn't as complicated as it sounds — but it IS taught badly. A short thread on how to actually learn it 🧵 (1/5)`,
            `Most guides start with the technology. Wrong move. Start with WHY it matters — then the how makes sense. (2/5)`,
            `${extraction.keyConcepts[0] || topic} is the single most important concept to get right first. Everything else builds on it. (3/5)`,
            `Practise safely before using real money. Our interactive demos let you make every mistake with zero real risk. (4/5)`,
            `Only then scale up. Same principle as learning to drive in a parking lot before the motorway. Full guide: ${link} (5/5)`
        ];
    }

    _generateSubstackVersion(extraction, article) {
        const topic = extraction.mainTopic;
        const link  = article ? article.url : this.config.domains[extraction.contentType === 'bitcoin_content' ? 'bitcoin' : 'financial'];
        return {
            subject: `${topic}: what most people get wrong`,
            body:    `Hi,\n\nThis week I've been thinking about ${topic}.\n\n` +
                     `Most content on this topic starts in the wrong place — it leads with complexity instead of purpose.\n\n` +
                     `Key insight: ${this._generateExplanation(extraction)}\n\n` +
                     `What you can do right now:\n` +
                     `1. Visit the free demos at The Sovereign Academy\n` +
                     `2. Practise with zero financial risk\n` +
                     `3. Build real confidence before putting real money in play\n\n` +
                     `Full guide: ${link}\n\n` +
                     `Stay sovereign,\nDalia`
        };
    }

    _generateNostrPost(extraction, article) {
        const topic = extraction.mainTopic;
        const link  = article ? article.url : this.config.domains[extraction.contentType === 'bitcoin_content' ? 'bitcoin' : 'financial'];
        return `${topic} in plain English:\n\n` +
               `${this._generateDirectAnswer(`What is ${topic}?`, extraction)}\n\n` +
               `Free learning resources: ${link}\n\n` +
               `#Bitcoin #FinancialSovereignty #Education`;
    }

    // ─────────────────────────────────────────────────────────────
    // STEP 8 · Backlink Outreach
    // ─────────────────────────────────────────────────────────────

    /**
     * Generate a campaign JSON file with personalised pitch emails.
     * Written to automation/output/outreach/
     */
    async generateOutreachCampaign(extraction) {
        const outputDir = path.join(this.sitePaths.hub, 'automation', 'output', 'outreach');
        fs.mkdirSync(outputDir, { recursive: true });

        const targets  = this._getOutreachTargets(extraction.contentType);
        const messages = targets.map(t => this._generateOutreachMessage(t, extraction));

        const campaign = {
            generatedAt: new Date().toISOString(),
            topic:       extraction.mainTopic,
            contentType: extraction.contentType,
            targets,
            messages,
            tracking:    { sent: 0, opened: 0, replied: 0, linked: 0 }
        };

        const outFile = path.join(outputDir, `campaign-${Date.now()}.json`);
        fs.writeFileSync(outFile, JSON.stringify(campaign, null, 2), 'utf8');
        console.log(`  ✓ Outreach campaign (${targets.length} targets): ${outFile}`);
        return campaign;
    }

    _getOutreachTargets(contentType) {
        try {
            const db  = JSON.parse(fs.readFileSync(
                path.join(this.sitePaths.hub, 'automation', 'outreach-database.json'), 'utf8'
            ));
            const key = contentType === 'bitcoin_content' ? 'bitcoin_publications' : 'financial_publications';
            return (db.outreach_targets[key] || []).slice(0, 5);
        } catch (_) {
            return [];
        }
    }

    _generateOutreachMessage(target, extraction) {
        const email = (target.contact_info || {}).editor_email ||
                      (target.contact_info || {}).host_email ||
                      (target.contact_info || {}).contact_email || '';
        return {
            to:      email,
            subject: `Guest contribution: ${extraction.mainTopic} for ${target.name}`,
            body:    `Hi,\n\nI'm ${this.config.founder.name}, founder of The Sovereign Academy. ` +
                     `I've created a comprehensive guide on ${extraction.mainTopic} that I believe would be valuable for your audience.\n\n` +
                     `The guide covers:\n${extraction.keyConcepts.slice(0, 3).map(c => `• ${c}`).join('\n')}\n\n` +
                     `Would you be open to a guest contribution or linking to the resource? ` +
                     `I'm happy to customise the content for your audience.\n\n` +
                     `Best,\n${this.config.founder.name}\n${this.config.founder.email}\nThe Sovereign Academy`
        };
    }

    // ─────────────────────────────────────────────────────────────
    // STEP 9 · Visual Assets
    // ─────────────────────────────────────────────────────────────

    /**
     * Write a Mermaid diagram (.md) and an action checklist (.md) to
     * automation/output/visuals/
     */
    async generateVisualAssets(extraction) {
        const outputDir = path.join(this.sitePaths.hub, 'automation', 'output', 'visuals');
        fs.mkdirSync(outputDir, { recursive: true });

        const slug      = this.slugify(extraction.mainTopic);
        const diagram   = this._generateMermaidDiagram(extraction);
        const checklist = this._generateChecklist(extraction);

        const diagramPath   = path.join(outputDir, `${slug}-diagram.md`);
        const checklistPath = path.join(outputDir, `${slug}-checklist.md`);

        fs.writeFileSync(diagramPath,   `# ${extraction.mainTopic} — Diagram\n\n\`\`\`mermaid\n${diagram}\n\`\`\`\n`, 'utf8');
        fs.writeFileSync(checklistPath, checklist, 'utf8');
        console.log(`  ✓ Visual assets: ${diagramPath}, ${checklistPath}`);
        return { diagram, checklist, diagramPath, checklistPath };
    }

    _generateMermaidDiagram(extraction) {
        const topic = extraction.mainTopic;
        if (extraction.contentType === 'bitcoin_content') {
            return [
                'graph TD',
                `    A[Learn ${topic}] --> B{Ready to practise?}`,
                '    B -->|No| C[Complete Free Demos at The Sovereign Academy]',
                '    B -->|Yes| D[Start With Small Amounts]',
                '    C --> D',
                '    D --> E[Build Confidence]',
                '    E --> F[Scale Up Gradually]',
                '    F --> G[Full Bitcoin Sovereignty]'
            ].join('\n');
        }
        return [
            'graph TD',
            '    A[Assess Current Financial Situation] --> B[Set Clear Goal]',
            `    B --> C[Build ${topic}]`,
            '    C --> D{Goal Reached?}',
            '    D -->|Not yet| E[Review & Adjust Strategy]',
            '    E --> C',
            '    D -->|Yes| F[Financial Sovereignty Achieved]'
        ].join('\n');
    }

    _generateChecklist(extraction) {
        const topic = extraction.mainTopic;
        const conceptItems = extraction.keyConcepts.slice(0, 3)
            .map(c => `- [ ] Master the concept: ${c}`);
        return [
            `# ${topic} — Action Checklist`,
            '',
            `- [ ] Understand the basics of ${topic}`,
            `- [ ] Complete The Sovereign Academy free demos`,
            `- [ ] Practise in a safe, risk-free environment`,
            `- [ ] Apply knowledge to your real situation`,
            `- [ ] Review and adjust your approach`,
            `- [ ] Share what you've learned with someone else`,
            ...conceptItems,
            ''
        ].join('\n');
    }

    // ─────────────────────────────────────────────────────────────
    // STEP 10 · Monetization Conversion
    // ─────────────────────────────────────────────────────────────

    getMonetizationCTA(opportunity) {
        const ctas = {
            bitcoin_security: {
                primary:     'Book a Bitcoin Security Review',
                secondary:   'Join Sovereign Academy Membership',
                url:         '/bitcoin-security-review/',
                description: 'Get your Bitcoin setup reviewed by an expert and eliminate costly mistakes.'
            },
            financial_planning: {
                primary:     'Get Your Personalised Financial Plan',
                secondary:   'Take Our Financial Assessment',
                url:         '/financial-assessment/',
                description: 'Build your personalised path to financial sovereignty.'
            },
            education: {
                primary:     'Bring This Programme to Your City',
                secondary:   'Attend the Next Self-Custody Workshop',
                url:         '/city-programs/',
                description: 'Scale financial sovereignty education to your whole community.'
            }
        };
        return ctas[opportunity] || ctas.education;
    }

    // ─────────────────────────────────────────────────────────────
    // Utilities
    // ─────────────────────────────────────────────────────────────

    slugify(text) {
        return text.toLowerCase().replace(/[^\w ]+/g, '').replace(/ +/g, '-');
    }

    async executeWeeklyPipeline() {
        return {
            monday:    ['Generate 1 authority article', 'Create 1 AI answer page'],
            tuesday:   ['Generate social distribution', 'Update discovery files'],
            wednesday: ['Create 1 AI answer page', 'Execute backlink outreach'],
            thursday:  ['Generate visual asset', 'Internal linking update'],
            friday:    ['Create 1 AI answer page', 'Social distribution'],
            saturday:  ['Backlink outreach follow-up'],
            sunday:    ['Analytics review', 'Next week planning']
        };
    }
}

module.exports = ContentMultiplier;
