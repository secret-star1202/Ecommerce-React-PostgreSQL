using System;
namespace backend.DTOs.CartItem;

public class UpdateCartItemDTO
{
    public int Id { get; set; }
    public string? Name { get; set; }
    public decimal Price { get; set; }
    public int ItemQuantity { get; set; }
}

