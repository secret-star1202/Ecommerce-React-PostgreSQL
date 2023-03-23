using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.DTOs.Cart;
using backend.DTOs.Product;
using backend.Models;
namespace backend.DTOs.CartItem;

public class CartItemDTO
{
    public int Id { get; set; }
    public string? Name { get; set; }
    public decimal Price { get; set; }
    public int ItemQuantity { get; set; }
}