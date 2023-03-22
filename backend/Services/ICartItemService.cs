using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Services;
using backend.DTOs;
using backend.Models;
using backend.DTOs.CartItem;
using backend.DTOs.Product;

namespace backend.Services;

public interface ICartItemService
{
    Task<ServiceResponse<List<CartItemDTO>>> GetCartItems();
    Task<ServiceResponse<List<CartItemDTO>>> GetCartProductsByCartId(int cartId);
    Task<ServiceResponse<CartItemDTO>> GetCartItemById(int id);
}