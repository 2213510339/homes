package com.shj.home;

import java.util.Objects;

/**
 * @ClassName: TreeTestDemo
 * @Author: haojie.sun
 * @Description: 二叉树
 * @Date: 2021/3/1 11:17
 * @Version: 1.0
 */
public class TreeTestDemo {
    public static void main(String[] args) {
        BinaryTree binaryTree = new BinaryTree();
        Node node1 = new Node(1, "nam1");
        Node node2 = new Node(2, "nam2");
        Node node3 = new Node(3, "nam3");
        Node node4 = new Node(4, "nam4");
        Node node5 = new Node(5, "nam5");

        node1.setLeft(node2);
        node1.setRight(node3);
        node3.setRight(node4);
        node3.setLeft(node5);

        binaryTree.setRoot(node1);
        System.out.println("前序遍历"); // 12354
        binaryTree.beforePrint();
        System.out.println("中序遍历"); // 21534
        binaryTree.midPrint();
        System.out.println("后序遍历"); // 25431
        binaryTree.afterPrint();
    }


}

class BinaryTree{
    private Node root;

    public Node getRoot() {
        return root;
    }

    public void setRoot(Node root) {
        this.root = root;
    }

    public void beforePrint(){
        if(Objects.nonNull(root)){
           root.leftOrder();
        }
    }
    public void midPrint(){
        if(Objects.nonNull(root)){
            root.midOrder();
        }
    }
    public void afterPrint(){
        if(Objects.nonNull(root)){
            root.rightOrder();
        }
    }

}

class Node{
    private int no;
    private String name;

    public Node(int no, String name){
        this.no = no;
        this.name = name;
    }
    private Node left;
    private Node right;

    public int getNo() {
        return no;
    }

    public void setNo(int no) {
        this.no = no;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Node getLeft() {
        return left;
    }

    public void setLeft(Node left) {
        this.left = left;
    }

    public Node getRight() {
        return right;
    }

    public void setRight(Node right) {
        this.right = right;
    }

    public void leftOrder(){
        System.out.println(this);
        if(Objects.nonNull(this.getLeft())){
            this.getLeft().leftOrder();
        }
        if(Objects.nonNull(this.getRight())){
            this.getRight().leftOrder();
        }
    }
    public void midOrder(){
        if(Objects.nonNull(this.getLeft())){
            this.getLeft().midOrder();
        }
        System.out.println(this);

        if(Objects.nonNull(this.getRight())){
            this.getRight().midOrder();
        }
    }
    public void rightOrder(){
        if(Objects.nonNull(this.getLeft())){
            this.getLeft().rightOrder();
        }
        if(Objects.nonNull(this.getRight())){
            this.getRight().rightOrder();
        }
        System.out.println(this);

    }

    @Override
    public String toString() {
        return "Node{" +
                "no=" + no +
                ", name='" + name + '\'' +
                '}';
    }
}
