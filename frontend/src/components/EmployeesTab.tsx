import { FormEvent } from "react";
import { Users, Search, Edit3, Trash2 } from "lucide-react";
import { Employee } from "../types";

interface EmployeesTabProps {
  employees: Employee[];
  editingEmpId: number | null;
  empFirstName: string;
  setEmpFirstName: (val: string) => void;
  empLastName: string;
  setEmpLastName: (val: string) => void;
  empCpf: string;
  setEmpCpf: (val: string) => void;
  empEmail: string;
  setEmpEmail: (val: string) => void;
  empAddress: string;
  setEmpAddress: (val: string) => void;
  empRole: string;
  setEmpRole: (val: string) => void;
  empPassword?: string;
  setEmpPassword?: (val: string) => void;
  searchCpf: string;
  setSearchCpf: (val: string) => void;
  searchEmpId: string;
  setSearchEmpId: (val: string) => void;
  handleSaveEmployee: (e: FormEvent) => void;
  clearEmployeeForm: () => void;
  handleSearchCpf: () => void;
  handleSearchEmpId: () => void;
  syncEmployeesList: () => void;
  handleEditEmpClick: (emp: Employee) => void;
  handleDeleteEmployee: (id: number) => void;
}

export function EmployeesTab({
  employees,
  editingEmpId,
  empFirstName,
  setEmpFirstName,
  empLastName,
  setEmpLastName,
  empCpf,
  setEmpCpf,
  empEmail,
  setEmpEmail,
  empAddress,
  setEmpAddress,
  empRole,
  setEmpRole,
  empPassword = "",
  setEmpPassword = () => {},
  searchCpf,
  setSearchCpf,
  searchEmpId,
  setSearchEmpId,
  handleSaveEmployee,
  clearEmployeeForm,
  handleSearchCpf,
  handleSearchEmpId,
  syncEmployeesList,
  handleEditEmpClick,
  handleDeleteEmployee,
}: EmployeesTabProps) {
  return (
    <div className="space-y-6">
      {/* Form & Controls Card */}
      <div className="bg-zinc-950 border border-white/10 p-5">
        <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-4">
          <div className="flex items-center gap-2">
            <Users className="h-5 w-5 text-[#00FF66]" />
            <h3 className="font-bold uppercase text-sm tracking-wider text-white">
              {editingEmpId ? `EDITAR FUNCIONÁRIO (ID: ${editingEmpId})` : "CADASTRAR NOVO FUNCIONÁRIO"}
            </h3>
          </div>
        </div>

        <form onSubmit={handleSaveEmployee} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-[9px] text-white/40 uppercase font-mono block mb-1">Nome (First Name) *</label>
            <input
              type="text"
              required
              value={empFirstName}
              onChange={(e) => setEmpFirstName(e.target.value)}
              className="w-full text-xs bg-zinc-900 border border-white/10 focus:border-[#00FF66] outline-none px-3 py-2 text-white font-mono"
              placeholder="Ex: João"
            />
          </div>

          <div>
            <label className="text-[9px] text-white/40 uppercase font-mono block mb-1">Sobrenome (Last Name) *</label>
            <input
              type="text"
              required
              value={empLastName}
              onChange={(e) => setEmpLastName(e.target.value)}
              className="w-full text-xs bg-zinc-900 border border-white/10 focus:border-[#00FF66] outline-none px-3 py-2 text-white font-mono"
              placeholder="Ex: Silva"
            />
          </div>

          <div>
            <label className="text-[9px] text-white/40 uppercase font-mono block mb-1">CPF (Apenas números) *</label>
            <input
              type="text"
              required
              value={empCpf}
              onChange={(e) => setEmpCpf(e.target.value)}
              className="w-full text-xs bg-zinc-900 border border-white/10 focus:border-[#00FF66] outline-none px-3 py-2 text-white font-mono"
              placeholder="Ex: 52998224725"
            />
          </div>

          <div>
            <label className="text-[9px] text-white/40 uppercase font-mono block mb-1">E-mail *</label>
            <input
              type="type"
              required
              value={empEmail}
              onChange={(e) => setEmpEmail(e.target.value)}
              className="w-full text-xs bg-zinc-900 border border-white/10 focus:border-[#00FF66] outline-none px-3 py-2 text-white font-mono"
              placeholder="Ex: joao@mail.com"
            />
          </div>

          <div>
            <label className="text-[9px] text-white/40 uppercase font-mono block mb-1">Endereço (Address)</label>
            <input
              type="text"
              value={empAddress}
              onChange={(e) => setEmpAddress(e.target.value)}
              className="w-full text-xs bg-zinc-900 border border-white/10 focus:border-[#00FF66] outline-none px-3 py-2 text-white font-mono"
              placeholder="Ex: 123 Main Street"
            />
          </div>

          <div>
            <label className="text-[9px] text-white/40 uppercase font-mono block mb-1">Nível de Acesso (Cargo) *</label>
            <select
              value={empRole}
              onChange={(e) => setEmpRole(e.target.value)}
              className="w-full text-xs bg-zinc-900 border border-white/10 focus:border-[#00FF66] outline-none px-3 py-2 text-white font-mono"
            >
              <option value="ROLE_EMPLOYEE">Funcionário</option>
              <option value="ROLE_ADMIN">Administrador</option>
            </select>
          </div>

          {!editingEmpId && (
            <div className="sm:col-span-2">
              <label className="text-[9px] text-white/40 uppercase font-mono block mb-1">Senha Inicial (Password)</label>
              <input
                type="password"
                value={empPassword}
                onChange={(e) => setEmpPassword(e.target.value)}
                className="w-full text-xs bg-zinc-900 border border-white/10 focus:border-[#00FF66] outline-none px-3 py-2 text-white font-mono"
                placeholder="Em branco para gerar hash padrão"
              />
            </div>
          )}

          <div className="sm:col-span-2 flex gap-2.5 pt-2">
            <button
              type="submit"
              className="flex-1 py-3 bg-[#00FF66] hover:bg-white text-black font-bold uppercase text-xs tracking-wider transition-all cursor-pointer"
            >
              {editingEmpId ? "Atualizar Funcionário" : "Registrar Funcionário"}
            </button>
            {editingEmpId && (
              <button
                type="button"
                onClick={clearEmployeeForm}
                className="px-4 py-3 bg-zinc-900 border border-white/10 hover:border-white text-white font-bold uppercase text-xs"
              >
                Cancelar
              </button>
            )}
          </div>
        </form>
      </div>

      {/* SEARCH & FILTER LISTING */}
      <div className="bg-zinc-950 border border-white/10 p-5">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-4 mb-4">
          <h4 className="font-bold text-xs uppercase tracking-wider font-mono text-white">Filtros &amp; Consultas</h4>
          
          <div className="flex flex-wrap items-center gap-2">
            {/* CPF search input */}
            <div className="flex bg-zinc-900 border border-white/10 pl-2 text-xs font-mono">
              <input
                type="text"
                placeholder="Filtrar por CPF"
                value={searchCpf}
                onChange={(e) => setSearchCpf(e.target.value)}
                className="bg-transparent border-none outline-none py-1.5 text-white w-28 text-[11px]"
              />
              <button onClick={handleSearchCpf} className="p-1.5 hover:text-[#00FF66] cursor-pointer">
                <Search className="h-3.5 w-3.5" />
              </button>
            </div>

            {/* ID search input */}
            <div className="flex bg-zinc-900 border border-white/10 pl-2 text-xs font-mono">
              <input
                type="text"
                placeholder="Filtrar por ID"
                value={searchEmpId}
                onChange={(e) => setSearchEmpId(e.target.value)}
                className="bg-transparent border-none outline-none py-1.5 text-white w-24 text-[11px]"
              />
              <button onClick={handleSearchEmpId} className="p-1.5 hover:text-[#00FF66] cursor-pointer">
                <Search className="h-3.5 w-3.5" />
              </button>
            </div>

            <button
              onClick={() => { setSearchCpf(""); setSearchEmpId(""); syncEmployeesList(); }}
              className="px-2.5 py-1.5 bg-zinc-900 border border-white/10 hover:border-white text-[10px] font-mono uppercase"
            >
              Limpar
            </button>
          </div>
        </div>

        {/* Employees Table */}
        <div className="overflow-x-auto">
          {employees.length === 0 ? (
            <div className="py-8 text-center text-white/40 text-xs font-mono">
              Nenhum funcionário encontrado. Clique em "Reset SQL" no cabeçalho ou crie um novo.
            </div>
          ) : (
            <table className="w-full text-left font-mono text-[11px] border-collapse">
              <thead>
                <tr className="border-b border-white/10 text-white/50 text-[10px] uppercase tracking-wider">
                  <th className="py-2.5">ID</th>
                  <th className="py-2.5">Nome</th>
                  <th className="py-2.5">CPF</th>
                  <th className="py-2.5">E-mail</th>
                  <th className="py-2.5">Cargo</th>
                  <th className="py-2.5 text-right">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {employees.map((emp) => (
                  <tr key={emp.id} className="hover:bg-white/5 group transition-colors">
                    <td className="py-3 font-bold text-white/80">#{emp.id}</td>
                    <td className="py-3 text-white">
                      {emp.firstName} {emp.lastName}
                    </td>
                    <td className="py-3 text-white/70">{emp.cpf}</td>
                    <td className="py-3 text-white/70">{emp.email}</td>
                    <td className="py-3">
                      <span className={`px-1.5 py-0.5 text-[9px] border uppercase ${
                        emp.role === "ROLE_ADMIN"
                          ? "bg-purple-950/20 text-purple-400 border-purple-900/30 font-bold"
                          : "bg-zinc-900 text-white/80 border-white/10"
                      }`}>
                        {(emp.role || "").replace("ROLE_", "") || "NO ROLE"}
                      </span>
                    </td>
                    <td className="py-3 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => handleEditEmpClick(emp)}
                          className="p-1.5 hover:bg-[#00FF66]/10 text-white/60 hover:text-[#00FF66] cursor-pointer"
                          title="Editar"
                        >
                          <Edit3 className="h-3.5 w-3.5" />
                        </button>
                        <button
                          onClick={() => handleDeleteEmployee(emp.id)}
                          className="p-1.5 hover:bg-red-950/30 text-white/60 hover:text-red-500 cursor-pointer"
                          title="Excluir"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
