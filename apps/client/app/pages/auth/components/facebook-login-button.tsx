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

import { useToast } from '@permello/ui';

/**
 * Facebook brand icon SVG component.
 *
 * @param props - Component props
 * @param props.className - CSS classes for sizing
 * @returns Facebook logo SVG
 */
const FacebookIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox='0 0 24 24' fill='currentColor'>
    <path d='M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z' />
  </svg>
);

/**
 * Facebook OAuth login button.
 * Currently displays a placeholder toast notification.
 *
 * @returns Styled Facebook login button
 */
const FacebookLoginButton: React.FC = () => {
  const { addToast } = useToast();

  return (
    <button
      type='button'
      aria-label='Continue with Facebook'
      onClick={() => addToast('Facebook login coming soon', 'info')}
      className='flex w-full items-center justify-center gap-3 rounded-lg bg-[#1877F2] px-4 py-3 font-medium text-white transition-colors select-none hover:bg-[#166FE5]'
    >
      <FacebookIcon className='h-5 w-5' />
      Continue with Facebook
    </button>
  );
};

export { FacebookLoginButton };
