const menuList = [
  {
    title: 'Home',
    key: '/admin/home'
  },
  {
    title: 'UI',
    key: '/admin/ui',
    children: [
      {
        title: 'button',
        key: '/admin/ui/buttons'
      },
      {
        title: 'modal',
        key: '/admin/ui/modals'
      },
      {
        title: 'Loading',
        key: '/admin/ui/loadings'
      },
      {
        title: 'notification',
        key: '/admin/ui/notification'
      },
      {
        title: 'Message',
        key: '/admin/ui/messages'
      },
      {
        title: 'Tab',
        key: '/admin/ui/tabs'
      },
      {
        title: 'gallery',
        key: '/admin/ui/gallery'
      },
      {
        title: 'carousel',
        key: '/admin/ui/carousel'
      }
    ]
  },
  {
    title: 'form',
    key: '/admin/form',
    children: [
      {
        title: 'login',
        key: '/admin/form/login'
      },
      {
        title: 'register',
        key: '/admin/form/reg'
      }
    ]
  },
  {
    title: 'table',
    key: '/admin/table',
    children: [
      {
        title: 'basic table',
        key: '/admin/table/basic'
      },
      {
        title: 'highlevel table',
        key: '/admin/table/high'
      }
    ]
  },
  {
    title: 'richtxt',
    key: '/admin/rich'
  },
  {
    title: 'city',
    key: '/admin/city'
  },
  {
    title: 'order',
    key: '/admin/order',
    btnList: [
      {
        title: 'detail',
        key: 'detail'
      },
      {
        title: 'finishOrder',
        key: 'finish'
      }
    ]
  },
  {
    title: 'user',
    key: '/admin/user'
  },
  {
    title: 'bikeMap',
    key: '/admin/bikeMap'
  },
  {
    title: 'charts',
    key: '/admin/charts',
    children: [
      {
        title: 'bar',
        key: '/admin/charts/bar'
      },
      {
        title: 'pie',
        key: '/admin/charts/pie'
      },
      {
        title: 'line',
        key: '/admin/charts/line'
      }
    ]
  },
  {
    title: 'permission',
    key: '/admin/permission'
  }
]
export default menuList