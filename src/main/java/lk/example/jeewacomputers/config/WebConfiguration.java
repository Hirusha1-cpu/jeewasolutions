package lk.example.jeewacomputers.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

//Spring Security uses this <GrantedAuthority> to enforce authorization rules defined in WebConfiguration.
// Permits access to certain URLs for all users.
// Requires specific authorities for other URLs.
// Configures login, logout, error handling, and password encoding.
@Configuration 
@EnableWebSecurity
public class WebConfiguration {
        // encode the password usingf bcrypt 
    private BCryptPasswordEncoder bCryptPasswordEncoder;
//     User makes request to a protected URL
// |
// | Authentication
// |    v
// | MyUserDetailService retrieves user roles from database
// |    v
// | GrantedAuthority array created with user's roles
// |    v
// | Spring Security compares roles in GrantedAuthority array
// |    v
// | with roles in hasAnyAuthority("Admin", "Manager", "Cashier", "Store-Manager")
// |    v
// | Access granted if at least one match, otherwise denied

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity httpSecurity) throws Exception {
        httpSecurity.authorizeHttpRequests(auth -> {
            //allrole kiynne user account ekak tibot witarai access hmbenne
            // mekedi hasAnyAuthrity, permitall ewat user authority(roles) tika aragnnwa UserDetails wlin hadapu user object eken adala url wlata permission denna

            auth
                    .requestMatchers("/controllerjs/**").permitAll()
                    .requestMatchers("/resourcesT/**").permitAll()
                    .requestMatchers("/createadmin").permitAll()
                    .requestMatchers("/login").permitAll()
                    .requestMatchers("/error").permitAll()
                    .requestMatchers("/dashboard").hasAnyAuthority("Admin", "Manager", "Cashier", "Store-Manager","Technician")
                    .requestMatchers("/employee/**").hasAnyAuthority("Admin", "Manager","Cashier", "Store-Manager","Technician")
                    .requestMatchers("/user/**").hasAnyAuthority("Admin", "Manager","Cashier", "Store-Manager","Technician")
                    .requestMatchers("/privilege/**").hasAnyAuthority("Admin", "Manager","Cashier", "Store-Manager","Technician")

                    .anyRequest().authenticated();
        })
                // login form detail
                //mekdi login url ekat gyoth password ha username match wenwa nm default succec url eka washyen set krnw dashboard eka
                // nattn failure url ekak lesa error url ekak pass krnw ekata adalawa html file ekak define krnn one login controller eke
                // logout wenw nm aye login url ekata awilla login.html eka pennann one
                .formLogin(login -> {
                    login
                            .loginPage("/login")
                            .defaultSuccessUrl("/dashboard", true)
                            .failureUrl("/login?error=usernamepassworderror")
                            .usernameParameter("username")
                            .passwordParameter("password");// udin login eken ena un, pw metenta enwa ,html ekath ekka
                                                           // match wenwada balanwa

                })
                .logout(logout -> {
                    logout
                            .logoutUrl("/logout")
                            .logoutSuccessUrl("/login");
                })
                .exceptionHandling(exception -> {
                    exception
                            .accessDeniedPage("/error");
                })
                //CSRF (Cross-Site Reference):
                //service accecss krnna ba, data enne na, ajax ehem use krnne na
                .csrf(csrf -> {
                    csrf.disable();
                });
                // adala detail tika aran security eka build up krnw
        return httpSecurity.build();

    }

    @Bean
    public BCryptPasswordEncoder bCryptPasswordEncoder() {

        bCryptPasswordEncoder = new BCryptPasswordEncoder();
        return bCryptPasswordEncoder;
    }
}
