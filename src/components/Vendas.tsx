import { useState, useRef } from 'react';
import { Search, Plus, Trash2, ShoppingCart, Barcode } from 'lucide-react';
import { Receipt } from './Receipt';

interface Product {
  id: number;
  nome: string;
  preco: number;
  estoque: number;
  categoria: string;
  codigoBarras?: string;
}

interface CartItem extends Product {
  quantidade: number;
}

const produtos: Product[] = [
  { id: 1, nome: 'Ração Premium Cães 15kg', preco: 189.90, estoque: 45, categoria: 'Ração', codigoBarras: '7891234567890' },
  { id: 2, nome: 'Ração Premium Gatos 10kg', preco: 159.90, estoque: 32, categoria: 'Ração', codigoBarras: '7891234567891' },
  { id: 3, nome: 'Coleira Anti-pulgas', preco: 45.00, estoque: 67, categoria: 'Acessórios', codigoBarras: '7891234567892' },
  { id: 4, nome: 'Brinquedo Mordedor', preco: 29.90, estoque: 89, categoria: 'Brinquedos', codigoBarras: '7891234567893' },
  { id: 5, nome: 'Shampoo Antipulgas 500ml', preco: 34.90, estoque: 54, categoria: 'Higiene', codigoBarras: '7891234567894' },
  { id: 6, nome: 'Cama Pet Grande', preco: 129.00, estoque: 23, categoria: 'Acessórios', codigoBarras: '7891234567895' },
  { id: 7, nome: 'Comedouro Automático', preco: 199.00, estoque: 15, categoria: 'Acessórios', codigoBarras: '7891234567896' },
  { id: 8, nome: 'Vermífugo 4 comprimidos', preco: 42.50, estoque: 78, categoria: 'Medicamentos', codigoBarras: '7891234567897' },
];

export function Vendas() {
  const [searchTerm, setSearchTerm] = useState('');
  const [carrinho, setCarrinho] = useState<CartItem[]>([]);
  const [clienteNome, setClienteNome] = useState('');
  const [codigoBarras, setCodigoBarras] = useState('');
  const [showReceipt, setShowReceipt] = useState(false);
  const [lastSale, setLastSale] = useState<{
    items: any[];
    total: number;
    clienteNome: string;
    dataHora: Date;
  } | null>(null);
  const [showMetodoPagamento, setShowMetodoPagamento] = useState(false);
  const [metodoPagamento, setMetodoPagamento] = useState('');
  const barcodeInputRef = useRef<HTMLInputElement>(null);

  const produtosFiltrados = produtos.filter((produto) =>
    produto.nome.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const adicionarAoCarrinho = (produto: Product) => {
    const itemExistente = carrinho.find((item) => item.id === produto.id);
    
    if (itemExistente) {
      if (itemExistente.quantidade < produto.estoque) {
        setCarrinho(
          carrinho.map((item) =>
            item.id === produto.id
              ? { ...item, quantidade: item.quantidade + 1 }
              : item
          )
        );
      }
    } else {
      setCarrinho([...carrinho, { ...produto, quantidade: 1 }]);
    }
  };

  const removerDoCarrinho = (id: number) => {
    setCarrinho(carrinho.filter((item) => item.id !== id));
  };

  const diminuirQuantidade = (id: number) => {
    const item = carrinho.find((item) => item.id === id);
    if (item && item.quantidade > 1) {
      setCarrinho(
        carrinho.map((item) =>
          item.id === id ? { ...item, quantidade: item.quantidade - 1 } : item
        )
      );
    }
  };

  const aumentarQuantidade = (id: number) => {
    const item = carrinho.find((item) => item.id === id);
    const produto = produtos.find((p) => p.id === id);
    if (item && produto && item.quantidade < produto.estoque) {
      setCarrinho(
        carrinho.map((item) =>
          item.id === id ? { ...item, quantidade: item.quantidade + 1 } : item
        )
      );
    }
  };

  const handleBarcodeSearch = () => {
    if (!codigoBarras.trim()) {
      alert('Digite um código de barras');
      return;
    }

    const produto = produtos.find((p) => p.codigoBarras === codigoBarras.trim());
    
    if (produto) {
      adicionarAoCarrinho(produto);
      setCodigoBarras('');
      alert(`Produto adicionado: ${produto.nome}`);
    } else {
      alert('Produto não encontrado com este código de barras');
    }
  };

  const handleBarcodeKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleBarcodeSearch();
    }
  };

  const total = carrinho.reduce(
    (acc, item) => acc + item.preco * item.quantidade,
    0
  );

  const finalizarVenda = () => {
    if (carrinho.length === 0) {
      alert('Adicione produtos ao carrinho!');
      return;
    }

    // Preparar dados da venda
    const saleData = {
      items: carrinho.map((item) => ({
        nome: item.nome,
        quantidade: item.quantidade,
        preco: item.preco,
        subtotal: item.preco * item.quantidade,
      })),
      total,
      clienteNome,
      dataHora: new Date(),
    };

    setLastSale(saleData);
    setShowReceipt(true);
    
    // Limpar carrinho e cliente
    setCarrinho([]);
    setClienteNome('');
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="mb-6 lg:mb-8">
        <h1 className="text-gray-900 mb-2 text-xl sm:text-2xl">Ponto de Venda (PDV)</h1>
        <p className="text-gray-600 text-sm sm:text-base">Realize vendas e gerencie o carrinho</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6">
        {/* Lista de Produtos */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-6">
            {/* Leitor de Código de Barras */}
            <div className="mb-4 sm:mb-6 p-4 bg-[#fff5eb] border border-[#fdba74] rounded-lg">
              <label className="block text-gray-900 mb-2 flex items-center gap-2">
                <Barcode className="w-5 h-5 text-[#fdba74]" />
                <span>Leitor de Código de Barras</span>
              </label>
              <div className="flex gap-2">
                <input
                  ref={barcodeInputRef}
                  type="text"
                  placeholder="Escaneie ou digite o código de barras..."
                  value={codigoBarras}
                  onChange={(e) => setCodigoBarras(e.target.value)}
                  onKeyPress={handleBarcodeKeyPress}
                  className="flex-1 px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#fdba74] text-sm sm:text-base font-mono"
                />
                <button
                  onClick={handleBarcodeSearch}
                  className="px-4 sm:px-6 py-2 bg-[#fdba74] text-black rounded-lg hover:bg-[#fca855] transition-colors text-sm sm:text-base whitespace-nowrap"
                >
                  Buscar
                </button>
              </div>
              <p className="text-xs text-gray-600 mt-2">
                Códigos disponíveis: 7891234567890 até 7891234567897
              </p>
            </div>

            {/* Busca por Nome */}
            <div className="mb-4 sm:mb-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
                <input
                  type="text"
                  placeholder="Buscar produtos por nome..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-9 sm:pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#fdba74] text-sm sm:text-base"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 max-h-[500px] overflow-y-auto">
              {produtosFiltrados.map((produto) => (
                <div
                  key={produto.id}
                  className="border border-gray-200 rounded-lg p-3 sm:p-4 hover:border-[#fdba74] transition-colors"
                >
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex-1 pr-2">
                      <h3 className="text-gray-900 mb-1 text-sm sm:text-base line-clamp-2">{produto.nome}</h3>
                      <p className="text-gray-500 text-xs sm:text-sm">{produto.categoria}</p>
                      {produto.codigoBarras && (
                        <p className="text-gray-400 text-xs font-mono mt-1">{produto.codigoBarras}</p>
                      )}
                    </div>
                  </div>
                  <div className="flex justify-between items-center mt-3">
                    <div>
                      <p className="text-[#fdba74] text-sm sm:text-base">R$ {produto.preco.toFixed(2)}</p>
                      <p className="text-gray-500 text-xs">Estoque: {produto.estoque}</p>
                    </div>
                    <button
                      onClick={() => adicionarAoCarrinho(produto)}
                      className="px-3 sm:px-4 py-2 bg-[#fdba74] text-black rounded-lg hover:bg-[#fca855] transition-colors flex items-center gap-1 sm:gap-2 text-sm"
                    >
                      <Plus className="w-3 h-3 sm:w-4 sm:h-4" />
                      <span className="hidden sm:inline">Adicionar</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Carrinho */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-6 sticky top-4">
            <div className="flex items-center gap-2 mb-4 sm:mb-6">
              <ShoppingCart className="w-5 h-5 sm:w-6 sm:h-6 text-[#fdba74]" />
              <h2 className="text-gray-900 text-lg sm:text-xl">Carrinho</h2>
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 mb-2 text-sm sm:text-base">Cliente</label>
              <input
                type="text"
                placeholder="Nome do cliente"
                value={clienteNome}
                onChange={(e) => setClienteNome(e.target.value)}
                className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#fdba74] text-sm sm:text-base"
              />
            </div>

            <div className="space-y-3 mb-4 max-h-[300px] overflow-y-auto">
              {carrinho.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <ShoppingCart className="w-12 h-12 mx-auto mb-2 text-gray-300" />
                  <p className="text-sm">Carrinho vazio</p>
                </div>
              ) : (
                carrinho.map((item) => (
                  <div key={item.id} className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 bg-gray-50 rounded-lg">
                    <div className="flex-1 min-w-0">
                      <p className="text-gray-900 text-xs sm:text-sm truncate">{item.nome}</p>
                      <p className="text-gray-600 text-xs">
                        {item.quantidade}x R$ {item.preco.toFixed(2)}
                      </p>
                    </div>
                    <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
                      <button
                        onClick={() => removerDoCarrinho(item.id)}
                        className="p-1 sm:p-1.5 text-[#ff3131] hover:bg-red-50 rounded"
                        title="Remover"
                      >
                        <Trash2 className="w-3 h-3 sm:w-4 sm:h-4" />
                      </button>
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => diminuirQuantidade(item.id)}
                          className="w-6 h-6 sm:w-7 sm:h-7 bg-white border border-gray-300 rounded flex items-center justify-center text-sm sm:text-base hover:bg-gray-50"
                        >
                          -
                        </button>
                        <span className="w-6 sm:w-8 text-center text-xs sm:text-sm">{item.quantidade}</span>
                        <button
                          onClick={() => aumentarQuantidade(item.id)}
                          className="w-6 h-6 sm:w-7 sm:h-7 bg-white border border-gray-300 rounded flex items-center justify-center text-sm sm:text-base hover:bg-gray-50"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="border-t border-gray-200 pt-4 space-y-2 mb-4">
              <div className="flex justify-between text-gray-900 text-base sm:text-lg">
                <span>Total:</span>
                <span>R$ {total.toFixed(2)}</span>
              </div>
            </div>

            <button
              onClick={finalizarVenda}
              disabled={carrinho.length === 0}
              className="w-full py-2 sm:py-3 bg-[#fdba74] text-black rounded-lg hover:bg-[#fca855] transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed text-sm sm:text-base"
            >
              Finalizar Venda
            </button>
          </div>
        </div>
      </div>

      {/* Modal de Recibo */}
      {lastSale && (
        <Receipt
          isOpen={showReceipt}
          onClose={() => setShowReceipt(false)}
          items={lastSale.items}
          total={lastSale.total}
          clienteNome={lastSale.clienteNome}
          dataHora={lastSale.dataHora}
        />
      )}
    </div>
  );
}