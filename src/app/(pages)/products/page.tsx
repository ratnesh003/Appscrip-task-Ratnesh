"use client";

import SidePannel from "@/components/SidePannel";
import { useEffect, useState } from "react";
import { proPageLoad } from "@/actions/productPage";
import { Product } from "@/types";
import Image from "next/image";

const Products = () => {
  const [products, setProducts] = useState<Product[] | undefined>(undefined);

  useEffect(() => {
    async function pageLoad(): Promise<any> {
      const data: Product[] = await proPageLoad();
      setProducts(data);
    }

    pageLoad();
  }, []);

  return (
    <section>
      <SidePannel />
      {!products?.length ? (
        <p>No Products Available</p>
      ) : (
        <ul className="container">
          {products?.map((prod) => (
            <li key={prod.id}>
              <div className="card">
                <div className="cardCover">
                  <Image
                    src={prod.image}
                    alt={prod.title}
                    sizes="300px"
                    fill
                    style={{
                      objectFit: "contain",
                      display: "block"
                    }}
                  />
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};

export default Products;
