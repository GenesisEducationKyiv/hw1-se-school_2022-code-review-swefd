import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import { SubscriberDTO } from '../dto/subscriber.dto';
import { ISubscribersRepository } from '../interface/ISubscribersRepository';

@Injectable()
export class SubscribersRepository implements ISubscribersRepository {
  dbPath: string;

  constructor() {
    this.dbPath = '/src/repository/local/db.txt';
  }

  append(subscriber: SubscriberDTO) {
    return fs.promises.appendFile(
      process.cwd() + this.dbPath,
      '\n' + subscriber.email,
      { encoding: 'utf8' },
    );
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
