<template>
    <div>
      <div>{{obj.baseName}}</div>
      <img src="http://www.sh-aiguo.gov.cn/images/thumbnailimg/month_1907/20190722095807584.jpg" alt="">
      <div class="m" style="text-indent: 2em;">
      {{obj.baseIntroduction}}
      </div>
      <div class="m">地址:{{obj.baseLocation}}</div>
      <div class="m">电话: {{obj.telNo}}</div>
      <div class="m">开放时间: {{obj.openTime}}</div>
      <div class="m">公共交通: {{obj.publicTransportation}}</div>
      <el-button @click="drawer = true" type="primary">
        添加评论
      </el-button>

      <el-drawer
        title="我是标题"
        :visible.sync="drawer"
        :with-header="false">
        <div style="padding: 20px;">
          <el-input
            :autofocus="auto"
            type="textarea"
            :rows="2"
            placeholder=""
            v-model="remake">
          </el-input>
          <div v-for="item in [1,2]" style="margin-top: 10px;">
            <div style="display: flex;justify-content: space-between;">
              <div style="display: flex;">
                <img src="../assets/bg.jpg" alt="" style="width: 20px;height: 20px;border-radius: 50%;">
                <div style="margin-left: 15px;">走路不看手机</div>
                <div style="margin-left: 15px;">俩个月前</div>
              </div>
              <div style="display: flex;">
                <div @click="auto=true">回复</div>
                <div style="margin-left: 15px;">查看回复(34)</div>
              </div>
            </div>
            <div style="padding: 0;margin-left: 30px;margin-top: 5px;">
              <div>111111111111111111111111111111</div>
              <div style="display: flex;justify-content: space-between;border-left: 2px solid #CCC;padding: 10px;">
                <div style="display: flex;">
                  <img src="../assets/bg.jpg" alt="" style="width: 20px;height: 20px;border-radius: 50%;">
                  <div style="margin-left: 15px;">走路不看手机</div>
                  <div @click="auto=true" style="margin-left: 15px;">回复 2222</div>
                </div>

                <div>回复</div>
              </div>
            </div>

          </div>


        </div>


      </el-drawer>

    </div>
</template>

<script>
    export default {
        name: "juti",
      data(){
          return {
            obj:{},
            drawer: false,
            remake:"",
            auto:false
          }
      },
        mounted(){
          this.ajax({
            url: '/base/details',
            // data:{
            //   id:this.$route.query.id
            // },
            headers:{
              "userNo": sessionStorage.getItem("userNo")
            },
            params:{baseId:this.$route.query.id},
            //get请求把data变成params
            method: 'get',
          }).then(res=>{
            if(res.respCode == 0){
              this.obj = res.data
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
</script>

<style scoped>
  .m{
    margin-top: 2vh;
    margin-bottom: 2vh;

  }
</style>
