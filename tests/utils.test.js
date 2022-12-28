import { formatPrice } from "../utils";

describe("utils", () => {
  it("should format string to locale currency", () => {
    expect(formatPrice("1000")).toBe("€\xa01.000,00");
    expect(formatPrice("5.5")).toBe("€\xa05,50");
    expect(formatPrice("2.50")).toBe("€\xa02,50");
    expect(formatPrice("3.559")).toBe("€\xa03,56");
    expect(formatPrice("0")).toBe("€\xa00,00");
  });
});
