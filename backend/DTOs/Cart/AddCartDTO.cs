using System;
namespace backend.DTOs.Cart;

public class AddCartDTO
{
    public decimal Total { get; set; }
    public int UserId { get; set; }
}

