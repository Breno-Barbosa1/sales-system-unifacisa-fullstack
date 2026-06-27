import { useState, useEffect, FormEvent } from "react";
import { 
  Users, 
  ShoppingBag, 
  ShoppingCart, 
  Lock, 
  Terminal, 
  Search, 
  Plus, 
  Trash2, 
  Edit3, 
  RefreshCw, 
  Settings, 
  Radio, 
  AlertTriangle, 
  CheckCircle2, 
  Database, 
  Layers, 
  ChevronRight, 
  ArrowRight, 
  HelpCircle,
  FileText,
  BadgeAlert,
  Play,
  KeyRound,
  Eye,
  EyeOff
} from "lucide-react";
import { Employee, Product, SaleDTO, CreateSaleDTO, ApiCallLog } from "./types";
import { EmployeesTab } from "./components/EmployeesTab";
import { ProductsTab } from "./components/ProductsTab";
import { SalesTab } from "./components/SalesTab";

export default function App() {
  // App settings
  const [apiBaseUrl, setApiBaseUrl] = useState<string>("http://localhost:8080");
  const [activeTab, setActiveTab] = useState<"employees" | "products" | "sales">("sales");

  // State lists
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [sales, setSales] = useState<SaleDTO[]>([]);
  const [logs, setLogs] = useState<ApiCallLog[]>([]);
  const [selectedLogId, setSelectedLogId] = useState<string | null>(null);

  // Auth / Login Simulation State
  const [currentUser, setCurrentUser] = useState<Employee | null>(null);
  const [loginEmail, setLoginEmail] = useState("admin@mail.com");
  const [loginPassword, setLoginPassword] = useState("admin123");
  const [showPassword, setShowPassword] = useState(false);
  const [isLogginIn, setIsLoggingIn] = useState(false);

  // Forms / Queries - Employees
  const [empFirstName, setEmpFirstName] = useState("");
  const [empLastName, setEmpLastName] = useState("");
  const [empCpf, setEmpCpf] = useState("");
  const [empEmail, setEmpEmail] = useState("");
  const [empAddress, setEmpAddress] = useState("");
  const [empPassword, setEmpPassword] = useState("");
  const [empRole, setEmpRole] = useState("ROLE_EMPLOYEE");
  const [editingEmpId, setEditingEmpId] = useState<number | null>(null);
  const [searchCpf, setSearchCpf] = useState("");
  const [searchEmpId, setSearchEmpId] = useState("");

  // Forms / Queries - Products
  const [prodName, setProdName] = useState("");
  const [prodSellingPrice, setProdSellingPrice] = useState<number>(0);
  const [prodPriceAtPurchase, setProdPriceAtPurchase] = useState<number>(0);
  const [prodStockQty, setProdStockQty] = useState<number>(0);
  const [editingProdId, setEditingProdId] = useState<number | null>(null);
  const [searchProdName, setSearchProdName] = useState("");
  const [searchProdId, setSearchProdId] = useState("");

  // Forms - Sales / Checkout Cart
  const [selectedEmployeeId, setSelectedEmployeeId] = useState<number>(0);
  const [cart, setCart] = useState<{ product: Product; quantity: number }[]>([]);
  const [searchSaleId, setSearchSaleId] = useState("");

  // UI States
  const [isSyncing, setIsSyncing] = useState(false);
  const [notification, setNotification] = useState<{ message: string; type: "success" | "error" | "info" } | null>(null);

  // Show status toasts
  const showToast = (message: string, type: "success" | "error" | "info" = "info") => {
    setNotification({ message, type });
    setTimeout(() => {
      setNotification(null);
    }, 4000);
  };

  // Add a log entry dynamically
  const pushApiCallLog = (method: string, endpoint: string, status: number, payload?: any, responseBody?: any) => {
    const newLog: ApiCallLog = {
      id: "REQ_" + Math.floor(100000 + Math.random() * 900000),
      method,
      url: endpoint,
      status,
      payload: payload ? JSON.stringify(payload, null, 2) : undefined,
      response: responseBody ? JSON.stringify(responseBody, null, 2) : undefined,
      timestamp: new Date().toISOString()
    };
    const updatedLogs = [newLog, ...logs].slice(0, 40);
    setLogs(updatedLogs);
    setSelectedLogId(newLog.id);
  };

  // Core Request Executer (Live Only)
  const execApiRequest = async (
    method: "GET" | "POST" | "PUT" | "DELETE",
    endpointPath: string, // relative to base url, e.g. "/api/employees"
    payload?: any
  ) => {
    const fullUrl = `${apiBaseUrl}${endpointPath}`;
    setIsSyncing(true);
    
    try {
      const headers: HeadersInit = {
        "Content-Type": "application/json"
      };

      const basicAuthCredentials = localStorage.getItem("sales_system_basic_auth");
      
      if (basicAuthCredentials) {
        headers["Authorization"] = `Basic ${basicAuthCredentials}`;
      }

      const options: RequestInit = {
        method,
        headers,
      };

      if (payload && method !== "GET") {
        options.body = JSON.stringify(payload);
      }

      const response = await fetch(fullUrl, options);
      let responseData;
      const text = await response.text();
      
      try {
        responseData = text ? JSON.parse(text) : {};
      } catch (err) {
        responseData = { rawResponse: text };
      }

      pushApiCallLog(method, fullUrl, response.status, payload, responseData);
      setIsSyncing(false);

      if (!response.ok) {
        throw new Error(`Servidor retornou status ${response.status}`);
      }

      return { success: true, data: responseData, status: response.status };
    } catch (error: any) {
      console.error("Erro na integração real:", error);
      pushApiCallLog(method, fullUrl, 0, payload, { error: error.message, advice: "Verifique se o seu servidor Spring Boot local em 8080 está ativo e possui CORS configurado para permitir a origem deste site." });
      setIsSyncing(false);
      showToast(`Erro ao conectar com ${fullUrl}. Verifique seu servidor local!`, "error");
      return { success: false, data: null, error: error.message, status: 0 };
    }
  };

  // --- ACTIONS ---

  // 1. LOGIN API Call
  const handleLoginSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoggingIn(true);

    const credentialsBase64 = btoa(`${loginEmail}:${loginPassword}`);

    try {
      // Faz uma requisição de teste para uma rota protegida (ex: /api/employees)
      const response = await fetch(`${apiBaseUrl}/api/employees`, {
        method: "GET",
        headers: {
          "Authorization": `Basic ${credentialsBase64}`,
          "Content-Type": "application/json"
        }
      });

      if (response.ok) {
        localStorage.setItem("sales_system_basic_auth", credentialsBase64);
        
        // No Basic Auth, a API geralmente não retorna os dados do usuário no login.
        // Vamos criar um usuário genérico no frontend para liberar a tela:
        const loggedUser = {
          id: 999,
          firstName: loginEmail.split('@')[0],
          lastName: "",
          email: loginEmail,
          cpf: "",
          address: "",
          role: "ROLE_USER" // Ajuste se necessário
        };
        
        setCurrentUser(loggedUser);
        setSelectedEmployeeId(loggedUser.id);
        localStorage.setItem("sales_system_current_user", JSON.stringify(loggedUser));
        
        showToast("Login autorizado pelo servidor!", "success");
        setActiveTab("sales");
        
        // Puxa os dados reais agora que está logado
        syncEmployeesList();
        syncProductsList();
        syncSalesList();
      } else {
        showToast(`Credenciais recusadas (Status: ${response.status})`, "error");
      }
    } catch (error: any) {
      showToast(`Erro de conexão: ${error.message}`, "error");
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem("sales_system_current_user");
    localStorage.removeItem("sales_system_basic_auth");
    showToast("Sessão finalizada.", "info");
  };

  // 2. EMPLOYEES CRUD ACTIONS

  const syncEmployeesList = async () => {
    const res = await execApiRequest("GET", "/api/employees");
    if (res.success && res.data) {
      setEmployees(res.data);
    }
  };

  const handleSearchCpf = async () => {
    if (!searchCpf.trim()) {
      syncEmployeesList();
      return;
    }
    const res = await execApiRequest("GET", `/api/employees/${searchCpf}`);

    if (res.success && res.data) {
      if (Array.isArray(res.data)) {
        setEmployees(res.data);
      } else {
        setEmployees([res.data]);
      }
      showToast("Funcionário localizado por CPF!", "success");
    } else {
      showToast("Nenhum funcionário encontrado com este CPF", "error");
    }
  };

  const handleSearchEmpId = async () => {
    if (!searchEmpId.trim()) {
      syncEmployeesList();
      return;
    }
    const res = await execApiRequest("GET", `/api/employees/${searchEmpId}`);

    if (res.success && res.data) {
      setEmployees([res.data]);
      showToast("Funcionário localizado por ID!", "success");
    } else {
      showToast("Funcionário não localizado!", "error");
    }
  };

  const handleSaveEmployee = async (e: FormEvent) => {
    e.preventDefault();
    if (!empFirstName.trim() || !empLastName.trim() || !empCpf.trim() || !empEmail.trim()) {
      showToast("Preencha todos os campos obrigatórios!", "error");
      return;
    }

    if (editingEmpId) {
      const payload = {
        id: editingEmpId,
        firstName: empFirstName,
        lastName: empLastName,
        email: empEmail,
        address: empAddress,
        cpf: empCpf,
        role: empRole
      };

      const res = await execApiRequest("PUT", `/api/employees`, payload);

      if (res.success) {
        showToast("Funcionário atualizado com sucesso!", "success");
        clearEmployeeForm();
        syncEmployeesList();
      }
    } else {
      const payload = {
        firstName: empFirstName,
        lastName: empLastName,
        cpf: empCpf,
        email: empEmail,
        address: empAddress,
        password: empPassword || "default123",
        role: empRole
      };

      const res = await execApiRequest("POST", `/api/employees`, payload);

      if (res.success) {
        showToast("Funcionário registrado com sucesso!", "success");
        clearEmployeeForm();
        syncEmployeesList();
      }
    }
  };

  const handleEditEmpClick = (emp: Employee) => {
    setEditingEmpId(emp.id);
    setEmpFirstName(emp.firstName);
    setEmpLastName(emp.lastName);
    setEmpCpf(emp.cpf);
    setEmpEmail(emp.email);
    setEmpAddress(emp.address);
    setEmpRole(emp.role);
    setEmpPassword("");
  };

  const handleDeleteEmployee = async (id: number) => {
    if (!confirm("Tem certeza que deseja remover este funcionário?")) return;

    const res = await execApiRequest("DELETE", `/api/employees/${id}`);

    if (res.success) {
      showToast("Funcionário removido com sucesso!", "success");
      syncEmployeesList();
    }
  };

  const clearEmployeeForm = () => {
    setEditingEmpId(null);
    setEmpFirstName("");
    setEmpLastName("");
    setEmpCpf("");
    setEmpEmail("");
    setEmpAddress("");
    setEmpPassword("");
    setEmpRole("ROLE_EMPLOYEE");
  };

  // 3. PRODUCTS CRUD ACTIONS

  const syncProductsList = async () => {
    const res = await execApiRequest("GET", "/api/products");
    if (res.success && res.data) {
      setProducts(res.data);
    }
  };

  const handleSearchProdName = async () => {
    if (!searchProdName.trim()) {
      syncProductsList();
      return;
    }
    const res = await execApiRequest("GET", `/api/products/${searchProdName}`);

    if (res.success && res.data) {
      if (Array.isArray(res.data)) {
        setProducts(res.data);
      } else {
        setProducts([res.data]);
      }
      showToast("Produto localizado!", "success");
    } else {
      showToast("Produto não localizado!", "error");
    }
  };

  const handleSearchProdId = async () => {
    if (!searchProdId.trim()) {
      syncProductsList();
      return;
    }
    const res = await execApiRequest("GET", `/api/products/${searchProdId}`);

    if (res.success && res.data) {
      setProducts([res.data]);
      showToast("Produto localizado!", "success");
    } else {
      showToast("Produto não localizado!", "error");
    }
  };

  const handleSaveProduct = async (e: FormEvent) => {
    e.preventDefault();
    if (!prodName.trim() || prodSellingPrice <= 0 || prodPriceAtPurchase <= 0) {
      showToast("Preencha todos os campos do produto devidamente!", "error");
      return;
    }

    const payload = {
      id: editingProdId || undefined,
      productName: prodName,
      sellingPrice: prodSellingPrice,
      priceAtPurchase: prodPriceAtPurchase,
      stockQuantity: prodStockQty
    };

    if (editingProdId) {
      const res = await execApiRequest("PUT", `/api/products`, payload);

      if (res.success) {
        showToast("Produto atualizado!", "success");
        clearProductForm();
        syncProductsList();
      }
    } else {
      const res = await execApiRequest("POST", `/api/products`, payload);

      if (res.success) {
        showToast("Produto adicionado ao inventário!", "success");
        clearProductForm();
        syncProductsList();
      }
    }
  };

  const handleEditProdClick = (prod: Product) => {
    setEditingProdId(prod.id);
    setProdName(prod.productName);
    setProdSellingPrice(prod.sellingPrice);
    setProdPriceAtPurchase(prod.priceAtPurchase);
    setProdStockQty(prod.stockQuantity);
  };

  const handleDeleteProduct = async (id: number) => {
    if (!confirm("Tem certeza que deseja excluir este produto do catálogo?")) return;

    const res = await execApiRequest("DELETE", `/api/products/${id}`);

    if (res.success) {
      showToast("Produto removido!", "success");
      syncProductsList();
    }
  };

  const clearProductForm = () => {
    setEditingProdId(null);
    setProdName("");
    setProdSellingPrice(0);
    setProdPriceAtPurchase(0);
    setProdStockQty(0);
  };

  // 4. SALES CHANNELS / CART / ORDERS

  const syncSalesList = async () => {
    const res = await execApiRequest("GET", "/api/sales");
    if (res.success && res.data) {
      setSales(res.data);
    }
  };

  const handleSearchSaleId = async () => {
    if (!searchSaleId.trim()) {
      syncSalesList();
      return;
    }
    const res = await execApiRequest("GET", `/api/sales/${searchSaleId}`);

    if (res.success && res.data) {
      setSales([res.data]);
      showToast("Venda localizada por ID!", "success");
    } else {
      showToast("Venda não localizada!", "error");
    }
  };

  const handleAddToCart = (prod: Product) => {
    const existing = cart.find(item => item.product.id === prod.id);
    if (existing) {
      if (existing.quantity >= prod.stockQuantity) {
        showToast("Quantidade desejada ultrapassa estoque disponível!", "error");
        return;
      }
      setCart(cart.map(item => item.product.id === prod.id ? { ...item, quantity: item.quantity + 1 } : item));
    } else {
      if (prod.stockQuantity <= 0) {
        showToast("Produto sem estoque disponível!", "error");
        return;
      }
      setCart([...cart, { product: prod, quantity: 1 }]);
    }
    showToast(`${prod.productName} adicionado ao carrinho!`, "info");
  };

  const handleUpdateCartQty = (productId: number, qty: number) => {
    if (qty <= 0) {
      setCart(cart.filter(item => item.product.id !== productId));
      return;
    }
    const item = cart.find(i => i.product.id === productId);
    if (item && qty > item.product.stockQuantity) {
      showToast("Limite de estoque atingido!", "error");
      return;
    }
    setCart(cart.map(i => i.product.id === productId ? { ...i, quantity: qty } : i));
  };

  const handleRemoveFromCart = (productId: number) => {
    setCart(cart.filter(i => i.product.id !== productId));
  };

  const handleCheckoutSubmit = async () => {
    if (cart.length === 0) {
      showToast("O carrinho está vazio!", "error");
      return;
    }

    const currentEmployeeId = selectedEmployeeId || (currentUser ? currentUser.id : null);
    if (!currentEmployeeId) {
      showToast("Por favor, selecione o funcionário responsável!", "error");
      return;
    }

    const payload: CreateSaleDTO = {
      employeeId: Number(currentEmployeeId),
      saleItemDTOS: cart.map(item => ({
        productId: item.product.id,
        quantity: item.quantity
      }))
    };

    const res = await execApiRequest("POST", "/api/sales", payload);

    if (res.success) {
      showToast("Venda processada e registrada com sucesso!", "success");
      setCart([]);
      syncSalesList();
      syncProductsList(); // Atualiza o estoque localmente buscando a versão do servidor
    } else {
      showToast("Falha ao registrar venda!", "error");
    }
  };

  const handleDeleteSale = async (id: number) => {
    if (!confirm("Tem certeza que deseja cancelar esta venda?")) return;

    const res = await execApiRequest("DELETE", `/api/sales/${id}`);

    if (res.success) {
      showToast("Venda cancelada e estornada com sucesso!", "success");
      syncSalesList();
      syncProductsList(); // Atualiza o estoque buscando a versão mais atual do servidor
    } else {
      showToast("Falha ao remover a venda do servidor", "error");
    }
  };

  // Load state on mount if previously logged in
  useEffect(() => {
    const storedUser = localStorage.getItem("sales_system_current_user");

    if (storedUser) {
      try {
        const parsed = JSON.parse(storedUser);
        setCurrentUser(parsed);
        setSelectedEmployeeId(parsed.id);
        
        // Puxa os dados assim que o componente monta caso exista autenticação
        syncEmployeesList();
        syncProductsList();
        syncSalesList();
      } catch (e) {
        console.error("Erro ao ler usuário salvo", e);
      }
    }
  }, []);

  // Total sales metrics
  const totalRevenue = sales.reduce((acc, s) => acc + s.totalAmount, 0);
  const lowStockCount = products.filter(p => p.stockQuantity <= 5).length;

  if (!currentUser) {
    return (
      <div className="min-h-screen bg-[#050505] text-white font-sans antialiased flex flex-col items-center justify-center selection:bg-[#00FF66] selection:text-black border-[12px] border-[#151515] relative p-4">
        {/* Subtle green ambient light element */}
        <div className="absolute top-1/4 left-1/3 w-[600px] h-[600px] bg-[#00FF66]/5 rounded-full blur-[140px] pointer-events-none animate-pulse-slow"></div>

        {/* FLOATING NOTIFICATION BANNER */}
        {notification && (
          <div className={`fixed bottom-4 left-4 z-50 p-4 border rounded-none shadow-2xl flex items-center gap-3 animate-slide-in font-mono text-xs ${
            notification.type === "success" 
              ? "bg-[#00FF66]/10 text-[#00FF66] border-[#00FF66]/30" 
              : notification.type === "error"
              ? "bg-red-950 text-red-400 border-red-900/50"
              : "bg-zinc-950 text-sky-400 border-sky-900/50"
          }`}>
            {notification.type === "success" ? (
              <CheckCircle2 className="h-5 w-5 shrink-0" />
            ) : (
              <AlertTriangle className="h-5 w-5 shrink-0" />
            )}
            <span>{notification.message}</span>
          </div>
        )}

        <div className="w-full max-w-sm bg-zinc-950 border border-white/10 p-6 sm:p-8 relative z-10 shadow-2xl">
          <div className="flex flex-col items-center text-center mb-6">
            <div className="bg-[#00FF66] text-black p-3 mb-3 shadow-lg shadow-[#00FF66]/10">
              <Layers className="h-6 w-6" />
            </div>
            <h1 className="text-xl font-bold text-white tracking-tight">
              Acesso ao Sistema
            </h1>
          </div>

          <form onSubmit={handleLoginSubmit} className="space-y-4">
            <div>
              <label className="text-[10px] text-white/40 uppercase block mb-1 font-mono">E-mail</label>
              <input
                type="email"
                required
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                className="w-full text-xs bg-zinc-900 border border-white/10 focus:border-[#00FF66] outline-none px-3.5 py-2.5 text-white font-mono"
                placeholder="exemplo@email.com"
              />
            </div>

            <div>
              <label className="text-[10px] text-white/40 uppercase block mb-1 font-mono font-medium">Senha</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  className="w-full text-xs bg-zinc-900 border border-white/10 focus:border-[#00FF66] outline-none pl-3.5 pr-11 py-2.5 text-white font-mono"
                  placeholder="Sua senha"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-2.5 text-white/40 hover:text-white cursor-pointer"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLogginIn}
              className="w-full px-4 py-3.5 bg-[#00FF66] hover:bg-white text-black font-bold uppercase text-xs tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-40"
            >
              {isLogginIn ? <RefreshCw className="h-4 w-4 animate-spin" /> : <Play className="h-4 w-4 animate-none" />}
              Entrar
            </button>

            {/* Quick prefill row for Testing Ease */}
            <div className="text-[11px] text-white/40 pt-3.5 flex items-center justify-center gap-2 border-t border-white/5 font-mono">
              <span>Testar com:</span>
              <button
                type="button"
                onClick={() => { setLoginEmail("admin@mail.com"); setLoginPassword("admin123"); showToast("Credenciais de Admin inseridas", "info"); }}
                className="text-[#00FF66] hover:underline font-bold cursor-pointer"
              >
                Admin
              </button>
              <span>|</span>
              <button
                type="button"
                onClick={() => { setLoginEmail("employee@mail.com"); setLoginPassword("employee123"); showToast("Credenciais de Funcionário inseridas", "info"); }}
                className="text-[#00FF66] hover:underline font-bold cursor-pointer"
              >
                Funcionário
              </button>
            </div>
            
            <div className="pt-2 w-full flex items-center gap-1.5 border border-white/10 bg-black px-2 py-1">
              <span className="text-[9px] uppercase text-white/40 shrink-0 font-mono">API URL:</span>
              <input
                type="text"
                value={apiBaseUrl}
                onChange={(e) => setApiBaseUrl(e.target.value)}
                className="bg-transparent border-none text-[10px] font-mono text-white outline-none w-full"
                placeholder="http://localhost:8080"
              />
            </div>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans antialiased flex flex-col selection:bg-[#00FF66] selection:text-black border-[12px] border-[#151515]">
      
      {/* Subtle green ambient light element */}
      <div className="absolute top-1/4 left-1/3 w-[600px] h-[600px] bg-[#00FF66]/5 rounded-full blur-[140px] pointer-events-none"></div>

      {/* HEADER BAR */}
      <header className="sticky top-0 z-40 bg-[#090909]/95 backdrop-blur-md border-b border-white/10 px-6 py-4 flex items-center justify-between gap-4">
        
        <div className="flex items-center gap-4">
          <div className="bg-[#00FF66] text-black p-3 rounded-none shadow-lg shadow-[#00FF66]/10 shrink-0">
            <Layers className="h-6 w-6" id="logo-icon" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[#00FF66] font-mono text-[9px] tracking-widest uppercase bg-[#00FF66]/10 px-2 py-0.5 border border-[#00FF66]/20 font-bold">
                SISTEMA COMERCIAL
              </span>
              <span className="h-2 w-2 rounded-full bg-[#00FF66] animate-pulse"></span>
              <span className="text-[10px] font-mono text-white/50 uppercase tracking-tight">
                Conectado à API
              </span>
            </div>
            <h1 className="text-xl font-black text-white tracking-tight uppercase mt-1">
              Frente de Caixa <span className="text-[#00FF66]">&amp; Gestão</span>
            </h1>
          </div>
        </div>

        {/* CONTROLS */}
        <div className="flex items-center gap-4">
          {currentUser && (
            <div className="flex items-center gap-3 font-mono">
              <div className="text-right hidden sm:block">
                <span className="text-[9px] text-white/40 block leading-tight uppercase">Operador:</span>
                <span className="text-[11px] font-bold text-[#00FF66] block leading-tight">
                  {currentUser.firstName} {currentUser.lastName}
                </span>
              </div>
              <button
                onClick={handleLogout}
                className="px-3 py-2 bg-red-950/20 text-red-400 hover:bg-red-900/30 border border-red-900/30 text-[10px] uppercase font-bold tracking-wider cursor-pointer transition-colors"
                title="Sair do sistema (Logout)"
              >
                Sair
              </button>
            </div>
          )}
        </div>
      </header>

      {/* FLOATING NOTIFICATION BANNER */}
      {notification && (
        <div className={`fixed bottom-4 left-4 z-50 p-4 border rounded-none shadow-2xl flex items-center gap-3 animate-slide-in font-mono text-xs ${
          notification.type === "success" 
            ? "bg-[#00FF66]/10 text-[#00FF66] border-[#00FF66]/30" 
            : notification.type === "error"
            ? "bg-red-950 text-red-400 border-red-900/50"
            : "bg-zinc-950 text-sky-400 border-sky-900/50"
        }`}>
          {notification.type === "success" ? (
            <CheckCircle2 className="h-5 w-5 shrink-0" />
          ) : (
            <AlertTriangle className="h-5 w-5 shrink-0" />
          )}
          <span>{notification.message}</span>
        </div>
      )}

      {/* CORE INFO & METRICS HERO */}
      <div className="bg-[#0c0c0c] border-b border-b-white/10 p-6">
        <div className="max-w-7xl w-full mx-auto flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          
          <div>
            <div className="flex flex-wrap items-center gap-2.5 mb-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-[#00FF66] animate-pulse"></span>
              <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-white/50">CONEXÃO CONECTADA COM</span>
              <span className="text-[10px] font-mono text-[#00FF66] bg-[#00FF66]/10 px-1.5 py-0.5 font-bold uppercase">
                Spring Boot (Real)
              </span>

              <div className="flex items-center gap-1.5 border border-white/10 bg-black px-2 py-0.5 font-mono text-[10px]">
                <span className="text-white/40 uppercase text-[9px]">URL API:</span>
                <input
                  type="text"
                  value={apiBaseUrl}
                  onChange={(e) => setApiBaseUrl(e.target.value)}
                  className="bg-transparent border-none text-[10px] font-mono text-[#00FF66] outline-none w-36"
                  placeholder="http://localhost:8080"
                />
              </div>
            </div>
            
            <h2 className="text-3xl font-black uppercase tracking-tight leading-none text-white">
              SISTEMA <span className="text-[#00FF66]">DE GESTÃO</span> COMERCIAL
            </h2>
            <p className="text-white/60 text-xs mt-2 leading-relaxed max-w-xl">
              Console unificado para faturamento de vendas (PDV), controle de funcionários e estoque de mercadorias. Conectado e integrado ao servidor Spring Boot local.
            </p>
          </div>

          {/* Quick Realtime KPI Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 shrink-0 w-full lg:w-auto">
            <div className="bg-zinc-950/60 p-4 border border-white/10 font-mono">
              <span className="text-[9px] text-white/40 uppercase block mb-1">Faturamento total</span>
              <span className="text-lg font-black text-white">R$ {totalRevenue.toFixed(2)}</span>
            </div>
            <div className="bg-zinc-950/60 p-4 border border-white/10 font-mono">
              <span className="text-[9px] text-white/40 uppercase block mb-1">Funcionários</span>
              <span className="text-lg font-black text-[#00FF66]">{employees.length}</span>
            </div>
            <div className="bg-zinc-950/60 p-4 border border-white/10 font-mono col-span-2 sm:col-span-1">
              <span className="text-[9px] text-white/40 uppercase block mb-1">Estoque Crítico (≤5)</span>
              <span className={`text-lg font-black ${lowStockCount > 0 ? "text-amber-400" : "text-white"}`}>
                {lowStockCount} itens
              </span>
            </div>
          </div>

        </div>
      </div>

      {/* MAIN WORKSPACE CONTAINER */}
      <div className="flex-1 max-w-7xl w-full mx-auto p-6 flex flex-col gap-6">
          
          {/* NAVIGATION BAR */}
          <nav className="flex flex-wrap border border-white/10 bg-zinc-950 p-1">
            <button
              onClick={() => setActiveTab("sales")}
              className={`flex-1 min-w-[120px] px-4 py-3 text-xs font-mono font-bold uppercase tracking-wider transition-all cursor-pointer flex items-center justify-center gap-2 ${
                activeTab === "sales"
                  ? "bg-[#00FF66] text-black"
                  : "text-white/50 hover:text-white hover:bg-white/5"
              }`}
            >
              <ShoppingCart className="h-4 w-4" />
              Vendas ({sales.length})
            </button>
            <button
              onClick={() => setActiveTab("products")}
              className={`flex-1 min-w-[120px] px-4 py-3 text-xs font-mono font-bold uppercase tracking-wider transition-all cursor-pointer flex items-center justify-center gap-2 ${
                activeTab === "products"
                  ? "bg-[#00FF66] text-black"
                  : "text-white/50 hover:text-white hover:bg-white/5"
              }`}
            >
              <ShoppingBag className="h-4 w-4" />
              Produtos ({products.length})
            </button>
            <button
              onClick={() => setActiveTab("employees")}
              className={`flex-1 min-w-[120px] px-4 py-3 text-xs font-mono font-bold uppercase tracking-wider transition-all cursor-pointer flex items-center justify-center gap-2 ${
                activeTab === "employees"
                  ? "bg-[#00FF66] text-black"
                  : "text-white/50 hover:text-white hover:bg-white/5"
              }`}
            >
              <Users className="h-4 w-4" />
              Funcionários ({employees.length})
            </button>
          </nav>

          {/* TAB 1: EMPLOYEES CONTROLLER */}
          {activeTab === "employees" && (
            <EmployeesTab
              employees={employees}
              editingEmpId={editingEmpId}
              empFirstName={empFirstName}
              setEmpFirstName={setEmpFirstName}
              empLastName={empLastName}
              setEmpLastName={setEmpLastName}
              empCpf={empCpf}
              setEmpCpf={setEmpCpf}
              empEmail={empEmail}
              setEmpEmail={setEmpEmail}
              empAddress={empAddress}
              setEmpAddress={setEmpAddress}
              empRole={empRole}
              setEmpRole={setEmpRole}
              empPassword={empPassword}
              setEmpPassword={setEmpPassword}
              searchCpf={searchCpf}
              setSearchCpf={setSearchCpf}
              searchEmpId={searchEmpId}
              setSearchEmpId={setSearchEmpId}
              handleSaveEmployee={handleSaveEmployee}
              clearEmployeeForm={clearEmployeeForm}
              handleSearchCpf={handleSearchCpf}
              handleSearchEmpId={handleSearchEmpId}
              syncEmployeesList={syncEmployeesList}
              handleEditEmpClick={handleEditEmpClick}
              handleDeleteEmployee={handleDeleteEmployee}
            />
          )}

          {/* TAB 4: PRODUCTS CATALOG CONTROLLER */}
          {activeTab === "products" && (
            <ProductsTab
              products={products}
              editingProdId={editingProdId}
              prodName={prodName}
              setProdName={setProdName}
              prodSellingPrice={prodSellingPrice}
              setProdSellingPrice={setProdSellingPrice}
              prodPriceAtPurchase={prodPriceAtPurchase}
              setProdPriceAtPurchase={setProdPriceAtPurchase}
              prodStockQty={prodStockQty}
              setProdStockQty={setProdStockQty}
              searchProdName={searchProdName}
              setSearchProdName={setSearchProdName}
              searchProdId={searchProdId}
              setSearchProdId={setSearchProdId}
              handleSaveProduct={handleSaveProduct}
              clearProductForm={clearProductForm}
              handleSearchProdName={handleSearchProdName}
              handleSearchProdId={handleSearchProdId}
              syncProductsList={syncProductsList}
              handleAddToCart={handleAddToCart}
              handleEditProdClick={handleEditProdClick}
              handleDeleteProduct={handleDeleteProduct}
            />
          )}

          {/* TAB 5: SALES CHECKOUT & ORDERS LIST */}
          {activeTab === "sales" && (
            <SalesTab
              sales={sales}
              cart={cart}
              employees={employees}
              products={products}
              selectedEmployeeId={selectedEmployeeId}
              setSelectedEmployeeId={setSelectedEmployeeId}
              searchSaleId={searchSaleId}
              setSearchSaleId={setSearchSaleId}
              handleUpdateCartQty={handleUpdateCartQty}
              handleRemoveFromCart={handleRemoveFromCart}
              handleCheckoutSubmit={handleCheckoutSubmit}
              handleAddToCart={handleAddToCart}
              handleSearchSaleId={handleSearchSaleId}
              syncSalesList={syncSalesList}
              handleDeleteSale={handleDeleteSale}
            />
          )}
      </div>

      {/* FOOTER BAR */}
      <footer className="mt-auto border-t border-white/10 bg-[#090909] px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-white/40 font-mono uppercase tracking-wider">
        <span>Sistema de Vendas Unifacisa • Console de Integração de APIs</span>
      </footer>
    </div>
  );
}