const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const mongoose = require('mongoose');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Connect to MongoDB
// Connect to MongoDB Atlas
mongoose.connect('mongodb+srv://ahmed:123abc222@cluster0.dwgpuou.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Define MongoDB schema and model for swap events
const swapEventSchema = new mongoose.Schema({
  eventName: String,
  eventData: Object,
  timestamp: { type: Date, default: Date.now },
});
const SwapEvent = mongoose.model('SwapEvent', swapEventSchema);

// WebSocket connection
io.on('connection', (socket) => {
  console.log('Client connected');

  // Listen for swap events
  socket.on('swapEvent', (data) => {
    console.log('Received swap event:', data);

    // Save swap event to the database
    const swapEvent = new SwapEvent({
      eventName: data.eventName,
      eventData: data.eventData,
    });
    swapEvent.save((err, savedEvent) => {
      if (err) return console.error('Error saving swap event:', err);
      console.log('Saved swap event:', savedEvent);
    });
  });

  // Disconnect event
  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

// Start the server
const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
// Endpoint to get all swap event logs
app.get('/api/swapEvents', async (req, res) => {
    try {
      const swapEvents = await SwapEvent.find().sort({ timestamp: -1 }).exec();
      res.json(swapEvents);
    } catch (err) {
      console.error('Error fetching swap events:', err);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  