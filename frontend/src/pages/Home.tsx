import React, { useEffect } from "react";
import InventoryForm from "../components/InventoryForm";
import useInventoryContext from "../hooks/useInventoryContext";
import axios from "axios";
import InventoryDetails from "../components/InventoryDetails";
import useAuthContext from "../hooks/useAuthContext";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Home: React.FC = () => {
  const { inventory, dispatch } = useInventoryContext();
  const { user } = useAuthContext();

  useEffect(() => {
    const fetchInventory = async () => {
        const response = await axios.get("https://inventory-sytem-mern.onrender.com/api/inventory", {
          headers: {
            "Authorization": `Bearer ${user.token}`,
          },
        });
        if (response.status === 200) {
          dispatch({ type: "SET_INVENTORY", payload: response.data });
        }
    };
    if (user) {
      fetchInventory()
    }
  }, [dispatch, user]);

  return (
    <div>
          <Navbar />
          <div className="px-4 lg:px-32 mt-32">
            <div>
              <InventoryForm />
            </div>
            {inventory && inventory.map((inventories) =>  <InventoryDetails key={inventories._id} inventory={inventory} />)}
          </div>
          <Footer />
    </div>
  );
};

export default Home;
