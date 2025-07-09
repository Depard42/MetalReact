import * as ReactDomClient from "react-dom/client"
import App from "./app.jsx"
import './css/main.css'




const app = ReactDomClient.createRoot(document.getElementById("root"))
app.render(<App />)