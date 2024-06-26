﻿using System.Threading.Tasks;
using Abp.Application.Services;
using LH.Authorization.Accounts.Dto;

namespace LH.Authorization.Accounts
{
    public interface IAccountAppService : IApplicationService
    {
        Task<IsTenantAvailableOutput> IsTenantAvailable(IsTenantAvailableInput input);

        Task<RegisterOutput> Register(RegisterInput input);
    }
}
