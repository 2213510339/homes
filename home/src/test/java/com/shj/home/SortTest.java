package com.shj.home;

import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.util.Arrays;
import java.util.HashMap;
import java.util.Map;

/**
 * @ClassName: SortTest
 * @Author: haojie.sun
 * @Description:
 * @Date: 2021/2/22 9:57
 * @Version: 1.0
 */
public class SortTest {
    private int[] arr;

    public void  initArr(int n){
        arr = new int[n];
        for (int i = 0; i < n; i++) {
            arr[i] = (int) (Math.random() * 80);
        }
    }
    @Test
    public void test1(){
        Map<String, Object> map = new HashMap<>();
        String strr = "[1,2,3,4]";

        System.out.println(Arrays.asList(strr.substring(1, strr.length()-1)));

    }
    @Test
    public void test(){
        initArr(6);
        System.out.println(Arrays.toString(arr));
        System.out.println("开始排序");
//        bubbleSort(arr);
//        selectSort(arr);
//        insertSort(arr);
//        shellSortComp(arr);
//        shellSortMove(arr);
//        quickSort(arr,0, arr.length-1);
//        quickSort2(arr,0, arr.length-1);
//        jdkSort(arr);
        baseSort(arr);
        System.out.println("排序后-> " );
        System.out.println(Arrays.toString(arr));
    }

    // 使用jdk的排序
    private void jdkSort(int [] arr){
        Arrays.sort(arr);
    }
    //冒泡
    private void  bubbleSort(int[] arr){
        int length = arr.length;
        int temp;
        boolean flag = false;
        for (int i = 0; i < length; i++) {
            for (int j = 0; j < length - i -1; j++) {
                if ( arr[j] < arr[j+1]){
                    flag = true;
                    temp = arr[j];
                    arr[j] = arr[j+1];
                    arr[j+1] = temp;
                }
            }
            if(flag){
                flag =false;
            }
            else {
                break;
            }
        }
    }
    // 选择

    /**
     * 首先在未排序序列中找到最小（大）元素，存放到排序序列的起始位置，然后，再从剩余未排序元素中继续寻找最小（大）元素，然后放到已排序序列的末尾。以此类推，直到所有元素均排序完毕。
     * @param arr
     */
    private void  selectSort(int[] arr){
        int min;
        int minIndex;
        int len = arr.length;

        for (int i = 0; i < len; i++) {
            min = arr[i];
            minIndex = i;
            for (int j = i+1; j < len; j++) {
                if (min < arr[j]) {
                    min =arr[j];
                    minIndex = j;
                }
            }
            if(minIndex != i) {
                arr[minIndex] =arr[i];
                arr[i] = min;
            }

        }

    }
    // 插入, 将数组分为有序和无序  然后把无序的按照顺序加入到有序的
    private void  insertSort(int[] arr){
        int len = arr.length;
        int temp;
        for (int i = 1; i < len; i++) {
            // 判断, j是排序好的
            for (int j = i-1; j >= 0 ; j--) {
                if(arr[i] > arr[j]){
                 temp =  arr[j];
                 arr[j] = arr[i];
                 arr[i] = temp;
                }
            }
        }
    }
    //希尔排序, 交换
    private void shellSortComp(int [] arr){
        int len =arr.length;
        int temp;
        int step = len;
        for (; step>0 ; ) {
            step = step/2;

            for (int j = step; j < len ; j++) {
                for (int i = j-step; i >=0 && arr[i+step] > arr[i]  ; i-=step) {
                    temp =  arr[i];
                    arr[i] = arr[i+step];
                    arr[i+step] = temp;
                }
            }
        }

    }
// 0 3 1 4 2 5
    // 希尔排序,移位  max->min
    private void shellSortMove(int [] arr){
        int len = arr.length;
        for (int step= len/2; step>0; step /= 2) {
            // 遍历所有的元素
            for (int i = step; i < len; i++) {
                // 对所在租的元素进行排序  所在组的元素下标 i-step step i+step...
                int index =i;
                // 假设最小的值是temp
                int temp = arr[index];

                while(index -step >=0 && temp<arr[index-step]) {
                    arr[index] = arr[index -step];
                    index -=step;
                }
                arr[index] = temp;
            }
        }
    }
    // 快速排序()快速排序算法通过多次比较和交换来实现排序，其排序流程如下：
    //(1)首先设定一个分界值，通过该分界值将数组分成左右两部分。
    //(2)将大于或等于分界值的数据集中到数组右边，小于分界值的数据集中到数组的左边。此时，左边部分中各元素都小于或等于分界值，而右边部分中各元素都大于或等于分界值。
    //(3)然后，左边和右边的数据可以独立排序。对于左侧的数组数据，又可以取一个分界值，将该部分数据分成左右两部分，同样在左边放置较小值，右边放置较大值。右侧的数组数据也可以做类似处理。
    //(4)重复上述过程，可以看出，这是一个递归定义。通过递归将左侧部分排好序后，再递归排好右侧部分的顺序。当左、右两个部分各数据排序完成后，整个数组的排序也就完成了。
    private int[] quickSort(int[] arr, int left,int right){
// 假设9872 1239
        int start = arr[left];
        int i=left;
        int j =right;

        while(i<j){
            while(i<j && arr[i] < start){
                i++;
            }
            while(i<j && arr[j] > start){
                j--;
            }
            if ((arr[i]==arr[j])&&(i<j)) {
                i++;
            } else {
                int temp = arr[i];
                arr[i] = arr[j];
                arr[j] = temp;
            }
            if (i-1>left) return quickSort(arr,left,i-1);
            if (j+1<right) return quickSort(arr,j+1,right);
        }

        return arr;
    }
    //将中值设置为标志, 在左边找比中值大的,从右边找比中值小的, 如果找到,交换左右两边
    private void quickSort2(int[] arr, int left,int right){
        int midIndex = (left + right)/2;
        int l =left;
        int r = right;
        int mid = arr[midIndex];
        int temp;

        while(l <r) {
            // 如果左边的比mid小, 继续寻找,直到找到大于或等于mid的值
            while(arr[l] < mid ){
                    l++;
            }
            // 如果右边的比mid大, 继续寻找,直到找到小于或等于mid的值
            while(arr[r] > mid){
                r--;
            }
            // 交换左右两边的值
            temp = arr[l];
            arr[l] = arr[r];
            arr[r] = temp;
            // 交换完之后和mid
            if(arr[l] >= mid){
                l++;
            }
            if(arr[r] <= mid){
                r--;
            }
            if(l==r){
                l++;
                r--;
            }
            if(left<r){
                // 向左递归, 从left到mid
                quickSort2(arr, left, r);
            }
            if(right>l){
                // 向右递归, 从mid + 1 到right
                quickSort2(arr, l, right);
            }
        }
    }

    //分治法

    // 基数排序(桶排序)
    public void baseSort(int[] arr){
        // 创建一个二维数组, 分别将数字按照各位,十位,百位...进行排序,排序的次数由最大的数来确定
        // 有可能所有的数都相同,所以,每个桶的大小等于数组的长度
        int size = arr.length;

        // 想找到数组中的最大值
        int max = -1;
        for (int i = 0; i < size ; i++) {
            if(arr[i]>max){
                max = arr[i];
            }
        }
        // 表示总的桶
        int[][] bucket = new int[10][size];
        // 表示每个桶中有多少个元素
        int[] temp = new int[10];
        int times = max+"".length();
        for (int i = 0; i < times; i++) {
            // 第一次排序取个位 i%10,第二次取十位... i/10%10
            int step = (int) Math.pow(10, i);
            for (int j = 0; j < size; j++) {
                // 将对应的位存到对应的桶中
                int index = arr[j] / step % 10;
                bucket[index][temp[index]++] = arr[j];
            }
            // 清空temp, 重新赋值arr
            int t=0;
            for (int j = 0; j < 10; j++) {
                for (int k = 0; k < temp[j]; k++) {
                    arr[t++] = bucket[j][k];
                }
                temp[j]=0;
            }
        }

    }
}
