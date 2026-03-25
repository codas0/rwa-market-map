# Tokenized RWA Market Map

Interactive dashboard mapping the tokenized real-world asset market as of March 2026. Covers $26.5B in distributed RWA value across 73 products and 55,000+ holders.

## What's Inside

- **Market overview** — KPIs, treasury growth timeline, RWA category breakdown, chain distribution
- **12 tokenized Treasury products** — sortable by AUM, yield, holders, chains. Filterable by investor access (Retail / Accredited / QP / Institutional)
- **Maturity & underlying assets** — WAM profiles and actual holdings for each product
- **Issuer profiles** — side-by-side comparison of Ondo, Securitize, Franklin Templeton, WisdomTree, Superstate, Fidelity
- **Regulatory access matrix** — which products are accessible to retail vs qualified purchasers
- **Yield vs fee comparison** chart
- **Dark mode** toggle

## Data Sources

- [RWA.xyz](https://app.rwa.xyz/treasuries)
- [Arkham Intelligence](https://info.arkm.com)
- SEC filings and issuer disclosures
- Point-in-time: March 24, 2026

## Tech Stack

- React + TypeScript + Vite
- Tailwind CSS + shadcn/ui
- Recharts for data visualization
- Express backend (dev only — deploys as static site)

## Local Development

```bash
npm install
npm run dev
```

Opens at `http://localhost:5000`.

## Build & Deploy

```bash
npm run build
```

Static output in `dist/public/` — deploy anywhere (GitHub Pages, Vercel, Netlify, Cloudflare Pages, S3).

### GitHub Pages (automatic)

This repo includes a GitHub Actions workflow (`.github/workflows/deploy.yml`) that builds and deploys to GitHub Pages on every push to `main`.

1. Push this repo to GitHub
2. Go to **Settings → Pages → Source** → select **GitHub Actions**
3. Push to `main` — the site deploys automatically
4. Your site will be live at `https://<username>.github.io/<repo-name>/`

## License

Data is sourced from public disclosures. Dashboard code is provided as-is for informational purposes.

---

*Prepared by A2MF Capital*
