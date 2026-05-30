/** Подпись к цене в карточке и на странице услуги */
export const servicePriceLabel = (price: string) =>
  price.includes("/час") ? "Почасовая ставка" : "Стоимость проекта";
