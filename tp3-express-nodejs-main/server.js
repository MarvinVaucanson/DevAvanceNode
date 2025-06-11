import mongoose from 'mongoose';
import { app } from './app.js'
import dotenv from 'dotenv';
import util from 'util';
import { Tour } from './models/tour.model.js'
//configure l'environnement
dotenv.config();
console.log(process.env.DATABASE)

const LOCAL_DATABASE = process.env.DATABASE;
async function connectDB() {
    await mongoose.connect(LOCAL_DATABASE)
}
connectDB().catch((err) => {
    console.log("Connexion à MongoDB a échoué", err)
})



const port = process.env.PORT || 3000

app.listen(port, () => {
    console.log(`App running on port ${port}`)
})
