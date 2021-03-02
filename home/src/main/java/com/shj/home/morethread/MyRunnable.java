package com.shj.home.morethread;

import lombok.SneakyThrows;

/**
 * @ClassName: MyRunnable
 * @Author: haojie.sun
 * @Description:
 * @Date: 2021/2/19 18:41
 * @Version: 1.0
 */
public class MyRunnable implements Runnable {
    private static int COUNT =9;
    @SneakyThrows
    @Override
    public void run() {
        synchronized (this){
            Thread.sleep(500);
            while(COUNT > 0)
            System.out.println(Thread.currentThread().getName() + "->" + COUNT--);
        }
    }
}
