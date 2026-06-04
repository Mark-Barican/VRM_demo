'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { HELMETS } from '@/lib/placeholders';
import { useCart } from '@/components/CartProvider';

// ── Demo account data (static — this is a non-functional demo profile) ──────
const USER = {
  name: 'Miguel Reyes',
  email: 'miguel.reyes@example.com',
  phone: '+63 917 555 0142',
  memberSince: '2023',
};

const ORDERS = [
  { id: 'VRM-10428', date: 'May 28, 2026', status: 'Delivered', items: ['vrm-milano-sport'] },
  { id: 'VRM-10391', date: 'Apr 12, 2026', status: 'Delivered', items: ['vrm-premium-plus-vintage', 'vrm-premium-kids'] },
  { id: 'VRM-10355', date: 'Mar 03, 2026', status: 'Processing', items: ['vrum-dual-visor'] },
];

const ADDRESSES = [
  {
    id: 1,
    label: 'Home',
    name: 'Miguel Reyes',
    line: '24 Mabini Street, Brgy. San Antonio',
    city: 'Pasig City, Metro Manila 1605',
    phone: '+63 917 555 0142',
    isDefault: true,
  },
  {
    id: 2,
    label: 'Office',
    name: 'Miguel Reyes',
    line: '12F Cyberscape Tower, Ortigas Center',
    city: 'Pasig City, Metro Manila 1605',
    phone: '+63 917 555 0142',
    isDefault: false,
  },
];

const WISHLIST_IDS = ['vrm-atomic-bomber', 'vrm-painted-8ball', 'vrum-sport'];

type Tab = 'profile' | 'orders' | 'addresses' | 'wishlist' | 'settings';

const TABS: { id: Tab; label: string; icon: React.ReactNode }[] = [
  { id: 'profile', label: 'Profile', icon: <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" /> },
  { id: 'orders', label: 'Orders', icon: <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" /> },
  { id: 'addresses', label: 'Addresses', icon: <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" /> },
  { id: 'wishlist', label: 'Wishlist', icon: <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" /> },
  { id: 'settings', label: 'Settings', icon: <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a6.759 6.759 0 010 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 010-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.281z M15 12a3 3 0 11-6 0 3 3 0 016 0z" /> },
];

export default function AccountPage() {
  const [tab, setTab] = useState<Tab>('profile');

  return (
    <>
      {/* Header */}
      <section className="pt-32 sm:pt-40 pb-8 bg-v-bg">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex items-center gap-2 text-xs font-body tracking-wide text-v-muted">
              <li><Link href="/" className="hover:text-v-accent transition-colors">Home</Link></li>
              <li aria-hidden className="text-v-divider">/</li>
              <li className="text-v-text2">My Account</li>
            </ol>
          </nav>
          <p className="section-label mb-2">— Welcome back —</p>
          <h1 className="font-display fluid-h1 tracking-wide text-v-text">
            {USER.name.split(' ')[0]}&rsquo;s Garage
          </h1>
        </div>
      </section>

      {/* Body */}
      <section className="pb-20 bg-v-bg min-h-[50vh]">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
            {/* Sidebar nav */}
            <aside className="lg:w-64 shrink-0">
              {/* Identity card */}
              <div className="flex items-center gap-3 p-4 border border-v-border bg-v-card mb-5">
                <div className="w-12 h-12 rounded-full bg-v-accent/20 flex items-center justify-center font-display text-2xl text-v-accent shrink-0">
                  {USER.name.charAt(0)}
                </div>
                <div className="min-w-0">
                  <p className="font-body font-semibold text-v-text text-sm truncate">{USER.name}</p>
                  <p className="text-xs text-v-muted truncate">Member since {USER.memberSince}</p>
                </div>
              </div>

              <nav className="flex lg:flex-col gap-1 overflow-x-auto">
                {TABS.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => setTab(t.id)}
                    className={`flex items-center gap-3 px-4 py-3 text-sm font-body whitespace-nowrap border-l-2 transition-colors ${
                      tab === t.id
                        ? 'border-v-accent text-v-accent bg-v-accent/5'
                        : 'border-transparent text-v-text2 hover:text-v-accent hover:bg-v-surface'
                    }`}
                  >
                    <svg className="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.6}>
                      {t.icon}
                    </svg>
                    {t.label}
                  </button>
                ))}
                <Link
                  href="/"
                  className="flex items-center gap-3 px-4 py-3 text-sm font-body whitespace-nowrap border-l-2 border-transparent text-v-muted hover:text-v-red transition-colors"
                >
                  <svg className="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.6}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
                  </svg>
                  Sign out
                </Link>
              </nav>
            </aside>

            {/* Content */}
            <div className="flex-1 min-w-0">
              {tab === 'profile' && <ProfilePanel />}
              {tab === 'orders' && <OrdersPanel />}
              {tab === 'addresses' && <AddressesPanel />}
              {tab === 'wishlist' && <WishlistPanel />}
              {tab === 'settings' && <SettingsPanel />}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

// ── Panel: Profile ──────────────────────────────────────────────────────────
function ProfilePanel() {
  const [form, setForm] = useState({ name: USER.name, email: USER.email, phone: USER.phone });
  const [saved, setSaved] = useState(false);

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((f) => ({ ...f, [k]: e.target.value }));
    setSaved(false);
  };

  return (
    <PanelShell title="Profile" subtitle="Manage your personal details.">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setSaved(true);
        }}
        className="space-y-5 max-w-lg"
      >
        <Field label="Full name" value={form.name} onChange={set('name')} />
        <Field label="Email address" type="email" value={form.email} onChange={set('email')} />
        <Field label="Phone" type="tel" value={form.phone} onChange={set('phone')} />
        <div className="flex items-center gap-4 pt-2">
          <button type="submit" className="btn-vintage">Save Changes</button>
          {saved && <span className="font-serif italic text-v-accent text-sm">Saved ✓</span>}
        </div>
      </form>
    </PanelShell>
  );
}

// ── Panel: Orders ─────────────────────────────────────────────────────────────
function OrdersPanel() {
  return (
    <PanelShell title="Order History" subtitle="Track and review your past orders.">
      <div className="space-y-4">
        {ORDERS.map((order) => {
          const items = order.items.map((id) => HELMETS.find((h) => h.id === id)).filter(Boolean);
          const total = items.reduce((s, h) => s + (h ? h.price : 0), 0);
          return (
            <div key={order.id} className="border border-v-border bg-v-card">
              <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-3 border-b border-v-divider">
                <div className="flex items-center gap-4">
                  <span className="font-display text-lg tracking-wide text-v-text">{order.id}</span>
                  <span className="text-xs text-v-muted">{order.date}</span>
                </div>
                <span
                  className={`text-xs font-body uppercase tracking-widest px-2.5 py-1 ${
                    order.status === 'Delivered'
                      ? 'text-v-accent border border-v-accent/40'
                      : 'text-v-text2 border border-v-border'
                  }`}
                >
                  {order.status}
                </span>
              </div>
              <div className="p-5 flex flex-wrap items-center gap-4">
                {items.map((h) =>
                  h ? (
                    <div key={h.id} className="flex items-center gap-3">
                      <div className="relative w-14 h-14 bg-v-surface border border-v-border overflow-hidden shrink-0">
                        <Image src={h.image} alt={h.name} fill sizes="56px" className="object-cover saturate-[0.9]" />
                      </div>
                      <div>
                        <p className="font-body text-sm text-v-text">{h.name}</p>
                        <p className="text-xs text-v-muted">₱{h.price.toLocaleString()}</p>
                      </div>
                    </div>
                  ) : null,
                )}
                <div className="ml-auto text-right">
                  <p className="text-xs text-v-muted">Total</p>
                  <p className="font-display text-xl tracking-wide text-v-accent">₱{total.toLocaleString()}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </PanelShell>
  );
}

// ── Panel: Addresses ──────────────────────────────────────────────────────────
function AddressesPanel() {
  return (
    <PanelShell title="Saved Addresses" subtitle="Where we send your gear.">
      <div className="grid sm:grid-cols-2 gap-5">
        {ADDRESSES.map((a) => (
          <div key={a.id} className="border border-v-border bg-v-card p-5 relative">
            <div className="flex items-center gap-2 mb-3">
              <span className="font-display text-xl tracking-wide text-v-text">{a.label}</span>
              {a.isDefault && (
                <span className="text-[0.65rem] uppercase tracking-widest text-v-accent border border-v-accent/40 px-2 py-0.5">
                  Default
                </span>
              )}
            </div>
            <p className="text-sm text-v-text2 leading-relaxed">
              {a.name}<br />
              {a.line}<br />
              {a.city}<br />
              {a.phone}
            </p>
            <div className="flex gap-4 mt-4 pt-4 border-t border-v-divider text-xs uppercase tracking-widest">
              <button className="text-v-accent hover:text-v-accent-h transition-colors">Edit</button>
              <button className="text-v-muted hover:text-v-red transition-colors">Remove</button>
            </div>
          </div>
        ))}
        <button className="border border-dashed border-v-border p-5 flex flex-col items-center justify-center gap-2 text-v-muted hover:text-v-accent hover:border-v-accent transition-colors min-h-[10rem]">
          <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.4}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          <span className="text-sm font-body">Add new address</span>
        </button>
      </div>
    </PanelShell>
  );
}

// ── Panel: Wishlist ───────────────────────────────────────────────────────────
function WishlistPanel() {
  const { addItem } = useCart();
  const items = WISHLIST_IDS.map((id) => HELMETS.find((h) => h.id === id)).filter(Boolean);

  return (
    <PanelShell title="Wishlist" subtitle="Helmets you've been eyeing.">
      <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-5">
        {items.map((h) =>
          h ? (
            <div key={h.id} className="border border-v-border bg-v-card overflow-hidden group">
              <div className="relative aspect-square bg-v-surface overflow-hidden">
                <Image src={h.image} alt={h.name} fill sizes="(max-width:640px) 100vw, 300px" className="object-cover saturate-[0.9] transition-transform duration-500 group-hover:scale-105" />
              </div>
              <div className="p-4">
                <h3 className="font-display text-xl tracking-wide text-v-text">{h.name}</h3>
                <div className="flex items-center justify-between mt-2">
                  <p className="font-display text-lg text-v-accent tracking-wide">₱{h.price.toLocaleString()}</p>
                  <button
                    onClick={() => addItem(h.id)}
                    className="text-xs font-body font-semibold uppercase tracking-widest border border-v-accent text-v-accent px-3 py-1.5 hover:bg-v-accent hover:text-v-bg transition-colors"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ) : null,
        )}
      </div>
    </PanelShell>
  );
}

// ── Panel: Settings ───────────────────────────────────────────────────────────
function SettingsPanel() {
  const [prefs, setPrefs] = useState({ newsletter: true, sms: false, orderUpdates: true });
  const toggle = (k: keyof typeof prefs) => setPrefs((p) => ({ ...p, [k]: !p[k] }));

  const OPTIONS: { key: keyof typeof prefs; label: string; desc: string }[] = [
    { key: 'newsletter', label: 'Newsletter', desc: 'New drops, restocks and ride stories.' },
    { key: 'orderUpdates', label: 'Order updates', desc: 'Shipping and delivery notifications.' },
    { key: 'sms', label: 'SMS alerts', desc: 'Order updates via text message.' },
  ];

  return (
    <PanelShell title="Settings" subtitle="Notification preferences.">
      <div className="space-y-1 max-w-lg">
        {OPTIONS.map((o) => (
          <div key={o.key} className="flex items-center justify-between gap-4 py-4 border-b border-v-divider">
            <div>
              <p className="font-body text-v-text">{o.label}</p>
              <p className="text-xs text-v-muted">{o.desc}</p>
            </div>
            <button
              onClick={() => toggle(o.key)}
              role="switch"
              aria-checked={prefs[o.key]}
              aria-label={o.label}
              className={`relative w-12 h-6 rounded-full transition-colors shrink-0 ${prefs[o.key] ? 'bg-v-accent' : 'bg-v-divider'}`}
            >
              <span
                className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-v-bg transition-transform ${
                  prefs[o.key] ? 'translate-x-6' : 'translate-x-0'
                }`}
              />
            </button>
          </div>
        ))}
      </div>
    </PanelShell>
  );
}

// ── Shared panel shell ────────────────────────────────────────────────────────
function PanelShell({ title, subtitle, children }: { title: string; subtitle: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="mb-6">
        <h2 className="font-display fluid-h3 tracking-wide text-v-text">{title}</h2>
        <p className="text-v-muted text-sm mt-1">{subtitle}</p>
        <div className="vintage-divider w-24 mt-4 text-v-accent" />
      </div>
      {children}
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  type = 'text',
}: {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
}) {
  return (
    <label className="block">
      <span className="block text-xs uppercase tracking-widest text-v-text2 mb-2">{label}</span>
      <input
        type={type}
        value={value}
        onChange={onChange}
        className="w-full bg-v-card border border-v-border px-4 py-3 text-sm text-v-text outline-none focus:border-v-accent transition-colors"
      />
    </label>
  );
}
