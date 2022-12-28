import * as Accordion from "@radix-ui/react-accordion";
import axios from "axios";
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
  let products: Product[] = [];
  const res = axios.get(`${process.env.WOO_URL}/wp-json/wc/v3/products`, {
    auth: {
      username: process.env.WOO_CONSUMER_KEY as string,
      password: process.env.WOO_CONSUMER_SECRET as string,
    },
  });

  res
    .then(function (response) {
      products = response.data;
    })
    .catch(function (error) {
      console.log(error);
    });

  return {
    props: {
      products,
    },
    revalidate: 60,
  };
}
