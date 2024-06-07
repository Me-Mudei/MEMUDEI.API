import { NotFoundError, UniqueEntityId } from "#shared/domain";
import { PrismaClient } from "#shared/infra";

import {
  Rule,
  RuleRepository,
  RuleSearchParams,
  RuleSearchResult,
} from "../../../domain";

export class RulePrismaRepository implements RuleRepository {
  sortableFields: string[] = ["createdAt"];
  constructor(readonly prisma: PrismaClient) {}

  async insert(entity: Rule): Promise<void> {
    await this.prisma.rule.create({
      data: {
        id: entity.id,
        key: entity.key,
        name: entity.name,
        description: entity.description,
        created_at: entity.created_at,
        updated_at: entity.updated_at,
      },
    });
  }

  async findById(id: string | UniqueEntityId): Promise<Rule> {
    const rule = await this.prisma.rule
      .findFirstOrThrow({
        where: { id: id.toString() },
      })
      .catch((_err) => {
        throw new NotFoundError(`Entity Not Found using ID ${id}`);
      });

    return this.toEntity(rule);
  }

  async findManyById(ids: (string | UniqueEntityId)[]): Promise<Rule[]> {
    const rules = await this.prisma.rule.findMany({
      where: {
        id: {
          in: ids.map((id) => id.toString()),
        },
      },
    });
    return rules.map((rule) => this.toEntity(rule));
  }

  async findAll(): Promise<Rule[]> {
    const rules = await this.prisma.rule.findMany();
    return rules.map((rule) => this.toEntity(rule));
  }

  async update(entity: Rule): Promise<void> {
    await this.prisma.rule.update({
      where: { id: entity.id },
      data: {
        key: entity.key,
        name: entity.name,
        description: entity.description,
      },
    });
  }

  async delete(id: string | UniqueEntityId): Promise<void> {
    await this.prisma.rule.delete({
      where: { id: id.toString() },
    });
  }

  async search(props: RuleSearchParams): Promise<RuleSearchResult> {
    const offset = (props.page - 1) * props.per_page;
    const limit = props.per_page;

    const rules = await this.prisma.rule.findMany({
      take: limit,
      skip: offset,
      orderBy: {
        ...(props.sort && this.sortableFields.includes(props.sort)
          ? { [props.sort]: props.sort_dir }
          : { created_at: "asc" }),
      },
    });
    return new RuleSearchResult({
      items: rules.map((rule) => this.toEntity(rule)),
      current_page: props.page,
      per_page: props.per_page,
      total: rules.length,
      filter: props.filter,
      sort: props.sort,
      sort_dir: props.sort_dir,
    });
  }

  private toEntity(entity: any): Rule {
    return new Rule({
      id: new UniqueEntityId(entity.id),
      key: entity.key,
      name: entity.name,
      description: entity.description,
      created_at: entity.created_at,
      updated_at: entity.updated_at,
    });
  }
}
