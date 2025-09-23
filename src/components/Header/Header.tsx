"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./Header.module.scss";

import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PersonIcon from "@mui/icons-material/Person";

import type { HeaderTopLinks, HeaderBottomLinks } from "./types";

const headerTopLinks: HeaderTopLinks[] = [
  { kind: "tel", icon: <PhoneIcon />, text: "+7 777 777 777", href: "tel:+7777777777" },
  {
    kind: "mail",
    icon: <EmailIcon />,
    text: "example@gmail.com",
    href: "mailto:example@gmail.com",
  },
  { kind: "address", icon: <LocationOnIcon />, text: "Street 12, house 3", href: "/contacts" },
  { kind: "login", icon: <PersonIcon />, text: "Login", href: "/login" },
];

const headerBottomLinks: HeaderBottomLinks[] = [
  { label: "Home", href: "/" },
  { label: "Hot Deals", href: "/hot-deals" },
  { label: "Categories", href: "/categories" },
  { label: "Laptops", href: "/laptops" },
  { label: "Smartphones", href: "/smartphones" },
  { label: "Camera", href: "/camera" },
];

export default function Header() {
  const pathname = usePathname();

  return (
    <header className={styles.header}>
      <div className={styles["header__top"]}>
        <ul className={styles["header__links--top"]}>
          {headerTopLinks.map(({ icon, text, href }, i) => (
            <li key={i} className={styles["header__link"]}>
              <Link href={href} className={styles["header__link-anchor"]}>
                <span className={styles["header__link-icon"]}>{icon}</span>
                <span className={styles["header__link-text"]}>{text}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div className={styles["header__bottom"]}>
        <ul className={styles["header__links--bottom"]}>
          <li className={styles["header__logo"]}>
            <Link href="/">AbeloHost Shop</Link>
          </li>
          {headerBottomLinks.map(({ label, href }) => (
            <li key={href}>
              <Link
                href={href}
                className={`${styles["header__bottom-link"]} ${
                  pathname === href ? styles["header__bottom-link--active"] : ""
                }`}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}
