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

  
    public async Task<ServiceResponse<List<CartDTO>>> CreateCart(int userId)
    {
        var serviceResponse = new ServiceResponse<List<CartDTO>>();
        try
        {
            var user = _context.Users.FirstOrDefault(u => u.Id == userId);

            if (user == null) 
            {
            throw new Exception("User not found");
            }
            var cart =new Cart 
            {
            UserId = userId,
            TotalPrice = 0,
            CartItems = new List<CartItem>()
            };

            _context.Carts.Add(cart);
            await _context.SaveChangesAsync();

            serviceResponse.Data = await _context.Carts
                    .Select(c => _mapper.Map<CartDTO>(c))
                    .ToListAsync();
        }
        catch (Exception ex)
        {
            serviceResponse.Success = false;
            serviceResponse.Message = ex.Message;
        }
        return serviceResponse;
    }

    public async Task<ServiceResponse<List<CartDTO>>> GetCart()
    {
        var serviceResponse = new ServiceResponse<List<CartDTO>>();
        try
        {
            var dbCart = await _context.Carts.ToListAsync();
            serviceResponse.Data = dbCart.Select(c => _mapper.Map<CartDTO>(c)).ToList();
        }
        catch (Exception ex)
        {
            serviceResponse.Success = false;
            serviceResponse.Message = ex.Message;
        }
        return serviceResponse;
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

    public async Task<ServiceResponse<List<CartDTO>>> AddItemToCart(int cartId, CartItem cartItem)
    {
        var serviceResponse = new ServiceResponse<List<CartDTO>>();
        try
        {
        var cart = _context.Carts
            .Include(c => c.CartItems)
            .FirstOrDefault(c => c.Id == cartId);

        if (cart == null)
        {
            throw new Exception("Cart not found");
        }
        cartItem.CartId = cartId;
        cart.CartItems.Add(cartItem);

        _context.CartItems.Add(cartItem);
        _context.SaveChanges();

        //UpdateCartTotalPrice(cartId);
        }
        catch (Exception ex)
        {
            serviceResponse.Success = false;
            serviceResponse.Message = ex.Message;
        }
        return serviceResponse;
    }

    // public void UpdateCartTotalPrice(int cartId) {
    //    var cart = _context.Carts
    //        .Include(c => c.CartItems)
    //        .FirstOrDefault(c => c.Id == cartId);

    //    if (cart == null) {
    //        throw new Exception("Cart not found");
    //    }

    //    float totalPrice = 0f;

    //    foreach (CartItem item in cart.CartItems) {
    //        totalPrice += item.Price * item.ItemQuantity;
    //    }

    //    cart.TotalPrice = totalPrice;

    //    _context.SaveChanges();
    //}
}
