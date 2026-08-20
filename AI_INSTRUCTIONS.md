# Product Feedback App — AI-Assisted Track

## 👋 Welcome!

Imagine you are starting out as a freelance full-stack developer. You've just been hired by your first new client: a startup that is building a new product. The startup is generically named _My Company_.

_My Company_ wants you to build a Product Feedback application, where customers can view and submit feedback about how their product could be improved.

[View the live project demo](https://product-feedback-app-2025.netlify.app/) ✨

![image](https://github.com/user-attachments/assets/5fabe48e-fb2b-4337-94cc-515e64a0bf66)

**For this project, you will use both chat bots and an AI coding agent.** The end result — will be a deployed, working Product Feedback app matching the requirements below. But, instead of hand-writing every line, you'll direct an AI coding agent (e.g. the agent built into your IDE) through a Product Requirements Document (PRD), then take full ownership of testing, fixing, and auditing what it produces.

**The AI agent is not a shortcut around understanding your code.** You are still responsible for every line that ships — you should be able to explain any part of it on request.

---

## 🎯 Project Requirements

You will build the 3 parts of a full-stack application:
- **Database** — built with PostgreSQL and deployed to Neon
- **Server/API** — built with Node and Express and deployed to Render
- **Frontend** — built with React and deployed to Netlify

The frontend should be responsive, and there should be 2 pages:
1. The Home page, where users can:
     - View all suggestions
     - View suggestions filtered by category
     - When there are no suggestions for the currently selected filter, show the "There is no feedback" screen
2. The AddFeedback page, where users can:
     - Submit a new suggestion by filling out a form
     - Receive form validations when trying to submit a new suggestion

## The Tech Stack

| Component | Language | Framework | Deployment | Dev Tools |
|-----------|------------|----------------|------------|-------|
| Frontend  | HTML, CSS, JavaScript | React         | Netlify   | |
| Server/API | Node.js     | Express       | Render    | Postman for API testing |
| Database  | PostgreSQL |               | Neon    | |

## 🔗 Resources

- **Designs:** [Figma file](https://www.figma.com/design/vxjX8SdBOt21DCD14mrBM9/Product-Feedback-App-Design?node-id=0-1&t=OH1BSnaLrvNeWMlQ-1)
- **Documentation Guides:** [AnnieCannons Github & tooling guides](https://docs.google.com/document/d/18jxCUA0bebCyYaIHy8aaKMgOQH4w5-b-iCGDWpV4K4M/edit?tab=t.0#heading=h.ykdbmvmlp0ag)
- **Neon deployment guide:** [Deploy database to Neon](https://github.com/AnnieCannons/countries-api-project-may-2025/blob/main/version-4/deploy-database-to-neon.md)
- **Render deployment guide:** [Deploy server to Render](https://github.com/AnnieCannons/countries-app-instructions/blob/main/version-5/deploy-server-to-render.md)

---

## ✅ Deliverables

Submit the following to the LMS:

1. **Your PRD** (as a doc link or a file in your repo)
2. **Link to your Github repo**
3. **Link to your deployment** (frontend URL — include your Render API URL and Neon project name in your README)
4. **Lighthouse score** (screenshot or exported report — see Milestone 9)
5. **A robust README** with full project documentation (see Milestone 10)
6. **AI usage log** — a short section in your README, or a separate `AI_LOG.md`, noting which tool(s) you used and roughly what you prompted for at each milestone. 
7. **Present a piece of your project** — meet with your instructor Thursday at the start of Block A to decide what you'll present, then present it in Block C or D (live demo or code walkthrough, depending on what you built). Read through your code thoroughly beforehand — be ready to speak to what you built, how it differed from writing the code yourself, what was challenging, and other thoughts you have about learning this new tool (see Milestone 11).

---

## 🚀 Roadmap: Step-by-step guide to building this project (AI-assisted)

---

### 🎯 Milestone 1: Write your PRD (Product Requirements Document)

Before starting your project, have Claude or another AI write a PRD that fully specifies what you're building. 

Your PRD should cover:
- **Overview** — what the app does and who it's for (adapt the intro above)
- **Pages & user flows** — Home page and AddFeedback page, with every interaction spelled out (filtering, empty state, form validation rules, etc.)
- **Data model** — what a "suggestion" record needs (fields, types, categories)
- **API endpoints** — method, path, request/response shape for each endpoint you'll need (get all suggestions, get by category, add one)
- **Tech stack & deployment targets** — Neon, Render, Netlify
- **Design reference** — link to the [Figma file](https://www.figma.com/design/vxjX8SdBOt21DCD14mrBM9/Product-Feedback-App-Design?node-id=0-1&t=OH1BSnaLrvNeWMlQ-1) and any notes on responsive behavior, or send screenshots to the AI
- **Out of scope** — explicitly note what you are *not* building yet (helps stop the agent from over-building)

Refer to the [Countries API Documentation](https://github.com/AnnieCannons/countries-app-instructions/blob/main/version-3/api-documentation.md) as a model for how precise your API section should be.

---

### 🎯 Milestone 2: Set up your repo with an AI agent

1. To start the project, you can either:
   * Fork and clone [this repo](https://github.com/AnnieCannons/product-feedback-app) to your local machine. Use this [fork and clone guide](https://docs.google.com/document/d/18jxCUA0bebCyYaIHy8aaKMgOQH4w5-b-iCGDWpV4K4M/edit?tab=t.55gk3qetux2a#heading=h.wbbot8ebr58a) to help you, OR
   * Ask the bot to create the repo for you at `/documents/dev` (so it knows where the project should live on your local machine).
2. Open the project in your IDE.
   * If you forked and cloned, the `client`/`server` structure is already there for you — skip ahead to Milestone 3.
   * If you asked the bot to create the repo, let the **AI agent** (not you, manually) scaffold the root project structure — `client` and `server` folders, `package.json` files, `.gitignore`, etc. — based on your PRD's tech stack section.
3. Review what the agent created before moving on. Confirm it matches what your PRD asked for.

---

### 🎯 Milestone 3: Re-read your PRD before feeding it to the agent

Do not skip this step. Read your entire PRD top to bottom as if you were the AI agent about to implement it:
- Is every field, endpoint, and interaction unambiguous?
- Could two different developers read this and build the same thing?
- Are there gaps the agent will have to guess at?

Fix anything unclear now — it's much cheaper to fix a sentence in your PRD than to debug a wrong assumption baked into generated code.

---

### 🎯 Milestone 4: Feed your PRD to the agent and build in stages

Don't ask the agent to build the whole app in one shot. Work through it in the same order as the standard track, reviewing output at each step:

1. **Database** — have the agent generate the SQL schema from your PRD's data model. Insert at least 3 rows of sample data. Deploy to Neon (project name `suggestions`) using the [Neon deployment guide](https://github.com/AnnieCannons/countries-api-project-may-2025/blob/main/version-4/deploy-database-to-neon.md).
2. **Server/API** — have the agent build the endpoints from your PRD's API section:
   - `GET /get-all-suggestions`
   - `GET /get-suggestions-by-category/:category`
   - `POST /add-one-suggestion`

   Test every endpoint yourself in Postman — don't trust the agent's claim that it works. Push to Github.
3. **Frontend** — have the agent build the Home and AddFeedback pages per your PRD and the Figma designs. Push to Github.

**Commit and push after each stage, not just at the end** — you want a history you can point to if something breaks.

---

### 🎯 Milestone 5: Full testing

Test every user flow yourself, manually, in the browser:
- Viewing all suggestions
- Filtering suggestions by category
- The empty-state screen when a filter has no results
- Submitting a new suggestion, including form validation (missing fields, invalid input)
- Refresh the page and check your database directly to confirm data is actually persisting

Log 3–5 bugs as GitHub Issues as you find them, not batched at the end — repro steps are easiest to capture in the moment. Keep each one to 3 lines:
- What you did
- What you expected
- What happened instead

Screenshot only if it's a UI bug. Label each issue `backend` or `frontend` — you'll fix the backend ones in Milestone 6 and the frontend ones in Milestone 7.

**To file an issue:** on your repo's GitHub page, go to the **Issues** tab → **New issue** → title it with the short symptom, paste in the 3 lines as the description, then add the `backend` or `frontend` label from the sidebar before submitting.

You don't need to submit these separately — your instructor can see them from the Issues tab on the Github repo link you're already submitting.

---

### 🎯 Milestone 6: Debug and fix backend/API issues

**Before you start:** create a new branch off `main` for this milestone's fixes (e.g. `fix/backend-bugs`).

Work through the bug log from Milestone 5. Fix anything that traces back to your API or database — not just the symptom you saw in the UI:
- Re-test each fixed endpoint in Postman to confirm the fix, not just whatever the agent claims in its output
- Re-check that data is actually persisting to the database correctly after your fix
- If a bug traces back to an ambiguous or incomplete part of your PRD, fix the PRD too — that's a sign the agent guessed wrong because the spec left room to

Commit fixes separately from your UI fixes in the next milestone, so your history shows what layer each fix touched.

**When you're done:** open a PR from your branch back to `main`, write a real PR description, read your full diff one more time, then merge.

---

### 🎯 Milestone 7: Fix the UI

**Before you start:** create a new branch off `main` for this milestone's fixes (e.g. `fix/ui`).

Compare your rendered app side-by-side with the [Figma designs](https://www.figma.com/design/vxjX8SdBOt21DCD14mrBM9/Product-Feedback-App-Design?node-id=0-1&t=OH1BSnaLrvNeWMlQ-1). AI-generated UI code frequently drifts from spacing, color, and responsive-behavior specs — fix any mismatches, and check your layout at mobile, tablet, and desktop widths.

**When you're done:** open a PR from your branch back to `main`, write a real PR description, read your full diff one more time, then merge.

---

### 🎯 Milestone 8: Accessibility and security audits

**Before you start:** create a new branch off `main` for this milestone's fixes (e.g. `fix/a11y-security`).

**Accessibility audit:**
- Run Lighthouse's Accessibility check (or the axe browser extension) against your local build, for both pages
- Check for: alt text on images, proper form labels, sufficient color contrast, keyboard navigability, semantic HTML
- Fix what you find

**Security audit:**
- Confirm no secrets (database credentials, API keys) are committed to Github — check your `.gitignore` covers `.env` and `config.js` if it holds credentials
- Confirm your API validates and sanitizes input server-side (not just in the frontend form) to guard against bad or malicious data
- Confirm your database queries use parameterized queries, not raw string concatenation, to prevent SQL injection
- Check CORS is configured to your actual frontend origin, not left wide open

**When you're done:** open a PR from your branch back to `main`, write a real PR description, read your full diff one more time, then merge.

---

### 🎯 Milestone 9: Deploy and run Lighthouse

**Before you start:** create a new branch off `main` for this milestone's fixes (e.g. `fix/deploy-lighthouse`).

1. Deploy your server/API to Render and your frontend to Netlify. Use the [Render deployment guide](https://github.com/AnnieCannons/countries-app-instructions/blob/main/version-5/deploy-server-to-render.md).
2. Re-test all user flows against your live, deployed URLs (not just localhost).
3. Re-run Lighthouse against your deployed frontend (Chrome DevTools → Lighthouse tab). Save the report or a screenshot of the scores (Performance, Accessibility, Best Practices, SEO) — this is one of your deliverables.
4. If your Performance or Accessibility score is low, go back and fix what Lighthouse flags before submitting.

**When you're done:** open a PR from your branch back to `main`, write a real PR description, read your full diff one more time, then merge.

---

### 🎯 Milestone 10: Write your README

Your README should explain what your project is about, its tech stack, how to run it locally, and links to your live deployment. Use the [README.md template](https://github.com/AnnieCannons/countries-app-instructions/blob/main/version-5/write-your-README.md) as a starting point. If you're keeping an AI usage log, link or embed it here too.

---

### 🎯 Milestone 11: Present your project

1. **Thursday, start of Block A:** meet with your instructor to decide what piece of your project you'll present. Come with an idea if you have one — a feature, a tricky bug you chased down, a design decision — or figure it out together in the conversation.
2. **Blocks C and D:** give your presentation.
   - If what you're presenting is visual (frontend, a UI flow), do a live demo.
   - If it's backend/database work with nothing to click through, walk through the code instead.
   - Either way, be ready to speak to: what you built, what was different about building it this way versus writing the code yourself, what was challenging, and what's exciting to you about working with this tool.

---

### 🎯 Final Milestone: Submit

1. Push your final code to Github.
2. Submit to the LMS: your PRD, your Github repo link, your deployment link, your Lighthouse score, and your README.

---

## 💡 Tips for working with an AI agent

1. **Treat the PRD as the contract, not a suggestion.** The more precise it is, the less the agent has to guess — and the less you'll have to redo.
2. **Review every diff before accepting it.** Don't accept agent-generated code you haven't read and understood. If you can't explain what a block of code does, stop and ask the agent to explain it before moving on.
3. **Work in small stages, like the milestones above.** Asking for the whole app at once makes broken output much harder to debug.
4. **Commit often.** A clean commit history per milestone makes it easy to isolate when something broke.
5. **Git workflow:** commit and push directly to `main` for Milestones 2 and 4 (nothing exists yet to conflict with). Starting with Milestone 6, each milestone gets its own branch and its own PR back to `main` (see the "Before you start" / "When you're done" steps in Milestones 6-9) — writing a real PR description and reading your full diff one more time before it hits `main` mirrors real code-review workflow, and it's often where you catch something the agent got wrong. Your README (Milestone 10) is low-risk enough to commit straight to `main`.
6. **You should understand the project and be working on how to write better prompts.** You are working with the AI, it is not working for you.

---

## 📋 Deliverables Checklist

| Category | What "done" looks like |
|---|---|
| PRD quality | PRD is complete, unambiguous, and covers data model, API, pages/flows, and design reference. Someone else could implement it without guessing. |
| Functional requirements | Both pages work exactly as specified: viewing, filtering, empty state, submission with validation. All 3 tiers (DB, API, frontend) are integrated correctly. |
| Testing evidence | Clear evidence (notes, commits, bug log) that all user flows were manually tested, both locally and post-deployment. |
| UI fidelity & responsiveness | Matches Figma designs; works cleanly at mobile, tablet, and desktop widths. |
| Accessibility audit | Audit was run, issues were identified, and fixes are visible in the code (labels, alt text, contrast, keyboard nav). |
| Security audit | No committed secrets; input is validated/sanitized server-side; parameterized queries; CORS scoped correctly. |
| Lighthouse score | Deployed site scores well across Performance, Accessibility, Best Practices, and SEO; low scores were investigated and addressed. |
| README & documentation | README clearly explains the project, stack, and setup; a newcomer could understand and run the project from it alone. |
| Code understanding & presentation | Student can explain any part of the codebase when asked — architecture, a specific function, or a design decision — regardless of whether an AI agent wrote it. Demonstrated live in the Block C/D presentation. |

---

## 🌟 Stretch Goals (Optional)

Finished the main requirements? Here are some bonus challenges:

- 🏆 Upvote product suggestions
- 🏆 Add a hamburger menu in mobile view
- 🏆 Sort suggestions by most/least upvotes and most/least comments
- 🏆 Edit an existing suggestion
- 🏆 Delete an existing suggestion
- 🏆 Add comments to an existing suggestion
- 🏆 Implement multi-filtering
- 🏆 Add loading and error states for data fetching (spinner while loading, friendly message on a failed request)
