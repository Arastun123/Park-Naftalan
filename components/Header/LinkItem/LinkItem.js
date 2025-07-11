"use client";
import Link from "next/link";
import style from "./LinkItem.module.scss";
export default function LinkItem({ slug, children, rest }) {
  return (
    <Link href={slug} className={style.navitem} {...rest}>
      {children}
    </Link>
  );
}
