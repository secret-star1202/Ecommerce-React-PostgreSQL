using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Services;
using backend.DTOs;
using AutoMapper;
using backend.Data;
using Microsoft.EntityFrameworkCore;
using backend.Models;
using backend.DTOs.Cart;
using System.Runtime.InteropServices;
using backend.DTOs.CartItem;
using Microsoft.AspNetCore.Mvc;
using backend.DTOs.Product;

namespace backend.Services.Impl;

public class CartService : ICartService
{
  private readonly IMapper _mapper;
  private readonly DataContext _context;

  public CartService(IMapper mapper, DataContext context)
  {
    _mapper = mapper;
    _context = context;
  }

  public async Task<ServiceResponse<CartDTO>> GetCartById(int id)
  {
    var serviceResponse = new ServiceResponse<CartDTO>();
    try
    {
      var dbCart = await _context.Carts
      .FirstOrDefaultAsync(c => c.Id == id);
      serviceResponse.Data = _mapper.Map<CartDTO>(dbCart);
    }
    catch (Exception ex)
    {
      serviceResponse.Success = false;
      serviceResponse.Message = ex.Message;
    }
    return serviceResponse;
  }

  public async Task<ServiceResponse<CartDTO>> GetCartByUserId(int userId)
  {
    var serviceResponse = new ServiceResponse<CartDTO>();
    try
    {
      var dbCart = await _context.Carts
          .Include(c => c.CartItems)
          .FirstOrDefaultAsync(c => c.UserId == userId);
      serviceResponse.Data = _mapper.Map<CartDTO>(dbCart);
    }
    catch (Exception ex)
    {
      serviceResponse.Success = false;
      serviceResponse.Message = ex.Message;
    }
    return serviceResponse;
  }
  
  public async Task<ServiceResponse<List<CartDTO>>> RemoveCartItem(int cartItemId)
  {
    var serviceResponse = new ServiceResponse<List<CartDTO>>();

    try
    {
      var cartItem = await _context.Carts.FirstOrDefaultAsync(ci => ci.CartItemId == cartItemId);
      if (cartItem is null)
        throw new Exception($"Cart item with Id '{cartItemId}' not found.");

      _context.Carts.Remove(cartItem);

      await _context.SaveChangesAsync();

      serviceResponse.Data = await _context.Carts.Select(ci => _mapper.Map<CartDTO>(ci)).ToListAsync();

    }
    catch (Exception ex)
    {
      serviceResponse.Success = false;
      serviceResponse.Message = ex.Message;
    }

    return serviceResponse;
  }

  public async Task<ServiceResponse<List<AddCartDTO>>> AddProductToCart(AddCartDTO newCart)
  {
    var serviceResponse = new ServiceResponse<List<AddCartDTO>>();
    try
    {
      var item = _mapper.Map<Cart>(newCart);

      _context.Carts.Add(item);
      await _context.SaveChangesAsync();

      serviceResponse.Data = await _context.Carts
              .Select(ci => _mapper.Map<AddCartDTO>(ci))
              .ToListAsync();
    }
    catch (Exception ex)
    {
      serviceResponse.Success = false;
      serviceResponse.Message = ex.Message;
    }
    return serviceResponse;
  }


//   public async Task<ServiceResponse<List<CartDTO>>> AddProductToCart2(int userId, int productId)
//   {
//     var response = new ServiceResponse<List<CartDTO>>();

//     try
//     {
//       // Retrieve the user's cart
//       var cart = await _context.Carts
//           .Include(c => c.CartItems)
//           .FirstOrDefaultAsync(c => c.UserId == userId);

//       if (cart == null)
//       {
//         // If the user does not have a cart, create a new one
//         cart = new Cart
//         {
//           UserId = userId,
//           CartItems = new List<CartItem>()
//         };
//         _context.Carts.Add(cart);
//       }

//       // Check if the product is already in the cart
//       var cartItem = cart.CartItems.FirstOrDefault(ci => ci.ProductId == productId);

//       if (cartItem == null)
//       {
//         // If the product is not in the cart, add it
//         cartItem = new CartItem
//         {
//           ProductId = productId,
//           ItemQuantity = 1
//         };
//         cart.CartItems.Add(cartItem);
//       }
//       else
//       {
//         // If the product is already in the cart, increment its quantity
//         cartItem.ItemQuantity++;
//       }

//       await _context.SaveChangesAsync();

//       // Map the updated cart to a CartDTO
//       response.Data = _mapper.Map<List<CartDTO>>(cart.CartItems);
//     }
//     catch (Exception ex)
//     {
//       response.Success = false;
//       response.Message = ex.Message;
//     }

//     return response;
//   }
}