package com.orchasp.service;

import com.orchasp.dto.LoginRequest;
import com.orchasp.dto.SignupRequest;
import com.orchasp.dto.UserResponse;

public interface AuthService {

	String signup(SignupRequest request);

	UserResponse login(LoginRequest request);

	UserResponse getUserByEmail(String email);
}