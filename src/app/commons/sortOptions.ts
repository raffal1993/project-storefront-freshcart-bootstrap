import { SortOptions } from '../types/sortOptions.type';

export const sortOptions: SortOptions[] = [
  'Featured',
  'Price: Low to High',
  'Price: High to Low',
  'Avg. Rating',
];

export const sortOptionsModel: Record<
  SortOptions,
  { name: string; dir: string }
> = {
  Featured: {
    name: 'featureValue',
    dir: 'desc',
  },
  'Price: Low to High': {
    name: 'price',
    dir: 'asc',
  },
  'Price: High to Low': {
    name: 'price',
    dir: 'desc',
  },
  'Avg. Rating': {
    name: 'ratingValue',
    dir: 'desc',
  },
};
