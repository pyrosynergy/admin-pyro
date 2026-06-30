# Decode Path — mobile scroll-stack handoff

## Summary

The "card 1 & 2 don't seem to scroll" report is **not a CSS/logic bug**. All four
cards correctly engage `position: sticky` and lock into their stacked offsets.
The issue is that cards 1 and 2 lock into place almost immediately after the
section enters view, while cards 3 and 4 take a much longer, more visible
scroll distance to catch up — so only 3 and 4 *look* like they're animating.

## Current implementation

`DecodePath.jsx` renders 4 cards with no JS scroll logic at all — it's pure CSS:

```jsx
<div className="decode-path-card" style={{ '--card-index': String(index) }}>
```

`DecodePath.css` (mobile, `@media (max-width: 900px)`):

```css
.decode-path-grid {
  display: block;
  --decode-peek: 130px;
}

.decode-path-card {
  position: sticky;
  top: calc(var(--card-index, 0) * var(--decode-peek));
  z-index: calc(var(--card-index, 0) + 1);
  min-height: 30vh;
}

.decode-path-card:not(:last-child) {
  margin-bottom: 120px;
}

.decode-path-grid::after {
  height: 40vh; /* tail spacer so the last card can stay pinned before exiting */
}
```

So each card's sticky `top` offset is `index * 130px` → `0 / 130 / 260 / 390`.
As you scroll, each card slides up the page in normal flow until its own top
would cross that offset, then it clamps there ("locks").

## What I verified live

Using a headless Chromium run at an iPhone-12 viewport, I read each card's
`getBoundingClientRect().top` across the full scroll range of the section.
All four cards **do** reach and hold their target offset:

```
card 0 locks at top: 0px   (reached early)
card 1 locks at top: 130px (reached early)
card 2 locks at top: 260px (reached mid-scroll)
card 3 locks at top: 390px (reached late, holds through exit)
```

The lock points themselves are correct. What differs is *how much scroll
distance* each card needs to travel before locking — and that's the root of
the perceptual problem.

## Root cause: asymmetric "catch-up" distance

Card 1 (`index 0`) starts in the page just below the title/subtitle — i.e. it's
already close to its `top: 0` lock point the moment the section scrolls into
view. It locks almost instantly, with very little visible travel.

Each subsequent card starts further down the page (because it's preceded by
more cards + their `120px` margins), so it has progressively *more* distance
to travel before locking. Card 4 has the most ground to cover, so its
slide-into-place is stretched across the most visible scroll — which is what
reads as "the effect."

In short: the stagger is geometric and inherent to this technique (linear
`index * peek` offsets with cards stacked in normal document flow). Cards 1
and 2 aren't malfunctioning — their animation window is just too short to
notice.

## Things ruled out

- **Not a sticky/containing-block bug.** All 4 cards share `.decode-path-grid`
  as their containing block and all reach their offsets correctly.
- **Not a z-index issue.** `z-index: calc(var(--card-index) + 1)` is
  monotonically increasing, so later cards correctly paint over earlier ones.
- **Not the page's global `scroll-behavior: smooth`** (set in `App.css`).
  This only affects *programmatic* `scrollTo`/`scrollIntoView` calls (which is
  what skewed my first round of automated measurements until I accounted for
  it) — it doesn't affect native trackpad/touch scrolling or the sticky math
  itself.

## Recommended fix

Give card 1 more distance to travel before it locks, so its transition is
just as visible as card 4's. Concretely: increase the spacing **above** the
grid (e.g. extra `margin-top` / `padding-top` on `.decode-path-grid`, or a
spacer element before card 0) so card 1 starts further down the page instead
of arriving pre-settled. The exact amount should roughly match the `120px`
gap the other cards already get from `margin-bottom`, so all four cards have
a comparable "runway" before locking.

This wasn't implemented yet — flagging it here for whoever picks this up,
since it changes the section's overall scroll length and is worth confirming
the desired feel before tuning the number.
