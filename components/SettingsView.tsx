
import React, { useState } from 'react';

const SettingsView: React.FC = () => {
  const [notifications, setNotifications] = useState({
    budgetAlerts: true,
    complianceAlerts: true,
    newEditals: false,
    partnerMessages: true,
  });

  const toggleNotification = (key: keyof typeof notifications) => {
    setNotifications(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="max-w-4xl space-y-8">
      {/* Seção de Perfil */}
      <section className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <h2 className="text-lg font-bold text-slate-800">Perfil do Usuário</h2>
          <button className="text-sm font-semibold text-blue-600 hover:text-blue-700">Editar</button>
        </div>
        <div className="p-6 flex flex-col md:flex-row gap-8 items-start">
          <div className="relative group">
            <div className="w-24 h-24 rounded-full bg-slate-900 flex items-center justify-center text-3xl font-bold text-white border-4 border-slate-50 shadow-inner">
              MA
            </div>
            <button className="absolute bottom-0 right-0 bg-white border border-slate-200 p-1.5 rounded-full shadow-sm text-slate-500 hover:text-blue-600">
              <IconCamera />
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 flex-1 w-full">
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Nome Completo</label>
              <p className="text-slate-900 font-medium">Mario Andrade</p>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase mb-1">E-mail</label>
              <p className="text-slate-900 font-medium">mario.andrade@ongexemplo.org.br</p>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Cargo</label>
              <p className="text-slate-900 font-medium">Gestor de Projetos Sênior</p>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Telefone</label>
              <p className="text-slate-900 font-medium">(11) 98765-4321</p>
            </div>
          </div>
        </div>
      </section>

      {/* Seção da Organização */}
      <section className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <h2 className="text-lg font-bold text-slate-800">Dados da Organização</h2>
          <button className="text-sm font-semibold text-blue-600 hover:text-blue-700">Atualizar</button>
        </div>
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="col-span-1 md:col-span-2">
            <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Razão Social</label>
            <p className="text-slate-900 font-medium">Instituto de Inclusão e Tecnologia Digital do Brasil</p>
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase mb-1">CNPJ</label>
            <p className="text-slate-900 font-medium">12.345.678/0001-90</p>
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Tipo de Entidade</label>
            <p className="text-slate-900 font-medium">OSCIP - Organização da Sociedade Civil de Interesse Público</p>
          </div>
        </div>
      </section>

      {/* Preferências de Notificação */}
      <section className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 bg-slate-50/50">
          <h2 className="text-lg font-bold text-slate-800">Preferências de Notificações</h2>
        </div>
        <div className="p-6 space-y-4">
          <ToggleItem 
            title="Alertas de Orçamento" 
            description="Receber avisos quando o orçamento atingir 80% e 90% do teto." 
            active={notifications.budgetAlerts}
            onToggle={() => toggleNotification('budgetAlerts')}
          />
          <ToggleItem 
            title="Avisos de Compliance" 
            description="Ser notificado imediatamente caso uma rubrica viole as regras do edital." 
            active={notifications.complianceAlerts}
            onToggle={() => toggleNotification('complianceAlerts')}
          />
          <ToggleItem 
            title="Novos Editais" 
            description="Receber sugestões de novos editais com Match Score acima de 80%." 
            active={notifications.newEditals}
            onToggle={() => toggleNotification('newEditals')}
          />
          <ToggleItem 
            title="Mensagens de Parceiros" 
            description="Notificações push quando parceiros enviarem propostas ou mensagens." 
            active={notifications.partnerMessages}
            onToggle={() => toggleNotification('partnerMessages')}
          />
        </div>
      </section>

      {/* Segurança */}
      <section className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 bg-slate-50/50">
          <h2 className="text-lg font-bold text-slate-800">Segurança</h2>
        </div>
        <div className="p-6 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-sm font-semibold text-slate-800">Alterar Senha</h3>
              <p className="text-xs text-slate-500">Recomendamos trocar sua senha a cada 90 dias.</p>
            </div>
            <button className="px-4 py-2 border border-slate-200 rounded-lg text-sm font-bold text-slate-600 hover:bg-slate-50 transition-colors">
              Atualizar Senha
            </button>
          </div>
          <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-sm font-semibold text-slate-800">Autenticação de Dois Fatores (2FA)</h3>
              <p className="text-xs text-slate-500">Adicione uma camada extra de segurança à sua conta.</p>
            </div>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-bold hover:bg-blue-700 transition-colors">
              Ativar 2FA
            </button>
          </div>
        </div>
      </section>
      
      <div className="flex justify-end gap-4 pb-12">
        <button className="px-6 py-2 text-sm font-bold text-slate-400 hover:text-slate-600 transition-colors uppercase">
          Cancelar Alterações
        </button>
        <button className="px-8 py-2 bg-slate-900 text-white rounded-lg font-bold hover:bg-slate-800 transition-shadow shadow-lg shadow-slate-200">
          Salvar Todas as Configurações
        </button>
      </div>
    </div>
  );
};

const ToggleItem = ({ title, description, active, onToggle }: { title: string, description: string, active: boolean, onToggle: () => void }) => (
  <div className="flex items-center justify-between gap-4 p-4 rounded-lg border border-slate-50 hover:bg-slate-50/50 transition-colors">
    <div className="flex-1">
      <h3 className="text-sm font-semibold text-slate-800">{title}</h3>
      <p className="text-xs text-slate-500">{description}</p>
    </div>
    <button 
      onClick={onToggle}
      className={`w-12 h-6 rounded-full transition-colors relative flex items-center px-1 ${active ? 'bg-blue-600' : 'bg-slate-300'}`}
    >
      <div className={`w-4 h-4 bg-white rounded-full transition-transform transform ${active ? 'translate-x-6' : 'translate-x-0'} shadow-sm`} />
    </button>
  </div>
);

const IconCamera = () => <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"/></svg>;

export default SettingsView;
