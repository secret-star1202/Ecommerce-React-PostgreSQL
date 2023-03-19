using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Services;
using backend.DTOs;
using backend.Models;
using backend.DTOs.CartItem;

namespace backend.Services;

public interface ICartItemService
{
  Task<ServiceResponse<List<CartItemDTO>>> GetCartItems();
//   Task<ServiceResponse<GetCategoryDTO>> GetCategoryById(int id);
//   Task<ServiceResponse<List<GetCategoryDTO>>> AddCategory(AddCategoryDTO newCategory);
//   Task<ServiceResponse<GetCategoryDTO>> UpdateCategory(UpdateCategoryDTO updatedCategory);
  Task<ServiceResponse<List<CartItemDTO>>> DeleteCartItem(int id);
}
