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
        return res.status(400).json({ error: 'Invalid details. Please capture your face again.' });
      const { data, error } = await sb.from('students').insert({ roll_no, name, descriptor }).select('id').single();
      if (error) return res.status(error.code === '23505' ? 409 : 500).json({ error: error.code === '23505' ? 'This Roll No is already registered.' : error.message });
      return res.json(data);
    }
    if (req.method === 'DELETE') {
      const { error } = await sb.from('students').delete().eq('id', req.query.id);
      if (error) throw error;
      return res.json({ ok: true });
    }
    res.status(405).json({ error: 'This action is not supported.' });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};
