export interface Template {
  name: string;
  description: string;
  url: string;
  version: string;
}

export const availableTemplates: Template[] = [
  {
    name: 'better-auth-mongodb',
    description: 'Backend template with Better Auth and MongoDB',
    url: 'https://github.com/example/better-auth-mongodb-template.git',
    version: '1.0.0'
  },
  {
    name: 'express-prisma-postgres',
    description: 'Express.js with Prisma ORM and PostgreSQL',
    url: 'https://github.com/example/express-prisma-postgres-template.git',
    version: '1.0.0'
  },
  {
    name: 'fastify-typeorm-mysql',
    description: 'Fastify with TypeORM and MySQL',
    url: 'https://github.com/example/fastify-typeorm-mysql-template.git',
    version: '1.0.0'
  }
];