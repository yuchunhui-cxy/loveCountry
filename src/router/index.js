import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'

Vue.use(Router)

export default new Router({
	//	如果是根路由重定向到develop
	routes: [{
			path: '/',
			redirect: '/index',
		},
    {
      path:"/login",
      component:() => import("@/detail/login"),
    },
    {
      path:"/regist",
      component:() => import("@/detail/regist"),
    },
    {
      path:"/index",
      component:() => import("@/detail/index"),
    },
    {
      path:"/detail",
      component:() => import("@/detail/detail"),
      children: [{
        path: 'detail_content',
        component: () => import("@/detail/detail_content")},
        {
          path: 'juti',
          component: () => import("@/detail/juti")},
        {
          path: 'news',
          component: () => import("@/detail/news")}
      ]
    },
		{
			path: '/home',
			component: () => import("@/views/layout"),
			children: [
        {
          path: 'admin_hedong',
          name:"city",
          component: () => import("@/detail/admin_hedong"),
        },
        {
          path: 'admin_heping',
          name:"city",
          component: () => import("@/detail/admin_heping"),
        },
        {
          path: 'admin_fankui',
          component: () => import("@/detail/admin_fankui"),
        },
        {
          path: 'admin_hexi',
          name:"city",
          component: () => import("@/detail/admin_hexi"),
        },
        {
          path: 'admin_hebei',
          component: () => import("@/detail/admin_hebei"),
        },
        {
          path: 'admin_nankai',
          name:"city",
          component: () => import("@/detail/admin_nankai"),
        },
        {
          path: 'admin_hongqiao',
          component: () => import("@/detail/admin_hongqiao"),
        },

        {
          path: 'admin_beichen',
          name:"city",
          component: () => import("@/detail/admin_beichen"),
        },
        {
          path: 'admin_jinnan',
          component: () => import("@/detail/admin_jinnan"),
        },
        {
          path: 'admin_dongli',
          name:"city",
          component: () => import("@/detail/admin_dongli"),
        },
        {
          path: 'admin_xiqing',
          component: () => import("@/detail/admin_xiqing"),
        },





			  {
				path: 'index',
				component: () => import("@/views/index"),
				children: [{
					name: "index1",
					path: 'index1',
					component: () => import("@/views/index1"),
				},
        {
          name: "index2",
          path: 'index2:id',
          //    	替换index里的router-view
          component: () => import("@/views/index2"),
        }]
			},
        {
          path: 'echarts',
          component: () => import("@/views/echarts"),
        },
        {
          path: 'vuex',
          component: () => import("@/views/vuex"),
        },
        {
          path: 'all_line',
          component: () => import("@/views/all_line"),
        },
        {
          path: 'ajax',
          component: () => import("@/views/ajax"),
        }

      ]
		},
    {
      path:"*",
      component:() => import("@/views/not_find")

    }
	]
})




