

const initialState = {
  mangSV: [
    
   
  ],
  sinhVienChiTiet: {
    maSV: "",
    hoTen: "",
    sdt: " ",
    email: ""
  },

  sinhVienTim:{
    maSV:"",
  }
}


export const QLSVReducer = (state = initialState, action) => {
  switch (action.type) {
    case "THEM_SV":

      state.mangSV = [...state.mangSV, action.sinhVien];
      return { ...state };

    case "XOA_SV":
      // console.log(action.maSVXoa)
      state.mangSV = state.mangSV.filter((sv) => {
        return sv.maSV !== action.maSVXoa
      })

      return { ...state };

    case "XEM_SV":
      console.log(action.svChiTiet)
      state.sinhVienChiTiet = action.svChiTiet;

      return { ...state };

    case "CAP_NHAT"  :
      console.log(action.capNhatSV)
      
      let svFind = state.mangSV.findIndex((sv) => { 
        return sv.maSV === action.capNhatSV.maSV;
       })

       if(svFind!== -1){
        state.mangSV[svFind] = action.capNhatSV;

       }

       state.mangSV = [...state.mangSV];
      return {...state}

      case "TIM_MA_SV" :
      console.log(action.timMaSV)

      state.mangSV = state.mangSV.filter((sv) => { 
        return sv.maSV !== action.timMaSV
       })

      return {...state}


    default:
      return state
  }
}
