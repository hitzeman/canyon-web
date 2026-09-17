import { routes } from '../app.routes';
import { footerNav, legalNav, nav } from './site';

describe('site navigation', () => {
  const links = [...nav, ...footerNav.flatMap((group) => group.links), ...legalNav];
  const routePaths = routes.map((route) => `/${route.path}`);

  it('gives every link a destination', () => {
    for (const link of links) {
      expect(link.path ?? link.href, link.label).toBeTruthy();
    }
  });

  it('links only to routes that exist', () => {
    for (const link of links.filter((link) => link.path !== undefined)) {
      expect(routePaths, link.label).toContain(link.path);
    }
  });
});
