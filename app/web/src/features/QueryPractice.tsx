import React, { useState } from 'react';
import { Play, RotateCcw, Database, CheckCircle, XCircle, Info } from 'lucide-react';
import {createSandbox, runSandboxQuery, deleteSandbox} from "../services/SandboxService.ts";
import DatabaseSchemaViewer from "../components/DatabaseSchemaViewer.tsx";
import {getErrorMessage, getResultRows} from "../services/OracleResponseService.ts";

const QueryPractice: React.FC = () => {
  const [query, setQuery] = useState('SELECT * FROM students LIMIT 5;');
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isSandboxReady, setIsSandboxReady] = useState(false);
    const [isSandboxLoading, setIsSandboxLoading] = useState(false);

  const handleExecuteQuery = async () => {
      if (!isSandboxReady) {
        setError('Sandbox is not ready. Please create a sandbox first.');
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
        setError(e?.message || 'Error executing query');
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
      setError(e?.message || 'Failed to create sandbox');
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
      setError(e?.message || 'Failed to delete sandbox');
    } finally {
      setIsSandboxLoading(false);
    }
  };

  const handleReset = () => {
    setQuery('SELECT * FROM students LIMIT 5;');
    setResult(null);
    setError(null);
  };
  
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-white mb-2">SQL Query Practice</h1>
        <p className="text-gray-400">
          Practice your SQL skills with our sample database. Execute queries and see results in real-time.
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
          <div className="bg-gray-800 rounded-xl shadow-lg border border-gray-700">
            <div className="p-4 border-b border-gray-700">
              <h2 className="font-semibold text-white">SQL Query Editor</h2>
            </div>
            <div className="p-4">
              <textarea
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full h-32 p-3 bg-gray-900 border border-gray-600 rounded-lg font-mono text-sm text-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                placeholder="Enter your SQL query here..."
              />
              
              <div className="flex justify-between items-center mt-4">
                <div className="flex items-center space-x-3">
                  <div className="flex items-center space-x-2 text-sm text-gray-400">
                    <Info className="h-4 w-4" />
                    <span>Use standard SQL syntax</span>
                  </div>

                  {/* Sandbox controls */}
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={handleCreateSandbox}
                      disabled={isSandboxReady || isSandboxLoading}
                      className="flex items-center space-x-2 px-3 py-2 bg-gradient-to-r from-green-600 to-emerald-500 text-white rounded-lg hover:from-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      <Database className="h-4 w-4" />
                      <span className="text-sm">{isSandboxLoading && !isSandboxReady ? 'Creating...' : 'Create Sandbox'}</span>
                    </button>

                    <button
                      onClick={handleDeleteSandbox}
                      disabled={!isSandboxReady || isSandboxLoading}
                      className="flex items-center space-x-2 px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      <XCircle className="h-4 w-4" />
                      <span className="text-sm">{isSandboxLoading && !isSandboxReady ? 'Deleting...' : 'Delete Sandbox'}</span>
                    </button>
                  </div>
                </div>

                <div className="flex space-x-2">
                  <button
                    onClick={handleReset}
                    className="flex items-center space-x-2 px-3 py-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition-colors"
                  >
                    <RotateCcw className="h-4 w-4" />
                    <span>Reset</span>
                  </button>

                  <button
                    onClick={handleExecuteQuery}
                    disabled={isLoading || !query.trim() || !isSandboxReady}
                    className="flex items-center space-x-2 bg-gradient-to-r from-purple-600 to-cyan-600 text-white px-4 py-2 rounded-lg hover:from-purple-700 hover:to-cyan-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-lg hover:shadow-purple-500/25"
                  >
                    <Play className="h-4 w-4" />
                    <span>{isLoading ? 'Executing...' : 'Execute'}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Results */}
          <div className="bg-gray-800 rounded-xl shadow-lg border border-gray-700">
            <div className="p-4 border-b border-gray-700">
              <h2 className="font-semibold text-white flex items-center">
                Results
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
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600 mx-auto"></div>
                  <p className="text-gray-400 mt-2">Executing query...</p>
                </div>
              )}

              {error && (
                <div className="bg-red-900/30 border border-red-500/30 rounded-lg p-4">
                  <div className="flex items-center space-x-2 text-red-400">
                    <XCircle className="h-5 w-5" />
                    <span className="font-medium">Query Error</span>
                  </div>
                  <p className="text-red-300 mt-1 font-mono text-sm">{error}</p>
                </div>
              )}

              {result && !error && (
                <div>
                  <div className="mb-3 text-sm text-gray-400">
                    {result.length} row{result.length !== 1 ? 's' : ''} returned
                  </div>
                  
                  {result.length > 0 ? (
                    <div className="overflow-x-auto">
                      <table className="min-w-full border border-gray-600 rounded-lg">
                        <thead className="bg-gray-700">
                          <tr>
                            {Object.keys(result[0]).map(column => (
                              <th key={column} className="px-4 py-2 text-left text-xs font-medium text-gray-300 uppercase border-b border-gray-600">
                                {column}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {result.map((row: any, index: number) => (
                            <tr key={index} className={index % 2 === 0 ? 'bg-gray-800' : 'bg-gray-750'}>
                              {Object.values(row).map((value: any, cellIndex: number) => (
                                <td key={cellIndex} className="px-4 py-2 text-sm text-gray-300 border-b border-gray-600">
                                  {value === null ? <span className="text-gray-500 italic">NULL</span> : String(value)}
                                </td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <p className="text-gray-400 italic">No results returned</p>
                  )}
                </div>
              )}

              {!result && !error && !isLoading && (
                <div className="text-center py-8 text-gray-400">
                  <Database className="h-12 w-12 mx-auto mb-3 opacity-50" />
                  <p>Execute a query to see results here</p>
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