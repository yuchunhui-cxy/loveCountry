<template>
  <div>
    <div style="background: aliceblue;height: 30px;line-height: 30px;margin-bottom: 15px;padding: 10px;color: #0099dd;cursor: pointer;">
      首页>> <span style="color: dodgerblue">{{quName}}</span> 爱国主义教育基地
    </div>

    <div style="display: flex;flex-wrap: wrap;">
      <div @click="change_juti(item.id)" :key="item.key" v-for="(item,index) in options" style="display: flex;width: 45%;margin-right:15px;margin-bottom: 15px;">
        <img style="width: 150px;height:150px;margin-right: 10px;" src="http://www.sh-aiguo.gov.cn/images/2011patriotism/banner.jpg" alt="">
        <div style="width: calc(100% - 150px);">
          <div style="font-size: 12px;margin-bottom: 10px">{{item.baseName}}</div>
          <div style="overflow: hidden;" class="detail_overflow">{{item.baseIntroduction}}</div>
        </div>
      </div>
    </div>


    <div style="display: flex;align-items: center;justify-content: center">
      <el-pagination
        layout="prev, pager, next"
        :page-size="pageSize"
        :total="total"
        @current-change="cur"
        v-if="total">
      </el-pagination>

    </div>

  </div>

</template>

<script>
    export default {
      name: "detail_content",
      data() {
        return {
          options: [],
          value: '',
          total:0,
          pageSize:2,
          page:1,
          quName:"",
        }
      },
      props:["qu_name"],
      watch:{
        qu_name:{
          handler(newName, oldName) {
            this.quName = newName
            this.page = 1
            this.page_ajax()
          },
          // 代表在wacth里声明了firstName这个方法之后立即先去执行handler方法，如果设置了false，那么效果和上边例子一样
          immediate: true
        }
      },
      mounted() {
        let text = [{id:1,name:"和平区"},
          {id:2,name:"河西区"},
          {id:3,name:"河东区"},
          {id:4,name:"河北区"},
          {id:5,name:"南开区"},
          {id:6,name:"红桥区"},
          {id:7,name:"东丽区"},
          {id:8,name:"西青区"},
          {id:9,name:"津南"},
          {id:10,name:"北辰区"},
        ]
        let item = text.find(item=>{
          return item.name == this.$route.query.id
        })
        let me = this
        // this.ajax({
        //   url: '/base/baseList',
        //   data:{
        //     "pageSize":"2",
        //     "pageNum":"1",
        //     "parentId":item.id,
        //   },
        //   headers:{
        //     "userNo": sessionStorage.getItem("userNo")
        //   },
        //   // params:{email:this.user.email},
        //   //get请求把data变成params
        //   method: 'post',
        // }).then(res=>{
        //   console.log(res)
        //   if(res.respCode == 0){
        //     this.options = res.data.data
        //     this.total = Number(res.data.total)
        //     // this.$message({
        //     //   message: '',
        //     //   type: 'success'
        //     // });
        //   }else {
        //     this.$message({
        //       message: res.respMsg,
        //       type: 'warning'
        //     });
        //   }
        // }).catch(err=>{
        //
        // })
      },

      methods:{
        change_juti(id){
          this.$router.push({path:"/detail/juti",query:{id}})
        },
        cur(value){
          this.page = value
          this.page_ajax()
        },
        page_ajax(){
          let text = [{id:1,name:"和平区"},
            {id:2,name:"河西区"},
            {id:3,name:"河东区"},
            {id:4,name:"河北区"},
            {id:5,name:"南开区"},
            {id:6,name:"红桥区"},
            {id:7,name:"东丽区"},
            {id:8,name:"西青区"},
            {id:9,name:"津南"},
            {id:10,name:"北辰区"},
            ]
          let item = text.find(item=>{
            return item.name == this.quName
          })
          if(item){
            this.ajax({
              url: '/base/baseList',
              data:{
                "pageSize":"2",
                "pageNum":this.page,
                "parentId":item.id,
              },
              headers:{
                "userNo": sessionStorage.getItem("userNo")
              },
              // params:{email:this.user.email},
              //get请求把data变成params
              method: 'post',
            }).then(res=>{
              if(res.respCode == 0){
                this.options = res.data.data
                this.total = Number(res.data.total)
              }else {
                this.$message({
                  message: res.respMsg,
                  type: 'warning'
                });
              }
            }).catch(err=>{

            })
          }

        },

      }
    }
</script>

<style scoped>
  .detail_overflow{

    display: -webkit-box;/** 对象作为伸缩盒子模型显示 **/
    word-break: break-all;
    text-overflow: ellipsis;
    -webkit-box-orient: vertical;/** 设置或检索伸缩盒对象的子元素的排列方式 **/
    -webkit-line-clamp: 5;/** 显示的行数 **/
  }
</style>
