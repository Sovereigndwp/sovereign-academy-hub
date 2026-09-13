# CLAUDE.md — TSA Website and ESA Web Implementation

This repository is the current web implementation home for The Sovereign Academy public website and for Education Sovereign Academy (ESA) web products that have not been separated for a genuine technical or operational reason.

It is not TSA Core and it does not define TSA-wide governance.

## Authority

TSA-wide governance lives in the TSA Core repository. Read `TSA-CANONICAL.md` there first when institutional authority matters.

When instructions conflict, use this order:

1. Dalia's current explicit instruction.
2. Product- or project-specific rules.
3. ESA-specific or TSA-website-specific rules in this repository.
4. TSA-wide rules.
5. Historical or archive material.

More specific current rules may specialize broader TSA rules. Historical material never creates a current instruction merely because it exists.

## Repository roles

This repository currently serves two implementation roles:

- **TSA Website:** the public front door of The Sovereign Academy, introducing the organization and connecting people to its academies and offerings.
- **ESA web implementation:** current Education Sovereign Academy pages, pilots, tools, and related web infrastructure where keeping them here is operationally useful.

This implementation choice does not make ESA subordinate to the website. ESA is a sibling academy alongside FSA and BSA.

Current academies are:

- Education Sovereign Academy (ESA)
- Financially Sovereign Academy (FSA)
- Bitcoin Sovereign Academy (BSA)

Future academies may be added when a distinct domain warrants its own academy. A new academy does not require a monetization path, adversarial-pressure thesis, shared engine, or ontology coverage to exist.

## ESA

ESA applies TSA's sovereignty philosophy to education, teaching, learning, assessment, and educational judgment.

ESA should help teachers, parents, and other education decision-makers understand what is happening, exercise judgment, choose deliberately, and act appropriately. It should not require one universal pedagogy or treat AI as the purpose of the academy.

AI is a major current condition affecting education and may be central to particular ESA products. It is not a requirement that every ESA product be AI-focused.

For student- or teacher-facing products, minimize data collection and avoid student personally identifiable information whenever reasonably possible.

## Free understanding and paid value

Core understanding should remain freely accessible.

TSA and ESA may charge for implementation, tools, kits, diagnostics, templates, workshops, specialized analysis, training, convenience, professional services, and other value beyond freely accessible core understanding.

Do not use confusion as a funnel and do not assume every initiative needs a monetization path before it can be useful or legitimate.

## Design

The TSA website and ESA inherit TSA's shared design system and accessibility principles.

ESA may retain its own established academy color identity and domain-specific imagery. Shared family design does not require visual uniformity across academies.

## Product and repo behavior

Do not assume TSA, ESA, FSA, and BSA must share one engine, pedagogy, workflow, funnel, ontology, monetization model, or technology stack.

Keep implementation where it creates the least unnecessary duplication and operational friction. Do not create a standalone ESA repository merely for organizational symmetry.

Use the simplest process capable of producing a trustworthy result at the appropriate level of risk. Quality controls should be proportional to risk, consequence, uncertainty, and audience.

## Current technical orientation

- Public TSA site: `thesovereign.academy`
- Hosting: Vercel
- ESA review/pilot work may also depend on Supabase edge functions and database state
- Deployment and test behavior should be taken from current repository configuration and current branch state

Before claiming something is shipped, verify both the remote production branch and the live result. A local or unpushed feature branch is not production.

## Active-work rule

Do not treat old BSA/FSA-only maps, old monetization priorities, previous one-engine assumptions, archived plans, or stale product phases as current merely because they remain in the repository.

For current work, prefer the active product specification, current code, current branch state, and Dalia's latest instruction.
