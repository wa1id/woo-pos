import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const products = axios.get(`${process.env.WOO_URL}/wp-json/wc/v3/products`, {
    auth: {
      username: process.env.WOO_CONSUMER_KEY as string,
      password: process.env.WOO_CONSUMER_SECRET as string,
    },
  });

  products
    .then(function (response) {
      return res.status(200).json(response.data);
    })
    .catch(function (error) {
      console.log(error);
      return res.status(500).json({ error: error });
    });
}
