export default function handler(req: any, res: any) {
  const m = req.body || {};
  const diagnostics: Array<{
    rule: string;
    category: string;
    severity: string;
    message: string;
  }> = [];

  if (!m.name || typeof m.name !== 'string' || !/^[a-z0-9-]+$/.test(m.name)) {
    diagnostics.push({
      rule: 'V-001',
      category: 'Identifier Format',
      severity: 'error',
      message: 'Skill "name" must be a kebab-case string.',
    });
  }

  if (!m.version || !/^\d+\.\d+\.\d+/.test(m.version)) {
    diagnostics.push({
      rule: 'V-002',
      category: 'Versioning',
      severity: 'error',
      message: 'Field "version" must follow semantic versioning.',
    });
  }

  if (!Array.isArray(m.categories) || m.categories.length === 0) {
    diagnostics.push({
      rule: 'V-004',
      category: 'Classification',
      severity: 'error',
      message: 'Field "categories" must be a non-empty array.',
    });
  }

  return res.status(200).json({
    valid: !diagnostics.some((d) => d.severity === 'error'),
    diagnostics,
  });
}
