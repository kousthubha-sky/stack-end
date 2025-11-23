export interface Template {
  name: string;
  description: string;
  url: string;
  version: string;
}

export const availableTemplates: Template[] = [
  {
    name: 'better-auth-mongodb',
    description: 'Better Auth + MongoDB',
    url: 'https://github.com/backend-bits/better-auth-mongodb',
    version: 'main'
  },
  {
    name: 'portfolio-3',
    description: 'Portfolio Template',
    url: 'https://github.com/backend-bits/portfolio-3',
    version: 'main'
  }
];