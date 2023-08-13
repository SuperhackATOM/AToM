
import styles from "./style.module.scss"
import {Connection} from "@/components/Connection/Connection";
export default function Connections() {
    return (
        <div className={styles.connections}>
            <h4>My connections</h4>
            <Connection/>
            <Connection/>
            <Connection/>
        </div>
    )
}
