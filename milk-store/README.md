# The Milk Barn 🥛

An Angular milk store. Every milk has its own illustrated carton. Drag a carton off the wooden shelf and drop it into the shopping cart. The cart is drawn as an actual shopping cart (wire basket, handle and wheels), and the cartons pile up inside the basket.

This is a separate app from the React Todoist clone at the repository root. It has its own `package.json` and doesn't share any code or dependencies with it.

## Features

- **Nine milks, each with its own carton art:** Whole (cow), Skim (milk splash), Chocolate (chocolate bar), Strawberry, Banana, Oat (oat stalk), Almond, Soy (soy pod) and Coconut. The cartons are inline SVG gable-top cartons drawn from the data in `src/app/milk.ts`.
- **Drag and drop** with `@angular/cdk/drag-drop`, so it works with a mouse and with touch. The shelf keeps its carton in place (`cdkDropListHasAnchor`) while a copy is dragged. The cart highlights while you hover over it, and dropped cartons fall into the basket.
- **The cart is drawn as a shopping cart.** Cartons are drawn behind the front wire mesh so they look like they're inside the basket. After 40 cartons, the rest are shown as "+N more".
- **Receipt:** +/− and remove buttons for each milk, a running total, "Empty cart" and "Checkout".
- **Keyboard / no-drag fallback:** each shelf item also has an "Add to cart" button.

## Getting started

Requires Node 20.19+ (or 22.12+).

```bash
cd milk-store
npm install
npm start        # http://localhost:4200
npm test         # Vitest + jsdom unit tests (Angular's unit-test builder)
npm run build    # production build in dist/milk-store
```

## Structure

```
src/app/
  milk.ts                   milk catalogue (prices, colours, art type)
  cart.service.ts           signal-based cart state
  milk-carton/              SVG carton + per-milk art
  shopping-cart/            SVG cart, drop zone and receipt
  app.*                     header, shelf (drag sources) and layout
```

The app uses Angular 20 standalone components, signals and zoneless change detection.
