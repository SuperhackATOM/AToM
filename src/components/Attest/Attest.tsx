import styles from "./style.module.scss"
import {Button} from "@/components/Button/Button";

const Attest = () => {
    return (
        <div className={styles.attest}>
            <h4 className={styles.title}>Attest meet</h4>
            <input placeholder={"Enter your ETH address here..."}/>
            <Button text={'Attest'}/>
        </div>
    );
};

export { Attest }
