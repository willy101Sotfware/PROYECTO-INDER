# PROYECTO INDER - Guía de Desarrollo

## 🚀 Comandos Útiles

### Backend (.NET Core)
```bash
# Navegar al directorio del backend
cd BACKEND/ApiInderV1

# Restaurar dependencias
dotnet restore

# Construir el proyecto
dotnet build

# Ejecutar en modo desarrollo
dotnet run

# Ejecutar con hot reload
dotnet watch run

# Ejecutar pruebas
dotnet test

# Generar documentación Swagger
dotnet swagger tofile --output swagger.json bin/Debug/net10.0/ApiInderV1.dll v1

# Crear nueva migración
dotnet ef migrations add NombreMigracion

# Aplicar migraciones
dotnet ef database update

# Revertir última migración
dotnet ef database update NombreMigracionAnterior

# Generar script SQL de migraciones
dotnet ef migrations script
```

### Frontend (Vue 3)
```bash
# Navegar al directorio del frontend
cd FRONTEND/InderV1

# Instalar dependencias
npm install

# Ejecutar en modo desarrollo
npm run dev

# Construir para producción
npm run build

# Previsualizar build de producción
npm run preview

# Ejecutar linter
npm run lint

# Ejecutar linter y corregir automáticamente
npm run lint -- --fix
```

## 📁 Estructura de Directorios Importantes

### Backend
```
BACKEND/ApiInderV1/
├── Application/           # Casos de uso y lógica de negocio
│   ├── Features/         # Funcionalidades por dominio
│   │   ├── Auth/        # Autenticación
│   │   ├── Formularios/ # Gestión de formularios
│   │   └── Reservas/    # Gestión de reservas
│   └── Validators/      # Validaciones
├── Controllers/          # Controladores HTTP
├── Core/                # Entidades e interfaces
│   ├── Entities/        # Modelos de datos
│   └── Interfaces/      # Contratos de repositorios
├── Infrastructure/      # Implementaciones concretas
│   ├── Data/           # Contexto de base de datos
│   └── Repositories/   # Implementación de repositorios
└── Migrations/         # Migraciones de base de datos
```

### Frontend
```
FRONTEND/InderV1/src/
├── application/         # Lógica de aplicación
│   ├── repositories/   # Adaptadores para la API
│   ├── stores/         # Gestión de estado (Pinia)
│   └── usecases/       # Casos de uso
├── core/               # Núcleo de la aplicación
│   ├── entities/       # Modelos de dominio
│   └── interfaces/     # Contratos y tipos
├── infrastructure/     # Infraestructura
│   └── services/       # Servicios externos
├── presentation/       # Capa de presentación
│   ├── components/     # Componentes reutilizables
│   ├── router/         # Configuración de rutas
│   └── views/          # Vistas principales
└── assets/             # Recursos estáticos
```

## 🔧 Configuración de Desarrollo

### Variables de Entorno

#### Backend (.env o appsettings.Development.json)
```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Server=localhost\\SQLEXPRESS;Database=ApiInderV1Db;Trusted_Connection=true;TrustServerCertificate=true;"
  },
  "AppSettings": {
    "Security": {
      "JwtSecretKey": "UnaClaveSecretaMuyLargaYSeguraParaJWTQueCumpleConLosRequisitosDeLongitudMinima123456789!",
      "TokenExpirationHours": 24
    }
  }
}
```

#### Frontend (.env)
```bash
VITE_API_URL=http://localhost:5000/api
```

## 🐛 Troubleshooting Común

### Problemas de Backend

**Error: "No se puede conectar a la base de datos"**
```bash
# Verificar cadena de conexión
# Asegurarse de que SQL Server esté corriendo
# Ejecutar migraciones
dotnet ef database update
```

**Error: "Paquete NuGet no encontrado"**
```bash
dotnet restore --force
```

**Error: "Puerto ya en uso"**
```bash
# Cambiar puerto en Properties/launchSettings.json
# O matar proceso en el puerto
netstat -ano | findstr :5000
taskkill /PID <numero_pid> /F
```

### Problemas de Frontend

**Error: "Dependencias no instaladas"**
```bash
rm -rf node_modules package-lock.json
npm install
```

**Error: "Componente no encontrado"**
```bash
# Verificar rutas de importación
# Asegurar extensión .vue en imports
# Verificar que el componente esté exportado correctamente
```

**Error: "CORS bloqueado"**
```bash
# Verificar configuración CORS en Program.cs del backend
# Asegurar que el origen esté permitido
```

## 📊 Convenciones de Código

### Backend (C#)
- **Naming**: PascalCase para clases y métodos públicos
- **Variables**: camelCase para variables locales
- **Constantes**: UPPER_SNAKE_CASE
- **Interfaces**: Prefijo "I" (ej: IUserRepository)

### Frontend (Vue/JavaScript)
- **Componentes**: PascalCase (ej: FormularioCard.vue)
- **Variables**: camelCase
- **Constantes**: UPPER_SNAKE_CASE
- **Archivos**: kebab-case (ej: crear-formulario-view.vue)

## 🔒 Buenas Prácticas de Seguridad

1. **Nunca commitear secrets** (.env, connection strings, claves API)
2. **Validar todas las entradas del usuario**
3. **Usar HTTPS en producción**
4. **Implementar rate limiting**
5. **Validar permisos en cada endpoint**
6. **Mantener dependencias actualizadas**

## 📈 Monitoreo y Logging

### Backend
```csharp
// Uso de ILogger
private readonly ILogger<Service> _logger;

_logger.LogInformation("Operación completada");
_logger.LogWarning("Advertencia importante");
_logger.LogError(ex, "Error ocurrido");
```

### Frontend
```javascript
// Console logging estructurado
console.info('✅ Operación exitosa:', data);
console.warn('⚠️ Advertencia:', warning);
console.error('❌ Error:', error);
```

## 🔄 Flujo de Trabajo Git

```bash
# Crear nueva rama para feature
git checkout -b feature/nueva-funcionalidad

# Commits descriptivos
git commit -m "feat: agregar funcionalidad de búsqueda"
git commit -m "fix: corregir validación de formulario"
git commit -m "docs: actualizar documentación de API"

# Push a remote
git push origin feature/nueva-funcionalidad

# Merge a main
git checkout main
git merge feature/nueva-funcionalidad
```

## 🎯 Próximos Pasos de Desarrollo

1. **Implementar validaciones más robustas**
2. **Agregar sistema de notificaciones**
3. **Implementar paginación en listados**
4. **Agregar filtros avanzados**
5. **Crear sistema de reportes**
6. **Implementar internacionalización**
7. **Agregar dark mode**
8. **Optimizar rendimiento**