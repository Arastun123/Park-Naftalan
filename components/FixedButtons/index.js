"use client";
import Link from "next/link";
import { Phone, Reservation } from "../Svg";
import styles from "@/styles/global.module.scss";
import {usePathname} from "next/navigation";
export default function FixedButtons({locale}) {
    const pathname = usePathname();
    let isBooking = ["/en/booking", "/ru/booking", "/az/booking"].includes(pathname);
    return (
        <div className={`${styles.fixedBtns} ${isBooking ? "hidden" : ""}`}>
            <Link href="tel:+994502342458" className={styles.fixedBtn}>
                <Phone />
            </Link>
            {/*<Link href={`/${locale}/reservations`} className={styles.fixedBtn}>*/}
            {/*  <Reservation />*/}
            {/*</Link>*/}
            <Link href={`/${locale}/booking`} className={styles.fixedBtn}>
                <Reservation />
            </Link>
        </div>
    );
}