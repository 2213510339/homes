package com.shj.home.dto;

import java.io.Serializable;

/**
 * @ClassName: ResponseDTO
 * @Author: haojie.sun
 * @Description:
 * @Date: 2021/1/4 15:27
 * @Version: 1.0
 */
public class ResponseDTO implements Serializable {
    public static final String SUCCESS = "200";
    public static final String ERROR = "500";
    public static final String PARAM_ERROR = "400";
    public static final String EEOP_ERROR = "300";
    private String code = SUCCESS;
    private String message;
    private String subCode;
    private String subMessage;
    private Object data;

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public String getSubCode() {
        return subCode;
    }

    public void setSubCode(String subCode) {
        this.subCode = subCode;
    }

    public String getSubMessage() {
        return subMessage;
    }

    public void setSubMessage(String subMessage) {
        this.subMessage = subMessage;
    }

    public Object getData() {
        return data;
    }

    public void setData(Object data) {
        this.data = data;
    }
}
