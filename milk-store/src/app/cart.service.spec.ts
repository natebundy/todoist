import { TestBed } from '@angular/core/testing';
import { CartService } from './cart.service';
import { MILKS } from './milk';

describe('CartService', () => {
  let cart: CartService;
  const [whole, skim, chocolate] = MILKS;

  beforeEach(() => {
    cart = TestBed.inject(CartService);
  });

  it('starts empty', () => {
    expect(cart.itemCount()).toBe(0);
    expect(cart.total()).toBe(0);
    expect(cart.lines()).toEqual([]);
  });

  it('groups cartons into lines in first-added order and totals them', () => {
    cart.add(skim);
    cart.add(whole);
    cart.add(skim);

    expect(cart.itemCount()).toBe(3);
    expect(cart.lines().map((l) => [l.milk.id, l.quantity])).toEqual([
      ['skim', 2],
      ['whole', 1],
    ]);
    expect(cart.total()).toBe(Math.round((skim.price * 2 + whole.price) * 100) / 100);
  });

  it('gives each carton a unique id', () => {
    cart.add(whole, 3);
    const uids = cart.cartons().map((c) => c.uid);
    expect(new Set(uids).size).toBe(3);
  });

  it('ignores non-positive quantities', () => {
    cart.add(whole, 0);
    cart.add(whole, -2);
    expect(cart.itemCount()).toBe(0);
  });

  it('decrements the most recent carton of a milk and drops empty lines', () => {
    cart.add(whole);
    cart.add(chocolate);
    cart.add(whole);
    const lastWholeUid = cart.cartons()[2].uid;

    cart.decrement('whole');
    expect(cart.cartons().some((c) => c.uid === lastWholeUid)).toBe(false);
    expect(cart.lines().find((l) => l.milk.id === 'whole')?.quantity).toBe(1);

    cart.decrement('whole');
    expect(cart.lines().map((l) => l.milk.id)).toEqual(['chocolate']);

    cart.decrement('whole');
    expect(cart.itemCount()).toBe(1);
  });

  it('removes all cartons of a milk and clears the cart', () => {
    cart.add(whole, 2);
    cart.add(skim);
    cart.remove('whole');
    expect(cart.lines().map((l) => l.milk.id)).toEqual(['skim']);

    cart.clear();
    expect(cart.itemCount()).toBe(0);
  });
});
