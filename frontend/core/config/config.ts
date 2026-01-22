export interface CompanyConfig {
  Email: any;
  Address: any;
  Hours: any;
  Phone: any;
  Name: string;
}

const companyConfig: CompanyConfig = {
  Name: 'Some Cleaning Company',
  Phone: '(555) 123-4567',
  Email: 'company@email.com',
  Address: '123 A Street, TX 77001',
  Hours: 'Mon-Sat: 7AM - 8PM',
};

export { companyConfig };
