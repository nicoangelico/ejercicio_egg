import app from "./app";
import "./config/database";

// Server is listening
app.listen(app.get('port'), () => {
    console.log('Server corriendo en puerto ', app.get('port'))
    console.log("Entorno:", process.env.NODE_ENV);
})

