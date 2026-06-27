export class AppError extends Error {
  public readonly statusCode: number;
  public readonly errorCode: string;
  public readonly isOperational: boolean;
  public readonly details: any;

  constructor(
    statusCode: number,
    errorCode: string,
    message: string,
    isOperational = true,
    details: any = null
  ) {
    super(message);
    Object.setPrototypeOf(this, new.target.prototype);

    this.statusCode = statusCode;
    this.errorCode = errorCode;
    this.isOperational = isOperational;
    this.details = details;

    Error.captureStackTrace(this, this.constructor);
  }
}

// 400 Bad Request
export class BadRequestError extends AppError {
  constructor(message = 'Dữ liệu đầu vào không hợp lệ', errorCode = 'BAD_REQUEST', details: any = null) {
    super(400, errorCode, message, true, details);
  }
}

// 401 Unauthorized
export class UnauthorizedError extends AppError {
  constructor(message = 'Không có quyền truy cập, vui lòng đăng nhập', errorCode = 'UNAUTHORIZED') {
    super(401, errorCode, message, true);
  }
}

// 403 Forbidden
export class ForbiddenError extends AppError {
  constructor(message = 'Bạn không có quyền thực hiện hành động này', errorCode = 'FORBIDDEN') {
    super(403, errorCode, message, true);
  }
}

// 404 Not Found
export class NotFoundError extends AppError {
  constructor(message = 'Không tìm thấy tài nguyên yêu cầu', errorCode = 'NOT_FOUND') {
    super(404, errorCode, message, true);
  }
}

// 409 Conflict
export class ConflictError extends AppError {
  constructor(message = 'Xung đột dữ liệu xảy ra', errorCode = 'CONFLICT') {
    super(409, errorCode, message, true);
  }
}
