import Category, { ICategory } from "../../models/Category";
import User, { IUser } from "../../models/User";

const users: any[] = [];
const categories: any[] = [];

// USERS
const generateJane = () => {
  const user = new User<IUser>({
    username: "Jane",
    email: "jane@gmail.com",
    password: "$2a$10$uhA3ldfq9OOmF1xNu38g7Or4CisFNy5aTnHaXR.ntrJn9X/52NKxe",
    isAdmin: true,
  });

  users.push(user);
};

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
  generateJane();

  generateElectronics();
  generateClothing();

  for (let user of users) {
    try {
      await user.save();
    } catch (err) {
      err;
    }
  }

  for (let category of categories) {
    try {
      await category.save();
    } catch (err) {
      err;
    }
  }

  console.log(users);
  // console.log(categories);
  return;
};

export default seedDB;
