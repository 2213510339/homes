package com.shj.home.service.impl;

import com.shj.home.dao.UserRepository;
import com.shj.home.entity.User;
import com.shj.home.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * @ClassName: UserServiceImpl
 * @Author: haojie.sun
 * @Description:
 * @Date: 2021/1/4 15:43
 * @Version: 1.0
 */
@Service
public class UserServiceImpl  implements UserService {
    @Autowired
    UserRepository userRepository;
    @Override
    public User getUserById(String id) {
        return userRepository.getUserById(id);
    }
}
