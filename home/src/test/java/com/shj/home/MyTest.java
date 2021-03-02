package com.shj.home;

import com.shj.home.entity.Student;
import com.shj.home.entity.User;
import org.junit.jupiter.api.Test;

import java.util.*;

/**
 * @ClassName: MyTest
 * @Author: haojie.sun
 * @Description:
 * @Date: 2021/1/8 17:41
 * @Version: 1.0
 */
public class MyTest {

    @Test
    public void test1(){
        String deviceIds = "1,2,3";
        System.out.println(Arrays.asList(deviceIds.split(",")));
    }
    @Test
    public void run() {
        String deviceId = "device-B1";
        String points = "a,b,c,d";
        String prefix = deviceId.split("-")[1] + ".";
        String [] pointArr = points.split(",");
        int len = pointArr.length;
        for (int i = 0; i < len ; i++) {
            pointArr[i] = prefix + pointArr[i];
        }
        System.out.println(String.join(",", pointArr));
        System.out.println(Arrays.toString(pointArr));
    }
    @Test
    public void run1() {
        Map<String, Set<String>> checkTokenUrlMap = new HashMap<>();

        List<String> list = new ArrayList<>();
        list.add("url");
        list.add("token");
        list.add("url");
        for (String s: list) {
            Set<String> checkTokens = checkTokenUrlMap.computeIfAbsent(s, k -> new HashSet<>());
            checkTokens.add(s);
        }
        System.out.println(checkTokenUrlMap);
    }
    @Test
    public void run2() {
        String power = "-1" ;
        System.out.println(Integer.parseInt(power) > 0 ? "1" : (Integer.parseInt(power) < 0 ? "0" : "2"));
    }
    @Test
    public void run3() {
        String deviceIds = ",,,,ab,1,,,";
        System.out.println(deviceIds.split(",").length);
        System.out.println(Arrays.toString(deviceIds.split(",")));
        System.out.println(Arrays.asList(deviceIds.split(",")));
    }


    @Test
    public void run4() {
        System.out.println(getUser());
        System.out.println(getUserStudent());
    }

    @Test
    public void run5() {

    }
    private User getUser() {
        User u = new User();
        return u;
    }
    private User getUserStudent() {
        User u = new Student();
        return u;
    }

}
