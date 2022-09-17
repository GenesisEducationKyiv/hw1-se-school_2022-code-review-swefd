import * as fs from "fs";
import config from "../config/config";
import { ISubscribersRepository } from "./interfaces/ISubscribersRepository";
import { ISubscriberModel, SubscriberModel } from "../models/subscriber.model";

class SubscribersRepository implements ISubscribersRepository {
  dbPath: string;

  constructor(dbPath: string) {
    this.dbPath = dbPath;
  }

  append(subscriber: ISubscriberModel) {
    return fs.promises.appendFile(
      process.cwd() + this.dbPath,
      "\n" + subscriber.email,
      { encoding: "utf8" }
    );
  }

  async includesEmail(email: string) {
    const emails = this.getAllEmails();
    return emails.includes(email);
  }

  getAllSubscribers() {
    const strEmails: string[] = fs
      .readFileSync(process.cwd() + this.dbPath, "utf-8")
      .split("\n");
    let subscribers: ISubscriberModel[] = [];

    strEmails.forEach((email) => {
      subscribers.push(new SubscriberModel(email));
    });

    return subscribers;
  }

  getAllEmails() {
    return fs.readFileSync(process.cwd() + this.dbPath, "utf-8").split("\n");
  }
}

export default new SubscribersRepository(config.db.path);
