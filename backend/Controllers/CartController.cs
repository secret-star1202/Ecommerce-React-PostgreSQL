using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using backend.Models;
using backend.DTOs.Cart;
using backend.Services;
using backend.DTOs.Category;
using backend.DTOs.CartItem;
using backend.Services.Impl;

namespace backend.Controllers
{
    [Route("api/v1/[controller]s")]
    public class CartController : ControllerBase
    {
        private readonly ICartService _cartService;

        public CartController(ICartService cartService)
        {
            _cartService = cartService;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<ServiceResponse<List<CartDTO>>>> GetSingle(int id)
        {
            return Ok(await _cartService.GetCartById(id));
        }

        [HttpGet("{userId}")]
        public async Task<ActionResult<ServiceResponse<List<CartDTO>>>> GetCartByUserId(int userId)
        {
            return Ok(await _cartService.GetCartByUserId(userId));
        }


        // [HttpDelete("{id}")]
        // public async Task<ActionResult<ServiceResponse<CartDTO>>> DeleteCart(int id)
        // {
        //     var response = await _cartService.RemoveCartItem(id);
        //     if (response.Data is null)
        //     {
        //         return NotFound(response);
        //     }

        //     return Ok(response);
        // }

        //  [HttpPost]
        // public async Task<ActionResult<ServiceResponse<List<CartDTO>>>> CreateCart(int userId)
        // {
        //     return Ok(await _cartService.CreateCart(userId));
        // }

        // public async Task<ServiceResponse<List<CartDTO>>> AddItemToCart(int cartId, CartItem cartItem)
        // {
        //     return Ok(await _cartService.AddItemToCart(cartId,cartItem));
        // }

        // [HttpGet()]
        // public async Task<ActionResult<ServiceResponse<List<CartDTO>>>> GetAll()
        // {
        //     return Ok(await _cartService.GetCart());
        // }
    }
}