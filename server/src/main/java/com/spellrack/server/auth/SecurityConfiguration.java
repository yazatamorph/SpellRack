package com.spellrack.server.auth;

import org.springframework.web.filter.CorsFilter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import com.spellrack.server.filters.AuthenticationFilter;
import com.spellrack.server.filters.AuthorizationFilter;

import lombok.RequiredArgsConstructor;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfiguration extends WebSecurityConfigurerAdapter {
        private final UserDetailsService userDetailsService;
        private final BCryptPasswordEncoder bCryptPasswordEncoder;

        @Override
        protected void configure(AuthenticationManagerBuilder auth) throws Exception {
                auth.userDetailsService(userDetailsService).passwordEncoder(bCryptPasswordEncoder);
        }

        @Override
        protected void configure(HttpSecurity http) throws Exception {
                AuthenticationFilter authFilter = new AuthenticationFilter(authenticationManagerBean());
                authFilter.setFilterProcessesUrl("/api/user/login");
                http.csrf().disable();
                http.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);
                // Unrestricted routes
                http.authorizeRequests()
                                .antMatchers("/api/user/logout/**", "/api/user/login/**", "/api/user/register/**",
                                                "/api/user/refresh/**")
                                .permitAll();
                // Requires USER role
                http.authorizeRequests().antMatchers(HttpMethod.GET, "/api/user/**", "/api/decks/**")
                                .hasAnyAuthority(Roles.USER.value());
                http.authorizeRequests().antMatchers(HttpMethod.POST, "/api/user/deck/**")
                                .hasAnyAuthority(Roles.USER.value());
                http.authorizeRequests().antMatchers(HttpMethod.PUT, "/api/user/deck/card/**")
                                .hasAnyAuthority(Roles.USER.value());
                http.authorizeRequests().antMatchers(HttpMethod.DELETE, "/api/user/deck/**")
                                .hasAnyAuthority(Roles.USER.value());
                // Requires ADMIN role
                http.authorizeRequests().antMatchers(HttpMethod.GET, "/api/users/**")
                                .hasAnyAuthority(Roles.ADMIN.value());
                http.authorizeRequests()
                                .antMatchers(HttpMethod.POST, "/api/user/save/**", "/api/user/addrole/**",
                                                "/api/role/save/**")
                                .hasAnyAuthority(Roles.ADMIN.value());
                http.logout().logoutUrl("/api/user/logout").logoutSuccessUrl("http://localhost:3000/signin");
                http.authorizeRequests().anyRequest().authenticated();
                http.addFilter(authFilter);
                http.addFilterBefore(new AuthorizationFilter(), UsernamePasswordAuthenticationFilter.class);
                http.cors();
        }

        @Bean
        @Override
        public AuthenticationManager authenticationManagerBean() throws Exception {
                return super.authenticationManagerBean();
        }

        @Bean
        CorsFilter corsFilter() {
                UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
                CorsConfiguration config = new CorsConfiguration();
                config.setAllowCredentials(true);
                config.addAllowedOrigin("http://localhost:3000");
                config.addAllowedHeader("*");
                config.addAllowedMethod(HttpMethod.DELETE);
                config.addAllowedMethod(HttpMethod.GET);
                config.addAllowedMethod(HttpMethod.HEAD);
                config.addAllowedMethod(HttpMethod.POST);
                config.addAllowedMethod(HttpMethod.PUT);
                config.addAllowedMethod(HttpMethod.OPTIONS);
                config.addAllowedMethod("*");
                source.registerCorsConfiguration("/**", config);
                return new CorsFilter(source);
        }

}
