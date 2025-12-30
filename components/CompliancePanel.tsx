
import React from 'react';
import { BudgetStats, ComplianceRule, Category } from '../types.ts';

interface CompliancePanelProps {
  stats: BudgetStats;
  rules: ComplianceRule[];
}

const formatCurrency = (val: number) => {
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(val);
};

const CompliancePanel: React.FC<CompliancePanelProps> = ({ stats, rules }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
      <div className="p-6 border-b border-slate-100 bg-slate-50/50 flex items-center gap-2">
         <svg className="w-5 h-5 text-slate-700" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>
         <h2 className="text-lg font-semibold text-slate-800">Painel de Compliance</h2>
      </div>
      
      <div className="p-6 space-y-5">
        <p className="text-sm text-slate-500">Regras automáticas baseadas nas diretrizes do edital vigente.</p>
        
        {rules.map((rule) => {
          const catValue = stats.categoryTotals[rule.category as Category] || 0;
          const percentageOfTotal = (catValue / stats.totalBudget) * 100 || 0;
          const isInvalid = percentageOfTotal > rule.maxPercentage;

          return (
            <div key={rule.id} className={`p-4 rounded-lg border transition-all ${isInvalid ? 'bg-red-50 border-red-200 ring-2 ring-red-100' : 'bg-slate-50 border-slate-200'}`}>
              <div className="flex justify-between items-start mb-2">
                <span className={`text-xs font-bold uppercase px-2 py-0.5 rounded ${isInvalid ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
                  {rule.category}
                </span>
                {isInvalid && (
                  <span className="text-red-600">
                    <IconAlert />
                  </span>
                )}
              </div>
              <h3 className="text-sm font-semibold text-slate-800">{rule.label}</h3>
              <div className="mt-3 space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-500">Utilizado</span>
                  <span className={`font-medium ${isInvalid ? 'text-red-600' : 'text-slate-700'}`}>
                    {percentageOfTotal.toFixed(1)}% ({formatCurrency(catValue)})
                  </span>
                </div>
                <div className="w-full bg-slate-200 h-1.5 rounded-full mt-1">
                  <div 
                    className={`h-full rounded-full ${isInvalid ? 'bg-red-500' : 'bg-green-500'}`}
                    style={{ width: `${Math.min(percentageOfTotal, 100)}%` }}
                  />
                </div>
              </div>
              {isInvalid && (
                <p className="text-[10px] text-red-600 font-bold mt-2 uppercase tracking-wide">
                  Erro: Excedeu limite de {rule.maxPercentage}%
                </p>
              )}
            </div>
          );
        })}

        <div className="mt-8 p-4 bg-slate-900 rounded-lg text-white">
          <h4 className="text-xs font-bold text-slate-400 uppercase mb-3">Resumo da Verificação</h4>
          <div className="space-y-3">
            <SummaryItem label="Regras Ativas" value="03" />
            <SummaryItem label="Alertas Críticos" value={rules.filter(r => (stats.categoryTotals[r.category as Category] / stats.totalBudget * 100) > r.maxPercentage).length.toString()} color="text-red-400" />
            <SummaryItem label="Status Final" value={stats.totalBudget > stats.totalLimit ? "IRREGULAR" : "REGULAR"} color={stats.totalBudget > stats.totalLimit ? "text-red-400" : "text-green-400"} />
          </div>
        </div>
      </div>
    </div>
  );
};

const SummaryItem = ({ label, value, color = "text-white" }: { label: string, value: string, color?: string }) => (
  <div className="flex justify-between items-center text-xs">
    <span className="text-slate-500">{label}</span>
    <span className={`font-bold ${color}`}>{value}</span>
  </div>
);

const IconAlert = () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>;

export default CompliancePanel;
