import { Fragment, useEffect, useState } from "react";
import { Button } from "../../components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "../../components/ui/sheet";
import CommonForm from "../../components/common/form";
import { addMenuElement, categories } from "../../config";
import MenuImageUpolad from "../../components/admin/imageUpload";
import { useDispatch, useSelector } from "react-redux";
import {
  addNewMenu,
  deleteMenu,
  editMenu,
  fetchMenuByCategory,
} from "../../store/admin/menu-slice";
import { toast } from "react-toastify";
import { useSearchParams } from "react-router";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "../../components/ui/card";
import { Edit, Trash } from "lucide-react";

const initialData = {
  name: "",
  image: null,
  price: "",
  description: "",
  category: "",
};

function AdminMenuPage() {
  const [openAddMenu, setOpenAddMenu] = useState(false);
  const [formData, setFormData] = useState(initialData);
  const [imageFile, setImageFile] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");
  const [imageLoadingState, setImageLoadingState] = useState(false);
  const [currentEditedId, setCurrentEditedId] = useState(null);

  const dispatch = useDispatch();
  const { menuList } = useSelector((state) => state.adminMenu);
  const { user } = useSelector((state) => state.auth);

  const [searchParams, setSearchParams] = useSearchParams();
  const categoryFromUrl = searchParams.get("category") || "all";


  function onSubmit(e) {
    e.preventDefault();

    if (user?.role !== "admin") {
      toast.error("You don't have access");
      return;
    }

    currentEditedId !== null
      ? dispatch(editMenu({ id: currentEditedId, formData })).then((data) => {
          if (data.payload.success) {
            toast.success(data.payload.message);
            dispatch(fetchMenuByCategory(categoryFromUrl));
            setOpenAddMenu(false);
            setCurrentEditedId(null);
            setFormData(initialData);
          }
        })
      : dispatch(
          addNewMenu({
            ...formData,
            image: uploadedImageUrl,
          })
        ).then((data) => {
          if (data.payload.success) {
            dispatch(fetchMenuByCategory(categoryFromUrl));
            toast.success(data.payload.message);
            setFormData(initialData);
            setOpenAddMenu(false);
            setImageFile(null);
          }
        });
  }

  function handleDeleteMenu(id) {
    if(user?.role !== "admin"){
      toast.error("You don't have access");
      return;
    }
    dispatch(deleteMenu(id)).then((data) => {
      if (data.payload.success) {
        dispatch(fetchMenuByCategory(categoryFromUrl));
        toast.success(data.payload.message);
      }
    });
  }

  function handleOpenAddDialog() {
    if (user?.role !== "admin") {
      toast.error("You don't have access");
      return;
    } else {
      setOpenAddMenu(true);
    }
  }

  useEffect(() => {
    dispatch(fetchMenuByCategory(categoryFromUrl));
  }, [categoryFromUrl, dispatch]);

  const handleCategoryChange = (e) => {
    const selected = e.target.value;
    setSearchParams({ category: selected });
  };

  return (
    <Fragment>
      <div className="flex gap-5">
        <div className="w-60 h-full p-2">
          <h1 className="text-lg font-semibold mb-4">Categories</h1>
          <div className="flex flex-col gap-2">
            {categories.map((cat) => {
              const Icon = cat.icon;
              return (
                <label
                  key={cat.id}
                  className={`flex items-center gap-3 rounded-md px-3 py-2 cursor-pointer
                  ${
                    categoryFromUrl === cat.id
                      ? "bg-amber-700 text-white"
                      : "bg-white hover:bg-amber-700 hover:text-white"
                  }`}
                >
                  <input
                    type="radio"
                    name="category"
                    value={cat.id}
                    checked={categoryFromUrl === cat.id}
                    onChange={handleCategoryChange}
                    className="hidden"
                  />
                  <div className="flex items-center">
                    <Icon className="w-20 h-15" />
                  </div>
                  <div className="grid">
                    <span className="font-medium text-lg">{cat.label}</span>
                  </div>
                </label>
              );
            })}
          </div>
        </div>

        <div className="flex-1 p-5 justify-start">
          <div className="flex justify-between">
            <h2 className="text-xl font-bold mb-4 capitalize">
              {categoryFromUrl} Menu
            </h2>
            <Button
              onClick={handleOpenAddDialog}
              className="cursor-pointer bg-amber-700 hover:bg-amber-600"
            >
              Add New Menu
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
            {menuList?.map((item) => (
              <Card
                key={item._id}
                className="overflow-hidden rounded-2xl shadow-lg hover:scale-105 cursor-pointer transition"
              >
                <div className="w-full h-52">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                <CardContent>
                  <h1 className="text-lg font-semibold line-clamp-1">
                    {item.name}
                  </h1>
                  <div className="flex justify-between mt-3">
                    <p className="text-sm text-muted-foreground capitalize">
                      {item.category}
                    </p>
                    <p className="text-lg font-bold text-orange-500">
                      ${item.price}
                    </p>
                  </div>
                </CardContent>

                <CardFooter className="flex justify-between gap-3">
                  <Button
                    onClick={() => {
                      handleOpenAddDialog();
                      setCurrentEditedId(item?._id);
                      setFormData(item);
                    }}
                    className="bg-amber-700 hover:bg-amber-600 cursor-pointer"
                  >
                    <Edit /> Edit
                  </Button>
                  <Button
                    onClick={() => handleDeleteMenu(item._id)}
                    className="bg-red-700 hover:bg-red-600 cursor-pointer"
                  >
                    <Trash />
                    Delete
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </div>

      <Sheet
        open={openAddMenu}
        onOpenChange={() => {
          setOpenAddMenu(false);
          setCurrentEditedId(null);
          setFormData(initialData);
        }}
      >
        <SheetContent side="right" className="overflow-auto px-7">
          <SheetHeader>
            <SheetTitle className="text-lg font-semibold">
              {currentEditedId ? "Edit Menu" : "Add New Menu"}
            </SheetTitle>
          </SheetHeader>
          <MenuImageUpolad
            imageFile={imageFile}
            setImageFile={setImageFile}
            uploadedImageUrl={uploadedImageUrl}
            setUploadedImageUrl={setUploadedImageUrl}
            setImageLoadingState={setImageLoadingState}
            currentEditedId={currentEditedId}
          />
          <div className="py-6">
            <CommonForm
              formControls={addMenuElement}
              formData={formData}
              setFormData={setFormData}
              buttonText={currentEditedId ? "Update" : "Submit"}
              onSubmit={onSubmit}
              isDisable={imageLoadingState}
            />
          </div>
        </SheetContent>
      </Sheet>
    </Fragment>
  );
}
export default AdminMenuPage;
