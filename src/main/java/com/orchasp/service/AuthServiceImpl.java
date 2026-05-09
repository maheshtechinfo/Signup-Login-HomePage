package com.orchasp.service;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.orchasp.dto.LoginRequest;
import com.orchasp.dto.SignupRequest;
import com.orchasp.dto.UserResponse;
import com.orchasp.entity.User;
import com.orchasp.exception.ValidationException;
import com.orchasp.repository.UserRepository;

@Service
public class AuthServiceImpl implements AuthService {

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private EmailService emailService;
	
	@Autowired
	private BCryptPasswordEncoder passwordEncoder;

	// SIGNUP
	@Override
	public String signup(SignupRequest request) {

		if (!request.getPassword().equals(request.getConfirmPassword())) {
			Map<String, String> errors = new HashMap<>();
			errors.put("confirmPassword", "Passwords do not match");

			throw new ValidationException(errors);
		}

		if (userRepository.findByEmail(request.getEmail()).isPresent()) {
		    Map<String, String> errors = new HashMap<>();
		    errors.put("email", "Email already exists");

		    throw new ValidationException(errors);
		}

		User user = new User();
		user.setName(request.getName());
		user.setEmail(request.getEmail());
		user.setMobile(request.getMobile());
		user.setAddress(request.getAddress());
		user.setPassword(passwordEncoder.encode(request.getPassword()));
		
		userRepository.save(user);

		// ✅ SEND EMAIL
		emailService.sendSignupEmail(user.getEmail(), user.getName());

		return "Account Created Successfully";
	}

	// LOGIN
	@Override
	public UserResponse login(LoginRequest request) {

		User user = userRepository.findByEmail(request.getEmail())
				.orElseThrow(() -> new RuntimeException("User not found"));

		if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
		    throw new RuntimeException("Email or Password Mismatch");
		}

		return mapToResponse(user);
	}

	// HOME
	@Override
	public UserResponse getUserByEmail(String email) {

		User user = userRepository.findByEmail(email).orElseThrow(() -> new RuntimeException("User not found"));

		return mapToResponse(user);
	}

	// 🔁 Common Mapping Method
	private UserResponse mapToResponse(User user) {

		UserResponse res = new UserResponse();
		res.setId(user.getId());
		res.setName(user.getName());
		res.setEmail(user.getEmail());
		res.setMobile(user.getMobile());
		res.setAddress(user.getAddress());

		return res;
	}
}