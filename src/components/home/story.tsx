import Link from 'next/link';

const STATS = [
  { value: '40', label: 'Shirts per drop' },
  { value: '2017', label: 'Founded' },
  { value: '4', label: 'People total' },
  { value: '100%', label: 'Cotton heavyweight' },
];

export function Story() {
  return (
    // The Story nav link and the hero's "Our story" button land here (/#story);
    // tabindex lets focus move to it; html scroll-padding-top clears the fixed header.
    <section
      id="story"
      tabIndex={-1}
      aria-labelledby="story-heading"
      className="bg-page py-24 md:py-32"
    >
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-16 px-6 md:grid-cols-2 md:gap-24">
        <div>
          <p className="eyebrow mb-5">Who we are</p>
          <h2
            id="story-heading"
            className="mb-8 font-display text-5xl leading-none text-ink uppercase md:text-6xl lg:text-7xl"
          >
            Four friends,
            <br />
            one canyon
            <br />
            road
          </h2>
          <p className="mb-4 text-base leading-loose text-body">
            Canyon Supply Co. started in a garage in Mission Viejo, halfway between the skate parks
            and the surf. Everything we make is something we&apos;d wear on the drive out to the
            desert and back down to the water.
          </p>
          <p className="mb-10 text-base leading-loose text-body">
            No middlemen. No warehouses. Four people who care about the shirt on your back.
          </p>
          <Link href="/about" className="link-underline">
            Read the whole thing
          </Link>
        </div>

        <dl className="grid grid-cols-2 gap-px bg-line">
          {STATS.map((stat) => (
            <div key={stat.label} className="flex flex-col-reverse gap-2 bg-surface p-10">
              <dt className="text-xs tracking-widest text-quiet uppercase">{stat.label}</dt>
              <dd className="font-display text-5xl leading-none text-accent-large">{stat.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
