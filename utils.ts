export const formatPrice = (price: string) => {
  if (price)
    return Number(price).toLocaleString("nl-BE", {
      style: "currency",
      currency: "EUR",
    });
};
