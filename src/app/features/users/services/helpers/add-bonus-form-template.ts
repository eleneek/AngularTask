interface BonusControl {
  type: string;
  name: string;
  value: string | null;
  options: {name: string; value: string}[];
  placeholder: string;
  label: string;
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
  },
  {
    type: 'number',
    name: 'bonusAmount',
    value: null,
    options: [],
    placeholder: '',
    label: '',
  },
];
