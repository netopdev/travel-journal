# Milestone prompts — self-hosted edition

Paste these one at a time to the Advisor. Only move to the next after the current one is finished, committed, and you're happy with the result.

Milestones 1–7 build the site fully on your **laptop**. Milestones 8–9 prepare your **server** and ship the site live at your domain.

---

## Milestone 1 — Foundations

> Advisor, let's start Milestone 1: Foundations. Scaffold a Next.js 15 project in this folder with TypeScript, Tailwind v4, and the App Router. Set up the Fraunces + Inter fonts via next/font/google, apply the warm design tokens from CLAUDE.md as CSS variables in globals.css, and create a simple homepage that says "Rithynea's Travel Journal" in Fraunces with a short tagline in Inter. When done, tell me exactly how to run `npm run dev` and what URL to open.

Expected result: you visit http://localhost:3000 and see a warm, empty homepage.

---

## Milestone 2 — Database + admin login (local dev)

> Milestone 2: Database + auth. For local development, I'll run Postgres via a small Docker container OR you can walk me through installing Postgres 16 locally — recommend whichever is easier for my Mac/Windows/Linux (please ask). Delegate to `database` to set up Drizzle with the schema from CLAUDE.md and generate the first migration. Then delegate to `backend` to install Auth.js v5 with a magic-link email provider (Resend), gated to a single ADMIN_EMAIL. Frontend: a minimal `/admin` page that says "Welcome Rithynea" if I'm logged in, and a `/signin` page otherwise. Tell me exactly which environment variables to add to `.env.local` and where to get each value. AUTH_SECRET: generate it for me.

Expected result: you receive a login email, click the link, and land on a bare `/admin` page.

---

## Milestone 3 — Write & publish

> Milestone 3: Write & publish. Build the admin post editor at `/admin/posts/new`. It should have: title, subtitle, MDX body, hero image upload, location fields (name + lat/lng), tags, and a "Save as draft" vs "Publish" toggle. **Store uploaded images to a local folder `/uploads/` (relative to the app), not to any cloud service — this project is self-hosted.** Save the file path in the media_items table. Delegate the UI to `frontend`, the upload + save to `backend`, and any needed schema tweaks to `database`. Have `reviewer` check it before I see it.

Expected result: you can log in, write a test post, upload a photo, and save it. The image lives on your laptop under `./uploads/`.

---

## Milestone 4 — Read (the public post page)

> Milestone 4: Public post pages. Build `/trip/[slug]` — hero image at top, title in Fraunces, subtitle, publish date, MDX body rendered with proper typography, embedded YouTube support, a photo gallery below, and a "Read next" section pulling the two most recent other posts. Homepage `/` should now show the 6 most recent published posts as cards. Frontend + content specialists in parallel, please.

Expected result: your test post is live at `/trip/your-slug` and appears on the homepage.

---

## Milestone 5 — The map

> Milestone 5: The trips map. Build `/map` — a full-screen Leaflet map with OpenStreetMap tiles, one pin per published post at its location, and a click on a pin opens a small card with the title, date, and a "Read this trip →" link to `/trip/[slug]`. Client component only. Make sure it works on mobile.

Expected result: `/map` shows a pin for your test post.

---

## Milestone 6 — Community (comments + newsletter)

> Milestone 6: Community. Two things in parallel:
> 1. Comments: a form under each `/trip/[slug]` where visitors leave name, email, comment. Save with `approved: false`. Admin page `/admin/comments` lists pending comments with approve/delete buttons.
> 2. Newsletter: a `/subscribe` page with a single email field. On submit, save to the subscribers table and send a Resend confirmation email with an unsubscribe link.
> Rate-limit both endpoints. Reviewer must check before I see it.

Expected result: you can leave a test comment, approve it in admin, and subscribe to your own newsletter.

---

## Milestone 7 — Polish

> Milestone 7: Polish pass. Delegate in parallel: `frontend` adds subtle scroll-reveal animations (respect prefers-reduced-motion), a dark-mode toggle, and a `/tags/[tag]` page. `backend` generates a sitemap.xml and rss.xml. `content` writes an `/about` page draft I can edit. Reviewer runs a full check.

Expected result: the site feels finished. Dark mode works. Tags work.

---

## Milestone 8 — Prepare the server

> Milestone 8: Prepare my Rocky Linux server. Delegate all of this to `sysadmin`. My server: IP 34.47.113.8, user `was`, Rocky Linux 9, 2 CPU, 8 GB RAM, fresh install. My domain is registered at GoDaddy (I'll paste the exact domain when you ask). Please walk me through, in this order:
>
> 1. Verify I can SSH in with a key (help me create one if I don't have one; disable password login after).
> 2. `dnf update -y`, install `epel-release`, and configure `firewalld` — only ports 22, 80, 443 open.
> 3. Install Node.js 20 LTS from NodeSource. Install PM2 globally.
> 4. Install Postgres 16 (from the dnf module). Initialize it, start it, create the `travel_journal` database and a `travel_journal_app` role with a strong password. Configure `pg_hba.conf` for local password auth on 127.0.0.1 only.
> 5. Install Caddy 2 from the official repo. Ask me for my domain name. Write `/etc/caddy/Caddyfile` that reverse-proxies my domain to `localhost:3000` and serves `/uploads/*` from disk.
> 6. Walk me through pointing GoDaddy DNS A record to 34.47.113.8. Explain propagation and how to check.
> 7. Create `/var/www/travel-journal`, clone my repo there, set correct ownership (`was:was`) and permissions.
> 8. Create `/var/www/travel-journal/.env.production` (mode 600) — walk me through every env var I need to set.
> 9. Write `deploy.sh` at the repo root — idempotent, safe to re-run, prints clear success/failure at each step.
> 10. Never disable firewalld or SELinux. Explain every command before running it. Show me `systemctl status` after each service starts.

Expected result: `https://your-domain.com` responds with a valid TLS certificate but shows a friendly "site not yet deployed" placeholder page (or a 502 — that's fine; means Caddy is proxying to Node which isn't running yet).

---

## Milestone 9 — Ship & harden

> Milestone 9: Ship it and lock it down. Delegate to `sysadmin`, but coordinate with the rest of the team where needed.
>
> 1. From my laptop, `git push` the current code to GitHub.
> 2. SSH to the server, `cd /var/www/travel-journal`, run `./deploy.sh` for the first time. Watch the logs together. If any step fails, investigate.
> 3. Verify: `pm2 status` shows travel-journal running; `curl -I https://your-domain.com` returns 200; visit the homepage in a browser; visit `/signin` and confirm the magic link email arrives from my production domain.
> 4. Set up automated Postgres backups: daily `pg_dump` to `/var/backups/postgres/`, keep 14 days, via a systemd timer.
> 5. Enable `dnf-automatic` for security updates only (never full unattended upgrades).
> 6. Run Lighthouse on my live site. Report the four scores. Fix any red or orange.
> 7. Tag the commit as `v1.0.0` and push the tag.
> 8. Do a final security review: SSH root disabled? Password auth off? Firewall only 22/80/443? Postgres bound to 127.0.0.1 only? Env file mode 600? SELinux enforcing?
> 9. Celebrate 🐘. Then tell me the exact 3-line command sequence I'll use every time I deploy from now on.

Expected result: your travel journal is live at your own domain, on your own server, backed up daily, patched automatically, hardened, and yours.

---

## Anytime — writing a new trip post

Once the site is live, this is your everyday workflow — no code, no server:

> Advisor, I just got back from [trip name]. Send `content` to help me draft an outline based on these notes: [paste your rough notes]. When the outline looks good, I'll write the piece in the admin editor at https://your-domain.com/admin.

---

## Anytime — deploying a change

After you and the team have made local changes and committed them:

> Advisor, I have new commits to deploy. Please walk me through pushing to GitHub, SSH-ing in, running deploy.sh, and verifying health. If deploy.sh needs improvement, hand it to `sysadmin`.

Expected result: about 60 seconds later, your changes are live.

---

## When something goes wrong

> Advisor, I see [describe what's on the screen or in the terminal]. Please investigate and fix. If it's a server issue, delegate to `sysadmin`. If it's application code, the right specialist. If it's my mistake, tell me plainly.

That's the whole system. You steer, they build, you own everything.
