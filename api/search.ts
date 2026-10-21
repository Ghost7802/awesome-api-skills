import rawData from '../src/data/skillsData.json';

export default function handler(req: any, res: any) {
  const q = String(req.query?.q || '').toLowerCase().trim();
  const skills = rawData.skills || [];

  if (!q) {
    return res.status(200).json({
      query: '',
      count: skills.length,
      results: skills.slice(0, 20),
    });
  }

  const results = skills.filter(
    (s: any) =>
      s.id.toLowerCase().includes(q) ||
      (s.name && s.name.toLowerCase().includes(q)) ||
      (s.description && s.description.toLowerCase().includes(q)) ||
      (s.categories || []).some((c: string) => c.toLowerCase().includes(q))
  );

  return res.status(200).json({
    query: q,
    count: results.length,
    results,
  });
}
