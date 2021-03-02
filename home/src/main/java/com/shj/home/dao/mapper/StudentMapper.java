package com.shj.home.dao.mapper;

import com.shj.home.entity.Student;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

/**
 * @ClassName:      StudentMapper
 * @Author:    haojie.sun
 * @Description:  
 * @Date:    2021/1/28 16:07
 * @Version:    1.0
 */
@Mapper
public interface StudentMapper {
    int deleteByPrimaryKey(Integer id);

    int insert(Student record);

    int insertSelective(Student record);

    Student selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(Student record);

    int updateByPrimaryKey(Student record);

    int updateDeviceHistoryCapacity(@Param("updated") Student student);
    int updateDeviceHistoryCapacity2(Student student);
    List<Student> selectAll();
}