import React, { useState } from "react";
import { Link } from "../components/link";

export const loader = async () => {
  return { name: "Teste" };
};

const Home = ({ name }: { name: string }) => {
  const [counter, setCounter] = useState(0);
  return (
    <div>
      <h1>Bem vindo, {name}!</h1>
      <div style={{ padding: 12 }}>
        <p>Counter is: {counter}</p>
        <button onClick={() => setCounter((c) => c + 1)}>Increment</button>
      </div>
      <Link to="/contact">Go to contact page</Link>
      <Link to="/shop">Go to shop page</Link>
      <form method="post" action="/">
        <button>Submit</button>
      </form>
    </div>
  );
};

export const action = (req: Request) => {
  console.log("Fui executado.");
  return { status: "success" };
};

export default Home;
