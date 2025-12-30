
import { BudgetItem, Category } from '../types';

interface BudgetTableProps {
  items: BudgetItem[];
  onUpdate: (id: string, updates: Partial<BudgetItem>) => void;
  onDelete: (id: string) => void;
}

const formatCurrency = (val: number) => {
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(val);
};

const BudgetTable: React.FC<BudgetTableProps> = ({ items, onUpdate, onDelete }) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <thead className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider">
          <tr>
            <th className="px-6 py-4 font-semibold">Descrição do Item</th>
            <th className="px-6 py-4 font-semibold">Categoria</th>
            <th className="px-6 py-4 font-semibold">Quant.</th>
            <th className="px-6 py-4 font-semibold">V. Unitário</th>
            <th className="px-6 py-4 font-semibold">V. Total</th>
            <th className="px-6 py-4 font-semibold text-center">Ações</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {items.map((item) => (
            <tr key={item.id} className="hover:bg-slate-50 transition-colors group">
              <td className="px-6 py-4">
                <input
                  type="text"
                  value={item.name}
                  onChange={(e) => onUpdate(item.id, { name: e.target.value })}
                  className="w-full bg-transparent border-none focus:ring-0 text-slate-700 font-medium outline-none border-b border-transparent hover:border-slate-300 focus:border-blue-500"
                />
              </td>
              <td className="px-6 py-4">
                <span className={`text-[10px] px-2 py-1 rounded-md font-bold uppercase ${getCategoryStyle(item.category)}`}>
                  {item.category}
                </span>
              </td>
              <td className="px-6 py-4">
                <input
                  type="number"
                  value={item.quantity}
                  onChange={(e) => onUpdate(item.id, { quantity: Number(e.target.value) })}
                  className="w-16 bg-transparent border-none focus:ring-0 text-slate-600 outline-none border-b border-transparent hover:border-slate-300 focus:border-blue-500"
                />
              </td>
              <td className="px-6 py-4">
                <div className="flex items-center text-slate-600">
                  <span className="text-slate-400 mr-1 text-sm">R$</span>
                  <input
                    type="number"
                    value={item.unitPrice}
                    onChange={(e) => onUpdate(item.id, { unitPrice: Number(e.target.value) })}
                    className="w-24 bg-transparent border-none focus:ring-0 outline-none border-b border-transparent hover:border-slate-300 focus:border-blue-500"
                  />
                </div>
              </td>
              <td className="px-6 py-4 text-slate-900 font-semibold">
                {formatCurrency(item.total)}
              </td>
              <td className="px-6 py-4 text-center">
                <button 
                  onClick={() => onDelete(item.id)}
                  className="text-slate-300 hover:text-red-500 transition-colors p-1"
                >
                  <IconTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const getCategoryStyle = (cat: Category) => {
  switch (cat) {
    case 'RH': return 'bg-purple-100 text-purple-700';
    case 'Equipamentos': return 'bg-amber-100 text-amber-700';
    case 'Logística': return 'bg-blue-100 text-blue-700';
    case 'Serviços': return 'bg-cyan-100 text-cyan-700';
    default: return 'bg-slate-100 text-slate-600';
  }
};

const IconTrash = () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>;

export default BudgetTable;
