<?php

namespace App\Http\Middleware;

use Closure;

class CheckPermission
{
    public function handle($request, Closure $next, ...$permissions)
    {
        $user = $request->user();

        foreach ($permissions as $permission) {
            if (!$user->hasPermission($permission))
            {
                abort(403, 'Access denied.');
            }
        }

        return $next($request);
    }
}
