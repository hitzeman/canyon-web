import { Features } from '@/components/home/features';
import { Hero } from '@/components/home/hero';
import { Newsletter } from '@/components/home/newsletter';
import { Story } from '@/components/home/story';

// Title and description come from the defaults in the root layout.

export default function HomePage() {
  return (
    <main id="main" tabIndex={-1} className="flex-1">
      <Hero />
      <Features />
      <Story />
      <Newsletter />
    </main>
  );
}
