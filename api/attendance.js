const { sb, auth, today } = require('./_db');

module.exports = async (req, res) => {
  if (!auth(req, res)) return;
  try {
    if (req.method === 'GET') {
      const date = req.query.date || today();
      const { data, error } = await sb
        .from('attendance')
        .select('student_id,marked_at,students(name,roll_no)')
        .eq('date', date)
        .order('marked_at');
      if (error) throw error;
      return res.json(data);
    }
    if (req.method === 'POST') {
      const { student_id } = req.body || {};
      if (!student_id) return res.status(400).json({ error: 'Student information is missing.' });
      const { error } = await sb.from('attendance').insert({ student_id, date: today() });
      if (error) {
        if (error.code === '23505') return res.json({ already: true });
        throw error;
      }
      return res.json({ already: false });
    }
    res.status(405).json({ error: 'This action is not supported.' });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};
