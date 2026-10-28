# ES API (Azure Functions)

One small API shared by every Enriched Solutions project. A website or app posts a form submission to it; it validates the
submission and delivers it through **Resend**. The website in the repo root uses it through its existing
`LEAD_WEBHOOK_URL` setting, so adding it needs no website code change.

It is its own package (own `package.json`, own deploy) and is excluded from the website's build. It can be moved to its own
repository later without changes.

## Endpoints

| Method and route | Auth | What it does |
| --- | --- | --- |
| `POST /api/lead` | **Function key** (`x-functions-key` header) | Validates and delivers one submission |
| `GET /api/health` | None | `{ "ok": true }`. A liveness check; reveals nothing about configuration |

### `POST /api/lead`

```json
{
  "source": "ekg-booking",
  "site": "enrichedsolutions.net",
  "name": "Ada Lovelace",
  "email": "ada@example.com",
  "organization": "Acme Conf",
  "format": "conference",
  "eventDate": "Spring 2027",
  "message": "Anything the person wrote"
}
```

- `email` (valid address) and `source` (lower-case letters, digits and dashes, up to 40 characters) are always required.
- `site` says which project it came from. It is shown in the email.
- **A `source` ending in `-booking` is an inquiry** (someone asking to hire or book): `name` is required, the other fields
  are used, and it is **only emailed to the team**. It is never added to a marketing list.
- **Any other `source` is a sign-up**: it is emailed to the team **and** saved as a contact in `RESEND_SEGMENT_ID`.
- A new project needs no code change here: pick a `source` name and post to it. To give it a friendly name in email subjects,
  add it to `sourceNames` in `src/lead.ts`.

| Status | Meaning |
| --- | --- |
| `200` | Delivered (the email or the contact went through) |
| `400` | The body is not a JSON object |
| `413` | The body is over 8,192 characters |
| `422` | `invalid_email`, `invalid_source`, or `invalid_field` (an inquiry with no name) |
| `502` | Resend failed or could not be reached |
| `503` | Not configured (no `RESEND_API_KEY`, or nowhere to send). The caller must not tell the visitor it worked |

Emails are plain text only, control characters are stripped, and the logs record only the HTTP status and Resend's error name,
never a name, address or message.

## Settings

Set as Function App application settings (local: `local.settings.json`, copied from `local.settings.sample.json`).

| Setting | Required | What it is |
| --- | --- | --- |
| `RESEND_API_KEY` | Yes | A Resend key with sending access |
| `LEAD_NOTIFY_EMAIL` | Yes, unless `RESEND_SEGMENT_ID` alone is enough for sign-ups | Where notification emails arrive. Replying answers the person who submitted |
| `LEAD_FROM_EMAIL` | No | The sender. Empty uses Resend's test sender (`onboarding@resend.dev`), which only delivers to the **Resend account owner's own address**. After verifying a domain in Resend, use e.g. `Enriched Solutions <hello@enrichedsolutions.net>` |
| `RESEND_SEGMENT_ID` | No | Sign-ups are also saved to this segment. Booking inquiries never are |

Keep `RESEND_API_KEY` in Key Vault and reference it from the app setting as
`@Microsoft.KeyVault(SecretUri=https://<vault>.vault.azure.net/secrets/<name>/)`, using the Function App's managed identity.

## Run and test locally

```bash
cd azure-api
npm install
npm test            # 30 unit and contract tests, no Azure or Resend needed
npm run typecheck
cp local.settings.sample.json local.settings.json   # then fill in the Resend values
npm start           # needs Azure Functions Core Tools v4 (`func`)
```

## Deploy

> **These commands were not run.** The build environment could not reach Azure or install the Functions tooling. Treat them
> as a starting point and check flags with `az functionapp create --help` for your CLI version.

```bash
RG=es-rg; LOC=eastus; APP=es-api-<something-unique>; ST=esapi<unique-lowercase-letters>

az login
az group create -n $RG -l $LOC
az storage account create -n $ST -g $RG -l $LOC --sku Standard_LRS
az functionapp create -g $RG -n $APP --storage-account $ST \
  --flexconsumption-location $LOC --runtime node --runtime-version 22

az functionapp config appsettings set -g $RG -n $APP --settings \
  RESEND_API_KEY=<key> LEAD_NOTIFY_EMAIL=<address> RESEND_SEGMENT_ID=<segment id>

npm ci && npm run build && npm prune --omit=dev
func azure functionapp publish $APP

curl https://$APP.azurewebsites.net/api/health          # {"ok":true}
az functionapp keys list -g $RG -n $APP                  # the function key for the website
```

### Connect the website

In the website's environment variables:

```
LEAD_WEBHOOK_URL=https://<APP>.azurewebsites.net/api/lead
LEAD_WEBHOOK_KEY=<function key>
RESEND_API_KEY=            # leave EMPTY, or the site will use Resend directly and skip this API
```

Then submit the EKG booking form and check that the email arrives.

## Other projects

- Call it **from a server** (a Next.js route, a Function, a backend). The function key must never ship in browser code.
- If a browser must call it directly, add the project's origin under the Function App's CORS settings and put the API behind
  something that holds the key (for example Azure API Management) instead of using the function key in the page.
- There is no rate limiting in the code. For a public-facing deployment, add it at the edge (API Management, Front Door or a
  WAF rule) and rotate the function key if it leaks.
- Resend delivery limits and the sending domain are Resend account settings, shared by everything that uses this API.

## What was and was not verified

- **Verified:** the validation and delivery logic (30 tests, including a fixture of the exact payload the website forwards),
  the TypeScript build output layout Azure expects (`dist/src/functions/*.js`), and the Function wrapper called with a real
  `HttpRequest`.
- **Not verified:** running under the real Functions host (the Core Tools could not be installed here), the Azure commands
  above, and the Resend contact-saving call against Resend's live API.
