const express = require('express');

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const { User } = require('./models/index')
const getTenant = require('./get-tenant')

app.post('/register', getTenant, async (req, res) => {
  const user = await User.create(req.body);
  return res.json({ user });
});

app.get('/all', getTenant, async (req, res) => { 
  const result = await User.scope({ method: ['byIdTenant' , req.body.tenantId] }).findAll();
  return res.json({ result });
});

app.listen(8000, () => console.log('Server started on port 8000'));