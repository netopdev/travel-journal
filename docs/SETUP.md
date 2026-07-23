# Setup — do this once before opening Claude Code

Follow these steps in order. Total time: about 30 minutes. Every step is free unless marked with 💰.

This setup gets your LAPTOP ready. Your SERVER gets configured later, during Milestone 8, with the Advisor holding your hand.

## 1. Install Node.js (5 min)

Download the **LTS version** from https://nodejs.org and install with default options.

Verify — open your terminal and run:
```
node --version
npm --version
```
Both should print version numbers.

## 2. Install Claude Code (2 min)

```
npm install -g @anthropic-ai/claude-code
claude --version
```

## 3. Anthropic API key 💰 (5 min)

1. Go to https://console.anthropic.com and sign in
2. **Billing → Add payment method → add $10 credit**
3. **Settings → API Keys → Create key** — copy it, you'll only see it once
4. **Billing → set a monthly usage limit of $20** — safety brake

Never paste this key into a file that gets committed to git.

## 4. Free accounts (5 min total)

| Service | Why | Link |
|---|---|---|
| **GitHub** | Where your code lives | https://github.com/signup |
| **Resend** | Sends your login and newsletter emails | https://resend.com |

That's the whole external footprint. Everything else — database, hosting, image storage — lives on YOUR server.

## 5. Verify SSH access to your server (5 min)

You already own the GCP Rocky Linux VM:
- IP: `34.47.113.8`
- User: `was`

Confirm you can log in:
```
ssh was@34.47.113.8
```
If it asks for a password, that's OK for now — Milestone 8 will convert to SSH keys and disable password login. If you can't reach the server at all, fix that before Milestone 8: check GCP firewall rules allow port 22 from your IP.

Then `exit` back to your laptop.

## 6. Verify GoDaddy DNS access (2 min)

Log in to GoDaddy → My Products → DNS. Confirm you can edit records for your domain. You won't change anything yet — Milestone 8 walks you through pointing your A record at `34.47.113.8`.

## 7. Create the project folder (5 min)

```
mkdir travel-journal
cd travel-journal
```

Then place the files from this package into this folder in this exact shape:
```
travel-journal/
├── CLAUDE.md
└── .claude/
    └── agents/
        ├── frontend.md
        ├── backend.md
        ├── database.md
        ├── content.md
        ├── reviewer.md
        └── sysadmin.md
```

## 8. First run — meet the Advisor

Inside `travel-journal`, run:
```
claude
```
Paste your Anthropic API key when asked. Then send this exact opening message:

> **Hello Advisor. I am Rithynea. This is a fresh project folder with just CLAUDE.md and the specialist agents. I'm building a self-hosted travel journal on my own Rocky Linux server at 34.47.113.8. Please read CLAUDE.md, greet me, list your team including the sysadmin, and propose the first milestone — the Foundations. Don't start yet, just tell me the plan.**

The Advisor will read the project brain, summarize the plan back to you, and wait for your "yes, go".

## Small habits that save money and stress

- **Commit after every milestone.** Every commit is a save point.
- **One milestone per session.** Short, clear sessions cost less and produce better work.
- **When something breaks, describe what you see** — not what you think is wrong.

That's the entire setup. When you're ready, follow steps 1–8, then open the Advisor with the greeting in step 8.
