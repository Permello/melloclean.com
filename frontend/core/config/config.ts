/**
 * @copyright 2026 Eduardo Turcios. All rights reserved.
 * Unauthorized use, reproduction, or distribution of this file is strictly prohibited.
 */

/**
 * Configuration interface for company information.
 */
export interface CompanyConfig {
  /** Company email address */
  Email: any;
  /** Company physical address */
  Address: any;
  /** Business operating hours */
  Hours: any;
  /** Company phone number */
  Phone: any;
  /** Company name */
  Name: string;
}

/**
 * Company configuration containing business contact details.
 */
const companyConfig: CompanyConfig = {
  Name: 'Some Cleaning Company',
  Phone: '(555) 123-4567',
  Email: 'company@email.com',
  Address: '123 A Street, TX 77001',
  Hours: 'Mon-Sat: 7AM - 8PM',
};

export { companyConfig };
