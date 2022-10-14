import React, { Component } from 'react'
import { connect } from 'react-redux'

class TableSV extends Component {

  renderMangSV = () =>{
    return this.props.mangSV.map((sv) => { 
      return <tr key={sv.maSV}>
        <td>{sv.maSV}</td>
        <td>{sv.hoTen}</td>
        <td>{sv.sdt}</td>
        <td>{sv.email}</td>
        <td>
          <button onClick={() => { 
            let action ={
              type: "XEM_SV",
              svChiTiet: sv
            }
            this.props.dispatch(action)
           }} className='btn btn-success'>Xem</button>
          <button onClick={() => { 
            let action = {
              type: "XOA_SV",
              maSVXoa: sv.maSV
            }
            this.props.dispatch(action);
           }} className='btn btn-danger'>Xoá</button>
        </td>
      </tr>
     })
  }


  render() {
    return (
      <div>
        <table class="table">
          <thead>
            <tr className='bg-dark text-white'>
              <th>Mã SV</th>
              <th> Họ tên</th>
              <th>Số điện thoại</th>
              <th>Email</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
          {this.renderMangSV()}
          </tbody>
        </table>
      </div>
    )
  }
}

const mapStateToProps = (rootReducer) => {
  return{
    mangSV: rootReducer.QLSVReducer.mangSV
  }
}


export default connect(mapStateToProps)(TableSV)

