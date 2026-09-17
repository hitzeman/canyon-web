import { Component } from '@angular/core';

interface Feature {
  title: string;
  description: string;
  /** Highlighted closing line. */
  tagline?: string;
  icon: 'heart' | 'bag' | 'truck';
}

@Component({
  selector: 'app-home-features',
  templateUrl: './features.html',
})
export class Features {
  protected readonly features: Feature[] = [
    {
      title: 'Small Batch',
      description: 'Screen printed 40 at a time.',
      tagline: "When it's gone, it's gone.",
      icon: 'heart',
    },
    {
      title: 'Heavyweight Blanks',
      description: '6.5oz cotton. Built for the canyon roads and the beach.',
      icon: 'bag',
    },
    {
      title: 'Ships in 2 Days',
      description: 'Packed by hand in California. On your doorstep fast.',
      icon: 'truck',
    },
  ];
}
