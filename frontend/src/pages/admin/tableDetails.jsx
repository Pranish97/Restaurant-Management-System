import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "../../components/ui/sheet";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllMenu } from "../../store/admin/menu-slice";
import { ArrowLeft, Plus, Trash } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import {
  addMenuToTable,
  getTableById,
  removeMenuFromTable,
} from "../../store/admin/table-slice";
import { toast } from "react-toastify";

function AdminTableDetails() {
  const { menuList } = useSelector((state) => state.adminMenu);
  const { table } = useSelector((state) => state.adminTable);
  const dispatch = useDispatch();
  const [handleAddMenuDialog, setHandleAddMenuDialog] = useState(false);
  const { id } = useParams();


  const total = table?.menu.reduce((sum, item) => sum + item?.data?.price * item?.quantity, 0);

  function handleAddMenutoTable(menuId, tableId) {
    {
      table.status === "occupied"
        ? dispatch(addMenuToTable({ menuId, tableId })).then((data) => {
            if (data?.payload?.success) {
              toast.success(data.payload.message);
              dispatch(getTableById(tableId));
              setHandleAddMenuDialog(false)
            }
          })
        : toast.error("Table Should be Occupied First!");
    }
  }

  function handleRemoveMenu(tableId, menuId) {
    dispatch(removeMenuFromTable({ tableId, menuId })).then((data) => {
      if (data?.payload?.success) {
        toast.success(data.payload.message);
        dispatch(getTableById(id));
      }
    });
  }

  console.log(table, "table");
  useEffect(() => {
    dispatch(fetchAllMenu());
    dispatch(getTableById(id));
  }, [dispatch]);

  return (
    <div className="p-8">
      <Link
        to={"/admin/table"}
        className="flex gap-1 items-center hover:underline"
      >
        <ArrowLeft className="w-5 h-5" />
        Back
      </Link>
      <h1 className="text-2xl font-bold mb-6 mt-2">Table Details</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 rounded-2xl shadow-lg border">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Orders</h2>
              <Button
                className="bg-amber-700 hover:bg-amber-600 cursor-pointer"
                onClick={() => {
                  setHandleAddMenuDialog(true);
                }}
              >
                + Add Item
              </Button>
            </div>

            <ul className="divide-y divide-gray-200">
              {table && table.menu.length > 0 ? (
                table?.menu.map((item, index) => (
                  <li
                    key={index}
                    className="flex items-center justify-between gap-4 py-3 border-b"
                  >
                    <div className="flex gap-10 items-center">
                      <img
                        src={item?.data?.image}
                        alt={item?.data?.name}
                        className="w-16 h-16 object-cover rounded-lg"
                      />

                      <span className="text-xl font-bold">{item?.data?.name}</span>
                    </div>
                    <div className="flex gap-10 items-center">
                      <span className="text-amber-700 text-lg font-semibold">
                        Quantity: {item?.quantity}
                      </span>
                      <Button
                        onClick={() => {
                          handleRemoveMenu(id, item._id);
                        }}
                        className="bg-red-700 hover:bg-red-600 cursor-pointer"
                      >
                        <Trash />
                      </Button>
                      <span className="text-amber-700 text-lg font-semibold">
                        ${item?.quantity * item?.data?.price}
                      </span>
                    </div>
                  </li>
                ))
              ) : (
                <li className="text-lg font-semibold">No Order Found!</li>
              )}
            </ul>
          </CardContent>
        </Card>

        <Card className="rounded-2xl shadow-lg border h-fit">
          <CardContent className="p-6">
            <h2 className="text-xl font-semibold mb-4">Summary</h2>
            <div className="flex justify-between text-lg font-medium mb-2">
              <span>Total</span>
              <span>${total}</span>
            </div>
            <Button className="w-full mt-4 bg-amber-700 hover:bg-amber-600">
              Checkout
            </Button>
          </CardContent>
        </Card>
      </div>
      <Sheet
        open={handleAddMenuDialog}
        onOpenChange={() => {
          setHandleAddMenuDialog(false);
        }}
      >
        <SheetContent className="gap-5">
          <SheetHeader>
            <SheetTitle>Add Order</SheetTitle>
          </SheetHeader>
          {menuList && menuList.length > 0 ? (
            menuList.map((menu) => (
              <div
                key={menu?._id}
                className="flex items-center gap-4 p-4 border rounded-xl shadow-sm hover:shadow-md hover:bg-gray-50 transition"
              >
                <img
                  src={menu?.image}
                  alt={menu?.name}
                  className="w-16 h-16 object-cover rounded-lg"
                />

                <div className="flex-1">
                  <h1 className="text-lg font-semibold">{menu?.name}</h1>
                  <p className="text-amber-600 text-lg font-semibold">
                    ${menu?.price}
                  </p>
                </div>

                <Button
                  onClick={() => {
                    handleAddMenutoTable(menu?._id, id);
                  }}
                  className="bg-amber-700 hover:bg-amber-600 text-white px-4 py-2 rounded-lg cursor-pointer"
                >
                  <Plus /> Add
                </Button>
              </div>
            ))
          ) : (
            <div>No Menu Found</div>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
}

export default AdminTableDetails;
