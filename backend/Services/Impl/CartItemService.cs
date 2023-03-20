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
        var dbCartItems = await _context.CartItems.ToListAsync();
        serviceResponse.Data = dbCartItems.Select(c => _mapper.Map<CartItemDTO>(c)).ToList();
        return serviceResponse;
    }

    public async Task<ServiceResponse<List<CartItemDTO>>> DeleteCartItem(int id)
    {
          var serviceResponse = new ServiceResponse<List<CartItemDTO>>();

        try
        {
            var cartItem = await _context.CartItems.FirstOrDefaultAsync(c => c.Id == id);
            if (cartItem is null)
                throw new Exception($"Cart item with Id '{id}' not found.");

            _context.CartItems.Remove(cartItem);

            await _context.SaveChangesAsync();

            serviceResponse.Data = await _context.CartItems.Select(c => _mapper.Map<CartItemDTO>(c)).ToListAsync();

        }
        catch (Exception ex)
        {
            serviceResponse.Success = false;
            serviceResponse.Message = ex.Message;
        }

        return serviceResponse;
    }

    public  async Task<ServiceResponse<CartItemDTO>> GetCartItemById(int id)
    {
         var serviceResponse = new ServiceResponse<CartItemDTO>();
        var dbCartItem = await _context.CartItems
            .FirstOrDefaultAsync(ci => ci.Id == id);
        serviceResponse.Data = _mapper.Map<CartItemDTO>(dbCartItem);
        return serviceResponse;
    }

    public async Task<ServiceResponse<List<CartItemDTO>>> AddCartItem(AddCartItemDTO newCartItem)
    {
        var serviceResponse = new ServiceResponse<List<CartItemDTO>>();
        var cartItem = _mapper.Map<CartItem>(newCartItem);

        _context.CartItems.Add(cartItem);
        await _context.SaveChangesAsync();

        serviceResponse.Data = await _context.CartItems
                    .Select(p => _mapper.Map<CartItemDTO>(p))
                    .ToListAsync();
        return serviceResponse;
    }
}
