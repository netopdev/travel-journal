# Travel Journal — Progress Tracker

## Current Status
**Active Milestone:** 2 — Database + admin login (NEXT UP)
**Overall progress:** 1 / 9 milestones complete — **11%**
**Phase:** Local build (Milestones 1–7)
**Server:** Not yet set up (Milestones 8–9)
**Domain:** Not yet provided (placeholder in use)

---

## Milestones

| # | Title | Status | Notes |
|---|---|---|---|
| 1 | Foundations — scaffold, Tailwind, fonts, homepage | ✅ Complete | Finished 2026-07-23 |
| 2 | Database + admin login | ⬜ Not started | |
| 3 | Write & publish | ⬜ Not started | |
| 4 | Read (public post page) | ⬜ Not started | |
| 5 | The map | ⬜ Not started | |
| 6 | Community (comments + newsletter) | ⬜ Not started | |
| 7 | Polish | ⬜ Not started | |
| 8 | Prepare the server | ⬜ Not started | |
| 9 | Ship & harden | ⬜ Not started | |

---

## Where We Stand
- Milestone 1 complete: Next.js 15 scaffold, Tailwind v4, Fraunces + Inter fonts, all 9 design tokens, homepage skeleton
- Code is on GitHub at `github.com/netopdev/travel-journal` (main branch)
- Homepage runs locally via `npm run dev` → http://localhost:3000
- No database, no auth, no admin UI yet (Milestone 2)
- No server work done yet (Milestones 8–9)
- No domain name provided yet (Rithynea will supply when ready)

---

## What's Blocking
_Nothing is blocking right now._ Milestone 2 can begin immediately.

_(This section will list any blockers: missing env vars, a decision needed from Rithynea, a tool that isn't set up, etc.)_

---

## Money So Far
| Item | Cost |
|---|---|
| Claude API usage (Milestones 1 + dashboard setup) | ~$0.50 est. |
| Resend (email) | $0 — free tier, not yet wired up |
| GoDaddy domain | already paid (recurring) |
| Rocky Linux VM | already paid (recurring) |
| **Total new spend this project** | **~$0.50** |

_(Update after each session with any new API charges.)_

---

## Key Decisions Logged
- Stack: Next.js 15, Tailwind v4, Fraunces + Inter, Drizzle + Postgres, Auth.js v5, Resend, Leaflet
- Hosting: Rocky Linux VM at 34.47.113.8, user `was`, Caddy + PM2 + Postgres
- Single admin user, gated by `ADMIN_EMAIL` env var
- Media stored on local disk at `/var/www/travel-journal/uploads/`
- GitHub repo: `github.com/netopdev/travel-journal` (public)
