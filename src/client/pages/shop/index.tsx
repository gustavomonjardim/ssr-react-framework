import React from "react";
import { Link } from "../../components/link";

const Shop = () => {
  return (
    <div>
      <h1>This is the shop page!</h1>
      <Link to="/shop/product">Visualizar produto</Link>
      <Link to="/">Go back</Link>
    </div>
  );
};

export default Shop;
