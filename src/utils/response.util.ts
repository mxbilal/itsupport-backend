export class ResponseUtil {
  static success(message: string, data: any = null) {
    return { succeeded: true, message, data, error: null };
  }

  static error(message: string, error: any = null) {
    return { succeeded: false, message, data: null, error };
  }
}
