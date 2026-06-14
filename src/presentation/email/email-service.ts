import nodemailer from 'nodemailer';
import { envs } from '../../config/plugins/envs.plugins';
import { LogRepository } from '../../domain/repository/log.repository';
import { LogEntity } from '../../domain/entities/log.entity';
import { LogSeverityLevel } from '../../domain/enum/logSeverityLevel';

interface SendMailOptions {
    to: string | string[];
    subject: string;
    htmlBody: string;
    attachments?: Attachement[]

}

interface Attachement {
    filename: string;
    path: string;
}

export class EmailService {
    private transporter = nodemailer.createTransport({
        service: envs.MAILER_SERVICE,
        auth: {
            user: envs.MAILER_EMAIL,
            pass: envs.MAILER_SECRET_KEY
        }
    })

    constructor() {

    }

    async sendEmail(options: SendMailOptions): Promise<boolean> {
        const { to, subject, htmlBody, attachments = [] } = options;

        try {
            await this.transporter.sendMail({
                to,
                subject,
                html: htmlBody,
                attachments: attachments
            })



            return true;
        } catch (error) {

            return false;
        }
    }

    sendEmailWithFileSystemLogs(to: string | string[]): Promise<boolean> {

        const subject = 'Logs del servidor';
        const htmlBody = `<h3>Logs del sistema - NOC</h3>
      <p>Hola mundo</p>`;
        const attachments: Attachement[] = [
            { filename: 'logs-all.log', path: './logs/all-logs.log' },
            { filename: 'logs-high.log', path: './logs/high-logs.log' },
            { filename: 'logs-low.log', path: './logs/low-logs.log' },
        ]

        return this.sendEmail({
            to,
            subject,
            htmlBody,
            attachments
        })

    }

}