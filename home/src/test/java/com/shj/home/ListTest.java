package com.shj.home;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.alibaba.fastjson.parser.Feature;
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

public class ListTest {

    private static JSONObject jsonObject;
    private static JSONObject kpiObject;
    @BeforeEach
     void initData() {
        String kpi = "{\"kpi\":{\"totalChargeElec\":{\"enName\":\"Charge Elec\",\"name\":\"实际充电量\",\"unit\":\"kWh\",\"index\":0},\"totalDischargeElec\":{\"enName\":\"Discharge Elec\",\"name\":\"实际放电量\",\"unit\":\"kWh\",\"index\":1},\"totalAuxiliaryElec\":{\"enName\":\"Auxiliary Elec\",\"name\":\"辅助设备电量\",\"unit\":\"kWh\",\"index\":2}},\"powerTrend\":{\"chargePower\":{\"enName\":\"Charge Power\",\"name\":\"充电功率\"},\"dischargePower\":{\"enName\":\"Discharge Power\",\"name\":\"放电功率\"},\"auxiliaryPower\":{\"enName\":\"Auxiliary Power\",\"name\":\"辅助设备功率\"}},\"elecTrend\":{\"chargeElec\":{\"enName\":\"Charge Elec\",\"name\":\"充电量\",\"chartDirection\":\"up\"},\"dischargeElec\":{\"enName\":\"Discharge Elec\",\"name\":\"放电量\",\"chartDirection\":\"down\"},\"auxiliaryElec\":{\"enName\":\"Auxiliary Elec\",\"name\":\"辅助设备电量\",\"chartDirection\":\"up\"}}}";
        String kpi1 = "{\"kpi\":{\"totalChargeElec\":{\"enName\":\"Charge Elec\",\"name\":\"实际充电量\",\"unit\":\"kWh\",\"index\":0},\"totalDischargeElec\":{\"enName\":\"Discharge Elec\",\"name\":\"实际放电量\",\"unit\":\"kWh\",\"index\":1},\"totalAuxiliaryElec\":{\"enName\":\"Auxiliary Elec\",\"name\":\"辅助设备电量\",\"unit\":\"kWh\",\"index\":2}},\"powerTrend\":{\"chargePower\":{\"enName\":\"Charge Power\",\"name\":\"充电功率\"},\"dischargePower\":{\"enName\":\"Discharge Power\",\"name\":\"放电功率\"},\"auxiliaryPower\":{\"enName\":\"Auxiliary Power\",\"name\":\"辅助设备功率\"}},\"elecTrend\":{\"chargeElec\":{\"enName\":\"Charge Elec\",\"name\":\"充电量\",\"chartDirection\":\"up\"},\"dischargeElec\":{\"enName\":\"Discharge Elec\",\"name\":\"放电量\",\"chartDirection\":\"down\"},\"auxiliaryElec\":{\"enName\":\"Auxiliary Elec\",\"name\":\"辅助设备电量\",\"chartDirection\":\"up\"}}}";
        String kpi2 = "{\"kpi\":{\"totalChargeElec\":{\"enName\":\"Charge Elec\",\"name\":\"实际充电量\",\"unit\":\"kWh\",\"index\":0},\"totalDischargeElec\":{\"enName\":\"Discharge Elec\",\"name\":\"实际放电量\",\"unit\":\"kWh\",\"index\":1},\"totalAuxiliaryElec\":{\"enName\":\"Auxiliary Elec\",\"name\":\"辅助设备电量\",\"unit\":\"kWh\",\"index\":2}},\"powerTrend\":{\"chargePower\":{\"enName\":\"Charge Power\",\"name\":\"充电功率\"},\"dischargePower\":{\"enName\":\"Discharge Power\",\"name\":\"放电功率\"},\"auxiliaryPower\":{\"enName\":\"Auxiliary Power\",\"name\":\"辅助设备功率\"}},\"elecTrend\":{\"chargeElec\":{\"enName\":\"Charge Elec\",\"name\":\"充电量\",\"chartDirection\":\"up\"},\"dischargeElec\":{\"enName\":\"Discharge Elec\",\"name\":\"放电量\",\"chartDirection\":\"down\"},\"auxiliaryElec\":{\"enName\":\"Auxiliary Elec\",\"name\":\"辅助设备电量\",\"chartDirection\":\"up\"}}}";
        //
        long start = System.currentTimeMillis();

        for (int i = 0; i < 10000; i++) {
            jsonObject= JSONArray.parseObject(kpi, JSONObject.class).getJSONObject("kpi");
        }
        long end = System.currentTimeMillis();
        System.out.println(end - start);

        for (int i = 0; i < 10000; i++) {
            jsonObject= JSONArray.parseObject(kpi, JSONObject.class).getJSONObject("kpi");
//            jsonObject = JSON.parseObject(kpi1).getJSONObject("kpi");
        }
        long end1 = System.currentTimeMillis();
        System.out.println(end1 - end);
        for (int i = 0; i < 10000; i++) {
            jsonObject= JSONArray.parseObject(kpi, JSONObject.class).getJSONObject("kpi");
//            jsonObject= JSONObject.parseObject(kpi2).getJSONObject("kpi");
        }
        long end2 = System.currentTimeMillis();
        System.out.println(end2 - end1);
//        jsonObject= JSONArray.parseObject(kpi, JSONObject.class).getJSONObject("kpi");
        // 保证插入的顺序
        kpiObject = new JSONObject(4,true);
        // JSONObject底层使用map实现,
        // if (ordered) {
        //            this.map = new LinkedHashMap(initialCapacity);
        //        } else {
        //            this.map = new HashMap(initialCapacity);
        //        }
        kpiObject.put("totalChargeElec", "333");
        kpiObject.put("totalDischargeElec", "444");
        kpiObject.put("totalAuxiliaryElec", "111");
        System.out.println("jsonObject-<" +jsonObject);
        System.out.println("kpiObject-<" +kpiObject);
    }


    @Test
    public void testFeature() {
        System.out.println(new Feature[0].toString());
    }



    @Test
    public void testArrayList() {
        System.out.println(jsonObject.keySet().size());
        List<JSONObject> listJson = new ArrayList<>();
        for (int i = 0; i < jsonObject.keySet().size(); i++) {
            listJson.add(new JSONObject());
        }
        formatSet(listJson);
    }

    private void formatSet(List list) {
        Set<String> kpiKeySet = jsonObject.keySet();
        System.out.println("kpiKeySet" + kpiKeySet);
        for (String key : kpiKeySet) {
            String name = "";
            String unit = "";
            String value = "";
            name = jsonObject.getString("name");
            unit = jsonObject.getString("unit");
            Integer index = null;
            if(Objects.nonNull(kpiObject)){
                if("totalChargeElec".equals(key)){
                    value = kpiObject.getString("totalChargeElec");
                    index = jsonObject.getJSONObject("totalChargeElec").getInteger("index");
                }
                else if("totalDischargeElec".equals(key)){
                    value = kpiObject.getString("totalDischargeElec");
                    index = jsonObject.getJSONObject("totalDischargeElec").getInteger("index");
                }
                else if("totalAuxiliaryElec".equals(key)){
                    value = kpiObject.getString("totalAuxiliaryElec");
                    index = jsonObject.getJSONObject("totalAuxiliaryElec").getInteger("index");
                }
            }

            JSONObject newKpiJsonObject = new JSONObject();
            newKpiJsonObject.put("key",key);
            newKpiJsonObject.put("name",name);
            newKpiJsonObject.put("value", "".equals(value) ? value : String.format("%.1f",Double.parseDouble(value)));
            newKpiJsonObject.put("unit",unit);
            System.out.println("index -<"+index);
            System.out.println(list.size());
            if (Objects.nonNull(index)) {
                // 因为会首先检查size,所以不可用
                list.set(index,newKpiJsonObject);
            }
            else {
                list.add(newKpiJsonObject);
            }
        }
        System.out.println(list.getClass().getName());
        System.out.println(list);

    }

}
