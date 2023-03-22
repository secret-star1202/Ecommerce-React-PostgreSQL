using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Services;
using backend.DTOs;
using backend.Models;
using backend.DTOs.Cart;

namespace backend.Services;

public interface ICartService
{
  Task<ServiceResponse<List<CartDTO>>> GetCart();
  Task<ServiceResponse<CartDTO>> GetCartById(int id);
  Task<ServiceResponse<List<CartDTO>>> CreateCart(int userId);
  Task<ServiceResponse<List<CartDTO>>> RemoveCartItem(int cartItemId);
  Task<ServiceResponse<CartDTO>> GetCartByUserId(int userId);
  //Task<ServiceResponse<List<CartDTO>>> AddItemToCart(int cartId, CartItem cartItem);

}
