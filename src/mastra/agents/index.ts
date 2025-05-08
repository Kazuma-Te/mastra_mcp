import { openai } from '@ai-sdk/openai';
import { Agent } from '@mastra/core/agent';
import { weatherTool } from '../tools';
import { MCPConfiguration } from '@mastra/mcp';


export const weatherAgent = new Agent({
  name: 'Weather Agent',
  instructions: `
      You are a helpful weather assistant that provides accurate weather information.

      Your primary function is to help users get weather details for specific locations. When responding:
      - Always ask for a location if none is provided
      - If the location name isn’t in English, please translate it
      - If giving a location with multiple parts (e.g. "New York, NY"), use the most relevant part (e.g. "New York")
      - Include relevant details like humidity, wind conditions, and precipitation
      - Keep responses concise but informative

      Use the weatherTool to fetch current weather data.
`,
  model: openai('gpt-4o'),
  tools: { weatherTool },
});



const mcp = new MCPConfiguration({
  servers: {
      "brave-search": {
      "command": "npx",
      "args": [
          "-y",
          "@modelcontextprotocol/server-brave-search"
      ],
      "env": {
          "BRAVE_API_KEY": "BSAeMDNvY9nF89QDN8voybfDvQKcUco"
      }
  },
  "sequential-thinking": {
      "command": "npx",
      "args": [
        "-y",
        "@modelcontextprotocol/server-sequential-thinking"
      ]
    },
    gmail: {
      url: new URL("https://mcp.composio.dev/gmail/stocky-annoyed-pager-LTS0bK?agent=cursor"),
    },
  },
  

});

export const mcpAgent = new Agent({
  name: "MCP Agent",
  instructions: `
      あなたはウェブ検索とGmailのメールを読むことができるエージェントです。

      ユーザーの入力にて対して、検索ツールを使用して、深く考えるツールを使用して答えを返してください。
      答えを返す際に 1.検索結果 2.深く考えた過程（簡単に説明） 3.結論
      の順番で述べるようにしてください。

  `,
  model: openai("gpt-4o-mini"),
  tools: await mcp.getTools(),
});
