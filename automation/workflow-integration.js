'use strict';

/**
 * Content Multiplication Workflow Integration
 * Thin orchestrator — delegates all work to ContentMultiplier.
 *
 * Usage:
 *   node workflow-integration.js <path-to-content-file>
 *   e.g. node automation/workflow-integration.js answers/what-is-bitcoin-self-custody.html
 */

const fs   = require('fs');
const path = require('path');
const ContentMultiplier = require('./content-multiplier.js');

async function runContentMultiplication(contentSource) {
  const multiplier = new ContentMultiplier();
  const absSource  = path.resolve(contentSource);

  if (!fs.existsSync(absSource)) {
    throw new Error(`Source file not found: ${absSource}`);
  }

  console.log(`\n🚀 Content multiplication starting for: ${absSource}\n`);

  // 1. Extract
  console.log('Step 1/7 — Extracting content...');
  const extraction = multiplier.extractContent(absSource);
  console.log(`  topic: "${extraction.mainTopic}"  type: ${extraction.contentType}`);
  console.log(`  questions: ${extraction.questions.length}  concepts: ${extraction.keyConcepts.length}`);

  // 2. AI Answer Pages
  console.log('\nStep 2/7 — Generating AI answer pages...');
  const answerPages = await multiplier.generateAIAnswerPages(extraction);

  // 3. Authority Article
  console.log('\nStep 3/7 — Generating authority article...');
  const article = await multiplier.generateAuthorityArticle(extraction);

  // 4. Social Content
  console.log('\nStep 4/7 — Generating social content drafts...');
  const socialContent = await multiplier.generateSocialContent(extraction, article);

  // 5. Outreach Campaign
  console.log('\nStep 5/7 — Generating outreach campaign...');
  const outreach = await multiplier.generateOutreachCampaign(extraction);

  // 6. Visual Assets
  console.log('\nStep 6/7 — Generating visual assets...');
  const visuals = await multiplier.generateVisualAssets(extraction);

  // 7. Update Discovery Files
  console.log('\nStep 7/7 — Updating discovery files...');
  await multiplier.updateDiscoveryFiles({ answerPages, article });

  // Report
  const report = {
    timestamp:    new Date().toISOString(),
    source:       absSource,
    topic:        extraction.mainTopic,
    contentType:  extraction.contentType,
    generated: {
      answerPages:      answerPages.length,
      authorityArticle: article.title,
      socialPlatforms:  ['linkedin', 'twitter', 'substack', 'nostr'],
      outreachTargets:  outreach.targets.length,
      visualAssets:     ['diagram', 'checklist']
    },
    weeklyTargets: multiplier.config.weeklyTargets,
    outputFiles: {
      answerPages:  answerPages.map(p => p.filePath),
      article:      article.filePath,
      socialDrafts: socialContent.generatedAt ? 'see output/social/' : null,
      outreach:     'see output/outreach/',
      visuals:      [visuals.diagramPath, visuals.checklistPath]
    }
  };

  const outputDir  = path.join(__dirname, 'output');
  fs.mkdirSync(outputDir, { recursive: true });
  const reportPath = path.join(outputDir, `report-${Date.now()}.json`);
  fs.writeFileSync(reportPath, JSON.stringify(report, null, 2), 'utf8');

  console.log(`\n✅ Content multiplication complete!`);
  console.log(`📊 Report saved: ${reportPath}`);
  console.log(JSON.stringify(report, null, 2));
  return report;
}

module.exports = { runContentMultiplication };

if (require.main === module) {
  const src = process.argv[2];
  if (!src) {
    console.error('Usage: node workflow-integration.js <path-to-content-file>');
    console.error('Example: node automation/workflow-integration.js answers/what-is-bitcoin-self-custody.html');
    process.exit(1);
  }
  runContentMultiplication(src)
    .then(() => process.exit(0))
    .catch(err => { console.error('\n❌', err.message); process.exit(1); });
}
