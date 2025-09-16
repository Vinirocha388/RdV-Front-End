import { NextResponse } from "next/server";

// Rotas totalmente públicas (não exigem autenticação)
const publicRoutes = ["/", "/auth", "/recipes", "/about", "/contato"];

// Rotas de operações CRUD protegidas (criar, editar, excluir)
const protectedCrudRoutes = ["/dashboard/recipes/new", "/dashboard/recipes/edit"];

export function middleware(request) {
  // Obter o token do cookie
  const token = request.cookies.get("token")?.value;
  const { pathname } = request.nextUrl;

  // Verificar se a rota atual é pública
  const isPublicRoute = publicRoutes.some(
    (route) => pathname === route || 
    pathname.startsWith("/auth") || 
    pathname.startsWith("/recipes") ||
    pathname.startsWith("/about") ||
    pathname.startsWith("/contato")
  );
  
  // Verificar se é uma operação de visualização (GET)
  const isViewOperation = pathname === "/" || 
                        pathname.startsWith("/recipes") || 
                        pathname === "/about" || 
                        pathname === "/contato";

  // Verificar se é uma rota que requer operações de modificação (POST/PUT/DELETE)
  const isCrudOperation = protectedCrudRoutes.some(
    (route) => pathname.startsWith(route)
  ) || pathname.startsWith("/dashboard");

  // Se for uma operação de modificação e não tiver token, redirecionar para login
  if (isCrudOperation && !token) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // Se não for rota pública e não tiver token, redirecionar para login
  if (!isPublicRoute && !token) {
    return NextResponse.redirect(new URL("/", request.url));
  }
  
  // Se estiver na página de login/autenticação e já estiver autenticado, redirecionar para dashboard
  if ((pathname === "/auth" || pathname === "/") && token && pathname === "/") {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // Continuar com a requisição normalmente
  return NextResponse.next();
}

// Configurar em quais caminhos o middleware será aplicado
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};