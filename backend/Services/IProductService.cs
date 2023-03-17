using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.DTOs.Product;
using backend.Models;

namespace backend.Services;

public interface IProductService
{
    Task<ServiceResponse<List<GetProductDTO>>> GetAllProducts();
    Task<ServiceResponse<GetProductDTO>> GetProductById(int id);
    Task<ServiceResponse<List<GetProductDTO>>> AddProduct(AddProductDTO newProduct);
    Task<ServiceResponse<GetProductDTO>> UpdateProduct(UpdateProductDTO updatedProduct);
    Task<ServiceResponse<List<GetProductDTO>>> DeleteProduct(int id);
    Task<ServiceResponse<List<GetProductDTO>>> GetProductsByCategory(int categoryId);
}
