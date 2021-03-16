package com.moss.admin.security.auth;

import com.moss.admin.domain.User;
import com.moss.admin.domain.UserRole;
import com.moss.admin.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class UserDetailServiceImpl implements UserDetailsService {

    private final UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository.findByUserId(username).orElseThrow(
                () -> { throw new UsernameNotFoundException(username);}
        );

        final String prefix = "ROLE_";
        List<GrantedAuthority> authorities = new ArrayList<>();
        if(user.getRole() == UserRole.ADMIN) authorities.add(new SimpleGrantedAuthority(prefix + user.getRole()));

        return new UserDetailsImpl(user.getUserId(), user.getPassword(), authorities);
    }
}
