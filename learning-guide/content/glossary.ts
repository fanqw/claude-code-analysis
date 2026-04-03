import type { GlossaryTerm } from '@/content/types'

export const glossary: GlossaryTerm[] = [
  { term: 'Agent Runtime', definition: '把模型、工具、权限、状态和持久化组织成可持续运行系统的那一层。' },
  { term: 'Tool Use', definition: '模型输出中的结构化工具调用请求。' },
  { term: 'Tool Result', definition: '工具执行后的结果块，会回流到下一轮对话。' },
  { term: 'Prompt Runtime', definition: '分层、分段、可缓存、可覆盖的 prompt 管理体系。' },
  { term: 'Context Budget', definition: '可用于当前回合上下文和输出的 token 预算分配。' },
  { term: 'Compact', definition: '在上下文逼近上限时，对低价值历史进行压缩的机制。' },
  { term: 'Session Transcript', definition: '以事件流方式保存会话与元数据的日志。' },
  { term: 'Sidechain', definition: '为 subagent 或分支会话单独维护的 transcript 链。' },
  { term: 'MCP', definition: '用于接入外部工具和资源的协议与连接机制。' },
  { term: 'Skill', definition: '用于注入专业知识、提示和运行指令的可发现扩展单元。' },
  { term: 'Permission Layer', definition: '对工具调用按风险进行 allow / ask / deny 处理的机制。' },
  { term: 'Sandbox', definition: '为特定工具执行提供资源边界的运行环境约束。' },
]
