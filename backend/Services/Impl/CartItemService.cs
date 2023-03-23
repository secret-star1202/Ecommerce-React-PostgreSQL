using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Services;
using backend.DTOs;
using AutoMapper;
using backend.Data;
using backend.Models;
using backend.DTOs.CartItem;
using Microsoft.EntityFrameworkCore;
using backend.DTOs.Product;
using backend.DTOs.Cart;

namespace backend.Services.Impl;

public class CartItemService : ICartItemService
{
    private readonly IMapper _mapper;
    private readonly DataContext _context;

    public CartItemService(IMapper mapper, DataContext context)
    {
        _mapper = mapper;
        _context = context;
    }

    public async Task<ServiceResponse<List<CartItemDTO>>> GetCartItems()
    {
        var serviceResponse = new ServiceResponse<List<CartItemDTO>>();
        try
        {
            var dbCartItems = await _context.CartItems.ToListAsync();
            serviceResponse.Data = dbCartItems.Select(c => _mapper.Map<CartItemDTO>(c)).ToList();
        }
        catch (Exception ex)
        {
            serviceResponse.Success = false;
            serviceResponse.Message = ex.Message;
        }
        return serviceResponse;
    }


    public async Task<ServiceResponse<List<CartItemDTO>>> GetCartProductsByCartId(int cartId)
    {
        var serviceResponse = new ServiceResponse<List<CartItemDTO>>();
        try
        {
            var dbCartItems = await _context.CartItems.Where(ci => ci.CartId == cartId).ToListAsync();
            serviceResponse.Data = dbCartItems.Select(ci => _mapper.Map<CartItemDTO>(ci)).ToList();
        }
        catch (Exception ex)
        {
            serviceResponse.Success = false;
            serviceResponse.Message = ex.Message;
        }
        return serviceResponse;
    }

    public async Task<ServiceResponse<CartItemDTO>> GetCartItemById(int id)
    {
        var serviceResponse = new ServiceResponse<CartItemDTO>();
        try
        {
            var dbCartItem = await _context.CartItems.FirstOrDefaultAsync(ci => ci.Id == id);
            serviceResponse.Data = _mapper.Map<CartItemDTO>(dbCartItem);
        }
        catch (Exception ex)
        {
            serviceResponse.Success = false;
            serviceResponse.Message = ex.Message;
        }
        return serviceResponse;
    }

    //public async Task<ServiceResponse<List<AddCartItemDTO>>> AddCartItem(CartItemDTO newItem)
    //{
    //    var serviceResponse = new ServiceResponse<List<AddCartItemDTO>>();
    //    try
    //    {
    //        var item = _mapper.Map<CartItem>(newItem);

    //        _context.CartItems.Add(item);
    //        await _context.SaveChangesAsync();

    //        serviceResponse.Data = await _context.Carts
    //                .Select(ci => _mapper.Map<AddCartItemDTO>(ci))
    //                .ToListAsync();
    //    }
    //    catch (Exception ex)
    //    {
    //        serviceResponse.Success = false;
    //        serviceResponse.Message = ex.Message;
    //    }
    //    return serviceResponse;
    //}

    public async Task<ServiceResponse<List<AddCartItemDTO>>> AddCartItem(int userId, int productId)
    {
        var serviceResponse = new ServiceResponse<List<AddCartItemDTO>>();
        try
        {
            // Check if the user and product exist
            var user = await _context.Users.FindAsync(userId);
            var product = await _context.Products.FindAsync(productId);
            if (user == null || product == null)
            {
                serviceResponse.Success = false;
                serviceResponse.Message = "User or product not found.";
                return serviceResponse;
            }

            // Check if the user already has a cart
            var cart = await _context.Carts
                .Include(c => c.CartItems)
                .FirstOrDefaultAsync(c => c.UserId == userId);
            if (cart == null)
            {
                // If the user doesn't have a cart, create a new one
                cart = new Cart
                {
                    UserId = userId,
                    CartItems = new List<CartItem>()
                };
                _context.Carts.Add(cart);
            }

            // Check if the product already exists in the cart
            var cartItem = cart.CartItems
                .FirstOrDefault(ci => ci.ProductId == productId);
            if (cartItem != null)
            {
                // If the product exists, increment the quantity
                cartItem.ItemQuantity++;
            }
            else
            {
                // If the product doesn't exist, add a new item with a quantity of 1
                cartItem = new CartItem
                {
                    ProductId = productId,
                    ItemQuantity = 1,
                    CartId = cart.Id,
                    Product = product
                };
                _context.CartItems.Add(cartItem);
                cart.CartItems.Add(cartItem);
            }

            await _context.SaveChangesAsync();

            // Return the updated cart items as DTOs
            serviceResponse.Data = cart.CartItems
                .Select(ci => _mapper.Map<AddCartItemDTO>(ci))
                .ToList();
        }
        catch (Exception ex)
        {
            serviceResponse.Success = false;
            serviceResponse.Message = ex.Message;
        }
        return serviceResponse;
    }


}
