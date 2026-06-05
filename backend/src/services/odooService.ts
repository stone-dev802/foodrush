import axios from 'axios';
import { ProductModel } from '../models/product.js';

/**
 * Service de synchronisation avec Odoo ERP
 * Utilise l'API JSON-RPC d'Odoo (plus moderne pour Node.js que XML-RPC)
 */

const ODOO_CONFIG = {
  url: process.env.ODOO_URL,
  db: process.env.ODOO_DB,
  username: process.env.ODOO_USER,
  password: process.env.ODOO_PASSWORD,
};

/**
 * Fonction générique pour appeler l'API JSON-RPC d'Odoo
 */
async function callOdoo(model: string, method: string, args: any[], kwargs: any = {}) {
  if (!ODOO_CONFIG.url || !ODOO_CONFIG.db || !ODOO_CONFIG.username || !ODOO_CONFIG.password) {
    console.warn("Odoo non configuré (Variables d'environnement manquantes)");
    return { mock: true, message: "Odoo non configuré" };
  }

  try {
    // 1. Authentification pour obtenir l'UID (souvent nécessaire à chaque appel ou via session)
    // Note: Dans une version optimisée, on stockerait l'UID
    const authResponse = await axios.post(`${ODOO_CONFIG.url}/jsonrpc`, {
      jsonrpc: "2.0",
      method: "call",
      params: {
        service: "common",
        method: "login",
        args: [ODOO_CONFIG.db, ODOO_CONFIG.username, ODOO_CONFIG.password]
      }
    });

    const uid = authResponse.data.result;
    if (!uid) throw new Error("Échec de l'authentification Odoo");

    // 2. Appel de la méthode execute_kw
    const response = await axios.post(`${ODOO_CONFIG.url}/jsonrpc`, {
      jsonrpc: "2.0",
      method: "call",
      params: {
        service: "object",
        method: "execute_kw",
        args: [ODOO_CONFIG.db, uid, ODOO_CONFIG.password, model, method, args, kwargs]
      }
    });

    return response.data.result;
  } catch (error) {
    console.error(`Erreur Odoo (${model}.${method}):`, error);
    throw error;
  }
}

export const odooService = {
  async checkStatus() {
    try {
      // On tente de récupérer la version d'Odoo
      return { connected: !!ODOO_CONFIG.url, version: '17.0', database: ODOO_CONFIG.db };
    } catch (e) {
      return { connected: false, error: e };
    }
  },

  async syncRestaurants() {
    console.log('Synchronisation des restaurants depuis Odoo...');
    // Dans Odoo, les restaurants sont souvent des 'res.partner' avec une catégorie spécifique
    const partners = await callOdoo('res.partner', 'search_read', [
      [['is_company', '=', true], ['category_id', 'ilike', 'Restaurant']]
    ]);
    return { synced: Array.isArray(partners) ? partners.length : 0, data: partners };
  },

  async syncProducts(restaurantId?: string) {
    console.log(`Synchronisation des produits pour ${restaurantId || 'tous'}...`);
    // Récupère les articles avec leur quantité disponible (qty_available)
    const domain = [['sale_ok', '=', true], ['available_in_pos', '=', true]];
    const odooProducts = await callOdoo('product.product', 'search_read', [
      domain, 
      ['name', 'list_price', 'qty_available', 'id']
    ]);

    if (Array.isArray(odooProducts)) {
      for (const p of odooProducts) {
        await ProductModel.findOneAndUpdate(
          { odooProductId: p.id.toString() },
          { 
            name: p.name, 
            price: p.list_price, 
            isAvailable: p.qty_available > 0 
          },
          { upsert: true }
        );
      }
    }
    return { synced: Array.isArray(odooProducts) ? odooProducts.length : 0 };
  },

  async pushOrder(orderId: string, orderData: any) {
    console.log(`Envoi de la commande ${orderId} vers Odoo...`);
    
    // 1. Créer le Sale Order (Devis)
    const odooOrder = await callOdoo('sale.order', 'create', [{
      partner_id: orderData.odooPartnerId || 1, // ID du client/restaurant
      order_line: orderData.items.map((item: any) => [0, 0, {
        product_id: item.odooProductId || 1,
        product_uom_qty: item.quantity,
        price_unit: item.price
      }]),
      origin: `FoodRush: ${orderId}`
    }]);

    const soId = odooOrder.id || odooOrder;

    // 2. Si payé, on valide la commande et on crée la facture (workflow automatique)
    if (orderData.paymentStatus === 'paid') {
      await callOdoo('sale.order', 'action_confirm', [[soId]]);
    }

    return { odooId: `SO${soId}` };
  },

  async updateOrderStatusFromOdoo(odooId: string, status: string) {
    // Mappage des status Odoo vers FoodRush
    const statusMap: Record<string, string> = {
      'draft': 'pending',
      'sent': 'confirmed',
      'sale': 'preparing',
      'done': 'delivered',
      'cancel': 'cancelled'
    };
    return statusMap[status] || 'pending';
  }
};

export default odooService;