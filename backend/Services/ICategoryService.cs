using System;
using backend.DTOs.Product;
using backend.Models;

namespace backend.Services;

public interface ICategoryService
{
    Task<ServiceResponse<List<Category>>> GetAllCategories();
    Task<ServiceResponse<Category>> GetCategoryById(int id);
    Task<ServiceResponse<List<Category>>> AddCategory(Category newCategory);
    Task<ServiceResponse<Category>> UpdateCategory(Category updatedCategory);
    Task<ServiceResponse<List<Category>>> DeleteCategory(int id);
}

