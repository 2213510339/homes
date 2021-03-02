package com.shj.home.datastruct;

import java.util.Objects;

/**
 * @ClassName: Node
 * @Author: haojie.sun
 * @Description:
 * @Date: 2021/2/18 14:51
 * @Version: 1.0
 */
public class DoubleNode {
    private  int no;
    private String name;
    private String nickName;
    private DoubleNode next;
    private DoubleNode prov;
    public DoubleNode(int no, String name, String nickName) {
        this.name = name;
        this.no = no;
        this.nickName = nickName;
    }
    public boolean hashNext() {
        return Objects.nonNull(this.getNext());
    }
    public void setNext(DoubleNode next) {
        this.next = next;
    }

    public DoubleNode getNext() {
        return next;
    }

    public DoubleNode getProv() {
        return prov;
    }

    public void setProv(DoubleNode prov) {
        this.prov = prov;
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
        DoubleNode node = (DoubleNode) o;
        return no == node.no &&
                Objects.equals(name, node.name) &&
                Objects.equals(nickName, node.nickName) ;
    }

    @Override
    public int hashCode() {
        return Objects.hash(no, name, nickName, next);
    }
}
