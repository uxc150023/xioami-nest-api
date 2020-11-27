import { HttpException, HttpStatus } from '@nestjs/common';

export class StatusException extends HttpException {
  constructor(data, status: HttpStatus) {
    super(data, status);
  }
}

export class Helper {
  static title = '我是群居title';
  static substring = (str: string, start: number, end: number) => {
    if (end) {
      return str.substring(start, end);
    } else {
      return str.substring(start);
    }
  };
}
