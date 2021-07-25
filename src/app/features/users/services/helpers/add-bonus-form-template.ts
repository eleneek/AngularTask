interface BonusControl {
  type: string;
  name: string;
  value: string | null;
  options: {name: string; value: string}[];
  placeholder: string;
  label: string;
  error: string;
}

export const bonusTemplate: BonusControl[] = [
  {
    type: 'select',
    name: 'bonusType',
    value: '',
    options: [
      {name: 'Freespin', value: 'Freespin'},
      {name: 'Freebet', value: 'Freebet'},
      {name: 'Money', value: 'Money'},
    ],
    placeholder: 'აირჩიეთ ბონუსის ტიპი',
    label: 'ბონუსის ტიპი',
    error: 'გთხოვთ, აირჩიოთ ბონუსის ტიპი',
  },
  {
    type: 'number',
    name: 'bonusAmount',
    value: null,
    options: [],
    placeholder: '',
    label: '',
    error: 'გთხოვთ, შეავსოთ ბონუსის ველი',
  },
];
