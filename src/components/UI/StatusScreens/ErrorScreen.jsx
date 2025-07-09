import styles from "./infoScreen.module.sass"

export const ErrorScreen = (props) => {
    return <div className={styles.info_screen}>
            <div className="info_elements_wrapper">
                <div className="error-cross"></div>
                <div className="error_text">{props.text}</div>
            </div>
            </div>
};
