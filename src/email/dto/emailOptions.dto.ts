export class EmailOptionsDto {
  to: string;
  from: string;
  subject: string;
  text: string;

  constructor(to: string, from: string, subject: string, text: string) {
    this.to = to;
    this.from = from;
    this.subject = subject;
    this.text = text;
  }
}
