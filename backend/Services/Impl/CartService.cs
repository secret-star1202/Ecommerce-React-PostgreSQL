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

  
    public async Task<ServiceResponse<List<CartDTO>>> AddToCart(CartDTO newCart)
    {
        throw new NotImplementedException();
    }

    public async Task<ServiceResponse<List<CartDTO>>> GetCart()
    {
        throw new NotImplementedException();
    }

    public async Task<ServiceResponse<CartDTO>> GetCartById(int id)
    {
        throw new NotImplementedException();
    }

    public async Task<ServiceResponse<CartDTO>> GetCartByUserId(int userId)
    {
        throw new NotImplementedException();
    }

    public async Task<ServiceResponse<List<CartDTO>>> RemoveCartItem(int cartItemId)
    {
        throw new NotImplementedException();
    }
}
