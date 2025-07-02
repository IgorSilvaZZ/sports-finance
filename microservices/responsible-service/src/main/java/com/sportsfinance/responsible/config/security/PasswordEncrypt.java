package com.sportsfinance.responsible.config.security;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

public class PasswordEncrypt {

    public static String encoder(String password) {
        BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        return passwordEncoder.encode(password);
    }

    public static boolean decoder(CharSequence passwordEncoder, String password){
        BCryptPasswordEncoder passwordDecoder = new BCryptPasswordEncoder();
        return passwordDecoder.matches(passwordEncoder, password);
    }


}
