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
      <el-button @click="remakeAdd" type="primary">
        添加评论
      </el-button>

      <el-drawer
        title="我是标题"
        :visible.sync="drawer"
        :with-header="false">
        <div style="padding: 20px;height: 90%;overflow: auto;">
          <el-input
            type="textarea"
            :rows="2"
            :placeholder="replayWho"
            v-model="remake">
          </el-input>
          <el-button @click="remakeBtn" type="primary" style="margin-top: 10px;float: right;">评论</el-button>
          <div style="clear: both;"></div>

          <div v-for="item1 in remakeList" style="margin-top: 10px;">
            <div v-for="item in item1.result">
              <div>
                <div style="display: flex;justify-content: space-between;">
                  <div style="display: flex;">
                    <img src="../assets/bg.jpg" alt="" style="width: 20px;height: 20px;border-radius: 50%;">
                    <div style="margin-left: 15px;">{{item.wordAuthorName}}</div>
                    <div style="margin-left: 15px;">{{item.createDate}}</div>
                  </div>
                  <div style="display: flex;">
                    <div @click="replay(item.wordAuthorId,item.id,item.wordAuthorName)" style="color: #409EFF;cursor: pointer;">回复</div>
                    <!--                  <div style="margin-left: 15px;">查看回复({{item.list.length}})</div>-->
                  </div>
                </div>
                <div style="margin-left: 30px;">{{item.msgContent}}</div>

                <div style="border-left: 2px solid #CCC;padding: 0;margin-left: 30px;margin-top: 5px;">
                  <div :key="" v-for="ite in item.list">
                    <div style="display: flex;justify-content: space-between;padding: 10px;align-items: center;flex-wrap: wrap;">
                      <div style="display: flex;">
                        <img src="../assets/bg.jpg" alt="" style="width: 20px;height: 20px;border-radius: 50%;">
                        <div style="margin-left: 15px;">{{ite.wordAuthorName}}</div>
                        <div style="margin-left: 15px;">回复 {{ite.wordMasterName}}</div>
                        <div style="margin-left: 15px;">{{ite.createDate}}</div>
                        <div @click="replay(ite.wordAuthorId,ite.parentId,ite.wordAuthorName)" style="color: #409EFF;cursor: pointer;margin-left: 15px;">回复</div>

                      </div>

                      <div style="width: 100%;">
                        {{ite.msgContent}}

                      </div>


                    </div>

                  </div>

                </div>



              </div>
            </div>




          </div>
          <div style="display: flex;align-items: center;justify-content: center">
            <el-pagination
              layout="prev, pager, next"
              :page-size="pageSize"
              :total="total"
              :current-page="pageNum"
              @current-change="cur">
            </el-pagination>

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
            replayWho:"回复：管理员",
            remakeList:[],
            total:0,
            pageSize:5,
            pageNum:1,
            wordMasterId:"JYJD202011111",
            // 被回复人的id
            parentId:""
          }
      },
      methods:{
        remakeAdd(){
          this.page_ajax()
          this.remake = ""
          this.replayWho = "回复：管理员"
           this.wordMasterId = "JYJD202011111"
          this.drawer = true
        },
        remakeBtn(){
          this.ajax({
            url: '/leaveMsg/communication',
            data:{
              parentId:this.parentId,
              wordAuthorId:sessionStorage.getItem("userNo"),
              wordMasterId:this.wordMasterId,
              msgContent:this.remake,
              cityCode:this.obj.parentId,
              areaCode:this.$route.query.id,
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
                message: "评论成功！",
                type: 'success'
              });
              this.cur(1)
              this.remake = ""
            }else {
              this.$message({
                message: res.respMsg,
                type: 'warning'
              });
            }
          }).catch(err=>{

          })

        },
        cur(value){
          this.pageNum = value
          this.page_ajax()
        },
        page_ajax(){
          // 评论接口
          this.ajax({
            url: '/leaveMsg/getMsg',
            data:{
              pageSize:this.pageSize,
              pageNum:this.pageNum,
              data:{
                cityCode:this.$route.query.id

              }
            },
            headers:{
              "userNo": sessionStorage.getItem("userNo")
            },
            // params:{},
            //get请求把data变成params
            method: 'post',
          }).then(res=>{
            if(res.respCode == 0){
              this.remakeList = res.data.data
              this.total = res.data.total
            }else {
              this.$message({
                message: res.respMsg,
                type: 'warning'
              });
            }
          }).catch(err=>{

          })

        },
        replay(id,parentId,name){
          this.replayWho = "回复：" +name
          this.wordMasterId = id
          this.parentId = parentId
          this.remake = ""

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
