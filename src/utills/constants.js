// сортировка велосипедов

export const sortTypes = [
  { type: 'modelName', title: 'названию ↑', order: 'asc' },
  { type: 'modelName', title: 'названию ↓', order: 'desc' },
  { type: 'rating', title: 'популярности ↑', order: 'asc' },
  { type: 'rating', title: 'популярности ↓', order: 'desc' },
  { type: 'price', title: 'цене ↑', order: 'asc' },
  { type: 'price', title: 'цене ↓', order: 'desc' },
];

// категории велосипедов

export const categoriesList = ['все', 'шоссе', 'шоссе аэро', 'хардтейлы', 'двухподвесы'];

// api

export const baseUrl = 'https://63a2225aa543280f7769c71a.mockapi.io/bikes';
