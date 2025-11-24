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
  },
  {
    name: 'portfolio-1',
    description: 'Portfolio Template v1',
    url: 'https://github.com/backend-bits/portfolio-1',
    version: 'main'
  },
  {
    name: 'portfolio-2',
    description: 'Portfolio Template v2',
    url: 'https://github.com/backend-bits/portfolio-2',
    version: 'main'
  },
  {
    name: 'auth0-react-router',
    description: 'Auth0 with React Router',
    url: 'https://github.com/backend-bits/react-router-auth0/',
    version: 'main' 
  },
   {
    name: 'ai-resume-analyzer',
    description: 'AI Resume Analyzer',
    url: 'https://github.com/kousthubha-sky/AI-resume-analyzer',
    version: 'main'
   }, 
   {
    name: 'gitrepo-analyzer',
    description: 'Git Repository Analyzer',
    url: 'https://github.com/kousthubha-sky/gitrepo-analyzer',
    version: 'main'
   },
   {
    name: 'better-auth-vue-mongodb-vite', 
    description: 'Better Auth + MongoDB + Vue + Vite',
    url: 'https://github.com/backendbits/better-auth-vue-mongodb-vite',
    version: 'main'
   },
   {
    name: 'better-auth-vue-mongodb',
    description: 'Better Auth + MongoDB + Vue',
    url: 'https://github.com/backendbits/better-auth-vue-mongodb',
    version: 'main'
   },
   {
    name: 'better-auth-vue-mysql',
    description: 'Better Auth + MySQL + Vue',
    url: 'https://github.com/backendbits/better-auth-vue-mysql',
    version: 'main' 
   },
   {
    name: 'auth0-razorpay-fastapi-react-router',
    description: 'Auth0 + Razorpay + FastAPI + React Router',
    url: 'https://github.com/backend-bits/auth0-razorpay-fastapi-react-router',
    version: 'main'
   },
   {
    name: 'next-supabase-shadcn-auth',
    description: 'Next.js + Supabase + Shadcn UI + Auth',
    url: 'https://github.com/guillaumeduhan/next-supabase-shadcn-auth',
    version: 'main' 
   },
   {
    name: 'ecommerce-stripe-payments-fastapi-react',
    description: 'E-commerce + Stripe Payments + FastAPI + React',
    url: '',
    version: 'main'  
   },
   {
    name: 'clerk-supabase',
    description: 'Clerk + Supabase Integration',
    url: 'https://github.com/clerk/clerk-supabase',
    version: 'main' 
   },
   {
    name: 'clerk-nextjs-pages-router',
    description: 'Clerk + Next.js Pages Router',
    url: 'https://github.com/clerk/clerk-nextjs-demo-pages-router',
    version: 'main'  
   }
];