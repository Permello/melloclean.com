import type { Route } from './+types/home';
import Hero from '../landing/Hero';
import Navbar from '~/landing/Navbar';
import Services from '~/landing/Services';
import Pricing from '~/landing/Price';
import Contact from '~/landing/Contact';
import Footer from '~/landing/Footer';
import Testimonials from '~/landing/Testimonials';
import Button from '~/Components/ui/Button';

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'Mello Cleaning' },
    { name: 'description', content: 'Welcome to React Router!' },
  ];
}

export default function Home() {
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
