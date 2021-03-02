package com.shj.home.datastruct;

import java.util.Objects;

/**
 * @ClassName: Node
 * @Author: haojie.sun
 * @Description:
 * @Date: 2021/2/18 14:51
 * @Version: 1.0
 */
public class Node {
    private  int no;
    private String name;
    private String nickName;
    private Node next;
    public Node(int no, String name, String nickName) {
        this.name = name;
        this.no = no;
        this.nickName = nickName;
    }
    public boolean hashNext() {
        return Objects.nonNull(this.getNext());
    }
    public void setNext(Node next) {
        this.next = next;
    }

    public Node getNext() {
        return next;
    }

    public int getNo() {
        return no;
    }

    @Override
    public String toString() {
        return "Node{" +
                "no=" + no +
                ", name='" + name + '\'' +
                ", nickName='" + nickName + '\'' +
                '}';
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Node node = (Node) o;
        return no == node.no &&
                Objects.equals(name, node.name) &&
                Objects.equals(nickName, node.nickName) ;
    }

    @Override
    public int hashCode() {
        return Objects.hash(no, name, nickName, next);
    }
}
