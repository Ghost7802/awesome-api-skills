import fs from 'fs';
import path from 'path';

let cachedSkills: any[] | null = null;

function loadSkills(): any[] {
  if (cachedSkills) return cachedSkills;
  const candidates = [
    path.join(process.cwd(), 'src', 'data', 'skillsData.json'),
    typeof __dirname !== 'undefined'
      ? path.resolve(__dirname, '..', 'src', 'data', 'skillsData.json')
      : '',
  ].filter(Boolean);

  for (const filePath of candidates) {
    if (fs.existsSync(filePath)) {
      const raw = JSON.parse(fs.readFileSync(filePath, 'utf8'));
      cachedSkills = Array.isArray(raw.skills) ? raw.skills : [];
      return cachedSkills!;
    }
  }
  return [];
}

export default function handler(req: any, res: any) {
  const q = String(req.query?.q || '').toLowerCase().trim();
  const skills = loadSkills();

  if (!q) {
    return res.status(200).json({
      query: '',
      count: skills.length,
      results: skills.slice(0, 20),
    });
  }

  const results = skills.filter(
    (s: any) =>
      String(s.id || '').toLowerCase().includes(q) ||
      (s.name && String(s.name).toLowerCase().includes(q)) ||
      (s.description && String(s.description).toLowerCase().includes(q)) ||
      (s.categories || []).some((c: string) => String(c).toLowerCase().includes(q))
  );

  return res.status(200).json({
    query: q,
    count: results.length,
    results,
  });
}
