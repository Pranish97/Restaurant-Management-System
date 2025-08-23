import { Fragment } from "react";
import { categories } from "../../config";

function CategorySideBar({handleCategoryChange, categoryFromUrl}) {
    return (
        <Fragment>
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
        </Fragment>
    )
}

export default CategorySideBar