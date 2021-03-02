package com.shj.home.morethread;

import lombok.SneakyThrows;

/**
 * @ClassName: Mythread
 * @Author: haojie.sun
 * @Description:
 * @Date: 2021/2/19 18:35
 * @Version: 1.0
 */
public class Mythread  extends Thread{
    public static  int NUM =10;
    @SneakyThrows
    @Override
    public synchronized void run() {
            Thread.sleep(500);
            while(NUM>0) {
                System.out.println(Thread.currentThread().getName() + "->" + NUM--);
        }
    }
}
