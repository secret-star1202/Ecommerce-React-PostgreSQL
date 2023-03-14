using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using backend.DTOs.Product;
using backend.Models;

namespace backend.Services;

public class CategoryService : ICategoryService
{
    private static List<Category> categories = new List<Category>
        {
            new Category{Id=0,Name="Clothes"},
            new Category{Id=1,Name="Shoes"},
            new Category{Id=2,Name="Jewelry"}
        };
    private readonly IMapper _mapper;

    public CategoryService(IMapper mapper)
    {
        _mapper = mapper;
    }

    public async Task<ServiceResponse<List<Category>>> AddCategory(Category newCategory)
    {
        var serviceResponse = new ServiceResponse<List<Category>>();
        var category = _mapper.Map<Category>(newCategory);
        category.Id = categories.Max(c => c.Id) + 1;
        categories.Add(category);
        serviceResponse.Data = categories.Select(c => _mapper.Map<Category>(c)).ToList();
        return serviceResponse;
    }

    public async Task<ServiceResponse<List<Category>>> GetAllCategories()
    {
        var serviceResponse = new ServiceResponse<List<Category>>();
        serviceResponse.Data = categories.Select(c => _mapper.Map<Category>(c)).ToList();
        return serviceResponse;
    }

    public async Task<ServiceResponse<Category>> GetCategoryById(int id)
    {
        var serviceResponse = new ServiceResponse<Category>();
        var category = categories.FirstOrDefault(c => c.Id == id);
        serviceResponse.Data = _mapper.Map<Category>(category);
        return serviceResponse;
    }

    public async Task<ServiceResponse<Category>> UpdateCategory(Category updatedCategory)
    {
        var serviceResponse = new ServiceResponse<Category>();

        try
        {
            var category = categories.FirstOrDefault(c => c.Id == updatedCategory.Id);
            if (category is null)
                throw new Exception($"Category with Id '{updatedCategory.Id}' not found.");

            category.Name = category.Name;
      
            serviceResponse.Data = _mapper.Map<Category>(category);
        }
        catch (Exception ex)
        {
            serviceResponse.Success = false;
            serviceResponse.Message = ex.Message;
        }

        return serviceResponse;

    }

    public async Task<ServiceResponse<List<Category>>> DeleteCategory(int id)
    {
        var serviceResponse = new ServiceResponse<List<Category>>();

        try
        {
            var category= categories.First(c => c.Id == id);
            if (category is null)
                throw new Exception($"Category with Id '{id}' not found.");

            categories.Remove(category);

            serviceResponse.Data = categories.Select(c => _mapper.Map<Category>(c)).ToList();
        }
        catch (Exception ex)
        {
            serviceResponse.Success = false;
            serviceResponse.Message = ex.Message;
        }

        return serviceResponse;
    }
}
