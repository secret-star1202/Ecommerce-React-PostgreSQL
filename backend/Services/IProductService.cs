using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.DTOs.Product;
using backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Services;

public interface IProductService
{
    Task<ServiceResponse<List<GetProductDTO>>> GetAllProducts();
    Task<ServiceResponse<List<GetProductDTO>>> GetAllProductsSort(string sortBy);
    Task<ServiceResponse<GetProductDTO>> GetProductById(int id);
    Task<ServiceResponse<List<AddProductDTO>>> AddProduct(GetProductDTO newProduct);
    Task<ServiceResponse<GetProductDTO>> UpdateProduct(UpdateProductDTO updatedProduct);
    Task<ServiceResponse<List<GetProductDTO>>> DeleteProduct(int id);
    Task<ServiceResponse<List<GetProductDTO>>> GetProductsByCategory(int categoryId);
    Task<ServiceResponse<List<GetProductDTO>>> Pagination(int pageNumber, int pageSize);
}
