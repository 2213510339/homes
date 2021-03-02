package com.shj.home.morethread;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.*;

/**
 * @ClassName: ThreadTest
 * @Author: haojie.sun
 * @Description:
 * @Date: 2021/2/19 18:36
 * @Version: 1.0
 */
public class ThreadTest {
    public static void main(String[] args) throws Exception {
//        testThread();
//        testRunnable();
        testCallable();
    }

    private static void testRunnable() {
        new Thread(new MyRunnable()).start();
        new Thread(new MyRunnable()).start();
    }
    private static void testCallable() throws Exception {
        ExecutorService pool = Executors.newFixedThreadPool(5);
        List<Future> futures = new ArrayList<>();
        for (int i=0; i< 5;i++) {
            Callable callable = new MyCallable();
            Future future = pool.submit(callable);
            futures.add(future);
        }
        pool.shutdown();
        for (Future f :futures) {
            System.out.println(Thread.currentThread().getName() + "-<"+f.get());
        }


    }

    private static void testThread() {
        new Mythread().start();
       new Mythread().start();
    }
}
