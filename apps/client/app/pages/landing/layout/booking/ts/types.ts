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

/**
 * Shape of the booking form data stored in localStorage.
 * All values are strings to match the wizard's Record<string, string> contract.
 */
export interface BookingFormData {
  /** Type of cleaning: 'standard' | 'deep' | 'move' | 'office' */
  cleaningType: string;
  /** Dirtiness scale from '1' to '10' */
  dirtiness: string;
  /** Number of bedrooms: '1' through '6+' */
  bedrooms: string;
  /** Number of bathrooms: '1' through '4+' */
  bathrooms: string;
  /** Approximate square footage as a numeric string */
  squareFootage: string;
  /** How recently the home was professionally cleaned */
  lastCleaned: string;
  /** Comma-separated priority area keys */
  priorityAreas: string;
  /** Whether there is a special occasion: 'yes' | 'no' */
  hasSpecialOccasion: string;
  /** Description of the special occasion (only if hasSpecialOccasion='yes') */
  specialOccasion: string;
  /** Preferred cleaning date in YYYY-MM-DD format */
  preferredDate: string;
}
