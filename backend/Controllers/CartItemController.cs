using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using backend.Services;
using backend.Models;
using backend.DTOs.CartItem;
using backend.DTOs.Category;

namespace backend.Controllers;

[Route("api/v1/[controller]s")]
public class CartItemController : ControllerBase
{
  private readonly ICartItemService _cartItemService;

  public CartItemController(ICartItemService cartItemService)
  {
    _cartItemService = cartItemService;
  }

    [HttpGet()]
    public async Task<ActionResult<ServiceResponse<List<CartItemDTO>>>> GetAll()
    {
        return Ok(await _cartItemService.GetCartItems());
    }

    [HttpGet("{cartId}/products")]
    public async Task<ActionResult<ServiceResponse<List<CartItemDTO>>>> GetCartProductsByCartId(int cartId)
    {
        return Ok(await _cartItemService.GetCartProductsByCartId(cartId));
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<ServiceResponse<List<CartItemDTO>>>> GetSingle(int id)
    {
        return Ok(await _cartItemService.GetCartItemById(id));
    }

    [HttpPost()]
    public async Task<ActionResult<ServiceResponse<List<AddCartItemDTO>>>> AddCartItem(CartItemDTO newItem)
    {
        return Ok(await _cartItemService.AddCartItem(newItem));
    }

    
}
