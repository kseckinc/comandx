# Overview
This article is a quick start guide to ComandX and includes four steps for the typical user:
1.	Adding the cloud vendor account information in the cloud vendor account module;
2.	Creating the required cluster templates in the cluster management module;
3.	Building the scaling up tasks based on cluster templates in the scaling up and scaling down tasks module;
4.	Creating K8s clusters and requesting instances on the expanded machines in the K8s Cluster module.


# Prerequisites
1.You already have a cloud vendor account and have obtained the AccessKey and AccessKey Secret information. If not, please sign-up in advance. <br>
[Alibaba Cloud ](https://help.aliyun.com/document_detail/53045.html) | [HUAWEI CLOUD](https://console.huaweicloud.com/iam/?agencyId=5bd44fddfab541699d5eb3e2e49823e6&region=cn-north-4&locale=zh-cn#/mine/accessKey) |[Tencent Cloud](https://console.cloud.tencent.com/cam/capi)

2.You have obtained the URL information, as well as user name and password information. <br>
If it is the first deployment, you can type http://127.0.0.1:80 into your browser to log in to the system. Using the default authentication method, log in with the 
default user name: root and default password: 123456.


# Step 1: Add a cloud vendor account


1.	Go to the cloud vendor account and click Add Cloud Account: 

![image](https://user-images.githubusercontent.com/94337797/145361515-1c10c13a-c2df-42ae-b49e-708d74f9f886.png)

2.	Fill in the AK and SK information of the cloud vendor and save it:

![image](https://user-images.githubusercontent.com/94337797/145361610-19bbda77-7815-4b9d-a155-cc38ab4c6ec3.png)


# Step 2: Create a model template

1.	Cluster Management -> Create Cluster: 
![image](https://user-images.githubusercontent.com/94337797/147357848-915daa45-d8b2-4063-945e-856cfa27ab12.png)

2.	Go to the cloud vendor configuration page and configure: 
![image](https://user-images.githubusercontent.com/94337797/147357890-18ecdae4-49ea-4454-9663-f5439a983bed.png)


3.	Click Next to go to the Network Configuration page: 
![image](https://user-images.githubusercontent.com/94337797/145344359-e5a05478-0d6d-4473-afe2-b47830156903.png)

4.	Once the network configuration is complete, click Next to configure the machine specifications: 
![image](https://user-images.githubusercontent.com/94337797/147357978-36bc0d9b-887f-4d5e-94a9-3680f57b7e55.png)


5.	After the machine specifications are configured, click Next to configure the storage disks, and after the configuration is complete, click Submit to create the cluster successfully: 
![image](https://user-images.githubusercontent.com/94337797/145345058-82aa08bd-ad3b-46d6-874e-1f25648d5895.png)


6.	If you click the Finish button, the page will jump to the list of clusters with the latest created cluster information, which means the creation is successful. 
![image](https://user-images.githubusercontent.com/94337797/145345871-d8e04f06-ed72-4f58-8505-dfb9ab5fa1e8.png)


# Step 3: Create rapid scaling up and scaling down tasks

1.	Scaling Up and Scaling Down Tasks -> Create Tasks: 

![image](https://user-images.githubusercontent.com/94337797/145346132-372c2611-47dd-42e9-af1c-bd890bdc7319.png)


2.	Fill out the scaling up and scaling down task configuration, and click the submit button after filling it out: 
![image](https://user-images.githubusercontent.com/94337797/145346567-69f33c5d-1aae-4693-b1a6-bebbd263fba1.png)


3.	After successful submission, the page redirects to the task list, showing the execution status of the task just created: 

![image](https://user-images.githubusercontent.com/94337797/145346741-10b4494a-9a19-47bf-8200-ca911e1ddc54.png)


4.	If you need to see the IP of the machine where this task was created, you can click Execution Details to see the details: 
![image](https://user-images.githubusercontent.com/94337797/145346855-14bca836-0b33-43c2-99dd-9bbe07332df7.png)

# Step 4: Create K8s cluster and request an instance

1.	K8s Cluster->Cluster List: 
![image](https://user-images.githubusercontent.com/94337797/145348389-667877c0-50e8-4201-bda0-e2c5ff3d77b0.png)

2.	Click Create Cluster to enter the Create Cluster page and fill in the configuration information: 
![image](https://user-images.githubusercontent.com/94337797/145348554-2e02790a-6614-4323-b431-cbc97c96e088.png)

3.	After the configuration is complete, click the Start Creating button and the page jumps to the cluster list page, showing the status of the cluster: 

![image](https://user-images.githubusercontent.com/94337797/145349578-227627ec-c289-4601-a6f3-72d54d2e8a78.png)

4.	After the K8s cluster is created successfully, request an instance from the K8s Cluster -> Request Instance page: 

![image](https://user-images.githubusercontent.com/94337797/145353434-83190fef-cb4c-40d8-8426-871fb55f0201.png)



