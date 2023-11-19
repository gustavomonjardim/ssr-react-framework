import React, { useState } from "react";

const Home = () => {
  const [counter, setCounter] = useState(0);
  return (
    <div>
      <div style={{ padding: 12 }}>
        <p>Counter is: {counter}</p>
        <button onClick={() => setCounter((c) => c + 1)}>Increment</button>
      </div>
      <a href="/contact">Go to contact page</a>
      <a href="/shop">Go to shop page</a>
    </div>
  );
};

export default Home;
