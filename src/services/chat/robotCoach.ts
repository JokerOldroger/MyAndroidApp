export type ChatRole = 'user' | 'assistant';

export type ChatMessage = {
  id: string;
  role: ChatRole;
  content: string;
};

type LlmResponse = {
  reply: string;
  mode: 'proxy' | 'openai-compatible' | 'demo';
};

const systemPrompt = [
  'You are Dingdong Coach, a friendly AI tutor for children and young teens aged 7 to 15.',
  'Help users learn robotics competitions with simple explanations, encouraging tone, and safe advice.',
  'Use short paragraphs, fun examples, and practical steps.',
  'Topics include Dingdong robot building, sensors, programming logic, teamwork, strategy, and competition rules.',
  'If a question is unsafe or unrelated, redirect gently back to learning robotics.',
].join(' ');

function trimMessages(messages: ChatMessage[]) {
  return messages.slice(-8).map(({ role, content }) => ({ role, content }));
}

function makeId(prefix: string) {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

function buildDemoReply(prompt: string) {
  const text = prompt.toLowerCase();

  if (text.includes('sensor') || text.includes('传感器')) {
    return [
      '传感器就像叮咚的眼睛和耳朵。',
      '在比赛里，常见的有颜色传感器、距离传感器和触碰传感器。',
      '一个简单练习是：先让叮咚前进，再在检测到障碍物时停下，这样你就能看到传感器是怎么帮助叮咚“观察”世界的。',
    ].join('\n\n');
  }

  if (text.includes('program') || text.includes('code') || text.includes('编程')) {
    return [
      '给叮咚编程时可以先想三个问题：什么时候开始？要做什么？什么时候停止？',
      '比赛里很好用的结构是“前进 -> 检测 -> 判断 -> 调整”。',
      '如果你愿意，可以先从一个超短流程开始：让叮咚前进 2 秒，转弯，停下，再慢慢加上传感器判断。',
    ].join('\n\n');
  }

  if (text.includes('team') || text.includes('合作') || text.includes('队友')) {
    return [
      '一个强队不只是叮咚跑得快，还要分工清楚。',
      '可以试试这三个角色：搭建员负责结构，程序员负责逻辑，记录员负责测试结果。',
      '每次练习后只改 1 到 2 个地方，团队会更容易知道什么真的变好了。',
    ].join('\n\n');
  }

  if (text.includes('rank') || text.includes('score') || text.includes('排名') || text.includes('得分')) {
    return [
      '想提升排名，先不要急着追求最快。',
      '更稳的方法是先让叮咚拿稳定分，再挑战高分动作。',
      '你可以把任务分成“必得分”“进阶分”“挑战分”三层，这样比赛时更容易保持冷静。',
    ].join('\n\n');
  }

  return [
    '这是一个很棒的问题。',
    '叮咚比赛通常可以从三个方向来学：机械结构、程序逻辑、现场策略。',
    '你可以先告诉我你最想学哪一个，比如“怎么让叮咚走直线”或者“怎样准备比赛任务”，我会一步一步陪你学。',
  ].join('\n\n');
}

async function fetchFromProxy(messages: ChatMessage[]): Promise<LlmResponse | null> {
  const proxyUrl = process.env.EXPO_PUBLIC_LLM_PROXY_URL;

  if (!proxyUrl) {
    return null;
  }

  const response = await fetch(proxyUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      systemPrompt,
      messages: trimMessages(messages),
    }),
  });

  if (!response.ok) {
    throw new Error(`Proxy request failed with ${response.status}`);
  }

  const data = (await response.json()) as { reply?: string };

  if (!data.reply) {
    throw new Error('Proxy response did not include a reply.');
  }

  return {
    reply: data.reply,
    mode: 'proxy',
  };
}

async function fetchFromOpenAiCompatible(messages: ChatMessage[]): Promise<LlmResponse | null> {
  const baseUrl = process.env.EXPO_PUBLIC_OPENAI_BASE_URL;
  const apiKey = process.env.EXPO_PUBLIC_OPENAI_API_KEY;
  const model = process.env.EXPO_PUBLIC_OPENAI_MODEL;

  if (!baseUrl || !apiKey || !model) {
    return null;
  }

  const response = await fetch(`${baseUrl.replace(/\/$/, '')}/chat/completions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model,
      temperature: 0.6,
      messages: [
        { role: 'system', content: systemPrompt },
        ...trimMessages(messages),
      ],
    }),
  });

  if (!response.ok) {
    throw new Error(`OpenAI-compatible request failed with ${response.status}`);
  }

  const data = (await response.json()) as {
    choices?: Array<{ message?: { content?: string } }>;
  };
  const reply = data.choices?.[0]?.message?.content?.trim();

  if (!reply) {
    throw new Error('OpenAI-compatible response was empty.');
  }

  return {
    reply,
    mode: 'openai-compatible',
  };
}

export async function getRobotCoachReply(messages: ChatMessage[]): Promise<LlmResponse> {
  try {
    const proxyResult = await fetchFromProxy(messages);
    if (proxyResult) {
      return proxyResult;
    }

    const openAiResult = await fetchFromOpenAiCompatible(messages);
    if (openAiResult) {
      return openAiResult;
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return {
      reply: [
        '我刚刚没有顺利连上在线叮咚教练，所以先用本地训练模式继续陪你学习。',
        `小提示：${message}`,
        buildDemoReply(messages[messages.length - 1]?.content ?? ''),
      ].join('\n\n'),
      mode: 'demo',
    };
  }

  return {
    reply: buildDemoReply(messages[messages.length - 1]?.content ?? ''),
    mode: 'demo',
  };
}

export function makeAssistantMessage(content: string): ChatMessage {
  return {
    id: makeId('assistant'),
    role: 'assistant',
    content,
  };
}

export function makeUserMessage(content: string): ChatMessage {
  return {
    id: makeId('user'),
    role: 'user',
    content,
  };
}
