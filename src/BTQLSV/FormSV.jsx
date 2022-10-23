import React, { Component } from 'react'
import { connect } from 'react-redux'



class FormSV extends Component {

  state = {
    values: {
      maSV: "",
      hoTen: "",
      sdt: "",
      email: ""

    },
    errors: {
      maSV: "",
      hoTen: "",
      sdt: "",
      email: ""
    },
   
  }

  inputChange = (event) => {
    

    let {value, name} = event.target;

    let newValues = {...this.state.values,[name]:value};

    let newErrors = {...this.state.errors};
    let errorMsg = "";
    
    // Kiểm tra rỗng
    if(value.trim() == ""){
      errorMsg = "Nội không để trống!";
    }

   

    newErrors[name] = errorMsg;

    let typeVal = event.target.getAttribute("typeinput");

    // Kiểm tra trùng mã SV
    if(typeVal === "maSV"){
      let isExist = false;
      isExist = this.props.mangSV.map((sv) => { 
        return sv.maSV === value
       })
            if (isExist) {
                // lỗi
                errorMsg = 'Trùng mã sinh viên'
            }
    }

    if(typeVal === "email"){
      let regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/  ;
      
      if(!regex.test(value)){
        errorMsg = "Email không đúng định dạng!";
      }

    }else if(typeVal === "sdt"){
      let regex = /^[0-9]+$/;

      if(!regex.test(value)){
        errorMsg = "Số điện thoại không đúng định dạng!";
      }
    }else if ( typeVal === "maSV"){
      let regex = /^[0-9]{4,6}$/

      if(!regex.test(value)){
        errorMsg = "mã sinh viên không đúng định dạng!";
      }
    }else{
      let regex = /^[a-z A-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹý\\s]+$/
      if(!regex.test(value)){
        errorMsg = "Tên sinh viên không đúng định dạng!";
      }

    }

    newErrors[name] = errorMsg;

    this.setState({
      values: newValues,
      errors : newErrors
    })


  }

  handleSubmit = (event) => {
    event.preventDefault()
    console.log(event)

    let isValid = true;
    // Kiểm tra còn lỗi không
    for (let key in this.state.errors) {
      if(this.state.errors[key] !== ""){
        isValid = false; 
        break;
      }
    }

    // kiểm tra rỗng
    for (let key in this.state.errors) {
      if(this.state.values[key] === ""){
        isValid = false; 
        break;
      }
    }

    // đẩy dữ liệu lên redux
    if(!isValid){
      alert("Dữ liệu không hợp lệ");
      return;
    }

    let action = {
      type: "THEM_SV",
      sinhVien: this.state.values
    }
    this.props.dispatch(action)

  }


  componentWillReceiveProps(newProps){
    this.setState({
      values: newProps.sinhVienChiTiet
    })
  }

  render() {

    console.log(this.props);
    let {maSV,hoTen,sdt,email} = this.state.values;  

    return (
      <div className='py-1'>
        <h1 className='bg-dark text-white'>Thông tin sinh viên </h1>
        <form onSubmit={(event) => { 
          this.handleSubmit(event);
         }} >
          <div className="row">
            <div className="col-6 mb-4">
              <p className='mb-0'>Mã SV</p>
              <input value={maSV} onChange={(event) => {
                this.inputChange(event)
              }} typeinput="maSV" name='maSV' type="text" placeholder='nhập mã sinh viên' />
              <p className='text-danger'>{this.state.errors.maSV}</p>
            </div>
            <div className="col-6 mb-4">
              <p className='mb-0'>Họ tên</p>
              <input value= {hoTen} onChange={(event) => {
                this.inputChange(event)
              }} typeinput="hoTen" name='hoTen' type="text" placeholder='Nhập họ tên' />
              <p className='text-danger'>{this.state.errors.hoTen}</p>
            </div>

            <div className="col-6 mb-4">
              <p className='mb-0'>Số điện thoại</p>
              <input value={sdt} onChange={(event) => {
                this.inputChange(event)
              }} typeinput="sdt" name='sdt' type="text" placeholder='Nhập số điện thoại' />
              <p className='text-danger'>{this.state.errors.sdt}</p>
            </div>

            <div className="col-6 mb-4">
              <p className='mb-0'>Email</p>
              <input value={email} onChange={(event) => {
                this.inputChange(event)
              }} typeinput = "email" name='email' type="text" placeholder='Nhập email' />
              <p className='text-danger'>{this.state.errors.email}</p>
            </div>

          </div>
          <button  className='btn btn-success'>Thêm sinh viên</button>
          <button type='button' onClick={() => { 
            let action = {
              type: "CAP_NHAT",
              capNhatSV: this.state.values
            }
            this.props.dispatch(action);
           }} className='btn btn-danger'>Cập nhật</button>
        </form>
        <input onChange={(event) => { 
      
          let action = {
            type: "TIM_TEN_SV",
            timTenSV: event.target.value
          }
          this.props.dispatch(action)
         }} name="timSV" className='mt-5' type="text" placeholder='Nhập tên sinh viên cần tìm' />
        
       

      </div>
    )
  }
}

const mapStateToProps = (rootReducer) => {
  return {
    mangSV: rootReducer.QLSVReducer.mangSV,
    sinhVienChiTiet: rootReducer.QLSVReducer.sinhVienChiTiet,

    sinhVienTim: rootReducer.QLSVReducer.sinhVienTim,


  }
}


export default connect(mapStateToProps)(FormSV)