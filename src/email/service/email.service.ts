import { Inject, Injectable } from "@nestjs/common";
import { ISendMailOptions, MailerService } from "@nestjs-modules/mailer";
import { SubscribersRepository } from "../../repository/service/repository.service";
import {
  CURRENCY_PROVIDER,
  ICurrencyProvider,
} from "../../rate.providers.api/providers/interfaces";
import { Currency } from "../../utils/enums/currency/currency.enum";
import { CurrencyPairDto } from "../../rate.providers.api/dto";

@Injectable()
export class EmailService {
  constructor(
    private mailer: MailerService,
    private subscribers: SubscribersRepository,
    @Inject(CURRENCY_PROVIDER) private provider: ICurrencyProvider
  ) {}

  async sendToAll(mailOptions: ISendMailOptions) {
    const subscribersEmails = this.subscribers.getAllEmails();
    for (const email of subscribersEmails) {
      mailOptions.to = email;
      await this.mailer.sendMail(mailOptions);
    }
  }

  async sendRateToAll(
    currencyPair: CurrencyPairDto = new CurrencyPairDto(
      Currency.BTC,
      Currency.UAH
    )
  ) {
    const rateResponse = await this.provider.getRate(currencyPair);
    const emailText = `1 ${rateResponse.sourceCurrency} = ${rateResponse.rate} ${rateResponse.targetCurrency}`;

    const mailOptions: ISendMailOptions = {
      from: "GSES CURRENCY APP",
      subject: "Currency rate",
      text: emailText,
    };

    return this.sendToAll(mailOptions);
  }
}
