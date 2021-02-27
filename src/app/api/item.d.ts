export interface Item {
  itemId: number;
  name: string;
  nameFr: string;
  itemType: 'Character' | 'Weapon';
  rankType: 1 | 2 | 3 | 4 | 5;
}
