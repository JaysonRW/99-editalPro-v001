
import React, { useState } from 'react';
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
      {/* Summary Row */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatCard label="Total de Arquivos" value={docs.length.toString()} icon={<IconFolder />} />
        <StatCard label="Aguardando Análise" value={docs.filter(d => d.status === 'Pendente').length.toString()} icon={<IconClock />} />
        <StatCard label="Aprovados" value={docs.filter(d => d.status === 'Aprovado').length.toString()} icon={<IconCheck />} color="text-green-600" />
        <StatCard label="Pendências Críticas" value={docs.filter(d => d.mandatory && (d.status === 'Obrigatório' || d.status === 'Rejeitado')).length.toString()} icon={<IconAlert />} color="text-red-600" />
      </div>

      {/* Checklist Progress */}
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

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        {/* Toolbar */}
        <div className="p-4 border-b border-slate-100 flex flex-col sm:flex-row justify-between gap-4 bg-slate-50/50">
          <div className="relative flex-1 max-w-md">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400">
              <IconSearch />
            </span>
            <input 
              type="text" 
              placeholder="Buscar documento..." 
              className="pl-10 pr-4 py-2 w-full border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 bg-white"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <button className="px-4 py-2 text-sm font-medium border border-slate-200 rounded-lg hover:bg-slate-100 transition-colors">
              Filtrar
            </button>
          </div>
        </div>

        {/* Documents Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider">
              <tr>
                <th className="px-6 py-4 font-semibold">Nome do Arquivo</th>
                <th className="px-6 py-4 font-semibold">Tipo</th>
                <th className="px-6 py-4 font-semibold">Última Modif.</th>
                <th className="px-6 py-4 font-semibold">Tamanho</th>
                <th className="px-6 py-4 font-semibold">Status</th>
                <th className="px-6 py-4 font-semibold text-center">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredDocs.map((doc) => (
                <tr key={doc.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded ${doc.type === 'PDF' ? 'bg-red-50 text-red-600' : 'bg-blue-50 text-blue-600'}`}>
                        <IconFile />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-sm font-semibold text-slate-700">{doc.name}</span>
                        {doc.mandatory && <span className="text-[10px] font-bold text-red-500 uppercase tracking-tighter">Obrigatório</span>}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-500">{doc.type}</td>
                  <td className="px-6 py-4 text-sm text-slate-500">{doc.updatedAt}</td>
                  <td className="px-6 py-4 text-sm text-slate-500">{doc.size}</td>
                  <td className="px-6 py-4">
                    <span className={`text-[10px] font-bold px-2 py-1 rounded-full uppercase ${getStatusColor(doc.status)}`}>
                      {doc.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex justify-center gap-2">
                      <button className="p-1 text-slate-400 hover:text-blue-600 transition-colors">
                        <IconDownload />
                      </button>
                      <button className="p-1 text-slate-400 hover:text-red-500 transition-colors">
                        <IconTrash />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
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

const getStatusColor = (status: string) => {
  switch (status) {
    case 'Aprovado': return 'bg-green-100 text-green-700';
    case 'Pendente': return 'bg-amber-100 text-amber-700';
    case 'Rejeitado': return 'bg-red-100 text-red-700';
    case 'Obrigatório': return 'bg-slate-100 text-slate-500 border border-slate-200';
    default: return 'bg-slate-100 text-slate-600';
  }
};

// Icons
const IconFolder = () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"/></svg>;
const IconClock = () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>;
const IconCheck = () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/></svg>;
const IconAlert = () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>;
const IconSearch = () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>;
const IconFile = () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>;
const IconDownload = () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/></svg>;
const IconTrash = () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>;

export default DocumentsView;
