export interface Item {
  itemId: number;
  name: string;
  nameFr: string;
  itemType: 'Character' | 'Weapon';
  image: {
    url: string;
  };
  rankType: number;
}
