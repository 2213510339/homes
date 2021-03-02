package com.shj.home.dao.mapper;

import com.shj.home.entity.User;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;

import java.util.List;

/**
 * @ClassName: UserMapper
 * @Author: haojie.sun
 * @Description:
 * @Date: 2021/1/4 15:46
 * @Version: 1.0
 */
@Mapper
public interface UserMapper {
    @Select("select id, name, age from home_user where id = #{id}")
    User getUserById(String id);

    List<User> getUserByIds(@Param("ids") List<String> ids);

    void addUser(User user);
}
