import { JSX } from "react";

export interface HeaderTopLinks {
  kind: string;
  icon: JSX.Element;
  text: string;
  href: string;
}

export interface HeaderBottomLinks {
  label: string;
  href: string;
}