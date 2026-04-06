#!/usr/bin/env bash
set -euo pipefail

usage() {
  cat <<'EOF'
用途：
  生成长任务续接所需的统一上下文包。

用法：
  generate-context-packet.sh --goal TEXT --stage TEXT [options]

必填参数：
  --goal TEXT              当前轮唯一目标
  --stage TEXT             当前阶段

可选参数：
  --change TEXT            当前 change 或规格入口
  --task-source TEXT       当前任务包来源
  --completed TEXT         当前完成情况
  --blocked TEXT           当前阻塞项
  --constraints TEXT       当前保留约束
  --validation TEXT        当前验证目标
  --next-step TEXT         下一步
  -h, --help               显示帮助

说明：
  该脚本生成统一上下文包，用于轮次收口、下一轮续接和快速上下文恢复。
EOF
}

goal=""
stage=""
change_ref=""
task_source=""
completed=""
blocked=""
constraints=""
validation=""
next_step=""

while [[ $# -gt 0 ]]; do
  case "$1" in
    --goal) goal="${2:-}"; shift 2 ;;
    --stage) stage="${2:-}"; shift 2 ;;
    --change) change_ref="${2:-}"; shift 2 ;;
    --task-source) task_source="${2:-}"; shift 2 ;;
    --completed) completed="${2:-}"; shift 2 ;;
    --blocked) blocked="${2:-}"; shift 2 ;;
    --constraints) constraints="${2:-}"; shift 2 ;;
    --validation) validation="${2:-}"; shift 2 ;;
    --next-step) next_step="${2:-}"; shift 2 ;;
    -h|--help) usage; exit 0 ;;
    *) echo "error: unknown argument: $1" >&2; usage >&2; exit 1 ;;
  esac
done

if [[ -z "$goal" || -z "$stage" ]]; then
  echo "error: --goal and --stage are required" >&2
  usage >&2
  exit 1
fi

cat <<EOF
当前轮唯一目标：$goal
当前阶段：$stage
当前 change / 规格入口：${change_ref:-待主代理填写}
当前任务包来源：${task_source:-待主代理填写}
当前完成情况：${completed:-待主代理填写}
当前阻塞项：${blocked:-待主代理填写}
当前保留约束：${constraints:-待主代理填写}
当前验证目标：${validation:-待主代理填写}
下一步：${next_step:-待主代理填写}
EOF
