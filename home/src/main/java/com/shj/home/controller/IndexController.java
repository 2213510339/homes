package com.shj.home.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

/**
 * @ClassName: IndexController
 * @Author: haojie.sun
 * @Description:
 * @Date: 2021/1/6 11:22
 * @Version: 1.0
 */
@Controller
@RequestMapping("/")
public class IndexController {
    public ModelAndView index() {
        return new ModelAndView("cache");
    }
}