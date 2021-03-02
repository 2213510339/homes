package com.shj.home;

import org.junit.jupiter.api.Test;

import java.util.Arrays;
import java.util.Collection;
import java.util.Iterator;
import java.util.Queue;
import java.util.concurrent.ConcurrentHashMap;

/**
 * @ClassName: JDKTest
 * @Author: haojie.sun
 * @Description:
 * @Date: 2021/2/18 17:39
 * @Version: 1.0
 */
public class JDKTest {
    private static final int MAXIMUM_CAPACITY = 1 << 30;
    public static void main(String[] args) {
        ConcurrentHashMap map = new ConcurrentHashMap();
        System.out.println(tableSizeFor(2));
    }
    @Test
    public  void test1() {
        int c =0;
        System.out.println(c|=c >>> 16);
    }
    private static final int tableSizeFor(int c) {
        int n = c - 1;
        n |= n >>> 1;
        n |= n >>> 2;
        n |= n >>> 4;
        n |= n >>> 8;
        n |= n >>> 16;
        return (n < 0) ? 1 : (n >= MAXIMUM_CAPACITY) ? MAXIMUM_CAPACITY : n + 1;
    }

    @Test
    public void test12(){
        String str = "2021.Q1";
       String[] strarr= str.split("\\.");
        System.out.println(strarr[0]);
    }
}
