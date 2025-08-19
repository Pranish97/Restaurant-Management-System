import { Fragment, useEffect, useState } from "react";
import { Button } from "../../components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "../../components/ui/sheet";
import CommonForm from "../../components/common/form";
import { addUser } from "../../config";
import { useDispatch, useSelector } from "react-redux";
import {
  addNewUser,
  deleteUser,
  editUser,
  getAllUser,
} from "../../store/admin/user-slice";
import { toast } from "react-toastify";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table";
import { Edit, Trash } from "lucide-react";

const initialData = {
  firstName: "",
  lastName: "",
  phone: "",
  gender: "",
  email: "",
  role: "",
};

function UserPage() {
  const [formData, setFormData] = useState(initialData);
  const [openAddUserDialog, setOpenAddUserDialog] = useState(false);
  const [currentEditId, setCurrentEditId] = useState(null);
  const dispatch = useDispatch();
  const { userList } = useSelector((state) => state.adminUser);
  const { user } = useSelector((state) => state.auth);

  console.log(userList, "users");

  function onSubmit(e) {
    e.preventDefault();

    currentEditId !== null
      ? dispatch(editUser({ id: currentEditId, formData })).then((data) => {
          if (data?.payload?.success) {
            toast.success(data.payload.message);
            setFormData(initialData);
            setCurrentEditId(null);
            setOpenAddUserDialog(false);
            dispatch(getAllUser())
          }
        })
      : dispatch(addNewUser(formData)).then((data) => {
          if (data?.payload?.success) {
            toast.success(data.payload.message);
            dispatch(getAllUser());
            setFormData(initialData);
            setOpenAddUserDialog(false);
          } else {
            toast.error(data.payload.message);
          }
        });
  }

  function handleDeleteUser(id) {
    dispatch(deleteUser(id)).then((data) => {
      if (data?.payload?.success) {
        toast.success(data?.payload?.message);
        dispatch(getAllUser());
      }
    });
  }

  useEffect(() => {
    dispatch(getAllUser());
  }, [dispatch]);
  return (
    <Fragment>
      {user?.role === "admin" ? (
        <>
          <div className="flex justify-end pr-4">
            <Button
              className="bg-amber-700 hover:bg-amber-600 cursor-pointer"
              onClick={() => setOpenAddUserDialog(true)}
            >
              Add User
            </Button>
          </div>

          <div className="flex px-10 mt-5">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">SNO</TableHead>
                  <TableHead>First Name</TableHead>
                  <TableHead>Last Name</TableHead>
                  <TableHead>Phone</TableHead>
                  <TableHead>Gender</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Invitation</TableHead>
                  <TableHead className="text-center">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {userList && userList.length > 0 ? (
                  userList.map((userItem, index) => (
                    <TableRow key={userItem?._id}>
                      <TableCell className="font-medium">{index + 1}</TableCell>
                      <TableCell>{userItem?.firstName}</TableCell>
                      <TableCell>{userItem?.lastName}</TableCell>
                      <TableCell>{userItem?.phone}</TableCell>
                      <TableCell>{userItem?.gender}</TableCell>
                      <TableCell>{userItem?.email}</TableCell>
                      <TableCell className="capitalize">
                        {userItem?.role}
                      </TableCell>
                      <TableCell>
                        <Button className="bg-blue-700 cursor-pointer hover:bg-blue-600">
                          Invite
                        </Button>
                      </TableCell>
                      <TableCell className="flex gap-3 items-center justify-center">
                        <Button
                          onClick={() => {
                            setCurrentEditId(userItem?._id);
                            setOpenAddUserDialog(true);
                            setFormData(userItem);
                          }}
                          className="bg-amber-700 cursor-pointer hover:bg-amber-600"
                        >
                          <Edit />
                          Edit
                        </Button>
                        <Button
                          onClick={() => handleDeleteUser(userItem?._id)}
                          className="bg-red-700 cursor-pointer hover:bg-red-600"
                        >
                          <Trash />
                          Delete
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <div>No Data Found!</div>
                )}
              </TableBody>
            </Table>
          </div>
        </>
      ) : (
        <TableRow>
          <TableCell colSpan={9} className="text-center">
            No Data Found!
          </TableCell>
        </TableRow>
      )}
      <Sheet
        open={openAddUserDialog}
        onOpenChange={() => {
          setOpenAddUserDialog(false);
          setCurrentEditId(null);
          setFormData(initialData);
        }}
      >
        <SheetContent side="right" className="overflow-auto px-7">
          <SheetHeader>
            <SheetTitle className="text-lg font-semibold">Add User</SheetTitle>
          </SheetHeader>

          <CommonForm
            formControls={addUser}
            formData={formData}
            setFormData={setFormData}
            buttonText={"Submit"}
            onSubmit={onSubmit}
          />
        </SheetContent>
      </Sheet>
    </Fragment>
  );
}
export default UserPage;
