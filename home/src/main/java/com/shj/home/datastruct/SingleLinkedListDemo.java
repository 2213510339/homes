package com.shj.home.datastruct;

import java.util.Objects;

/**
 * @ClassName: SingleLinkedList
 * @Author: haojie.sun
 * @Description:
 * @Date: 2021/2/18 14:50
 * @Version: 1.0
 */
public class SingleLinkedListDemo {
    public static void main(String[] args) {
        SingleLinkedList singleLinkedList = new SingleLinkedList();
        Node n1 = new Node(1,"n1", "nc1");
        Node n2 = new Node(2,"n2", "nc2");
        Node n3 = new Node(3,"n3", "nc3");
        Node n4 = new Node(4,"n4", "nc4");
        Node n5 = new Node(5,"n5", "nc5");
        addList(singleLinkedList,n1,n2,n3,n4,n5);
        singleLinkedList.list();
        singleLinkedList.remove(n1);
        singleLinkedList.remove(n1);
        System.out.println(singleLinkedList.getSize());
        singleLinkedList.list();
        Node n11 = new Node(11,"n11", "nc1");
        Node n12 = new Node(12,"n12", "nc2");
        Node n13 = new Node(13,"n13", "nc3");
        Node n14 = new Node(14,"n14", "nc4");
        Node n15 = new Node(15,"n15", "nc5");
//        singleLinkedList = null;
        SingleLinkedList singleLinkedList1 = new SingleLinkedList();
        addSortedList(singleLinkedList1,n11,n12,n13,n14,n15);
        System.out.println(singleLinkedList1.getSize());
        singleLinkedList1.list();
        singleLinkedList1.remove(n11);
        singleLinkedList1.remove(n12);
        singleLinkedList1.list();

    }

    private static void addList(SingleLinkedList singleLinkedList,Node n1, Node n2, Node n3, Node n4, Node n5) {
        singleLinkedList.addList(n1);
        // 如果加入重复的节点,则会无限加
//        singleLinkedList.addList(n1);
        singleLinkedList.addList(n2);
        singleLinkedList.addList(n4);
        singleLinkedList.addList(n5);
        singleLinkedList.addList(n3);
    }
    private static void addSortedList(SingleLinkedList singleLinkedList,Node n1, Node n2, Node n3, Node n4, Node n5) {
        singleLinkedList.addSorted(n5);
        singleLinkedList.addSorted(n4);
        singleLinkedList.addSorted(n3);
        singleLinkedList.addSorted(n5);
        singleLinkedList.addSorted(n3);
        singleLinkedList.addSorted(n1);
    }
}

class  SingleLinkedList {
    private Node head;
    private  int size;
    public SingleLinkedList() {
        // 初始化头节点
        head = new Node(-1,"","");
    }


    // add
    public void addList(Node node){
        Node temp = head;
        while(true) {
            if(temp.getNext() == null) {
                temp.setNext(node);
                size ++;
                break;
            }
            else {
                temp = temp.getNext();
            }
        }
    }
    public int getSize(){
        return size;
    }
    public void remove(Node node){
        Node temp = head;
        while(true) {
            if (Objects.isNull(temp)) {
                System.out.println("已到末尾,没有对应的元素");
                break;
            }
            System.out.println("temp-<"+temp);
            if(Objects.nonNull(temp.getNext()) &&temp.getNext().equals(node)) {
                temp.setNext(node.getNext());
                System.out.println("已删除元素");
                size--;
                break;
            }
            else {
                temp = temp.getNext();
            }
        }
    }
    public  void addSorted(Node node) {
        Node temp = head;
        while(true) {
            if (temp.hashNext()) {
                // 判断下一个元素
                if(temp.getNext().getNo() == node.getNo()) {
                    System.out.printf("已存在编号为%d的元素\n", node.getNo());
                    break;
                }
                if(temp.getNext().getNo() > node.getNo()) {
                    //下一个元素比要插入的大
                    Node next =  temp.getNext();
                    temp.setNext(node);
                    temp.getNext().setNext(next);
                    System.out.println("插入成功");
                    size++;
                    break;
                }
                if(temp.getNext().getNo() < node.getNo()) {
                    //下一个元素比要插入的小
                    temp = temp.getNext();
                }
            }
            else {
                temp.setNext(node);
                break;
            }

        }
    }
    // 遍历
    public void list() {
        Node temp = head;
        while(true) {
            if (temp.hashNext()) {
                System.out.println(temp);
                temp = temp.getNext();
            }
            else{
                System.out.println(temp);
                break;
            }
        }
    }
}

