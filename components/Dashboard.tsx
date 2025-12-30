
import React from 'react';
import { BudgetStats } from '../types.ts';

const formatCurrency = (val: number) => {
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(val);
};

interface DashboardProps {
  stats: BudgetStats;
}

const Dashboard: React.FC<DashboardProps> = ({ stats }) => {
  const isOverLimit = stats.totalBudget > stats.totalLimit;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Total Card */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm relative overflow-hidden">
        <div className="flex flex-col">
          <span className="text-sm font-medium text-slate-500">Total do Projeto</span>
          <span className={`text-2xl font-bold mt-1 ${isOverLimit ? 'text-red-600' : 'text-slate-900'}`}>
            {formatCurrency(stats.totalBudget)}
          </span>
        </div>
        <div className="mt-4 flex items-center gap-2">
          <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${isOverLimit ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
            {isOverLimit ? 'Excedido' : 'Dentro do Teto'}
          </span>
          <span className="text-xs text-slate-400">Teto: {formatCurrency(stats.totalLimit)}</span>
        </div>
        <div className="absolute right-[-10px] bottom-[-10px] opacity-5">
           <svg className="w-24 h-24" fill="currentColor" viewBox="0 0 20 20"><path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z"/><path fillRule="evenodd" d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" clipRule="evenodd"/></svg>
        </div>
      </div>

      {/* Progress Bar Card */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm col-span-1 md:col-span-2">
        <div className="flex justify-between mb-4">
          <span className="text-sm font-medium text-slate-500">Execução Orçamentária</span>
          <span className={`text-sm font-bold ${isOverLimit ? 'text-red-600' : 'text-blue-600'}`}>
            {stats.percentageUsed.toFixed(1)}%
          </span>
        </div>
        <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden">
          <div 
            className={`h-full transition-all duration-500 ${isOverLimit ? 'bg-red-500' : 'bg-blue-600'}`} 
            style={{ width: `${Math.min(stats.percentageUsed, 100)}%` }}
          />
        </div>
        <div className="flex justify-between mt-4 text-xs text-slate-400 uppercase tracking-wider font-semibold">
          <span>Início</span>
          <span>50%</span>
          <span>Teto do Edital</span>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
