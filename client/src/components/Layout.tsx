import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { t } = useTranslation();
  return (
    <div className="min-h-screen flex flex-col">
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200 shadow-sm no-print transition-all duration-300">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 h-20">
          <div className="flex items-center justify-between h-full">
            <Link to="https://pixtolearn.com" className="flex items-center gap-3 group cursor-pointer">
              <div className="relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-primary-500 to-primary-400 rounded-full blur opacity-25 group-hover:opacity-50 transition duration-200"></div>
                <img
                  src="/pixtolearn-logo.png"
                  alt="PixToLearn Logo"
                  className="relative h-10 w-auto transform group-hover:scale-105 transition duration-200"
                />
              </div>
            </Link>
            <div className="text-right">
              <p className="text-sm font-medium text-slate-500 uppercase tracking-wider">
                {t('swimmingInstructionManual')}
              </p>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        {children}
      </main>

      <footer className="bg-slate-900 text-slate-300 mt-auto no-print">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-white tracking-tight">PixToLearn Ltd</h3>
              <p className="text-sm leading-relaxed text-slate-400 max-w-xs">
                Visual learning system designed for structured, effective, and safe aquatic instruction.
              </p>
            </div>
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-white tracking-tight">Contact</h3>
              <div className="space-y-2 text-sm text-slate-400">
                <p className="flex items-center gap-2 hover:text-primary-400 transition-colors cursor-pointer">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                  hello@pixtolearn.com
                </p>
                <p className="flex items-center gap-2 hover:text-primary-400 transition-colors cursor-pointer">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"></path></svg>
                  pixtolearn.com
                </p>
              </div>
            </div>
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-white tracking-tight">Safety First</h3>
              <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700/50">
                <p className="text-sm text-slate-300 font-medium">
                  ⚠️ Always use under adult supervision
                </p>
                <p className="text-xs text-slate-500 mt-1">
                  Recommended for ages 3+ years
                </p>
              </div>
            </div>
          </div>
          <div className="border-t border-slate-800 mt-12 pt-8 text-center text-sm text-slate-500">
            <p>&copy; {new Date().getFullYear()} PixToLearn Ltd. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
