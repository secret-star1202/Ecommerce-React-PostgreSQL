using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Services;
using backend.DTOs;
using backend.Models;
using backend.DTOs.Cart;
using backend.DTOs.CartItem;

namespace backend.Services;

public interface ICartService
{
  Task<ServiceResponse<CartDTO>> GetCartById(int id);
  Task<ServiceResponse<CartDTO>> GetCartByUserId(int userId);
  Task<ServiceResponse<List<CartDTO>>> RemoveCartItem(int cartItemId);
  //Task<ServiceResponse<List<CartDTO>>> AddProductToCart2(int userId, int productId);
  Task<ServiceResponse<List<AddCartDTO>>> AddProductToCart(CartDTO newCart);
}
