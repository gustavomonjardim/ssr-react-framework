import React, { useState } from "react";
import { Link } from "react-router-dom";

const Home = () => {
  const [counter, setCounter] = useState(0);
  return (
    <div>
      <div style={{ padding: 12 }}>
        <p>Counter is: {counter}</p>
        <button onClick={() => setCounter((c) => c + 1)}>Increment</button>
      </div>
      <Link to="/contact">Go to contact page</Link>
      <Link to="/shop">Go to shop page</Link>
    </div>
  );
};

export default Home;
