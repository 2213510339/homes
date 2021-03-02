package com.shj.home.datastruct;

import java.util.Objects;

/**
 * @ClassName: DoubleLinkedList
 * @Author: haojie.sun
 * @Description:
 * @Date: 2021/2/19 15:12
 * @Version: 1.0
 */
public class DoubleLinkedListDemo {
    public static void main(String[] args) {
        DoubleLinkedList linkedList = new DoubleLinkedList();
        DoubleNode n1 = new DoubleNode(1,"n1", "nc1");
        DoubleNode n2 = new DoubleNode(2,"n2", "nc2");
        DoubleNode n3 = new DoubleNode(3,"n3", "nc3");
        DoubleNode n4 = new DoubleNode(4,"n4", "nc4");
        DoubleNode n5 = new DoubleNode(5,"n5", "nc5");
        linkedList.addNodeToEnd(n1);
        linkedList.addNodeToEnd(n2);
        linkedList.addNodeToEnd(n3);
        linkedList.addNodeToEnd(n4);
        linkedList.addNodeToEnd(n5);
        linkedList.list();
    }
}

    class DoubleLinkedList {
    public DoubleNode head;// 头节点
    public DoubleLinkedList(){
        head = new DoubleNode(-1,"","");
    }

    // 增加到链表的尾部
    public void addNodeToEnd(DoubleNode node) {
        DoubleNode temp = head;
        while(true) {
            if (temp.hashNext()) {
                temp = temp.getNext();
            }
            else {
                temp.setNext(node);
                node.setProv(temp);
                break;
            }
        }
    }
    // 更新
    public void update(DoubleNode node) {
        DoubleNode temp = head.getNext();
        while(true) {
            if(Objects.isNull(temp)) {
                System.out.println("没有找到对应的元素");
                break;
            }
            if (temp.getNo() == node.getNo()) {
                temp.getProv().setNext(node);
                temp.getNext().setProv(node);
                System.out.println("更新完成");
                break;
            }
            temp = temp.getNext();
        }
    }
    // 删除
    public void remove(int nodeId) {
        DoubleNode temp = head.getNext();
        while(true) {
            if(Objects.isNull(temp)) {
                System.out.println("没有找到对应的元素");
                break;
            }
            if (temp.getNo() == nodeId) {
                temp.getProv().setNext(temp.getNext());
                if (temp.hashNext()) {
                    temp.getNext().setProv(temp.getProv());
                }
                System.out.println("删除完成");
                break;
            }
            temp = temp.getNext();
        }
    }
    // 遍历
    public void list(){
        DoubleNode temp = head;
        while(true) {
            if (temp.hashNext()) {
                System.out.println(temp);
                temp=temp.getNext();
            }
            else {
                System.out.println(temp);
                break;
            }
        }
    }
}
