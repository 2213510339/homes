package com.shj.home.dao.impl;

import com.shj.home.dao.UserRepository;
import com.shj.home.dao.mapper.UserMapper;
import com.shj.home.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

/**
 * @ClassName: UserRepositoryImpl
 * @Author: haojie.sun
 * @Description:
 * @Date: 2021/1/4 15:47
 * @Version: 1.0
 */
@Repository
public class UserRepositoryImpl implements UserRepository {

    @Autowired
    UserMapper userMapper;
    @Override
    public User getUserById(String id) {
        return userMapper.getUserById(id);
    }
}
