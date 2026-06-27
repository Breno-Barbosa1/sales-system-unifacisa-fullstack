import { FormEvent } from "react";
import { ShoppingBag, Search, ShoppingCart, Edit3, Trash2 } from "lucide-react";
import { Product } from "../types";

interface ProductsTabProps {
  products: Product[];
  editingProdId: number | null;
  prodName: string;
  setProdName: (val: string) => void;
  prodSellingPrice: number;
  setProdSellingPrice: (val: number) => void;
  prodPriceAtPurchase: number;
  setProdPriceAtPurchase: (val: number) => void;
  prodStockQty: number;
  setProdStockQty: (val: number) => void;
  searchProdName: string;
  setSearchProdName: (val: string) => void;
  searchProdId: string;
  setSearchProdId: (val: string) => void;
  handleSaveProduct: (e: FormEvent) => void;
  clearProductForm: () => void;
  handleSearchProdName: () => void;
  handleSearchProdId: () => void;
  syncProductsList: () => void;
  handleAddToCart: (prod: Product) => void;
  handleEditProdClick: (prod: Product) => void;
  handleDeleteProduct: (id: number) => void;
}

export function ProductsTab({
  products,
  editingProdId,
  prodName,
  setProdName,
  prodSellingPrice,
  setProdSellingPrice,
  prodPriceAtPurchase,
  setProdPriceAtPurchase,
  prodStockQty,
  setProdStockQty,
  searchProdName,
  setSearchProdName,
  searchProdId,
  setSearchProdId,
  handleSaveProduct,
  clearProductForm,
  handleSearchProdName,
  handleSearchProdId,
  syncProductsList,
  handleAddToCart,
  handleEditProdClick,
  handleDeleteProduct,
}: ProductsTabProps) {
  return (
    <div className="space-y-6">
      {/* Product Form Card */}
      <div className="bg-zinc-950 border border-white/10 p-5">
        <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-4">
          <div className="flex items-center gap-2">
            <ShoppingBag className="h-5 w-5 text-[#00FF66]" />
            <h3 className="font-bold uppercase text-sm tracking-wider text-white">
              {editingProdId ? `EDITAR PRODUTO (ID: ${editingProdId})` : "REGISTRAR NOVO PRODUTO"}
            </h3>
          </div>
        </div>

        <form onSubmit={handleSaveProduct} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="sm:col-span-2">
            <label className="text-[9px] text-white/40 uppercase font-mono block mb-1">Nome do Produto (Product Name) *</label>
            <input
              type="text"
              required
              value={prodName}
              onChange={(e) => setProdName(e.target.value)}
              className="w-full text-xs bg-zinc-900 border border-white/10 focus:border-[#00FF66] outline-none px-3 py-2 text-white font-mono"
              placeholder="Ex: Dell Inspiron 15"
            />
          </div>

          <div>
            <label className="text-[9px] text-white/40 uppercase font-mono block mb-1">Preço de Venda (Selling Price) *</label>
            <input
              type="number"
              required
              step="0.01"
              min="0.01"
              value={prodSellingPrice || ""}
              onChange={(e) => setProdSellingPrice(Number(e.target.value))}
              className="w-full text-xs bg-zinc-900 border border-white/10 focus:border-[#00FF66] outline-none px-3 py-2 text-white font-mono"
              placeholder="R$ 1200.00"
            />
          </div>

          <div>
            <label className="text-[9px] text-white/40 uppercase font-mono block mb-1">Preço de Compra (Price at Purchase) *</label>
            <input
              type="number"
              required
              step="0.01"
              min="0.01"
              value={prodPriceAtPurchase || ""}
              onChange={(e) => setProdPriceAtPurchase(Number(e.target.value))}
              className="w-full text-xs bg-zinc-900 border border-white/10 focus:border-[#00FF66] outline-none px-3 py-2 text-white font-mono"
              placeholder="R$ 850.00"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="text-[9px] text-white/40 uppercase font-mono block mb-1">Quantidade em Estoque (Stock Quantity) *</label>
            <input
              type="number"
              required
              min="0"
              value={prodStockQty}
              onChange={(e) => setProdStockQty(Number(e.target.value))}
              className="w-full text-xs bg-zinc-900 border border-white/10 focus:border-[#00FF66] outline-none px-3 py-2 text-white font-mono"
              placeholder="Ex: 10"
            />
          </div>

          <div className="sm:col-span-2 flex gap-2.5 pt-2">
            <button
              type="submit"
              className="flex-1 py-3 bg-[#00FF66] hover:bg-white text-black font-bold uppercase text-xs tracking-wider transition-all cursor-pointer"
            >
              {editingProdId ? "Atualizar Produto" : "Registrar Produto"}
            </button>
            {editingProdId && (
              <button
                type="button"
                onClick={clearProductForm}
                className="px-4 py-3 bg-zinc-900 border border-white/10 hover:border-white text-white font-bold uppercase text-xs"
              >
                Cancelar
              </button>
            )}
          </div>
        </form>
      </div>

      {/* PRODUCTS DIRECTORY */}
      <div className="bg-zinc-950 border border-white/10 p-5">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-4 mb-4">
          <h4 className="font-bold text-xs uppercase tracking-wider font-mono text-white">Catálogo de Produtos</h4>
          
          <div className="flex flex-wrap items-center gap-2">
            {/* Name search input */}
            <div className="flex bg-zinc-900 border border-white/10 pl-2 text-xs font-mono">
              <input
                type="text"
                placeholder="Buscar por Nome"
                value={searchProdName}
                onChange={(e) => setSearchProdName(e.target.value)}
                className="bg-transparent border-none outline-none py-1.5 text-white w-28 text-[11px]"
              />
              <button onClick={handleSearchProdName} className="p-1.5 hover:text-[#00FF66] cursor-pointer">
                <Search className="h-3.5 w-3.5" />
              </button>
            </div>

            {/* ID search input */}
            <div className="flex bg-zinc-900 border border-white/10 pl-2 text-xs font-mono">
              <input
                type="text"
                placeholder="Buscar por ID"
                value={searchProdId}
                onChange={(e) => setSearchProdId(e.target.value)}
                className="bg-transparent border-none outline-none py-1.5 text-white w-24 text-[11px]"
              />
              <button onClick={handleSearchProdId} className="p-1.5 hover:text-[#00FF66] cursor-pointer">
                <Search className="h-3.5 w-3.5" />
              </button>
            </div>

            <button
              onClick={() => { setSearchProdName(""); setSearchProdId(""); syncProductsList(); }}
              className="px-2.5 py-1.5 bg-zinc-900 border border-white/10 hover:border-white text-[10px] font-mono uppercase"
            >
              Limpar
            </button>
          </div>
        </div>

        {/* Table of Products */}
        <div className="overflow-x-auto">
          {products.length === 0 ? (
            <div className="py-8 text-center text-white/40 text-xs font-mono">
              Nenhum produto em estoque. Use o formulário acima para adicionar um.
            </div>
          ) : (
            <table className="w-full text-left font-mono text-[11px] border-collapse">
              <thead>
                <tr className="border-b border-white/10 text-white/50 text-[10px] uppercase tracking-wider">
                  <th className="py-2.5">ID</th>
                  <th className="py-2.5">Nome do Item</th>
                  <th className="py-2.5">Preço Venda</th>
                  <th className="py-2.5">Margem Lucro</th>
                  <th className="py-2.5">Qtd Estoque</th>
                  <th className="py-2.5 text-right">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {products.map((prod) => {
                  const profit = prod.sellingPrice - prod.priceAtPurchase;
                  const profitPercent = prod.priceAtPurchase > 0 ? (profit / prod.priceAtPurchase) * 100 : 0;
                  const isLowStock = prod.stockQuantity <= 5;

                  return (
                    <tr key={prod.id} className="hover:bg-white/5 transition-colors">
                      <td className="py-3 font-bold text-white/80">#{prod.id}</td>
                      <td className="py-3 text-white font-bold">{prod.productName}</td>
                      <td className="py-3 text-white/90">R$ {prod.sellingPrice.toFixed(2)}</td>
                      <td className="py-3">
                        <span className="text-emerald-400 font-semibold" title={`Preço Compra: R$ ${prod.priceAtPurchase}`}>
                          + R$ {profit.toFixed(2)} ({profitPercent.toFixed(0)}%)
                        </span>
                      </td>
                      <td className="py-3">
                        <span className={`px-1.5 py-0.5 text-xs font-bold ${
                          isLowStock 
                            ? "bg-red-950/30 text-red-400 border border-red-900/40 animate-pulse" 
                            : "bg-[#00FF66]/10 text-[#00FF66] border border-[#00FF66]/10"
                        }`}>
                          {prod.stockQuantity} un
                        </span>
                      </td>
                      <td className="py-3 text-right">
                        <div className="flex items-center justify-end gap-1">
                          <button
                            onClick={() => handleAddToCart(prod)}
                            className="p-1.5 hover:bg-[#00FF66]/10 text-[#00FF66] cursor-pointer"
                            title="Vender item (Adicionar Carrinho)"
                          >
                            <ShoppingCart className="h-3.5 w-3.5" />
                          </button>
                          <button
                            onClick={() => handleEditProdClick(prod)}
                            className="p-1.5 hover:bg-white/5 text-white/60 hover:text-white cursor-pointer"
                            title="Editar"
                          >
                            <Edit3 className="h-3.5 w-3.5" />
                          </button>
                          <button
                            onClick={() => handleDeleteProduct(prod.id)}
                            className="p-1.5 hover:bg-red-950/30 text-white/60 hover:text-red-500 cursor-pointer"
                            title="Excluir"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
