"use client"

import {usePathname} from "next/navigation";
import styles from "@/components/Layout/Navigation/style.module.scss"
import Link from "next/link";
import Image from "next/image";

type NavLink = {
    label: string;
    href: string;
    img: any;
}

interface NavigationProps {
    navLinks: NavLink[]
}

const Navigation = ({navLinks} : NavigationProps) => {

    const pathname = usePathname()
    return (
        <>
            {
                navLinks.map((link) => {
                    const isActive = pathname === link.href
                    return (
                        <Link key={link.label}
                              className={`${styles.menuLink} ${isActive ? styles.active : ''}`}
                              href={link.href}
                        >
                            <Image alt={link.label} src={link.img} />
                            <h4>{link.label}</h4>
                        </Link>
                    )
                })
            }
        </>
    );
};

export { Navigation }
