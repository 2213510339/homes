package com.shj.home;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.google.gson.JsonObject;
import com.shj.home.util.JsonUtil;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.util.*;

/**
 * @ClassName: SetTest
 * @Author: haojie.sun
 * @Description:
 * @Date: 2021/2/9 10:22
 * @Version: 1.0
 */

public class SetTest {

    private static JSONObject jsonObject;
    private static JSONObject kpiObject;
    @BeforeEach
     void initData() {
        String kpi = "{\"kpi\":{\"totalChargeElec\":{\"enName\":\"Charge Elec\",\"name\":\"实际充电量\",\"unit\":\"kWh\",\"index\":0},\"totalDischargeElec\":{\"enName\":\"Discharge Elec\",\"name\":\"实际放电量\",\"unit\":\"kWh\",\"index\":1},\"totalAuxiliaryElec\":{\"enName\":\"Auxiliary Elec\",\"name\":\"辅助设备电量\",\"unit\":\"kWh\",\"index\":2}},\"powerTrend\":{\"chargePower\":{\"enName\":\"Charge Power\",\"name\":\"充电功率\"},\"dischargePower\":{\"enName\":\"Discharge Power\",\"name\":\"放电功率\"},\"auxiliaryPower\":{\"enName\":\"Auxiliary Power\",\"name\":\"辅助设备功率\"}},\"elecTrend\":{\"chargeElec\":{\"enName\":\"Charge Elec\",\"name\":\"充电量\",\"chartDirection\":\"up\"},\"dischargeElec\":{\"enName\":\"Discharge Elec\",\"name\":\"放电量\",\"chartDirection\":\"down\"},\"auxiliaryElec\":{\"enName\":\"Auxiliary Elec\",\"name\":\"辅助设备电量\",\"chartDirection\":\"up\"}}}";
        jsonObject= JSONArray.parseObject(kpi, JSONObject.class).getJSONObject("kpi");
        // 保证插入的顺序
        kpiObject = new JSONObject(4,true);
        // JSONObject底层使用map实现,
        // if (ordered) {
        //            this.map = new LinkedHashMap(initialCapacity);
        //        } else {
        //            this.map = new HashMap(initialCapacity);
        //        }
        kpiObject.put("name", "NAME_!!!");
        kpiObject.put("totalChargeElec", "333");
        kpiObject.put("totalDischargeElec", "444");
        kpiObject.put("totalAuxiliaryElec", "111");
        System.out.println("init json");
        System.out.println(jsonObject);
        System.out.println(kpiObject);
    }


    @Test
    public void testTreeSet() {
        // JSONObject 不是Comparable 不能加到treeset
        Set<JSONObject> setJson = new TreeSet<>();
//        formatSet(setJson);
    }
    @Test
    public void testLinkedSet() {
        Set<JSONObject> setJson = new LinkedHashSet<>();
        formatSet(setJson);

    }
    @Test
    public void testHashSet() {
        Set<JSONObject> setJson = new HashSet<>();
        formatSet(setJson);
    }

    private void formatSet(Set set) {
        Set<String> kpiKeySet = jsonObject.keySet();
        //jsonObject.getJSONObject("kpi").keySet().;
//        JSONObject kpi = jsonObject.getJSONObject("kpi");
        System.out.println("kpiKeySet" + kpiKeySet);
        for (String key : kpiKeySet) {
            String name = kpiObject.getString("name");
            String unit = "kWh";
            String value = "";
            if(Objects.nonNull(kpiObject)){
                if("totalChargeElec".equals(key)){
                    value = kpiObject.getString("totalChargeElec");
                }
                else if("totalDischargeElec".equals(key)){
                    value = kpiObject.getString("totalDischargeElec");
                }
                else if("totalAuxiliaryElec".equals(key)){
                    value = kpiObject.getString("totalAuxiliaryElec");
                }
            }

            JSONObject newKpiJsonObject = new JSONObject();
            newKpiJsonObject.put("key",key);
            newKpiJsonObject.put("name",name);
            newKpiJsonObject.put("value", "".equals(value) ? value : String.format("%.1f",Double.parseDouble(value)));
            newKpiJsonObject.put("unit",unit);
            set.add(newKpiJsonObject);
        }
        System.out.println(set.getClass().getName());
        System.out.println(set);

    }

}
