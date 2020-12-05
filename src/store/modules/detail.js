import { reqGetProductDetail } from "@api/detail";

export default {
    state:{
        productDetail: {
            categoryView:{},
            spuSaleAttrList:{},
            skuInfo:{},
        }
    },
    getters:{
        categoryView(state) {
            return state.productDetail.categoryView;
        },
        spuSaleAttrList(state) {
            return state.productDetail.spuSaleAttrList;
        },
        skuInfo(state) {
            return state.productDetail.skuInfo;
        }
    },
    actions:{
        async getProductDetail({commit}, id) {
            const productDetail = await reqGetProductDetail(id);
            commit("GET_PRODUCT_DETAIL", productDetail)
        }
    },
    mutations:{
        GET_PRODUCT_DETAIL(state, productDetail) {
            state.productDetail = productDetail;
        }
        
    },
}