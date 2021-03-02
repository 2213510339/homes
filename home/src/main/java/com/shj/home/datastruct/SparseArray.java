package com.shj.home.datastruct;

import java.util.Arrays;

/**
 * @ClassName: SparseArray
 * @Author: haojie.sun
 * @Description: 稀疏数组与普通二维数组的转化(五子棋)
 * @Date: 2021/2/18 9:58
 * @Version: 1.0
 */
public class SparseArray {
    public static void main(String[] args) {
        // 新建一个二维数组,模拟一个五子棋的棋盘
        int[][] arr = new int[15][15];
        System.out.println("初始数组");
        showArr(arr);
        // 假设棋盘上共有2个棋子
        arr[2][2] =1;
        arr[3][3]=2;
        System.out.println("棋子数组");

        showArr(arr);
        // 保存为稀疏数组
       // 判断稀疏数组的行
        int sum = 0;
        for (int i = 0; i < 15; i++) {
            for (int j = 0; j < 15; j++) {
                if (arr[i][j] !=0) {
                    sum++;
                }
            }
        }
        System.out.println("非0数据" + sum);
        int[][] sparseArray = new int [sum+1][3];

        sparseArray[0][0] = 15;
        sparseArray[0][1]= 15;
        sparseArray[0][2]= sum;
        int k =0;
        for (int i = 0; i < 15; i++) {
            for (int j = 0; j < 15; j++) {
                if (arr[i][j] !=0) {
                    k++;
                    sparseArray[k][0]=i;
                    sparseArray[k][1]=j;
                    sparseArray[k][2]=arr[i][j];
                }
            }
        }
        System.out.println("稀疏数组");
        showArr(sparseArray);

    }
    private static void showArr(int[][] arr) {
        for (int i = 0; i < arr.length; i++) {
            System.out.println(Arrays.toString(arr[i]));
        }
    }

}
