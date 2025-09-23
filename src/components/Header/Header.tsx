"use client";

import React from "react";
import style from "./Header.module.scss";

import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import LocationPinIcon from "@mui/icons-material/LocationPin";
import PersonIcon from "@mui/icons-material/Person";

interface HeaderTopLink {
  icon: React.ReactNode;
  text: string;
  href?: string;
  onClick?: () => void;
}

const headerTopLinks: HeaderTopLink[] = [
  { icon: <PhoneIcon />, text: "+7 777 777 777", href: "tel:+7777777777" },
  { icon: <EmailIcon />, text: "example@gmail.com", href: "mailto:example@gmail.com" },
  { icon: <LocationPinIcon />, text: "Street 12, house 3", href: "/contacts" },
  { icon: <PersonIcon />, text: "Login", onClick: () => console.log("Открыть модалку логина") },
];

export default function Header() {
  return (
    <header className="header">
      <div className={style["header__top"]}>
        <ul className={style["header__links"]}>
          {headerTopLinks.map(({ icon, text, href, onClick }, i) => (
            <li key={i} className={style["header__link"]}>
              {href ? (
                <a href={href} className={style["header__link-anchor"]}>
                  <span className={style["header__link-icon"]}>{icon}</span>
                  <span className={style["header__link-text"]}>{text}</span>
                </a>
              ) : (
                <button onClick={onClick} className={style["header__link-button"]}>
                  <span className={style["header__link-icon"]}>{icon}</span>
                  <span className={style["header__link-text"]}>{text}</span>
                </button>
              )}
            </li>
          ))}
        </ul>
      </div>
      <div className="header__bottom"></div>
    </header>
  );
}
