
import React, { useState } from 'react';
import { SavedEdital } from '../types';

const INITIAL_EDITALS: SavedEdital[] = [
  {
    id: '1',
    title: 'Edital 024/2024 - Projetos de Inclusão Digital',
    organization: 'Secretaria de Inovação',
    deadline: '25/08/2024',
    budgetLimit: 500000,
    status: 'Em Análise',
    matchScore: 94
  },
  {
    id: '2',
    title: 'Chamada Pública: Apoio à Agricultura Familiar',
    organization: 'Ministério do Desenvolvimento',
    deadline: '10/09/2024',
    budgetLimit: 1200000,
    status: 'Aberto',
    matchScore: 78
  },
  {
    id: '3',
    title: 'Fundo Municipal de Cultura - Circulação 2024',
    organization: 'Prefeitura Municipal',
    deadline: '05/08/2024',
    budgetLimit: 85000,
    status: 'Finalizado',
    matchScore: 82
  },
  {
    id: '4',
    title: 'Inovação para o Terceiro Setor - ESG',
    organization: 'Instituto Filantropia Tech',
    deadline: '30/10/2024',
    budgetLimit: 250000,
    status: 'Aberto',
    matchScore: 88
  }
];

const SavedEditalsView: React.FC = () => {
  const [editals] = useState<SavedEdital[]>(INITIAL_EDITALS);
  const [searchTerm, setSearchTerm] = useState('');

  const filtered = editals.filter(e => 
    e.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    e.organization.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Filters and Search */}
      <div className="flex flex-col md:flex-row gap-4 justify-between items-center bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
        <div className="relative w-full md:max-w-md">
          <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
          </span>
          <input 
            type="text" 
            placeholder="Buscar por título ou organização..." 
            className="pl-10 pr-4 py-2 w-full border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-2 w-full md:w-auto">
          <select className="px-4 py-2 border border-slate-200 rounded-lg text-sm bg-white focus:outline-none">
            <option>Todos os Status</option>
            <option>Aberto</option>
            <option>Em Análise</option>
            <option>Finalizado</option>
          </select>
          <button className="px-4 py-2 bg-blue-600 text-white text-sm font-semibold rounded-lg hover:bg-blue-700 transition-colors whitespace-nowrap">
            Novo Edital
          </button>
        </div>
      </div>

      {/* Grid de Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filtered.map(edital => (
          <EditalCard key={edital.id} edital={edital} />
        ))}
      </div>
    </div>
  );
};

const EditalCard = ({ edital }: { edital: SavedEdital }) => {
  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(val);
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow flex flex-col overflow-hidden">
      <div className="p-5 flex-1">
        <div className="flex justify-between items-start mb-4">
          <span className={`text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider ${getStatusColor(edital.status)}`}>
            {edital.status}
          </span>
          <div className="flex flex-col items-end">
            <span className="text-[10px] text-slate-400 font-bold uppercase">Match Score</span>
            <span className="text-sm font-bold text-blue-600">{edital.matchScore}%</span>
          </div>
        </div>
        
        <h3 className="text-lg font-bold text-slate-900 leading-tight mb-2 line-clamp-2" title={edital.title}>
          {edital.title}
        </h3>
        <p className="text-sm text-slate-500 mb-4">{edital.organization}</p>
        
        <div className="space-y-3 pt-4 border-t border-slate-100">
          <div className="flex items-center gap-2 text-sm">
            <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
            <span className="text-slate-600">Prazo: <span className="font-semibold">{edital.deadline}</span></span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
            <span className="text-slate-600">Teto: <span className="font-semibold">{formatCurrency(edital.budgetLimit)}</span></span>
          </div>
        </div>
      </div>
      
      <div className="p-4 bg-slate-50 border-t border-slate-100 flex gap-2">
        <button className="flex-1 px-3 py-2 text-xs font-bold text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-100 transition-colors uppercase">
          Ver Edital
        </button>
        <button className="flex-1 px-3 py-2 text-xs font-bold text-white bg-slate-900 rounded-lg hover:bg-slate-800 transition-colors uppercase">
          Gerir Orçamento
        </button>
      </div>
    </div>
  );
};

const getStatusColor = (status: string) => {
  switch (status) {
    case 'Aberto': return 'bg-green-100 text-green-700';
    case 'Em Análise': return 'bg-blue-100 text-blue-700';
    case 'Finalizado': return 'bg-slate-100 text-slate-500';
    default: return 'bg-slate-100 text-slate-600';
  }
};

export default SavedEditalsView;
