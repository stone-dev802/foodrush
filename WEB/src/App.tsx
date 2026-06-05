import {
  ArrowRight,
  BarChart3,
  ClipboardList,
  Bell,
  Building2,
  CalendarClock,
  ChefHat,
  CreditCard,
  LayoutDashboard,
  MapPin,
  Link2,
  Lock,
  Moon,
  PackageCheck,
  Search,
  Settings,
  ShieldCheck,
  ShoppingBag,
  Store,
  Sun,
  Truck,
  Utensils,
} from 'lucide-react';
import { useEffect, useMemo, useState, useCallback } from 'react';
import { api, Restaurant } from './api';
import { io } from 'socket.io-client';

type Page = 'home' | 'login' | 'dashboard' | 'restaurants' | 'orders' | 'odoo' | 'analytics';

const navItems: Array<{ key: Page; label: string }> = [
  { key: 'home', label: 'Accueil' },
  { key: 'dashboard', label: 'Dashboard' },
  { key: 'restaurants', label: 'Restaurants' },
  { key: 'orders', label: 'Commandes' },
  { key: 'odoo', label: 'Odoo ERP' },
  { key: 'analytics', label: 'Analytics' },
];

const fallbackRestaurants: Restaurant[] = [
  { id: 'local-1', name: 'Burger Palace', category: 'burger', city: 'Douala', rating: 4.8, distance: '1.2 km', deliveryTime: '15-25 min', isOpen: true },
  { id: 'local-2', name: 'Pizza Napoletana', category: 'pizza', city: 'Yaounde', rating: 4.6, distance: '1.5 km', deliveryTime: '20-30 min', isOpen: true },
  { id: 'local-3', name: 'Douala Bowl', category: 'local', city: 'Douala', rating: 4.7, distance: '2.4 km', deliveryTime: '30-45 min', isOpen: false },
];

const orders = [
  { id: 'FR-1024', customer: 'ThomyStone', restaurant: 'Burger Palace', total: '8 500 FCFA', status: 'En livraison', time: '12 min' },
  { id: 'FR-1025', customer: 'Nadia', restaurant: 'Pizza Napoletana', total: '6 000 FCFA', status: 'Preparation', time: '24 min' },
  { id: 'FR-1026', customer: 'Junior', restaurant: 'Douala Bowl', total: '4 500 FCFA', status: 'Confirmee', time: '31 min' },
];

const odooModules = [
  { name: 'Ventes', description: 'Synchroniser commandes FoodRush vers devis/factures Odoo.', icon: ShoppingBag },
  { name: 'Inventaire', description: 'Suivre ingredients, ruptures et mouvements de stock.', icon: PackageCheck },
  { name: 'Comptabilite', description: 'Centraliser revenus, paiements, taxes et reporting.', icon: CreditCard },
  { name: 'CRM', description: 'Gerer restaurants partenaires et opportunites business.', icon: Building2 },
];

function App() {
  const [page, setPage] = useState<Page>('home');
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [loadingRestaurants, setLoadingRestaurants] = useState(false);
  const [restaurantsError, setRestaurantsError] = useState('');
  const [newOrderAlert, setNewOrderAlert] = useState<any>(null);

  // Connexion Socket.io
  useEffect(() => {
    if (user) {
      const socket = io('http://localhost:4000'); // URL de ton backend

      socket.on('new_order', (order) => {
        setNewOrderAlert(order);
        // Optionnel : Jouer un petit son ici
        
        // Faire disparaître l'alerte après 10 secondes
        setTimeout(() => setNewOrderAlert(null), 10000);
      });

      return () => {
        socket.disconnect();
      };
    }
  }, [user]);

  useEffect(() => {
    setLoadingRestaurants(true);
    api.restaurants()
      .then((data) => {
        setRestaurants(data);
        setRestaurantsError('');
      })
      .catch((error: Error) => {
        setRestaurants(fallbackRestaurants);
        setRestaurantsError(error.message);
      })
      .finally(() => setLoadingRestaurants(false));
  }, []);

  const content = useMemo(() => {
    if (page === 'login') {
      return <LoginPage onLogin={setUser} onNavigate={setPage} />;
    }

    const protectedPages: Page[] = ['dashboard', 'restaurants', 'orders', 'odoo', 'analytics'];
    if (protectedPages.includes(page) && !user) {
      return <LoginPage onLogin={setUser} onNavigate={setPage} />;
    }

    if (page === 'dashboard') {
      return <DashboardPage restaurants={restaurants} />;
    }

    if (page === 'restaurants') {
      return <RestaurantsPage error={restaurantsError} loading={loadingRestaurants} restaurants={restaurants} />;
    }

    if (page === 'orders') {
      return <OrdersPage />;
    }

    if (page === 'odoo') {
      return <OdooPage />;
    }

    if (page === 'analytics') {
      return <AnalyticsPage />;
    }

    return <HomePage error={restaurantsError} loading={loadingRestaurants} onNavigate={setPage} restaurants={restaurants} />;
  }, [loadingRestaurants, page, restaurants, restaurantsError, user]);

  return (
    <main data-theme={theme}>
      <nav className="nav">
        <button className="brand" onClick={() => setPage('home')}>
          <span className="brand-mark">
            <Utensils size={22} />
          </span>
          <span>FoodRush</span>
        </button>
        {newOrderAlert && (
          <div className="live-notification" onClick={() => setPage('orders')}>
            <Bell className="animate-bounce" size={18} />
            <div>
              <strong>Nouvelle commande !</strong>
              <p>{newOrderAlert.totalAmount} FCFA pour {newOrderAlert.restaurantId}</p>
            </div>
            <button onClick={(e) => { e.stopPropagation(); setNewOrderAlert(null); }}>×</button>
          </div>
        )}
        <div className="nav-links">
          {navItems.map((item) => (
            <button className={page === item.key ? 'active' : ''} key={item.key} onClick={() => setPage(item.key)}>
              {item.label}
            </button>
          ))}
        </div>
        <div className="nav-actions">
          <button className="theme-toggle" onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
            {theme === 'light' ? <Moon size={17} /> : <Sun size={17} />}
            {theme === 'light' ? 'Dark' : 'Light'}
          </button>
          <button className="nav-cta" onClick={() => (user ? setUser(null) : setPage('login'))}>
            {user ? 'Deconnexion' : 'Connexion'}
          </button>
        </div>
      </nav>
      {content}
    </main>
  );
}

function HomePage({
  error,
  loading,
  onNavigate,
  restaurants,
}: {
  error: string;
  loading: boolean;
  onNavigate: (page: Page) => void;
  restaurants: Restaurant[];
}) {
  return (
    <>
      <section className="hero">
        <div className="hero-grid">
          <div className="hero-copy">
            <p className="eyebrow hero-location"><MapPin size={18} /> Douala & Yaounde, Cameroun</p>
            <h1>FoodRush devient une <span>plateforme</span> restaurant/business.</h1>
            <p className="hero-text">
              Une version web pour piloter restaurants, commandes, ventes, livraisons et connecter l'activite a Odoo.
            </p>
            <div className="search-card">
              <Search size={22} />
              <input placeholder="Rechercher un restaurant, une commande, un client..." />
              <button onClick={() => onNavigate('dashboard')}>
                Ouvrir le dashboard
                <ArrowRight size={16} />
              </button>
            </div>
            <div className="stats">
              <span><Store size={28} /><strong>3</strong><small>restaurants pilotes</small></span>
              <span><ClipboardList size={28} /><strong>178</strong><small>commandes</small></span>
              <span><PackageCheck size={28} /><strong>Odoo</strong><small>ERP principal</small></span>
            </div>
          </div>
          <div className="hero-card">
            <div className="promo-badge">ERP</div>
            <div className="hero-card-content">
              <span className="mini-pill">Odoo-ready</span>
              <h2>Ventes, stock, facturation et CRM connectes.</h2>
              <p>On prepare FoodRush pour devenir un vrai outil de gestion restaurant.</p>
            </div>
          </div>
        </div>
        <div className="feature-strip">
          <Feature icon={BarChart3} title="Pilotage complet" text="Gerez votre activite en temps reel." />
          <Feature icon={Link2} title="Integre a Odoo" text="Synchronisation fluide avec votre ERP." />
          <Feature icon={ShieldCheck} title="Securite & fiabilite" text="Vos donnees sont protegees et sauvegardees." />
          <Feature icon={Settings} title="Accessible partout" text="Une plateforme web adaptee a tous vos appareils." />
        </div>
      </section>
      <RestaurantsPreview error={error} loading={loading} restaurants={restaurants} />
      <DashboardPage compact restaurants={restaurants} />
    </>
  );
}

function Feature({ icon: Icon, title, text }: { icon: typeof LayoutDashboard; title: string; text: string }) {
  return (
    <article className="feature-item">
      <div className="feature-icon">
        <Icon size={25} />
      </div>
      <div>
        <h3>{title}</h3>
        <p>{text}</p>
      </div>
    </article>
  );
}

function LoginPage({
  onLogin,
  onNavigate,
}: {
  onLogin: (user: { name: string; email: string }) => void;
  onNavigate: (page: Page) => void;
}) {
  const [email, setEmail] = useState('demo@foodrush.local');
  const [password, setPassword] = useState('123456');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await api.login({ email, password });
      onLogin(response.user);
      onNavigate('dashboard');
    } catch (loginError) {
      setError(loginError instanceof Error ? loginError.message : 'Connexion impossible');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="auth-page">
      <div className="auth-card">
        <p className="eyebrow">Connexion</p>
        <h1>Acceder au back-office FoodRush.</h1>
        <label>
          Email
          <input onChange={(event) => setEmail(event.target.value)} placeholder="demo@foodrush.local" value={email} />
        </label>
        <label>
          Mot de passe
          <input onChange={(event) => setPassword(event.target.value)} placeholder="••••••••" type="password" value={password} />
        </label>
        {error ? <p className="form-error">{error}</p> : null}
        <button className="primary-button" disabled={loading} onClick={handleSubmit}>
          {loading ? 'Connexion...' : 'Se connecter'}
          <Lock size={16} />
        </button>
      </div>
    </section>
  );
}

function DashboardPage({ compact = false, restaurants }: { compact?: boolean; restaurants: Restaurant[] }) {
  const openRestaurants = restaurants.filter((restaurant) => restaurant.isOpen !== false).length;
  return (
    <section className={compact ? 'section dashboard-compact' : 'section'}>
      <div className="section-heading">
        <div>
          <p className="eyebrow">Dashboard</p>
          <h2>Vue business FoodRush</h2>
        </div>
        <button className="ghost-button">Exporter rapport</button>
      </div>
      <div className="kpi-grid">
        <Kpi icon={ShoppingBag} label="Commandes" value="178" trend="+18% cette semaine" />
        <Kpi icon={CreditCard} label="Revenus" value="614 300 FCFA" trend="+26% vs hier" />
        <Kpi icon={Store} label="Restaurants" value={`${openRestaurants} actifs`} trend="Douala & Yaounde" />
        <Kpi icon={Truck} label="Livraisons" value="42 en cours" trend="12 min moyenne" />
      </div>
    </section>
  );
}

function RestaurantsPreview({ error, loading, restaurants }: { error: string; loading: boolean; restaurants: Restaurant[] }) {
  return (
    <section className="section">
      <div className="section-heading">
        <div>
          <p className="eyebrow">Catalogue live</p>
          <h2>Restaurants connectes a l'API</h2>
        </div>
      </div>
      <RestaurantState error={error} loading={loading} restaurants={restaurants} />
    </section>
  );
}

function RestaurantsPage({ error, loading, restaurants }: { error: string; loading: boolean; restaurants: Restaurant[] }) {
  return (
    <section className="section">
      <div className="section-heading">
        <div>
          <p className="eyebrow">Restaurants</p>
          <h2>Gestion des partenaires</h2>
        </div>
        <button className="ghost-button">Ajouter restaurant</button>
      </div>
      <RestaurantState error={error} loading={loading} restaurants={restaurants} />
    </section>
  );
}

function RestaurantState({ error, loading, restaurants }: { error: string; loading: boolean; restaurants: Restaurant[] }) {
  if (loading) {
    return <div className="state-card">Chargement des restaurants depuis Render...</div>;
  }

  if (!restaurants.length) {
    return <div className="state-card">Aucun restaurant disponible pour le moment.</div>;
  }

  return (
    <>
      {error ? <div className="warning-card">API Render indisponible temporairement, affichage fallback local. Erreur: {error}</div> : null}
      <div className="table-card">
        {restaurants.map((restaurant) => (
          <div className="table-row" key={restaurant.id ?? restaurant.name}>
            <div>
              <h3>{restaurant.name}</h3>
              <p>{restaurant.city ?? restaurant.address ?? 'Cameroun'} - Note {restaurant.rating}</p>
            </div>
            <span>{restaurant.menu?.length ?? 0} plats</span>
            <span>{restaurant.deliveryTime}</span>
            <strong className={restaurant.isOpen === false ? 'status-closed' : 'status-open'}>
              {restaurant.isOpen === false ? 'Ferme' : 'Ouvert'}
            </strong>
          </div>
        ))}
      </div>
    </>
  );
}

function OrdersPage() {
  return (
    <section className="section">
      <div className="section-heading">
        <div>
          <p className="eyebrow">Commandes</p>
          <h2>Suivi operationnel</h2>
        </div>
        <button className="ghost-button">Nouvelle commande</button>
      </div>
      <div className="table-card">
        {orders.map((order) => (
          <div className="table-row" key={order.id}>
            <div>
              <h3>{order.id} - {order.customer}</h3>
              <p>{order.restaurant}</p>
            </div>
            <span>{order.total}</span>
            <span><CalendarClock size={15} /> {order.time}</span>
            <strong className="status-open">{order.status}</strong>
          </div>
        ))}
      </div>
    </section>
  );
}

function OdooPage() {
  return (
    <section className="section erp-section">
      <div className="section-heading">
        <div>
          <p className="eyebrow">ERP principal</p>
          <h2>Integration Odoo</h2>
        </div>
        <button className="light-button">
          Connecter Odoo
          <Link2 size={16} />
        </button>
      </div>
      <div className="erp-grid">
        {odooModules.map((module) => {
          const Icon = module.icon;
          return (
            <article className="erp-card" key={module.name}>
              <Icon size={34} />
              <h3>{module.name}</h3>
              <p>{module.description}</p>
            </article>
          );
        })}
      </div>
    </section>
  );
}

function AnalyticsPage() {
  return (
    <section className="section">
      <div className="section-heading">
        <div>
          <p className="eyebrow">Analytics</p>
          <h2>Performance commerciale</h2>
        </div>
        <button className="ghost-button">Synchroniser Odoo</button>
      </div>
      <div className="analytics-layout">
        <div className="chart-card">
          <BarChart3 size={42} />
          <h3>Courbe des ventes</h3>
          <div className="fake-bars">
            <span style={{ height: '42%' }} />
            <span style={{ height: '70%' }} />
            <span style={{ height: '58%' }} />
            <span style={{ height: '88%' }} />
            <span style={{ height: '76%' }} />
            <span style={{ height: '96%' }} />
          </div>
        </div>
        <div className="alert-card">
          <Bell size={28} />
          <h3>Alertes business</h3>
          <p>Stock burger faible, 42 livraisons actives, 3 factures a synchroniser avec Odoo.</p>
        </div>
      </div>
    </section>
  );
}

function Kpi({ icon: Icon, label, value, trend }: { icon: typeof LayoutDashboard; label: string; value: string; trend: string }) {
  return (
    <article className="kpi-card">
      <Icon size={25} />
      <p>{label}</p>
      <h3>{value}</h3>
      <span>{trend}</span>
    </article>
  );
}

export default App;
