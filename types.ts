
export type Category = 'RH' | 'Equipamentos' | 'Logística' | 'Serviços' | 'Outros';

export interface BudgetItem {
  id: string;
  name: string;
  category: Category;
  unitPrice: number;
  quantity: number;
  total: number;
}

export interface ComplianceRule {
  id: string;
  category: Category | 'Total';
  maxPercentage: number;
  label: string;
}

export interface BudgetStats {
  totalBudget: number;
  totalLimit: number;
  categoryTotals: Record<Category, number>;
  percentageUsed: number;
}

export type DocumentStatus = 'Aprovado' | 'Pendente' | 'Rejeitado' | 'Obrigatório';

export interface AppDocument {
  id: string;
  name: string;
  type: string;
  size: string;
  updatedAt: string;
  status: DocumentStatus;
  mandatory: boolean;
}

export type EditalStatus = 'Aberto' | 'Em Análise' | 'Finalizado';

export interface SavedEdital {
  id: string;
  title: string;
  organization: string;
  deadline: string;
  budgetLimit: number;
  status: EditalStatus;
  matchScore: number;
}

export type PartnerCategory = 'Consultoria' | 'Fornecedor' | 'ONG' | 'Tecnologia';

export interface Partner {
  id: string;
  name: string;
  category: PartnerCategory;
  expertise: string[];
  collaborationCount: number;
  trustScore: number;
  status: 'Ativo' | 'Pendente';
  email: string;
}

export type AppTab = 'budget' | 'documents' | 'saved' | 'partners' | 'settings';
