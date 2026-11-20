import { computed, Injectable, signal } from '@angular/core';
import { Milk } from './milk';

/** A single physical carton sitting in the cart. */
export interface CartCarton {
  /** Unique per carton so the UI can track and animate each one. */
  uid: number;
  milk: Milk;
}

/** Cartons of the same milk grouped together, for the receipt. */
export interface CartLine {
  milk: Milk;
  quantity: number;
}

/** Holds the shopping-cart contents as signals. */
@Injectable({ providedIn: 'root' })
export class CartService {
  private nextUid = 1;
  private readonly cartonsState = signal<CartCarton[]>([]);

  /** Every carton in the cart, in the order it was dropped in. */
  readonly cartons = this.cartonsState.asReadonly();

  /** One line per milk type, in the order each type was first added. */
  readonly lines = computed<CartLine[]>(() => {
    const byId = new Map<string, CartLine>();
    for (const { milk } of this.cartonsState()) {
      const line = byId.get(milk.id);
      if (line) {
        line.quantity += 1;
      } else {
        byId.set(milk.id, { milk, quantity: 1 });
      }
    }
    return [...byId.values()];
  });

  /** Total number of cartons in the cart. */
  readonly itemCount = computed(() => this.cartonsState().length);

  /** Total price in dollars, rounded to cents. */
  readonly total = computed(
    () => Math.round(this.cartonsState().reduce((sum, c) => sum + c.milk.price, 0) * 100) / 100,
  );

  add(milk: Milk, quantity = 1): void {
    if (quantity <= 0) {
      return;
    }
    const added = Array.from({ length: quantity }, () => ({ uid: this.nextUid++, milk }));
    this.cartonsState.update((cartons) => [...cartons, ...added]);
  }

  /** Takes the most recently added carton of the given milk out of the cart. */
  decrement(milkId: string): void {
    this.cartonsState.update((cartons) => {
      let index = -1;
      for (let i = cartons.length - 1; i >= 0; i--) {
        if (cartons[i].milk.id === milkId) {
          index = i;
          break;
        }
      }
      return index === -1 ? cartons : cartons.filter((_, i) => i !== index);
    });
  }

  /** Removes every carton of the given milk. */
  remove(milkId: string): void {
    this.cartonsState.update((cartons) => cartons.filter((c) => c.milk.id !== milkId));
  }

  clear(): void {
    this.cartonsState.set([]);
  }
}
