<template>
    <div style="padding: 20px;">
      <el-table
        :data="tableData"
        style="width: 100%">
        <el-table-column
          prop="wordAuthorName"
          label="用户名"
          width="180">
        </el-table-column>
        <el-table-column
          prop="msgContent"
          label="反馈信息"
          width="180">
        </el-table-column>
        <el-table-column
          prop="city"
          label="所属地区"
          width="180">
        </el-table-column>
        <el-table-column
          prop="areaName"
          label="景点名称"
          width="180">
        </el-table-column>
        <el-table-column
          prop="createDate"
          label="反馈时间">
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          width="100">
          <template slot-scope="scope">
            <el-button @click="replayBtn(scope.row)" type="text" size="small">回复</el-button>
          </template>
        </el-table-column>
      </el-table>

      <div style="display: flex;align-items: center;justify-content: center">
        <el-pagination
          layout="prev, pager, next"
          :page-size="pageSize"
          :total="total"
          @current-change="cur">
        </el-pagination>

      </div>

      <el-dialog :title="title" :visible.sync="dialogVisible">
        <el-form :model="form">
          <el-input
            type="textarea"
            :rows="5"
            placeholder="请输入内容"
            v-model="form.text">
          </el-input>

        </el-form>
        <div slot="footer" class="dialog-footer">
<!--          <el-button @click="dialogVisible = false">取 消</el-button>-->
          <el-button type="primary" @click="ok">确 定</el-button>
        </div>
      </el-dialog>

    </div>
</template>

<script>
    export default {
        name: "admin_gequ",
        data(){
            return {
              tableData: [],
              total:0,
              pageSize: 5,
              pageNum: 1,
              dialogVisible:false,
              form:{
                text:""
              },
              obj:{},
              title:""

            }
        },
        mounted(){
          this.page_ajax()
        },
      methods:{
          ok(){
            this.ajax({
              url: '/leaveMsg/communication',
              data:{
                parentId:this.obj.id,
                wordAuthorId:sessionStorage.getItem("userNo"),
                wordMasterId:this.obj.wordAuthorId,
                msgContent:this.form.text,
                cityCode:this.obj.cityCode,
                areaCode:this.obj.areaCode
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
                  message: "回复成功！",
                  type: 'success'
                });

                this.page_ajax()
                this.dialogVisible = false

              }else {
                this.$message({
                  message: res.respMsg,
                  type: 'warning'
                });
              }
            }).catch(err=>{

            })
          },
        replayBtn(obj){
            this.obj = obj
            this.title = "回复：" + obj.wordAuthorName
            this.dialogVisible = true
        },
        cur(value){
          this.pageNum = value
          this.page_ajax()
        },
        page_ajax(){
          this.ajax({
            url: '/leaveMsg/getAdminMsg',
            data:{
              pageSize:this.pageSize,
              pageNum:this.pageNum,
            },
            headers:{
              "userNo": sessionStorage.getItem("userNo")
            },
            // params:{},
            //get请求把data变成params
            method: 'post',
          }).then(res=>{
            if(res.respCode == 0){
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

              res.data.data.forEach(item=>{
                let i = text.find(item1=>{
                  return item1.id == item.cityCode
                })
                item.city = i.name
              })
              this.tableData = res.data.data
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

      }
    }
</script>

<style scoped>

</style>
