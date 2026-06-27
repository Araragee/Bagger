export type ContentBlock =
  | { type: 'p'; text: string }
  | { type: 'h'; text: string }
  | { type: 'list'; items: string[] }
  | { type: 'qa'; q: string; a: string }

export type ContentPage = {
  slug: string
  title: string
  intro: string
  blocks: ContentBlock[]
}

export const contentPages: Record<string, ContentPage> = {
  shipping: {
    slug: 'shipping',
    title: 'Shipping',
    intro: 'Carbon-neutral delivery, dispatched from our workshop within two business days.',
    blocks: [
      { type: 'h', text: 'Rates & timing' },
      {
        type: 'list',
        items: [
          'Free standard shipping on orders over $150',
          'Flat $12 standard shipping under $150',
          'Standard delivery: 3–5 business days',
          'Express delivery available at checkout: 1–2 business days',
        ],
      },
      { type: 'h', text: 'Where we ship' },
      { type: 'p', text: 'We currently ship across the US, with international delivery rolling out region by region. Duties and taxes for international orders are calculated at checkout.' },
      { type: 'p', text: 'Every parcel ships carbon-neutral — we offset the footprint of each delivery through verified reforestation partners.' },
    ],
  },
  returns: {
    slug: 'returns',
    title: 'Returns & repairs',
    intro: 'A 100-day trial, free repairs for life, and a no-drama returns process.',
    blocks: [
      { type: 'h', text: '100-day trial' },
      { type: 'p', text: 'Live with your bag for up to 100 days. If it isn’t right, send it back for a full refund — no restocking fees, no interrogation.' },
      { type: 'h', text: 'Lifetime repairs' },
      { type: 'p', text: 'Stitching, hardware, zips, straps — if it wears out, we’ll fix it free, for as long as you own the bag. If we can’t fix it, we’ll replace it.' },
      { type: 'h', text: 'How to start a return or repair' },
      {
        type: 'list',
        items: [
          'Email care@bagger.demo with your order number',
          'We’ll send a prepaid label within one business day',
          'Refunds land within 5 business days of us receiving the item',
        ],
      },
    ],
  },
  care: {
    slug: 'care',
    title: 'Leather care',
    intro: 'A little maintenance, a lifetime of patina. Here’s how to keep your Bagger looking better with age.',
    blocks: [
      { type: 'list', items: [
        'Wipe with a soft, damp cloth and let it air dry away from direct heat',
        'Condition every few months with a neutral leather balm',
        'Avoid soaking; if it gets caught in the rain, dry it slowly and naturally',
        'Embrace the marks — scuffs and patina are the point, not a flaw',
      ] },
      { type: 'p', text: 'Veg-tanned leather darkens and softens as it ages. The bag you buy today won’t look the same in a year — it’ll look like yours.' },
    ],
  },
  faq: {
    slug: 'faq',
    title: 'FAQ',
    intro: 'The questions we hear most.',
    blocks: [
      { type: 'qa', q: 'Is the leather real?', a: 'Yes — full-grain, vegetable-tanned leather from a single tannery we’ve worked with for years. No corrected grain, no bonded leather.' },
      { type: 'qa', q: 'How should I choose a size?', a: 'Each product page lists exact dimensions and what fits. When in doubt, the Workhorse Tote and Atlas Backpack are our most versatile everyday carries.' },
      { type: 'qa', q: 'Do you offer monogramming?', a: 'Hot-foil monogramming is coming soon. Join the newsletter and we’ll let you know the moment it’s live.' },
      { type: 'qa', q: 'What’s your warranty?', a: 'Lifetime repairs on all stitching and hardware, plus a 100-day trial. See Returns & repairs for details.' },
      { type: 'qa', q: 'Is this a real store?', a: 'This is a portfolio demo. Browsing, accounts, the cart and checkout all work end-to-end, but no real payment is taken and nothing ships.' },
    ],
  },
  contact: {
    slug: 'contact',
    title: 'Contact',
    intro: 'A small team, real humans, quick replies.',
    blocks: [
      { type: 'p', text: 'Questions about an order, a repair, or which bag is right for you? We usually reply within one business day.' },
      { type: 'list', items: [
        'General: hello@bagger.demo',
        'Care & repairs: care@bagger.demo',
        'Press & partnerships: press@bagger.demo',
        'Workshop: 1 Tannery Row, Austin, TX (by appointment)',
      ] },
    ],
  },
  privacy: {
    slug: 'privacy',
    title: 'Privacy',
    intro: 'Plain-language summary of how a store like this would handle your data.',
    blocks: [
      { type: 'p', text: 'This is a demo storefront. Any account details you enter are stored locally in your own browser and never transmitted to a server.' },
      { type: 'p', text: 'A production version would collect only what’s needed to fulfil orders, never sell your data, and let you export or delete it on request.' },
    ],
  },
  terms: {
    slug: 'terms',
    title: 'Terms',
    intro: 'The short version.',
    blocks: [
      { type: 'p', text: 'Bagger is a demonstration project. Products, prices, and policies shown here are illustrative and not offers for sale.' },
      { type: 'p', text: 'No real transactions occur and no goods are shipped. Brand names and copy are fictional.' },
    ],
  },
}
