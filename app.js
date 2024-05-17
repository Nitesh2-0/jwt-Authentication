const express = require('express')
const app = express();
const indexRouter = require('./routes/index')
const userRouter  = require('./routes/users')
const PORT = 8080

app.use(express.urlencoded({extended:false}))
app.use(express.json())


app.use('/users', userRouter)
app.use('/', indexRouter)

app.listen(PORT, () => {
  console.log(`Server is running on the port ${PORT}`);
})