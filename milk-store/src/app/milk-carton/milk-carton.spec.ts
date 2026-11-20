import { TestBed } from '@angular/core/testing';
import { MILKS } from '../milk';
import { MilkCarton } from './milk-carton';

describe('MilkCarton', () => {
  it('has a unique art style and id for every milk', () => {
    expect(new Set(MILKS.map((m) => m.art)).size).toBe(MILKS.length);
    expect(new Set(MILKS.map((m) => m.id)).size).toBe(MILKS.length);
  });

  for (const milk of MILKS) {
    it(`draws the ${milk.name} carton with its colours and art`, async () => {
      const fixture = TestBed.createComponent(MilkCarton);
      fixture.componentRef.setInput('milk', milk);
      await fixture.whenStable();

      const svg: SVGElement = fixture.nativeElement.querySelector('svg');
      expect(svg.getAttribute('aria-label')).toBe(`${milk.name} carton`);
      expect(svg.textContent).toContain(milk.name);
      expect(svg.textContent).toContain('MILK BARN');
      const front = svg.querySelector('rect[x="10"][y="60"]');
      expect(front?.getAttribute('fill')).toBe(milk.colors.body);
      // The label window plus at least one art shape.
      expect(svg.querySelectorAll('path, ellipse, circle, polygon, line, rect').length).toBeGreaterThan(8);
    });
  }

  it('hides the small print in compact mode', async () => {
    const fixture = TestBed.createComponent(MilkCarton);
    fixture.componentRef.setInput('milk', MILKS[0]);
    fixture.componentRef.setInput('compact', true);
    await fixture.whenStable();

    const text = (fixture.nativeElement as HTMLElement).textContent ?? '';
    expect(text).not.toContain('MILK BARN');
    expect(text).toContain(MILKS[0].name);
  });
});
