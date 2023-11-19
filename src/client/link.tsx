import React from "react";
import { Link as RRDLink } from "react-router-dom";

type Props = {
  children: React.ReactNode;
  to: string;
};

export const Link = ({ to, children }: Props) => {
  return <a href={to}>{children}</a>;
};
