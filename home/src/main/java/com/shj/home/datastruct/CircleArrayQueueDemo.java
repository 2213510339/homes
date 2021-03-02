package com.shj.home.datastruct;

import java.util.Arrays;
import java.util.Scanner;

/**
 * @ClassName: CircleArrayQueue
 * @Author: haojie.sun
 * @Description: 环形数组模拟队列
 *
 * @Date: 2021/2/18 9:59
 * @Version: 1.0
 */
public class CircleArrayQueueDemo {
    public static void main(String[] args) {
        CircleArrayQueue queue = new CircleArrayQueue(4);
        boolean flag = true;
        while (flag) {
            System.out.println("请输入 e: 退出, a 新增,g:获取, h:第一个元素, s: 查看队列, q: 查看数组");
            Scanner scanner = new Scanner(System.in);
            char c = ' ';
            c = scanner.next().charAt(0);
            switch (c){
                case 'e':
                    flag = false;
                    break;
                case 'a':
                    System.out.println("请输入数字");
                    int val = scanner.nextInt();
                    try{
                        queue.add(val);

                    }catch (Exception e) {
                        System.out.println(e.getMessage());
                    }
                    break;
                case 'g':
                    System.out.println(queue.get());
                    break;
                case 'h':
                    try{
                        System.out.println(queue.head());
                    }catch (Exception e) {
                        System.out.println(e.getMessage());
                    }
                    break;
                case 's':
                    queue.showQueue();
                    break;
                case 'q':
                    System.out.println(queue);
                    break;
                default:
                    break;
            }

        }
        System.out.println("退出");
    }
}
class CircleArrayQueue{
    int front;
    int end;
    int[] arr;
    int maxSize;
    public CircleArrayQueue(int size){
        maxSize =size;
        arr = new int[maxSize];
    }
    public boolean isEmpty(){
        return front == end;
    }
    public boolean isFull() {
        return (end + 1) % maxSize == front;
    }

    //新增
    public void add (int n) {
        if (isFull()) {
           throw new RuntimeException("队列已满,不能增加");
        }
        arr[end] = n;
        end = (end+1)%maxSize;
    }
    //取出
    public int get () {
        if (isEmpty()) {
            throw new RuntimeException("队列为空,不能取出");
        }
        int value = arr[front];
        front = (front+1)%maxSize;
        return value;
    }
    // 查看队列
    public void showQueue() {
        for (int i = front; i < front + size(); i++) {
            System.out.printf("queue[%d]=%d\n", (i % maxSize), arr[i % maxSize]);
        }
    }
    // 队列中的有效元素
    public int size() {
        return (end - front +maxSize) % maxSize;
    }

    public int head() {
        if (isEmpty()) {
            throw new RuntimeException("队列为空");
        }
        return arr[front];
    }

    @Override
    public String toString() {
        return "CircleArrayQueue{" +
                "front=" + front +
                ", end=" + end +
                ", arr=" + Arrays.toString(arr) +
                ", maxSize=" + maxSize +
                '}';
    }
}

