"use client"

import styles from "./style.module.scss"
// import Image from "next/image";


const Connection = () => {
    return (
        <div className={styles.connection}>
            {/*<Image src={} alt={}/>*/}
            <span className={styles.address}>0x8675a1C67BD6e644155fC88a8E83Ee84A4a8a8f2</span>
            <div className={styles.date}>
                <span className={styles.date__top}>08/11/2023</span>
                <span className={styles.date__bottom}>1:02:51 am</span>
            </div>

            {/*<Image className={styles.approved} src={} alt={}/>*/}
            <span>*</span>
        </div>
    );
};

export { Connection };
