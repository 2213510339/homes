package com.shj.home;

import org.junit.jupiter.api.Test;

import java.util.HashMap;
import java.util.Objects;

/**
 * @ClassName: HashTest
 * @Author: haojie.sun
 * @Description:
 * @Date: 2021/2/25 14:49
 * @Version: 1.0
 */
public class HashTest {


    @Test
    public void testHash(){
        HashTab hashTab = new HashTab(7);
        for (int i = 0; i < 100; i++) {
            hashTab.add(new Emp(i, "name"+i));
        }
        hashTab.show();
    }
}
class HashTab{
    int size;
    LinkedList[] linkedLists;
    public HashTab(int size){
        this.size=size;
        linkedLists = new LinkedList[size];
        for (int i = 0; i < size; i++) {
            linkedLists[i] = new LinkedList();
        }
    }

    public void add(Emp e){
        linkedLists[getIndex(e)].add(e);
    }
    public void show(){
        for (int i = 0; i < size; i++) {
            linkedLists[i].list();
        }
    }



    public int getIndex(Emp e){
        return e.no %size;
    }
}
class LinkedList{
    private Emp head;
    //add
        public void add(Emp emp) {
            if(Objects.isNull(head)){
                head = emp;
            }
            else {
                Emp temp = head;
                while (true){
                    if(Objects.isNull(temp.next)){
                        temp.next = emp;
                        break;
                    }
                    temp =temp.next;
                }
            }

        }


    //list
    public  void list(){
        Emp temp =head;
        if(Objects.isNull(temp)){
            System.out.println("该位置的链表没有数据");
            return;
        }
        while(Objects.nonNull(temp)){
            System.out.println(temp);
            temp=temp.next;
        }
    }

}
class Emp{
     int no;
     String name;
    Emp next;
    public Emp(int no, String name){
        this.name =name;
        this.no = no;
    }

    @Override
    public String toString() {
        return "Emp{" +
                "no=" + no +
                ", name=" + name +
                '}';
    }

}
