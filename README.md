# Rithynea's Travel Journal — Self-Hosted Prompt Package

Everything you need to build your personal travel journal, running entirely on your own Rocky Linux server (`34.47.113.8`) at your own GoDaddy domain.

## What's in this package

```
travel-journal/
├── CLAUDE.md                    ← the master project brain (self-hosted edition)
├── .claude/
│   └── agents/                  ← your specialist team (6 members)
│       ├── frontend.md          🎨 pages, components, styling
│       ├── backend.md           ⚙️ API routes, auth, uploads
│       ├── database.md          🗄️ schemas, migrations, queries
│       ├── content.md           ✍️ article drafts, copy, alt text
│       ├── reviewer.md          🛡️ read-only quality check
│       └── sysadmin.md          🔧 YOUR SERVER — SSH, dnf, Caddy, PM2, Postgres
└── docs/
    ├── SETUP.md                 ← do this once before starting
    └── MILESTONES.md            ← the exact prompts to paste, in order (9 milestones)
```

## How it all fits together

You put these files in a new empty folder called `travel-journal`, run `claude` inside that folder, and start telling the Advisor what you want in plain English. The Advisor reads `CLAUDE.md`, plans the work, and delegates to one of the specialists.

## The mental picture

```
        YOU  (in your terminal, typing plain English)
             │
             ▼
        🧭 Advisor  ─ reads CLAUDE.md, plans, delegates
             │
   ┌─────────┼─────────┬──────────┬────────┬──────────┐
   ▼         ▼         ▼          ▼        ▼          ▼
  🎨       ⚙️        🗄️        ✍️       🛡️        🔧
Frontend  Backend  Database  Content  Reviewer  Sysadmin
                                                    │
                                                    ▼
                                    Your Rocky Linux server (34.47.113.8)
             │
             ▼
        Your travel website  ←→  https://your-domain.com
```

## Do this in order

1. Read `docs/SETUP.md` and follow every step.
2. Once setup is done, paste the Milestone 1 prompt from `docs/MILESTONES.md`.
3. When the Advisor says a milestone is complete and you've verified it, move to the next one.
4. Milestones 1–7 build the site on your laptop.
5. Milestone 8 prepares the server (SSH keys, firewall, Node, Postgres, Caddy, DNS).
6. Milestone 9 ships the site live and hardens the server (backups, patching, security review).

## Time, money, and ownership

- **Setup:** ~30 minutes, ~$10 API credit added
- **Milestones 1–7 (laptop build):** ~5–10 hours of your steering time
- **Milestones 8–9 (server + ship):** ~2–4 hours (mostly waiting for commands)
- **API cost total:** roughly $10–20
- **Monthly cost when live:** your GCP VM (already paid) + your GoDaddy domain (already paid) + Resend free tier = **$0 marginal**
- **Ownership:** everything is yours. Your data, your uptime, your rules.

## What to do when

| Situation | Do this |
|---|---|
| Ready to start a new milestone | Paste the prompt from `MILESTONES.md` |
| Something looks broken | Describe what's on your screen in plain English |
| Something on the SERVER looks broken | Same — the Advisor will delegate to `sysadmin` |
| Want to publish a new trip post | Log in at `https://your-domain.com/admin`, write it in the editor |
| Want to deploy new code | `git push`, `ssh was@34.47.113.8`, `cd /var/www/travel-journal && ./deploy.sh` |
| A session feels slow or confused | Ask the Advisor to summarize state and start a new session |
| You want to change the stack or design | Update `CLAUDE.md`, tell the Advisor "I updated CLAUDE.md, please re-read it" |

Your box, your domain, your journal. 🐘
