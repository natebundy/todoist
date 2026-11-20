import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Milk } from '../milk';

/** Draws a gable-top milk carton as SVG with art matching the milk type. */
@Component({
  selector: 'app-milk-carton',
  templateUrl: './milk-carton.html',
  styleUrl: './milk-carton.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MilkCarton {
  readonly milk = input.required<Milk>();
  /** Hides the small print (brand + volume), for tiny cartons inside the cart. */
  readonly compact = input(false);
}
