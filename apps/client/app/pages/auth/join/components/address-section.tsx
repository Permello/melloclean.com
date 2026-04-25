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
import { Input } from '@permello/ui';

/**
 * Props for the {@link AddressSection} component.
 */
interface AddressSectionProps {
  /** Current wizard form values */
  formData: Record<string, string>;
  /** Callback to update a single form field by name */
  handleChange: (name: string, value: string) => void;
  /** Merged client and server validation errors keyed by field name */
  combinedErrors: {
    [x: string]: string;
  };
}

/**
 * Service address wizard stage — location fields.
 * Renders street address, city, state, and zip code inputs.
 *
 * @param props - Component props
 * @param props.formData - Current wizard form values
 * @param props.handleChange - Callback to update a single form field
 * @param props.combinedErrors - Merged client and server validation errors
 * @returns Address form fields
 */
export function AddressSection({ formData, handleChange, combinedErrors }: AddressSectionProps) {
  return (
    <div className='space-y-4'>
      <Input
        name='street'
        label='Street Address'
        aria-label='Street address'
        placeholder='123 Main St'
        autoComplete='street-address'
        value={formData.street || ''}
        onChange={(value) => handleChange('street', value)}
        errorMessage={combinedErrors?.street}
        isInvalid={!!combinedErrors?.street}
      />

      <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
        <Input
          name='city'
          label='City'
          aria-label='City'
          placeholder='Houston'
          autoComplete='address-level2'
          value={formData.city || ''}
          onChange={(value) => handleChange('city', value)}
          errorMessage={combinedErrors?.city}
          isInvalid={!!combinedErrors?.city}
        />
        <Input
          name='state'
          label='State'
          aria-label='State'
          placeholder='TX'
          autoComplete='address-level1'
          value={formData.state || ''}
          onChange={(value) => handleChange('state', value)}
          errorMessage={combinedErrors?.state}
          isInvalid={!!combinedErrors?.state}
        />
      </div>

      <Input
        name='zipCode'
        label='Zip Code'
        aria-label='Zip code'
        placeholder='77001'
        autoComplete='postal-code'
        value={formData.zipCode || ''}
        onChange={(value) => handleChange('zipCode', value)}
        errorMessage={combinedErrors?.zipCode}
        isInvalid={!!combinedErrors?.zipCode}
      />
    </div>
  );
}
