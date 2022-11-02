export const SIDEBAR_ITEMS = [
 {
   text: '集群管理',
   sidebar: 'cluster',
   value: 'admin-workspace',
   icon: 'cib:kubernetes',
   admin: true,
 },
 {
   text: '容器服务',
   sidebar: 'dashboard',
   value: 'resource-dashboard',
   icon: 'cib:kubernetes',
   required: ['tenant'],
 },
 {
   text: '容器服务',
   sidebar: 'projectspace',
   value: 'project-detail',
   icon: 'cib:kubernetes',
   required: ['tenant', 'project'],
 },
 {
   text: '容器服务',
   sidebar: 'workspace',
   value: 'environment-detail',
   icon: 'cib:kubernetes',
   required: ['tenant', 'project', 'environment'],
 },
 {
   text: '服务治理',
   sidebar: 'microservice',
   value: 'microservice',
   icon: 'file-icons:service-fabric',
   dependencies: ['istio'],
   admin: 'all',
 },
 {
   text: '服务治理',
   sidebar: 'virtualspace',
   value: 'microservice',
   icon: 'file-icons:service-fabric',
   required: ['virtualspace'],
   dependencies: ['istio'],
 },
 {
   text: '可观测性',
   sidebar: 'observe',
   value: 'admin-observe',
   icon: 'clarity:dashboard-solid-badged',
   admin: true,
 },
 {
   text: '可观测性',
   sidebar: 'workspaceobserve',
   value: 'observe',
   icon: 'clarity:dashboard-solid-badged',
 },
 {
   text: '平台管理',
   sidebar: 'platform',
   value: 'platform',
   icon: 'cib:codesandbox',
   admin: true
 },
 {
  text: '租户工作台',
  sidebar: 'tenant_workspace',
  value: 'tenant_workspace',
  icon: 'cib:codesandbox',
  admin: true
},
{
 text: '身份应用服务',
 sidebar: 'platform',
 value: 'platform',
 icon: 'cib:codesandbox',
 admin: true
}
];
