<template>
    <div class="bg">
      <div class="box">
          <div style="width: 100%;text-align: center;">用户登录</div>
          <el-form
            :model="user" :rules="rules" ref="ruleForm"
            label-width="100px"
            >
            <el-form-item label="用户名：" prop="userName">
              <el-input type="text" placeholder="请输入用户名" v-model="user.userName"></el-input>
            </el-form-item>
            <el-form-item label="密码：" prop="password">
              <el-input type="password" placeholder="请输入密码" v-model="user.password"></el-input>
            </el-form-item>

<!--            <el-form-item label="验证码：" required>-->
<!--              <el-col :span="11">-->
<!--                <el-form-item prop="code">-->
<!--                  <el-input type="" placeholder="请输入验证码" v-model="user.code"></el-input>-->
<!--                </el-form-item>-->
<!--              </el-col>-->
<!--              <el-col :span="11" :offset="2">-->
<!--                <el-form-item prop="">-->
<!--                  <img src="../assets/bg.jpg" alt="" style="width: 100%;">-->
<!--                </el-form-item>-->
<!--              </el-col>-->
<!--            </el-form-item>-->
          </el-form>
          <div style="width: 100%;text-align: center;">
            <el-button style="width: 80%;" type="primary" @click="submitForm('ruleForm')">点击登录</el-button>
          </div>
          <div class="regist" @click="$router.push({path:'/regist'})">还没有账号,点我注册吧</div>
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
              code:""
            },
            rules: {
              userName: [
                { required: true, message: '请输入用户名', trigger: 'change' },
              ],
              password: [
                { required: true, message: '请输入密码', trigger: 'change' },
                // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }

              ],
              code: [
                { required: true, message: '请输入验证码', trigger: 'change' }
              ],
            }
          }
        },
        methods:{
          submitForm(formName) {
            this.$refs[formName].validate((valid) => {
              if (valid) {
                this.ajax({
                  url: '/admin/login',
                  data:this.user,
                  // params:{email:this.user.email},
                  //get请求把data变成params
                  method: 'post',
                }).then(res=>{
                  console.log(res)
                  if(res.respCode == 0){
                    this.$message({
                      message: '登录成功',
                      type: 'success'
                    });
                    sessionStorage.setItem("userNo",res.data.userNo)
                    if(this.user.userName == "adminCenter"){
                      this.$router.push({path:"/home/admin_fankui"})

                    }else{
                      this.$router.push({path:"/index"})

                    }
                  }else {
                    this.$message({
                      message: res.respMsg,
                      type: 'warning'
                    });
                  }
                }).catch(err=>{

                })

              } else {
                console.log('error submit!!');
                return false;
              }
            });
          },

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
    height: 45vh;
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
