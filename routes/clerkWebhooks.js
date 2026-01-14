// routes/clerkWebhooks.js
const express = require('express');
const { Webhook } = require('svix');
const User = require('../models/User');
const router = express.Router();

// NOTE: Use express.raw() for this specific route to verify signatures
router.post('/webhook', express.raw({ type: 'application/json' }), async (req, res) => {
  const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;

  // 1. Verify headers using Svix
  const payload = req.body.toString();
  const headers = req.headers;
  const wh = new Webhook(WEBHOOK_SECRET);
  let evt;

  try {
    evt = wh.verify(payload, headers);
  } catch (err) {
    return res.status(400).json({ message: 'Webhook verification failed' });
  }

  const { id, first_name, last_name, email_addresses, image_url } = evt.data;
  const eventType = evt.type;

  // 2. Handle Create/Update
  if (eventType === 'user.created' || eventType === 'user.updated') {
    await User.findOneAndUpdate(
      { clerkId: id },
      {
        clerkId: id,
        email: email_addresses[0].email_address,
        firstName: first_name,
        lastName: last_name,
        photo: image_url,
      },
      { upsert: true }
    );
  }

  // 3. Handle Delete
  if (eventType === 'user.deleted') {
    await User.findOneAndDelete({ clerkId: id });
  }

  res.status(200).json({ success: true });
});

module.exports = router;
