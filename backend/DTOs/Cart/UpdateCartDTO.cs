using System;
using backend.DTOs.CartItem;
using backend.DTOs.Cart;
using backend.DTOs.User;
namespace backend.DTOs.Cart;

public class UpdateCartDTO
{
    public int Id { get; set; }
    public int UserId { get; set; }
    // public GetUserDTO? User { get; set; }
    public int CartItemId { get; set; }
    // public decimal TotalPrice { get; set; }
    // public List<UpdateCartItemDTO>? CartItems { get; set; }
}

