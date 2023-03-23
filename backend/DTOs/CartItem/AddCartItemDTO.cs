using System;
using backend.DTOs.Cart;
using backend.DTOs.Product;
using backend.Models;

namespace backend.DTOs.CartItem;

public class AddCartItemDTO
{
    public int CartId { get; set; }
    public int ProductId { get; set; }
    public int ItemQuantity { get; set; }
}