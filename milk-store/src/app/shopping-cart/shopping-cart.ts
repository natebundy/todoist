import { CurrencyPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { CdkDragDrop, CdkDropList } from '@angular/cdk/drag-drop';
import { CartService } from '../cart.service';
import { Milk } from '../milk';
import { MilkCarton } from '../milk-carton/milk-carton';

/** Basket geometry in the cart SVG's 400x300 viewBox. */
const BASKET = { top: 70, bottom: 200, topLeft: 60, topRight: 380, bottomLeft: 95, bottomRight: 350 };

/** Most cartons drawn in the basket; anything beyond is summarised as "+N". */
export const MAX_VISIBLE_CARTONS = 40;

interface Line {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
}

function buildWires(): { vertical: Line[]; horizontal: Line[] } {
  const vertical: Line[] = [];
  for (let i = 1; i < 12; i++) {
    const t = i / 12;
    vertical.push({
      x1: BASKET.topLeft + (BASKET.topRight - BASKET.topLeft) * t,
      y1: BASKET.top,
      x2: BASKET.bottomLeft + (BASKET.bottomRight - BASKET.bottomLeft) * t,
      y2: BASKET.bottom,
    });
  }
  const horizontal: Line[] = [];
  for (let i = 1; i < 4; i++) {
    const t = i / 4;
    const y = BASKET.top + (BASKET.bottom - BASKET.top) * t;
    horizontal.push({
      x1: BASKET.topLeft + (BASKET.bottomLeft - BASKET.topLeft) * t,
      y1: y,
      x2: BASKET.topRight + (BASKET.bottomRight - BASKET.topRight) * t,
      y2: y,
    });
  }
  return { vertical, horizontal };
}

@Component({
  selector: 'app-shopping-cart',
  imports: [CdkDropList, CurrencyPipe, MilkCarton],
  templateUrl: './shopping-cart.html',
  styleUrl: './shopping-cart.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShoppingCart {
  protected readonly cart = inject(CartService);
  protected readonly wires = buildWires();
  protected readonly maxVisible = MAX_VISIBLE_CARTONS;
  protected readonly checkedOut = signal(false);

  /** Only milk cartons may be dropped into the cart. */
  protected readonly acceptsMilk = (drag: { data: unknown }): boolean => {
    const data = drag.data as Partial<Milk> | null;
    return !!data && typeof data.id === 'string' && typeof data.price === 'number';
  };

  protected onDrop(event: CdkDragDrop<unknown, unknown, Milk>): void {
    if (event.previousContainer === event.container || !event.isPointerOverContainer) {
      return;
    }
    this.checkedOut.set(false);
    this.cart.add(event.item.data);
  }

  protected checkout(): void {
    if (this.cart.itemCount() === 0) {
      return;
    }
    this.cart.clear();
    this.checkedOut.set(true);
  }
}
