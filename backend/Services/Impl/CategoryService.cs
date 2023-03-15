using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using backend.Data;
using backend.Models;
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

    public async Task<ServiceResponse<List<Category>>> AddCategory(Category newCategory)
    {
        var serviceResponse = new ServiceResponse<List<Category>>();
        var category = _mapper.Map<Category>(newCategory);

        _context.Categories.Add(category);
        await _context.SaveChangesAsync();

        serviceResponse.Data = await _context.Categories
                    .Select(c => _mapper.Map<Category>(c))
                    .ToListAsync();
        return serviceResponse;
    }

    public async Task<ServiceResponse<List<Category>>> GetAllCategories()
    {
        var serviceResponse = new ServiceResponse<List<Category>>();
        var dbCategories = await _context.Categories.ToListAsync();
        serviceResponse.Data = dbCategories.Select(c => _mapper.Map<Category>(c)).ToList();
        return serviceResponse;
    }

    public async Task<ServiceResponse<Category>> GetCategoryById(int id)
    {
        var serviceResponse = new ServiceResponse<Category>();
        var dbCategory = await _context.Categories
            .FirstOrDefaultAsync(c => c.Id == id);
        serviceResponse.Data = _mapper.Map<Category>(dbCategory);
        return serviceResponse;
    }

    public async Task<ServiceResponse<Category>> UpdateCategory(Category updatedCategory)
    {
        var serviceResponse = new ServiceResponse<Category>();

        try
        {
            var category= await _context.Categories.FirstOrDefaultAsync(c => c.Id == updatedCategory.Id);
            if (category is null)
                throw new Exception($"Category with Id '{updatedCategory.Id}' not found.");

            category.Name = updatedCategory.Name;
          
            await _context.SaveChangesAsync();
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
            var category = await _context.Categories.FirstOrDefaultAsync(c => c.Id == id);
            if (category is null)
                throw new Exception($"Category with Id '{id}' not found.");

            _context.Categories.Remove(category);

            await _context.SaveChangesAsync();

            serviceResponse.Data = await _context.Categories.Select(c => _mapper.Map<Category>(c)).ToListAsync();

        }
        catch (Exception ex)
        {
            serviceResponse.Success = false;
            serviceResponse.Message = ex.Message;
        }

        return serviceResponse;
    }
}
