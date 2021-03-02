package com.shj.home;

import com.google.gson.Gson;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import com.shj.home.util.ExceptionUtil;
import com.shj.home.util.JsonUtil;
import okhttp3.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.util.StringUtils;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.*;
import java.util.concurrent.TimeUnit;

public class IbemApiTest {
    private static final Logger logger = LoggerFactory.getLogger(IbemApiTest.class);

    public static void main(String[] args) {
        String response = null;
        String tokenUrl = "https://ag-cn5.envisioniot.com/apim-token-service/v2.0/token/get";
        String appKey = "d943d2ec-32b5-4465-a378-2f923ff960ae";
        String appSecret = "e2e6216c-c720-4892-ab0d-b1a1e6c517f4";
        String unclosedAlarmUrl = "https://ag-cn5.envisioniot.com/ibem-api/v1/alarms/unclosed?siteId=kwL25oLz";
        String accessToken = "";
        try {
            accessToken = getEnos2ApiAccessToken(tokenUrl, appKey, appSecret);
            HashMap<String, String> headers = getGetRequestHeaders(unclosedAlarmUrl,accessToken,appSecret);
            int connectTimeout = 300;
            int readTimeout = 300;
            response = httpGetRequest(unclosedAlarmUrl, headers, connectTimeout, readTimeout);
        } catch (Exception e) {
            logger.error("get node data error: {}", e.getMessage());
        }
        System.out.println("get realtime-info result:");
        System.out.println(response);
        String historyAlarmUrl = "https://ag-cn5.envisioniot.com/ibem-api/v1/alarms/history?siteId=kwL25oLz&startTime=2020-12-10 00:00:00&endTime=2020-12-31 00:00:00";
        try {
            HashMap<String, String> headers = getGetRequestHeaders(historyAlarmUrl,accessToken,appSecret);
            int connectTimeout = 300;
            int readTimeout = 300;
            response = httpGetRequest(historyAlarmUrl, headers, connectTimeout, readTimeout);
        } catch (Exception e) {
            logger.error("get node data error: {}", e.getMessage());
        }
        System.out.println("get storage-income result:");
        System.out.println(response);
    }



    public static String getEnos2ApiAccessToken(String url, String appKey, String appSecret) {
        String result = null;
        if (StringUtils.isEmpty(url) || StringUtils.isEmpty(appKey) || StringUtils.isEmpty(appSecret)) {
            return result;
        }
        try {
            String encryption = null;
            Long timestamp = System.currentTimeMillis();
            encryption = appKey + timestamp + appSecret;
            encryption = getSHA256(encryption);
            Map<String, String> requestMap = new HashMap<>();
            requestMap.put("appKey", appKey);
            requestMap.put("encryption", encryption);
            requestMap.put("timestamp", timestamp.toString());

            String bodyStr = new Gson().toJson(requestMap);

            int connectTimeout = 45;
            int readTimeout = 45;
            String response = httpPostUtil(url, bodyStr, null, connectTimeout, readTimeout);
            if (StringUtils.isEmpty(response)) {
                logger.info("get access token response is null");
                return response;
            }
            JsonParser parser = new JsonParser();
            JsonObject responseJsonObject = (JsonObject)parser.parse(response);
            String status = responseJsonObject.get("status").getAsString();
            if(!"0".equalsIgnoreCase(status)){
                logger.info("get access token response status not 0, response: {}", response);
                return result;
            }
            JsonObject data = responseJsonObject.get("data").getAsJsonObject();
            if (StringUtils.isEmpty(data)) {
                logger.info("get access token response data is null, response: {}", response);
                return result;
            }
            result = data.get("accessToken").getAsString();
        }catch (Exception e){
            logger.info("get access token error: {}", ExceptionUtil.getErrorInfoFromException(e));
        }
        return result;
    }

    public static String httpGetRequest(String url, HashMap<String, String> headersMap,int connectTimeout, int readTimeout) {
        Response response = null;
        try {
            OkHttpClient client = new OkHttpClient()
                    .newBuilder()
                    .connectTimeout(connectTimeout, TimeUnit.SECONDS)
                    .readTimeout(readTimeout, TimeUnit.SECONDS)
                    .build();
            Request request = null;
            if (headersMap!=null && !headersMap.isEmpty()) {
                Headers headers = setHeaders(headersMap);
                request = new Request.Builder()
                        .url(url)
                        .get()
                        .headers(headers)
                        .build();
            }else {
                request = new Request.Builder()
                        .url(url)
                        .get()
                        .build();
            }
            response = client.newCall(request).execute();
            System.out.println( response.message());

            if (response.isSuccessful()) {
                String responseStr = response.body().string();
                return responseStr;
            }
            System.out.println(JsonUtil.toJson(response));
        } catch (IOException e) {
            logger.error("get response failed: {}", ExceptionUtil.getErrorInfoFromException(e));
        } finally {
            if (response != null) {
                response.close();
            }
        }
        return null;
    }

    public static String httpPostUtil(String url, String bodyStr, HashMap<String, String> headersMap, int connectTimeout, int readTimeout) {
        OkHttpClient client = new OkHttpClient()
                .newBuilder()
                .connectTimeout(connectTimeout, TimeUnit.SECONDS)
                .readTimeout(readTimeout, TimeUnit.SECONDS)
                .build();
        MediaType mediaType = MediaType.parse("application/json");
        RequestBody body = RequestBody.create(mediaType, bodyStr);
        Request request = null;
        if (headersMap!=null && !headersMap.isEmpty()) {
            Headers headers = setHeaders(headersMap);
            request = new Request.Builder()
                    .url(url)
                    .method("POST", body)
                    .headers(headers)
                    .build();
        }else {
            request = new Request.Builder()
                    .url(url)
                    .method("POST", body)
                    .build();
        }
        Response response = null;
        try {
            response = client.newCall(request).execute();
            if (response.isSuccessful()) {
                String responseStr = response.body().string();
                logger.info(responseStr);
                return responseStr;
            }
        } catch (IOException e) {
            logger.error("get response failed: {}", ExceptionUtil.getErrorInfoFromException(e));
        } finally {
            if (response != null) {
                response.close();
            }
        }
        return null;
    }

    public static HashMap<String, String> getGetRequestHeaders(String url, String accessToken, String secretKey) {
        HashMap<String, String> result = new HashMap<>();
        if (StringUtils.isEmpty(url)) {
            return result;
        }
        String timestamp = String.valueOf(System.currentTimeMillis());
        HttpUrl httpUrl = HttpUrl.parse(url);
        List<String> keys = new ArrayList<>(httpUrl.queryParameterNames());
        Collections.sort(keys);
        StringBuilder paramsData = new StringBuilder();
        for (String key : keys) {
            String value = httpUrl.queryParameter(key);
            paramsData.append(key).append(value);
        }
        String signData = accessToken + paramsData.toString() + timestamp + secretKey;
        String apimSign = getSHA256(signData);
        result.put("apim-accesstoken", accessToken);
        result.put("apim-signature", apimSign);
        result.put("apim-timestamp", timestamp);
        return result;
    }


    public static Headers setHeaders(Map<String, String> headersParams) {
        Headers headers = null;
        okhttp3.Headers.Builder headersbuilder = new okhttp3.Headers.Builder();
        if (headersParams!=null && !headersParams.isEmpty()) {
            Iterator<String> iterator = headersParams.keySet().iterator();
            String key = "";
            while (iterator.hasNext()) {
                key = iterator.next().toString();
                headersbuilder.add(key, headersParams.get(key));
            }
        }
        headers = headersbuilder.build();
        return headers;
    }

    public static String getSHA256(String str) {
        MessageDigest messageDigest;
        String encodestr = "";
        try {
            messageDigest = MessageDigest.getInstance("SHA-256");
            messageDigest.update(str.getBytes(StandardCharsets.UTF_8));
            encodestr = hexString(messageDigest.digest());
        } catch (NoSuchAlgorithmException e) {
            logger.info("getSHA256 error: {}", ExceptionUtil.getErrorInfoFromException(e));
            return encodestr;
        }
        return encodestr;
    }

    private static String hexString(byte[] b) {
        StringBuilder hs = new StringBuilder();
        String stmp;
        for (int n = 0; b != null && n < b.length; n++) {
            stmp = Integer.toHexString(b[n] & 0XFF);
            if (stmp.length() == 1) {
                hs.append('0');
            }
            hs.append(stmp);
        }
        return hs.toString();
    }
}
