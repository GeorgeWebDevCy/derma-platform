export type ErrorCode =
    | "AUTH_UNAUTHORIZED"
    | "AUTH_FORBIDDEN"
    | "USER_NOT_FOUND"
    | "CONSULTATION_NOT_FOUND"
    | "CONSULTATION_INVALID_STATUS"
    | "CONSULTATION_NOT_OWNED"
    | "CONSULTATION_DOCTOR_REQUIRED"
    | "CONSULTATION_SPECIALTY_REQUIRED"
    | "VALIDATION_FAILED"
    | "UNKNOWN"

export const ERROR_MAP: Record<ErrorCode, { message: string; httpStatus: number }> = {
    AUTH_UNAUTHORIZED: { message: "You must be signed in to continue.", httpStatus: 401 },
    AUTH_FORBIDDEN: { message: "You do not have permission to perform this action.", httpStatus: 403 },
    USER_NOT_FOUND: { message: "User record could not be found.", httpStatus: 404 },
    CONSULTATION_NOT_FOUND: { message: "Consultation not found.", httpStatus: 404 },
    CONSULTATION_INVALID_STATUS: { message: "Consultation is in an invalid state for this action.", httpStatus: 400 },
    CONSULTATION_NOT_OWNED: { message: "This consultation is not assigned to you.", httpStatus: 403 },
    CONSULTATION_DOCTOR_REQUIRED: { message: "Only doctors can perform this action.", httpStatus: 403 },
    CONSULTATION_SPECIALTY_REQUIRED: { message: "Set your specialty before going online.", httpStatus: 400 },
    VALIDATION_FAILED: { message: "The submitted data is invalid.", httpStatus: 400 },
    UNKNOWN: { message: "An unexpected error occurred.", httpStatus: 500 },
}

export class CodedError extends Error {
    code: ErrorCode
    status: number

    constructor(code: ErrorCode, details?: string) {
        const meta = ERROR_MAP[code] ?? ERROR_MAP.UNKNOWN
        super(details ? `${meta.message} (${details})` : meta.message)
        this.code = code
        this.status = meta.httpStatus
    }
}
