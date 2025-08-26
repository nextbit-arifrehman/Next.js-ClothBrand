//  
// import { NextResponse } from 'next/server';

// export default withAuth(
//   function middleware(req) {
//     const { pathname } = req.nextUrl;
//     const token = req.nextauth.token;

//     // Log access to protected routes for debugging
//     console.log('Protected route accessed:', pathname, 'Token exists:', !!token);

//     // Additional validation for dashboard routes
//     if (pathname.startsWith('/dashboard')) {
//       // Ensure user has valid session data
//       if (!token || !token.email) {
//         console.log('Invalid token data, redirecting to login');
//         const loginUrl = new URL('/login', req.url);
//         loginUrl.searchParams.set('callbackUrl', req.url);
//         return NextResponse.redirect(loginUrl);
//       }
//     }

//     // Allow access to protected route
//     return NextResponse.next();
//   },
//   {
//     callbacks: {
//       authorized: ({ token, req }) => {
//         const { pathname } = req.nextUrl;
        
//         // For dashboard routes, check if token exists and is valid
//         if (pathname.startsWith('/dashboard')) {
//           return !!token && !!token.email;
//         }
        
//         // Allow access to other routes (this shouldn't be reached due to matcher)
//         return true;
//       },
//     },
//   }
// );

// // Protect all routes under /dashboard
// export const config = {
//   matcher: [
//     '/dashboard/:path*'
//     // Remove /login from matcher to prevent redirect loop
//   ]
// };





import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const pathname = req.nextUrl?.pathname || "";
    const token = req.nextauth?.token;

    // Log access to protected routes for debugging
    console.log("Protected route accessed:", pathname, "Token exists:", !!token);

    // Additional validation for dashboard routes
    if (pathname.startsWith("/dashboard")) {
      if (!token || !token.email) {
        console.log("Invalid token data, redirecting to login");
        const loginUrl = new URL("/login", req.url);
        loginUrl.searchParams.set("callbackUrl", req.url);
        return NextResponse.redirect(loginUrl);
      }
    }

    // Allow access to protected route
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const pathname = req.nextUrl?.pathname || "";

        // For dashboard routes, check if token exists and is valid
        if (pathname.startsWith("/dashboard")) {
          return !!token && !!token.email;
        }

        // Allow access to other routes (not matched by config.matcher)
        return true;
      },
    },
  }
);

// Protect all routes under /dashboard
export const config = {
  matcher: ["/dashboard/:path*"],
};
