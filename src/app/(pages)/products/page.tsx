"use client";

import { useEffect, useState } from "react";
import { categoryLoad, proPageLoad } from "@/actions/productPage";
import { Product } from "@/types";
import Image from "next/image";
import { sortOptions } from "@/constants";

const Products = () => {
  const [products, setProducts] = useState<Product[] | undefined>(undefined);
  const [saveProducts, setSaveProducts] = useState<Product[] | undefined>(
    undefined
  );
  const [category, setCategory] = useState<string[] | undefined>(undefined);
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>(
    undefined
  );
  const [isLoading, setLoading] = useState(false);
  const [pannelOpen, setPannelOpen] = useState(false);

  useEffect(() => {
    async function pageLoad(): Promise<any> {
      setLoading(true);
      const data: Product[] = await proPageLoad();
      const categorise: string[] = await categoryLoad();
      setCategory(categorise);
      setProducts(data);
      setSaveProducts(data);
      setLoading(false);
    }

    pageLoad();
  }, []);

  const handlePannel = () => {
    setPannelOpen(!pannelOpen);
  };

  const handleCategory = async (val: string) => {
    setSelectedCategory(val);
    const filtered = saveProducts?.filter((pro) => pro.category === val);
    setProducts(filtered);
  };

  function handleRecommend(field: string, direction: string = "asc") {
    const ordered = products?.sort((a, b) => {
      function getValue(obj: any, key: string){
        console.log(obj.rating.rate)
        if (key === "rate") return obj.rating.rate;
        if (key === "count") return obj.rating.count;
        return obj[key];
      };
      const valueA: number = getValue(a, field);
      const valueB: number = getValue(b, field);
      console.log(valueA,valueB)
      if (valueA < valueB) return direction === "asc" ? -1 : 1;
      if (valueA > valueB) return direction === "asc" ? 1 : -1;
      return 0;
    });

    setProducts(ordered);
  }

  return (
    <section
      style={{
        minHeight: "100vh",
        width: "100%",
      }}
    >
      <div
        className="headBar"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <span style={{ display: "flex", gap: "16px" }}>
          <h4>{products?.length} Items</h4>
          {pannelOpen ? (
            <div onClick={handlePannel}>&#x2B9C; Hide Filter</div>
          ) : (
            <div onClick={handlePannel}>Show Filter &#x2B9E;</div>
          )}
        </span>
        <div
          style={{
            textTransform: "uppercase",
            fontWeight: 600,
            letterSpacing: "-1px",
            cursor: "pointer",
          }}
        >
          recommended {"  "}
          <select
            name="sorting"
            onChange={(e) =>
              handleRecommend(e.target.value[0], e.target.value[1])
            }
            multiple={false}
            style={{
              outline:"none"
            }}
          >
            {sortOptions.map((opt) => (
              <option
                key={`${opt.name}-${opt.direction}`}
                value={[opt.name, opt.direction]}
              >
                {opt.name} - {opt.direction}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div style={{ display: "flex" }}>
        <aside className={pannelOpen ? "pannelOpen" : "pannelClose"}>
          <h3
            style={{
              textTransform: "uppercase",
              padding: "12px",
              width: "100%",
              alignSelf: "center",
              alignContent: "center",
            }}
          >
            Category
          </h3>
          <div
            style={{
              display: "flex",
              alignItems: "flex-start",
              justifyContent: "center",
              flexWrap: "wrap",
              flexDirection: "column",
            }}
          >
            {category?.map((item) => (
              <div key={item} style={{ gap: "6px", padding: "6px" }}>
                <input
                  id={item}
                  type="radio"
                  value={item}
                  name="category"
                  onChange={(e) => handleCategory(e.target.value)}
                  checked={selectedCategory === item}
                />
                <label
                  id={item}
                  style={{ textTransform: "capitalize", paddingLeft: "4px" }}
                >
                  {item}
                </label>
              </div>
            ))}
            <div
              style={{
                color: "red",
                cursor: "pointer",
              }}
              onClick={() => {
                setSelectedCategory("");
                setProducts(saveProducts);
              }}
            >
              clear
            </div>
          </div>
        </aside>
        {isLoading ? (
          <p>Loading...</p>
        ) : !products?.length ? (
          <p>No Products Available</p>
        ) : (
          <ul className="container" style={{ width: "100%" }}>
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
                        display: "block",
                      }}
                    />
                  </div>
                  <h4
                    style={{
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                      textTransform: "uppercase",
                      letterSpacing: "-1px",
                    }}
                  >
                    {prod.title}
                  </h4>
                  <p
                    style={{
                      fontSize: "small",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                      textTransform: "none",
                      color: "#888792",
                      letterSpacing: "-1px",
                    }}
                  >
                    {prod.description}
                  </p>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <div>$ {prod.price} /-</div>
                    <span
                      style={{
                        fontSize: "24px",
                        marginRight: "5px",
                      }}
                    >
                      &#9825;
                    </span>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
};

export default Products;
