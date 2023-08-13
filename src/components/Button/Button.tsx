import styles from "./style.module.scss"

interface ButtonProps {
    text: string;
}

const Button = ({text}: ButtonProps) => {

    return (
        <button className={styles.button}>{text}</button>
    );
};

export { Button }
