using API.Application.Interfaces;
using API.Application.Users.Commands.CreateUser;
using API.Configuration;
using API.Extensions;
using API.Filters;
using API.Persistence;
using API.Services;
using MediatR;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;
using System.Reflection;
using System.Text;

namespace API
{
    public class Startup
    {
        private const string DEFAULT_CORS_POLICY_NAME = "default";

        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        public void ConfigureServices(IServiceCollection services)
        {
            // Configure CORS
            services.AddCors(options =>
            {
                options.AddPolicy(DEFAULT_CORS_POLICY_NAME, policy => {
                    policy
                    .SetIsOriginAllowedToAllowWildcardSubdomains()
                    .WithOrigins(new string[] { "http://localhost:3000" })
                    .AllowAnyHeader()
                    .AllowAnyMethod()
                    .AllowCredentials();

                    policy.Build();
                });
            });

            // Add Framework Services.
            services.AddSingleton<IHttpContextAccessor, HttpContextAccessor>();

            // Add In-Memory Storage
            services.AddDbContext<IBoringBankDbContext, BoringBankDbContext>(opt => {
                opt.UseInMemoryDatabase("BoringBankAPI");
            });

            // Add MediatR
            services.AddMediatR(typeof(CreateUserCommandHandler).GetTypeInfo().Assembly);

            // Add Configurations
            var appSettingsSection = Configuration.GetSection("AppSettings");
            services.Configure<AppSettings>(appSettingsSection);

            // Add Authentication
            var appSettings = appSettingsSection.Get<AppSettings>();
            var tokenSigningKey = Encoding.ASCII.GetBytes(appSettings.TokenSigningKey);
            services.AddAuthentication(x =>
            {
                x.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                x.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            })
            .AddJwtBearer(x =>
            {
                x.RequireHttpsMetadata = false;
                x.SaveToken = true;
                x.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey(tokenSigningKey),
                    ValidateIssuer = false,
                    ValidateAudience = false
                };
            });

            // Add BoringBank Services
            services.AddScoped<IBoringBankUserService, BoringBankUserService>();
            services.AddScoped<IBoringBankTokenService, BoringBankTokenService>();

            // Configure MVC
            services.AddMvc(options =>
            {
                options.Filters.Add(typeof(CustomExceptionFilter));
            }).SetCompatibilityVersion(CompatibilityVersion.Version_2_2);

            // Register Swagger Services
            services.AddSwaggerDocument(settings =>
            {
                settings.PostProcess = document =>
                {
                    document.Info.Title = "BoringBank API";
                };
            });
        }

        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            app.UseCors(DEFAULT_CORS_POLICY_NAME);
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseHsts();
                app.UseHttpsRedirection();
            }

            
            app.UseStaticFiles();

            app.UseAuthentication();
            app.UseMvc();
        }
    }
}
