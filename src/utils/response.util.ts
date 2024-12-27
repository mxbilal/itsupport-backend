export class ResponseUtil {
  static success(
    message: string,
    data: any = null,
    extraData: Record<string, any> = {},
  ) {
    return { succeeded: true, message, data, error: null, ...extraData };
  }

  static error(message: string, error: any = null) {
    return { succeeded: false, message, data: null, error };
  }
}
