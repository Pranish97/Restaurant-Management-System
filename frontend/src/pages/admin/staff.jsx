import { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllStaff } from "../../store/admin/staff-slice";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../components/ui/table";

function AdminStaffPage() {
  const dispatch = useDispatch();
  const { staffList } = useSelector((state) => state.adminStaff);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getAllStaff());
  }, [dispatch]);

  return (
    <Fragment>
      {user?.role === "admin" ? (
        <>
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
                </TableRow>
              </TableHeader>
              <TableBody>
                {staffList && staffList.length > 0 ? (
                  staffList.map((staffItem, index) => (
                    <TableRow key={staffItem?._id}>
                      <TableCell className="font-medium">{index + 1}</TableCell>
                      <TableCell>{staffItem?.firstName}</TableCell>
                      <TableCell>{staffItem?.lastName}</TableCell>
                      <TableCell>{staffItem?.phone}</TableCell>
                      <TableCell>{staffItem?.gender}</TableCell>
                      <TableCell>{staffItem?.email}</TableCell>
                      <TableCell className="capitalize">
                        {staffItem?.role}
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <div>You Dont Have Access to this Page!</div>
                )}
              </TableBody>
            </Table>
          </div>
        </>
      ) : (
        <TableRow className="text-center">
          <TableCell
            colSpan={9}
            className="flex justify-center text-xl mt-2 font-extrabold"
          >
            You Dont Have Access to this Page!
          </TableCell>
        </TableRow>
      )}
    </Fragment>
  );
}

export default AdminStaffPage;
