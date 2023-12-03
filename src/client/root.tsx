import React from "react";
import Scripts from "./components/scripts";
import Outlet from "./components/outlet";

const Root = () => {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Document</title>
      </head>
      <body>
        <Outlet />
        <Scripts />
      </body>
    </html>
  );
};

export default Root;
