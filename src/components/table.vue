<template>
  <section>
    <el-row>
     <el-col :span="24">
       <!--表单-->
       <el-form :inline="true" :model="formInline" class="demo-form-inline">
         <el-form-item label="姓名">
          <el-input v-model="formInline.user.name" placeholder="姓名" style="width: 140px;"></el-input>
          </el-form-item>
          <el-form-item label="年份">
              <el-date-picker
              v-model="formInline.user.date"
              align="right"
              type="year"
              placeholder="选择年份">
              </el-date-picker>
          </el-form-item>        
          <!--<el-form-item label="地址">
             expand-trigger 级联选择器,次级菜单的展开方式
            <el-cascader expand-trigger="hover" :options="options" v-model="formInline.user.address"></el-cascader>
          </el-form-item>-->
          <!--<el-form-item label="籍贯">
            <el-select v-model="formInline.user.place" placeholder="请选择">
             <el-option v-for="item in address" 
             :key="item.value" :label="item.label" :value="item.value">
            </el-option>
            </el-select>
          </el-form-item>-->
          <el-button  type="primary" @click="onSubmit">查询</el-button>
          <a href="javascript:;" id="download" style="background-color:#409EFF;color: #fff;padding: 12px 10px!important;margin-left: 10px!important;border-radius:4px "
          @click="download()" download="download.csv">导出数据</a>
       </el-form>
       <!--表格-->
       <el-table :data="tableData" border  style="width:100%">
         <el-table-column
         prop="date"
         label="出生日期"
         width="180">        
         </el-table-column>
         <el-table-column
          prop="name"
          label="姓名"
          width="180">
         </el-table-column>
         <el-table-column
          prop="address"
          label="地址">
         </el-table-column>
         <el-table-column label="操作">
               <template  slot-scope="scope">
                 <el-button type="primary" size="small" @click="handleEdit(scope.$index,
                 scope.row)">编辑</el-button>
                 <el-button type="danger" size="small"
                 @click="handleDelete(scope.$index, scope.row)">删除</el-button>
               </template>
         </el-table-column>
       </el-table>
       <div class="block">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-size="100"        
            layout="prev, pager, next, jumper"
            :total="1000">
            <!--显示上下页 pager页，和跳页面-->
          </el-pagination>
        </div>
     </el-col>
    </el-row>
    <el-dialog title="修改个人信息" :visible="dialogFormVisible" size="tiny">
      <el-form ref="form" :model="form" label-width="80px">
         <el-form-item label="姓名">
            <el-input v-model="form.name"></el-input>
         </el-form-item>
        <el-form-item label="地址">
          <el-input v-model="form.address"></el-input>
        </el-form-item>
        <el-form-item label ="出生日期">
           <el-date-picker
             v-model="form.date"
             align="left"
             type="date"
             style="width: 100%;"
             value-format="yyyy-MM-dd"
             placeholder="选择日期"
             format="yyyy 年 MM 月 dd 日">
           </el-date-picker>      
        </el-form-item>
         <el-form-item>
          <el-button type="primary" @click="handleSave" :loading="editLoading">修改</el-button>
          <el-button @click="dialogFormVisible = false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </section>
</template>
<script>
import { arr } from "./table.js";
export default {
  data() {
    return {
      formInline: {
        user: {
          name: "",
          date: "",
          address: [],
          place: ""
        }
      },
      form: {
        name: "",
        address: "",
        date: null
      },
      tableData: [...arr],
      dialogFormVisible: false,
      editLoading: false,
      currentPage: 1
    };
  },

  methods: {
    handleSizeChange(size) {
      this.$notify({
        message: size
      });
    },
    handleCurrentChange(page) {
      this.$notify({
        message: page
      });
    },
    handleEdit(index, row) {
      this.dialogFormVisible = true;
      this.form = Object.assign({}, row);
      this.table_index = index;
    },
    handleDelete(index, row) {
      this.tableData.splice(index, 1);
      this.$message({
        message: "操作成功！",
        type: "success"
      });
    },
    handleSave() {
      this.$confirm("确认提交吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        cancelButtonClass: "cancel"
      })
        .then(() => {
          this.editLoading = true;
          let date = this.form.date;
          if (typeof date === "object") {
            date = [
              date.getFullYear(),
              date.getMonth() + 1,
              date.getDate()
            ].join("-");
          }
          this.form.date = date;
          this.tableData.splice(this.table_index, 1, this.form);
          this.$message({
            message: "操作成功",
            type: "sucess"
          });
          this.editLoading = false;
          this.dialogFormVisible = false;
        })
        .catch(() => {});
    },
    onSubmit() {
      this.$message("模拟数据，这个方法并不管用哦~");
    }
  }
};
</script>
<style>
</style>

