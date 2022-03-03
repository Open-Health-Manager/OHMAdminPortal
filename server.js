const express = require('express'); 
const app = express(); 

const cors = require('cors');
const router = require('./routes/router.js')

//middleware
app.use(express.json());
app.use(cors());

//routes
app.use(router);


//listen
const PORT = process.env.port || 4003
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

