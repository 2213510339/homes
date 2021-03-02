package com.shj.home.controller;

import com.shj.home.dto.ResponseDTO;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;

/**
 * @ClassName: TestController
 * @Author: haojie.sun
 * @Description:
 * @Date: 2021/1/12 18:17
 * @Version: 1.0
 */
@RestController
public class TestController {
    @RequestMapping("/cache")
    public ResponseDTO getData(HttpServletRequest request) {
        ResponseDTO response = new ResponseDTO();
        response.setData("data");
        System.out.println(request);
        return response;
    }
}
