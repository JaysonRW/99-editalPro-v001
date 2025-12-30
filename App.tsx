
import { useState, useMemo } from 'react';
import { BudgetItem, Category, ComplianceRule, BudgetStats, AppTab } from './types';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import BudgetTable from './components/BudgetTable';
import CompliancePanel from './components/CompliancePanel';
import DocumentsView from './components/DocumentsView';
import SavedEditalsView from './components/SavedEditalsView';
import PartnersView from './components/PartnersView';
import SettingsView from './components/SettingsView';

const BUDGET_LIMIT = 500000;

const COMPLIANCE_RULES: ComplianceRule[] = [
  { id: '1', category: 'RH', maxPercentage: 35, label: 'Limite de Recursos Humanos (35%)' },
  { id: '2', category: 'Equipamentos', maxPercentage: 20, label: 'Limite de Equipamentos (20%)' },
  { id: '3', category: 'Logística', maxPercentage: 15, label: 'Custos Logísticos (15%)' },
];

const INITIAL_ITEMS: BudgetItem[] = [
  { id: '1', name: 'Coordenador de Projeto', category: 'RH', unitPrice: 8500, quantity: 12, total: 102000 },
  { id: '2', name: 'Assistente Social', category: 'RH', unitPrice: 4500, quantity: 12, total: 54000 },
  { id: '3', name: 'Notebooks i7', category: 'Equipamentos', unitPrice: 5500, quantity: 5, total: 27500 },
  { id: '4', name: 'Aluguel de Vans', category: 'Logística', unitPrice: 1200, quantity: 20, total: 24000 },
  { id: '5', name: 'Marketing & Divulgação', category: 'Serviços', unitPrice: 15000, quantity: 1, total: 15000 },
];

export default function App() {
  const [activeTab, setActiveTab] = useState<AppTab>('budget');
  const [items, setItems] = useState<BudgetItem[]>(INITIAL_ITEMS);

  const stats: BudgetStats = useMemo(() => {
    const totalBudget = items.reduce((acc, item) => acc + item.total, 0);
    const categoryTotals: Record<Category, number> = {
      RH: 0,
      Equipamentos: 0,
      Logística: 0,
      Serviços: 0,
      Outros: 0,
    };

    items.forEach(item => {
      categoryTotals[item.category] += item.total;
    });

    return {
      totalBudget,
      totalLimit: BUDGET_LIMIT,
      categoryTotals,
      percentageUsed: (totalBudget / BUDGET_LIMIT) * 100,
    };
  }, [items]);

  const handleUpdateItem = (id: string, updates: Partial<BudgetItem>) => {
    setItems(prev => prev.map(item => {
      if (item.id === id) {
        const newItem = { ...item, ...updates };
        newItem.total = newItem.unitPrice * newItem.quantity;
        return newItem;
      }
      return item;
    }));
  };

  const handleAddItem = (category: Category) => {
    const newItem: BudgetItem = {
      id: Math.random().toString(36).substr(2, 9),
      name: 'Novo Item',
      category,
      unitPrice: 0,
      quantity: 1,
      total: 0
    };
    setItems(prev => [...prev, newItem]);
  };

  const handleDeleteItem = (id: string) => {
    setItems(prev => prev.filter(item => item.id !== id));
  };

  const getPageTitle = () => {
    switch (activeTab) {
      case 'budget': return 'Gestão de Orçamento';
      case 'documents': return 'Gestão de Documentos';
      case 'saved': return 'Editais Monitorados';
      case 'partners': return 'Rede de Parceiros';
      case 'settings': return 'Configurações da Conta';
      default: return 'Editall';
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-50 overflow-hidden">
      <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />

      <main className="flex-1 overflow-y-auto px-8 py-8 h-screen">
        <header className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
              {getPageTitle()}
            </h1>
            <p className="text-slate-500 mt-1">
              {activeTab === 'settings'
                ? 'Gerencie suas preferências, dados da organização e segurança.'
                : activeTab === 'partners' 
                ? 'Conecte-se com especialistas e fornecedores qualificados para seu projeto.'
                : activeTab === 'saved'
                ? 'Centralize e monitore oportunidades relevantes para sua organização.'
                : 'Edital 024/2024 - Projetos de Inclusão Digital'}
            </p>
          </div>
          <div className="flex gap-3">
            <button className="px-4 py-2 border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-100 transition-colors font-medium">
              Exportar
            </button>
            <button className="px-4 py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-colors shadow-sm font-medium">
              {activeTab === 'budget' ? 'Salvar Versão' : 
               activeTab === 'documents' ? 'Upload de Arquivo' : 
               activeTab === 'partners' ? 'Novo Parceiro' : 
               activeTab === 'settings' ? 'Ver Log de Acesso' : 'Explorar Novos'}
            </button>
          </div>
        </header>

        <div className="animate-in fade-in duration-500">
          {activeTab === 'budget' ? (
            <>
              <Dashboard stats={stats} />
              <div className="grid grid-cols-12 gap-8 mt-8">
                <section className="col-span-12 lg:col-span-8">
                  <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                    <div className="p-6 border-b border-slate-100 flex justify-between items-center">
                      <h2 className="text-lg font-semibold text-slate-800">Rubricas Orçamentárias</h2>
                      <div className="flex gap-2">
                        <select 
                          onChange={(e) => handleAddItem(e.target.value as Category)}
                          className="text-sm border border-slate-200 rounded px-3 py-1 bg-slate-50 hover:bg-white cursor-pointer transition-colors outline-none focus:border-blue-500"
                          defaultValue=""
                        >
                          <option value="" disabled>Adicionar Rubrica...</option>
                          <option value="RH">Recursos Humanos</option>
                          <option value="Equipamentos">Equipamentos</option>
                          <option value="Logística">Logística</option>
                          <option value="Serviços">Serviços</option>
                          <option value="Outros">Outros</option>
                        </select>
                      </div>
                    </div>
                    <BudgetTable 
                      items={items} 
                      onUpdate={handleUpdateItem} 
                      onDelete={handleDeleteItem} 
                    />
                  </div>
                </section>
                <aside className="col-span-12 lg:col-span-4 space-y-6">
                  <CompliancePanel stats={stats} rules={COMPLIANCE_RULES} />
                </aside>
              </div>
            </>
          ) : activeTab === 'documents' ? (
            <DocumentsView />
          ) : activeTab === 'saved' ? (
            <SavedEditalsView />
          ) : activeTab === 'partners' ? (
            <PartnersView />
          ) : activeTab === 'settings' ? (
            <SettingsView />
          ) : (
            <div className="flex flex-col items-center justify-center h-96 text-slate-400 border-2 border-dashed border-slate-200 rounded-xl bg-white shadow-sm">
               <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-4 text-slate-300">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/></svg>
               </div>
               <p className="font-medium text-slate-600">Seção em Desenvolvimento</p>
               <p className="text-sm">Esta funcionalidade está no Roadmap para o próximo Sprint.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
