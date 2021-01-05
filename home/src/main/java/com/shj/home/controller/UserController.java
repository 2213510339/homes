package com.shj.home.controller;

import com.shj.home.dto.ResponseDTO;
import com.shj.home.entity.User;
import com.shj.home.service.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
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

    @Autowired
    UserService userService;

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

}
