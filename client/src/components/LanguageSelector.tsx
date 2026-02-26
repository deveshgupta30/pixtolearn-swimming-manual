import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Language } from '../types';
import { translationApi } from '../services/api';

interface LanguageSelectorProps {
  onSelectLanguage: (languageCode: string) => void;
  selectedLanguage?: string;
}

const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  onSelectLanguage,
  selectedLanguage,
}) => {
  const { t } = useTranslation();
  const [languages, setLanguages] = useState<Language[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchLanguages = async () => {
      try {
        setLoading(true);
        const data = await translationApi.getLanguages();
        setLanguages(data);
        setError(null);
      } catch (err) {
        setError(t('failedToLoadLanguages'));
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchLanguages();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const filteredLanguages = languages.filter(lang =>
    lang.nativeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    lang.languageCode.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const euLanguages = filteredLanguages.filter((lang) => lang.isEUOfficial);
  const otherLanguages = filteredLanguages.filter((lang) => !lang.isEUOfficial);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-primary-200 border-t-primary-600"></div>
          <p className="mt-4 text-slate-600 font-medium animate-pulse">{t('loadingLanguages')}</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="bg-red-50 border border-red-200 rounded-xl p-8 max-w-md text-center shadow-soft">
          <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
          </div>
          <p className="text-red-800 font-medium mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition shadow-sm font-medium"
          >
            {t('retry')}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col px-4 animate-fade-in">

      {/* Main content — grows to fill space, pushing footer down */}
      <div className="flex-1 max-w-5xl mx-auto w-full py-12">

        {/* Logo */}
        <div className="flex justify-center mb-8">
          <a href="https://pixtolearn.com" target="_blank" rel="noopener noreferrer">
            <img src="/pixtolearn-logo.png" alt="PixToLearn" className="h-12 w-auto" />
          </a>
        </div>

        {/* Hero Section */}
        <div className="text-center mb-12 space-y-4">
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
            {t('selectYourLanguage')}
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            {t('selectLanguageDescription')}
          </p>

          {/* Search Bar */}
          <div className="max-w-md mx-auto mt-8 relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-3 border border-slate-200 rounded-xl leading-5 bg-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition shadow-sm"
              placeholder="Search language..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Language Grids */}
        <div className="space-y-12">
          {/* EU Official Languages */}
          {euLanguages.length > 0 && (
            <section>
              <div className="flex items-center gap-4 mb-6">
                <h3 className="text-xl font-bold text-slate-800">{t('euOfficialLanguages')}</h3>
                <div className="h-px bg-slate-200 flex-grow"></div>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {euLanguages.map((lang) => (
                  <button
                    key={lang.languageCode}
                    onClick={() => onSelectLanguage(lang.languageCode)}
                    className={`group relative overflow-hidden p-4 rounded-xl border transition-all duration-200 text-left
                      ${selectedLanguage === lang.languageCode
                        ? 'bg-primary-50 border-primary-500 ring-2 ring-primary-200 shadow-md'
                        : 'bg-white border-slate-200 hover:border-primary-300 hover:shadow-soft-lg hover:-translate-y-1'
                      }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className={`text-xs font-bold uppercase tracking-wider px-2 py-1 rounded-md
                        ${selectedLanguage === lang.languageCode ? 'bg-primary-200 text-primary-800' : 'bg-slate-100 text-slate-600 group-hover:bg-primary-50 group-hover:text-primary-600'}`}>
                        {lang.languageCode}
                      </span>
                      {selectedLanguage === lang.languageCode && (
                        <svg className="w-5 h-5 text-primary-600" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                      )}
                    </div>
                    <span className={`block font-semibold text-lg truncate
                      ${selectedLanguage === lang.languageCode ? 'text-primary-900' : 'text-slate-700 group-hover:text-primary-700'}`}>
                      {lang.nativeName}
                    </span>
                  </button>
                ))}
              </div>
            </section>
          )}

          {/* Other Languages */}
          {otherLanguages.length > 0 && (
            <section>
              <div className="flex items-center gap-4 mb-6">
                <h3 className="text-xl font-bold text-slate-800">Other Languages</h3>
                <div className="h-px bg-slate-200 flex-grow"></div>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {otherLanguages.map((lang) => (
                  <button
                    key={lang.languageCode}
                    onClick={() => onSelectLanguage(lang.languageCode)}
                    className={`group relative overflow-hidden p-4 rounded-xl border transition-all duration-200 text-left
                      ${selectedLanguage === lang.languageCode
                        ? 'bg-primary-50 border-primary-500 ring-2 ring-primary-200 shadow-md'
                        : 'bg-white border-slate-200 hover:border-primary-300 hover:shadow-soft-lg hover:-translate-y-1'
                      }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className={`text-xs font-bold uppercase tracking-wider px-2 py-1 rounded-md
                        ${selectedLanguage === lang.languageCode ? 'bg-primary-200 text-primary-800' : 'bg-slate-100 text-slate-600 group-hover:bg-primary-50 group-hover:text-primary-600'}`}>
                        {lang.languageCode}
                      </span>
                    </div>
                    <span className={`block font-semibold text-lg truncate
                      ${selectedLanguage === lang.languageCode ? 'text-primary-900' : 'text-slate-700 group-hover:text-primary-700'}`}>
                      {lang.nativeName}
                    </span>
                  </button>
                ))}
              </div>
            </section>
          )}

          {filteredLanguages.length === 0 && (
            <div className="text-center py-12">
              <p className="text-slate-500 text-lg">No languages found matching "{searchTerm}"</p>
            </div>
          )}
        </div>
      </div>

      {/* Footer — scrolled to on desktop, directly after buttons on mobile/tablet */}
      <footer className="max-w-5xl mx-auto w-full py-8 border-t border-slate-200 text-center text-sm text-slate-500 space-y-2">
        <p>
          &copy; {new Date().getFullYear()}{' '}
          <a href="https://pixtolearn.com" target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:text-primary-800 font-medium transition">
            PixToLearn
          </a>
          . All rights reserved.
        </p>
        <p>
          <a href="https://pixtolearn.com" target="_blank" rel="noopener noreferrer" className="hover:text-slate-700 transition">
            pixtolearn.com
          </a>
        </p>
      </footer>

    </div>
  );
};

export default LanguageSelector;
