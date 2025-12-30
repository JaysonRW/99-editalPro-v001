
import { useState } from 'react';
import { SavedEdital } from '../types';

const INITIAL_EDITALS: SavedEdital[] = [
  { id: '1', title: 'Edital 024/2024 - Projetos de Inclusão Digital', organization: 'Secretaria de Inovação', deadline: '25/08/2024', budgetLimit: 500000, status: 'Em Análise', matchScore: 94 },
  { id: '2', title: 'Chamada Pública: Apoio à Agricultura Familiar', organization: 'Ministério do Desenvolvimento', deadline: '10/09/2024', budgetLimit: 1200000, status: 'Aberto', matchScore: 78 },
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
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filtered.map(edital => (
          <div key={edital.id} className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
            <h3 className="text-lg font-bold text-slate-900 mb-2">{edital.title}</h3>
            <p className="text-sm text-slate-500">{edital.organization}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SavedEditalsView;
