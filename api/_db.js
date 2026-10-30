const { createClient } = require('@supabase/supabase-js');

const sb = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_KEY);

function auth(req, res) {
  if (!process.env.ADMIN_PASSWORD || req.headers['x-admin-key'] !== process.env.ADMIN_PASSWORD) {
    res.status(401).json({ error: 'Incorrect password. Please try again.' });
    return false;
  }
  return true;
}

const today = () => new Date().toLocaleDateString('en-CA', { timeZone: 'Asia/Kolkata' });

module.exports = { sb, auth, today };
