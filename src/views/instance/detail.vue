<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="4"><span class="instance-detail-label">实例ID</span></el-col>
      <el-col :span="8"><div class="instance-detail-content">{{ detail.instance_id }}</div></el-col>
      <el-col :span="4"><span class="instance-detail-label">创建时间</span></el-col>
      <el-col :span="8"><div class="instance-detail-content">{{ detail.create_at | formatMomentZone('YYYY-MM-DD HH:mm:ss') }}</div></el-col>
    </el-row>
    <el-row :gutter="20" style="margin-top: 10px">
      <el-col :span="4"><span class="instance-detail-label">云厂商</span></el-col>
      <el-col :span="8"><div class="instance-detail-content">{{ detail.provider | filterCloudProvider }}</div></el-col>
      <el-col :span="4"><span class="instance-detail-label">镜像ID</span></el-col>
      <el-col :span="8"><div class="instance-detail-content">{{ detail.image_id }}</div></el-col>
    </el-row>
    <el-row :gutter="20" style="margin-top: 10px">
      <el-col :span="4"><span class="instance-detail-label">示例规格</span></el-col>
      <el-col :span="8"><div class="instance-detail-content">{{ detail.instance_type }}</div></el-col>
      <el-col :span="4"><span class="instance-detail-label">数据盘个数</span></el-col>
      <el-col :span="8"><div class="instance-detail-content">{{ detail.storage_config.data_disk_num }}</div></el-col>
    </el-row>
    <el-row :gutter="20" style="margin-top: 10px">
      <el-col :span="4"><span class="instance-detail-label">系统盘类型</span></el-col>
      <el-col :span="8"><div class="instance-detail-content">{{ detail.storage_config.system_disk_type }}</div></el-col>
      <el-col :span="4"><span class="instance-detail-label">系统盘大小</span></el-col>
      <el-col :span="8"><div class="instance-detail-content">{{ detail.storage_config.system_disk_size }}</div></el-col>
    </el-row>
    <el-row v-for="(i, idx) in detail.storage_config.data_disks" :key="idx" :gutter="20" style="margin-top: 10px">
      <el-col :span="4"><span class="instance-detail-label">数据盘类型</span></el-col>
      <el-col :span="8"><div class="instance-detail-content">{{ i.data_disk_type }}</div></el-col>
      <el-col :span="4"><span class="instance-detail-label">数据盘大小</span></el-col>
      <el-col :span="8"><div class="instance-detail-content">{{ i.data_disk_size }}</div></el-col>
    </el-row>
    <el-row :gutter="20" style="margin-top: 10px">
      <el-col :span="4"><span class="instance-detail-label">VPC名称</span></el-col>
      <el-col :span="8"><div class="instance-detail-content">{{ detail.network_config.vpc_name }}</div></el-col>
      <el-col :span="4"><span class="instance-detail-label">子网名称</span></el-col>
      <el-col :span="8"><div class="instance-detail-content">{{ detail.network_config.subnet_id_name }}</div></el-col>
    </el-row>
    <el-row :gutter="20" style="margin-top: 10px">
      <el-col :span="4"><span class="instance-detail-label">内网IP</span></el-col>
      <el-col :span="8"><div class="instance-detail-content">{{ detail.ip_inner }}</div></el-col>
      <el-col :span="4"><span class="instance-detail-label">安全组名称</span></el-col>
      <el-col :span="8"><div class="instance-detail-content">{{ detail.network_config.security_group_name }}</div></el-col>
    </el-row>
    <el-row :gutter="20" style="margin-top: 10px">
      <el-col :span="4"><span class="instance-detail-label">公网IP</span></el-col>
      <el-col :span="8"><div class="instance-detail-content">{{ detail.ip_outer }}</div></el-col>
      <el-col :span="4"><div style="height: 35px" /></el-col>
      <el-col :span="8"><div style="height: 35px" /></el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'Detail',
  props: {
    detail: {
      type: Object,
      default() {
        return {
          create_at: null,
          instance_id: '',
          provider: '',
          region_id: '',
          image_id: '',
          instance_type: '',
          storage_config: {
            system_disk_type: '',
            system_disk_size: 0,
            data_disk_type: '',
            data_disk_size: 0,
            data_disk_num: 0
          },
          network_config: {
            vpc_name: '',
            subnet_id_name: '',
            security_group_name: ''
          },
          ip_outer: '',
          ip_inner: ''
        }
      }
    }
  }
}
</script>

<style lang="less" scoped>
  .instance-detail-label {
    color: #7f7f7f;
  }
  .instance-detail-content {
    color: #333333;
    height: 35px;
  }
</style>
