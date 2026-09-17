import Image from 'next/image';
import Link from 'next/link';

export function Hero() {
  return (
    <section className="relative flex h-svh min-h-[600px] w-full items-end bg-coal">
      {/* object-cover crops the photo, so on screens taller than its 1.41 aspect ratio
          it renders wider than the viewport. `sizes` says so, or phones get a blurry image. */}
      <Image
        src="/images/hero-beach"
        fill
        priority
        sizes="(max-aspect-ratio: 1412/1000) 142vh, 100vw"
        alt="Aerial view of beach with waves meeting sand"
        className="object-cover"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-linear-to-t/srgb from-coal/85 via-coal/30 via-55% to-coal/10"
      />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pb-20 md:pb-28">
        <div className="mb-4 flex items-center gap-3">
          <span aria-hidden="true" className="h-px w-8 bg-accent" />
          <p className="text-xs font-semibold tracking-[0.25em] text-accent uppercase">
            Drop 001 — Two shirts, that&apos;s it
          </p>
        </div>

        <h1 className="mb-6 font-display text-6xl leading-none text-white uppercase sm:text-7xl md:text-8xl lg:text-[110px]">
          Built between
          <br />
          <span className="text-accent">worlds.</span>
        </h1>

        <p className="mb-10 max-w-md text-base leading-relaxed text-white/85 md:text-lg">
          Desert dust and salt water. We make shirts for the drive between the two — printed in
          small batches out of Mission Viejo, California.
        </p>

        <div className="flex flex-wrap gap-4">
          <Link href="/products" className="btn-primary">
            Shop the two
          </Link>
          <Link href="/#story" className="btn-outline">
            Our story
          </Link>
        </div>
      </div>
    </section>
  );
}
