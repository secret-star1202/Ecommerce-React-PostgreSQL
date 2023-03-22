using System;
using backend.DTOs.CartItem;

namespace backend.DTOs.Cart;

public class UpdateCartDTO
{
    public int Id { get; set; }
    public decimal TotalPrice { get; set; }
    public int UserId { get; set; }
    public List<CartItemDTO>? CartItems { get; set; }
}

