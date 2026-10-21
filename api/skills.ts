import rawData from '../src/data/skillsData.json';

export default function handler(req: any, res: any) {
  const { id, category } = req.query || {};
  let skills = rawData.skills || [];

  if (id) {
    const found = skills.find(
      (s: any) => s.id.toLowerCase() === String(id).toLowerCase()
    );
    if (!found) {
      return res.status(404).json({ error: `Skill "${id}" not found` });
    }
    return res.status(200).json(found);
  }

  if (category) {
    skills = skills.filter((s: any) =>
      (s.categories || []).some(
        (c: string) => c.toLowerCase() === String(category).toLowerCase()
      )
    );
  }

  return res.status(200).json({
    total: skills.length,
    skills,
  });
}
