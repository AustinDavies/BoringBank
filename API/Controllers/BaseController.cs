﻿using MediatR;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.DependencyInjection;

namespace API.Controllers
{
    public abstract class BaseController : Controller
    {
        private IMediator _mediator;

        protected IMediator Mediator => _mediator
            ?? (_mediator = HttpContext.RequestServices.GetService<IMediator>());
    }
}
