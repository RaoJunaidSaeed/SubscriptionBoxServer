// middleware/auth.js
const { ClerkExpressWithAuth } = require('@clerk/clerk-sdk-node');

// This extracts the userId from the token sent by your frontend
module.exports = ClerkExpressWithAuth();
