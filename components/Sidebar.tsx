
import React from 'react';
import { AppTab } from '../types';

interface SidebarProps {
  activeTab: AppTab;
  onTabChange: (tab: AppTab) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, onTabChange }) => {
  return (
    <aside className="w-64 bg-slate-900 text-slate-400 flex flex-col h-screen shrink-0">
      <div className="p-6">
        <div className="flex items-center gap-3 text-white">
          <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center font-bold text-xl">E</div>
          <span className="text-2xl font-bold tracking-tight">Editall</span>
        </div>
      </div>

      <nav className="flex-1 px-4 py-4 space-y-1">
        <NavItem 
          active={activeTab === 'budget'} 
          label="Orçamentos" 
          icon={<IconChart />} 
          onClick={() => onTabChange('budget')} 
        />
        <NavItem 
          active={activeTab === 'documents'} 
          label="Documentos" 
          icon={<IconFile />} 
          onClick={() => onTabChange('documents')} 
        />
        <NavItem 
          active={activeTab === 'saved'} 
          label="Editais Salvos" 
          icon={<IconBookmark />} 
          onClick={() => onTabChange('saved')} 
        />
        <NavItem 
          active={activeTab === 'partners'} 
          label="Parceiros" 
          icon={<IconUsers />} 
          onClick={() => onTabChange('partners')} 
        />
        <NavItem 
          active={activeTab === 'settings'} 
          label="Configurações" 
          icon={<IconSettings />} 
          onClick={() => onTabChange('settings')} 
        />
      </nav>

      <div className="p-6 mt-auto border-t border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center text-xs font-medium text-white">MA</div>
          <div className="flex flex-col">
            <span className="text-sm font-medium text-white leading-none">Mario Andrade</span>
            <span className="text-xs text-slate-500 mt-1">Gestor de Projetos</span>
          </div>
        </div>
      </div>
    </aside>
  );
};

const NavItem = ({ label, icon, active = false, onClick }: { label: string, icon: React.ReactNode, active?: boolean, onClick: () => void }) => (
  <button 
    onClick={onClick}
    className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-all ${active ? 'bg-blue-600 text-white' : 'hover:bg-slate-800 hover:text-slate-200 text-slate-400'}`}
  >
    {icon}
    <span className="text-sm font-medium">{label}</span>
  </button>
);

const IconChart = () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z"/></svg>;
const IconFile = () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>;
const IconBookmark = () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"/></svg>;
const IconUsers = () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"/></svg>;
const IconSettings = () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/></svg>;

export default Sidebar;
