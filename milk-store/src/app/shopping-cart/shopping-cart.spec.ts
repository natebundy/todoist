import { TestBed } from '@angular/core/testing';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { CartService } from '../cart.service';
import { Milk, MILKS } from '../milk';
import { MAX_VISIBLE_CARTONS, ShoppingCart } from './shopping-cart';

type Drop = CdkDragDrop<unknown, unknown, Milk>;

describe('ShoppingCart', () => {
  async function setup() {
    const fixture = TestBed.createComponent(ShoppingCart);
    const cart = TestBed.inject(CartService);
    await fixture.whenStable();
    const host = fixture.nativeElement as HTMLElement;
    // Cast so the test can call the protected template handlers directly.
    const component = fixture.componentInstance as unknown as {
      onDrop(e: Drop): void;
      acceptsMilk(d: { data: unknown }): boolean;
    };
    return { fixture, cart, host, component };
  }

  function dropEvent(milk: Milk, sameContainer = false, overContainer = true): Drop {
    const container = {};
    return {
      item: { data: milk },
      container,
      previousContainer: sameContainer ? container : {},
      isPointerOverContainer: overContainer,
    } as unknown as Drop;
  }

  it('shows an empty basket with a hint', async () => {
    const { host } = await setup();
    expect(host.querySelector('[data-testid="cart-count"]')?.textContent?.trim()).toBe('0');
    expect(host.textContent).toContain('Drag milk here');
    expect(host.textContent).toContain('Your cart is empty.');
  });

  it('adds a carton dropped from the shelf and draws it in the basket', async () => {
    const { fixture, cart, host, component } = await setup();
    component.onDrop(dropEvent(MILKS[2]));
    await fixture.whenStable();

    expect(cart.itemCount()).toBe(1);
    expect(host.querySelectorAll('.pile app-milk-carton').length).toBe(1);
    expect(host.querySelector('[data-testid="cart-count"]')?.textContent?.trim()).toBe('1');
    expect(host.querySelector('[data-testid="cart-total"]')?.textContent).toContain('3.99');
    expect(host.textContent).not.toContain('Drag milk here');
  });

  it('ignores drops that did not come from another list or missed the cart', async () => {
    const { cart, component } = await setup();
    component.onDrop(dropEvent(MILKS[0], true));
    component.onDrop(dropEvent(MILKS[0], false, false));
    expect(cart.itemCount()).toBe(0);
  });

  it('only accepts milk as drag data', async () => {
    const { component } = await setup();
    expect(component.acceptsMilk({ data: MILKS[0] })).toBe(true);
    expect(component.acceptsMilk({ data: null })).toBe(false);
    expect(component.acceptsMilk({ data: { id: 'x' } })).toBe(false);
  });

  it('caps the cartons drawn and shows an overflow count', async () => {
    const { fixture, cart, host } = await setup();
    cart.add(MILKS[0], MAX_VISIBLE_CARTONS + 5);
    await fixture.whenStable();

    expect(host.querySelectorAll('.pile app-milk-carton').length).toBe(MAX_VISIBLE_CARTONS);
    expect(host.querySelector('.overflow')?.textContent).toContain('+5 more');
  });

  it('adjusts quantities from the receipt and checks out', async () => {
    const { fixture, cart, host } = await setup();
    cart.add(MILKS[0]);
    await fixture.whenStable();

    host.querySelector<HTMLButtonElement>(`[aria-label="Add one ${MILKS[0].name}"]`)!.click();
    await fixture.whenStable();
    expect(cart.itemCount()).toBe(2);

    host.querySelector<HTMLButtonElement>(`[aria-label="Remove one ${MILKS[0].name}"]`)!.click();
    await fixture.whenStable();
    expect(cart.itemCount()).toBe(1);

    host.querySelector<HTMLButtonElement>('.actions .primary')!.click();
    await fixture.whenStable();
    expect(cart.itemCount()).toBe(0);
    expect(host.textContent).toContain('Thanks for shopping');
  });
});
