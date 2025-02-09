export const sendResponse = (res: any, statusCode: number, message: string, data: any = null) => {
    return res.status(statusCode).json({
      status: statusCode >= 200 && statusCode < 300, // true for success, false for errors
      message,
      data,
    });
  };