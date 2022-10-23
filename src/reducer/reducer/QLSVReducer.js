

const initialState = {
  mangSV: [
    {maSV: "0001",
    hoTen: "Nguyễn Thị Học Sinh",
    sdt: "0123456",
    email: "tets1@gmail.com"},
    {maSV: "0002",
    hoTen: "Nguyễn Tiến Lên",
    sdt: "0123456",
    email: "tets2@gmail.com"}
   
  ],
  sinhVienChiTiet: {
    maSV: "",
    hoTen: "",
    sdt: " ",
    email: ""
  },

  sinhVienTim: []
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

      case "TIM_TEN_SV" :
    
      let tuKhoaTimKiemThuong = action.timTenSV.toLowerCase()

      let mangSVTim = []

       state.mangSV.map((sv) => { 
          let tenSVMangSV = sv.hoTen.toLowerCase()
          let viTriTK = tenSVMangSV.indexOf(tuKhoaTimKiemThuong)
          if(viTriTK !== -1){
            mangSVTim.push(sv);
          }
        })
        state.sinhVienTim = mangSVTim

        console.log("test",state.sinhVienTim)
        state.sinhVienTim = [...state.sinhVienTim]
      
      return {...state}


    default:
      return state
  }
}
