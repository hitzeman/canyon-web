import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Title } from '@angular/platform-browser';

import { PAGES } from '../../core/pages';
import { site } from '../../core/site';
import { ContentPage } from './content-page';

describe('ContentPage', () => {
  it('renders the page and sets its title', async () => {
    TestBed.configureTestingModule({
      imports: [ContentPage],
      providers: [provideZonelessChangeDetection()],
    });
    const fixture = TestBed.createComponent(ContentPage);
    const page = PAGES[0];
    fixture.componentRef.setInput('page', page);
    await fixture.whenStable();

    const el = fixture.nativeElement as HTMLElement;
    expect(el.querySelector('h1')?.textContent).toContain(page.title);
    expect(TestBed.inject(Title).getTitle()).toBe(`${page.title} — ${site.name}`);
  });
});
