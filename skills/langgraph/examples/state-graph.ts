import { StateGraph, MessagesAnnotation, END, START, MemorySaver } from '@langchain/langgraph';
import { ChatOpenAI } from '@langchain/openai';

const model = new ChatOpenAI({ model: 'gpt-4o', temperature: 0 });

async function callModel(state: typeof MessagesAnnotation.State) {
  const response = await model.invoke(state.messages);
  return { messages: [response] };
}

function shouldContinue(state: typeof MessagesAnnotation.State) {
  const lastMessage = state.messages[state.messages.length - 1];
  if ('tool_calls' in lastMessage && Array.isArray(lastMessage.tool_calls) && lastMessage.tool_calls.length > 0) {
    return 'tools';
  }
  return END;
}

const workflow = new StateGraph(MessagesAnnotation)
  .addNode('agent', callModel)
  .addEdge(START, 'agent')
  .addConditionalEdges('agent', shouldContinue, {
    tools: 'agent',
    [END]: END,
  });

export const app = workflow.compile({ checkpointer: new MemorySaver() });
