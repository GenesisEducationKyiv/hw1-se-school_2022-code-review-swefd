import { Module } from "@nestjs/common";
import { EmailService } from "./service/email.service";
import { EmailController } from "./controller/email.controller";
import { Mailer } from "./init/init";
import { RepositoryModule } from "../repository/repository.module";
import { RateProvidersApiModule } from "../rate.providers.api/rate.providers.api.module";

@Module({
  imports: [Mailer, RepositoryModule, RateProvidersApiModule],
  controllers: [EmailController],
  providers: [EmailService],
  exports: [EmailService],
})
export class EmailModule {}
