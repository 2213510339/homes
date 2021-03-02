package com.shj.home.util;

import java.io.PrintWriter;
import java.io.StringWriter;

/**
 * @ClassName: ExceptionUtil
 * @Author: haojie.sun
 * @Description:
 * @Date: 2021/1/28 18:57
 * @Version: 1.0
 */
public class ExceptionUtil {
    public static String getErrorInfoFromException(Exception e) {
        try {
            StringWriter sw = new StringWriter();
            PrintWriter pw = new PrintWriter(sw);
            e.printStackTrace(pw);
            return sw.toString();
        } catch (Exception e2) {
            return "Fail to parse exception";
        }
    }
}