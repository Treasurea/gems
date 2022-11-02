export const idService = [
  {
    path: '/id-service',
    name: 'id-service',
    component: () => import('@/layouts/Layout'),
    redirect: {
      name: 'id-service-list',
    },
    children: [
      {
        path: '/id-service',
        meta: {
          header: 'routerbar.idaas.h_account',
          title: 'routerbar.idaas.g_account',
          icon: 'mdi-cloud',
        },
        component: () => import('@/layouts/Container'),
        redirect: { name: 'id-service-list' },
        children: [
          // 首页
          {
            path: 'id-apply',
            name: 'id-service-list',
            component: () => import('@/views/idservice/index.vue'),
            meta: {
              icon: 'mdi-cloud-outline',
              requireAuth: true,
              title: 'routerbar.id.apply',
              show: true,
              rootName: 'id-service',
              tip: 'virtualspace',
            },
          },
          // 账户
          {
            path: 'id-account',
            name: 'id-service-account',
            component: () => import('@/views/idservice/account/Account'),
            meta: {
              icon: 'mdi-dns',
              requireAuth: true,
              title: 'routerbar.id.account',
              show: true,
              rootName: 'idaas-service',
              tip: 'dns',
            },
          },
          {
            path: 'idaas-identity',
            name: 'idaas-service-identity',
            component: () => import('@/views/idaas/identity/IdentityProvide'),
            meta: {
              icon: 'mdi-dns',
              requireAuth: true,
              title: 'routerbar.idaas.identity',
              show: false,
              rootName: 'idaas-service',
              tip: 'dns',
            },
          },
          {
            path: 'idaas-applySetting',
            name: 'idaas-service-applyInstance',
            component: () => import('@/views/idaas/apply/components/applySetting'),
            meta: {
              icon: 'mdi-dns',
              requireAuth: true,
              title: 'routerbar.idaas.applySetting',
              show: false,
              rootName: 'idaas-service',
              tip: 'dns',
            },
          },
          {
            path: 'idaas-applyInstance',
            name: 'idaas-service-applySetting',
            component: () => import('@/views/idaas/apply/components/instance'),
            meta: {
              icon: 'mdi-dns',
              requireAuth: true,
              title: 'routerbar.idaas.instance',
              show: true,
              rootName: 'idaas-service',
              tip: 'dns',
            },
          },
          {
            path: 'idaas-auth',
            name: 'idaas-service-auth',
            component: () => import('@/views/idaas/auth'),
            meta: {
              icon: 'mdi-dns',
              requireAuth: true,
              title: 'routerbar.idaas.qx',
              show: true,
              rootName: 'idaas-service',
              tip: 'dns',
            },
          },
        ],
      },
    ],
  },
];
