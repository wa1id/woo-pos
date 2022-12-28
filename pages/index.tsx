import * as Accordion from "@radix-ui/react-accordion";
import axios from "axios";
import { formatPrice } from "../utils";

interface Props {
  products: Product[];
  categories: Category[];
}

export default function Home({ products, categories }: Props) {
  return (
    <>
      <div className="underline font-bold">Producten</div>
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

      <div className="underline font-bold">Categories</div>
      {categories.map((category: Category) => (
        <Accordion.Root key={category.id} type="multiple">
          <Accordion.Item value={category.slug}>
            <Accordion.Header>
              <Accordion.Trigger>{category.name}</Accordion.Trigger>
            </Accordion.Header>
            <Accordion.Content>
              <>
                {products
                  .filter((product) =>
                    product.categories.some((cat) => cat.id === category.id)
                  )
                  .map((product) => (
                    <div key={product.id}>{product.name}</div>
                  ))}
              </>
            </Accordion.Content>
          </Accordion.Item>
        </Accordion.Root>
      ))}
    </>
  );
}

export async function getStaticProps() {
  const res = axios.get(
    `${process.env.WOO_URL}/wp-json/wc/v3/products?per_page=100`,
    {
      auth: {
        username: process.env.WOO_CONSUMER_KEY as string,
        password: process.env.WOO_CONSUMER_SECRET as string,
      },
    }
  );

  const resCategories = axios.get(
    `${process.env.WOO_URL}/wp-json/wc/v3/products/categories?per_page=100`,
    {
      auth: {
        username: process.env.WOO_CONSUMER_KEY as string,
        password: process.env.WOO_CONSUMER_SECRET as string,
      },
    }
  );

  const products: Product[] = (await res).data || [];
  const categories: Category[] = (await resCategories).data || [];

  return {
    props: {
      products,
      categories,
    },
    revalidate: 60,
  };
}
