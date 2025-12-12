import { Printer, X } from 'lucide-react';
// TODO: Replace with actual logo
const logo = '/logo.png';

interface ReceiptItem {
  nome: string;
  quantidade: number;
  preco: number;
  subtotal: number;
}

interface ReceiptProps {
  isOpen: boolean;
  onClose: () => void;
  items: ReceiptItem[];
  total: number;
  clienteNome: string;
  dataHora: Date;
}

export function Receipt({ isOpen, onClose, items, total, clienteNome, dataHora }: ReceiptProps) {
  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header - não imprime */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 print:hidden">
          <h2 className="text-gray-900 text-xl">Recibo de Venda</h2>
          <div className="flex gap-2">
            <button
              onClick={handlePrint}
              className="px-4 py-2 bg-[#fdba74] text-black rounded-lg hover:bg-[#fca855] transition-colors flex items-center gap-2"
            >
              <Printer className="w-4 h-4" />
              Imprimir
            </button>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>
        </div>

        {/* Conteúdo do recibo - para impressão */}
        <div id="receipt-content" className="p-8">
          {/* Logo e informações da loja */}
          <div className="text-center mb-6">
            <div className="flex justify-center mb-4">
              <img src={logo} alt="Pet Shop Popular" className="w-48 h-auto" />
            </div>
            <div className="text-sm text-gray-600 space-y-1">
              <p>Rua das Flores, 123 - Centro</p>
              <p>São Paulo, SP - CEP: 01234-567</p>
              <p>Tel: (11) 1234-5678</p>
              <p>CNPJ: 12.345.678/0001-99</p>
            </div>
          </div>

          <div className="border-t-2 border-dashed border-gray-300 my-6"></div>

          {/* Informações da venda */}
          <div className="mb-6 text-sm">
            <div className="flex justify-between mb-2">
              <span className="text-gray-600">Data:</span>
              <span className="text-gray-900">{dataHora.toLocaleDateString('pt-BR')}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="text-gray-600">Hora:</span>
              <span className="text-gray-900">{dataHora.toLocaleTimeString('pt-BR')}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Cliente:</span>
              <span className="text-gray-900">{clienteNome || 'Cliente Anônimo'}</span>
            </div>
          </div>

          <div className="border-t-2 border-dashed border-gray-300 my-6"></div>

          {/* Itens da venda */}
          <div className="mb-6">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-300">
                  <th className="text-left py-2 text-gray-600">QTD.</th>
                  <th className="text-left py-2 text-gray-600">Itens</th>
                  <th className="text-right py-2 text-gray-600">Valor</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item, index) => (
                  <tr key={index} className="border-b border-gray-200">
                    <td className="py-3 text-gray-900">{item.quantidade}</td>
                    <td className="py-3 text-gray-900">{item.nome}</td>
                    <td className="text-right py-3 text-gray-900">
                      R$ {item.subtotal.toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="border-t-2 border-dashed border-gray-300 my-6"></div>

          {/* Total */}
          <div className="mb-6">
            <div className="flex justify-between items-center">
              <span className="text-lg text-gray-900">TOTAL:</span>
              <span className="text-2xl text-gray-900">
                R$ {total.toFixed(2)}
              </span>
            </div>
          </div>

          <div className="border-t-2 border-dashed border-gray-300 my-6"></div>

          {/* Rodapé */}
          <div className="text-center text-sm text-gray-600 space-y-2">
            <p>Obrigado pela preferência!</p>
            <p>Volte sempre!</p>
            <p className="text-xs mt-4">Este documento não é um cupom fiscal</p>
          </div>
        </div>
      </div>

      {/* CSS para impressão */}
      <style>{`
        @media print {
          body * {
            visibility: hidden;
          }
          #receipt-content,
          #receipt-content * {
            visibility: visible;
          }
          #receipt-content {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
          }
          .print\\:hidden {
            display: none !important;
          }
        }
      `}</style>
    </div>
  );
}