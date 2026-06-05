import { Router } from 'express';
import { OrderModel } from '../models/order.js';
import { getIO } from '../socket.js';
import odooService from '../services/odooService.js';

const router = Router();

/**
 * Webhook appelé par Odoo ou un service de paiement
 */
router.post('/odoo/order-update', async (req, res) => {
  try {
    const { odoo_id, new_status } = req.body;
    
    const internalStatus = await odooService.updateOrderStatusFromOdoo(odoo_id, new_status);
    
    const order = await OrderModel.findOneAndUpdate(
      { odooId: `SO${odoo_id}` },
      { status: internalStatus },
      { new: true }
    );

    if (order) {
      const io = getIO();
      io.emit('order_status_updated', { orderId: order._id, status: internalStatus });
    }

    res.status(200).json({ received: true });
  } catch (error) {
    res.status(500).json({ error: "Webhook processing failed" });
  }
});

export default router;