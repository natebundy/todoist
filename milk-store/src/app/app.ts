import { CurrencyPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import {
  CdkDrag,
  CdkDragPlaceholder,
  CdkDragPreview,
  CdkDropList,
  CdkDropListGroup,
} from '@angular/cdk/drag-drop';
import { CartService } from './cart.service';
import { MILKS } from './milk';
import { MilkCarton } from './milk-carton/milk-carton';
import { ShoppingCart } from './shopping-cart/shopping-cart';

@Component({
  selector: 'app-root',
  imports: [
    CdkDrag,
    CdkDragPlaceholder,
    CdkDragPreview,
    CdkDropList,
    CdkDropListGroup,
    CurrencyPipe,
    MilkCarton,
    ShoppingCart,
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {
  protected readonly cart = inject(CartService);
  protected readonly milks = MILKS;

  /** The shelf never accepts drops; cartons only go into the cart. */
  protected readonly noEntry = (): boolean => false;
}
