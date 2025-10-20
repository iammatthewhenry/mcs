# MCS — Next.js + Tailwind (Payload-ready, SES disabled)

A minimal site where:
- `/projects` pulls from Payload CMS (if configured), otherwise shows an empty state.
- `POST /api/contact` stores to Payload (if configured). **Email sending is disabled** for now.

## Run locally
```bash
npm i
cp .env.example .env.local   # leave everything commented for now
npm run dev
# http://localhost:3000
```

## Enable Payload later
Uncomment and fill in `.env.local`:
```
NEXT_PUBLIC_PAYLOAD_URL=https://cms.yourdomain.com
PAYLOAD_URL=https://cms.yourdomain.com
PAYLOAD_API_KEY=YOUR_PAYLOAD_API_KEY
```
- `/projects` will start showing data from your `projects` collection
- `/api/contact` will create docs in `contact-submissions`

## Add SES later (optional)
- Install: `npm i @aws-sdk/client-ses`
- Update `app/api/contact/route.ts` to send via SES after the Payload create.
- Add env vars: `SES_REGION`, `AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`, `MAIL_FROM`, `MAIL_TO`.
