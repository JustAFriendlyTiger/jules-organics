"use client";

import { useEffect, useReducer, useState } from "react";
import type { Product, SiteSettings } from "@/lib/data";

/* ─── constants ─── */
const REPO_OWNER = "justafriendlytiger";
const REPO_NAME  = "jules-organics";
const PRODUCTS_PATH = "public/data/products.json";
const SETTINGS_PATH = "public/data/settings.json";
const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

/* ─── password helpers ─── */
async function sha256(text: string): Promise<string> {
  const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(text));
  return Array.from(new Uint8Array(buf)).map((b) => b.toString(16).padStart(2, "0")).join("");
}
const DEFAULT_HASH = "8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918"; // "admin"

/* ─── github api helpers ─── */
async function ghGet(path: string, token: string) {
  const r = await fetch(`https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/${path}`, {
    headers: { Authorization: `Bearer ${token}`, Accept: "application/vnd.github+json" },
  });
  if (!r.ok) throw new Error(`GitHub GET failed: ${r.status}`);
  return r.json();
}

async function ghPut(path: string, token: string, content: string, sha: string, message: string) {
  const r = await fetch(`https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/${path}`, {
    method: "PUT",
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    body: JSON.stringify({ message, content: btoa(unescape(encodeURIComponent(content))), sha }),
  });
  if (!r.ok) {
    const err = await r.json().catch(() => ({}));
    throw new Error((err as { message?: string }).message ?? `GitHub PUT failed: ${r.status}`);
  }
  return r.json();
}

/* ─── blank product template ─── */
function blankProduct(): Product {
  return {
    id: Date.now().toString(),
    slug: "",
    name: "",
    price: 0,
    description: "",
    details: [""],
    image: "",
    category: "tallow",
    featured: false,
    stripePriceId: "",
  };
}

/* ─── styles ─── */
const s = {
  wrap:   { minHeight: "100vh", backgroundColor: "#FAF8FC", fontFamily: "ui-sans-serif,system-ui,sans-serif" } as const,
  card:   { background: "#fff", border: "1px solid #DDD0E8", borderRadius: 8, padding: 32 } as const,
  input:  { width: "100%", padding: "8px 12px", border: "1px solid #DDD0E8", borderRadius: 4, fontSize: 14, outline: "none", backgroundColor: "#fff" } as const,
  label:  { display: "block", fontSize: 11, fontWeight: 500, letterSpacing: "0.12em", textTransform: "uppercase" as const, color: "#8A7A8E", marginBottom: 4 },
  btn:    (color = "#8B6A8A") => ({ background: color, color: "#fff", border: "none", borderRadius: 4, padding: "8px 20px", fontSize: 13, fontWeight: 500, cursor: "pointer", letterSpacing: "0.05em" }),
  btnGhost: { background: "transparent", color: "#8B6A8A", border: "1px solid #DDD0E8", borderRadius: 4, padding: "8px 20px", fontSize: 13, fontWeight: 500, cursor: "pointer" } as const,
  danger: { background: "transparent", color: "#c0392b", border: "1px solid #e74c3c", borderRadius: 4, padding: "6px 14px", fontSize: 12, cursor: "pointer" } as const,
  row:    { display: "flex", gap: 12, alignItems: "flex-start" } as const,
  tab:    (active: boolean) => ({ padding: "8px 20px", fontSize: 13, fontWeight: 500, cursor: "pointer", border: "none", borderBottom: active ? "2px solid #8B6A8A" : "2px solid transparent", background: "transparent", color: active ? "#5D3F6A" : "#8A7A8E" }),
  notice: (type: "ok"|"err") => ({ padding: "10px 16px", borderRadius: 4, fontSize: 13, marginBottom: 16, background: type === "ok" ? "#e8f5e9" : "#fdecea", color: type === "ok" ? "#2e7d32" : "#c62828" }),
};

/* ─── component ─── */
type Tab = "products" | "settings" | "deploy";

export default function AdminPanel() {
  const [authed, setAuthed]         = useState(false);
  const [pwInput, setPwInput]       = useState("");
  const [pwError, setPwError]       = useState("");
  const [tab, setTab]               = useState<Tab>("products");
  const [products, setProducts]     = useState<Product[]>([]);
  const [settings, setSettings]     = useState<SiteSettings | null>(null);
  const [editing, setEditing]       = useState<Product | null>(null);
  const [isNew, setIsNew]           = useState(false);
  const [token, setToken]           = useState("");
  const [status, setStatus]         = useState<{ type: "ok"|"err"; msg: string } | null>(null);
  const [saving, setSaving]         = useState(false);
  const [loadError, setLoadError]   = useState("");
  const [changePw, setChangePw]     = useState({ old: "", next: "", confirm: "" });
  const [, forceUpdate]             = useReducer((x: number) => x + 1, 0);

  /* load token from localStorage */
  useEffect(() => {
    const saved = localStorage.getItem("jo-admin-token");
    if (saved) setToken(saved);
  }, []);

  /* ── login ── */
  async function handleLogin() {
    const stored = localStorage.getItem("jo-admin-hash") ?? DEFAULT_HASH;
    const hash = await sha256(pwInput);
    if (hash === stored) { setAuthed(true); setPwError(""); }
    else setPwError("Incorrect password.");
  }

  /* ── load data from GitHub ── */
  async function loadData() {
    if (!token) return setLoadError("Enter a GitHub token in the Deploy tab first.");
    setLoadError("");
    try {
      const [pFile, sFile] = await Promise.all([
        ghGet(PRODUCTS_PATH, token),
        ghGet(SETTINGS_PATH, token),
      ]);
      setProducts(JSON.parse(atob(pFile.content.replace(/\n/g, ""))));
      setSettings(JSON.parse(atob(sFile.content.replace(/\n/g, ""))));
      setStatus({ type: "ok", msg: "Data loaded from GitHub." });
    } catch (e) {
      setLoadError(String(e));
    }
  }

  /* ── save data to GitHub ── */
  async function saveData(what: "products" | "settings") {
    if (!token) return setStatus({ type: "err", msg: "Add your GitHub token in the Deploy tab first." });
    setSaving(true);
    setStatus(null);
    try {
      if (what === "products") {
        const file = await ghGet(PRODUCTS_PATH, token);
        await ghPut(PRODUCTS_PATH, token, JSON.stringify(products, null, 2), file.sha, "Update products via admin panel");
      } else {
        const file = await ghGet(SETTINGS_PATH, token);
        await ghPut(SETTINGS_PATH, token, JSON.stringify(settings, null, 2), file.sha, "Update settings via admin panel");
      }
      setStatus({ type: "ok", msg: `✓ Saved! GitHub Actions will rebuild the site in ~2 minutes.` });
    } catch (e) {
      setStatus({ type: "err", msg: String(e) });
    } finally {
      setSaving(false);
    }
  }

  /* ── change password ── */
  async function handleChangePw() {
    const stored = localStorage.getItem("jo-admin-hash") ?? DEFAULT_HASH;
    if (await sha256(changePw.old) !== stored) return setStatus({ type: "err", msg: "Current password is wrong." });
    if (changePw.next.length < 6) return setStatus({ type: "err", msg: "New password must be at least 6 characters." });
    if (changePw.next !== changePw.confirm) return setStatus({ type: "err", msg: "Passwords don't match." });
    localStorage.setItem("jo-admin-hash", await sha256(changePw.next));
    setChangePw({ old: "", next: "", confirm: "" });
    setStatus({ type: "ok", msg: "Password changed." });
  }

  /* ── product helpers ── */
  function saveProduct(p: Product) {
    const slug = p.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
    const updated = { ...p, slug: p.slug || slug };
    if (isNew) setProducts((prev) => [...prev, updated]);
    else setProducts((prev) => prev.map((x) => x.id === updated.id ? updated : x));
    setEditing(null);
  }

  function deleteProduct(id: string) {
    if (!confirm("Delete this product?")) return;
    setProducts((prev) => prev.filter((p) => p.id !== id));
  }

  /* ─── LOGIN SCREEN ─── */
  if (!authed) {
    return (
      <div style={{ ...s.wrap, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ ...s.card, width: 360, textAlign: "center" }}>
          <p style={{ fontFamily: "Georgia,serif", fontSize: 22, color: "#1C1A20", marginBottom: 4 }}>Jules Organics</p>
          <p style={{ fontSize: 12, color: "#8A7A8E", marginBottom: 24, letterSpacing: "0.1em", textTransform: "uppercase" }}>Admin Panel</p>
          {pwError && <p style={s.notice("err")}>{pwError}</p>}
          <div style={{ marginBottom: 12 }}>
            <label style={s.label}>Password</label>
            <input
              type="password"
              style={s.input}
              value={pwInput}
              onChange={(e) => setPwInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleLogin()}
              placeholder="Enter admin password"
              autoFocus
            />
          </div>
          <button style={{ ...s.btn(), width: "100%", padding: "10px" }} onClick={handleLogin}>
            Log In
          </button>
          <p style={{ fontSize: 11, color: "#8A7A8E", marginTop: 16 }}>
            Default password: <strong>admin</strong> — change it in the Deploy tab after login.
          </p>
        </div>
      </div>
    );
  }

  /* ─── ADMIN DASHBOARD ─── */
  return (
    <div style={s.wrap}>
      {/* Header */}
      <div style={{ background: "#1A0A2E", padding: "12px 32px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <p style={{ color: "#FAF8FC", fontFamily: "Georgia,serif", fontSize: 16, letterSpacing: "0.05em" }}>Jules Organics — Admin</p>
        <button style={{ ...s.btnGhost, color: "#C8B8DC", borderColor: "#3D2060", fontSize: 12 }} onClick={() => setAuthed(false)}>
          Log Out
        </button>
      </div>

      <div style={{ maxWidth: 960, margin: "0 auto", padding: "32px 24px" }}>
        {status && (
          <div style={s.notice(status.type)}>
            {status.msg}
            <button onClick={() => setStatus(null)} style={{ float: "right", background: "none", border: "none", cursor: "pointer", fontSize: 14, color: "inherit" }}>✕</button>
          </div>
        )}

        {/* Tabs */}
        <div style={{ borderBottom: "1px solid #DDD0E8", marginBottom: 28, display: "flex", gap: 0 }}>
          {(["products", "settings", "deploy"] as Tab[]).map((t) => (
            <button key={t} style={s.tab(tab === t)} onClick={() => setTab(t)}>
              {t.charAt(0).toUpperCase() + t.slice(1)}
            </button>
          ))}
        </div>

        {/* ══ PRODUCTS TAB ══ */}
        {tab === "products" && (
          <>
            {!products.length && !loadError && (
              <div style={{ ...s.card, textAlign: "center", padding: 40 }}>
                <p style={{ color: "#8A7A8E", marginBottom: 16 }}>No products loaded. Connect GitHub in the Deploy tab then load data.</p>
                <button style={s.btn()} onClick={loadData}>Load from GitHub</button>
              </div>
            )}
            {loadError && <p style={s.notice("err")}>{loadError}</p>}

            {products.length > 0 && !editing && (
              <>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
                  <h2 style={{ fontSize: 18, fontFamily: "Georgia,serif", color: "#1C1A20" }}>Products ({products.length})</h2>
                  <div style={{ display: "flex", gap: 10 }}>
                    <button style={s.btnGhost} onClick={loadData}>Reload</button>
                    <button style={s.btn()} onClick={() => { setEditing(blankProduct()); setIsNew(true); }}>+ Add Product</button>
                  </div>
                </div>

                <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
                  <thead>
                    <tr style={{ borderBottom: "1px solid #DDD0E8" }}>
                      {["Name", "Price", "Category", "Featured", ""].map((h) => (
                        <th key={h} style={{ textAlign: "left", padding: "8px 12px", fontSize: 11, color: "#8A7A8E", letterSpacing: "0.1em", textTransform: "uppercase", fontWeight: 500 }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {products.map((p) => (
                      <tr key={p.id} style={{ borderBottom: "1px solid #F0EAF6" }}>
                        <td style={{ padding: "10px 12px", color: "#1C1A20" }}>{p.name}</td>
                        <td style={{ padding: "10px 12px", color: "#8A7A8E" }}>${p.price.toFixed(2)}</td>
                        <td style={{ padding: "10px 12px", color: "#8A7A8E" }}>{p.category}</td>
                        <td style={{ padding: "10px 12px" }}>
                          <span style={{ fontSize: 18 }}>{p.featured ? "★" : "☆"}</span>
                        </td>
                        <td style={{ padding: "10px 12px", textAlign: "right" }}>
                          <div style={{ display: "flex", gap: 8, justifyContent: "flex-end" }}>
                            <button style={s.btnGhost} onClick={() => { setEditing({ ...p }); setIsNew(false); }}>Edit</button>
                            <button style={s.danger} onClick={() => deleteProduct(p.id)}>Delete</button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                <div style={{ marginTop: 24, display: "flex", justifyContent: "flex-end" }}>
                  <button style={s.btn()} onClick={() => saveData("products")} disabled={saving}>
                    {saving ? "Saving…" : "Save & Publish Products"}
                  </button>
                </div>
              </>
            )}

            {/* Product editor */}
            {editing && <ProductEditor product={editing} isNew={isNew} onSave={saveProduct} onCancel={() => setEditing(null)} />}
          </>
        )}

        {/* ══ SETTINGS TAB ══ */}
        {tab === "settings" && (
          <>
            {!settings && (
              <div style={{ ...s.card, textAlign: "center", padding: 40 }}>
                <p style={{ color: "#8A7A8E", marginBottom: 16 }}>Connect GitHub in the Deploy tab then load data.</p>
                <button style={s.btn()} onClick={loadData}>Load from GitHub</button>
              </div>
            )}
            {settings && (
              <SettingsEditor
                settings={settings}
                onChange={setSettings}
                onSave={() => saveData("settings")}
                saving={saving}
              />
            )}
          </>
        )}

        {/* ══ DEPLOY TAB ══ */}
        {tab === "deploy" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            {/* GitHub Token */}
            <div style={s.card}>
              <h3 style={{ fontSize: 15, fontFamily: "Georgia,serif", color: "#1C1A20", marginBottom: 16 }}>GitHub Access Token</h3>
              <p style={{ fontSize: 13, color: "#8A7A8E", marginBottom: 16, lineHeight: 1.6 }}>
                To save changes to your site, you need a GitHub Personal Access Token (PAT).
                Go to <strong>GitHub → Settings → Developer Settings → Personal Access Tokens → Fine-grained tokens</strong>.
                Create a token with <strong>Contents: Read &amp; Write</strong> permission on the <em>jules-organics</em> repo.
              </p>
              <div style={{ marginBottom: 12 }}>
                <label style={s.label}>Personal Access Token</label>
                <input
                  type="password"
                  style={s.input}
                  value={token}
                  onChange={(e) => { setToken(e.target.value); localStorage.setItem("jo-admin-token", e.target.value); }}
                  placeholder="github_pat_..."
                />
              </div>
              <div style={{ display: "flex", gap: 10 }}>
                <button style={s.btn()} onClick={loadData}>Connect & Load Data</button>
                {token && <button style={s.danger} onClick={() => { setToken(""); localStorage.removeItem("jo-admin-token"); forceUpdate(); }}>Clear Token</button>}
              </div>
              <p style={{ fontSize: 11, color: "#8A7A8E", marginTop: 12 }}>
                Your token is stored only in your browser and sent only to api.github.com.
              </p>
            </div>

            {/* How it works */}
            <div style={s.card}>
              <h3 style={{ fontSize: 15, fontFamily: "Georgia,serif", color: "#1C1A20", marginBottom: 12 }}>How Publishing Works</h3>
              <ol style={{ fontSize: 13, color: "#8A7A8E", lineHeight: 2, paddingLeft: 20 }}>
                <li>Edit products or settings in the Products / Settings tabs.</li>
                <li>Click <strong>Save &amp; Publish</strong> — this commits the JSON files to GitHub.</li>
                <li>GitHub Actions automatically rebuilds the site (~2 minutes).</li>
                <li>Your changes go live at <strong>justafriendlytiger.github.io/jules-organics</strong>.</li>
              </ol>
            </div>

            {/* Change password */}
            <div style={s.card}>
              <h3 style={{ fontSize: 15, fontFamily: "Georgia,serif", color: "#1C1A20", marginBottom: 16 }}>Change Admin Password</h3>
              {(["old","next","confirm"] as const).map((f) => (
                <div key={f} style={{ marginBottom: 10 }}>
                  <label style={s.label}>{f === "old" ? "Current Password" : f === "next" ? "New Password" : "Confirm New Password"}</label>
                  <input type="password" style={s.input} value={changePw[f]} onChange={(e) => setChangePw((p) => ({ ...p, [f]: e.target.value }))} />
                </div>
              ))}
              <button style={s.btn()} onClick={handleChangePw}>Update Password</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/* ─── ProductEditor sub-component ─── */
function ProductEditor({ product, isNew, onSave, onCancel }: {
  product: Product; isNew: boolean;
  onSave: (p: Product) => void; onCancel: () => void;
}) {
  const [p, setP] = useState({ ...product });

  const set = (key: keyof Product, val: unknown) => setP((prev) => ({ ...prev, [key]: val }));

  function setDetail(i: number, val: string) {
    const d = [...p.details];
    d[i] = val;
    set("details", d);
  }

  const s2 = {
    grid2: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 } as const,
  };

  return (
    <div style={{ border: "1px solid #DDD0E8", borderRadius: 8, padding: 28, background: "#fff" }}>
      <h3 style={{ fontSize: 16, fontFamily: "Georgia,serif", color: "#1C1A20", marginBottom: 20 }}>
        {isNew ? "Add New Product" : `Edit: ${product.name}`}
      </h3>

      <div style={s2.grid2}>
        <Field label="Product Name">
          <input style={s.input} value={p.name} onChange={(e) => set("name", e.target.value)} />
        </Field>
        <Field label="Price ($)">
          <input style={s.input} type="number" step="0.01" value={p.price} onChange={(e) => set("price", parseFloat(e.target.value) || 0)} />
        </Field>
        <Field label="Category">
          <select style={s.input} value={p.category} onChange={(e) => set("category", e.target.value)}>
            {["lip-balm","tallow","eye-cream","body"].map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
        </Field>
        <Field label="Image URL">
          <input style={s.input} value={p.image} onChange={(e) => set("image", e.target.value)} placeholder="/jules-organics/products/name.jpg" />
        </Field>
      </div>

      <Field label="Description" style={{ marginTop: 14 }}>
        <textarea style={{ ...s.input, height: 80, resize: "vertical" }} value={p.description} onChange={(e) => set("description", e.target.value)} />
      </Field>

      <Field label="Ingredients / Details" style={{ marginTop: 14 }}>
        {p.details.map((d, i) => (
          <div key={i} style={{ display: "flex", gap: 8, marginBottom: 6 }}>
            <input style={{ ...s.input, flex: 1 }} value={d} onChange={(e) => setDetail(i, e.target.value)} placeholder={`Ingredient ${i + 1}`} />
            <button style={s.danger} onClick={() => set("details", p.details.filter((_, j) => j !== i))}>✕</button>
          </div>
        ))}
        <button style={s.btnGhost} onClick={() => set("details", [...p.details, ""])}>+ Add Ingredient</button>
      </Field>

      <div style={{ marginTop: 14, display: "flex", alignItems: "center", gap: 10 }}>
        <Field label="Stripe Price ID (optional)" style={{ flex: 1 }}>
          <input style={s.input} value={p.stripePriceId ?? ""} onChange={(e) => set("stripePriceId", e.target.value)} placeholder="price_..." />
        </Field>
        <label style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13, color: "#8A7A8E", marginTop: 18, whiteSpace: "nowrap", cursor: "pointer" }}>
          <input type="checkbox" checked={!!p.featured} onChange={(e) => set("featured", e.target.checked)} />
          Featured on homepage
        </label>
      </div>

      <div style={{ display: "flex", gap: 10, marginTop: 24 }}>
        <button style={s.btn()} onClick={() => onSave(p)}>{isNew ? "Add Product" : "Save Changes"}</button>
        <button style={s.btnGhost} onClick={onCancel}>Cancel</button>
      </div>
    </div>
  );
}

/* ─── SettingsEditor sub-component ─── */
function SettingsEditor({ settings, onChange, onSave, saving }: {
  settings: SiteSettings;
  onChange: (s: SiteSettings) => void;
  onSave: () => void;
  saving: boolean;
}) {
  const set = (key: keyof SiteSettings, val: string) => onChange({ ...settings, [key]: val });

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <div style={{ border: "1px solid #DDD0E8", borderRadius: 8, padding: 28, background: "#fff" }}>
        <h3 style={{ fontSize: 16, fontFamily: "Georgia,serif", color: "#1C1A20", marginBottom: 20 }}>Site Settings</h3>

        <Field label="Announcement Bar Text">
          <input style={s.input} value={settings.announcement} onChange={(e) => set("announcement", e.target.value)} />
        </Field>

        <div style={{ marginTop: 20, paddingTop: 20, borderTop: "1px solid #F0EAF6" }}>
          <p style={{ ...s.label, marginBottom: 12 }}>Hero Section</p>
          <Field label="Small Label (above headline)">
            <input style={s.input} value={settings.heroLabel} onChange={(e) => set("heroLabel", e.target.value)} />
          </Field>
          <Field label="Headline (use \\n for line breaks)" style={{ marginTop: 12 }}>
            <textarea style={{ ...s.input, height: 80, resize: "vertical" }} value={settings.heroHeadline} onChange={(e) => set("heroHeadline", e.target.value)} />
          </Field>
          <Field label="Button Text" style={{ marginTop: 12 }}>
            <input style={s.input} value={settings.heroButton} onChange={(e) => set("heroButton", e.target.value)} />
          </Field>
        </div>

        <div style={{ marginTop: 20, paddingTop: 20, borderTop: "1px solid #F0EAF6" }}>
          <p style={{ ...s.label, marginBottom: 12 }}>Mission Section</p>
          <Field label="Headline">
            <input style={s.input} value={settings.missionHeadline} onChange={(e) => set("missionHeadline", e.target.value)} />
          </Field>
          <Field label="Body Text" style={{ marginTop: 12 }}>
            <textarea style={{ ...s.input, height: 100, resize: "vertical" }} value={settings.missionBody} onChange={(e) => set("missionBody", e.target.value)} />
          </Field>
        </div>

        <div style={{ marginTop: 24, display: "flex", justifyContent: "flex-end" }}>
          <button style={s.btn()} onClick={onSave} disabled={saving}>
            {saving ? "Saving…" : "Save & Publish Settings"}
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─── Field helper ─── */
function Field({ label, children, style }: { label: string; children: React.ReactNode; style?: React.CSSProperties }) {
  return (
    <div style={style}>
      <label style={s.label}>{label}</label>
      {children}
    </div>
  );
}
