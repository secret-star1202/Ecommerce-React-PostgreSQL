using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backend.Models;

public class CartItem : BaseModel
{
    public int ItemQuantity { get; set; }
    public int ProductId { get; set; }
    public int CartId { get; set; }
    public Product? Product { get; set; }
    public Cart? Cart { get; set; }
    //public decimal? Price { get; set; } 
}
