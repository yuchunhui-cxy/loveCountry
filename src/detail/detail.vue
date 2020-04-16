<template>
  <div style="display: flex;justify-content: center;flex-wrap: wrap;min-width: 1250px;">

    <div style="background: #FFF;width: 80%;height: 15vh;border-radius: 0 0 10px 10px;background: #0099dd;">
      <div style="color: #FFFFFF;font-size: 40px;margin-left: 2vw;">天津爱国主义教育基地</div>
      <div style="color: #FFF;cursor: pointer;margin-top: 2vh;width: 80%;margin-left: 10%;">
        <div style="width: 100%;display: flex;justify-content: center;">
          <div class="qu_left" :style="{'color':qu_name == '河东区'? '#CCC':'white'}" @click="change_qu('河东区')">河东</div>
          <div class="qu_center" :style="{'color':qu_name == '河西区'? '#CCC':'white'}" @click="change_qu('河西区')"> 河西 </div>
          <div class="qu_center" :style="{'color':qu_name == '南开区'? '#CCC':'white'}" @click="change_qu('南开区')"> 南开 </div>
          <div class="qu_center" :style="{'color':qu_name == '河北区'? '#CCC':'white'}" @click="change_qu('河北区')"> 河北 </div>
          <div class="qu_center":style="{'color':qu_name == '红桥区'? '#CCC':'white'}"  @click="change_qu('红桥区')"> 红桥 </div>
          <div class="qu_center" :style="{'color':qu_name == '和平区'? '#CCC':'white'}" @click="change_qu('和平区')"> 和平 </div>
          <div class="qu_center" :style="{'color':qu_name == '西青区'? '#CCC':'white'}" @click="change_qu('西青区')"> 西青 </div>
          <div class="qu_center" :style="{'color':qu_name == '东丽区'? '#CCC':'white'}" @click="change_qu('东丽区')"> 东丽 </div>
          <div class="qu_center" :style="{'color':qu_name == '津南区'? '#CCC':'white'}" @click="change_qu('津南区')"> 津南 </div>
          <div class="qu_right" :style="{'color':qu_name == '北辰区'? '#CCC':'white'}" @click="change_qu('北辰区')"> 北辰 </div>
        </div>


      </div>
    </div>

    <div style="background: #FFF;width: 75%;position: relative;display: flex;justify-content: center;flex-wrap: wrap;">

      <div style="width: 90%;position: absolute;top: -2vh;">
        <el-carousel height="250px">
          <el-carousel-item v-for="item in 4" :key="item">
                  <img style="width: 100%;height: 100%;" src="http://www.sh-aiguo.gov.cn/images/2011patriotism/banner.jpg" alt="">

          </el-carousel-item>
        </el-carousel>
      </div>

      <div style="height: 250px;width: 100%;"></div>
      <div style="display: flex;width: 100%;">
        <div style="flex: 1;padding: 2vh 2vw;">
          <img  @click="btn_yijian" class="b_m" src="http://www.sh-aiguo.gov.cn/images/2011patriotism/lxwm.jpg" alt="">
          <img style="width: 100%;" @click="newsBtn" class="b_m" src="../assets/news.jpg" alt="">

        </div>

        <div style="flex: 4;padding: 2vh 2vw;">

          <router-view :qu_name="qu_name"></router-view>
        </div>
      </div>
    </div>
    <div style="width: 80%;height: 10vh;background: #0099dd;color: #FFFFFF;text-align: center;line-height: 10vh;">Morbid所有 未经授权禁止复制或建立镜像</div>
    <el-dialog
      title="意见反馈"
      :visible.sync="dialogVisible"
      width="30%">
      <span>
        <el-form
          label-width="0px">
            <el-form-item label="" prop="">
              <el-input rows="10" type="textarea" placeholder="" v-model="user.content"></el-input>
            </el-form-item>

          </el-form>
      </span>
      <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="submit">提 交</el-button>
  </span>
    </el-dialog>
  </div>
</template>

<script>
    export default {
        name: "detail",
        mounted(){
          this.qu_name = this.$route.query.id
        },
        data(){
          return{
            qu_name:"",
            dialogVisible: false,
            user:{
              content:"",
            },
          }
        },
        methods:{
          newsBtn(){
            this.$router.push("/detail/news")
          },
          change_qu(qu){
            this.qu_name = qu
            if(this.$route.path == "/detail/juti" || "/detail/news"){
              this.$router.push({path:"/detail/detail_content",query:{id:this.qu_name}})
            }
          },
          btn_yijian(){
            this.dialogVisible = true
          },
          submit(){
            this.ajax({
              url: '/base/details',
              data:{
                content:this.user.content
              },
              headers:{
                "userNo": sessionStorage.getItem("userNo")
              },
              // params:{baseId:this.$route.query.id},
              //get请求把data变成params
              method: 'post',
            }).then(res=>{
              if(res.respCode == 0){
                this.$message({
                  message: '提交成功,感谢您的反馈',
                  type: 'success'
                });
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
  .b_m{
    margin-bottom: 2vh;
  }
  .qu_center{
    flex: 1;
    /*border-left: 2px solid #FFF;*/
    border-right: 2px solid #FFF;
    text-align: center;
  }
  .qu_left{
    flex: 1;
    border-left: 2px solid #FFF;
    border-right: 2px solid #FFF;

    text-align: center;
  }
  .qu_right{
    flex: 1;
    width:10%;
    border-right: 2px solid #FFF;
    text-align: center;
  }

</style>
