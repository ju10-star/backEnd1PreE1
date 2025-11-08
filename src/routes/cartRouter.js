import { Router } from 'express';
import CartManager from '../managers/cartManager.js';

const router = Router();
const cartManager = new CartManager('./src/data/carts.json');

router.post('/', async (req, res) => {
  const cart = await cartManager.createCart();
  res.status(201).json(cart);
});

router.get('/:cid', async (req, res) => {
  const cart = await cartManager.getCartById(req.params.cid);
  if (!cart) return res.status(404).send('Carrito no encontrado');
  res.json(cart);
});

router.post('/:cid/product/:pid', async (req, res) => {
  const updatedCart = await cartManager.addProductToCart(req.params.cid, req.params.pid);
  if (!updatedCart) return res.status(404).send('Carrito no encontrado');
  res.json(updatedCart);
});

export default router;
