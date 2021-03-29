package com.moss.api.eureka.regist;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.moss.api.eureka.domain.RegisterForm;
import com.netflix.appinfo.DataCenterInfo;
import com.netflix.appinfo.InstanceInfo;
import com.netflix.appinfo.LeaseInfo;
import com.netflix.appinfo.MyDataCenterInfo;
import io.kubernetes.client.openapi.ApiClient;
import io.kubernetes.client.openapi.Configuration;
import io.kubernetes.client.openapi.apis.CoreV1Api;
import io.kubernetes.client.openapi.models.V1Service;
import io.kubernetes.client.openapi.models.V1ServiceList;
import io.kubernetes.client.util.ClientBuilder;
import io.kubernetes.client.util.Config;
import io.kubernetes.client.util.KubeConfig;
import org.apache.http.client.HttpClient;
import org.apache.http.impl.client.HttpClientBuilder;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.client.HttpComponentsClientHttpRequestFactory;
import org.springframework.web.client.RestTemplate;

import java.io.FileReader;
import java.util.HashMap;
import java.util.Map;

public class RegisterTask implements Runnable{

    private final Logger logger = LoggerFactory.getLogger(this.getClass());

    private final String EUREKA_SERVER_PATH;
    private final String KUBECONFIG_PATH;

    public RegisterTask(String eurekaPath, String kubeConfigPath){
        this.EUREKA_SERVER_PATH = eurekaPath;
        this.KUBECONFIG_PATH = kubeConfigPath;
    }

    @Override
    public void run() {
        HttpComponentsClientHttpRequestFactory factory = new HttpComponentsClientHttpRequestFactory();
        factory.setReadTimeout(5000);
        factory.setConnectTimeout(3000);
        HttpClient client = HttpClientBuilder.create()
                .setMaxConnTotal(100)
                .setMaxConnPerRoute(5)
                .build();
        factory.setHttpClient(client);
        RestTemplate restTemplate = new RestTemplate(factory);

        try {
            //ToDo try/catch 어떻게 처리하지?
            //ApiClient apiClient = ClientBuilder.kubeconfig(KubeConfig.loadKubeConfig(new FileReader(KUBECONFIG_PATH))).build();
            //ApiClient apiClient = Config.defaultClient();
            ApiClient apiClient = ClientBuilder.cluster().build();
            Configuration.setDefaultApiClient(apiClient);

            CoreV1Api api = new CoreV1Api();
            V1ServiceList list = api.listServiceForAllNamespaces(null, null, null, null, null, null, null, null, null, null);
            for (V1Service service : list.getItems()) {

                String appName = service.getMetadata().getName();
                String hostname = service.getSpec().getClusterIP();
                String ip = service.getSpec().getClusterIP();
                int port = service.getSpec().getPorts().get(0).getPort();

                InstanceInfo instance = InstanceInfo.Builder.newBuilder()
                        .setAppNameForDeser(appName)
                        .setInstanceId(String.format("%s:%s:%d", hostname, appName, port))
                        .setHostName(hostname)
                        .setIPAddr(ip)
                        .setPort(port)
                        .setSecurePort(443)
                        .setStatus(InstanceInfo.InstanceStatus.UP)
                        .setOverriddenStatus(InstanceInfo.InstanceStatus.UNKNOWN)
                        .enablePort(InstanceInfo.PortType.UNSECURE, true)
                        .setActionType(InstanceInfo.ActionType.ADDED)
                        .setVIPAddress(appName)
                        .setDataCenterInfo(new MyDataCenterInfo(DataCenterInfo.Name.MyOwn))
                        .add("management.port", Integer.toString(port))
                        .setLeaseInfo(LeaseInfo.Builder.newBuilder().setDurationInSecs(10).build())
                        .build();

                RegisterForm reg = new RegisterForm(instance);
                reg.setPort(port, true);
                Map<String, Object> map = new HashMap<>();
                map.put("instance", reg);

                ObjectMapper mapper = new ObjectMapper();
                String body = mapper.writeValueAsString(map);

                if (body != null) {
                    HttpHeaders httpHeaders = new HttpHeaders();
                    httpHeaders.setContentType(MediaType.APPLICATION_JSON);
                    HttpEntity<String> request = new HttpEntity<>(body, httpHeaders);
                    restTemplate.postForObject(EUREKA_SERVER_PATH + appName, request, String.class);
                }
            }
        }catch (Exception e){
            logger.info(e.getMessage());
        }
    }
}
