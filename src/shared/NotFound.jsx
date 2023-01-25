import React from "react"
import { Link } from "react-router-dom"

function NotFount() {
  return(
    <div>
      <h1>404 NotFound</h1>
      <div>페이지가 없습니다. </div>
      <Link to="../">홈에 돌아가기</Link>
    </div>
  )
}

export default NotFount;