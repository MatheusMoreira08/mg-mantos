import { useState, useRef } from "react";
import { buscarEnderecoPorCep, formatarCep } from "../services/viaCepService";
import { useToast } from "../context/ToastContext";

export default function AddressForm({
  onSalvar,
  onCancelar,
  salvando = false,
  titulo = "Adicionar Novo Endereço",
  submitLabel = "SALVAR ENDEREÇO",
}) {
  const [form, setForm] = useState({
    cep: "",
    rua: "",
    numero: "",
    bairro: "",
    cidade: "",
    estado: "",
  });
  const [buscandoCep, setBuscandoCep] = useState(false);
  const { showToast } = useToast();
  const inputNumeroRef = useRef(null);

  const handleCepChange = async (e) => {
    const valorFormatado = formatarCep(e.target.value);
    setForm((prev) => ({ ...prev, cep: valorFormatado }));

    const cepLimpo = valorFormatado.replace(/\D/g, "");
    if (cepLimpo.length === 8) {
      setBuscandoCep(true);
      try {
        const dados = await buscarEnderecoPorCep(cepLimpo);
        setForm((prev) => ({
          ...prev,
          rua: dados.rua || prev.rua,
          bairro: dados.bairro || prev.bairro,
          cidade: dados.cidade || prev.cidade,
          estado: dados.estado || prev.estado,
        }));
        showToast("Endereço localizado via CEP!", "success");
        setTimeout(() => {
          inputNumeroRef.current?.focus();
        }, 100);
      } catch (err) {
        showToast(err.message || "Não foi possível localizar o CEP.", "warning");
      } finally {
        setBuscandoCep(false);
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.cep || !form.rua || !form.numero || !form.bairro || !form.cidade || !form.estado) {
      showToast("Por favor, preencha todos os campos do endereço.", "warning");
      return;
    }
    onSalvar(form);
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "14px",
      }}
    >
      {titulo && (
        <h3
          style={{
            fontSize: "15px",
            fontWeight: "900",
            margin: "0 0 4px 0",
            textTransform: "uppercase",
            color: "var(--text-primary)",
          }}
        >
          📍 {titulo}
        </h3>
      )}

      {/* CEP */}
      <div style={{ position: "relative" }}>
        <input
          id="input-cep"
          type="text"
          placeholder="CEP (ex: 00000-000)"
          value={form.cep}
          onChange={handleCepChange}
          maxLength={9}
          required
          style={{
            width: "100%",
            padding: "12px",
            border: "1px solid var(--border)",
            borderRadius: "var(--radius-md)",
            backgroundColor: "var(--bg-primary)",
            color: "var(--text-primary)",
            fontSize: "14px",
            outline: "none",
            boxSizing: "border-box",
          }}
        />
        {buscandoCep && (
          <span
            style={{
              position: "absolute",
              right: "12px",
              top: "50%",
              transform: "translateY(-50%)",
              fontSize: "12px",
              color: "var(--accent)",
              fontWeight: "bold",
            }}
          >
            Buscando CEP...
          </span>
        )}
      </div>

      {/* Logradouro */}
      <input
        id="input-rua"
        type="text"
        placeholder="Rua / Logradouro / Avenida"
        value={form.rua}
        onChange={(e) => setForm({ ...form, rua: e.target.value })}
        required
        style={{
          width: "100%",
          padding: "12px",
          border: "1px solid var(--border)",
          borderRadius: "var(--radius-md)",
          backgroundColor: "var(--bg-primary)",
          color: "var(--text-primary)",
          fontSize: "14px",
          outline: "none",
          boxSizing: "border-box",
        }}
      />

      {/* Número e Bairro */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: "10px" }}>
        <input
          id="input-numero"
          ref={inputNumeroRef}
          type="text"
          placeholder="Número"
          value={form.numero}
          onChange={(e) => setForm({ ...form, numero: e.target.value })}
          required
          style={{
            width: "100%",
            padding: "12px",
            border: "1px solid var(--border)",
            borderRadius: "var(--radius-md)",
            backgroundColor: "var(--bg-primary)",
            color: "var(--text-primary)",
            fontSize: "14px",
            outline: "none",
            boxSizing: "border-box",
          }}
        />
        <input
          id="input-bairro"
          type="text"
          placeholder="Bairro"
          value={form.bairro}
          onChange={(e) => setForm({ ...form, bairro: e.target.value })}
          required
          style={{
            width: "100%",
            padding: "12px",
            border: "1px solid var(--border)",
            borderRadius: "var(--radius-md)",
            backgroundColor: "var(--bg-primary)",
            color: "var(--text-primary)",
            fontSize: "14px",
            outline: "none",
            boxSizing: "border-box",
          }}
        />
      </div>

      {/* Cidade e UF */}
      <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "10px" }}>
        <input
          id="input-cidade"
          type="text"
          placeholder="Cidade"
          value={form.cidade}
          onChange={(e) => setForm({ ...form, cidade: e.target.value })}
          required
          style={{
            width: "100%",
            padding: "12px",
            border: "1px solid var(--border)",
            borderRadius: "var(--radius-md)",
            backgroundColor: "var(--bg-primary)",
            color: "var(--text-primary)",
            fontSize: "14px",
            outline: "none",
            boxSizing: "border-box",
          }}
        />
        <input
          id="input-estado"
          type="text"
          placeholder="UF (ex: SP)"
          value={form.estado}
          maxLength={2}
          onChange={(e) => setForm({ ...form, estado: e.target.value.toUpperCase() })}
          required
          style={{
            width: "100%",
            padding: "12px",
            border: "1px solid var(--border)",
            borderRadius: "var(--radius-md)",
            backgroundColor: "var(--bg-primary)",
            color: "var(--text-primary)",
            fontSize: "14px",
            outline: "none",
            boxSizing: "border-box",
            textTransform: "uppercase",
          }}
        />
      </div>

      {/* Botões de Ação */}
      <div style={{ display: "flex", gap: "10px", marginTop: "6px" }}>
        <button
          type="submit"
          disabled={salvando || buscandoCep}
          style={{
            flex: 1,
            backgroundColor: salvando || buscandoCep ? "var(--bg-card-hover)" : "var(--accent)",
            color: "var(--text-primary)",
            padding: "14px",
            border: "none",
            borderRadius: "var(--radius-md)",
            fontWeight: "900",
            fontSize: "13px",
            cursor: salvando || buscandoCep ? "not-allowed" : "pointer",
            textTransform: "uppercase",
            letterSpacing: "0.04em",
          }}
        >
          {salvando ? "SALVANDO..." : submitLabel}
        </button>
        {onCancelar && (
          <button
            type="button"
            onClick={onCancelar}
            style={{
              flex: 1,
              backgroundColor: "transparent",
              color: "var(--text-secondary)",
              border: "1px solid var(--border)",
              padding: "14px",
              borderRadius: "var(--radius-md)",
              fontWeight: "bold",
              fontSize: "13px",
              cursor: "pointer",
              textTransform: "uppercase",
            }}
          >
            CANCELAR
          </button>
        )}
      </div>
    </form>
  );
}
