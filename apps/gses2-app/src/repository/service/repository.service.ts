import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import { SubscriberDTO } from '../dto/subscriber.dto';
import { ISubscribersRepository } from '../interface/ISubscribersRepository';
import { CustomerDto } from '../../../../customer-app/src/repository/dto/customer.dto';

@Injectable()
export class SubscribersRepository implements ISubscribersRepository {
  dbPath: string;

  constructor(dbPath) {
    this.dbPath = dbPath;
  }

  append(subscriber: SubscriberDTO) {
    return fs.promises.appendFile(
      process.cwd() + this.dbPath,
      '\n' + subscriber.email,
      { encoding: 'utf8' },
    );
  }

  delete(customer: CustomerDto) {
    const allEmails = this.getAllEmails();
    const customerIndex = allEmails.indexOf(customer.email);
    if (!customerIndex) {
      return false;
    }

    allEmails.slice(customerIndex, 1);

    let result = '';

    allEmails.forEach((email) => {
      result += email + '\n';
    });

    fs.writeFileSync(process.cwd() + this.dbPath, result);
    return true;
  }

  async includesEmail(email: string) {
    const emails = this.getAllEmails();
    return emails.includes(email);
  }

  getAllSubscribers() {
    const strEmails: string[] = fs
      .readFileSync(process.cwd() + this.dbPath, 'utf-8')
      .split('\n');
    const subscribers: SubscriberDTO[] = [];

    strEmails.forEach((email) => {
      subscribers.push(new SubscriberDTO(email));
    });

    return subscribers;
  }

  getAllEmails() {
    return fs.readFileSync(process.cwd() + this.dbPath, 'utf-8').split('\n');
  }
}
