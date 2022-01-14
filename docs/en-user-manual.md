# ComandX User Manual
## 1. Introduction
### 1.1 Marking
  This document is the user instruction document of ComandX open-source cloud-native system, corresponding to the initial open source version V1.0.
       
### 1.2 System Overview
 ComandX is an observable interface-based O&M solution. It is a web-based visual presentation interface for BridgX and SchedulX, providing a simple and easy-to-use operating experience.
It has the following key features:
1. Support for cluster creation and management;
2. Support for scaling up and scaling down tasks;
3. Support for K8s cluster creation and management;
4. Support for service deployment and orchestration;
5. Support for cloud server management;
6. Support for cloud account management;
7. Support for fees management;
8. Support for Dashboard global display.


### 1.3 System Architecture
  The ComandX system consists of several modules through which users can interface with BridgX and SchedulX. The dashboard module is a convenient way for the operator to overview the use of cloud resources, including active clusters, running tasks, the number of tasks, the total hours of cluster operation and other information; the scaling up and down module allows users to quickly create and manage scaling up and down tasks when needed; cluster management module allows users to define the appropriate cluster template according to business needs, and also can manage the cluster template; the K8s cluster module allows users to create K8s clusters, request for instances, and manage K8s clusters and instances; the service deployment module enables users to deploy services and mirrors on their machines; the cloud server module helps customers manage the server resources they request for; the cloud vendor account module helps customers manage the account information of different cloud vendors; the fees management module enables users to see their own cloud resources; the account management module helps users to manage sub-accounts and add, delete, and check sub-accounts as well.
  
### 1.4 Documentation Overview
  This article is the user manual for the ComandX system and provides detailed information on how to use ComandX. Anyone is welcome to read and use this document and make it available to other students interested in the ComandX platform.
  
### 1.5 Explanation of Terms

<table>
  <tr>
    <td>S/N</td>
    <td>Terminology</td>
    <td>Definition</td>
  </tr>
  <tr>
    <td>1</td>
    <td>Cluster</td>
    <td>A common template for a group of identically configured machines.</td>
  </tr>
  <tr>
    <td>2</td>
    <td>Scaling Up</td>Increase the number of cloud servers.</td>
  </tr>
  <tr>
    <td>3</td>
    <td>Scaling Down</td>
    <td>Reduce the number of cloud servers.</td>
  </tr>
  <tr>
    <td>4</td>
    <td>Task</td>
    <td>A scaling up or scaling down task</td>
  </tr>
       
</table>




## 2. Software Overview
### 2.1 Software Applications
  ComandX systems can be used to build an organization's internal IT infrastructure, providing services such as K8s container management, rapid scale-up and scale-down, cluster management, task management, machine management, and fees management.
  
### 2.2 User Role Description
  Administrators, developers, business personnel.

### 2.3 Authorization and Use
  ComandX follows the Apache License 2.0 open source agreement. Users can freely download and use this system for at no cost. The use of this system is at the user's sole risk.
  
## 3. Scaling Up And Scaling Down Tasks
  The scaling up and scaling down tasks module is mainly used to help users quickly perform quantitative scaling up and scaling down tasks according to their business needs, and manage the execution of the tasks.
### 3.1 Instant Scaling Up And Scaling Down 
  When customers have a scaling up and scaling down task, they can select the scaling cluster template, the number and type of scaling, and then rapidly perform the scaling task. When the created task does not have a suitable cluster, it can also be configured by adding a quick entry for the cluster. 
![image](https://user-images.githubusercontent.com/94337797/145365065-083ea719-eb6a-4240-913e-133da5525974.png)


### 3.2 Task List
 The Task List module helps users to manage the tasks that have been created. You can search and sift by task name, cluster, and status to quickly find the task of interest. At the same time, the New button allows you to quickly access the Create Task page to create a new task. 
![image](https://user-images.githubusercontent.com/94337797/145370140-50f90cf7-eec7-46f1-afa8-0a3e7a3f1278.png)

If you are interested in the description of the task, you can view it by clicking on the task ID, including information such as task name, execution cluster, change action, number of machines changed, and execution time.
![image](https://user-images.githubusercontent.com/94337797/145370755-666a6f53-70bf-4eaa-9895-72b891e3af49.png)

If you are interested in the execution details of a task, click on the execution details for a convenient overview, which includes the machine's IP, status, start time, elapsed time, and other information.
  ![image](https://user-images.githubusercontent.com/94337797/145371168-26932e6f-e587-4aba-b452-b03d45cccbf0.png)




## 4. Cluster Management
  The cluster management module is mainly used to create configuration templates for configuring the same machines, including the same parameters such as cloud vendor, network configuration, machine configuration, system configuration, etc., and to manage, add, delete, check and change the created cluster templates.
  
  
### 4.1 Creating a Cluster
  Creating a cluster consists of four main steps: cloud vendor configuration, network configuration, machine configuration, and system configuration.

  The cloud vendor configuration is mainly for cluster name, cluster description filling and cloud vendor and cloud account selection. When selecting the cloud account again, the user's cloud account information should be entered in advance in the cloud vendor account module in advance.
![image](https://user-images.githubusercontent.com/94337797/147357119-b6a83996-2a09-471f-8603-48ac3dbecd50.png)


The network configuration module focuses on selecting the available zone and area of the cloud vendor to which the cluster belongs, as well as the VPC network, subnet configuration, and security group configuration. If compatible VPCs, subnets or security groups are still available, they can be created quickly using the corresponding buttons on the left. If you need public network access, you can enable the public network configuration to set the bandwidth charge type and maximum bandwidth.
![image](https://user-images.githubusercontent.com/94337797/145373899-3fe761a8-455f-4b6f-8365-a6ad57d0f44d.png)
 

The machine configuration module includes payment methods, machine specifications, operating system image, system disk and data disk parameters configuration. 
![image](https://user-images.githubusercontent.com/94337797/145374076-e54139f3-a336-4d70-844e-63dbf6a72851.png)

The system is configured to encrypt the machines created through this cluster. 
![image](https://user-images.githubusercontent.com/94337797/145374319-faa22bf8-0e56-4b2c-9e07-f24c0c91f2fe.png)

  
### 4.2 Cluster List
  The cluster list provides the ability to manage the created clusters, which can be selected and screened by cluster name, cloud vendor or Access Key information, and the Create Cluster button allows you to quickly access the Create Cluster page to add a new cluster.
![image](https://user-images.githubusercontent.com/94337797/147357317-c835250a-e3cb-4119-bb28-2212213b3e2d.png)

If a cluster training needs to be changed or deleted, you can first select it in the first column of the list, and then click the corresponding Edit or Delete button.
![image](https://user-images.githubusercontent.com/94337797/145374783-56ca5c5e-3c29-4237-8658-734eab236e8a.png)



## 5. K8s Cluster
 K8s cluster module provides functions such as cluster list, create cluster, request instance, instance group list, instance list, instance request form, etc. which allow, users to operate K8s easily.

### 5.1 List of Clusters
The cluster list module provides query function for existing K8s clusters, which can be queried according to ID and cluster name, and can display information such as status, ID, cluster name, CPU, memory, storage, cluster machines, and number of cluster instances for each cluster. 
![image](https://user-images.githubusercontent.com/94337797/145389933-10a7e153-1533-4b4b-8db2-916cbbe41427.png)

If you need to create a new cluster, click the Create Cluster button and follow the prompts to configure the parameters to create it. 
![image](https://user-images.githubusercontent.com/94337797/145390047-995953e9-150a-4ca2-919d-f423b2fbd264.png)

### 5.2 Request Instance 
The request instance module helps users request for instances with the same specifications for quick and easy operation, and they can request for multiple instance groups at the same time. 
![image](https://user-images.githubusercontent.com/94337797/145390365-4d215953-6456-46a8-987f-f9595376353b.png)

### 5.3 Instance Groups 
The instance group module is mainly for managing, searching and deleting requested instance groups, and scaling instance groups directly.
![image](https://user-images.githubusercontent.com/94337797/145390456-21ce4033-2ed8-42ec-8673-416e81b5dbdf.png)

### 5.4 Instance List
The instance list module is mainly for managing requested instances. You can find a specific instance by Pod IP or Host IP, delete or restart an instance, and provide a quick entry point to a requested instance. 
![image](https://user-images.githubusercontent.com/94337797/145391087-8a156aa3-c670-41d2-b906-df346c3a8b75.png)

### 5.5 Instance Request Form
The instance request form module mainly records the process of each instance request, including the execution status, running number, cluster, instance group, instance configuration, number of changed instances, execution time, request and creation time, and other information.
![image](https://user-images.githubusercontent.com/94337797/145391158-171bdcaa-bc7a-4516-9cac-87eef42f3422.png)


## 6. Service Deployment
The Service Deployment module allows users to perform service image deployment.

## 6.1 Creating Services
Create a service by configuring the service name and service type
![image](https://user-images.githubusercontent.com/94337797/145392067-6a9115a6-3632-4cd4-9786-1c691b9e94d2.png)

## 6.2 Service List
The Service List module not only allows you to view information about a specific service, but also allows you to scale it. To scale up or down a service, click on the scale up or down of the corresponding service in the action list. 
![image](https://user-images.githubusercontent.com/94337797/143419363-9293d820-cf3b-40e5-b88a-d5e7d727cd96.png)

On the scaling up and down page, perform the following actions as required. 
![image](https://user-images.githubusercontent.com/94337797/143419451-2811560b-905b-4e92-bc78-55f69f51dcd5.png)

View details of the service. scaling implementation.
![image](https://user-images.githubusercontent.com/94337797/143419885-4f9c93d7-a96a-40c2-b37c-e061d7d95d56.png)

## 7. Cloud Server
  The cloud server module displays all the information of cloud servers that users have requested for, where you can select and screen by machine name, IP, cloud vendor and other information.
![image](https://user-images.githubusercontent.com/94337797/145394153-7135b8cc-2a89-4b47-9bd8-97fe5982e57c.png)


If you are interested in the details of a specific machine, you can click the corresponding machine name to view the details, including instance ID, creation time, cloud vendor, machine specification, mirror ID, system disk type and size, data disk type, size and number, and network configuration including VPC name, subnet name, security group name, intranet IP and public network IP information.
![image](https://user-images.githubusercontent.com/94337797/145394209-6e38efeb-f389-457b-98b0-a01e632d0c15.png)



## 8. Cloud Vendor Accounts
  The cloud vendor account module mainly manages the customer's cloud account information, which can be found and filtered by account name, cloud vendor, account information, etc. 
![image](https://user-images.githubusercontent.com/94337797/145393256-ff937e45-3dad-4902-bb14-8a461d05014c.png)

If you need to add a cloud account, you can click the Add Cloud Account button and fill in the account name, cloud vendor, and the AccessKey and AccessKey Secret information.
![image](https://user-images.githubusercontent.com/94337797/145393506-1766134f-d3d4-4665-b294-58f753180247.png)



## 9. Fees Management
  The fees module is mainly used to manage the charges for the cloud resources that have been requested by the customer. Customers can view the fees for all machines, or select by cluster to view the fees for a particular cluster, while also supporting query for the fees on a particular day. 
![image](https://user-images.githubusercontent.com/94337797/145393641-bde407a8-2c0e-49e5-aad6-f6199aab920f.png)


## 10. Account Management
  The account management module is mainly used to manage master accounts and sub-accounts, and allows you to create, disable and enable sub-accounts. 
![image](https://user-images.githubusercontent.com/94337797/145393718-e87f59b7-b2ab-4ed7-a3ba-6158a94942fa.png)

When you need to create a sub-account, click the Create Sub-Account button and add a sub-account by adding a username and password.=
  ![image](https://user-images.githubusercontent.com/94337797/145393795-150b0cad-83ba-4522-ba60-34a049859838.png)

