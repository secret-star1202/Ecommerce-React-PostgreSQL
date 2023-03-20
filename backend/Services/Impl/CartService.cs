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

  
    public async Task<ServiceResponse<List<CartDTO>>> AddToCart(AddCartDTO newCart)
    {
        var serviceResponse = new ServiceResponse<List<CartDTO>>();
        var cart = _mapper.Map<Cart>(newCart);

        _context.Carts.Add(cart);
        await _context.SaveChangesAsync();

        serviceResponse.Data = await _context.Carts
                    .Select(c => _mapper.Map<CartDTO>(c))
                    .ToListAsync();
        return serviceResponse;
    }

    public async Task<ServiceResponse<List<CartDTO>>> GetCart()
    {
        var serviceResponse = new ServiceResponse<List<CartDTO>>();
        var dbCart = await _context.Carts.ToListAsync();
        serviceResponse.Data = dbCart.Select(c => _mapper.Map<CartDTO>(c)).ToList();
        return serviceResponse;
    }

    public async Task<ServiceResponse<CartDTO>> GetCartById(int id)
    {
        var serviceResponse = new ServiceResponse<CartDTO>();
        var dbCart = await _context.Carts
            .FirstOrDefaultAsync(c => c.Id == id);
        serviceResponse.Data = _mapper.Map<CartDTO>(dbCart);
        return serviceResponse;
    }

    public async Task<ServiceResponse<CartDTO>> GetCartByUserId(int userId)
    {
         var serviceResponse = new ServiceResponse<CartDTO>();
        var dbCart = await _context.Carts
            .FirstOrDefaultAsync(c => c.UserId == userId);
        serviceResponse.Data = _mapper.Map<CartDTO>(dbCart);
        return serviceResponse;
    }

    public async Task<ServiceResponse<List<CartDTO>>> RemoveCartItem(int cartItemId)
    {
        throw new NotImplementedException();
    }
}
