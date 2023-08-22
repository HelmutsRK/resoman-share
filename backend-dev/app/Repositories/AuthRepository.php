<?php
namespace App\Repositories;
use App\Models\User;
use Illuminate\Contracts\Auth\Authenticatable;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

// Repository, kurā glabā autorizācijas funkcijas
class AuthRepository{

    // Uzģenerē JWT izmantojot lietotāja datus
    public function generateJwtByCredentials(array $credentials = []): ?string
    {
        $credentials['allow_login'] = 1;
        $credentials['is_active'] = 1;
        return Auth::attempt($credentials);
    }
    // Uzģenerē JWT izmantotjot pieslēgušās lietotāja datus
    public function generateJwtByModel(User $user): ?string
    {
        return Auth::login($user);
    }
    // Atlasa lietotāju ar kuru pieslēdzās sistēmai
    public function getUser(): Authenticatable|false
    {
        return Auth::user();
    }
    // Izraksta lietotāju no sistēmas
    public function logoutUser(): void
    {
        Auth::logout();
    }
    // Atjauno lietotāja JWT token
    public function refreshJwtToken(): string
    {
        return Auth::refresh();
    }
}
