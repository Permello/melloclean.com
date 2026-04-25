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
import { Heading, Input, ToggleButtonGroup, type ToggleOption } from '@permello/ui';
import type { ValidationErrors } from '~/core/util/validation';

/**
 * Props for the {@link VisitSection} component.
 */
interface VisitSectionProps {
  /** Currently selected priority area keys */
  priorityKeys: string[];
  /** Callback to update a single form field by key */
  setField: (key: string, value: string) => void;
  /** Validation errors keyed by field name */
  errors: ValidationErrors;
  /** Current wizard form values */
  formData: Record<string, string>;
}
/**
 * Options for the priority areas toggle button group.
 */
const priorityAreaOptions: ToggleOption[] = [
  { key: 'bathrooms', label: 'Bathrooms' },
  { key: 'kitchen', label: 'Kitchen' },
  { key: 'bedrooms', label: 'Bedrooms' },
  { key: 'floors', label: 'Floors' },
  { key: 'sinks', label: 'Sinks' },
  { key: 'dusting', label: 'Dusting' },
  { key: 'windows', label: 'Windows' },
  { key: 'appliances', label: 'Appliances' },
  { key: 'baseboards', label: 'Baseboards' },
  { key: 'garage', label: 'Garage' },
];

/**
 * Options for the special occasion yes/no toggle.
 */
const occasionOptions: ToggleOption[] = [
  { key: 'yes', label: 'Yes' },
  { key: 'no', label: 'No' },
];

/**
 * Third booking stage — visit preferences.
 * Renders priority areas toggle, special occasion toggle with conditional input,
 * and a preferred date picker.
 *
 * @param props - Component props
 * @param props.priorityKeys - Currently selected priority area keys
 * @param props.setField - Callback to update a single form field
 * @param props.errors - Validation errors keyed by field name
 * @param props.formData - Current wizard form values
 * @returns Visit details form fields
 */
export function VisitSection({ priorityKeys, setField, errors, formData }: VisitSectionProps) {
  return (
    <div className='space-y-6'>
      <Heading level={5} className='mb-2'>
        About Your Visit
      </Heading>
      <ToggleButtonGroup
        label='Priority areas to clean'
        options={priorityAreaOptions}
        selectedKeys={priorityKeys}
        onSelectionChange={(keys) => setField('priorityAreas', keys.join(','))}
        errorMessage={errors.priorityAreas}
      />
      <ToggleButtonGroup
        label='Special occasion?'
        options={occasionOptions}
        selectedKeys={formData.hasSpecialOccasion ? [formData.hasSpecialOccasion] : []}
        onSelectionChange={(keys) => {
          const value = keys[keys.length - 1] || '';
          setField('hasSpecialOccasion', value);
          if (value !== 'yes') {
            setField('specialOccasion', '');
          }
        }}
      />
      {formData.hasSpecialOccasion === 'yes' && (
        <Input
          label='Describe the occasion'
          aria-label='Describe the special occasion'
          placeholder='e.g. Housewarming party, Holiday guests'
          value={formData.specialOccasion || ''}
          onChange={(val) => setField('specialOccasion', val)}
          errorMessage={errors.specialOccasion}
        />
      )}
      <Input
        label='Preferred Date'
        aria-label='Preferred cleaning date'
        type='date'
        value={formData.preferredDate || ''}
        onChange={(val) => setField('preferredDate', val)}
        errorMessage={errors.preferredDate}
      />
    </div>
  );
}
