import "./LoadingScreen.css"
import styles from "./infoScreen.module.sass"

function LoadingScreen(props)
{
    const loading_text = props.text || "Загрузка..."
    return (
        <div className={styles.info_screen}>
            <div className="info_elements_wrapper">
                <div className="loading_circle"></div>
                <div className="info_text">{loading_text}</div>
            </div>
        </div>
    )
}

export default LoadingScreen