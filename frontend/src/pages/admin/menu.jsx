import { Fragment, use, useState } from "react";
import { Button } from "../../components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "../../components/ui/sheet";
import CommonForm from "../../components/common/form";
import { addMenuElement } from "../../config";
import MenuImageUpolad from "../../components/admin/imageUpload";

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
  const [imageLoadingState, setImageLoadingState] = useState(false)

  function onSubmit(e) {
    e.preventDefault();
  }

  return (
    <Fragment>
      <div className="mb-5 w-full flex justify-end">
        <Button
          onClick={() => setOpenAddMenu(true)}
          className="cursor-pointer bg-amber-700 hover:bg-amber-600"
        >
          Add New Menu
        </Button>
      </div>

      <Sheet open={openAddMenu} onOpenChange={setOpenAddMenu}>
        <SheetContent side="right" className="overflow-auto px-7">
          <SheetHeader>
            <SheetTitle className="text-lg font-semibold">Add New Menu</SheetTitle>
          </SheetHeader>
          <MenuImageUpolad
            imageFile={imageFile}
            setImageFile={setImageFile}
            uploadedImageUrl={uploadedImageUrl}
            setUploadedImageUrl={setUploadedImageUrl}
            setImageLoadingState={setImageLoadingState}
          />
          <div className="py-6">
            <CommonForm
              formControls={addMenuElement}
              formData={formData}
              setFormData={setFormData}
              buttonText={"Submit"}
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
