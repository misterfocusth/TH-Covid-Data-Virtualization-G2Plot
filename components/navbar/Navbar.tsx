import { MenuOutlined, CloseOutlined } from "@ant-design/icons";
import Image from "next/image";

// Redux
import type { AppState } from "../../store";
import { useSelector, useDispatch } from "react-redux";
import { toggleMenu } from "../../slices/menuSlice";

export const Navbar: React.FC = () => {
  // Redux
  const isOpenMenu = useSelector((state: AppState) => state.menu.isOpenMenu);
  const dispatch = useDispatch();

  return (
    <div>
      <div className="border-solid border-b-2 p-4 ">
        <div className="flex items-center">
          <Image
            src={"/images/logo/thailand.png"}
            alt="logo"
            width={40}
            height={40}
          />
          <div className="ml-3">
            <p className="text-sm font-bold">
              Thailand COVID-19 Virtualization
            </p>
            <p className="text-sm">ข้อมูลโควิด-19 ในประเทศไทย</p>
          </div>

          <div
            className="absolute right-0 pr-4"
            onClick={() => dispatch(toggleMenu())}
          >
            <div className="flex border-solid border-2 p-2 rounded-lg border-gray-100 bg-gray-100">
              {!isOpenMenu ? (
                <MenuOutlined style={{ fontSize: 20 }} />
              ) : (
                <CloseOutlined style={{ fontSize: 20 }} />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
