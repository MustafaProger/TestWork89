"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMemo, useState } from "react";
import styles from "./Header.module.scss";

import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PersonIcon from "@mui/icons-material/Person";

import type { HeaderBottomLinks } from "./types";
import { useAuthStore } from "@/store/auth.store";

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
  const status = useAuthStore((s) => s.status);
  const user = useAuthStore((s) => s.user);

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const baseTopLinks = useMemo(
    () => [
      { kind: "tel", icon: <PhoneIcon />, text: "+7 777 777 777", href: "tel:+7777777777" },
      {
        kind: "mail",
        icon: <EmailIcon />,
        text: "example@gmail.com",
        href: "mailto:example@gmail.com",
      },
      { kind: "address", icon: <LocationOnIcon />, text: "Street 12, house 3", href: "/contacts" },
    ],
    [],
  );

  const authLink =
    status === "authenticated"
      ? {
          kind: "profile",
          icon: <PersonIcon />,
          text: user ? `${user.firstName} ${user.lastName}` : "Profile",
          href: "/profile",
        }
      : { kind: "login", icon: <PersonIcon />, text: "Login", href: "/login" };

  const headerTopLinks = [...baseTopLinks, authLink];

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className={styles.header}>
      <div className={styles.header__top}>
        <ul className={styles["header__links--top"]}>
          {headerTopLinks.map(({ kind, icon, text, href }) => (
            <li key={kind} className={styles.header__link}>
              <Link href={href} className={styles["header__link-anchor"]}>
                <span className={styles["header__link-icon"]} aria-hidden="true">
                  {icon}
                </span>
                <span className={styles["header__link-text"]}>{text}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div className={styles.header__bottom}>
        <div className={styles["header__bottom-inner"]}>
          <div className={styles.header__logo}>
            <Link href="/" onClick={closeMenu}>
              AbeloHost Shop
            </Link>
          </div>

          <button
            className={styles.header__burger}
            aria-label="Toggle navigation menu"
            aria-controls="main-navigation"
            aria-expanded={isMenuOpen}
            onClick={() => setIsMenuOpen((v) => !v)}
          >
            <span className={styles["header__burger-bar"]} />
            <span className={styles["header__burger-bar"]} />
            <span className={styles["header__burger-bar"]} />
          </button>

          <nav
            id="main-navigation"
            className={`${styles.header__nav} ${isMenuOpen ? styles["header__nav--open"] : ""}`}
          >
            <ul className={styles["header__links--bottom"]}>
              {headerBottomLinks.map(({ label, href }) => {
                const active = pathname === href;
                return (
                  <li key={href}>
                    <Link
                      href={href}
                      onClick={closeMenu}
                      className={`${styles["header__bottom-link"]} ${
                        active ? styles["header__bottom-link--active"] : ""
                      }`}
                      aria-current={active ? "page" : undefined}
                    >
                      {label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}
