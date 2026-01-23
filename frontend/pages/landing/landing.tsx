import type { Route } from './+types/landing';

import { Navbar, Hero, Services, Pricing, Testimonials, Contact, Footer } from './layout';
import { companyConfig } from '~/core/config';

export function meta({}: Route.MetaArgs) {
  return [
    { title: companyConfig.Name },
    { name: 'description', content: 'Welcome to React Router!' },
  ];
}

export default function Landing() {
  return (
    <main className='min-h-screen'>
      <Navbar />
      <Hero />
      <Services />
      <Pricing />
      <Testimonials />
      <Contact />
      <Footer />
    </main>
  );
}
