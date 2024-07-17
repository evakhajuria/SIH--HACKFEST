const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/hackfest', { useNewUrlParser: true, useUnifiedTopology: true });

const memberSchema = new mongoose.Schema({
  serial: String,
  role: String,
  name: String,
  email: String,
  phone: String,
  gender: String
});

const Member = mongoose.model('Member', memberSchema);

app.post('/api/members', (req, res) => {
  const newMember = new Member(req.body);
  newMember.save((err) => {
    if (err) {
      res.json({ success: false, message: 'Failed to add member' });
    } else {
      res.json({ success: true, message: 'Member added successfully' });
    }
  });
});

app.get('/api/members', (req, res) => {
  Member.find({}, (err, members) => {
    if (err) {
      res.json({ success: false, message: 'Failed to fetch members' });
    } else {
      res.json({ success: true, members });
    }
  });
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
