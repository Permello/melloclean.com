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

import React from 'react';

/**
 * Error page displayed when a user is not registered in the system.
 * Provides guidance on how to request access.
 *
 * @returns Access restricted error page
 */
const UserNotRegisteredError = () => {
  return (
    <div className='flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-white to-slate-50'>
      <div className='w-full max-w-md rounded-lg border border-slate-100 bg-white p-8 shadow-lg'>
        <div className='text-center'>
          <div className='mb-6 inline-flex h-16 w-16 items-center justify-center rounded-full bg-orange-100'>
            <svg
              className='h-8 w-8 text-orange-600'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z'
              />
            </svg>
          </div>
          <h1 className='mb-4 text-3xl font-bold text-slate-900'>Access Restricted</h1>
          <p className='mb-8 text-slate-600'>
            You are not registered to use this application. Please contact the app administrator to
            request access.
          </p>
          <div className='rounded-md bg-slate-50 p-4 text-sm text-slate-600'>
            <p>If you believe this is an error, you can:</p>
            <ul className='mt-2 list-inside list-disc space-y-1'>
              <li>Verify you are logged in with the correct account</li>
              <li>Contact the app administrator for access</li>
              <li>Try logging out and back in again</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserNotRegisteredError;
