package com.shj.home;

import java.util.Arrays;

/**
 * @ClassName: Queen8
 * @Author: haojie.sun
 * @Description: 8皇后问题, 在一个8*8的棋盘上.放置8个皇后,任意两个不能再同一行,同一列,同一斜线上
 * 使用回溯法
 * @Date: 2021/3/2 14:52
 * @Version: 1.0
 */
public class Queen8 {
    static  int count=0;
    static    int [] init = new int[8];

    public static void main(String[] args) {
      playCheese(0);
        System.out.println("共有解法:" + count);
    }
    private  static boolean isOk(int index){
        for (int i = 0; i < index; i++) {
            // 相等或者斜率相等
            if(init[i]==init[index] || Math.abs(index-i)== Math.abs(init[index]-init[i])){
                return false;
            }
        }
        return true;

    }
    private  static  void playCheese(int index){
        if(index == 8){
            // 找到一种解法
            count++;
            System.out.println(Arrays.toString(init));
            return;
        }else {
            for (int i = 0; i < 8; i++) {
                init[index]=i;
                if(isOk(index)){
                    playCheese(index+1);
                }
            }
        }
    }
}
