using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backend.Models;

public class Cart : BaseModel
{
    public int UserId { get; set; }
    public User? User { get; set; }
    public int CartItemId { get; set; }
    public decimal TotalPrice { get; set; }
    public List<CartItem>? CartItems { get; set; }
    
}
