package com.shj.home.morethread;

import java.util.concurrent.Callable;

/**
 * @ClassName: MyCallable
 * @Author: haojie.sun
 * @Description:
 * @Date: 2021/2/20 9:49
 * @Version: 1.0
 */
public class MyCallable implements Callable {
    private static int NUM = 10;
    @Override
    public Object call() throws Exception {
        synchronized (this) {
            while(NUM > 0){
                System.out.println(Thread.currentThread().getName() + "->" + NUM);
                NUM--;
            }

        }
        return NUM;
    }

}
