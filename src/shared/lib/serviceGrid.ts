/** Последняя карточка в сетке 2 колонки — на всю ширину, если элементов нечётное число */
export const isWideLastGridItem = (index: number, total: number) =>
  total % 2 !== 0 && index === total - 1;
