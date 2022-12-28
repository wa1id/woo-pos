import * as Accordion from "@radix-ui/react-accordion";
import { formatPrice } from "../utils";

export default function Home({ products }: { products: Product[] }) {
  return (
    <>
      <h1 className="underline">Producten</h1>
      {products.map((product: Product) => (
        <Accordion.Root key={product.id} type="multiple">
          <Accordion.Item value={product.slug}>
            <Accordion.Header>
              <Accordion.Trigger>{product.name}</Accordion.Trigger>
            </Accordion.Header>
            <Accordion.Content>
              Price: {formatPrice(product.price)}
            </Accordion.Content>
          </Accordion.Item>
        </Accordion.Root>
      ))}
    </>
  );
}

export async function getStaticProps() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_VERCEL_URL}/api/products`);
  const products = await res.json();

  return {
    props: {
      products,
    },
    revalidate: 60,
  };
}
