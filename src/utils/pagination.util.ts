export class PaginationUtil {
  static addSerialNumbers<T>(
    data: T[],
    PageNumber: number,
    PageSize: number,
  ): (T & { srNo: number })[] {
    console.log(PageNumber, PageSize);
    return data.map((item, index) => ({
      ...item,
      srNo: (PageNumber - 1) * PageSize + index + 1, // Calculate the serial number
    }));
  }
}
