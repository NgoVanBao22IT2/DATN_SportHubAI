import { Request, Response, NextFunction, ErrorRequestHandler } from 'express';
import { AppError } from '../errors/AppError';
import logger from '../utils/logger';

export const errorHandler: ErrorRequestHandler = (
  err: Error | AppError,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  let statusCode = 500;
  let errorCode = 'INTERNAL_SERVER_ERROR';
  let message = 'Đã có lỗi hệ thống xảy ra. Vui lòng thử lại sau.';
  let details: any = null;

  // Nếu là lỗi nghiệp vụ được định nghĩa có chủ ý (Operational Error)
  if (err instanceof AppError) {
    statusCode = err.statusCode;
    errorCode = err.errorCode;
    message = err.message;
    details = err.details;
  } else {
    // Nếu là lỗi lập trình chưa xử lý (Bug, DB Crash, Syntax Error...)
    logger.error('Lỗi chưa bắt được (Unhandled Error):', err);
  }

  // Cấu trúc phản hồi lỗi chuẩn Enterprise
  const errorResponse = {
    error: {
      code: errorCode,
      message,
      ...(details && { details }),
      ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
    },
  };

  res.status(statusCode).json(errorResponse);
};
export default errorHandler;
