export const idaasService = [
  {
    path: '/idaas-service',
    name: 'idaas-service',
    component: () => import('@/layouts/Layout'),
    redirect: {
      name: 'idaas-service-list',
    },
    children: [
      {
        path: '/idaas-service',
        meta: {
          header: 'routerbar.idaas.h_account',
          title: 'routerbar.idaas.g_account',
          icon: 'mdi-cloud',
        },
        component: () => import('@/layouts/Container'),
        redirect: { name: 'idaas-service-list' },
        children: [
          // virtualspace
          {
            path: 'idaas-account',
            name: 'idaas-service-list',
            component: () => import('@/views/idaas/account/Account'),
            meta: {
              icon: 'mdi-cloud-outline',
              requireAuth: true,
              title: 'routerbar.idaas.account',
              show: true,
              rootName: 'idaas-service',
              tip: 'virtualspace',
            },
          },
          // dnsdomain
          {
            path: 'idaas-apply',
            name: 'idaas-service-apply',
            component: () => import('@/views/idaas/apply/Apply'),
            meta: {
              icon: 'mdi-dns',
              requireAuth: true,
              title: 'routerbar.idaas.apply',
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
