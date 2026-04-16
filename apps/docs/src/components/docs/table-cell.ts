type CodeCellValue = string | number | boolean | null | undefined;

export type CodeCell<T extends CodeCellValue = CodeCellValue> = {
  value: T;
  code: true;
};

export function codeCell<T extends CodeCellValue>(value: T): CodeCell<T> {
  return { value, code: true };
}
