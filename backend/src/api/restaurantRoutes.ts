import { Router } from 'express';
import { RestaurantModel } from '../models/restaurant.js';
import { protect, authorize } from '../models/authMiddleware.js';

const router = Router();

// Récupérer tous les restaurants
router.get('/', async (req, res) => {
  try {
    const restaurants = await RestaurantModel.find().sort({ name: 1 });
    res.json(restaurants);
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la récupération des restaurants" });
  }
});

// Créer un restaurant (réservé admin ou owner)
router.post('/', protect, authorize('admin', 'restaurant_owner'), async (req, res) => {
  try {
    const newRestaurant = await RestaurantModel.create({
      ...req.body,
      isOpen: true
    });
    res.status(201).json(newRestaurant);
  } catch (error) {
    res.status(400).json({ message: "Erreur lors de la création du restaurant" });
  }
});

// Modifier le statut ouvert/fermé
router.patch('/:id/status', protect, authorize('admin', 'restaurant_owner', 'staff'), async (req, res) => {
  try {
    const { id } = req.params;
    const { isOpen } = req.body;
    
    const restaurant = await RestaurantModel.findByIdAndUpdate(id, { isOpen }, { new: true });
    if (!restaurant) return res.status(404).json({ message: "Restaurant non trouvé" });
    
    res.json(restaurant);
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la mise à jour" });
  }
});

export default router;