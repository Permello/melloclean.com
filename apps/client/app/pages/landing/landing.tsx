/**
 * MIT License
 *
 * Copyright (c) 2025-present Eduardo Turcios.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

import type { Route } from './+types/landing';

import { companyConfig } from '@permello/shared/config';
import { Contact, Footer, Hero, Navbar, Pricing, Services, Testimonials } from './layout';

/**
 * Meta function for the landing page.
 * Sets the page title and description.
 *
 * @param _args - Route meta arguments (unused)
 * @returns Meta tags array with title and description
 */
export function meta({}: Route.MetaArgs) {
  return [
    { title: companyConfig.Name },
    { name: 'description', content: 'Welcome to React Router!' },
  ];
}

/**
 * Landing page component composing all section layouts.
 * Main entry point for the marketing site.
 *
 * @returns Complete landing page
 */
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
