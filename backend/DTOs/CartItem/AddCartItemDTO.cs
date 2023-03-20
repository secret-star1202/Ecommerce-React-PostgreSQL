using System;
namespace backend.DTOs.CartItem;

public class AddCartItemDTO
{    
    public int ProductId { get; set; }
    public int ItemQuantity { get; set; }   
}