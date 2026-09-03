import { useState, useEffect, useCallback } from "react";
import { useToast } from "../../context/ToastContext";
import {
  listarProdutos,
  atualizarProduto,
  criarProduto,
  excluirProduto,
  uploadImagemProduto,
} from "../../services/adminService";

const estiloInput = {
  padding: "8px 10px",
  border: "1px solid var(--border)",
  borderRadius: "var(--radius-md)",
  backgroundColor: "var(--bg-primary)",
  color: "var(--text-primary)",
  outline: "none",
  fontSize: "13px",
};

/** Lista e gerencia o catálogo de camisas (preço, estoque, cadastro). */
export default function Produtos() {
  const { showToast } = useToast();

  const [produtos, setProdutos] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [salvando, setSalvando] = useState(false);

  const [form, setForm] = useState({
    name: "",
    price: "",
    stock: "",
    description: "",
    sizes: "",
  });
  const [arquivoImagem, setArquivoImagem] = useState(null);
  const [previewImagem, setPreviewImagem] = useState(null);

  const carregar = useCallback(async () => {
    setCarregando(true);
    try {
      const dados = await listarProdutos();
      setProdutos(dados);
    } catch {
      showToast("Erro ao carregar produtos.", "error");
    } finally {
      setCarregando(false);
    }
  }, [showToast]);

  useEffect(() => {
    let ativo = true;

    listarProdutos()
      .then((dados) => {
        if (ativo) setProdutos(dados || []);
      })
      .catch(() => {
        if (ativo) setProdutos([]);
      })
      .finally(() => {
        if (ativo) setCarregando(false);
      });

    return () => {
      ativo = false;
    };
  }, []);

  // Edição rápida (preço/estoque) via onBlur.
  const salvarCampo = async (id, campo, valor) => {
    try {
      await atualizarProduto(id, { [campo]: valor });
      showToast("Atualizado com sucesso!", "success");
      setProdutos((prev) =>
        prev.map((p) => (String(p.id) === String(id) ? { ...p, [campo]: valor } : p)),
      );
    } catch {
      showToast("Erro ao atualizar.", "error");
    }
  };

  const alternarAtivo = async (produto) => {
    try {
      await atualizarProduto(produto.id, { is_active: !produto.is_active });
      await carregar();
    } catch {
      showToast("Erro ao alterar status.", "error");
    }
  };

  const handleRemover = async (produto) => {
    if (!window.confirm(`Excluir "${produto.name}"?`)) return;
    try {
      await excluirProduto(produto.id);
      showToast("Produto excluído.", "info");
      await carregar();
    } catch {
      showToast("Erro ao excluir.", "error");
    }
  };

  const handleSelecionarImagem = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setArquivoImagem(file);
    setPreviewImagem(URL.createObjectURL(file));
  };

  const handleSalvarNovo = async (e) => {
    e.preventDefault();
    setSalvando(true);
    try {
      let images = [];
      if (arquivoImagem) {
        const url = await uploadImagemProduto(arquivoImagem);
        if (url) images = [url];
      }

      const sizes = String(form.sizes || "")
        .split(",")
        .map((s) => s.trim().toUpperCase())
        .filter(Boolean);

      await criarProduto({
        name: String(form.name || "").trim(),
        description: String(form.description || "").trim(),
        price: Number(form.price) || 0,
        stock: Number(form.stock) || 0,
        sizes,
        images,
        image: images[0] || "",
        tags: [],
        is_active: true,
      });

      showToast("Produto cadastrado!", "success");
      setMostrarModal(false);
      setForm({ name: "", price: "", stock: "", description: "", sizes: "" });
      setArquivoImagem(null);
      setPreviewImagem(null);
      await carregar();
    } catch (err) {
      console.error("[admin] Erro ao criar produto:", err);
      showToast(err.message || "Erro ao cadastrar produto.", "error");
    } finally {
      setSalvando(false);
    }
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "24px",
        }}
      >
        <h1 style={{ margin: 0, fontSize: "24px", fontWeight: "900", textTransform: "uppercase" }}>
          Produtos ({produtos.length})
        </h1>
        <button
          onClick={() => setMostrarModal(true)}
          style={{
            backgroundColor: "var(--accent)",
            color: "var(--text-primary)",
            border: "none",
            padding: "12px 20px",
            borderRadius: "var(--radius-md)",
            fontWeight: "900",
            cursor: "pointer",
          }}
        >
          + Cadastrar Produto
        </button>
      </div>

      {carregando ? (
        <p style={{ color: "var(--text-secondary)" }}>Carregando...</p>
      ) : (
        <div style={{ overflowX: "auto" }}>
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              fontSize: "13px",
            }}
          >
            <thead>
              <tr style={{ textAlign: "left", color: "var(--text-secondary)", borderBottom: "1px solid var(--border)" }}>
                <th style={{ padding: "8px" }}></th>
                <th style={{ padding: "8px" }}>Título</th>
                <th style={{ padding: "8px" }}>Preço (R$)</th>
                <th style={{ padding: "8px" }}>Estoque</th>
                <th style={{ padding: "8px" }}>Status</th>
                <th style={{ padding: "8px" }}>Ações</th>
              </tr>
            </thead>
            <tbody>
              {produtos.map((p) => {
                const imagem = p.image || (Array.isArray(p.images) && p.images[0]) || "";
                const imgSrc = imagem ? `/${String(imagem).replace(/^\//, "")}` : "/placeholder-camisa.png";
                return (
                  <tr key={p.id} style={{ borderBottom: "1px solid var(--border)" }}>
                    <td style={{ padding: "8px" }}>
                      <img
                        src={imgSrc}
                        alt={p.name}
                        style={{ width: "40px", height: "40px", objectFit: "contain", borderRadius: "var(--radius-sm)" }}
                        onError={(e) => { e.currentTarget.src = "/placeholder-camisa.png"; }}
                      />
                    </td>
                    <td style={{ padding: "8px", color: "var(--text-primary)" }}>{p.name}</td>
                    <td style={{ padding: "8px" }}>
                      <input
                        type="number"
                        step="0.01"
                        min="0"
                        defaultValue={p.price}
                        onBlur={(e) => {
                          const v = Number(e.target.value);
                          if (Number.isFinite(v) && v !== Number(p.price)) salvarCampo(p.id, "price", v);
                        }}
                        style={{ ...estiloInput, width: "90px" }}
                      />
                    </td>
                    <td style={{ padding: "8px" }}>
                      <input
                        type="number"
                        min="0"
                        defaultValue={p.stock}
                        onBlur={(e) => {
                          const v = Number(e.target.value);
                          if (Number.isFinite(v) && v !== Number(p.stock)) salvarCampo(p.id, "stock", v);
                        }}
                        style={{ ...estiloInput, width: "70px" }}
                      />
                    </td>
                    <td style={{ padding: "8px" }}>
                      <button
                        onClick={() => alternarAtivo(p)}
                        style={{
                          border: "1px solid var(--border)",
                          backgroundColor: "transparent",
                          color: p.is_active ? "var(--success)" : "var(--text-secondary)",
                          padding: "4px 10px",
                          borderRadius: "var(--radius-sm)",
                          cursor: "pointer",
                          fontWeight: "bold",
                          fontSize: "12px",
                        }}
                      >
                        {p.is_active ? "Ativo" : "Inativo"}
                      </button>
                    </td>
                    <td style={{ padding: "8px" }}>
                      <button
                        onClick={() => handleRemover(p)}
                        style={{
                          border: "1px solid var(--error)",
                          backgroundColor: "transparent",
                          color: "var(--error)",
                          padding: "4px 10px",
                          borderRadius: "var(--radius-sm)",
                          cursor: "pointer",
                          fontWeight: "bold",
                          fontSize: "12px",
                        }}
                      >
                        Excluir
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal de cadastro */}
      {mostrarModal && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(0,0,0,0.6)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
            padding: "20px",
          }}
        >
          <form
            onSubmit={handleSalvarNovo}
            style={{
              backgroundColor: "var(--bg-card)",
              border: "1px solid var(--border)",
              borderRadius: "var(--radius-lg)",
              padding: "28px",
              width: "100%",
              maxWidth: "480px",
              display: "flex",
              flexDirection: "column",
              gap: "12px",
              maxHeight: "90vh",
              overflowY: "auto",
            }}
          >
            <h2 style={{ margin: 0, fontSize: "18px", fontWeight: "900" }}>Cadastrar Produto</h2>

            <input
              required
              placeholder="Título do produto"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              style={estiloInput}
            />

            <input
              type="number"
              step="0.01"
              min="0"
              required
              placeholder="Preço (R$)"
              value={form.price}
              onChange={(e) => setForm({ ...form, price: e.target.value })}
              style={estiloInput}
            />

            <input
              type="number"
              min="0"
              placeholder="Estoque"
              value={form.stock}
              onChange={(e) => setForm({ ...form, stock: e.target.value })}
              style={estiloInput}
            />

            <input
              placeholder="Tamanhos (separados por vírgula): P, M, G, GG"
              value={form.sizes}
              onChange={(e) => setForm({ ...form, sizes: e.target.value })}
              style={estiloInput}
            />

            <textarea
              placeholder="Descrição"
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              rows={3}
              style={{ ...estiloInput, resize: "vertical" }}
            />

            <input type="file" accept="image/*" onChange={handleSelecionarImagem} style={{ color: "var(--text-secondary)" }} />
            {previewImagem && (
              <img src={previewImagem} alt="preview" style={{ width: "80px", height: "80px", objectFit: "contain" }} />
            )}

            <div style={{ display: "flex", gap: "10px", marginTop: "8px" }}>
              <button
                type="submit"
                disabled={salvando}
                style={{
                  flex: 1,
                  backgroundColor: salvando ? "var(--bg-card-hover)" : "var(--accent)",
                  color: "var(--text-primary)",
                  border: "none",
                  padding: "12px",
                  borderRadius: "var(--radius-md)",
                  fontWeight: "900",
                  cursor: salvando ? "not-allowed" : "pointer",
                }}
              >
                {salvando ? "SALVANDO..." : "SALVAR"}
              </button>
              <button
                type="button"
                onClick={() => setMostrarModal(false)}
                style={{
                  flex: 1,
                  backgroundColor: "transparent",
                  border: "1px solid var(--border)",
                  color: "var(--text-secondary)",
                  padding: "12px",
                  borderRadius: "var(--radius-md)",
                  fontWeight: "bold",
                  cursor: "pointer",
                }}
              >
                CANCELAR
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}