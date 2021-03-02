package com.shj.home.util;

import com.google.gson.Gson;
import com.google.gson.JsonObject;
import com.google.gson.reflect.TypeToken;

import java.lang.reflect.Type;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Map;

/**
 * @ClassName: JsonUtil
 * @Author: haojie.sun
 * @Description:
 * @Date: 2021/1/28 18:58
 * @Version: 1.0
 */
public final class JsonUtil {

    private static Gson gson = new Gson();

    public static String toJson(Object obj) {
        return gson.toJson(obj);
    }

    public static <T> T fromJson(String json, Class<T> clazz) {
        return gson.fromJson(json, clazz);
    }

    public static Map<String, String> fromJson(String json) {
        Type type = new TypeToken<Map<String, String>>(){}.getType();
        return gson.fromJson(json, type);
    }

    public static Map<String, Object> fromJsonToObject(String json) {
        Type type = new TypeToken<Map<String, Object>>(){}.getType();
        return gson.fromJson(json, type);
    }

    public static <T> List<T> jsonToList(String json, Class<T[]> clazz){
        T[] array = gson.fromJson(json, clazz);
        return Arrays.asList(array);
    }

    public static <T> ArrayList<T> jsonToArrayList(String json, Class<T> clazz){
        Type type = new TypeToken<ArrayList<JsonObject>>(){}.getType();
        ArrayList<JsonObject> jsonObjects = gson.fromJson(json, type);

        ArrayList<T> arrayList = new ArrayList<>();
        for (JsonObject jsonObject : jsonObjects){
            arrayList.add(gson.fromJson(jsonObject, clazz));
        }
        return arrayList;
    }

    public static void main(String[] args) {
        Map<String, String> map = fromJson("{\"aaa\":\"2345\", \"bbb\":2345.56}");
        System.out.println(map);
        System.out.println(toJson(map));
    }

}