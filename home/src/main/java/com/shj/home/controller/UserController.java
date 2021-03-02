package com.shj.home.controller;

import com.shj.home.dao.mapper.StudentMapper;
import com.shj.home.dto.ResponseDTO;
import com.shj.home.entity.Student;
import com.shj.home.entity.User;
import com.shj.home.service.UserService;
import org.apache.ibatis.annotations.Param;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import java.util.List;
import java.util.Objects;

/**
 * @ClassName: UserController
 * @Author: haojie.sun
 * @Description:
 * @Date: 2021/1/4 15:24
 * @Version: 1.0
 */
@RestController
public class UserController {
    public final Logger logger = LoggerFactory.getLogger(this.getClass());

    UserService userService;
    StudentMapper studentMapper;
    public UserController(UserService userService, StudentMapper studentMapper) {
        this.userService =userService;
        this.studentMapper = studentMapper;
    }
    @RequestMapping(value = "/v1/user/getUser/{id}", method = RequestMethod.GET,
            headers = "Accept=application/json")
    public ResponseDTO confirmAlarm(@PathVariable String id, HttpServletRequest request) {
        ResponseDTO response = new ResponseDTO();
        logger.info("start get User");
        if (Objects.nonNull(id)) {
            User user = userService.getUserById(id);
            logger.info("get User: " + user);
            response.setData(user);
        }
        else {
            logger.error("id is null");
            response.setMessage("failure");
            response.setCode(ResponseDTO.PARAM_ERROR);
        }
        return response;
    }

    @RequestMapping(value = "/v1/student/update/{id}", method = RequestMethod.GET,
            headers = "Accept=application/json")
    public ResponseDTO updateStudent(@PathVariable String id) {
        ResponseDTO response = new ResponseDTO();
        try {
            Student stu = studentMapper.selectByPrimaryKey(Integer.valueOf(id));

//            Student stu2 = new Student();
//            stu2.setStuId("stuId");
//            stu2.setAge(1);
//            stu2.setName("name2");
//            studentMapper.insert(stu2);
//            stu.setStuId(System.currentTimeMillis() + "");
//            userService.updateStudent(stu);
            stu.setStuId("stu_id" + stu.getId());
            userService.updateStudent2(stu);

        }catch (Exception e) {
            logger.info(e.getMessage());
            response.setCode(ResponseDTO.ERROR);
            response.setMessage("System error!");
        }
        return response;
    }

}
