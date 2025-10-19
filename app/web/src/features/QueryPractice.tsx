import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Play, RotateCcw, Database, CheckCircle, Circle as XCircle, Info } from 'lucide-react';
import {createSandbox, runSandboxQuery, deleteSandbox} from "../services/SandboxService.ts";
import DatabaseSchemaViewer from "../components/DatabaseSchemaViewer.tsx";
import {getErrorMessage, getResultRows} from "../services/OracleResponseService.ts";

const QueryPractice: React.FC = () => {
  const { t } = useTranslation();
  const [query, setQuery] = useState('SELECT * FROM students WHERE ROWNUM <= 5;');
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isSandboxReady, setIsSandboxReady] = useState(false);
    const [isSandboxLoading, setIsSandboxLoading] = useState(false);

  const handleExecuteQuery = async () => {
      if (!isSandboxReady) {
        setError(t('queryPractice.sandboxNotReady'));
        return;
      }

      setIsLoading(true);
      setError(null);
      setResult(null);

      try {
        const res = await runSandboxQuery(query);

        setResult(getResultRows(res));
        setError(getErrorMessage(res));
      } catch (e: any) {
        setError(e?.message || t('errors.queryExecutionError'));
      } finally {
        setIsLoading(false);
      }
  };

  const handleCreateSandbox = async () => {
    setIsSandboxLoading(true);
    setError(null);

    try {
      await createSandbox();
      setIsSandboxReady(true);
    } catch (e: any) {
      setError(e?.message || t('errors.failedToCreateSandbox'));
    } finally {
      setIsSandboxLoading(false);
    }
  };

  const handleDeleteSandbox = async () => {
    setIsSandboxLoading(true);
    setError(null);

    try {
      await deleteSandbox();
      setIsSandboxReady(false);
      setResult(null);
    } catch (e: any) {
      setError(e?.message || t('errors.failedToDeleteSandbox'));
    } finally {
      setIsSandboxLoading(false);
    }
  };

  const handleReset = () => {
    setQuery('SELECT * FROM estudiantes WHERE ROWNUM <= 5;');
    setResult(null);
    setError(null);
  };
  
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{t('queryPractice.title')}</h1>
        <p className="text-gray-600 dark:text-gray-400">
          {t('queryPractice.subtitle')}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Database Schema */}
        <div className="lg:col-span-1">
            <DatabaseSchemaViewer onSelectedQuery={setQuery}/>
        </div>

        {/* Query Editor and Results */}
        <div className="lg:col-span-2 space-y-6">
          {/* Query Editor */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
              <h2 className="font-semibold text-gray-900 dark:text-white">{t('queryPractice.sqlQueryEditor')}</h2>
            </div>
            <div className="p-4">
              <textarea
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full h-32 p-3 bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg font-mono text-sm text-gray-900 dark:text-gray-300 focus:ring-2 focus:ring-blue-500 dark:focus:ring-purple-500 focus:border-transparent resize-none"
                placeholder={t('queryPractice.enterSQLQuery')}
              />
              
              <div className="flex flex-col space-y-4 mt-4 sm:flex-row sm:justify-between sm:items-center sm:space-y-0">
                <div className="flex flex-col space-y-3 sm:flex-row sm:items-center sm:space-y-0 sm:space-x-3">
                  <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400 justify-center sm:justify-start">
                    <Info className="h-4 w-4" />
                    <span>{t('queryPractice.useStandardSQL')}</span>
                  </div>

                  {/* Sandbox controls */}
                  <div className="flex flex-col space-y-2 sm:flex-row sm:items-center sm:space-y-0 sm:space-x-2">
                    <button
                      onClick={handleCreateSandbox}
                      disabled={isSandboxReady || isSandboxLoading}
                      className="flex items-center justify-center space-x-2 px-3 py-2 bg-gradient-to-r from-green-600 to-emerald-500 text-white rounded-lg hover:from-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm w-full sm:w-auto"
                    >
                      <Database className="h-4 w-4" />
                      <span className="text-sm">{isSandboxLoading && !isSandboxReady ? t('queryPractice.creating') : t('queryPractice.createSandbox')}</span>
                    </button>

                    <button
                      onClick={handleDeleteSandbox}
                      disabled={!isSandboxReady || isSandboxLoading}
                      className="flex items-center justify-center space-x-2 px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm w-full sm:w-auto"
                    >
                      <XCircle className="h-4 w-4" />
                      <span className="text-sm">{isSandboxLoading && !isSandboxReady ? t('queryPractice.deleting') : t('queryPractice.deleteSandbox')}</span>
                    </button>
                  </div>
                </div>

                <div className="flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-2">
                  <button
                    onClick={handleReset}
                    className="flex items-center justify-center space-x-2 px-3 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors text-sm w-full sm:w-auto"
                  >
                    <RotateCcw className="h-4 w-4" />
                    <span>{t('queryPractice.reset')}</span>
                  </button>

                  <button
                    onClick={handleExecuteQuery}
                    disabled={isLoading || !query.trim() || !isSandboxReady}
                    className="flex items-center justify-center space-x-2 bg-gradient-to-r from-blue-600 to-cyan-600 dark:from-purple-600 dark:to-cyan-600 text-white px-4 py-2 rounded-lg hover:from-blue-700 hover:to-cyan-700 dark:hover:from-purple-700 dark:hover:to-cyan-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-lg hover:shadow-blue-500/25 dark:hover:shadow-purple-500/25 text-sm w-full sm:w-auto"
                  >
                    <Play className="h-4 w-4" />
                    <span>{isLoading ? t('queryPractice.executing') : t('queryPractice.execute')}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Results */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
              <h2 className="font-semibold text-gray-900 dark:text-white flex items-center">
                {t('queryPractice.results')}
                {result && (
                  <CheckCircle className="h-5 w-5 ml-2 text-green-600" />
                )}
                {error && (
                  <XCircle className="h-5 w-5 ml-2 text-red-600" />
                )}
              </h2>
            </div>
            
            <div className="p-4">
              {isLoading && (
                <div className="text-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 dark:border-purple-600 mx-auto"></div>
                  <p className="text-gray-600 dark:text-gray-400 mt-2">{t('queryPractice.executingQuery')}</p>
                </div>
              )}

              {error && (
                <div className="bg-red-900/30 border border-red-500/30 rounded-lg p-4">
                  <div className="flex items-center space-x-2 text-red-400">
                    <XCircle className="h-5 w-5" />
                    <span className="font-medium">{t('queryPractice.queryError')}</span>
                  </div>
                  <p className="text-red-300 mt-1 font-mono text-sm">{error}</p>
                </div>
              )}

              {result && !error && (
                <div>
                  <div className="mb-3 text-sm text-gray-600 dark:text-gray-400">
                    {t('queryPractice.rowsReturned', { count: result.length })}
                  </div>
                  
                  {result.length > 0 ? (
                    <div className="overflow-x-auto">
                      <table className="min-w-full border border-gray-300 dark:border-gray-600 rounded-lg">
                        <thead className="bg-gray-200 dark:bg-gray-700">
                          <tr>
                            {Object.keys(result[0]).map(column => (
                              <th key={column} className="px-4 py-2 text-left text-xs font-medium text-gray-700 dark:text-gray-300 uppercase border-b border-gray-300 dark:border-gray-600">
                                {column}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {result.map((row: any, index: number) => (
                            <tr key={index} className={index % 2 === 0 ? 'bg-white dark:bg-gray-800' : 'bg-gray-50 dark:bg-gray-750'}>
                              {Object.values(row).map((value: any, cellIndex: number) => (
                                <td key={cellIndex} className="px-4 py-2 text-sm text-gray-900 dark:text-gray-300 border-b border-gray-300 dark:border-gray-600">
                                  {value === null ? <span className="text-gray-600 dark:text-gray-500 italic">NULL</span> : String(value)}
                                </td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <p className="text-gray-600 dark:text-gray-400 italic">{t('queryPractice.noResults')}</p>
                  )}
                </div>
              )}

              {!result && !error && !isLoading && (
                <div className="text-center py-8 text-gray-600 dark:text-gray-400">
                  <Database className="h-12 w-12 mx-auto mb-3 opacity-50" />
                  <p>{t('queryPractice.executeQueryToSeeResults')}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QueryPractice;