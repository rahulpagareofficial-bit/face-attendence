const { sb, auth } = require('./_db');

module.exports = async (req, res) => {
  if (!auth(req, res)) return;
  try {
    if (req.method === 'GET') {
      const { data, error } = await sb.from('students').select('id,roll_no,name,descriptor').order('roll_no');
      if (error) throw error;
      return res.json(data);
    }
    if (req.method === 'POST') {
      const { roll_no, name, descriptor } = req.body || {};
      if (!roll_no || !name || !Array.isArray(descriptor) || descriptor.length !== 128)
        return res.status(400).json({ error: 'Invalid data' });
      const { data, error } = await sb.from('students').insert({ roll_no, name, descriptor }).select('id').single();
      if (error) return res.status(error.code === '23505' ? 409 : 500).json({ error: error.code === '23505' ? 'Roll no already exists' : error.message });
      return res.json(data);
    }
    if (req.method === 'DELETE') {
      const { error } = await sb.from('students').delete().eq('id', req.query.id);
      if (error) throw error;
      return res.json({ ok: true });
    }
    res.status(405).json({ error: 'Method not allowed' });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};
