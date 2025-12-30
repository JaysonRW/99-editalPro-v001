
import { useState } from 'react';
import { Partner } from '../types';

const INITIAL_PARTNERS: Partner[] = [
  { id: '1', name: 'TechFlow Soluções LTDA', category: 'Tecnologia', expertise: ['Desenvolvimento'], collaborationCount: 12, trustScore: 98, status: 'Ativo', email: 'contato@techflow.com' },
];

const PartnersView: React.FC = () => {
  const [partners] = useState<Partner[]>(INITIAL_PARTNERS);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {partners.map(partner => (
          <div key={partner.id} className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
            <h3 className="font-bold text-slate-900 text-lg">{partner.name}</h3>
            <span className="text-xs font-semibold text-blue-600 uppercase tracking-wider">{partner.category}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PartnersView;
