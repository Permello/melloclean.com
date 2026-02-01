import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import { companyConfig } from '~/core/config/config';
import { Link } from 'react-router';
import { Heading } from '~/components/ui/heading';
import { Text } from '~/components/ui/text';

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children, title, subtitle }) => {
  return (
    <div className='flex min-h-screen items-center justify-center bg-slate-50 p-4'>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className='w-full max-w-md'
      >
        <div className='rounded-2xl bg-white p-8 shadow-xl'>
          <div className='mb-8 flex flex-col items-center'>
            <Link to='/' className='mb-4 flex items-center gap-2'>
              <div className='flex h-10 w-10 items-center justify-center rounded-full bg-emerald-600'>
                <Sparkles className='h-5 w-5 text-white' />
              </div>
              <span className='text-xl font-bold text-slate-900'>{companyConfig.Name}</span>
            </Link>
            <Heading level={4}>{title}</Heading>
            {subtitle && <Text className='mt-1 text-center'>{subtitle}</Text>}
          </div>
          {children}
        </div>
      </motion.div>
    </div>
  );
};

export { AuthLayout };
