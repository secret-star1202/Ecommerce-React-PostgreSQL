using System;
using backend.DTOs.CartItem;

namespace backend.DTOs.Cart;

public class AddCartDTO
{
    public List<CartItemDTO>? CartItems { get; set; }
    public int  CartItemId { get; set; }
}

