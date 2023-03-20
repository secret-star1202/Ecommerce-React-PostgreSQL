using System;
using backend.DTOs.Category;
using backend.Models;

namespace backend.Services;

public interface ICategoryService
{
    Task<ServiceResponse<List<GetCategoryDTO>>> GetAllCategories();
    Task<ServiceResponse<GetCategoryDTO>> GetCategoryById(int id);
    Task<ServiceResponse<List<GetCategoryDTO>>> AddCategory(AddCategoryDTO newCategory);
    Task<ServiceResponse<GetCategoryDTO>> UpdateCategory(UpdateCategoryDTO updatedCategory);
    Task<ServiceResponse<List<GetCategoryDTO>>> DeleteCategory(int id);
}