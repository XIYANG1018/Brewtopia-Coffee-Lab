import { Spinner } from "react-bootstrap";
// "Spinner" 是指在用户界面上显示的一种动画或图标，用于指示正在进行的操作或加载过程。它通常以旋转的形式展示，表示系统正在处理请求、加载数据或执行某些长时间运行的任务。
import React from 'react'

const Loader = () => {
  return (
    <Spinner
      animation='border'
      role='status'
      style={{
        width: '100px',
        height: '100px',
        margin: 'auto',
        display: 'block',
      }}
    >
    </Spinner>
  )
}

export default Loader
