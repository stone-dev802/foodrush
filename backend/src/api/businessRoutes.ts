import { Router } from 'express';
import { OrderModel } from '../models/order.js';
import { protect, authorize, AuthRequest } from '../models/authMiddleware.js';

const router = Router();

// Récupérer les statistiques du restaurant (pour le Dashboard)
router.get('/stats/:restaurantId', protect, authorize('admin', 'restaurant_owner'), async (req: AuthRequest, res) => {
  try {
    const { restaurantId } = req.params;

    // Vérification de sécurité : un propriétaire ne voit que SON restaurant
    if (req.user?.role === 'restaurant_owner' && req.user.restaurantId !== restaurantId) {
      return res.status(403).json({ message: "Accès refusé à ce restaurant" });
    }

    const orders = await OrderModel.find({ restaurantId });
    
    const stats = {
      totalOrders: orders.length,
      totalRevenue: orders.reduce((sum, order) => sum + order.totalAmount, 0),
      pendingOrders: orders.filter(o => o.status === 'pending').length,
      completedOrders: orders.filter(o => o.status === 'delivered').length,
    };

    res.json(stats);
  } catch (error) {
    res.status(500).json({ message: "Erreur lors du calcul des statistiques" });
  }
});

export default router;