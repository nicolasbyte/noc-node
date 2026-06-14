import { LogDatasource } from "../../domain/datasources/log.datasource";
import { LogEntity } from "../../domain/entities/log.entity";
import { LogSeverityLevel } from "../../domain/enum/logSeverityLevel";
import { prisma } from "../../lib/prisma";


export class PostgresLogDataSource implements LogDatasource {

    async saveLog(log: LogEntity): Promise<void> {
        await prisma.logModel.create({
            data: log
        });
    }

    async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {

        const logs = await prisma.logModel.findMany({
            where: {
                level: severityLevel
            }
        })

        return logs.map(LogEntity.fromObject);
    }

}