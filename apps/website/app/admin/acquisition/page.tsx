"use client";

import { useEffect, useMemo, useState } from "react";

const API = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000";

type Candidate = {
  id: string; name: string; category: string; address: string; neighbourhood: string;
  phone: string; whatsapp: string; rating?: number; reviewCount?: number;
  status: string; claimId?: string | null;
};

const statuses = ["ALL", "DISCOVERED", "SHORTLISTED", "APPROVED", "IMPORTED", "CONTACTED"];

export default function AcquisitionPage() {
  const [key, setKey] = useState("");
  const [savedKey, setSavedKey] = useState("");
  const [items, setItems] = useState<Candidate[]>([]);
  const [filter, setFilter] = useState("ALL");
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");

  async function load(nextFilter = filter) {
    if (!savedKey) return;
    setBusy(true); setMessage("");
    try {
      const qs = nextFilter === "ALL" ? "" : `?status=${nextFilter}`;
      const res = await fetch(`${API}/acquisition/candidates${qs}`, { headers: { "x-acquisition-admin-key": savedKey }, cache: "no-store" });
      if (!res.ok) throw new Error(res.status === 401 ? "Admin key rejected" : "Could not load candidates");
      setItems(await res.json());
    } catch (e) { setMessage(e instanceof Error ? e.message : "Request failed"); }
    finally { setBusy(false); }
  }

  async function setStatus(id: string, status: string) {
    setBusy(true); setMessage("");
    try {
      const res = await fetch(`${API}/acquisition/candidates/${id}/status`, {
        method: "POST", headers: { "Content-Type": "application/json", "x-acquisition-admin-key": savedKey }, body: JSON.stringify({ status })
      });
      if (!res.ok) throw new Error("Status update failed");
      await load();
    } catch (e) { setMessage(e instanceof Error ? e.message : "Update failed"); setBusy(false); }
  }

  useEffect(() => { if (savedKey) load(); }, [savedKey]);
  const counts = useMemo(() => statuses.slice(1).reduce((a,s) => ({...a,[s]:items.filter(x=>x.status===s).length}), {} as Record<string,number>), [items]);

  if (!savedKey) return <main className="min-h-[70vh] px-5 py-12"><div className="mx-auto max-w-lg rounded-2xl border border-black/10 bg-white p-7 shadow-sm"><p className="text-xs font-semibold uppercase tracking-widest text-amber-700">STall Admin</p><h1 className="mt-2 font-display text-3xl">Acquisition Engine</h1><p className="mt-2 text-sm text-black/60">Protected workspace for research, shortlist and approval. Nothing enters STall automatically.</p><form className="mt-6 space-y-3" onSubmit={e=>{e.preventDefault();setSavedKey(key)}}><label className="block text-sm font-medium">Admin acquisition key<input autoFocus type="password" value={key} onChange={e=>setKey(e.target.value)} className="mt-1 w-full rounded-xl border border-black/15 px-4 py-3 outline-none focus:border-amber-500" /></label><button className="w-full rounded-xl bg-[#0f1a24] px-4 py-3 font-semibold text-white">Open Acquisition Engine</button></form></div></main>;

  return <main className="min-h-[70vh] px-5 py-8"><div className="mx-auto max-w-6xl"><div className="flex flex-wrap items-end justify-between gap-4"><div><p className="text-xs font-semibold uppercase tracking-widest text-amber-700">STall Admin</p><h1 className="font-display text-4xl">Acquisition Engine</h1><p className="mt-1 text-sm text-black/60">Delhi Cantonment → Kerala Restaurants</p></div><button onClick={()=>{setSavedKey("");setKey("")}} className="rounded-xl border border-black/10 bg-white px-4 py-2 text-sm">Lock</button></div>
  <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-4">{[["DISCOVERED","Discovered"],["SHORTLISTED","Shortlisted"],["APPROVED","Approved"],["IMPORTED","Imported"]].map(([k,l])=><div key={k} className="rounded-2xl border border-black/10 bg-white p-4"><div className="text-2xl font-semibold">{counts[k] ?? 0}</div><div className="text-xs text-black/50">{l}</div></div>)}</div>
  <div className="mt-6 flex flex-wrap gap-2">{statuses.map(s=><button key={s} onClick={()=>{setFilter(s);load(s)}} className={`rounded-full border px-3 py-2 text-xs ${filter===s?"border-amber-500 bg-amber-50":"border-black/10 bg-white"}`}>{s.replace("_"," ")}</button>)}</div>
  {message && <div className="mt-4 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700">{message}</div>}
  <div className="mt-4 overflow-hidden rounded-2xl border border-black/10 bg-white">{items.length===0 ? <div className="p-8 text-center text-sm text-black/50">{busy?"Loading candidates…":"No candidates in this view yet."}</div> : items.map(c=><div key={c.id} className="grid gap-3 border-b border-black/5 p-4 last:border-0 md:grid-cols-[1.7fr_1fr_100px_130px_auto] md:items-center"><div><div className="font-semibold">{c.name}</div><div className="text-xs text-black/50">{c.category || "Business"} · {c.address || c.neighbourhood}</div></div><div className="text-sm">{c.phone || c.whatsapp || "No phone"}</div><div className="text-sm">{c.rating ? `${c.rating} ★` : "—"}</div><div><span className="rounded-full bg-black/5 px-2 py-1 text-xs">{c.status}</span></div><div className="flex flex-wrap gap-2">{c.status==="DISCOVERED"&&<button onClick={()=>setStatus(c.id,"SHORTLISTED")} className="rounded-lg bg-[#0f1a24] px-3 py-2 text-xs font-semibold text-white">Shortlist</button>}{c.status==="SHORTLISTED"&&<button onClick={()=>setStatus(c.id,"APPROVED")} className="rounded-lg bg-[#0f1a24] px-3 py-2 text-xs font-semibold text-white">Approve</button>}{c.status==="APPROVED"&&<span className="text-xs text-amber-700">Ready for controlled import</span>}</div></div>)}</div>
  </div></main>;
}
