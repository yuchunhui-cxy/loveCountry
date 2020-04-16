<template>
    <div class="bg">
      <div class="box">
          <div style="width: 100%;text-align: center;">用户注册</div>
          <el-form
            label-width="70px">
            <el-form-item label="用户名：" prop="">
              <el-input type="text" @change="check_chongfu" placeholder="请输入用户名" v-model="user.userName"></el-input>
            </el-form-item>
            <el-form-item label="密码：" prop="">
              <el-input type="password" placeholder="请输入密码" v-model="user.password"></el-input>
            </el-form-item>
            <el-form-item label="邮箱：" prop="">
              <el-input type="password" placeholder="请输入邮箱" v-model="user.email"></el-input>
            </el-form-item>
            <el-form-item label="验证码：" prop="">
              <el-col :span="11">
                <el-form-item prop="">
                  <el-input type="" placeholder="请输入验证码" v-model="user.privateCode"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="11" :offset="2">
                <el-form-item prop="">
                  <el-button @click="getCode">获取验证码</el-button>
                </el-form-item>
              </el-col>
            </el-form-item>
          </el-form>
          <div style="width: 100%;text-align: center;">
            <el-button style="width: 80%;" type="primary" @click="btn_login">注册</el-button>
          </div>
      </div>
    </div>
</template>

<script>
    export default {
        name: "login",
        data(){
          return {
            user:{
              userName:"",
              password:"",
              email:"",
              privateCode:""
            }
          }
        },
        methods:{
          getCode(){
            let me = this

            this.ajax({
              //	代理拿到外面的方式
              // baseURL: window.configUrl[process.env.NODE_ENV].TEST_URL,
              // baseURL: process.env.TEXT_URL,
              url: '/admin/sendValidCode',
              // data:this.user,
              params:{email:me.user.email},
              //get请求把data变成params
              method: 'get',
            }).then(res=>{
              console.log(res)
              if(res.respCode == 0){
                this.$message({
                  message: '发送邮件成功',
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
          },
          btn_login(){
            let me = this

              this.ajax({
                //	代理拿到外面的方式
                // baseURL: window.configUrl[process.env.NODE_ENV].TEST_URL,
                // baseURL: process.env.TEXT_URL,
                url: '/admin/register',
                data:me.user,
                // params:{userName:me.user.name},
                //get请求把data变成params
                method: 'post',
              }).then(res=>{
                if(res.respCode == 0){
                  this.$message({
                    message: '注册成功',
                    type: 'success'
                  });
                  this.$router.push({path:"/"})

                }else {
                  this.$message({
                    message: res.respMsg,
                    type: 'warning'
                  });
                }


              }).catch(err=>{

              })

          },
          check_chongfu(){
            let me = this
            this.ajax({
              //	代理拿到外面的方式
              // baseURL: window.configUrl[process.env.NODE_ENV].TEST_URL,
              // baseURL: process.env.TEXT_URL,
              url: '/admin/checkAccount',
              // data:{name:" 我是前端"},
              params:{userName:me.user.userName},
              //get请求把data变成params
              method: 'get',
            }).then(res=>{
              console.log(res)

              if(res.respCode == 1){
                this.$message.error(res.respMSg);
              }
            }).catch(err=>{

            })
          }
        }
    }
</script>

<style scoped>
  .bg{
    width: 100%;
    height: 100%;
    background: url("../assets/bg.jpg");
    background-size: 100% 100%;
    background-repeat: no-repeat;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .box{
    padding: 10px;
    width: 25vw;
    height: 50vh;
    background: #fff;
    border-radius: 10px;
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
  }
  .regist{
    width: 100%;
    text-align: right;
    margin-right: 50px;
    font-size: 12px;
    color: cornflowerblue;
    cursor: pointer;
  }
</style>
