import { Parser } from 'message-backup-parser';

export function parse(source: string) {
  const parser = new Parser(source);
  const data = parser.parse();
  const fileinfo = parser.getFileInfo();

  return { data, fileinfo };
}
