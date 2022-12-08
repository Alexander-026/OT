require('dotenv').config()
const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const connectDB = require('./db/connect')
const router = require('./router/index')
const errorMiddleware = require('./middleware/error-middleware')

const PORT =  process.env.PORT ||  5000
const app = express()

app.use(express.json())
app.use(cookieParser())
app.use(cors())
app.use('/api', router)
app.use(errorMiddleware)


const start =  async () => {
   try {
      await connectDB(process.env.MONGO_URL);
      app.listen(PORT, () => console.log(`Server started on PORT-${PORT}`))
   } catch (error) {
      console.log(error)
   }


}

start()