import Category, { ICategory } from "../../models/Category";

const categories: any[] = [];

// CATEGORIES
const generateElectronics = () => {
  const electronics = new Category<ICategory>({
    _id: "6273e6a3ec15bc98702471c3",
    name: "Electronics",
    description: "Electrons go brrr",
  });

  categories.push(electronics);
};

const generateClothing = () => {
  const clothing = new Category<ICategory>({
    _id: "6273e6a3ec15bc98702471c4",
    name: "Clothing",
    description: "Cover your knees up",
  });

  categories.push(clothing);
};

// SEED DB
const seedDB = async () => {
  generateElectronics();
  generateClothing();

  for (let category of categories) {
    try {
      await category.save();
    } catch (err) {
      err;
    }
  }

  // console.log(categories);
  return;
};

export default seedDB;
