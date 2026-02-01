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
    <div className='min-h-screen bg-slate-50 flex items-center justify-center p-4'>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className='w-full max-w-md'
      >
        <div className='bg-white rounded-2xl shadow-xl p-8'>
          <div className='flex flex-col items-center mb-8'>
            <Link to='/' className='flex items-center gap-2 mb-4'>
              <div className='flex items-center justify-center w-10 h-10 rounded-full bg-emerald-600'>
                <Sparkles className='h-5 w-5 text-white' />
              </div>
              <span className='text-xl font-bold text-slate-900'>
                {companyConfig.Name}
              </span>
            </Link>
            <Heading level={4}>{title}</Heading>
            {subtitle && (
              <Text className='mt-1 text-center'>{subtitle}</Text>
            )}
          </div>
          {children}
        </div>
      </motion.div>
    </div>
  );
};

export { AuthLayout };
