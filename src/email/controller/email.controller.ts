import { Controller, HttpCode, Post, UseFilters } from '@nestjs/common';
import { HttpExceptionFilter } from '../../utils/filters/HttpExceptionFilter';
import { EmailService } from '../service/email.service';

@Controller('sendEmails')
export class EmailController {
  constructor(private emailService: EmailService) {}

  @Post()
  @HttpCode(200)
  @UseFilters(new HttpExceptionFilter())
  async sendEmails() {
    return this.emailService.sendRateToAll().then(() => {
      return { message: "All Emails were sent successfully" };
    });
  }
}
