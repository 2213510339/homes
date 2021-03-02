package com.shj.home.datastruct;


/**
 * @ClassName: JosepfuLinkedListDemo
 * @Author: haojie.sun
 * @Description:
 * 约瑟夫问题是个有名的问题：N个人围成一圈，从第n个开始报数，第k个将被杀掉，最后剩下一个
 * @Date: 2021/2/19 15:38
 * @Version: 1.0
 */
public class JosepfuLinkedListDemo {
    public static void main(String[] args) {
        JosepfuLinkedList list = new JosepfuLinkedList();
        list.add(15);
//        list.list();
        list.show(1, 4, 15);
    }

}
// 环形链表
class JosepfuLinkedList{
    public Boy head;

    public Boy getHead() {
        return head;
    }

    private boolean isEmpty() {
        return head.next ==null;
    }
    public void add(int nums) {
        if (nums <1) {
            System.out.println("长度输入不合法");
            return;
        }
        Boy temp = null;
        for (int i = 1; i <= nums ; i++) {
            Boy curr = new Boy(i);
            if (i == 1) {
                // 第一个也要成环
               head = curr;
               head.next = head;
               temp = head;
            }
            else {
                temp.next = curr;
                curr.next = head;
                temp = curr;
            }
        }
    }
    public void list() {
        if (isEmpty()) {
            System.out.println("没有数据");
            return;
        }
        Boy temp = head;
        while (true) {
            if (temp.next == head) {
                System.out.println(temp.no);
                break;
            }
            System.out.println(temp.no);
            temp = temp.next;
        }
    }

    public void show(int n, int k , int num){
        if (n <1 || k<1 || num<k)  {
            System.out.println("输入不合法");
            return;
        }
        if (head == null) {
            System.out.println("空的");
            return;
        }
        // 找到尾部的节点
        Boy end = head;
        while (end.next != head) {
            end = end.next;
        }
        // 从第n个人开始
        for (int i = 0; i < n -1 ; i++) {
            head = head.next;
            end = end.next;
        }
        while(true) {
            if(end == head) {
                System.out.println("last " + head.no);
                break;
            }
            // 每次数k出圈
            for (int i = 0; i < k-1 ; i++) {
                head =head.next;
                end = end.next;
            }
            System.out.println("out " + head.no);
            head = head.next;
            end.next = head;
        }
    }
}
class Boy{
    public int no;
    public Boy next;
    public Boy(int no){
        this.no =no;
    }

    @Override
    public String toString() {
        return "Boy{" +
                "no=" + no +
                '}';
    }
}
