using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backend.Models;

public class Cart : BaseModel
{
    public int UserId { get; set; }
    public User User { get; set; } 
    public virtual ICollection<CartItem> CartItems { get; set; }
    public decimal Total { get; set; }
}
