// сортировка велосипедов

export const sortTypes = [
  { sortBy: 'modelName', title: 'названию ↑', order: 'asc' },
  { sortBy: 'modelName', title: 'названию ↓', order: 'desc' },
  { sortBy: 'rating', title: 'популярности ↑', order: 'asc' },
  { sortBy: 'rating', title: 'популярности ↓', order: 'desc' },
  { sortBy: 'price', title: 'цене ↑', order: 'asc' },
  { sortBy: 'price', title: 'цене ↓', order: 'desc' },
];

// категории велосипедов

export const categoriesList = ['все', 'шоссе', 'шоссе аэро', 'хардтейлы', 'двухподвесы'];

// api

export const baseUrl = 'https://63a2225aa543280f7769c71a.mockapi.io/bikes';
