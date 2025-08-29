import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllMenu } from "../../store/admin/menu-slice";
import { getAllStaff } from "../../store/admin/staff-slice";
import { DollarSign, ShoppingCart, FileText, Users, Edit, Trash } from "lucide-react";
import { getAllTransaction } from "../../store/admin/payment-slice";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../components/ui/table";
import { Button } from "../../components/ui/button";

function AdminDashboard() {
  const { menuList } = useSelector((state) => state.adminMenu);
  const { staffList } = useSelector((state) => state.adminStaff);
  const { transactionList } = useSelector((state) => state.adminPayment);
  const dispatch = useDispatch();

  console.log(transactionList, "tran")

  const total = transactionList?.reduce((sum, item) => sum + item?.amount , 0);
  console.log(total, "total")
  const stats = [
    {
      title: "Total Revenue",
      value:   `${total}`,
      icon: <DollarSign className="w-6 h-6 text-green-600" />,
    },
    {
      title: "Total Transaction",
      value: transactionList?.length,
      icon: <FileText className="w-6 h-6 text-blue-600" />,
    }, 
    {
      title: "Total Menu",
      value: menuList?.length || 0,
      icon: <ShoppingCart className="w-6 h-6 text-purple-600" />,
    },
    {
      title: "Total Staff",
      value: staffList?.length,
      icon: <Users className="w-6 h-6 text-orange-600" />,
    },
  ];

  console.log(menuList, "menu");

  useEffect(() => {
    dispatch(fetchAllMenu());
    dispatch(getAllStaff());
    dispatch(getAllTransaction());
  }, [dispatch]);
  return (
    <>
      <h1 className="font-bold ml-15 text-2xl">Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-6">
        {stats.map((item, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl shadow-md p-6 flex flex-row items-center justify-center gap-2 hover:shadow-lg transition"
          >
            <div className="text-8xl mb-3">{item.icon}</div>
            <div className="flex flex-col">
              <h2 className="text-gray-600 text-sm font-medium">
                {item.title}
              </h2>
              <p className="text-2xl font-bold text-gray-900">{item.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="flex flex-col gap-4 mt-5">
        <h1 className="font-bold ml-15 text-xl">Transaction Details</h1>
        <div className="flex px-10 mt-5">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">SNO</TableHead>
                  <TableHead>Customer Name</TableHead>
                  <TableHead>Customer Number</TableHead>
                  <TableHead>Customer Address</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Transaction Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-center">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {transactionList && transactionList.length > 0 ? (
                  transactionList.map((transaction, index) => (
                    <TableRow key={transaction?._id}>
                      <TableCell className="font-medium">{index + 1}</TableCell>
                      <TableCell>{transaction?.customerName}</TableCell>
                      <TableCell>{transaction?.customerNumber}</TableCell>
                      <TableCell>{transaction?.customerAddress}</TableCell>
                      <TableCell>${transaction?.amount}</TableCell>
                      <TableCell>{transaction?.created_at}</TableCell>
                      <TableCell className="capitalize">
                        {transaction?.status}
                      </TableCell>
                      <TableCell className="flex gap-3 items-center justify-center">
                        <Button
                          className="bg-amber-700 cursor-pointer hover:bg-amber-600"
                        >
                          <Edit />
                          Edit
                        </Button>
                        <Button
                          className="bg-red-700 cursor-pointer hover:bg-red-600"
                        >
                          <Trash />
                          Delete
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <div>You Dont Have Access to this Page!</div>
                )}
              </TableBody>
            </Table>
          </div>
      </div>
    </>
  );
}
export default AdminDashboard;
