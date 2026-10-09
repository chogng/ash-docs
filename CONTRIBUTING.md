# Contributing to Ash Docs

## Repository model

This repository is maintained by one developer. `main` is the working branch, so normal documentation changes can be made and committed directly on `main`. Pull requests are not required.

The public documentation source lives in `docs/`. The site entry point is `index.html`, and the Docsify navigation generator lives in `build/generate-sidebar.js`. Product implementation and internal engineering contracts remain in the Ash source repository.

Do not commit generated or local runtime directories such as `.build/`, `dist/`, or `.wrangler/`.

## Maintain an article

Use lowercase file and directory names with dashes, for example `docs/customize/agent-tools.md`.

Every article must have the required frontmatter:

```yaml
---
ContentId: <unique UUID>
DateApproved: 9/21/2026
MetaDescription: <description no longer than 160 characters>
MetaSocialImage: ../../og.png
Keywords:
  - Ash
  - Agent
---
# Article title

Introductory paragraph.

## Main section
```

Keep one H1 per article, put an introductory paragraph directly after it, and use H2 headings for the main sections. Update `DateApproved` when the article receives a substantial review or content update.

Add every article to `docs/toc.json`. The TOC entry controls whether the article is published and determines its position in the navigation. Use `/docs/...md` for links between documentation articles.

When product behavior changes, update the product source and the corresponding documentation in the same change window. Do not move a published article casually. This repository does not yet provide a redirect registry or a sitemap, so URL changes need an explicit redirect implementation before they are made.

## Direct-main workflow

1. Synchronize the working branch:

   ```bash
   git switch main
   git pull --ff-only origin main
   ```

2. Edit the Markdown article and update `docs/toc.json` when navigation changes.

3. Preview the site locally:

   ```bash
   npm run serve
   ```

   Open `http://localhost:3000` and check the article, navigation, links, search, and responsive layout. The preview follows the same lightweight Docsify model used by `../vscode-docs`: the browser requests Markdown files and renders them at runtime.

4. Run the complete verification suite:

   ```bash
   npm run verify
   ```

5. Commit the focused change directly on `main`:

   ```bash
   git add docs/ docs/toc.json
   git commit -m "docs: update agent tools guide"
   git push origin main
   ```

Use a short-lived branch when a change is risky or needs to remain unpublished for a long time. The branch does not need to result in a pull request.

## Publish with GitHub Pages

Publishing uses `.github/workflows/pages.yml`. A push to `main` runs the same
`npm run verify` suite, uploads `dist/`, and deploys that artifact to GitHub Pages.
Pull requests run validation without deploying.

In the repository settings, set **Pages → Build and deployment → Source** to
**GitHub Actions**. The workflow uses the `github-pages` environment; preserve
any review protection configured there. The deployment job reports the live URL.

Before pushing, preview the site and verify navigation, search, article links,
and responsive layout. GitHub project Pages may live under `/ash-docs/`, so use
relative asset paths and test that subpath as well as the domain root.

After deployment, check the live homepage and a deep article link. Do not report
a release as published until the workflow and live checks have passed. To roll
back, revert the source change and let the same workflow deploy the reverted
commit. Production publishing no longer uses Sites or a separate Sites handoff.
