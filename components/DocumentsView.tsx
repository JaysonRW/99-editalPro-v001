
import { useState } from 'react';
import { AppDocument } from '../types';

const INITIAL_DOCS: AppDocument[] = [
  { id: '1', name: 'Contrato Social.pdf', type: 'PDF', size: '2.4 MB', updatedAt: '12/05/2024', status: 'Aprovado', mandatory: true },
  { id: '2', name: 'Certidão Negativa de Débitos.pdf', type: 'PDF', size: '1.1 MB', updatedAt: '14/05/2024', status: 'Aprovado', mandatory: true },
  { id: '3', name: 'Plano de Trabalho 2024.docx', type: 'DOCX', size: '450 KB', updatedAt: '15/05/2024', status: 'Pendente', mandatory: true },
  { id: '4', name: 'Relatório de Atividades Anterior.pdf', type: 'PDF', size: '8.2 MB', updatedAt: '10/05/2024', status: 'Aprovado', mandatory: false },
  { id: '5', name: 'Estatuto da Organização.pdf', type: 'PDF', size: '3.1 MB', updatedAt: '-', status: 'Obrigatório', mandatory: true },
];

const DocumentsView: React.FC = () => {
  const [docs] = useState<AppDocument[]>(INITIAL_DOCS);
  const [filter, setFilter] = useState('');

  const filteredDocs = docs.filter(d => d.name.toLowerCase().includes(filter.toLowerCase()));
  const mandatoryCount = docs.filter(d => d.mandatory).length;
  const approvedMandatoryCount = docs.filter(d => d.mandatory && d.status === 'Aprovado').length;
  const completionPercent = (approvedMandatoryCount / mandatoryCount) * 100;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatCard label="Total de Arquivos" value={docs.length.toString()} icon={<IconFolder />} />
        <StatCard label="Aguardando Análise" value={docs.filter(d => d.status === 'Pendente').length.toString()} icon={<IconClock />} />
        <StatCard label="Aprovados" value={docs.filter(d => d.status === 'Aprovado').length.toString()} icon={<IconCheck />} color="text-green-600" />
        <StatCard label="Pendências Críticas" value={docs.filter(d => d.mandatory && (d.status === 'Obrigatório' || d.status === 'Rejeitado')).length.toString()} icon={<IconAlert />} color="text-red-600" />
      </div>

      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h3 className="text-lg font-bold text-slate-800">Checklist do Edital</h3>
            <p className="text-sm text-slate-500">Documentos obrigatórios aprovados vs. total necessário</p>
          </div>
          <span className="text-2xl font-bold text-blue-600">{completionPercent.toFixed(0)}%</span>
        </div>
        <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden">
          <div 
            className="bg-blue-600 h-full transition-all duration-700" 
            style={{ width: `${completionPercent}%` }}
          />
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ label, value, icon, color = "text-slate-900" }: { label: string, value: string, icon: React.ReactNode, color?: string }) => (
  <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4">
    <div className="p-3 bg-slate-50 rounded-lg text-slate-400">
      {icon}
    </div>
    <div className="flex flex-col">
      <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">{label}</span>
      <span className={`text-xl font-bold ${color}`}>{value}</span>
    </div>
  </div>
);

const IconFolder = () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"/></svg>;
const IconClock = () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>;
const IconCheck = () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/></svg>;
const IconAlert = () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>;

export default DocumentsView;
