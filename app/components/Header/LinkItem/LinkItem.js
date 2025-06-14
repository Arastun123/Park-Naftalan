import Link from "next/link";
import style from './LinkItem.module.scss'
export default function LinkItem({params, slug, children}) {
    return (
        <Link href={slug} className={style.navitem}>{children}</Link>
    )
}