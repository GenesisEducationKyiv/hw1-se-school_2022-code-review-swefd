import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { SubscribersRepository } from '../../repository/service/repository.service';

@Injectable()
export class EmailService {
  constructor(
    private mailer: MailerService,
    private subscribers: SubscribersRepository,
  ) {}

  async sendToAll() {
    const subscribersEmails = this.subscribers.getAllEmails();
    for (const email of subscribersEmails) {
      await this.mailer.sendMail({
        to: email,
        from: 'App',
        subject: 'Test',
        text: 'BTC UAH',
      });
    }
  }
}
