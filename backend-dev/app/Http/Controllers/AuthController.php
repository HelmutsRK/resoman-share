<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Repositories\AuthRepository;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class AuthController extends Controller
{
    private AuthRepository $authRepository;

    public function __construct(AuthRepository $authRepository)
    {
        $this->middleware('auth:api', ['except' => ['login']]);
        $this->authRepository = $authRepository;
    }

    /**
     * Lietotāja pieslēgšanās, kas atgriež lietotāju datus un ģenerēto JWT token
     *  
     * @param Request $request
     * @return JsonResponse
     */
    public function login(): JsonResponse
    {
        /* Šeit tiek paņemti ievadītie dati, email un password */
        $credentials = $this->input(['email', 'password']);
        /* Šeit tiek validēti ievadītie dati, vai tie ir pareizi ievadīti */
        $validator = $this->validateInput($credentials, [], new User());

        /* Ja validators, atrod kādu validācijas kļūdu, tad izvadās validatora errors */
        if ($validator) {
            return $this->error($validator);
        }

        /* Tokens tiek uzģenerēts un saglabāts $token mainīgajā */
        $token = $this->authRepository->generateJwtByCredentials($credentials);

        /* Ja tokens neeksistē, jo netika uzģenerēts tad izvadās error paziņojums konsolē */
        if (!$token) {
            return $this->error('Unauthorized', 401);
        }


        /* Lietotājs ar kuru pieslēdzās tiek atlasīts ar getUser() funkciju, kas atrodās authRepository un saglabāts $user mainīgajā */
        $user = $this->authRepository->getUser();

        /* Lietotājs veiksmīgi pievienojās sistēmai un tika izveidota sesija*/
        return $this->success([
            'user' => $user,
            'token' => $token
        ]);
    }


    /* Lietotāja izrakstīšanās no sistēmas*/
    public function logout(): JsonResponse
    {
        /* Lietotājs tiek izrakstīts ārā no sistēmas un tiek izdzēsts JWT tokens, izmantojot logoutUser() funkciju*/
        $this->authRepository->logoutUser();
        return $this->success();
    }

    /* Refresh funkcija atjauno sesiju*/
    public function refresh(): JsonResponse
    {
        return $this->success([
            'token' => $this->authRepository->refreshJwtToken()
        ]);
    }


}
