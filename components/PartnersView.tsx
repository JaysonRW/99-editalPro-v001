
import React, { useState } from 'react';
import { Partner, PartnerCategory } from '../types.ts';

const INITIAL_PARTNERS: Partner[] = [
  {
    id: '1',
    name: 'TechFlow Soluções LTDA',
    category: 'Tecnologia',
    expertise: ['Desenvolvimento', 'Cloud', 'Segurança'],
    collaborationCount: 12,
    trustScore: 98,
    status: 'Ativo',
    email: 'contato@techflow.com'
  },
  {
    id: '2',
    name: 'Instituto Global de Sustentabilidade',
    category: 'ONG',
    expertise: ['Meio Ambiente', 'Educação'],
    collaborationCount: 5,
    trustScore: 92,
    status: 'Ativo',
    email: 'parcerias@igs.org.br'
  },
  {
    id: '3',
    name: 'Logix Express Cargo',
    category: 'Fornecedor',
    expertise: ['Transporte', 'Armazenagem'],
    collaborationCount: 24,
    trustScore: 85,
    status: 'Ativo',
    email: 'ops@logix.com'
  },
  {
    id: '4',
    name: 'Ana Silva Consultoria Estratégica',
    category: 'Consultoria',
    expertise: ['RH', 'Gestão de Projetos'],
    collaborationCount: 8,
    trustScore: 95,
    status: 'Pendente',
    email: 'ana.consultoria@email.com'
  },
  {
    id: '5',
    name: 'BioData Analytics',
    category: 'Tecnologia',
    expertise: ['Big Data', 'IA'],
    collaborationCount: 3,
    trustScore: 88,
    status: 'Ativo',
    email: 'info@biodata.ai'
  }
];

const PartnersView: React.FC = () => {
  const [partners] = useState<Partner[]>(INITIAL_PARTNERS);
  const [filter, setFilter] = useState('');

  const filtered = partners.filter(p => 
    p.name.toLowerCase().includes(filter.toLowerCase()) ||
    p.expertise.some(e => e.toLowerCase().includes(filter.toLowerCase()))
  );

  return (
    <div className="space-y-6">
      {/* Stats Header */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <p className="text-sm font-medium text-slate-500">Parceiros Ativos</p>
          <p className="text-3xl font-bold text-slate-900 mt-1">{partners.filter(p => p.status === 'Ativo').length}</p>
        </div>
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <p className="text-sm font-medium text-slate-500">Projetos Compartilhados</p>
          <p className="text-3xl font-bold text-blue-600 mt-1">42</p>
        </div>
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <p className="text-sm font-medium text-slate-500">Média de Trust Score</p>
          <p className="text-3xl font-bold text-green-600 mt-1">91.6%</p>
        </div>
      </div>

      {/* Search and Action Bar */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
        <div className="relative w-full md:max-w-md">
          <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
          </span>
          <input 
            type="text" 
            placeholder="Buscar por nome ou expertise..." 
            className="pl-10 pr-4 py-2 w-full border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          />
        </div>
        <button className="w-full md:w-auto px-6 py-2 bg-slate-900 text-white rounded-lg font-bold hover:bg-slate-800 transition-colors">
          Convidar Parceiro
        </button>
      </div>

      {/* Partners Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filtered.map(partner => (
          <PartnerCard key={partner.id} partner={partner} />
        ))}
      </div>
    </div>
  );
};

const PartnerCard = ({ partner }: { partner: Partner }) => (
  <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col sm:flex-row">
    <div className="p-6 flex-1">
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-slate-100 rounded-lg flex items-center justify-center font-bold text-slate-400 text-xl uppercase">
            {partner.name.substring(0, 2)}
          </div>
          <div>
            <h3 className="font-bold text-slate-900 text-lg">{partner.name}</h3>
            <span className="text-xs font-semibold text-blue-600 uppercase tracking-wider">{partner.category}</span>
          </div>
        </div>
        <div className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase ${partner.status === 'Ativo' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>
          {partner.status}
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        {partner.expertise.map((exp, idx) => (
          <span key={idx} className="bg-slate-50 text-slate-600 text-[10px] font-bold px-2 py-1 rounded border border-slate-100 uppercase">
            {exp}
          </span>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-50">
        <div>
          <p className="text-[10px] text-slate-400 font-bold uppercase">Colaborações</p>
          <p className="text-sm font-bold text-slate-700">{partner.collaborationCount} Projetos</p>
        </div>
        <div>
          <p className="text-[10px] text-slate-400 font-bold uppercase">Trust Score</p>
          <div className="flex items-center gap-1">
             <p className="text-sm font-bold text-green-600">{partner.trustScore}%</p>
             <div className="flex text-amber-400">
               <svg className="w-3 h-3 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
             </div>
          </div>
        </div>
      </div>
    </div>
    
    <div className="bg-slate-50 p-4 w-full sm:w-32 flex flex-row sm:flex-col justify-center gap-2 border-t sm:border-t-0 sm:border-l border-slate-200">
       <button className="flex-1 p-2 bg-white border border-slate-200 rounded-lg text-slate-500 hover:text-blue-600 hover:border-blue-200 transition-all flex items-center justify-center" title="Enviar Mensagem">
         <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"/></svg>
       </button>
       <button className="flex-1 p-2 bg-white border border-slate-200 rounded-lg text-slate-500 hover:text-slate-900 hover:border-slate-300 transition-all flex items-center justify-center" title="Ver Perfil Completo">
         <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/></svg>
       </button>
       <button className="flex-1 p-2 bg-white border border-slate-200 rounded-lg text-slate-500 hover:text-red-600 hover:border-red-200 transition-all flex items-center justify-center" title="Remover Parceiro">
         <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7a4 4 0 11-8 0 4 4 0 018 0zM9 14a6 6 0 00-6 6v1h12v-1a6 6 0 00-6-6zM21 12h-6"/></svg>
       </button>
    </div>
  </div>
);

export default PartnersView;
