import { Router } from 'express';
import odooService from '../services/odooService.js';
import { createOrder } from '../services/orderService.js';
import { OrderModel } from '../models/order.js';
import { protect, authorize, AuthRequest } from '../models/authMiddleware.js';
import { getIO } from '../socket.js';

const router = Router();

// Créer une commande
router.post('/', protect, async (req: AuthRequest, res) => {
  // Utilisation du service centralisé qui gère déjà MongoDB/Memory
  const order = await createOrder({ ...req.body, userId: req.user?.id });

  // Optionnel : Tentative de push automatique vers Odoo si paiement validé
  if (req.body.paymentStatus === 'paid' || req.body.paymentMethod === 'cash') {
    try {
      const odooRef = await odooService.pushOrder(order.id, order);
      order.odooId = odooRef.odooId;
    } catch (e) {
      console.error("Erreur de synchro Odoo immédiate", e);
    }
  }

  // Diffusion en temps réel via Socket.io
  const io = getIO();
  if (io) {
    io.emit('new_order', order); // On envoie la commande à tous les connectés
  }

  res.status(201).json(order);
});

// Mettre à jour le statut (ex: preparing -> ready)
router.patch('/:id/status', protect, authorize('admin', 'restaurant_owner', 'staff', 'delivery'), async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    
    const order = await OrderModel.findByIdAndUpdate(id, { status }, { new: true });
    if (!order) return res.status(404).json({ message: "Commande non trouvée" });
    
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la mise à jour" });
  }
});

export default router;