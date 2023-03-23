using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using backend.Data;
using backend.Models;
using backend.DTOs.Category;
using backend.Services;
using Microsoft.EntityFrameworkCore;

namespace backend.Services;

public class CategoryService : ICategoryService
{
    private readonly IMapper _mapper;
    private readonly DataContext _context;

    public CategoryService(IMapper mapper, DataContext context)
    {
        _mapper = mapper;
        _context = context;
    }

    public async Task<ServiceResponse<List<AddCategoryDTO>>> AddCategory(GetCategoryDTO newCategory)
    {
        var serviceResponse = new ServiceResponse<List<AddCategoryDTO>>();
        try
        {
            var category = _mapper.Map<Category>(newCategory);

            _context.Categories.Add(category);
            await _context.SaveChangesAsync();

            serviceResponse.Data = await _context.Categories
                    .Select(c => _mapper.Map<AddCategoryDTO>(c))
                    .ToListAsync();
        }
        catch (Exception ex)
        {
            serviceResponse.Success = false;
            serviceResponse.Message = ex.Message;
        }
        return serviceResponse;
    }

    public async Task<ServiceResponse<List<GetCategoryDTO>>> GetAllCategories()
    {
        var serviceResponse = new ServiceResponse<List<GetCategoryDTO>>();
        var dbCategories = await _context.Categories.ToListAsync();
        serviceResponse.Data = dbCategories.Select(c => _mapper.Map<GetCategoryDTO>(c)).ToList();
        return serviceResponse;
    }

    public async Task<ServiceResponse<GetCategoryDTO>> GetCategoryById(int id)
    {
        var serviceResponse = new ServiceResponse<GetCategoryDTO>();
        try
        {
            var dbCategory = await _context.Categories
            .FirstOrDefaultAsync(c => c.Id == id);
            serviceResponse.Data = _mapper.Map<GetCategoryDTO>(dbCategory);
        }
        catch (Exception ex)
        {
            serviceResponse.Success = false;
            serviceResponse.Message = ex.Message;
        }
        return serviceResponse;
    }

    public async Task<ServiceResponse<GetCategoryDTO>> UpdateCategory(UpdateCategoryDTO updatedCategory)
    {
        var serviceResponse = new ServiceResponse<GetCategoryDTO>();

        try
        {
            var category= await _context.Categories.FirstOrDefaultAsync(c => c.Id == updatedCategory.Id);
            if (category is null)
                throw new Exception($"Category with Id '{updatedCategory.Id}' not found.");

            category.Name = updatedCategory.Name;
          
            await _context.SaveChangesAsync();
            serviceResponse.Data = _mapper.Map<GetCategoryDTO>(category);
        }
        catch (Exception ex)
        {
            serviceResponse.Success = false;
            serviceResponse.Message = ex.Message;
        }

        return serviceResponse;

    }

    public async Task<ServiceResponse<List<GetCategoryDTO>>> DeleteCategory(int id)
    {
        var serviceResponse = new ServiceResponse<List<GetCategoryDTO>>();

        try
        {
            var category = await _context.Categories.FirstOrDefaultAsync(c => c.Id == id);
            if (category is null)
                throw new Exception($"Category with Id '{id}' not found.");

            _context.Categories.Remove(category);

            await _context.SaveChangesAsync();

            serviceResponse.Data = await _context.Categories.Select(c => _mapper.Map<GetCategoryDTO>(c)).ToListAsync();

        }
        catch (Exception ex)
        {
            serviceResponse.Success = false;
            serviceResponse.Message = ex.Message;
        }

        return serviceResponse;
    }
}
