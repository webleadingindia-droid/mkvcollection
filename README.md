# MKV Collection

Handmade miniature fridge magnets store. Next.js 14 (App Router), TypeScript, Tailwind CSS.
Orders are placed through WhatsApp: there is no payment gateway or database.

## Run locally
```bash
npm install
cp .env.example .env.local   # then fill in your real WhatsApp number, phone, email, domain
npm run dev                  # http://localhost:3000
npm run build && npm start   # production check
```

## Before launch checklist
1. Set the four values in `.env.local` (WhatsApp number is the important one).
2. Add real product photos: `public/products/<productId>-1.jpg` (also `-2`, `-3`). They are picked up automatically; placeholders show until then.
3. Replace placeholder photos for hero, categories, about etc. in `src/data/images.ts`.
4. Edit prices, titles and descriptions in `src/data/products.ts`. Items with price `0` show "Price on enquiry".
5. Review the text in `faq`, `shipping-returns`, `privacy-policy` and `terms` (search the code for `TODO(owner)`).
6. Update social links and address in `src/config/site.ts`.

## Deploy (free): Vercel
1. Push this folder to a GitHub repository.
2. On vercel.com choose "Add New Project", import the repo, keep the defaults.
3. Add the four environment variables from `.env.example` in Project Settings.
4. Deploy, then connect your domain in Settings, Domains.

## Structure
- `src/app`: pages (home, shop, products, cart, wishlist, bulk-orders, about, contact, faq, legal), sitemap, robots, manifest
- `src/components`: layout, product, shop and ui components
- `src/data`: products and images (the only files you edit to change the catalogue)
- `src/lib`: WhatsApp link builder and the cart/wishlist store (browser local storage)
