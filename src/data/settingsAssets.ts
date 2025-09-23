export interface Country {
  code: string;
  name: string;
  flag: string;
  dialCode?: string;
}

export interface Currency {
  code: string;
  name: string;
}

export const countriesData: Country[] = [
  { code: 'US', name: 'United States', flag: 'flags/usa.png', dialCode: '+1' },
  { code: 'CA', name: 'Canada', flag: 'flags/can.png', dialCode: '+1' },
  { code: 'GB', name: 'United Kingdom', flag: 'flags/uk.jpg', dialCode: '+44' },
  { code: 'AU', name: 'Australia', flag: 'flags/aus.jpg', dialCode: '+61' },
  { code: 'DE', name: 'Germany', flag: 'flags/ger.jpg', dialCode: '+49' },
  { code: 'JP', name: 'Japan', flag: 'flags/jap.png', dialCode: '+81' },
  { code: 'BN', name: 'Bangladesh', flag: 'flags/ban.jpg', dialCode: '+88' },
];

// Currency data
export const currencies: Currency[] = [
  { code: 'USD', name: 'USD' },
  { code: 'EUR', name: 'EUR' },
  { code: 'GBP', name: 'GBP' },
  { code: 'CAD', name: 'CAD' },
  { code: 'AUD', name: 'AUD' },
  { code: 'JPY', name: 'JPY' },
  { code: 'CHF', name: 'CHF' },
  { code: 'CNY', name: 'CNY' }
];
