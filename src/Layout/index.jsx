import { Outlet } from "react-router";
import Header from '../Components/Header'

export default function Markup () {
  return (
    <div ClassName="container">
      <Header />
      <Outlet />
    </div>
  )
}