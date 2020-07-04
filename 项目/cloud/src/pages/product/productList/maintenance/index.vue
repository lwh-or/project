<template>
  <ui-container>
    <div slot="header">
      <el-breadcrumb separator-class="el-icon-arrow-right" separator=">">
        <el-breadcrumb-item :to="{ path: '/' }">商品管理</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/product/productList' }">商品列表</el-breadcrumb-item>
        <el-breadcrumb-item>修改商品</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div slot="search" >
      <el-steps :active="stepsActive" finish-status="success" align-center>
        <el-step title="选择商品分类"></el-step>
        <el-step title="填写商品信息"></el-step>
        <el-step title="填写商品属性"></el-step>
      </el-steps>
      <div class="c_first" v-if="stepsActive == 0">
        <el-form class="lianshang-form c_form" :rules="firstRules" ref="firstRuleForm" :model="firstRuleForm">
          <!-- <el-form-item label="您最近使用的商品分类：" label-width="180px">
            <el-select v-model="value" placeholder="请选择" size="mini">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item> -->
          <el-form-item label="请选择商品分类" label-width="180px" prop="classifyId">
            <el-cascader :props="props" size="mini" v-model="firstRuleForm.classifyId" placeholder="请选择商品分类" ref="myCascader"
            @active-item-change="onProvincesChange" :options="options1" @change="handleValueName"></el-cascader>
          </el-form-item>
          <el-button type="primary" class="c_btn" size="mini" @click="handleNext('firstRuleForm')">下一步，填写商品信息</el-button>
        </el-form>
      </div>
      <div class='c_second' v-else-if="stepsActive == 1">
        <el-form class="lianshang-form c_form" label-width="120px" :model="ruleForm" :rules="rules" ref="ruleForm">
          <div class="c_title"><i></i>基本信息</div>
          <el-form-item label="商品分类：" label-width="120px">
            <span>{{firstRuleForm.classifyName}}</span>
            <el-button type="text" size="small" @click="handleBack" icon="el-icon-edit">编辑</el-button>
          </el-form-item>
          <el-form-item label="商品名称：" prop="shopName">
            <el-input v-model="ruleForm.shopName" size="mini"></el-input>
          </el-form-item>
          <el-form-item label="商品品牌：" prop="commodityBrandName">
            <el-select v-model="ruleForm.commodityBrandName" placeholder="请选择商品品牌" size="mini">
              <el-option
                v-for="item in commodityBrandList"
                :key="item.brandNo"
                :label="item.brandName"
                :value="item.brandNo">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="商品介绍：" prop="shopDesc" class="c_text">
            <el-input type="textarea" v-model="ruleForm.shopDesc" :rows="6" maxlength="200" show-word-limit></el-input>
          </el-form-item>
          <el-form-item label="运费模板：" prop="runTemplate">
            <el-input v-model="ruleForm.runTemplate" size="mini"></el-input>
            <!-- <el-select v-model="ruleForm.runTemplate" placeholder="请选择模板" size="mini">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select> -->
          </el-form-item>
          <el-form-item label="商品货号：" prop="productCode">
            <el-input v-model="ruleForm.productCode" size="mini"></el-input>
            <div class="c_tip">如果您不输入商品货号，系统将自动生成一个唯一的货号。</div>
          </el-form-item>
          <el-form-item label="可代理等级：" prop="agentLevel">
            <el-checkbox-group v-model="ruleForm.agentLevel">
              <el-checkbox :label="1">LV1</el-checkbox>
              <el-checkbox :label="2">LV2</el-checkbox>
              <el-checkbox :label="4">LV3</el-checkbox>
              <el-checkbox :label="8">LV4</el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <div class="c_title"><i></i>库存规格</div>
          <el-form-item label="计量单位：" prop="weightCompany">
            <el-select v-model="ruleForm.weightCompany" placeholder="请选择单位" size="mini">
              <el-option
                v-for="item in weightCompanyList"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="商品重量：" class="c_form_item" prop="shopWeight">
            <el-input v-model="ruleForm.shopWeight" size="mini" type="number" step="0.01"></el-input>
            <el-input size="mini" readonly :value="ruleForm.weightCompany | weightCompanyFilter" class="c_input_mini"></el-input>
          </el-form-item>
          <div class="c_title"><i></i>参数设置</div>
          <el-form-item label="参数组：" class="c_form_item">
            <el-table
              :data="paramData"
              border
              size="mini">
              <el-table-column
                prop="groupName"
                label="参数组"
                width="120">
              </el-table-column>
              <el-table-column
                prop="paramName"
                label="参数类型"
                width="120">
              </el-table-column>
              <el-table-column
                prop="useType,value,vals"
                label="录入参数">
                <template slot-scope="scope">
                  <el-select v-model="scope.row.value" placeholder="请选择" v-if="scope.row.useType === 1" size="mini" clearable>
                    <el-option
                      v-for="item in scope.row.vals? scope.row.vals.split(',') : []"
                      :key="item"
                      :label="item"
                      :value="item">
                    </el-option>
                  </el-select>
                  <el-select v-model="scope.row.value" placeholder="请选择" v-else-if="scope.row.useType === 2" size="mini" multiple clearable collapse-tags>
                    <el-option
                      v-for="item in scope.row.vals? scope.row.vals.split(',') : []"
                      :key="item"
                      :label="item"
                      :value="item">
                    </el-option>
                  </el-select>
                  <el-input size="mini" placeholder="请输入" v-model="scope.row.value" v-else></el-input>
                </template>
              </el-table-column>
            </el-table>
          </el-form-item>
          <div class="c_title"><i></i>其他信息</div>
          <el-form-item label="赠送积分：">
            <el-input v-model.number="ruleForm.bonusPoints" size="mini" onkeyup="this.value=this.value.replace(/[^\d.]/g,'');"></el-input>
            <div class="c_tip">购买该商品时赠送消费积分数</div>
          </el-form-item>
          <el-form-item label="积分购买金额：">
            <el-input v-model="ruleForm.purchaseAmount" size="mini" onkeyup="this.value=this.value.replace(/[^\d.]/g,'');"></el-input>
            <div class="c_tip"> (此处需填写金额)购买该商品时最多可以使用积分的金额</div>
          </el-form-item>
          <el-form-item label="商品上架：">
            <el-switch
              v-model="ruleForm.goodsMarket"
              active-color="#409EFF"
              inactive-color="#dcdfe6">
            </el-switch>
          </el-form-item>
          <el-form-item label="服务保证：">
            <el-checkbox-group v-model="ruleForm.serviceAssurance">
              <el-checkbox :label="1">无忧退货</el-checkbox>
              <el-checkbox :label="2">免费包邮 </el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item label="详细页标题：" prop="detailTitle">
            <el-input v-model="ruleForm.detailTitle" size="mini"></el-input>
          </el-form-item>
          <el-form-item label="详细页描述：" class="c_text">
            <el-input type="textarea" v-model="ruleForm.detailDesc" :rows="3" maxlength="50" show-word-limit></el-input>
          </el-form-item>
          <el-form-item label="商品关键词：" prop="shopKeyWord">
            <el-input v-model="ruleForm.shopKeyWord" size="mini"></el-input>
            <div class="c_tip">商品关键词请用中文“逗号”分隔；有两个功能，一是可以作为站内关键词查询，在前台搜索框输入关键词后，能够搜索到该商品；二是作为搜索引擎收录使用.</div>
          </el-form-item>
          <el-form-item label="商品备注：" class="c_text">
            <el-input type="textarea" v-model="ruleForm.productNotes" :rows="6" maxlength="200" show-word-limit></el-input>
          </el-form-item>
          <div class="c_title"><i></i>商品图册</div>
          <div class="c_item c_image_list">
            <template v-if="fileList.length>0">
              <div class="c_list"  v-for="(item, index) of fileList" :key="index">
                <el-image class="c_img"  :src="item.url" fit="scale-down"></el-image>
                <div class="c_bottom">
                  <el-button type="text" @click="handleSet(index)" v-if="index !== 0">设为主图</el-button>
                  <el-button type="text" v-else :class="index === 0 ? 'c_active' : ''">商品主图</el-button>
                  <el-button type="text" @click="handleRemove(index + 1)">删除图片</el-button>
                </div>
              </div>
            </template>
            <!-- <el-upload
              v-if="fileList.length<5"
              ref="upload"
              :action="uploadUrl"
              list-type="picture-card"
              :on-preview="handlePictureCardPreview"
              :on-success="handleSuccess"
              :data="pathType"
              :limit="5"
              multiple
              :auto-upload="false"
              :before-upload="beforeAvatarUpload"
              :on-exceed="handleExceed"
              :show-file-list="false"
              :http-request="uploadFile"
              >
              <i class="el-icon-plus"></i>
            </el-upload> -->
            <el-upload
              v-if="fileList.length<5"
              :show-file-list="false"
              ref="upload"
              :action="uploadUrl"
              list-type="picture-card"
              :limit="5"
              multiple
              :auto-upload="false"
              :on-exceed="handleExceed"
              :http-request="uploadFile"
              :on-change="onChangeUpload"
              >
              <i class="el-icon-plus"></i>
            </el-upload>
          </div>
          <el-form-item>
            <el-button type="primary" class="" size="mini" @click="handleBack" plain>上一步，选择商品分类</el-button>
            <el-button type="primary" class="" size="mini" @click="handleNextSecond('ruleForm')">下一步，填写商品属性</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="c_third" v-else>
        <div class="c_title"><i></i>商品属性</div>
        <div class="c_item">
          <div class="c_specs">
            <div class="c_top">商品规格：</div>
            <el-form class="lianshang-form" :model="ruleForm" :rules="rules" ref="ruleForm">
              <el-form-item :label="nameType1" prop="brandName">
                <el-checkbox-group v-model="ruleForm.sizeList" @change="handleSize">
                  <el-checkbox :label="item.txtVal" v-for="(item, index) of sizeListData" :key="index" :value="item.valNo">
                    <template>
                      {{item.txtVal}}
                      <el-button type="text" v-if="item.type" @click="handleDelte(index)">删除</el-button>
                    </template>
                  </el-checkbox>
                  <!-- <input placeHolder="" v-if="item.automatic === 'Y'" v-model="item.val" class="c_input"/> -->
                  <!-- <el-button  size="mini" v-if="item.automatic === 'Y'" @click="handleAddAttr(item.keyNo, index, item)">增加</el-button> -->
                  <!-- <el-checkbox label="M"></el-checkbox>
                  <el-checkbox label="X">X</el-checkbox>
                  <el-checkbox label="XL">XL</el-checkbox>
                  <el-checkbox label="2XL">2XL</el-checkbox>
                  <el-checkbox label="3XL">3XL</el-checkbox>
                  <el-checkbox label="4XL">4XL</el-checkbox> -->
                </el-checkbox-group>
                <input placeHolder="" v-if="inputType1" v-model="sizeVal" class="c_input"/>
                <el-button  size="mini" v-if="inputType1" @click="handleAddAttr">增加</el-button>
              </el-form-item>
              <el-form-item :label="nameType2" prop="brandName">
                <el-checkbox-group v-model="ruleForm.colorList" @change="handleColor">
                  <el-checkbox :label="item.txtVal" v-for="(item, index) of colorListData" :key="index" :value="item.valNo">
                    <template>
                      {{item.txtVal}}
                      <el-button type="text" v-if="item.type" @click="handleDelteColor(index)">删除</el-button>
                    </template>
                  </el-checkbox>
                  <!-- <el-checkbox label="红色"></el-checkbox>
                  <el-checkbox label="白色"></el-checkbox>
                  <el-checkbox label="粉色"></el-checkbox> -->
                </el-checkbox-group>
                <input placeHolder="" v-if="inputType2" v-model="colorVal" class="c_input"/>
                <el-button  size="mini" v-if="inputType2" @click="handleAddAttrColor">增加</el-button>
                <!-- <el-input v-model="ruleForm.brandName" size="mini" placeHolder=""></el-input>
                <el-button  size="mini">增加</el-button> -->
              </el-form-item>
            </el-form>
          </div>
          <el-table
            :data="demoData"
            border
            size="mini"
            style="width: 100%">
            <el-table-column
              prop="size"
              :label="nameType1"
              width="180">
            </el-table-column>
            <el-table-column
              prop="color"
              :label="nameType2"
              width="180">
            </el-table-column>
            <el-table-column
              prop="guidancePrice"
              label="商城指导价">
              <template slot-scope="scope">
                <el-input v-model="scope.row.guidancePrice" placeHolder="请输入商城指导价" size="mini"></el-input>
              </template>
            </el-table-column>
            <el-table-column
              prop="surprisePrice"
              label="惊喜价">
              <template slot-scope="scope">
                <el-input v-model="scope.row.surprisePrice" placeHolder="请输入惊喜价" size="mini"></el-input>
              </template>
            </el-table-column>
            <el-table-column
              prop="skuNo"
              label="SKU编号">
              <template slot-scope="scope">
                <el-input v-model="scope.row.skuNo" placeHolder="请输入SKU编号" size="mini"></el-input>
              </template>
            </el-table-column>
            <el-table-column
              label="操作"
              width="120">
              <template slot-scope="props">
                <el-button type="text" size="small" @click="handleDel(props.$index)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
          <!-- <div class="c_third_btn">
            <el-button type="primary" size="mini">CSV批量上传</el-button>
            <el-button type="primary" size="mini">刷新列表</el-button>
            <span class="c_tip">含有两页以上请用批量上传功能</span>
          </div> -->
        </div>
        <div class="c_title"><i></i>属性图片</div>
        <div class="c_item">
          <div class="c_specs">
            <el-form class="lianshang-form c_lianshang_form" :inline="true">
              <div class="c_item_list" v-for="(item, index) of demoData" :key="index">
                <el-form-item :label="nameType1" prop="brandName">
                  {{item.size}}
                </el-form-item>
                <el-form-item :label="nameType2" prop="brandName">
                  {{item.color}}
                </el-form-item>
                <el-form-item>
                  <el-upload
                    class="avatar-uploader"
                    :action="uploadUrl"
                    :data="pathType"
                    :limit="1"
                    :show-file-list="true"
                    :before-upload="beforeAvatarUploadAttr"
                    >
                    <el-button type="text">上传图片</el-button>
                  </el-upload>
                </el-form-item>
              </div>
            </el-form>
          </div>
        </div>
        <div class="c_title"><i></i>商品特殊参数</div>
        <div class="c_item">
          <el-table
            :span-method="arraySpanMethodThird"
              :data="specialParams"
              border
              size="mini">
              <el-table-column
                prop="size"
                :label="nameType1"
                width="120">
              </el-table-column>
              <el-table-column
                prop="color"
                :label="nameType2"
                width="120">
              </el-table-column>
              <el-table-column
                prop="sku"
                label="SKU">
              </el-table-column>
               <el-table-column
                prop="params"
                label="通用参数">
              </el-table-column>
              <el-table-column
                prop="value"
                label="参数值">
              </el-table-column>
              <el-table-column
                prop="specialValue,specialStatus"
                label="特殊参数">
                <template slot-scope="scope">
                  <el-input size="mini" v-model="scope.row.specialValue" v-if="scope.row.specialStatus === 2"></el-input>
                </template>
              </el-table-column>
            </el-table>
        </div>
        <div class="c_title"><i></i>商品供应成本价格</div>
        <div class="c_item">
          <el-table
              :data="costList"
              border
              size="mini">
              <el-table-column
                prop="size"
                :label="nameType1"
                width="120">
              </el-table-column>
              <el-table-column
                prop="color"
                :label="nameType2"
                width="120">
              </el-table-column>
              <el-table-column
                prop="sku"
                label="SKU">
              </el-table-column>
              <el-table-column
                prop="supplier"
                label="所属供应商">
              </el-table-column>
              <el-table-column
                prop="inventory"
                label="库存">
                <template slot-scope="scope">
                  <el-input size="mini" v-model="scope.row.inventory"></el-input>
                </template>
              </el-table-column>
              <el-table-column
                prop="price"
                label="成本价格(元)">
                <template slot-scope="scope">
                  <el-input size="mini" v-model="scope.row.price"></el-input>
                </template>
              </el-table-column>
              <el-table-column
                prop="status"
                label="默认供应商">
                <template slot-scope="scope">
                  <el-switch
                    v-model="scope.row.status"
                    active-color="#409eff"
                    inactive-color="#e4e4e4" @change="handleSwitch(scope.row)">
                  </el-switch>
                </template>
              </el-table-column>
              <el-table-column
                fixed="right"
                label="操作"
                width="120"
                prop="initStatus">
                <template slot-scope="scope">
                  <el-button
                  v-if="scope.row.initStatus"
                    @click.native.prevent="addSupplier(scope.$index, scope)"
                    type="text"
                    size="small">
                    添加供应商
                  </el-button>
                </template>
              </el-table-column>
            </el-table>
        </div>
        <div class="c_title"><i></i>商家进货价格</div>
        <div class="c_item">
          <el-table
            :span-method="arraySpanMethodFour"
              :data="stockPriceList"
              border
              size="mini">
              <el-table-column
                prop="size"
                :label="nameType1"
                width="120">
              </el-table-column>
              <el-table-column
                prop="color"
                :label="nameType2"
                width="120">
              </el-table-column>
              <el-table-column
                prop="sku"
                label="SKU">
              </el-table-column>
               <el-table-column
                prop="level"
                label="商家等级">
              </el-table-column>
              <el-table-column
                prop="price"
                label="进货价格(元)">
                <template slot-scope="scope">
                  <el-input size="mini" v-model="scope.row.price"></el-input>
                </template>
              </el-table-column>
            </el-table>
        </div>
        <div class="c_title"><i></i>商品详情</div>
        <div class="c_item">
          <el-radio-group v-model="shopDetailType" size="mini" @change="changeShopDetailType">
            <el-radio-button :label="1">电脑端详情</el-radio-button>
            <el-radio-button :label="2">移动端详情</el-radio-button>
          </el-radio-group>
          <a class="c_phone_tip" href="javascript:;" @click="handlePhoneDesc">移动端上传说明</a>
          <quill-editor v-model="docContent"
            ref="myQuillEditor"
            @change="handleEditorBlur($event)">
          </quill-editor>
        </div>
        <div class="c_btn_bottom">
          <el-button type="primary" size="mini" @click="handleBackThird" plain>上一步，选择商品信息</el-button>
          <el-button type="primary" size="mini" @click="handleNextThird">提交</el-button>
        </div>
      </div>
      <el-dialog title="移动端上传说明" :visible.sync="PhoneDescStatus" @close="PhoneDescStatus = false" class="c_tip_dialog">
        <h3 class="c_tip_title">一、基本要求</h3>
        <div class="c_tip_contnent">1、手机详情总体大小：图片+文字，图片不超过20张，文字不超过5000字；<br />
              建议：所有图片都是本宝贝相关的图片。
        </div>
        <h3 class="c_tip_title">二、图片大小</h3>
        <div class="c_tip_contnent">1、建议使用宽度480 ~ 620像素、高度小于等于960像素的图片；<br />2、格式为：JPG\JEPG\GIF\PNG； 举例：可以上传一张宽度为480，高度为960像素，格式为JPG的图片。</div>
        <h3 class="c_tip_title">三、文字要求</h3>
        <div class="c_tip_contnent">1、每次插入文字不能超过500个字，标点、特殊字符按照一个字计算；<br />2、请手动输入文字，不要复制粘贴网页上的文字，防止出现乱码；<br />3、以下特殊字符“&lt;”、“&gt;”、“"”、“'”、“\”会被替换为空。<br />建议：不要添加太多的文字，这样看起来更清晰。
        </div>
      </el-dialog>
      <el-dialog title="选择供应商" :visible.sync="supplierStatus" @close="supplierStatus = false">
      <div class="c_out_top">
        <el-input size="mini" placeHolder="按照供应商ID或者供应商名称搜索" v-model="outSupplierName"></el-input>
        <el-button size="mini" class="c_search" type="primary" @click="handleSearch">搜索</el-button>
      </div>
      <div class="c_out_second"></div>
      <el-table :data="gridData" @selection-change="handleSelectionChange" border>
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column property="bankNumber" label="供应商ID" show-overflow-tooltip></el-table-column>
        <el-table-column property="supplierName" label="供应商名称" width="200"></el-table-column>
        <el-table-column property="supplierLevel" label="供应商等级">
          <template slot-scope="scope">
            {{scope.row.supplierLevel | supplierLevelFilter}}
          </template>
        </el-table-column>
      </el-table>
      <div slot="footer" class="dialog-footer">
        <el-button @click="supplierStatus = false" size="mini">取 消</el-button>
        <el-button type="primary" @click="handleEnter" size="mini">确 定</el-button>
      </div>
    </el-dialog>
    </div>
  </ui-container>
</template>

<script>
import VueQuillEditor from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import Vue from 'vue'
Vue.use(VueQuillEditor)
var validKeyWord = (rule, value, callback) => {
  let val = value.split('，')
  if (val.length > 5) {
    callback(new Error('商品关键词最多只能5个'))
  } else {
    callback()
  }
}
const toolbarOptions = [
  ['bold', 'italic', 'underline', 'strike'],
  ['blockquote', 'code-block'],

  [{'header': 1}, {'header': 2}],
  [{'list': 'ordered'}, {'list': 'bullet'}],
  [{'script': 'sub'}, {'script': 'super'}],
  [{'indent': '-1'}, {'indent': '+1'}],

  [{'size': ['small', false, 'large', 'huge']}],
  [{'header': [1, 2, 3, 4, 5, 6, false]}],

  [{'color': []}, {'background': []}],
  [{'font': []}],
  [{'align': []}],
  ['image'],
  ['clean']
]
export default {
  name: 'productListAddition',
  data () {
    return {
      fileListData: [], // 上传图片集合
      PhoneDescStatus: false, // 手机端说明弹框
      editorOption: {
        placeholder: '',
        modules: {
          toolbar: {
            container: toolbarOptions,
            handlers: {
              // 'image': function (value) {
              //   if (value) {
              //     document.querySelector('.c_uploader input').click()
              //   } else {
              //     this.quill.format('image', false)
              //   }
              // }
            }
          }
        }
      }, // 富文本配置
      shopDetailType: 1, // 商品详情的状态
      shopDetailTypePcData: '', // 商品详情电脑的内容
      shopDetailTypePhoneData: '', // 商品详情手机端的内容
      docContent: '',
      outSupplierList: [], // 弹框选择供应商
      outSupplierName: '',
      gridData: [],
      tags: [], //
      supplierStatus: false, // 选择供应商弹框
      uploadUrl: '/api/shopcrm/file/upload',
      pathType: {
        channel: 'ALIYUN',
        uploadKey: 'oss_product'
      },
      figureIndex: 0,
      dialogImageUrl: '',
      dialogVisible: false,
      stepsActive: 0,
      value: '',
      value1: '',
      options: [],
      listdatas: [],
      ruleForm: {
        checkList: [],
        shopName: '', // 商品名称
        commodityBrandName: '', // 商品品牌
        shopDesc: '', // 商品介绍
        runTemplate: '', // 运行模板
        productCode: 'SP' + this.randomNumber(5), // 商品货号
        agentLevel: [], // 代理等级
        // Unit: '', // 计量单位
        shopWeight: '', // 商品重量
        weightCompany: '', // 计量单位
        bonusPoints: '', // 赠送积分
        purchaseAmount: '', // 积分购买金额
        goodsMarket: false, // 商品上架
        serviceAssurance: [1], // 服务保证
        detailTitle: '', // 详细页标题
        detailDesc: '', // 详细页描述
        shopKeyWord: '', // 商品关键词
        productNotes: '', // 商品备注
        sizeList: [],
        colorList: [],
        year: '', // 上市年份
        adv: '', // 主材含量
        object: '' // 适用对象
      },
      agentLevelList: [
        {value: 1, label: 'LV1'},
        {value: 2, label: 'LV2'},
        {value: 4, label: 'LV3'},
        {value: 8, label: 'LV4'}
      ], // 可代理等级
      UnitList: [], // 计量单位
      weightCompanyList: [
        {value: 1, label: '克'},
        {value: 2, label: '千克'}
      ],
      objectList: [
        {value: 1, label: '青年'},
        {value: 2, label: '少年'},
        {value: 3, label: '老年'}
      ],
      paramData: [], // 规格参数
      rules: {
        shopName: [
          { required: true, message: '请输入商品名称', trigger: 'blur' },
          { min: 1, max: 30, message: '商品名称不能超过30个字', trigger: 'blur' }
        ],
        commodityBrandName: [
          { required: true, message: '请选择商品品牌', trigger: 'change' }
        ],
        shopDesc: [
          { required: true, message: '请输入商品介绍', trigger: 'blur' }
        ],
        runTemplate: [
          { required: true, message: '请选择运行模板', trigger: 'change' }
        ],
        productCode: [
          { required: true, message: '请输入商品货号', trigger: 'blur' }
        ],
        agentLevel: [
          { required: true, message: '请选择代理等级', trigger: 'change' }
        ],
        detailTitle: [
          { message: '请输入详细页标题', trigger: 'blur' },
          { min: 1, max: 20, message: '详细页标题不能超过20个字', trigger: 'blur' }
        ],
        shopKeyWord: [
          { validator: validKeyWord, trigger: 'blur' }
        ],
        weightCompany: [
          { required: true, message: '请选择计量单位', trigger: 'change' }
        ],
        shopWeight: [
          { required: true, message: '请输入商品重量', trigger: 'blur' }
        ]
      },
      demoData: [],
      commodityBrandList: [], // 商品品牌
      firstRuleForm: {
        classifyName: '', // 选择商品分类的分类名称
        classifyId: ''
      },
      firstRules: {
        classifyId: [
          { required: true, message: '请选择商品分类', trigger: 'change' }
        ]
      },
      specialParams: [], // 商品特殊参数
      stockPriceList: [], // 商家进货价格
      fileList: [],
      attrImagesList: [],
      costList: [], // 成本列表数据
      outIndex: '', // 点击添加供应商的索引
      oldParamData: [],
      sizeListData: [],
      colorListData: [],
      attrList: [],
      inputType1: [],
      inputType2: [],
      nameType1: '',
      nameType2: '',
      sizeVal: '',
      colorVal: '',
      props: {
        value: 'id',
        label: 'name',
        children: 'cities'
      },
      options1: [],
      firstAttr: [],
      secodeAttr: [],
      flag: [],
      attachmentNoList: [],
      allDatas: {}
    }
  },
  filters: {
    weightCompanyFilter (val) {
      let arr = {
        1: '克',
        2: '千克'
      }
      return arr[val]
    },
    supplierLevelFilter (val) {
      let arr = {
        1: 'A',
        2: 'B',
        3: 'C',
        4: 'D'
      }
      return arr[val]
    }
  },
  mounted () {
    this.commodityBrand() // 商品品牌
    this.classifyListData() // 分类
    let params = this.$route.query
    this.checkData(params.productNo)
  },
  methods: {
    // 查询商品详情
    async checkData (productNo) {
      const { $api, $message } = this
      try {
        let {spuData} = await $api.product.productDetail({productNo: productNo})
        console.log(spuData)
        this.allDatas = spuData
        // 初始化商品分类
        this.classifyListData([spuData.categoryNo.split('-')[0]]) // 分类
        this.classifyListData([spuData.categoryNo.split('-')[0], spuData.categoryNo.split('-')[0] + '-' + spuData.categoryNo.split('-')[1]])
        this.classifyListData([spuData.categoryNo.split('-')[0], spuData.categoryNo.split('-')[0] + '-' + spuData.categoryNo.split('-')[1], spuData.categoryNo])
        // console.log(this.options1)
        // return
        // this.firstRuleForm.classifyName = this.$refs.myCascader.getCheckedNodes()[0].pathLabels.join(' < ')
        switch (spuData.level) {
          case 3:
            this.ruleForm.agentLevel = [1, 2]
            break
          case 5:
            this.ruleForm.agentLevel = [1, 4]
            break
          case 6:
            this.ruleForm.agentLevel = [2, 4]
            break
          case 9:
            this.ruleForm.agentLevel = [1, 8]
            break
          case 10:
            this.ruleForm.agentLevel = [2, 8]
            break
          case 12:
            this.ruleForm.agentLevel = [4, 8]
            break
          default:
            this.ruleForm.agentLevel = [spuData.level, 0]
        }
        this.firstRuleForm.classifyId = [spuData.categoryNo.split('-')[0], spuData.categoryNo.split('-')[0] + '-' + spuData.categoryNo.split('-')[1], spuData.categoryNo]
        // this.firstRuleForm.classifyName = Array.from(new Set(tempname)).join(' < ')
        // console.log(this.firstRuleForm.classifyId, this.firstRuleForm.classifyName)

        this.ruleForm.shopName = spuData.productTitle
        this.ruleForm.commodityBrandName = spuData.brandNo
        this.ruleForm.shopDesc = spuData.spuAttrData ? spuData.spuAttrData.productInfo : ''
        this.ruleForm.runTemplate = spuData.transportationNo
        this.ruleForm.productCode = spuData.thdNo
        this.ruleForm.weightCompany = spuData.unitNo
        this.ruleForm.shopWeight = spuData.unitVal
        this.ruleForm.bonusPoints = spuData.presentIntegral
        this.ruleForm.purchaseAmount = spuData.integralBuy
        this.ruleForm.goodsMarket = spuData.status
        this.ruleForm.serviceAssurance = [1] // spuData.serviceJson
        this.ruleForm.detailTitle = spuData.productSubTitle
        this.ruleForm.detailDesc = spuData.spuAttrData ? spuData.spuAttrData.productSubInfo : ''
        this.ruleForm.shopKeyWord = spuData.keywords
        this.ruleForm.productNotes = spuData.spuAttrData ? spuData.spuAttrData.memo : ''
        spuData.imageList.map(item => {
          this.fileList.push({url: item.attachmentUrl})
          this.attachmentNoList.push(item.attachmentNo)
        })
        // this.attachmentNoList = this.fileList
        console.log(this.fileList, '................')
        // debugger
        this.paramsSet() // 分类查询参数
        this.attrInit()
        // this.paramData
        // console.log(this.paramData)
        // console.log(JSON.parse(spuData.spuAttrData.specialSpec))
        this.specialSpecData = spuData.spuAttrData ? JSON.parse(spuData.spuAttrData.specialSpec) : ''
        this.ruleForm.sizeList = this.specialSpecData[0].vals.split(',')
        this.ruleForm.colorList = this.specialSpecData[1].vals.split(',')
        this.handleSize(this.ruleForm.sizeList)
        this.handleColor(this.ruleForm.colorList)
        // this.attrInit()
        // console.log(this.demoData)
        // this.specialSpecData.map((item, index) => {
        // this.demoData[index].guidancePrice = item.
        // })
        this.stockPriceListInit = spuData.skuData
        this.shopDetailTypePcData = spuData.spuAttrData.subMemo.split('#@#')[0]
        this.shopDetailTypePhoneData = spuData.spuAttrData.subMemo.split('#@#')[1]
        this.docContent = spuData.spuAttrData.subMemo.split('#@#')[0]
      } catch (error) {
        $message.error(error.replyText)
      } finally {
        this.submitLoad = false
      }
    },
    // onChangeUpload
    onChangeUpload (file, fileList) {
      this.fileList = [...this.fileList, ...fileList]
      console.log(this.fileList, 'this.fileList................')
    },
    // 上传图片
    uploadFile (file) {
      this.fileListData = this.fileList
      // console.log(this.fileListData)
    },
    // 手机端说明弹框
    handlePhoneDesc () {
      this.PhoneDescStatus = true
      console.log(this.PhoneDescStatus)
    },
    // 改变商品详情端事件
    changeShopDetailType (val) {
      this.shopDetailType = val
      if (val === 1) {
        this.docContent = this.shopDetailTypePcData
      } else {
        this.docContent = this.shopDetailTypePhoneData
      }
    },
    handleEditorBlur () {
      if (this.shopDetailType === 1) {
        this.shopDetailTypePcData = this.docContent
      } else {
        this.shopDetailTypePhoneData = this.docContent
      }
      console.log(this.shopDetailTypePcData, this.shopDetailTypePhoneData)
    },
    // 默认供应商
    handleSwitch (val) {
      console.log(val)
      if (val.status) {
        val.supplierPost = 0
      }
      console.log(this.costList)
    },
    // 删除
    handleDelte (index) {
      this.sizeListData.splice(index, 1)
      this.ruleForm.sizeList.splice(index, 1)
      this.handleSize(this.ruleForm.sizeList)
    },
    // 删除
    handleDelteColor (index) {
      this.colorListData.splice(index, 1)
      this.ruleForm.colorList.splice(index, 1)
      this.handleColor(this.ruleForm.colorList)
    },
    // 新增属性
    handleAddAttr () {
      console.log(this.sizeVal)
      console.log(this.sizeListData)
      this.sizeListData.push(
        {txtVal: this.sizeVal, valNo: '', type: 1}
      )
      this.sizeVal = ''
    },
    // 新增属性
    handleAddAttrColor () {
      this.colorListData.push(
        {txtVal: this.colorVal, valNo: '', type: 1}
      )
      this.colorVal = ''
    },
    // 商品属性初始化
    async attrInit () {
      console.log(this.firstRuleForm.classifyId.slice(-1).join(','), 'ppppppppppppppppppppoooooooooooooooo')
      const { $api, $message } = this
      try {
        let {dataList} = await $api.product.productFeatures({categoryNo: this.firstRuleForm.classifyId.slice(-1).join(',')})
        console.log(dataList)
        this.attrList = dataList
        this.sizeListData = dataList[0].vals
        this.colorListData = dataList[1].vals
        this.nameType1 = dataList[0].keyName
        this.nameType2 = dataList[1].keyName
        dataList[0].automatic === 'Y' ? this.inputType1 = true : this.inputType1 = false
        dataList[1].automatic === 'Y' ? this.inputType2 = true : this.inputType2 = false
        // console.log(this.nameType1)
        // this.gridData = dataList
        console.log(this.specialParams, '特殊参数值')
      } catch (error) {
        $message.error(error.replyText)
      } finally {
        this.submitLoad = false
      }
    },
    // 返回第二步
    handleBackThird () {
      this.stepsActive = 1
    },
    // 第三步提交数据
    async handleNextThird () {
      this.paramData.map(items => {
        this.oldParamData.map(item => {
          if (items.groupNo === item.groupNo) {
            item.paramlist.map(ite => {
              ite.value = items.value
            })
          }
        })
      })
      // let oldData = JSON.parse(JSON.stringify(this.oldParamData))
      console.log(this.paramData, '//////')
      // debugger
      let oldDataList = []
      this.paramData.map(item => {
        let arr = {
          groupNo: item.groupNo,
          groupName: item.groupName,
          paramList: [
            {
              paramName: item.paramName,
              paramNo: item.paramNo,
              vals: typeof (item.value) === 'string' ? item.value : item.value.join(',')
            }
          ]
        }
        oldDataList.push(arr)
      })
      console.log(oldDataList, 'oldDataList')
      let tempArr = []
      let afterData = []
      for (let i = 0; i < oldDataList.length; i++) {
        if (tempArr.indexOf(oldDataList[i].groupNo) === -1) {
          afterData.push({
            groupName: oldDataList[i].groupName,
            groupNo: oldDataList[i].groupNo,
            paramList: oldDataList[i].paramList
          })
          tempArr.push(oldDataList[i].groupNo)
        } else {
          for (let j = 0; j < afterData.length; j++) {
            if (afterData[j].groupNo === oldDataList[i].groupNo) {
              afterData[j].paramList.push(oldDataList[i].paramList[0])
            }
          }
        }
      }
      console.log(afterData, 'afterData')
      let stocktemp = JSON.parse(JSON.stringify(this.stockPriceList))
      console.log(this.demoData, stocktemp)
      let atemp = []
      let outList = []
      for (let i = 0; i < this.demoData.length; i++) {
        stocktemp.map(item => {
          if (item.sku === this.demoData[i].skuNo) {
            let arr = {
              priceCost: item.price,
              level: item.level === 'LV1' ? 1 : (item.level === 'LV2' ? 2 : (item.level === 'LV3' ? 4 : 8))
            }
            atemp.push(arr)
          }
        })
      }
      let arrstocktemp = []
      for (let i = 0; i < atemp.length; i += 4) {
        arrstocktemp.push(atemp.slice(i, i + 4))
      }

      // 特殊参数
      let specialtemp = []
      let arrspecialtemp = []
      let specialtempList = JSON.parse(JSON.stringify(this.specialParams))
      console.log(specialtempList, 'specialtempList', this.costList)
      console.log(this.firstAttr, this.secodeAttr)
      specialtempList.map(item => {
        let brr = {
          paramName: item.color,
          paramNo: item.sku.toString(),
          vals: item.specialValue
        }
        if (brr.vals) {
          arrspecialtemp.push(brr)
        }
      })
      console.log(specialtemp)
      let brrtemp = []
      let arrtemp = []
      let brrIndex = specialtemp.length / this.demoData.length
      let arrIndex = arrspecialtemp.length / this.demoData.length

      for (let i = 0; i < specialtemp.length; i += brrIndex) {
        brrtemp.push(specialtemp.slice(i, i + brrIndex))
      }
      for (let i = 0; i < arrspecialtemp.length; i += arrIndex) {
        arrtemp.push(arrspecialtemp.slice(i, i + arrIndex))
      }
      console.log(this.demoData, 'arrstocktemp')
      console.log(this.ruleForm.sizeList, '特殊参数')
      let sizetemp = []
      let colortemp = []
      this.ruleForm.sizeList.map(item => {
        this.sizeListData.map((items, indexs) => {
          if (item === items.txtVal) {
            sizetemp.push(indexs)
          }
        })
      })
      this.ruleForm.colorList.map(item => {
        this.colorListData.map((items, indexs) => {
          if (item === items.txtVal) {
            colortemp.push(indexs)
          }
        })
      })
      let flagtemparr = []
      let flagtempbrr = []
      this.firstAttr.map(item => {
        let arr = {
          paramName: item.keyName,
          paramNo: item.keyNo,
          vals: ''
        }
        flagtemparr.push(arr)
      })
      this.secodeAttr.map(item => {
        let arr = {
          paramName: item.keyName,
          paramNo: item.keyNo,
          vals: ''
        }
        flagtempbrr.push(arr)
      })
      let flag = JSON.parse(JSON.stringify([...flagtemparr, ...flagtempbrr]))
      let flag1 = []
      flag.map(item => {
        item.vals = ''
      })
      console.log(flag)
      console.log([...this.ruleForm.sizeList, ...this.ruleForm.colorList])
      this.ruleForm.sizeList.map(item => {
        this.ruleForm.colorList.map(items => {
          let arr = [item, items]
          flag1.push(arr)
        })
      })
      let demoflag = []
      for (let i = 0; i < this.demoData.length; i++) {
        demoflag.push(flag)
      }
      console.log(demoflag)
      console.log(flag1)
      let shopArrtTemp = JSON.parse(JSON.stringify(flag1))
      let shopArrt = JSON.parse(JSON.stringify(demoflag))
      shopArrtTemp.map((item, index) => {
        item.map((items, indexs) => {
          shopArrt[index][indexs].vals = items
        })
      })
      console.log(shopArrt)
      console.log(sizetemp, colortemp, './././././.')
      let contemp = []
      sizetemp.map(item => {
        colortemp.map(ite => {
          contemp.push(`${item}-${ite}`)
        })
      })
      console.log(contemp, this.attrList, '././././././oooooo', this.ruleForm.color)
      let suppers = []
      this.costList.map(item => {
        let arr = {
          supplierNo: item.supplierNo,
          supplierPost: item.supplierPost,
          primeCost: item.price,
          numStock: item.inventory
        }
        suppers.push(arr)
      })

      for (let i = 0; i < this.demoData.length; i++) {
        let str = {
          levelList: arrstocktemp[i],
          ownFeatParamList: shopArrt[i],
          skuIndex: contemp[i],
          priceCost: this.costList[i].inventory,
          priceSales: this.costList[i].price,
          supplierList: [suppers[i]],
          ownSpecParamList: arrtemp[i]
        }
        outList.push(str)
      }
      console.log(outList, 'outList', this.costList)
      // 图片集合
      // let imageList = []

      let params = {
        productNo: this.allDatas.productNo,
        specialSpecList: [...this.firstAttr, ...this.secodeAttr],
        attachmentList: this.attachmentNoList,
        brandNo: this.ruleForm.commodityBrandName,
        categoryNo: this.firstRuleForm.classifyId.slice(-1).join(','),
        genericSpecList: afterData,
        integralBuy: this.ruleForm.purchaseAmount,
        keyword: this.ruleForm.shopKeyWord,
        memo: this.ruleForm.productNotes,
        skuAdditionList: outList,
        pos: 100,
        presentIntegral: this.ruleForm.bonusPoints,
        productInfo: this.ruleForm.shopDesc,
        productStatus: this.ruleForm.goodsMarket ? 1 : 2,
        productSubInfo: this.ruleForm.detailDesc,
        productSubTitle: this.ruleForm.detailTitle,
        productTitle: this.ruleForm.shopName,
        proxyLeve: this.ruleForm.agentLevel.reduce((a, b) => { return a + b }, 0),
        service: '1', // this.ruleForm.serviceAssurance,
        thdNo: this.ruleForm.productCode,
        transportationNo: this.ruleForm.runTemplate,
        unitNo: this.ruleForm.weightCompany,
        unitValue: this.ruleForm.shopWeight,
        subMemo: this.shopDetailTypePcData || '' + '#@#' + this.shopDetailTypePhoneData || ''
      }
      console.log(params)
      debugger
      const { $api, $message } = this
      try {
        let {transactionStatus} = await $api.product.productMaintenance(params)
        if (transactionStatus.success) {
          let path = '/product/productList'
          this.$router.push({
            path: path
          })
        } else {
          $message.error(transactionStatus.replyText)
        }
      } catch (error) {
        console.log(error)
        $message.error(error.replyText)
      } finally {
        this.submitLoad = false
      }
    },
    // 弹框确认
    handleEnter () {
      if (this.outSupplierList.length === 0) {
        this.$message.error('请选择供应商')
      } else {
        let index = this.outIndex
        console.log(this.costList)
        let temp = JSON.parse(JSON.stringify(this.costList[index]))
        // this.costList[index] = []
        let temparr = []
        console.log(this.costList)
        for (let i = 0; i < this.outSupplierList.length; i++) {
          let arr = {
            color: temp.color,
            size: temp.size,
            sku: temp.sku,
            supplier: this.outSupplierList[i].supplierName,
            status: false,
            price: temp.price,
            inventory: temp.inventory,
            initStatus: true,
            supplierNo: this.outSupplierList[i].supplierNo,
            supplierPost: '',
            primeCost: temp.inventory,
            numStock: temp.inventory
          }
          temparr.push(arr)
        }
        // for (let i = 0; i < temparr.length; i++) {
        //   if (i === temparr.length - 1) {
        //     temparr[i].initStatus = true
        //   }
        // }
        // console.log(temparr)
        console.log(this.costList[index].supplier)
        if (this.costList[index].supplier === '') {
          this.costList.splice(index, 1)
        }
        temparr.unshift(index, 0)
        Array.prototype.splice.apply(this.costList, temparr) // 合并插入数组，

        this.costList = Array.from(new Set(this.costList))
        console.log(this.costList)
        // let firstStatus = []
        // if (this.costList.length > 1) {
        //   for (let i = 0; i < this.costList.length; i++) {
        //     for (let j = 0; j < this.costList.length; j++) {
        //       if (this.costList[i].color === this.costList[j].color && this.costList[i].size === this.costList[j].size && this.costList[i].sku === this.costList[j].sku) {
        //         // this.costList[j].initStatus = false
        //         firstStatus.push(this.costList[i])
        //       }
        //     }
        //   }
        // }
        // let arrTemp = []
        // this.outSupplierList.map(item => {
        //   arr.supplier = item.supplierName
        //   arrTemp.push(arr)
        // })
        // console.log(this.costList)
        this.supplierStatus = false
      }
    },
    // 弹框选择table
    handleSelectionChange (val) {
      this.outSupplierList = val
    },
    // 搜索供应商
    handleSearch () {
      this.addSupplier()
    },
    // 添加供应商
    async addSupplier (index, val) {
      this.supplierStatus = true
      this.outIndex = index
      const { $api, $message } = this
      let params = {
        status: '',
        supplierLevel: '',
        supplierName: this.outSupplierName,
        supplierNo: '',
        supplierStatus: '',
        page: {
          count: 0,
          pageSize: 9999,
          pageNum: 1,
          orderBy: '',
          returnCount: true,
          offset: 0,
          limit: 0
        }
      }
      try {
        let {dataList} = await $api.supplier.supplierListInquiry(params)
        this.gridData = dataList
      } catch (error) {
        $message.error(error.replyText)
      } finally {
        this.submitLoad = false
      }
    },
    beforeAvatarUploadAttr (file) {
      console.log(file)
      let testmsg = file.name.substring(file.name.lastIndexOf('.') + 1)
      const extension = testmsg === 'jpg'
      const extension2 = testmsg === 'png'
      if (!extension && !extension2) {
        this.$message.error('上传图片只能是 JPG、PNG 格式!')
        return false
      }
      // const isLtSize = file.size / 1024 > 50
      // if (isLtSize) {
      //   this.$message.error('上传图片大小不能超过 50kb!')
      //   return false
      // }
      return true
    },
    // 设置主图
    handleSet (index) {
      // this.figureIndex = index
      // console.log(index)
      // console.log(this.fileList)
      let temp = JSON.parse(JSON.stringify(this.fileList))
      temp.map((item, ind) => {
        if (index === ind) {
          this.fileList.unshift(temp[index])
          this.fileList.splice(index + 1, 1)
          this.attachmentNoList.unshift(this.attachmentNoList[index])
          this.attachmentNoList.splice(index + 1, 1)
        }
      })
      console.log(this.fileList)
    },
    // 文件超出范围
    handleExceed (files, fileList) {
      this.$message.error(`当前限制只能上传 5 张图片，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`)
    },
    // 上传校验
    beforeAvatarUpload (file) {
      console.log(file)
    },
    // 上传成功
    handleSuccess (file) {
      console.log(file)
      this.fileList.push(file.attachmentNos[0])
      // console.log(this.fileList)
      // this.supplierInquiry.attachmentNoList.push(file.attachmentDataList[0].attachmentNo)
      // console.log(this.supplierInquiry.attachmentNoList)
    },
    // 图片删除
    handleRemove (index) {
      this.fileList.splice(index - 1, 1)
      if (index === this.figureIndex) {
        this.figureIndex = 1
      }
    },
    // 商品图册预览
    handlePictureCardPreview (file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    // 随机数
    randomNumber (length) {
      return Number(Math.random().toString().substr(5, length))
    },
    // 商品分类下一步
    handleNext (name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          this.options1.map(item => {
            if (item.id === this.firstRuleForm.classifyId[0]) {
              console.log(11111111111)
              item.cities.map(items => {
                if (items.id === this.firstRuleForm.classifyId[1]) {
                  items.cities.map(ite => {
                    if (ite.id === this.firstRuleForm.classifyId[2]) {
                      this.firstRuleForm.classifyName = item.name + ' < ' + items.name + ' < ' + ite.name
                    }
                  })
                }
              })
            }
          })
          this.paramsSet() // 分类查询参数
          if (this.stepsActive++ > 2) return false
        } else {
          console.log('error submit!!')
          return false
        }
      })
      // if (this.stepsActive++ > 2) return false
    },
    // 商品信息的下一步
    handleNextSecond (formName) {
      this.$refs.upload.submit()
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.pushFileData()
          // this.pushFileData()
          // alert('submit!')
          // console.log(this.ruleForm)
          // if (this.stepsActive++ > 2) return false
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    // 上传图片
    async pushFileData () {
      let temp = []
      this.fileList.map(item => {
        temp.push(item.raw)
      })
      if (temp.length === 0) {
        this.$message.error('请上传图片')
      } else {
        let formData = new FormData()
        temp.map(item => {
          formData.append('file', item)
        })
        formData.append('channel', 'ALIYUN')
        formData.append('uploadKey', 'oss_product')
        try {
          const { $api, $message } = this
          const {transactionStatus, attachmentNos} = await $api.advert.shopcrmFileUpload(formData)
          if (transactionStatus.success) {
            console.log(1, this.attachmentNoList, attachmentNos)
            if (attachmentNos) {
              this.attachmentNoList = [...this.attachmentNoList, ...attachmentNos]
            }
            console.log(this.stepsActive, 'ppppppppppp', this.attachmentNoList)
            this.attrInit()
            if (this.stepsActive++ > 2) return false
          } else {
            $message.error(transactionStatus.replyText)
          }
        } catch (error) {
        } finally {
          this.submitLoad = false
        }
      }
    },
    // 编辑
    handleBack () {
      this.stepsActive = 0
    },
    // 选择尺码事件
    handleSize (val) {
      console.log(val)
      // console.log(this.paramData[0].value.join(","))
      let temp = []
      val.map(item => {
        temp.push(item)
      })
      this.ruleForm.sizeList = temp
      let str = [] // 商品属性
      let flag = [] // 商品特殊参数
      let priceValue = [] // 进货价
      let costValue = []
      let index = this.paramData.length
      let attrValue = []
      console.log(this.attrList)
      this.attrList.map(item => {
        let brr = []
        item.vals.map(items => {
          val.map(ite => {
            if (ite === items.txtVal) {
              brr.push(items.txtVal)
              let arr = {
                keyName: item.keyName,
                keyNo: item.keyNo,
                vals: brr.join(',')
              }
              attrValue.unshift(arr)
            }
          })
        })
      })
      console.log(attrValue, 'attrValue')
      let res = new Map()
      this.firstAttr = attrValue.filter(item => !res.has(item.keyNo) && res.set(item.keyNo, 1))
      if (this.ruleForm.sizeList.length === 0 && this.ruleForm.colorList.length > 0) {
        this.ruleForm.colorList.map(items => {
          let brr = {
            size: '',
            color: items,
            guidancePrice: '',
            surprisePrice: '',
            skuNo: this.randomNumber(5)
          }
          for (let i = 0; i < index; i++) {
            let flagarr = {
              size: '',
              color: items,
              sku: brr.skuNo,
              params: this.paramData[i].paramName,
              value: this.paramData[i].value ? this.paramData[i].value : '',
              specialValue: '',
              specialStatus: this.paramData[i].paramType,
              keyNo: this.paramData[i].paramNo
            }
            flag.push(flagarr)
          }
          for (let i = 0; i < 4; i++) {
            let pricearr = {
              size: '',
              color: items,
              sku: brr.skuNo,
              level: i === 0 ? 'LV1' : (i === 2 ? 'LV2' : (i === 3 ? 'LV3' : 'LV4')),
              price: ''
            }
            priceValue.push(pricearr)
          }
          let costTemp = {
            size: '',
            color: items,
            sku: brr.skuNo,
            supplier: '',
            inventory: '',
            price: '',
            status: false,
            initStatus: true
          }
          costValue.push(costTemp)
          str.push(brr)
        })
      } else if (this.ruleForm.colorList.length === 0) {
        this.ruleForm.sizeList.map(item => {
          let brr = {
            size: item,
            color: '',
            guidancePrice: '',
            surprisePrice: '',
            skuNo: this.randomNumber(5)
          }
          for (let i = 0; i < index; i++) {
            let flagarr = {
              size: item,
              color: '',
              sku: brr.skuNo,
              params: this.paramData[i].paramName,
              value: this.paramData[i].value ? this.paramData[i].value : '',
              specialValue: '',
              specialStatus: this.paramData[i].paramType,
              keyNo: this.paramData[i].paramNo
            }
            flag.push(flagarr)
          }
          for (let i = 0; i < 4; i++) {
            let pricearr = {
              size: item,
              color: '',
              sku: brr.skuNo,
              level: i === 0 ? 'LV1' : (i === 2 ? 'LV2' : (i === 3 ? 'LV3' : 'LV4')),
              price: ''
            }
            priceValue.push(pricearr)
          }
          let costTemp = {
            size: item,
            color: '',
            sku: brr.skuNo,
            supplier: '',
            inventory: '',
            price: '',
            status: false,
            initStatus: true
          }
          costValue.push(costTemp)
          str.push(brr)
        })
      } else {
        this.ruleForm.sizeList.map(item => {
          this.ruleForm.colorList.map(items => {
            let brr = {
              size: item,
              color: items,
              guidancePrice: '',
              surprisePrice: '',
              skuNo: this.randomNumber(5)
            }
            for (let i = 0; i < index; i++) {
              let flagarr = {
                size: item,
                color: items,
                sku: brr.skuNo,
                params: this.paramData[i].paramName,
                value: this.paramData[i].value ? this.paramData[i].value : '',
                specialValue: '',
                specialStatus: this.paramData[i].paramType,
                keyNo: this.paramData[i].paramNo,
                keyName: this.paramData
              }
              flag.push(flagarr)
            }
            for (let i = 0; i < 4; i++) {
              let pricearr = {
                size: item,
                color: items,
                sku: brr.skuNo,
                level: i === 0 ? 'LV1' : (i === 2 ? 'LV2' : (i === 3 ? 'LV3' : 'LV4')),
                price: ''
              }
              priceValue.push(pricearr)
            }
            let costTemp = {
              size: item,
              color: items,
              sku: brr.skuNo,
              supplier: '',
              inventory: '',
              price: '',
              status: false,
              initStatus: true
            }
            costValue.push(costTemp)
            str.push(brr)
          })
        })
      }
      console.log(this.paramData)
      this.demoData = str
      this.specialParams = flag
      this.stockPriceList = priceValue
      this.costList = costValue
    },
    // 选择颜色事件
    handleColor (val) {
      console.log(val)
      let temp = []
      val.map(item => {
        temp.push(item)
      })
      this.ruleForm.colorList = temp
      let str = []
      let flag = []
      let priceValue = []
      let costValue = []
      let index = this.paramData.length
      let attrValue = []
      console.log(this.attrList)
      this.attrList.map(item => {
        let brr = []
        item.vals.map(items => {
          val.map(ite => {
            if (ite === items.txtVal) {
              brr.push(items.txtVal)
              let arr = {
                keyName: item.keyName,
                keyNo: item.keyNo,
                vals: brr.join(',')
              }
              attrValue.unshift(arr)
            }
          })
        })
      })
      console.log(attrValue, 'attrValue')
      let res = new Map()
      this.secodeAttr = attrValue.filter(item => !res.has(item.keyNo) && res.set(item.keyNo, 1))
      if (this.ruleForm.sizeList.length === 0) {
        this.ruleForm.colorList.map(items => {
          let brr = {
            size: '',
            color: items,
            guidancePrice: '',
            surprisePrice: '',
            skuNo: this.randomNumber(5)
          }
          for (let i = 0; i < index; i++) {
            let flagarr = {
              size: '',
              color: items,
              sku: brr.skuNo,
              params: this.paramData[i].paramName,
              value: this.paramData[i].value ? this.paramData[i].value : '',
              specialValue: '',
              specialStatus: this.paramData[i].paramType,
              keyNo: this.paramData[i].paramNo
            }
            flag.push(flagarr)
          }
          for (let i = 0; i < 4; i++) {
            let pricearr = {
              size: '',
              color: items,
              sku: brr.skuNo,
              level: i === 0 ? 'LV1' : (i === 2 ? 'LV2' : (i === 3 ? 'LV3' : 'LV4')),
              price: ''
            }
            priceValue.push(pricearr)
          }
          let costTemp = {
            size: '',
            color: items,
            sku: brr.skuNo,
            supplier: '',
            inventory: '',
            price: '',
            status: false,
            initStatus: true
          }
          costValue.push(costTemp)
          str.push(brr)
        })
      } else if (this.ruleForm.sizeList.length > 0 && this.ruleForm.colorList.length === 0) {
        this.ruleForm.sizeList.map(items => {
          let brr = {
            size: items,
            color: '',
            guidancePrice: '',
            surprisePrice: '',
            skuNo: this.randomNumber(5)
          }
          for (let i = 0; i < 3; i++) {
            let flagarr = {
              size: items,
              color: '',
              sku: brr.skuNo,
              params: this.paramData[i].paramName,
              value: this.paramData[i].value ? this.paramData[i].value : '',
              specialValue: '',
              specialStatus: this.paramData[i].paramType,
              keyNo: this.paramData[i].paramNo
            }
            flag.push(flagarr)
          }
          for (let i = 0; i < 4; i++) {
            let pricearr = {
              size: items,
              color: '',
              sku: brr.skuNo,
              level: i === 0 ? 'LV1' : (i === 2 ? 'LV2' : (i === 3 ? 'LV3' : 'LV4')),
              price: ''
            }
            priceValue.push(pricearr)
          }
          let costTemp = {
            size: items,
            color: '',
            sku: brr.skuNo,
            supplier: '',
            inventory: '',
            price: '',
            status: false,
            initStatus: true
          }
          costValue.push(costTemp)
          str.push(brr)
        })
      } else {
        this.ruleForm.sizeList.map(item => {
          this.ruleForm.colorList.map(items => {
            let brr = {
              size: item,
              color: items,
              guidancePrice: '',
              surprisePrice: '',
              skuNo: this.randomNumber(5)
            }
            for (let i = 0; i < index; i++) {
              let flagarr = {
                size: item,
                color: items,
                sku: brr.skuNo,
                params: this.paramData[i].paramName,
                value: this.paramData[i].value ? this.paramData[i].value : '',
                specialValue: '',
                specialStatus: this.paramData[i].paramType,
                keyNo: this.paramData[i].paramNo
              }
              flag.push(flagarr)
            }
            for (let i = 0; i < 4; i++) {
              let pricearr = {
                size: item,
                color: items,
                sku: brr.skuNo,
                level: i === 0 ? 'LV1' : (i === 1 ? 'LV2' : (i === 2 ? 'LV3' : 'LV4')),
                price: ''
              }
              priceValue.push(pricearr)
            }
            let costTemp = {
              size: item,
              color: items,
              sku: brr.skuNo,
              supplier: '',
              inventory: '',
              price: '',
              status: false,
              initStatus: true
            }
            costValue.push(costTemp)
            str.push(brr)
          })
        })
      }
      console.log(flag)
      this.demoData = str
      this.specialParams = flag
      this.stockPriceList = priceValue
      this.costList = costValue
      console.log(this.specialParams, '...........///////////////////..............', this.paramData.length)
      let levelTemp = []
      this.allDatas.skuData.map((item, i) => {
        item.levelList.map(items => {
          levelTemp.push(items)
        })
        this.costList[i].price = item.supplierList[0].priceCost
        this.costList[i].inventory = item.supplierList[0].numSales
        this.costList[i].supplier = item.supplierList[0].supplierName
        this.demoData[i].guidancePrice = item.priceCost
        this.demoData[i].surprisePrice = item.priceSales
      })
    },
    // 删除
    handleDel (index) {
      this.demoData.splice(index, 1)
      let tempColor = []
      let tempSize = []
      let tempCost = []
      let tempPrice = []
      this.demoData.map((item, index) => {
        tempColor.push(item.color)
        tempSize.push(item.size)
        let costTemp = {
          size: item.size,
          color: item.color,
          sku: item.skuNo,
          supplier: '',
          inventory: '',
          price: '',
          status: false,
          initStatus: true
        }
        tempCost.push(costTemp)
        let pricearr = {
          size: item.size,
          color: item.color,
          sku: item.skuNo,
          level: index === 0 ? 'LV1' : (index === 2 ? 'LV2' : (index === 3 ? 'LV3' : 'LV4')),
          price: ''
        }
        tempPrice.push(pricearr)
      })
      this.ruleForm.colorList = Array.from(new Set(tempColor))
      this.ruleForm.sizeList = Array.from(new Set(tempSize))
      this.costList = tempCost
      this.stockPriceList = tempPrice
    },
    // 商品品牌
    async commodityBrand () {
      const { $api, $message } = this
      let params = {
        brandChineseName: '',
        brandName: '',
        brandNo: '',
        madeIn: '',
        startLetter: '',
        page: {
          count: 0,
          pageSize: 9999,
          pageNum: 1,
          orderBy: '',
          returnCount: true,
          offset: 0,
          limit: 0
        }
      }
      try {
        let {dataList} = await $api.product.productBrandListInquiry(params)
        this.commodityBrandList = Object.freeze(dataList)
      } catch (error) {
        $message.error(error.replyText)
      } finally {
        this.submitLoad = false
      }
    },
    onProvincesChange (val) {
      // console.log(val)
      this.classifyListData(val)
      // this.handleValueName()
      // console.log(this.$refs.myCascader.getCheckedNodes()[0])
    // })
    },
    handleValueName (val) {
      console.log(this.$refs.myCascader.getCheckedNodes()[0].pathLabels.join(' < '))
      this.firstRuleForm.classifyName = this.$refs.myCascader.getCheckedNodes()[0].pathLabels.join(' < ')
    },
    // 分类数据
    async classifyListData (id) {
      // console.log(id)
      let idArea
      let sizeArea
      if (!id) {
        idArea = null
        sizeArea = 0
      } else if (id.length === 1) {
        idArea = id[0]
        sizeArea = id.length // 3:一级 4:二级 6:三级
      } else if (id.length === 2) {
        idArea = id[1]
        sizeArea = id.length // 3:一级 4:二级 6:三级
      }
      // console.log(idArea, sizeArea)
      const { $api, $message } = this
      let params = {
        parentCategoryNo: idArea,
        page: {
          count: 0,
          limit: 0,
          offset: 0,
          orderBy: '',
          pageNum: 1,
          pageSize: 9999,
          returnCount: true
        }
      }
      try {
        let {dataList} = await $api.product.productCategoryInquiry(params)
        let Items = dataList
        // console.log(Items)
        if (sizeArea === 0) { // 初始化 加载一级 省
          this.options1 = Items.map((value, i) => {
            return {
              id: value.categoryNo,
              name: value.categoryName,
              cities: []
            }
          })
        } else if (sizeArea === 1) { // 点击一级 加载二级 市
          this.options1.map((value, i) => {
            if (value.id === id[0]) {
              if (!value.cities.length) {
                value.cities = Items.map((value, i) => {
                  return {
                    id: value.categoryNo,
                    name: value.categoryName,
                    cities: []
                  }
                })
              }
            }
          })
        } else if (sizeArea === 2) { // 点击二级 加载三级 区
          // console.log(this.firstRuleForm.classifyId[2])
          this.options1.map((value, i) => {
            if (value.id === id[0]) {
              value.cities.map((value, i) => {
                if (value.id === id[1]) {
                  if (!value.cities.length) {
                    value.cities = Items.map((value, i) => {
                      return {
                        id: value.categoryNo,
                        name: value.categoryName
                      }
                    })
                  }
                }
              })
            }
          })
        }
        // console.log(this.firstRuleForm)
      } catch (error) {
        $message.error(error.replyText)
      } finally {
        this.submitLoad = false
      }
    },
    // 参数组表格合并arraySpanMethodFour
    arraySpanMethod ({ row, column, rowIndex, columnIndex }) {
      let index = this.paramData.length
      if (columnIndex === 0) {
        if (rowIndex % index === 0) {
          return {
            rowspan: index,
            colspan: 1
          }
        } else {
          return {
            rowspan: 0,
            colspan: 0
          }
        }
      }
    },
    arraySpanMethodThird ({ row, column, rowIndex, columnIndex }) {
      let index = this.paramData.length
      console.log(index)
      if (columnIndex === 0 || columnIndex === 1 || columnIndex === 2) {
        if (rowIndex % index === 0) {
          return {
            rowspan: index,
            colspan: 1
          }
        } else {
          return {
            rowspan: 0,
            colspan: 0
          }
        }
      }
    },
    arraySpanMethodFour ({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 0 || columnIndex === 1 || columnIndex === 2) {
        if (rowIndex % 4 === 0) {
          return {
            rowspan: 4,
            colspan: 1
          }
        } else {
          return {
            rowspan: 0,
            colspan: 0
          }
        }
      }
    },
    // 根据分类编号查询规格组
    async paramsSet () {
      const { $api, $message } = this
      let params = {
        categoryNo: this.firstRuleForm.classifyId.slice(-1).join(',')
      }
      console.log(params)
      try {
        let {dataList} = await $api.product.productByCategoryInquiry(params)
        console.log(dataList)
        this.oldParamData = dataList
        let temp = JSON.parse(JSON.stringify(dataList))
        let arr = []
        temp.map((item, index) => {
          item.paramlist.map(items => {
            items.groupName = item.groupName
            items.groupNo = item.groupNo
            items.value = ''
            arr.push(items)
          })
        })
        this.paramData = arr
        // 参数组
        let paramDataInit = JSON.parse(this.allDatas.spuAttrData.genericSpec)
        let paramsarr = []
        paramDataInit.map(item => {
          item.paramList.map(items => {
            items.groupName = item.groupName
            items.groupNo = item.groupNo
            items.value = items.vals
            paramsarr.push(items)
          })
        })
        paramsarr.map((item, index) => {
          this.paramData[index].value = item.value
        })
        console.log(this.paramData, '.................', paramsarr, this.specialParams)
        this.handleSize(this.ruleForm.sizeList)
        this.handleColor(this.ruleForm.colorList)
      } catch (error) {
        $message.error(error.replyText)
      } finally {
        this.submitLoad = false
      }
    }
  }
}
</script>

<style lang="scss" type="text/scss" rel="stylesheet/scss" scoped>
.c_title {
    font-size: 18px;
    margin-left: 20px;
    margin-bottom: 20px;
    margin-top: 30px;
    i{
      display: inline-block;
      width: 5px;
      height: 20px;
      background: #409EFF;
      vertical-align: -3px;
      margin-right: 10px;
    }
  }
.c_form {
  margin: 50px 0;
  width: 600px;
  .c_table {
    margin-left: 50px;
    box-sizing: border-box;
    width: auto;
    .el-select>.el-input {
      width: 100%
    }
    .el-date-editor.el-input, .el-date-editor.el-input__inner {
      width: 100%
    }
    .el-select {
      width: 100%
    }
  }
}
.c_btn {
  margin: 20px 0 0 110px;
}
.c_tip {
  font-size: 12px;
  color: #999;
  line-height: 18px;
}
.c_form_item {
  >>> .el-form-item__content {
    display: flex;
    .el-input {
      margin-right: 20px;
    }
    .c_input_mini {
      width: 80px;
    }
  }
}
.c_specs {
  margin: 20px 0;
  border: 1px solid #e4e4e4;
  padding: 20px;
  box-sizing: border-box;
  .c_top {
    font-size: 14px;
    margin-bottom: 20px;
  }
}
.c_third_btn {
  margin: 20px 0;
  .c_tip {
    margin-left: 10px;
  }
}
.c_third h3 {
  font-size: 16px;
  margin-top: 40px;
}
.lianshang-form .el-form-item.c_text {
  margin-top: 20px;
}
.c_third {
  >>> .el-form-item__label {
    line-height: 20px;
  }
  >>> .el-form-item__content {
    line-height: 20px;
  }
  .c_item {
    margin-left: 20px;
    .c_lianshang_form {
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      .c_item_list {
        width: 50%;
        .el-button--text {
          padding: 0;
        }
        .avatar-uploader {
          display: flex;
          >>> .el-upload-list__item:first-child {
            margin-top: 0;
          }
          >>> .el-upload-list__item {
            line-height: 1.4;
          }
        }
      }
    }
  }
}
>>> .el-step__title.is-success {
  color: #409EFF
}
>>> .el-step__head.is-success {
  color: #409EFF;
  border-color: #409EFF
}
.el-cascader--mini {
  width: 100%
}
>>> input::-webkit-outer-spin-button,
>>> input::-webkit-inner-spin-button {
  -webkit-appearance: none;
}
>>> input[type='number'] {
  -moz-appearance: textfield;
}
.el-upload-list--picture-card .el-upload-list__item-actions .c_upload_set {
  font-size: 12px;
}
.c_image_list {
  display: flex;
  margin: 0 0 40px 20px;
  .c_list {
    width: 148px;
    border: 1px solid #e4e4e4;
    margin-right: 20px;
    .c_img {
      width: 100%;
      height: 148px;
      margin-right: 20px;
      display: inline-block;
    }
    .c_bottom {
      border-top: 1px solid #e4e4e4;
      padding: 0 10px;
      box-sizing: border-box;
      display: flex;
      justify-content: space-between;
      .el-button--text {
        font-size: 12px;
      }
      .c_active {
        color: #F04844;
      }
    }
  }
}
.c_out_top {
  display: flex;
  .c_search {
    margin-left: 10px;
  }
}
.c_out_second {
  margin: 10px 0;
  display: flex;
  justify-content: space-between;
  font-size: 12px;
}
.c_btn_bottom {
  padding: 20px 0 10px;
  text-align: center;
}
.c_input {
  height: 28px;
  border: none;
  border: 1px solid #DCDFE6;
  padding: 0 10px;
}
.c_uploader {
  display: none
}
.c_item >>> .ql-editor{
  min-height: 200px !important;
}
.quill-editor {
  margin-top: 20px
}
.c_phone_tip {
  margin-left: 20px;
  color: #409EFF;
  text-decoration: none;
}
.c_tip_dialog {
  .c_tip_title {
    font-weight: bold;
    margin-top: 20px;
    margin-bottom: 10px;
    font-size: 16px
  }
  >>> .el-dialog__body {
    padding: 0 20px 30px;
  }
  .c_tip_contnent {
    line-height: 20px;
  }
}

</style>
