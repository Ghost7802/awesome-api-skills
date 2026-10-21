export interface Env {
  DB: any;
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);
    const userId = url.searchParams.get('id') || '1';

    // Parameterized read query
    const user = await env.DB.prepare('SELECT id, email, role FROM users WHERE id = ?1')
      .bind(userId)
      .first();

    // Atomic batch transaction
    await env.DB.batch([
      env.DB.prepare('UPDATE users SET last_seen = CURRENT_TIMESTAMP WHERE id = ?1').bind(userId),
      env.DB.prepare('INSERT INTO audit_logs (user_id, action) VALUES (?1, ?2)').bind(userId, 'profile_view'),
    ]);

    return Response.json({ user });
  },
};
