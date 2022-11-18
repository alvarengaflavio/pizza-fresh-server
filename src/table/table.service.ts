import { PrismaService } from '$/prisma/prisma.service';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTableDto } from './dto/create-table.dto';
import { UpdateTableDto } from './dto/update-table.dto';
import { Table } from './entities/table.entity';

@Injectable()
export class TableService {
  constructor(private readonly prisma: PrismaService) {}

  findAll(): Promise<Table[]> {
    return this.prisma.table.findMany();
  }

  async findOne(id: string): Promise<Table> {
    const record = await this.prisma.table.findUnique({ where: { id } });

    if (!record) {
      throw new NotFoundException(`Table with ID '${id}' not found`);
    }

    return record;
  }

  create(dto: CreateTableDto): Promise<Table> {
    const data: Table = { ...dto };

    return this.prisma.table.create({ data });
  }

  update(id: string, dto: UpdateTableDto): Promise<Table> {
    const data: Partial<Table> = { ...dto };

    return this.prisma.table.update({ where: { id }, data });
  }

  async delete(id: string) {
    await this.prisma.table.delete({ where: { id } });
  }
}
