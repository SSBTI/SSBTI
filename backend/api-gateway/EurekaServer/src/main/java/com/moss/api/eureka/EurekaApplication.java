package com.moss.api.eureka;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.json.JsonMapper;
import com.netflix.appinfo.DataCenterInfo;
import com.netflix.appinfo.InstanceInfo;
import com.netflix.appinfo.LeaseInfo;
import com.netflix.appinfo.MyDataCenterInfo;
import org.apache.http.client.HttpClient;
import org.apache.http.impl.client.HttpClientBuilder;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.cloud.netflix.eureka.server.EnableEurekaServer;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.client.HttpComponentsClientHttpRequestFactory;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.Map;

@EnableEurekaServer
@SpringBootApplication
public class EurekaApplication {

	public static void main(String[] args) throws Exception{
		SpringApplication.run(EurekaApplication.class, args);
//		ApiClient client = ClientBuilder.kubeconfig(KubeConfig.loadKubeConfig(new FileReader("D:/aws/config2"))).build();
//		Configuration.setDefaultApiClient(client.setVerifyingSsl(false));
//
//		CoreV1Api api = new CoreV1Api();
//		V1PodList list = api.listPodForAllNamespaces(null,null, null, null, null, null, null, null, null, null);
//		for (V1Pod item : list.getItems()) {
//			System.out.println(item.getMetadata().getName());
//		}
	}

}
