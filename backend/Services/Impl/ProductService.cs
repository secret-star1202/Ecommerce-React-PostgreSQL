using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using backend.DTOs.Product;
using backend.Models;

namespace backend.Services;

public class ProductService : IProductService

{
    private static List<Category> categories = new List<Category>
    {
        new Category{ Id=0,Name="Clothes"},
        new Category{ Id=1,Name="Shoes"},
        new Category{ Id=2,Name="Jewelry"}
    };

    private static List<Product> products = new List<Product>
        {
            new Product{Id=0,Name="Gucci",Price=100,Description="Gucci Description",Image="Gucci Image",CategoryId=0},
            new Product{Id=1,Name="Chanel",Price=130,Description="Chanel Description",Image="Chanel Image",CategoryId=1},
        };
    private readonly IMapper _mapper;

    public ProductService(IMapper mapper)
    {
        _mapper = mapper;
    }

    public async Task<ServiceResponse<List<GetProductDTO>>> AddProduct(AddProductDTO newProduct)
    {
        var serviceResponse = new ServiceResponse<List<GetProductDTO>>();
        var product = _mapper.Map<Product>(newProduct);
        product.Id = products.Max(p => p.Id) + 1;
        products.Add(product);
        serviceResponse.Data = products.Select(p => _mapper.Map<GetProductDTO>(p)).ToList();
        return serviceResponse;
    }

    public async Task<ServiceResponse<List<GetProductDTO>>> GetAllProducts()
    {
        var serviceResponse = new ServiceResponse<List<GetProductDTO>>();
        serviceResponse.Data = products.Select(p => _mapper.Map<GetProductDTO>(p)).ToList();
        return serviceResponse;
    }

    public async Task<ServiceResponse<GetProductDTO>> GetProductById(int id)
    {
        var serviceResponse = new ServiceResponse<GetProductDTO>();
        var product = products.FirstOrDefault(p => p.Id == id);
        serviceResponse.Data = _mapper.Map<GetProductDTO>(product);
        return serviceResponse;
    }

    public async Task<ServiceResponse<GetProductDTO>> UpdateProduct(UpdateProductDTO updatedProduct)
    {
        var serviceResponse = new ServiceResponse<GetProductDTO>();

        try
        {
            var product = products.FirstOrDefault(p => p.Id == updatedProduct.Id);
            if (product is null)
                throw new Exception($"Product with Id '{updatedProduct.Id}' not found.");

            product.Name = updatedProduct.Name;
            product.Price = updatedProduct.Price;
            product.Description = updatedProduct.Description;
            product.Image = updatedProduct.Image;
            product.Category = updatedProduct.Category;

            serviceResponse.Data = _mapper.Map<GetProductDTO>(product);
        }
        catch (Exception ex)
        {
            serviceResponse.Success = false;
            serviceResponse.Message = ex.Message;
        }

        return serviceResponse;

    }

    public async Task<ServiceResponse<List<GetProductDTO>>> DeleteProduct(int id)
    {
        var serviceResponse = new ServiceResponse<List<GetProductDTO>>();

        try
        {
            var product = products.First(p => p.Id == id);
            if (product is null)
                throw new Exception($"Product with Id '{id}' not found.");

            products.Remove(product);

            serviceResponse.Data = products.Select(p => _mapper.Map<GetProductDTO>(p)).ToList();
        }
        catch (Exception ex)
        {
            serviceResponse.Success = false;
            serviceResponse.Message = ex.Message;
        }

        return serviceResponse;
    }
}
