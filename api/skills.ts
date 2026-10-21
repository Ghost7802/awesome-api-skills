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
  const { id, category } = req.query || {};
  let skills = loadSkills();

  if (id) {
    const found = skills.find(
      (s: any) => String(s.id || '').toLowerCase() === String(id).toLowerCase()
    );
    if (!found) {
      return res.status(404).json({ error: `Skill "${id}" not found` });
    }
    return res.status(200).json(found);
  }

  if (category) {
    skills = skills.filter((s: any) =>
      (s.categories || []).some(
        (c: string) => String(c).toLowerCase() === String(category).toLowerCase()
      )
    );
  }

  return res.status(200).json({
    total: skills.length,
    skills,
  });
}
