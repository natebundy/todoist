import { TestBed } from '@angular/core/testing';
import { App } from './app';
import { CartService } from './cart.service';
import { MILKS } from './milk';

describe('App', () => {
  it('stocks the shelf with a draggable carton for every milk', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const host = fixture.nativeElement as HTMLElement;

    const items = host.querySelectorAll('[data-testid="shelf-item"]');
    expect(items.length).toBe(MILKS.length);
    items.forEach((item) => expect(item.classList).toContain('cdk-drag'));
    expect(host.querySelector('app-shopping-cart .dropzone')?.classList).toContain('cdk-drop-list');
  });

  it('adds a carton with the keyboard-friendly button', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const host = fixture.nativeElement as HTMLElement;

    host.querySelector<HTMLButtonElement>(`[aria-label="Add ${MILKS[3].name} to cart"]`)!.click();
    await fixture.whenStable();

    expect(TestBed.inject(CartService).lines()[0].milk.id).toBe(MILKS[3].id);
    expect(host.querySelector('.summary')?.textContent).toContain('1');
    expect(host.querySelectorAll('.pile app-milk-carton').length).toBe(1);
  });
});
