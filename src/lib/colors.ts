export interface ColorOption {
  value: 'kornblumen-blau' | 'rose' | 'grau-braun' | 'kitt' | 'himbeer';
  label: string;
  colorCode: string;
  hex: string;
  image: string;
}

export const colors: ColorOption[] = [
  {
    value: 'kornblumen-blau',
    label: 'Kornblumen Blau',
    colorCode: '0463',
    hex: '#6B9BD1',
    image: '/770x_g275438a_0320.jpg'
  },
  {
    value: 'rose',
    label: 'Rose',
    colorCode: '0477',
    hex: '#E8B4C8',
    image: '/770x_g275446a_0320.jpg'
  },
  {
    value: 'grau-braun',
    label: 'Grau/Braun',
    colorCode: '0558',
    hex: '#9B8F7F',
    image: '/770x_g275776a_0320.jpg'
  },
  {
    value: 'kitt',
    label: 'Kitt',
    colorCode: '2027',
    hex: '#D4C8B8',
    image: '/770x_g115066a_0320.jpg'
  },
  {
    value: 'himbeer',
    label: 'Himbeer',
    colorCode: '2043',
    hex: '#E94B7A',
    image: '/770x_g129752a_1806.jpg'
  }
];

export type ScarfSize = 'small' | 'regular';

export interface SizeOption {
  value: ScarfSize;
  label: string;
  description: string;
  price: number;
}

export const sizes: SizeOption[] = [
  {
    value: 'small',
    label: 'Small',
    description: 'ca. 8cm breit x 100cm lang',
    price: 44
  },
  {
    value: 'regular',
    label: 'Regular',
    description: 'ca. 9.5cm breit x 120cm lang',
    price: 49
  }
];

export const DELIVERY_COST = 7;
