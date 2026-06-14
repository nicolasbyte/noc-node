import { EmailService } from "../../../presentation/email/email-service";
import { LogEntity } from "../../entities/log.entity";
import { LogSeverityLevel } from "../../enum/logSeverityLevel";
import { LogRepository } from "../../repository/log.repository";

interface SendLogEmailUseCase {
    execute: (to: string | string[]) => Promise<boolean>
}
const origin = "email-service.ts";
export class SendEmailLogs implements SendLogEmailUseCase {

    constructor(
        private readonly emailService: EmailService,
        private readonly logRepository: LogRepository
    ) {

    }

    async execute(to: string | string[]) {
        try {
            const sent = await this.emailService.sendEmailWithFileSystemLogs(to);
            if (!sent) {
                throw new Error("Email log not sent");
            }
            const log = new LogEntity({
                level: LogSeverityLevel.LOW,
                message: "Email sent",
                origin
            })
            this.logRepository.saveLog(log)
            return true
        } catch (error) {
            const log = new LogEntity({
                level: LogSeverityLevel.HIGH,
                message: "Email not sent",
                origin
            })
            this.logRepository.saveLog(log)
            return false
        }
    }
}