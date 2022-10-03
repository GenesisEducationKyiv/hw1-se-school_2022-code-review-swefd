import { MailerModule } from '@nestjs-modules/mailer';

export const Mailer = MailerModule.forRoot({
  transport: {
    host: 'smtp.mailtrap.io',
    port: '2525',
    auth: {
      user: '7a37b2c854d917',
      pass: '5e5e09f4d76338',
    },
  },
});
