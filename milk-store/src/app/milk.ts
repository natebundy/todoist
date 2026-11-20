/** Identifies which illustration is drawn on a carton. */
export type MilkArt =
  | 'cow'
  | 'splash'
  | 'chocolate'
  | 'strawberry'
  | 'banana'
  | 'oat'
  | 'almond'
  | 'soy'
  | 'coconut';

export interface CartonColors {
  /** Main front panel colour. */
  body: string;
  /** Darker side panel colour. */
  side: string;
  /** Roof / gable top colour. */
  roof: string;
  /** Background of the label window where the art sits. */
  label: string;
  /** Text colour for the name band. */
  text: string;
}

export interface Milk {
  id: string;
  name: string;
  tagline: string;
  /** Price in US dollars. */
  price: number;
  /** Carton size shown on the carton. */
  volume: string;
  art: MilkArt;
  colors: CartonColors;
}

export const MILKS: readonly Milk[] = [
  {
    id: 'whole',
    name: 'Whole Milk',
    tagline: 'Fresh from the farm',
    price: 3.49,
    volume: '1 L',
    art: 'cow',
    colors: { body: '#2f80d1', side: '#1f5f9f', roof: '#d8e8f8', label: '#e9f4ff', text: '#ffffff' },
  },
  {
    id: 'skim',
    name: 'Skim Milk',
    tagline: 'Light & fat free',
    price: 3.19,
    volume: '1 L',
    art: 'splash',
    colors: { body: '#7fc8e8', side: '#56a5c9', roof: '#e6f6fd', label: '#ffffff', text: '#0f4c69' },
  },
  {
    id: 'chocolate',
    name: 'Chocolate',
    tagline: 'Rich cocoa goodness',
    price: 3.99,
    volume: '1 L',
    art: 'chocolate',
    colors: { body: '#6b3e26', side: '#4a2918', roof: '#c79a7b', label: '#f6e6d6', text: '#fff3e6' },
  },
  {
    id: 'strawberry',
    name: 'Strawberry',
    tagline: 'Berry pink & sweet',
    price: 3.99,
    volume: '1 L',
    art: 'strawberry',
    colors: { body: '#f283a8', side: '#d35d86', roof: '#ffe0ea', label: '#fff5f8', text: '#ffffff' },
  },
  {
    id: 'banana',
    name: 'Banana',
    tagline: 'A-peeling & smooth',
    price: 3.89,
    volume: '1 L',
    art: 'banana',
    colors: { body: '#f6d546', side: '#d9b51f', roof: '#fff6c4', label: '#fffdf0', text: '#5a4500' },
  },
  {
    id: 'oat',
    name: 'Oat Milk',
    tagline: 'Creamy plant power',
    price: 4.29,
    volume: '1 L',
    art: 'oat',
    colors: { body: '#d9b77e', side: '#b8945a', roof: '#f5e8cf', label: '#fffaf0', text: '#4a3510' },
  },
  {
    id: 'almond',
    name: 'Almond Milk',
    tagline: 'Nutty & delicate',
    price: 4.49,
    volume: '1 L',
    art: 'almond',
    colors: { body: '#a8744f', side: '#855636', roof: '#ead3c0', label: '#fdf4ec', text: '#ffffff' },
  },
  {
    id: 'soy',
    name: 'Soy Milk',
    tagline: 'Protein packed',
    price: 3.79,
    volume: '1 L',
    art: 'soy',
    colors: { body: '#6fb35a', side: '#4f8f3d', roof: '#dcefd4', label: '#f6fff2', text: '#ffffff' },
  },
  {
    id: 'coconut',
    name: 'Coconut Milk',
    tagline: 'Tropical & silky',
    price: 4.59,
    volume: '1 L',
    art: 'coconut',
    colors: { body: '#3fb5a3', side: '#2a8b7c', roof: '#d3f1ec', label: '#f3fffd', text: '#ffffff' },
  },
];
