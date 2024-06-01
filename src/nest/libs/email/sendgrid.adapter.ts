import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import SendGrid from "@sendgrid/mail";
import fs from "fs/promises";
import Handlebars from "handlebars";
import { join } from "path";

import { EnvironmentVariables } from "../config/env.type";

import { EmailService } from "./email.service";

@Injectable()
export class SendGridAdapter extends EmailService {
  constructor(private config: ConfigService<EnvironmentVariables>) {
    super();
    SendGrid.setApiKey(this.config.getOrThrow("SENDGRID_API_KEY"));
  }

  public async sendEmailConfirmationCode(
    email: string,
    code: string
  ): Promise<void> {
    const content = await fs.readFile(
      join(__dirname, "./templates/code.handlebars")
    );
    const template = Handlebars.compile(content.toString());
    const html = template({ code });

    await SendGrid.send({
      subject: "Memudei - Confirmation Code",
      from: {
        name: "Memudei",
        email: "contato@memudei.me",
      },
      to: email,
      html,
    });
  }

  public async sendWelcome(email: string, name: string): Promise<void> {
    const content = await fs.readFile(
      join(__dirname, "./templates/welcome.handlebars")
    );
    const template = Handlebars.compile(content.toString());
    const html = template({ name });

    await SendGrid.send({
      subject: "Memudei - Confirmation Code",
      from: {
        name: "Memudei",
        email: "contato@memudei.me",
      },
      to: email,
      html,
    });
  }
}
