<template>
    <div>
      <div style="display: flex;align-items: center;margin-bottom: 20px;" :key="item.id" v-for="item in data">
        <img style="margin-right: 20px;width: 5px;height: 5px;" src="http://www.sh-aiguo.gov.cn/images/2011patriotism/x3.gif" alt="">
        <div style="margin-right: 20px;flex: 5">{{item.title}}</div>
        <div style="flex: 1">{{item.createTime}}</div>
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
        name: "juti",
      data(){
          return {
            data:[],
            total:0,
            pageSize:3,
            pageNum:1,
          }
      },
      mounted(){
        this.listAjax()

      },
      methods:{
        cur(value){
          this.page = value
          this.listAjax()
        },
        listAjax(){
          this.ajax({
            url: '/baseNews/getAllNews',
            data:{
              pageSize: this.pageSize,
              pageNum:this.page,
            },
            headers:{
              "userNo": sessionStorage.getItem("userNo")
            },
            // params:{baseId:this.$route.query.id},
            //get请求把data变成params
            method: 'post',
          }).then(res=>{
            if(res.respCode == 0){
              this.data = res.data.data
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
      }

    }
</script>

<style scoped>
  .m{
    margin-top: 2vh;
    margin-bottom: 2vh;

  }
</style>
