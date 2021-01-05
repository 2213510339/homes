package com.shj.home.dao;

import com.shj.home.entity.User;

/**
 * @ClassName: UserRespository
 * @Author: haojie.sun
 * @Description:
 * @Date: 2021/1/4 15:45
 * @Version: 1.0
 */
public interface UserRepository {

    User getUserById(String id);
}
