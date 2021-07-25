import mongoose from "mongoose";
import config from "./config.js"

mongoose.connect('mongodb://localhost:27017/test', {
  useNewUrlParser: true, 
  useUnifiedTopology: true
});

//eventos
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
  console.log("Mongodb conectado");
});

// (async () => {
//   try {
//     const db = await mongoose.connect(config.MONGODB_URI, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//       useFindAndModify: false,
//       useCreateIndex: true,
//     });
//     console.log("Mongodb conectado", db.connection.host);
//   } catch (error) {
//     console.error(error);
//   }
// })();