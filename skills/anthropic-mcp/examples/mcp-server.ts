import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { z } from 'zod';

const server = new McpServer({
  name: 'database-inspector',
  version: '1.0.0',
});

server.tool(
  'query_table_schema',
  { tableName: z.string().min(1).describe('Name of the SQL table') },
  async ({ tableName }) => {
    try {
      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify({ table: tableName, columns: ['id', 'created_at', 'status'] }),
          },
        ],
      };
    } catch (err: any) {
      console.error('Tool execution failed:', err);
      return {
        content: [{ type: 'text', text: `Error: ${err.message}` }],
        isError: true,
      };
    }
  }
);

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
}

main().catch((err) => {
  console.error('Fatal MCP Server error:', err);
  process.exit(1);
});
