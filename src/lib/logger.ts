/* Simple structured logger. In production, replace console.* with a transport (e.g., pino, Sentry). */
export type LogLevel = "info" | "warn" | "error"

type LogEntry = {
    level: LogLevel
    code?: string
    message: string
    context?: Record<string, unknown>
}

function emit(entry: LogEntry) {
    const payload = {
        level: entry.level,
        code: entry.code,
        message: entry.message,
        context: entry.context,
        timestamp: new Date().toISOString(),
    }
    console[entry.level === "info" ? "log" : entry.level](JSON.stringify(payload))
}

export const logger = {
    info: (message: string, context?: Record<string, unknown>) => emit({ level: "info", message, context }),
    warn: (message: string, context?: Record<string, unknown>) => emit({ level: "warn", message, context }),
    error: (message: string, code?: string, context?: Record<string, unknown>) =>
        emit({ level: "error", message, code, context }),
}
