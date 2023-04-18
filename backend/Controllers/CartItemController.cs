using Microsoft.AspNetCore.Mvc;
using backend.Services;
using backend.Models;
using backend.DTOs.CartItem;

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
        var cartItems = await _cartItemService.GetCartItems();
        return Ok(cartItems.Data);
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
    public async Task<ActionResult<ServiceResponse<List<AddCartItemDTO>>>> AddCartItem(int userId, int productId)
    {
        return Ok(await _cartItemService.AddCartItem(userId,productId));
    }
}
