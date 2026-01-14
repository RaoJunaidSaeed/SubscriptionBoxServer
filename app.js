const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const { clerkMiddleware } = require('@clerk/express');

const boxRoutes = require('./routes/boxRoutes');
const itemRoutes = require('./routes/itemRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();

// 1) GLOBAL MIDDLEWARES
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);
      callback(null, true);
    },
    credentials: true,
    methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  })
);

app.use(express.json());

app.use(clerkMiddleware());

app.use(
  helmet({
    crossOriginResourcePolicy: { policy: 'cross-origin' },
  })
);

// 2) REGISTER ROUTES
app.use('/api/users', userRoutes);
app.use('/api/boxes', boxRoutes);
app.use('/api/items', itemRoutes);

module.exports = app;

// const express = require('express');
// const cors = require('cors');
// const helmet = require('helmet');
// // Import Route Files
// const boxRoutes = require('./routes/boxRoutes');
// const itemRoutes = require('./routes/itemRoutes');
// const userRoutes = require('./routes/userRoutes');

// const app = express();

// // Middleware
// // app.use(cors());
// // app.use(
// //   cors({
// //     origin: [' http://localhost:3000', 'http://192.168.100.59:3000'],
// //     credentials: true,
// //     methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE'],
// //   })
// // );
// // Replace your existing app.use(cors(...)) with this:
// app.use(
//   cors({
//     origin: (origin, callback) => {
//       // Allows any origin (localhost, IP, etc.) to connect dynamically
//       if (!origin) return callback(null, true);
//       callback(null, true);
//     },
//     credentials: true, // ✅ Required for Clerk cookies and tokens
//     methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE', 'OPTIONS'],
//     allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
//   })
// );
// app.use(express.json());
// app.use(
//   helmet({
//     crossOriginResourcePolicy: { policy: 'cross-origin' },
//   })
// );
// // Register Routes
// app.use('/api/users', userRoutes);
// app.use('/api/boxes', boxRoutes);
// app.use('/api/items', itemRoutes); //

// module.exports = app;

// // const express = require('express');
// // const cors = require('cors');

// // // Import Route Files
// // const boxRoutes = require('./routes/boxRoutes');
// // const itemRoutes = require('./routes/itemRoutes');
// // // Import Middleware
// // const requireAuth = require('./middleware/auth');

// // const app = express();

// // // Middleware
// // app.use(cors());
// // app.use(express.json());

// // // Register Routes (Protected)
// // // We inject 'requireAuth' before the route handler.
// // // This means: "Check if logged in -> IF YES -> Go to boxRoutes"
// // app.use('/api/boxes', requireAuth, boxRoutes);
// // app.use('/api/items', requireAuth, itemRoutes);

// // module.exports = app;
