import { Fragment, useEffect, useState } from "react";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "../../components/ui/sheet";
import CommonForm from "../../components/common/form";
import { addTableFields } from "../../config";
import { useDispatch, useSelector } from "react-redux";
import {
  addTable,
  deleteTable,
  getTableList,
  updateTable,
} from "../../store/admin/table-slice";
import { toast } from "react-toastify";
import { Edit, Trash2, Users } from "lucide-react";

const initialData = {
  tableNumber: "",
  seats: "",
  status: "",
};

function AdminTablePage() {
  const [formData, setFormData] = useState(initialData);
  const [openAddTableDialog, setOpenAddTableDialog] = useState(false);
  const [currentEditId, setCurrentEditId] = useState(null);
  const dispatch = useDispatch();
  const { tableList } = useSelector((state) => state.adminTable);

  function onSubmit(e) {
    e.preventDefault();
    currentEditId !== null
      ? dispatch(updateTable({ id: currentEditId, formData })).then((data) => {
          if (data?.payload?.success) {
            toast.success(data.payload.message);
            setCurrentEditId(null);
            setFormData(initialData);
            setOpenAddTableDialog(false);
            dispatch(getTableList());
          }
        })
      : dispatch(addTable(formData)).then((data) => {
          if (data?.payload?.success) {
            toast.success(data.payload.message);
            setFormData(initialData);
            setOpenAddTableDialog(false);
            dispatch(getTableList());
          }
        });
  }

  function handleDeleteTable(id) {
    console.log(id);
    dispatch(deleteTable(id)).then((data) => {
      console.log(data);
      if (data?.payload?.success) {
        toast.success(data.payload.message);
        dispatch(getTableList());
      }
    });
  }

  useEffect(() => {
    dispatch(getTableList());
  }, [dispatch]);

  return (
    <Fragment>
      <div className="flex justify-between mx-4">
        <div className="ml-4">
          <h1 className="text-2xl font-extrabold">Tables</h1>
        </div>
        <div className=" flex pr-4">
          <Button
            onClick={() => setOpenAddTableDialog(true)}
            className="mt-2 cursor-pointer bg-amber-700 hover:bg-amber-600"
          >
            Add Table
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6 mx-20 border ">
        {tableList.map((table) => (
          <Card key={table._id} className="rounded-2xl border border-gray-300 shadow-xl bg-gray-200 hover:scale-105 cursor-pointer hover:bg-gray-300 ">
            <CardContent className="px-6 py-3 flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">
                  Table {table.tableNumber}
                </h2>
                <div className="flex gap-2">
                  <Button
                    className="bg-amber-700 cursor-pointer hover:bg-amber-600"
                    onClick={() => {
                      setCurrentEditId(table._id);
                      setOpenAddTableDialog(true);
                      setFormData(table);
                    }}
                  >
                    <Edit className="w-5 h-5 cursor-pointe" />
                  </Button>
                  <Button
                    onClick={() => handleDeleteTable(table._id)}
                    className="bg-red-700 cursor-pointer hover:bg-red-600"
                  >
                    <Trash2 className="w-5 h-5 cursor-pointer" />
                  </Button>
                </div>
              </div>

              <div className="flex items-center gap-2 text-base text-gray-600">
                <Users className="w-4 h-4" />
                {table.seats} Seats
              </div>

              <div>
                {table.status === "available" ? (
                  <span className="px-3 py-1 rounded-full text-base font-medium bg-green-100 text-green-600">
                    Available
                  </span>
                ) : (
                  <span className="px-3 py-1 rounded-full text-base font-medium bg-red-100 text-red-600">
                    Occupied
                  </span>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Sheet
        open={openAddTableDialog}
        onOpenChange={() => {
          setOpenAddTableDialog(false);
          setFormData(initialData);
          setCurrentEditId(null);
        }}
      >
        <SheetContent side="right" className="overflow-auto px-7">
          <SheetHeader>
            <SheetTitle>Add Table</SheetTitle>
          </SheetHeader>

          <div>
            <CommonForm
              formControls={addTableFields}
              formData={formData}
              setFormData={setFormData}
              buttonText={"Submit"}
              onSubmit={onSubmit}
            />
          </div>
        </SheetContent>
      </Sheet>
    </Fragment>
  );
}
export default AdminTablePage;
