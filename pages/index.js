import React from "react";

import { useStateContext } from "../Context";

const index = () => {
  const { TOKEN_ICO } = useStateContext();
  return <div>{TOKEN_ICO}</div>;
};

export default index;
