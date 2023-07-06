using System;
using backend.DTOs.Product;
using backend.DTOs.Cart;
namespace backend.DTOs.CartItem;
public class UpdateCartItemDTO
{
    public int Id { get; set; }
     public int CartId { get; set; }
    public int ProductId { get; set; }
    public int ItemQuantity { get; set; }
}