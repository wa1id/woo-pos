export const formatPrice = (price: string) => {
  return Number(price).toLocaleString("nl-BE", {
    style: "currency",
    currency: "EUR",
  });
};
