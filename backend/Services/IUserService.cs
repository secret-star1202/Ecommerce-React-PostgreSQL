using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Models;
using backend.DTOs.User;

namespace backend.Services;

public interface IUserService
{
  Task<ServiceResponse<List<GetUserDTO>>> GetAllUsers();
  Task<ServiceResponse<GetUserDTO>> GetUserById(int id);
  Task<ServiceResponse<List<GetUserDTO>>> AddUser(AddUserDTO newProduct);
  Task<ServiceResponse<GetUserDTO>> UpdateUser(UpdateUserDTO updatedProduct);
  Task<ServiceResponse<List<GetUserDTO>>> DeleteUser(int id);
}

