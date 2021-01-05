package com.shj.home.util;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

/**
 * @ClassName: TimeUtils
 * @Author: haojie.sun
 * @Description:
 * @Date: 2020/12/31 17:54
 * @Version: 1.0
 */
public class TimeUtils {

    private static final DateTimeFormatter FORMAT_DAY = DateTimeFormatter.ofPattern("yyyy-MM-dd");
    private static final DateTimeFormatter FORMAT_TIME = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");

    /**
     * @Description: 将字符串转为LocalDateTime
     * @Date 2020/12/31 18:20
     * @Param [localDataTimeString]
     * @retuen java.time.LocalDateTime
     * @Author : haojie.sun
     */
    public static LocalDateTime changeToLocalDateTime(String localDataTimeString) {
        return  LocalDateTime.parse(localDataTimeString,FORMAT_TIME);
    }

    public static String changeLocalDateTimeToString(LocalDateTime localDateTime) {
        return  localDateTime.format(FORMAT_TIME);
    }
    public static LocalDate changeToLocalDate(String localDataTimeString) {
        return  LocalDate.parse(localDataTimeString,FORMAT_DAY);
    }
    public static String changeLocalDateToString(LocalDate localDate) {
        return  localDate.format(FORMAT_DAY);
    }
    public static void main(String[] args) {
        System.out.println(changeToLocalDateTime("2020-11-12 12:11:11"));
        System.out.println(changeLocalDateTimeToString(LocalDateTime.now()));
        System.out.println(changeLocalDateToString(LocalDate.now()));
    }
}
