import { Mastra } from '@mastra/core/mastra';
import { createLogger } from '@mastra/core/logger';
import { weatherWorkflow } from './workflows';
import { weatherAgent, mcpAgent } from './agents';
// import { mcpAgent } from './agents/mcp';

export const mastra = new Mastra({
  workflows: { weatherWorkflow },
  agents: { weatherAgent, mcpAgent },
  logger: createLogger({
    name: 'Mastra',
    level: 'info',
  }),
});
