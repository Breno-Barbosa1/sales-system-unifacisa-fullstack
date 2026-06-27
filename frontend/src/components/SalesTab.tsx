import { ShoppingCart, Search, Trash2 } from "lucide-react";
import { Product, Employee, SaleDTO } from "../types";

interface SalesTabProps {
  sales: SaleDTO[];
  cart: { product: Product; quantity: number }[];
  employees: Employee[];
  products: Product[];
  selectedEmployeeId: number;
  setSelectedEmployeeId: (val: number) => void;
  searchSaleId: string;
  setSearchSaleId: (val: string) => void;
  handleUpdateCartQty: (productId: number, qty: number) => void;
  handleRemoveFromCart: (productId: number) => void;
  handleCheckoutSubmit: () => void;
  handleAddToCart: (prod: Product) => void;
  handleSearchSaleId: () => void;
  syncSalesList: () => void;
  handleDeleteSale: (id: number) => void;
}

export function SalesTab({
  sales,
  cart,
  employees,
  products,
  selectedEmployeeId,
  setSelectedEmployeeId,
  searchSaleId,
  setSearchSaleId,
  handleUpdateCartQty,
  handleRemoveFromCart,
  handleCheckoutSubmit,
  handleAddToCart,
  handleSearchSaleId,
  syncSalesList,
  handleDeleteSale,
}: SalesTabProps) {
  return (
    <div className="space-y-6">
      {/* Sales Cart / Register Sale Row */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        
        {/* POS Shopping Cart (7 cols) */}
        <div className="bg-zinc-950 border border-white/10 p-5 md:col-span-7 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-4">
              <div className="flex items-center gap-2">
                <ShoppingCart className="h-5 w-5 text-[#00FF66]" />
                <h3 className="font-bold uppercase text-sm tracking-wider text-white">Frente de Caixa (PDV)</h3>
              </div>
            </div>

            {cart.length === 0 ? (
              <div className="py-12 text-center text-white/30 text-xs font-mono border-2 border-dashed border-white/10 p-4">
                O carrinho está vazio.<br/>
                Clique no ícone de carrinho nas abas de "Produtos" ou ao lado para adicionar itens.
              </div>
            ) : (
              <div className="space-y-3 font-mono text-xs mb-4">
                <span className="text-[9px] uppercase tracking-wider text-[#00FF66] font-bold block mb-1">Itens no Carrinho:</span>
                
                <div className="divide-y divide-white/5">
                  {cart.map((item) => (
                    <div key={item.product.id} className="py-2.5 flex items-center justify-between gap-3">
                      <div className="min-w-0">
                        <span className="font-bold text-white block">{item.product.productName}</span>
                        <span className="text-white/40 text-[10px]">Preço: R$ {item.product.sellingPrice.toFixed(2)}</span>
                      </div>

                      <div className="flex items-center gap-2">
                        <input
                          type="number"
                          min="1"
                          max={item.product.stockQuantity}
                          value={item.quantity}
                          onChange={(e) => handleUpdateCartQty(item.product.id, Number(e.target.value))}
                          className="w-12 bg-zinc-900 border border-white/10 text-center text-white outline-none py-1 text-[11px]"
                        />
                        <button
                          type="button"
                          onClick={() => handleRemoveFromCart(item.product.id)}
                          className="text-red-400 hover:text-red-500 p-1 cursor-pointer"
                          title="Remover do carrinho"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

              </div>
            )}
          </div>

          {/* Cart Footer Checkout Actions */}
          <div className="border-t border-white/10 pt-4 space-y-4">
            
            {/* Employee responsible select */}
            <div>
              <label className="text-[9px] text-white/40 uppercase block font-mono mb-1">Selecione o Funcionário Responsável *</label>
              <select
                value={selectedEmployeeId || ""}
                onChange={(e) => setSelectedEmployeeId(Number(e.target.value))}
                className="w-full text-xs bg-[#0c0c0c] border border-white/10 focus:border-[#00FF66] outline-none px-3 py-2 text-white font-mono"
              >
                <option value="">-- Selecione o Vendedor --</option>
                {employees.map(e => (
                <option key={e.id} value={e.id}>
                  #{e.id} - {e.firstName} {e.lastName} ({(e.role || "").replace("ROLE_", "") || "SEM CARGO"})
                </option>
              ))}
              </select>
            </div>

            <div className="flex items-center justify-between font-mono bg-[#0c0c0c] p-3 border border-white/5">
              <span className="text-white/50 text-xs">VALOR TOTAL:</span>
              <span className="text-lg font-black text-[#00FF66]">
                R$ {cart.reduce((sum, item) => sum + (item.product.sellingPrice * item.quantity), 0).toFixed(2)}
              </span>
            </div>

            <button
              onClick={handleCheckoutSubmit}
              disabled={cart.length === 0}
              className="w-full py-3.5 bg-[#00FF66] hover:bg-white text-black font-bold uppercase text-xs tracking-widest transition-all cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
            >
              FINALIZAR VENDA
            </button>

          </div>

        </div>

        {/* Fast Catalog Picker inside POS (5 cols) */}
        <div className="bg-zinc-950 border border-white/10 p-5 md:col-span-5 flex flex-col justify-between">
          <div>
            <h4 className="font-bold uppercase text-xs tracking-wider border-b border-white/10 pb-3 mb-3 text-white/80 font-mono">
              Seleção Rápida de Produtos
            </h4>
            
            <div className="space-y-2 max-h-[350px] overflow-y-auto pr-1">
              {products.map((prod) => (
                <div
                  key={prod.id}
                  onClick={() => handleAddToCart(prod)}
                  className="p-2 border border-white/5 hover:border-[#00FF66]/30 bg-zinc-900/30 flex items-center justify-between text-xs font-mono cursor-pointer transition-all select-none"
                >
                  <div>
                    <span className="font-bold text-white block">{prod.productName}</span>
                    <span className="text-[10px] text-white/50">R$ {prod.sellingPrice.toFixed(2)}</span>
                  </div>
                  <span className="text-[9px] bg-[#00FF66]/10 text-[#00FF66] px-1 py-0.5 border border-[#00FF66]/10 font-bold uppercase shrink-0">
                    Estoque: {prod.stockQuantity}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <p className="text-[9px] text-white/40 uppercase tracking-tight font-mono mt-4 leading-relaxed">
            Clique no item acima para inseri-lo no carrinho e deduzir sua quantidade do estoque ao faturar.
          </p>
        </div>

      </div>

      {/* SALES HISTORIC LOG LIST */}
      <div className="bg-zinc-950 border border-white/10 p-5">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-4 mb-4">
          <h4 className="font-bold text-xs uppercase tracking-wider font-mono text-white">Histórico de Vendas Faturadas</h4>
          
          <div className="flex items-center gap-2">
            <div className="flex bg-zinc-900 border border-white/10 pl-2 text-xs font-mono">
              <input
                type="text"
                placeholder="Buscar Venda por ID"
                value={searchSaleId}
                onChange={(e) => setSearchSaleId(e.target.value)}
                className="bg-transparent border-none outline-none py-1.5 text-white w-32 text-[11px]"
              />
              <button onClick={handleSearchSaleId} className="p-1.5 hover:text-[#00FF66] cursor-pointer">
                <Search className="h-3.5 w-3.5" />
              </button>
            </div>

            <button
              onClick={() => { setSearchSaleId(""); syncSalesList(); }}
              className="px-2.5 py-1.5 bg-zinc-900 border border-white/10 hover:border-white text-[10px] font-mono uppercase"
            >
              Ver Tudo
            </button>
          </div>
        </div>

        {sales.length === 0 ? (
          <div className="py-8 text-center text-white/30 text-xs font-mono">
            Nenhuma venda processada até o momento.
          </div>
        ) : (
          <div className="space-y-4 font-mono text-xs text-white">
            {sales.map((sale) => (
              console.log("sale", sale),
              <div key={sale.id} className="p-4 border border-white/5 bg-zinc-900/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-white/15 transition-all">
                
                <div className="space-y-1.5 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-black text-white text-sm">VENDA #{sale.id}</span>
                    <span className="text-[10px] text-white/40">{new Date(sale.createdAt).toLocaleString()}</span>
                  </div>

                  <div className="text-white/60 text-[11px]">
                    <span className="text-white/30 mr-1">Vendedor responsável:</span>
                    <span className="text-white font-bold">{sale.employeeName || `ID #${sale.employeeId}`}</span>
                  </div>

                  <div className="space-y-1 pt-1.5">
                    <span className="text-[9px] uppercase tracking-wider text-white/40 block">Itens da Compra:</span>
                    <div className="pl-3 border-l border-white/10 space-y-1">
                      {sale.saleItems.map((item, idx) => (
                        <div key={idx} className="text-white/80 text-[11px]">
                          • {"Id Produto: " + (item?.productId || "Produto não identificado")} - {item.quantity}x de R$ {(item.price || 0).toFixed(2)}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex flex-row sm:flex-col items-center sm:items-end justify-between gap-2 shrink-0 border-t sm:border-t-0 border-white/5 pt-3.5 sm:pt-0">
                  <div>
                    <span className="text-white/40 text-[10px] uppercase block">Faturamento total</span>
                    <span className="text-base font-black text-[#00FF66]">R$ {sale.totalAmount.toFixed(2)}</span>
                  </div>

                  <button
                    onClick={() => handleDeleteSale(sale.id)}
                    className="p-1.5 text-white/40 hover:text-red-400 hover:bg-red-950/20 border border-transparent hover:border-red-900/30 cursor-pointer"
                    title="Remover ou Estornar Venda"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>

              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
