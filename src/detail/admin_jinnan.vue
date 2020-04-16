<template>
    <div style="padding: 20px;">
      <el-button type="success" style="float: right" @click="btn(0,3)">添加</el-button>
<!--      <el-input @input="input" v-model="val"></el-input>-->
      <el-table
        :data="tableData"
        style="width: 100%">
        <el-table-column
          prop="baseName"
          label="标题"
          width="180">
        </el-table-column>
        <el-table-column
          prop=""
          label="图片"
          width="180">
          <template slot-scope="scope">
            <img :src="scope.row.basePriUrl" style="width: 100px;" alt="">
          </template>
        </el-table-column>
        <el-table-column
          prop="baseIntroduction"
          label="详情">
        </el-table-column>
        <el-table-column
          prop="baseLocation"
          label="地址">
        </el-table-column>
        <el-table-column
          prop="telNo"
          label="联系方式">
        </el-table-column>
        <el-table-column
          prop="openTime"
          label="营业时间">
        </el-table-column>
        <el-table-column
          prop="publicTransportation"
          label="路线">
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          width="180">
          <template slot-scope="scope">
            <el-button @click="btn(scope.row.id,1)" type="primary" size="small">查看</el-button>
            <el-button @click="btn(scope.row.id,2)" type="warning" size="small">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div style="display: flex;align-items: center;justify-content: center">
        <el-pagination
          layout="prev, pager, next"
          :page-size="pageSize"
          :total="total"
          @current-change="cur"
          v-if="total">
        </el-pagination>
      </div>

      <el-dialog :title="title" :visible.sync="dialogFormVisible">
        <el-form :model="form">
          <el-form-item label="标题" label-width="80px">
            <el-input :disabled="disabled" v-model="form.baseName" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="图片" label-width="80px">
            <el-upload
              :auto-upload="false"
              action=""
              class="avatar-uploader"
              :show-file-list="false"
              :on-change="update">
              <img v-if="form.basePriUrl" :src="form.basePriUrl" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          <el-form-item label="详情" label-width="80px">
            <el-input :disabled="disabled" rows="10" type="textarea" placeholder="" v-model="form.baseIntroduction"></el-input>
          </el-form-item>
          <el-form-item label="地址" label-width="80px">
            <el-input :disabled="disabled" v-model="form.baseLocation" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="联系方式" label-width="80px">
            <el-input :disabled="disabled" v-model="form.telNo" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="营业时间" label-width="80px">
            <el-input :disabled="disabled" v-model="form.openTime" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="路线" label-width="80px">
            <el-input :disabled="disabled" v-model="form.publicTransportation" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
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
          val:"",
          saveTableData:[],
          tableData: [],
          total:0,
          pageSize: 2,
          page:1,
          form:{
            baseName:"",
            basePriUrl:"",
            baseIntroduction:"",
            baseLocation:"",
            telNo:"",
            openTime:"",
            publicTransportation:""
          },
          dialogFormVisible:false,
          title:"",
          disabled:true,
        }
      },
      mounted(){
        this.page_ajax()
      },

      methods:{
        input(val){
          this.saveTableData = JSON.parse(JSON.stringify(this.tableData))
          let l = this.tableData.filter(item=>{
            return item.baseName.includes(val)
          })
          this.tableData = l
        },
        cur(page){
          this.page = page
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
            return item.name == "津南区"
          })
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
              this.tableData = res.data.data
              this.tableData.forEach(item=>{
                item.baseIntroduction = item.baseIntroduction.substr(0,20)+"..."
              })
              this.total = Number(res.data.total)
            }else {
              this.$message({
                message: res.respMsg,
                type: 'warning'
              });
            }
          }).catch(err=>{

          })
        },
        btn(id,type){
          this.dialogFormVisible = true

          if(type == 1){
            this.title = "查看"
            this.disabled = true
          }else if(type == 2){
            this.title = "编辑"
            this.disabled = false
          } else if(type == 3){
            this.title = "添加"
            this.disabled = false
            this.form = {
              baseName:"",
                basePriUrl:"",
                baseIntroduction:"",
                baseLocation:"",
                telNo:"",
                openTime:"",
                publicTransportation:""
            }

          }
          if(type != 3 ){
            this.ajax({
              url: '/base/details',
              // data:{
              //   id:this.$route.query.id
              // },
              headers:{
                "userNo": sessionStorage.getItem("userNo")
              },
              params:{baseId:id},
              //get请求把data变成params
              method: 'get',
            }).then(res=>{
              if(res.respCode == 0){
                this.form = res.data
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
        update(file){
          let fd =  new FormData()
          fd.append("file",file.raw)
          this.ajax({
            url: '/base/upload',
            data:fd,
            headers:{
              "userNo": sessionStorage.getItem("userNo")
            },
            // params:{baseId:this.$route.query.id},
            //get请求把data变成params
            method: 'post',
          }).then(res=>{
            if(res.respCode == 0){
              this.form.basePriUrl = res.data.URL
            }else {
              this.$message({
                message: res.respMsg,
                type: 'warning'
              });
            }
          }).catch(err=>{

          })
        },
        ok(){
          if(this.title == "编辑"){
            this.ajax({
              url: '/base/modifyBase',
              data:this.form,
              headers:{
                "userNo": sessionStorage.getItem("userNo")
              },
              // params:{baseId:this.$route.query.id},
              //get请求把data变成params
              method: 'post',
            }).then(res=>{
              if(res.respCode == 0){
                this.$message({
                  message: '编辑成功',
                  type: 'success'
                });
                this.dialogFormVisible = false
              }else {
                this.$message({
                  message: res.respMsg,
                  type: 'warning'
                });
              }
            }).catch(err=>{

            })
          }else if(this.title == "查看"){
            this.dialogFormVisible = false
          }else if(this.title == "添加"){
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
              return item.name == "津南区"
            })
             this.ajax({
              url: '/base/insert',
              data:{
                parentId:item.id,
                ...this.form
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
                  message: '添加成功',
                  type: 'success'
                });
                this.dialogFormVisible = false
                this.page = 1
                this.page_ajax()
                this.form ={
                    baseName:"",
                    basePriUrl:"",
                    baseIntroduction:"",
                    baseLocation:"",
                    telNo:"",
                    openTime:"",
                    publicTransportation:""
                }
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
    }
</script>

<style>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }

</style>
